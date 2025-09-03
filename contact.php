<?php
$server = "localhost";
$username = "root";
$password = "";
$database = "lmsnew";

$conn = mysqli_connect($server, $username, $password, $database);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $regno = $_POST['regno'];
    $message = $_POST['msg'];

    $query = "INSERT INTO contact_messages (name, email, regno, message) VALUES ('$name', '$email', '$regno', '$message')";

    if (mysqli_query($conn, $query)) {
        echo "Message sent successfully!";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}


?>