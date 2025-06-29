// Enhanced FinergyCloud Mobile App JavaScript

class FinergyCloudApp {
    constructor() {
        this.currentPage = 'dashboard';
        this.sideNavOpen = false;
        this.deferredPrompt = null;
        this.isOnline = navigator.onLine;
        this.currentUser = this.getDemoUser();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showLoadingScreen();
        this.initializeApp();
        this.setupPWA();
        this.setupOfflineHandling();
    }

    // Demo Users System
    getDemoUser() {
        const demoUsers = [
            {
                id: 1,
                name: "Sarah Chen",
                role: "Investment Analyst",
                company: "GreenCapital Partners",
                avatar: "SC",
                experience: "5 years",
                specialization: "Solar & Wind Projects",
                portfolioValue: "$125M",
                activeProjects: 12,
                avgIRR: 14.2,
                avgESG: 8.5,
                riskTolerance: "Medium",
                preferredRegions: ["Southeast Asia", "East Africa"],
                recentActivity: "Analyzed 3 solar projects in Kenya this week"
            },
            {
                id: 2,
                name: "Marcus Rodriguez",
                role: "Fund Manager",
                company: "Sustainable Energy Fund",
                avatar: "MR",
                experience: "12 years",
                specialization: "Emerging Markets",
                portfolioValue: "$450M",
                activeProjects: 28,
                avgIRR: 16.8,
                avgESG: 9.1,
                riskTolerance: "High",
                preferredRegions: ["Latin America", "Sub-Saharan Africa"],
                recentActivity: "Closed $50M wind farm deal in Brazil"
            },
            {
                id: 3,
                name: "Dr. Amara Okafor",
                role: "ESG Director",
                company: "Impact Investment Group",
                avatar: "AO",
                experience: "8 years",
                specialization: "ESG & Impact Assessment",
                portfolioValue: "$280M",
                activeProjects: 18,
                avgIRR: 12.9,
                avgESG: 9.4,
                riskTolerance: "Low-Medium",
                preferredRegions: ["West Africa", "South Asia"],
                recentActivity: "Published ESG framework for hydro projects"
            },
            {
                id: 4,
                name: "James Thompson",
                role: "Risk Analyst",
                company: "Energy Finance Corp",
                avatar: "JT",
                experience: "7 years",
                specialization: "Risk Modeling & Analytics",
                portfolioValue: "$190M",
                activeProjects: 15,
                avgIRR: 13.5,
                avgESG: 8.2,
                riskTolerance: "Medium-High",
                preferredRegions: ["Middle East", "North Africa"],
                recentActivity: "Developed new risk model for desert solar"
            },
            {
                id: 5,
                name: "Lisa Wang",
                role: "Project Developer",
                company: "CleanTech Ventures",
                avatar: "LW",
                experience: "6 years",
                specialization: "Project Development",
                portfolioValue: "$95M",
                activeProjects: 8,
                avgIRR: 15.7,
                avgESG: 8.8,
                riskTolerance: "High",
                preferredRegions: ["East Asia", "Pacific Islands"],
                recentActivity: "Secured permits for 100MW offshore wind"
            }
        ];

        // Rotate through demo users or get from localStorage
        const savedUserId = localStorage.getItem('currentDemoUser');
        const userId = savedUserId ? parseInt(savedUserId) : 1;
        return demoUsers.find(user => user.id === userId) || demoUsers[0];
    }

    switchDemoUser() {
        const userIds = [1, 2, 3, 4, 5];
        const currentIndex = userIds.indexOf(this.currentUser.id);
        const nextIndex = (currentIndex + 1) % userIds.length;
        const nextUserId = userIds[nextIndex];
        
        localStorage.setItem('currentDemoUser', nextUserId.toString());
        this.currentUser = this.getDemoUser();
        this.updateUserInterface();
        this.showToast(`Switched to ${this.currentUser.name}`, 'success');
    }

    updateUserInterface() {
        // Update user profile in side nav
        const userInfo = document.querySelector('.user-info');
        if (userInfo) {
            userInfo.innerHTML = `
                <h4>${this.currentUser.name}</h4>
                <p>${this.currentUser.role}</p>
            `;
        }

        // Update user avatar
        const userAvatar = document.querySelector('.user-avatar');
        if (userAvatar) {
            userAvatar.innerHTML = `
                <div class="avatar-fallback">
                    ${this.currentUser.avatar}
                </div>
            `;
        }

        // Update dashboard stats based on user
        this.updateDashboardForUser();
    }

    updateDashboardForUser() {
        // Update stats cards with user-specific data
        const statsData = [
            { selector: '[data-count="12"]', value: this.currentUser.activeProjects },
            { selector: '[data-count="14.2"]', value: this.currentUser.avgIRR },
            { selector: '[data-count="8.5"]', value: this.currentUser.avgESG }
        ];

        statsData.forEach(stat => {
            const element = document.querySelector(stat.selector);
            if (element) {
                element.textContent = stat.value;
                element.setAttribute('data-count', stat.value);
            }
        });
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

        // Profile button - now includes user switching
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
                progressText.textContent = 'Syncing Market Data...';
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
                            this.updateUserInterface();
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
        // Initialize analytics charts and data
        this.loadAnalyticsData();
        this.initializeAnalyticsCharts();
    }

    initializeMarket() {
        // Load market intelligence data
        this.loadMarketData();
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
                case 'u':
                case 'U':
                    this.switchDemoUser();
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
                title: 'Market Alert',
                message: 'Solar energy prices dropped 15% in East Africa - new opportunities available',
                time: '2 hours ago',
                type: 'info',
                icon: 'bi-info-circle'
            },
            {
                id: 2,
                title: 'Project Update',
                message: `${this.currentUser.name}'s Kenya Solar Farm project IRR updated to 16.2%`,
                time: '4 hours ago',
                type: 'success',
                icon: 'bi-check-circle'
            },
            {
                id: 3,
                title: 'Risk Alert',
                message: 'Currency volatility detected in Nigeria - review wind farm exposure',
                time: '6 hours ago',
                type: 'warning',
                icon: 'bi-exclamation-triangle'
            },
            {
                id: 4,
                title: 'ESG Update',
                message: 'New ESG regulations published for renewable energy in Brazil',
                time: '1 day ago',
                type: 'info',
                icon: 'bi-leaf'
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
        const user = this.currentUser;
        const profileContent = `
            <div class="profile-content">
                <div class="profile-avatar">
                    <div class="avatar-fallback">
                        ${user.avatar}
                    </div>
                </div>
                <h3>${user.name}</h3>
                <p>${user.role} at ${user.company}</p>
                <div class="profile-details">
                    <div class="detail-item">
                        <span class="detail-label">Experience:</span>
                        <span class="detail-value">${user.experience}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Specialization:</span>
                        <span class="detail-value">${user.specialization}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Portfolio Value:</span>
                        <span class="detail-value">${user.portfolioValue}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Risk Tolerance:</span>
                        <span class="detail-value">${user.riskTolerance}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Preferred Regions:</span>
                        <span class="detail-value">${user.preferredRegions.join(', ')}</span>
                    </div>
                </div>
                <div class="profile-stats">
                    <div class="profile-stat">
                        <span class="stat-value">${user.activeProjects}</span>
                        <span class="stat-label">Active Projects</span>
                    </div>
                    <div class="profile-stat">
                        <span class="stat-value">${user.avgIRR}%</span>
                        <span class="stat-label">Avg IRR</span>
                    </div>
                    <div class="profile-stat">
                        <span class="stat-value">${user.avgESG}</span>
                        <span class="stat-label">Avg ESG</span>
                    </div>
                </div>
                <div class="profile-activity">
                    <h4>Recent Activity</h4>
                    <p>${user.recentActivity}</p>
                </div>
                <div class="profile-actions">
                    <button class="btn-secondary" onclick="window.finergyApp.switchDemoUser()">Switch User</button>
                    <button class="btn-primary">Edit Profile</button>
                </div>
            </div>
            <style>
                .profile-content {
                    text-align: center;
                    padding: 2rem;
                }
                .profile-avatar {
                    margin: 0 auto 1rem;
                    width: 80px;
                    height: 80px;
                }
                .profile-avatar .avatar-fallback {
                    width: 80px;
                    height: 80px;
                    font-size: 2rem;
                }
                .profile-content h3 {
                    color: var(--primary-green);
                    margin-bottom: 0.5rem;
                }
                .profile-content p {
                    color: var(--gray);
                    margin-bottom: 2rem;
                }
                .profile-details {
                    text-align: left;
                    margin-bottom: 2rem;
                }
                .detail-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid var(--light-gray);
                }
                .detail-label {
                    font-weight: 500;
                    color: var(--gray);
                }
                .detail-value {
                    color: var(--dark-gray);
                    font-weight: 600;
                }
                .profile-stats {
                    display: flex;
                    justify-content: space-around;
                    margin-bottom: 2rem;
                    background: var(--light-gray);
                    padding: 1rem;
                    border-radius: 8px;
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
                .profile-activity {
                    text-align: left;
                    margin-bottom: 2rem;
                    background: var(--light-green);
                    padding: 1rem;
                    border-radius: 8px;
                }
                .profile-activity h4 {
                    color: var(--primary-green);
                    margin-bottom: 0.5rem;
                }
                .profile-activity p {
                    margin: 0;
                    color: var(--dark-gray);
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

    // Enhanced data loading methods with real market intelligence and analytics

    loadAnalyticsData() {
        // Simulate loading comprehensive analytics data
        console.log('Loading analytics data for', this.currentUser.name);
        
        // Update analytics page content
        this.updateAnalyticsPage();
    }

    updateAnalyticsPage() {
        const analyticsPage = document.getElementById('analytics-page');
        if (!analyticsPage) return;

        const analyticsContent = `
            <div class="page-header">
                <h1>Analytics Dashboard</h1>
                <p>Comprehensive investment performance and market insights</p>
            </div>

            <!-- Performance Overview -->
            <div class="section">
                <div class="section-header">
                    <h2>Performance Overview</h2>
                    <div class="chart-controls">
                        <button class="chart-btn active" data-period="1M">1M</button>
                        <button class="chart-btn" data-period="3M">3M</button>
                        <button class="chart-btn" data-period="6M">6M</button>
                        <button class="chart-btn" data-period="1Y">1Y</button>
                    </div>
                </div>
                <div class="analytics-grid">
                    <div class="analytics-card">
                        <h4>Portfolio Performance</h4>
                        <div class="performance-metrics">
                            <div class="metric">
                                <span class="metric-label">Total Return</span>
                                <span class="metric-value positive">+18.5%</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">Annualized IRR</span>
                                <span class="metric-value positive">${this.currentUser.avgIRR}%</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">Sharpe Ratio</span>
                                <span class="metric-value">1.42</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">Max Drawdown</span>
                                <span class="metric-value negative">-8.3%</span>
                            </div>
                        </div>
                        <div class="chart-container">
                            <canvas id="performance-trend-chart" width="300" height="150"></canvas>
                        </div>
                    </div>
                    
                    <div class="analytics-card">
                        <h4>Risk Analysis</h4>
                        <div class="risk-breakdown">
                            <div class="risk-item">
                                <span class="risk-label">Market Risk</span>
                                <div class="risk-bar">
                                    <div class="risk-fill" style="width: 65%"></div>
                                </div>
                                <span class="risk-value">65%</span>
                            </div>
                            <div class="risk-item">
                                <span class="risk-label">Currency Risk</span>
                                <div class="risk-bar">
                                    <div class="risk-fill" style="width: 45%"></div>
                                </div>
                                <span class="risk-value">45%</span>
                            </div>
                            <div class="risk-item">
                                <span class="risk-label">Regulatory Risk</span>
                                <div class="risk-bar">
                                    <div class="risk-fill" style="width: 30%"></div>
                                </div>
                                <span class="risk-value">30%</span>
                            </div>
                            <div class="risk-item">
                                <span class="risk-label">Technology Risk</span>
                                <div class="risk-bar">
                                    <div class="risk-fill" style="width: 25%"></div>
                                </div>
                                <span class="risk-value">25%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Regional Analysis -->
            <div class="section">
                <div class="section-header">
                    <h2>Regional Performance</h2>
                </div>
                <div class="regional-grid">
                    <div class="region-card">
                        <div class="region-header">
                            <h4>East Africa</h4>
                            <span class="region-allocation">35%</span>
                        </div>
                        <div class="region-metrics">
                            <div class="region-metric">
                                <span>IRR: 16.8%</span>
                                <span class="trend positive">+2.1%</span>
                            </div>
                            <div class="region-metric">
                                <span>Projects: 8</span>
                                <span class="trend positive">+2</span>
                            </div>
                            <div class="region-metric">
                                <span>Risk Score: Medium</span>
                                <span class="trend neutral">Stable</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="region-card">
                        <div class="region-header">
                            <h4>Southeast Asia</h4>
                            <span class="region-allocation">28%</span>
                        </div>
                        <div class="region-metrics">
                            <div class="region-metric">
                                <span>IRR: 14.2%</span>
                                <span class="trend positive">+1.5%</span>
                            </div>
                            <div class="region-metric">
                                <span>Projects: 6</span>
                                <span class="trend neutral">0</span>
                            </div>
                            <div class="region-metric">
                                <span>Risk Score: Low</span>
                                <span class="trend positive">Improving</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="region-card">
                        <div class="region-header">
                            <h4>Latin America</h4>
                            <span class="region-allocation">22%</span>
                        </div>
                        <div class="region-metrics">
                            <div class="region-metric">
                                <span>IRR: 13.9%</span>
                                <span class="trend negative">-0.8%</span>
                            </div>
                            <div class="region-metric">
                                <span>Projects: 4</span>
                                <span class="trend positive">+1</span>
                            </div>
                            <div class="region-metric">
                                <span>Risk Score: High</span>
                                <span class="trend negative">Deteriorating</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="region-card">
                        <div class="region-header">
                            <h4>Other Markets</h4>
                            <span class="region-allocation">15%</span>
                        </div>
                        <div class="region-metrics">
                            <div class="region-metric">
                                <span>IRR: 12.1%</span>
                                <span class="trend positive">+0.3%</span>
                            </div>
                            <div class="region-metric">
                                <span>Projects: 3</span>
                                <span class="trend neutral">0</span>
                            </div>
                            <div class="region-metric">
                                <span>Risk Score: Medium</span>
                                <span class="trend neutral">Stable</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Technology Breakdown -->
            <div class="section">
                <div class="section-header">
                    <h2>Technology Analysis</h2>
                </div>
                <div class="tech-analysis-grid">
                    <div class="tech-chart-container">
                        <h4>Portfolio Allocation</h4>
                        <canvas id="tech-allocation-chart" width="200" height="200"></canvas>
                    </div>
                    <div class="tech-performance">
                        <h4>Technology Performance</h4>
                        <div class="tech-list">
                            <div class="tech-item">
                                <div class="tech-info">
                                    <span class="tech-name">Solar PV</span>
                                    <span class="tech-allocation">45%</span>
                                </div>
                                <div class="tech-metrics">
                                    <span class="tech-irr">IRR: 15.8%</span>
                                    <span class="tech-trend positive">+2.3%</span>
                                </div>
                            </div>
                            <div class="tech-item">
                                <div class="tech-info">
                                    <span class="tech-name">Wind</span>
                                    <span class="tech-allocation">35%</span>
                                </div>
                                <div class="tech-metrics">
                                    <span class="tech-irr">IRR: 13.2%</span>
                                    <span class="tech-trend positive">+1.1%</span>
                                </div>
                            </div>
                            <div class="tech-item">
                                <div class="tech-info">
                                    <span class="tech-name">Hydro</span>
                                    <span class="tech-allocation">15%</span>
                                </div>
                                <div class="tech-metrics">
                                    <span class="tech-irr">IRR: 12.9%</span>
                                    <span class="tech-trend negative">-0.5%</span>
                                </div>
                            </div>
                            <div class="tech-item">
                                <div class="tech-info">
                                    <span class="tech-name">Other</span>
                                    <span class="tech-allocation">5%</span>
                                </div>
                                <div class="tech-metrics">
                                    <span class="tech-irr">IRR: 11.4%</span>
                                    <span class="tech-trend neutral">0.0%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Predictive Analytics -->
            <div class="section">
                <div class="section-header">
                    <h2>AI Predictions</h2>
                    <span class="ai-badge">AI-Powered</span>
                </div>
                <div class="predictions-grid">
                    <div class="prediction-card">
                        <div class="prediction-header">
                            <h4>6-Month Outlook</h4>
                            <span class="confidence-score">Confidence: 87%</span>
                        </div>
                        <div class="prediction-content">
                            <div class="prediction-metric">
                                <span class="metric-label">Expected IRR</span>
                                <span class="metric-value positive">15.8% - 17.2%</span>
                            </div>
                            <div class="prediction-metric">
                                <span class="metric-label">Risk Level</span>
                                <span class="metric-value medium">Medium</span>
                            </div>
                            <div class="prediction-insights">
                                <h5>Key Insights:</h5>
                                <ul>
                                    <li>Solar projects in East Africa showing strong momentum</li>
                                    <li>Currency stabilization expected in Q2</li>
                                    <li>New regulatory frameworks favoring renewables</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="prediction-card">
                        <div class="prediction-header">
                            <h4>Recommended Actions</h4>
                            <span class="confidence-score">Priority: High</span>
                        </div>
                        <div class="prediction-content">
                            <div class="action-list">
                                <div class="action-item high">
                                    <i class="bi bi-arrow-up-circle"></i>
                                    <span>Increase solar allocation in Kenya by 15%</span>
                                </div>
                                <div class="action-item medium">
                                    <i class="bi bi-exclamation-triangle"></i>
                                    <span>Monitor currency exposure in Nigeria</span>
                                </div>
                                <div class="action-item low">
                                    <i class="bi bi-info-circle"></i>
                                    <span>Consider hydro opportunities in Vietnam</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        analyticsPage.innerHTML = analyticsContent;
        
        // Initialize analytics charts
        setTimeout(() => {
            this.initializeAnalyticsCharts();
        }, 100);
    }

    loadMarketData() {
        // Simulate loading market intelligence data
        console.log('Loading market intelligence data...');
        
        // Update market page content
        this.updateMarketPage();
    }

    updateMarketPage() {
        const marketPage = document.getElementById('market-page');
        if (!marketPage) return;

        const marketContent = `
            <div class="page-header">
                <h1>Market Intelligence</h1>
                <p>Real-time insights and trends in renewable energy markets</p>
            </div>

            <!-- Market Overview -->
            <div class="section">
                <div class="section-header">
                    <h2>Global Market Overview</h2>
                    <div class="market-status">
                        <span class="status-indicator positive"></span>
                        <span>Markets Open</span>
                    </div>
                </div>
                <div class="market-overview-grid">
                    <div class="market-metric-card">
                        <h4>Global Investment</h4>
                        <div class="metric-value">$1.8T</div>
                        <div class="metric-change positive">+12.5% YoY</div>
                        <div class="metric-subtitle">Annual renewable investment</div>
                    </div>
                    <div class="market-metric-card">
                        <h4>Emerging Markets</h4>
                        <div class="metric-value">$480B</div>
                        <div class="metric-change positive">+18.3% YoY</div>
                        <div class="metric-subtitle">Developing economy investment</div>
                    </div>
                    <div class="market-metric-card">
                        <h4>Average IRR</h4>
                        <div class="metric-value">14.2%</div>
                        <div class="metric-change positive">+0.8% QoQ</div>
                        <div class="metric-subtitle">Global renewable projects</div>
                    </div>
                    <div class="market-metric-card">
                        <h4>ESG Score</h4>
                        <div class="metric-value">8.1/10</div>
                        <div class="metric-change positive">+0.3 YoY</div>
                        <div class="metric-subtitle">Average sustainability rating</div>
                    </div>
                </div>
            </div>

            <!-- Regional Markets -->
            <div class="section">
                <div class="section-header">
                    <h2>Regional Market Insights</h2>
                    <div class="filter-tabs">
                        <button class="tab active" data-region="all">All Regions</button>
                        <button class="tab" data-region="africa">Africa</button>
                        <button class="tab" data-region="asia">Asia</button>
                        <button class="tab" data-region="latam">Latin America</button>
                    </div>
                </div>
                <div class="regional-markets">
                    <div class="market-region-card" data-region="africa">
                        <div class="region-header">
                            <h4>🌍 East Africa</h4>
                            <span class="market-status hot">Hot Market</span>
                        </div>
                        <div class="region-stats">
                            <div class="stat-row">
                                <span>Investment Volume:</span>
                                <span class="stat-value">$45B</span>
                                <span class="stat-change positive">+25%</span>
                            </div>
                            <div class="stat-row">
                                <span>Average IRR:</span>
                                <span class="stat-value">16.8%</span>
                                <span class="stat-change positive">+2.1%</span>
                            </div>
                            <div class="stat-row">
                                <span>Risk Premium:</span>
                                <span class="stat-value">3.2%</span>
                                <span class="stat-change negative">-0.5%</span>
                            </div>
                        </div>
                        <div class="region-insights">
                            <h5>Key Opportunities:</h5>
                            <ul>
                                <li>Solar PV costs down 15% in Kenya</li>
                                <li>New grid connection policies in Tanzania</li>
                                <li>$2B development bank funding available</li>
                            </ul>
                        </div>
                    </div>

                    <div class="market-region-card" data-region="asia">
                        <div class="region-header">
                            <h4>🌏 Southeast Asia</h4>
                            <span class="market-status stable">Stable</span>
                        </div>
                        <div class="region-stats">
                            <div class="stat-row">
                                <span>Investment Volume:</span>
                                <span class="stat-value">$78B</span>
                                <span class="stat-change positive">+8%</span>
                            </div>
                            <div class="stat-row">
                                <span>Average IRR:</span>
                                <span class="stat-value">14.2%</span>
                                <span class="stat-change positive">+1.5%</span>
                            </div>
                            <div class="stat-row">
                                <span>Risk Premium:</span>
                                <span class="stat-value">2.1%</span>
                                <span class="stat-change neutral">0.0%</span>
                            </div>
                        </div>
                        <div class="region-insights">
                            <h5>Key Opportunities:</h5>
                            <ul>
                                <li>Offshore wind expansion in Vietnam</li>
                                <li>Solar floating projects in Thailand</li>
                                <li>Green bonds market growing rapidly</li>
                            </ul>
                        </div>
                    </div>

                    <div class="market-region-card" data-region="latam">
                        <div class="region-header">
                            <h4>🌎 Latin America</h4>
                            <span class="market-status volatile">Volatile</span>
                        </div>
                        <div class="region-stats">
                            <div class="stat-row">
                                <span>Investment Volume:</span>
                                <span class="stat-value">$32B</span>
                                <span class="stat-change negative">-5%</span>
                            </div>
                            <div class="stat-row">
                                <span>Average IRR:</span>
                                <span class="stat-value">13.9%</span>
                                <span class="stat-change negative">-0.8%</span>
                            </div>
                            <div class="stat-row">
                                <span>Risk Premium:</span>
                                <span class="stat-value">4.5%</span>
                                <span class="stat-change positive">+0.3%</span>
                            </div>
                        </div>
                        <div class="region-insights">
                            <h5>Key Challenges:</h5>
                            <ul>
                                <li>Currency volatility in Argentina</li>
                                <li>Regulatory uncertainty in Brazil</li>
                                <li>Grid infrastructure limitations</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Technology Trends -->
            <div class="section">
                <div class="section-header">
                    <h2>Technology Trends</h2>
                </div>
                <div class="tech-trends-grid">
                    <div class="trend-card">
                        <div class="trend-header">
                            <i class="bi bi-sun trend-icon solar"></i>
                            <h4>Solar PV</h4>
                            <span class="trend-indicator up">↗ Trending Up</span>
                        </div>
                        <div class="trend-metrics">
                            <div class="trend-metric">
                                <span>Cost Reduction:</span>
                                <span class="value positive">-18% YoY</span>
                            </div>
                            <div class="trend-metric">
                                <span>Efficiency Gains:</span>
                                <span class="value positive">+12%</span>
                            </div>
                            <div class="trend-metric">
                                <span>Market Share:</span>
                                <span class="value">48%</span>
                            </div>
                        </div>
                        <div class="trend-forecast">
                            <h5>2025 Outlook:</h5>
                            <p>Continued cost reductions expected, particularly in emerging markets. Perovskite tandem cells showing promise.</p>
                        </div>
                    </div>

                    <div class="trend-card">
                        <div class="trend-header">
                            <i class="bi bi-wind trend-icon wind"></i>
                            <h4>Wind Power</h4>
                            <span class="trend-indicator up">↗ Growing</span>
                        </div>
                        <div class="trend-metrics">
                            <div class="trend-metric">
                                <span>Capacity Factor:</span>
                                <span class="value positive">+8%</span>
                            </div>
                            <div class="trend-metric">
                                <span>Offshore Growth:</span>
                                <span class="value positive">+35%</span>
                            </div>
                            <div class="trend-metric">
                                <span>Market Share:</span>
                                <span class="value">32%</span>
                            </div>
                        </div>
                        <div class="trend-forecast">
                            <h5>2025 Outlook:</h5>
                            <p>Offshore wind acceleration in Asia. Larger turbines improving economics in low-wind areas.</p>
                        </div>
                    </div>

                    <div class="trend-card">
                        <div class="trend-header">
                            <i class="bi bi-droplet trend-icon hydro"></i>
                            <h4>Hydro Power</h4>
                            <span class="trend-indicator stable">→ Stable</span>
                        </div>
                        <div class="trend-metrics">
                            <div class="trend-metric">
                                <span>Small Hydro Growth:</span>
                                <span class="value positive">+5%</span>
                            </div>
                            <div class="trend-metric">
                                <span>Pumped Storage:</span>
                                <span class="value positive">+15%</span>
                            </div>
                            <div class="trend-metric">
                                <span>Market Share:</span>
                                <span class="value">15%</span>
                            </div>
                        </div>
                        <div class="trend-forecast">
                            <h5>2025 Outlook:</h5>
                            <p>Focus shifting to pumped storage and small-scale run-of-river projects. Environmental concerns limiting large projects.</p>
                        </div>
                    </div>

                    <div class="trend-card">
                        <div class="trend-header">
                            <i class="bi bi-battery trend-icon storage"></i>
                            <h4>Energy Storage</h4>
                            <span class="trend-indicator up">↗ Explosive</span>
                        </div>
                        <div class="trend-metrics">
                            <div class="trend-metric">
                                <span>Cost Reduction:</span>
                                <span class="value positive">-25% YoY</span>
                            </div>
                            <div class="trend-metric">
                                <span>Deployment:</span>
                                <span class="value positive">+85%</span>
                            </div>
                            <div class="trend-metric">
                                <span>Market Share:</span>
                                <span class="value">5%</span>
                            </div>
                        </div>
                        <div class="trend-forecast">
                            <h5>2025 Outlook:</h5>
                            <p>Battery costs continuing to fall. Grid-scale storage becoming essential for renewable integration.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Market Alerts -->
            <div class="section">
                <div class="section-header">
                    <h2>Market Alerts</h2>
                    <button class="btn-secondary">Manage Alerts</button>
                </div>
                <div class="alerts-container">
                    <div class="alert-item high">
                        <div class="alert-icon">
                            <i class="bi bi-exclamation-triangle"></i>
                        </div>
                        <div class="alert-content">
                            <h4>Currency Risk Alert</h4>
                            <p>Nigerian Naira volatility increased 15% this week. Review wind farm exposure in Lagos region.</p>
                            <span class="alert-time">2 hours ago</span>
                        </div>
                        <div class="alert-actions">
                            <button class="btn-primary">Review</button>
                        </div>
                    </div>

                    <div class="alert-item medium">
                        <div class="alert-icon">
                            <i class="bi bi-info-circle"></i>
                        </div>
                        <div class="alert-content">
                            <h4>Policy Update</h4>
                            <p>Kenya announces new feed-in tariff rates for solar projects. 12% increase for projects >10MW.</p>
                            <span class="alert-time">6 hours ago</span>
                        </div>
                        <div class="alert-actions">
                            <button class="btn-secondary">Details</button>
                        </div>
                    </div>

                    <div class="alert-item low">
                        <div class="alert-icon">
                            <i class="bi bi-graph-up"></i>
                        </div>
                        <div class="alert-content">
                            <h4>Market Opportunity</h4>
                            <p>Solar panel prices in Southeast Asia dropped 8%. Consider increasing allocation to Vietnam projects.</p>
                            <span class="alert-time">1 day ago</span>
                        </div>
                        <div class="alert-actions">
                            <button class="btn-secondary">Analyze</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Economic Indicators -->
            <div class="section">
                <div class="section-header">
                    <h2>Economic Indicators</h2>
                </div>
                <div class="indicators-grid">
                    <div class="indicator-card">
                        <h4>Interest Rates</h4>
                        <div class="indicator-chart">
                            <canvas id="interest-rates-chart" width="200" height="100"></canvas>
                        </div>
                        <div class="indicator-summary">
                            <span class="current-value">3.25%</span>
                            <span class="change negative">-0.25%</span>
                        </div>
                    </div>

                    <div class="indicator-card">
                        <h4>Currency Index</h4>
                        <div class="indicator-chart">
                            <canvas id="currency-index-chart" width="200" height="100"></canvas>
                        </div>
                        <div class="indicator-summary">
                            <span class="current-value">102.5</span>
                            <span class="change positive">+1.8%</span>
                        </div>
                    </div>

                    <div class="indicator-card">
                        <h4>Commodity Prices</h4>
                        <div class="indicator-chart">
                            <canvas id="commodity-prices-chart" width="200" height="100"></canvas>
                        </div>
                        <div class="indicator-summary">
                            <span class="current-value">$85/MWh</span>
                            <span class="change positive">+3.2%</span>
                        </div>
                    </div>

                    <div class="indicator-card">
                        <h4>Carbon Credits</h4>
                        <div class="indicator-chart">
                            <canvas id="carbon-credits-chart" width="200" height="100"></canvas>
                        </div>
                        <div class="indicator-summary">
                            <span class="current-value">$45/tCO2</span>
                            <span class="change positive">+12.5%</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        marketPage.innerHTML = marketContent;
        
        // Initialize market charts
        setTimeout(() => {
            this.initializeMarketCharts();
        }, 100);
    }

    initializeAnalyticsCharts() {
        // Initialize performance trend chart
        const performanceCanvas = document.getElementById('performance-trend-chart');
        if (performanceCanvas) {
            const ctx = performanceCanvas.getContext('2d');
            const data = [12.5, 13.2, 14.1, 13.8, 14.5, 15.2, 14.8, 15.1, 14.9, 15.3, 14.7, 15.0];
            this.drawLineChart(ctx, data, performanceCanvas.width, performanceCanvas.height);
        }

        // Initialize technology allocation chart
        const techCanvas = document.getElementById('tech-allocation-chart');
        if (techCanvas) {
            const ctx = techCanvas.getContext('2d');
            this.drawPieChart(ctx, [
                { label: 'Solar', value: 45, color: '#ffc107' },
                { label: 'Wind', value: 35, color: '#00bfa5' },
                { label: 'Hydro', value: 15, color: '#004d40' },
                { label: 'Other', value: 5, color: '#6c757d' }
            ], techCanvas.width, techCanvas.height);
        }
    }

    initializeMarketCharts() {
        // Initialize various market indicator charts
        const chartIds = ['interest-rates-chart', 'currency-index-chart', 'commodity-prices-chart', 'carbon-credits-chart'];
        
        chartIds.forEach(chartId => {
            const canvas = document.getElementById(chartId);
            if (canvas) {
                const ctx = canvas.getContext('2d');
                // Generate sample data for each chart
                const data = Array.from({length: 12}, () => Math.random() * 20 + 80);
                this.drawMiniLineChart(ctx, data, canvas.width, canvas.height);
            }
        });
    }

    drawPieChart(ctx, data, width, height) {
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 10;
        
        let currentAngle = 0;
        const total = data.reduce((sum, item) => sum + item.value, 0);
        
        data.forEach(item => {
            const sliceAngle = (item.value / total) * 2 * Math.PI;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            ctx.fillStyle = item.color;
            ctx.fill();
            
            currentAngle += sliceAngle;
        });
    }

    drawMiniLineChart(ctx, data, width, height) {
        const padding = 5;
        const chartWidth = width - 2 * padding;
        const chartHeight = height - 2 * padding;
        
        const maxValue = Math.max(...data);
        const minValue = Math.min(...data);
        const range = maxValue - minValue;
        
        ctx.clearRect(0, 0, width, height);
        
        ctx.beginPath();
        ctx.strokeStyle = '#00bfa5';
        ctx.lineWidth = 2;
        
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
    }

    setupMarketUpdates() {
        // Setup real-time market data updates
        setInterval(() => {
            if (this.isOnline && this.currentPage === 'market') {
                this.updateMarketData();
            }
        }, 30000); // Update every 30 seconds
    }

    updateMarketData() {
        // Simulate real-time market data updates
        console.log('Updating real-time market data...');
        
        // Update market indicators with new values
        const indicators = document.querySelectorAll('.current-value');
        indicators.forEach(indicator => {
            // Add subtle animation to show data refresh
            indicator.style.animation = 'pulse 0.5s ease';
        });
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