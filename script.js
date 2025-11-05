// Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

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
        }
    });
});

// Modal functionality
const prayerModal = document.getElementById('prayerModal');
const registerModal = document.getElementById('registerModal');
const ministryModal = document.getElementById('ministryModal');

const prayerLinks = document.querySelectorAll('#prayerRequestLink, #prayerLink, #quickPrayer, #contactPrayer');
const registerLinks = document.querySelectorAll('#registerLink, #quickRegister, #contactRegister');

const closeButtons = document.querySelectorAll('.close-modal');

// Open prayer modal
prayerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        prayerModal.style.display = 'block';
    });
});

// Open registration modal
registerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.style.display = 'block';
    });
});

// Close modals
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        prayerModal.style.display = 'none';
        registerModal.style.display = 'none';
        ministryModal.style.display = 'none';
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === prayerModal) {
        prayerModal.style.display = 'none';
    }
    if (e.target === registerModal) {
        registerModal.style.display = 'none';
    }
    if (e.target === ministryModal) {
        ministryModal.style.display = 'none';
    }
});

// Quick links navigation
document.getElementById('quickEvents').addEventListener('click', () => {
    document.querySelector('#events').scrollIntoView({
        behavior: 'smooth'
    });
});

document.getElementById('quickSermons').addEventListener('click', () => {
    document.querySelector('#sermons').scrollIntoView({
        behavior: 'smooth'
    });
});

// Form submissions
const prayerForm = document.getElementById('prayerForm');
const prayerSuccess = document.getElementById('prayerSuccess');

prayerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
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
            setTimeout(() => {
                prayerSuccess.classList.remove('show');
                prayerModal.style.display = 'none';
            }, 3000);
        } else {
            alert('There was a problem submitting your request. Please try again.');
        }
    }).catch(error => {
        alert('There was a problem submitting your request. Please try again.');
    }).finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
});

const memberForm = document.getElementById('memberForm');
const memberSuccess = document.getElementById('memberSuccess');

memberForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Registering...';
    submitBtn.disabled = true;
    
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
            setTimeout(() => {
                memberSuccess.classList.remove('show');
                registerModal.style.display = 'none';
            }, 3000);
        } else {
            alert('There was a problem submitting your registration. Please try again.');
        }
    }).catch(error => {
        alert('There was a problem submitting your registration. Please try again.');
    }).finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
});

// Ministry Modals
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
                <p class="ministry-verse">${data.verse}</p>
                <p>${data.description}</p>
                <h3>Activities:</h3>
                <ul>
                    ${data.activities.map(activity => `<li>${activity}</li>`).join('')}
                </ul>
                <div class="contact-info">
                    <p><strong>Meeting:</strong> ${data.meeting}</p>
                    <p><strong>Contact:</strong> ${data.contact}</p>
                </div>
            `;
            ministryModal.style.display = 'block';
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--dark-bg)';
        navbar.style.backdropFilter = 'none';
    }
});

// Animation on scroll
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

// Observe elements for animation
document.querySelectorAll('.ministry-card, .event-card, .project-card, .sermon-card, .belt-card, .about-content, .link-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Formspree Setup Instructions
console.log(`
FORMSPREE SETUP INSTRUCTIONS:

1. Go to https://formspree.io and create an account
2. Create a new form for Member Registration
3. Update the form action in the HTML to: action="https://formspree.io/f/your-member-form-id"
4. Create another form for Prayer Requests
5. Update the prayer form action similarly

To access submitted data:
1. Login to your Formspree account
2. Go to your forms dashboard
3. Click on the form to view submissions
4. You can export data as CSV or integrate with other apps

For automatic email notifications:
1. In Formspree form settings, add email addresses to receive notifications
2. Customize the email template as needed
`);
