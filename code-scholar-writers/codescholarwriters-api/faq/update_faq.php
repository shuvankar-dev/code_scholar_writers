<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS headers
header('Access-Control-Allow-Origin: http://localhost:5173');
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
if (!isset($data['id']) || !is_numeric($data['id'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Missing or invalid FAQ ID'
    ]);
    exit();
}

try {
    $faqId = (int)$data['id'];
    
    // Check if FAQ exists
    $checkStmt = $pdo->prepare("SELECT id FROM faqs WHERE id = ?");
    $checkStmt->execute([$faqId]);
    if (!$checkStmt->fetch()) {
        throw new Exception('FAQ not found');
    }
    
    // Build update query dynamically based on provided fields
    $updateFields = [];
    $params = [];
    
    if (isset($data['question']) && trim($data['question']) !== '') {
        $updateFields[] = "question = ?";
        $params[] = trim($data['question']);
    }
    
    if (isset($data['answer']) && trim($data['answer']) !== '') {
        $updateFields[] = "answer = ?";
        $params[] = trim($data['answer']);
    }
    
    if (isset($data['category'])) {
        $updateFields[] = "category = ?";
        $params[] = trim($data['category']) !== '' ? trim($data['category']) : 'General';
    }
    
    if (isset($data['display_order'])) {
        $updateFields[] = "display_order = ?";
        $params[] = (int)$data['display_order'];
    }
    
    if (isset($data['is_active'])) {
        $updateFields[] = "is_active = ?";
        $params[] = (int)$data['is_active'];
    }
    
    if (empty($updateFields)) {
        throw new Exception('No valid fields to update');
    }
    
    // Always update the updated_at field
    $updateFields[] = "updated_at = CURRENT_TIMESTAMP";
    
    // Add FAQ ID as the last parameter
    $params[] = $faqId;
    
    // Execute update
    $sql = "UPDATE faqs SET " . implode(", ", $updateFields) . " WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $success = $stmt->execute($params);
    
    if (!$success) {
        throw new Exception('Failed to update FAQ');
    }
    
    $rowsAffected = $stmt->rowCount();
    if ($rowsAffected === 0) {
        throw new Exception('No changes made to FAQ');
    }
    
    // Fetch the updated FAQ
    $fetchStmt = $pdo->prepare("SELECT * FROM faqs WHERE id = ?");
    $fetchStmt->execute([$faqId]);
    $updatedFaq = $fetchStmt->fetch(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'message' => 'FAQ updated successfully',
        'faq' => $updatedFaq
    ]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>