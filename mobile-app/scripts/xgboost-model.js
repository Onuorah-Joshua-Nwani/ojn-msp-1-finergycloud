// XGBoost Model Integration for FinergyCloud Mobile App

class XGBoostModelManager {
    constructor() {
        this.modelLoaded = false;
        this.modelAccuracy = 0.87;
        this.modelAUC = 0.92;
        this.keyFeatures = 14;
        this.featureImportance = {
            'Grid Stability': 0.92,
            'Community Engagement': 0.85,
            'Regulatory Navigation': 0.78,
            'Solar Irradiation': 0.65,
            'Equipment Quality': 0.61,
            'Local Workforce': 0.58,
            'Political Stability': 0.52,
            'Currency Risk': 0.49,
            'Land Rights': 0.47,
            'Grid Connection': 0.45,
            'Weather Patterns': 0.42,
            'Maintenance Plan': 0.39,
            'Financing Structure': 0.37,
            'Technology Type': 0.35
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadModelMetadata();
        this.setupModelVisualizations();
    }

    setupEventListeners() {
        // Listen for page activation
        document.addEventListener('pageActivated', (e) => {
            if (e.detail.pageId === 'xgboost') {
                this.refreshModelContent();
            }
        });

        // Add model page navigation if not already present
        this.addModelNavigation();
    }

    addModelNavigation() {
        // Add XGBoost model to side navigation if not already present
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && !document.querySelector('.nav-link[data-page="xgboost"]')) {
            const modelNavItem = document.createElement('li');
            modelNavItem.className = 'nav-item';
            modelNavItem.innerHTML = `
                <a href="#xgboost" class="nav-link" data-page="xgboost">
                    <i class="bi bi-cpu"></i>
                    <span>XGBoost Model</span>
                </a>
            `;
            navMenu.appendChild(modelNavItem);
        }

        // Add XGBoost to bottom navigation if not already present
        const bottomNav = document.querySelector('.bottom-nav');
        if (bottomNav && !document.querySelector('.nav-btn[data-page="xgboost"]') && bottomNav.children.length < 5) {
            const modelNavBtn = document.createElement('button');
            modelNavBtn.className = 'nav-btn';
            modelNavBtn.setAttribute('data-page', 'xgboost');
            modelNavBtn.innerHTML = `
                <i class="bi bi-cpu"></i>
                <span>AI</span>
            `;
            bottomNav.appendChild(modelNavBtn);
            
            // Re-attach event listeners
            modelNavBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (window.finergyApp) {
                    window.finergyApp.navigateToPage('xgboost');
                }
            });
        }
    }

    loadModelMetadata() {
        // Simulate loading model metadata
        setTimeout(() => {
            this.modelLoaded = true;
            this.showModelLoadedStatus();
        }, 1500);
    }

    showModelLoadedStatus() {
        if (this.modelLoaded) {
            const statusElement = document.getElementById('model-status');
            if (statusElement) {
                statusElement.innerHTML = `
                    <div class="model-status-badge success">
                        <i class="bi bi-check-circle"></i>
                        <span>Model Loaded</span>
                    </div>
                `;
            }
        }
    }

    refreshModelContent() {
        this.updateModelStats();
        this.updateFeatureImportance();
        this.updateModelPerformance();
        this.updateCaseStudies();
    }

    updateModelStats() {
        // Update model statistics in the UI
        const modelStatValues = document.querySelectorAll('.model-stat-value');
        if (modelStatValues.length >= 3) {
            modelStatValues[0].textContent = `${this.modelAUC * 100}%`;
            modelStatValues[1].textContent = `${this.modelAccuracy * 100}%`;
            modelStatValues[2].textContent = this.keyFeatures;
        }
    }

    updateFeatureImportance() {
        // Update feature importance bars
        const featureImportanceContainer = document.querySelector('.feature-importance');
        if (featureImportanceContainer) {
            featureImportanceContainer.innerHTML = '';
            
            // Get top features
            const topFeatures = Object.entries(this.featureImportance)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 4);
            
            topFeatures.forEach(([feature, importance]) => {
                const featureItem = document.createElement('div');
                featureItem.className = 'feature-item';
                featureItem.innerHTML = `
                    <div class="feature-name">${feature}</div>
                    <div class="feature-bar-container">
                        <div class="feature-bar" style="width: ${importance * 100}%"></div>
                        <span class="feature-value">${Math.round(importance * 100)}%</span>
                    </div>
                `;
                featureImportanceContainer.appendChild(featureItem);
            });
        }
    }

    updateModelPerformance() {
        // Update model performance chart
        const performanceChart = document.getElementById('model-performance-chart');
        if (performanceChart) {
            performanceChart.classList.remove('chart-placeholder');
            performanceChart.innerHTML = this.createPerformanceChart();
        }
    }

    createPerformanceChart() {
        // Create a simple ROC curve visualization
        return `
            <div class="performance-chart">
                <div class="chart-title">ROC Curve (AUC = ${this.modelAUC})</div>
                <div class="roc-curve">
                    <svg viewBox="0 0 100 100" width="100%" height="250">
                        <!-- Diagonal line (random classifier) -->
                        <line x1="0" y1="0" x2="100" y2="100" stroke="#ccc" stroke-width="1" stroke-dasharray="4" />
                        
                        <!-- ROC curve (our model) -->
                        <path d="M0,0 Q30,50 60,80 T100,100" fill="none" stroke="var(--accent-teal)" stroke-width="3" />
                        
                        <!-- Axes -->
                        <line x1="0" y1="100" x2="100" y2="100" stroke="#333" stroke-width="1" />
                        <line x1="0" y1="100" x2="0" y2="0" stroke="#333" stroke-width="1" />
                        
                        <!-- Labels -->
                        <text x="50" y="115" text-anchor="middle" font-size="10">False Positive Rate</text>
                        <text x="-50" y="50" text-anchor="middle" font-size="10" transform="rotate(-90,0,50)">True Positive Rate</text>
                        
                        <!-- AUC indicator -->
                        <circle cx="60" cy="80" r="3" fill="var(--primary-green)" />
                    </svg>
                </div>
                <div class="chart-legend">
                    <div class="legend-item">
                        <div class="legend-color" style="background: var(--accent-teal)"></div>
                        <span>Our XGBoost Model (AUC = ${this.modelAUC})</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color" style="background: #ccc"></div>
                        <span>Random Classifier (AUC = 0.5)</span>
                    </div>
                </div>
            </div>
        `;
    }

    updateCaseStudies() {
        // Update case studies section
        // This would typically load from an API or local storage
    }

    predictProjectSuccess(projectData) {
        // Simulate XGBoost prediction
        if (!this.modelLoaded) {
            this.showToast('Model not fully loaded yet. Please try again.', 'warning');
            return null;
        }
        
        // In a real app, this would call an API or use a local model
        // For demo purposes, we'll simulate a prediction
        const baseIRR = 0.15; // 15% base IRR
        
        // Apply feature adjustments
        let adjustedIRR = baseIRR;
        
        if (projectData.gridStability === 'high') {
            adjustedIRR += 0.03;
        } else if (projectData.gridStability === 'low') {
            adjustedIRR -= 0.04;
        }
        
        if (projectData.communityEngagement === 'extensive') {
            adjustedIRR += 0.023;
        } else if (projectData.communityEngagement === 'minimal') {
            adjustedIRR -= 0.02;
        }
        
        // Add some randomness to simulate model variance
        adjustedIRR += (Math.random() * 0.02 - 0.01);
        
        // Calculate success probability
        const successProbability = 0.7 + (adjustedIRR - baseIRR) * 5;
        
        return {
            predictedIRR: adjustedIRR,
            successProbability: Math.min(Math.max(successProbability, 0), 1),
            riskLevel: this.getRiskLevel(successProbability),
            keyFactors: this.getKeyFactors(projectData)
        };
    }

    getRiskLevel(successProbability) {
        if (successProbability > 0.8) {
            return 'Low Risk';
        } else if (successProbability > 0.6) {
            return 'Medium Risk';
        } else {
            return 'High Risk';
        }
    }

    getKeyFactors(projectData) {
        // Return key factors affecting the prediction
        const factors = [];
        
        if (projectData.gridStability === 'high') {
            factors.push('Strong grid stability is a positive factor');
        } else if (projectData.gridStability === 'low') {
            factors.push('Poor grid stability increases risk');
        }
        
        if (projectData.communityEngagement === 'extensive') {
            factors.push('Excellent community engagement improves returns');
        } else if (projectData.communityEngagement === 'minimal') {
            factors.push('Limited community engagement increases risk');
        }
        
        return factors;
    }

    setupModelVisualizations() {
        // Set up interactive visualizations for the model
        // This would typically use a charting library
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

// Initialize XGBoost model manager
document.addEventListener('DOMContentLoaded', () => {
    window.xgboostModel = new XGBoostModelManager();
});

// Add XGBoost model styles
const xgboostModelStyles = `
<style>
/* XGBoost Model Page Styles */
.model-status-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-md);
    font-size: 0.9rem;
    font-weight: var(--font-weight-medium);
    margin-bottom: 1rem;
}

.model-status-badge.success {
    background: rgba(40, 167, 69, 0.1);
    color: var(--success);
}

.model-status-badge.warning {
    background: rgba(255, 193, 7, 0.1);
    color: var(--warning);
}

.model-status-badge.error {
    background: rgba(220, 53, 69, 0.1);
    color: var(--danger);
}

.performance-chart {
    width: 100%;
    height: 100%;
}

.roc-curve {
    width: 100%;
    height: 250px;
    margin-bottom: 1rem;
}

.chart-legend {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
}

.legend-color {
    width: 20px;
    height: 10px;
    border-radius: 2px;
}

.model-upload-form {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(0, 77, 64, 0.1);
}

.model-upload-form h4 {
    margin-bottom: 1rem;
    color: var(--primary-green);
}

.upload-dropzone {
    border: 2px dashed rgba(0, 77, 64, 0.2);
    border-radius: var(--radius-md);
    padding: 2rem;
    text-align: center;
    margin-bottom: 1rem;
    cursor: pointer;
    transition: var(--transition-fast);
}

.upload-dropzone:hover {
    border-color: var(--accent-teal);
    background: rgba(0, 77, 64, 0.05);
}

.upload-icon {
    font-size: 2rem;
    color: var(--accent-teal);
    margin-bottom: 1rem;
}

.upload-text {
    color: var(--text-dark);
    margin-bottom: 0.5rem;
}

.upload-hint {
    font-size: 0.8rem;
    color: var(--text-light);
}

.prediction-result {
    background: var(--light-green);
    border-radius: var(--radius-md);
    padding: 1.5rem;
    margin-top: 1.5rem;
}

.prediction-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.prediction-title {
    font-size: 1.1rem;
    font-weight: var(--font-weight-semibold);
    color: var(--primary-green);
    margin: 0;
}

.prediction-timestamp {
    font-size: 0.8rem;
    color: var(--text-light);
}

.prediction-metrics {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;
}

.prediction-metric {
    background: rgba(255, 255, 255, 0.5);
    padding: 1rem;
    border-radius: var(--radius-sm);
    text-align: center;
}

.prediction-metric-value {
    font-size: 1.25rem;
    font-weight: var(--font-weight-bold);
    color: var(--primary-green);
    margin-bottom: 0.25rem;
}

.prediction-metric-label {
    font-size: 0.8rem;
    color: var(--text-dark);
}

.key-factors {
    margin-top: 1rem;
}

.key-factors h5 {
    font-size: 1rem;
    color: var(--primary-green);
    margin-bottom: 0.5rem;
}

.factor-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
}

.factor-item i {
    color: var(--accent-teal);
}

@media (max-width: 480px) {
    .prediction-metrics {
        grid-template-columns: 1fr;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', xgboostModelStyles);