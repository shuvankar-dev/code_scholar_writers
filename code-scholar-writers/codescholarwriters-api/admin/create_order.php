<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$required_fields = ['customer_name', 'customer_email', 'service_type', 'total_price', 'currency'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        echo json_encode(['error' => "Field $field is required"]);
        exit();
    }
}

// Validate currency
$allowed_currencies = ['USD', 'INR'];
if (!in_array($input['currency'], $allowed_currencies)) {
    echo json_encode(['error' => 'Currency must be USD or INR']);
    exit();
}

try {
    // Generate unique order ID
    $order_id = 'ORD-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -6));
    
    $stmt = $pdo->prepare("
        INSERT INTO orders (
            order_id, customer_name, customer_email, customer_phone,
            service_type, assignment_type, academic_level, pages, words,
            deadline_date, deadline_time, subject, instructions,
            total_price, currency, status, payment_status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    
    $result = $stmt->execute([
        $order_id,
        $input['customer_name'],
        $input['customer_email'],
        $input['customer_phone'] ?? null,
        $input['service_type'],
        $input['assignment_type'] ?? null,
        $input['academic_level'] ?? null,
        $input['pages'] ?? null,
        $input['words'] ?? null,
        $input['deadline_date'] ?? null,
        $input['deadline_time'] ?? null,
        $input['subject'] ?? null,
        $input['instructions'] ?? null,
        $input['total_price'],
        $input['currency'], // Now properly handles INR/USD
        'pending',
        'unpaid'
    ]);
    
    if ($result) {
        echo json_encode([
            'success' => true,
            'message' => 'Order created successfully',
            'order_id' => $order_id,
            'currency' => $input['currency']
        ]);
    } else {
        echo json_encode(['error' => 'Failed to create order']);
    }
    
} catch (Exception $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>