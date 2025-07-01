// Blog integration for FinergyCloud Mobile App

class MobileBlogManager {
    constructor() {
        this.posts = [];
        this.currentPost = null;
        this.init();
    }

    init() {
        this.loadBlogPosts();
        this.setupEventListeners();
    }

    loadBlogPosts() {
        // In a real app, this would fetch from an API
        this.posts = [
            {
                id: 'post-xgboost',
                title: 'Building Our XGBoost Model: How We\'re Predicting Solar Project Success in Nigeria',
                category: 'AI & Technology',
                date: '2024-12-18',
                readTime: '8 min',
                excerpt: 'Our XGBoost model achieves 87% accuracy in predicting solar project success in Nigeria\'s complex market. Learn how we built it and the surprising insights we discovered.',
                image: 'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg',
                featured: true,
                linkedInReady: true
            },
            {
                id: 'post-1',
                title: 'The AI Revolution in Renewable Energy Investment',
                category: 'AI & Technology',
                date: '2024-12-15',
                readTime: '5 min',
                excerpt: 'Discover how AI is transforming renewable energy investment decisions and why traditional models are failing.',
                image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg',
                featured: false,
                linkedInReady: true
            },
            {
                id: 'post-2',
                title: 'ESG Scoring Revolution: Making Sustainability Measurable',
                category: 'ESG & Sustainability',
                date: '2024-12-12',
                readTime: '4 min',
                excerpt: 'How AI is revolutionizing ESG scoring and making environmental impact quantifiable.',
                image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
                featured: false,
                linkedInReady: true
            },
            {
                id: 'post-3',
                title: 'The $2.8 Trillion Opportunity in Emerging Markets',
                category: 'Emerging Markets',
                date: '2024-12-10',
                readTime: '6 min',
                excerpt: 'Why emerging markets represent the future of renewable energy investment.',
                image: 'https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg',
                featured: false,
                linkedInReady: true
            },
            {
                id: 'post-4',
                title: 'Beyond Excel: The Future of IRR Simulation',
                category: 'Financial Modeling',
                date: '2024-12-08',
                readTime: '5 min',
                excerpt: 'How advanced simulation is replacing spreadsheets for renewable energy analysis.',
                image: 'https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg',
                featured: false,
                linkedInReady: true
            },
            {
                id: 'post-5',
                title: 'From MBA Distinction to Startup Success',
                category: 'Entrepreneurship',
                date: '2024-12-05',
                readTime: '7 min',
                excerpt: 'The journey from academic research to building the future of sustainable finance.',
                image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
                featured: false,
                linkedInReady: true
            }
        ];
    }

    setupEventListeners() {
        // Add blog navigation to mobile app
        this.addBlogNavigation();
        
        // Listen for blog page activation
        document.addEventListener('pageActivated', (e) => {
            if (e.detail.pageId === 'blog') {
                this.refreshBlogContent();
            }
        });
        
        // Setup swipe gestures for blog posts
        this.setupSwipeGestures();
    }

    addBlogNavigation() {
        // Add blog link to side navigation if not already present
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && !document.querySelector('.nav-link[data-page="blog"]')) {
            const blogNavItem = document.createElement('li');
            blogNavItem.className = 'nav-item';
            blogNavItem.innerHTML = `
                <a href="#blog" class="nav-link" data-page="blog">
                    <i class="bi bi-journal-text"></i>
                    <span>Blog</span>
                </a>
            `;
            navMenu.appendChild(blogNavItem);
        }

        // Add blog to bottom navigation if not already present
        const bottomNav = document.querySelector('.bottom-nav');
        if (bottomNav && !document.querySelector('.nav-btn[data-page="blog"]') && bottomNav.children.length < 5) {
            const blogNavBtn = document.createElement('button');
            blogNavBtn.className = 'nav-btn';
            blogNavBtn.setAttribute('data-page', 'blog');
            blogNavBtn.innerHTML = `
                <i class="bi bi-journal-text"></i>
                <span>Blog</span>
            `;
            bottomNav.appendChild(blogNavBtn);
            
            // Re-attach event listeners
            blogNavBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (window.finergyApp) {
                    window.finergyApp.navigateToPage('blog');
                }
            });
        }
    }

    refreshBlogContent() {
        // Update featured post
        this.updateFeaturedPost();
        
        // Update recent posts
        this.updateRecentPosts();
    }

    updateFeaturedPost() {
        const featuredPost = this.posts.find(post => post.featured);
        if (!featuredPost) return;
        
        const featuredPostContainer = document.querySelector('.featured-post-mobile');
        if (featuredPostContainer) {
            featuredPostContainer.innerHTML = `
                <div class="post-image">
                    <img src="${featuredPost.image}" alt="${featuredPost.title}" class="img-fluid rounded-3">
                    <div class="post-category">${featuredPost.category}</div>
                </div>
                <div class="post-content">
                    <div class="post-meta">
                        <span><i class="bi bi-calendar"></i> ${this.formatDate(featuredPost.date)}</span>
                        <span><i class="bi bi-clock"></i> ${featuredPost.readTime}</span>
                    </div>
                    <h3>${featuredPost.title}</h3>
                    <p>${featuredPost.excerpt}</p>
                    <div class="post-actions">
                        <button class="btn btn-primary" onclick="mobileBlog.readPost('${featuredPost.id}')">
                            <i class="bi bi-book-open me-2"></i>Read Article
                        </button>
                        <button class="btn btn-outline-primary" onclick="mobileBlog.shareOnLinkedIn('${featuredPost.id}')">
                            <i class="bi bi-linkedin me-2"></i>Share
                        </button>
                    </div>
                </div>
            `;
            
            // Add ripple effect
            this.addRippleEffect(featuredPostContainer);
        }
    }

    updateRecentPosts() {
        const regularPosts = this.posts.filter(post => !post.featured).slice(0, 3);
        const blogPostsContainer = document.querySelector('.blog-posts-mobile');
        
        if (blogPostsContainer) {
            blogPostsContainer.innerHTML = regularPosts.map(post => `
                <div class="blog-post-mobile" data-post-id="${post.id}">
                    <div class="post-image-small">
                        <img src="${post.image}" alt="${post.title}" class="img-fluid rounded">
                        <div class="post-category-small">${post.category}</div>
                    </div>
                    <div class="post-content-small">
                        <div class="post-meta-small">
                            <span><i class="bi bi-calendar"></i> ${this.formatDate(post.date)}</span>
                            <span><i class="bi bi-clock"></i> ${post.readTime}</span>
                        </div>
                        <h4>${post.title}</h4>
                        <p>${post.excerpt}</p>
                        <div class="post-actions-small">
                            <button class="btn btn-primary btn-sm" onclick="mobileBlog.readPost('${post.id}')">
                                Read More
                            </button>
                            <button class="btn btn-outline-primary btn-sm" onclick="mobileBlog.shareOnLinkedIn('${post.id}')">
                                <i class="bi bi-linkedin"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
            
            // Add ripple effect to all blog posts
            const blogPosts = document.querySelectorAll('.blog-post-mobile');
            blogPosts.forEach(post => {
                this.addRippleEffect(post);
                
                // Add click handler for the whole card
                post.addEventListener('click', (e) => {
                    // Don't trigger if clicking on a button
                    if (!e.target.closest('button')) {
                        const postId = post.getAttribute('data-post-id');
                        this.readPost(postId);
                    }
                });
            });
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    readPost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;

        // Track post view
        this.trackPostView(post);
        
        // Show post modal
        this.showPostModal(post);
    }

    trackPostView(post) {
        // In a real app, this would send analytics data
        console.log(`Post viewed: ${post.title}`);
        
        // Save to recently viewed
        const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewedPosts') || '[]');
        
        // Add to front if not already in list
        if (!recentlyViewed.some(p => p.id === post.id)) {
            recentlyViewed.unshift({
                id: post.id,
                title: post.title,
                timestamp: new Date().toISOString()
            });
            
            // Keep only last 10
            if (recentlyViewed.length > 10) {
                recentlyViewed.pop();
            }
            
            localStorage.setItem('recentlyViewedPosts', JSON.stringify(recentlyViewed));
        }
    }

    showPostModal(post) {
        // Remove any existing modals
        const existingModal = document.querySelector('.blog-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        const modal = document.createElement('div');
        modal.className = 'blog-modal';
        
        // Create post content based on post ID
        let postContent = '';
        
        if (post.id === 'post-xgboost') {
            postContent = `
                <img src="${post.image}" alt="${post.title}" class="img-fluid rounded mb-3">
                <div class="post-meta mb-3">
                    <span><i class="bi bi-calendar"></i> ${this.formatDate(post.date)}</span>
                    <span><i class="bi bi-clock"></i> ${post.readTime}</span>
                    <span><i class="bi bi-tag"></i> ${post.category}</span>
                </div>
                
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
                
                <p>This is a preview of the full article. The complete post with detailed analysis, insights, and actionable recommendations is available on our website.</p>
            `;
        } else {
            postContent = `
                <img src="${post.image}" alt="${post.title}" class="img-fluid rounded mb-3">
                <div class="post-meta mb-3">
                    <span><i class="bi bi-calendar"></i> ${this.formatDate(post.date)}</span>
                    <span><i class="bi bi-clock"></i> ${post.readTime}</span>
                    <span><i class="bi bi-tag"></i> ${post.category}</span>
                </div>
                <p class="lead">${post.excerpt}</p>
                <p>This is a preview of the full article. The complete post with detailed analysis, insights, and actionable recommendations is available on our website.</p>
            `;
        }
        
        modal.innerHTML = `
            <div class="blog-modal-content">
                <div class="blog-modal-header">
                    <h3>${post.title}</h3>
                    <button class="blog-modal-close" aria-label="Close">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
                <div class="blog-modal-body">
                    ${postContent}
                    <div class="modal-actions">
                        <button class="btn btn-primary" onclick="window.open('https://finergycloud.com/blog.html', '_blank')">
                            <i class="bi bi-globe me-2"></i>Read Full Article
                        </button>
                        <button class="btn btn-outline-primary" onclick="mobileBlog.shareOnLinkedIn('${post.id}')">
                            <i class="bi bi-linkedin me-2"></i>Share on LinkedIn
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Add close button handler
        const closeBtn = modal.querySelector('.blog-modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.remove();
                }, 300);
            });
        }
        
        // Close on click outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.remove();
                }, 300);
            }
        });
        
        // Animate in
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    shareOnLinkedIn(postId) {
        const linkedInTemplates = {
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

        const template = linkedInTemplates[postId];
        if (!template) return;

        // Copy to clipboard and open LinkedIn
        if (navigator.clipboard) {
            navigator.clipboard.writeText(template).then(() => {
                this.showToast('LinkedIn post copied! Opening LinkedIn...', 'success');
                setTimeout(() => {
                    window.open('https://www.linkedin.com/feed/', '_blank');
                }, 1000);
            }).catch(() => {
                this.showToast('Please copy the text manually', 'warning');
                this.showShareModal(template);
            });
        } else {
            // Fallback for older browsers
            this.showShareModal(template);
        }
    }

    showShareModal(content) {
        const modal = document.createElement('div');
        modal.className = 'blog-modal';
        modal.innerHTML = `
            <div class="blog-modal-content">
                <div class="blog-modal-header">
                    <h3>Share on LinkedIn</h3>
                    <button class="blog-modal-close" aria-label="Close">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
                <div class="blog-modal-body">
                    <p>Copy this text and paste it into your LinkedIn post:</p>
                    <div class="share-content p-3 bg-light rounded mb-3" style="max-height: 300px; overflow-y: auto;">
                        ${content.replace(/\n/g, '<br>')}
                    </div>
                    <div class="modal-actions">
                        <button class="btn btn-primary copy-btn">
                            <i class="bi bi-clipboard me-2"></i>Copy Text
                        </button>
                        <button class="btn btn-outline-primary" onclick="window.open('https://www.linkedin.com/feed/', '_blank')">
                            <i class="bi bi-linkedin me-2"></i>Open LinkedIn
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Add close button handler
        const closeBtn = modal.querySelector('.blog-modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.remove();
                }, 300);
            });
        }
        
        // Add copy button handler
        const copyBtn = modal.querySelector('.copy-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(content).then(() => {
                    this.showToast('Copied to clipboard!', 'success');
                    copyBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Copied!';
                    copyBtn.disabled = true;
                    
                    setTimeout(() => {
                        window.open('https://www.linkedin.com/feed/', '_blank');
                    }, 1000);
                }).catch(() => {
                    this.showToast('Failed to copy. Please select and copy manually.', 'warning');
                });
            });
        }
        
        // Animate in
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    subscribeNewsletter() {
        const email = document.getElementById('newsletter-email');
        if (!email || !email.value) {
            this.showToast('Please enter your email address', 'warning');
            return;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            this.showToast('Please enter a valid email address', 'warning');
            return;
        }

        // Simulate newsletter subscription
        this.showToast('Thank you for subscribing! You\'ll receive weekly insights.', 'success');
        
        // Save to localStorage for persistence
        const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
        subscribers.push({
            email: email.value,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
        
        // Clear input
        email.value = '';
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

    setupSwipeGestures() {
        // Add swipe gestures for blog posts
        let touchStartX = 0;
        let touchEndX = 0;
        const minSwipeDistance = 100;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            this.handleSwipe();
        }, { passive: true });
        
        this.handleSwipe = () => {
            const swipeDistance = touchEndX - touchStartX;
            
            // Only process significant swipes
            if (Math.abs(swipeDistance) < minSwipeDistance) return;
            
            // Only process swipes on the blog page
            if (window.finergyApp && window.finergyApp.currentPage !== 'blog') return;
            
            if (swipeDistance > 0) {
                // Swipe right - previous post
                this.navigatePosts('prev');
            } else {
                // Swipe left - next post
                this.navigatePosts('next');
            }
        };
    }

    navigatePosts(direction) {
        // If a modal is open, navigate between posts
        const modal = document.querySelector('.blog-modal');
        if (modal) {
            // Find current post
            const currentPostId = this.currentPost || '';
            const currentIndex = this.posts.findIndex(p => p.id === currentPostId);
            
            if (currentIndex !== -1) {
                let newIndex;
                
                if (direction === 'next') {
                    newIndex = (currentIndex + 1) % this.posts.length;
                } else {
                    newIndex = (currentIndex - 1 + this.posts.length) % this.posts.length;
                }
                
                // Close current modal
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.remove();
                    
                    // Open new post
                    this.readPost(this.posts[newIndex].id);
                }, 300);
            }
        }
    }

    addRippleEffect(element) {
        element.addEventListener('click', function(e) {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            element.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
}

// Initialize mobile blog manager
document.addEventListener('DOMContentLoaded', () => {
    window.mobileBlog = new MobileBlogManager();
});

// Add mobile blog styles
const mobileBlogStyles = `
<style>
/* Mobile Blog Styles */
.featured-post-mobile {
    background: var(--white);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    overflow: hidden;
    margin-bottom: var(--spacing-xl);
    position: relative;
}

.featured-post-mobile .post-image {
    position: relative;
}

.featured-post-mobile .post-image img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.post-category,
.post-category-small {
    position: absolute;
    top: var(--spacing-sm);
    left: var(--spacing-sm);
    background: var(--gradient-primary);
    color: var(--white);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    font-size: 0.8rem;
    font-weight: var(--font-weight-semibold);
    z-index: 1;
}

.post-category-small {
    padding: 0.25rem var(--spacing-xs);
    font-size: 0.7rem;
    top: var(--spacing-xs);
    left: var(--spacing-xs);
}

.featured-post-mobile .post-content {
    padding: var(--spacing-lg);
}

.post-meta,
.post-meta-small {
    display: flex;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-sm);
    font-size: 0.9rem;
    color: var(--gray);
    flex-wrap: wrap;
}

.post-meta-small {
    font-size: 0.8rem;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-xs);
}

.post-meta span,
.post-meta-small span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.featured-post-mobile h3 {
    color: var(--primary-green);
    margin-bottom: var(--spacing-sm);
    font-weight: var(--font-weight-semibold);
    font-size: 1.25rem;
    line-height: 1.3;
}

.featured-post-mobile p {
    color: var(--text-light);
    margin-bottom: var(--spacing-md);
    font-size: 0.95rem;
    line-height: 1.5;
}

.post-actions,
.post-actions-small {
    display: flex;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
}

.blog-posts-mobile {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.blog-post-mobile {
    background: var(--white);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
    display: flex;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    border: 1px solid rgba(0, 77, 64, 0.05);
    transition: var(--transition-normal);
    position: relative;
}

.blog-post-mobile:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
}

.blog-post-mobile:active {
    transform: scale(0.98);
}

.post-image-small {
    position: relative;
    flex-shrink: 0;
    width: 100px;
    height: 100px;
}

.post-image-small img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--radius-sm);
}

.post-content-small {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.post-content-small h4 {
    color: var(--primary-green);
    margin-bottom: var(--spacing-xs);
    font-size: 0.9rem;
    font-weight: var(--font-weight-semibold);
    line-height: 1.3;
}

.post-content-small p {
    color: var(--text-light);
    margin-bottom: var(--spacing-sm);
    font-size: 0.8rem;
    line-height: 1.4;
    flex: 1;
}

.post-actions-small {
    display: flex;
    gap: var(--spacing-xs);
    margin-top: auto;
}

.newsletter-mobile {
    background: var(--gradient-primary);
    color: var(--white);
    padding: var(--spacing-xl);
    border-radius: var(--radius-lg);
    text-align: center;
    margin-top: var(--spacing-xl);
}

.newsletter-mobile h3 {
    color: var(--white);
    margin-bottom: var(--spacing-xs);
    font-size: 1.25rem;
}

.newsletter-mobile p {
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: var(--spacing-lg);
    font-size: 0.95rem;
}

.newsletter-form {
    display: flex;
    gap: var(--spacing-xs);
    max-width: 300px;
    margin: 0 auto;
}

.newsletter-form .form-control {
    flex: 1;
    border: none;
    border-radius: var(--radius-md);
    padding: var(--spacing-sm);
}

.newsletter-form .btn {
    border-radius: var(--radius-md);
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--white);
    color: var(--primary-green);
}

/* Blog Modal */
.blog-modal {
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

.blog-modal.show {
    opacity: 1;
    visibility: visible;
}

.blog-modal-content {
    background: var(--white);
    border-radius: var(--radius-lg);
    max-width: 500px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    transform: scale(0.8);
    transition: transform 0.3s ease;
}

.blog-modal.show .blog-modal-content {
    transform: scale(1);
}

.blog-modal-header {
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

.blog-modal-header h3 {
    color: var(--primary-green);
    margin: 0;
    font-size: 1.1rem;
}

.blog-modal-close {
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

.blog-modal-close:hover {
    background: var(--light-gray);
    color: var(--primary-green);
}

.blog-modal-body {
    padding: var(--spacing-lg);
}

.modal-actions {
    display: flex;
    gap: var(--spacing-sm);
    margin-top: var(--spacing-lg);
    flex-wrap: wrap;
}

/* Post Summary Box */
.post-summary {
    background: var(--light-green);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    margin-bottom: var(--spacing-lg);
}

.post-summary h5 {
    color: var(--primary-green);
    margin-bottom: var(--spacing-sm);
    font-size: 1rem;
}

.post-summary ul {
    padding-left: var(--spacing-lg);
    margin-bottom: 0;
}

.post-summary li {
    margin-bottom: var(--spacing-xs);
    color: var(--text-dark);
}

/* Ripple Effect */
.ripple {
    position: absolute;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
    z-index: 1;
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

/* Share Content */
.share-content {
    white-space: pre-line;
    font-size: 0.9rem;
    line-height: 1.5;
    color: var(--text-dark);
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
    border-left: 4px solid var(--success);
}

.mobile-toast.warning {
    border-left: 4px solid var(--warning);
}

.mobile-toast.info {
    border-left: 4px solid var(--info);
}

.mobile-toast .toast-content {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
}

.mobile-toast.success .toast-content i {
    color: var(--success);
}

.mobile-toast.warning .toast-content i {
    color: var(--warning);
}

.mobile-toast.info .toast-content i {
    color: var(--info);
}

@media (max-width: 480px) {
    .blog-post-mobile {
        flex-direction: column;
    }
    
    .post-image-small {
        width: 100%;
        height: 150px;
    }
    
    .post-actions,
    .post-actions-small {
        flex-direction: column;
    }
    
    .modal-actions {
        flex-direction: column;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', mobileBlogStyles);