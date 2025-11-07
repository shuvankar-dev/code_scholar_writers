<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

try {
    // Gett optional filters from query parameters
    $status = $_GET['status'] ?? null;
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 50;
    $offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;
    
    // Base query
    $sql = "SELECT 
                id, order_id, customer_name, customer_email, customer_phone,
                service_type, assignment_type, academic_level, pages, words,
                deadline_date, deadline_time, subject, instructions,
                total_price, currency, status, payment_status,
                created_at, updated_at
            FROM orders";
    
    $params = [];
    
    // Add status filter if provided
    if ($status && in_array($status, ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'])) {
        $sql .= " WHERE status = ?";
        $params[] = $status;
    }
    
    // Add ordering
    $sql .= " ORDER BY created_at DESC";
    
    // For pagination, we'll use a different approach
    if ($limit > 0) {
        $sql .= " LIMIT " . $limit;
        if ($offset > 0) {
            $sql .= " OFFSET " . $offset;
        }
    }
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Get total count for pagination
    $countSql = "SELECT COUNT(*) as total FROM orders";
    $countParams = [];
    
    if ($status && in_array($status, ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'])) {
        $countSql .= " WHERE status = ?";
        $countParams[] = $status;
    }
    
    $countStmt = $pdo->prepare($countSql);
    $countStmt->execute($countParams);
    $totalCount = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];
    
    // Format the response
    echo json_encode([
        'success' => true,
        'orders' => $orders,
        'pagination' => [
            'total' => (int)$totalCount,
            'limit' => $limit,
            'offset' => $offset,
            'has_more' => ($offset + $limit) < $totalCount
        ]
    ]);
    
} catch (Exception $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>