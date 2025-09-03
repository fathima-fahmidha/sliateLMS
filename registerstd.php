<?php
// Show all errors
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Database credentials
$host = "localhost";
$user = "root";
$pass = "";
$db = "lmsnew";

// Connect to database
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Only process if POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get input values
    $name = $_POST['name'];
    $sid = $_POST['position'];
    $email = $_POST['email'];
    $year = intval($_POST['year']);
    $password = $_POST['password'];
    $cPassword = $_POST['cPassword'];

    // Password match check
    if ($password !== $cPassword) {
        die("Error: Passwords do not match.");
    }

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Prepare SQL insert
    $stmt = $conn->prepare("INSERT INTO users (name, sid, email, year, password) VALUES (?, ?, ?, ?, ?)");

    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }

    // Bind parameters
    $stmt->bind_param("sssis", $name, $sid, $email, $year, $hashedPassword);

    // Execute and check
    if ($stmt->execute()) {
    // Redirect to login page
    header("Location: login.html?registered=1");
    exit();
    }
    } else {
        echo "Error executing query: " . $stmt->error;
    }

    // Close everything
    $stmt->close();
    $conn->close();

?>
