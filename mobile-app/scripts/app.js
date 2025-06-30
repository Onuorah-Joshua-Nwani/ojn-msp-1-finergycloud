// FinergyCloud Mobile App - Main Application Script

class FinergyCloudApp {
    constructor() {
        this.currentPage = 'dashboard';
        this.isNavOpen = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupNavigation();
        this.setupPageSwitching();
        this.initializePages();
        console.log('FinergyCloud Mobile App initialized');
    }

    setupEventListeners() {
        // Menu toggle
        const menuToggle = document.getElementById('menu-toggle');
        const navOverlay = document.getElementById('nav-overlay');
        const sideNav = document.getElementById('side-nav');

        if (menuToggle) {
            menuToggle.addEventListener('click', () => this.toggleNavigation());
        }

        if (navOverlay) {
            navOverlay.addEventListener('click', () => this.closeNavigation());
        }

        // Close navigation when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth >= 1024) return; // Don't close on desktop
            
            if (!sideNav.contains(e.target) && !menuToggle.contains(e.target) && this.isNavOpen) {
                this.closeNavigation();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024) {
                this.closeNavigation();
            }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isNavOpen) {
                this.closeNavigation();
            }
        });
    }

    setupNavigation() {
        // Side navigation links
        const navLinks = document.querySelectorAll('.nav-link[data-page]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.navigateToPage(page);
                if (window.innerWidth < 1024) {
                    this.closeNavigation();
                }
            });
        });

        // Bottom navigation buttons
        const navBtns = document.querySelectorAll('.nav-btn[data-page]');
        navBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const page = btn.getAttribute('data-page');
                this.navigateToPage(page);
            });
        });

        // Quick action cards
        const actionCards = document.querySelectorAll('.action-card[data-page]');
        actionCards.forEach(card => {
            card.addEventListener('click', () => {
                const page = card.getAttribute('data-page');
                this.navigateToPage(page);
            });
        });

        // Section actions
        const sectionActions = document.querySelectorAll('.section-action[data-page]');
        sectionActions.forEach(action => {
            action.addEventListener('click', (e) => {
                e.preventDefault();
                const page = action.getAttribute('data-page');
                this.navigateToPage(page);
            });
        });
    }

    setupPageSwitching() {
        // Handle hash changes for deep linking
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            if (hash && this.isValidPage(hash)) {
                this.navigateToPage(hash);
            }
        });

        // Handle initial page load
        const initialHash = window.location.hash.substring(1);
        if (initialHash && this.isValidPage(initialHash)) {
            this.navigateToPage(initialHash);
        }
    }

    toggleNavigation() {
        if (this.isNavOpen) {
            this.closeNavigation();
        } else {
            this.openNavigation();
        }
    }

    openNavigation() {
        const sideNav = document.getElementById('side-nav');
        const navOverlay = document.getElementById('nav-overlay');
        
        if (sideNav && navOverlay) {
            sideNav.classList.add('open');
            navOverlay.classList.add('active');
            this.isNavOpen = true;
            
            // Prevent body scroll when nav is open
            document.body.style.overflow = 'hidden';
        }
    }

    closeNavigation() {
        const sideNav = document.getElementById('side-nav');
        const navOverlay = document.getElementById('nav-overlay');
        
        if (sideNav && navOverlay) {
            sideNav.classList.remove('open');
            navOverlay.classList.remove('active');
            this.isNavOpen = false;
            
            // Restore body scroll
            document.body.style.overflow = '';
        }
    }

    navigateToPage(pageId) {
        if (!this.isValidPage(pageId)) {
            console.warn(`Invalid page: ${pageId}`);
            return;
        }

        // Hide all pages
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.classList.remove('active');
        });

        // Show target page
        const targetPage = document.getElementById(`${pageId}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageId;
            
            // Update navigation states
            this.updateNavigationState(pageId);
            
            // Update URL hash
            window.location.hash = pageId;
            
            // Initialize page-specific functionality
            this.initializePage(pageId);
            
            // Scroll to top
            window.scrollTo(0, 0);
            
            console.log(`Navigated to page: ${pageId}`);
        }
    }

    updateNavigationState(activePageId) {
        // Update side navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === activePageId) {
                link.classList.add('active');
            }
        });

        // Update bottom navigation
        const navBtns = document.querySelectorAll('.nav-btn');
        navBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-page') === activePageId) {
                btn.classList.add('active');
            }
        });
    }

    isValidPage(pageId) {
        const validPages = ['dashboard', 'calculator', 'projects', 'esg', 'blog'];
        return validPages.includes(pageId);
    }

    initializePages() {
        // Initialize all pages that need setup
        this.initializePage('dashboard');
        this.initializePage('calculator');
        this.initializePage('projects');
        this.initializePage('esg');
        this.initializePage('blog');
    }

    initializePage(pageId) {
        switch (pageId) {
            case 'dashboard':
                this.animateMetrics();
                break;
            case 'calculator':
                this.setupCalculatorValidation();
                break;
            case 'projects':
                // Projects page initialization
                break;
            case 'esg':
                // ESG page initialization
                break;
            case 'blog':
                // Blog page initialization
                break;
        }
    }

    animateMetrics() {
        const metrics = document.querySelectorAll('.metric-value');
        metrics.forEach((metric, index) => {
            setTimeout(() => {
                metric.style.animation = 'scaleIn 0.5s ease';
            }, index * 100);
        });
    }

    setupCalculatorValidation() {
        const inputs = document.querySelectorAll('#calculator-page input[type="number"]');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.validateCalculatorInput(input);
            });
        });
    }

    validateCalculatorInput(input) {
        const value = parseFloat(input.value);
        const min = parseFloat(input.getAttribute('min')) || 0;
        const max = parseFloat(input.getAttribute('max')) || Infinity;

        input.classList.remove('valid', 'invalid');

        if (isNaN(value) || value < min || value > max) {
            input.classList.add('invalid');
            return false;
        } else {
            input.classList.add('valid');
            return true;
        }
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

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.finergyApp = new FinergyCloudApp();
});