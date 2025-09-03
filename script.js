document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.querySelector("[name='email']").value;
    const password = document.querySelector("[name='password']").value;
    const confirmPassword = document.querySelector("[name='cPassword']").value;

    // Email validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        alert("Invalid email format!");
        return;
    }

    // Password validation (at least 8 characters)
    if (password.length < 8) {
        alert("Password must be at least 8 characters!");
        return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // If everything is valid, submit the form
    this.submit();
});

