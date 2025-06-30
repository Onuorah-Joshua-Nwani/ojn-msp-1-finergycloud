// Cross-Platform Navigation for FinergyCloud Mobile App
// Handles navigation between mobile app and website

class MobileCrossPlatformNavigation {
    constructor() {
        this.isMobile = this.detectMobile();
        this.isInApp = true; // We're in the mobile app context
        this.init();
    }

    init() {
        this.setupNavigationHandlers();
        this.enhanceWebsiteLinks();
        this.setupDeepLinking();
    }

    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    setupNavigationHandlers() {
        // Handle website links in mobile app
        document.addEventListener('click', (e) => {
            const websiteLink = e.target.closest('.website-btn, .website-link-btn, [data-website-link]');
            if (websiteLink) {
                e.preventDefault();
                const url = websiteLink.getAttribute('data-url') || 'https://finergycloud.com';
                this.navigateToWebsite(url);
            }
        });

        // Add website navigation to global app object
        if (window.finergyApp) {
            window.finergyApp.navigateToWebsite = this.navigateToWebsite.bind(this);
        } else {
            window.navigateToWebsite = this.navigateToWebsite.bind(this);
        }
    }

    navigateToWebsite(url = 'https://finergycloud.com') {
        // Open website in new tab/window
        window.open(url, '_blank');
    }

    enhanceWebsiteLinks() {
        // Add website button to navigation if not already present
        const navRight = document.querySelector('.nav-right');
        if (navRight && !document.querySelector('.website-btn')) {
            const websiteBtn = document.createElement('button');
            websiteBtn.className = 'website-btn';
            websiteBtn.setAttribute('aria-label', 'Visit Website');
            websiteBtn.innerHTML = '<i class="bi bi-globe"></i>';
            websiteBtn.addEventListener('click', () => this.navigateToWebsite());
            
            // Insert before notifications button
            const notificationBtn = document.querySelector('.notification-btn');
            if (notificationBtn) {
                navRight.insertBefore(websiteBtn, notificationBtn);
            } else {
                navRight.appendChild(websiteBtn);
            }
        }

        // Add website link to side navigation footer if not already present
        const navFooter = document.querySelector('.nav-footer');
        if (navFooter && !document.querySelector('.website-link-btn')) {
            const websiteLinkBtn = document.createElement('button');
            websiteLinkBtn.className = 'website-link-btn';
            websiteLinkBtn.innerHTML = '<i class="bi bi-globe"></i><span>Visit Website</span>';
            websiteLinkBtn.addEventListener('click', () => this.navigateToWebsite());
            
            // Insert before upgrade button
            const upgradeBtn = document.querySelector('.upgrade-btn');
            if (upgradeBtn) {
                navFooter.insertBefore(websiteLinkBtn, upgradeBtn);
            } else {
                navFooter.appendChild(websiteLinkBtn);
            }
        }

        // Add website links to each page header
        document.querySelectorAll('.page-header').forEach(header => {
            if (!header.querySelector('.page-actions')) {
                const pageActions = document.createElement('div');
                pageActions.className = 'page-actions';
                pageActions.innerHTML = `
                    <button class="btn btn-outline-primary" onclick="window.open('https://finergycloud.com', '_blank')">
                        <i class="bi bi-globe me-2"></i>Full Website
                    </button>
                `;
                header.appendChild(pageActions);
            }
        });
    }

    setupDeepLinking() {
        // Parse URL parameters for deep linking
        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get('page');
        const section = urlParams.get('section');
        
        if (page) {
            // Navigate to specific page if specified
            setTimeout(() => {
                if (window.finergyApp) {
                    window.finergyApp.navigateToPage(page);
                }
            }, 1500); // Delay to allow app to initialize
        }
        
        // Handle specific deep links
        if (page === 'blog' && section) {
            // Navigate to specific blog post
            setTimeout(() => {
                if (window.mobileBlog) {
                    window.mobileBlog.readPost(section);
                }
            }, 2000);
        }
    }

    // Method to generate deep links for sharing
    generateDeepLink(page, section = null) {
        let url = `${window.location.origin}/mobile-app/?page=${page}`;
        if (section) {
            url += `&section=${section}`;
        }
        return url;
    }

    // Method to share deep link
    shareDeepLink(page, section = null, platform = 'general') {
        const url = this.generateDeepLink(page, section);
        const title = 'FinergyCloud Mobile App';
        const text = 'Check out this section in the FinergyCloud mobile app!';
        
        if (navigator.share) {
            navigator.share({
                title: title,
                text: text,
                url: url
            }).catch(err => {
                console.error('Share failed:', err);
                this.fallbackShare(url, platform);
            });
        } else {
            this.fallbackShare(url, platform);
        }
    }

    fallbackShare(url, platform) {
        switch (platform) {
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=Check out FinergyCloud Mobile App`);
                break;
            case 'email':
                window.open(`mailto:?subject=FinergyCloud Mobile App&body=Check out this link: ${url}`);
                break;
            default:
                // Copy to clipboard
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(url)
                        .then(() => {
                            this.showToast('Link copied to clipboard!');
                        })
                        .catch(err => {
                            console.error('Could not copy text: ', err);
                        });
                } else {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = url;
                    textArea.style.position = 'fixed';
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    
                    try {
                        document.execCommand('copy');
                        this.showToast('Link copied to clipboard!');
                    } catch (err) {
                        console.error('Could not copy text: ', err);
                    }
                    
                    document.body.removeChild(textArea);
                }
        }
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'mobile-toast info';
        toast.innerHTML = `
            <div class="toast-content">
                <i class="bi bi-info-circle"></i>
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

// Initialize mobile cross-platform navigation
document.addEventListener('DOMContentLoaded', () => {
    window.mobileCrossPlatformNav = new MobileCrossPlatformNavigation();
});

// Add mobile cross-platform navigation styles
const mobileCrossPlatformStyles = `
<style>
/* Mobile Cross-Platform Navigation Styles */
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

.website-btn:hover,
.website-btn:active {
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

.website-link-btn:hover,
.website-link-btn:active {
    background: var(--light-green);
}

.page-actions {
    margin-top: 10px;
}

.page-actions .btn {
    margin-right: 8px;
}

/* Deep Link Toast */
.mobile-toast {
    position: fixed;
    top: calc(var(--header-height) + var(--spacing-md));
    left: var(--spacing-md);
    right: var(--spacing-md);
    background: var(--white);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    padding: var(--spacing-md);
    z-index: 1003;
    transform: translateY(-100px);
    opacity: 0;
    transition: all 0.3s ease;
}

.mobile-toast.show {
    transform: translateY(0);
    opacity: 1;
}

.mobile-toast.success {
    border-left: 4px solid var(--success);
}

.mobile-toast.warning {
    border-left: 4px solid var(--warning);
}

.mobile-toast.info {
    border-left: 4px solid var(--info);
}

.mobile-toast .toast-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.mobile-toast.success .toast-content i {
    color: var(--success);
}

.mobile-toast.warning .toast-content i {
    color: var(--warning);
}

.mobile-toast.info .toast-content i {
    color: var(--info);
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', mobileCrossPlatformStyles);