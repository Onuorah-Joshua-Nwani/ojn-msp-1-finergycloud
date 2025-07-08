// FinergyCloud Mobile Dashboard Integration

class MobileDashboardManager {
    constructor() {
        this.currentSlide = 0;
        this.autoplayInterval = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.addDashboardNavigation();
    }

    setupEventListeners() {
        // Listen for page activation
        document.addEventListener('pageActivated', (e) => {
            if (e.detail.pageId === 'analytics') {
                this.initializeDashboardCarousel();
                this.startAutoplay();
            } else {
                this.stopAutoplay();
            }
        });
        
        // Setup dashboard actions
        document.addEventListener('DOMContentLoaded', () => {
            const downloadBtn = document.querySelector('.dashboard-actions .btn-primary');
            const shareBtn = document.querySelector('.dashboard-actions .btn-outline-primary');
            
            if (downloadBtn) {
                downloadBtn.addEventListener('click', () => this.downloadDashboard());
            }
            
            if (shareBtn) {
                shareBtn.addEventListener('click', () => this.shareDashboard());
            }
        });
    }

    addDashboardNavigation() {
        // Add analytics dashboard to side navigation if not already present
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && !document.querySelector('.nav-link[data-page="analytics"]')) {
            const analyticsNavItem = document.createElement('li');
            analyticsNavItem.className = 'nav-item';
            analyticsNavItem.innerHTML = `
                <a href="#analytics" class="nav-link" data-page="analytics">
                    <i class="bi bi-graph-up"></i>
                    <span>Analytics</span>
                </a>
            `;
            navMenu.appendChild(analyticsNavItem);
            
            // Add event listener
            const analyticsLink = analyticsNavItem.querySelector('.nav-link');
            analyticsLink.addEventListener('click', (e) => {
                e.preventDefault();
                if (window.finergyApp) {
                    window.finergyApp.navigateToPage('analytics');
                }
                if (window.innerWidth < 1024) {
                    if (window.finergyApp) {
                        window.finergyApp.closeNavigation();
                    }
                }
            });
        }

        // Add analytics to bottom navigation if not already present
        const bottomNav = document.querySelector('.bottom-nav');
        if (bottomNav && !document.querySelector('.nav-btn[data-page="analytics"]') && bottomNav.children.length < 5) {
            const analyticsNavBtn = document.createElement('button');
            analyticsNavBtn.className = 'nav-btn';
            analyticsNavBtn.setAttribute('data-page', 'analytics');
            analyticsNavBtn.innerHTML = `
                <i class="bi bi-graph-up"></i>
                <span>Analytics</span>
            `;
            bottomNav.appendChild(analyticsNavBtn);
            
            // Re-attach event listeners
            analyticsNavBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (window.finergyApp) {
                    window.finergyApp.navigateToPage('analytics');
                }
            });
        }
    }

    initializeDashboardCarousel() {
        const slides = document.querySelectorAll('.dashboard-slide');
        const indicators = document.querySelectorAll('.dashboard-indicators .indicator');
        const prevBtn = document.querySelector('.dashboard-control.prev');
        const nextBtn = document.querySelector('.dashboard-control.next');
        
        if (!slides.length || !indicators.length || !prevBtn || !nextBtn) return;
        
        // Reset to first slide
        this.showSlide(0, slides, indicators);
        
        // Add event listeners
        prevBtn.addEventListener('click', () => {
            let newIndex = this.currentSlide - 1;
            if (newIndex < 0) newIndex = slides.length - 1;
            this.showSlide(newIndex, slides, indicators);
        });
        
        nextBtn.addEventListener('click', () => {
            let newIndex = this.currentSlide + 1;
            if (newIndex >= slides.length) newIndex = 0;
            this.showSlide(newIndex, slides, indicators);
        });
        
        // Add indicator click events
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.showSlide(index, slides, indicators);
            });
        });
        
        // Add swipe gestures
        this.setupSwipeGestures(slides, indicators);
    }

    showSlide(index, slides, indicators) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Show selected slide
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        this.currentSlide = index;
        
        // Reset autoplay timer
        this.resetAutoplay();
    }

    setupSwipeGestures(slides, indicators) {
        const dashboardCarousel = document.querySelector('.dashboard-carousel');
        if (!dashboardCarousel) return;
        
        let touchStartX = 0;
        let touchEndX = 0;
        
        dashboardCarousel.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        dashboardCarousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            
            // Calculate swipe distance
            const swipeDistance = touchEndX - touchStartX;
            
            // Only process significant swipes
            if (Math.abs(swipeDistance) > 50) {
                if (swipeDistance < 0) {
                    // Swipe left - next slide
                    let newIndex = this.currentSlide + 1;
                    if (newIndex >= slides.length) newIndex = 0;
                    this.showSlide(newIndex, slides, indicators);
                } else {
                    // Swipe right - previous slide
                    let newIndex = this.currentSlide - 1;
                    if (newIndex < 0) newIndex = slides.length - 1;
                    this.showSlide(newIndex, slides, indicators);
                }
            }
        }, { passive: true });
    }

    startAutoplay() {
        this.stopAutoplay(); // Clear any existing interval
        
        this.autoplayInterval = setInterval(() => {
            const slides = document.querySelectorAll('.dashboard-slide');
            const indicators = document.querySelectorAll('.dashboard-indicators .indicator');
            
            if (!slides.length || !indicators.length) return;
            
            let newIndex = this.currentSlide + 1;
            if (newIndex >= slides.length) newIndex = 0;
            this.showSlide(newIndex, slides, indicators);
        }, 5000);
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    resetAutoplay() {
        this.stopAutoplay();
        this.startAutoplay();
    }

    downloadDashboard() {
        // In a real implementation, this would generate a PDF
        this.showToast('Dashboard PDF download started', 'success');
        
        // Simulate download delay
        setTimeout(() => {
            this.showToast('Dashboard PDF downloaded successfully', 'success');
        }, 2000);
    }

    shareDashboard() {
        // Check if Web Share API is available
        if (navigator.share) {
            navigator.share({
                title: 'FinergyCloud Investment Dashboard',
                text: 'Check out my renewable energy investment dashboard from FinergyCloud',
                url: window.location.href,
            })
            .then(() => {
                this.showToast('Dashboard shared successfully', 'success');
            })
            .catch((error) => {
                console.log('Error sharing:', error);
                this.fallbackShare();
            });
        } else {
            this.fallbackShare();
        }
    }

    fallbackShare() {
        // Fallback for browsers that don't support Web Share API
        const shareUrl = window.location.href;
        
        // Create a temporary input element
        const input = document.createElement('input');
        input.value = shareUrl;
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, 99999); // For mobile devices
        
        // Copy to clipboard
        document.execCommand('copy');
        document.body.removeChild(input);
        
        this.showToast('Dashboard link copied to clipboard', 'success');
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `mobile-toast ${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
}

// Initialize mobile dashboard manager
document.addEventListener('DOMContentLoaded', () => {
    window.mobileDashboard = new MobileDashboardManager();
});