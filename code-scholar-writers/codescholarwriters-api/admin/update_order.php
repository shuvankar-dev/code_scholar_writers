<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, PUT');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

include_once '../config.php';

// Get the request method
$method = $_SERVER['REQUEST_METHOD'];

if ($method !== 'POST' && $method !== 'PUT') {
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// For now, we'll skip the admin session check since our frontend auth uses localStorage
// In a production environment, you'd want to implement proper token validation
// TODO: Implement proper token-based authentication

try {
    if (isset($input['action'])) {
        switch ($input['action']) {
            case 'update_single':
                // Update a single price
                if (!isset($input['price_key']) || !isset($input['price_value'])) {
                    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
                    exit;
                }
                
                $query = "UPDATE master_prices SET price_value = ?, updated_at = NOW() WHERE price_key = ?";
                $stmt = $pdo->prepare($query);
                $stmt->execute([$input['price_value'], $input['price_key']]);
                
                if ($stmt->rowCount() > 0) {
                    echo json_encode(['success' => true, 'message' => 'Price updated successfully']);
                } else {
                    echo json_encode(['success' => false, 'error' => 'Price not found or no changes made']);
                }
                break;
                
            case 'update_multiple':
                // Update multiple prices at once
                if (!isset($input['prices']) || !is_array($input['prices'])) {
                    echo json_encode(['success' => false, 'error' => 'Invalid prices data']);
                    exit;
                }
                
                $pdo->beginTransaction();
                $updated_count = 0;
                
                foreach ($input['prices'] as $price_update) {
                    if (isset($price_update['price_key']) && isset($price_update['price_value'])) {
                        $query = "UPDATE master_prices SET price_value = ?, updated_at = NOW() WHERE price_key = ?";
                        $stmt = $pdo->prepare($query);
                        $stmt->execute([$price_update['price_value'], $price_update['price_key']]);
                        $updated_count += $stmt->rowCount();
                    }
                }
                
                $pdo->commit();
                echo json_encode([
                    'success' => true, 
                    'message' => "$updated_count prices updated successfully"
                ]);
                break;
                
            case 'toggle_status':
                // Enable/disable a price
                if (!isset($input['price_key'])) {
                    echo json_encode(['success' => false, 'error' => 'Missing price_key']);
                    exit;
                }
                
                $query = "UPDATE master_prices SET is_active = NOT is_active, updated_at = NOW() WHERE price_key = ?";
                $stmt = $pdo->prepare($query);
                $stmt->execute([$input['price_key']]);
                
                echo json_encode(['success' => true, 'message' => 'Price status updated']);
                break;
                
            default:
                echo json_encode(['success' => false, 'error' => 'Invalid action']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'No action specified']);
    }
    
} catch (PDOException $e) {
    if (isset($pdo) && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    echo json_encode([
        'success' => false,
        'error' => 'Database error: ' . $e->getMessage()
    ]);
} catch (Exception $e) {
    if (isset($pdo) && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    echo json_encode([
        'success' => false,
        'error' => 'Server error: ' . $e->getMessage()
    ]);
}
?>