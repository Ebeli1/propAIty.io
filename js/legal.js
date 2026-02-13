// Legal Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeLegalTabs();
    initializeCookiePreferences();
    initializeSmoothScroll();
});

function initializeLegalTabs() {
    const tabs = document.querySelectorAll('.legal-tab');
    const contents = document.querySelectorAll('.legal-tab-content');
    
    // Check URL hash for direct tab access
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        activateTab(hash);
    }
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            activateTab(tabId);
            
            // Update URL hash without scrolling
            history.pushState(null, null, `#${tabId}`);
            
            // Smooth scroll to content
            const contentSection = document.querySelector('.legal-content-section');
            contentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
    
    function activateTab(tabId) {
        // Update tabs
        tabs.forEach(t => {
            if (t.dataset.tab === tabId) {
                t.classList.add('active');
            } else {
                t.classList.remove('active');
            }
        });
        
        // Update content
        contents.forEach(content => {
            if (content.id === tabId) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }
}

function initializeCookiePreferences() {
    const toggles = document.querySelectorAll('.cookie-category input[type="checkbox"]');
    const saveBtn = document.querySelector('.preview-actions .btn-outline');
    const acceptAllBtn = document.querySelector('.preview-actions .btn-primary');
    
    // Save preferences
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            const preferences = {};
            
            toggles.forEach(toggle => {
                const category = toggle.closest('.cookie-category').querySelector('h4').textContent;
                preferences[category] = toggle.checked;
            });
            
            // Save to localStorage
            localStorage.setItem('propAIty_cookie_preferences', JSON.stringify(preferences));
            
            // Show success message
            showNotification('Cookie preferences saved successfully!', 'success');
        });
    }
    
    // Accept all
    if (acceptAllBtn) {
        acceptAllBtn.addEventListener('click', function() {
            toggles.forEach(toggle => {
                if (!toggle.disabled) {
                    toggle.checked = true;
                }
            });
            
            // Trigger save
            saveBtn.click();
        });
    }
    
    // Load saved preferences
    loadCookiePreferences();
}

function loadCookiePreferences() {
    const saved = localStorage.getItem('propAIty_cookie_preferences');
    
    if (saved) {
        try {
            const preferences = JSON.parse(saved);
            const toggles = document.querySelectorAll('.cookie-category input[type="checkbox"]:not(:disabled)');
            
            toggles.forEach(toggle => {
                const category = toggle.closest('.cookie-category').querySelector('h4').textContent;
                if (preferences[category] !== undefined) {
                    toggle.checked = preferences[category];
                }
            });
        } catch (error) {
            console.error('Error loading cookie preferences:', error);
        }
    }
}

function initializeSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL
                    history.pushState(null, null, href);
                }
            }
        });
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `legal-notification legal-notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    if (!document.querySelector('#legal-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'legal-notification-styles';
        style.textContent = `
            .legal-notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: white;
                border-radius: var(--border-radius-lg);
                padding: 16px 20px;
                box-shadow: var(--shadow-xl);
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 20px;
                min-width: 300px;
                max-width: 400px;
                transform: translateY(150%);
                transition: transform 0.3s ease;
                z-index: 10000;
                border-left: 4px solid var(--primary-color);
            }
            
            .legal-notification.show {
                transform: translateY(0);
            }
            
            .legal-notification-success {
                border-left-color: var(--success-color);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .notification-content i {
                font-size: 1.2rem;
            }
            
            .legal-notification-success .notification-content i {
                color: var(--success-color);
            }
            
            .notification-close {
                background: none;
                border: none;
                color: var(--gray-color);
                cursor: pointer;
                padding: 4px;
                transition: var(--transition);
            }
            
            .notification-close:hover {
                color: var(--dark-color);
            }
            
            @media (max-width: 480px) {
                .legal-notification {
                    left: 20px;
                    right: 20px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Update footer links to include legal page
function updateFooterLinks() {
    const footerLinks = document.querySelector('.link-group:contains("Legal")');
    if (footerLinks) {
        // Already exists
        return;
    }
}

// Handle direct deep linking from cookie settings links
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cookie-settings-link')) {
        e.preventDefault();
        
        // Switch to cookies tab
        const cookiesTab = document.querySelector('.legal-tab[data-tab="cookies"]');
        if (cookiesTab) {
            cookiesTab.click();
            
            // Scroll to cookie preferences
            setTimeout(() => {
                const cookiePreview = document.querySelector('.cookie-consent-preview');
                if (cookiePreview) {
                    cookiePreview.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeLegalTabs,
        initializeCookiePreferences,
        loadCookiePreferences
    };
}