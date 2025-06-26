// FinergyCloud Mobile App JavaScript

class FinergyCloudApp {
    constructor() {
        this.currentPage = 'dashboard';
        this.sideNavOpen = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showLoadingScreen();
        this.initializeApp();
    }

    setupEventListeners() {
        // Menu toggle
        document.getElementById('menu-toggle').addEventListener('click', () => {
            this.toggleSideNav();
        });

        // Overlay click
        document.getElementById('overlay').addEventListener('click', () => {
            this.closeSideNav();
        });

        // Navigation links
        document.querySelectorAll('.nav-link, .nav-btn, .action-card').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                if (page) {
                    this.navigateToPage(page);
                    this.closeSideNav();
                }
            });
        });

        // Dark mode toggle
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('change', (e) => {
                this.toggleDarkMode(e.target.checked);
            });
        }

        // Notification button
        document.querySelector('.notification-btn').addEventListener('click', () => {
            this.showNotifications();
        });

        // Profile button
        document.querySelector('.profile-btn').addEventListener('click', () => {
            this.showProfile();
        });

        // Filter tabs
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchTab(tab);
            });
        });

        // Swipe gestures for mobile
        this.setupSwipeGestures();
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const mainApp = document.getElementById('main-app');
        
        // Simulate loading time
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                mainApp.style.display = 'flex';
                mainApp.style.opacity = '0';
                setTimeout(() => {
                    mainApp.style.opacity = '1';
                }, 50);
            }, 300);
        }, 2000);
    }

    initializeApp() {
        // Initialize default page
        this.navigateToPage('dashboard');
        
        // Load user preferences
        this.loadUserPreferences();
        
        // Setup periodic data refresh
        this.setupDataRefresh();
        
        // Initialize PWA features
        this.initializePWA();
    }

    toggleSideNav() {
        const sideNav = document.getElementById('side-nav');
        const overlay = document.getElementById('overlay');
        
        this.sideNavOpen = !this.sideNavOpen;
        
        if (this.sideNavOpen) {
            sideNav.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            sideNav.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    closeSideNav() {
        if (this.sideNavOpen) {
            this.toggleSideNav();
        }
    }

    navigateToPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show target page
        const targetPage = document.getElementById(`${pageId}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageId;
        }

        // Update navigation states
        this.updateNavigationState(pageId);
        
        // Update page title
        this.updatePageTitle(pageId);
        
        // Trigger page-specific initialization
        this.initializePage(pageId);
    }

    updateNavigationState(pageId) {
        // Update side navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const sideNavLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
        if (sideNavLink) {
            sideNavLink.closest('.nav-item').classList.add('active');
        }

        // Update bottom navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const bottomNavBtn = document.querySelector(`.nav-btn[data-page="${pageId}"]`);
        if (bottomNavBtn) {
            bottomNavBtn.classList.add('active');
        }
    }

    updatePageTitle(pageId) {
        const titles = {
            dashboard: 'Dashboard',
            projects: 'Projects',
            analytics: 'Analytics',
            calculator: 'IRR Calculator',
            esg: 'ESG Scoring',
            market: 'Market Intelligence',
            settings: 'Settings'
        };
        
        document.title = `${titles[pageId] || 'FinergyCloud'} - FinergyCloud Mobile`;
    }

    initializePage(pageId) {
        switch (pageId) {
            case 'dashboard':
                this.initializeDashboard();
                break;
            case 'projects':
                this.initializeProjects();
                break;
            case 'calculator':
                this.initializeCalculator();
                break;
            case 'esg':
                this.initializeESG();
                break;
            case 'analytics':
                this.initializeAnalytics();
                break;
            case 'market':
                this.initializeMarket();
                break;
            case 'settings':
                this.initializeSettings();
                break;
        }
    }

    initializeDashboard() {
        // Animate stats cards
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'slideInUp 0.5s ease forwards';
            }, index * 100);
        });

        // Load recent projects
        this.loadRecentProjects();
        
        // Update dashboard metrics
        this.updateDashboardMetrics();
    }

    initializeProjects() {
        // Load projects data
        this.loadProjectsData();
        
        // Setup project filters
        this.setupProjectFilters();
    }

    initializeCalculator() {
        // Setup calculator form validation
        this.setupCalculatorValidation();
        
        // Load saved calculations
        this.loadSavedCalculations();
    }

    initializeESG() {
        // Animate progress bars
        this.animateProgressBars();
        
        // Load ESG data
        this.loadESGData();
    }

    initializeAnalytics() {
        // Initialize charts
        this.initializeCharts();
        
        // Load analytics data
        this.loadAnalyticsData();
    }

    initializeMarket() {
        // Load market data
        this.loadMarketData();
        
        // Setup real-time updates
        this.setupMarketUpdates();
    }

    initializeSettings() {
        // Load user settings
        this.loadUserSettings();
        
        // Setup settings handlers
        this.setupSettingsHandlers();
    }

    loadRecentProjects() {
        // Simulate API call
        const projects = [
            {
                id: 1,
                name: 'Solar Farm Kenya',
                description: '50MW Solar Installation',
                location: 'Kenya',
                date: 'Dec 2024',
                irr: 15.2,
                esg: 9.1,
                status: 'active'
            },
            {
                id: 2,
                name: 'Wind Farm Nigeria',
                description: '100MW Wind Installation',
                location: 'Nigeria',
                date: 'Nov 2024',
                irr: 12.8,
                esg: 8.7,
                status: 'planning'
            }
        ];

        // Update UI with projects data
        this.renderProjects(projects);
    }

    renderProjects(projects) {
        const projectList = document.querySelector('.project-list');
        if (!projectList) return;

        projectList.innerHTML = projects.map(project => `
            <div class="project-card">
                <div class="project-info">
                    <h4>${project.name}</h4>
                    <p>${project.description}</p>
                    <div class="project-meta">
                        <span class="meta-item">
                            <i class="bi bi-geo-alt"></i>
                            ${project.location}
                        </span>
                        <span class="meta-item">
                            <i class="bi bi-calendar"></i>
                            ${project.date}
                        </span>
                    </div>
                </div>
                <div class="project-metrics">
                    <div class="metric">
                        <span class="metric-label">IRR</span>
                        <span class="metric-value positive">${project.irr}%</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">ESG</span>
                        <span class="metric-value">${project.esg}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    updateDashboardMetrics() {
        // Simulate real-time data updates
        const metrics = {
            activeProjects: 12,
            avgIRR: 14.2,
            avgESG: 8.5,
            riskLevel: 'Medium'
        };

        // Animate counter updates
        this.animateCounters(metrics);
    }

    animateCounters(metrics) {
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach((card, index) => {
            const value = card.querySelector('h3');
            const targetValue = Object.values(metrics)[index];
            
            if (typeof targetValue === 'number') {
                this.animateNumber(value, 0, targetValue, 1000);
            } else {
                value.textContent = targetValue;
            }
        });
    }

    animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        const isDecimal = end % 1 !== 0;
        
        const updateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = start + (end - start) * progress;
            element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        };
        
        requestAnimationFrame(updateNumber);
    }

    animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress');
        progressBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }, index * 200);
        });
    }

    switchTab(activeTab) {
        // Remove active class from all tabs
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Add active class to clicked tab
        activeTab.classList.add('active');
        
        // Filter content based on tab
        const filter = activeTab.textContent.toLowerCase();
        this.filterProjects(filter);
    }

    filterProjects(filter) {
        // Implement project filtering logic
        console.log('Filtering projects by:', filter);
    }

    setupSwipeGestures() {
        let startX = 0;
        let startY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Horizontal swipe
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - open side nav
                    if (!this.sideNavOpen) {
                        this.toggleSideNav();
                    }
                } else {
                    // Swipe right - close side nav
                    if (this.sideNavOpen) {
                        this.closeSideNav();
                    }
                }
            }
            
            startX = 0;
            startY = 0;
        });
    }

    toggleDarkMode(enabled) {
        if (enabled) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('darkMode', 'disabled');
        }
    }

    loadUserPreferences() {
        // Load dark mode preference
        const darkMode = localStorage.getItem('darkMode');
        if (darkMode === 'enabled') {
            document.documentElement.setAttribute('data-theme', 'dark');
            const toggle = document.getElementById('dark-mode-toggle');
            if (toggle) toggle.checked = true;
        }
        
        // Load other preferences
        const lastPage = localStorage.getItem('lastPage');
        if (lastPage && lastPage !== 'dashboard') {
            this.navigateToPage(lastPage);
        }
    }

    setupDataRefresh() {
        // Refresh data every 5 minutes
        setInterval(() => {
            this.refreshData();
        }, 5 * 60 * 1000);
    }

    refreshData() {
        if (this.currentPage === 'dashboard') {
            this.updateDashboardMetrics();
            this.loadRecentProjects();
        }
    }

    initializePWA() {
        // Register service worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js')
                .then(registration => {
                    console.log('SW registered:', registration);
                })
                .catch(error => {
                    console.log('SW registration failed:', error);
                });
        }
        
        // Handle install prompt
        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            this.showInstallPrompt();
        });
    }

    showInstallPrompt() {
        // Show custom install prompt
        const installBanner = document.createElement('div');
        installBanner.className = 'install-banner';
        installBanner.innerHTML = `
            <div class="install-content">
                <span>Install FinergyCloud for better experience</span>
                <button class="install-btn">Install</button>
                <button class="dismiss-btn">×</button>
            </div>
        `;
        
        document.body.appendChild(installBanner);
        
        // Handle install button click
        installBanner.querySelector('.install-btn').addEventListener('click', () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    deferredPrompt = null;
                    installBanner.remove();
                });
            }
        });
        
        // Handle dismiss button click
        installBanner.querySelector('.dismiss-btn').addEventListener('click', () => {
            installBanner.remove();
        });
    }

    showNotifications() {
        // Show notifications panel
        const notifications = [
            {
                id: 1,
                title: 'New Project Added',
                message: 'Solar Farm Kenya has been added to your portfolio',
                time: '2 hours ago',
                type: 'info'
            },
            {
                id: 2,
                title: 'IRR Update',
                message: 'Wind Farm Nigeria IRR updated to 12.8%',
                time: '4 hours ago',
                type: 'success'
            },
            {
                id: 3,
                title: 'Market Alert',
                message: 'Renewable energy market showing positive trends',
                time: '1 day ago',
                type: 'warning'
            }
        ];
        
        this.showModal('Notifications', this.renderNotifications(notifications));
    }

    renderNotifications(notifications) {
        return `
            <div class="notifications-list">
                ${notifications.map(notification => `
                    <div class="notification-item ${notification.type}">
                        <div class="notification-content">
                            <h4>${notification.title}</h4>
                            <p>${notification.message}</p>
                            <span class="notification-time">${notification.time}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    showProfile() {
        const profileContent = `
            <div class="profile-content">
                <div class="profile-avatar">
                    <i class="bi bi-person-circle"></i>
                </div>
                <h3>Demo User</h3>
                <p>Investment Analyst</p>
                <div class="profile-stats">
                    <div class="profile-stat">
                        <span class="stat-value">12</span>
                        <span class="stat-label">Projects</span>
                    </div>
                    <div class="profile-stat">
                        <span class="stat-value">6</span>
                        <span class="stat-label">Months Active</span>
                    </div>
                </div>
                <div class="profile-actions">
                    <button class="btn-primary">Edit Profile</button>
                    <button class="btn-secondary">Sign Out</button>
                </div>
            </div>
        `;
        
        this.showModal('Profile', profileContent);
    }

    showModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Handle close button
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });
        
        // Handle overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Animate in
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }

    // Additional methods for other features
    loadProjectsData() {
        // Implement projects data loading
    }

    setupProjectFilters() {
        // Implement project filtering
    }

    setupCalculatorValidation() {
        // Implement calculator form validation
    }

    loadSavedCalculations() {
        // Implement saved calculations loading
    }

    loadESGData() {
        // Implement ESG data loading
    }

    initializeCharts() {
        // Implement charts initialization
    }

    loadAnalyticsData() {
        // Implement analytics data loading
    }

    loadMarketData() {
        // Implement market data loading
    }

    setupMarketUpdates() {
        // Implement real-time market updates
    }

    loadUserSettings() {
        // Implement user settings loading
    }

    setupSettingsHandlers() {
        // Implement settings change handlers
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.finergyApp = new FinergyCloudApp();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && window.finergyApp) {
        window.finergyApp.refreshData();
    }
});

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('App is online');
    if (window.finergyApp) {
        window.finergyApp.refreshData();
    }
});

window.addEventListener('offline', () => {
    console.log('App is offline');
});