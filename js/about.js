// About Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Animate stats counting
    animateCounters();
    
    // Add intersection observer for timeline animations
    observeTimeline();
});

function animateCounters() {
    const counters = document.querySelectorAll('.counter-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current >= target) {
                counter.innerHTML = target + (counter.innerHTML.includes('%') ? '<small>%</small>' : '');
                return;
            }
            counter.innerHTML = Math.floor(current) + (counter.innerHTML.includes('%') ? '<small>%</small>' : '');
            requestAnimationFrame(updateCounter);
        };
        
        // Start counter when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

function observeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}
