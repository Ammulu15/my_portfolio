// Portfolio JavaScript - Ammulu Uppalapati
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeThemeToggle();
    initializeMobileMenu();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeContactForm();
    initializeScrollEffects();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Update active navigation link based on scroll position
    window.addEventListener('scroll', function() {
        let currentSection = '';
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// Theme toggle functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    updateThemeIcon(currentTheme, themeIcon);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-color-scheme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme, themeIcon);
        
        // Add animation effect
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
}

function updateThemeIcon(theme, iconElement) {
    iconElement.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Mobile menu functionality
function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// Scroll animations
function initializeScrollAnimations() {
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
    
    // Add animation class to elements
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .detail-card, .timeline-item');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Skill bars animation
function initializeSkillBars() {
    const skillsSection = document.getElementById('skills');
    let skillsAnimated = false;
    
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                animateSkillBars();
                skillsAnimated = true;
            }
        });
    }, { threshold: 0.3 });
    
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const targetWidth = bar.getAttribute('data-width');
        
        setTimeout(() => {
            bar.style.width = `${targetWidth}%`;
        }, index * 200);
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const message = formData.get('message').trim();
            
            // Validate form
            if (!validateForm(name, email, message)) {
                return;
            }
            
            // Simulate form submission
            submitForm(name, email, message);
        });
    }
}

function validateForm(name, email, message) {
    const errors = [];
    
    if (!name || name.length < 2) {
        errors.push('Please enter a valid name (at least 2 characters)');
    }
    
    if (!email || !isValidEmail(email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!message || message.length < 10) {
        errors.push('Please enter a message (at least 10 characters)');
    }
    
    if (errors.length > 0) {
        showFormMessage(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function submitForm(name, email, message) {
    const submitBtn = document.querySelector('#contact-form button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showFormMessage(`Thank you, ${name}! Your message has been received. I'll get back to you soon.`, 'success');
        
        // Reset form
        document.getElementById('contact-form').reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageEl = document.createElement('div');
    messageEl.className = `form-message status status--${type === 'error' ? 'error' : 'success'}`;
    messageEl.innerHTML = message;
    messageEl.style.marginTop = '16px';
    messageEl.style.textAlign = 'center';
    
    // Insert message after form
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(messageEl, form.nextSibling);
    
    // Auto remove message after 5 seconds
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.remove();
        }
    }, 5000);
}

// Scroll effects for navbar
function initializeScrollEffects() {
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class when scrolling down
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Additional interactivity for project cards
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', debounce(function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 10));

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger hero animations
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Press 'T' to toggle theme
    if (e.key === 't' || e.key === 'T') {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            document.getElementById('theme-toggle').click();
        }
    }
});

// Performance optimization: Lazy load images if any are added later
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Call lazy load on DOM ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add smooth reveal animation for sections
function initializeSectionReveals() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });
}

// Initialize section reveals
document.addEventListener('DOMContentLoaded', initializeSectionReveals);

// Add CSS classes for section animations
const style = document.createElement('style');
style.textContent = `
    .section-hidden {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .section-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .loaded .hero-title,
    .loaded .hero-subtitle,
    .loaded .hero-description,
    .loaded .hero-buttons {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
`;
document.head.appendChild(style);