<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Database connection
require_once '../config.php';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $fileId = $_GET['file_id'] ?? '';
    
    if (empty($fileId)) {
        header('HTTP/1.0 400 Bad Request');
        echo json_encode(['error' => 'File ID is required']);
        exit;
    }
    
    try {
        // Get file information from database
        $stmt = $pdo->prepare("
            SELECT f.*, o.customer_name, o.customer_email 
            FROM order_files f 
            JOIN orders o ON f.order_id = o.id 
            WHERE f.id = :file_id
        ");
        $stmt->execute([':file_id' => $fileId]);
        $file = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$file) {
            header('HTTP/1.0 404 Not Found');
            echo json_encode(['error' => 'File not found']);
            exit;
        }
        
        $filePath = $file['file_path'];
        
        // Check if file exists on server
        if (!file_exists($filePath)) {
            header('HTTP/1.0 404 Not Found');
            echo json_encode(['error' => 'File not found on server']);
            exit;
        }
        
        // Set headers for file download
        header('Content-Type: ' . $file['file_type']);
        header('Content-Disposition: attachment; filename="' . $file['original_filename'] . '"');
        header('Content-Length: ' . filesize($filePath));
        header('Cache-Control: private');
        header('Pragma: private');
        header('Expires: 0');
        
        // Output file contents
        readfile($filePath);
        exit;
        
    } catch (Exception $e) {
        header('HTTP/1.0 500 Internal Server Error');
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    header('HTTP/1.0 405 Method Not Allowed');
    echo json_encode(['error' => 'Only GET method allowed']);
}
?>