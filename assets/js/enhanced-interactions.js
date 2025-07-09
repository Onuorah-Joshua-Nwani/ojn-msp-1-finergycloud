<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta name="description" content="FinergyCloud Mobile - AI-driven risk intelligence for renewable energy investors on mobile">
    <meta name="theme-color" content="#004d40">
    
    <title>FinergyCloud Mobile</title>
    
    <!-- PWA Meta Tags -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="FinergyCloud">
    <meta name="application-name" content="FinergyCloud">
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="../assets/images/android-chrome-192x192.png">
    <link rel="apple-touch-icon" href="../assets/images/android-chrome-192x192.png">
    
    <!-- Manifest -->
    <link rel="manifest" href="manifest.json">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
    
    <!-- Styles -->
    <link rel="stylesheet" href="styles/app.css">
    
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="app-container">
        <!-- Header -->
        <header class="app-header">
            <div class="header-left">
                <button id="menu-toggle" class="menu-btn" aria-label="Menu">
                    <i class="bi bi-list"></i>
                </button>
                <div class="header-brand">
                    <h1 class="header-title">FinergyCloud</h1>
                    <p class="header-subtitle">AI Risk Intelligence</p>
                </div>
            </div>
            <div class="header-right">
                <button class="notification-btn" aria-label="Notifications">
                    <i class="bi bi-bell"></i>
                    <span class="notification-badge">3</span>
                </button>
                <button class="profile-btn" aria-label="Profile">
                    <i class="bi bi-person-circle"></i>
                </button>
            </div>
        </header>
        
        <!-- Side Navigation -->
        <nav id="side-nav" class="side-nav">
            <div class="nav-header">
                <div class="nav-brand">
                    <h2>FinergyCloud</h2>
                    <p>AI Risk Intelligence</p>
                </div>
            </div>
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="#dashboard" class="nav-link active" data-page="dashboard">
                        <i class="bi bi-speedometer2"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#calculator" class="nav-link" data-page="calculator">
                        <i class="bi bi-calculator"></i>
                        <span>IRR Calculator</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#projects" class="nav-link" data-page="projects">
                        <i class="bi bi-kanban"></i>
                        <span>Projects</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#esg" class="nav-link" data-page="esg">
                        <i class="bi bi-leaf"></i>
                        <span>ESG Scoring</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#analytics" class="nav-link" data-page="analytics">
                        <i class="bi bi-graph-up"></i>
                        <span>Analytics</span>
                    </a>
                </li>
            </ul>
            <div class="nav-footer">
                <button class="upgrade-btn">
                    <i class="bi bi-star-fill"></i>
                    <span>Upgrade to Pro</span>
                </button>
                <div class="nav-version">
                    <span>v1.0.0</span>
                </div>
            </div>
        </nav>
        
        <!-- Navigation Overlay -->
        <div id="nav-overlay" class="nav-overlay"></div>
        
        <!-- Main Content -->
        <main id="main-content" class="main-content">
            <!-- Dashboard Page -->
            <div id="dashboard-page" class="page active">
                <div class="page-header">
                    <h2>Dashboard</h2>
                    <p>Welcome to FinergyCloud Mobile</p>
                </div>
                
                <div class="dashboard-metrics">
                    <div class="metric-card">
                        <div class="metric-value">15.2%</div>
                        <div class="metric-label">Average IRR</div>
                        <div class="metric-change positive">
                            <i class="bi bi-arrow-up"></i>
                            <span>2.3%</span>
                        </div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">8.7</div>
                        <div class="metric-label">ESG Score</div>
                        <div class="metric-change positive">
                            <i class="bi bi-arrow-up"></i>
                            <span>0.5</span>
                        </div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">₦120M+</div>
                        <div class="metric-label">Analyzed Value</div>
                        <div class="metric-change positive">
                            <i class="bi bi-arrow-up"></i>
                            <span>₦20M</span>
                        </div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">Low</div>
                        <div class="metric-label">Risk Level</div>
                        <div class="metric-change positive">
                            <i class="bi bi-arrow-down"></i>
                            <span>Improved</span>
                        </div>
                    </div>
                </div>
                
                <div class="section-header">
                    <h3>Quick Actions</h3>
                </div>
                
                <div class="action-cards">
                    <div class="action-card" data-page="calculator">
                        <div class="action-icon">
                            <i class="bi bi-calculator"></i>
                        </div>
                        <div class="action-content">
                            <h4>Calculate IRR</h4>
                            <p>Run financial simulations</p>
                        </div>
                        <div class="action-arrow">
                            <i class="bi bi-chevron-right"></i>
                        </div>
                    </div>
                    <div class="action-card" data-page="projects">
                        <div class="action-icon">
                            <i class="bi bi-kanban"></i>
                        </div>
                        <div class="action-content">
                            <h4>View Projects</h4>
                            <p>Manage your investments</p>
                        </div>
                        <div class="action-arrow">
                            <i class="bi bi-chevron-right"></i>
                        </div>
                    </div>
                    <div class="action-card" data-page="esg">
                        <div class="action-icon">
                            <i class="bi bi-leaf"></i>
                        </div>
                        <div class="action-content">
                            <h4>ESG Scoring</h4>
                            <p>Sustainability assessment</p>
                        </div>
                        <div class="action-arrow">
                            <i class="bi bi-chevron-right"></i>
                        </div>
                    </div>
                    <div class="action-card" data-page="xgboost">
                        <div class="action-icon">
                            <i class="bi bi-cpu"></i>
                        </div>
                        <div class="action-content">
                            <h4>AI Prediction</h4>
                            <p>XGBoost risk analysis</p>
                        </div>
                        <div class="action-arrow">
                            <i class="bi bi-chevron-right"></i>
                        </div>
                    </div>
                </div>
                
                <div class="section-header">
                    <h3>Recent Projects</h3>
                    <a href="#projects" class="section-action" data-page="projects">View All</a>
                </div>
                
                <div class="project-list">
                    <div class="project-card">
                        <div class="project-type solar">
                            <i class="bi bi-sun"></i>
                        </div>
                        <div class="project-content">
                            <h4>Lagos Solar Farm</h4>
                            <div class="project-meta">
                                <span><i class="bi bi-lightning"></i> 5.0 MW</span>
                                <span><i class="bi bi-graph-up"></i> 16.8% IRR</span>
                            </div>
                            <div class="project-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 75%"></div>
                                </div>
                                <span>75% Complete</span>
                            </div>
                        </div>
                        <div class="project-status">
                            <span class="status-badge active">Active</span>
                        </div>
                    </div>
                    
                    <div class="project-card">
                        <div class="project-type wind">
                            <i class="bi bi-wind"></i>
                        </div>
                        <div class="project-content">
                            <h4>Abuja Wind Project</h4>
                            <div class="project-meta">
                                <span><i class="bi bi-lightning"></i> 2.5 MW</span>
                                <span><i class="bi bi-graph-up"></i> 14.5% IRR</span>
                            </div>
                            <div class="project-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 40%"></div>
                                </div>
                                <span>40% Complete</span>
                            </div>
                        </div>
                        <div class="project-status">
                            <span class="status-badge pending">Pending</span>
                        </div>
                    </div>
                </div>
                
                <div class="section-header">
                    <h3>Market Insights</h3>
                </div>
                
                <div class="insights-card">
                    <div class="insights-header">
                        <h4>Nigeria Renewable Energy Market</h4>
                        <span class="insights-date">Updated today</span>
                    </div>
                    <div class="insights-content">
                        <div class="insights-item">
                            <div class="insights-icon">
                                <i class="bi bi-lightning"></i>
                            </div>
                            <div class="insights-text">
                                <h5>Grid Stability Improving</h5>
                                <p>Recent infrastructure investments have improved grid stability by 15% in Lagos region.</p>
                            </div>
                        </div>
                        <div class="insights-item">
                            <div class="insights-icon">
                                <i class="bi bi-file-earmark-text"></i>
                            </div>
                            <div class="insights-text">
                                <h5>New Regulatory Framework</h5>
                                <p>Government announces streamlined approval process for solar projects under 10MW.</p>
                            </div>
                        </div>
                    </div>
                    <div class="insights-footer">
                        <a href="#blog" class="btn btn-outline-primary btn-sm" data-page="blog">
                            <i class="bi bi-journal-text me-2"></i>Read More
                        </a>
                    </div>
                </div>
            </div>
            
            <!-- Analytics Dashboard Page -->
            <div id="analytics-page" class="page">
                <div class="page-header">
                    <h2>Analytics Dashboard</h2>
                    <p>Comprehensive investment intelligence</p>
                </div>
                
                <div class="analytics-container">
                    <!-- Portfolio Analysis Section -->
                    <div class="analytics-section">
                        <h3 class="analytics-section-title">Portfolio Analysis</h3>
                        
                        <div class="analytics-metrics">
                            <div class="analytics-metric-card">
                                <div class="analytics-metric-value" id="total-capacity">16.7 MW</div>
                                <div class="analytics-metric-label">Total Capacity</div>
                            </div>
                            <div class="analytics-metric-card">
                                <div class="analytics-metric-value" id="weighted-irr">15.2%</div>
                                <div class="analytics-metric-label">Weighted IRR</div>
                            </div>
                            <div class="analytics-metric-card">
                                <div class="analytics-metric-value" id="project-count">5</div>
                                <div class="analytics-metric-label">Projects</div>
                            </div>
                            <div class="analytics-metric-card">
                                <div class="analytics-metric-value" id="low-risk-percentage">60%</div>
                                <div class="analytics-metric-label">Low Risk</div>
                            </div>
                        </div>
                        
                        <div class="analytics-chart-card">
                            <h4 class="analytics-chart-title">Portfolio Distribution</h4>
                            <div class="analytics-chart-container portfolio-distribution-chart-container">
                                <canvas id="portfolio-distribution-chart"></canvas>
                            </div>
                        </div>
                        
                        <div class="analytics-chart-card">
                            <h4 class="analytics-chart-title">Portfolio Performance</h4>
                            <div class="analytics-chart-container portfolio-performance-chart-container">
                                <canvas id="portfolio-performance-chart"></canvas>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Risk Analysis Section -->
                    <div class="analytics-section">
                        <h3 class="analytics-section-title">Risk Analysis</h3>
                        
                        <div class="analytics-metrics">
                            <div class="analytics-metric-card">
                                <div class="analytics-metric-value" id="avg-risk-score">7.8</div>
                                <div class="analytics-metric-label">Avg Risk Score</div>
                            </div>
                            <div class="analytics-metric-card">
                                <div class="analytics-metric-value" id="high-impact-factors">3</div>
                                <div class="analytics-metric-label">High Impact Factors</div>
                            </div>
                        </div>
                        
                        <div class="analytics-chart-card">
                            <h4 class="analytics-chart-title">Risk Distribution</h4>
                            <div class="analytics-chart-container risk-distribution-chart-container">
                                <canvas id="risk-distribution-chart"></canvas>
                            </div>
                        </div>
                        
                        <div class="analytics-chart-card">
                            <h4 class="analytics-chart-title">Risk Matrix</h4>
                            <div class="analytics-chart-container risk-matrix-chart-container">
                                <!-- Custom risk matrix will be rendered here -->
                            </div>
                        </div>
                        
                        <div class="analytics-chart-card">
                            <h4 class="analytics-chart-title">Risk Trend Analysis</h4>
                            <div class="analytics-chart-container risk-trend-chart-container">
                                <canvas id="risk-trend-chart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- IRR Calculator Page -->
            <div id="calculator-page" class="page">
                <div class="page-header">
                    <h2>IRR Calculator</h2>
                    <p>Advanced financial modeling</p>
                </div>
                
                <div class="calculator-form">
                    <div class="form-group">
                        <label for="project-type" class="form-label">Project Type</label>
                        <select id="project-type" class="form-control">
                            <option value="solar">Solar</option>
                            <option value="wind">Wind</option>
                            <option value="hydro">Hydro</option>
                            <option value="biomass">Biomass</option>
                            <option value="geothermal">Geothermal</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="currency" class="form-label">Currency</label>
                        <select id="currency" class="form-control">
                            <option value="NGN">Nigerian Naira (₦)</option>
                            <option value="USD">US Dollar ($)</option>
                            <option value="EUR">Euro (€)</option>
                            <option value="GBP">British Pound (£)</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="initial-investment" class="form-label">Initial Investment</label>
                        <input type="number" id="initial-investment" class="form-control" placeholder="e.g., 10000000" min="0" step="1000">
                    </div>
                    
                    <div class="form-group">
                        <label for="project-duration" class="form-label">Project Duration (Years)</label>
                        <input type="number" id="project-duration" class="form-control" placeholder="e.g., 25" min="1" max="50">
                    </div>
                    
                    <div class="form-group">
                        <label for="annual-cashflow" class="form-label">Annual Cash Flow</label>
                        <input type="number" id="annual-cashflow" class="form-control" placeholder="e.g., 1500000" min="0" step="1000">
                    </div>
                    
                    <div class="form-group">
                        <label for="terminal-value" class="form-label">Terminal Value</label>
                        <input type="number" id="terminal-value" class="form-control" placeholder="e.g., 5000000" min="0" step="1000">
                    </div>
                    
                    <div class="form-group">
                        <label for="discount-rate" class="form-label">Discount Rate (%)</label>
                        <input type="number" id="discount-rate" class="form-control" placeholder="e.g., 10" min="0" max="100" value="10">
                    </div>
                    
                    <div class="calculation-preview">
                        <div class="preview-metric">
                            <span>Simple ROI</span>
                            <span class="text-primary">0.0%</span>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary calculate-btn" onclick="calculateIRR()">
                        <i class="bi bi-calculator"></i>
                        Calculate IRR
                    </button>
                </div>
                
                <div class="calculator-results">
                    <div class="result-metrics">
                        <div class="result-metric">
                            <div class="result-icon">
                                <i class="bi bi-graph-up"></i>
                            </div>
                            <div class="result-value" id="irr-result">--</div>
                            <div class="result-label">Internal Rate of Return</div>
                        </div>
                        <div class="result-metric">
                            <div class="result-icon">
                                <i class="bi bi-cash-stack"></i>
                            </div>
                            <div class="result-value" id="npv-result">--</div>
                            <div class="result-label">Net Present Value</div>
                        </div>
                        <div class="result-metric">
                            <div class="result-icon">
                                <i class="bi bi-calendar-check"></i>
                            </div>
                            <div class="result-value" id="payback-result">--</div>
                            <div class="result-label">Payback Period</div>
                        </div>
                    </div>
                    
                    <div class="chart-container" id="cashflow-chart">
                        <div class="chart-placeholder">
                            <i class="bi bi-bar-chart"></i>
                            <p>Cash flow chart will appear here</p>
                        </div>
                    </div>
                </div>
                
                <!-- IRR Dashboard Section -->
                <div class="irr-dashboard-container">
                    <div class="section-header">
                        <h3>IRR Simulation Dashboard</h3>
                    </div>
                    
                    <div class="irr-controls">
                        <div class="irr-control-group">
                            <label for="scenario-selector" class="irr-control-label">Scenario</label>
                            <select id="scenario-selector" class="irr-control-select">
                                <option value="Base Case">Base Case</option>
                                <option value="Optimistic">Optimistic</option>
                                <option value="Pessimistic">Pessimistic</option>
                            </select>
                        </div>
                        
                        <div class="irr-control-group">
                            <label for="target-irr" class="irr-control-label">Target IRR (%)</label>
                            <input type="number" id="target-irr" class="irr-control-input" value="12" min="0" max="30">
                        </div>
                        
                        <div class="irr-control-group">
                            <label for="confidence-level" class="irr-control-label">Confidence Level</label>
                            <select id="confidence-level" class="irr-control-select">
                                <option value="90%">90%</option>
                                <option value="95%" selected>95%</option>
                                <option value="99%">99%</option>
                            </select>
                        </div>
                        
                        <div class="irr-action-buttons">
                            <button class="btn btn-primary">
                                <i class="bi bi-play-fill me-2"></i>Run Simulation
                            </button>
                            <button class="btn btn-secondary">
                                <i class="bi bi-download me-2"></i>Export Results
                            </button>
                        </div>
                    </div>
                    
                    <div class="irr-chart-card">
                        <h4 class="irr-chart-title">IRR Distribution (10,000 Simulations)</h4>
                        <div class="irr-chart-container">
                            <canvas id="irr-distribution-chart"></canvas>
                        </div>
                    </div>
                    
                    <div class="irr-chart-card">
                        <h4 class="irr-chart-title">Cumulative Probability Distribution</h4>
                        <div class="irr-chart-container">
                            <canvas id="irr-cdf-chart"></canvas>
                        </div>
                    </div>
                    
                    <div class="irr-chart-card">
                        <h4 class="irr-chart-title">Sensitivity Analysis</h4>
                        <div class="irr-chart-container">
                            <canvas id="sensitivity-chart"></canvas>
                        </div>
                    </div>
                    
                    <div class="irr-chart-card">
                        <h4 class="irr-chart-title">Scenario Comparison</h4>
                        <div class="irr-chart-container">
                            <canvas id="scenario-comparison-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Projects Page -->
            <div id="projects-page" class="page">
                <div class="page-header">
                    <h2>Projects</h2>
                    <p>Manage your investments</p>
                </div>
                
                <div class="projects-filter">
                    <div class="filter-group">
                        <label for="project-filter" class="filter-label">Filter</label>
                        <select id="project-filter" class="filter-select">
                            <option value="all">All Projects</option>
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label for="project-sort" class="filter-label">Sort By</label>
                        <select id="project-sort" class="filter-select">
                            <option value="date-desc">Newest First</option>
                            <option value="date-asc">Oldest First</option>
                            <option value="irr-desc">Highest IRR</option>
                            <option value="irr-asc">Lowest IRR</option>
                        </select>
                    </div>
                </div>
                
                <div class="project-list">
                    <div class="project-card">
                        <div class="project-type solar">
                            <i class="bi bi-sun"></i>
                        </div>
                        <div class="project-content">
                            <h4>Lagos Solar Farm</h4>
                            <div class="project-meta">
                                <span><i class="bi bi-lightning"></i> 5.0 MW</span>
                                <span><i class="bi bi-graph-up"></i> 16.8% IRR</span>
                                <span><i class="bi bi-geo-alt"></i> Lagos</span>
                            </div>
                            <div class="project-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 75%"></div>
                                </div>
                                <span>75% Complete</span>
                            </div>
                        </div>
                        <div class="project-status">
                            <span class="status-badge active">Active</span>
                        </div>
                    </div>
                    
                    <div class="project-card">
                        <div class="project-type wind">
                            <i class="bi bi-wind"></i>
                        </div>
                        <div class="project-content">
                            <h4>Abuja Wind Project</h4>
                            <div class="project-meta">
                                <span><i class="bi bi-lightning"></i> 2.5 MW</span>
                                <span><i class="bi bi-graph-up"></i> 14.5% IRR</span>
                                <span><i class="bi bi-geo-alt"></i> Abuja</span>
                            </div>
                            <div class="project-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 40%"></div>
                                </div>
                                <span>40% Complete</span>
                            </div>
                        </div>
                        <div class="project-status">
                            <span class="status-badge pending">Pending</span>
                        </div>
                    </div>
                    
                    <div class="project-card">
                        <div class="project-type solar">
                            <i class="bi bi-sun"></i>
                        </div>
                        <div class="project-content">
                            <h4>Kano Solar Array</h4>
                            <div class="project-meta">
                                <span><i class="bi bi-lightning"></i> 3.2 MW</span>
                                <span><i class="bi bi-graph-up"></i> 15.2% IRR</span>
                                <span><i class="bi bi-geo-alt"></i> Kano</span>
                            </div>
                            <div class="project-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 100%"></div>
                                </div>
                                <span>100% Complete</span>
                            </div>
                        </div>
                        <div class="project-status">
                            <span class="status-badge completed">Completed</span>
                        </div>
                    </div>
                    
                    <div class="project-card">
                        <div class="project-type hydro">
                            <i class="bi bi-water"></i>
                        </div>
                        <div class="project-content">
                            <h4>Port Harcourt Hydro</h4>
                            <div class="project-meta">
                                <span><i class="bi bi-lightning"></i> 1.8 MW</span>
                                <span><i class="bi bi-graph-up"></i> 13.8% IRR</span>
                                <span><i class="bi bi-geo-alt"></i> Port Harcourt</span>
                            </div>
                            <div class="project-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 60%"></div>
                                </div>
                                <span>60% Complete</span>
                            </div>
                        </div>
                        <div class="project-status">
                            <span class="status-badge active">Active</span>
                        </div>
                    </div>
                    
                    <div class="project-card">
                        <div class="project-type solar">
                            <i class="bi bi-sun"></i>
                        </div>
                        <div class="project-content">
                            <h4>Ibadan Solar Park</h4>
                            <div class="project-meta">
                                <span><i class="bi bi-lightning"></i> 4.2 MW</span>
                                <span><i class="bi bi-graph-up"></i> 15.9% IRR</span>
                                <span><i class="bi bi-geo-alt"></i> Ibadan</span>
                            </div>
                            <div class="project-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 85%"></div>
                                </div>
                                <span>85% Complete</span>
                            </div>
                        </div>
                        <div class="project-status">
                            <span class="status-badge active">Active</span>
                        </div>
                    </div>
                </div>
                
                <button class="btn btn-primary btn-block add-project-btn">
                    <i class="bi bi-plus-circle me-2"></i>Add New Project
                </button>
            </div>
            
            <!-- ESG Scoring Page -->
            <div id="esg-page" class="page">
                <div class="page-header">
                    <h2>ESG Scoring</h2>
                    <p>Environmental, Social & Governance</p>
                </div>
                
                <div class="esg-dashboard-container">
                    <div class="esg-metrics">
                        <div class="esg-metric-card">
                            <div class="esg-metric-value" id="overall-esg-score">8.7</div>
                            <div class="esg-metric-label">Overall ESG Score</div>
                            <div id="esg-trend" class="trend-badge positive">
                                <i class="bi bi-arrow-up-right"></i>
                                <span>+0.3</span>
                            </div>
                        </div>
                        <div class="esg-metric-card">
                            <div class="esg-metric-value" id="environmental-score">9.2</div>
                            <div class="esg-metric-label">Environmental</div>
                        </div>
                        <div class="esg-metric-card">
                            <div class="esg-metric-value" id="social-score">8.5</div>
                            <div class="esg-metric-label">Social</div>
                        </div>
                        <div class="esg-metric-card">
                            <div class="esg-metric-value" id="governance-score">8.4</div>
                            <div class="esg-metric-label">Governance</div>
                        </div>
                    </div>
                    
                    <div class="esg-chart-card">
                        <h4 class="esg-chart-title">ESG Radar Analysis</h4>
                        <div class="esg-chart-container">
                            <canvas id="esg-radar-chart"></canvas>
                        </div>
                    </div>
                    
                    <div class="esg-chart-card">
                        <h4 class="esg-chart-title">ESG Component Breakdown</h4>
                        <div class="esg-chart-container">
                            <canvas id="esg-breakdown-chart"></canvas>
                        </div>
                    </div>
                    
                    <div class="esg-chart-card">
                        <h4 class="esg-chart-title">Peer Comparison</h4>
                        <div class="esg-chart-container">
                            <canvas id="peer-comparison-chart"></canvas>
                        </div>
                        <div class="esg-benchmark-container">
                            <div class="benchmark-item">
                                <div class="benchmark-value">7.5</div>
                                <div class="benchmark-label">Industry Average</div>
                            </div>
                            <div class="benchmark-item">
                                <div class="benchmark-value">7.2</div>
                                <div class="benchmark-label">Regional Average</div>
                            </div>
                            <div class="benchmark-item">
                                <div class="benchmark-value">7.8</div>
                                <div class="benchmark-label">Global Average</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="esg-chart-card">
                        <h4 class="esg-chart-title">ESG Score Trend</h4>
                        <div class="esg-chart-container">
                            <canvas id="esg-trend-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- XGBoost Model Page -->
            <div id="xgboost-page" class="page">
                <div class="page-header">
                    <h2>XGBoost AI Model</h2>
                    <p>Advanced risk prediction</p>
                </div>
                
                <div id="model-status">
                    <div class="model-status-badge warning">
                        <i class="bi bi-hourglass-split"></i>
                        <span>Loading Model...</span>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-4">
                        <div class="model-stat">
                            <div class="model-stat-value">92%</div>
                            <div class="model-stat-label">AUC Score</div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="model-stat">
                            <div class="model-stat-value">87%</div>
                            <div class="model-stat-label">Accuracy</div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="model-stat">
                            <div class="model-stat-value">14</div>
                            <div class="model-stat-label">Key Features</div>
                        </div>
                    </div>
                </div>
                
                <div class="card mt-4">
                    <div class="card-header">
                        <h3>Feature Importance</h3>
                        <div class="form-group mt-2">
                            <label for="project-type-xgboost">Project Type</label>
                            <select id="project-type-xgboost" class="form-control">
                                <option value="solar">Solar</option>
                                <option value="wind">Wind</option>
                                <option value="hydro">Hydro</option>
                                <option value="biomass">Biomass</option>
                                <option value="geothermal">Geothermal</option>
                            </select>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="feature-importance">
                            <!-- Feature importance bars will be rendered here -->
                        </div>
                    </div>
                </div>
                
                <div class="card mt-4">
                    <div class="card-header">
                        <h3>Model Performance</h3>
                    </div>
                    <div class="card-body">
                        <div id="model-performance-chart" class="chart-placeholder">
                            <i class="bi bi-graph-up"></i>
                            <p>ROC Curve</p>
                            <canvas id="roc-curve-chart" width="400" height="250"></canvas>
                        </div>
                    </div>
                </div>
                
                <div class="card mt-4">
                    <div class="card-header">
                        <h3>Run Prediction</h3>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <label for="project-type-xgboost">Project Type</label>
                            <select id="project-type-xgboost" class="form-control">
                                <option value="solar">Solar</option>
                                <option value="wind">Wind</option>
                                <option value="hydro">Hydro</option>
                                <option value="biomass">Biomass</option>
                                <option value="geothermal">Geothermal</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="project-location">Location</label>
                            <select id="project-location" class="form-control">
                                <option value="lagos">Lagos</option>
                                <option value="abuja">Abuja</option>
                                <option value="kano">Kano</option>
                                <option value="port_harcourt">Port Harcourt</option>
                                <option value="ibadan">Ibadan</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="grid-stability">Grid Stability</label>
                            <select id="grid-stability" class="form-control">
                                <option value="high">High</option>
                                <option value="medium" selected>Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="community-engagement">Community Engagement</label>
                            <select id="community-engagement" class="form-control">
                                <option value="extensive">Extensive</option>
                                <option value="moderate" selected>Moderate</option>
                                <option value="minimal">Minimal</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="project-size">Project Size (MW)</label>
                            <input type="number" id="project-size" class="form-control" value="5" min="0.1" step="0.1">
                        </div>
                        <button id="predict-btn" class="btn btn-primary btn-block mt-3">
                            <i class="bi bi-cpu"></i>
                            Run AI Prediction
                        </button>
                    </div>
                </div>
                
                <div id="prediction-result" class="card mt-4" style="display: none;">
                    <div class="card-header">
                        <h3>Prediction Results</h3>
                    </div>
                    <div class="card-body">
                        <div class="prediction-metrics">
                            <div class="prediction-metric">
                                <div class="prediction-icon">
                                    <i class="bi bi-graph-up"></i>
                                </div>
                                <div class="prediction-value" id="predicted-irr">16.5%</div>
                                <div class="prediction-label">Predicted IRR</div>
                            </div>
                            <div class="prediction-metric">
                                <div class="prediction-icon">
                                    <i class="bi bi-check-circle"></i>
                                </div>
                                <div class="prediction-value" id="success-probability">92%</div>
                                <div class="prediction-label">Success Probability</div>
                            </div>
                            <div class="prediction-metric">
                                <div class="prediction-icon">
                                    <i class="bi bi-shield-check"></i>
                                </div>
                                <div class="prediction-value" id="risk-level">Low Risk</div>
                                <div class="prediction-label">Risk Level</div>
                            </div>
                            <div class="prediction-metric">
                                <div class="prediction-icon">
                                    <i class="bi bi-star"></i>
                                </div>
                                <div class="prediction-value" id="confidence-score">High</div>
                                <div class="prediction-label">Confidence Score</div>
                            </div>
                        </div>
                        
                        <div class="key-factors">
                            <h4>Key Factors</h4>
                            <div id="key-factors-list">
                                <!-- Key factors will be rendered here -->
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card mt-4">
                    <div class="card-header">
                        <h3>Case Studies</h3>
                    </div>
                    <div class="card-body">
                        <div class="case-study">
                            <h4>Lagos Solar Farm (5MW)</h4>
                            <p>Our model predicted an IRR of 16.5% for this project, with the actual IRR coming in at 16.8% - a prediction error of just 0.3%.</p>
                            <div class="case-study-metrics">
                                <div class="case-metric">
                                    <div class="metric-label">Predicted IRR</div>
                                    <div class="metric-value">16.5%</div>
                                </div>
                                <div class="case-metric">
                                    <div class="metric-label">Actual IRR</div>
                                    <div class="metric-value">16.8%</div>
                                </div>
                                <div class="case-metric">
                                    <div class="metric-label">Error</div>
                                    <div class="metric-value">0.3%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Blog Page -->
            <div id="blog-page" class="page">
                <div class="page-header">
                    <h2>Blog</h2>
                    <p>Insights & Analysis</p>
                </div>
                
                <div class="featured-post-mobile">
                    <!-- Featured post content will be loaded here -->
                </div>
                
                <div class="section-header">
                    <h3>Recent Posts</h3>
                </div>
                
                <div class="blog-posts-mobile">
                    <!-- Blog posts will be loaded here -->
                </div>
                
                <div class="newsletter-mobile">
                    <h3>Subscribe to Updates</h3>
                    <p>Get weekly insights on renewable energy investment</p>
                    <div class="newsletter-form">
                        <input type="email" id="newsletter-email" class="form-control" placeholder="Your email address">
                        <button class="btn btn-primary" onclick="mobileBlog.subscribeNewsletter()">
                            <i class="bi bi-envelope"></i>
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Legal Page -->
            <div id="legal-page" class="page">
                <div class="page-header">
                    <h2>Legal Documents</h2>
                    <p>Terms, Privacy & Security</p>
                </div>
                
                <div class="legal-links">
                    <div class="legal-link-card" onclick="window.location.href='privacy.html'">
                        <div class="legal-icon">
                            <i class="bi bi-shield-lock"></i>
                        </div>
                        <div class="legal-content">
                            <h4>Privacy Policy</h4>
                            <p>How we collect, use, and protect your data</p>
                        </div>
                        <div class="legal-arrow">
                            <i class="bi bi-chevron-right"></i>
                        </div>
                    </div>
                    
                    <div class="legal-link-card" onclick="window.location.href='terms.html'">
                        <div class="legal-icon">
                            <i class="bi bi-file-text"></i>
                        </div>
                        <div class="legal-content">
                            <h4>Terms of Service</h4>
                            <p>Rules and guidelines for using our platform</p>
                        </div>
                        <div class="legal-arrow">
                            <i class="bi bi-chevron-right"></i>
                        </div>
                    </div>
                    
                    <div class="legal-link-card" onclick="window.location.href='security.html'">
                        <div class="legal-icon">
                            <i class="bi bi-shield-check"></i>
                        </div>
                        <div class="legal-content">
                            <h4>Security Policy</h4>
                            <p>How we protect your information</p>
                        </div>
                        <div class="legal-arrow">
                            <i class="bi bi-chevron-right"></i>
                        </div>
                    </div>
                </div>
                
                <div class="legal-contact">
                    <h4>Questions?</h4>
                    <p>If you have any questions about our legal policies, please contact us at <a href="mailto:legal@finergycloud.com">legal@finergycloud.com</a></p>
                </div>
            </div>
        </main>
        
        <!-- Bottom Navigation -->
        <nav class="bottom-nav">
            <button class="nav-btn active" data-page="dashboard">
                <i class="bi bi-speedometer2"></i>
                <span>Dashboard</span>
            </button>
            <button class="nav-btn" data-page="calculator">
                <i class="bi bi-calculator"></i>
                <span>Calculator</span>
            </button>
            <button class="nav-btn" data-page="projects">
                <i class="bi bi-kanban"></i>
                <span>Projects</span>
            </button>
            <button class="nav-btn" data-page="esg">
                <i class="bi bi-leaf"></i>
                <span>ESG</span>
            </button>
        </nav>
    </div>
    
    <!-- Service Worker Registration -->
    <script>
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/mobile-app/sw.js')
                    .then(registration => {
                        console.log('Service Worker registered with scope:', registration.scope);
                    })
                    .catch(error => {
                        console.error('Service Worker registration failed:', error);
                    });
            });
        }
    </script>
    
    <!-- App Scripts -->
    <script src="scripts/app.js"></script>
    <script src="scripts/calculator.js"></script>
    <script src="scripts/charts.js"></script>
    <script src="scripts/blog-integration.js"></script>
    <script src="scripts/cross-platform-navigation.js"></script>
    <script src="scripts/dashboard.js"></script>
    <script src="scripts/xgboost-model.js"></script>
    <script src="scripts/irr-dashboard.js"></script>
    <script src="scripts/analytics-dashboard.js"></script>
    <script src="scripts/esg-dashboard.js"></script>
</body>
</html>