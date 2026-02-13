// Main JavaScript file - Initializes components and handles global functionality

document.addEventListener('DOMContentLoaded', function() {
    console.log('propAIty.io loaded');
    
    // Initialize components
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeAnimations();
    
    // Check for URL parameters for role-specific CTAs
    checkUrlParameters();
});

    // Mobile menu toggle (handled in navbar.js)
    function initializeMobileMenu() {
    // Function is now handled in navbar.js component
    console.log('Mobile menu handled by navbar component');
}
// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Simple scroll animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Check URL parameters for role-specific actions
function checkUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role');
    
    if (role) {
        // Store role in sessionStorage for signup form
        sessionStorage.setItem('preferredRole', role);
        console.log(`Preferred role detected: ${role}`);
    }
}

// Utility function to show toast messages
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showToast,
        checkUrlParameters
    };
}
// UX Flow Carousel Functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeUXFlow();
});

function initializeUXFlow() {
    const flowTabs = document.querySelectorAll('.flow-tab');
    const stepDots = document.querySelectorAll('.step-dot');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    let currentStep = 1;
    const totalSteps = 3;

    // Update UI based on current step
    function updateStepUI(step) {
        // Update flow tabs
        flowTabs.forEach(tab => {
            if (parseInt(tab.dataset.step) === step) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Update step dots
        stepDots.forEach(dot => {
            if (parseInt(dot.dataset.step) === step) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Update flow steps
        document.querySelectorAll('.flow-step').forEach(stepElement => {
            if (parseInt(stepElement.id.replace('step', '')) === step) {
                stepElement.classList.add('active');
            } else {
                stepElement.classList.remove('active');
            }
        });

        // Update navigation arrows
        if (prevArrow) {
            prevArrow.disabled = step === 1;
        }
        
        if (nextArrow) {
            nextArrow.disabled = step === totalSteps;
        }

        // Add animation to current step
        const currentStepElement = document.getElementById(`step${step}`);
        if (currentStepElement) {
            currentStepElement.style.animation = 'none';
            setTimeout(() => {
                currentStepElement.style.animation = 'fadeInUp 0.5s ease forwards';
            }, 10);
        }
    }

    // Flow tab click handler
    flowTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const step = parseInt(this.dataset.step);
            currentStep = step;
            updateStepUI(step);
        });
    });

    // Step dot click handler
    stepDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const step = parseInt(this.dataset.step);
            currentStep = step;
            updateStepUI(step);
        });
    });

    // Previous arrow click handler
    if (prevArrow) {
        prevArrow.addEventListener('click', function() {
            if (currentStep > 1) {
                currentStep--;
                updateStepUI(currentStep);
            }
        });
    }

    // Next arrow click handler
    if (nextArrow) {
        nextArrow.addEventListener('click', function() {
            if (currentStep < totalSteps) {
                currentStep++;
                updateStepUI(currentStep);
            }
        });
    }

    // Auto-advance every 10 seconds (optional)
    let autoAdvanceInterval;
    
    function startAutoAdvance() {
        autoAdvanceInterval = setInterval(() => {
            if (currentStep < totalSteps) {
                currentStep++;
            } else {
                currentStep = 1;
            }
            updateStepUI(currentStep);
        }, 10000); // 10 seconds
    }
    
    function stopAutoAdvance() {
        if (autoAdvanceInterval) {
            clearInterval(autoAdvanceInterval);
        }
    }
    
    // Start auto-advance
    startAutoAdvance();
    
    // Stop auto-advance on user interaction
    document.querySelector('.ux-flow-section').addEventListener('mouseenter', stopAutoAdvance);
    document.querySelector('.ux-flow-section').addEventListener('mouseleave', startAutoAdvance);
    document.querySelector('.ux-flow-section').addEventListener('touchstart', stopAutoAdvance);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' && currentStep > 1) {
            currentStep--;
            updateStepUI(currentStep);
            stopAutoAdvance();
        } else if (e.key === 'ArrowRight' && currentStep < totalSteps) {
            currentStep++;
            updateStepUI(currentStep);
            stopAutoAdvance();
        }
    });

    // Initialize first step
    updateStepUI(currentStep);
}