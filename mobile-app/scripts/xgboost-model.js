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
        this.projectTypeFeatures = {
            'solar': ['Solar Irradiation', 'Grid Stability', 'Land Rights', 'Equipment Quality'],
            'wind': ['Wind Speed Consistency', 'Grid Connection', 'Land Rights', 'Turbine Quality'],
            'hydro': ['Water Flow Stability', 'Environmental Impact', 'Regulatory Navigation', 'Dam Construction'],
            'biomass': ['Feedstock Supply', 'Processing Efficiency', 'Waste Management', 'Emissions Control'],
            'geothermal': ['Resource Temperature', 'Drilling Success', 'Reservoir Management', 'Plant Efficiency']
        };
        this.rocCurveChart = null;
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
        
        // Set up prediction button
        document.addEventListener('DOMContentLoaded', () => {
            const predictBtn = document.getElementById('predict-btn');
            if (predictBtn) {
                predictBtn.addEventListener('click', () => {
                    this.runPrediction();
                });
            }
            
            // Set up project type change handler
            const projectTypeSelect = document.getElementById('project-type-xgboost');
            if (projectTypeSelect) {
                projectTypeSelect.addEventListener('change', () => {
                    this.updateFeatureImportanceForProjectType(projectTypeSelect.value);
                });
            }
        });
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
        // Get current project type
        const projectTypeSelect = document.getElementById('project-type-xgboost');
        const projectType = projectTypeSelect ? projectTypeSelect.value : 'solar';
        
        this.updateFeatureImportanceForProjectType(projectType);
    }
    
    updateFeatureImportanceForProjectType(projectType) {
        // Update feature importance bars based on project type
        const featureImportanceContainer = document.querySelector('.feature-importance');
        if (!featureImportanceContainer) {
            console.log('Feature importance container not found');
            return;
        }
        
        featureImportanceContainer.innerHTML = '';
        
        // Get features for this project type
        const relevantFeatures = this.projectTypeFeatures[projectType] || this.projectTypeFeatures['solar'];
        
        // Create a combined feature importance object with project-specific features
        const combinedFeatures = {};
        
        // Add project-specific features with high importance
        relevantFeatures.forEach((feature, index) => {
            combinedFeatures[feature] = 0.9 - (index * 0.05); // Decreasing importance
        });
        
        // Add some general features
        combinedFeatures['Community Engagement'] = 0.85;
        combinedFeatures['Regulatory Navigation'] = 0.79;
        combinedFeatures['Political Stability'] = 0.52;
        combinedFeatures['Currency Risk'] = 0.49;
        
        // Get top features
        const topFeatures = Object.entries(combinedFeatures)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6);
        
        topFeatures.forEach(([feature, importance]) => {
            const featureItem = document.createElement('div');
            featureItem.className = 'feature-item';
            
            // Determine color based on importance
            let barColor;
            if (importance > 0.8) {
                barColor = '#10B981'; // High importance - green
            } else if (importance > 0.6) {
                barColor = '#00bfa5'; // Medium-high importance - teal
            } else if (importance > 0.4) {
                barColor = '#3B82F6'; // Medium importance - blue
            } else {
                barColor = '#9CA3AF'; // Lower importance - gray
            }
            
            featureItem.innerHTML = `
                <div class="feature-name">${feature}</div>
                <div class="feature-bar-container">
                    <div class="feature-bar" style="width: ${importance * 100}%; background-color: ${barColor}"></div>
                    <span class="feature-value">${Math.round(importance * 100)}%</span>
                </div>
                <div class="feature-impact">${this.getFeatureImpactDescription(feature, importance)}</div>
            `;
            featureImportanceContainer.appendChild(featureItem);
        });
    }

    updateModelPerformance() {
        // Update model performance chart
        const performanceChart = document.getElementById('model-performance-chart');
        const rocCurveChart = document.getElementById('roc-curve-chart');
        if (performanceChart && rocCurveChart) {
            performanceChart.classList.remove('chart-placeholder');
            
            // Create ROC curve using Chart.js
            if (window.Chart) {
                // Clear existing chart if any
                if (this.rocCurveChart) {
                    this.rocCurveChart.destroy();
                }
                
                // ROC curve data points
                const fpr = [0, 0.02, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
                const tpr = [0, 0.4, 0.7, 0.8, 0.85, 0.88, 0.9, 0.92, 0.94, 0.95, 0.97, 0.98, 1.0];
                
                // Create chart
                this.rocCurveChart = new Chart(rocCurveChart, {
                    type: 'line',
                    data: {
                        labels: fpr.map(val => (val * 100).toFixed(0) + '%'),
                        datasets: [
                            {
                                label: 'XGBoost Model (AUC = 0.92)',
                                data: tpr,
                                borderColor: '#00bfa5',
                                backgroundColor: 'rgba(0, 191, 165, 0.1)',
                                borderWidth: 3,
                                pointBackgroundColor: '#00bfa5',
                                pointBorderColor: '#fff',
                                pointRadius: 4,
                                pointHoverRadius: 6,
                                fill: true,
                                tension: 0.4
                            },
                            {
                                label: 'Random Classifier (AUC = 0.5)',
                                data: fpr,
                                borderColor: '#9e9e9e',
                                borderWidth: 2,
                                borderDash: [5, 5],
                                pointRadius: 0,
                                fill: false
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
                                displayColors: false,
                                callbacks: {
                                    label: function(context) {
                                        const datasetLabel = context.dataset.label || '';
                                        const index = context.dataIndex;
                                        return `${datasetLabel}: (FPR: ${fpr[index].toFixed(2)}, TPR: ${tpr[index].toFixed(2)})`;
                                    }
                                }
                            }
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'False Positive Rate',
                                    color: '#004d40',
                                    font: {
                                        weight: 'bold',
                                        size: 12
                                    }
                                },
                                grid: {
                                    color: 'rgba(0, 77, 64, 0.1)'
                                },
                                ticks: {
                                    color: '#004d40'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'True Positive Rate',
                                    color: '#004d40',
                                    font: {
                                        weight: 'bold',
                                        size: 12
                                    }
                                },
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
                
                // Add AUC annotation
                const chartArea = document.createElement('div');
                chartArea.className = 'chart-annotation';
                chartArea.innerHTML = `
                    <div class="auc-badge">
                        <span class="auc-label">AUC Score:</span>
                        <span class="auc-value">0.92</span>
                    </div>
                `;
                performanceChart.appendChild(chartArea);
            } else {
                // Fallback if Chart.js is not loaded
                performanceChart.innerHTML = this.createPerformanceChart();
            }
        }
    }

    createPerformanceChart() {
        // Create a simple ROC curve visualization
        return `
            <div class="chart-loading">
                <div class="loading-spinner"></div>
                <p>Loading ROC Curve...</p>
            </div>
        `;
    }

    updateCaseStudies() {
        // Update case studies section
        // This would typically load from an API or local storage
    }

    runPrediction() {
        // Get input values
        const projectType = document.getElementById('project-type-xgboost')?.value || 'solar';
        const location = document.getElementById('project-location')?.value || 'lagos';
        const gridStability = document.getElementById('grid-stability')?.value || 'medium';
        const communityEngagement = document.getElementById('community-engagement')?.value || 'moderate';
        const projectSize = parseFloat(document.getElementById('project-size')?.value) || 5;
        
        // Show loading state
        const predictBtn = document.getElementById('predict-btn');
        if (predictBtn) {
            predictBtn.innerHTML = `
                <div class="loading-spinner"></div>
                Processing...
            `;
            predictBtn.disabled = true;
        }
        
        // Simulate prediction delay
        setTimeout(() => {
            // Run prediction
            const result = this.predictProjectSuccess({
                projectType,
                location,
                gridStability,
                communityEngagement,
                projectSize
            });
            
            // Display results
            this.displayPredictionResults(result);
            
            // Reset button
            if (predictBtn) {
                predictBtn.innerHTML = `
                    <i class="bi bi-cpu"></i>
                    Run AI Prediction
                `;
                predictBtn.disabled = false;
            }
            
            // Haptic feedback on success (if available)
            if (navigator.vibrate) {
                navigator.vibrate(100);
            }
        }, 2000);
    }

    predictProjectSuccess(projectData) {
        // Simulate XGBoost prediction
        if (!this.modelLoaded) {
            this.showToast('Model not fully loaded yet. Please try again.', 'warning');
            return null;
        }
        
        // In a real app, this would call an API or use a local model
        // For demo purposes, we'll simulate a prediction
        let baseIRR = this.getBaseIRRForProjectType(projectData.projectType);
        
        // Apply feature adjustments
        let adjustedIRR = baseIRR;
        
        // Grid stability adjustment
        if (projectData.gridStability === 'high') {
            adjustedIRR += 0.03;
        } else if (projectData.gridStability === 'low') {
            adjustedIRR -= 0.04;
        }
        
        // Community engagement adjustment
        if (projectData.communityEngagement === 'extensive') {
            adjustedIRR += 0.023;
        } else if (projectData.communityEngagement === 'minimal') {
            adjustedIRR -= 0.02;
        }
        
        // Project size adjustment
        if (projectData.projectSize > 10) {
            adjustedIRR += 0.01;
        } else if (projectData.projectSize < 2) {
            adjustedIRR -= 0.01;
        }
        
        // Location adjustment
        if (projectData.location === 'lagos' || projectData.location === 'abuja') {
            adjustedIRR += 0.015;
        } else if (projectData.location === 'kano') {
            adjustedIRR -= 0.01;
        }
        
        // Add some randomness to simulate model variance
        adjustedIRR += (Math.random() * 0.02 - 0.01);
        
        // Calculate success probability
        const successProbability = 0.7 + (adjustedIRR - baseIRR) * 5;
        const clampedProbability = Math.min(Math.max(successProbability, 0), 1);
        
        return {
            projectType: projectData.projectType,
            predictedIRR: adjustedIRR,
            successProbability: clampedProbability,
            riskLevel: this.getRiskLevel(clampedProbability),
            confidenceScore: this.getConfidenceScore(clampedProbability),
            keyFactors: this.getKeyFactors(projectData)
        };
    }
    
    getBaseIRRForProjectType(projectType) {
        // Different project types have different base IRRs
        switch(projectType) {
            case 'solar':
                return 0.15; // 15% base IRR for solar
            case 'wind':
                return 0.16; // 16% base IRR for wind
            case 'hydro':
                return 0.14; // 14% base IRR for hydro
            case 'biomass':
                return 0.13; // 13% base IRR for biomass
            case 'geothermal':
                return 0.17; // 17% base IRR for geothermal
            default:
                return 0.15; // Default to solar
        }
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
    
    getConfidenceScore(probability) {
        if (probability > 0.85) {
            return 'High';
        } else if (probability > 0.7) {
            return 'Medium';
        } else {
            return 'Low';
        }
    }

    getKeyFactors(projectData) {
        // Return key factors affecting the prediction based on project type
        const factors = [];
        
        // Common factors
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
        
        if (projectData.projectSize > 10) {
            factors.push('Larger project size provides economies of scale');
        } else if (projectData.projectSize < 2) {
            factors.push('Small project size may reduce economies of scale');
        }
        
        if (projectData.location === 'lagos' || projectData.location === 'abuja') {
            factors.push('Urban location with strong infrastructure support');
        } else if (projectData.location === 'kano') {
            factors.push('Location has grid stability challenges');
        }
        
        // Project-specific factors
        switch(projectData.projectType) {
            case 'solar':
                factors.push('Solar irradiation levels are favorable in this region');
                break;
            case 'wind':
                factors.push('Wind speed consistency is critical for project success');
                break;
            case 'hydro':
                factors.push('Water flow stability is a key success factor');
                break;
            case 'biomass':
                factors.push('Reliable feedstock supply chain is essential');
                break;
            case 'geothermal':
                factors.push('Resource temperature and drilling success are critical');
                break;
        }
        
        return factors;
    }

    displayPredictionResults(result) {
        if (!result) return;
        
        // Update prediction result elements
        document.getElementById('predicted-irr').textContent = `${(result.predictedIRR * 100).toFixed(1)}%`;
        document.getElementById('success-probability').textContent = `${(result.successProbability * 100).toFixed(0)}%`;
        document.getElementById('risk-level').textContent = result.riskLevel;
        document.getElementById('confidence-score').textContent = result.confidenceScore;
        
        // Update key factors
        const keyFactorsList = document.getElementById('key-factors-list');
        if (keyFactorsList) {
            keyFactorsList.innerHTML = '';
            
            result.keyFactors.forEach(factor => {
                const factorItem = document.createElement('div');
                factorItem.className = 'factor-item';
                factorItem.innerHTML = `
                    <i class="bi bi-arrow-right-circle"></i>
                    <span>${factor}</span>
                `;
                keyFactorsList.appendChild(factorItem);
            });
        }
        
        // Show prediction result
        const predictionResult = document.getElementById('prediction-result');
        if (predictionResult) {
            predictionResult.style.display = 'block';
            
            // Scroll to result
            setTimeout(() => {
                predictionResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
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
    
    getFeatureImpactDescription(feature, importance) {
        // Return a brief description of the feature's impact
        const descriptions = {
            'Grid Stability': 'Critical for project success',
            'Community Engagement': 'Directly correlates with +2.3% IRR',
            'Regulatory Navigation': 'Reduces delays by 35%',
            'Solar Irradiation': 'Fundamental resource factor',
            'Equipment Quality': 'Optimized for local conditions',
            'Local Workforce': 'Improves operational efficiency',
            'Political Stability': 'Reduces investment risk',
            'Currency Risk': 'Impacts financial returns',
            'Land Rights': 'Essential for project security',
            'Grid Connection': 'Affects revenue generation',
            'Weather Patterns': 'Influences resource availability',
            'Maintenance Plan': 'Ensures long-term performance',
            'Financing Structure': 'Optimizes capital efficiency',
            'Technology Type': 'Determines performance ceiling',
            'Wind Speed Consistency': 'Key for wind project output',
            'Water Flow Stability': 'Critical for hydro generation',
            'Feedstock Supply': 'Essential for biomass operations',
            'Resource Temperature': 'Fundamental for geothermal',
            'Drilling Success': 'Determines geothermal viability',
            'Environmental Impact': 'Affects regulatory approval',
            'Turbine Quality': 'Determines wind energy capture',
            'Dam Construction': 'Critical for hydro safety',
            'Processing Efficiency': 'Key for biomass economics',
            'Waste Management': 'Impacts environmental compliance',
            'Emissions Control': 'Affects regulatory standing',
            'Reservoir Management': 'Ensures geothermal sustainability',
            'Plant Efficiency': 'Maximizes energy conversion'
        };
        
        return descriptions[feature] || 'Significant impact on project success';
    }
}

// Initialize XGBoost model manager
document.addEventListener('DOMContentLoaded', () => {
    window.xgboostModel = new XGBoostModelManager();
    
    // Add click handler for predict button
    const predictBtn = document.getElementById('predict-btn');
    if (predictBtn) {
        predictBtn.addEventListener('click', () => {
            if (window.xgboostModel) {
                window.xgboostModel.runPrediction();
            }
        });
    }
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
    background: rgba(16, 185, 129, 0.1);
    color: var(--success);
}

.model-status-badge.warning {
    background: rgba(245, 158, 11, 0.1);
    color: var(--warning);
}

.model-status-badge.error {
    background: rgba(220, 53, 69, 0.1);
    color: var(--danger);
}

.model-stats {
    margin-bottom: var(--spacing-lg);
}

.model-stat {
    text-align: center;
    padding: var(--spacing-md);
    background: var(--light-green);
    border-radius: var(--radius-md);
    height: 100%;
}

.model-stat-value {
    font-size: 1.5rem;
    font-weight: var(--font-weight-bold);
    color: var(--primary-green);
    margin-bottom: var(--spacing-xs);
}

.model-stat-label {
    font-size: 0.8rem;
    color: var(--text-dark);
}

.feature-importance {
    margin-bottom: var(--spacing-lg);
}

.feature-item {
    margin-bottom: var(--spacing-sm);
    padding-bottom: var(--spacing-sm);
    border-bottom: 1px solid rgba(0, 77, 64, 0.05);
}

.feature-name {
    font-size: 0.9rem;
    font-weight: var(--font-weight-medium);
    color: var(--primary-green);
    margin-bottom: 4px;
}

.feature-impact {
    font-size: 0.75rem;
    color: var(--text-muted);
    margin-top: 4px;
    font-style: italic;
}

.feature-bar-container {
    height: 10px;
    background-color: var(--light-gray);
    border-radius: var(--radius-sm);
    position: relative;
    overflow: hidden;
    margin-bottom: 4px;
}

.feature-bar {
    height: 100%;
    background-color: var(--accent-teal);
    background-image: linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0));
    border-radius: var(--radius-sm);
    transition: width 0.5s ease-out;
}

.feature-value {
    position: absolute;
    right: 0;
    top: -20px;
    font-size: 0.8rem;
    font-weight: var(--font-weight-semibold);
    color: var(--primary-green);
    background: rgba(255, 255, 255, 0.8);
    padding: 2px 6px;
    border-radius: 10px;
}

/* Enhanced ROC Curve Chart */
.chart-annotation {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 5;
}

.auc-badge {
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

.auc-label {
    font-weight: 500;
}

.auc-value {
    font-weight: 700;
    color: #00bfa5;
}

.chart-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 250px;
}

.prediction-metrics {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
}

.prediction-metric {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.prediction-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--gradient-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font-size: 1.25rem;
    margin-bottom: var(--spacing-xs);
}

.prediction-value {
    font-size: 1.25rem;
    font-weight: var(--font-weight-bold);
    color: var(--primary-green);
    margin-bottom: var(--spacing-xs);
}

.prediction-label {
    font-size: 0.7rem;
    color: var(--text-light);
}

.key-factors {
    margin-top: var(--spacing-lg);
}

.key-factors h4 {
    font-size: 1rem;
    margin-bottom: var(--spacing-sm);
}

.factor-item {
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing-xs);
}

.factor-item i {
    color: var(--accent-teal);
    margin-right: var(--spacing-xs);
}

.factor-item span {
    font-size: 0.9rem;
    color: var(--text-dark);
}

.case-study {
    margin-bottom: var(--spacing-lg);
}

.case-study:last-child {
    margin-bottom: 0;
}

.case-study h4 {
    font-size: 1rem;
    margin-bottom: var(--spacing-xs);
}

.case-study p {
    font-size: 0.9rem;
    margin-bottom: var(--spacing-sm);
}

.case-study-metrics {
    display: flex;
    gap: var(--spacing-md);
    background-color: var(--light-green);
    border-radius: var(--radius-md);
    padding: var(--spacing-sm);
}

.case-metric {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
}

.case-metric .metric-label {
    font-size: 0.7rem;
    color: var(--text-dark);
    margin-bottom: 2px;
}

.case-metric .metric-value {
    font-size: 0.9rem;
    font-weight: var(--font-weight-semibold);
    color: var(--primary-green);
    margin-bottom: 0;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', xgboostModelStyles);