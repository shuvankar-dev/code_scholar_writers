<?php
header('Content-Type: application/json');
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
    $orderId = $_GET['order_id'] ?? '';
    
    if (empty($orderId)) {
        echo json_encode(['success' => false, 'error' => 'Order ID is required']);
        exit;
    }
    
    try {
        // Get files for the order
        $stmt = $pdo->prepare("
            SELECT 
                id,
                order_id,
                original_filename,
                stored_filename,
                file_size,
                file_type,
                uploaded_at
            FROM order_files 
            WHERE order_id = :order_id 
            ORDER BY uploaded_at DESC
        ");
        
        $stmt->execute([':order_id' => $orderId]);
        $files = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Format file sizes
        foreach ($files as &$file) {
            $file['file_size_formatted'] = formatFileSize($file['file_size']);
        }
        
        echo json_encode([
            'success' => true,
            'files' => $files,
            'count' => count($files)
        ]);
        
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Only GET method allowed']);
}

function formatFileSize($bytes) {
    if ($bytes >= 1073741824) {
        return number_format($bytes / 1073741824, 2) . ' GB';
    } elseif ($bytes >= 1048576) {
        return number_format($bytes / 1048576, 2) . ' MB';
    } elseif ($bytes >= 1024) {
        return number_format($bytes / 1024, 2) . ' KB';
    } else {
        return $bytes . ' bytes';
    }
}
?>