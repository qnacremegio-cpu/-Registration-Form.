document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Password Toggle Logic ---
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');

    if (togglePassword && password) {
        togglePassword.addEventListener('click', function() {
            // Toggle the type attribute
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);

            // Toggle the eye icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // --- 2. Registration Form Validation ---
    const regForm = document.getElementById('regForm');

    if (regForm) {
        regForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent page reload

            let isValid = true;

            // Reset Errors & Styles
            document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.form-control').forEach(el => el.classList.remove('is-invalid'));

            // 1. First Name Validation
            const firstName = document.getElementById('firstName');
            const nameRegex = /^[A-Za-z]+$/;
            if (!nameRegex.test(firstName.value.trim())) {
                showError('firstName', 'firstName');
                isValid = false;
            }

            // 2. Last Name Validation
            const lastName = document.getElementById('lastName');
            if (!nameRegex.test(lastName.value.trim())) {
                showError('lastName', 'lastName');
                isValid = false;
            }

            // 3. Username Validation
            const username = document.getElementById('username');
            if (username.value.trim() === "") {
                showError('username', 'username');
                isValid = false;
            }

            // 4. Date of Birth Validation
            const dob = document.getElementById('dob');
            if (dob.value.trim() === "") {
                showError('dob', 'dob');
                isValid = false;
            }

            // 5. Email Validation
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                showError('email', 'email');
                isValid = false;
            }

            // 6. Contact Number Validation
            const contact = document.getElementById('contact');
            const phoneRegex = /^[0-9]+$/; // Checks for numbers only
            if (!phoneRegex.test(contact.value.trim()) || contact.value.length < 10) {
                showError('contact', 'contact');
                isValid = false;
            }

            // 7. Password Validation
            if (password.value.length < 6) {
                showError('password', 'password');
                isValid = false;
            }

            // 8. Terms Checkbox Validation
            const terms = document.getElementById('terms');
            if (!terms.checked) {
                const termsError = document.getElementById('error-terms');
                if(termsError) termsError.style.display = 'block';
                isValid = false;
            }

            // --- FINAL CHECK: SHOW SUCCESS MODAL ---
            if (isValid) {
                // Instead of alert, we show the Bootstrap Modal
                const successModal = new bootstrap.Modal(document.getElementById('successModal'));
                successModal.show();
                
                // Optional: Clear the form fields after success
                regForm.reset();
            }
        });
    }

    // --- 3. Modal "Accept Terms" Logic ---
    const acceptTermsBtn = document.getElementById('acceptTermsBtn');
    
    if (acceptTermsBtn) {
        acceptTermsBtn.addEventListener('click', function() {
            const termsCheckbox = document.getElementById('terms');
            const termsError = document.getElementById('error-terms');
            
            if(termsCheckbox) {
                termsCheckbox.checked = true;
            }
            
            if(termsError) {
                termsError.style.display = 'none';
            }
        });
    }

    // --- 4. Background Music Logic ---
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    const musicIcon = document.getElementById('musicIcon');

    if (musicBtn && bgMusic) {
        // Set volume to 50% so it's not too loud
        bgMusic.volume = 0.5;

        musicBtn.addEventListener('click', function() {
            if (bgMusic.paused) {
                bgMusic.play();
                musicIcon.classList.remove('fa-play');
                musicIcon.classList.add('fa-pause');
                this.classList.add('playing'); // Optional: for extra CSS styling
            } else {
                bgMusic.pause();
                musicIcon.classList.remove('fa-pause');
                musicIcon.classList.add('fa-play');
                this.classList.remove('playing');
            }
        });
    }

    // --- Helper Function ---
    function showError(inputId, errorId) {
        const errorElement = document.getElementById('error-' + errorId);
        const inputElement = document.getElementById(inputId);

        if (errorElement && inputElement) {
            errorElement.style.display = 'block';
            inputElement.classList.add('is-invalid');
        }
    }

});