<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once 'config.php';

try {
    $db = new Database();
    $pdo = $db->getConnection();
    
    // Check if slug parameter is provided
    if (!isset($_GET['slug']) || empty($_GET['slug'])) {
        throw new Exception('Blog slug is required');
    }
    
    $slug = $_GET['slug'];
    
    // Build query - check if admin request to include drafts
    $query = "SELECT * FROM blogs WHERE slug = ?";
    $params = [$slug];
    
    // If not admin request, only show published blogs
    if (!isset($_GET['admin']) || $_GET['admin'] !== 'true') {
        $query .= " AND status = 'published'";
    }
    
    $stmt = $pdo->prepare($query);
    $stmt->execute($params);
    $blog = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$blog) {
        throw new Exception('Blog post not found');
    }
    
    // Update view count (only for published blogs and non-admin requests)
    if ($blog['status'] === 'published' && (!isset($_GET['admin']) || $_GET['admin'] !== 'true')) {
        $updateViewQuery = "UPDATE blogs SET view_count = view_count + 1 WHERE id = ?";
        $updateViewStmt = $pdo->prepare($updateViewQuery);
        $updateViewStmt->execute([$blog['id']]);
        
        // Increment view count in response
        $blog['view_count'] = (int)$blog['view_count'] + 1;
    }
    
    // Get related blogs (same category, excluding current, only published)
    $relatedQuery = "SELECT id, title, slug, excerpt, author, category, created_at, featured_image, reading_time, view_count 
                     FROM blogs 
                     WHERE category = ? AND id != ? AND status = 'published' 
                     ORDER BY created_at DESC 
                     LIMIT 3";
    $relatedStmt = $pdo->prepare($relatedQuery);
    $relatedStmt->execute([$blog['category'], $blog['id']]);
    $relatedBlogs = $relatedStmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'blog' => $blog,
        'related_blogs' => $relatedBlogs
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Database error: ' . $e->getMessage()
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Error: ' . $e->getMessage()
    ]);
}
?>