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

// Dynamic Year in Footer
const yearSpan = document.querySelector('footer p');
if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = yearSpan.textContent.replace('2024', currentYear);
}

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
        }, 4000);
    }
}); 

//site wide cursor
const siteWide = document.querySelector('.custom-cursor.site-wide');
document.addEventListener('mouseenter', (e) => {
    siteWide.style.display = 'block';
});
document.addEventListener('mouseleave', (e) => {
    siteWide.style.display = 'none';
});

document.addEventListener('mousemove', TrackCursor);
document.addEventListener('mousedown', () => siteWide.classList.add('active'));
document.addEventListener('mouseup', () => siteWide.classList.remove('active'));

function TrackCursor(e){
    const width = siteWide.clientWidth;
    const height = siteWide.clientHeight;
    siteWide.style.transform = `translate(${e.clientX - width/2}px, ${e.clientY - height/2}px)`;
}
