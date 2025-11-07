<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

include_once 'config.php';

try {
    // Check if slug parameter is provided
    if (!isset($_GET['slug']) || empty($_GET['slug'])) {
        throw new Exception('Blog slug is required');
    }
    
    $slug = $_GET['slug'];
    
    // Get the blog post
    $query = "SELECT * FROM blogs WHERE slug = ? AND status = 'published'";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$slug]);
    $blog = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$blog) {
        throw new Exception('Blog post not found or not published');
    }
    
    // Update view count
    $updateViewQuery = "UPDATE blogs SET view_count = view_count + 1 WHERE id = ?";
    $updateViewStmt = $pdo->prepare($updateViewQuery);
    $updateViewStmt->execute([$blog['id']]);
    
    // Get related blogs (same category, excluding current)
    $relatedQuery = "SELECT id, title, slug, excerpt, author, category, created_at, featured_image, reading_time FROM blogs WHERE category = ? AND id != ? AND status = 'published' ORDER BY created_at DESC LIMIT 3";
    $relatedStmt = $pdo->prepare($relatedQuery);
    $relatedStmt->execute([$blog['category'], $blog['id']]);
    $relatedBlogs = $relatedStmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Increment view count in response
    $blog['view_count'] = (int)$blog['view_count'] + 1;
    
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