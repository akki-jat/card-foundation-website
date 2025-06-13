// Immediate failsafe to hide loading in case of any issues
setTimeout(() => {
    hideLoading();
}, 500);

// Additional failsafe for slow networks
setTimeout(() => {
    const loading = document.getElementById('loading');
    if (loading && !loading.classList.contains('hidden')) {
        console.warn('Loading took too long, forcing hide');
        hideLoading();
    }
}, 2000);

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Update ARIA attributes
    const isExpanded = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
}));

// Language Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    let currentLang = 'en';

    console.log('Language buttons found:', langButtons.length);

    const translations = {
        en: {
            title: "Empowering Communities Through Skills & Conservation",
            description: "CREATIVE ACTION FOR RURAL DEVELOPMENT FOUNDATION (CARD) is dedicated to empowering youth through skill development, promoting environmental sustainability, and protecting wildlife across rural and urban communities.",
            support: "Support Our Mission",
            learn: "Learn More"
        },
        hi: {
            title: "कौशल और संरक्षण के माध्यम से समुदायों को सशक्त बनाना",
            description: "रचनात्मक कार्य ग्रामीण विकास फाउंडेशन (CARD) कौशल विकास के माध्यम से युवाओं को सशक्त बनाने, पर्यावरणीय स्थिरता को बढ़ावा देने और ग्रामीण और शहरी समुदायों में वन्यजीवों की सुरक्षा के लिए समर्पित है।",
            support: "हमारे मिशन का समर्थन करें",
            learn: "और जानें"
        }
    };

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Language button clicked:', button.getAttribute('data-lang'));
            langButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentLang = button.getAttribute('data-lang');
            updateLanguage();
        });
    });

    function updateLanguage() {
        console.log('Updating language to:', currentLang);
        const heroTitle = document.querySelector('.hero-title');
        const heroDescription = document.querySelector('.hero-description');
        const supportBtn = document.querySelector('.hero-buttons .btn-primary');
        const learnBtn = document.querySelector('.hero-buttons .btn-secondary');
        
        console.log('Elements found:', {
            heroTitle: !!heroTitle,
            heroDescription: !!heroDescription,
            supportBtn: !!supportBtn,
            learnBtn: !!learnBtn
        });
        
        if (heroTitle) heroTitle.textContent = translations[currentLang].title;
        if (heroDescription) heroDescription.textContent = translations[currentLang].description;
        if (supportBtn) supportBtn.innerHTML = `<i class="fas fa-heart" aria-hidden="true"></i> ${translations[currentLang].support}`;
        if (learnBtn) learnBtn.innerHTML = `${translations[currentLang].learn} <i class="fas fa-arrow-right" aria-hidden="true"></i>`;
    }
});

// Enhanced Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links and scroll indicator
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced scroll indicator functionality
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Enhanced Donation amount buttons with payment methods
const amountButtons = document.querySelectorAll('.amount-btn');
const customAmountInput = document.getElementById('customAmount');
const paymentOptions = document.querySelectorAll('.payment-option');
let selectedAmount = 0;
let selectedPaymentMethod = '';

amountButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        amountButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Clear custom amount input
        customAmountInput.value = '';
        
        // Store selected amount
        selectedAmount = button.getAttribute('data-amount');
        console.log('Selected amount:', selectedAmount);
    });
});

// Custom amount input
customAmountInput.addEventListener('input', () => {
    // Remove active class from all buttons when custom amount is entered
    amountButtons.forEach(btn => btn.classList.remove('active'));
    selectedAmount = customAmountInput.value;
});

// Payment method selection
paymentOptions.forEach(option => {
    option.addEventListener('click', () => {
        paymentOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        selectedPaymentMethod = option.getAttribute('data-method');
        console.log('Selected payment method:', selectedPaymentMethod);
    });
});

// Enhanced Contact form submission with better validation
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading
        showLoading();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const inquiryType = formData.get('inquiry-type');
        const message = formData.get('message').trim();
        
        // Enhanced validation
        const errors = [];
        
        if (!name || name.length < 2) {
            errors.push('Please enter a valid name (at least 2 characters)');
        }
        
        if (!email) {
            errors.push('Please enter an email address');
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errors.push('Please enter a valid email address');
            }
        }
        
        if (!inquiryType) {
            errors.push('Please select an inquiry type');
        }
        
        if (!message || message.length < 10) {
            errors.push('Please enter a message (at least 10 characters)');
        }
        
        // Hide loading
        hideLoading();
        
        if (errors.length > 0) {
            alert('Please correct the following errors:\n\n' + errors.join('\n'));
            return;
        }
        
        // Simulate form submission with better responses
        let responseMessage = `Thank you ${name}! We have received your inquiry about ${inquiryType}. `;
        
        switch(inquiryType) {
            case 'volunteer':
                responseMessage += 'Our volunteer coordinator will contact you within 2-3 business days with opportunities in your area. We appreciate your willingness to contribute to our mission!';
                break;
            case 'partnership':
                responseMessage += 'Our partnership team will reach out within 1-2 business days to discuss collaboration opportunities. We look forward to exploring how we can work together.';
                break;
            case 'training':
                responseMessage += 'Our training coordinator will contact you with information about upcoming PMKVY 4.0 and HARTRON programs. We\'ll send you the application forms and schedule details.';
                break;
            case 'environmental':
                responseMessage += 'Our environmental team will get back to you about tree plantation and conservation programs. There are many ways to get involved in protecting our environment!';
                break;
            default:
                responseMessage += 'We will get back to you within 24-48 hours. Thank you for your interest in CARD Foundation.';
        }
        
        alert(responseMessage);
        this.reset();
    });
}

// Newsletter signup functionality
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value.trim();
        
        if (!email) {
            alert('Please enter your email address');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        showLoading();
        
        // Simulate API call
        setTimeout(() => {
            hideLoading();
            alert(`Thank you for subscribing! We'll send updates about CARD Foundation's programs and impact stories to ${email}. You can unsubscribe at any time.`);
            this.reset();
        }, 1500);
    });
}

// Enhanced Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                const formattedNumber = Math.floor(current).toLocaleString();
                counter.textContent = formattedNumber + (counter.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                const formattedNumber = target.toLocaleString();
                counter.textContent = formattedNumber + (counter.textContent.includes('+') ? '+' : '');
            }
        };
        
        updateCounter();
    });
}

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            
            // Animate counters when stats section is visible
            if (entry.target.classList.contains('about-stats') || entry.target.classList.contains('hero-stats')) {
                setTimeout(() => animateCounters(), 500);
            }
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('section, .hero-stats, .about-stats').forEach(section => {
    observer.observe(section);
});

// Observe individual cards and elements
document.querySelectorAll('.program-card, .story-card, .stat-item, .involvement-card, .team-member, .news-card').forEach(element => {
    observer.observe(element);
});

// Enhanced Support button functionality with payment integration
document.addEventListener('DOMContentLoaded', function() {
    const donateBtn = document.getElementById('donateBtn');
    
    if (donateBtn) {
        donateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get selected amount
            const activeButton = document.querySelector('.amount-btn.active');
            const customAmount = document.getElementById('customAmount').value;
            
            let amount = 0;
            if (activeButton) {
                amount = activeButton.getAttribute('data-amount');
            } else if (customAmount) {
                amount = customAmount;
            } else {
                alert('Please select or enter a support amount');
                return;
            }
            
            // Validate amount
            if (amount < 100) {
                alert('Minimum donation amount is ₹100');
                return;
            }
            
            // Check payment method
            if (!selectedPaymentMethod) {
                alert('Please select a payment method');
                return;
            }
            
            // Show loading
            showLoading();
            
            // Simulate payment processing
            setTimeout(() => {
                hideLoading();
                
                const paymentMethodNames = {
                    'upi': 'UPI',
                    'card': 'Credit/Debit Card',
                    'netbanking': 'Net Banking',
                    'wallet': 'Digital Wallet'
                };
                
                alert(`Thank you for supporting CARD Foundation with ₹${amount}!\n\nPayment Method: ${paymentMethodNames[selectedPaymentMethod]}\n\nYour contribution will help us:\n• Empower more communities through skill development\n• Plant more trees for environmental conservation\n• Protect wildlife and native bird species\n• Conduct more youth awareness programs\n\nYou will receive a tax-deductible receipt via email shortly.\n\nRedirecting to secure payment gateway...`);
                
                // In a real application, you would integrate with payment processors like:
                // Razorpay, PayU, CCAvenue, etc.
                console.log('Redirecting to payment gateway with:', {
                    amount: amount,
                    method: selectedPaymentMethod,
                    organization: 'CARD Foundation'
                });
                
            }, 2000);
        });
    }
});

// Modal functionality for Privacy Policy and Terms
const modals = document.querySelectorAll('.modal');
const modalTriggers = document.querySelectorAll('[href^="#privacy"], [href^="#terms"]');
const modalCloses = document.querySelectorAll('.modal-close');

modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
        e.preventDefault();
        const modalId = this.getAttribute('href').replace('#', '') + '-modal';
        const modal = document.getElementById(modalId);
        if (modal) {
            openModal(modal);
        }
    });
});

modalCloses.forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        closeModal(modal);
    });
});

// Close modal when clicking outside
modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal(this);
        }
    });
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            closeModal(openModal);
        }
    }
});

function openModal(modal) {
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
    }
}

function closeModal(modal) {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// Loading overlay functions
function showLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.remove('hidden');
        loading.setAttribute('aria-hidden', 'false');
    }
}

function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.add('hidden');
        loading.setAttribute('aria-hidden', 'true');
    }
}

// Enhanced page loading animation
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading immediately when DOM is ready
    document.body.classList.add('loaded');
    hideLoading();
    
    // Set initial state for hero elements
    const heroElements = document.querySelectorAll('.hero-title, .hero-description, .hero-stats, .hero-buttons');
    heroElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Animate hero elements after DOM is ready
    setTimeout(() => {
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 300);
});

// Fallback for window load event
window.addEventListener('load', () => {
    // Ensure loading is hidden even if DOMContentLoaded didn't work
    hideLoading();
});

// Lazy loading for images (enhanced for future image additions)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Enhanced parallax effect for hero section
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    if (parallax) {
        const speed = scrolled * 0.1;
        parallax.style.transform = `translateY(${speed}px)`;
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Enhanced reveal animation to elements
const revealElements = document.querySelectorAll('.program-card, .story-card, .impact-item, .involvement-card, .team-member, .news-card');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(element);
});

// Enhanced Program cards hover effect
document.querySelectorAll('.program-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderTopColor = '#38a169';
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderTopColor = '#22543d';
        this.style.transform = 'translateY(0)';
    });
});

// Enhanced Social media functionality
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const platform = this.querySelector('i').classList[1].split('-')[1];
        const url = window.location.href;
        const title = document.title;
        
        let shareUrl = '';
        
        switch(platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                break;
            case 'instagram':
                // Instagram doesn't support direct sharing via URL, so we'll show a message
                alert('Follow us on Instagram @cardfoundation for updates and behind-the-scenes content!');
                return;
            case 'youtube':
                alert('Subscribe to our YouTube channel for program videos and impact stories!');
                return;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    });
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Accessibility: Skip to main content
const skipLink = document.createElement('a');
skipLink.href = '#main';
skipLink.textContent = 'Skip to main content';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: #22543d;
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 1000;
    transition: top 0.3s;
`;

skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// Add main landmark if not present
if (!document.getElementById('main') && !document.querySelector('main')) {
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.setAttribute('id', 'main');
        heroSection.setAttribute('role', 'main');
    }
}

// Error handling for failed operations
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Service worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

console.log('CARD Foundation website loaded successfully! 🌱');

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString() + (counter.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString() + (counter.textContent.includes('+') ? '+' : '');
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            
            // Animate counters when stats section is visible
            if (entry.target.classList.contains('about-stats')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Observe individual cards and elements
document.querySelectorAll('.program-card, .story-card, .stat-item, .involvement-card').forEach(element => {
    observer.observe(element);
});

// Support button functionality
document.addEventListener('DOMContentLoaded', function() {
    const supportButtons = document.querySelectorAll('.btn-primary');
    
    supportButtons.forEach(button => {
        if (button.textContent.includes('Support')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get selected amount
                const activeButton = document.querySelector('.amount-btn.active');
                const customAmount = document.getElementById('customAmount').value;
                
                let amount = 0;
                if (activeButton) {
                    amount = activeButton.getAttribute('data-amount');
                } else if (customAmount) {
                    amount = customAmount;
                } else {
                    alert('Please select or enter a support amount');
                    return;
                }
                
                // In a real application, you would integrate with a payment processor
                alert(`Thank you for supporting CARD Foundation with ₹${amount}! Your contribution will help us empower more communities through skill development and environmental conservation. You will be redirected to the payment gateway.`);
                
                // Redirect to payment processor (placeholder)
                // window.location.href = `https://paymentgateway.com/donate?amount=${amount}&ngo=card`;
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Lazy loading for images (if you add real images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Simple parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    if (parallax) {
        const speed = scrolled * 0.2;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add smooth reveal animation to elements
const revealElements = document.querySelectorAll('.program-card, .story-card, .impact-item, .involvement-card');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(element);
});

// Program cards hover effect
document.querySelectorAll('.program-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderTopColor = '#38a169';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderTopColor = '#22543d';
    });
});

// Social media share functionality (placeholder)
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const platform = this.querySelector('i').classList[1].split('-')[1];
        
        // In a real implementation, you would add actual social media sharing
        console.log(`Sharing on ${platform}`);
        alert(`This would open ${platform} sharing dialog for CARD Foundation`);
    });
});

// Newsletter signup (if you want to add this feature)
function addNewsletterSignup() {
    const footer = document.querySelector('.footer-content');
    const newsletterSection = document.createElement('div');
    newsletterSection.className = 'footer-section';
    newsletterSection.innerHTML = `
        <h4>Stay Updated</h4>
        <p>Subscribe to our newsletter for updates on our programs and impact.</p>
        <form class="newsletter-form">
            <input type="email" placeholder="Your email" required style="margin-bottom: 10px; padding: 8px; border-radius: 5px; border: 1px solid #ccc;">
            <button type="submit" style="padding: 8px 16px; background: #22543d; color: white; border: none; border-radius: 5px; cursor: pointer;">Subscribe</button>
        </form>
    `;
    
    footer.appendChild(newsletterSection);
    
    // Handle newsletter form submission
    const newsletterForm = newsletterSection.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        alert(`Thank you for subscribing! We'll send updates about CARD Foundation's programs to ${email}`);
        this.reset();
    });
}

// Uncomment the line below if you want to add newsletter signup
// addNewsletterSignup();
