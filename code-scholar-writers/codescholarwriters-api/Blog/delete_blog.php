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
    if (empty($input['id'])) {
        throw new Exception('Blog ID is required');
    }
    
    $blogId = (int)$input['id'];
    
    // Check if blog exists
    $checkQuery = "SELECT id, title FROM blogs WHERE id = ?";
    $checkStmt = $pdo->prepare($checkQuery);
    $checkStmt->execute([$blogId]);
    $existingBlog = $checkStmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$existingBlog) {
        throw new Exception('Blog post not found');
    }
    
    // Delete the blog post
    $deleteQuery = "DELETE FROM blogs WHERE id = ?";
    $deleteStmt = $pdo->prepare($deleteQuery);
    $result = $deleteStmt->execute([$blogId]);
    
    if ($result) {
        echo json_encode([
            'success' => true,
            'message' => 'Blog post deleted successfully',
            'deleted_blog' => [
                'id' => $blogId,
                'title' => $existingBlog['title']
            ]
        ]);
    } else {
        throw new Exception('Failed to delete blog post');
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