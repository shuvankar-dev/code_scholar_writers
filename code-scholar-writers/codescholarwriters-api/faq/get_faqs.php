<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS headers
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
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

try {
    // Get query parameters
    $category = isset($_GET['category']) ? $_GET['category'] : null;
    $admin = isset($_GET['admin']) && $_GET['admin'] === 'true';
    
    // Base query
    $sql = "SELECT id, question, answer, category, display_order, is_active, created_at, updated_at FROM faqs";
    $params = [];
    
    // Add conditions
    $conditions = [];
    
    // If not admin request, only show active FAQs
    if (!$admin) {
        $conditions[] = "is_active = 1";
    }
    
    // Filter by category if specified
    if ($category && $category !== 'all') {
        $conditions[] = "category = ?";
        $params[] = $category;
    }
    
    // Add WHERE clause if we have conditions
    if (!empty($conditions)) {
        $sql .= " WHERE " . implode(" AND ", $conditions);
    }
    
    // Order by display_order and created_at
    $sql .= " ORDER BY display_order ASC, created_at DESC";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $faqs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Get categories for filtering
    $categoryStmt = $pdo->prepare("SELECT DISTINCT category FROM faqs WHERE is_active = 1 ORDER BY category");
    $categoryStmt->execute();
    $categories = $categoryStmt->fetchAll(PDO::FETCH_COLUMN);
    
    // Group FAQs by category for better organization
    $groupedFaqs = [];
    foreach ($faqs as $faq) {
        $cat = $faq['category'];
        if (!isset($groupedFaqs[$cat])) {
            $groupedFaqs[$cat] = [];
        }
        $groupedFaqs[$cat][] = $faq;
    }
    
    echo json_encode([
        'success' => true,
        'faqs' => $faqs,
        'grouped_faqs' => $groupedFaqs,
        'categories' => $categories,
        'total_count' => count($faqs)
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>