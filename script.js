// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Leave preloader on screen for a short moment, then fade out
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            // Remove from DOM after fade out transition (0.8s) completes
            setTimeout(() => {
                preloader.remove();
            }, 800);
        }, 1200); // Show for 1.2 seconds
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// Reviews Slider Carousel Autoplay
const sliderTrack = document.getElementById('slider-track');
const sliderDots = document.querySelectorAll('#slider-dots .review-dot');
let currentSlide = 0;
let sliderInterval;
const totalSlides = sliderDots.length;

function updateSlider() {
    if(sliderTrack) {
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    sliderDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function startSlider() {
    if(totalSlides > 0) {
        sliderInterval = setInterval(nextSlide, 5000); // 5 seconds
    }
}

sliderDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(sliderInterval);
        currentSlide = index;
        updateSlider();
        startSlider();
    });
});

startSlider();

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Animate Info Section ("Why Do Dark Circles Appear")
if(document.querySelector('.info-section')) {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.info-section',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });

    // Image reveal
    tl.from('.info-left .texture-img', {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Title and subtitle
    tl.from('.info-right h2, .info-right .info-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
    }, '-=0.5');

    // Factors list stagger
    tl.from('.factor-item', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
    }, '-=0.3');

    // Footer text
    tl.from('.info-footer', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
    }, '-=0.2');
}

// Animate How To Use Section
if(document.querySelector('.how-to-use-section')) {
    gsap.from('.how-to-use-section .step-card, .how-to-use-section .step-arrow', {
        scrollTrigger: {
            trigger: '.how-to-use-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
    });
}

// Animate Hero Section
if(document.querySelector('.hero-section')) {
    // Delay is increased so animations wait for the preloader to disappear
    gsap.from('.hero-content h1', { y: 50, opacity: 0, duration: 1, ease: 'power3.out', delay: 2.0 });
    gsap.from('.hero-content p', { y: 30, opacity: 0, duration: 1, ease: 'power3.out', delay: 2.3 });
    gsap.from('.hero-content .btn-primary', { y: 30, opacity: 0, duration: 1, ease: 'power3.out', delay: 2.5 });
}

// Animate Image & Text Section
if(document.querySelector('.image-text-section')) {
    gsap.from('.text-side', {
        scrollTrigger: { trigger: '.image-text-section', start: 'top 75%' },
        x: -50, opacity: 0, duration: 1, ease: 'power3.out'
    });
    gsap.from('.image-side img', {
        scrollTrigger: { trigger: '.image-text-section', start: 'top 75%' },
        x: 50, opacity: 0, duration: 1, ease: 'power3.out'
    });
}

// Animate Meet The Solution Section
if(document.querySelector('.meet-solution-section')) {
    gsap.from('.meet-left', {
        scrollTrigger: { trigger: '.meet-solution-section', start: 'top 75%' },
        x: -50, opacity: 0, duration: 1, ease: 'power3.out'
    });
    gsap.from('.meet-right img', {
        scrollTrigger: { trigger: '.meet-solution-section', start: 'top 75%' },
        scale: 0.9, opacity: 0, duration: 1.2, ease: 'power3.out'
    });
}


// Animate Footer
if(document.querySelector('.footer-premium')) {
    gsap.from('.footer-premium .footer-brand, .footer-premium .link-column, .footer-premium .footer-newsletter', {
        scrollTrigger: { trigger: '.footer-premium', start: 'top 90%' },
        y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out'
    });
}

// FAQ Accordion Logic
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all other items (optional, but nice for accordions)
        faqItems.forEach(otherItem => otherItem.classList.remove('active'));
        
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Animate FAQ Section
if(document.querySelector('.faq-section')) {
    gsap.from('.faq-section h2, .faq-item', {
        scrollTrigger: { trigger: '.faq-section', start: 'top 85%' },
        y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out'
    });
}

// Animate Final CTA
if(document.querySelector('.final-cta-section')) {
    gsap.from('.final-cta-content h2, .final-cta-content .cta-subtitle, .final-cta-content .cta-offer-box', {
        scrollTrigger: { trigger: '.final-cta-section', start: 'top 85%' },
        y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out'
    });
}

// Chatbot Interactive Logic
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotForm = document.getElementById('chatbot-form');
const chatbotInput = document.getElementById('chatbot-input-field');
const chatbotMessages = document.getElementById('chatbot-messages');

if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
        if(chatbotWindow.classList.contains('active')) {
            chatbotInput.focus();
        }
    });

    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
    });

    chatbotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userText = chatbotInput.value.trim();
        if(!userText) return;

        // Add user message
        const userMsgHTML = `<div class="message user-message">${userText}</div>`;
        chatbotMessages.insertAdjacentHTML('beforeend', userMsgHTML);
        chatbotInput.value = '';
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        // Simulate bot reply
        setTimeout(() => {
            const botReplies = [
                "That's a great question! LUXEYE is formulated with advanced peptides to target fine lines.",
                "Absolutely! We recommend using it morning and night for the best results.",
                "Our customers usually see a difference in just 2-4 weeks.",
                "If you need help choosing, our current 'Special Offer' is the best value right now!"
            ];
            const randomReply = botReplies[Math.floor(Math.random() * botReplies.length)];
            const botMsgHTML = `<div class="message bot-message">${randomReply}</div>`;
            chatbotMessages.insertAdjacentHTML('beforeend', botMsgHTML);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 800);
    });
}
