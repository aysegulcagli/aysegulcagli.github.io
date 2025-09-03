// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1)';
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-category, .project-card, .timeline-item, .achievement').forEach(el => {
    observer.observe(el);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simple form validation
    if (!data.name || !data.email || !data.message) {
        alert('Lütfen tüm gerekli alanları doldurun.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Lütfen geçerli bir email adresi girin.');
        return;
    }
    
    // Create mailto link
    const subject = encodeURIComponent(data.subject || 'Portfolio İletişim');
    const body = encodeURIComponent(
        `İsim: ${data.name}\nEmail: ${data.email}\n\nMesaj:\n${data.message}`
    );
    const mailtoLink = `mailto:aysegulcagliofficial@gmail.com?subject=${subject}&body=${body}`;
    
    // Open mail client
    window.location.href = mailtoLink;
    
    // Reset form
    contactForm.reset();
    
    // Show success message
    alert('Mail uygulamanız açılacak. Mesajınız için teşekkürler!');
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Add scroll-triggered animations
const addScrollAnimations = () => {
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        el.style.transitionDelay = `${index * 0.1}s`;
    });
};

// Initialize animations
addScrollAnimations();

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    @media (max-width: 768px) {
        .hero-title {
            font-size: 2.2rem;
        }
        
        .section-title {
            font-size: 2rem;
        }
        
        .hero-buttons {
            flex-direction: column;
            align-items: center;
        }
        
        .hero-buttons .btn {
            width: 200px;
            justify-content: center;
        }
    }
    
    @media (max-width: 480px) {
        .skills-grid {
            grid-template-columns: 1fr;
        }
        
        .skill-item {
            justify-content: center;
        }
        
        .timeline-item {
            padding-left: 30px;
        }
        
        .timeline-dot {
            left: 0;
        }
        
        .timeline::before {
            left: 10px;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((el, index) => {
        const speed = 0.5 + (index * 0.2);
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body:not(.loaded) {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);

// Language switching functionality
let currentLang = 'tr';

function switchLanguage(lang) {
    currentLang = lang;
    
    // Update button states
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update HTML lang attribute
    document.getElementById('htmlLang').setAttribute('lang', lang);
    
    // Update all translatable elements
    document.querySelectorAll('[data-tr]').forEach(element => {
        const trText = element.getAttribute('data-tr');
        const enText = element.getAttribute('data-en');
        
        if (lang === 'tr') {
            if (element.innerHTML.includes('<')) {
                // Handle HTML content
                element.innerHTML = trText;
            } else {
                element.textContent = trText;
            }
        } else {
            if (element.innerHTML.includes('<')) {
                // Handle HTML content  
                element.innerHTML = enText;
            } else {
                element.textContent = enText;
            }
        }
    });
    
    // Update page title
    if (lang === 'tr') {
        document.title = 'Ayşegül Çağlı - Junior AI & Full Stack Developer';
    } else {
        document.title = 'Ayşegül Çağlı - Junior AI & Full Stack Developer';
    }
    
    // Save language preference
    localStorage.setItem('preferred-language', lang);
}

// Load saved language preference
window.addEventListener('load', () => {
    const savedLang = localStorage.getItem('preferred-language') || 'tr';
    if (savedLang !== 'tr') {
        switchLanguage(savedLang);
    }
});
