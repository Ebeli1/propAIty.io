// Success Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeSuccessPage();
});

function initializeSuccessPage() {
    // Copy email functionality
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', function() {
            const email = 'support@propAIty.io';
            navigator.clipboard.writeText(email).then(() => {
                // Show success feedback
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                this.classList.add('btn-success');
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.classList.remove('btn-success');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy email:', err);
                alert('Failed to copy email to clipboard. Please copy manually: support@propAIty.io');
            });
        });
    }
    
    // FAQ toggle functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Generate random waitlist position (for demo)
    const waitlistPosition = document.getElementById('waitlistPosition');
    if (waitlistPosition) {
        // Generate between 50 and 300
        const position = Math.floor(Math.random() * 251) + 50;
        waitlistPosition.textContent = position.toLocaleString();
        
        // Add animation
        let count = 0;
        const interval = setInterval(() => {
            if (count < position) {
                count += Math.ceil(position / 50);
                if (count > position) count = position;
                waitlistPosition.textContent = count.toLocaleString();
            } else {
                clearInterval(interval);
            }
        }, 30);
    }
    
    // Add success styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .btn-success {
            background-color: var(--success-color) !important;
            border-color: var(--success-color) !important;
        }
        
        .btn-success:hover {
            background-color: #0da271 !important;
            border-color: #0da271 !important;
        }
        
        /* Animation for step cards */
        .step-card:nth-child(1) { animation-delay: 0.1s; }
        .step-card:nth-child(2) { animation-delay: 0.3s; }
        .step-card:nth-child(3) { animation-delay: 0.5s; }
        
        .step-card {
            opacity: 0;
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Load user data from localStorage (for demo)
    loadUserData();
}

function loadUserData() {
    try {
        const userData = localStorage.getItem('propAIty_userData');
        if (userData) {
            const data = JSON.parse(userData);
            console.log('User data loaded:', data);
            
            // Update timeline based on verification status
            if (data.emailVerified) {
                updateTimelineStep(2, 'verified');
            }
            
            // Update status if approved
            if (data.status === 'approved') {
                updateStatus('approved');
            }
        }
    } catch (error) {
        console.error('Error loading user data:', error);
    }
}

function updateTimelineStep(stepIndex, status) {
    const steps = document.querySelectorAll('.timeline-step');
    if (steps.length >= stepIndex) {
        const step = steps[stepIndex - 1];
        if (status === 'verified') {
            step.classList.add('active');
            const dot = step.querySelector('.step-dot');
            if (dot) {
                dot.style.backgroundColor = 'var(--success-color)';
            }
        }
    }
}

function updateStatus(status) {
    const statusBadge = document.querySelector('.status-badge');
    const statusTimeline = document.querySelector('.status-timeline');
    
    if (statusBadge && statusTimeline) {
        if (status === 'approved') {
            statusBadge.textContent = 'Approved';
            statusBadge.className = 'status-badge status-approved';
            
            // Activate all timeline steps
            const steps = document.querySelectorAll('.timeline-step');
            steps.forEach(step => {
                step.classList.add('active');
            });
        }
    }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeSuccessPage,
        loadUserData,
        updateTimelineStep,
        updateStatus
    };
}