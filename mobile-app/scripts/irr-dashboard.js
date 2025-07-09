// IRR Simulation Dashboard for FinergyCloud Mobile App

class IRRDashboard {
    constructor() {
        this.charts = {};
        this.currentScenario = 'Base Case';
        this.targetIRR = 12;
        this.confidenceLevel = '95%';
        this.init();
    }

    init() {
        this.setupEventListeners();
        document.addEventListener('pageActivated', (e) => {
            if (e.detail.pageId === 'calculator') {
                this.initializeCharts();
                this.loadIRRData();
            }
        });
    }

    setupEventListeners() {
        // Scenario selector
        const scenarioSelector = document.getElementById('scenario-selector');
        if (scenarioSelector) {
            scenarioSelector.addEventListener('change', (e) => {
                this.currentScenario = e.target.value;
                this.updateDashboard();
            });
        }

        // Target IRR input
        const targetIRR = document.getElementById('target-irr');
        if (targetIRR) {
            targetIRR.addEventListener('change', (e) => {
                this.targetIRR = parseFloat(e.target.value);
                this.updateDashboard();
            });
        }

        // Confidence level selector
        const confidenceLevel = document.getElementById('confidence-level');
        if (confidenceLevel) {
            confidenceLevel.addEventListener('change', (e) => {
                this.confidenceLevel = e.target.value;
                this.updateDashboard();
            });
        }

        // Action buttons
        const runSimulationBtn = document.querySelector('.irr-action-buttons .btn-primary');
        if (runSimulationBtn) {
            runSimulationBtn.addEventListener('click', () => this.runNewSimulation());
        }

        const exportResultsBtn = document.querySelector('.irr-action-buttons .btn-secondary');
        if (exportResultsBtn) {
            exportResultsBtn.addEventListener('click', () => this.exportResults());
        }
    }

    initializeCharts() {
        // Load Chart.js if not already loaded
        this.loadChartJS(() => {
            this.initializeIRRDistributionChart();
            this.initializeIRRCDFChart();
            this.initializeSensitivityChart();
            this.initializeScenarioComparisonChart();
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

    initializeIRRDistributionChart() {
        const ctx = document.getElementById('irr-distribution-chart');
        if (!ctx || !window.Chart) return;

        // Clear existing chart if any
        if (this.charts.distributionChart) {
            this.charts.distributionChart.destroy();
        }

        // IRR Distribution Data
        const data = {
            labels: ['<10%', '10-12%', '12-14%', '14-16%', '16-18%', '18-20%', '>20%'],
            datasets: [{
                label: 'Frequency',
                data: [500, 1500, 2500, 3000, 1800, 500, 200],
                backgroundColor: '#00bfa5',
                borderColor: '#004d40',
                borderWidth: 1
            }]
        };

        // Create chart
        this.charts.distributionChart = new Chart(ctx, {
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
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Simulations',
                            color: '#004d40'
                        },
                        grid: {
                            color: 'rgba(0, 77, 64, 0.1)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'IRR Range',
                            color: '#004d40'
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    initializeIRRCDFChart() {
        const ctx = document.getElementById('irr-cdf-chart');
        if (!ctx || !window.Chart) return;

        // Clear existing chart if any
        if (this.charts.cdfChart) {
            this.charts.cdfChart.destroy();
        }

        // CDF Data
        const data = {
            labels: ['5%', '7%', '9%', '11%', '13%', '15%', '17%', '19%', '21%', '23%'],
            datasets: [{
                label: 'Cumulative Probability',
                data: [0.01, 0.05, 0.15, 0.35, 0.60, 0.80, 0.92, 0.97, 0.99, 1.00],
                borderColor: '#00bfa5',
                backgroundColor: 'rgba(0, 191, 165, 0.2)',
                tension: 0.3,
                fill: true
            }]
        };

        // Create chart
        this.charts.cdfChart = new Chart(ctx, {
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
                        backgroundColor: 'rgba(0, 77, 64, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#00bfa5',
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 1.0,
                        title: {
                            display: true,
                            text: 'Cumulative Probability',
                            color: '#004d40'
                        },
                        grid: {
                            color: 'rgba(0, 77, 64, 0.1)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'IRR (%)',
                            color: '#004d40'
                        },
                        grid: {
                            color: 'rgba(0, 77, 64, 0.1)'
                        }
                    }
                }
            }
        });
    }

    initializeSensitivityChart() {
        const ctx = document.getElementById('sensitivity-chart');
        if (!ctx || !window.Chart) return;

        // Clear existing chart if any
        if (this.charts.sensitivityChart) {
            this.charts.sensitivityChart.destroy();
        }

        // Sensitivity Analysis Data
        const data = {
            labels: ['Energy Price Growth', 'Construction Cost', 'Operational Expenses', 'Discount Rate', 'Project Completion Time'],
            datasets: [{
                label: 'Impact on IRR (%)',
                data: [3.5, -2.8, -1.5, 2.0, -1.0],
                backgroundColor: [
                    '#10B981', // Green for positive impact
                    '#EF4444', // Red for negative impact
                    '#EF4444',
                    '#10B981',
                    '#EF4444'
                ],
                borderColor: [
                    '#059669',
                    '#DC2626',
                    '#DC2626',
                    '#059669',
                    '#DC2626'
                ],
                borderWidth: 1
            }]
        };

        // Create chart
        this.charts.sensitivityChart = new Chart(ctx, {
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
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Impact on IRR (%)',
                            color: '#004d40'
                        },
                        grid: {
                            color: 'rgba(0, 77, 64, 0.1)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Input Factor',
                            color: '#004d40'
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    initializeScenarioComparisonChart() {
        const ctx = document.getElementById('scenario-comparison-chart');
        if (!ctx || !window.Chart) return;

        // Clear existing chart if any
        if (this.charts.scenarioChart) {
            this.charts.scenarioChart.destroy();
        }

        // Scenario Comparison Data
        const data = {
            labels: ['Base Case', 'Optimistic', 'Pessimistic'],
            datasets: [{
                label: 'Average IRR (%)',
                data: [15.2, 18.5, 11.0],
                backgroundColor: [
                    '#00bfa5', // Base case
                    '#10B981', // Optimistic
                    '#EF4444'  // Pessimistic
                ],
                borderColor: [
                    '#004d40',
                    '#059669',
                    '#DC2626'
                ],
                borderWidth: 1
            }]
        };

        // Create chart
        this.charts.scenarioChart = new Chart(ctx, {
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
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Average IRR (%)',
                            color: '#004d40'
                        },
                        grid: {
                            color: 'rgba(0, 77, 64, 0.1)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Scenario',
                            color: '#004d40'
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    loadIRRData() {
        // In a real app, this would fetch data from an API
        console.log('Loading IRR data for', this.currentScenario);
        
        // Simulate loading state
        const irrContainer = document.querySelector('.irr-dashboard-container');
        if (irrContainer) {
            irrContainer.classList.add('loading');
            
            setTimeout(() => {
                irrContainer.classList.remove('loading');
                this.animateIRRMetrics();
            }, 1000);
        }
    }

    updateDashboard() {
        // Update charts based on selected scenario, target IRR, and confidence level
        this.loadIRRData();
        
        // Update chart data based on selections
        this.updateChartData();
    }

    updateChartData() {
        // In a real app, this would update charts with new data
        // For demo purposes, we'll just add some random variation
        
        if (this.charts.distributionChart) {
            const data = this.charts.distributionChart.data.datasets[0].data;
            this.charts.distributionChart.data.datasets[0].data = data.map(val => 
                Math.max(100, Math.min(3500, val + (Math.random() * 500 - 250)))
            );
            this.charts.distributionChart.update();
        }
        
        if (this.charts.cdfChart) {
            // Keep the CDF monotonically increasing
            let prev = 0;
            this.charts.cdfChart.data.datasets[0].data = this.charts.cdfChart.data.datasets[0].data.map((val, i, arr) => {
                if (i === 0) {
                    prev = Math.max(0, Math.min(0.05, val + (Math.random() * 0.02 - 0.01)));
                    return prev;
                } else if (i === arr.length - 1) {
                    return 1.0;
                } else {
                    const newVal = Math.max(prev, Math.min(0.99, val + (Math.random() * 0.04 - 0.02)));
                    prev = newVal;
                    return newVal;
                }
            });
            this.charts.cdfChart.update();
        }
        
        if (this.charts.sensitivityChart) {
            const data = this.charts.sensitivityChart.data.datasets[0].data;
            this.charts.sensitivityChart.data.datasets[0].data = data.map(val => 
                val + (Math.random() * 0.6 - 0.3)
            );
            
            // Update colors based on positive/negative values
            this.charts.sensitivityChart.data.datasets[0].backgroundColor = this.charts.sensitivityChart.data.datasets[0].data.map(val => 
                val >= 0 ? '#10B981' : '#EF4444'
            );
            this.charts.sensitivityChart.data.datasets[0].borderColor = this.charts.sensitivityChart.data.datasets[0].data.map(val => 
                val >= 0 ? '#059669' : '#DC2626'
            );
            
            this.charts.sensitivityChart.update();
        }
        
        if (this.charts.scenarioChart) {
            const data = this.charts.scenarioChart.data.datasets[0].data;
            this.charts.scenarioChart.data.datasets[0].data = data.map(val => 
                Math.max(8, Math.min(22, val + (Math.random() * 1 - 0.5)))
            );
            this.charts.scenarioChart.update();
        }
    }

    animateIRRMetrics() {
        const metrics = document.querySelectorAll('#calculator-page .metric-value');
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

    runNewSimulation() {
        // In a real app, this would run a new Monte Carlo simulation
        console.log('Running new simulation for', this.currentScenario);
        
        // Show toast notification
        this.showToast('Running Monte Carlo simulation...', 'info');
        
        // Simulate simulation running
        setTimeout(() => {
            this.updateChartData();
            this.showToast('Simulation completed with 10,000 iterations!', 'success');
        }, 2000);
    }

    exportResults() {
        // In a real app, this would export results to PDF or Excel
        console.log('Exporting results for', this.currentScenario);
        
        // Show toast notification
        this.showToast('Preparing export...', 'info');
        
        // Simulate export
        setTimeout(() => {
            this.showToast('Results exported successfully!', 'success');
        }, 1500);
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

// Initialize IRR Dashboard
document.addEventListener('DOMContentLoaded', () => {
    // Load Chart.js if not already loaded
    if (!window.Chart) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.async = true;
        document.head.appendChild(script);
        
        script.onload = () => {
            window.irrDashboard = new IRRDashboard();
        };
    } else {
        window.irrDashboard = new IRRDashboard();
    }
});

// Add IRR Dashboard styles
const irrDashboardStyles = `
<style>
/* IRR Dashboard Styles */
.irr-dashboard-container {
    margin-bottom: var(--spacing-lg);
    position: relative;
}

.irr-metrics {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
}

.irr-metric-card {
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

.irr-metric-value {
    font-size: 1.5rem;
    font-weight: var(--font-weight-bold);
    color: var(--primary-green);
    margin-bottom: var(--spacing-xs);
}

.irr-metric-label {
    font-size: 0.8rem;
    color: var(--text-light);
}

.irr-chart-card {
    background: var(--white);
    border-radius: var(--radius-lg);
    padding: var(--spacing-md);
    box-shadow: var(--shadow-sm);
    margin-bottom: var(--spacing-lg);
    border: 1px solid rgba(0, 77, 64, 0.1);
}

.irr-chart-title {
    font-size: 1rem;
    font-weight: var(--font-weight-semibold);
    color: var(--primary-green);
    margin-bottom: var(--spacing-md);
    text-align: center;
}

.irr-chart-container {
    height: 200px;
    position: relative;
}

.irr-controls {
    background: var(--white);
    border-radius: var(--radius-lg);
    padding: var(--spacing-md);
    box-shadow: var(--shadow-sm);
    margin-bottom: var(--spacing-lg);
    border: 1px solid rgba(0, 77, 64, 0.1);
}

.irr-control-group {
    margin-bottom: var(--spacing-md);
}

.irr-control-group:last-child {
    margin-bottom: 0;
}

.irr-control-label {
    font-size: 0.9rem;
    font-weight: var(--font-weight-medium);
    color: var(--primary-green);
    margin-bottom: var(--spacing-xs);
    display: block;
}

.irr-control-select,
.irr-control-input {
    width: 100%;
    padding: var(--spacing-sm);
    border: 1px solid rgba(0, 77, 64, 0.2);
    border-radius: var(--radius-md);
    font-size: 0.9rem;
    color: var(--text-dark);
    background: var(--white);
}

.irr-control-select:focus,
.irr-control-input:focus {
    border-color: var(--accent-teal);
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 191, 165, 0.2);
}

.irr-action-buttons {
    display: flex;
    gap: var(--spacing-md);
    margin-top: var(--spacing-lg);
}

.irr-action-buttons .btn {
    flex: 1;
}

/* Loading State */
.irr-dashboard-container.loading {
    position: relative;
}

.irr-dashboard-container.loading::after {
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

.irr-dashboard-container.loading::before {
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

@media (min-width: 768px) {
    .irr-metrics {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (max-width: 480px) {
    .irr-action-buttons {
        flex-direction: column;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', irrDashboardStyles);