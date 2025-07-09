// ESG Dashboard for FinergyCloud Mobile App

class ESGDashboard {
    constructor() {
        this.charts = {};
        this.esgData = {
            overall: {
                score: 8.7,
                environmental: 9.2,
                social: 8.5,
                governance: 8.4,
                trend: '+0.3'
            },
            breakdown: {
                environmental: {
                    'Carbon Emissions': 9.5,
                    'Resource Use': 9.0,
                    'Waste Management': 8.8,
                    'Biodiversity Impact': 9.3
                },
                social: {
                    'Community Relations': 9.2,
                    'Labor Practices': 8.3,
                    'Health & Safety': 8.7,
                    'Human Rights': 7.8
                },
                governance: {
                    'Board Structure': 8.5,
                    'Business Ethics': 8.2,
                    'Transparency': 8.6,
                    'Risk Management': 8.3
                }
            },
            projects: [
                { name: 'Lagos Solar Farm', environmental: 9.3, social: 8.8, governance: 8.7, overall: 9.0 },
                { name: 'Abuja Wind Project', environmental: 9.0, social: 8.5, governance: 8.2, overall: 8.6 },
                { name: 'Kano Solar Array', environmental: 9.2, social: 8.3, governance: 8.5, overall: 8.7 },
                { name: 'Port Harcourt Hydro', environmental: 9.4, social: 8.7, governance: 8.3, overall: 8.9 },
                { name: 'Ibadan Solar Park', environmental: 9.1, social: 8.6, governance: 8.4, overall: 8.8 }
            ],
            benchmarks: {
                industry: 7.5,
                regional: 7.2,
                global: 7.8
            },
            trends: {
                labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025'],
                overall: [8.2, 8.3, 8.5, 8.6, 8.7],
                environmental: [8.5, 8.7, 9.0, 9.1, 9.2],
                social: [8.0, 8.1, 8.3, 8.4, 8.5],
                governance: [8.1, 8.2, 8.2, 8.3, 8.4]
            }
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('pageActivated', (e) => {
            if (e.detail.pageId === 'esg') {
                this.loadESGData();
                this.initializeCharts();
            }
        });
    }

    loadESGData() {
        // In a real app, this would fetch data from an API
        console.log('Loading ESG data...');
        
        // Update ESG metrics
        this.updateESGMetrics();
    }

    updateESGMetrics() {
        // Update overall ESG score
        const overallScoreEl = document.getElementById('overall-esg-score');
        const environmentalScoreEl = document.getElementById('environmental-score');
        const socialScoreEl = document.getElementById('social-score');
        const governanceScoreEl = document.getElementById('governance-score');
        
        if (overallScoreEl) overallScoreEl.textContent = this.esgData.overall.score.toFixed(1);
        if (environmentalScoreEl) environmentalScoreEl.textContent = this.esgData.overall.environmental.toFixed(1);
        if (socialScoreEl) socialScoreEl.textContent = this.esgData.overall.social.toFixed(1);
        if (governanceScoreEl) governanceScoreEl.textContent = this.esgData.overall.governance.toFixed(1);
        
        // Update trend indicator
        const trendEl = document.getElementById('esg-trend');
        if (trendEl) {
            const trend = this.esgData.overall.trend;
            const isPositive = trend.startsWith('+');
            
            trendEl.innerHTML = `
                <i class="bi bi-arrow-${isPositive ? 'up' : 'down'}-right"></i>
                <span>${trend}</span>
            `;
            trendEl.className = `trend-badge ${isPositive ? 'positive' : 'negative'}`;
        }
    }

    initializeCharts() {
        // Load Chart.js if not already loaded
        if (!window.Chart && !document.querySelector('script[src="https://cdn.jsdelivr.net/npm/chart.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
            script.async = true;
            document.head.appendChild(script);
            
            script.onload = () => {
                // Register radar controller for ESG radar chart
                this.createESGRadarChart();
                this.createESGBreakdownChart();
                this.createPeerComparisonChart();
                this.createESGTrendChart();
            };
        } else if (window.Chart) {
            // Create charts directly if Chart.js is already loaded
            this.createESGRadarChart();
            this.createESGBreakdownChart();
            this.createPeerComparisonChart();
            this.createESGTrendChart();
        }
    }

    createESGRadarChart() {
        const ctx = document.getElementById('esg-radar-chart');
        if (!ctx) return;
        
        // Clear existing chart if any
        if (this.charts.radarChart) {
            this.charts.radarChart.destroy();
        }
        
        // Create chart
        this.charts.radarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Environmental', 'Social', 'Governance'],
                datasets: [
                    {
                        label: 'Your Portfolio',
                        data: [
                            this.esgData.overall.environmental,
                            this.esgData.overall.social,
                            this.esgData.overall.governance
                        ],
                        backgroundColor: 'rgba(0, 191, 165, 0.2)',
                        borderColor: '#00bfa5',
                        borderWidth: 2,
                        pointBackgroundColor: '#00bfa5',
                        pointBorderColor: '#fff',
                        pointRadius: 4
                    },
                    {
                        label: 'Industry Average',
                        data: [7.5, 7.3, 7.7],
                        backgroundColor: 'rgba(158, 158, 158, 0.2)',
                        borderColor: '#9e9e9e',
                        borderWidth: 2,
                        pointBackgroundColor: '#9e9e9e',
                        pointBorderColor: '#fff',
                        pointRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        min: 0,
                        max: 10,
                        ticks: {
                            stepSize: 2,
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
                                size: 12,
                                weight: 'bold'
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
                        borderWidth: 1
                    }
                }
            }
        });
    }

    createESGBreakdownChart() {
        const ctx = document.getElementById('esg-breakdown-chart');
        if (!ctx) return;
        
        // Clear existing chart if any
        if (this.charts.breakdownChart) {
            this.charts.breakdownChart.destroy();
        }
        
        // Prepare data
        const categories = [];
        const scores = [];
        const colors = [];
        
        // Environmental metrics
        Object.entries(this.esgData.breakdown.environmental).forEach(([category, score]) => {
            categories.push(category);
            scores.push(score);
            colors.push('#10B981'); // Green for environmental
        });
        
        // Social metrics
        Object.entries(this.esgData.breakdown.social).forEach(([category, score]) => {
            categories.push(category);
            scores.push(score);
            colors.push('#3B82F6'); // Blue for social
        });
        
        // Governance metrics
        Object.entries(this.esgData.breakdown.governance).forEach(([category, score]) => {
            categories.push(category);
            scores.push(score);
            colors.push('#8B5CF6'); // Purple for governance
        });
        
        // Create chart
        this.charts.breakdownChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: categories,
                datasets: [{
                    label: 'ESG Score',
                    data: scores,
                    backgroundColor: colors,
                    borderColor: colors.map(color => color.replace(')', ', 0.8)')),
                    borderWidth: 1
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
                                const score = context.parsed.x;
                                let rating = 'Average';
                                if (score >= 9) rating = 'Excellent';
                                else if (score >= 8) rating = 'Very Good';
                                else if (score >= 7) rating = 'Good';
                                else if (score < 6) rating = 'Poor';
                                return `Score: ${score.toFixed(1)} (${rating})`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        min: 0,
                        max: 10,
                        grid: {
                            color: 'rgba(0, 77, 64, 0.1)'
                        },
                        ticks: {
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
                                size: 10
                            }
                        }
                    }
                }
            }
        });
    }

    createPeerComparisonChart() {
        const ctx = document.getElementById('peer-comparison-chart');
        if (!ctx) return;
        
        // Clear existing chart if any
        if (this.charts.peerComparisonChart) {
            this.charts.peerComparisonChart.destroy();
        }
        
        // Prepare data
        const projects = this.esgData.projects.map(p => p.name);
        const overallScores = this.esgData.projects.map(p => p.overall);
        
        // Create chart
        this.charts.peerComparisonChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: projects,
                datasets: [{
                    label: 'Overall ESG Score',
                    data: overallScores,
                    backgroundColor: '#00bfa5',
                    borderColor: '#004d40',
                    borderWidth: 1
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
                                return `ESG Score: ${context.parsed.y.toFixed(1)}/10`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        min: 0,
                        max: 10,
                        grid: {
                            color: 'rgba(0, 77, 64, 0.1)'
                        },
                        ticks: {
                            color: '#004d40',
                            callback: function(context) {
                                return context;
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#004d40',
                            font: {
                                size: 10
                            }
                        }
                    }
                }
            }
        });
    }

    createESGTrendChart() {
        const ctx = document.getElementById('esg-trend-chart');
        if (!ctx) return;
        
        // Clear existing chart if any
        if (this.charts.trendChart) {
            this.charts.trendChart.destroy();
        }
        
        // Create chart
        this.charts.trendChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.esgData.trends.labels,
                datasets: [
                    {
                        label: 'Overall ESG',
                        data: this.esgData.trends.overall,
                        borderColor: '#00bfa5',
                        backgroundColor: 'rgba(0, 191, 165, 0.1)',
                        borderWidth: 3,
                        pointBackgroundColor: '#00bfa5',
                        pointBorderColor: '#fff',
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        fill: true,
                        tension: 0.3
                    },
                    {
                        label: 'Environmental',
                        data: this.esgData.trends.environmental,
                        borderColor: '#10B981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        borderWidth: 2,
                        pointBackgroundColor: '#10B981',
                        pointBorderColor: '#fff',
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        fill: false,
                        tension: 0.3
                    },
                    {
                        label: 'Social',
                        data: this.esgData.trends.social,
                        borderColor: '#3B82F6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 2,
                        pointBackgroundColor: '#3B82F6',
                        pointBorderColor: '#fff',
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        fill: false,
                        tension: 0.3
                    },
                    {
                        label: 'Governance',
                        data: this.esgData.trends.governance,
                        borderColor: '#8B5CF6',
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        borderWidth: 2,
                        pointBackgroundColor: '#8B5CF6',
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
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        min: 7,
                        max: 10,
                        grid: {
                            color: 'rgba(0, 77, 64, 0.1)'
                        },
                        ticks: {
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

.esg-metrics {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
}

.esg-metric-card {
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
}

.esg-metric-value {
    font-size: 1.5rem;
    font-weight: var(--font-weight-bold);
    color: var(--primary-green);
    margin-bottom: var(--spacing-xs);
}

.esg-metric-label {
    font-size: 0.8rem;
    color: var(--text-light);
}

.trend-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.7rem;
    font-weight: var(--font-weight-semibold);
}

.trend-badge.positive {
    background-color: rgba(16, 185, 129, 0.2);
    color: #065f46;
}

.trend-badge.negative {
    background-color: rgba(239, 68, 68, 0.2);
    color: #b91c1c;
}

.esg-chart-card {
    background: var(--white);
    border-radius: var(--radius-lg);
    padding: var(--spacing-md);
    box-shadow: var(--shadow-sm);
    margin-bottom: var(--spacing-lg);
    border: 1px solid rgba(0, 77, 64, 0.1);
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

.esg-benchmark-container {
    display: flex;
    justify-content: space-between;
    margin-top: var(--spacing-md);
}

.benchmark-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.benchmark-value {
    font-size: 1.2rem;
    font-weight: var(--font-weight-semibold);
    color: var(--primary-green);
}

.benchmark-label {
    font-size: 0.8rem;
    color: var(--text-light);
}

.esg-category-selector {
    display: flex;
    justify-content: center;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
}

.category-button {
    padding: 6px 12px;
    border-radius: var(--radius-md);
    font-size: 0.9rem;
    font-weight: var(--font-weight-medium);
    background-color: var(--light-green);
    color: var(--primary-green);
    border: none;
    cursor: pointer;
    transition: var(--transition-fast);
}

.category-button.active {
    background-color: var(--primary-green);
    color: var(--white);
}

.category-button:hover:not(.active) {
    background-color: rgba(0, 77, 64, 0.2);
}

@media (min-width: 768px) {
    .esg-metrics {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (max-width: 480px) {
    .esg-benchmark-container {
        flex-direction: column;
        gap: var(--spacing-sm);
    }
    
    .benchmark-item {
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', esgDashboardStyles);