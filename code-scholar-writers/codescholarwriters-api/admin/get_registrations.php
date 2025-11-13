<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit();
}

require_once '../config.php';

try {
    // Get pagination parameters
    $page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
    $limit = isset($_GET['limit']) ? max(1, min(100, intval($_GET['limit']))) : 20;
    $offset = ($page - 1) * $limit;
    
    // Get search parameter
    $search = isset($_GET['search']) ? trim($_GET['search']) : '';
    
    // Get status filter
    $status = isset($_GET['status']) ? $_GET['status'] : '';
    
    // Start building the query
    $whereClause = '';
    $params = [];
    
    // Add search conditions
    if (!empty($search)) {
        $whereClause = "WHERE (first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR COALESCE(phone, '') LIKE ?)";
        $searchTerm = "%$search%";
        $params = [$searchTerm, $searchTerm, $searchTerm, $searchTerm];
        
        // Add status filter if provided
        if (!empty($status)) {
            $whereClause .= " AND status = ?";
            $params[] = $status;
        }
    } else if (!empty($status)) {
        $whereClause = "WHERE status = ?";
        $params = [$status];
    }
    
    // Get total count
    $countQuery = "SELECT COUNT(*) as total FROM user_registrations $whereClause";
    $countStmt = $pdo->prepare($countQuery);
    $countStmt->execute($params);
    $totalRecords = $countStmt->fetch()['total'];
    
    // Get registrations with pagination
    $query = "SELECT 
        id,
        first_name,
        last_name,
        email,
        phone,
        registration_type,
        status,
        email_verified,
        created_at,
        updated_at
    FROM user_registrations 
    $whereClause
    ORDER BY created_at DESC 
    LIMIT $offset, $limit";
    
    $stmt = $pdo->prepare($query);
    $stmt->execute($params);
    $registrations = $stmt->fetchAll();
    
    // Calculate pagination info
    $totalPages = ceil($totalRecords / $limit);
    
    echo json_encode([
        'success' => true,
        'data' => [
            'registrations' => $registrations,
            'pagination' => [
                'current_page' => $page,
                'total_pages' => $totalPages,
                'total_records' => $totalRecords,
                'per_page' => $limit,
                'has_next' => $page < $totalPages,
                'has_prev' => $page > 1
            ]
        ]
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'debug' => [
            'line' => $e->getLine(),
            'file' => $e->getFile()
        ]
    ]);
}
?>