// Analytics Dashboard for FinergyCloud Mobile App

class AnalyticsDashboard {
    constructor() {
        this.charts = {};
        this.chartColors = {
            primary: '#00bfa5',
            secondary: '#004d40',
            solar: '#F59E0B',    // Amber for solar
            wind: '#3B82F6',     // Blue for wind
            hydro: '#0EA5E9',    // Sky blue for hydro
            biomass: '#10B981',  // Green for biomass
            geothermal: '#EC4899' // Pink for geothermal
        };
        this.portfolioData = {
            distribution: {
                labels: ['Solar', 'Wind', 'Hydro', 'Biomass', 'Geothermal'],
                data: [45, 30, 15, 7, 3],
                colors: [
                    this.chartColors.solar,
                    this.chartColors.wind,
                    this.chartColors.hydro,
                    this.chartColors.biomass,
                    this.chartColors.geothermal
                ]
            },
            performance: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                actual: [12.5, 13.2, 14.1, 13.8, 14.5, 15.2, 14.8, 15.1, 14.9, 15.3, 14.7, 15.0],
                target: [12.0, 12.0, 12.5, 12.5, 13.0, 13.0, 13.5, 13.5, 14.0, 14.0, 14.5, 14.5],
                benchmark: [11.2, 11.5, 11.8, 12.0, 12.3, 12.5, 12.8, 13.0, 13.2, 13.5, 13.8, 14.0]
            },
            projects: [
                { name: 'Lagos Solar Farm', type: 'Solar', capacity: 5.0, irr: 16.8, risk: 'Low' },
                { name: 'Abuja Wind Project', type: 'Wind', capacity: 2.5, irr: 14.5, risk: 'Medium' },
                { name: 'Kano Solar Array', type: 'Solar', capacity: 3.2, irr: 15.2, risk: 'Low' },
                { name: 'Port Harcourt Hydro', type: 'Hydro', capacity: 1.8, irr: 13.8, risk: 'Medium' },
                { name: 'Ibadan Solar Park', type: 'Solar', capacity: 4.2, irr: 15.9, risk: 'Low' }
            ],
            sensitivity: [
                { factor: 'Energy Price Growth', impact: 3.5 },
                { factor: 'Construction Cost', impact: -2.8 },
                { factor: 'Operational Expenses', impact: -1.5 },
                { factor: 'Discount Rate', impact: 2.0 },
                { factor: 'Project Completion Time', impact: -1.0 }
            ]
        };
        
        this.riskData = {
            distribution: {
                labels: ['Low Risk', 'Medium Risk', 'High Risk'],
                data: [60, 30, 10],
                colors: ['#10B981', '#F59E0B', '#EF4444']
            },
            factors: [
                { factor: 'Grid Stability', score: 8.5, impact: 'High' },
                { factor: 'Regulatory Environment', score: 7.2, impact: 'High' },
                { factor: 'Currency Volatility', score: 6.8, impact: 'Medium' },
                { factor: 'Political Stability', score: 7.5, impact: 'Medium' },
                { factor: 'Resource Availability', score: 9.2, impact: 'High' }
            ],
            matrix: {
                categories: ['Grid', 'Regulatory', 'Currency', 'Political', 'Resource'],
                projects: ['Lagos Solar', 'Abuja Wind', 'Kano Solar', 'PH Hydro', 'Ibadan Solar'],
                data: [
                    [1, 2, 1, 1, 1], // Lagos Solar
                    [2, 2, 2, 1, 1], // Abuja Wind
                    [1, 2, 2, 2, 1], // Kano Solar
                    [2, 3, 2, 2, 1], // PH Hydro
                    [1, 1, 2, 1, 1]  // Ibadan Solar
                ]
            },
            trends: {
                labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025'],
                overall: [2.8, 2.5, 2.3, 2.0, 1.8],
                grid: [3.0, 2.8, 2.5, 2.2, 2.0],
                regulatory: [2.5, 2.4, 2.3, 2.1, 2.0],
                currency: [3.2, 2.9, 2.7, 2.4, 2.2]
            }
        };
        
        this.esgData = {
            scores: {
                environmental: 8.7,
                social: 7.9,
                governance: 8.4,
                overall: 8.4
            },
            trends: {
                labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025'],
                project: [7.8, 8.1, 8.3, 8.4, 8.4],
                industry: [7.2, 7.3, 7.4, 7.5, 7.6]
            },
            breakdown: {
                environmental: {
                    'Carbon Emissions': 9.2,
                    'Resource Usage': 8.5,
                    'Waste Management': 8.9,
                    'Biodiversity Impact': 8.3
                },
                social: {
                    'Community Relations': 8.7,
                    'Labor Practices': 7.5,
                    'Human Rights': 8.2,
                    'Health & Safety': 7.4
                },
                governance: {
                    'Board Structure': 8.6,
                    'Business Ethics': 8.2,
                    'Transparency': 8.5,
                    'Risk Management': 8.3
                }
            },
            peers: [
                { name: 'Your Project', score: 8.4 },
                { name: 'Peer A', score: 7.8 },
                { name: 'Peer B', score: 8.1 },
                { name: 'Peer C', score: 7.2 },
                { name: 'Peer D', score: 6.9 }
            ],
            factors: [
                { factor: 'Carbon Reduction', impact: 3.2, industry: 2.1 },
                { factor: 'Community Programs', impact: 2.8, industry: 1.8 },
                { factor: 'Governance Structure', impact: 2.5, industry: 2.2 },
                { factor: 'Transparency', impact: 2.3, industry: 1.9 },
                { factor: 'Resource Efficiency', impact: 2.1, industry: 1.7 }
            ]
        };
        
        this.init();
    }

    init() {
        // Load Chart.js if not already loaded
        this.loadChartJS(() => {
            this.setupEventListeners();
        });
    }
    
    loadChartJS(callback) {
        if (window.Chart) {
            callback();
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.async = true;
        script.onload = callback;
        document.head.appendChild(script);
    }

    setupEventListeners() {
        document.addEventListener('pageActivated', (e) => {
            if (e.detail.pageId === 'analytics') {
                this.loadAnalyticsData();
                this.initializeCharts();
            }
        });
    }

    loadAnalyticsData() {
        // In a real app, this would fetch data from an API
        console.log('Loading analytics data...');
        
        // Update portfolio metrics
        this.updatePortfolioMetrics();
        
        // Update risk metrics
        this.updateRiskMetrics();
        
        // Update ESG metrics
        this.updateESGMetrics();
    }

    updatePortfolioMetrics() {
        // Calculate portfolio metrics
        const projects = this.portfolioData.projects;
        const totalCapacity = projects.reduce((sum, project) => sum + project.capacity, 0);
        const weightedIRR = projects.reduce((sum, project) => sum + (project.irr * project.capacity), 0) / totalCapacity;
        const lowRiskProjects = projects.filter(project => project.risk === 'Low').length;
        const lowRiskPercentage = (lowRiskProjects / projects.length) * 100;
        
        // Update metrics if elements exist
        const totalCapacityEl = document.getElementById('total-capacity');
        const weightedIRREl = document.getElementById('weighted-irr');
        const projectCountEl = document.getElementById('project-count');
        const lowRiskPercentageEl = document.getElementById('low-risk-percentage');
        
        if (totalCapacityEl) totalCapacityEl.textContent = `${totalCapacity.toFixed(1)} MW`;
        if (weightedIRREl) weightedIRREl.textContent = `${weightedIRR.toFixed(1)}%`;
        if (projectCountEl) projectCountEl.textContent = projects.length;
        if (lowRiskPercentageEl) lowRiskPercentageEl.textContent = `${lowRiskPercentage.toFixed(0)}%`;
    }

    updateRiskMetrics() {
        // Calculate risk metrics
        const riskFactors = this.riskData.factors;
        const avgRiskScore = riskFactors.reduce((sum, factor) => sum + factor.score, 0) / riskFactors.length;
        const highImpactFactors = riskFactors.filter(factor => factor.impact === 'High').length;
        
        // Update metrics if elements exist
        const avgRiskScoreEl = document.getElementById('avg-risk-score');
        const highImpactFactorsEl = document.getElementById('high-impact-factors');
        
        if (avgRiskScoreEl) avgRiskScoreEl.textContent = avgRiskScore.toFixed(1);
        if (highImpactFactorsEl) highImpactFactorsEl.textContent = highImpactFactors;
    }
    
    updateESGMetrics() {
        // Update ESG metrics if elements exist
        const envScoreEl = document.getElementById('env-score');
        const socScoreEl = document.getElementById('soc-score');
        const govScoreEl = document.getElementById('gov-score');
        const overallESGEl = document.getElementById('overall-esg');
        
        if (envScoreEl) envScoreEl.textContent = this.esgData.scores.environmental.toFixed(1);
        if (socScoreEl) socScoreEl.textContent = this.esgData.scores.social.toFixed(1);
        if (govScoreEl) govScoreEl.textContent = this.esgData.scores.governance.toFixed(1);
        if (overallESGEl) overallESGEl.textContent = this.esgData.scores.overall.toFixed(1);
    }

    initializeCharts() {
        if (!window.Chart) {
            this.loadChartJS(() => {
                this.createPortfolioDistributionChart();
                this.createPortfolioPerformanceChart();
                this.createRiskDistributionChart();
                this.createRiskMatrixChart();
                this.createRiskTrendChart();
            });
        } else {
            this.createPortfolioDistributionChart();
            this.createPortfolioPerformanceChart();
            this.createRiskDistributionChart();
            this.createRiskMatrixChart();
            this.createRiskTrendChart();
        }
    }

    createRiskMatrixTable() {
        // Create a table-based risk matrix as fallback when Chart.js is not available
        const container = document.querySelector('.risk-matrix-chart-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        // Create risk matrix title
        const title = document.createElement('div');
        title.className = 'risk-matrix-title';
        title.textContent = 'Project Risk Matrix';
        container.appendChild(title);
        
        // Create risk matrix grid
        const grid = document.createElement('div');
        grid.className = 'risk-matrix-grid';
        
        // Add column headers (risk categories)
        const headerRow = document.createElement('div');
        headerRow.className = 'risk-matrix-row header-row';
        
        // Add empty cell for top-left corner
        const cornerCell = document.createElement('div');
        cornerCell.className = 'risk-matrix-cell corner-cell';
        headerRow.appendChild(cornerCell);
        
        // Add category headers
        const categories = ['Grid', 'Regulatory', 'Currency', 'Political', 'Resource'];
        categories.forEach(category => {
            const headerCell = document.createElement('div');
            headerCell.className = 'risk-matrix-cell header-cell';
            headerCell.textContent = category;
            headerRow.appendChild(headerCell);
        });
        
        grid.appendChild(headerRow);
        
        // Add rows with project names and risk cells
        const projects = ['Lagos Solar', 'Abuja Wind', 'Kano Solar', 'PH Hydro', 'Ibadan Solar'];
        const riskData = [
            [1, 2, 1, 1, 1], // Lagos Solar
            [2, 2, 2, 1, 1], // Abuja Wind
            [1, 2, 2, 2, 1], // Kano Solar
            [2, 3, 2, 2, 1], // PH Hydro
            [1, 1, 2, 1, 1]  // Ibadan Solar
        ];
        
        projects.forEach((project, rowIndex) => {
            const row = document.createElement('div');
            row.className = 'risk-matrix-row';
            
            // Add project name cell
            const projectCell = document.createElement('div');
            projectCell.className = 'risk-matrix-cell project-cell';
            projectCell.textContent = project;
            row.appendChild(projectCell);
            
            // Add risk cells
            categories.forEach((category, colIndex) => {
                const riskCell = document.createElement('div');
                riskCell.className = 'risk-matrix-cell risk-cell';
                
                const riskValue = riskData[rowIndex][colIndex];
                let riskClass = '';
                let riskLabel = '';
                
                if (riskValue === 1) {
                    riskClass = 'low-risk';
                    riskLabel = 'Low';
                } else if (riskValue === 2) {
                    riskClass = 'medium-risk';
                    riskLabel = 'Med';
                } else {
                    riskClass = 'high-risk';
                    riskLabel = 'High';
                }
                
                riskCell.classList.add(riskClass);
                riskCell.textContent = riskLabel;
                
                row.appendChild(riskCell);
            });
            
            grid.appendChild(row);
        });
        
        container.appendChild(grid);
        
        // Add legend
        const legend = document.createElement('div');
        legend.className = 'risk-matrix-legend';
        
        const lowRisk = document.createElement('div');
        lowRisk.className = 'legend-item';
        lowRisk.innerHTML = '<span class="legend-color low-risk"></span><span>Low Risk</span>';
        
        const mediumRisk = document.createElement('div');
        mediumRisk.className = 'legend-item';
        mediumRisk.innerHTML = '<span class="legend-color medium-risk"></span><span>Medium Risk</span>';
        
        const highRisk = document.createElement('div');
        highRisk.className = 'legend-item';
        highRisk.innerHTML = '<span class="legend-color high-risk"></span><span>High Risk</span>';
        
        legend.appendChild(lowRisk);
        legend.appendChild(mediumRisk);
        legend.appendChild(highRisk);
        
        container.appendChild(legend);
    }

    createRiskMatrixChart() {
        this.createRiskMatrixTable();
    }

    createPortfolioDistributionChart() {
        const ctx = document.getElementById('portfolio-distribution-chart');
        if (!ctx || !window.Chart) return;
        
        // Clear existing chart if any
        if (this.charts.portfolioDistributionChart) {
            this.charts.portfolioDistributionChart.destroy();
        }
        
        // Create chart
        this.charts.portfolioDistributionChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: this.portfolioData.distribution.labels,
                datasets: [{
                    data: this.portfolioData.distribution.data,
                    backgroundColor: this.portfolioData.distribution.colors,
                    borderColor: 'white',
                    borderWidth: 2,
                    hoverOffset: 15
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                size: 12,
                                family: "'Poppins', sans-serif"
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 77, 64, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: this.chartColors.primary,
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: ${percentage}% (${value} projects)`;
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Portfolio Distribution',
                        color: '#004d40',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                layout: {
                    padding: 20
                }
            }
        });
        
        // Add center text for doughnut chart
        const chartArea = document.querySelector('.portfolio-distribution-chart-container');
        if (chartArea) {
            const centerText = document.createElement('div');
            centerText.className = 'doughnut-center-text';
            centerText.innerHTML = `
                <div class="center-value">16.7 MW</div>
                <div class="center-label">Total Portfolio</div>
            `;
            chartArea.appendChild(centerText);
        }
    }

    createPortfolioPerformanceChart() {
        const ctx = document.getElementById('portfolio-performance-chart');
        if (!ctx || !window.Chart) return;
        
        // Clear existing chart if any
        if (this.charts.portfolioPerformanceChart) {
            this.charts.portfolioPerformanceChart.destroy();
        }
        
        // Create chart
        this.charts.portfolioPerformanceChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.portfolioData.performance.labels,
                datasets: [
                    {
                        label: 'Actual IRR',
                        data: this.portfolioData.performance.actual,
                        borderColor: this.chartColors.primary,
                        backgroundColor: 'rgba(0, 191, 165, 0.15)',
                        borderWidth: 3,
                        pointBackgroundColor: this.chartColors.primary,
                        pointBorderColor: '#fff',
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        fill: true,
                        tension: 0.3
                    },
                    {
                        label: 'Target IRR',
                        data: this.portfolioData.performance.target,
                        borderColor: this.chartColors.solar,
                        backgroundColor: 'rgba(245, 158, 11, 0.15)',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        pointBackgroundColor: this.chartColors.solar,
                        pointBorderColor: '#fff',
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        fill: false,
                        tension: 0.3
                    },
                    {
                        label: 'Industry Benchmark',
                        data: this.portfolioData.performance.benchmark,
                        borderColor: '#757575',
                        backgroundColor: 'rgba(117, 117, 117, 0.1)',
                        borderWidth: 2,
                        borderDash: [2, 2],
                        pointBackgroundColor: '#757575',
                        pointBorderColor: '#fff',
                        pointRadius: 2,
                        pointHoverRadius: 4,
                        fill: false,
                        tension: 0.3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                size: 12,
                                family: "'Poppins', sans-serif"
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 77, 64, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: this.chartColors.primary,
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label || '';
                                const value = context.parsed.y;
                                return `${label}: ${value.toFixed(1)}%`;
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Portfolio Performance Trend',
                        color: '#004d40',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    y: {
                        min: 10,
                        max: 18,
                        title: {
                            display: true,
                            text: 'IRR (%)',
                            color: '#004d40',
                            font: {
                                weight: 'bold',
                                family: "'Poppins', sans-serif"
                            }
                        },
                        grid: {
                            color: 'rgba(0, 77, 64, 0.1)'
                        },
                        ticks: {
                            stepSize: 1,
                            color: '#004d40',
                            font: {
                                family: "'Poppins', sans-serif"
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 77, 64, 0.1)'
                        },
                        ticks: {
                            color: '#004d40',
                            font: {
                                family: "'Poppins', sans-serif"
                            }
                        }
                    }
                },
                layout: {
                    padding: 10
                }
            }
        });
    }
    
    createPortfolioCharts() {
        this.createIRRDistributionChart();
        this.createSensitivityAnalysisChart();
    }
    
    createRiskCharts() {
        this.createRiskDistributionChart();
        this.createRiskMatrixChart();
        this.createRiskTrendChart();
    }
    
    createESGCharts() {
        this.createESGTrendChart();
        this.createESGBreakdownChart();
        this.createPeerComparisonChart();
        this.createESGFactorImpactChart();
    }

    createIRRDistributionChart() {
        const ctx = document.getElementById('irr-distribution-chart');
        if (!ctx) return;
        
        // Clear existing chart if any
        if (this.charts.irrDistributionChart) {
            this.charts.irrDistributionChart.destroy();
        }
        
        // Create chart
        this.charts.irrDistributionChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.portfolioData.distribution.labels,
                datasets: [{
                    label: 'Frequency',
                    data: this.portfolioData.distribution.data,
                    backgroundColor: this.portfolioData.distribution.colors,
                    borderColor: '#004d40',
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 77, 64, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#00bfa5',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                return `Frequency: ${context.raw} simulations`;
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'IRR Distribution (10,000 Simulations)',
                        color: '#004d40',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Simulations',
                            color: '#004d40',
                            font: {
                                weight: 'bold',
                                size: 12
                            }
                        },
                        grid: {
                            color: 'rgba(0, 77, 64, 0.1)'
                        },
                        ticks: {
                            color: '#004d40'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'IRR Range',
                            color: '#004d40',
                            font: {
                                weight: 'bold',
                                size: 12
                            }
                        },
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#004d40'
                        }
                    }
                }
            }
        });
        
        // Add probability indicator
        const chartArea = document.querySelector('.irr-distribution-chart-container');
        if (chartArea) {
            const indicator = document.createElement('div');
            indicator.className = 'chart-annotation';
            indicator.innerHTML = `
                <div class="probability-badge">
                    <span class="probability-label">Probability > 15%:</span>
                    <span class="probability-value">55%</span>
                </div>
            `;
            chartArea.appendChild(indicator);
        }
    }

    createSensitivityAnalysisChart() {
        const ctx = document.getElementById('sensitivity-analysis-chart');
        if (!ctx) return;
        
        // Clear existing chart if any
        if (this.charts.sensitivityChart) {
            this.charts.sensitivityChart.destroy();
        }
        
        // Prepare data
        const factors = this.portfolioData.sensitivity.map(item => item.factor);
        const impacts = this.portfolioData.sensitivity.map(item => item.impact);
        const colors = impacts.map(impact => impact >= 0 ? '#10B981' : '#EF4444');
        const borderColors = impacts.map(impact => impact >= 0 ? '#059669' : '#DC2626');
        
        // Create chart
        this.charts.sensitivityChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: factors,
                datasets: [{
                    label: 'Impact on IRR (%)',
                    data: impacts,
                    backgroundColor: colors,
                    borderColor: borderColors,
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 77, 64, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#00bfa5',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                const value = context.raw;
                                const sign = value >= 0 ? '+' : '';
                                return `Impact: ${sign}${value.toFixed(1)}% IRR`;
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Sensitivity Analysis',
                        color: '#004d40',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Impact on IRR (%)',
                            color: '#004d40',
                            font: {
                                weight: 'bold',
                                size: 12
                            }
                        },
                        grid: {
                            color: 'rgba(0, 77, 64, 0.1)'
                        },
                        ticks: {
                            color: '#004d40'
                        }
                    },
                    y: {
                        title: {
                            display: false
                        },
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#004d40',
                            font: {
                                weight: 'medium'
                            }
                        }
                    }
                }
            }
        });
    }

    createRiskDistributionChart() {
        const ctx = document.getElementById('risk-distribution-chart');
        if (!ctx || !window.Chart) return;
        
        // Clear existing chart if any
        if (this.charts.riskDistributionChart) {
            this.charts.riskDistributionChart.destroy();
        }
        
        // Create chart
        this.charts.riskDistributionChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: this.riskData.distribution.labels,
                datasets: [{
                    data: this.riskData.distribution.data,
                    backgroundColor: [
                        '#10B981',  // Low Risk - Green
                        '#F59E0B',  // Medium Risk - Amber
                        '#EF4444'   // High Risk - Red
                    ],
                    borderColor: 'white',
                    borderWidth: 2,
                    hoverOffset: 15
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true, 
                            padding: 20,
                            font: {
                                size: 12,
                                family: "'Poppins', sans-serif"
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 77, 64, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: this.chartColors.primary,
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: ${percentage}% (${value} projects)`;
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Risk Distribution',
                        color: '#004d40',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                layout: {
                    padding: 10
                }
            }
        });
    }

    createRiskTrendChart() {
        const ctx = document.getElementById('risk-trend-chart');
        if (!ctx || !window.Chart) return;
        
        // Clear existing chart if any
        if (this.charts.riskTrendChart) {
            this.charts.riskTrendChart.destroy();
        }
        
        // Create chart
        this.charts.riskTrendChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.riskData.trends.labels,
                datasets: [
                    {
                        label: 'Overall Risk',
                        data: this.riskData.trends.overall,
                        borderColor: this.chartColors.primary,
                        backgroundColor: 'rgba(0, 191, 165, 0.15)',
                        borderWidth: 3,
                        pointBackgroundColor: this.chartColors.primary,
                        pointBorderColor: '#fff',
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        fill: true,
                        tension: 0.3
                    },
                    {
                        label: 'Grid Risk',
                        data: this.riskData.trends.grid,
                        borderColor: this.chartColors.solar,
                        backgroundColor: 'rgba(245, 158, 11, 0.15)',
                        borderWidth: 2,
                        pointBackgroundColor: this.chartColors.solar,
                        pointBorderColor: '#fff',
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        fill: false,
                        tension: 0.3
                    },
                    {
                        label: 'Regulatory Risk',
                        data: this.riskData.trends.regulatory,
                        borderColor: this.chartColors.wind,
                        backgroundColor: 'rgba(59, 130, 246, 0.15)',
                        borderWidth: 2,
                        pointBackgroundColor: this.chartColors.wind,
                        pointBorderColor: '#fff',
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        fill: false,
                        tension: 0.3
                    },
                    {
                        label: 'Currency Risk',
                        data: this.riskData.trends.currency,
                        borderColor: this.chartColors.geothermal,
                        backgroundColor: 'rgba(139, 92, 246, 0.15)',
                        borderWidth: 2,
                        pointBackgroundColor: this.chartColors.geothermal,
                        pointBorderColor: '#fff',
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        fill: false,
                        tension: 0.3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                size: 12,
                                family: "'Poppins', sans-serif"
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 77, 64, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: this.chartColors.primary,
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label || '';
                                const value = context.parsed.y;
                                let riskLevel = 'Low';
                                if (value > 3) riskLevel = 'High';
                                else if (value > 2) riskLevel = 'Medium';
                                return `${label}: ${value.toFixed(1)} (${riskLevel})`;
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Risk Trend Analysis',
                        color: '#004d40',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    y: {
                        min: 1,
                        max: 5,
                        reverse: true, // Lower values are better for risk (1 = low risk, 5 = high risk)
                        title: {
                            display: true,
                            text: 'Risk Level (1-5)',
                            color: '#004d40',
                            font: {
                                weight: 'bold',
                                family: "'Poppins', sans-serif"
                            }
                        },
                        grid: {
                            color: 'rgba(0, 77, 64, 0.1)'
                        },
                        ticks: {
                            stepSize: 1,
                            color: '#004d40',
                            font: {
                                family: "'Poppins', sans-serif"
                            },
                            callback: function(value) {
                                let label = '';
                                if (value === 1) label = '1 - Low';
                                else if (value === 3) label = '3 - Medium';
                                else if (value === 5) label = '5 - High';
                                else label = value.toString();
                                return label;
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 77, 64, 0.1)'
                        },
                        ticks: {
                            color: '#004d40',
                            font: {
                                family: "'Poppins', sans-serif"
                            }
                        }
                    }
                },
                layout: {
                    padding: 10
                }
            }
        });
        
        // Add risk threshold line
        const chartArea = document.querySelector('.risk-trend-chart-container');
        if (chartArea) {
            const annotation = document.createElement('div');
            annotation.className = 'chart-annotation';
            annotation.innerHTML = `
                <div class="risk-threshold-badge">
                    <span class="threshold-label">Critical Threshold:</span>
                    <span class="threshold-value">3.0</span>
                </div>
            `;
            chartArea.appendChild(annotation);
        }
    }

    createESGTrendChart() {
        const ctx = document.getElementById('esg-trend-chart');
        if (!ctx) return;
        
        // Clear existing chart if any
        if (this.charts.esgTrendChart) {
            this.charts.esgTrendChart.destroy();
        }
        
        // Create chart
        this.charts.esgTrendChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.esgData.trends.labels,
                datasets: [
                    {
                        label: 'Your Project',
                        data: this.esgData.trends.project,
                        borderColor: '#00bfa5',
                        backgroundColor: 'rgba(0, 191, 165, 0.1)',
                        borderWidth: 3,
                        pointBackgroundColor: '#00bfa5',
                        pointBorderColor: '#fff',
                        pointRadius: 5,
                        pointHoverRadius: 7,
                        fill: true,
                        tension: 0.3
                    },
                    {
                        label: 'Industry Average',
                        data: this.esgData.trends.industry,
                        borderColor: '#9e9e9e',
                        backgroundColor: 'rgba(158, 158, 158, 0.1)',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        pointBackgroundColor: '#9e9e9e',
                        pointBorderColor: '#fff',
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        fill: true,
                        tension: 0.3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            font: {
                                size: 11
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 77, 64, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#00bfa5',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label || '';
                                const value = context.parsed.y;
                                return `${label}: ${value.toFixed(1)}/10`;
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'ESG Score Trend',
                        color: '#004d40',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    y: {
                        min: 5,
                        max: 10,
                        title: {
                            display: true,
                            text: 'ESG Score (0-10)',
                            color: '#004d40',
                            font: {
                                weight: 'bold',
                                size: 12
                            }
                        },
                        grid: {
                            color: 'rgba(0, 77, 64, 0.1)'
                        },
                        ticks: {
                            stepSize: 1,
                            color: '#004d40'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 77, 64, 0.1)'
                        },
                        ticks: {
                            color: '#004d40'
                        }
                    }
                }
            }
        });
        
        // Add target score annotation
        const chartArea = document.querySelector('.esg-trend-chart-container');
        if (chartArea) {
            const annotation = document.createElement('div');
            annotation.className = 'chart-annotation';
            annotation.innerHTML = `
                <div class="target-badge">
                    <span class="target-label">Target Score:</span>
                    <span class="target-value">8.5</span>
                </div>
            `;
            chartArea.appendChild(annotation);
        }
    }

    createESGBreakdownChart() {
        const ctx = document.getElementById('esg-breakdown-chart');
        if (!ctx) return;
        
        // Clear existing chart if any
        if (this.charts.esgBreakdownChart) {
            this.charts.esgBreakdownChart.destroy();
        }
        
        // Prepare data for radar chart
        const labels = [
            'Carbon Emissions', 'Resource Usage', 'Waste Management', 'Biodiversity',
            'Community Relations', 'Labor Practices', 'Human Rights', 'Health & Safety',
            'Board Structure', 'Business Ethics', 'Transparency', 'Risk Management'
        ];
        
        const projectData = [
            this.esgData.breakdown.environmental['Carbon Emissions'],
            this.esgData.breakdown.environmental['Resource Usage'],
            this.esgData.breakdown.environmental['Waste Management'],
            this.esgData.breakdown.environmental['Biodiversity Impact'],
            this.esgData.breakdown.social['Community Relations'],
            this.esgData.breakdown.social['Labor Practices'],
            this.esgData.breakdown.social['Human Rights'],
            this.esgData.breakdown.social['Health & Safety'],
            this.esgData.breakdown.governance['Board Structure'],
            this.esgData.breakdown.governance['Business Ethics'],
            this.esgData.breakdown.governance['Transparency'],
            this.esgData.breakdown.governance['Risk Management']
        ];
        
        // Industry benchmark data (slightly lower than project data)
        const industryData = projectData.map(val => Math.max(5, val - 0.5 - Math.random() * 0.5));
        
        // Create chart
        this.charts.esgBreakdownChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Your Project',
                        data: projectData,
                        backgroundColor: 'rgba(0, 191, 165, 0.2)',
                        borderColor: '#00bfa5',
                        borderWidth: 2,
                        pointBackgroundColor: '#00bfa5',
                        pointBorderColor: '#ffffff',
                        pointHoverBackgroundColor: '#ffffff',
                        pointHoverBorderColor: '#00bfa5',
                        pointRadius: 4,
                        pointHoverRadius: 6
                    },
                    {
                        label: 'Industry Benchmark',
                        data: industryData,
                        backgroundColor: 'rgba(158, 158, 158, 0.2)',
                        borderColor: '#9e9e9e',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        pointBackgroundColor: '#9e9e9e',
                        pointBorderColor: '#ffffff',
                        pointHoverBackgroundColor: '#ffffff',
                        pointHoverBorderColor: '#9e9e9e',
                        pointRadius: 3,
                        pointHoverRadius: 5
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        min: 5,
                        max: 10,
                        ticks: {
                            stepSize: 1,
                            backdropColor: 'transparent',
                            color: '#004d40'
                        },
                        grid: {
                            color: 'rgba(0, 77, 64, 0.1)'
                        },
                        angleLines: {
                            color: 'rgba(0, 77, 64, 0.1)'
                        },
                        pointLabels: {
                            color: '#004d40',
                            font: {
                                size: 10
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            font: {
                                size: 11
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 77, 64, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#00bfa5',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label || '';
                                const value = context.raw;
                                return `${label}: ${value.toFixed(1)}/10`;
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'ESG Component Breakdown',
                        color: '#004d40',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                }
            }
        });
        
        // Add legend for ESG categories
        const chartArea = document.querySelector('.esg-breakdown-chart-container');
        if (chartArea) {
            const legend = document.createElement('div');
            legend.className = 'esg-category-legend';
            legend.innerHTML = `
                <div class="category-item">
                    <span class="category-color" style="background-color: #10B981;"></span>
                    <span class="category-label">Environmental (1-4)</span>
                </div>
                <div class="category-item">
                    <span class="category-color" style="background-color: #3B82F6;"></span>
                    <span class="category-label">Social (5-8)</span>
                </div>
                <div class="category-item">
                    <span class="category-color" style="background-color: #8B5CF6;"></span>
                    <span class="category-label">Governance (9-12)</span>
                </div>
            `;
            chartArea.appendChild(legend);
        }
    }

    createPeerComparisonChart() {
        const ctx = document.getElementById('peer-comparison-chart');
        if (!ctx) return;
        
        // Clear existing chart if any
        if (this.charts.peerChart) {
            this.charts.peerChart.destroy();
        }
        
        // Sort peers by score
        const sortedPeers = [...this.esgData.peers].sort((a, b) => b.score - a.score);
        
        // Create chart
        this.charts.peerChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedPeers.map(peer => peer.name),
                datasets: [{
                    label: 'ESG Score',
                    data: sortedPeers.map(peer => peer.score),
                    backgroundColor: sortedPeers.map(peer => 
                        peer.name === 'Your Project' ? '#00bfa5' : '#9e9e9e'
                    ),
                    borderColor: sortedPeers.map(peer => 
                        peer.name === 'Your Project' ? '#004d40' : '#757575'
                    ),
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 77, 64, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#00bfa5',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                const value = context.raw;
                                return `ESG Score: ${value.toFixed(1)}/10`;
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'ESG Peer Comparison',
                        color: '#004d40',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    x: {
                        min: 5,
                        max: 10,
                        title: {
                            display: true,
                            text: 'ESG Score (0-10)',
                            color: '#004d40',
                            font: {
                                weight: 'bold',
                                size: 12
                            }
                        },
                        grid: {
                            color: 'rgba(0, 77, 64, 0.1)'
                        },
                        ticks: {
                            stepSize: 1,
                            color: '#004d40'
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#004d40',
                            font: {
                                weight: (value) => {
                                    return sortedPeers[value].name === 'Your Project' ? 'bold' : 'normal';
                                }
                            }
                        }
                    }
                }
            }
        });
        
        // Add industry average line
        const chartArea = document.querySelector('.peer-comparison-chart-container');
        if (chartArea) {
            const annotation = document.createElement('div');
            annotation.className = 'chart-annotation';
            annotation.innerHTML = `
                <div class="industry-badge">
                    <span class="industry-label">Industry Average:</span>
                    <span class="industry-value">7.6</span>
                </div>
            `;
            chartArea.appendChild(annotation);
        }
    }

    createESGFactorImpactChart() {
        const ctx = document.getElementById('esg-factor-impact-chart');
        if (!ctx) return;
        
        // Clear existing chart if any
        if (this.charts.esgFactorChart) {
            this.charts.esgFactorChart.destroy();
        }
        
        // Sort factors by impact
        const sortedFactors = [...this.esgData.factors].sort((a, b) => b.impact - a.impact);
        
        // Create chart
        this.charts.esgFactorChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedFactors.map(item => item.factor),
                datasets: [
                    {
                        label: 'Your Project',
                        data: sortedFactors.map(item => item.impact),
                        backgroundColor: function(context) {
                            const value = context.raw;
                            const alpha = 0.7 + (value / 5) * 0.3; // Higher values are more opaque
                            return `rgba(0, 191, 165, ${alpha})`;
                        },
                        borderColor: '#004d40',
                        borderWidth: 1,
                        borderRadius: 4
                    },
                    {
                        label: 'Industry Average',
                        data: sortedFactors.map(item => item.industry),
                        backgroundColor: 'rgba(158, 158, 158, 0.5)',
                        borderColor: '#757575',
                        borderWidth: 1,
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            font: {
                                size: 11
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 77, 64, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#00bfa5',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label || '';
                                const value = context.raw;
                                return `${label}: ${value.toFixed(1)} impact points`;
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'ESG Factor Impact',
                        color: '#004d40',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Impact on ESG Score',
                            color: '#004d40',
                            font: {
                                weight: 'bold',
                                size: 12
                            }
                        },
                        grid: {
                            color: 'rgba(0, 77, 64, 0.1)'
                        },
                        ticks: {
                            color: '#004d40'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#004d40',
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                }
            }
        });
    }

    showRiskDetails(project, category, riskLevel) {
        // Show risk details in a modal or toast
        const message = `${project}: ${category} risk is ${riskLevel}`;
        this.showToast(message, 'info');
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

// Initialize Analytics Dashboard
document.addEventListener('DOMContentLoaded', () => {
    // Load Chart.js if not already loaded
    if (!window.Chart) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.async = true;
        document.head.appendChild(script);
        
        script.onload = () => {
            window.analyticsDashboard = new AnalyticsDashboard();
        };
    } else {
        window.analyticsDashboard = new AnalyticsDashboard();
    }
});

// Add mobile blog styles
const mobileBlogStyles = `
<style>
/* Mobile Toast */
.mobile-toast {
    position: fixed;
    top: calc(var(--header-height) + var(--safe-area-top) + var(--spacing-md));
    left: var(--spacing-md);
    right: var(--spacing-md);
    background: var(--white);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    padding: var(--spacing-md);
    z-index: var(--z-toast);
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

/* Enhanced Risk Matrix Styles */
.risk-matrix-title {
    font-size: 1.1rem;
    font-weight: var(--font-weight-bold);
    color: var(--primary-green);
    margin-bottom: var(--spacing-md);
    text-align: center;
    position: relative;
}

.risk-matrix-title:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: var(--accent-teal);
    border-radius: 3px;
}

.risk-matrix-grid {
    border-radius: var(--radius-md);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    margin-bottom: var(--spacing-md);
    border: 1px solid rgba(0, 77, 64, 0.1);
}

.risk-matrix-cell {
    padding: 10px 8px;
    font-size: 0.85rem;
}

.header-cell {
    background: rgba(0, 191, 165, 0.15);
    font-weight: var(--font-weight-semibold);
    color: var(--primary-green);
}

.project-cell {
    background: rgba(0, 191, 165, 0.1);
    font-weight: var(--font-weight-semibold);
    color: var(--primary-green);
}

.risk-cell {
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
}

.risk-cell:hover {
    transform: scale(1.05);
    z-index: 5;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.risk-cell.low-risk {
    background: rgba(16, 185, 129, 0.15);
    color: #065f46;
    font-weight: var(--font-weight-medium);
}

.risk-cell.medium-risk {
    background: rgba(245, 158, 11, 0.15);
    color: #92400e;
    font-weight: var(--font-weight-medium);
}

.risk-cell.high-risk {
    background: rgba(239, 68, 68, 0.15);
    color: #b91c1c;
    font-weight: var(--font-weight-medium);
}

.risk-matrix-legend {
    display: flex;
    justify-content: center;
    gap: var(--spacing-md);
    margin-top: var(--spacing-md);
    flex-wrap: wrap;
    padding: var(--spacing-sm);
    background: var(--white);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    padding: 4px 8px;
    border-radius: var(--radius-sm);
    background: var(--light-gray);
}

.legend-color {
    width: 14px;
    height: 14px;
    border-radius: 3px;
}

.legend-color.low-risk {
    background: rgba(16, 185, 129, 0.7);
}

.legend-color.medium-risk {
    background: rgba(245, 158, 11, 0.7);
}

.legend-color.high-risk {
    background: rgba(239, 68, 68, 0.7);
}
</style>
`;

// Add Analytics Dashboard styles
const analyticsDashboardStyles = `
<style>
/* Analytics Dashboard Styles */
.analytics-container {
    margin-bottom: var(--spacing-lg);
}

.analytics-section {
    margin-bottom: var(--spacing-xl);
}

.analytics-section-title {
    font-size: 1.2rem;
    font-weight: var(--font-weight-semibold);
    color: var(--primary-green);
    margin-bottom: var(--spacing-md);
    padding-bottom: var(--spacing-xs);
    border-bottom: 2px solid var(--light-green);
}

.analytics-metrics {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
}

.analytics-metric-card {
    background: var(--white);
    border-radius: var(--radius-lg);
    padding: var(--spacing-md);
    box-shadow: var(--shadow-sm);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: 1px solid rgba(0, 77, 64, 0.1);
}

.analytics-metric-value {
    font-size: 1.5rem;
    font-weight: var(--font-weight-bold);
    color: var(--primary-green);
    margin-bottom: var(--spacing-xs);
}

.analytics-metric-label {
    font-size: 0.8rem;
    color: var(--text-light);
}

.analytics-chart-card {
    background: var(--white);
    border-radius: var(--radius-lg);
    padding: var(--spacing-md);
    box-shadow: var(--shadow-sm);
    margin-bottom: var(--spacing-lg);
    border: 1px solid rgba(0, 77, 64, 0.1);
    position: relative;
}

.analytics-chart-title {
    font-size: 1rem;
    font-weight: var(--font-weight-semibold);
    color: var(--primary-green);
    margin-bottom: var(--spacing-md);
    text-align: center;
}

.analytics-chart-container {
    height: 250px;
    position: relative;
}

.irr-distribution-chart-container,
.sensitivity-analysis-chart-container,
.risk-distribution-chart-container,
.risk-matrix-chart-container,
.risk-trend-chart-container,
.esg-trend-chart-container,
.esg-breakdown-chart-container,
.peer-comparison-chart-container,
.esg-factor-impact-chart-container {
    position: relative;
    height: 250px;
    margin-bottom: var(--spacing-md);
}

/* Chart Annotations */
.chart-annotation {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 5;
}

.probability-badge,
.target-badge,
.industry-badge,
.risk-threshold-badge {
    background: rgba(0, 77, 64, 0.9);
    color: white;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    gap: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.probability-label,
.target-label,
.industry-label,
.threshold-label {
    font-weight: 500;
}

.probability-value,
.target-value,
.industry-value,
.threshold-value {
    font-weight: 700;
    color: #00bfa5;
}

/* Risk Matrix Styles */
.risk-matrix-title {
    font-size: 1rem;
    font-weight: var(--font-weight-semibold);
    color: var(--primary-green);
    margin-bottom: var(--spacing-md);
    text-align: center;
}

.risk-matrix-grid {
    display: flex;
    flex-direction: column;
    gap: 1px;
    background-color: rgba(0, 77, 64, 0.1);
    border-radius: var(--radius-md);
    overflow: hidden;
    margin-bottom: var(--spacing-sm);
}

.risk-matrix-row {
    display: flex;
    gap: 1px;
}

.risk-matrix-cell {
    flex: 1;
    padding: 8px;
    text-align: center;
    background-color: var(--white);
    font-size: 0.8rem;
}

.corner-cell {
    background-color: var(--light-green);
}

.header-cell {
    font-weight: var(--font-weight-semibold);
    background-color: var(--light-green);
    color: var(--primary-green);
}

.project-cell {
    font-weight: var(--font-weight-semibold);
    background-color: var(--light-green);
    color: var(--primary-green);
    text-align: left;
    padding-left: 12px;
}

.risk-cell {
    cursor: pointer;
    transition: transform 0.2s ease;
}

.risk-cell:hover {
    transform: scale(1.05);
}

.risk-cell.low-risk {
    background-color: rgba(16, 185, 129, 0.2);
    color: #065f46;
}

.risk-cell.medium-risk {
    background-color: rgba(245, 158, 11, 0.2);
    color: #92400e;
}

.risk-cell.high-risk {
    background-color: rgba(239, 68, 68, 0.2);
    color: #b91c1c;
}

.risk-matrix-legend {
    display: flex;
    justify-content: center;
    gap: var(--spacing-md);
    margin-top: var(--spacing-sm);
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.8rem;
}

.legend-color {
    width: 12px;
    height: 12px;
    border-radius: 2px;
}

.legend-color.low-risk {
    background-color: rgba(16, 185, 129, 0.7);
}

.legend-color.medium-risk {
    background-color: rgba(245, 158, 11, 0.7);
}

.legend-color.high-risk {
    background-color: rgba(239, 68, 68, 0.7);
}

/* ESG Category Legend */
.esg-category-legend {
    display: flex;
    justify-content: center;
    gap: var(--spacing-md);
    margin-top: var(--spacing-sm);
    flex-wrap: wrap;
}

.category-item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.8rem;
}

.category-color {
    width: 12px;
    height: 12px;
    border-radius: 2px;
}

.category-label {
    color: var(--text-dark);
}

@media (min-width: 768px) {
    .analytics-metrics {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (max-width: 480px) {
    .risk-matrix-legend,
    .esg-category-legend {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }
    
    .risk-matrix-cell {
        padding: 6px 4px;
        font-size: 0.7rem;
    }
    
    .chart-annotation {
        top: 5px;
        right: 5px;
    }
    
    .probability-badge,
    .target-badge,
    .industry-badge,
    .risk-threshold-badge {
        padding: 4px 8px;
        font-size: 0.7rem;
    }
}

/* Mobile Toast */
.mobile-toast {
    position: fixed;
    top: calc(var(--header-height) + var(--safe-area-top) + var(--spacing-md));
    left: var(--spacing-md);
    right: var(--spacing-md);
    background: var(--white);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    padding: var(--spacing-md);
    z-index: var(--z-toast);
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
</style>
`;

document.head.insertAdjacentHTML('beforeend', analyticsDashboardStyles);