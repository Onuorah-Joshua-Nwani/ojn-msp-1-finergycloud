// FinergyCloud Dashboard Integration

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard tabs
    initDashboardTabs();
    
    // Initialize mobile dashboard carousel
    initMobileDashboardCarousel();
});

function initDashboardTabs() {
    const tabButtons = document.querySelectorAll('[data-bs-toggle="tab"]');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                const target = document.querySelector(btn.dataset.bsTarget);
                if (target) {
                    target.classList.remove('show', 'active');
                }
            });
            
            // Add active class to clicked tab
            button.classList.add('active');
            const target = document.querySelector(button.dataset.bsTarget);
            if (target) {
                target.classList.add('show', 'active');
            }
        });
    });
}

function initMobileDashboardCarousel() {
    const slides = document.querySelectorAll('.dashboard-slide');
    const indicators = document.querySelectorAll('.dashboard-indicators .indicator');
    const prevBtn = document.querySelector('.dashboard-control.prev');
    const nextBtn = document.querySelector('.dashboard-control.next');
    
    if (!slides.length || !indicators.length || !prevBtn || !nextBtn) return;
    
    let currentSlide = 0;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Show selected slide
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Add event listeners
    prevBtn.addEventListener('click', () => {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) newIndex = slides.length - 1;
        showSlide(newIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        let newIndex = currentSlide + 1;
        if (newIndex >= slides.length) newIndex = 0;
        showSlide(newIndex);
    });
    
    // Add indicator click events
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Add swipe gestures
    let touchStartX = 0;
    let touchEndX = 0;
    
    const dashboardCarousel = document.querySelector('.dashboard-carousel');
    
    if (dashboardCarousel) {
        dashboardCarousel.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, false);
        
        dashboardCarousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
        }, false);
    }
    
    function handleSwipe() {
        if (touchEndX < touchStartX) {
            // Swipe left - next slide
            let newIndex = currentSlide + 1;
            if (newIndex >= slides.length) newIndex = 0;
            showSlide(newIndex);
        } else if (touchEndX > touchStartX) {
            // Swipe right - previous slide
            let newIndex = currentSlide - 1;
            if (newIndex < 0) newIndex = slides.length - 1;
            showSlide(newIndex);
        }
    }
    
    // Auto-advance slides
    setInterval(() => {
        let newIndex = currentSlide + 1;
        if (newIndex >= slides.length) newIndex = 0;
        showSlide(newIndex);
    }, 5000);
}

// Function to download dashboard as PDF
function downloadDashboard() {
    // In a real implementation, this would generate a PDF
    // For now, we'll just show a message
    alert('Dashboard PDF download started. The file will be available shortly.');
}

// Function to share dashboard
function shareDashboard() {
    // Check if Web Share API is available
    if (navigator.share) {
        navigator.share({
            title: 'FinergyCloud Investment Dashboard',
            text: 'Check out my renewable energy investment dashboard from FinergyCloud',
            url: window.location.href,
        })
        .catch((error) => console.log('Error sharing:', error));
    } else {
        // Fallback for browsers that don't support Web Share API
        const shareUrl = window.location.href;
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        textarea.style.position = 'fixed';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        
        try {
            document.execCommand('copy');
            alert('Dashboard link copied to clipboard! You can now share it manually.');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
        
        document.body.removeChild(textarea);
    }
}