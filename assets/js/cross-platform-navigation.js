// Cross-Platform Navigation for FinergyCloud
// Handles navigation between website and mobile app

class CrossPlatformNavigation {
    constructor() {
        this.isMobile = this.detectMobile();
        this.isInApp = this.detectInApp();
        this.init();
    }

    init() {
        this.setupNavigationHandlers();
        this.addPlatformIndicators();
        this.setupSmartRedirects();
    }

    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    detectInApp() {
        // Check if we're in the mobile app context
        return window.location.pathname.includes('/mobile-app/') || 
               window.location.hostname.includes('mobile') ||
               window.navigator.standalone === true; // iOS PWA
    }

    setupNavigationHandlers() {
        // Handle mobile app links on website
        document.addEventListener('click', (e) => {
            const link = e.target.closest('#mobile-app-link, #hero-mobile-link, .mobile-app-btn');
            if (link) {
                e.preventDefault();
                this.navigateToMobileApp();
            }

            // Handle website links in mobile app
            const websiteLink = e.target.closest('.website-btn, .website-link-btn, .full-website-btn');
            if (websiteLink) {
                e.preventDefault();
                this.navigateToWebsite();
            }
        });
    }

    navigateToMobileApp() {
        if (this.isMobile) {
            // On mobile, try to open the PWA or redirect to mobile app
            if ('serviceWorker' in navigator) {
                // Check if PWA is installed
                window.addEventListener('beforeinstallprompt', (e) => {
                    e.preventDefault();
                    // PWA not installed, redirect to mobile app
                    window.location.href = '/mobile-app/';
                });
                
                // If no install prompt, assume PWA is installed or redirect anyway
                setTimeout(() => {
                    window.location.href = '/mobile-app/';
                }, 100);
            } else {
                window.location.href = '/mobile-app/';
            }
        } else {
            // On desktop, open mobile app in new tab
            window.open('/mobile-app/', '_blank');
        }
    }

    navigateToWebsite() {
        if (this.isInApp) {
            // In mobile app, open website in new tab/window
            window.open('https://finergycloud.com', '_blank');
        } else {
            // Already on website, just navigate
            window.location.href = '/';
        }
    }

    addPlatformIndicators() {
        // Add platform-specific indicators and suggestions
        if (this.isMobile && !this.isInApp) {
            this.addMobileAppBanner();
        } else if (!this.isMobile && this.isInApp) {
            this.addDesktopWebsiteBanner();
        }
    }

    addMobileAppBanner() {
        // Only add if not already present
        if (document.querySelector('.mobile-app-banner')) return;
        
        const banner = document.createElement('div');
        banner.className = 'mobile-app-banner';
        banner.innerHTML = `
            <div class="banner-content">
                <div class="banner-icon">
                    <i class="bi bi-phone"></i>
                </div>
                <div class="banner-text">
                    <p>Get the mobile app experience</p>
                </div>
                <button class="banner-btn" id="open-mobile-app">
                    Open App
                </button>
            </div>
            <button class="banner-close" id="close-app-banner">
                <i class="bi bi-x"></i>
            </button>
        `;
        
        document.body.appendChild(banner);
        
        // Show banner with animation
        setTimeout(() => {
            banner.classList.add('show');
        }, 1000);
        
        // Add event listeners
        document.getElementById('open-mobile-app').addEventListener('click', () => {
            this.navigateToMobileApp();
        });
        
        document.getElementById('close-app-banner').addEventListener('click', () => {
            banner.classList.remove('show');
            setTimeout(() => {
                banner.remove();
            }, 300);
            
            // Remember user preference
            localStorage.setItem('mobile_app_banner_closed', Date.now());
        });
    }

    addDesktopWebsiteBanner() {
        // Only add if not already present and in mobile app
        if (document.querySelector('.desktop-website-banner')) return;
        
        const banner = document.createElement('div');
        banner.className = 'desktop-website-banner';
        banner.innerHTML = `
            <div class="banner-content">
                <div class="banner-icon">
                    <i class="bi bi-laptop"></i>
                </div>
                <div class="banner-text">
                    <p>For full features, visit our website</p>
                </div>
                <button class="banner-btn" id="open-website">
                    Visit Website
                </button>
            </div>
            <button class="banner-close" id="close-website-banner">
                <i class="bi bi-x"></i>
            </button>
        `;
        
        document.body.appendChild(banner);
        
        // Show banner with animation
        setTimeout(() => {
            banner.classList.add('show');
        }, 1000);
        
        // Add event listeners
        document.getElementById('open-website').addEventListener('click', () => {
            this.navigateToWebsite();
        });
        
        document.getElementById('close-website-banner').addEventListener('click', () => {
            banner.classList.remove('show');
            setTimeout(() => {
                banner.remove();
            }, 300);
            
            // Remember user preference
            localStorage.setItem('desktop_website_banner_closed', Date.now());
        });
    }

    setupSmartRedirects() {
        // Check if we should redirect based on device and user preferences
        if (this.isMobile && !this.isInApp) {
            // Check if user has previously closed the banner
            const lastClosed = localStorage.getItem('mobile_app_banner_closed');
            if (!lastClosed || (Date.now() - lastClosed > 7 * 24 * 60 * 60 * 1000)) {
                // If never closed or closed more than a week ago
                this.addMobileAppBanner();
            }
        }
    }
}

// Initialize cross-platform navigation
document.addEventListener('DOMContentLoaded', () => {
    window.crossPlatformNav = new CrossPlatformNavigation();
});

// Add cross-platform navigation styles
const crossPlatformStyles = `
<style>
/* Cross-Platform Navigation Styles */
.mobile-app-banner,
.desktop-website-banner {
    position: fixed;
    bottom: 20px;
    left: 20px;
    right: 20px;
    background: var(--white);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-xl);
    padding: 15px;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transform: translateY(100px);
    opacity: 0;
    transition: all 0.3s ease;
}

.mobile-app-banner.show,
.desktop-website-banner.show {
    transform: translateY(0);
    opacity: 1;
}

.banner-content {
    display: flex;
    align-items: center;
    gap: 15px;
    flex: 1;
}

.banner-icon {
    width: 40px;
    height: 40px;
    background: var(--gradient-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font-size: 1.2rem;
}

.banner-text {
    flex: 1;
}

.banner-text p {
    margin: 0;
    font-weight: var(--font-weight-medium);
    color: var(--primary-green);
}

.banner-btn {
    background: var(--gradient-primary);
    color: var(--white);
    border: none;
    padding: 8px 15px;
    border-radius: var(--radius-md);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
}

.banner-close {
    background: none;
    border: none;
    color: var(--gray);
    font-size: 1.2rem;
    cursor: pointer;
    padding: 5px;
    margin-left: 10px;
}

/* Platform Links Styles */
.platform-links {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 25px;
}

.platform-card {
    background: var(--white);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    cursor: pointer;
    transition: var(--transition-normal);
    border: 1px solid rgba(0, 77, 64, 0.1);
}

.platform-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
}

.platform-icon {
    width: 50px;
    height: 50px;
    background: var(--gradient-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font-size: 1.5rem;
    flex-shrink: 0;
}

.platform-content {
    flex: 1;
}

.platform-content h4 {
    color: var(--primary-green);
    margin-bottom: 5px;
    font-size: 1.1rem;
}

.platform-content p {
    color: var(--text-light);
    margin-bottom: 10px;
    font-size: 0.9rem;
}

.platform-link {
    color: var(--accent-teal);
    font-size: 0.9rem;
    font-weight: var(--font-weight-medium);
    display: flex;
    align-items: center;
    gap: 5px;
}

/* Website Button in Mobile App */
.website-btn {
    background: none;
    border: none;
    font-size: 1.3rem;
    color: var(--gray);
    cursor: pointer;
    padding: 8px;
    border-radius: var(--radius-sm);
    transition: var(--transition-fast);
    position: relative;
    min-width: 48px;
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-tap-highlight-color: transparent;
}

.website-btn:hover {
    background: var(--light-green);
    color: var(--primary-green);
}

.website-link-btn {
    width: 100%;
    background: var(--white);
    color: var(--primary-green);
    border: 1px solid var(--primary-green);
    padding: 12px;
    border-radius: var(--radius-md);
    font-weight: var(--font-weight-semibold);
    cursor: pointer;
    transition: var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 10px;
    min-height: 48px;
    -webkit-tap-highlight-color: transparent;
}

.website-link-btn:hover {
    background: var(--light-green);
}

/* Page Actions */
.page-actions {
    margin-top: 10px;
}

@media (max-width: 480px) {
    .platform-card {
        flex-direction: column;
        text-align: center;
        padding: 15px;
    }
    
    .platform-content h4 {
        margin-top: 10px;
    }
    
    .platform-link {
        justify-content: center;
    }
    
    .banner-content {
        gap: 10px;
    }
    
    .banner-icon {
        width: 30px;
        height: 30px;
        font-size: 1rem;
    }
    
    .banner-text p {
        font-size: 0.9rem;
    }
    
    .banner-btn {
        padding: 6px 10px;
        font-size: 0.9rem;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', crossPlatformStyles);