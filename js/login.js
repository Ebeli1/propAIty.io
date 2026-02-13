// Login Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeLoginPage();
});

function initializeLoginPage() {
    const loginForm = document.getElementById('loginForm');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('loginPassword');
    const loginBtn = document.getElementById('loginBtn');
    const forgotPasswordLink = document.querySelector('.forgot-password');
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const closeModalBtn = document.getElementById('closeModal');
    const sendResetBtn = document.getElementById('sendResetBtn');
    const demoLoginBtn = document.getElementById('demoLoginBtn');
    const googleLoginBtn = document.getElementById('googleLoginBtn');
    
    // Password toggle
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }
    
    // Form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateLoginForm()) {
                // Show loading state
                loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
                loginBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    loginUser();
                }, 1500);
            }
        });
    }
    
    // Forgot password modal
    if (forgotPasswordLink && forgotPasswordModal) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            forgotPasswordModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            forgotPasswordModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    if (forgotPasswordModal) {
        forgotPasswordModal.addEventListener('click', function(e) {
            if (e.target === forgotPasswordModal) {
                forgotPasswordModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Send reset email
    if (sendResetBtn) {
        sendResetBtn.addEventListener('click', function() {
            const email = document.getElementById('resetEmail').value;
            const errorElement = document.getElementById('resetEmailError');
            
            // Clear error
            errorElement.textContent = '';
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                errorElement.textContent = 'Please enter a valid email address';
                return;
            }
            
            // Show loading
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            this.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                alert(`Reset link sent to ${email}. Please check your inbox.`);
                
                // Reset button
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Close modal
                forgotPasswordModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
                
                // Clear form
                document.getElementById('resetEmail').value = '';
            }, 1000);
        });
    }
    
    // Demo login
    if (demoLoginBtn) {
        demoLoginBtn.addEventListener('click', function() {
            // Fill form with demo credentials
            document.getElementById('loginEmail').value = 'demo@propAIty.io';
            document.getElementById('loginPassword').value = 'demo123';
            
            // Show notification
            showToast('Demo credentials filled. Click "Sign In" to continue.', 'info');
        });
    }
    
    // Google login (simulated)
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', function() {
            // Simulate Google OAuth flow
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting to Google...';
            this.disabled = true;
            
            setTimeout(() => {
                showToast('Google login would redirect to OAuth flow in production.', 'info');
                this.innerHTML = '<i class="fab fa-google"></i> Sign in with Google';
                this.disabled = false;
            }, 1000);
        });
    }
    
    // Real-time validation
    const emailInput = document.getElementById('loginEmail');
    if (emailInput) {
        emailInput.addEventListener('blur', validateEmailField);
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('blur', validatePasswordField);
    }
}

function validateLoginForm() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    
    let isValid = true;
    
    // Clear errors
    emailError.textContent = '';
    passwordError.textContent = '';
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Validate password
    if (!password || password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters';
        isValid = false;
    }
    
    return isValid;
}

function validateEmailField() {
    const email = this.value.trim();
    const errorElement = document.getElementById('emailError');
    
    errorElement.textContent = '';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errorElement.textContent = 'Please enter a valid email address';
        return false;
    }
    
    return true;
}

function validatePasswordField() {
    const password = this.value.trim();
    const errorElement = document.getElementById('passwordError');
    
    errorElement.textContent = '';
    
    if (!password || password.length < 6) {
        errorElement.textContent = 'Password must be at least 6 characters';
        return false;
    }
    
    return true;
}

function loginUser() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const rememberMe = document.getElementById('remember').checked;
    
    // In a real app, you would send this to your backend
    console.log('Login attempt:', { email, password, rememberMe });
    
    // For demo purposes, simulate successful login
    if (email === 'demo@propAIty.io' && password === 'demo123') {
        showLoginSuccess();
        
        // Store login state (in real app, this would be a session token)
        localStorage.setItem('propAIty_loggedIn', 'true');
        localStorage.setItem('propAIty_userEmail', email);
        
        // Redirect to dashboard/coming soon page
        setTimeout(() => {
            redirectToDashboard();
        }, 2000);
    } else {
        // Simulate failed login
        simulateFailedLogin();
    }
}

function showLoginSuccess() {
    const loginForm = document.getElementById('loginForm');
    const loginSuccess = document.getElementById('loginSuccess');
    const loginBtn = document.getElementById('loginBtn');
    
    if (loginForm && loginSuccess) {
        loginForm.classList.add('hidden');
        loginSuccess.classList.remove('hidden');
        
        // Reset button state
        if (loginBtn) {
            loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
            loginBtn.disabled = false;
        }
    }
}

function simulateFailedLogin() {
    const loginBtn = document.getElementById('loginBtn');
    
    // Show error
    showToast('Invalid email or password. Try "demo@propAIty.io" with password "demo123"', 'error');
    
    // Reset button
    if (loginBtn) {
        loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
        loginBtn.disabled = false;
    }
}

function redirectToDashboard() {
    // For MVP, redirect to a "Coming Soon" page
    // In production, this would be the actual dashboard
   window.location.href = 'property-upload.html';
}

function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(toast);
    
    // Add styles if not already present
    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .toast {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: var(--border-radius);
                padding: 15px 20px;
                box-shadow: var(--shadow-lg);
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 15px;
                min-width: 300px;
                max-width: 400px;
                transform: translateX(150%);
                transition: transform 0.3s ease;
                z-index: 10000;
                border-left: 4px solid var(--primary-color);
            }
            
            .toast.show {
                transform: translateX(0);
            }
            
            .toast-error {
                border-left-color: var(--danger-color);
            }
            
            .toast-info {
                border-left-color: var(--primary-color);
            }
            
            .toast-content {
                display: flex;
                align-items: center;
                gap: 10px;
                flex: 1;
            }
            
            .toast-content i {
                color: var(--primary-color);
            }
            
            .toast-error .toast-content i {
                color: var(--danger-color);
            }
            
            .toast-close {
                background: none;
                border: none;
                color: var(--gray-color);
                cursor: pointer;
                padding: 5px;
            }
            
            .toast-close:hover {
                color: var(--dark-color);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Close button
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }
    }, 5000);
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeLoginPage,
        validateLoginForm,
        loginUser
    };
}