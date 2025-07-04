// IRR Calculator Module for FinergyCloud Mobile App

class IRRCalculator {
    constructor() {
        this.savedCalculations = [];
        this.currencySymbols = {
            'NGN': '₦',
            'USD': '$',
            'EUR': '€',
            'GBP': '£'
        };
        this.currentCurrency = 'NGN';
        this.setupCalculator();
        this.loadSavedCalculations();
    }

    setupCalculator() {
        // Bind calculate button
        const calculateBtn = document.querySelector('.calculate-btn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => {
                this.performCalculation();
            });
        }

        // Setup real-time input validation
        this.setupInputValidation();
        
        // Setup chart interactions
        this.setupChartInteractions();
        
        // Setup project type change handler
        this.setupProjectTypeHandler();
        
        // Setup currency change handler
        this.setupCurrencyHandler();
    }

    setupInputValidation() {
        const inputs = document.querySelectorAll('#calculator-page input[type="number"]');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.validateInput(input);
                this.updatePreview();
            });
            
            // Add focus/blur effects for better UX
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
            });
        });
    }
    
    setupProjectTypeHandler() {
        const projectTypeSelect = document.getElementById('project-type');
        if (projectTypeSelect) {
            projectTypeSelect.addEventListener('change', () => {
                this.adjustDefaultsForProjectType(projectTypeSelect.value);
                this.updatePreview();
            });
        }
    }
    
    setupCurrencyHandler() {
        const currencySelect = document.getElementById('currency');
        if (currencySelect) {
            currencySelect.addEventListener('change', () => {
                this.currentCurrency = currencySelect.value;
                this.updatePreview();
                
                // Update any existing results with new currency
                const irrResult = document.getElementById('irr-result');
                const npvResult = document.getElementById('npv-result');
                const paybackResult = document.getElementById('payback-result');
                
                if (irrResult && irrResult.textContent !== '--') {
                    // IRR is a percentage, so no need to update
                }
                
                if (npvResult && npvResult.textContent !== '--') {
                    // Extract the numeric value and update with new currency
                    const value = npvResult.textContent.replace(/[^0-9.]/g, '');
                    if (value) {
                        npvResult.textContent = `${this.currencySymbols[this.currentCurrency]}${value}`;
                    }
                }
                
                // Payback period is in years, so no need to update
                
                // Update chart if it exists
                this.updateCashFlowChartCurrency();
            });
        }
    }
    
    updateCashFlowChartCurrency() {
        const chartContainer = document.getElementById('cashflow-chart');
        if (!chartContainer || chartContainer.classList.contains('chart-placeholder')) {
            return;
        }
        
        // Update currency in chart tooltips
        const chartBars = chartContainer.querySelectorAll('.chart-bar');
        chartBars.forEach(bar => {
            const value = bar.getAttribute('data-value');
            if (value) {
                // Extract numeric value
                const numericValue = value.replace(/[^0-9.]/g, '');
                if (numericValue) {
                    // Update with new currency symbol
                    bar.setAttribute('data-value', `${this.currencySymbols[this.currentCurrency]}${numericValue}`);
                }
            }
        });
    }
    
    adjustDefaultsForProjectType(projectType) {
        // Adjust default values based on project type
        const durationInput = document.getElementById('project-duration');
        const discountRateInput = document.getElementById('discount-rate');
        
        if (!durationInput || !discountRateInput) return;
        
        switch(projectType) {
            case 'solar':
                durationInput.placeholder = 'e.g., 25';
                discountRateInput.value = '10';
                break;
            case 'wind':
                durationInput.placeholder = 'e.g., 20';
                discountRateInput.value = '9.5';
                break;
            case 'hydro':
                durationInput.placeholder = 'e.g., 30';
                discountRateInput.value = '8.5';
                break;
            case 'biomass':
                durationInput.placeholder = 'e.g., 15';
                discountRateInput.value = '11';
                break;
            case 'geothermal':
                durationInput.placeholder = 'e.g., 35';
                discountRateInput.value = '8';
                break;
        }
    }

    validateInput(input) {
        const value = parseFloat(input.value);
        const min = parseFloat(input.getAttribute('min')) || 0;
        const max = parseFloat(input.getAttribute('max')) || Infinity;

        // Remove previous validation classes
        input.classList.remove('valid', 'invalid');

        if (isNaN(value) || value < min || value > max) {
            input.classList.add('invalid');
            return false;
        } else {
            input.classList.add('valid');
            return true;
        }
    }

    updatePreview() {
        // Show live preview of calculations as user types
        const inputs = this.getInputValues();
        if (this.validateAllInputs(inputs)) {
            const preview = this.calculatePreview(inputs);
            this.updatePreviewDisplay(preview);
        }
    }

    getInputValues() {
        return {
            projectType: document.getElementById('project-type')?.value || 'solar',
            currency: document.getElementById('currency')?.value || 'NGN',
            initialInvestment: parseFloat(document.getElementById('initial-investment')?.value) || 0,
            projectDuration: parseFloat(document.getElementById('project-duration')?.value) || 0,
            annualCashflow: parseFloat(document.getElementById('annual-cashflow')?.value) || 0,
            terminalValue: parseFloat(document.getElementById('terminal-value')?.value) || 0,
            discountRate: parseFloat(document.getElementById('discount-rate')?.value) || 10
        };
    }

    validateAllInputs(inputs) {
        return inputs.initialInvestment > 0 && 
               inputs.projectDuration > 0 && 
               inputs.annualCashflow > 0;
    }

    performCalculation() {
        const inputs = this.getInputValues();
        
        if (!this.validateAllInputs(inputs)) {
            this.showError('Please enter valid values for all fields');
            return;
        }

        // Show loading state
        this.showCalculating();

        // Simulate calculation delay for better UX
        setTimeout(() => {
            const results = this.calculateIRR(inputs);
            this.displayResults(results);
            this.saveCalculation(inputs, results);
            
            // Haptic feedback on success (if available)
            if (navigator.vibrate) {
                navigator.vibrate(100);
            }
        }, 1000);
    }

    calculateIRR(inputs) {
        const { initialInvestment, projectDuration, annualCashflow, terminalValue, discountRate, currency } = inputs;
        
        // Create cash flow array
        const cashFlows = [-initialInvestment]; // Initial investment as negative
        
        // Add annual cash flows
        for (let i = 1; i < projectDuration; i++) {
            cashFlows.push(annualCashflow);
        }
        
        // Add final year with terminal value
        cashFlows.push(annualCashflow + terminalValue);

        // Calculate IRR using Newton-Raphson method
        const irr = this.newtonRaphsonIRR(cashFlows);
        
        // Calculate NPV at specified discount rate
        const npv = this.calculateNPV(cashFlows, discountRate / 100);
        
        // Calculate payback period
        const paybackPeriod = this.calculatePaybackPeriod(cashFlows);

        return {
            irr: irr,
            npv: npv,
            paybackPeriod: paybackPeriod,
            cashFlows: cashFlows,
            totalInvestment: initialInvestment,
            totalReturns: (annualCashflow * projectDuration) + terminalValue,
            projectType: inputs.projectType,
            currency: currency
        };
    }

    newtonRaphsonIRR(cashFlows, guess = 0.1, maxIterations = 100, tolerance = 1e-6) {
        let rate = guess;
        
        for (let i = 0; i < maxIterations; i++) {
            const npv = this.calculateNPV(cashFlows, rate);
            const npvDerivative = this.calculateNPVDerivative(cashFlows, rate);
            
            if (Math.abs(npv) < tolerance) {
                return rate;
            }
            
            if (Math.abs(npvDerivative) < tolerance) {
                break; // Avoid division by zero
            }
            
            rate = rate - (npv / npvDerivative);
        }
        
        return rate;
    }

    calculateNPV(cashFlows, rate) {
        return cashFlows.reduce((npv, cashFlow, period) => {
            return npv + (cashFlow / Math.pow(1 + rate, period));
        }, 0);
    }

    calculateNPVDerivative(cashFlows, rate) {
        return cashFlows.reduce((derivative, cashFlow, period) => {
            if (period === 0) return derivative;
            return derivative - (period * cashFlow / Math.pow(1 + rate, period + 1));
        }, 0);
    }

    calculatePaybackPeriod(cashFlows) {
        let cumulativeCashFlow = 0;
        
        for (let i = 0; i < cashFlows.length; i++) {
            cumulativeCashFlow += cashFlows[i];
            if (cumulativeCashFlow >= 0) {
                // Interpolate for more accurate payback period
                const previousCumulative = cumulativeCashFlow - cashFlows[i];
                const fraction = -previousCumulative / cashFlows[i];
                return i - 1 + fraction;
            }
        }
        
        return cashFlows.length; // Payback period exceeds project duration
    }

    calculatePreview(inputs) {
        // Quick preview calculation
        const { initialInvestment, annualCashflow, projectDuration, projectType, discountRate, currency } = inputs;
        const totalReturns = annualCashflow * projectDuration;
        const simpleROI = ((totalReturns - initialInvestment) / initialInvestment) * 100;
        
        // Adjust ROI based on project type for more realistic preview
        let adjustedROI = simpleROI;
        switch(projectType) {
            case 'solar':
                // Solar is baseline
                break;
            case 'wind':
                adjustedROI *= 1.05; // Wind typically has higher ROI
                break;
            case 'hydro':
                adjustedROI *= 0.95; // Hydro has lower ROI but longer lifespan
                break;
            case 'biomass':
                adjustedROI *= 0.9; // Biomass has lower ROI due to fuel costs
                break;
            case 'geothermal':
                adjustedROI *= 1.1; // Geothermal has higher ROI but higher upfront costs
                break;
        }
        
        // Simple NPV calculation for preview
        const npv = -initialInvestment + (annualCashflow * (1 - Math.pow(1 + (discountRate/100), -projectDuration)) / (discountRate/100));
        
        return {
            simpleROI: adjustedROI,
            totalReturns: totalReturns,
            estimatedNPV: npv,
            projectType: projectType,
            currency: currency
        };
    }

    updatePreviewDisplay(preview) {
        // Update preview in UI (if preview element exists)
        const previewElement = document.querySelector('.calculation-preview');
        if (previewElement) {
            const currencySymbol = this.currencySymbols[preview.currency] || '₦';
            
            previewElement.innerHTML = `
                <div class="preview-metric">
                    <span>Simple ROI</span>
                    <span class="text-primary">${preview.simpleROI.toFixed(1)}%</span>
                </div>
                <div class="preview-metric">
                    <span>Total Returns</span>
                    <span class="text-primary">${currencySymbol}${this.formatNumber(preview.totalReturns)}</span>
                </div>
                <div class="preview-metric">
                    <span>Estimated NPV</span>
                    <span class="text-primary">${currencySymbol}${this.formatNumber(preview.estimatedNPV)}</span>
                </div>
                <div class="preview-metric">
                    <span>Project Type</span>
                    <span class="text-primary">${this.capitalizeFirstLetter(preview.projectType)}</span>
                </div>
            `;
        }
    }
    
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    showCalculating() {
        const calculateBtn = document.querySelector('.calculate-btn');
        if (calculateBtn) {
            calculateBtn.innerHTML = `
                <div class="loading-spinner"></div>
                Calculating...
            `;
            calculateBtn.disabled = true;
        }
    }

    displayResults(results) {
        // Reset calculate button
        const calculateBtn = document.querySelector('.calculate-btn');
        if (calculateBtn) {
            calculateBtn.innerHTML = `
                <i class="bi bi-calculator"></i>
                Calculate IRR
            `;
            calculateBtn.disabled = false;
        }

        // Get currency symbol
        const currencySymbol = this.currencySymbols[results.currency] || '₦';

        // Update result displays
        this.updateResultElement('irr-result', `${(results.irr * 100).toFixed(2)}%`);
        this.updateResultElement('npv-result', `${currencySymbol}${this.formatNumber(results.npv)}`);
        this.updateResultElement('payback-result', `${results.paybackPeriod.toFixed(1)} years`);

        // Create cash flow chart
        this.createCashFlowChart(results.cashFlows, results.projectType, results.currency);

        // Show success animation
        this.animateResults();
    }

    updateResultElement(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            // Animate the value change
            element.style.transform = 'scale(1.2)';
            element.style.color = 'var(--accent-teal)';
            
            setTimeout(() => {
                element.textContent = value;
                element.style.transform = 'scale(1)';
                element.style.color = 'var(--primary-green)';
            }, 200);
        }
    }

    createCashFlowChart(cashFlows, projectType, currency) {
        const chartContainer = document.getElementById('cashflow-chart');
        if (!chartContainer) return;

        // Clear placeholder
        chartContainer.classList.remove('chart-placeholder');
        chartContainer.innerHTML = '';

        // Get color based on project type
        const barColor = this.getProjectTypeColor(projectType);
        
        // Get currency symbol
        const currencySymbol = this.currencySymbols[currency] || '₦';

        // Simple bar chart implementation
        const maxValue = Math.max(...cashFlows.map(Math.abs));
        const chartHTML = `
            <div class="chart-wrapper">
                <div class="chart-title">Cash Flow Projection (${this.capitalizeFirstLetter(projectType)})</div>
                <div class="chart-content">
                    <div class="chart-container-inner">
                        <div class="chart-bars">
                            ${cashFlows.map((value, index) => {
                                const height = Math.abs(value) / maxValue * 100;
                                const isNegative = value < 0;
                                
                                return `
                                    <div class="chart-bar-wrapper">
                                        <div class="chart-bar ${isNegative ? 'negative' : 'positive'}" 
                                            style="height: ${height}%; bottom: ${isNegative ? height : 0}%; ${!isNegative ? `background: ${barColor};` : ''}"
                                            data-value="${currencySymbol}${this.formatNumber(value)}"
                                            data-label="Year ${index}">
                                        </div>
                                        <div class="chart-label">Y${index}</div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        chartContainer.innerHTML = chartHTML;
        
        // Add tooltip interactions
        this.setupChartInteractions();
    }
    
    getProjectTypeColor(projectType) {
        switch(projectType) {
            case 'solar':
                return '#FFC107'; // Yellow/gold for solar
            case 'wind':
                return '#00BFA5'; // Teal for wind
            case 'hydro':
                return '#2196F3'; // Blue for hydro
            case 'biomass':
                return '#8BC34A'; // Green for biomass
            case 'geothermal':
                return '#FF5722'; // Orange/red for geothermal
            default:
                return '#28a745'; // Default green
        }
    }

    setupChartInteractions() {
        // Add hover/touch tooltips to chart bars
        document.querySelectorAll('.chart-bar').forEach(bar => {
            // For mouse devices
            bar.addEventListener('mouseenter', (e) => {
                this.showChartTooltip(e.target);
            });
            
            bar.addEventListener('mouseleave', () => {
                this.hideChartTooltip();
            });
            
            // For touch devices
            bar.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.showChartTooltip(e.target);
            }, { passive: false });
            
            bar.addEventListener('touchend', () => {
                setTimeout(() => {
                    this.hideChartTooltip();
                }, 2000);
            });
        });
    }

    showChartTooltip(element) {
        // Remove any existing tooltips
        this.hideChartTooltip();
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'chart-tooltip';
        tooltip.textContent = `${element.dataset.label}: ${element.dataset.value}`;
        document.body.appendChild(tooltip);
        
        // Position tooltip
        const rect = element.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
        
        // Show tooltip
        setTimeout(() => {
            tooltip.classList.add('show');
        }, 10);
    }

    hideChartTooltip() {
        const tooltip = document.querySelector('.chart-tooltip');
        if (tooltip) {
            tooltip.classList.remove('show');
            setTimeout(() => {
                tooltip.remove();
            }, 300);
        }
    }

    animateResults() {
        const resultCards = document.querySelectorAll('.result-metric');
        resultCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'pulse 0.5s ease';
                
                // Remove animation after it completes
                setTimeout(() => {
                    card.style.animation = '';
                }, 500);
            }, index * 100);
        });
    }

    formatNumber(number) {
        if (Math.abs(number) >= 1e9) {
            return (number / 1e9).toFixed(1) + 'B';
        } else if (Math.abs(number) >= 1e6) {
            return (number / 1e6).toFixed(1) + 'M';
        } else if (Math.abs(number) >= 1e3) {
            return (number / 1e3).toFixed(1) + 'K';
        } else {
            return number.toFixed(0);
        }
    }

    saveCalculation(inputs, results) {
        const calculation = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            inputs: inputs,
            results: {
                irr: results.irr,
                npv: results.npv,
                paybackPeriod: results.paybackPeriod,
                totalReturns: results.totalReturns,
                projectType: inputs.projectType,
                currency: inputs.currency
            },
            projectName: `${this.capitalizeFirstLetter(inputs.projectType)} Project ${this.savedCalculations.length + 1}`
        };

        // Add to saved calculations
        this.savedCalculations.unshift(calculation);
        
        // Keep only last 10 calculations
        if (this.savedCalculations.length > 10) {
            this.savedCalculations.splice(10);
        }
        
        // Save to localStorage
        localStorage.setItem('savedCalculations', JSON.stringify(this.savedCalculations));
        
        // Show success message
        this.showSaveSuccess();
    }

    loadSavedCalculations() {
        try {
            const saved = JSON.parse(localStorage.getItem('savedCalculations') || '[]');
            this.savedCalculations = saved;
            console.log(`Loaded ${this.savedCalculations.length} saved calculations`);
        } catch (error) {
            console.error('Error loading saved calculations:', error);
            this.savedCalculations = [];
        }
    }

    showSaveSuccess() {
        // Show a success message that calculation was saved
        const toast = document.createElement('div');
        toast.className = 'mobile-toast success';
        toast.innerHTML = `
            <div class="toast-content">
                <i class="bi bi-check-circle"></i>
                <span>Calculation saved successfully</span>
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

    showError(message) {
        // Create error toast
        const toast = document.createElement('div');
        toast.className = 'mobile-toast warning';
        toast.innerHTML = `
            <div class="toast-content">
                <i class="bi bi-exclamation-triangle"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
        
        // Vibrate for error (if available)
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
    }
}

// Initialize calculator when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.irrCalculator = new IRRCalculator();
});

// Global function for calculate button
function calculateIRR() {
    if (window.irrCalculator) {
        window.irrCalculator.performCalculation();
    }
}

// Add calculator styles
const calculatorStyles = `
<style>
/* Calculator Specific Styles */
.calculator-form {
    position: relative;
}

.form-group.focused label {
    color: var(--accent-teal);
}

.calculation-preview {
    background: var(--light-green);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    margin-bottom: var(--spacing-lg);
    border-left: 4px solid var(--accent-teal);
}

.preview-metric {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    color: var(--text-dark);
    margin-bottom: var(--spacing-xs);
}

.preview-metric:last-child {
    margin-bottom: 0;
}

.calculate-btn {
    position: relative;
    overflow: hidden;
}

.calculate-btn:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transform: translateX(-100%);
}

.calculate-btn:hover:after {
    animation: button-shine 1.5s infinite;
}

@keyframes button-shine {
    100% {
        transform: translateX(100%);
    }
}

.result-metric {
    position: relative;
    overflow: hidden;
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

/* Chart Styles */
.chart-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.chart-title {
    font-weight: var(--font-weight-semibold);
    color: var(--primary-green);
    margin-bottom: var(--spacing-md);
    text-align: center;
    font-size: 1rem;
}

.chart-content {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.chart-container-inner {
    position: relative;
    height: 200px;
    width: 100%;
    padding-bottom: 30px;
    overflow-x: auto;
    overflow-y: hidden;
}

.chart-bars {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    padding: 0 var(--spacing-sm);
    min-width: 300px;
}

.chart-bar-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    height: 100%;
    min-width: 30px;
    position: relative;
}

.chart-bar {
    width: 100%;
    max-width: 20px;
    border-radius: 2px 2px 0 0;
    transition: opacity 0.3s ease;
    cursor: pointer;
    position: absolute;
    bottom: 0;
}

.chart-bar.positive {
    background: var(--success);
}

.chart-bar.negative {
    background: var(--danger);
}

.chart-bar:hover {
    opacity: 0.8;
}

.chart-label {
    font-size: 0.7rem;
    color: var(--gray);
    margin-top: var(--spacing-xs);
    text-align: center;
    position: absolute;
    bottom: -25px;
    width: 100%;
}

.chart-tooltip {
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    font-size: 0.8rem;
    pointer-events: none;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.chart-tooltip.show {
    opacity: 1;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', calculatorStyles);