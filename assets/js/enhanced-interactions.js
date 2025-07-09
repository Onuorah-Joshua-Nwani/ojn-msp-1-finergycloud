// Enhanced Interactive JavaScript for FinergyCloud

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initLoadingAnimation();
    initScrollAnimations();
    initParallaxEffects();
    initInteractiveCards();
    initFormEnhancements();
    initNavigationEffects();
    initCounterAnimations();
    initParticleEffects();
    initSmoothScrolling();
    initTooltips();
});

// Loading Animation
function initLoadingAnimation() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loadingOverlay);

    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 1000);
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.card, .container h2, .jumbotron, .accordion');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Parallax Effects
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.jumbotron');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Interactive Cards
function initInteractiveCards() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // Add ripple effect
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 1000;
            `;
            
            card.style.position = 'relative';
            card.style.overflow = 'hidden';
            card.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Add tilt effect
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Form Enhancements
function initFormEnhancements() {
    const formInputs = document.querySelectorAll('.form-control');
    
    formInputs.forEach(input => {
        // Add floating label effect
        const label = input.previousElementSibling;
        if (label && label.classList.contains('form-label')) {
            input.addEventListener('focus', function() {
                label.style.transform = 'translateY(-25px) scale(0.8)';
                label.style.color = '#007bff';
            });
            
            input.addEventListener('blur', function() {
                if (!input.value) {
                    label.style.transform = 'translateY(0) scale(1)';
                    label.style.color = '#343a40';
                }
            });
        }
        
        // Add typing animation
        input.addEventListener('input', function() {
            input.style.borderColor = '#007bff';
            input.style.boxShadow = '0 0 0 0.25rem rgba(0, 123, 255, 0.15)';
        });
    });

    // Enhanced form submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('input[type="submit"], button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
                submitBtn.disabled = true;
            }
        });
    });
}

// Navigation Effects
function initNavigationEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Change navbar background on scroll
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 8px 25px rgba(0, 123, 255, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 15px rgba(0, 123, 255, 0.1)';
        }
    });
}

// Counter Animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');
    
    const countUp = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 20);
    };
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                countUp(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// Particle Effects
function initParticleEffects() {
    const createParticle = () => {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            animation: float 6s linear infinite;
        `;
        
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 6000);
    };
    
    setInterval(createParticle, 2000);
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = this.dataset.tooltip;
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 14px;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 10);
            
            this.addEventListener('mouseleave', function() {
                tooltip.remove();
            }, { once: true });
        });
    });
}

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .custom-tooltip {
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Enhanced accordion functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('accordion-button')) {
        const button = e.target;
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        
        // Add rotation animation to button
        button.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
        
        // Add slide animation to content
        const content = document.querySelector(button.getAttribute('data-bs-target'));
        if (content) {
            content.style.transition = 'all 0.5s ease';
        }
    }
});

// Enhanced carousel functionality for services page
function toggleCollapseAndCarousel(index, collapseId) {
    const collapseElement = document.getElementById(collapseId);
    const isCollapsed = collapseElement.classList.contains('show');

    if (isCollapsed) {
        const myCarousel = document.getElementById('carouselExampleCaptions');
        if (myCarousel) {
            const carousel = new bootstrap.Carousel(myCarousel);
            carousel.to(index);
        }
    }

    const collapse = new bootstrap.Collapse(collapseElement, { toggle: true });
}

// Make function globally available
window.toggleCollapseAndCarousel = toggleCollapseAndCarousel;

// Add interactive background to hero section
function createInteractiveBackground() {
    const hero = document.querySelector('.jumbotron');
    if (!hero) return;
    
    hero.addEventListener('mousemove', function(e) {
        const rect = hero.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        hero.style.backgroundPosition = `${x}% ${y}%`;
    });
}

// Initialize interactive background
createInteractiveBackground();

// Add dynamic color changing based on time of day
function initDynamicTheming() {
    const hour = new Date().getHours();
    const root = document.documentElement;
    
    if (hour >= 6 && hour < 12) {
        // Morning theme
        root.style.setProperty('--gradient-primary', 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)');
    } else if (hour >= 12 && hour < 18) {
        // Afternoon theme
        root.style.setProperty('--gradient-primary', 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)');
    } else {
        // Evening/Night theme
        root.style.setProperty('--gradient-primary', 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)');
    }
}

// Initialize dynamic theming
initDynamicTheming();