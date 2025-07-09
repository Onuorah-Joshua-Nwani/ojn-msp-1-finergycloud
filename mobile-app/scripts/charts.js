// Charts Module for FinergyCloud Mobile App

class ChartsManager {
    constructor() {
        this.charts = {};
        // Load Chart.js first, then initialize charts
        this.loadChartJS(() => {
            this.initializeCharts();
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

    initializeCharts() {
        // Initialize chart containers when they become visible
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const chartId = entry.target.id;
                    this.createChart(chartId);
                    observer.unobserve(entry.target);
                }
            });
        });

        // Observe all chart containers
        document.querySelectorAll('[id$="-chart"]').forEach(container => {
            observer.observe(container);
        });
    }

    createChart(chartId) {
        switch (chartId) {
            case 'cashflow-chart':
                this.createCashFlowChart(chartId);
                break;
            case 'portfolio-chart':
                this.createPortfolioChart(chartId);
                break;
            case 'performance-chart':
                this.createPerformanceChart(chartId);
                break;
            case 'risk-chart':
                this.createRiskChart(chartId);
                break;
            default:
                this.createDefaultChart(chartId);
        }
    }

    createCashFlowChart(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Sample cash flow data
        const data = [-1000000, 150000, 150000, 150000, 150000, 150000, 150000, 150000, 150000, 150000, 650000];
        const labels = data.map((_, index) => `Year ${index}`);

        this.renderBarChart(container, {
            labels: labels,
            data: data,
            title: 'Cash Flow Projection',
            colors: {
                positive: '#28a745',
                negative: '#dc3545'
            }
        });
    }

    createPortfolioChart(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Sample portfolio data
        const data = [
            { label: 'Solar', value: 45, color: '#ffc107' },
            { label: 'Wind', value: 35, color: '#00bfa5' },
            { label: 'Hydro', value: 15, color: '#004d40' },
            { label: 'Other', value: 5, color: '#6c757d' }
        ];

        this.renderPieChart(container, {
            data: data,
            title: 'Portfolio Distribution'
        });
    }

    createPerformanceChart(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Sample performance data
        const data = [12.5, 13.2, 14.1, 13.8, 14.5, 15.2, 14.8, 15.1, 14.9, 15.3, 14.7, 15.0];
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        this.renderLineChart(container, {
            labels: labels,
            data: data,
            title: 'IRR Performance Trend',
            color: '#00bfa5'
        });
    }

    createRiskChart(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Sample risk data
        const data = [
            { label: 'Low Risk', value: 30, color: '#28a745' },
            { label: 'Medium Risk', value: 50, color: '#ffc107' },
            { label: 'High Risk', value: 20, color: '#dc3545' }
        ];

        this.renderDonutChart(container, {
            data: data,
            title: 'Risk Distribution'
        });
    }

    renderBarChart(container, options) {
        const { labels, data, title, colors } = options;
        
        // Check if Chart.js is available
        if (!window.Chart) {
            this.renderFallbackChart(container, title);
            return;
        }
        
        const maxValue = Math.max(...data.map(Math.abs));
        const minValue = Math.min(...data);
        
        container.innerHTML = `
            <div class="chart-wrapper">
                <div class="chart-title">${title}</div>
                <div class="chart-content">
                    <div class="chart-bars-container">
                        ${data.map((value, index) => {
                            const height = Math.abs(value) / maxValue * 80;
                            const isNegative = value < 0;
                            const color = isNegative ? colors.negative : colors.positive;
                            
                            return `
                                <div class="chart-bar-wrapper">
                                    <div class="chart-bar" 
                                         style="height: ${height}%; background-color: ${color}; ${isNegative ? 'align-self: flex-end;' : ''}"
                                         data-value="${this.formatChartValue(value)}"
                                         data-label="${labels[index]}">
                                    </div>
                                    <div class="chart-label">${labels[index].replace('Year ', 'Y')}</div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;

        // Add hover effects
        this.addBarChartInteractions(container);
    }

    renderLineChart(container, options) {
        const { labels, data, title, color } = options;
        
        // Check if Chart.js is available
        if (!window.Chart) {
            this.renderFallbackChart(container, title);
            return;
        }
        
        const maxValue = Math.max(...data);
        const minValue = Math.min(...data);
        const range = maxValue - minValue;
        
        // Create SVG path
        const points = data.map((value, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - ((value - minValue) / range) * 80;
            return `${x},${y}`;
        }).join(' ');

        container.innerHTML = `
            <div class="chart-wrapper">
                <div class="chart-title">${title}</div>
                <div class="chart-content">
                    <svg class="line-chart" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polyline points="${points}" 
                                  fill="none" 
                                  stroke="${color}" 
                                  stroke-width="2" 
                                  vector-effect="non-scaling-stroke"/>
                        ${data.map((value, index) => {
                            const x = (index / (data.length - 1)) * 100;
                            const y = 100 - ((value - minValue) / range) * 80;
                            return `<circle cx="${x}" cy="${y}" r="3" fill="${color}" vector-effect="non-scaling-stroke"/>`;
                        }).join('')}
                    </svg>
                    <div class="chart-labels">
                        ${labels.map(label => `<span class="chart-label">${label}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderPieChart(container, options) {
        const { data, title } = options;
        
        // Check if Chart.js is available
        if (!window.Chart) {
            this.renderFallbackChart(container, title);
            return;
        }
        
        const total = data.reduce((sum, item) => sum + item.value, 0);
        let currentAngle = 0;
        
        const segments = data.map(item => {
            const percentage = (item.value / total) * 100;
            const angle = (item.value / total) * 360;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            currentAngle += angle;
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            const x1 = 50 + 40 * Math.cos((startAngle - 90) * Math.PI / 180);
            const y1 = 50 + 40 * Math.sin((startAngle - 90) * Math.PI / 180);
            const x2 = 50 + 40 * Math.cos((endAngle - 90) * Math.PI / 180);
            const y2 = 50 + 40 * Math.sin((endAngle - 90) * Math.PI / 180);
            
            const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
            
            return {
                ...item,
                pathData,
                percentage: percentage.toFixed(1)
            };
        });

        container.innerHTML = `
            <div class="chart-wrapper">
                <div class="chart-title">${title}</div>
                <div class="chart-content">
                    <div class="pie-chart-container">
                        <svg class="pie-chart" viewBox="0 0 100 100">
                            ${segments.map(segment => `
                                <path d="${segment.pathData}" 
                                      fill="${segment.color}" 
                                      stroke="#fff" 
                                      stroke-width="1"
                                      data-label="${segment.label}"
                                      data-value="${segment.percentage}%"/>
                            `).join('')}
                        </svg>
                        <div class="pie-chart-legend">
                            ${segments.map(segment => `
                                <div class="legend-item">
                                    <div class="legend-color" style="background-color: ${segment.color}"></div>
                                    <span class="legend-label">${segment.label}</span>
                                    <span class="legend-value">${segment.percentage}%</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add hover effects
        this.addPieChartInteractions(container);
    }

    renderDonutChart(container, options) {
        const { data, title } = options;
        
        // Check if Chart.js is available
        if (!window.Chart) {
            this.renderFallbackChart(container, title);
            return;
        }
        
        const total = data.reduce((sum, item) => sum + item.value, 0);
        let currentAngle = 0;
        
        const segments = data.map(item => {
            const percentage = (item.value / total) * 100;
            const angle = (item.value / total) * 360;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            currentAngle += angle;
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            const outerRadius = 40;
            const innerRadius = 20;
            
            const x1 = 50 + outerRadius * Math.cos((startAngle - 90) * Math.PI / 180);
            const y1 = 50 + outerRadius * Math.sin((startAngle - 90) * Math.PI / 180);
            const x2 = 50 + outerRadius * Math.cos((endAngle - 90) * Math.PI / 180);
            const y2 = 50 + outerRadius * Math.sin((endAngle - 90) * Math.PI / 180);
            
            const x3 = 50 + innerRadius * Math.cos((endAngle - 90) * Math.PI / 180);
            const y3 = 50 + innerRadius * Math.sin((endAngle - 90) * Math.PI / 180);
            const x4 = 50 + innerRadius * Math.cos((startAngle - 90) * Math.PI / 180);
            const y4 = 50 + innerRadius * Math.sin((startAngle - 90) * Math.PI / 180);
            
            const pathData = `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`;
            
            return {
                ...item,
                pathData,
                percentage: percentage.toFixed(1)
            };
        });

        container.innerHTML = `
            <div class="chart-wrapper">
                <div class="chart-title">${title}</div>
                <div class="chart-content">
                    <div class="donut-chart-container">
                        <svg class="donut-chart" viewBox="0 0 100 100">
                            ${segments.map(segment => `
                                <path d="${segment.pathData}" 
                                      fill="${segment.color}" 
                                      stroke="#fff" 
                                      stroke-width="1"
                                      data-label="${segment.label}"
                                      data-value="${segment.percentage}%"/>
                            `).join('')}
                            <text x="50" y="50" text-anchor="middle" dominant-baseline="middle" 
                                  class="donut-center-text">${total}</text>
                        </svg>
                        <div class="donut-chart-legend">
                            ${segments.map(segment => `
                                <div class="legend-item">
                                    <div class="legend-color" style="background-color: ${segment.color}"></div>
                                    <span class="legend-label">${segment.label}</span>
                                    <span class="legend-value">${segment.percentage}%</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    addBarChartInteractions(container) {
        const bars = container.querySelectorAll('.chart-bar');
        bars.forEach(bar => {
            bar.addEventListener('mouseenter', (e) => {
                this.showTooltip(e.target, `${e.target.dataset.label}: ${e.target.dataset.value}`);
            });
            
            bar.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }

    addPieChartInteractions(container) {
        const segments = container.querySelectorAll('path');
        segments.forEach(segment => {
            segment.addEventListener('mouseenter', (e) => {
                e.target.style.opacity = '0.8';
                this.showTooltip(e.target, `${e.target.dataset.label}: ${e.target.dataset.value}`);
            });
            
            segment.addEventListener('mouseleave', (e) => {
                e.target.style.opacity = '1';
                this.hideTooltip();
            });
        });
    }

    showTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'chart-tooltip';
        tooltip.textContent = text;
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        
        setTimeout(() => {
            tooltip.classList.add('show');
        }, 10);
    }

    hideTooltip() {
        const tooltip = document.querySelector('.chart-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    formatChartValue(value) {
        if (Math.abs(value) >= 1e6) {
            return (value / 1e6).toFixed(1) + 'M';
        } else if (Math.abs(value) >= 1e3) {
            return (value / 1e3).toFixed(1) + 'K';
        } else {
            return value.toFixed(0);
        }
    }

    createDefaultChart(containerId) {
        this.renderFallbackChart(document.getElementById(containerId), "Chart");
    }
    
    renderFallbackChart(container, title) {
        // Create a fallback visualization when Chart.js is not available
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="chart-placeholder">
                <i class="bi bi-graph-up"></i>
                <p>${title || 'Chart'} will be displayed here</p>
                <small>Loading visualization...</small>
            </div>
        `;
    }

    // Method to update chart data dynamically
    updateChart(chartId, newData) {
        if (this.charts[chartId]) {
            // Update existing chart with new data
            this.createChart(chartId);
        }
    }

    // Method to destroy chart
    destroyChart(chartId) {
        const container = document.getElementById(chartId);
        if (container) {
            container.innerHTML = '';
        }
        delete this.charts[chartId];
    }
}

// Initialize charts manager
document.addEventListener('DOMContentLoaded', () => {
    window.chartsManager = new ChartsManager();
        .chart-title {
            font-weight: 600;
            color: var(--primary-green);
            margin-bottom: 1rem;
            text-align: center;
        }
        
        .chart-content {
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        
        .chart-bars-container {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            height: 150px;
            gap: 4px;
            margin-bottom: 1rem;
        }
        
        .chart-bar-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
            height: 100%;
        }
        
        .chart-bar {
            width: 100%;
            max-width: 20px;
            border-radius: 2px 2px 0 0;
            transition: opacity 0.3s ease;
            cursor: pointer;
        }
        
        .chart-bar:hover {
            opacity: 0.8;
        }
        
        .chart-label {
            font-size: 0.7rem;
            color: var(--gray);
            margin-top: 0.5rem;
            text-align: center;
        }
        
        .line-chart {
            width: 100%;
            height: 150px;
            margin-bottom: 1rem;
        }
        
        .pie-chart-container,
        .donut-chart-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }
        
        .pie-chart,
        .donut-chart {
            width: 150px;
            height: 150px;
        }
        
        .donut-center-text {
            font-size: 12px;
            font-weight: 600;
            fill: var(--primary-green);
        }
        
        .pie-chart-legend,
        .donut-chart-legend {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            width: 100%;
        }
        
        .legend-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
        }
        
        .legend-color {
            width: 12px;
            height: 12px;
            border-radius: 2px;
        }
        
        .legend-label {
            flex: 1;
            color: var(--dark-gray);
        }
        
        .legend-value {
            font-weight: 600;
            color: var(--primary-green);
        }
        
        .chart-placeholder {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 150px;
            color: var(--gray);
            text-align: center;
        }
        
        .chart-placeholder i {
            font-size: 2rem;
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
        }
        
        .chart-placeholder small {
            color: var(--text-muted);
            font-size: 0.8rem;
        }
        
        .chart-tooltip {
            position: absolute;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 0.5rem;
            border-radius: 4px;
            font-size: 0.8rem;
            pointer-events: none;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .chart-tooltip.show {
            opacity: 1;
        }
        
        @media (max-width: 480px) {
            .chart-bars-container {
                height: 120px;
            }
            
            .pie-chart,
            .donut-chart {
                width: 120px;
                height: 120px;
            }
            
            .chart-label {
                font-size: 0.6rem;
            }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', chartStyles);