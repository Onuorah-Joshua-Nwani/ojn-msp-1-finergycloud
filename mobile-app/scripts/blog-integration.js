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
                id: 'post-1',
                title: 'The AI Revolution in Renewable Energy Investment',
                category: 'AI & Technology',
                date: '2024-12-15',
                readTime: '5 min',
                excerpt: 'Discover how AI is transforming renewable energy investment decisions and why traditional models are failing.',
                image: '../assets/images/wind-turbine.jpg',
                featured: true,
                linkedInReady: true
            },
            {
                id: 'post-2',
                title: 'ESG Scoring Revolution: Making Sustainability Measurable',
                category: 'ESG & Sustainability',
                date: '2024-12-12',
                readTime: '4 min',
                excerpt: 'How AI is revolutionizing ESG scoring and making environmental impact quantifiable.',
                image: '../assets/images/investment.jpg',
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
                image: '../assets/images/digital-banking.jpg',
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
                image: '../assets/images/finance-analytics.jpg',
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
                image: '../assets/images/businessperson.jpg',
                featured: false,
                linkedInReady: true
            }
        ];
    }

    setupEventListeners() {
        // Add blog navigation to mobile app
        this.addBlogNavigation();
        this.setupBlogPage();
    }

    addBlogNavigation() {
        // Add blog link to side navigation
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
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

        // Add blog to bottom navigation
        const bottomNav = document.querySelector('.bottom-nav');
        if (bottomNav && bottomNav.children.length < 5) {
            const blogNavBtn = document.createElement('button');
            blogNavBtn.className = 'nav-btn';
            blogNavBtn.setAttribute('data-page', 'blog');
            blogNavBtn.innerHTML = `
                <i class="bi bi-journal-text"></i>
                <span>Blog</span>
            `;
            bottomNav.appendChild(blogNavBtn);
        }
    }

    setupBlogPage() {
        // Create blog page if it doesn't exist
        const mainContent = document.getElementById('main-content');
        if (mainContent && !document.getElementById('blog-page')) {
            const blogPage = document.createElement('div');
            blogPage.className = 'page';
            blogPage.id = 'blog-page';
            blogPage.innerHTML = this.generateBlogPageHTML();
            mainContent.appendChild(blogPage);
        }
    }

    generateBlogPageHTML() {
        const featuredPost = this.posts.find(post => post.featured);
        const regularPosts = this.posts.filter(post => !post.featured);

        return `
            <div class="page-header">
                <h1>Blog & Insights</h1>
                <p>Expert insights on AI-driven renewable energy investment</p>
            </div>

            <!-- Featured Post -->
            ${featuredPost ? `
            <div class="featured-post-mobile">
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
            </div>
            ` : ''}

            <!-- Recent Posts -->
            <div class="section">
                <div class="section-header">
                    <h2>Recent Posts</h2>
                </div>
                <div class="blog-posts-mobile">
                    ${regularPosts.map(post => `
                        <div class="blog-post-mobile">
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
                    `).join('')}
                </div>
            </div>

            <!-- Newsletter Signup -->
            <div class="newsletter-mobile">
                <div class="newsletter-content">
                    <h3>Stay Updated</h3>
                    <p>Get weekly insights delivered to your inbox</p>
                    <div class="newsletter-form">
                        <input type="email" class="form-control" placeholder="Enter your email" id="newsletter-email">
                        <button class="btn btn-primary" onclick="mobileBlog.subscribeNewsletter()">
                            <i class="bi bi-envelope"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
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

        // In a real app, this would navigate to a full post view
        // For now, we'll show a modal with post content
        this.showPostModal(post);
    }

    showPostModal(post) {
        const modal = document.createElement('div');
        modal.className = 'blog-modal';
        modal.innerHTML = `
            <div class="blog-modal-content">
                <div class="blog-modal-header">
                    <h3>${post.title}</h3>
                    <button class="blog-modal-close" onclick="this.closest('.blog-modal').remove()">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
                <div class="blog-modal-body">
                    <img src="${post.image}" alt="${post.title}" class="img-fluid rounded mb-3">
                    <div class="post-meta mb-3">
                        <span><i class="bi bi-calendar"></i> ${this.formatDate(post.date)}</span>
                        <span><i class="bi bi-clock"></i> ${post.readTime}</span>
                        <span><i class="bi bi-tag"></i> ${post.category}</span>
                    </div>
                    <p class="lead">${post.excerpt}</p>
                    <p>This is a preview of the full article. The complete post with detailed analysis, insights, and actionable recommendations is available on our website.</p>
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
        
        // Animate in
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    shareOnLinkedIn(postId) {
        const linkedInTemplates = {
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

At FinergyCloud, we're pioneering AI-driven risk intelligence specifically for renewable energy investments.

The future of renewable energy investment is intelligent. Are you ready?

#RenewableEnergy #AI #Investment #ESG #Fintech #SustainableFinance #CleanTech #Innovation

Read the full article: https://finergycloud.com/blog.html`,

            'post-2': `🌱 ESG Scoring Revolution: How AI is Making Sustainability Measurable

ESG factors are no longer nice-to-have metrics—they're essential for investment decisions. But traditional ESG scoring has been subjective and inconsistent. AI is changing that.

🔍 Traditional ESG Challenges:
• Subjective scoring methodologies
• Inconsistent data sources
• Manual analysis prone to bias
• Delayed reporting and updates

🤖 How AI is Revolutionizing ESG:
• Automated data collection from multiple sources
• Real-time sentiment analysis
• Objective, quantifiable scoring algorithms
• Continuous monitoring and updates

📊 The Impact:
• 70% more consistent scoring across projects
• Real-time ESG risk alerts
• Improved regulatory compliance
• Enhanced investment decision-making

At FinergyCloud, our AI-powered ESG scoring framework specifically addresses renewable energy projects in emerging markets.

#ESG #SustainableInvesting #AI #RenewableEnergy #CleanTech #Impact #Sustainability #Fintech

Read more: https://finergycloud.com/blog.html`,

            'post-3': `🌍 The $2.8 Trillion Opportunity: Why Emerging Markets Are the Future of Renewable Energy

While developed markets dominate headlines, the real opportunity lies in emerging markets.

📊 The Numbers:
• $2.8T investment gap by 2030
• 65% of global renewable growth from developing economies
• 3x higher IRR potential vs developed markets
• 2.6 billion people lack clean energy access

🚀 Why Emerging Markets Win:
• Abundant natural resources
• Lower development costs
• Supportive government policies
• Growing energy demand

⚠️ The Challenge: Risk Assessment
Traditional models fail due to limited data and political uncertainty.

💡 The Solution: AI-Driven Risk Intelligence
FinergyCloud provides local market intelligence and real-time monitoring.

#EmergingMarkets #RenewableEnergy #Investment #AI #CleanTech #SustainableFinance

Learn more: https://finergycloud.com/blog.html`,

            'post-4': `📊 Beyond Excel: The Future of IRR Simulation in Renewable Energy Projects

Excel has been the backbone of financial modeling, but it's no longer adequate for complex renewable energy analysis.

❌ Excel Limitations:
• Static models
• Limited scenario analysis
• Human error prone
• No real-time data integration

✅ Advanced IRR Simulation:
• Monte Carlo analysis with 10,000+ iterations
• Dynamic risk modeling
• Real-time data integration
• Automated scenario generation

🎯 Results:
• 85% more accurate risk assessment
• 60% faster analysis
• Better stakeholder communication
• Enhanced compliance

FinergyCloud's IRR engine incorporates ML, real-time data, and emerging market factors.

#FinancialModeling #IRR #RenewableEnergy #Investment #AI #Fintech

Discover more: https://finergycloud.com/blog.html`,

            'post-5': `🎓 From MBA Distinction to Startup: Building the Future of Sustainable Finance

The journey from academic research to fintech startup has been incredible.

📚 Academic Foundation:
• MBA with Distinction in Renewable Energy Finance
• Research focus: AI-driven investment analysis
• Supervisor recognition for exceptional work

💡 The Eureka Moment:
Discovered critical gap in renewable energy investment tools, especially for emerging markets.

🚀 From Idea to MVP:
• 2022: MBA project genesis
• 2023: MVP development and GitHub launch
• 2024: Company registration
• 2025: AI engine integration planned

🔑 Key Lessons:
• Academic excellence provides credibility
• Real-world validation is essential
• Technology must solve genuine problems
• Emerging markets offer massive opportunities

The future of sustainable finance is intelligent.

#Entrepreneurship #MBA #Startup #SustainableFinance #AI #RenewableEnergy #Fintech

Read the full story: https://finergycloud.com/blog.html`
        };

        const template = linkedInTemplates[postId];
        if (!template) return;

        // Copy to clipboard and open LinkedIn
        if (navigator.clipboard) {
            navigator.clipboard.writeText(template).then(() => {
                this.showToast('LinkedIn post copied! Opening LinkedIn...', 'success');
                window.open('https://www.linkedin.com/feed/', '_blank');
            }).catch(() => {
                this.showToast('Please copy the text manually', 'warning');
                window.open('https://www.linkedin.com/feed/', '_blank');
            });
        } else {
            // Fallback for older browsers
            this.showToast('Opening LinkedIn...', 'info');
            window.open('https://www.linkedin.com/feed/', '_blank');
        }
    }

    subscribeNewsletter() {
        const email = document.getElementById('newsletter-email');
        if (!email || !email.value) {
            this.showToast('Please enter your email address', 'warning');
            return;
        }

        // Simulate newsletter subscription
        this.showToast('Thank you for subscribing! You\'ll receive weekly insights.', 'success');
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
    top: 1rem;
    left: 1rem;
    background: var(--gradient-primary);
    color: var(--white);
    padding: 0.5rem 1rem;
    border-radius: var(--radius-sm);
    font-size: 0.8rem;
    font-weight: var(--font-weight-semibold);
}

.post-category-small {
    padding: 0.25rem 0.75rem;
    font-size: 0.7rem;
}

.featured-post-mobile .post-content {
    padding: var(--spacing-lg);
}

.post-meta,
.post-meta-small {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    color: var(--gray);
    flex-wrap: wrap;
}

.post-meta-small {
    font-size: 0.8rem;
    gap: 0.75rem;
}

.post-meta span,
.post-meta-small span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.featured-post-mobile h3 {
    color: var(--primary-green);
    margin-bottom: 1rem;
    font-weight: var(--font-weight-semibold);
}

.post-actions,
.post-actions-small {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
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
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: var(--font-weight-semibold);
    line-height: 1.3;
}

.post-content-small p {
    color: var(--text-light);
    margin-bottom: 0.75rem;
    font-size: 0.9rem;
    line-height: 1.4;
    flex: 1;
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
    margin-bottom: 0.5rem;
}

.newsletter-mobile p {
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 1.5rem;
}

.newsletter-form {
    display: flex;
    gap: 0.5rem;
    max-width: 300px;
    margin: 0 auto;
}

.newsletter-form .form-control {
    flex: 1;
    border: none;
    border-radius: var(--radius-md);
    padding: 0.75rem;
}

.newsletter-form .btn {
    border-radius: var(--radius-md);
    padding: 0.75rem 1rem;
}

/* Blog Modal */
.blog-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    padding: var(--spacing-md);
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
    padding: 0.5rem;
    border-radius: var(--radius-sm);
    transition: var(--transition-fast);
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
    gap: 0.5rem;
    margin-top: 1.5rem;
    flex-wrap: wrap;
}

/* Mobile Toast */
.mobile-toast {
    position: fixed;
    top: calc(var(--header-height) + var(--spacing-md));
    left: var(--spacing-md);
    right: var(--spacing-md);
    background: var(--white);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    padding: var(--spacing-md);
    z-index: 1001;
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
    gap: 0.5rem;
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