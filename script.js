// Portfolio Interactive Features and Animations

// Emoji changer for logo
let currentEmojiIndex = 0;
const emojis = ['🚀', '💡', '⚡', '🎯', '🔥', '✨', '🌟', '💻', '🎉', '🏆'];

function changeEmoji() {
    const logoEmoji = document.querySelector('.logo-emoji');
    currentEmojiIndex = (currentEmojiIndex + 1) % emojis.length;
    logoEmoji.textContent = emojis[currentEmojiIndex];
    
    // Add a fun animation
    logoEmoji.style.transform = 'scale(1.3) rotate(20deg)';
    setTimeout(() => {
        logoEmoji.style.transform = 'scale(1) rotate(0deg)';
    }, 200);
}

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initializeNavigation();
    
    // Smooth scrolling
    initializeSmoothScrolling();
    
    // Scroll animations
    initializeScrollAnimations();
    
    // Typing effect for hero section
    initializeTypingEffect();
    
    // Mobile menu functionality
    initializeMobileMenu();
    
    // Dynamic navbar background
    initializeNavbarEffects();
    
    // Skill tag hover effects
    initializeSkillEffects();
    
    // Contact form functionality (if needed)
    initializeContactForm();
    
    // Performance optimizations
    initializeIntersectionObserver();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Update active nav link based on scroll position
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
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
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.nav-menu');
                const hamburger = document.querySelector('.hamburger');
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
}

// Scroll animations using Intersection Observer
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .timeline-content, .education-card, .contact-item, .stat-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
}

// Typing effect for hero section
function initializeTypingEffect() {
    const roles = ['AI/ML Engineer', 'Full-Stack Developer', 'Problem Solver', 'Innovation Driver'];
    const heroSubtitle = document.querySelector('.hero-subtitle');
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isTyping = true;
    
    function typeRole() {
        const currentRole = roles[currentRoleIndex];
        
        if (isTyping) {
            if (currentCharIndex < currentRole.length) {
                heroSubtitle.textContent = currentRole.slice(0, currentCharIndex + 1);
                currentCharIndex++;
                setTimeout(typeRole, 100);
            } else {
                isTyping = false;
                setTimeout(typeRole, 2000); // Pause before deleting
            }
        } else {
            if (currentCharIndex > 0) {
                heroSubtitle.textContent = currentRole.slice(0, currentCharIndex - 1);
                currentCharIndex--;
                setTimeout(typeRole, 50);
            } else {
                isTyping = true;
                currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                setTimeout(typeRole, 500); // Pause before typing next role
            }
        }
    }
    
    // Start typing effect after a delay
    setTimeout(typeRole, 1000);
}

// Mobile menu functionality
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Add mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                left: -100%;
                top: 70px;
                flex-direction: column;
                background-color: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(10px);
                width: 100%;
                text-align: center;
                transition: 0.3s;
                box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
                padding: 2rem 0;
                gap: 1.5rem;
            }
            
            .nav-menu.active {
                left: 0;
            }
            
            .hamburger.active span:nth-child(1) {
                transform: rotate(-45deg) translate(-5px, 6px);
            }
            
            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active span:nth-child(3) {
                transform: rotate(45deg) translate(-5px, -6px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Dynamic navbar background on scroll
function initializeNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    
    function updateNavbar() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'none';
        }
    }
    
    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Initial call
}

// Enhanced skill tag effects
function initializeSkillEffects() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 5px 15px rgba(37, 99, 235, 0.3)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// Contact form functionality (basic validation)
function initializeContactForm() {
    // Add a simple contact form if needed
    const contactSection = document.querySelector('#contact .contact-cta');
    
    // You can add a contact form here if needed
    // This is a placeholder for future contact form implementation
    
    // Add email click tracking
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track email clicks for analytics if needed
            console.log('Email link clicked');
        });
    });
}

// Performance optimization with Intersection Observer
function initializeIntersectionObserver() {
    // Lazy load images when they come into view
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Animate counters when they come into view
    initializeCounterAnimation();
}

// Counter animation for statistics
function initializeCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetText = target.textContent;
                
                // Only animate if it contains numbers
                if (/\d/.test(targetText)) {
                    animateCounter(target, targetText);
                    counterObserver.unobserve(target);
                }
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => counterObserver.observe(stat));
}

function animateCounter(element, finalText) {
    // Extract number from text
    const numberMatch = finalText.match(/[\d.]+/);
    if (!numberMatch) return;
    
    const finalNumber = parseFloat(numberMatch[0]);
    const suffix = finalText.replace(numberMatch[0], '');
    const duration = 2000; // 2 seconds
    const stepTime = 50; // Update every 50ms
    const steps = duration / stepTime;
    const increment = finalNumber / steps;
    
    let current = 0;
    const timer = setInterval(() => {
        current += increment;
        if (current >= finalNumber) {
            current = finalNumber;
            clearInterval(timer);
        }
        
        // Format the number based on the original format
        let displayNumber;
        if (finalNumber % 1 === 0) {
            displayNumber = Math.floor(current);
        } else {
            displayNumber = current.toFixed(2);
        }
        
        element.textContent = displayNumber + suffix;
    }, stepTime);
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

// Add scroll progress indicator
function initializeScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2563eb, #06b6d4);
        z-index: 1001;
        transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);
    
    const updateProgress = debounce(() => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    }, 10);
    
    window.addEventListener('scroll', updateProgress);
}

// Initialize scroll progress indicator
initializeScrollProgress();

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});