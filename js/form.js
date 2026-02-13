// Form Validation for Signup Page

document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    
    // Check if there's a preferred role from URL or session
    const urlParams = new URLSearchParams(window.location.search);
    const roleFromUrl = urlParams.get('role');
    const roleFromSession = sessionStorage.getItem('preferredRole');
    
    if (roleFromUrl) {
        setRole(roleFromUrl);
    } else if (roleFromSession) {
        setRole(roleFromSession);
        sessionStorage.removeItem('preferredRole');
    }
});

function initializeForm() {
    const form = document.getElementById('signupForm');
    const roleButtons = document.querySelectorAll('.role-option');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const submitBtn = document.getElementById('submitBtn');
    
    if (!form) return;
    
    // Role selection
    roleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const role = this.getAttribute('data-role');
            setRole(role);
        });
    });
    
    // Password toggle
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }
    
    // Real-time password validation
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            validatePassword(this.value);
        });
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitForm();
            }, 1500);
        }
    });
    
    // Real-time validation on blur
    const inputs = form.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

function setRole(role) {
    const roleButtons = document.querySelectorAll('.role-option');
    const roleInput = document.getElementById('userRole');
    
    roleButtons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('data-role') === role) {
            button.classList.add('active');
        }
    });
    
    if (roleInput) {
        roleInput.value = role;
    }
    
    console.log(`Role set to: ${role}`);
}

function validateField(field) {
    const value = field.value.trim();
    const fieldId = field.id;
    const errorElement = document.getElementById(`${fieldId}Error`);
    
    // Clear previous error
    field.classList.remove('error');
    if (errorElement) {
        errorElement.textContent = '';
    }
    
    // Validation rules
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldId) {
        case 'fullName':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters';
            } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                isValid = false;
                errorMessage = 'Name can only contain letters and spaces';
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
            
        case 'phone':
            const phoneRegex = /^[\d\s\-\(\)]+$/;
            if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 7) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
            break;
            
        case 'city':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Please enter a valid city name';
            }
            break;
            
        case 'password':
            isValid = validatePassword(value).isValid;
            if (!isValid) {
                errorMessage = 'Password does not meet requirements';
            }
            break;
    }
    
    if (!isValid) {
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = errorMessage;
        }
    }
    
    return isValid;
}

function validatePassword(password) {
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        number: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    // Update UI
    Object.keys(requirements).forEach(req => {
        const element = document.getElementById(`req-${req}`);
        if (element) {
            if (requirements[req]) {
                element.classList.add('valid');
            } else {
                element.classList.remove('valid');
            }
        }
    });
    
    const isValid = Object.values(requirements).every(Boolean);
    
    return {
        isValid,
        requirements
    };
}

function validateForm() {
    const form = document.getElementById('signupForm');
    const inputs = form.querySelectorAll('input[required]');
    const termsCheckbox = document.getElementById('terms');
    const termsError = document.getElementById('termsError');
    
    let isValid = true;
    
    // Clear all errors
    inputs.forEach(input => {
        input.classList.remove('error');
        const errorElement = document.getElementById(`${input.id}Error`);
        if (errorElement) errorElement.textContent = '';
    });
    
    if (termsError) termsError.textContent = '';
    
    // Validate each field
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    // Validate terms
    if (!termsCheckbox.checked) {
        isValid = false;
        if (termsError) {
            termsError.textContent = 'You must agree to the terms and conditions';
        }
    }
    
    return isValid;
}

function submitForm() {
    const form = document.getElementById('signupForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // In a real app, you would send this to your backend
    console.log('Form data:', data);
    
    // For demo purposes, simulate successful submission
    showSuccessMessage();
    
    // Store in localStorage for demo (in real app, this would be on server)
    localStorage.setItem('propAIty_userData', JSON.stringify({
        ...data,
        signupDate: new Date().toISOString(),
        status: 'pending_verification'
    }));
    
    // Redirect to success page after delay
    setTimeout(() => {
        window.location.href = 'success.html';
    }, 2000);
}

function showSuccessMessage() {
    const form = document.getElementById('signupForm');
    const successMessage = document.getElementById('successMessage');
    
    if (form && successMessage) {
        form.classList.add('hidden');
        successMessage.classList.remove('hidden');
    }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateField,
        validatePassword,
        validateForm,
        setRole
    };
}// Form Validation for Signup Page

document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    
    // Check if there's a preferred role from URL or session
    const urlParams = new URLSearchParams(window.location.search);
    const roleFromUrl = urlParams.get('role');
    const roleFromSession = sessionStorage.getItem('preferredRole');
    
    if (roleFromUrl) {
        setRole(roleFromUrl);
    } else if (roleFromSession) {
        setRole(roleFromSession);
        sessionStorage.removeItem('preferredRole');
    }
});

function initializeForm() {
    const form = document.getElementById('signupForm');
    const roleButtons = document.querySelectorAll('.role-option');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const submitBtn = document.getElementById('submitBtn');
    
    if (!form) return;
    
    // Role selection
    roleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const role = this.getAttribute('data-role');
            setRole(role);
        });
    });
    
    // Password toggle
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }
    
    // Real-time password validation
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            validatePassword(this.value);
        });
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitForm();
            }, 1500);
        }
    });
    
    // Real-time validation on blur
    const inputs = form.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

function setRole(role) {
    const roleButtons = document.querySelectorAll('.role-option');
    const roleInput = document.getElementById('userRole');
    
    roleButtons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('data-role') === role) {
            button.classList.add('active');
        }
    });
    
    if (roleInput) {
        roleInput.value = role;
    }
    
    console.log(`Role set to: ${role}`);
}

function validateField(field) {
    const value = field.value.trim();
    const fieldId = field.id;
    const errorElement = document.getElementById(`${fieldId}Error`);
    
    // Clear previous error
    field.classList.remove('error');
    if (errorElement) {
        errorElement.textContent = '';
    }
    
    // Validation rules
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldId) {
        case 'fullName':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters';
            } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                isValid = false;
                errorMessage = 'Name can only contain letters and spaces';
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
            
        case 'phone':
            const phoneRegex = /^[\d\s\-\(\)]+$/;
            if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 7) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
            break;
            
        case 'city':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Please enter a valid city name';
            }
            break;
            
        case 'password':
            isValid = validatePassword(value).isValid;
            if (!isValid) {
                errorMessage = 'Password does not meet requirements';
            }
            break;
    }
    
    if (!isValid) {
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = errorMessage;
        }
    }
    
    return isValid;
}

function validatePassword(password) {
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        number: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    // Update UI
    Object.keys(requirements).forEach(req => {
        const element = document.getElementById(`req-${req}`);
        if (element) {
            if (requirements[req]) {
                element.classList.add('valid');
            } else {
                element.classList.remove('valid');
            }
        }
    });
    
    const isValid = Object.values(requirements).every(Boolean);
    
    return {
        isValid,
        requirements
    };
}

function validateForm() {
    const form = document.getElementById('signupForm');
    const inputs = form.querySelectorAll('input[required]');
    const termsCheckbox = document.getElementById('terms');
    const termsError = document.getElementById('termsError');
    
    let isValid = true;
    
    // Clear all errors
    inputs.forEach(input => {
        input.classList.remove('error');
        const errorElement = document.getElementById(`${input.id}Error`);
        if (errorElement) errorElement.textContent = '';
    });
    
    if (termsError) termsError.textContent = '';
    
    // Validate each field
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    // Validate terms
    if (!termsCheckbox.checked) {
        isValid = false;
        if (termsError) {
            termsError.textContent = 'You must agree to the terms and conditions';
        }
    }
    
    return isValid;
}

function submitForm() {
    const form = document.getElementById('signupForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // In a real app, you would send this to your backend
    console.log('Form data:', data);
    
    // For demo purposes, simulate successful submission
    showSuccessMessage();
    
    // Store in localStorage for demo (in real app, this would be on server)
    localStorage.setItem('propAIty_userData', JSON.stringify({
        ...data,
        signupDate: new Date().toISOString(),
        status: 'pending_verification'
    }));
    
    // Redirect to success page after delay
    setTimeout(() => {
        window.location.href = 'success.html';
    }, 2000);
}

function showSuccessMessage() {
    const form = document.getElementById('signupForm');
    const successMessage = document.getElementById('successMessage');
    
    if (form && successMessage) {
        form.classList.add('hidden');
        successMessage.classList.remove('hidden');
    }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateField,
        validatePassword,
        validateForm,
        setRole
    };
}