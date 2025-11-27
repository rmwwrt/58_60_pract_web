<?php
// Подключение к PostgreSQL
$host = 'localhost';
$db = 'shelter_db';
$user = 'postgres';
$password = 'password';
$port = 5432;

try {
    $pdo = new PDO(
        "pgsql:host=$host;port=$port;dbname=$db",
        $user,
        $password,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    die('Ошибка подключения: ' . $e->getMessage());
}

// Функция получения питомцев
function getPets($type = null, $ageFilter = null) {
    global $pdo;
    
    $query = 'SELECT * FROM pets WHERE 1=1';
    $params = [];
    
    if ($type) {
        $query .= ' AND type = ?';
        $params[] = $type;
    }
    
    if ($ageFilter) {
        if ($ageFilter === 'young') {
            $query .= ' AND age < 24';
        } elseif ($ageFilter === 'adult') {
            $query .= ' AND age >= 24 AND age < 60';
        } elseif ($ageFilter === 'senior') {
            $query .= ' AND age >= 60';
        }
    }
    
    $stmt = $pdo->prepare($query);
    $stmt->execute($params);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Функция получения питомца по ID
function getPetById($id) {
    global $pdo;
    
    $stmt = $pdo->prepare('SELECT * FROM pets WHERE id = ?');
    $stmt->execute([$id]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

// Функция добавления питомца
function addPet($name, $type, $age, $breed, $description, $character) {
    global $pdo;
    
    $stmt = $pdo->prepare(
        'INSERT INTO pets (name, type, age, breed, description, character) 
         VALUES (?, ?, ?, ?, ?, ?)'
    );
    
    return $stmt->execute([$name, $type, $age, $breed, $description, $character]);
}

// Функция обновления питомца
function updatePet($id, $name, $type, $age, $breed, $description, $character) {
    global $pdo;
    
    $stmt = $pdo->prepare(
        'UPDATE pets SET name=?, type=?, age=?, breed=?, description=?, character=? 
         WHERE id=?'
    );
    
    return $stmt->execute([$name, $type, $age, $breed, $description, $character, $id]);
}

// Функция удаления питомца
function deletePet($id) {
    global $pdo;
    
    $stmt = $pdo->prepare('DELETE FROM pets WHERE id = ?');
    return $stmt->execute([$id]);
}
?>
