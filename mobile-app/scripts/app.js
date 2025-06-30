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
        this.loadUserPreferences();
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

        // Close navigation when clicking outside on desktop
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
        const validPages = ['dashboard', 'calculator', 'projects', 'analytics', 'esg', 'settings', 'blog'];
        return validPages.includes(pageId);
    }

    initializePages() {
        // Initialize all pages that need setup
        this.initializePage('dashboard');
        this.initializePage('calculator');
        this.initializePage('projects');
        this.initializePage('analytics');
        this.initializePage('esg');
        this.initializePage('settings');
        this.initializePage('blog');
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
            case 'analytics':
                this.initializeAnalytics();
                break;
            case 'esg':
                this.initializeESG();
                break;
            case 'settings':
                this.initializeSettings();
                break;
            case 'blog':
                this.initializeBlog();
                break;
        }
    }

    initializeDashboard() {
        // Animate dashboard metrics
        this.animateMetrics();
        
        // Update real-time data
        this.updateDashboardData();
    }

    initializeCalculator() {
        // Setup calculator form validation
        this.setupCalculatorValidation();
        
        // Load saved calculations
        this.loadSavedCalculations();
    }

    initializeProjects() {
        // Load project data
        this.loadProjectData();
        
        // Setup project filters
        this.setupProjectFilters();
    }

    initializeAnalytics() {
        // Initialize charts
        if (window.chartsManager) {
            window.chartsManager.createChart('portfolio-chart');
            window.chartsManager.createChart('performance-chart');
            window.chartsManager.createChart('risk-chart');
        }
    }

    initializeESG() {
        // Load ESG data
        this.loadESGData();
        
        // Setup ESG scoring
        this.setupESGScoring();
    }

    initializeSettings() {
        // Load user settings
        this.loadUserSettings();
        
        // Setup settings form handlers
        this.setupSettingsHandlers();
    }

    initializeBlog() {
        // Initialize blog functionality
        if (window.mobileBlog) {
            console.log('Blog functionality already initialized');
        } else {
            // Create blog page if it doesn't exist
            this.createBlogPage();
        }
    }

    createBlogPage() {
        const mainContent = document.getElementById('main-content');
        if (mainContent && !document.getElementById('blog-page')) {
            const blogPage = document.createElement('div');
            blogPage.className = 'page';
            blogPage.id = 'blog-page';
            blogPage.innerHTML = `
                <div class="page-header">
                    <h1>Blog & Insights</h1>
                    <p>Expert insights on AI-driven renewable energy investment</p>
                </div>

                <div class="section">
                    <div class="section-header">
                        <h2 class="section-title">Latest Articles</h2>
                        <a href="https://finergycloud.com/blog.html" target="_blank" class="section-action">
                            View All on Website
                        </a>
                    </div>
                    
                    <div class="blog-posts-mobile">
                        <div class="blog-post-mobile">
                            <div class="post-image-small">
                                <img src="../assets/images/wind-turbine.jpg" alt="AI Revolution" class="img-fluid rounded">
                                <div class="post-category-small">AI & Technology</div>
                            </div>
                            <div class="post-content-small">
                                <div class="post-meta-small">
                                    <span><i class="bi bi-calendar"></i> Dec 15, 2024</span>
                                    <span><i class="bi bi-clock"></i> 5 min read</span>
                                </div>
                                <h4>The AI Revolution in Renewable Energy Investment</h4>
                                <p>Discover how AI is transforming renewable energy investment decisions and why traditional models are failing.</p>
                                <div class="post-actions-small">
                                    <button class="btn btn-primary btn-sm" onclick="window.open('https://finergycloud.com/blog.html', '_blank')">
                                        Read More
                                    </button>
                                    <button class="btn btn-outline-primary btn-sm" onclick="window.open('https://www.linkedin.com/feed/', '_blank')">
                                        <i class="bi bi-linkedin"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="blog-post-mobile">
                            <div class="post-image-small">
                                <img src="../assets/images/investment.jpg" alt="ESG Scoring" class="img-fluid rounded">
                                <div class="post-category-small">ESG & Sustainability</div>
                            </div>
                            <div class="post-content-small">
                                <div class="post-meta-small">
                                    <span><i class="bi bi-calendar"></i> Dec 12, 2024</span>
                                    <span><i class="bi bi-clock"></i> 4 min read</span>
                                </div>
                                <h4>ESG Scoring Revolution: Making Sustainability Measurable</h4>
                                <p>How AI is revolutionizing ESG scoring and making environmental impact quantifiable.</p>
                                <div class="post-actions-small">
                                    <button class="btn btn-primary btn-sm" onclick="window.open('https://finergycloud.com/blog.html', '_blank')">
                                        Read More
                                    </button>
                                    <button class="btn btn-outline-primary btn-sm" onclick="window.open('https://www.linkedin.com/feed/', '_blank')">
                                        <i class="bi bi-linkedin"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="blog-post-mobile">
                            <div class="post-image-small">
                                <img src="../assets/images/digital-banking.jpg" alt="Emerging Markets" class="img-fluid rounded">
                                <div class="post-category-small">Emerging Markets</div>
                            </div>
                            <div class="post-content-small">
                                <div class="post-meta-small">
                                    <span><i class="bi bi-calendar"></i> Dec 10, 2024</span>
                                    <span><i class="bi bi-clock"></i> 6 min read</span>
                                </div>
                                <h4>The $2.8 Trillion Opportunity in Emerging Markets</h4>
                                <p>Why emerging markets represent the future of renewable energy investment.</p>
                                <div class="post-actions-small">
                                    <button class="btn btn-primary btn-sm" onclick="window.open('https://finergycloud.com/blog.html', '_blank')">
                                        Read More
                                    </button>
                                    <button class="btn btn-outline-primary btn-sm" onclick="window.open('https://www.linkedin.com/feed/', '_blank')">
                                        <i class="bi bi-linkedin"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <div class="section-header">
                        <h2 class="section-title">YouTube Channel</h2>
                    </div>
                    <div class="card">
                        <div class="card-body text-center">
                            <div class="youtube-icon mb-3">
                                <i class="bi bi-youtube" style="font-size: 3rem; color: #ff0000;"></i>
                            </div>
                            <h4>FinergyCloud Official</h4>
                            <p>Watch our latest videos on renewable energy investment and AI technology.</p>
                            <button class="btn btn-danger btn-block" onclick="window.open('https://www.youtube.com/@FinergyCloud_official', '_blank')">
                                <i class="bi bi-youtube me-2"></i>Subscribe to Channel
                            </button>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <div class="section-header">
                        <h2 class="section-title">Newsletter</h2>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h4>Stay Updated</h4>
                            <p>Get weekly insights delivered to your inbox</p>
                            <div class="form-group">
                                <input type="email" class="form-control" placeholder="Enter your email" id="mobile-newsletter-email">
                            </div>
                            <button class="btn btn-primary btn-block" onclick="finergyApp.subscribeNewsletter()">
                                <i class="bi bi-envelope me-2"></i>Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            `;
            mainContent.appendChild(blogPage);
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

    updateDashboardData() {
        // Simulate real-time data updates
        const metrics = [
            { element: '.metric-value', values: ['15.2%', '$2.4M', '12', '8.7'] }
        ];
        
        // This would typically fetch real data from an API
        console.log('Dashboard data updated');
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

    loadSavedCalculations() {
        const savedCalculations = JSON.parse(localStorage.getItem('savedCalculations') || '[]');
        console.log(`Loaded ${savedCalculations.length} saved calculations`);
    }

    loadProjectData() {
        // Load project data from localStorage or API
        const projects = JSON.parse(localStorage.getItem('projects') || '[]');
        console.log(`Loaded ${projects.length} projects`);
    }

    setupProjectFilters() {
        // Setup project filtering functionality
        console.log('Project filters initialized');
    }

    loadESGData() {
        // Load ESG scoring data
        console.log('ESG data loaded');
    }

    setupESGScoring() {
        // Setup ESG scoring functionality
        console.log('ESG scoring initialized');
    }

    loadUserSettings() {
        // Load user settings from localStorage
        const settings = JSON.parse(localStorage.getItem('userSettings') || '{}');
        
        // Apply settings to form
        const displayNameInput = document.querySelector('#settings-page input[type="text"]');
        const emailInput = document.querySelector('#settings-page input[type="email"]');
        const roleSelect = document.querySelector('#settings-page select');
        const currencySelect = document.querySelectorAll('#settings-page select')[1];
        const notificationsCheckbox = document.querySelector('#settings-page input[type="checkbox"]');
        
        if (settings.displayName && displayNameInput) {
            displayNameInput.value = settings.displayName;
        }
        if (settings.email && emailInput) {
            emailInput.value = settings.email;
        }
        if (settings.role && roleSelect) {
            roleSelect.value = settings.role;
        }
        if (settings.currency && currencySelect) {
            currencySelect.value = settings.currency;
        }
        if (settings.notifications !== undefined && notificationsCheckbox) {
            notificationsCheckbox.checked = settings.notifications;
        }
        
        console.log('User settings loaded');
    }

    setupSettingsHandlers() {
        // Setup settings form handlers
        const settingsInputs = document.querySelectorAll('#settings-page input, #settings-page select');
        settingsInputs.forEach(input => {
            input.addEventListener('change', () => {
                this.saveUserSettings();
            });
        });
    }

    saveUserSettings() {
        const displayNameInput = document.querySelector('#settings-page input[type="text"]');
        const emailInput = document.querySelector('#settings-page input[type="email"]');
        const roleSelect = document.querySelector('#settings-page select');
        const currencySelect = document.querySelectorAll('#settings-page select')[1];
        const notificationsCheckbox = document.querySelector('#settings-page input[type="checkbox"]');
        
        const settings = {
            displayName: displayNameInput?.value || 'Demo User',
            email: emailInput?.value || 'demo@finergycloud.com',
            role: roleSelect?.value || 'Investment Analyst',
            currency: currencySelect?.value || 'USD ($)',
            notifications: notificationsCheckbox?.checked || true,
            lastUpdated: new Date().toISOString()
        };
        
        localStorage.setItem('userSettings', JSON.stringify(settings));
        
        // Show save confirmation
        this.showToast('Settings saved successfully!', 'success');
        
        console.log('User settings saved');
    }

    loadUserPreferences() {
        // Load user preferences from localStorage
        const preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
        
        // Apply theme preferences
        if (preferences.theme) {
            document.body.setAttribute('data-theme', preferences.theme);
        }
        
        console.log('User preferences loaded');
    }

    subscribeNewsletter() {
        const emailInput = document.getElementById('mobile-newsletter-email');
        if (!emailInput || !emailInput.value) {
            this.showToast('Please enter your email address', 'warning');
            return;
        }
        
        // Simulate newsletter subscription
        this.showToast('Thank you for subscribing! You\'ll receive weekly insights.', 'success');
        emailInput.value = '';
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

    // Public methods for external access
    getCurrentPage() {
        return this.currentPage;
    }

    isNavigationOpen() {
        return this.isNavOpen;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.finergyApp = new FinergyCloudApp();
});

// Add mobile app specific styles
const mobileAppStyles = `
<style>
/* Mobile App Toast Styles */
.mobile-toast {
    position: fixed;
    top: calc(var(--header-height) + var(--safe-area-top) + var(--spacing-md));
    left: var(--spacing-md);
    right: var(--spacing-md);
    background: var(--white);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    padding: var(--spacing-md);
    z-index: 1002;
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
    gap: var(--spacing-sm);
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

/* Blog Post Styles for Mobile */
.blog-posts-mobile {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.blog-post-mobile {
    background: var(--white);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
    display: flex;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    border: 1px solid rgba(0, 77, 64, 0.05);
    transition: var(--transition-normal);
}

.blog-post-mobile:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
}

.post-image-small {
    position: relative;
    flex-shrink: 0;
    width: 100px;
    height: 100px;
}

.post-image-small img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--radius-sm);
}

.post-category-small {
    position: absolute;
    top: var(--spacing-xs);
    left: var(--spacing-xs);
    background: var(--gradient-primary);
    color: var(--white);
    padding: 0.25rem var(--spacing-xs);
    border-radius: var(--radius-sm);
    font-size: 0.6rem;
    font-weight: var(--font-weight-semibold);
}

.post-content-small {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.post-meta-small {
    display: flex;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-xs);
    font-size: 0.75rem;
    color: var(--gray);
    flex-wrap: wrap;
}

.post-meta-small span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.post-content-small h4 {
    color: var(--primary-green);
    margin-bottom: var(--spacing-xs);
    font-size: 0.9rem;
    font-weight: var(--font-weight-semibold);
    line-height: 1.3;
}

.post-content-small p {
    color: var(--text-light);
    margin-bottom: var(--spacing-sm);
    font-size: 0.8rem;
    line-height: 1.4;
    flex: 1;
}

.post-actions-small {
    display: flex;
    gap: var(--spacing-xs);
    margin-top: auto;
}

/* Calculator Input Validation */
.form-control.valid {
    border-color: var(--success);
    box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1);
}

.form-control.invalid {
    border-color: var(--danger);
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

/* Chart Placeholder */
.chart-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
    background: var(--light-gray);
    border-radius: var(--radius-md);
    color: var(--gray);
    text-align: center;
}

.chart-placeholder i {
    font-size: 2rem;
    margin-bottom: var(--spacing-sm);
}

@media (max-width: 480px) {
    .blog-post-mobile {
        flex-direction: column;
    }
    
    .post-image-small {
        width: 100%;
        height: 150px;
    }
    
    .post-actions-small {
        flex-direction: column;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', mobileAppStyles);