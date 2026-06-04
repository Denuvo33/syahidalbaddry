/* ==========================================================================
   DOM Content Loaded
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeInteractiveEffects();
    initializeStaggeredAnimations();
});

/* ==========================================================================
   Navigation Functions
   ========================================================================== */

function initializeNavigation() {
    // Mobile Navigation Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Smooth scrolling for navigation links with easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Navbar height
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu) {
                    navMenu.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                }
            }
        });
    });

    // Active nav link on scroll
    updateActiveNavLink();
    window.addEventListener('scroll', debounce(updateActiveNavLink, 100));
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

/* ==========================================================================
   Scroll Effects
   ========================================================================== */

function initializeScrollEffects() {
    // Enhanced navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(15, 15, 15, 0.98)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(15, 15, 15, 0.85)';
                navbar.style.boxShadow = 'none';
            }
        }
    });

    // Subtle parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-bg');
        const heroContent = document.querySelector('.hero-content');
        
        if (parallax) {
            const speed = scrolled * 0.3;
            parallax.style.transform = `translateY(${speed}px)`;
        }
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });

    // Sophisticated scroll reveal animations
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation to improve performance
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        fadeObserver.observe(el);
    });

    // Staggered card animations
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.project-card, .service-card, .skill-item, .contact-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 80);
                });
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.02 });

    document.querySelectorAll('.category-grid, .services-grid, .skills-grid, .contact-grid').forEach(el => {
        // Set initial state
        el.querySelectorAll('.project-card, .service-card, .skill-item, .contact-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        cardObserver.observe(el);
    });
}

/* ==========================================================================
   Animation Functions
   ========================================================================== */

function initializeAnimations() {
    // Create more sophisticated floating elements
    createFloatingElements();
    
    // Animate section titles
    animateSectionTitles();
}

function createFloatingElement() {
    const element = document.createElement('div');
    element.className = 'floating-element';
    element.style.top = Math.random() * 100 + '%';
    element.style.left = Math.random() * 100 + '%';
    element.style.animationDelay = Math.random() * 8 + 's';
    element.style.animationDuration = (Math.random() * 6 + 6) + 's';
    element.style.width = (Math.random() * 3 + 2) + 'px';
    element.style.height = (Math.random() * 3 + 2) + 'px';
    return element;
}

function createFloatingElements() {
    const floatingContainer = document.querySelector('.floating-elements');
    if (floatingContainer) {
        for (let i = 0; i < 8; i++) {
            floatingContainer.appendChild(createFloatingElement());
        }
    }
}

function animateSectionTitles() {
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const title = entry.target;
                title.style.opacity = '0';
                title.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    title.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    title.style.opacity = '1';
                    title.style.transform = 'translateY(0)';
                }, 100);
                
                titleObserver.unobserve(title);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.section-title').forEach(title => {
        titleObserver.observe(title);
    });
}

function initializeStaggeredAnimations() {
    // Staggered animation for tech tags
    const tagObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const tags = entry.target.querySelectorAll('.tech-tag');
                tags.forEach((tag, index) => {
                    tag.style.opacity = '0';
                    tag.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        tag.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                        tag.style.opacity = '1';
                        tag.style.transform = 'scale(1)';
                    }, index * 60);
                });
                tagObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-tech').forEach(container => {
        tagObserver.observe(container);
    });
}

/* ==========================================================================
   Interactive Effects
   ========================================================================== */

function initializeInteractiveEffects() {
    // Sophisticated hover effects for cards
    document.querySelectorAll('.project-card, .service-card, .skill-item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Magnetic button effect
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });

    // Smooth hover animations for links
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(5px)';
                icon.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });

        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(0)';
            }
        });
    });

    // Initialize enhanced ripple effects
    initializeRippleEffects();

    // Add loading class removal
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        setTimeout(() => {
            document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .cta-buttons').forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        }, 100);
    });
}

/* ==========================================================================
   Ripple Effects
   ========================================================================== */

function initializeRippleEffects() {
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
        
        setTimeout(() => {
            circle.remove();
        }, 600);
    }

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', createRipple);
    });
}

/* ==========================================================================
   Utility Functions
   ========================================================================== */

function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/* ==========================================================================
   Accessibility Enhancements
   ========================================================================== */

// Add focus visible support for better keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Respect prefers-reduced-motion
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
        }
    `;
    document.head.appendChild(style);
}

/* ==========================================================================
   Performance Monitoring
   ========================================================================== */

if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.log(`Page loaded in ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
            }
        }, 0);
    });
}