// Analytics Dashboard for FinergyCloud Mobile App

class AnalyticsDashboard {
    constructor() {
        this.charts = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        document.addEventListener('pageActivated', (e) => {
            if (e.detail.pageId === 'analytics') {
                this.initializeCharts();
                this.loadAnalyticsData();
            }
        });
    }

    setupEventListeners() {
        // Add event listeners for dashboard interactions
        const exportBtn = document.querySelector('.dashboard-actions .btn-primary');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportDashboard());
        }

        const shareBtn = document.querySelector('.dashboard-actions .btn-outline-primary');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.shareDashboard());
        }
    }

    initializeCharts() {
        this.initializePortfolioChart();
        this.initializePerformanceChart();
        this.initializeRiskChart();
    }

    initializePortfolioChart() {
        const ctx = document.getElementById('portfolio-chart');
        if (!ctx) return;

        // Clear existing chart if any
        if (this.charts.portfolioChart) {
            this.charts.portfolioChart.destroy();
        }

        // Portfolio Distribution Data
        const data = {
            labels: ['Solar', 'Wind', 'Hydro', 'Biomass', 'Geothermal'],
            datasets: [{
                data: [45, 25, 15, 10, 5],
                backgroundColor: [
                    '#FF9800', // Solar
                    '#03A9F4', // Wind
                    '#3F51B5', // Hydro
                    '#4CAF50', // Biomass
                    '#F44336'  // Geothermal
                ],
                borderColor: [
                    '#F57C00',
                    '#0288D1',
                    '#303F9F',
                    '#388E3C',
                    '#D32F2F'
                ],
                borderWidth: 1
            }]
        };

        // Create chart
        this.charts.portfolioChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 10
                            },
                            color: '#004d40'
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
                cutout: '70%'
            }
        });
    }

    initializePerformanceChart() {
        const ctx = document.getElementById('performance-chart');
        if (!ctx) return;

        // Clear existing chart if any
        if (this.charts.performanceChart) {
            this.charts.performanceChart.destroy();
        }

        // Performance Trend Data
        const data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'IRR Performance',
                data: [12.5, 13.2, 14.1, 13.8, 14.5, 15.2, 14.8, 15.1, 14.9, 15.3, 14.7, 15.0],
                borderColor: '#00bfa5',
                backgroundColor: 'rgba(0, 191, 165, 0.2)',
                tension: 0.3,
                fill: true
            }]
        };

        // Create chart
        this.charts.performanceChart = new Chart(ctx, {
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
                        beginAtZero: false,
                        min: 12,
                        max: 16,
                        ticks: {
                            stepSize: 1
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

    initializeRiskChart() {
        const ctx = document.getElementById('risk-chart');
        if (!ctx) return;

        // Clear existing chart if any
        if (this.charts.riskChart) {
            this.charts.riskChart.destroy();
        }

        // Risk Distribution Data
        const data = {
            labels: ['Low Risk', 'Medium Risk', 'High Risk'],
            datasets: [{
                data: [60, 30, 10],
                backgroundColor: [
                    '#10B981', // Low Risk
                    '#F59E0B', // Medium Risk
                    '#EF4444'  // High Risk
                ],
                borderColor: [
                    '#059669',
                    '#D97706',
                    '#DC2626'
                ],
                borderWidth: 1
            }]
        };

        // Create chart
        this.charts.riskChart = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 10
                            },
                            color: '#004d40'
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

    loadAnalyticsData() {
        // In a real app, this would fetch data from an API
        console.log('Loading analytics data...');
        
        // Simulate loading state
        const analyticsContainer = document.querySelector('.analytics-container');
        if (analyticsContainer) {
            analyticsContainer.classList.add('loading');
            
            setTimeout(() => {
                analyticsContainer.classList.remove('loading');
                this.animateAnalyticsMetrics();
            }, 1000);
        }
    }

    animateAnalyticsMetrics() {
        const metrics = document.querySelectorAll('#analytics-page .metric-value');
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

    exportDashboard() {
        // In a real implementation, this would generate a PDF
        this.showToast('Dashboard PDF download started', 'success');
        
        // Simulate download delay
        setTimeout(() => {
            this.showToast('Dashboard PDF downloaded successfully', 'success');
        }, 2000);
    }

    shareDashboard() {
        // Check if Web Share API is available
        if (navigator.share) {
            navigator.share({
                title: 'FinergyCloud Investment Dashboard',
                text: 'Check out my renewable energy investment dashboard from FinergyCloud',
                url: window.location.href,
            })
            .then(() => {
                this.showToast('Dashboard shared successfully', 'success');
            })
            .catch((error) => {
                console.log('Error sharing:', error);
                this.fallbackShare();
            });
        } else {
            this.fallbackShare();
        }
    }

    fallbackShare() {
        // Fallback for browsers that don't support Web Share API
        const shareUrl = window.location.href;
        
        // Create a temporary input element
        const input = document.createElement('input');
        input.value = shareUrl;
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, 99999); // For mobile devices
        
        // Copy to clipboard
        document.execCommand('copy');
        document.body.removeChild(input);
        
        this.showToast('Dashboard link copied to clipboard', 'success');
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

// Add Analytics Dashboard styles
const analyticsDashboardStyles = `
<style>
/* Analytics Dashboard Styles */
.analytics-container {
    position: relative;
}

.analytics-container.loading {
    position: relative;
}

.analytics-container.loading::after {
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

.analytics-container.loading::before {
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
</style>
`;

document.head.insertAdjacentHTML('beforeend', analyticsDashboardStyles);