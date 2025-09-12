/* ==========================================================================
   DOM Content Loaded
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeInteractiveEffects();
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

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
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
}

/* ==========================================================================
   Scroll Effects
   ========================================================================== */

function initializeScrollEffects() {
    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            }
        }
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-bg');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

/* ==========================================================================
   Animation Functions
   ========================================================================== */

function initializeAnimations() {
    // Add typing effect to hero subtitle
    setTimeout(() => {
        const subtitle = document.querySelector('.hero-subtitle');
        if (subtitle) {
            const originalText = subtitle.textContent;
            typeWriter(subtitle, originalText, 50);
        }
    }, 1500);

    // Add more floating elements dynamically
    createFloatingElements();
}

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

function createFloatingElement() {
    const element = document.createElement('div');
    element.className = 'floating-element';
    element.style.top = Math.random() * 100 + '%';
    element.style.left = Math.random() * 100 + '%';
    element.style.animationDelay = Math.random() * 6 + 's';
    element.style.animationDuration = (Math.random() * 4 + 4) + 's';
    return element;
}

function createFloatingElements() {
    const floatingContainer = document.querySelector('.floating-elements');
    if (floatingContainer) {
        for (let i = 0; i < 5; i++) {
            floatingContainer.appendChild(createFloatingElement());
        }
    }
}

/* ==========================================================================
   Interactive Effects
   ========================================================================== */

function initializeInteractiveEffects() {
    // Add hover effects to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(-10px) scale(1)';
        });
    });

    // Initialize ripple effects
    initializeRippleEffects();

    // Initialize custom cursor
    initializeCustomCursor();

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
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
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    }

    // Apply ripple effect to all buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', createRipple);
    });
}

/* ==========================================================================
   Custom Cursor
   ========================================================================== */

function initializeCustomCursor() {
    // Check if device supports hover (not mobile)
    if (window.matchMedia("(hover: hover)").matches) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });

        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'scale(0.8)';
        });

        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'scale(1)';
        });

        // Hide cursor when leaving viewport
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
        });
    }
}

/* ==========================================================================
   Utility Functions
   ========================================================================== */

// Debounce function for performance optimization
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Add any additional scroll-based functionality here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

/* ==========================================================================
   Intersection Observer for Performance
   ========================================================================== */

// Lazy load animations for better performance
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add specific animations based on element type
            const element = entry.target;
            
            if (element.classList.contains('skill-item')) {
                element.style.animationDelay = Math.random() * 0.5 + 's';
                element.classList.add('animate-in');
            }
            
            if (element.classList.contains('project-card')) {
                element.style.animationDelay = Math.random() * 0.3 + 's';
                element.classList.add('slide-in');
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Observe elements for animations
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.skill-item, .project-card').forEach(el => {
        animationObserver.observe(el);
    });
});

/* ==========================================================================
   Error Handling
   ========================================================================== */

window.addEventListener('error', (e) => {
    console.log('An error occurred:', e.error);
    // Add user-friendly error handling here if needed
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.log('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});

/* ==========================================================================
   Performance Monitoring
   ========================================================================== */

// Simple performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.log(`Page loaded in ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
            }
        }, 0);
    });
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

// Reduce motion for users who prefer it
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
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