// Blog Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('blogSearch');
    const searchBtn = document.querySelector('.blog-search .btn');
    const filterSelect = document.querySelector('.filter-select');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    // Search functionality
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                alert(`Searching for: "${query}" - This would filter articles in a real implementation.`);
                // In real implementation: filter articles based on query
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
    
    // Filter functionality
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            const filter = this.value;
            alert(`Filtering by: ${filter} - This would sort articles in a real implementation.`);
            // In real implementation: sort articles based on filter
        });
    }
    
    // Newsletter subscription
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value.trim();
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert(`Thank you for subscribing! You'll receive our newsletter at ${email}.`);
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }
    
    // Article card interactions
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('a')) {
                const title = this.querySelector('h3').textContent;
                alert(`Opening article: "${title}" - This would navigate to article page in real implementation.`);
                // In real implementation: window.location.href = 'article-detail.html';
            }
        });
    });
});