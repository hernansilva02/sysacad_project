<?php

class Connection {
    
    public function __construct(private string $host, private string $user, private string $password, private string $dbname) {}

    public function getConnection(): PDO {
        $database = "mysql:host={$this->host};dbname={$this->dbname}";
        try {
            $pdo = new PDO($database, $this->user, $this->password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $pdo;
        } catch (PDOException $e) {
            echo $e->getMessage();
            echo "\n";
        }
    }
}
