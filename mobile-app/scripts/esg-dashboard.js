// ESG Dashboard for FinergyCloud Mobile App

class ESGDashboard {
    constructor() {
        this.charts = {};
        this.esgData = {
            projectTypes: {
                'solar': {
                    scores: {
                        environmental: 9.2,
                        social: 7.8,
                        governance: 8.3,
                        overall: 8.6
                    },
                    trends: {
                        labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025'],
                        project: [8.1, 8.3, 8.5, 8.6, 8.6],
                        industry: [7.4, 7.5, 7.6, 7.7, 7.8]
                    },
                    breakdown: {
                        environmental: {
                            'Carbon Emissions': 9.5,
                            'Resource Usage': 9.0,
                            'Waste Management': 9.2,
                            'Biodiversity Impact': 9.1
                        },
                        social: {
                            'Community Relations': 8.2,
                            'Labor Practices': 7.5,
                            'Human Rights': 7.8,
                            'Health & Safety': 7.7
                        },
                        governance: {
                            'Board Structure': 8.4,
                            'Business Ethics': 8.3,
                            'Transparency': 8.5,
                            'Risk Management': 8.0
                        }
                    },
                    peers: [
                        { name: 'Your Solar Project', score: 8.6 },
                        { name: 'Solar Peer A', score: 8.1 },
                        { name: 'Solar Peer B', score: 7.9 },
                        { name: 'Solar Peer C', score: 7.5 },
                        { name: 'Solar Peer D', score: 7.2 }
                    ],
                    factors: [
                        { factor: 'Carbon Reduction', impact: 3.5, industry: 2.3 },
                        { factor: 'Land Use Efficiency', impact: 3.2, industry: 2.1 },
                        { factor: 'Recycling Program', impact: 2.8, industry: 1.9 },
                        { factor: 'Community Programs', impact: 2.5, industry: 1.8 },
                        { factor: 'Governance Structure', impact: 2.2, industry: 2.0 }
                    ]
                },
                'wind': {
                    scores: {
                        environmental: 8.9,
                        social: 8.2,
                        governance: 8.5,
                        overall: 8.5
                    },
                    trends: {
                        labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025'],
                        project: [8.0, 8.2, 8.4, 8.5, 8.5],
                        industry: [7.3, 7.4, 7.5, 7.6, 7.7]
                    },
                    breakdown: {
                        environmental: {
                            'Carbon Emissions': 9.3,
                            'Resource Usage': 8.7,
                            'Waste Management': 8.8,
                            'Biodiversity Impact': 8.8
                        },
                        social: {
                            'Community Relations': 8.5,
                            'Labor Practices': 8.0,
                            'Human Rights': 8.2,
                            'Health & Safety': 8.1
                        },
                        governance: {
                            'Board Structure': 8.6,
                            'Business Ethics': 8.5,
                            'Transparency': 8.7,
                            'Risk Management': 8.2
                        }
                    },
                    peers: [
                        { name: 'Your Wind Project', score: 8.5 },
                        { name: 'Wind Peer A', score: 8.2 },
                        { name: 'Wind Peer B', score: 7.8 },
                        { name: 'Wind Peer C', score: 7.6 },
                        { name: 'Wind Peer D', score: 7.3 }
                    ],
                    factors: [
                        { factor: 'Bird Protection', impact: 3.4, industry: 2.2 },
                        { factor: 'Noise Reduction', impact: 3.1, industry: 2.0 },
                        { factor: 'Visual Impact', impact: 2.9, industry: 1.8 },
                        { factor: 'Community Engagement', impact: 2.7, industry: 1.9 },
                        { factor: 'Transparency', impact: 2.4, industry: 2.1 }
                    ]
                },
                'hydro': {
                    scores: {
                        environmental: 8.5,
                        social: 7.9,
                        governance: 8.6,
                        overall: 8.3
                    },
                    trends: {
                        labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025'],
                        project: [7.9, 8.1, 8.2, 8.3, 8.3],
                        industry: [7.2, 7.3, 7.4, 7.5, 7.6]
                    },
                    breakdown: {
                        environmental: {
                            'Carbon Emissions': 9.0,
                            'Resource Usage': 8.2,
                            'Waste Management': 8.4,
                            'Biodiversity Impact': 8.4
                        },
                        social: {
                            'Community Relations': 8.0,
                            'Labor Practices': 7.8,
                            'Human Rights': 7.9,
                            'Health & Safety': 7.9
                        },
                        governance: {
                            'Board Structure': 8.7,
                            'Business Ethics': 8.6,
                            'Transparency': 8.8,
                            'Risk Management': 8.3
                        }
                    },
                    peers: [
                        { name: 'Your Hydro Project', score: 8.3 },
                        { name: 'Hydro Peer A', score: 8.0 },
                        { name: 'Hydro Peer B', score: 7.7 },
                        { name: 'Hydro Peer C', score: 7.5 },
                        { name: 'Hydro Peer D', score: 7.2 }
                    ],
                    factors: [
                        { factor: 'Ecosystem Protection', impact: 3.3, industry: 2.1 },
                        { factor: 'Water Management', impact: 3.0, industry: 1.9 },
                        { factor: 'Fish Migration', impact: 2.8, industry: 1.7 },
                        { factor: 'Local Communities', impact: 2.6, industry: 1.8 },
                        { factor: 'Dam Safety', impact: 2.5, industry: 2.2 }
                    ]
                },
                'biomass': {
                    scores: {
                        environmental: 8.0,
                        social: 8.1,
                        governance: 8.2,
                        overall: 8.1
                    },
                    trends: {
                        labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025'],
                        project: [7.7, 7.9, 8.0, 8.1, 8.1],
                        industry: [7.0, 7.1, 7.2, 7.3, 7.4]
                    },
                    breakdown: {
                        environmental: {
                            'Carbon Emissions': 8.2,
                            'Resource Usage': 7.8,
                            'Waste Management': 8.1,
                            'Biodiversity Impact': 7.9
                        },
                        social: {
                            'Community Relations': 8.3,
                            'Labor Practices': 8.0,
                            'Human Rights': 8.1,
                            'Health & Safety': 8.0
                        },
                        governance: {
                            'Board Structure': 8.3,
                            'Business Ethics': 8.2,
                            'Transparency': 8.4,
                            'Risk Management': 7.9
                        }
                    },
                    peers: [
                        { name: 'Your Biomass Project', score: 8.1 },
                        { name: 'Biomass Peer A', score: 7.8 },
                        { name: 'Biomass Peer B', score: 7.5 },
                        { name: 'Biomass Peer C', score: 7.3 },
                        { name: 'Biomass Peer D', score: 7.0 }
                    ],
                    factors: [
                        { factor: 'Sustainable Sourcing', impact: 3.2, industry: 2.0 },
                        { factor: 'Emissions Control', impact: 2.9, industry: 1.8 },
                        { factor: 'Waste Management', impact: 2.7, industry: 1.7 },
                        { factor: 'Supply Chain', impact: 2.5, industry: 1.6 },
                        { factor: 'Local Employment', impact: 2.4, industry: 1.9 }
                    ]
                },
                'geothermal': {
                    scores: {
                        environmental: 8.7,
                        social: 8.0,
                        governance: 8.4,
                        overall: 8.4
                    },
                    trends: {
                        labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025'],
                        project: [8.0, 8.2, 8.3, 8.4, 8.4],
                        industry: [7.3, 7.4, 7.5, 7.6, 7.7]
                    },
                    breakdown: {
                        environmental: {
                            'Carbon Emissions': 9.1,
                            'Resource Usage': 8.5,
                            'Waste Management': 8.6,
                            'Biodiversity Impact': 8.6
                        },
                        social: {
                            'Community Relations': 8.1,
                            'Labor Practices': 7.9,
                            'Human Rights': 8.0,
                            'Health & Safety': 8.0
                        },
                        governance: {
                            'Board Structure': 8.5,
                            'Business Ethics': 8.4,
                            'Transparency': 8.6,
                            'Risk Management': 8.1
                        }
                    },
                    peers: [
                        { name: 'Your Geothermal Project', score: 8.4 },
                        { name: 'Geothermal Peer A', score: 8.1 },
                        { name: 'Geothermal Peer B', score: 7.8 },
                        { name: 'Geothermal Peer C', score: 7.5 },
                        { name: 'Geothermal Peer D', score: 7.2 }
                    ],
                    factors: [
                        { factor: 'Water Management', impact: 3.3, industry: 2.1 },
                        { factor: 'Emissions Control', impact: 3.0, industry: 1.9 },
                        { factor: 'Land Use', impact: 2.8, industry: 1.8 },
                        { factor: 'Community Relations', impact: 2.6, industry: 1.7 },
                        { factor: 'Transparency', impact: 2.4, industry: 2.0 }
                    ]
                }
            },
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
        this.setupEventListeners();
        this.currentProjectType = 'solar';
    }

    setupEventListeners() {
        document.addEventListener('pageActivated', (e) => {
            if (e.detail.pageId === 'esg') {
                this.loadESGData();
                this.initializeCharts();
            }
        });
        
        // Add project type selector
        document.addEventListener('DOMContentLoaded', () => {
            const projectTypeSelector = document.getElementById('esg-project-type');
            if (projectTypeSelector) {
                projectTypeSelector.addEventListener('change', (e) => {
                    this.currentProjectType = e.target.value;
                    this.loadESGData();
                    this.updateCharts();
                });
            }
        });
    }

    loadESGData() {
        // In a real app, this would fetch data from an API
        console.log('Loading ESG data...');

        // Get data for current project type
        const projectTypeData = this.esgData.projectTypes[this.currentProjectType] || this.esgData.projectTypes['solar'];
        
        // Update ESG score cards
        this.updateESGScoreCards(projectTypeData.scores);
    }

    updateESGScoreCards(scores) {
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
        // Get project type selector value
        const projectTypeSelector = document.getElementById('esg-project-type');
        if (projectTypeSelector) {
            this.currentProjectType = projectTypeSelector.value;
        }
        
        // Load Chart.js if not already loaded
        if (!window.Chart && !document.querySelector('script[src="https://cdn.jsdelivr.net/npm/chart.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
            script.async = true;
            document.head.appendChild(script);
            
            script.onload = () => {
                // Register Chart.js plugins if needed
                if (window.Chart) {
                    this.createCharts();
                }
            };
        } else if (window.Chart) {
            this.createCharts();
        }
    }
    
    createCharts() {
        this.createESGTrendChart();
        this.createESGBreakdownChart();
        this.createPeerComparisonChart();
        this.createESGFactorImpactChart();
    }
    
    updateCharts() {
        if (window.Chart) {
            this.createESGTrendChart();
            this.createESGBreakdownChart();
            this.createPeerComparisonChart();
            this.createESGFactorImpactChart();
        }
    }

    createESGTrendChart() {
        const ctx = document.getElementById('esg-trend-chart');
        if (!ctx) return;
        
        // Clear existing chart if any
        if (this.charts.trendChart) {
            this.charts.trendChart.destroy();
        }
        
        // Get data for current project type
        const projectTypeData = this.esgData.projectTypes[this.currentProjectType] || this.esgData.projectTypes['solar'];
        
        // Create chart
        this.charts.trendChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: projectTypeData.trends.labels,
                datasets: [
                    {
                        label: 'Your Project',
                        data: projectTypeData.trends.project,
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
                        data: projectTypeData.trends.industry,
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
                        text: `ESG Score Trend - ${this.capitalizeFirstLetter(this.currentProjectType)} Projects`,
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
            const annotation = document.createElement('div');
            annotation.className = 'chart-annotation';
            annotation.innerHTML = `
                <div class="target-badge" style="background: rgba(0, 77, 64, 0.95);">
                    <span class="target-label">${this.capitalizeFirstLetter(this.currentProjectType)} Target:</span>
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
        if (this.charts.breakdownChart) {
            this.charts.breakdownChart.destroy();
        }
        
        // Get data for current project type
        const projectTypeData = this.esgData.projectTypes[this.currentProjectType] || this.esgData.projectTypes['solar'];
        
        // Prepare data for radar chart
        const labels = [
            'Carbon Emissions', 'Resource Usage', 'Waste Management', 'Biodiversity',
            'Community Relations', 'Labor Practices', 'Human Rights', 'Health & Safety',
            'Board Structure', 'Business Ethics', 'Transparency', 'Risk Management'
        ];
        
        const projectData = [
            projectTypeData.breakdown.environmental['Carbon Emissions'],
            projectTypeData.breakdown.environmental['Resource Usage'],
            projectTypeData.breakdown.environmental['Waste Management'],
            projectTypeData.breakdown.environmental['Biodiversity Impact'],
            projectTypeData.breakdown.social['Community Relations'],
            projectTypeData.breakdown.social['Labor Practices'],
            projectTypeData.breakdown.social['Human Rights'],
            projectTypeData.breakdown.social['Health & Safety'],
            projectTypeData.breakdown.governance['Board Structure'],
            projectTypeData.breakdown.governance['Business Ethics'],
            projectTypeData.breakdown.governance['Transparency'],
            projectTypeData.breakdown.governance['Risk Management']
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
                        text: `ESG Breakdown - ${this.capitalizeFirstLetter(this.currentProjectType)} Projects`,
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
        
        // Get data for current project type
        const projectTypeData = this.esgData.projectTypes[this.currentProjectType] || this.esgData.projectTypes['solar'];
        
        // Sort peers by score
        const sortedPeers = [...projectTypeData.peers].sort((a, b) => b.score - a.score);
        
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
                        text: `Peer Comparison - ${this.capitalizeFirstLetter(this.currentProjectType)} Projects`,
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
            const annotation = document.createElement('div');
            annotation.className = 'chart-annotation';
            annotation.innerHTML = `
                <div class="industry-badge" style="background: rgba(0, 77, 64, 0.95);">
                    <span class="industry-label">${this.capitalizeFirstLetter(this.currentProjectType)} Avg:</span>
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
        if (this.charts.factorChart) {
            this.charts.factorChart.destroy();
        }
        
        // Get data for current project type
        const projectTypeData = this.esgData.projectTypes[this.currentProjectType] || this.esgData.projectTypes['solar'];
        
        // Sort factors by impact
        const sortedFactors = [...projectTypeData.factors].sort((a, b) => b.impact - a.impact);
        
        // Create chart
        this.charts.factorChart = new Chart(ctx, {
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
                        text: `ESG Factor Impact - ${this.capitalizeFirstLetter(this.currentProjectType)} Projects`,
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
}

// Initialize ESG Dashboard
document.addEventListener('DOMContentLoaded', () => {
    // Load Chart.js if not already loaded
    if (!window.Chart) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.async = true;
        document.head.appendChild(script);
        
        script.onload = () => {
            window.esgDashboard = new ESGDashboard();
        };
    } else {
        window.esgDashboard = new ESGDashboard();
    }
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