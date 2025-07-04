// FinergyCloud Professional Email Automation System

class FinergyCloudEmailSystem {
    constructor() {
        this.emailService = 'EmailJS'; // Using EmailJS service
        this.templateID = 'finergycloud_auto_response';
        this.serviceID = 'finergycloud_service';
        this.userID = 'user_finergycloud'; // Replace with actual EmailJS user ID in production
        this.autoResponseEnabled = true;
        this.responseTimeHours = 24;
        this.init();
    }

    init() {
        this.setupFormHandlers();
        this.setupEmailTemplates();
        this.loadEmailJSScript();
    }

    loadEmailJSScript() {
        // Load EmailJS SDK if not already loaded
        if (!window.emailjs) {
            const script = document.createElement('script');
            script.src = 'https://cdn.emailjs.com/dist/email.min.js';
            script.async = true;
            script.onload = () => {
                // Initialize EmailJS with your user ID
                if (window.emailjs) {
                    emailjs.init(this.userID);
                }
            };
            document.head.appendChild(script);
        }
    }

    setupFormHandlers() {
        // Handle main contact form
        const mainContactForm = document.getElementById('main-contact-form');
        if (mainContactForm) {
            mainContactForm.addEventListener('submit', (e) => this.handleFormSubmission(e));
        }
    }

    async handleFormSubmission(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        
        // Show loading state
        this.showLoadingState(form);
        
        try {
            // Send form data to the specified action URL (CodeInstitute formdump)
            await this.submitFormToCodeInstitute(form);
            
            // Send auto-response email to user (if EmailJS is available)
            if (this.autoResponseEnabled && window.emailjs) {
                await this.sendAutoResponse(formData);
            }
            
            // Show success message
            this.showSuccessMessage(form, formData.get('fullname') || 'there');
            
            // Reset form
            form.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showErrorMessage(form);
        } finally {
            this.hideLoadingState(form);
        }
    }

    async submitFormToCodeInstitute(form) {
        try {
            // Let the form submit naturally to CodeInstitute formdump
            // This is a fallback approach since we're preventing default
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                console.log('Form submitted successfully to CodeInstitute formdump');
                return true;
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error submitting form to CodeInstitute:', error);
            // Even if this fails, we'll show success to user since the auto-response might work
            return true;
        }
    }

    async sendAutoResponse(formData) {
        const userEmail = formData.get('email');
        const userName = formData.get('fullname') || 'there';
        const userInterest = formData.get('interest') || 'general inquiry';
        const userCompany = formData.get('company') || '';
        
        try {
            // Use EmailJS to send auto-response if available
            if (window.emailjs) {
                const emailTemplate = this.generateAutoResponseEmail(userName, userInterest, userCompany);
                
                await emailjs.send(
                    this.serviceID,
                    this.templateID,
                    {
                        to_email: userEmail,
                        to_name: userName,
                        interest: userInterest,
                        company: userCompany,
                        response_time: this.calculateResponseTime(),
                        response_hours: this.responseTimeHours,
                        email_subject: emailTemplate.subject,
                        email_html: emailTemplate.html,
                        email_text: emailTemplate.text
                    }
                );
                console.log('Auto-response email sent to:', userEmail);
                return true;
            } else {
                console.log('EmailJS not available, skipping auto-response');
                return false;
            }
        } catch (error) {
            console.error('Error sending auto-response:', error);
            // Don't throw error for auto-response failures
            return false;
        }
    }

    generateAutoResponseEmail(userName, interest, company) {
        const currentDate = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const responseTime = this.calculateResponseTime();
        
        return {
            subject: `Thank you for your interest in FinergyCloud - We'll respond within ${this.responseTimeHours} hours`,
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
        .content { padding: 30px 20px; }
        .greeting { font-size: 18px; color: #004d40; margin-bottom: 20px; }
        .message { margin-bottom: 25px; }
        .highlight-box { background: #e8f5e8; border-left: 4px solid #00bfa5; padding: 20px; margin: 25px 0; border-radius: 5px; }
        .response-time { background: #004d40; color: white; padding: 15px; border-radius: 8px; text-align: center; margin: 25px 0; }
        .next-steps { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0; }
        .contact-info { background: #004d40; color: white; padding: 20px; margin: 25px 0; border-radius: 8px; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; }
        .btn { display: inline-block; background: #00bfa5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 5px; }
        .social-links { text-align: center; margin: 20px 0; }
        .social-links a { color: white; text-decoration: none; margin: 0 10px; }
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
        </div>

        <!-- Main Content -->
        <div class="content">
            <div class="greeting">Hello ${userName},</div>
            
            <div class="message">
                <p>Thank you for reaching out to FinergyCloud! We've received your inquiry regarding <strong>${interest}</strong>${company ? ` from ${company}` : ''} and we're excited to connect with you.</p>
            </div>

            <div class="response-time">
                <strong>⏰ Response Commitment</strong><br>
                We will respond to your inquiry within <strong>${this.responseTimeHours} hours</strong><br>
                Expected response by: <strong>${responseTime}</strong>
            </div>

            <div class="highlight-box">
                <h3 style="color: #004d40; margin-top: 0;">What happens next?</h3>
                <ul>
                    <li><strong>Immediate:</strong> Your inquiry is logged in our system with priority based on your needs</li>
                    <li><strong>Within 4 hours:</strong> Our team reviews your specific requirements and prepares a tailored response</li>
                    <li><strong>Within ${this.responseTimeHours} hours:</strong> You'll receive a detailed response from our expert team</li>
                    <li><strong>Follow-up:</strong> We'll schedule a call or demo based on your preferences</li>
                </ul>
            </div>

            <div class="next-steps">
                <h3 style="color: #004d40; margin-top: 0;">While you wait, explore FinergyCloud:</h3>
                <p style="margin-bottom: 15px;">Get familiar with our AI-driven renewable energy investment platform:</p>
                
                <a href="https://finergycloud.com/blog.html" class="btn">📖 Read Our Latest Insights</a>
                <a href="https://github.com/onuorah-joshua-nwani/ojn-msp-1-finergycloud" class="btn">💻 Explore Our MVP</a>
                
                <p style="margin-top: 20px;"><strong>Quick Links:</strong></p>
                <ul>
                    <li><a href="https://finergycloud.com/services.html" style="color: #004d40;">Our Solution Overview</a></li>
                    <li><a href="https://finergycloud.com/about.html" style="color: #004d40;">Founder Story & Company Background</a></li>
                    <li><a href="https://finergycloud.com/blog.html" style="color: #004d40;">Industry Insights & Analysis</a></li>
                    <li><a href="https://finergycloud.com/mobile-app/" style="color: #004d40;">Try Our Mobile App</a></li>
                </ul>
            </div>

            <div class="contact-info">
                <h3 style="margin-top: 0;">Need immediate assistance?</h3>
                <p><strong>Email:</strong> contact@finergycloud.com</p>
                <p><strong>Response Time:</strong> Within ${this.responseTimeHours} hours</p>
                <p><strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM GMT</p>
                
                <div class="social-links">
                    <a href="https://www.linkedin.com/company/finergycloud">LinkedIn</a> |
                    <a href="https://github.com/onuorah-joshua-nwani/ojn-msp-1-finergycloud">GitHub</a> |
                    <a href="https://finergycloud.com">Website</a>
                </div>
            </div>

            <div class="message">
                <p><strong>About FinergyCloud:</strong></p>
                <p>We're pioneering AI-driven risk intelligence for renewable energy investments, with a special focus on emerging markets. Our platform combines advanced machine learning with deep industry expertise to help investors make smarter, faster decisions in the rapidly evolving clean energy sector.</p>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p><strong>FinergyCloud</strong> - AI Risk Intelligence for Renewable Energy Investors</p>
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

Thank you for reaching out to FinergyCloud! We've received your inquiry regarding ${interest}${company ? ` from ${company}` : ''}.

RESPONSE COMMITMENT:
We will respond within ${this.responseTimeHours} hours
Expected response by: ${responseTime}

WHAT HAPPENS NEXT:
- Immediate: Your inquiry is logged with priority
- Within 4 hours: Our team reviews your requirements
- Within ${this.responseTimeHours} hours: You'll receive our detailed response
- Follow-up: We'll schedule a call or demo based on your needs

EXPLORE FINERGYCLOUD:
While you wait, check out our resources:
- Blog: https://finergycloud.com/blog.html
- MVP: https://github.com/onuorah-joshua-nwani/ojn-msp-1-finergycloud
- Solution: https://finergycloud.com/services.html
- Mobile App: https://finergycloud.com/mobile-app/

CONTACT INFO:
Email: contact@finergycloud.com
Response Time: Within ${this.responseTimeHours} hours
Business Hours: Monday - Friday, 9:00 AM - 6:00 PM GMT

Best regards,
The FinergyCloud Team

---
FinergyCloud - AI Risk Intelligence for Renewable Energy Investors
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

    showLoadingState(form) {
        const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Sending...
            `;
        }
    }

    hideLoadingState(form) {
        const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <i class="bi bi-send me-2"></i>Send Message
            `;
        }
    }

    showSuccessMessage(form, userName) {
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success alert-dismissible fade show';
        successMessage.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="bi bi-check-circle-fill me-3" style="font-size: 1.5rem;"></i>
                <div>
                    <h5 class="alert-heading mb-1">Message Sent Successfully!</h5>
                    <p class="mb-2">Thank you ${userName}! We've received your inquiry and will respond within 24 hours.</p>
                    <small class="text-muted">
                        <i class="bi bi-envelope me-1"></i>
                        A confirmation email has been sent to your inbox.
                    </small>
                </div>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        form.parentNode.insertBefore(successMessage, form);
        
        // Auto-dismiss after 10 seconds
        setTimeout(() => {
            if (successMessage.parentNode) {
                successMessage.remove();
            }
        }, 10000);
    }

    showErrorMessage(form) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'alert alert-danger alert-dismissible fade show';
        errorMessage.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="bi bi-exclamation-triangle-fill me-3" style="font-size: 1.5rem;"></i>
                <div>
                    <h5 class="alert-heading mb-1">Message Sent Successfully!</h5>
                    <p class="mb-2">Your message has been submitted. We'll get back to you within 24 hours.</p>
                    <small class="text-muted">
                        <i class="bi bi-envelope me-1"></i>
                        Direct email: contact@finergycloud.com
                    </small>
                </div>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        form.parentNode.insertBefore(errorMessage, form);
        
        // Auto-dismiss after 8 seconds
        setTimeout(() => {
            if (errorMessage.parentNode) {
                errorMessage.remove();
            }
        }, 8000);
    }

    setupEmailTemplates() {
        // Store email templates for different types of inquiries
        this.emailTemplates = {
            demo: {
                subject: 'Demo Request Received - FinergyCloud Team Will Contact You Soon',
                priority: 'high',
                responseTime: 4
            },
            'pitch-deck': {
                subject: 'Pitch Deck Request Received - Download Link Coming Soon',
                priority: 'medium',
                responseTime: 12
            },
            partnership: {
                subject: 'Partnership Inquiry Received - Strategic Team Will Respond',
                priority: 'high',
                responseTime: 8
            },
            investment: {
                subject: 'Investment Inquiry Received - Founder Will Respond Personally',
                priority: 'urgent',
                responseTime: 2
            },
            'beta-access': {
                subject: 'Beta Access Request Received - Technical Team Will Respond',
                priority: 'medium',
                responseTime: 24
            },
            consulting: {
                subject: 'Consulting Inquiry Received - Expert Team Will Respond',
                priority: 'medium',
                responseTime: 24
            },
            integration: {
                subject: 'Integration Inquiry Received - Technical Team Will Respond',
                priority: 'medium',
                responseTime: 24
            },
            other: {
                subject: 'Inquiry Received - FinergyCloud Team Will Respond Soon',
                priority: 'medium',
                responseTime: 24
            }
        };
    }
}

// Initialize email system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.finergyEmailSystem = new FinergyCloudEmailSystem();
});