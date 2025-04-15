// Typing Animation
const welcomeText = "Welcome to Xplore";
const welcomeElement = document.querySelector('.hero-content h1');
let charIndex = 0;
let isTyping = true;

function typeWriter() {
    if (charIndex < welcomeText.length) {
        welcomeElement.textContent = welcomeText.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeWriter, 100);
    } else {
        isTyping = false;
    }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    welcomeElement.textContent = '';
    setTimeout(typeWriter, 1000);
});

// Interactive Background Elements
function createBackgroundElements() {
    const bgContainer = document.createElement('div');
    bgContainer.className = 'interactive-bg';
    document.body.appendChild(bgContainer);

    for (let i = 0; i < 20; i++) {
        const element = document.createElement('div');
        element.className = 'bg-element';
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;
        element.style.animationDelay = `${Math.random() * 15}s`;
        bgContainer.appendChild(element);
    }
}

// Scroll Reveal Animation
const pageSections = document.querySelectorAll('section');

function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.8;

    pageSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < triggerBottom) {
            section.classList.add('reveal');
        }
    });
}

// Initial check for sections in view
revealOnScroll();

// Add scroll event listener
window.addEventListener('scroll', revealOnScroll);

// Event Tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const eventsContent = document.querySelector('.events-content');

// Sample event data
const events = [
    {
        id: 1,
        title: "Hackathon 2024",
        date: "2024-06-15",
        description: "Join us for our annual hackathon event!",
        type: "upcoming"
    },
    {
        id: 2,
        title: "Web Development Workshop",
        date: "2024-05-20",
        description: "Learn the latest in web development.",
        type: "upcoming"
    },
    {
        id: 3,
        title: "AI Conference 2024",
        date: "2024-03-10",
        description: "Annual AI and Machine Learning conference.",
        type: "past"
    },
    {
        id: 4,
        title: "Coding Bootcamp",
        date: "2024-02-15",
        description: "Intensive coding bootcamp for beginners.",
        type: "past"
    }
];

// Function to render events based on type
function renderEvents(type) {
    eventsContent.innerHTML = ''; // Clear existing events

    const filteredEvents = type === 'all' 
        ? events 
        : events.filter(event => event.type === type);

    filteredEvents.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        
        const date = new Date(event.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        eventCard.innerHTML = `
            <h3>${event.title}</h3>
            <div class="date">${formattedDate}</div>
            <p>${event.description}</p>
            <a href="#" class="register-btn">${event.type === 'upcoming' ? 'Register Now' : 'View Details'}</a>
        `;

        eventsContent.appendChild(eventCard);
    });
}

// Initialize events
renderEvents('all');

// Add click handlers for tabs
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        renderEvents(filter);
    });
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
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

// Initialize background elements
createBackgroundElements();

// Responsive adjustments
function handleResponsive() {
    const isMobile = window.innerWidth <= 768;
    const container = document.querySelector('.container');
    
    if (isMobile) {
        container.style.padding = '0 15px';
    } else {
        container.style.padding = '0 20px';
    }
}

// Handle window resize
window.addEventListener('resize', handleResponsive);
handleResponsive();

// Development-related animations
const missionContent = document.querySelector('.mission-content');
const eventCardElements = document.querySelectorAll('.event-card');

// Initialize animations when elements are in view
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('mission-content')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            } else if (entry.target.classList.contains('event-card')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        }
    });
}, { threshold: 0.5 });

// Observe mission content and event cards
animationObserver.observe(missionContent);
eventCardElements.forEach(card => animationObserver.observe(card));

// 3D Card Effect
const cards = document.querySelectorAll('.event-card, .team-member, .mission-text');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Scroll Animation with 3D Effect
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) rotateX(0)';
        }
    });
}, observerOptions);

// Observe all sections with 3D effect
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px) rotateX(10deg)';
    section.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    observer.observe(section);
});

// Dynamic Year in Footer
const yearSpan = document.querySelector('footer p');
if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = yearSpan.textContent.replace('2024', currentYear);
}

// Add glowing effect to navigation links on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
});

// Form Submission Handling
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    const success = urlParams.get('success');

    // Show success/error message
    if (success === 'true') {
        showMessage('Message sent successfully! We will get back to you soon.', 'success');
    } else if (error === 'config') {
        showMessage('Server configuration error. Please try again later.', 'error');
    } else if (error === 'send') {
        showMessage('Failed to send message. Please try again later.', 'error');
    }

    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Insert message before the form
        form.parentNode.insertBefore(messageDiv, form);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                showMessage('Message sent successfully!', 'success');
                contactForm.reset();
            } else {
                showMessage('Error sending message. Please try again.', 'error');
            }
        } catch (error) {
            showMessage('Error sending message. Please try again.', 'error');
        }
    });
}

// Show message function
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    const container = document.querySelector('.contact-content');
    container.insertBefore(messageDiv, container.firstChild);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Adjust any responsive elements here
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.height = `${window.innerHeight}px`;
        }
    }, 250);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set initial hero height
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.height = `${window.innerHeight}px`;
    }
    
    // Check for success/error messages in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('success')) {
        showMessage('Message sent successfully!', 'success');
    } else if (urlParams.has('error')) {
        showMessage('Error sending message. Please try again.', 'error');
    }
}); 