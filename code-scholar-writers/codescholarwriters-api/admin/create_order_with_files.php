<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Get order data from POST
        $orderDataJson = $_POST['order_data'] ?? '';
        
        if (empty($orderDataJson)) {
            echo json_encode(['success' => false, 'error' => 'Order data is required']);
            exit;
        }
        
        $orderData = json_decode($orderDataJson, true);
        
        if (!$orderData) {
            echo json_encode(['success' => false, 'error' => 'Invalid order data format']);
            exit;
        }
        
        // Start transaction
        $pdo->beginTransaction();
        
        // First, get the next auto-increment value to generate order_id
        $result = $pdo->query("SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'orders'")->fetch();
        $nextId = $result['AUTO_INCREMENT'];
        $formattedOrderId = 'ORD-' . date('Y') . str_pad($nextId, 6, '0', STR_PAD_LEFT);
        
        // Insert order into database with order_id
        $stmt = $pdo->prepare("
            INSERT INTO orders (
                order_id, customer_name, customer_email, customer_phone, 
                service_type, assignment_type, academic_level, 
                pages, words, deadline_date, deadline_time, 
                subject, instructions, total_price, currency, 
                status, payment_status, created_at, updated_at
            ) VALUES (
                :order_id, :customer_name, :customer_email, :customer_phone,
                :service_type, :assignment_type, :academic_level,
                :pages, :words, :deadline_date, :deadline_time,
                :subject, :instructions, :total_price, :currency,
                'pending', 'unpaid', NOW(), NOW()
            )
        ");
        
        $stmt->execute([
            ':order_id' => $formattedOrderId,
            ':customer_name' => $orderData['customer_name'],
            ':customer_email' => $orderData['customer_email'],
            ':customer_phone' => $orderData['customer_phone'] ?? '',
            ':service_type' => $orderData['service_type'],
            ':assignment_type' => $orderData['assignment_type'] ?? '',
            ':academic_level' => $orderData['academic_level'] ?? '',
            ':pages' => $orderData['pages'] ?? 0,
            ':words' => $orderData['words'] ?? 0,
            ':deadline_date' => $orderData['deadline_date'],
            ':deadline_time' => $orderData['deadline_time'],
            ':subject' => $orderData['subject'] ?? '',
            ':instructions' => $orderData['instructions'] ?? '',
            ':total_price' => $orderData['total_price'],
            ':currency' => $orderData['currency'] ?? 'INR'
        ]);
        
        // Get the inserted order ID (numeric)
        $numericOrderId = $pdo->lastInsertId();
        
        // Handle file uploads if any
        $uploadedFiles = [];
        if (isset($_FILES['files']) && !empty($_FILES['files']['name'][0])) {
            $uploadDir = '../uploads/';
            
            // Create upload directory if it doesn't exist
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }
            
            $fileCount = count($_FILES['files']['name']);
            
            for ($i = 0; $i < $fileCount; $i++) {
                if ($_FILES['files']['error'][$i] === UPLOAD_ERR_OK) {
                    $originalName = $_FILES['files']['name'][$i];
                    $tempPath = $_FILES['files']['tmp_name'][$i];
                    $fileSize = $_FILES['files']['size'][$i];
                    $fileType = $_FILES['files']['type'][$i];
                    
                    // Generate unique filename
                    $extension = pathinfo($originalName, PATHINFO_EXTENSION);
                    $storedFilename = uniqid() . '_' . time() . '.' . $extension;
                    $targetPath = $uploadDir . $storedFilename;
                    
                    // Move uploaded file
                    if (move_uploaded_file($tempPath, $targetPath)) {
                        // Save file info to database
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
                            ':order_id' => $numericOrderId,
                            ':original_filename' => $originalName,
                            ':stored_filename' => $storedFilename,
                            ':file_path' => $targetPath,
                            ':file_size' => $fileSize,
                            ':file_type' => $fileType
                        ]);
                        
                        $uploadedFiles[] = [
                            'original_name' => $originalName,
                            'stored_name' => $storedFilename,
                            'size' => $fileSize
                        ];
                    }
                }
            }
        }
        
        // Commit transaction
        $pdo->commit();
        
        echo json_encode([
            'success' => true,
            'message' => 'Order created successfully',
            'order_id' => $formattedOrderId,
            'numeric_id' => $numericOrderId,
            'uploaded_files' => $uploadedFiles,
            'file_count' => count($uploadedFiles)
        ]);
        
    } catch (Exception $e) {
        // Rollback transaction on error
        $pdo->rollback();
        echo json_encode([
            'success' => false,
            'error' => 'Failed to create order: ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Only POST method allowed for creating orders']);
}
?>