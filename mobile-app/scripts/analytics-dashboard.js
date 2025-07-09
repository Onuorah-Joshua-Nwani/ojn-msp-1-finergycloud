// Analytics Dashboard for FinergyCloud Mobile App

class AnalyticsDashboard {
    constructor() {
        this.charts = {};
        this.portfolioData = {
            distribution: {
                labels: ['Solar', 'Wind', 'Hydro', 'Biomass', 'Geothermal'],
                data: [45, 30, 15, 7, 3],
                colors: ['#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899']
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
        
        this.init();
    }

    init() {
        this.setupEventListeners();
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

    initializeCharts() {
        // Load Chart.js if not already loaded
        if (!window.Chart && !document.querySelector('script[src="https://cdn.jsdelivr.net/npm/chart.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
            script.async = true;
            document.head.appendChild(script);
            
            script.onload = () => {
                // Create charts
                this.createPortfolioDistributionChart();
                this.createPortfolioPerformanceChart();
                this.createRiskDistributionChart();
                this.createRiskMatrixChart();
                this.createRiskTrendChart();
            };
        } else if (window.Chart) {
            // Create charts directly if Chart.js is already loaded
            this.createPortfolioDistributionChart();
            this.createPortfolioPerformanceChart();
            this.createRiskDistributionChart();
            this.createRiskMatrixChart();
            this.createRiskTrendChart();
        }
    }

    createPortfolioDistributionChart() {
        const ctx = document.getElementById('portfolio-distribution-chart');
        if (!ctx) return;
        
        // Clear existing chart if any
        if (this.charts.portfolioDistributionChart) {
            this.charts.portfolioDistributionChart.destroy();
        }
        
        // Create chart
        this.charts.portfolioDistributionChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: this.portfolioData.distribution.labels,
                datasets: [{
                    data: this.portfolioData.distribution.data,
                    backgroundColor: this.portfolioData.distribution.colors,
                    borderColor: '#ffffff',
                    borderWidth: 2,
                    hoverOffset: 15
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: {
                    legend: {
                        position: 'right',
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
                                const label = context.label || '';
                                const value = context.raw;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: ${percentage}% (${value}MW)`;
                            }
                        }
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });
        
        // Add center text
        const chartArea = document.querySelector('.portfolio-distribution-chart-container');
        if (chartArea) {
            const centerText = document.createElement('div');
            centerText.className = 'doughnut-center-text';
            centerText.innerHTML = `
                <div class="center-value">16.7 MW</div>
                <div class="center-label">Total Capacity</div>
            `;
            chartArea.appendChild(centerText);
        }
    }

    createPortfolioPerformanceChart() {
        const ctx = document.getElementById('portfolio-performance-chart');
        if (!ctx) return;
        
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
                        label: 'Target IRR',
                        data: this.portfolioData.performance.target,
                        borderColor: '#F59E0B',
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        pointBackgroundColor: '#F59E0B',
                        pointBorderColor: '#fff',
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        fill: false,
                        tension: 0.3
                    },
                    {
                        label: 'Industry Benchmark',
                        data: this.portfolioData.performance.benchmark,
                        borderColor: '#9e9e9e',
                        backgroundColor: 'rgba(158, 158, 158, 0.1)',
                        borderWidth: 2,
                        borderDash: [2, 2],
                        pointBackgroundColor: '#9e9e9e',
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
                                return `${label}: ${value.toFixed(1)}%`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        min: 10,
                        max: 16,
                        title: {
                            display: true,
                            text: 'IRR (%)',
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
        
        // Add performance indicator
        const chartArea = document.querySelector('.portfolio-performance-chart-container');
        if (chartArea) {
            const indicator = document.createElement('div');
            indicator.className = 'performance-indicator';
            indicator.innerHTML = `
                <div class="indicator-badge positive">
                    <i class="bi bi-arrow-up-right"></i>
                    <span>+2.3% vs Target</span>
                </div>
            `;
            chartArea.appendChild(indicator);
        }
    }

    createRiskDistributionChart() {
        const ctx = document.getElementById('risk-distribution-chart');
        if (!ctx) return;
        
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
                    backgroundColor: this.riskData.distribution.colors,
                    borderColor: '#ffffff',
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
                                const label = context.label || '';
                                const value = context.raw;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: ${percentage}% (${value} projects)`;
                            }
                        }
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });
    }

    createRiskMatrixChart() {
        const ctx = document.getElementById('risk-matrix-chart');
        if (!ctx) return;
        
        // Clear existing chart if any
        if (this.charts.riskMatrixChart) {
            this.charts.riskMatrixChart.destroy();
        }
        
        // Prepare data for heatmap
        const data = [];
        const riskMatrix = this.riskData.matrix;
        
        for (let i = 0; i < riskMatrix.projects.length; i++) {
            for (let j = 0; j < riskMatrix.categories.length; j++) {
                data.push({
                    x: j,
                    y: i,
                    v: riskMatrix.data[i][j]
                });
            }
        }
        
        // Create custom heatmap
        const heatmapContainer = document.querySelector('.risk-matrix-chart-container');
        if (heatmapContainer) {
            heatmapContainer.innerHTML = '';
            
            // Create heatmap title
            const title = document.createElement('div');
            title.className = 'risk-matrix-title';
            title.textContent = 'Project Risk Matrix';
            heatmapContainer.appendChild(title);
            
            // Create heatmap grid
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
            riskMatrix.categories.forEach(category => {
                const headerCell = document.createElement('div');
                headerCell.className = 'risk-matrix-cell header-cell';
                headerCell.textContent = category;
                headerRow.appendChild(headerCell);
            });
            
            grid.appendChild(headerRow);
            
            // Add rows with project names and risk cells
            riskMatrix.projects.forEach((project, rowIndex) => {
                const row = document.createElement('div');
                row.className = 'risk-matrix-row';
                
                // Add project name cell
                const projectCell = document.createElement('div');
                projectCell.className = 'risk-matrix-cell project-cell';
                projectCell.textContent = project;
                row.appendChild(projectCell);
                
                // Add risk cells
                riskMatrix.categories.forEach((category, colIndex) => {
                    const riskCell = document.createElement('div');
                    riskCell.className = 'risk-matrix-cell risk-cell';
                    
                    const riskValue = riskMatrix.data[rowIndex][colIndex];
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
                    
                    // Add tooltip data
                    riskCell.setAttribute('data-project', project);
                    riskCell.setAttribute('data-category', category);
                    riskCell.setAttribute('data-risk', riskLabel);
                    
                    // Add click handler for details
                    riskCell.addEventListener('click', () => {
                        this.showRiskDetails(project, category, riskLabel);
                    });
                    
                    row.appendChild(riskCell);
                });
                
                grid.appendChild(row);
            });
            
            heatmapContainer.appendChild(grid);
            
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
            
            heatmapContainer.appendChild(legend);
        }
    }

    createRiskTrendChart() {
        const ctx = document.getElementById('risk-trend-chart');
        if (!ctx) return;
        
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
                        label: 'Grid Risk',
                        data: this.riskData.trends.grid,
                        borderColor: '#F59E0B',
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        borderWidth: 2,
                        pointBackgroundColor: '#F59E0B',
                        pointBorderColor: '#fff',
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        fill: false,
                        tension: 0.3
                    },
                    {
                        label: 'Regulatory Risk',
                        data: this.riskData.trends.regulatory,
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
                        label: 'Currency Risk',
                        data: this.riskData.trends.currency,
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
                                weight: 'bold'
                            }
                        },
                        grid: {
                            color: 'rgba(0, 77, 64, 0.1)'
                        },
                        ticks: {
                            stepSize: 1,
                            color: '#004d40',
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
                            color: '#004d40'
                        }
                    }
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
                    <span class="threshold-label">Risk Threshold:</span>
                    <span class="threshold-value">3.0</span>
                </div>
            `;
            chartArea.appendChild(annotation);
        }
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

.portfolio-distribution-chart-container,
.portfolio-performance-chart-container,
.risk-distribution-chart-container,
.risk-matrix-chart-container,
.risk-trend-chart-container {
    position: relative;
}

/* Doughnut chart center text */
.doughnut-center-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    pointer-events: none;
}

.center-value {
    font-size: 1.2rem;
    font-weight: var(--font-weight-bold);
    color: var(--primary-green);
}

.center-label {
    font-size: 0.7rem;
    color: var(--text-light);
}

/* Performance indicator */
.performance-indicator {
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

/* Risk threshold badge */
.risk-threshold-badge {
    background: rgba(239, 68, 68, 0.9);
    color: white;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    gap: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.threshold-label {
    font-weight: 500;
}

.threshold-value {
    font-weight: 700;
    color: #ffffff;
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

@media (min-width: 768px) {
    .analytics-metrics {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (max-width: 480px) {
    .risk-matrix-legend {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }
    
    .risk-matrix-cell {
        padding: 6px 4px;
        font-size: 0.7rem;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', analyticsDashboardStyles);