document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname.replace(/\/[^/]*$/, ''); // Remove file name if present
    const repoName = currentPath.split('/').filter(Boolean)[0]; // Get the repo name
    const adjustedPath = window.location.pathname.replace(`/${repoName}`, ''); // Adjust for repo name

    const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .dropdown-menu .dropdown-item');

    navLinks.forEach(link => {
        let linkPath = link.getAttribute('href');
        // Add leading slash if missing
        if (!linkPath.startsWith('/')) {
            linkPath = '/' + linkPath;
        }
        // Adjust for GitHub Pages' path structure
        if (adjustedPath === linkPath || adjustedPath.startsWith(linkPath.split('#')[0])) {
            link.classList.add('active');
            // Add active class to the parent dropdown for dropdown items
            if (link.closest('.dropdown-menu')) {
                link.closest('.dropdown').querySelector('.nav-link').classList.add('active');
            }
        }
    });
});



// ==============================================================================================================================================


function validate() {
    // Form Input Elements
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const mail = document.getElementById("mail").value;
    const mobile = document.getElementById("mobile").value;

    // Error Message Elements
    const nameError = document.getElementById("nameError");
    const nameError2 = document.getElementById("nameError2");
    const mailError = document.getElementById("mailError");
    const mobileError = document.getElementById("mobileError");

    // Validation Status Flags
    let fnameStatus = false;
    let lnameStatus = false;
    let mailStatus = false;
    let mobileStatus = false;

    // Regular Expression for Email and Phone Validation
    const alpExp = /^[a-zA-Z ]+$/; 
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phonePattern = /^\d{10}$/;

    // First Name Validation
    if (fname === "") {
        nameError.textContent = "First name cannot be empty";
    } else if (fname.match(alpExp)) {
        nameError.textContent = "";
        fnameStatus = true;
    } else {
        nameError.textContent = "First name can only contain letters and spaces";
    }

    // Last Name Validation
    if (lname === "") {
        nameError2.textContent = "Last name cannot be empty";
    } else if (lname.match(alpExp)) {
        nameError2.textContent = "";
        lnameStatus = true;
    } else {
        nameError2.textContent = "Last name can only contain letters and spaces";
    }

    // Email Validation
    if (mail === "") {
        mailError.textContent = "Email cannot be empty";
    } else if (mail.match(emailPattern)) {
        mailError.textContent = "";
        mailStatus = true;
    } else {
        mailError.textContent = "Please enter a valid email address";
    }

    // Phone Number Validation
    if (mobile === "") {
        mobileError.textContent = "Phone number cannot be empty";
    } else if (!phonePattern.test(mobile)) {
        mobileError.textContent = "Please enter a valid 10-digit phone number";
    } else {
        mobileError.textContent = "";
        mobileStatus = true;
    }

    // Return overall validation status
    return fnameStatus && lnameStatus && mailStatus && mobileStatus;
}



// ===========================================================================================================================================
