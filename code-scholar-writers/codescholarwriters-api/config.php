<?php
class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    public $conn;

    public function __construct() {
        // Detect environment (local vs production)
        $isLocal = $_SERVER['HTTP_HOST'] === 'localhost' || 
                   $_SERVER['HTTP_HOST'] === '127.0.0.1' ||
                   strpos($_SERVER['HTTP_HOST'], 'localhost') !== false;

        if ($isLocal) {
            // Local XAMPP settings
            $this->host = 'localhost';
            $this->db_name = 'codescholarwriters';
            $this->username = 'root';
            $this->password = '';
        } else {
            // Production settings (Hostinger)
            $this->host = 'localhost';
            $this->db_name = 'u817404388_codewriters_db';
            $this->username = 'u817404388_codewriters_us';
            $this->password = '8e#RgG>oN';
        }
    }

    public function getConnection() {
        if ($this->conn === null) {
            try {
                $dsn = "mysql:host={$this->host};dbname={$this->db_name};charset=utf8mb4";
                $this->conn = new PDO($dsn, $this->username, $this->password);
                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                throw new Exception('Database connection failed: ' . $e->getMessage());
            }
        }
        return $this->conn;
    }

    public function closeConnection() {
        $this->conn = null;
    }
}

// Global PDO instance for backward compatibility (if needed)
try {
    $db = new Database();
    $pdo = $db->getConnection();
} catch (Exception $e) {
    http_response_code(500);
    if (headers_sent() === false) {
        header('Content-Type: application/json');
    }
    echo json_encode([
        'success' => false,
        'error' => 'Database connection failed: ' . $e->getMessage()
    ]);
    exit();
}
?>