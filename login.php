<?php
// Start session
session_start();

// Check if form was submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $SID = $_POST['SID'] ?? '';
    $password = $_POST['password'] ?? '';

    // Validate inputs
    if (empty($SID) || empty($password)) {
        die(json_encode(['error' => 'Please fill in all fields']));
    }

    // Connect to database
    $con = mysqli_connect("localhost","root","","lmsnew");
    if (!$con) {
        die(json_encode(['error' => 'Database connection failed']));
    }

    // Check if SID already exists
    $check = mysqli_query($con, "SELECT * FROM login_form WHERE SID = '".mysqli_real_escape_string($con, $SID)."'");
    if (mysqli_num_rows($check) > 0) {
        die(json_encode(['error' => 'Student ID already exists']));
    }

    // Insert new record
    $res = mysqli_query($con, "INSERT INTO login_form VALUES('".mysqli_real_escape_string($con, $SID)."', '".mysqli_real_escape_string($con, $password)."')");

    if ($res) {
        $_SESSION['SID'] = $SID;
        echo json_encode(['success' => 'Registration successful! Redirecting...']);
        header("refresh:2; url=home.html");
    } else {
        echo json_encode(['error' => 'Registration failed: '.mysqli_error($con)]);
    }

    mysqli_close($con);
} else {
    // Redirect if accessed directly
    header("Location: Login.html");
    exit();
}
?>