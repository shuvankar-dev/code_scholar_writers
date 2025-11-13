<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Method not allowed. Only POST requests are accepted.'
    ]);
    exit();
}

// Database connection
$host = 'localhost';
$dbname = 'codescholarwriters';
$username = 'root';
$password = '';

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

// Get JSON input
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

// Validate required fields
$requiredFields = ['question', 'answer'];
foreach ($requiredFields as $field) {
    if (!isset($data[$field]) || trim($data[$field]) === '') {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => "Missing required field: $field"
        ]);
        exit();
    }
}

try {
    // Prepare data
    $question = trim($data['question']);
    $answer = trim($data['answer']);
    $category = isset($data['category']) && trim($data['category']) !== '' ? trim($data['category']) : 'General';
    $display_order = isset($data['display_order']) ? (int)$data['display_order'] : 0;
    $is_active = isset($data['is_active']) ? (int)$data['is_active'] : 1;
    
    // Insert FAQ
    $stmt = $pdo->prepare("
        INSERT INTO faqs (question, answer, category, display_order, is_active, created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ");
    
    $success = $stmt->execute([
        $question,
        $answer,
        $category,
        $display_order,
        $is_active
    ]);
    
    if (!$success) {
        throw new Exception('Failed to insert FAQ into database');
    }
    
    $faqId = $pdo->lastInsertId();
    
    // Fetch the created FAQ
    $fetchStmt = $pdo->prepare("SELECT * FROM faqs WHERE id = ?");
    $fetchStmt->execute([$faqId]);
    $createdFaq = $fetchStmt->fetch(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'message' => 'FAQ created successfully',
        'faq_id' => $faqId,
        'faq' => $createdFaq
    ]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>