// Admin Navbar Component

document.addEventListener('DOMContentLoaded', function() {
    loadAdminNavbar();
});

function loadAdminNavbar() {
    const navbarContainer = document.getElementById('admin-navbar-container');
    if (!navbarContainer) return;
    
    navbarContainer.innerHTML = `
        <div class="admin-topbar">
            <div class="container">
                <div class="topbar-content">
                    <div class="topbar-left">
                        <button class="sidebar-toggle" id="sidebarToggle">
                            <i class="fas fa-bars"></i>
                        </button>
                        <div class="breadcrumb">
                            <a href="index.html">Main Site</a>
                            <i class="fas fa-chevron-right"></i>
                            <span>Admin Panel</span>
                        </div>
                    </div>
                    
                    <div class="topbar-right">
                        <div class="topbar-item">
                            <i class="fas fa-bell"></i>
                            <span class="notification-badge">3</span>
                        </div>
                        <div class="topbar-item">
                            <i class="fas fa-question-circle"></i>
                        </div>
                        <div class="admin-profile">
                            <div class="profile-avatar">
                                <i class="fas fa-user-shield"></i>
                            </div>
                            <span class="profile-name">Admin</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <style>
            .admin-topbar {
                background: white;
                border-bottom: 1px solid var(--light-gray);
                padding: 15px 0;
                position: sticky;
                top: 0;
                z-index: 99;
                box-shadow: var(--shadow-sm);
            }
            
            .topbar-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .topbar-left {
                display: flex;
                align-items: center;
                gap: 20px;
            }
            
            .sidebar-toggle {
                background: none;
                border: none;
                font-size: 1.3rem;
                color: var(--dark-color);
                cursor: pointer;
                padding: 5px;
                display: none;
            }
            
            .sidebar-toggle:hover {
                color: var(--primary-color);
            }
            
            .breadcrumb {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 0.9rem;
            }
            
            .breadcrumb a {
                color: var(--primary-color);
                text-decoration: none;
            }
            
            .breadcrumb span {
                color: var(--gray-color);
            }
            
            .breadcrumb i {
                font-size: 0.7rem;
                color: var(--light-gray);
            }
            
            .topbar-right {
                display: flex;
                align-items: center;
                gap: 20px;
            }
            
            .topbar-item {
                position: relative;
                cursor: pointer;
                padding: 8px;
                color: var(--gray-color);
                transition: var(--transition);
            }
            
            .topbar-item:hover {
                color: var(--primary-color);
            }
            
            .notification-badge {
                position: absolute;
                top: 0;
                right: 0;
                background: var(--danger-color);
                color: white;
                font-size: 0.6rem;
                padding: 2px 5px;
                border-radius: 50%;
                min-width: 16px;
                text-align: center;
            }
            
            .admin-profile {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 5px 10px;
                border-radius: var(--border-radius);
                background: var(--light-color);
                cursor: pointer;
                transition: var(--transition);
            }
            
            .admin-profile:hover {
                background: var(--light-gray);
            }
            
            .profile-avatar {
                width: 30px;
                height: 30px;
                background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 0.9rem;
            }
            
            .profile-name {
                font-weight: 500;
                font-size: 0.9rem;
            }
            
            @media (max-width: 768px) {
                .sidebar-toggle {
                    display: block;
                }
                
                .breadcrumb span:last-child {
                    display: none;
                }
                
                .profile-name {
                    display: none;
                }
            }
        </style>
    `;
    
    // Toggle sidebar on mobile
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            const sidebar = document.querySelector('.admin-sidebar');
            if (sidebar) {
                sidebar.classList.toggle('mobile-open');
            }
        });
    }
}