<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Database connection
require_once '../config/database.php';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Get order data from form
        $orderDataJson = $_POST['order_data'] ?? '';
        if (empty($orderDataJson)) {
            throw new Exception('Order data is required');
        }
        
        $orderData = json_decode($orderDataJson, true);
        if (!$orderData) {
            throw new Exception('Invalid order data format');
        }
        
        // Validate required fields
        if (empty($orderData['customer_name']) || empty($orderData['customer_email'])) {
            throw new Exception('Customer name and email are required');
        }
        
        // Start transaction
        $pdo->beginTransaction();
        
        // Insert order into database
        $stmt = $pdo->prepare("
            INSERT INTO orders (
                customer_name, customer_email, customer_phone, service_type, 
                assignment_type, academic_level, pages, words, deadline_date, 
                deadline_time, subject, instructions, total_price, currency, 
                order_status, created_at
            ) VALUES (
                :customer_name, :customer_email, :customer_phone, :service_type, 
                :assignment_type, :academic_level, :pages, :words, :deadline_date, 
                :deadline_time, :subject, :instructions, :total_price, :currency, 
                'pending', NOW()
            )
        ");
        
        $stmt->execute([
            ':customer_name' => $orderData['customer_name'],
            ':customer_email' => $orderData['customer_email'],
            ':customer_phone' => $orderData['customer_phone'] ?? '',
            ':service_type' => $orderData['service_type'],
            ':assignment_type' => $orderData['assignment_type'],
            ':academic_level' => $orderData['academic_level'],
            ':pages' => $orderData['pages'],
            ':words' => $orderData['words'],
            ':deadline_date' => $orderData['deadline_date'],
            ':deadline_time' => $orderData['deadline_time'],
            ':subject' => $orderData['subject'] ?? '',
            ':instructions' => $orderData['instructions'] ?? '',
            ':total_price' => $orderData['total_price'],
            ':currency' => $orderData['currency']
        ]);
        
        $orderId = $pdo->lastInsertId();
        
        // Handle file uploads
        $uploadedFiles = [];
        if (!empty($_FILES['files'])) {
            $uploadDir = '../uploads/orders/';
            
            // Create upload directory if it doesn't exist
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }
            
            $fileCount = count($_FILES['files']['name']);
            
            for ($i = 0; $i < $fileCount; $i++) {
                if ($_FILES['files']['error'][$i] === UPLOAD_ERR_OK) {
                    $fileName = $_FILES['files']['name'][$i];
                    $fileTmpName = $_FILES['files']['tmp_name'][$i];
                    $fileSize = $_FILES['files']['size'][$i];
                    $fileType = $_FILES['files']['type'][$i];
                    
                    // Validate file size (10MB max)
                    if ($fileSize > 10 * 1024 * 1024) {
                        throw new Exception("File too large: $fileName");
                    }
                    
                    // Generate unique filename
                    $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);
                    $uniqueFileName = $orderId . '_' . time() . '_' . $i . '.' . $fileExtension;
                    $filePath = $uploadDir . $uniqueFileName;
                    
                    // Move uploaded file
                    if (move_uploaded_file($fileTmpName, $filePath)) {
                        // Insert file record into database
                        $fileStmt = $pdo->prepare("
                            INSERT INTO order_files (
                                order_id, original_filename, stored_filename, 
                                file_path, file_size, file_type, uploaded_at
                            ) VALUES (
                                :order_id, :original_filename, :stored_filename, 
                                :file_path, :file_size, :file_type, NOW()
                            )
                        ");
                        
                        $fileStmt->execute([
                            ':order_id' => $orderId,
                            ':original_filename' => $fileName,
                            ':stored_filename' => $uniqueFileName,
                            ':file_path' => $filePath,
                            ':file_size' => $fileSize,
                            ':file_type' => $fileType
                        ]);
                        
                        $uploadedFiles[] = [
                            'original_name' => $fileName,
                            'stored_name' => $uniqueFileName,
                            'size' => $fileSize
                        ];
                    } else {
                        throw new Exception("Failed to upload file: $fileName");
                    }
                }
            }
        }
        
        // Commit transaction
        $pdo->commit();
        
        echo json_encode([
            'success' => true,
            'order_id' => $orderId,
            'uploaded_files' => $uploadedFiles,
            'message' => 'Order created successfully' . (!empty($uploadedFiles) ? ' with ' . count($uploadedFiles) . ' file(s)' : '')
        ]);
        
    } catch (Exception $e) {
        // Rollback transaction
        if ($pdo->inTransaction()) {
            $pdo->rollback();
        }
        
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Only POST method allowed']);
}
?>