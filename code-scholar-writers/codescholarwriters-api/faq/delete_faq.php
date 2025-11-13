<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Allow POST and DELETE requests
if (!in_array($_SERVER['REQUEST_METHOD'], ['POST', 'DELETE'])) {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Method not allowed. Only POST and DELETE requests are accepted.'
    ]);
    exit();
}

// Database connection
$host = 'localhost';
$dbname = 'u817404388_codewriters_db';
$username = 'u817404388_codewriters_us';
$password = '8e#RgG>oN';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Database connection failed: ' . $e->getMessage()
    ]);
    exit();
}

// Get FAQ ID from request
$faqId = null;

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // For DELETE requests, get ID from URL parameter
    $faqId = isset($_GET['id']) ? (int)$_GET['id'] : null;
} else {
    // For POST requests, get ID from JSON body
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Invalid JSON input: ' . json_last_error_msg()
        ]);
        exit();
    }
    
    $faqId = isset($data['id']) ? (int)$data['id'] : null;
}

if (!$faqId || !is_numeric($faqId)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Missing or invalid FAQ ID'
    ]);
    exit();
}

try {
    // Check if FAQ exists and get its data before deletion
    $checkStmt = $pdo->prepare("SELECT * FROM faqs WHERE id = ?");
    $checkStmt->execute([$faqId]);
    $faq = $checkStmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$faq) {
        throw new Exception('FAQ not found');
    }
    
    // Delete the FAQ
    $deleteStmt = $pdo->prepare("DELETE FROM faqs WHERE id = ?");
    $success = $deleteStmt->execute([$faqId]);
    
    if (!$success) {
        throw new Exception('Failed to delete FAQ');
    }
    
    $rowsAffected = $deleteStmt->rowCount();
    if ($rowsAffected === 0) {
        throw new Exception('FAQ not found or already deleted');
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'FAQ deleted successfully',
        'deleted_faq' => $faq
    ]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>