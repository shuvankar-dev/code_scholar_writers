<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

include_once 'config.php';

try {
    // Build the base query
    $query = "SELECT * FROM blogs";
    $conditions = [];
    $params = [];
    
    // Check if admin parameter is provided (for admin view - includes drafts)
    $is_admin = isset($_GET['admin']) && $_GET['admin'] === 'true';
    
    if (!$is_admin) {
        // Public view - only show published blogs
        $conditions[] = "status = 'published'";
    }
    
    // Search functionality
    if (isset($_GET['search']) && !empty($_GET['search'])) {
        $search = '%' . $_GET['search'] . '%';
        $conditions[] = "(title LIKE ? OR content LIKE ? OR excerpt LIKE ?)";
        $params[] = $search;
        $params[] = $search;
        $params[] = $search;
    }
    
    // Category filter
    if (isset($_GET['category']) && !empty($_GET['category'])) {
        $conditions[] = "category = ?";
        $params[] = $_GET['category'];
    }
    
    // Featured filter
    if (isset($_GET['featured']) && $_GET['featured'] === 'true') {
        $conditions[] = "featured = 1";
    }
    
    // Add conditions to query if any exist
    if (!empty($conditions)) {
        $query .= " WHERE " . implode(" AND ", $conditions);
    }
    
    // Default ordering
    $query .= " ORDER BY created_at DESC";
    
    // Pagination - use LIMIT start, count syntax for better MySQL compatibility
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
    $offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;
    $query .= " LIMIT $offset, $limit";
    
    $stmt = $pdo->prepare($query);
    $stmt->execute($params);
    $blogs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Get total count for pagination
    $countQuery = "SELECT COUNT(*) as total FROM blogs";
    $countConditions = [];
    $countParams = [];
    
    if (!$is_admin) {
        $countConditions[] = "status = 'published'";
    }
    
    if (isset($_GET['search']) && !empty($_GET['search'])) {
        $search = '%' . $_GET['search'] . '%';
        $countConditions[] = "(title LIKE ? OR content LIKE ? OR excerpt LIKE ?)";
        $countParams[] = $search;
        $countParams[] = $search;
        $countParams[] = $search;
    }
    
    if (isset($_GET['category']) && !empty($_GET['category'])) {
        $countConditions[] = "category = ?";
        $countParams[] = $_GET['category'];
    }
    
    if (isset($_GET['featured']) && $_GET['featured'] === 'true') {
        $countConditions[] = "featured = 1";
    }
    
    if (!empty($countConditions)) {
        $countQuery .= " WHERE " . implode(" AND ", $countConditions);
    }
    
    $countStmt = $pdo->prepare($countQuery);
    $countStmt->execute($countParams);
    $totalBlogs = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];
    
    // Get categories for filter
    $categoriesQuery = "SELECT DISTINCT category FROM blogs WHERE status = 'published' ORDER BY category";
    $categoriesStmt = $pdo->prepare($categoriesQuery);
    $categoriesStmt->execute();
    $categories = $categoriesStmt->fetchAll(PDO::FETCH_COLUMN);
    
    echo json_encode([
        'success' => true,
        'blogs' => $blogs,
        'total' => (int)$totalBlogs,
        'limit' => $limit,
        'offset' => $offset,
        'categories' => $categories
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Database error: ' . $e->getMessage()
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Error: ' . $e->getMessage()
    ]);
}
?>