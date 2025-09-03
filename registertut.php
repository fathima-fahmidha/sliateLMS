<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$conn = new mysqli("localhost", "root", "", "lmsnew");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $Tid = $_POST['Tid'];
    $email = $_POST['email'];
    $position = $_POST['position'];
    $password = $_POST['password'];
    $cPassword = $_POST['cPassword'];

    if ($password !== $cPassword) {
        die("Error: Passwords do not match.");
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Correct column order to match your table
    $stmt = $conn->prepare("INSERT INTO registertutor (name, Tid, email, position, password) VALUES (?, ?, ?, ?, ?)");
    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("sssss", $name, $Tid, $email, $position, $hashedPassword);

    if ($stmt->execute()) {
        header("Location: login.html?registered=1");
        exit();
    } else {
        echo "❌ Error executing query: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>

