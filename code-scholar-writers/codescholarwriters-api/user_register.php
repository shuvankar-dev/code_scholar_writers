<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit();
}

require_once 'config.php';

try {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        throw new Exception('Invalid JSON input');
    }
    
    // Validate required fields
    $required_fields = ['first_name', 'last_name', 'email'];
    foreach ($required_fields as $field) {
        if (empty($input[$field])) {
            throw new Exception("Field '$field' is required");
        }
    }
    
    // Sanitize inputs
    $first_name = trim($input['first_name']);
    $last_name = trim($input['last_name']);
    $email = trim(strtolower($input['email']));
    $phone = isset($input['phone']) ? trim($input['phone']) : null;
    $registration_type = isset($input['registration_type']) ? $input['registration_type'] : 'manual';
    $google_id = isset($input['google_id']) ? $input['google_id'] : null;
    $profile_picture = isset($input['profile_picture']) ? $input['profile_picture'] : null;
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email format');
    }
    
    // Check if email already exists
    $checkStmt = $pdo->prepare("SELECT id FROM user_registrations WHERE email = ?");
    $checkStmt->execute([$email]);
    
    if ($checkStmt->rowCount() > 0) {
        throw new Exception('Email already registered');
    }
    
    // Insert new registration
    $stmt = $pdo->prepare("
        INSERT INTO user_registrations 
        (first_name, last_name, email, phone, registration_type, google_id, profile_picture, status, email_verified) 
        VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?)
    ");
    
    $email_verified = ($registration_type === 'google') ? 1 : 0;
    
    $success = $stmt->execute([
        $first_name,
        $last_name,
        $email,
        $phone,
        $registration_type,
        $google_id,
        $profile_picture,
        $email_verified
    ]);
    
    if ($success) {
        $user_id = $pdo->lastInsertId();
        
        echo json_encode([
            'success' => true,
            'message' => 'Registration successful',
            'user_id' => $user_id,
            'data' => [
                'id' => $user_id,
                'first_name' => $first_name,
                'last_name' => $last_name,
                'email' => $email,
                'phone' => $phone,
                'registration_type' => $registration_type
            ]
        ]);
    } else {
        throw new Exception('Failed to create registration');
    }
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>