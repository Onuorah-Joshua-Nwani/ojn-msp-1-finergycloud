// Mobile App Email Integration for FinergyCloud

class MobileEmailIntegration {
    constructor() {
        this.emailEndpoint = 'https://formspree.io/f/contact@finergycloud.com';
        this.autoResponseEnabled = true;
        this.responseTimeHours = 24;
        this.init();
    }

    init() {
        this.setupMobileFormHandlers();
        this.addContactFormToMobileApp();
    }

    setupMobileFormHandlers() {
        // Handle mobile app contact forms
        document.addEventListener('submit', (e) => {
            if (e.target.classList.contains('mobile-contact-form')) {
                this.handleMobileFormSubmission(e);
            }
        });
    }

    addContactFormToMobileApp() {
        // Add contact page to mobile app navigation
        const mainContent = document.getElementById('main-content');
        if (mainContent && !document.getElementById('contact-page')) {
            const contactPage = document.createElement('div');
            contactPage.className = 'page';
            contactPage.id = 'contact-page';
            contactPage.innerHTML = this.generateMobileContactPageHTML();
            mainContent.appendChild(contactPage);
        }

        // Add contact navigation
        this.addContactNavigation();
    }

    addContactNavigation() {
        // Add to side navigation
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            const contactNavItem = document.createElement('li');
            contactNavItem.className = 'nav-item';
            contactNavItem.innerHTML = `
                <a href="#contact" class="nav-link" data-page="contact">
                    <i class="bi bi-envelope"></i>
                    <span>Contact</span>
                </a>
            `;
            navMenu.appendChild(contactNavItem);
        }
    }

    generateMobileContactPageHTML() {
        return `
            <div class="page-header">
                <h1>Contact Us</h1>
                <p>Get in touch with the FinergyCloud team</p>
            </div>

            <!-- Quick Contact Options -->
            <div class="quick-contact-options">
                <div class="quick-contact-item" onclick="window.open('mailto:contact@finergycloud.com')">
                    <div class="quick-contact-icon">
                        <i class="bi bi-envelope"></i>
                    </div>
                    <div class="quick-contact-content">
                        <h4>Email</h4>
                        <p>contact@finergycloud.com</p>
                        <small>24h response time</small>
                    </div>
                </div>
                
                <div class="quick-contact-item" onclick="window.open('https://www.linkedin.com/company/finergycloud', '_blank')">
                    <div class="quick-contact-icon">
                        <i class="bi bi-linkedin"></i>
                    </div>
                    <div class="quick-contact-content">
                        <h4>LinkedIn</h4>
                        <p>Professional networking</p>
                        <small>Same day response</small>
                    </div>
                </div>
            </div>

            <!-- Contact Form -->
            <div class="mobile-contact-form-container">
                <h3>Send us a message</h3>
                <p>We'll respond within 24 hours with a personalized message</p>
                
                <form class="mobile-contact-form">
                    <div class="form-group">
                        <label for="mobile-fullname">Full Name *</label>
                        <input type="text" id="mobile-fullname" name="fullname" class="form-control" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="mobile-email">Email Address *</label>
                        <input type="email" id="mobile-email" name="email" class="form-control" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="mobile-company">Company</label>
                        <input type="text" id="mobile-company" name="company" class="form-control">
                    </div>
                    
                    <div class="form-group">
                        <label for="mobile-interest">Primary Interest *</label>
                        <select id="mobile-interest" name="interest" class="form-control" required>
                            <option value="">Select your interest</option>
                            <option value="demo">Book a Demo</option>
                            <option value="pitch-deck">Request Pitch Deck</option>
                            <option value="partnership">Partnership</option>
                            <option value="investment">Investment</option>
                            <option value="beta-access">Beta Access</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="mobile-message">Message</label>
                        <textarea id="mobile-message" name="message" class="form-control" rows="4" 
                                placeholder="Tell us about your needs..."></textarea>
                    </div>
                    
                    <div class="form-check">
                        <input type="checkbox" id="mobile-newsletter" name="newsletter" class="form-check-input">
                        <label for="mobile-newsletter" class="form-check-label">
                            Receive updates about FinergyCloud
                        </label>
                    </div>
                    
                    <button type="submit" class="btn btn-primary btn-block">
                        <i class="bi bi-send me-2"></i>Send Message
                    </button>
                    
                    <p class="form-note">
                        <small>
                            <i class="bi bi-shield-check me-1"></i>
                            Your information is secure and will never be shared.
                        </small>
                    </p>
                </form>
            </div>

            <!-- Response Guarantee -->
            <div class="response-guarantee-mobile">
                <div class="guarantee-content">
                    <h4>Our Response Guarantee</h4>
                    <div class="guarantee-items">
                        <div class="guarantee-item">
                            <i class="bi bi-clock text-success"></i>
                            <span>24-hour response time</span>
                        </div>
                        <div class="guarantee-item">
                            <i class="bi bi-person text-success"></i>
                            <span>Personalized response</span>
                        </div>
                        <div class="guarantee-item">
                            <i class="bi bi-shield-check text-success"></i>
                            <span>Privacy protected</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async handleMobileFormSubmission(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        
        // Show loading state
        this.showMobileLoadingState(form);
        
        try {
            // Send form data
            await this.submitMobileForm(formData);
            
            // Send auto-response
            if (this.autoResponseEnabled) {
                await this.sendMobileAutoResponse(formData);
            }
            
            // Show success message
            this.showMobileSuccessMessage(form, formData.get('fullname') || 'there');
            
            // Reset form
            form.reset();
            
        } catch (error) {
            console.error('Mobile form submission error:', error);
            this.showMobileErrorMessage(form);
        } finally {
            this.hideMobileLoadingState(form);
        }
    }

    async submitMobileForm(formData) {
        // Simulate form submission
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Mobile form submitted:', Object.fromEntries(formData));
                resolve();
            }, 1000);
        });
    }

    async sendMobileAutoResponse(formData) {
        const userEmail = formData.get('email');
        const userName = formData.get('fullname') || 'there';
        const userInterest = formData.get('interest') || 'general inquiry';
        const userCompany = formData.get('company') || '';
        
        const emailTemplate = this.generateMobileAutoResponseEmail(userName, userInterest, userCompany);
        
        console.log('Mobile auto-response email would be sent to:', userEmail);
        console.log('Email content:', emailTemplate);
        
        return new Promise((resolve) => {
            setTimeout(resolve, 500);
        });
    }

    generateMobileAutoResponseEmail(userName, interest, company) {
        const currentDate = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const responseTime = this.calculateResponseTime();
        
        return {
            subject: `Thank you for contacting FinergyCloud via mobile - Response within ${this.responseTimeHours} hours`,
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank you for contacting FinergyCloud</title>
    <style>
        body { font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: linear-gradient(135deg, #004d40 0%, #00bfa5 100%); color: white; padding: 30px 20px; text-align: center; }
        .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        .tagline { font-size: 14px; opacity: 0.9; }
        .mobile-badge { background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; font-size: 12px; margin-top: 10px; display: inline-block; }
        .content { padding: 30px 20px; }
        .greeting { font-size: 18px; color: #004d40; margin-bottom: 20px; }
        .message { margin-bottom: 25px; }
        .highlight-box { background: #e8f5e8; border-left: 4px solid #00bfa5; padding: 20px; margin: 25px 0; border-radius: 5px; }
        .response-time { background: #004d40; color: white; padding: 15px; border-radius: 8px; text-align: center; margin: 25px 0; }
        .mobile-features { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0; }
        .app-download { background: linear-gradient(135deg, #004d40 0%, #00bfa5 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 25px 0; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; }
        .btn { display: inline-block; background: #00bfa5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 5px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 8px; }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="logo">FinergyCloud</div>
            <div class="tagline">AI Risk Intelligence for Renewable Energy Investors</div>
            <div class="mobile-badge">📱 Mobile App Message</div>
        </div>

        <!-- Main Content -->
        <div class="content">
            <div class="greeting">Hello ${userName},</div>
            
            <div class="message">
                <p>Thank you for reaching out to FinergyCloud through our mobile app! We've received your inquiry regarding <strong>${interest}</strong>${company ? ` from ${company}` : ''} and we're excited to connect with you.</p>
            </div>

            <div class="response-time">
                <strong>⏰ Mobile Response Commitment</strong><br>
                We will respond to your mobile inquiry within <strong>${this.responseTimeHours} hours</strong><br>
                Expected response by: <strong>${responseTime}</strong>
            </div>

            <div class="mobile-features">
                <h3 style="color: #004d40; margin-top: 0;">📱 Mobile App Features</h3>
                <p>Since you're using our mobile app, you have access to:</p>
                <ul>
                    <li><strong>Real-time Analytics:</strong> Live investment data and insights</li>
                    <li><strong>IRR Calculator:</strong> On-the-go financial modeling</li>
                    <li><strong>ESG Scoring:</strong> Instant sustainability assessments</li>
                    <li><strong>Market Intelligence:</strong> Emerging market updates</li>
                    <li><strong>Offline Access:</strong> Work without internet connection</li>
                </ul>
            </div>

            <div class="highlight-box">
                <h3 style="color: #004d40; margin-top: 0;">What happens next?</h3>
                <ul>
                    <li><strong>Immediate:</strong> Your mobile inquiry is prioritized in our system</li>
                    <li><strong>Within 4 hours:</strong> Our team reviews your specific mobile app usage and requirements</li>
                    <li><strong>Within ${this.responseTimeHours} hours:</strong> You'll receive a detailed response optimized for mobile</li>
                    <li><strong>Follow-up:</strong> We'll schedule a mobile-friendly demo or call</li>
                </ul>
            </div>

            <div class="app-download">
                <h3 style="margin-top: 0;">🚀 Get the Full Experience</h3>
                <p>Download our mobile app for the complete FinergyCloud experience:</p>
                <a href="https://play.google.com/store/apps/details?id=com.finergycloud.app" class="btn">📱 Download Android App</a>
                <p style="margin-top: 15px; font-size: 14px; opacity: 0.9;">
                    Available on Google Play Store • iOS version coming soon
                </p>
            </div>

            <div class="message">
                <p><strong>Mobile-First Innovation:</strong></p>
                <p>Our mobile app brings sophisticated renewable energy investment analysis to your fingertips. Whether you're in the field evaluating projects or in meetings making decisions, FinergyCloud mobile ensures you have the intelligence you need, when you need it.</p>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p><strong>FinergyCloud Mobile</strong> - AI Risk Intelligence Anywhere, Anytime</p>
            <p>This email was sent on ${currentDate}</p>
            <p>© 2024 FinergyCloud. All rights reserved.</p>
            <p style="margin-top: 15px;">
                <a href="https://finergycloud.com" style="color: #004d40;">Visit our website</a> | 
                <a href="mailto:contact@finergycloud.com" style="color: #004d40;">Contact us</a>
            </p>
        </div>
    </div>
</body>
</html>`,
            text: `
Hello ${userName},

Thank you for reaching out to FinergyCloud through our mobile app! We've received your inquiry regarding ${interest}${company ? ` from ${company}` : ''}.

MOBILE RESPONSE COMMITMENT:
We will respond within ${this.responseTimeHours} hours
Expected response by: ${responseTime}

MOBILE APP FEATURES:
Since you're using our mobile app, you have access to:
- Real-time Analytics: Live investment data and insights
- IRR Calculator: On-the-go financial modeling
- ESG Scoring: Instant sustainability assessments
- Market Intelligence: Emerging market updates
- Offline Access: Work without internet connection

WHAT HAPPENS NEXT:
- Immediate: Your mobile inquiry is prioritized
- Within 4 hours: Our team reviews your mobile app usage
- Within ${this.responseTimeHours} hours: You'll receive our detailed mobile-optimized response
- Follow-up: We'll schedule a mobile-friendly demo or call

DOWNLOAD THE FULL APP:
Get the complete FinergyCloud experience:
Android: https://play.google.com/store/apps/details?id=com.finergycloud.app
iOS: Coming soon

CONTACT INFO:
Email: contact@finergycloud.com
Response Time: Within ${this.responseTimeHours} hours
Mobile Support: Available 24/7

Best regards,
The FinergyCloud Mobile Team

---
FinergyCloud Mobile - AI Risk Intelligence Anywhere, Anytime
© 2024 FinergyCloud. All rights reserved.
https://finergycloud.com
            `
        };
    }

    calculateResponseTime() {
        const now = new Date();
        const responseDate = new Date(now.getTime() + (this.responseTimeHours * 60 * 60 * 1000));
        
        // Adjust for business hours (9 AM - 6 PM GMT, Monday - Friday)
        const dayOfWeek = responseDate.getDay();
        const hour = responseDate.getHours();
        
        // If it's weekend, move to Monday
        if (dayOfWeek === 0) { // Sunday
            responseDate.setDate(responseDate.getDate() + 1);
            responseDate.setHours(9, 0, 0, 0);
        } else if (dayOfWeek === 6) { // Saturday
            responseDate.setDate(responseDate.getDate() + 2);
            responseDate.setHours(9, 0, 0, 0);
        }
        
        // If it's outside business hours, adjust
        if (hour < 9) {
            responseDate.setHours(9, 0, 0, 0);
        } else if (hour >= 18) {
            responseDate.setDate(responseDate.getDate() + 1);
            responseDate.setHours(9, 0, 0, 0);
        }
        
        return responseDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        });
    }

    showMobileLoadingState(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <div class="loading-spinner"></div>
                Sending...
            `;
        }
    }

    hideMobileLoadingState(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <i class="bi bi-send me-2"></i>Send Message
            `;
        }
    }

    showMobileSuccessMessage(form, userName) {
        const successToast = document.createElement('div');
        successToast.className = 'mobile-success-toast';
        successToast.innerHTML = `
            <div class="toast-content">
                <div class="toast-icon">
                    <i class="bi bi-check-circle-fill"></i>
                </div>
                <div class="toast-text">
                    <h5>Message Sent!</h5>
                    <p>Thank you ${userName}! We'll respond within 24 hours.</p>
                    <small>Confirmation email sent to your inbox</small>
                </div>
            </div>
        `;
        
        document.body.appendChild(successToast);
        
        setTimeout(() => {
            successToast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            successToast.classList.remove('show');
            setTimeout(() => {
                successToast.remove();
            }, 300);
        }, 5000);
    }

    showMobileErrorMessage(form) {
        const errorToast = document.createElement('div');
        errorToast.className = 'mobile-error-toast';
        errorToast.innerHTML = `
            <div class="toast-content">
                <div class="toast-icon">
                    <i class="bi bi-exclamation-triangle-fill"></i>
                </div>
                <div class="toast-text">
                    <h5>Send Failed</h5>
                    <p>Please try again or email us directly</p>
                    <small>contact@finergycloud.com</small>
                </div>
            </div>
        `;
        
        document.body.appendChild(errorToast);
        
        setTimeout(() => {
            errorToast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            errorToast.classList.remove('show');
            setTimeout(() => {
                errorToast.remove();
            }, 300);
        }, 4000);
    }
}

// Initialize mobile email integration
document.addEventListener('DOMContentLoaded', () => {
    window.mobileEmailIntegration = new MobileEmailIntegration();
});

// Add mobile email styles
const mobileEmailStyles = `
<style>
/* Mobile Contact Styles */
.quick-contact-options {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-xl);
}

.quick-contact-item {
    background: var(--white);
    padding: var(--spacing-lg);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    cursor: pointer;
    transition: var(--transition-normal);
    border: 1px solid rgba(0, 77, 64, 0.1);
}

.quick-contact-item:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
}

.quick-contact-icon {
    width: 60px;
    height: 60px;
    background: var(--gradient-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font-size: 1.5rem;
    flex-shrink: 0;
}

.quick-contact-content h4 {
    color: var(--primary-green);
    margin-bottom: 0.25rem;
    font-size: 1.1rem;
}

.quick-contact-content p {
    color: var(--text-light);
    margin-bottom: 0.25rem;
    font-size: 0.9rem;
}

.quick-contact-content small {
    color: var(--gray);
    font-size: 0.8rem;
}

.mobile-contact-form-container {
    background: var(--white);
    padding: var(--spacing-xl);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    margin-bottom: var(--spacing-xl);
}

.mobile-contact-form-container h3 {
    color: var(--primary-green);
    margin-bottom: 0.5rem;
}

.mobile-contact-form-container p {
    color: var(--text-light);
    margin-bottom: var(--spacing-lg);
}

.mobile-contact-form .form-group {
    margin-bottom: var(--spacing-lg);
}

.mobile-contact-form .form-group label {
    display: block;
    font-weight: var(--font-weight-semibold);
    color: var(--primary-green);
    margin-bottom: 0.5rem;
}

.mobile-contact-form .form-control {
    width: 100%;
    padding: var(--spacing-md);
    border: 2px solid rgba(0, 77, 64, 0.2);
    border-radius: var(--radius-md);
    font-size: 16px; /* Prevent zoom on iOS */
    transition: var(--transition-fast);
}

.mobile-contact-form .form-control:focus {
    outline: none;
    border-color: var(--accent-teal);
    box-shadow: 0 0 0 3px rgba(0, 191, 165, 0.1);
}

.mobile-contact-form .form-check {
    margin-bottom: var(--spacing-lg);
}

.mobile-contact-form .form-check-input {
    margin-right: 0.5rem;
}

.mobile-contact-form .form-check-label {
    color: var(--text-dark);
    font-size: 0.9rem;
}

.mobile-contact-form .btn-block {
    width: 100%;
    padding: var(--spacing-lg);
    font-size: 1.1rem;
    margin-bottom: var(--spacing-md);
}

.mobile-contact-form .form-note {
    text-align: center;
    color: var(--gray);
    font-size: 0.8rem;
}

.response-guarantee-mobile {
    background: var(--light-green);
    padding: var(--spacing-lg);
    border-radius: var(--radius-lg);
    border: 1px solid var(--accent-teal);
}

.response-guarantee-mobile h4 {
    color: var(--primary-green);
    margin-bottom: var(--spacing-md);
    text-align: center;
}

.guarantee-items {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.guarantee-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: var(--text-dark);
}

/* Mobile Toast Styles */
.mobile-success-toast,
.mobile-error-toast {
    position: fixed;
    top: calc(var(--header-height) + var(--spacing-md));
    left: var(--spacing-md);
    right: var(--spacing-md);
    background: var(--white);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-xl);
    padding: var(--spacing-lg);
    z-index: 1002;
    transform: translateY(-100px);
    opacity: 0;
    transition: all 0.3s ease;
}

.mobile-success-toast {
    border-left: 4px solid var(--success);
}

.mobile-error-toast {
    border-left: 4px solid var(--danger);
}

.mobile-success-toast.show,
.mobile-error-toast.show {
    transform: translateY(0);
    opacity: 1;
}

.toast-content {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-md);
}

.toast-icon {
    font-size: 2rem;
    flex-shrink: 0;
}

.mobile-success-toast .toast-icon {
    color: var(--success);
}

.mobile-error-toast .toast-icon {
    color: var(--danger);
}

.toast-text h5 {
    color: var(--primary-green);
    margin-bottom: 0.25rem;
    font-size: 1rem;
}

.toast-text p {
    color: var(--text-dark);
    margin-bottom: 0.25rem;
    font-size: 0.9rem;
}

.toast-text small {
    color: var(--gray);
    font-size: 0.8rem;
}

@media (max-width: 480px) {
    .quick-contact-item {
        flex-direction: column;
        text-align: center;
    }
    
    .mobile-contact-form-container {
        padding: var(--spacing-lg);
    }
    
    .guarantee-items {
        gap: var(--spacing-md);
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', mobileEmailStyles);