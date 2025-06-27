// Enhanced FinergyCloud Mobile App JavaScript

class FinergyCloudApp {
    constructor() {
        this.currentPage = 'dashboard';
        this.sideNavOpen = false;
        this.deferredPrompt = null;
        this.isOnline = navigator.onLine;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showLoadingScreen();
        this.initializeApp();
        this.setupPWA();
        this.setupOfflineHandling();
    }

    setupEventListeners() {
        // CRITICAL FIX: Enhanced menu toggle with multiple event handling
        const menuToggle = document.getElementById('menu-toggle');
        if (menuToggle) {
            // Remove any existing listeners
            menuToggle.removeEventListener('click', this.handleMenuToggle);
            
            // Add click listener
            menuToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Menu toggle clicked - event triggered'); // Debug log
                this.toggleSideNav();
            });

            // Add touch listener for better mobile support
            menuToggle.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Menu toggle touched - event triggered'); // Debug log
                this.toggleSideNav();
            });
        }

        // Enhanced overlay click handling
        const overlay = document.getElementById('overlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Overlay clicked - closing menu'); // Debug log
                this.closeSideNav();
            });

            overlay.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Overlay touched - closing menu'); // Debug log
                this.closeSideNav();
            });
        }

        // Enhanced side nav click handling to prevent closing when clicking inside
        const sideNav = document.getElementById('side-nav');
        if (sideNav) {
            sideNav.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event bubbling
            });
        }

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
        const notificationBtn = document.getElementById('notification-btn');
        if (notificationBtn) {
            notificationBtn.addEventListener('click', () => {
                this.showNotifications();
            });
        }

        // Profile button
        const profileBtn = document.getElementById('profile-btn');
        if (profileBtn) {
            profileBtn.addEventListener('click', () => {
                this.showProfile();
            });
        }

        // Filter tabs
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchTab(tab);
            });
        });

        // Chart controls
        document.querySelectorAll('.chart-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchChartPeriod(btn);
            });
        });

        // Search functionality
        const searchInput = document.getElementById('project-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchProjects(e.target.value);
            });
        }

        // Swipe gestures for mobile
        this.setupSwipeGestures();

        // Keyboard shortcuts
        this.setupKeyboardShortcuts();

        // CRITICAL: Enhanced body scroll prevention
        document.addEventListener('touchmove', (e) => {
            if (this.sideNavOpen) {
                e.preventDefault();
            }
        }, { passive: false });

        // CRITICAL: Escape key to close menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.sideNavOpen) {
                this.closeSideNav();
            }
        });

        // CRITICAL: Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.sideNavOpen) {
                this.closeSideNav();
            }
        });
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const mainApp = document.getElementById('main-app');
        
        // Enhanced loading sequence
        setTimeout(() => {
            const progressText = document.querySelector('.progress-text');
            if (progressText) {
                progressText.textContent = 'Loading AI Models...';
            }
        }, 1000);

        setTimeout(() => {
            const progressText = document.querySelector('.progress-text');
            if (progressText) {
                progressText.textContent = 'Syncing Data...';
            }
        }, 2000);

        setTimeout(() => {
            const progressText = document.querySelector('.progress-text');
            if (progressText) {
                progressText.textContent = 'Ready!';
            }
        }, 2800);
        
        // Complete loading
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    if (mainApp) {
                        mainApp.style.display = 'flex';
                        mainApp.style.opacity = '0';
                        setTimeout(() => {
                            mainApp.style.opacity = '1';
                            this.animateStatsCards();
                        }, 50);
                    }
                }, 500);
            }
        }, 3500);
    }

    initializeApp() {
        // Initialize default page
        this.navigateToPage('dashboard');
        
        // Load user preferences
        this.loadUserPreferences();
        
        // Setup periodic data refresh
        this.setupDataRefresh();
        
        // Initialize charts
        this.initializeCharts();
        
        // Setup notifications
        this.setupNotifications();
    }

    setupPWA() {
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
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallPrompt();
        });

        // Handle app installed
        window.addEventListener('appinstalled', () => {
            this.hideInstallPrompt();
            this.showToast('App installed successfully!', 'success');
        });
    }

    setupOfflineHandling() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.showToast('Connection restored', 'success');
            this.refreshData();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.showToast('You are offline. Some features may be limited.', 'warning');
        });
    }

    // CRITICAL FIX: Enhanced toggle function with better state management
    toggleSideNav() {
        const sideNav = document.getElementById('side-nav');
        const overlay = document.getElementById('overlay');
        const body = document.body;
        
        console.log('Toggle side nav called, current state:', this.sideNavOpen); // Debug log
        
        this.sideNavOpen = !this.sideNavOpen;
        
        if (this.sideNavOpen) {
            console.log('Opening side nav'); // Debug log
            
            // Add classes
            if (sideNav) {
                sideNav.classList.add('open');
                sideNav.style.transform = 'translateX(0)';
                sideNav.style.visibility = 'visible';
            }
            if (overlay) {
                overlay.classList.add('active');
                overlay.style.display = 'block';
            }
            
            // Prevent body scroll
            body.style.overflow = 'hidden';
            body.style.position = 'fixed';
            body.style.width = '100%';
            body.style.height = '100%';
            
            // Add class to main app for additional styling
            const mainApp = document.getElementById('main-app');
            if (mainApp) {
                mainApp.classList.add('menu-open');
            }
            
        } else {
            console.log('Closing side nav'); // Debug log
            
            // Remove classes
            if (sideNav) {
                sideNav.classList.remove('open');
                sideNav.style.transform = 'translateX(-100%)';
                // Don't hide visibility immediately to allow transition
                setTimeout(() => {
                    if (!this.sideNavOpen) {
                        sideNav.style.visibility = 'hidden';
                    }
                }, 300);
            }
            if (overlay) {
                overlay.classList.remove('active');
                setTimeout(() => {
                    if (!this.sideNavOpen) {
                        overlay.style.display = 'none';
                    }
                }, 300);
            }
            
            // Restore body scroll
            body.style.overflow = '';
            body.style.position = '';
            body.style.width = '';
            body.style.height = '';
            
            // Remove class from main app
            const mainApp = document.getElementById('main-app');
            if (mainApp) {
                mainApp.classList.remove('menu-open');
            }
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

        // Save last page
        localStorage.setItem('lastPage', pageId);
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
        this.animateStatsCards();
        
        // Load recent projects
        this.loadRecentProjects();
        
        // Update dashboard metrics
        this.updateDashboardMetrics();
        
        // Load AI insights
        this.loadAIInsights();
    }

    animateStatsCards() {
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'slideInUp 0.5s ease forwards';
                
                // Animate counter
                const counter = card.querySelector('[data-count]');
                if (counter) {
                    const target = parseFloat(counter.getAttribute('data-count'));
                    this.animateNumber(counter, 0, target, 1000);
                }
            }, index * 100);
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
        this.initializeAnalyticsCharts();
        
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
        const filter = activeTab.getAttribute('data-filter') || activeTab.textContent.toLowerCase();
        this.filterProjects(filter);
    }

    switchChartPeriod(activeBtn) {
        // Remove active class from all chart buttons
        document.querySelectorAll('.chart-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        activeBtn.classList.add('active');
        
        // Update chart data
        const period = activeBtn.getAttribute('data-period');
        this.updateChartData(period);
    }

    filterProjects(filter) {
        const projects = document.querySelectorAll('.project-card-detailed');
        
        projects.forEach(project => {
            const type = project.getAttribute('data-type');
            
            if (filter === 'all' || type === filter) {
                project.style.display = 'block';
                project.style.animation = 'fadeIn 0.3s ease';
            } else {
                project.style.display = 'none';
            }
        });
    }

    searchProjects(query) {
        const projects = document.querySelectorAll('.project-card-detailed');
        
        projects.forEach(project => {
            const title = project.querySelector('h3').textContent.toLowerCase();
            const description = project.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(query.toLowerCase()) || description.includes(query.toLowerCase())) {
                project.style.display = 'block';
                project.style.animation = 'fadeIn 0.3s ease';
            } else {
                project.style.display = 'none';
            }
        });
    }

    setupSwipeGestures() {
        let startX = 0;
        let startY = 0;
        let isSwipeGesture = false;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isSwipeGesture = false;
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;
            
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            
            const diffX = startX - currentX;
            const diffY = startY - currentY;
            
            // Check if this is a horizontal swipe
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
                isSwipeGesture = true;
            }
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            if (!startX || !startY || !isSwipeGesture) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Horizontal swipe
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX < 0) {
                    // Swipe right - open side nav
                    if (!this.sideNavOpen) {
                        console.log('Swipe right detected - opening menu');
                        this.toggleSideNav();
                    }
                } else {
                    // Swipe left - close side nav
                    if (this.sideNavOpen) {
                        console.log('Swipe left detected - closing menu');
                        this.closeSideNav();
                    }
                }
            }
            
            startX = 0;
            startY = 0;
            isSwipeGesture = false;
        }, { passive: true });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Only handle shortcuts when not typing in input fields
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            switch (e.key) {
                case '1':
                    this.navigateToPage('dashboard');
                    break;
                case '2':
                    this.navigateToPage('projects');
                    break;
                case '3':
                    this.navigateToPage('calculator');
                    break;
                case '4':
                    this.navigateToPage('esg');
                    break;
                case '5':
                    this.navigateToPage('settings');
                    break;
                case 'Escape':
                    this.closeSideNav();
                    break;
                case 'm':
                case 'M':
                    this.toggleSideNav();
                    break;
            }
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
            if (this.isOnline) {
                this.refreshData();
            }
        }, 5 * 60 * 1000);
    }

    refreshData() {
        if (this.currentPage === 'dashboard') {
            this.updateDashboardMetrics();
            this.loadRecentProjects();
            this.loadAIInsights();
        }
    }

    initializeCharts() {
        // Initialize performance chart
        this.initializePerformanceChart();
    }

    initializePerformanceChart() {
        const canvas = document.getElementById('performance-chart');
        if (!canvas) return;

        // Simple chart implementation
        const ctx = canvas.getContext('2d');
        const data = [12.5, 13.2, 14.1, 13.8, 14.5, 15.2, 14.8, 15.1, 14.9, 15.3, 14.7, 15.0];
        
        this.drawLineChart(ctx, data, canvas.width, canvas.height);
    }

    drawLineChart(ctx, data, width, height) {
        const padding = 40;
        const chartWidth = width - 2 * padding;
        const chartHeight = height - 2 * padding;
        
        const maxValue = Math.max(...data);
        const minValue = Math.min(...data);
        const range = maxValue - minValue;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw line
        ctx.beginPath();
        ctx.strokeStyle = '#00bfa5';
        ctx.lineWidth = 3;
        
        data.forEach((value, index) => {
            const x = padding + (index / (data.length - 1)) * chartWidth;
            const y = padding + (1 - (value - minValue) / range) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Draw points
        ctx.fillStyle = '#004d40';
        data.forEach((value, index) => {
            const x = padding + (index / (data.length - 1)) * chartWidth;
            const y = padding + (1 - (value - minValue) / range) * chartHeight;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });
    }

    updateChartData(period) {
        // Update chart based on selected period
        console.log('Updating chart for period:', period);
        // Implementation would fetch new data and redraw chart
    }

    setupNotifications() {
        // Request notification permission
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }

    showNotifications() {
        const notifications = [
            {
                id: 1,
                title: 'New Project Added',
                message: 'Solar Farm Kenya has been added to your portfolio',
                time: '2 hours ago',
                type: 'info',
                icon: 'bi-info-circle'
            },
            {
                id: 2,
                title: 'IRR Update',
                message: 'Wind Farm Nigeria IRR updated to 12.8%',
                time: '4 hours ago',
                type: 'success',
                icon: 'bi-check-circle'
            },
            {
                id: 3,
                title: 'Market Alert',
                message: 'Renewable energy market showing positive trends',
                time: '1 day ago',
                type: 'warning',
                icon: 'bi-exclamation-triangle'
            }
        ];
        
        this.showModal('Notifications', this.renderNotifications(notifications));
    }

    renderNotifications(notifications) {
        return `
            <div class="notifications-list">
                ${notifications.map(notification => `
                    <div class="notification-item ${notification.type}">
                        <div class="notification-icon">
                            <i class="bi ${notification.icon}"></i>
                        </div>
                        <div class="notification-content">
                            <h4>${notification.title}</h4>
                            <p>${notification.message}</p>
                            <span class="notification-time">${notification.time}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
            <style>
                .notifications-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    max-height: 400px;
                    overflow-y: auto;
                }
                .notification-item {
                    display: flex;
                    gap: 1rem;
                    padding: 1rem;
                    border-radius: 8px;
                    background: var(--light-gray);
                }
                .notification-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .notification-item.info .notification-icon {
                    background: var(--info);
                    color: white;
                }
                .notification-item.success .notification-icon {
                    background: var(--success);
                    color: white;
                }
                .notification-item.warning .notification-icon {
                    background: var(--warning);
                    color: white;
                }
                .notification-content h4 {
                    margin: 0 0 0.5rem 0;
                    color: var(--primary-green);
                }
                .notification-content p {
                    margin: 0 0 0.5rem 0;
                    color: var(--gray);
                }
                .notification-time {
                    font-size: 0.8rem;
                    color: var(--gray);
                }
            </style>
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
                    <div class="profile-stat">
                        <span class="stat-value">$245M</span>
                        <span class="stat-label">Portfolio Value</span>
                    </div>
                </div>
                <div class="profile-actions">
                    <button class="btn-primary">Edit Profile</button>
                    <button class="btn-secondary">Sign Out</button>
                </div>
            </div>
            <style>
                .profile-content {
                    text-align: center;
                    padding: 2rem;
                }
                .profile-avatar {
                    font-size: 4rem;
                    color: var(--primary-green);
                    margin-bottom: 1rem;
                }
                .profile-content h3 {
                    color: var(--primary-green);
                    margin-bottom: 0.5rem;
                }
                .profile-content p {
                    color: var(--gray);
                    margin-bottom: 2rem;
                }
                .profile-stats {
                    display: flex;
                    justify-content: space-around;
                    margin-bottom: 2rem;
                }
                .profile-stat {
                    text-align: center;
                }
                .profile-stat .stat-value {
                    display: block;
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--primary-green);
                }
                .profile-stat .stat-label {
                    font-size: 0.8rem;
                    color: var(--gray);
                }
                .profile-actions {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                }
            </style>
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

    showInstallPrompt() {
        const installPrompt = document.getElementById('install-prompt');
        if (!installPrompt) return;

        installPrompt.style.display = 'block';

        // Handle install button
        const installBtn = document.getElementById('install-btn');
        if (installBtn) {
            installBtn.addEventListener('click', () => {
                if (this.deferredPrompt) {
                    this.deferredPrompt.prompt();
                    this.deferredPrompt.userChoice.then((choiceResult) => {
                        this.deferredPrompt = null;
                        this.hideInstallPrompt();
                    });
                }
            });
        }

        // Handle dismiss button
        const dismissBtn = document.getElementById('dismiss-btn');
        if (dismissBtn) {
            dismissBtn.addEventListener('click', () => {
                this.hideInstallPrompt();
            });
        }
    }

    hideInstallPrompt() {
        const installPrompt = document.getElementById('install-prompt');
        if (installPrompt) {
            installPrompt.style.display = 'none';
        }
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `${type}-toast`;
        toast.innerHTML = `
            <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // Data loading methods
    loadRecentProjects() {
        // Simulate API call - in real app, this would fetch from server
        console.log('Loading recent projects...');
    }

    updateDashboardMetrics() {
        // Simulate real-time data updates
        console.log('Updating dashboard metrics...');
    }

    loadAIInsights() {
        // Load AI-generated insights
        console.log('Loading AI insights...');
    }

    loadProjectsData() {
        // Load projects data
        console.log('Loading projects data...');
    }

    setupProjectFilters() {
        // Setup project filtering
        console.log('Setting up project filters...');
    }

    setupCalculatorValidation() {
        // Setup calculator form validation
        console.log('Setting up calculator validation...');
    }

    loadSavedCalculations() {
        // Load saved calculations
        console.log('Loading saved calculations...');
    }

    loadESGData() {
        // Load ESG data
        console.log('Loading ESG data...');
    }

    initializeAnalyticsCharts() {
        // Initialize analytics charts
        console.log('Initializing analytics charts...');
    }

    loadAnalyticsData() {
        // Load analytics data
        console.log('Loading analytics data...');
    }

    loadMarketData() {
        // Load market data
        console.log('Loading market data...');
    }

    setupMarketUpdates() {
        // Setup real-time market updates
        console.log('Setting up market updates...');
    }

    loadUserSettings() {
        // Load user settings
        console.log('Loading user settings...');
    }

    setupSettingsHandlers() {
        // Setup settings change handlers
        console.log('Setting up settings handlers...');
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
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
});

window.addEventListener('offline', () => {
    console.log('App is offline');
});

// Global functions for calculator
function calculateIRR() {
    if (window.irrCalculator) {
        window.irrCalculator.performCalculation();
    }
}

function saveCalculation() {
    if (window.finergyApp) {
        window.finergyApp.showToast('Calculation saved successfully!', 'success');
    }
}

function exportResults() {
    if (window.finergyApp) {
        window.finergyApp.showToast('Results exported to downloads', 'success');
    }
}