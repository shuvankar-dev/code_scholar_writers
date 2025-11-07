<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config.php';

try {
    // Get all active master prices
    $query = "SELECT * FROM master_prices WHERE is_active = 1 ORDER BY price_type, price_key";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $prices = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Organize prices by type for easier frontend consumption
    $organized_prices = [
        'base' => [],
        'academic_level' => [],
        'urgency' => [],
        'addon' => [],
        'tool' => []
    ];
    
    foreach ($prices as $price) {
        $type = $price['price_type'];
        if (isset($organized_prices[$type])) {
            $organized_prices[$type][] = $price;
        }
    }
    
    echo json_encode([
        'success' => true,
        'prices' => $organized_prices,
        'all_prices' => $prices // Also send raw data for admin interface
    ]);
    
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Database error: ' . $e->getMessage()
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Server error: ' . $e->getMessage()
    ]);
}
?>