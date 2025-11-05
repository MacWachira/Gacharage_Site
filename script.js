
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

// Hero Slider
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Change slide every 5 seconds
setInterval(nextSlide, 5000);

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

// Member Registration Form
const memberForm = document.getElementById('memberForm');
memberForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send data to Formspree or your backend
    console.log('Member Registration Data:', data);
    
    // Show success message
    alert('Thank you for registering! We will contact you soon.');
    this.reset();
});

// Ministry Modals
const ministryCards = document.querySelectorAll('.ministry-card');
const ministryModal = document.getElementById('ministryModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.querySelector('.close-modal');

const ministryData = {
    youth: {
        title: 'Youth Ministry',
        description: 'Our Youth Ministry is dedicated to engaging young people aged 18-35 in spiritual growth, fellowship, and service. We provide a safe space for youth to explore their faith and develop leadership skills.',
        activities: ['Weekly Bible Study', 'Youth Fellowship', 'Mentorship Programs', 'Community Service'],
        contact: 'Youth Leader: John Mwangi - 0721 123 456'
    },
    choir: {
        title: 'Choir Ministry',
        description: 'The Choir Ministry leads the congregation in worship through music and song. We practice weekly and perform during Sunday services and special events.',
        activities: ['Weekly Practice', 'Sunday Worship', 'Special Events', 'Music Workshops'],
        contact: 'Choir Director: Mary Wanjiku - 0733 456 789'
    },
    teens: {
        title: 'Teens Ministry',
        description: 'Guiding teenagers (13-17 years) in their faith journey through relevant teachings, fellowship, and fun activities.',
        activities: ['Sunday School', 'Teen Retreats', 'Bible Quizzes', 'Career Guidance'],
        contact: 'Teens Coordinator: David Kimani - 0712 345 678'
    },
    'sunday-school': {
        title: 'Sunday School',
        description: 'Teaching children about God\'s love through age-appropriate lessons, songs, and activities.',
        activities: ['Bible Stories', 'Arts & Crafts', 'Memory Verses', 'Children\'s Choir'],
        contact: 'Sunday School Head: Grace Nyambura - 0701 234 567'
    },
    kama: {
        title: 'KAMA - Kenya Anglican Men Association',
        description: 'Bringing men together for fellowship, spiritual growth, and community development projects.',
        activities: ['Monthly Meetings', 'Prayer Breakfast', 'Community Projects', 'Men\'s Retreat'],
        contact: 'KAMA Chairman: James Maina - 0722 987 654'
    },
    'mothers-union': {
        title: 'Mothers Union',
        description: 'Strengthening family life through prayer, fellowship, and support for mothers and families.',
        activities: ['Weekly Prayer', 'Family Support', 'Skill Development', 'Community Outreach'],
        contact: 'MU President: Elizabeth Wangari - 0734 567 890'
    },
    'ladies-zion': {
        title: 'Ladies of Zion',
        description: 'Women committed to prayer, service, and supporting each other in spiritual growth.',
        activities: ['Prayer Meetings', 'Women\'s Conferences', 'Hospitality Ministry', 'Prayer Chains'],
        contact: 'Leader: Sarah Njeri - 0715 678 901'
    }
};

ministryCards.forEach(card => {
    card.addEventListener('click', () => {
        const ministry = card.dataset.ministry;
        const data = ministryData[ministry];
        
        if (data) {
            modalContent.innerHTML = `
                <h2>${data.title}</h2>
                <p>${data.description}</p>
                <h3>Activities:</h3>
                <ul>
                    ${data.activities.map(activity => `<li>${activity}</li>`).join('')}
                </ul>
                <div class="contact-info">
                    <strong>Contact:</strong> ${data.contact}
                </div>
            `;
            ministryModal.style.display = 'block';
        }
    });
});

closeModal.addEventListener('click', () => {
    ministryModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === ministryModal) {
        ministryModal.style.display = 'none';
    }
});

// Prayer Request Form
const prayerForm = document.getElementById('prayerForm');
prayerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Formspree submission
    fetch(this.action, {
        method: 'POST',
        body: new FormData(this),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert('Thank you for your prayer request. We will pray for you!');
            this.reset();
        } else {
            alert('There was a problem submitting your request. Please try again.');
        }
    }).catch(error => {
        alert('There was a problem submitting your request. Please try again.');
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--white)';
        navbar.style.backdropFilter = 'none';
    }
});

// Formspree Setup Instructions
console.log(`
FORMSPREE SETUP INSTRUCTIONS:

1. Go to https://formspree.io and create an account
2. Create a new form for Member Registration
3. Update the form action in the HTML to: action="https://formspree.io/f/your-form-id"
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

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.ministry-card, .event-card, .project-card, .sermon-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
