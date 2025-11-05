// Enhanced Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Add animation delay for menu items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
        if (navMenu.classList.contains('active')) {
            item.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
        } else {
            item.style.animation = '';
        }
    });
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Add scroll animation
            target.style.scrollBehavior = 'smooth';
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Remove the style after scroll
            setTimeout(() => {
                target.style.scrollBehavior = '';
            }, 1000);
        }
    });
});

// Modal functionality with enhanced animations
const prayerModal = document.getElementById('prayerModal');
const registerModal = document.getElementById('registerModal');
const giveModal = document.getElementById('giveModal');
const ministryModal = document.getElementById('ministryModal');

const prayerLinks = document.querySelectorAll('#prayerRequestLink, #prayerLink, #quickPrayer, #contactPrayer');
const registerLinks = document.querySelectorAll('#registerLink, #quickRegister, #contactRegister');
const giveLinks = document.querySelectorAll('#giveLink, #quickGive, #contactGive, #givingModalLink');

const closeButtons = document.querySelectorAll('.close-modal');

// Enhanced modal open with animations
function openModal(modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add entrance animation
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.animation = 'slideUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
}

// Enhanced modal close with animations
function closeModal(modal) {
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.animation = 'slideDown 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }, 250);
}

// Enhanced Hero Slider Functionality
class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.slider-nav.prev');
        this.nextBtn = document.querySelector('.slider-nav.next');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.slideDuration = 5000; // 5 seconds
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        // Start automatic sliding
        this.startAutoSlide();
        
        // Event listeners for navigation
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Event listeners for indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Pause on hover
        const hero = document.querySelector('.hero');
        hero.addEventListener('mouseenter', () => this.pauseAutoSlide());
        hero.addEventListener('mouseleave', () => this.resumeAutoSlide());
        
        // Touch support for mobile
        this.addTouchSupport();
        
        // Preload images for better performance
        this.preloadImages();
    }
    
    startAutoSlide() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, this.slideDuration);
    }
    
    pauseAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
    
    resumeAutoSlide() {
        if (!this.slideInterval) {
            this.slideInterval = setInterval(() => {
                this.nextSlide();
            }, this.slideDuration);
        }
    }
    
    nextSlide() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.changeSlide(nextIndex, 'next');
    }
    
    prevSlide() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        const prevIndex = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
        this.changeSlide(prevIndex, 'prev');
    }
    
    goToSlide(index) {
        if (this.isAnimating || index === this.currentSlide) return;
        
        this.isAnimating = true;
        const direction = index > this.currentSlide ? 'next' : 'prev';
        this.changeSlide(index, direction);
    }
    
    changeSlide(newIndex, direction) {
        // Reset animation flag after transition
        setTimeout(() => {
            this.isAnimating = false;
        }, 800);
        
        const currentSlide = this.slides[this.currentSlide];
        const newSlide = this.slides[newIndex];
        
        // Add direction classes for animations
        currentSlide.classList.add(direction);
        newSlide.classList.add('active', direction);
        
        // Remove classes after animation
        setTimeout(() => {
            currentSlide.classList.remove('active', 'prev', 'next');
            newSlide.classList.remove('prev', 'next');
            
            // Update current slide and indicators
            this.currentSlide = newIndex;
            this.updateIndicators();
        }, 800);
    }
    
    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    addTouchSupport() {
        const slider = document.querySelector('.hero-slider');
        let startX = 0;
        let currentX = 0;
        let isSwiping = false;
        
        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isSwiping = true;
            this.pauseAutoSlide();
        });
        
        slider.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            currentX = e.touches[0].clientX;
        });
        
        slider.addEventListener('touchend', () => {
            if (!isSwiping) return;
            
            const diff = startX - currentX;
            const swipeThreshold = 50;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            
            isSwiping = false;
            setTimeout(() => this.resumeAutoSlide(), 3000);
        });
    }
    
    preloadImages() {
        this.slides.forEach(slide => {
            const img = slide.querySelector('img');
            if (img) {
                const preloadImage = new Image();
                preloadImage.src = img.src;
                preloadImage.onload = () => {
                    img.classList.add('loaded');
                };
            }
        });
    }
}

// Video placeholder functionality
function initVideoPlaceholder() {
    const videoSlide = document.querySelector('.slide[data-type="video"]');
    const videoPlaceholder = videoSlide.querySelector('.video-placeholder');
    
    videoPlaceholder.addEventListener('click', () => {
        // Replace placeholder with actual video
        const videoHTML = `
            <div class="video-container">
                <iframe 
                    src="https://www.youtube.com/embed/your-video-id?autoplay=1" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
        `;
        
        videoSlide.querySelector('.slide-content').innerHTML = videoHTML + '<div class="slide-overlay"></div>';
        
        // Add video styles
        const style = document.createElement('style');
        style.textContent = `
            .video-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 2;
            }
            
            .video-container iframe {
                width: 100%;
                height: 100%;
            }
        `;
        document.head.appendChild(style);
    });
}

// Keyboard navigation for slider
function addKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        const hero = document.querySelector('.hero');
        const isHeroVisible = hero.getBoundingClientRect().top < window.innerHeight && 
                              hero.getBoundingClientRect().bottom > 0;
        
        if (isHeroVisible) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                heroSlider.prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                heroSlider.nextSlide();
            }
        }
    });
}

// Initialize the hero slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const heroSlider = new HeroSlider();
    initVideoPlaceholder();
    addKeyboardNavigation();
    
    // Make slider globally accessible
    window.heroSlider = heroSlider;
});

// Enhanced image loading with error handling
function enhanceImageLoading() {
    const images = document.querySelectorAll('.slide-image');
    
    images.forEach(img => {
        // Add loading attribute for native lazy loading
        img.setAttribute('loading', 'lazy');
        
        // Error handling
        img.addEventListener('error', function() {
            console.warn('Failed to load image:', this.src);
            // You can set a fallback image here
            this.src = 'images/fallback-hero.jpg';
        });
    });
}

// Call this function after DOM load
document.addEventListener('DOMContentLoaded', enhanceImageLoading);

// Add slideDown animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        to {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
        }
    }
`;
document.head.appendChild(style);

// Open prayer modal
prayerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(prayerModal);
    });
});

// Open registration modal
registerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(registerModal);
    });
});

// Open give modal
giveLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(giveModal);
    });
});

// Close modals
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === prayerModal) {
        closeModal(prayerModal);
    }
    if (e.target === registerModal) {
        closeModal(registerModal);
    }
    if (e.target === giveModal) {
        closeModal(giveModal);
    }
    if (e.target === ministryModal) {
        closeModal(ministryModal);
    }
});

// Enhanced quick links navigation with animations
document.getElementById('quickEvents').addEventListener('click', () => {
    const eventsSection = document.querySelector('#events');
    eventsSection.scrollIntoView({
        behavior: 'smooth'
    });
    
    // Add pulse animation to events section
    eventsSection.style.animation = 'pulse 1s ease-in-out';
    setTimeout(() => {
        eventsSection.style.animation = '';
    }, 1000);
});

document.getElementById('quickSermons').addEventListener('click', () => {
    const sermonsSection = document.querySelector('#sermons');
    sermonsSection.scrollIntoView({
        behavior: 'smooth'
    });
    
    // Add pulse animation to sermons section
    sermonsSection.style.animation = 'pulse 1s ease-in-out';
    setTimeout(() => {
        sermonsSection.style.animation = '';
    }, 1000);
});

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(pulseStyle);

// Enhanced form submissions with better animations
const prayerForm = document.getElementById('prayerForm');
const prayerSuccess = document.getElementById('prayerSuccess');

prayerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Enhanced loading state
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading-spinner"></span>Submitting...';
    submitBtn.disabled = true;
    
    // Add loading animation to form
    this.style.opacity = '0.7';
    
    // Formspree submission
    fetch(this.action, {
        method: 'POST',
        body: new FormData(this),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            prayerSuccess.classList.add('show');
            this.reset();
            this.style.opacity = '1';
            
            setTimeout(() => {
                prayerSuccess.classList.remove('show');
                closeModal(prayerModal);
            }, 3000);
        } else {
            throw new Error('Network response was not ok');
        }
    }).catch(error => {
        alert('There was a problem submitting your request. Please try again.');
        this.style.opacity = '1';
    }).finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
});

const memberForm = document.getElementById('memberForm');
const memberSuccess = document.getElementById('memberSuccess');

memberForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Enhanced loading state
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading-spinner"></span>Registering...';
    submitBtn.disabled = true;
    
    // Add loading animation to form
    this.style.opacity = '0.7';
    
    // Formspree submission
    fetch(this.action, {
        method: 'POST',
        body: new FormData(this),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            memberSuccess.classList.add('show');
            this.reset();
            this.style.opacity = '1';
            
            setTimeout(() => {
                memberSuccess.classList.remove('show');
                closeModal(registerModal);
            }, 3000);
        } else {
            throw new Error('Network response was not ok');
        }
    }).catch(error => {
        alert('There was a problem submitting your registration. Please try again.');
        this.style.opacity = '1';
    }).finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
});

const giveForm = document.getElementById('giveForm');
const giveSuccess = document.getElementById('giveSuccess');

giveForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Enhanced loading state
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading-spinner"></span>Submitting...';
    submitBtn.disabled = true;
    
    // Add loading animation to form
    this.style.opacity = '0.7';
    
    // Formspree submission
    fetch(this.action, {
        method: 'POST',
        body: new FormData(this),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            giveSuccess.classList.add('show');
            this.reset();
            this.style.opacity = '1';
            
            setTimeout(() => {
                giveSuccess.classList.remove('show');
                closeModal(giveModal);
            }, 3000);
        } else {
            throw new Error('Network response was not ok');
        }
    }).catch(error => {
        alert('There was a problem submitting your pledge. Please try again.');
        this.style.opacity = '1';
    }).finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
});

// Enhanced Ministry Modals with animations
const ministryCards = document.querySelectorAll('.ministry-card');
const modalContent = document.getElementById('modalContent');

const ministryData = {
    youth: {
        title: 'Youth Ministry',
        description: 'Our Youth Ministry is dedicated to engaging young people aged 18-35 in spiritual growth, fellowship, and service. We provide a safe space for youth to explore their faith and develop leadership skills.',
        activities: ['Weekly Bible Study', 'Youth Fellowship', 'Mentorship Programs', 'Community Service', 'Career Development Workshops'],
        contact: 'Youth Leader: John Mwangi - 0721 123 456',
        meeting: 'Fridays, 6:00 PM - Youth Hall',
        verse: '"Don\'t let anyone look down on you because you are young, but set an example for the believers in speech, in conduct, in love, in faith and in purity." - 1 Timothy 4:12'
    },
    choir: {
        title: 'Choir Ministry',
        description: 'The Choir Ministry leads the congregation in worship through music and song. We practice weekly and perform during Sunday services and special events. Our choir includes vocalists and instrumentalists of all skill levels.',
        activities: ['Weekly Practice', 'Sunday Worship', 'Special Events', 'Music Workshops', 'Community Outreach Concerts'],
        contact: 'Choir Director: Mary Wanjiku - 0733 456 789',
        meeting: 'Thursdays, 5:00 PM - Choir Room',
        verse: '"Sing to the LORD a new song; sing to the LORD, all the earth." - Psalm 96:1'
    },
    teens: {
        title: 'Teens Ministry',
        description: 'Guiding teenagers (13-17 years) in their faith journey through relevant teachings, fellowship, and fun activities. We address issues facing teens today from a biblical perspective.',
        activities: ['Sunday School', 'Teen Retreats', 'Bible Quizzes', 'Career Guidance', 'Life Skills Training'],
        contact: 'Teens Coordinator: David Kimani - 0712 345 678',
        meeting: 'Sundays, 10:30 AM - Teens Room',
        verse: '"How can a young person stay on the path of purity? By living according to your word." - Psalm 119:9'
    },
    'sunday-school': {
        title: 'Sunday School',
        description: 'Teaching children about God\'s love through age-appropriate lessons, songs, and activities. We have classes for different age groups from toddlers to pre-teens.',
        activities: ['Bible Stories', 'Arts & Crafts', 'Memory Verses', 'Children\'s Choir', 'Special Events'],
        contact: 'Sunday School Head: Grace Nyambura - 0701 234 567',
        meeting: 'Sundays, 8:00 AM & 10:30 AM - Sunday School Building',
        verse: '"Start children off on the way they should go, and even when they are old they will not turn from it." - Proverbs 22:6'
    },
    kama: {
        title: 'KAMA - Kenya Anglican Men Association',
        description: 'Bringing men together for fellowship, spiritual growth, and community development projects. We focus on building strong Christian men who lead their families and communities with integrity.',
        activities: ['Monthly Meetings', 'Prayer Breakfast', 'Community Projects', 'Men\'s Retreat', 'Skills Training'],
        contact: 'KAMA Chairman: James Maina - 0722 987 654',
        meeting: 'First Saturday of the month, 8:00 AM - Church Hall',
        verse: '"Be on your guard; stand firm in the faith; be courageous; be strong." - 1 Corinthians 16:13'
    },
    'mothers-union': {
        title: 'Mothers Union',
        description: 'Strengthening family life through prayer, fellowship, and support for mothers and families. We provide practical help and spiritual encouragement to women in all stages of life.',
        activities: ['Weekly Prayer', 'Family Support', 'Skill Development', 'Community Outreach', 'Women\'s Conferences'],
        contact: 'MU President: Elizabeth Wangari - 0734 567 890',
        meeting: 'Tuesdays, 10:00 AM - Mothers Union Room',
        verse: '"She is clothed with strength and dignity; she can laugh at the days to come." - Proverbs 31:25'
    },
    'ladies-zion': {
        title: 'Ladies of Zion',
        description: 'Women committed to prayer, service, and supporting each other in spiritual growth. We focus on deepening our relationship with God through prayer and studying His Word.',
        activities: ['Prayer Meetings', 'Women\'s Conferences', 'Hospitality Ministry', 'Prayer Chains', 'Bible Study'],
        contact: 'Leader: Sarah Njeri - 0715 678 901',
        meeting: 'Wednesdays, 2:00 PM - Prayer Room',
        verse: '"Therefore, since we are surrounded by such a great cloud of witnesses, let us throw off everything that hinders and the sin that so easily entangles." - Hebrews 12:1'
    }
};

ministryCards.forEach(card => {
    card.addEventListener('click', () => {
        const ministry = card.dataset.ministry;
        const data = ministryData[ministry];
        
        if (data) {
            modalContent.innerHTML = `
                <h2>${data.title}</h2>
                <p class="ministry-verse" style="font-style: italic; color: var(--accent-color); margin-bottom: 1rem;">${data.verse}</p>
                <p style="margin-bottom: 1.5rem;">${data.description}</p>
                <h3 style="color: var(--primary-color); margin-bottom: 1rem;">Activities:</h3>
                <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
                    ${data.activities.map(activity => `<li style="margin-bottom: 0.5rem;">${activity}</li>`).join('')}
                </ul>
                <div class="contact-info" style="background: rgba(30, 58, 95, 0.05); padding: 1rem; border-radius: 8px;">
                    <p style="margin-bottom: 0.5rem;"><strong>Meeting:</strong> ${data.meeting}</p>
                    <p><strong>Contact:</strong> ${data.contact}</p>
                </div>
            `;
            openModal(ministryModal);
        }
    });
});

// Enhanced Navbar background on scroll with parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// Back to top functionality
const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
backToTop.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTop);

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Enhanced Animation on scroll with staggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add staggered animation based on element position
            const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.1;
            entry.target.style.transitionDelay = `${delay}s`;
            entry.target.classList.add('visible');
            
            // Remove delay after animation
            setTimeout(() => {
                entry.target.style.transitionDelay = '';
            }, 1000);
        }
    });
}, observerOptions);

// Enhanced element observation with different animation types
document.querySelectorAll('.ministry-card, .project-card, .sermon-card, .belt-card, .link-card, .giving-option').forEach((el, index) => {
    el.classList.add('fade-in');
    observer.observe(el);
});

document.querySelectorAll('.event-card').forEach((el, index) => {
    el.classList.add('fade-in-left');
    observer.observe(el);
});

document.querySelectorAll('.about-content, .contact-content').forEach((el, index) => {
    el.classList.add('fade-in-right');
    observer.observe(el);
});

// Enhanced Accessibility Features
const highContrastToggle = document.getElementById('highContrastToggle');
const largeTextToggle = document.getElementById('largeTextToggle');
const readModeToggle = document.getElementById('readModeToggle');
const resetAccessibility = document.getElementById('resetAccessibility');

// High Contrast Mode
highContrastToggle.addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
    localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
    
    // Add confirmation feedback
    if (document.body.classList.contains('high-contrast')) {
        showToast('High contrast mode enabled');
    } else {
        showToast('High contrast mode disabled');
    }
});

// Large Text Mode
largeTextToggle.addEventListener('click', () => {
    document.body.classList.toggle('large-text');
    localStorage.setItem('largeText', document.body.classList.contains('large-text'));
    
    if (document.body.classList.contains('large-text')) {
        showToast('Large text mode enabled');
    } else {
        showToast('Large text mode disabled');
    }
});

// Reading Mode (simplified layout)
readModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('reading-mode');
    localStorage.setItem('readingMode', document.body.classList.contains('reading-mode'));
    
    if (document.body.classList.contains('reading-mode')) {
        showToast('Reading mode enabled');
    } else {
        showToast('Reading mode disabled');
    }
});

// Reset Accessibility
resetAccessibility.addEventListener('click', () => {
    document.body.classList.remove('high-contrast', 'large-text', 'reading-mode');
    localStorage.removeItem('highContrast');
    localStorage.removeItem('largeText');
    localStorage.removeItem('readingMode');
    showToast('All accessibility settings reset');
});

// Load saved accessibility settings
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('highContrast') === 'true') {
        document.body.classList.add('high-contrast');
    }
    if (localStorage.getItem('largeText') === 'true') {
        document.body.classList.add('large-text');
    }
    if (localStorage.getItem('readingMode') === 'true') {
        document.body.classList.add('reading-mode');
    }
});

// Toast notification function
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--primary-color);
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 500;
        animation: slideUp 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Enhanced form validation with real-time feedback
document.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() !== '') {
            this.classList.add('filled');
        } else {
            this.classList.remove('filled');
        }
    });
    
    input.addEventListener('input', function() {
        if (this.checkValidity()) {
            this.style.borderColor = 'var(--success-color)';
        } else {
            this.style.borderColor = 'var(--accent-color)';
        }
    });
});

// Enhanced hover effects for interactive elements
document.querySelectorAll('.interactive').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Keyboard navigation enhancement
document.addEventListener('keydown', (e) => {
    // Escape key closes modals
    if (e.key === 'Escape') {
        closeModal(prayerModal);
        closeModal(registerModal);
        closeModal(giveModal);
        closeModal(ministryModal);
    }
    
    // Tab key navigation with focus indicators
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add keyboard navigation styles
const keyboardStyles = document.createElement('style');
keyboardStyles.textContent = `
    .keyboard-navigation *:focus {
        outline: 3px solid var(--accent-color) !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(keyboardStyles);

// Enhanced page load animations
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Add loading animation for images
    document.querySelectorAll('img').forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease-in-out';
        
        img.onload = function() {
            this.style.opacity = '1';
        };
        
        // Fallback for cached images
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
});

// Enhanced error handling
window.addEventListener('error', (e) => {
    console.log('Error occurred:', e.error);
    // You can add custom error reporting here
});

// Performance optimization: Lazy loading for images
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

console.log(`
ENHANCED WEBSITE FEATURES:

🎯 ACCESSIBILITY:
- High contrast mode
- Large text mode
- Reading mode
- Keyboard navigation
- Screen reader support
- Skip to main content link

🎨 ENHANCED ANIMATIONS:
- Smooth page transitions
- Staggered scroll animations
- Hover effects with scaling
- Modal animations
- Loading states
- Parallax scrolling

⚡ PERFORMANCE:
- Lazy loading images
- Optimized animations
- Reduced motion support
- Efficient event handlers

🎪 INTERACTIVE FEATURES:
- Back to top button
- Toast notifications
- Enhanced form validation
- Real-time feedback
- Custom cursor effects

💰 GIVING SECTION:
- M-Pesa giving options
- Bank transfer details
- In-person giving information
- Pledge form

Remember to test all accessibility features and ensure they work properly for users with disabilities.
`);
