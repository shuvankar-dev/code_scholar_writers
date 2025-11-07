<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS headers
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
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
if (!isset($data['action'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Missing required field: action'
    ]);
    exit();
}

try {
    if ($data['action'] === 'update_single') {
        // Update single price
        if (!isset($data['price_key']) || !isset($data['price_value'])) {
            throw new Exception('Missing required fields: price_key and price_value');
        }

        $stmt = $pdo->prepare("
            UPDATE master_prices 
            SET price_value = ?, updated_at = CURRENT_TIMESTAMP 
            WHERE price_key = ?
        ");
        
        $success = $stmt->execute([
            $data['price_value'],
            $data['price_key']
        ]);

        if (!$success) {
            throw new Exception('Failed to update price in database');
        }

        $rowsAffected = $stmt->rowCount();
        if ($rowsAffected === 0) {
            throw new Exception('Price key not found: ' . $data['price_key']);
        }

        echo json_encode([
            'success' => true,
            'message' => 'Price updated successfully',
            'updated_key' => $data['price_key'],
            'new_value' => $data['price_value']
        ]);

    } elseif ($data['action'] === 'update_all') {
        // Update multiple prices
        if (!isset($data['prices']) || !is_array($data['prices'])) {
            throw new Exception('Missing or invalid prices array');
        }

        $pdo->beginTransaction();
        
        try {
            $stmt = $pdo->prepare("
                UPDATE master_prices 
                SET price_value = ?, updated_at = CURRENT_TIMESTAMP 
                WHERE price_key = ?
            ");

            $updated_count = 0;
            foreach ($data['prices'] as $price_update) {
                if (!isset($price_update['price_key']) || !isset($price_update['price_value'])) {
                    throw new Exception('Invalid price update format');
                }

                $success = $stmt->execute([
                    $price_update['price_value'],
                    $price_update['price_key']
                ]);

                if (!$success) {
                    throw new Exception('Failed to update price: ' . $price_update['price_key']);
                }

                $updated_count += $stmt->rowCount();
            }

            $pdo->commit();

            echo json_encode([
                'success' => true,
                'message' => 'All prices updated successfully',
                'updated_count' => $updated_count
            ]);

        } catch (Exception $e) {
            $pdo->rollBack();
            throw $e;
        }

    } else {
        throw new Exception('Invalid action: ' . $data['action']);
    }

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>