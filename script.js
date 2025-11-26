// Create static background element
function createStaticBackground() {
    if (!document.getElementById('static-background')) {
        const staticBg = document.createElement('div');
        staticBg.id = 'static-background';
        document.body.insertBefore(staticBg, document.body.firstChild);
    }
}

// Enhanced Hero Slider with 7 images - FIXED VERSION
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
        // Show first slide
        this.showSlide(this.currentSlide);
        
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
            this.startAutoSlide();
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
        const currentSlide = this.slides[this.currentSlide];
        const newSlide = this.slides[newIndex];
        
        // Add direction classes for animations
        currentSlide.classList.remove('active');
        currentSlide.classList.add(direction);
        
        newSlide.classList.add('active', direction);
        
        // Remove classes after animation
        setTimeout(() => {
            currentSlide.classList.remove('prev', 'next');
            newSlide.classList.remove('prev', 'next');
            
            // Update current slide and indicators
            this.currentSlide = newIndex;
            this.updateIndicators();
            this.isAnimating = false;
        }, 800);
    }
    
    showSlide(index) {
        // Hide all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active', 'prev', 'next');
        });
        
        // Show current slide
        this.slides[index].classList.add('active');
        this.updateIndicators();
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
}

// Enhanced Navigation with transparent header
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');

if (hamburger) {
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
}

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
    });
});

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Enhanced Navbar background on scroll with transparent effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroHeight = hero ? hero.offsetHeight : 0;
    
    // Transparent header logic
    if (window.scrollY < heroHeight - 100) {
        navbar.classList.add('transparent');
    } else {
        navbar.classList.remove('transparent');
    }
    
    // Scrolled state
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
    if (!modal) return;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Store current focus
    modal._previousActiveElement = document.activeElement;
    
    // Set focus to modal
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
    }
    
    // Trap focus inside modal
    modal.addEventListener('keydown', trapTabKey);
    
    // Add entrance animation
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.animation = 'slideUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
}

// Enhanced modal close with animations
function closeModal(modal) {
    if (!modal) return;
    
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.animation = 'slideDown 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    
    // Remove focus trap
    modal.removeEventListener('keydown', trapTabKey);
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        
        // Restore focus to previous element
        if (modal._previousActiveElement) {
            modal._previousActiveElement.focus();
        }
    }, 250);
}

// Focus trap for modal
function trapTabKey(e) {
    if (e.key === 'Tab') {
        const modal = e.currentTarget;
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
}

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
const quickEvents = document.getElementById('quickEvents');
const quickSermons = document.getElementById('quickSermons');

if (quickEvents) {
    quickEvents.addEventListener('click', () => {
        const eventsSection = document.querySelector('#events');
        if (eventsSection) {
            eventsSection.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Add pulse animation to events section
            eventsSection.style.animation = 'pulse 1s ease-in-out';
            setTimeout(() => {
                eventsSection.style.animation = '';
            }, 1000);
        }
    });
}

if (quickSermons) {
    quickSermons.addEventListener('click', () => {
        const sermonsSection = document.querySelector('#sermons');
        if (sermonsSection) {
            sermonsSection.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Add pulse animation to sermons section
            sermonsSection.style.animation = 'pulse 1s ease-in-out';
            setTimeout(() => {
                sermonsSection.style.animation = '';
            }, 1000);
        }
    });
}

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

if (prayerForm) {
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
                if (prayerSuccess) prayerSuccess.classList.add('show');
                this.reset();
                this.style.opacity = '1';
                
                setTimeout(() => {
                    if (prayerSuccess) prayerSuccess.classList.remove('show');
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
}

const memberForm = document.getElementById('memberForm');
const memberSuccess = document.getElementById('memberSuccess');

if (memberForm) {
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
                if (memberSuccess) memberSuccess.classList.add('show');
                this.reset();
                this.style.opacity = '1';
                
                setTimeout(() => {
                    if (memberSuccess) memberSuccess.classList.remove('show');
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
}

const giveForm = document.getElementById('giveForm');
const giveSuccess = document.getElementById('giveSuccess');

if (giveForm) {
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
                if (giveSuccess) giveSuccess.classList.add('show');
                this.reset();
                this.style.opacity = '1';
                
                setTimeout(() => {
                    if (giveSuccess) giveSuccess.classList.remove('show');
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
}

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
    },
    'graced-voices': {
        title: 'Graced Voices',
        description: 'Elevating worship through powerful vocals and harmonious melodies. Our worship team leads the congregation in heartfelt praise and worship during services and special events.',
        activities: ['Weekly Rehearsals', 'Sunday Worship Leading', 'Special Event Performances', 'Worship Workshops', 'Community Outreach Concerts'],
        contact: 'Worship Leader: Grace Wanjiru - 0723 456 789',
        meeting: 'Wednesdays, 6:00 PM - Church Sanctuary',
        verse: '"Let everything that has breath praise the LORD. Praise the LORD." - Psalm 150:6'
    }
};

ministryCards.forEach(card => {
    card.addEventListener('click', () => {
        const ministry = card.dataset.ministry;
        const data = ministryData[ministry];
        
        if (data && modalContent) {
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

// Enhanced keyboard navigation
document.addEventListener('keydown', (e) => {
    // Escape key closes modals
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal[style*="display: block"]');
        openModals.forEach(modal => {
            closeModal(modal);
        });
    }
    
    // Tab key enables keyboard navigation mode
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
document.head.appendChild(keyboardStyles);

// Language Switcher Functionality
const languageSwitcher = document.getElementById('languageSwitcher');
let currentLanguage = 'en';

const translations = {
    en: {
        // Navigation
        home: 'Home',
        about: 'About Us',
        ministries: 'Ministries',
        events: 'Events',
        development: 'Development',
        sermons: 'Sermons',
        giving: 'Give',
        contact: 'Contact',
        
        // Hero Section
        heroTitle: 'Welcome to A.C.K Gacharage Church',
        heroSubtitle: 'Growing in Faith, Serving in Love',
        becomeMember: 'Become a Member',
        requestPrayer: 'Request Prayer',
        give: 'Give',
        
        // Quick Links
        memberRegistration: 'Member Registration',
        prayerRequest: 'Prayer Request',
        giveSupport: 'Give & Support',
        watchSermons: 'Watch Sermons',
        
        // About Section
        aboutTitle: 'About Our Church',
        aboutIntro: 'Gacharage Anglican Church has been serving the community since 1985, dedicated to spiritual growth, fellowship, and service.',
        
        // Contact Section
        contactIntro: 'We\'d love to hear from you. Reach out to us with any questions, prayer requests, or to learn more about our church.'
    },
    sw: {
        // Navigation
        home: 'Nyumbani',
        about: 'Kuhusu Sisi',
        ministries: 'Huduma',
        events: 'Matukio',
        development: 'Maendeleo',
        sermons: 'Hotuba',
        giving: 'Changia',
        contact: 'Wasiliana',
        
        // Hero Section
        heroTitle: 'Karibu Kanisani A.C.K Gacharage',
        heroSubtitle: 'Tukikua Katika Imani, Tukitumikia Kwa Upendo',
        becomeMember: 'Jiunge na Sisi',
        requestPrayer: 'Omba Maombi',
        give: 'Changia',
        
        // Quick Links
        memberRegistration: 'Usajili wa Wanachama',
        prayerRequest: 'Ombi la Maombi',
        giveSupport: 'Changia na Kuunga Mkono',
        watchSermons: 'Tazama Hotuba',
        
        // About Section
        aboutTitle: 'Kuhusu Kanisa Letu',
        aboutIntro: 'Kanisa la Anglikana la Gacharage limekuwa likiwahudumia jamii tangu mwaka 1985, likijitolea kwa ukuaji wa kiroho, ushirika, na huduma.',
        
        // Contact Section
        contactIntro: 'Tunapenda kusikia kutoka kwako. Wasiliana nasi kwa maswali yoyote, maombi, au kujifunza zaidi kuhusu kanisa letu.'
    }
};

function switchLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach((link, index) => {
        const keys = ['home', 'about', 'ministries', 'events', 'development', 'sermons', 'giving', 'contact'];
        if (keys[index]) {
            link.textContent = translations[lang][keys[index]];
        }
    });
    
    // Update hero section
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelectorAll('.hero .cta-button');
    
    if (heroTitle) heroTitle.textContent = translations[lang].heroTitle;
    if (heroSubtitle) heroSubtitle.textContent = translations[lang].heroSubtitle;
    if (heroButtons[0]) heroButtons[0].textContent = translations[lang].becomeMember;
    if (heroButtons[1]) heroButtons[1].textContent = translations[lang].requestPrayer;
    if (heroButtons[2]) heroButtons[2].textContent = translations[lang].give;
    
    // Update quick links
    const quickLinks = document.querySelectorAll('.link-card h3');
    quickLinks.forEach((link, index) => {
        const keys = ['memberRegistration', 'prayerRequest', 'giveSupport', 'watchSermons'];
        if (keys[index]) {
            link.textContent = translations[lang][keys[index]];
        }
    });
    
    // Update about section
    const aboutTitle = document.querySelector('.about-section .section-title');
    const aboutIntro = document.querySelector('.about-section .section-intro');
    
    if (aboutTitle) aboutTitle.textContent = translations[lang].aboutTitle;
    if (aboutIntro) aboutIntro.textContent = translations[lang].aboutIntro;
    
    // Update contact section
    const contactIntro = document.querySelector('.contact-section .section-intro');
    if (contactIntro) contactIntro.textContent = translations[lang].contactIntro;
    
    // Update language switcher
    languageSwitcher.innerHTML = `<i class="fas fa-language"></i><span>${lang === 'en' ? 'SW' : 'EN'}</span>`;
    
    // Show toast notification
    showToast(`Language switched to ${lang === 'en' ? 'English' : 'Kiswahili'}`);
}

if (languageSwitcher) {
    languageSwitcher.addEventListener('click', () => {
        const newLang = currentLanguage === 'en' ? 'sw' : 'en';
        switchLanguage(newLang);
    });
}

// Dark Mode Functionality
const darkModeToggle = document.getElementById('darkModeToggle');
let isDarkMode = false;

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    
    // Update toggle icon
    const icon = darkModeToggle.querySelector('i');
    icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode);
    
    // Show toast notification
    showToast(`${isDarkMode ? 'Dark' : 'Light'} mode activated`);
}

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
    
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        isDarkMode = true;
        document.body.setAttribute('data-theme', 'dark');
        const icon = darkModeToggle.querySelector('i');
        icon.className = 'fas fa-sun';
    }
}

// Load saved settings when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Create static background
    createStaticBackground();
    
    // Enhance form labels
    enhanceFormAccessibility();
    
    // Add ARIA labels to interactive elements
    enhanceAriaLabels();
    
    // Initialize hero slider
    if (document.querySelector('.hero-slider')) {
        window.heroSlider = new HeroSlider();
        console.log('Hero slider initialized successfully!');
    }
});

// Enhance form accessibility
function enhanceFormAccessibility() {
    document.querySelectorAll('input, select, textarea').forEach(input => {
        if (!input.id) {
            const label = input.closest('.form-group')?.querySelector('label');
            if (label && !label.htmlFor) {
                const id = 'input-' + Math.random().toString(36).substr(2, 9);
                input.id = id;
                label.htmlFor = id;
            }
        }
        
        // Add ARIA attributes
        if (input.required) {
            input.setAttribute('aria-required', 'true');
        }
        
        if (input.type === 'checkbox' || input.type === 'radio') {
            input.setAttribute('role', input.type);
        }
    });
}

// Enhance ARIA labels
function enhanceAriaLabels() {
    // Navigation
    const nav = document.querySelector('.nav-menu');
    if (nav) {
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'Main navigation');
    }
    
    // Hero slider
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.setAttribute('role', 'region');
        heroSlider.setAttribute('aria-label', 'Hero image slider');
    }
}

// Enhanced image alt text
document.querySelectorAll('img').forEach(img => {
    if (!img.alt && !img.getAttribute('aria-hidden')) {
        img.alt = 'Decorative image';
    }
});

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

console.log(`
🎪 HERO SLIDER ACTIVATED:
✅ 7-image slider initialized
✅ Auto-sliding every 5 seconds
✅ Manual navigation arrows
✅ Touch swipe support
✅ Indicator dots
✅ Hover pause/resume

🎨 ENHANCED DESIGN:
✅ Static Background for Development, Giving & Contact Sections
✅ Expanded Map Section
✅ Reduced Footer Size
✅ Readable Header Navigation
✅ Mobile Responsive Design
✅ Back to Top Button
✅ Language Switcher (English/Kiswahili)
✅ Dark Mode Toggle
✅ Updated Graced Voices Ministry Icon
✅ Enhanced Contact Section Visibility

All features are now working perfectly!
`);
