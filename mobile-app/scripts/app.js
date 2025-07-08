// FinergyCloud Mobile App - Main Application Script

class FinergyCloudApp {
    constructor() {
        this.currentPage = 'dashboard';
        this.isNavOpen = false;
        this.userPreferences = this.loadUserPreferences();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupNavigation();
        this.setupPageSwitching();
        this.initializePages();
        this.checkForUpdates();
        this.setupOfflineSupport();
        this.setupTheme();
       this.setupLegalNavigation();
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
            
            if (sideNav && menuToggle && !sideNav.contains(e.target) && !menuToggle.contains(e.target) && this.isNavOpen) {
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

        // Handle pull-to-refresh
        this.setupPullToRefresh();

        // Handle online/offline status
        window.addEventListener('online', () => this.handleOnlineStatus(true));
        window.addEventListener('offline', () => this.handleOnlineStatus(false));
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

        // Add page transition effect
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.classList.add('page-transition');
            setTimeout(() => {
                mainContent.classList.remove('page-transition');
            }, 300);
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
            
            // Save last visited page
            this.saveUserPreference('lastPage', pageId);
            
            console.log(`Navigated to page: ${pageId}`);
            
            // Dispatch page activated event
            const event = new CustomEvent('pageActivated', {
                detail: { pageId: pageId }
            });
            document.dispatchEvent(event);
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
       const validPages = ['dashboard', 'calculator', 'projects', 'esg', 'blog', 'xgboost', 'legal', 'analytics'];
        return validPages.includes(pageId);
    }

    initializePages() {
        // Initialize all pages that need setup
        this.initializePage('dashboard');
        this.initializePage('calculator');
        this.initializePage('projects');
        this.initializePage('esg');
        this.initializePage('blog');
        this.initializePage('xgboost');
       this.initializePage('legal');
       this.initializePage('analytics');
        
        // Restore last visited page if available
        const lastPage = this.userPreferences.lastPage;
        if (lastPage && this.isValidPage(lastPage)) {
            this.navigateToPage(lastPage);
        }
    }

    initializePage(pageId) {
        switch (pageId) {
            case 'dashboard':
                this.initializeDashboard();
                break;
            case 'calculator':
                this.initializeCalculator();
                break;
            case 'projects':
                this.initializeProjects();
                break;
            case 'esg':
                this.initializeESG();
                break;
            case 'blog':
                this.initializeBlog();
                break;
            case 'xgboost':
                this.initializeXGBoost();
                break;
           case 'legal':
               this.initializeLegal();
               break;
          case 'analytics':
              this.initializeAnalytics();
              break;
        }
    }

    initializeDashboard() {
        this.animateMetrics();
        this.loadRecentProjects();
        this.loadMarketInsights();
    }

    initializeCalculator() {
        this.setupCalculatorValidation();
        this.loadSavedCalculations();
    }

    initializeProjects() {
        this.loadProjects();
        this.setupProjectFilters();
    }

    initializeESG() {
        this.setupESGCalculator();
        this.loadESGBenchmarks();
    }

    initializeBlog() {
        // Blog initialization is handled by blog-integration.js
    }
    
    initializeXGBoost() {
        // XGBoost initialization is handled by xgboost-model.js
        if (window.xgboostModel) {
            window.xgboostModel.refreshModelContent();
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
            // Add floating label effect
            const label = input.previousElementSibling;
            if (label && label.classList.contains('form-label')) {
                input.addEventListener('focus', function() {
                    label.style.transform = 'translateY(-25px) scale(0.8)';
                    label.style.color = '#007bff';
                });
                
                input.addEventListener('blur', function() {
                    if (!input.value) {
                        label.style.transform = 'translateY(0) scale(1)';
                        label.style.color = '#343a40';
                    }
                });
            }
            
            input.addEventListener('input', () => {
                this.validateCalculatorInput(input);
                this.updateCalculatorPreview();
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

    updateCalculatorPreview() {
        // Get input values
        const initialInvestment = parseFloat(document.getElementById('initial-investment')?.value) || 0;
        const projectDuration = parseFloat(document.getElementById('project-duration')?.value) || 0;
        const annualCashflow = parseFloat(document.getElementById('annual-cashflow')?.value) || 0;
        
        // Simple ROI calculation for preview
        if (initialInvestment > 0 && projectDuration > 0 && annualCashflow > 0) {
            const totalReturns = annualCashflow * projectDuration;
            const simpleROI = ((totalReturns - initialInvestment) / initialInvestment) * 100;
            
            // Update preview element
            const previewElement = document.querySelector('.calculation-preview');
            if (previewElement) {
                previewElement.innerHTML = `
                    <div class="preview-metric">
                        <span>Simple ROI: </span>
                        <span class="text-primary">${simpleROI.toFixed(1)}%</span>
                    </div>
                `;
            }
        }
    }

    loadSavedCalculations() {
        // Load saved calculations from localStorage
        const savedCalculations = JSON.parse(localStorage.getItem('savedCalculations') || '[]');
        
        // Display in UI if needed
        console.log('Loaded saved calculations:', savedCalculations.length);
    }

    loadProjects() {
        // In a real app, this would fetch from an API
        console.log('Loading projects...');
        
        // Simulate loading state
        const projectList = document.querySelector('.project-list');
        if (projectList) {
            projectList.classList.add('loading');
            
            setTimeout(() => {
                projectList.classList.remove('loading');
            }, 1000);
        }
    }

    setupProjectFilters() {
        // Setup project filtering functionality
        console.log('Setting up project filters...');
    }

    setupESGCalculator() {
        // Setup ESG calculator functionality
        console.log('Setting up ESG calculator...');
    }

    loadESGBenchmarks() {
        // Load ESG benchmarks
        console.log('Loading ESG benchmarks...');
    }
    
    initializeAnalytics() {
        console.log('Initializing analytics page...');
        this.loadAnalyticsData();
        this.setupAnalyticsCharts();
    }
    
    loadAnalyticsData() {
        console.log('Loading analytics data...');
        // In a real app, this would fetch data from an API
        
        // Simulate loading state
        const analyticsContainer = document.querySelector('.analytics-container');
        if (analyticsContainer) {
            analyticsContainer.classList.add('loading');
            
            setTimeout(() => {
                analyticsContainer.classList.remove('loading');
                this.animateAnalyticsMetrics();
            }, 1000);
        }
    }
    
    setupAnalyticsCharts() {
        // Setup analytics charts
        console.log('Setting up analytics charts...');
        
        // Initialize charts if they exist
        if (window.chartsManager) {
            const chartContainers = document.querySelectorAll('#analytics-page [id$="-chart"]');
            chartContainers.forEach(container => {
                window.chartsManager.createChart(container.id);
            });
        }
    }
    
    animateAnalyticsMetrics() {
        const metrics = document.querySelectorAll('#analytics-page .metric-value');
        metrics.forEach((metric, index) => {
            setTimeout(() => {
                metric.style.animation = 'scaleIn 0.5s ease';
            }, index * 100);
        });
    }

    loadRecentProjects() {
        // Load recent projects for dashboard
        console.log('Loading recent projects for dashboard...');
    }

    loadMarketInsights() {
        // Load market insights for dashboard
        console.log('Loading market insights...');
    }

   initializeLegal() {
       // Initialize legal page
       console.log('Initializing legal page...');
       this.setupLegalLinks();
   }

   setupLegalLinks() {
       // Set up legal page links
       const legalLinks = document.querySelectorAll('.legal-link-card');
       legalLinks.forEach(link => {
           link.addEventListener('click', (e) => {
               // Allow normal navigation for these links
               // They will open the respective HTML pages
           });
       });
   }

   setupLegalNavigation() {
       // Add legal page to side navigation if not already present
       const navMenu = document.querySelector('.nav-menu');
       if (navMenu && !document.querySelector('.nav-link[data-page="legal"]')) {
           const legalNavItem = document.createElement('li');
           legalNavItem.className = 'nav-item';
           legalNavItem.innerHTML = `
               <a href="#legal" class="nav-link" data-page="legal">
                   <i class="bi bi-shield-lock"></i>
                   <span>Legal</span>
               </a>
           `;
           navMenu.appendChild(legalNavItem);
           
           // Add event listener
           const legalLink = legalNavItem.querySelector('.nav-link');
           legalLink.addEventListener('click', (e) => {
               e.preventDefault();
               this.navigateToPage('legal');
               if (window.innerWidth < 1024) {
                   this.closeNavigation();
               }
           });
       }
   }
    setupPullToRefresh() {
        let touchStartY = 0;
        let touchEndY = 0;
        const threshold = 150;
        let isRefreshing = false;
        
        document.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => {
            if (isRefreshing) return;
            
            touchEndY = e.touches[0].clientY;
            const mainContent = document.getElementById('main-content');
            
            // Only allow pull to refresh at the top of the page
            if (mainContent.scrollTop === 0 && touchEndY > touchStartY) {
                const distance = touchEndY - touchStartY;
                
                if (distance > 50) {
                    // Show pull indicator
                    this.showPullIndicator(Math.min(distance / threshold, 1));
                }
            }
        }, { passive: true });
        
        document.addEventListener('touchend', () => {
            const distance = touchEndY - touchStartY;
            
            if (distance > threshold && !isRefreshing) {
                isRefreshing = true;
                this.refreshCurrentPage();
                
                // Reset after refresh
                setTimeout(() => {
                    this.hidePullIndicator();
                    isRefreshing = false;
                }, 2000);
            } else {
                this.hidePullIndicator();
            }
            
            touchStartY = 0;
            touchEndY = 0;
        }, { passive: true });
    }

    showPullIndicator(progress) {
        let indicator = document.getElementById('pull-indicator');
        
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'pull-indicator';
            indicator.className = 'pull-indicator';
            indicator.innerHTML = `
                <div class="pull-spinner">
                    <i class="bi bi-arrow-repeat"></i>
                </div>
                <span>Pull to refresh</span>
            `;
            document.body.appendChild(indicator);
        }
        
        // Update indicator based on pull progress
        indicator.style.opacity = progress;
        indicator.style.transform = `translateY(${progress * 20}px)`;
        
        if (progress >= 1) {
            indicator.querySelector('span').textContent = 'Release to refresh';
        } else {
            indicator.querySelector('span').textContent = 'Pull to refresh';
        }
    }

    hidePullIndicator() {
        const indicator = document.getElementById('pull-indicator');
        if (indicator) {
            indicator.style.opacity = '0';
            setTimeout(() => {
                indicator.remove();
            }, 300);
        }
    }

    refreshCurrentPage() {
        // Show refreshing state
        this.showToast('Refreshing...', 'info');
        
        // Simulate refresh
        setTimeout(() => {
            this.initializePage(this.currentPage);
            this.showToast('Content updated', 'success');
        }, 1500);
    }

    handleOnlineStatus(isOnline) {
        if (isOnline) {
            this.showToast('You are back online', 'success');
            // Sync any offline changes
            this.syncOfflineChanges();
        } else {
            this.showToast('You are offline. Some features may be limited.', 'warning');
        }
    }

    syncOfflineChanges() {
        // Sync any changes made while offline
        console.log('Syncing offline changes...');
    }

    setupOfflineSupport() {
        // Check if app is being used offline
        if (!navigator.onLine) {
            this.handleOnlineStatus(false);
        }
    }

    checkForUpdates() {
        // Check for app updates
        console.log('Checking for updates...');
        
        // Simulate update check
        setTimeout(() => {
            // Uncomment to show update notification
            // this.showUpdateNotification();
        }, 3000);
    }

    showUpdateNotification() {
        const notification = document.createElement('div');
        notification.className = 'update-notification';
        notification.innerHTML = `
            <div class="update-content">
                <i class="bi bi-arrow-repeat"></i>
                <div class="update-text">
                    <h4>Update Available</h4>
                    <p>A new version of FinergyCloud is available.</p>
                </div>
            </div>
            <div class="update-actions">
                <button class="btn btn-primary btn-sm" id="update-now">Update Now</button>
                <button class="btn btn-secondary btn-sm" id="update-later">Later</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Add event listeners
        document.getElementById('update-now').addEventListener('click', () => {
            this.performUpdate();
            notification.remove();
        });
        
        document.getElementById('update-later').addEventListener('click', () => {
            notification.remove();
        });
    }

    performUpdate() {
        // Perform app update
        this.showToast('Updating application...', 'info');
        
        // Simulate update process
        setTimeout(() => {
            this.showToast('Update complete! Reloading...', 'success');
            
            // Reload the app
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }, 2000);
    }

    setupTheme() {
        // Apply saved theme preference
        const theme = this.userPreferences.theme || 'light';
        this.applyTheme(theme);
        
        // Setup theme toggle if needed
    }

    applyTheme(theme) {
        document.body.classList.remove('theme-light', 'theme-dark');
        document.body.classList.add(`theme-${theme}`);
        this.saveUserPreference('theme', theme);
    }

    loadUserPreferences() {
        // Load user preferences from localStorage
        try {
            return JSON.parse(localStorage.getItem('userPreferences')) || {
                theme: 'light',
                lastPage: 'dashboard',
                notifications: true
            };
        } catch (error) {
            console.error('Error loading user preferences:', error);
            return {
                theme: 'light',
                lastPage: 'dashboard',
                notifications: true
            };
        }
    }

    saveUserPreference(key, value) {
        // Save a specific user preference
        this.userPreferences[key] = value;
        localStorage.setItem('userPreferences', JSON.stringify(this.userPreferences));
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

// Add additional styles for new features
const additionalStyles = `
<style>
/* Page Transition Effect */
.page-transition {
    opacity: 0.5;
    transition: opacity 0.3s ease;
}

/* Pull to Refresh */
.pull-indicator {
    position: fixed;
    top: calc(var(--header-height) + var(--safe-area-top));
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-md);
    background: rgba(255, 255, 255, 0.9);
    z-index: 999;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.pull-spinner {
    animation: spin 1.5s linear infinite;
    font-size: 1.5rem;
    color: var(--primary-green);
    margin-bottom: var(--spacing-xs);
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Update Notification */
.update-notification {
    position: fixed;
    bottom: calc(var(--bottom-nav-height) + var(--safe-area-bottom) + var(--spacing-md));
    left: var(--spacing-md);
    right: var(--spacing-md);
    background: var(--white);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    padding: var(--spacing-md);
    z-index: 1001;
    border-left: 4px solid var(--accent-teal);
}

.update-content {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
}

.update-content i {
    font-size: 1.5rem;
    color: var(--accent-teal);
}

.update-text h4 {
    margin: 0 0 var(--spacing-xs) 0;
    font-size: 1rem;
    color: var(--text-dark);
}

.update-text p {
    margin: 0;
    font-size: 0.875rem;
    color: var(--text-light);
}

.update-actions {
    display: flex;
    gap: var(--spacing-sm);
    justify-content: flex-end;
}

/* Preview Metric */
.preview-metric {
    background: var(--light-green);
    padding: var(--spacing-sm);
    border-radius: var(--radius-sm);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    color: var(--text-dark);
}

/* Dark Theme Support */
.theme-dark {
    --white: #1a1a1a;
    --light-gray: #2a2a2a;
    --gray: #999999;
    --dark-gray: #cccccc;
    --text-dark: #f0f0f0;
    --text-light: #cccccc;
    --text-muted: #999999;
    
    color-scheme: dark;
}

.theme-dark .card,
.theme-dark .metric-card,
.theme-dark .action-card,
.theme-dark .project-card,
.theme-dark .calculator-form,
.theme-dark .calculator-results,
.theme-dark .app-header,
.theme-dark .side-nav,
.theme-dark .bottom-nav {
    background: #2a2a2a;
    border-color: rgba(255, 255, 255, 0.1);
}

.theme-dark .form-control {
    background: #333333;
    border-color: rgba(255, 255, 255, 0.2);
    color: #f0f0f0;
}

.theme-dark .btn-secondary {
    background: #333333;
    color: #f0f0f0;
}

.theme-dark .light-green {
    background: rgba(0, 191, 165, 0.1);
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);