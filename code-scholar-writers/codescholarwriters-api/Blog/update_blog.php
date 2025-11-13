<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../config.php';

try {
    $db = new Database();
    $pdo = $db->getConnection();
    
    // Check if request method is POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Only POST method allowed');
    }

    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        throw new Exception('Invalid JSON input');
    }
    
    // Validate required fields
    if (empty($input['id']) || empty($input['title']) || empty($input['content'])) {
        throw new Exception('ID, title, and content are required');
    }
    
    $blogId = (int)$input['id'];
    
    // Check if blog exists
    $checkQuery = "SELECT id, slug FROM blogs WHERE id = ?";
    $checkStmt = $pdo->prepare($checkQuery);
    $checkStmt->execute([$blogId]);
    $existingBlog = $checkStmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$existingBlog) {
        throw new Exception('Blog post not found');
    }
    
    // Generate new slug if title changed
    $newSlug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $input['title'])));
    
    // Check if slug conflicts with other blogs (excluding current)
    $slugCheckQuery = "SELECT COUNT(*) FROM blogs WHERE slug = ? AND id != ?";
    $slugCheckStmt = $pdo->prepare($slugCheckQuery);
    $slugCheckStmt->execute([$newSlug, $blogId]);
    
    if ($slugCheckStmt->fetchColumn() > 0) {
        // Append timestamp to make it unique
        $newSlug .= '-' . time();
    }
    
    // Calculate reading time
    $wordCount = str_word_count(strip_tags($input['content']));
    $readingTime = max(1, ceil($wordCount / 200));
    
    // Prepare data
    $title = trim($input['title']);
    $excerpt = isset($input['excerpt']) ? trim($input['excerpt']) : '';
    $content = trim($input['content']);
    $author = isset($input['author']) ? trim($input['author']) : 'Admin';
    $featuredImage = isset($input['featured_image']) ? trim($input['featured_image']) : '';
    $category = isset($input['category']) ? trim($input['category']) : 'General';
    $tags = isset($input['tags']) ? trim($input['tags']) : '';
    $status = isset($input['status']) ? $input['status'] : 'draft';
    $featured = isset($input['is_featured']) ? (int)$input['is_featured'] : 0;
    $metaTitle = isset($input['meta_title']) ? trim($input['meta_title']) : $title;
    $metaDescription = isset($input['meta_description']) ? trim($input['meta_description']) : $excerpt;
    
    // Generate excerpt if not provided
    if (empty($excerpt)) {
        $excerpt = substr(strip_tags($content), 0, 200) . '...';
    }
    
    // Validate status
    if (!in_array($status, ['draft', 'published'])) {
        $status = 'draft';
    }
    
    // Update blog post - using 'featured' instead of 'is_featured'
    $query = "UPDATE blogs SET 
        title = ?, slug = ?, excerpt = ?, content = ?, author = ?, 
        featured_image = ?, category = ?, tags = ?, status = ?, 
        featured = ?, meta_title = ?, meta_description = ?, 
        reading_time = ?, updated_at = NOW() 
        WHERE id = ?";
    
    $stmt = $pdo->prepare($query);
    $result = $stmt->execute([
        $title,
        $newSlug,
        $excerpt,
        $content,
        $author,
        $featuredImage,
        $category,
        $tags,
        $status,
        $featured,
        $metaTitle,
        $metaDescription,
        $readingTime,
        $blogId
    ]);
    
    if ($result) {
        echo json_encode([
            'success' => true,
            'message' => 'Blog post updated successfully',
            'blog_id' => $blogId,
            'slug' => $newSlug
        ]);
    } else {
        throw new Exception('Failed to update blog post');
    }

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