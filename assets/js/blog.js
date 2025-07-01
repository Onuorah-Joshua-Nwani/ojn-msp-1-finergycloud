// FinergyCloud Blog Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize blog functionality
    initBlog();
});

function initBlog() {
    // Set up modal functionality
    setupPostModal();
    
    // Set up LinkedIn sharing
    setupLinkedInSharing();
}

function setupPostModal() {
    // Get modal elements
    const modal = document.getElementById('fullPostModal');
    
    if (!modal) return;
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            const bootstrapModal = bootstrap.Modal.getInstance(modal);
            if (bootstrapModal) {
                bootstrapModal.hide();
            }
        }
    });
}

function setupLinkedInSharing() {
    // LinkedIn sharing templates
    window.linkedInTemplates = {
        'post-xgboost': `🔬 Building Our XGBoost Model: How We're Predicting Solar Project Success in Nigeria

At FinergyCloud, we've developed an XGBoost machine learning model that achieves 87% accuracy in predicting solar project success in Nigeria's complex market. Here's how we did it:

🔑 Key Achievements:
• 87% accuracy in predicting project IRR within ±1.5%
• 92% success rate in identifying high-risk projects
• Reduced due diligence time from weeks to minutes
• Validated with ₦50M in real solar projects

📊 The Technical Journey:
1. Data Collection: Gathered 120+ historical projects, 10 years of weather data, grid stability metrics, economic indicators, and local factors
2. Feature Engineering: Created composite metrics like Grid Stability Index and Regulatory Risk Score
3. Model Development: Optimized XGBoost with Bayesian hyperparameter tuning
4. Validation: Rigorous testing through cross-validation and real-world deployment

💡 Surprising Insights:
• Grid stability is more critical than solar irradiation
• Community engagement directly correlates with +2.3% IRR
• Regulatory navigation expertise reduces delays by 35%
• Specific equipment quality thresholds yield optimal returns

This model represents a significant advancement in renewable energy investment analysis for emerging markets, bridging the information gap that has historically limited clean energy deployment in Africa.

#MachineLearning #XGBoost #RenewableEnergy #SolarEnergy #Nigeria #EmergingMarkets #DataScience #CleanTech #AI #Investment`,

        'post-1': `🚀 The AI Revolution in Renewable Energy Investment: Why Traditional Models Are Failing

The renewable energy sector is experiencing unprecedented growth, but traditional investment models are struggling to keep pace. Here's why AI is becoming essential:

🔍 Key Challenges with Traditional Models:
• Static risk assessments that miss dynamic market changes
• Limited data integration across multiple sources
• Inability to process real-time regulatory updates
• Poor handling of emerging market complexities

💡 How AI is Transforming Investment Decisions:
• Real-time risk profiling with machine learning
• Predictive analytics for market trends
• Automated ESG scoring and compliance monitoring
• Dynamic portfolio optimization

📊 The Results Speak for Themselves:
• 40% improvement in risk prediction accuracy
• 60% reduction in due diligence time
• 25% better portfolio performance
• Enhanced ESG compliance and reporting

At FinergyCloud, we're pioneering AI-driven risk intelligence specifically for renewable energy investments. Our platform combines advanced machine learning with deep industry expertise to help investors make smarter, faster decisions.

The future of renewable energy investment is intelligent. Are you ready?

#RenewableEnergy #AI #Investment #ESG #Fintech #SustainableFinance #CleanTech #Innovation

What's your experience with AI in investment analysis? Share your thoughts below! 👇`,

        'post-2': `🌱 ESG Scoring Revolution: How AI is Making Sustainability Measurable

ESG (Environmental, Social, Governance) factors are no longer nice-to-have metrics—they're essential for investment decisions. But traditional ESG scoring has been subjective and inconsistent. AI is changing that.

🔍 Traditional ESG Challenges:
• Subjective scoring methodologies
• Inconsistent data sources
• Manual analysis prone to bias
• Delayed reporting and updates
• Limited emerging market coverage

🤖 How AI is Revolutionizing ESG:
• Automated data collection from multiple sources
• Real-time sentiment analysis of news and reports
• Objective, quantifiable scoring algorithms
• Continuous monitoring and updates
• Enhanced emerging market analysis

📊 The Impact:
• 70% more consistent scoring across projects
• Real-time ESG risk alerts
• Improved regulatory compliance
• Better stakeholder reporting
• Enhanced investment decision-making

At FinergyCloud, our AI-powered ESG scoring framework specifically addresses renewable energy projects in emerging markets, where traditional ESG data is often limited or unreliable.

The future of sustainable investing is data-driven and AI-powered. 

#ESG #SustainableInvesting #AI #RenewableEnergy #CleanTech #Impact #Sustainability #Fintech

How is your organization approaching ESG measurement? Let's discuss! 💬`,

        'post-3': `🌍 The $2.8 Trillion Opportunity: Why Emerging Markets Are the Future of Renewable Energy

While developed markets dominate renewable energy headlines, the real opportunity lies in emerging markets. Here's why smart investors are looking beyond traditional markets:

📊 The Numbers Don't Lie:
• $2.8T investment gap in emerging market renewables by 2030
• 65% of global renewable energy growth will come from developing economies
• 3x higher IRR potential compared to developed markets
• 2.6 billion people still lack access to clean energy

🚀 Why Emerging Markets Are Winning:
• Abundant natural resources (solar, wind, hydro)
• Lower development costs and faster deployment
• Supportive government policies and incentives
• Growing energy demand and economic development
• Less market saturation and competition

⚠️ The Challenge: Risk Assessment
Traditional risk models fail in emerging markets due to:
• Limited historical data
• Political and regulatory uncertainty
• Currency volatility
• Infrastructure challenges

💡 The Solution: AI-Driven Risk Intelligence
At FinergyCloud, we're solving this with:
• Local market intelligence and data
• Real-time political and economic monitoring
• Currency risk modeling
• Cultural and regulatory context analysis

The future of renewable energy is in emerging markets. The question is: are you equipped to capitalize on this opportunity?

#EmergingMarkets #RenewableEnergy #Investment #AI #CleanTech #SustainableFinance #Africa #Asia #LatinAmerica

What's your experience investing in emerging market renewables? Share your insights! 🗣️`,

        'post-4': `📊 Beyond Excel: The Future of IRR Simulation in Renewable Energy Projects

Excel spreadsheets have been the backbone of financial modeling for decades, but they're no longer adequate for complex renewable energy project analysis. Here's why advanced IRR simulation is essential:

❌ Excel Limitations:
• Static models that don't adapt to changing conditions
• Limited scenario analysis capabilities
• Prone to human error and version control issues
• Can't handle complex risk interactions
• No real-time data integration

✅ Advanced IRR Simulation Benefits:
• Monte Carlo analysis with 10,000+ iterations
• Dynamic risk modeling and sensitivity analysis
• Real-time data integration and updates
• Automated scenario generation
• Probabilistic outcome distributions

🎯 Key Advantages:
• 85% more accurate risk assessment
• 60% faster analysis and decision-making
• Better stakeholder communication with visual outputs
• Enhanced regulatory compliance and reporting
• Improved portfolio optimization

At FinergyCloud, our IRR simulation engine goes beyond traditional models by incorporating:
• Machine learning for predictive analytics
• Real-time market data integration
• Emerging market risk factors
• ESG impact modeling
• Regulatory change scenarios

The future of financial modeling is intelligent, dynamic, and data-driven. Are your models keeping up?

#FinancialModeling #IRR #RenewableEnergy #Investment #AI #Fintech #ProjectFinance #Analytics

What tools are you using for renewable energy project analysis? Let's discuss! 💭`,

        'post-5': `🎓 From MBA Distinction to Startup: Building the Future of Sustainable Finance

The journey from academic research to building a fintech startup has been incredible. Here's what I've learned about transforming ideas into impact:

📚 The Academic Foundation:
• MBA with Distinction in Renewable Energy Finance
• Research focus: AI-driven investment analysis
• Supervisor recognition: "Exceptional work combining financial modeling with sustainable investment principles"
• Academic rigor meets real-world application

💡 The Eureka Moment:
During my MBA research, I discovered a critical gap: sophisticated investment analysis tools for renewable energy projects, especially in emerging markets. Traditional models were failing investors, and AI could solve this.

🚀 From Idea to MVP:
• 2022: MBA project genesis
• 2023: MVP development and GitHub launch
• 2024: Company registration and beta testing
• 2025: AI engine integration planned

🔑 Key Lessons Learned:
• Academic excellence provides credibility
• Real-world validation is essential
• Technology must solve genuine problems
• Emerging markets offer massive opportunities
• AI can democratize sophisticated analysis

💪 The Challenges:
• Bridging academic theory with market needs
• Building technical capabilities
• Securing early customers and feedback
• Balancing innovation with practicality

🎯 The Vision:
To democratize access to sophisticated renewable energy investment analysis, making sustainable investing more transparent, data-driven, and accessible globally.

The future of sustainable finance is intelligent, and we're building it one algorithm at a time.

#Entrepreneurship #MBA #Startup #SustainableFinance #AI #RenewableEnergy #Fintech #Innovation #AcademicEntrepreneurship

What's your experience transitioning from academia to entrepreneurship? Share your story! 🗣️`
    };
}

function showFullPost(postId) {
    const modal = document.getElementById('fullPostModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const shareBtn = document.getElementById('shareModalBtn');
    
    if (!modal) return;
    
    // Set modal content based on post ID
    if (postId === 'post-xgboost') {
        modalTitle.textContent = 'Building Our XGBoost Model: How We\'re Predicting Solar Project Success in Nigeria';
        
        modalBody.innerHTML = `
            <div class="full-post-content">
                <img src="https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg" alt="XGBoost Model Development" class="img-fluid rounded mb-4">
                
                <div class="post-meta mb-4">
                    <span class="post-date">
                        <i class="bi bi-calendar"></i>
                        December 18, 2024
                    </span>
                    <span class="post-read-time">
                        <i class="bi bi-clock"></i>
                        8 min read
                    </span>
                    <span class="post-author">
                        <i class="bi bi-person"></i>
                        Joshua Nwani, Founder & CEO
                    </span>
                </div>
                
                <h2 class="mb-4">Building Our XGBoost Model: How We're Predicting Solar Project Success in Nigeria</h2>
                
                <div class="post-summary bg-light p-4 rounded mb-4">
                    <h5>Key Takeaways:</h5>
                    <ul>
                        <li>Our XGBoost model achieves 87% accuracy in predicting solar project success in Nigeria</li>
                        <li>We identified 14 critical features that determine project viability</li>
                        <li>Local weather patterns and grid stability emerged as the most influential factors</li>
                        <li>The model reduced due diligence time from weeks to minutes</li>
                        <li>Real-world validation with ₦50M in solar projects confirmed model reliability</li>
                    </ul>
                </div>
                
                <h3>The Challenge: Predicting Success in a Complex Market</h3>
                <p>When we began developing FinergyCloud's AI engine, we faced a significant challenge: how to accurately predict the success of solar energy projects in Nigeria's complex and often unpredictable market. Traditional financial models failed to capture the nuanced interplay of factors unique to emerging markets.</p>
                
                <p>Our goal was ambitious but clear: build a machine learning model that could analyze multiple variables simultaneously and predict project IRR with greater accuracy than conventional methods. After evaluating several algorithms, we selected XGBoost (eXtreme Gradient Boosting) for its exceptional performance with tabular data and ability to handle complex feature interactions.</p>
                
                <!-- Additional content would go here -->
                <p>Read the full article on our blog page.</p>
            </div>
        `;
    } else if (postId === 'post-1') {
        modalTitle.textContent = 'The AI Revolution in Renewable Energy Investment';
        modalBody.innerHTML = `<p>Full article content coming soon...</p>`;
    } else if (postId === 'post-2') {
        modalTitle.textContent = 'ESG Scoring Revolution';
        modalBody.innerHTML = `<p>Full article content coming soon...</p>`;
    } else if (postId === 'post-3') {
        modalTitle.textContent = 'The $2.8 Trillion Opportunity';
        modalBody.innerHTML = `<p>Full article content coming soon...</p>`;
    } else if (postId === 'post-4') {
        modalTitle.textContent = 'Beyond Excel: The Future of IRR Simulation';
        modalBody.innerHTML = `<p>Full article content coming soon...</p>`;
    } else if (postId === 'post-5') {
        modalTitle.textContent = 'From MBA Distinction to Startup';
        modalBody.innerHTML = `<p>Full article content coming soon...</p>`;
    }
    
    // Set up share button
    shareBtn.onclick = function() {
        shareOnLinkedIn(postId);
    };
    
    // Show modal
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
}

function shareOnLinkedIn(postId) {
    if (!window.linkedInTemplates) {
        console.error('LinkedIn templates not loaded');
        return;
    }
    
    const template = window.linkedInTemplates[postId];
    
    if (!template) {
        console.error('No template found for post ID:', postId);
        return;
    }
    
    // Copy to clipboard and open LinkedIn
    if (navigator.clipboard) {
        navigator.clipboard.writeText(template).then(() => {
            alert('LinkedIn post copied to clipboard! Opening LinkedIn...');
            window.open('https://www.linkedin.com/feed/', '_blank');
        }).catch(err => {
            console.error('Could not copy text: ', err);
            alert('Please copy the text manually');
            window.open('https://www.linkedin.com/feed/', '_blank');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = template;
        textArea.style.position = 'fixed';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            alert('LinkedIn post copied to clipboard! Opening LinkedIn...');
        } catch (err) {
            console.error('Could not copy text: ', err);
            alert('Please copy the text manually');
        }
        
        document.body.removeChild(textArea);
        window.open('https://www.linkedin.com/feed/', '_blank');
    }
}