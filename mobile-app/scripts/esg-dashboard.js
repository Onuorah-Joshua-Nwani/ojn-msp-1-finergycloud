// ESG Dashboard for FinergyCloud Mobile App

class ESGDashboard {
    constructor() {
        this.charts = {};
        this.esgData = {
            scores: {
                solar: {
                    environmental: 8.7,
                    social: 7.9,
                    governance: 8.4,
                    overall: 8.4
                },
                wind: {
                    environmental: 8.5,
                    social: 8.2,
                    governance: 7.9,
                    overall: 8.2
                },
                hydro: {
                    environmental: 7.8,
                    social: 8.0,
                    governance: 8.3,
                    overall: 8.0
                },
                biomass: {
                    environmental: 7.5,
                    social: 8.1,
                    governance: 7.8,
                    overall: 7.8
                },
                geothermal: {
                    environmental: 8.9,
                    social: 7.7,
                    governance: 8.1,
                    overall: 8.3
                }
            },
            trends: {
                solar: {
                    labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025'],
                    project: [7.8, 8.1, 8.3, 8.4, 8.4],
                    industry: [7.2, 7.3, 7.4, 7.5, 7.6]
                },
                wind: {
                    labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025'],
                    project: [7.5, 7.8, 8.0, 8.2, 8.2],
                    industry: [7.0, 7.1, 7.2, 7.3, 7.4]
                },
                hydro: {
                    labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025'],
                    project: [7.2, 7.5, 7.8, 8.0, 8.0],
                    industry: [6.8, 6.9, 7.0, 7.1, 7.2]
                },
                biomass: {
                    labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025'],
                    project: [7.0, 7.3, 7.5, 7.8, 7.8],
                    industry: [6.5, 6.7, 6.8, 7.0, 7.1]
                },
                geothermal: {
                    labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025'],
                    project: [7.6, 7.9, 8.1, 8.3, 8.3],
                    industry: [7.1, 7.2, 7.3, 7.4, 7.5]
                }
            },
            breakdown: {
                solar: {
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
                wind: {
                    environmental: {
                        'Carbon Emissions': 9.0,
                        'Resource Usage': 8.3,
                        'Waste Management': 8.7,
                        'Biodiversity Impact': 8.0
                    },
                    social: {
                        'Community Relations': 8.5,
                        'Labor Practices': 8.0,
                        'Human Rights': 8.3,
                        'Health & Safety': 8.0
                    },
                    governance: {
                        'Board Structure': 8.2,
                        'Business Ethics': 7.9,
                        'Transparency': 8.0,
                        'Risk Management': 7.5
                    }
                },
                hydro: {
                    environmental: {
                        'Carbon Emissions': 8.5,
                        'Resource Usage': 7.8,
                        'Waste Management': 7.5,
                        'Biodiversity Impact': 7.2
                    },
                    social: {
                        'Community Relations': 8.2,
                        'Labor Practices': 7.8,
                        'Human Rights': 8.0,
                        'Health & Safety': 8.0
                    },
                    governance: {
                        'Board Structure': 8.5,
                        'Business Ethics': 8.3,
                        'Transparency': 8.2,
                        'Risk Management': 8.0
                    }
                },
                biomass: {
                    environmental: {
                        'Carbon Emissions': 7.5,
                        'Resource Usage': 7.2,
                        'Waste Management': 7.8,
                        'Biodiversity Impact': 7.5
                    },
                    social: {
                        'Community Relations': 8.3,
                        'Labor Practices': 8.0,
                        'Human Rights': 8.2,
                        'Health & Safety': 7.8
                    },
                    governance: {
                        'Board Structure': 8.0,
                        'Business Ethics': 7.8,
                        'Transparency': 7.5,
                        'Risk Management': 7.8
                    }
                },
                geothermal: {
                    environmental: {
                        'Carbon Emissions': 9.3,
                        'Resource Usage': 8.8,
                        'Waste Management': 8.5,
                        'Biodiversity Impact': 8.8
                    },
                    social: {
                        'Community Relations': 8.0,
                        'Labor Practices': 7.5,
                        'Human Rights': 7.8,
                        'Health & Safety': 7.5
                    },
                    governance: {
                        'Board Structure': 8.3,
                        'Business Ethics': 8.0,
                        'Transparency': 8.2,
                        'Risk Management': 7.8
                    }
                }
            },
            peers: {
                solar: [
                    { name: 'Your Project', score: 8.4 },
                    { name: 'Peer A', score: 7.8 },
                    { name: 'Peer B', score: 8.1 },
                    { name: 'Peer C', score: 7.2 },
                    { name: 'Peer D', score: 6.9 }
                ],
                wind: [
                    { name: 'Your Project', score: 8.2 },
                    { name: 'Peer A', score: 7.5 },
                    { name: 'Peer B', score: 7.9 },
                    { name: 'Peer C', score: 7.0 },
                    { name: 'Peer D', score: 6.7 }
                ],
                hydro: [
                    { name: 'Your Project', score: 8.0 },
                    { name: 'Peer A', score: 7.3 },
                    { name: 'Peer B', score: 7.7 },
                    { name: 'Peer C', score: 6.8 },
                    { name: 'Peer D', score: 6.5 }
                ],
                biomass: [
                    { name: 'Your Project', score: 7.8 },
                    { name: 'Peer A', score: 7.0 },
                    { name: 'Peer B', score: 7.5 },
                    { name: 'Peer C', score: 6.5 },
                    { name: 'Peer D', score: 6.2 }
                ],
                geothermal: [
                    { name: 'Your Project', score: 8.3 },
                    { name: 'Peer A', score: 7.6 },
                    { name: 'Peer B', score: 8.0 },
                    { name: 'Peer C', score: 7.1 },
                    { name: 'Peer D', score: 6.8 }
                ]
            },
            factors: {
                solar: [
                    { factor: 'Carbon Reduction', impact: 3.2, industry: 2.1 },
                    { factor: 'Community Programs', impact: 2.8, industry: 1.8 },
                    { factor: 'Governance Structure', impact: 2.5, industry: 2.2 },
                    { factor: 'Transparency', impact: 2.3, industry: 1.9 },
                    { factor: 'Resource Efficiency', impact: 2.1, industry: 1.7 }
                ],
                wind: [
                    { factor: 'Carbon Reduction', impact: 3.0, industry: 2.0 },
                    { factor: 'Noise Mitigation', impact: 2.7, industry: 1.7 },
                    { factor: 'Governance Structure', impact: 2.4, industry: 2.1 },
                    { factor: 'Transparency', impact: 2.2, industry: 1.8 },
                    { factor: 'Bird Protection', impact: 2.5, industry: 1.6 }
                ],
                hydro: [
                    { factor: 'Ecosystem Protection', impact: 3.1, industry: 2.2 },
                    { factor: 'Community Relocation', impact: 2.9, industry: 2.0 },
                    { factor: 'Governance Structure', impact: 2.5, industry: 2.2 },
                    { factor: 'Transparency', impact: 2.3, industry: 1.9 },
                    { factor: 'Water Management', impact: 2.8, industry: 2.1 }
                ],
                biomass: [
                    { factor: 'Sustainable Sourcing', impact: 3.0, industry: 2.1 },
                    { factor: 'Emissions Control', impact: 2.8, industry: 1.9 },
                    { factor: 'Governance Structure', impact: 2.3, industry: 2.0 },
                    { factor: 'Transparency', impact: 2.1, industry: 1.7 },
                    { factor: 'Waste Management', impact: 2.7, industry: 1.8 }
                ],
                geothermal: [
                    { factor: 'Land Use Efficiency', impact: 3.1, industry: 2.2 },
                    { factor: 'Community Programs', impact: 2.6, industry: 1.7 },
                    { factor: 'Governance Structure', impact: 2.4, industry: 2.1 },
                    { factor: 'Transparency', impact: 2.2, industry: 1.8 },
                    { factor: 'Water Conservation', impact: 2.9, industry: 2.0 }
                ]
            }
        };
        this.currentProjectType = 'solar';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.currentProjectType = 'solar';
    }

    setupEventListeners() {
        document.addEventListener('pageActivated', (e) => {
            if (e.detail.pageId === 'esg') {
                this.loadESGData();
                this.initializeCharts();
                this.setupProjectTypeSelector();
            }
        });
    }

    setupProjectTypeSelector() {
        const projectTypeSelector = document.getElementById('esg-project-type');
        if (projectTypeSelector) {
            // Set initial value and update UI
            projectTypeSelector.value = this.currentProjectType;
            
            // Add change event listener
            projectTypeSelector.addEventListener('change', (e) => {
                this.currentProjectType = e.target.value;
                console.log('Project type changed to:', this.currentProjectType);
                this.loadESGData();
                this.updateCharts();
            });
        }
    }

    loadESGData() {
        // Get current project type
        const projectType = this.currentProjectType;
        console.log('Loading ESG data for project type:', projectType);
        
        // Update ESG score cards based on project type
        this.updateESGScoreCards(projectType);
    }

    updateESGScoreCards(projectType) {
        const scores = this.esgData.scores[projectType];
        console.log('Updating ESG score cards with scores:', scores);
        
        // Update score cards if they exist
        const environmentalScore = document.getElementById('environmental-score');
        const socialScore = document.getElementById('social-score');
        const governanceScore = document.getElementById('governance-score');
        const overallScore = document.getElementById('overall-esg-score');
        
        if (environmentalScore) environmentalScore.textContent = scores.environmental.toFixed(1);
        if (socialScore) socialScore.textContent = scores.social.toFixed(1);
        if (governanceScore) governanceScore.textContent = scores.governance.toFixed(1);
        if (overallScore) overallScore.textContent = scores.overall.toFixed(1);
    }

    initializeCharts() {
        // Load Chart.js if not already loaded
        if (window.Chart) {
            // Create charts
            this.createESGTrendChart();
            this.createESGBreakdownChart();
            this.createPeerComparisonChart();
            this.createESGFactorImpactChart();
        } else {
            console.error('Chart.js not loaded');
            this.showToast('Chart.js not loaded. Please refresh the page.', 'warning');
        }
    }

    updateCharts() {
        // Update all charts with new data based on current project type
        console.log('Updating charts for project type:', this.currentProjectType);
        this.createESGTrendChart();
        this.createESGBreakdownChart();
        this.createPeerComparisonChart();
        this.createESGFactorImpactChart();
    }

    createESGTrendChart() {
        const ctx = document.getElementById('esg-trend-chart');
        if (!ctx || !window.Chart) return;
        console.log('Creating ESG trend chart');
        
        // Clear existing chart if any
        if (this.charts.trendChart) {
            this.charts.trendChart.destroy();
        }
        
        // Get data for current project type
        const projectType = this.currentProjectType;
        const trendData = this.esgData.trends[projectType];
        
        // Create chart
        this.charts.trendChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: trendData.labels,
                datasets: [
                    {
                        label: `${this.capitalizeFirstLetter(projectType)} Project`,
                        data: trendData.project,
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
                        data: trendData.industry,
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
                                weight: 'bold'
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
        
        // Add annotation for target score
        const chartArea = document.querySelector('.esg-trend-chart-container');
        if (chartArea) {
            // Remove existing annotation if any
            const existingAnnotation = chartArea.querySelector('.chart-annotation');
            if (existingAnnotation) {
                existingAnnotation.remove();
            }
            
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
        if (!ctx || !window.Chart) return;
        console.log('Creating ESG breakdown chart');
        
        // Clear existing chart if any
        if (this.charts.breakdownChart) {
            this.charts.breakdownChart.destroy();
        }
        
        // Get data for current project type
        const projectType = this.currentProjectType;
        const breakdownData = this.esgData.breakdown[projectType];
        
        // Prepare data for radar chart
        const labels = [
            'Carbon Emissions', 'Resource Usage', 'Waste Management', 'Biodiversity',
            'Community Relations', 'Labor Practices', 'Human Rights', 'Health & Safety',
            'Board Structure', 'Business Ethics', 'Transparency', 'Risk Management'
        ];
        
        const projectData = [
            breakdownData.environmental['Carbon Emissions'],
            breakdownData.environmental['Resource Usage'],
            breakdownData.environmental['Waste Management'],
            breakdownData.environmental['Biodiversity Impact'],
            breakdownData.social['Community Relations'],
            breakdownData.social['Labor Practices'],
            breakdownData.social['Human Rights'],
            breakdownData.social['Health & Safety'],
            breakdownData.governance['Board Structure'],
            breakdownData.governance['Business Ethics'],
            breakdownData.governance['Transparency'],
            breakdownData.governance['Risk Management']
        ];
        
        // Industry benchmark data (slightly lower than project data)
        const industryData = projectData.map(val => Math.max(5, val - 0.5 - Math.random() * 0.5));
        
        // Create chart
        this.charts.breakdownChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: `${this.capitalizeFirstLetter(projectType)} Project`,
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
                    }
                }
            }
        });
        
        // Add legend for ESG categories
        const chartArea = document.querySelector('.esg-breakdown-chart-container');
        if (chartArea) {
            // Remove existing legend if any
            const existingLegend = chartArea.querySelector('.esg-category-legend');
            if (existingLegend) {
                existingLegend.remove();
            }
            
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
        if (!ctx || !window.Chart) return;
        console.log('Creating peer comparison chart');
        
        // Clear existing chart if any
        if (this.charts.peerChart) {
            this.charts.peerChart.destroy();
        }
        
        // Get data for current project type
        const projectType = this.currentProjectType;
        const peerData = this.esgData.peers[projectType];
        
        // Sort peers by score
        const sortedPeers = [...peerData].sort((a, b) => b.score - a.score);
        
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
                                weight: 'bold'
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
            // Remove existing annotation if any
            const existingAnnotation = chartArea.querySelector('.chart-annotation');
            if (existingAnnotation) {
                existingAnnotation.remove();
            }
            
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
        if (!ctx || !window.Chart) return;
        console.log('Creating ESG factor impact chart');
        
        // Clear existing chart if any
        if (this.charts.factorChart) {
            this.charts.factorChart.destroy();
        }
        
        // Get data for current project type
        const projectType = this.currentProjectType;
        const factorData = this.esgData.factors[projectType];
        
        // Sort factors by impact
        const sortedFactors = [...factorData].sort((a, b) => b.impact - a.impact);
        
        // Create chart
        this.charts.factorChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedFactors.map(item => item.factor),
                datasets: [
                    {
                        label: `${this.capitalizeFirstLetter(projectType)} Project`,
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
                                weight: 'bold'
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
    
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
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

// Initialize ESG Dashboard
document.addEventListener('DOMContentLoaded', () => {
    window.esgDashboard = new ESGDashboard();
});

// Add ESG Dashboard styles
const esgDashboardStyles = `
<style>
/* ESG Dashboard Styles */
.esg-dashboard-container {
    margin-bottom: var(--spacing-lg);
}

.esg-score-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
}

.esg-score-card {
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
    position: relative;
    overflow: hidden;
}

.esg-score-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
}

.esg-score-card.environmental::before {
    background-color: #10B981; /* Green for environmental */
}

.esg-score-card.social::before {
    background-color: #3B82F6; /* Blue for social */
}

.esg-score-card.governance::before {
    background-color: #8B5CF6; /* Purple for governance */
}

.esg-score-card.overall::before {
    background: linear-gradient(to right, #10B981, #3B82F6, #8B5CF6);
}

.esg-score-value {
    font-size: 2rem;
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--spacing-xs);
}

.esg-score-card.environmental .esg-score-value {
    color: #10B981;
}

.esg-score-card.social .esg-score-value {
    color: #3B82F6;
}

.esg-score-card.governance .esg-score-value {
    color: #8B5CF6;
}

.esg-score-card.overall .esg-score-value {
    color: var(--primary-green);
}

.esg-score-label {
    font-size: 0.9rem;
    color: var(--text-dark);
    font-weight: var(--font-weight-medium);
}

.esg-chart-card {
    background: var(--white);
    border-radius: var(--radius-lg);
    padding: var(--spacing-md);
    box-shadow: var(--shadow-sm);
    margin-bottom: var(--spacing-lg);
    border: 1px solid rgba(0, 77, 64, 0.1);
    position: relative;
}

.esg-chart-title {
    font-size: 1rem;
    font-weight: var(--font-weight-semibold);
    color: var(--primary-green);
    margin-bottom: var(--spacing-md);
    text-align: center;
}

.esg-chart-container {
    height: 250px;
    position: relative;
}

.esg-trend-chart-container,
.esg-breakdown-chart-container,
.peer-comparison-chart-container,
.esg-factor-impact-chart-container {
    position: relative;
}

.chart-annotation {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 5;
}

.target-badge,
.industry-badge {
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

.target-label,
.industry-label {
    font-weight: 500;
}

.target-value,
.industry-value {
    font-weight: 700;
    color: #00bfa5;
}

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

.esg-project-type-selector {
    margin-bottom: var(--spacing-lg);
    background: var(--white);
    border-radius: var(--radius-lg);
    padding: var(--spacing-md);
    box-shadow: var(--shadow-sm);
    border: 1px solid rgba(0, 77, 64, 0.1);
}

.esg-project-type-selector label {
    display: block;
    font-weight: var(--font-weight-medium);
    color: var(--primary-green);
    margin-bottom: var(--spacing-xs);
}

.esg-project-type-selector select {
    width: 100%;
    padding: var(--spacing-sm);
    border: 1px solid rgba(0, 77, 64, 0.2);
    border-radius: var(--radius-md);
    background-color: var(--white);
    color: var(--text-dark);
    font-size: 1rem;
}

.esg-project-type-selector select:focus {
    border-color: var(--accent-teal);
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 191, 165, 0.2);
}

@media (min-width: 768px) {
    .esg-score-cards {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (max-width: 480px) {
    .esg-category-legend {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', esgDashboardStyles);