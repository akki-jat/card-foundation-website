// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
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

// Donation amount buttons
const amountButtons = document.querySelectorAll('.amount-btn');
const customAmountInput = document.getElementById('customAmount');

amountButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        amountButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Clear custom amount input
        customAmountInput.value = '';
        
        // Store selected amount
        const amount = button.getAttribute('data-amount');
        console.log('Selected amount:', amount);
    });
});

// Custom amount input
customAmountInput.addEventListener('input', () => {
    // Remove active class from all buttons when custom amount is entered
    amountButtons.forEach(btn => btn.classList.remove('active'));
});

// Contact form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const inquiryType = formData.get('inquiry-type');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !inquiryType || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        let responseMessage = `Thank you ${name}! We have received your inquiry about ${inquiryType}. `;
        
        switch(inquiryType) {
            case 'volunteer':
                responseMessage += 'Our volunteer coordinator will contact you within 2-3 business days with opportunities in your area.';
                break;
            case 'partnership':
                responseMessage += 'Our partnership team will reach out to discuss collaboration opportunities.';
                break;
            case 'training':
                responseMessage += 'Our training coordinator will contact you with information about upcoming PMKVY 4.0 and HARTRON programs.';
                break;
            case 'environmental':
                responseMessage += 'Our environmental team will get back to you about tree plantation and conservation programs.';
                break;
            default:
                responseMessage += 'We will get back to you soon.';
        }
        
        alert(responseMessage);
        this.reset();
    });
}

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
