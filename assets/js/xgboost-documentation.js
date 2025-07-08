// XGBoost Model Documentation JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize XGBoost documentation features
    initXGBoostDocumentation();
});

function initXGBoostDocumentation() {
    // Add click handlers for documentation links
    const docLinks = document.querySelectorAll('.xgboost-doc-link');
    docLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            showDocumentationSection(target);
        });
    });
    
    // Initialize feature importance visualization
    initFeatureImportanceViz();
    
    // Initialize model performance visualization
    initModelPerformanceViz();
}

function showDocumentationSection(sectionId) {
    // Hide all documentation sections
    const sections = document.querySelectorAll('.xgboost-doc-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Scroll to section
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function initFeatureImportanceViz() {
    // Feature importance data
    const featureImportance = {
        'solar': [
            { feature: 'Grid Stability', importance: 0.92 },
            { feature: 'Solar Irradiation', importance: 0.85 },
            { feature: 'Community Engagement', importance: 0.78 },
            { feature: 'Equipment Quality', importance: 0.72 },
            { feature: 'Regulatory Navigation', importance: 0.65 }
        ],
        'wind': [
            { feature: 'Wind Speed Consistency', importance: 0.94 },
            { feature: 'Grid Stability', importance: 0.88 },
            { feature: 'Turbine Quality', importance: 0.82 },
            { feature: 'Community Engagement', importance: 0.75 },
            { feature: 'Regulatory Navigation', importance: 0.68 }
        ],
        'hydro': [
            { feature: 'Water Flow Stability', importance: 0.95 },
            { feature: 'Grid Connection', importance: 0.87 },
            { feature: 'Environmental Impact', importance: 0.83 },
            { feature: 'Regulatory Navigation', importance: 0.79 },
            { feature: 'Community Engagement', importance: 0.72 }
        ],
        'biomass': [
            { feature: 'Feedstock Supply', importance: 0.93 },
            { feature: 'Processing Efficiency', importance: 0.86 },
            { feature: 'Grid Stability', importance: 0.80 },
            { feature: 'Regulatory Navigation', importance: 0.75 },
            { feature: 'Waste Management', importance: 0.70 }
        ],
        'geothermal': [
            { feature: 'Resource Temperature', importance: 0.96 },
            { feature: 'Drilling Success', importance: 0.90 },
            { feature: 'Grid Stability', importance: 0.85 },
            { feature: 'Regulatory Navigation', importance: 0.78 },
            { feature: 'Community Engagement', importance: 0.72 }
        ]
    };
    
    // Get feature importance container
    const container = document.querySelector('.feature-importance-viz');
    if (!container) return;
    
    // Get project type selector
    const projectTypeSelector = document.getElementById('doc-project-type');
    if (!projectTypeSelector) return;
    
    // Function to update visualization
    function updateFeatureImportance(projectType) {
        // Clear container
        container.innerHTML = '';
        
        // Get features for selected project type
        const features = featureImportance[projectType] || featureImportance['solar'];
        
        // Create bars for each feature
        features.forEach(item => {
            const barContainer = document.createElement('div');
            barContainer.className = 'feature-bar';
            
            const nameElement = document.createElement('div');
            nameElement.className = 'feature-name';
            nameElement.textContent = item.feature;
            
            const barWrapper = document.createElement('div');
            barWrapper.className = 'feature-bar-container';
            
            const barFill = document.createElement('div');
            barFill.className = 'feature-bar-fill';
            barFill.style.width = `${item.importance * 100}%`;
            
            const valueElement = document.createElement('span');
            valueElement.className = 'feature-value';
            valueElement.textContent = `${Math.round(item.importance * 100)}%`;
            
            barWrapper.appendChild(barFill);
            barWrapper.appendChild(valueElement);
            
            barContainer.appendChild(nameElement);
            barContainer.appendChild(barWrapper);
            
            container.appendChild(barContainer);
        });
    }
    
    // Initial update
    updateFeatureImportance(projectTypeSelector.value);
    
    // Add change listener
    projectTypeSelector.addEventListener('change', function() {
        updateFeatureImportance(this.value);
    });
}

function initModelPerformanceViz() {
    // Get performance visualization container
    const container = document.querySelector('.model-performance-viz');
    if (!container) return;
    
    // Create ROC curve visualization
    container.innerHTML = `
        <div class="performance-chart">
            <div class="chart-title">ROC Curve (AUC = 0.92)</div>
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
                    <span>Our XGBoost Model (AUC = 0.92)</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #ccc"></div>
                    <span>Random Classifier (AUC = 0.5)</span>
                </div>
            </div>
        </div>
    `;
}

// Function to toggle technical details
function toggleTechnicalDetails(btn) {
    const detailsSection = btn.closest('.xgboost-section').querySelector('.technical-details');
    if (detailsSection) {
        detailsSection.classList.toggle('show');
        
        // Update button text
        if (detailsSection.classList.contains('show')) {
            btn.innerHTML = '<i class="bi bi-dash-circle me-2"></i>Hide Technical Details';
        } else {
            btn.innerHTML = '<i class="bi bi-plus-circle me-2"></i>Show Technical Details';
        }
    }
}

// Function to show code example
function showCodeExample(language, example) {
    const modal = document.createElement('div');
    modal.className = 'code-example-modal';
    
    modal.innerHTML = `
        <div class="code-example-content">
            <div class="code-example-header">
                <h3>Code Example: ${language}</h3>
                <button class="code-example-close">
                    <i class="bi bi-x"></i>
                </button>
            </div>
            <div class="code-example-body">
                <pre><code class="${language}">${example}</code></pre>
            </div>
            <div class="code-example-footer">
                <button class="btn btn-outline-primary copy-code-btn">
                    <i class="bi bi-clipboard me-2"></i>Copy Code
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add close button handler
    const closeBtn = modal.querySelector('.code-example-close');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    });
    
    // Add copy button handler
    const copyBtn = modal.querySelector('.copy-code-btn');
    copyBtn.addEventListener('click', () => {
        const codeText = modal.querySelector('code').textContent;
        navigator.clipboard.writeText(codeText)
            .then(() => {
                copyBtn.innerHTML = '<i class="bi bi-check me-2"></i>Copied!';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="bi bi-clipboard me-2"></i>Copy Code';
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy code: ', err);
            });
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

// Python XGBoost example code
const pythonXGBoostExample = `import numpy as np
import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

# Load and preprocess data
df = pd.read_csv('renewable_energy_projects.csv')
df = preprocess_data(df)

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    df.drop(['irr', 'success'], axis=1),
    df['irr'],
    test_size=0.2,
    random_state=42
)

# Train XGBoost model
model = xgb.XGBRegressor(
    n_estimators=150,
    max_depth=5,
    learning_rate=0.05,
    subsample=0.8,
    colsample_bytree=0.8,
    objective='reg:squarederror',
    random_state=42
)

model.fit(
    X_train, y_train,
    eval_set=[(X_train, y_train), (X_test, y_test)],
    eval_metric=['rmse', 'mae'],
    early_stopping_rounds=20,
    verbose=True
)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate model
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
print(f"RMSE: {rmse:.4f}")

# Get feature importance
importance = model.feature_importances_
feature_importance = pd.DataFrame({
    'Feature': X_train.columns,
    'Importance': importance
}).sort_values('Importance', ascending=False)

print(feature_importance.head(10))`;

// JavaScript API integration example
const javascriptAPIExample = `// Mobile app integration with XGBoost model API
async function predictProjectSuccess(projectData) {
    try {
        const response = await fetch('https://api.finergycloud.com/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': \`Bearer \${apiToken}\`
            },
            body: JSON.stringify(projectData)
        });
        
        if (!response.ok) {
            throw new Error(\`API error: \${response.status}\`);
        }
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Prediction failed:', error);
        throw error;
    }
}

// Example usage
async function runPrediction() {
    const projectData = {
        project_type: 'solar',
        location: 'lagos',
        project_capacity_mw: 5.0,
        grid_stability: 'medium',
        community_engagement: 'high',
        // Additional parameters...
    };
    
    try {
        const result = await predictProjectSuccess(projectData);
        console.log('Predicted IRR:', result.predicted_irr);
        console.log('Success Probability:', result.success_probability);
        console.log('Risk Level:', result.risk_level);
        console.log('Key Factors:', result.key_factors);
    } catch (error) {
        console.error('Error:', error);
    }
}`;

// Feature engineering example
const featureEngineeringExample = `def calculate_grid_stability_index(outage_frequency, outage_duration, backup_availability):
    """Calculate Grid Stability Index from component metrics"""
    # Normalize inputs to 0-1 scale
    norm_freq = min(1, max(0, 1 - (outage_frequency / 30)))
    norm_dur = min(1, max(0, 1 - (outage_duration / 12)))
    norm_backup = min(1, max(0, backup_availability))
    
    # Weighted combination
    gsi = (0.4 * norm_freq + 
           0.4 * norm_dur + 
           0.2 * norm_backup)
    
    return gsi

def calculate_regulatory_risk_score(approval_time, policy_changes, incentive_stability):
    """Calculate Regulatory Risk Score from component metrics"""
    # Normalize inputs to 0-1 scale
    norm_time = min(1, max(0, approval_time / 24))
    norm_changes = min(1, max(0, policy_changes / 5))
    norm_incentives = min(1, max(0, 1 - incentive_stability))
    
    # Weighted combination (higher score = higher risk)
    rrs = (0.3 * norm_time + 
           0.3 * norm_changes + 
           0.4 * norm_incentives)
    
    return rrs

def calculate_community_engagement_index(local_employment, community_programs, stakeholder_meetings):
    """Calculate Community Engagement Index from component metrics"""
    # Normalize inputs to 0-1 scale
    norm_employment = min(1, max(0, local_employment))
    norm_programs = min(1, max(0, community_programs / 6))
    norm_meetings = min(1, max(0, stakeholder_meetings / 15))
    
    # Weighted combination
    cei = (0.4 * norm_employment + 
           0.3 * norm_programs + 
           0.3 * norm_meetings)
    
    return cei`;