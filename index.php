<?php
header('Acces-Control-Allow-Origin: *');
header('Acces-Control-Allow-Credentials: true');


require_once __DIR__ . '/dbconf.php';
require_once __DIR__ . '/src/Connection.php';

$database = new Connection($conf['host'], $conf['user'], $conf['password'], $conf['dbname']);
$pdo = $database->getConnection();

 //try {
 //    $pdo = new PDO("mysql:host={$conf['host']};dbname={$conf['dbname']}", $conf['user'], $conf['password']);
 //    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 //} catch(PDOException $e) {
 //    echo $e->getMessage();
 //    echo "\n";
 //}

if(isset($_POST)) {
    $data = file_get_contents('php://input');
    $formatedData = json_decode($data, true);
    try {
        $stmt = $pdo->prepare("SELECT password FROM sysacad.alumnos WHERE legajo = :legajo");
        $stmt->execute(['legajo' => $formatedData['legajo']]);
        $legajo_passwd = $stmt->fetch();
    } catch(PDOException $e) {
        echo $e->getMessage();
        echo "\n";
    }
    if($legajo_passwd && password_verify($formatedData['password'], $legajo_passwd['password'])) {
        $valor = true;
        echo json_encode($valor);
    }
    else {
        $valor = false;
        echo json_encode($valor);
    }
}
