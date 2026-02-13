// Footer component - will be loaded into #footer-container

document.addEventListener('DOMContentLoaded', function() {
    loadFooter();
});

function loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;
    
    footerContainer.innerHTML = `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-brand">
                        <a href="/" class="logo flex items-center gap-2 mb-4">
                            <i class="fas fa-robot text-2xl" style="color: var(--primary-color);"></i>
                            <span class="text-xl font-bold">propAIty.io</span>
                        </a>
                        <p class="text-gray-600">The AI-powered real estate marketplace that accelerates transactions through intelligent matching.</p>
                    </div>
                    
                    <div class="footer-links">
                        <div class="link-group">
                            <h4>Platform</h4>
                            <a href="#">For Agents</a>
                            <a href="#">For Landlords</a>
                            <a href="#">For Developers</a>
                        </div>
                        
                    <div class="link-group">
                          <h4>Company</h4>
                          <a href="about.html">About Us</a>
                          <a href="blog.html">Blog</a>
                          <a href="contact.html">Contact</a>
                       </div>
                        
                       <div class="link-group">
                          <h4>Legal</h4>
                          <a href="legal.html">Privacy Policy</a>
                          <a href="legal.html#terms">Terms of Service</a>
                          <a href="legal.html#cookies">Cookies Policy</a>
                       </div>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <p>&copy; ${new Date().getFullYear()} propAIty.io. All rights reserved.</p>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-linkedin"></i></a>
                        <a href="#"><i class="fab fa-facebook"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        </footer>
        
        <style>
            .footer {
                background-color: var(--dark-color);
                color: white;
                padding: 60px 0 30px;
                margin-top: 80px;
            }
            
            .footer-content {
                display: grid;
                grid-template-columns: 1fr 2fr;
                gap: 60px;
                margin-bottom: 40px;
            }
            
            .footer-links {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 40px;
            }
            
            .link-group {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            
            .link-group h4 {
                color: white;
                margin-bottom: 15px;
                font-size: 1.1rem;
            }
            
            .link-group a {
                color: var(--light-gray);
                text-decoration: none;
            }
            
            .link-group a:hover {
                color: white;
            }
            
            .footer-bottom {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 30px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .social-links {
                display: flex;
                gap: 15px;
            }
            
            .social-links a {
                color: white;
                font-size: 1.2rem;
                transition: var(--transition);
            }
            
            .social-links a:hover {
                color: var(--primary-color);
                transform: translateY(-2px);
            }
            
            @media (max-width: 768px) {
                .footer-content {
                    grid-template-columns: 1fr;
                    gap: 40px;
                }
                
                .footer-links {
                    grid-template-columns: 1fr;
                    gap: 30px;
                }
                
                .footer-bottom {
                    flex-direction: column;
                    gap: 20px;
                    text-align: center;
                }
            }
        </style>
    `;
}
// Add this to the link groups in the footer
'<a href="admin.html" class="admin-link" style="display:none">Admin</a>'