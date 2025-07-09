// ESG Dashboard for FinergyCloud Mobile App

class ESGDashboard {
    constructor() {
        this.charts = {};
        this.esgData = {
            overall: {
                environmental: 8.7,
                social: 7.9,
                governance: 8.5,
                overall: 8.4
            },
            breakdown: {
                environmental: {
                    'Carbon Emissions': 9.2,
                    'Resource Use': 8.5,
                    'Waste Management': 8.9,
                    'Biodiversity Impact': 8.3
                },
                social: {
                    'Community Relations': 8.7,
                    'Labor Practices': 7.5,
                    'Human Rights': 8.2,
                    'Health & Safety': 7.3
                },
                governance: {
                    'Board Structure': 8.8,
                    'Business Ethics': 8.3,
                    'Transparency': 8.6,
                    'Risk Management': 8.2
                }
            },
            projects: [
                { name: 'Lagos Solar Farm', e: 9.1, s: 8.5, g: 8.9, overall: 8.8 },
                { name: 'Abuja Wind Project', e: 8.7, s: 7.8, g: 8.3, overall: 8.3 },
                { name: 'Kano Solar Array', e: 8.9, s: 7.6, g: 8.6, overall: 8.4 },
                { name: 'Port Harcourt Hydro', e: 9.3, s: 7.5, g: 8.2, overall: 8.3 },
                { name: 'Ibadan Solar Park', e: 8.8, s: 8.2, g: 8.7, overall: 8.6 }
            ],
            benchmarks: {
                industry: 7.2,
                regional: 6.8,
                global: 7.5
            },
            trends: {
                labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025'],
                environmental: [8.2, 8.4, 8.5, 8.6, 8.7],
                social: [7.5, 7.6, 7.8, 7.9, 7.9],
                governance: [8.1, 8.2, 8.3, 8.4, 8.5],
                overall: [7.9, 8.1, 8.2, 8.3, 8.4]
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
        // Update ESG score cards
        const overallScoreEl = document.getElementById('overall-esg-score');
        const environmentalScoreEl = document.getElementById('environmental-score');
        const socialScoreEl = document.getElementById('social-score');
        const governanceScoreEl = document.getElementById('governance-score');
        
        if (overallScoreEl) overallScoreEl.textContent = this.esgData.overall.overall.toFixed(1);
        if (environmentalScoreEl) environmentalScoreEl.textContent = this.esgData.overall.environmental.toFixed(1);
        if (socialScoreEl) socialScoreEl.textContent = this.esgData.overall.social.toFixed(1);
        if (governanceScoreEl) governanceScoreEl.textContent = this.esgData.overall.governance.toFixed(1);
        
        // Update benchmark comparison
        const industryBenchmarkEl = document.getElementById('industry-benchmark');
        const aboveIndustryEl = document.getElementById('above-industry');
        
        if (industryBenchmarkEl) industryBenchmarkEl.textContent = this.esgData.benchmarks.industry.toFixed(1);
        
        if (aboveIndustryEl) {
            const difference = this.esgData.overall.overall - this.esgData.benchmarks.industry;
            aboveIndustryEl.textContent = `+${difference.toFixed(1)}`;
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
                // Create charts
                this.createESGRadarChart();
                this.createESGBreakdownChart();
                this.createESGComparisonChart();
                this.createESGTrendChart();
            };
        } else if (window.Chart) {
            // Create charts directly if Chart.js is already loaded
            this.createESGRadarChart();
            this.createESGBreakdownChart();
            this.createESGComparisonChart();
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
                datasets: [{
                    label: 'ESG Score',
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
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#00bfa5',
                    pointRadius: 5,
                    pointHoverRadius: 7
                }, {
                    label: 'Industry Average',
                    data: [7.0, 6.8, 7.5],
                    backgroundColor: 'rgba(158, 158, 158, 0.2)',
                    borderColor: '#9e9e9e',
                    borderWidth: 2,
                    pointBackgroundColor: '#9e9e9e',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#9e9e9e',
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
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
                            color: '#004d40',
                            font: {
                                size: 10
                            }
                        },
                        grid: {
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
        
        // Environmental factors
        Object.entries(this.esgData.breakdown.environmental).forEach(([category, score]) => {
            categories.push(`E: ${category}`);
            scores.push(score);
            colors.push('#10B981'); // Green for environmental
        });
        
        // Social factors
        Object.entries(this.esgData.breakdown.social).forEach(([category, score]) => {
            categories.push(`S: ${category}`);
            scores.push(score);
            colors.push('#3B82F6'); // Blue for social
        });
        
        // Governance factors
        Object.entries(this.esgData.breakdown.governance).forEach(([category, score]) => {
            categories.push(`G: ${category}`);
            scores.push(score);
            colors.push('#8B5CF6'); // Purple for governance
        });
        
        // Create chart
        this.charts.breakdownChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: categories,
                datasets: [{
                    label: 'Score (0-10)',
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
                scales: {
                    x: {
                        min: 0,
                        max: 10,
                        grid: {
                            color: 'rgba(0, 77, 64, 0.1)'
                        },
                        ticks: {
                            color: '#004d40',
                            font: {
                                size: 10
                            }
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
                },
                plugins: {
                    legend: {
                        display: false
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

    createESGComparisonChart() {
        const ctx = document.getElementById('esg-comparison-chart');
        if (!ctx) return;
        
        // Clear existing chart if any
        if (this.charts.comparisonChart) {
            this.charts.comparisonChart.destroy();
        }
        
        // Prepare data
        const projectNames = this.esgData.projects.map(p => p.name);
        const environmentalScores = this.esgData.projects.map(p => p.e);
        const socialScores = this.esgData.projects.map(p => p.s);
        const governanceScores = this.esgData.projects.map(p => p.g);
        const overallScores = this.esgData.projects.map(p => p.overall);
        
        // Create chart
        this.charts.comparisonChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: projectNames,
                datasets: [
                    {
                        label: 'Environmental',
                        data: environmentalScores,
                        backgroundColor: 'rgba(16, 185, 129, 0.7)',
                        borderColor: '#059669',
                        borderWidth: 1
                    },
                    {
                        label: 'Social',
                        data: socialScores,
                        backgroundColor: 'rgba(59, 130, 246, 0.7)',
                        borderColor: '#2563EB',
                        borderWidth: 1
                    },
                    {
                        label: 'Governance',
                        data: governanceScores,
                        backgroundColor: 'rgba(139, 92, 246, 0.7)',
                        borderColor: '#7C3AED',
                        borderWidth: 1
                    },
                    {
                        label: 'Overall',
                        data: overallScores,
                        backgroundColor: 'rgba(0, 191, 165, 0.7)',
                        borderColor: '#00bfa5',
                        borderWidth: 1,
                        type: 'line',
                        fill: false,
                        tension: 0.3,
                        pointBackgroundColor: '#00bfa5',
                        pointBorderColor: '#fff',
                        pointRadius: 5,
                        pointHoverRadius: 7
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
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
                    },
                    y: {
                        min: 0,
                        max: 10,
                        grid: {
                            color: 'rgba(0, 77, 64, 0.1)'
                        },
                        ticks: {
                            stepSize: 2,
                            color: '#004d40',
                            font: {
                                size: 10
                            }
                        },
                        title: {
                            display: true,
                            text: 'Score (0-10)',
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
                        pointRadius: 5,
                        pointHoverRadius: 7,
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
                        pointRadius: 4,
                        pointHoverRadius: 6,
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
                        pointRadius: 4,
                        pointHoverRadius: 6,
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
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        fill: false,
                        tension: 0.3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        min: 6,
                        max: 10,
                        grid: {
                            color: 'rgba(0, 77, 64, 0.1)'
                        },
                        ticks: {
                            stepSize: 1,
                            color: '#004d40',
                            font: {
                                size: 10
                            }
                        },
                        title: {
                            display: true,
                            text: 'Score (0-10)',
                            color: '#004d40',
                            font: {
                                size: 12,
                                weight: 'bold'
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
                        borderWidth: 1
                    }
                }
            }
        });
        
        // Add trend indicator
        const chartArea = document.querySelector('.esg-trend-chart-container');
        if (chartArea) {
            const indicator = document.createElement('div');
            indicator.className = 'trend-indicator';
            indicator.innerHTML = `
                <div class="indicator-badge positive">
                    <i class="bi bi-arrow-up-right"></i>
                    <span>+0.5 YTD</span>
                </div>
            `;
            chartArea.appendChild(indicator);
        }
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
.esg-container {
    margin-bottom: var(--spacing-lg);
}

.esg-section {
    margin-bottom: var(--spacing-xl);
}

.esg-section-title {
    font-size: 1.2rem;
    font-weight: var(--font-weight-semibold);
    color: var(--primary-green);
    margin-bottom: var(--spacing-md);
    padding-bottom: var(--spacing-xs);
    border-bottom: 2px solid var(--light-green);
}

.esg-metrics {
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
    right: 0;
    height: 4px;
}

.esg-score-card.overall::before {
    background: var(--gradient-primary);
}

.esg-score-card.environmental::before {
    background: #10B981;
}

.esg-score-card.social::before {
    background: #3B82F6;
}

.esg-score-card.governance::before {
    background: #8B5CF6;
}

.esg-score-value {
    font-size: 2rem;
    font-weight: var(--font-weight-bold);
    color: var(--primary-green);
    margin-bottom: var(--spacing-xs);
}

.esg-score-label {
    font-size: 0.8rem;
    color: var(--text-light);
}

.esg-benchmark-card {
    background: var(--white);
    border-radius: var(--radius-lg);
    padding: var(--spacing-md);
    box-shadow: var(--shadow-sm);
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid rgba(0, 77, 64, 0.1);
    margin-bottom: var(--spacing-lg);
}

.benchmark-label {
    font-size: 0.9rem;
    font-weight: var(--font-weight-medium);
    color: var(--text-dark);
}

.benchmark-values {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.benchmark-score {
    font-size: 1.2rem;
    font-weight: var(--font-weight-bold);
    color: var(--text-dark);
}

.benchmark-difference {
    font-size: 0.9rem;
    font-weight: var(--font-weight-semibold);
    color: #10B981;
    background: rgba(16, 185, 129, 0.1);
    padding: 4px 8px;
    border-radius: 12px;
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

.esg-radar-chart-container,
.esg-breakdown-chart-container,
.esg-comparison-chart-container,
.esg-trend-chart-container {
    position: relative;
}

/* Trend indicator */
.trend-indicator {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 5;
}

.indicator-badge {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.indicator-badge.positive {
    background: rgba(16, 185, 129, 0.9);
    color: white;
}

.indicator-badge.negative {
    background: rgba(239, 68, 68, 0.9);
    color: white;
}

.indicator-badge i {
    font-size: 0.9rem;
}

@media (min-width: 768px) {
    .esg-metrics {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (max-width: 480px) {
    .benchmark-values {
        flex-direction: column;
        align-items: flex-end;
        gap: 5px;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', esgDashboardStyles);