// Navbar component - will be loaded into #navbar-container

document.addEventListener('DOMContentLoaded', function() {
    loadNavbar();
});

function loadNavbar() {
    const navbarContainer = document.getElementById('navbar-container');
    if (!navbarContainer) return;
    
    navbarContainer.innerHTML = `
        <header class="header">
            <nav class="container flex-between py-4">
                <!-- Logo -->
                <a href="/" class="logo flex items-center gap-2">
                    <i class="fas fa-robot" style="color: var(--primary-color); font-size: 1.5rem;"></i>
                    <span class="logo-text">propAIty.io</span>
                </a>
                
                <!-- Desktop Navigation -->
                <div class="nav-links">
                    <!-- Regular Links with proper spacing -->
                    <div class="nav-main-links">
                        <a href="index.html#how-it-works" class="nav-link" data-section="how-it-works">How It Works</a>
                        <a href="index.html#pricing" class="nav-link" data-section="pricing">Pricing</a>
                        <a href="index.html#trust" class="nav-link" data-section="trust">Trust</a>
                    </div>
                    
                    <!-- Separator -->
                    <div class="nav-separator"></div>
                    
                    <!-- Action Buttons -->
                    <div class="nav-actions">
                        <a href="login.html" class="btn btn-outline">Agent Login</a>
                        <a href="signup.html" class="btn btn-primary">Get Started</a>
                    </div>
                </div>
                
                <!-- Mobile Menu Button - ALWAYS VISIBLE ON MOBILE -->
                <button class="mobile-menu-btn" id="mobileMenuBtn">
                    <i class="fas fa-bars"></i>
                </button>
            </nav>
            
            <!-- Mobile Menu (Hidden by default) -->
            <div class="mobile-menu" id="mobileMenu">
                <div class="mobile-menu-content">
                    <a href="index.html#how-it-works" class="mobile-link" data-section="how-it-works">How It Works</a>
                    <a href="index.html#pricing" class="mobile-link" data-section="pricing">Pricing</a>
                    <a href="index.html#trust" class="mobile-link" data-section="trust">Trust</a>
                    <div class="mobile-separator"></div>
                    <a href="login.html" class="mobile-link">Agent Login</a>
                    <a href="signup.html" class="btn btn-primary btn-block">Get Started</a>
                </div>
            </div>
        </header>
        
        <style>
            /* Navbar Specific Styles */
            .header {
                background-color: white;
                box-shadow: var(--shadow-sm);
                position: sticky;
                top: 0;
                z-index: 1000;
                width: 100%;
            }
            
            .container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 20px;
            }
            
            .flex-between {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .py-4 {
                padding-top: 1rem;
                padding-bottom: 1rem;
            }
            
            /* Logo */
            .logo {
                display: flex;
                align-items: center;
                gap: 10px;
                text-decoration: none;
                color: var(--dark-color);
            }
            
            .logo-text {
                font-size: 1.3rem;
                font-weight: 700;
                color: var(--dark-color);
            }
            
            .logo i {
                color: var(--primary-color);
            }
            
            /* Desktop Navigation Layout */
            .nav-links {
                display: flex;
                align-items: center;
            }
            
            .nav-main-links {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .nav-link {
                color: var(--dark-color);
                font-weight: 500;
                padding: 8px 16px;
                position: relative;
                transition: var(--transition);
                font-size: 1rem;
                text-decoration: none;
                margin: 0 4px;
            }
            
            .nav-link:hover {
                color: var(--primary-color);
            }
            
            .nav-link::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 16px;
                right: 16px;
                height: 2px;
                background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
                transform: scaleX(0);
                transition: transform 0.3s ease;
            }
            
            .nav-link:hover::after {
                transform: scaleX(1);
            }
            
            .nav-separator {
                width: 1px;
                height: 24px;
                background-color: var(--light-gray);
                margin: 0 24px;
            }
            
            .nav-actions {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            /* Mobile Menu Button - ALWAYS VISIBLE ON MOBILE VIA MEDIA QUERY */
            .mobile-menu-btn {
                background: none;
                border: none;
                font-size: 1.8rem;
                color: var(--dark-color);
                cursor: pointer;
                padding: 8px;
                display: none; /* Hidden by default on desktop */
                line-height: 1;
            }
            
            .mobile-menu-btn:hover {
                color: var(--primary-color);
            }
            
            /* Mobile Menu */
            .mobile-menu {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                box-shadow: var(--shadow-lg);
                border-top: 1px solid var(--light-gray);
                padding: 20px;
                transform: translateY(-10px);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 999;
            }
            
            .mobile-menu.show {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .mobile-menu-content {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            
            .mobile-link {
                padding: 12px 0;
                color: var(--dark-color);
                font-weight: 500;
                border-bottom: 1px solid var(--light-gray);
                text-align: center;
                text-decoration: none;
                font-size: 1.1rem;
            }
            
            .mobile-link:last-child {
                border-bottom: none;
            }
            
            .mobile-separator {
                height: 1px;
                background: var(--light-gray);
                margin: 10px 0;
            }
            
            .btn-block {
                width: 100%;
                display: block;
                text-align: center;
                padding: 12px;
            }
            
            /* Responsive - Mobile Styles */
            @media (max-width: 992px) {
                .nav-links {
                    display: none !important; /* Hide desktop nav on mobile */
                }
                
                .mobile-menu-btn {
                    display: block !important; /* Show mobile button on mobile */
                }
            }
            
            /* Small mobile adjustments */
            @media (max-width: 480px) {
                .logo-text {
                    font-size: 1.1rem;
                }
                
                .logo i {
                    font-size: 1.3rem;
                }
            }
        </style>
    `;
    
    // Initialize mobile menu functionality
    initializeMobileMenu();
    
    // Add click handlers for navigation links
    initializeNavLinks();
}

function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    // Toggle menu on button click
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isOpen = mobileMenu.classList.contains('show');
        
        if (!isOpen) {
            // Open menu
            mobileMenu.classList.add('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            // Close menu
            mobileMenu.classList.remove('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.remove('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Handle window resize - close menu when going to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            mobileMenu.classList.remove('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

function initializeNavLinks() {
    // Get all navigation links that point to sections
    const navLinks = document.querySelectorAll('.nav-link[data-section], .mobile-link[data-section]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            const sectionId = this.dataset.section;
            
            // Check if we're on the homepage
            const isHomePage = window.location.pathname === '/' || 
                              window.location.pathname.endsWith('index.html') ||
                              window.location.pathname.endsWith('/');
            
            if (isHomePage) {
                // On homepage - smooth scroll to section
                const targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                    
                    // Update URL without reload
                    history.pushState(null, null, `#${sectionId}`);
                }
            } else {
                // On other pages - navigate to homepage with hash
                window.location.href = `index.html#${sectionId}`;
            }
        });
    });
    
    // Handle hash on page load
    handleInitialHash();
}

function handleInitialHash() {
    // Check if URL has a hash
    const hash = window.location.hash;
    if (hash) {
        const sectionId = hash.replace('#', '');
        const isHomePage = window.location.pathname === '/' || 
                          window.location.pathname.endsWith('index.html') ||
                          window.location.pathname.endsWith('/');
        
        if (isHomePage) {
            // On homepage - scroll to section after a short delay
            setTimeout(() => {
                const targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
            }, 300);
        }
    }
}
