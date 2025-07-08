// ESG Scoring Dashboard for FinergyCloud Mobile App

class ESGDashboard {
    constructor() {
        this.charts = {};
        this.currentProject = 'Project A - Solar Farm';
        this.currentTimePeriod = 'Last 3 Months';
        this.init();
    }

    init() {
        this.setupEventListeners();
        document.addEventListener('pageActivated', (e) => {
            if (e.detail.pageId === 'esg') {
                this.initializeCharts();
                this.loadESGData();
            }
        });
    }

    setupEventListeners() {
        // Project selector
        const projectSelector = document.getElementById('esg-project-selector');
        if (projectSelector) {
            projectSelector.addEventListener('change', (e) => {
                this.currentProject = e.target.value;
                this.updateDashboard();
            });
        }

        // Time period selector
        const timePeriodSelector = document.getElementById('esg-time-period');
        if (timePeriodSelector) {
            timePeriodSelector.addEventListener('change', (e) => {
                this.currentTimePeriod = e.target.value;
                this.updateDashboard();
            });
        }

        // Action buttons
        const generateReportBtn = document.querySelector('.esg-action-buttons .btn-primary');
        if (generateReportBtn) {
            generateReportBtn.addEventListener('click', () => this.generateESGReport());
        }

        const viewInsightsBtn = document.querySelector('.esg-action-buttons .btn-secondary');
        if (viewInsightsBtn) {
            viewInsightsBtn.addEventListener('click', () => this.viewESGInsights());
        }
    }

    initializeCharts() {
        this.initializeESGTrendChart();
        this.initializeESGRadarChart();
        this.initializePeerComparisonChart();
        this.initializeFactorImpactChart();
    }

    initializeESGTrendChart() {
        const ctx = document.getElementById('esg-trend-chart');
        if (!ctx) return;

        // Clear existing chart if any
        if (this.charts.trendChart) {
            this.charts.trendChart.destroy();
        }

        // ESG Score Trend Data
        const data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Overall ESG Score',
                data: [8.0, 8.2, 8.5, 8.3, 8.6, 8.8, 8.7],
                borderColor: '#00bfa5',
                backgroundColor: 'rgba(0, 191, 165, 0.2)',
                tension: 0.3,
                fill: true
            }]
        };

        // Create chart
        this.charts.trendChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 77, 64, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#00bfa5',
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 7,
                        max: 10,
                        ticks: {
                            stepSize: 0.5
                        },
                        grid: {
                            color: 'rgba(0, 77, 64, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 77, 64, 0.1)'
                        }
                    }
                }
            }
        });
    }

    initializeESGRadarChart() {
        const ctx = document.getElementById('esg-radar-chart');
        if (!ctx) return;

        // Clear existing chart if any
        if (this.charts.radarChart) {
            this.charts.radarChart.destroy();
        }

        // ESG Radar Chart Data
        const data = {
            labels: ['Environmental', 'Social', 'Governance', 'Community', 'Innovation', 'Ethics'],
            datasets: [{
                label: 'Current Project',
                data: [8.5, 8.9, 8.6, 7.5, 8.0, 9.2],
                backgroundColor: 'rgba(0, 191, 165, 0.2)',
                borderColor: '#00bfa5',
                pointBackgroundColor: '#00bfa5',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#00bfa5'
            }]
        };

        // Create chart
        this.charts.radarChart = new Chart(ctx, {
            type: 'radar',
            data: data,
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
                        borderWidth: 1
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(0, 77, 64, 0.1)'
                        },
                        grid: {
                            color: 'rgba(0, 77, 64, 0.1)'
                        },
                        pointLabels: {
                            font: {
                                size: 10
                            },
                            color: '#004d40'
                        },
                        suggestedMin: 0,
                        suggestedMax: 10,
                        ticks: {
                            stepSize: 2,
                            backdropColor: 'transparent'
                        }
                    }
                }
            }
        });
    }

    initializePeerComparisonChart() {
        const ctx = document.getElementById('peer-comparison-chart');
        if (!ctx) return;

        // Clear existing chart if any
        if (this.charts.peerChart) {
            this.charts.peerChart.destroy();
        }

        // Peer Comparison Data
        const data = {
            labels: ['Project A', 'Peer 1', 'Project B', 'Peer 2', 'Project C', 'Peer 3'],
            datasets: [{
                label: 'ESG Score',
                data: [8.7, 7.8, 9.0, 8.1, 8.7, 7.5],
                backgroundColor: [
                    '#00bfa5', // Project A
                    '#e0f2f1', // Peer 1
                    '#00bfa5', // Project B
                    '#e0f2f1', // Peer 2
                    '#00bfa5', // Project C
                    '#e0f2f1'  // Peer 3
                ],
                borderColor: [
                    '#004d40',
                    '#b2dfdb',
                    '#004d40',
                    '#b2dfdb',
                    '#004d40',
                    '#b2dfdb'
                ],
                borderWidth: 1
            }]
        };

        // Create chart
        this.charts.peerChart = new Chart(ctx, {
            type: 'bar',
            data: data,
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
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 7,
                        max: 10,
                        ticks: {
                            stepSize: 0.5
                        },
                        grid: {
                            color: 'rgba(0, 77, 64, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    initializeFactorImpactChart() {
        const ctx = document.getElementById('factor-impact-chart');
        if (!ctx) return;

        // Clear existing chart if any
        if (this.charts.factorChart) {
            this.charts.factorChart.destroy();
        }

        // Factor Impact Data
        const data = {
            labels: ['Carbon Emissions', 'Water Usage', 'Labor Practices', 'Board Diversity', 'Anti-Corruption'],
            datasets: [{
                label: 'Impact Score',
                data: [90, 75, 85, 60, 95],
                backgroundColor: [
                    '#10B981', // Environmental
                    '#10B981', // Environmental
                    '#3B82F6', // Social
                    '#8B5CF6', // Governance
                    '#8B5CF6'  // Governance
                ],
                borderColor: [
                    '#059669',
                    '#059669',
                    '#2563EB',
                    '#7C3AED',
                    '#7C3AED'
                ],
                borderWidth: 1
            }]
        };

        // Create chart
        this.charts.factorChart = new Chart(ctx, {
            type: 'bar',
            data: data,
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
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(0, 77, 64, 0.1)'
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    loadESGData() {
        // In a real app, this would fetch data from an API
        console.log('Loading ESG data for', this.currentProject, 'over', this.currentTimePeriod);
        
        // Simulate loading state
        const esgContainer = document.querySelector('.esg-dashboard-container');
        if (esgContainer) {
            esgContainer.classList.add('loading');
            
            setTimeout(() => {
                esgContainer.classList.remove('loading');
                this.animateESGMetrics();
            }, 1000);
        }
    }

    updateDashboard() {
        // Update charts based on selected project and time period
        this.loadESGData();
        
        // Update chart data based on selections
        this.updateChartData();
    }

    updateChartData() {
        // In a real app, this would update charts with new data
        // For demo purposes, we'll just add some random variation
        
        if (this.charts.trendChart) {
            const data = this.charts.trendChart.data.datasets[0].data;
            this.charts.trendChart.data.datasets[0].data = data.map(val => 
                Math.max(7, Math.min(10, val + (Math.random() * 0.4 - 0.2)))
            );
            this.charts.trendChart.update();
        }
        
        if (this.charts.radarChart) {
            const data = this.charts.radarChart.data.datasets[0].data;
            this.charts.radarChart.data.datasets[0].data = data.map(val => 
                Math.max(7, Math.min(10, val + (Math.random() * 0.4 - 0.2)))
            );
            this.charts.radarChart.update();
        }
        
        if (this.charts.peerChart) {
            const data = this.charts.peerChart.data.datasets[0].data;
            this.charts.peerChart.data.datasets[0].data = data.map(val => 
                Math.max(7, Math.min(10, val + (Math.random() * 0.4 - 0.2)))
            );
            this.charts.peerChart.update();
        }
        
        if (this.charts.factorChart) {
            const data = this.charts.factorChart.data.datasets[0].data;
            this.charts.factorChart.data.datasets[0].data = data.map(val => 
                Math.max(50, Math.min(100, val + (Math.random() * 10 - 5)))
            );
            this.charts.factorChart.update();
        }
    }

    animateESGMetrics() {
        const metrics = document.querySelectorAll('#esg-page .metric-value');
        metrics.forEach((metric, index) => {
            setTimeout(() => {
                metric.style.animation = 'scaleIn 0.5s ease';
                
                // Remove animation after it completes
                setTimeout(() => {
                    metric.style.animation = '';
                }, 500);
            }, index * 100);
        });
    }

    generateESGReport() {
        // In a real app, this would generate and download a report
        console.log('Generating ESG report for', this.currentProject);
        
        // Show toast notification
        this.showToast('Generating ESG report...', 'info');
        
        // Simulate report generation
        setTimeout(() => {
            this.showToast('ESG report generated successfully!', 'success');
        }, 2000);
    }

    viewESGInsights() {
        // In a real app, this would show detailed insights
        console.log('Viewing ESG insights for', this.currentProject);
        
        // Show toast notification
        this.showToast('Loading ESG insights...', 'info');
        
        // Simulate insights loading
        setTimeout(() => {
            // Create modal for insights
            this.showInsightsModal();
        }, 1000);
    }

    showInsightsModal() {
        // Create modal element
        const modal = document.createElement('div');
        modal.className = 'esg-insights-modal';
        
        modal.innerHTML = `
            <div class="esg-insights-content">
                <div class="insights-header">
                    <h3>ESG Insights: ${this.currentProject}</h3>
                    <button class="insights-close-btn">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
                <div class="insights-body">
                    <div class="insight-item">
                        <div class="insight-icon">
                            <i class="bi bi-lightbulb"></i>
                        </div>
                        <div class="insight-content">
                            <h4>Strong Environmental Performance</h4>
                            <p>Your project ranks in the top 15% for environmental metrics compared to industry peers, particularly in renewable energy utilization and carbon footprint reduction.</p>
                        </div>
                    </div>
                    <div class="insight-item">
                        <div class="insight-icon">
                            <i class="bi bi-graph-up"></i>
                        </div>
                        <div class="insight-content">
                            <h4>Positive Score Trend</h4>
                            <p>ESG scores have shown consistent improvement over the past 6 months, with the most significant gains in governance practices.</p>
                        </div>
                    </div>
                    <div class="insight-item">
                        <div class="insight-icon">
                            <i class="bi bi-exclamation-triangle"></i>
                        </div>
                        <div class="insight-content">
                            <h4>Improvement Area: Water Management</h4>
                            <p>Water usage efficiency is below industry average. Implementing water recycling systems could improve environmental score by up to 0.3 points.</p>
                        </div>
                    </div>
                    <div class="insight-item">
                        <div class="insight-icon">
                            <i class="bi bi-cash-coin"></i>
                        </div>
                        <div class="insight-content">
                            <h4>Financial Impact</h4>
                            <p>Projects with similar ESG profiles have shown 2.3% higher IRR on average, demonstrating the financial value of strong ESG performance.</p>
                        </div>
                    </div>
                </div>
                <div class="insights-footer">
                    <button class="btn btn-primary">
                        <i class="bi bi-download me-2"></i>Download Full Analysis
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add close button handler
        const closeBtn = modal.querySelector('.insights-close-btn');
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        });
        
        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Close on click outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.remove();
                }, 300);
            }
        });
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
/* ESG Insights Modal */
.esg-insights-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: var(--z-modal);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    padding: var(--spacing-md);
    backdrop-filter: blur(3px);
}

.esg-insights-modal.show {
    opacity: 1;
    visibility: visible;
}

.esg-insights-content {
    background: var(--white);
    border-radius: var(--radius-lg);
    max-width: 500px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    transform: scale(0.8);
    transition: transform 0.3s ease;
}

.esg-insights-modal.show .esg-insights-content {
    transform: scale(1);
}

.insights-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-lg);
    border-bottom: 1px solid rgba(0, 77, 64, 0.1);
    position: sticky;
    top: 0;
    background: var(--white);
    z-index: 1;
}

.insights-header h3 {
    color: var(--primary-green);
    margin: 0;
    font-size: 1.1rem;
}

.insights-close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--gray);
    cursor: pointer;
    padding: var(--spacing-xs);
    border-radius: var(--radius-sm);
    transition: var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    min-height: 44px;
}

.insights-close-btn:hover {
    background: var(--light-gray);
    color: var(--primary-green);
}

.insights-body {
    padding: var(--spacing-lg);
}

.insight-item {
    display: flex;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
}

.insight-item:last-child {
    margin-bottom: 0;
}

.insight-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--gradient-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font-size: 1.2rem;
    flex-shrink: 0;
}

.insight-content h4 {
    margin: 0 0 var(--spacing-xs) 0;
    font-size: 1rem;
    font-weight: var(--font-weight-semibold);
    color: var(--primary-green);
}

.insight-content p {
    margin: 0;
    font-size: 0.9rem;
    color: var(--text-light);
    line-height: 1.5;
}

.insights-footer {
    padding: var(--spacing-lg);
    border-top: 1px solid rgba(0, 77, 64, 0.1);
    text-align: center;
}

/* Loading State */
.esg-dashboard-container.loading {
    position: relative;
}

.esg-dashboard-container.loading::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
}

.esg-dashboard-container.loading::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    border: 3px solid rgba(0, 77, 64, 0.1);
    border-top: 3px solid var(--accent-teal);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    z-index: 11;
}

@keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
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
    border-left: 4px solid #10B981;
}

.mobile-toast.warning {
    border-left: 4px solid #F59E0B;
}

.mobile-toast.info {
    border-left: 4px solid #3B82F6;
}

.mobile-toast .toast-content {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
}

.mobile-toast.success .toast-content i {
    color: #10B981;
}

.mobile-toast.warning .toast-content i {
    color: #F59E0B;
}

.mobile-toast.info .toast-content i {
    color: #3B82F6;
}

@media (max-width: 480px) {
    .esg-action-buttons {
        flex-direction: column;
    }
    
    .insight-item {
        flex-direction: column;
        text-align: center;
    }
    
    .insight-icon {
        margin: 0 auto var(--spacing-sm);
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', esgDashboardStyles);