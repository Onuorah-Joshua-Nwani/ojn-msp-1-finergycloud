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
    
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    
    <!-- Styles -->
    <link rel="stylesheet" href="styles/app.css">
</head>
<body>
    <div class="app-container">
        <!-- Side Navigation -->
        <nav id="side-nav" class="side-nav">
            <div class="nav-header">
                <div class="nav-brand">
                    <h1>FinergyCloud</h1>
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
                        <i class="bi bi-shield-check"></i>
                        <span>ESG Scoring</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#blog" class="nav-link" data-page="blog">
                        <i class="bi bi-journal-text"></i>
                        <span>Blog</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#xgboost" class="nav-link" data-page="xgboost">
                        <i class="bi bi-cpu"></i>
                        <span>XGBoost Model</span>
                    </a>
                </li>
            </ul>
            <div class="nav-footer">
                <button class="upgrade-btn">
                    <i class="bi bi-star"></i>
                    <span>Upgrade to Pro</span>
                </button>
                <div class="user-info">
                    <div class="user-avatar">
                        <i class="bi bi-person-circle"></i>
                    </div>
                    <div class="user-details">
                        <h3>Demo User</h3>
                        <p>demo@finergycloud.com</p>
                    </div>
                </div>
            </div>
        </nav>
        <div id="nav-overlay" class="nav-overlay"></div>
        
        <!-- Header -->
        <header class="app-header">
            <div class="header-left">
                <button id="menu-toggle" class="menu-btn" aria-label="Menu">
                    <i class="bi bi-list"></i>
                </button>
                <div class="header-brand">
                    <h1 class="header-title">Dashboard</h1>
                    <p class="header-subtitle">Welcome back</p>
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
        
        <!-- Main Content -->
        <main id="main-content" class="main-content">
            <!-- Dashboard Page -->
            <div id="dashboard-page" class="page active">
                <div class="page-header">
                    <h2>Overview</h2>
                    <p>Your renewable energy investment insights</p>
                </div>
                
                <div class="metrics-grid">
                    <div class="metric-card">
                        <div class="metric-icon">
                            <i class="bi bi-graph-up"></i>
                        </div>
                        <div class="metric-value">15.2%</div>
                        <div class="metric-label">Average IRR</div>
                        <div class="metric-change positive">
                            <i class="bi bi-arrow-up"></i>
                            <span>2.3%</span>
                        </div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-icon">
                            <i class="bi bi-shield-check"></i>
                        </div>
                        <div class="metric-value">8.7</div>
                        <div class="metric-label">ESG Score</div>
                        <div class="metric-change positive">
                            <i class="bi bi-arrow-up"></i>
                            <span>0.5</span>
                        </div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-icon">
                            <i class="bi bi-currency-exchange"></i>
                        </div>
                        <div class="metric-value">₦120M+</div>
                        <div class="metric-label">Analyzed Value</div>
                        <div class="metric-change positive">
                            <i class="bi bi-arrow-up"></i>
                            <span>₦20M</span>
                        </div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-icon">
                            <i class="bi bi-exclamation-triangle"></i>
                        </div>
                        <div class="metric-value">Low</div>
                        <div class="metric-label">Risk Level</div>
                        <div class="metric-change positive">
                            <i class="bi bi-arrow-down"></i>
                            <span>Improved</span>
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
                        <div class="project-info">
                            <h4>Lagos Solar Farm</h4>
                            <p>5.0 MW • Lagos, Nigeria</p>
                            <div class="project-metrics">
                                <div class="project-metric">
                                    <span class="metric-label">IRR</span>
                                    <span class="metric-value">16.8%</span>
                                </div>
                                <div class="project-metric">
                                    <span class="metric-label">ESG</span>
                                    <span class="metric-value">8.9</span>
                                </div>
                                <div class="project-metric">
                                    <span class="metric-label">Risk</span>
                                    <span class="metric-value">Low</span>
                                </div>
                            </div>
                        </div>
                        <div class="project-status active">
                            <span>Active</span>
                        </div>
                    </div>
                    
                    <div class="project-card">
                        <div class="project-type wind">
                            <i class="bi bi-wind"></i>
                        </div>
                        <div class="project-info">
                            <h4>Abuja Wind Farm</h4>
                            <p>2.5 MW • Abuja, Nigeria</p>
                            <div class="project-metrics">
                                <div class="project-metric">
                                    <span class="metric-label">IRR</span>
                                    <span class="metric-value">14.5%</span>
                                </div>
                                <div class="project-metric">
                                    <span class="metric-label">ESG</span>
                                    <span class="metric-value">8.5</span>
                                </div>
                                <div class="project-metric">
                                    <span class="metric-label">Risk</span>
                                    <span class="metric-value">Medium</span>
                                </div>
                            </div>
                        </div>
                        <div class="project-status pending">
                            <span>Pending</span>
                        </div>
                    </div>
                    
                    <div class="project-card">
                        <div class="project-type solar">
                            <i class="bi bi-sun"></i>
                        </div>
                        <div class="project-info">
                            <h4>Kano Solar Array</h4>
                            <p>3.2 MW • Kano, Nigeria</p>
                            <div class="project-metrics">
                                <div class="project-metric">
                                    <span class="metric-label">IRR</span>
                                    <span class="metric-value">15.2%</span>
                                </div>
                                <div class="project-metric">
                                    <span class="metric-label">ESG</span>
                                    <span class="metric-value">8.8</span>
                                </div>
                                <div class="project-metric">
                                    <span class="metric-label">Risk</span>
                                    <span class="metric-value">Low</span>
                                </div>
                            </div>
                        </div>
                        <div class="project-status completed">
                            <span>Completed</span>
                        </div>
                    </div>
                </div>
                
                <div class="section-header">
                    <h3>Quick Actions</h3>
                </div>
                
                <div class="action-grid">
                    <div class="action-card" data-page="calculator">
                        <div class="action-icon">
                            <i class="bi bi-calculator"></i>
                        </div>
                        <h4>Calculate IRR</h4>
                        <p>Run financial simulations</p>
                    </div>
                    <div class="action-card" data-page="esg">
                        <div class="action-icon">
                            <i class="bi bi-shield-check"></i>
                        </div>
                        <h4>ESG Scoring</h4>
                        <p>Assess sustainability metrics</p>
                    </div>
                    <div class="action-card" data-page="projects">
                        <div class="action-icon">
                            <i class="bi bi-plus-circle"></i>
                        </div>
                        <h4>New Project</h4>
                        <p>Add investment opportunity</p>
                    </div>
                    <div class="action-card" data-page="xgboost">
                        <div class="action-icon">
                            <i class="bi bi-cpu"></i>
                        </div>
                        <h4>AI Prediction</h4>
                        <p>Get risk intelligence</p>
                    </div>
                </div>
                
                <div class="section-header">
                    <h3>Market Insights</h3>
                </div>
                
                <div class="insights-card">
                    <div class="insights-header">
                        <h4>Renewable Energy Trends</h4>
                        <span class="insights-date">Updated today</span>
                    </div>
                    <div class="insights-content">
                        <div class="insight-item">
                            <div class="insight-icon">
                                <i class="bi bi-sun"></i>
                            </div>
                            <div class="insight-text">
                                <h5>Solar PV Costs Declining</h5>
                                <p>Solar PV module prices have decreased by 7.5% in the last quarter, improving project economics.</p>
                            </div>
                        </div>
                        <div class="insight-item">
                            <div class="insight-icon">
                                <i class="bi bi-currency-exchange"></i>
                            </div>
                            <div class="insight-text">
                                <h5>Financing Rates Stabilizing</h5>
                                <p>Interest rates for renewable projects have stabilized at 8-10% in emerging markets.</p>
                            </div>
                        </div>
                        <div class="insight-item">
                            <div class="insight-icon">
                                <i class="bi bi-file-earmark-text"></i>
                            </div>
                            <div class="insight-text">
                                <h5>New Regulatory Framework</h5>
                                <p>Nigeria's energy commission has approved new net metering regulations for solar projects.</p>
                            </div>
                        </div>
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
                    <!-- Key Metrics -->
                    <div class="metrics-grid">
                        <div class="metric-card">
                            <div class="metric-icon">
                                <i class="bi bi-graph-up"></i>
                            </div>
                            <div class="metric-value">15.2%</div>
                            <div class="metric-label">Average IRR</div>
                            <div class="metric-change positive">
                                <i class="bi bi-arrow-up"></i>
                                <span>2.3%</span>
                            </div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-icon">
                                <i class="bi bi-shield-check"></i>
                            </div>
                            <div class="metric-value">8.7</div>
                            <div class="metric-label">ESG Score</div>
                            <div class="metric-change positive">
                                <i class="bi bi-arrow-up"></i>
                                <span>0.5</span>
                            </div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-icon">
                                <i class="bi bi-currency-exchange"></i>
                            </div>
                            <div class="metric-value">₦120M+</div>
                            <div class="metric-label">Analyzed Value</div>
                            <div class="metric-change positive">
                                <i class="bi bi-arrow-up"></i>
                                <span>₦20M</span>
                            </div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-icon">
                                <i class="bi bi-exclamation-triangle"></i>
                            </div>
                            <div class="metric-value">Low</div>
                            <div class="metric-label">Risk Level</div>
                            <div class="metric-change positive">
                                <i class="bi bi-arrow-down"></i>
                                <span>Improved</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Dashboard Carousel -->
                    <div class="dashboard-carousel">
                        <div class="dashboard-slide active">
                            <img src="../assets/images/dashboards/executive-summary-mobile.png" alt="Executive Summary" class="img-fluid rounded-3 shadow-lg">
                            <div class="slide-caption">Executive Summary</div>
                        </div>
                        <div class="dashboard-slide">
                            <img src="../assets/images/dashboards/financial-analysis-mobile.png" alt="Financial Analysis" class="img-fluid rounded-3 shadow-lg">
                            <div class="slide-caption">Financial Analysis</div>
                        </div>
                        <div class="dashboard-slide">
                            <img src="../assets/images/dashboards/esg-scoring-mobile.png" alt="ESG Scoring" class="img-fluid rounded-3 shadow-lg">
                            <div class="slide-caption">ESG Scoring</div>
                        </div>
                        <div class="dashboard-slide">
                            <img src="../assets/images/dashboards/risk-assessment-mobile.png" alt="Risk Assessment" class="img-fluid rounded-3 shadow-lg">
                            <div class="slide-caption">Risk Assessment</div>
                        </div>
                    </div>
                    
                    <div class="dashboard-controls">
                        <button class="dashboard-control prev">
                            <i class="bi bi-chevron-left"></i>
                        </button>
                        <div class="dashboard-indicators">
                            <span class="indicator active"></span>
                            <span class="indicator"></span>
                            <span class="indicator"></span>
                            <span class="indicator"></span>
                        </div>
                        <button class="dashboard-control next">
                            <i class="bi bi-chevron-right"></i>
                        </button>
                    </div>
                    
                    <!-- Portfolio Analysis -->
                    <div class="section-header">
                        <h3>Portfolio Analysis</h3>
                    </div>
                    
                    <div class="chart-card">
                        <h4 class="chart-title">Portfolio Distribution</h4>
                        <div class="chart-container" id="portfolio-chart"></div>
                    </div>
                    
                    <div class="chart-card">
                        <h4 class="chart-title">Performance Trend</h4>
                        <div class="chart-container" id="performance-chart"></div>
                    </div>
                    
                    <!-- Risk Analysis -->
                    <div class="section-header">
                        <h3>Risk Analysis</h3>
                    </div>
                    
                    <div class="chart-card">
                        <h4 class="chart-title">Risk Distribution</h4>
                        <div class="chart-container" id="risk-chart"></div>
                    </div>
                    
                    <div class="dashboard-actions">
                        <button class="btn btn-primary btn-block">
                            <i class="bi bi-download me-2"></i>Export as PDF
                        </button>
                        <button class="btn btn-outline-primary btn-block">
                            <i class="bi bi-share me-2"></i>Share Dashboard
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- IRR Calculator Page -->
            <div id="calculator-page" class="page">
                <div class="page-header">
                    <h2>IRR Calculator</h2>
                    <p>Simulate investment returns</p>
                </div>
                
                <div class="calculator-form card">
                    <div class="form-group">
                        <label for="project-type" class="form-label">Project Type</label>
                        <select id="project-type" class="form-control">
                            <option value="solar">Solar PV</option>
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
                        <input type="number" id="discount-rate" class="form-control" value="10" min="0" max="100" step="0.1">
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
                
                <div class="calculator-results card">
                    <h3>Calculation Results</h3>
                    
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
                    
                    <div id="cashflow-chart" class="chart-placeholder">
                        <i class="bi bi-graph-up"></i>
                        <p>Cash flow chart will appear here after calculation</p>
                    </div>
                </div>
                
                <!-- IRR Simulation Dashboard -->
                <div class="irr-dashboard-container">
                    <div class="section-header">
                        <h3>IRR Simulation Dashboard</h3>
                    </div>
                    
                    <!-- Key Metrics -->
                    <div class="irr-metrics">
                        <div class="irr-metric-card">
                            <div class="irr-metric-value">15.2%</div>
                            <div class="irr-metric-label">Average Simulated IRR</div>
                        </div>
                        <div class="irr-metric-card">
                            <div class="irr-metric-value">14.8%</div>
                            <div class="irr-metric-label">Median Simulated IRR</div>
                        </div>
                        <div class="irr-metric-card">
                            <div class="irr-metric-value">10,000+</div>
                            <div class="irr-metric-label">Simulations Run</div>
                        </div>
                        <div class="irr-metric-card">
                            <div class="irr-metric-value">85%</div>
                            <div class="irr-metric-label">Prob. of >12% IRR</div>
                        </div>
                    </div>
                    
                    <!-- IRR Distribution Chart -->
                    <div class="irr-chart-card">
                        <h4 class="irr-chart-title">IRR Distribution Histogram</h4>
                        <div class="irr-chart-container">
                            <canvas id="irr-distribution-chart"></canvas>
                        </div>
                    </div>
                    
                    <!-- IRR CDF Chart -->
                    <div class="irr-chart-card">
                        <h4 class="irr-chart-title">Cumulative Distribution Function (CDF)</h4>
                        <div class="irr-chart-container">
                            <canvas id="irr-cdf-chart"></canvas>
                        </div>
                    </div>
                    
                    <!-- Sensitivity Analysis Chart -->
                    <div class="irr-chart-card">
                        <h4 class="irr-chart-title">Sensitivity Analysis (Tornado Chart)</h4>
                        <div class="irr-chart-container">
                            <canvas id="sensitivity-chart"></canvas>
                        </div>
                    </div>
                    
                    <!-- Scenario Comparison Chart -->
                    <div class="irr-chart-card">
                        <h4 class="irr-chart-title">Scenario Comparison</h4>
                        <div class="irr-chart-container">
                            <canvas id="scenario-comparison-chart"></canvas>
                        </div>
                    </div>
                    
                    <!-- Interactive Controls -->
                    <div class="irr-controls">
                        <div class="irr-control-group">
                            <label for="scenario-selector" class="irr-control-label">Scenario Selector</label>
                            <select id="scenario-selector" class="irr-control-select">
                                <option>Base Case</option>
                                <option>Optimistic</option>
                                <option>Pessimistic</option>
                                <option>Custom Scenario</option>
                            </select>
                        </div>
                        <div class="irr-control-group">
                            <label for="target-irr" class="irr-control-label">Target IRR (%)</label>
                            <input type="number" id="target-irr" value="12" class="irr-control-input">
                        </div>
                        <div class="irr-control-group">
                            <label for="confidence-level" class="irr-control-label">VaR Confidence Level (%)</label>
                            <select id="confidence-level" class="irr-control-select">
                                <option>90%</option>
                                <option selected>95%</option>
                                <option>99%</option>
                            </select>
                        </div>
                        <div class="irr-action-buttons">
                            <button class="btn btn-primary">
                                <i class="bi bi-play-circle me-2"></i>Run New Simulation
                            </button>
                            <button class="btn btn-secondary">
                                <i class="bi bi-download me-2"></i>Export Results
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Projects Page -->
            <div id="projects-page" class="page">
                <div class="page-header">
                    <h2>Projects</h2>
                    <p>Manage your investment portfolio</p>
                </div>
                
                <div class="project-filters">
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
                    <button class="btn btn-primary add-project-btn">
                        <i class="bi bi-plus"></i>
                        Add Project
                    </button>
                </div>
                
                <div class="project-list">
                    <div class="project-card">
                        <div class="project-type solar">
                            <i class="bi bi-sun"></i>
                        </div>
                        <div class="project-info">
                            <h4>Lagos Solar Farm</h4>
                            <p>5.0 MW • Lagos, Nigeria</p>
                            <div class="project-metrics">
                                <div class="project-metric">
                                    <span class="metric-label">IRR</span>
                                    <span class="metric-value">16.8%</span>
                                </div>
                                <div class="project-metric">
                                    <span class="metric-label">ESG</span>
                                    <span class="metric-value">8.9</span>
                                </div>
                                <div class="project-metric">
                                    <span class="metric-label">Risk</span>
                                    <span class="metric-value">Low</span>
                                </div>
                            </div>
                        </div>
                        <div class="project-status active">
                            <span>Active</span>
                        </div>
                    </div>
                    
                    <div class="project-card">
                        <div class="project-type wind">
                            <i class="bi bi-wind"></i>
                        </div>
                        <div class="project-info">
                            <h4>Abuja Wind Farm</h4>
                            <p>2.5 MW • Abuja, Nigeria</p>
                            <div class="project-metrics">
                                <div class="project-metric">
                                    <span class="metric-label">IRR</span>
                                    <span class="metric-value">14.5%</span>
                                </div>
                                <div class="project-metric">
                                    <span class="metric-label">ESG</span>
                                    <span class="metric-value">8.5</span>
                                </div>
                                <div class="project-metric">
                                    <span class="metric-label">Risk</span>
                                    <span class="metric-value">Medium</span>
                                </div>
                            </div>
                        </div>
                        <div class="project-status pending">
                            <span>Pending</span>
                        </div>
                    </div>
                    
                    <div class="project-card">
                        <div class="project-type solar">
                            <i class="bi bi-sun"></i>
                        </div>
                        <div class="project-info">
                            <h4>Kano Solar Array</h4>
                            <p>3.2 MW • Kano, Nigeria</p>
                            <div class="project-metrics">
                                <div class="project-metric">
                                    <span class="metric-label">IRR</span>
                                    <span class="metric-value">15.2%</span>
                                </div>
                                <div class="project-metric">
                                    <span class="metric-label">ESG</span>
                                    <span class="metric-value">8.8</span>
                                </div>
                                <div class="project-metric">
                                    <span class="metric-label">Risk</span>
                                    <span class="metric-value">Low</span>
                                </div>
                            </div>
                        </div>
                        <div class="project-status completed">
                            <span>Completed</span>
                        </div>
                    </div>
                    
                    <div class="project-card">
                        <div class="project-type hydro">
                            <i class="bi bi-water"></i>
                        </div>
                        <div class="project-info">
                            <h4>Port Harcourt Hydro</h4>
                            <p>1.8 MW • Port Harcourt, Nigeria</p>
                            <div class="project-metrics">
                                <div class="project-metric">
                                    <span class="metric-label">IRR</span>
                                    <span class="metric-value">13.8%</span>
                                </div>
                                <div class="project-metric">
                                    <span class="metric-label">ESG</span>
                                    <span class="metric-value">8.8</span>
                                </div>
                                <div class="project-metric">
                                    <span class="metric-label">Risk</span>
                                    <span class="metric-value">Medium</span>
                                </div>
                            </div>
                        </div>
                        <div class="project-status active">
                            <span>Active</span>
                        </div>
                    </div>
                    
                    <div class="project-card">
                        <div class="project-type solar">
                            <i class="bi bi-sun"></i>
                        </div>
                        <div class="project-info">
                            <h4>Ibadan Solar Park</h4>
                            <p>4.2 MW • Ibadan, Nigeria</p>
                            <div class="project-metrics">
                                <div class="project-metric">
                                    <span class="metric-label">IRR</span>
                                    <span class="metric-value">15.9%</span>
                                </div>
                                <div class="project-metric">
                                    <span class="metric-label">ESG</span>
                                    <span class="metric-value">8.9</span>
                                </div>
                                <div class="project-metric">
                                    <span class="metric-label">Risk</span>
                                    <span class="metric-value">Low</span>
                                </div>
                            </div>
                        </div>
                        <div class="project-status active">
                            <span>Active</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- ESG Scoring Page -->
            <div id="esg-page" class="page">
                <div class="page-header">
                    <h2>ESG Scoring</h2>
                    <p>Environmental, Social & Governance assessment</p>
                </div>
                
                <div class="esg-dashboard-container">
                    <!-- Key Metrics -->
                    <div class="metrics-grid">
                        <div class="metric-card">
                            <div class="metric-icon">
                                <i class="bi bi-shield-check"></i>
                            </div>
                            <div class="metric-value">8.7</div>
                            <div class="metric-label">Overall ESG Score</div>
                            <div class="metric-change positive">
                                <i class="bi bi-arrow-up"></i>
                                <span>0.5</span>
                            </div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-icon">
                                <i class="bi bi-tree"></i>
                            </div>
                            <div class="metric-value">8.5</div>
                            <div class="metric-label">Environmental</div>
                            <div class="metric-change positive">
                                <i class="bi bi-arrow-up"></i>
                                <span>0.3</span>
                            </div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-icon">
                                <i class="bi bi-people"></i>
                            </div>
                            <div class="metric-value">8.9</div>
                            <div class="metric-label">Social</div>
                            <div class="metric-change positive">
                                <i class="bi bi-arrow-up"></i>
                                <span>0.7</span>
                            </div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-icon">
                                <i class="bi bi-building"></i>
                            </div>
                            <div class="metric-value">8.6</div>
                            <div class="metric-label">Governance</div>
                            <div class="metric-change positive">
                                <i class="bi bi-arrow-up"></i>
                                <span>0.4</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- ESG Trend Chart -->
                    <div class="chart-card">
                        <h4 class="chart-title">ESG Score Trend</h4>
                        <div class="chart-container">
                            <canvas id="esg-trend-chart"></canvas>
                        </div>
                    </div>
                    
                    <!-- ESG Radar Chart -->
                    <div class="chart-card">
                        <h4 class="chart-title">ESG Score Breakdown</h4>
                        <div class="chart-container">
                            <canvas id="esg-radar-chart"></canvas>
                        </div>
                    </div>
                    
                    <!-- Peer Comparison Chart -->
                    <div class="chart-card">
                        <h4 class="chart-title">Peer Comparison</h4>
                        <div class="chart-container">
                            <canvas id="peer-comparison-chart"></canvas>
                        </div>
                    </div>
                    
                    <!-- Factor Impact Chart -->
                    <div class="chart-card">
                        <h4 class="chart-title">ESG Factor Impact</h4>
                        <div class="chart-container">
                            <canvas id="factor-impact-chart"></canvas>
                        </div>
                    </div>
                    
                    <!-- Interactive Tools -->
                    <div class="esg-controls card">
                        <h4>Interactive Tools</h4>
                        <div class="form-group">
                            <label for="esg-project-selector" class="form-label">Project Selector</label>
                            <select id="esg-project-selector" class="form-control">
                                <option>Project A - Solar Farm</option>
                                <option>Project B - Wind Park</option>
                                <option>Project C - Hydro Plant</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="esg-time-period" class="form-label">Time Period</label>
                            <select id="esg-time-period" class="form-control">
                                <option>Last 3 Months</option>
                                <option>Last 6 Months</option>
                                <option>Last 12 Months</option>
                                <option>All Time</option>
                            </select>
                        </div>
                        <div class="esg-action-buttons">
                            <button class="btn btn-primary">
                                <i class="bi bi-file-earmark-text me-2"></i>Generate ESG Report
                            </button>
                            <button class="btn btn-secondary">
                                <i class="bi bi-lightbulb me-2"></i>View Actionable Insights
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Blog Page -->
            <div id="blog-page" class="page">
                <div class="page-header">
                    <h2>Blog</h2>
                    <p>Industry insights & updates</p>
                </div>
                
                <div class="featured-post-mobile">
                    <div class="post-image">
                        <img src="https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg" alt="XGBoost Model Development" class="img-fluid rounded-3">
                        <div class="post-category">AI & Technology</div>
                    </div>
                    <div class="post-content">
                        <div class="post-meta">
                            <span><i class="bi bi-calendar"></i> Dec 18, 2024</span>
                            <span><i class="bi bi-clock"></i> 8 min read</span>
                        </div>
                        <h3>Building Our XGBoost Model: How We're Predicting Solar Project Success in Nigeria</h3>
                        <p>Our XGBoost model achieves 87% accuracy in predicting solar project success in Nigeria's complex market. Learn how we built it and the surprising insights we discovered.</p>
                        <div class="post-actions">
                            <button class="btn btn-primary" onclick="mobileBlog.readPost('post-xgboost')">
                                <i class="bi bi-book-open me-2"></i>Read Article
                            </button>
                            <button class="btn btn-outline-primary" onclick="mobileBlog.shareOnLinkedIn('post-xgboost')">
                                <i class="bi bi-linkedin me-2"></i>Share
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="section-header">
                    <h3>Recent Articles</h3>
                </div>
                
                <div class="blog-posts-mobile">
                    <!-- Blog posts will be loaded dynamically -->
                </div>
                
                <div class="newsletter-mobile">
                    <h3>Subscribe to Updates</h3>
                    <p>Get the latest renewable energy investment insights delivered to your inbox</p>
                    <div class="newsletter-form">
                        <input type="email" id="newsletter-email" class="form-control" placeholder="Your email address">
                        <button class="btn btn-primary" onclick="mobileBlog.subscribeNewsletter()">
                            <i class="bi bi-envelope"></i>
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- XGBoost Model Page -->
            <div id="xgboost-page" class="page">
                <div class="page-header">
                    <h2>XGBoost Model</h2>
                    <p>AI-powered risk intelligence</p>
                </div>
                
                <div class="card">
                    <div id="model-status">
                        <div class="model-status-badge warning">
                            <i class="bi bi-hourglass-split"></i>
                            <span>Loading Model...</span>
                        </div>
                    </div>
                    
                    <h3>Model Performance</h3>
                    <div class="model-stats">
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
                    </div>
                    
                    <h3>Feature Importance</h3>
                    <div class="feature-importance">
                        <!-- Feature importance bars will be loaded dynamically -->
                    </div>
                    
                    <h3>Model Performance</h3>
                    <div id="model-performance-chart" class="chart-placeholder">
                        <i class="bi bi-graph-up"></i>
                        <p>Performance chart will load here</p>
                    </div>
                </div>
                
                <div class="card">
                    <h3>Run Prediction</h3>
                    <div class="form-group">
                        <label for="project-type-xgboost" class="form-label">Project Type</label>
                        <select id="project-type-xgboost" class="form-control">
                            <option value="solar">Solar PV</option>
                            <option value="wind">Wind</option>
                            <option value="hydro">Hydro</option>
                            <option value="biomass">Biomass</option>
                            <option value="geothermal">Geothermal</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="project-location" class="form-label">Location</label>
                        <select id="project-location" class="form-control">
                            <option value="lagos">Lagos</option>
                            <option value="abuja">Abuja</option>
                            <option value="kano">Kano</option>
                            <option value="port_harcourt">Port Harcourt</option>
                            <option value="ibadan">Ibadan</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="grid-stability" class="form-label">Grid Stability</label>
                        <select id="grid-stability" class="form-control">
                            <option value="high">High</option>
                            <option value="medium" selected>Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="community-engagement" class="form-label">Community Engagement</label>
                        <select id="community-engagement" class="form-control">
                            <option value="extensive">Extensive</option>
                            <option value="moderate" selected>Moderate</option>
                            <option value="minimal">Minimal</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="project-size" class="form-label">Project Size (MW)</label>
                        <input type="number" id="project-size" class="form-control" value="5" min="0.1" step="0.1">
                    </div>
                    
                    <button id="predict-btn" class="btn btn-primary">
                        <i class="bi bi-cpu"></i>
                        Run AI Prediction
                    </button>
                </div>
                
                <div id="prediction-result" class="card" style="display: none;">
                    <h3>Prediction Results</h3>
                    
                    <div class="prediction-metrics">
                        <div class="prediction-metric">
                            <div class="prediction-icon">
                                <i class="bi bi-graph-up"></i>
                            </div>
                            <div class="prediction-value" id="predicted-irr">--</div>
                            <div class="prediction-label">Predicted IRR</div>
                        </div>
                        <div class="prediction-metric">
                            <div class="prediction-icon">
                                <i class="bi bi-check-circle"></i>
                            </div>
                            <div class="prediction-value" id="success-probability">--</div>
                            <div class="prediction-label">Success Probability</div>
                        </div>
                        <div class="prediction-metric">
                            <div class="prediction-icon">
                                <i class="bi bi-shield-check"></i>
                            </div>
                            <div class="prediction-value" id="risk-level">--</div>
                            <div class="prediction-label">Risk Level</div>
                        </div>
                        <div class="prediction-metric">
                            <div class="prediction-icon">
                                <i class="bi bi-graph-up"></i>
                            </div>
                            <div class="prediction-value" id="confidence-score">--</div>
                            <div class="prediction-label">Confidence Score</div>
                        </div>
                    </div>
                    
                    <div class="key-factors">
                        <h4>Key Factors</h4>
                        <div id="key-factors-list">
                            <!-- Key factors will be loaded dynamically -->
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <h3>Case Studies</h3>
                    
                    <div class="case-study">
                        <h4>Lagos Solar Farm (5MW)</h4>
                        <p>Our model accurately predicted the IRR within 0.3%, identifying grid stability as the critical success factor.</p>
                        <div class="case-study-metrics">
                            <div class="case-metric">
                                <span class="metric-label">Predicted IRR</span>
                                <span class="metric-value">16.5%</span>
                            </div>
                            <div class="case-metric">
                                <span class="metric-label">Actual IRR</span>
                                <span class="metric-value">16.8%</span>
                            </div>
                            <div class="case-metric">
                                <span class="metric-label">Success Probability</span>
                                <span class="metric-value">92%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Legal Page -->
            <div id="legal-page" class="page">
                <div class="page-header">
                    <h2>Legal Documents</h2>
                    <p>Terms, privacy, and security</p>
                </div>
                
                <div class="legal-cards">
                    <div class="legal-link-card" onclick="window.location.href='privacy.html'">
                        <div class="legal-icon">
                            <i class="bi bi-shield-lock"></i>
                        </div>
                        <div class="legal-content">
                            <h3>Privacy Policy</h3>
                            <p>Learn how we protect your data and privacy</p>
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
                            <h3>Terms of Service</h3>
                            <p>Terms and conditions for using our platform</p>
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
                            <h3>Security Policy</h3>
                            <p>How we keep your information secure</p>
                        </div>
                        <div class="legal-arrow">
                            <i class="bi bi-chevron-right"></i>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <h3>Data Protection</h3>
                    <p>FinergyCloud is committed to protecting your data and privacy. We implement industry-standard security measures and follow best practices for data protection.</p>
                    <p>For any questions or concerns regarding our legal policies, please contact us at <a href="mailto:legal@finergycloud.com">legal@finergycloud.com</a>.</p>
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
                <i class="bi bi-shield-check"></i>
                <span>ESG</span>
            </button>
            <button class="nav-btn" data-page="blog">
                <i class="bi bi-journal-text"></i>
                <span>Blog</span>
            </button>
        </nav>
    </div>
    
    <script src="scripts/app.js"></script>
    <script src="scripts/calculator.js"></script>
    <script src="scripts/charts.js"></script>
    <script src="scripts/blog-integration.js"></script>
    <script src="scripts/xgboost-model.js"></script>
    <script src="scripts/dashboard.js"></script>
    <script src="scripts/cross-platform-navigation.js"></script>
    <script src="scripts/esg-dashboard.js"></script>
    <script src="scripts/irr-dashboard.js"></script>
</body>
</html>