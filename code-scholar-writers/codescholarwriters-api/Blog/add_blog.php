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
    // Check if request method is POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Only POST method allowed');
    }

    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    if (empty($input['title']) || empty($input['content']) || empty($input['author'])) {
        throw new Exception('Title, content, and author are required');
    }
    
    // Generate slug from title
    $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $input['title'])));
    
    // Check if slug already exists
    $slugCheckQuery = "SELECT COUNT(*) FROM blogs WHERE slug = ?";
    $slugCheckStmt = $pdo->prepare($slugCheckQuery);
    $slugCheckStmt->execute([$slug]);
    
    if ($slugCheckStmt->fetchColumn() > 0) {
        // Append timestamp to make it unique
        $slug .= '-' . time();
    }
    
    // Calculate reading time (average 200 words per minute)
    $wordCount = str_word_count(strip_tags($input['content']));
    $readingTime = max(1, ceil($wordCount / 200));
    
    // Prepare data
    $title = trim($input['title']);
    $excerpt = isset($input['excerpt']) ? trim($input['excerpt']) : '';
    $content = trim($input['content']);
    $author = trim($input['author']);
    $featuredImage = isset($input['featured_image']) ? trim($input['featured_image']) : null;
    $category = isset($input['category']) ? trim($input['category']) : 'General';
    $tags = isset($input['tags']) ? trim($input['tags']) : '';
    $status = isset($input['status']) ? $input['status'] : 'draft';
    $featured = isset($input['featured']) ? (int)$input['featured'] : 0;
    $metaTitle = isset($input['meta_title']) ? trim($input['meta_title']) : $title;
    $metaDescription = isset($input['meta_description']) ? trim($input['meta_description']) : $excerpt;
    $metaKeywords = isset($input['meta_keywords']) ? trim($input['meta_keywords']) : '';
    
    // Validate status
    if (!in_array($status, ['draft', 'published', 'archived'])) {
        $status = 'draft';
    }
    
    // Insert blog post
    $query = "INSERT INTO blogs (title, slug, excerpt, content, author, featured_image, category, tags, status, featured, meta_title, meta_description, meta_keywords, reading_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $pdo->prepare($query);
    $result = $stmt->execute([
        $title,
        $slug,
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
        $metaKeywords,
        $readingTime
    ]);
    
    if ($result) {
        $blogId = $pdo->lastInsertId();
        
        echo json_encode([
            'success' => true,
            'message' => 'Blog post created successfully',
            'blog_id' => (int)$blogId,
            'slug' => $slug
        ]);
    } else {
        throw new Exception('Failed to create blog post');
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