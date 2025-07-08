// FinergyCloud Mobile Dashboard Integration

class MobileDashboardManager {
    constructor() {
        this.currentSlide = 0;
        this.autoplayInterval = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupDashboardNavigation();
    }

    setupEventListeners() {
        // Listen for page activation
        document.addEventListener('pageActivated', (e) => {
            if (e.detail.pageId === 'analytics' || e.detail.pageId === 'dashboard') {
                this.initializeDashboardCarousel();
                this.startAutoplay();
                this.loadDashboardMetrics();
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

    setupDashboardNavigation() {
        // Make sure analytics is properly linked in navigation
        document.querySelectorAll('.nav-btn[data-page="analytics"]').forEach(btn => {
            btn.addEventListener('click', () => {
                if (window.finergyApp) {
                    window.finergyApp.navigateToPage('analytics');
                }
            });
        });
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

    loadDashboardMetrics() {
        // In a real app, this would fetch data from an API
        // For now, we'll just animate the metrics that are already in the HTML
        
        const metricValues = document.querySelectorAll('.dashboard-metrics .metric-value');
        metricValues.forEach((metric, index) => {
            setTimeout(() => {
                metric.style.animation = 'scaleIn 0.5s ease';
                
                // Remove animation after it completes
                setTimeout(() => {
                    metric.style.animation = '';
                }, 500);
            }, index * 100);
        });
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

// Add dashboard styles
const dashboardStyles = `
<style>
/* Dashboard Carousel Styles */
.dashboard-carousel {
    position: relative;
    margin-bottom: var(--spacing-md);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-md);
}

.dashboard-slide {
    display: none;
    width: 100%;
}

.dashboard-slide.active {
    display: block;
    animation: fadeIn 0.5s ease;
}

.dashboard-slide img {
    width: 100%;
    display: block;
}

.slide-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 77, 64, 0.8);
    color: var(--white);
    padding: var(--spacing-sm);
    text-align: center;
    font-weight: var(--font-weight-medium);
}

.dashboard-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--spacing-lg);
}

.dashboard-control {
    background: var(--white);
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    color: var(--primary-green);
    box-shadow: var(--shadow-sm);
    cursor: pointer;
    transition: var(--transition-fast);
}

.dashboard-control:hover {
    background: var(--light-green);
    box-shadow: var(--shadow-md);
}

.dashboard-indicators {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    margin: 0 var(--spacing-md);
}

.indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--light-gray);
    cursor: pointer;
    transition: var(--transition-fast);
}

.indicator.active {
    background: var(--accent-teal);
    transform: scale(1.2);
}

.dashboard-metrics {
    margin-bottom: var(--spacing-lg);
}

.dashboard-actions {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-xl);
}

.dashboard-actions .btn {
    width: 100%;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', dashboardStyles);