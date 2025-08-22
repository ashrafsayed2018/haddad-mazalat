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

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .gallery-item, .feature-item, .contact-form');
    animatedElements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
    
    // Trigger loaded state after a short delay
    setTimeout(() => {
        animatedElements.forEach(el => {
            el.classList.add('loaded');
        });
    }, 100);
});

// Form submission
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const service = this.querySelector('select').value;
    const details = this.querySelector('textarea').value;
    
    // Create WhatsApp message
    const message = `مرحباً، أنا ${name}
رقم الهاتف: ${phone}
نوع الخدمة: ${service}
تفاصيل المشروع: ${details}`;
    
    const whatsappUrl = `https://wa.me/96555744186?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    this.reset();
    
    // Show success message
    alert('تم إرسال طلبكم بنجاح! سيتم التواصل معكم قريباً.');
});

// Phone number formatting
document.querySelector('input[type="tel"]').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) {
        value = value.substring(0, 8);
    }
    e.target.value = value;
});

// Gallery image loading
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
});

// Service selection enhancement
document.querySelector('.contact-form select').addEventListener('change', function() {
    const selectedService = this.value;
    const textarea = document.querySelector('.contact-form textarea');
    
    if (selectedService && !textarea.value) {
        const serviceTexts = {
            'car-shade': 'أحتاج تركيب مظلة سيارات...',
            'australian-shade': 'أرغب في تركيب مظلة استرالي...',
            'doors-windows': 'أحتاج تركيب أبواب وشبابيك...',
            'railings': 'أرغب في تركيب درابزين وشبرات...',
            'warehouses': 'أحتاج إنشاء مخزن أو تركيب قرميد...',
            'general': 'أحتاج خدمات حدادة عامة...'
        };
        
        textarea.placeholder = serviceTexts[selectedService] || 'تفاصيل المشروع';
    }
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('loading');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add click tracking for analytics (optional)
document.querySelectorAll('a[href^="tel:"], a[href^="https://wa.me/"]').forEach(link => {
    link.addEventListener('click', function() {
        // Track clicks for analytics
        console.log('Contact link clicked:', this.href);
    });
});

// Prevent form spam
let lastSubmission = 0;
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    const now = Date.now();
    if (now - lastSubmission < 5000) { // 5 seconds cooldown
        e.preventDefault();
        alert('يرجى الانتظار قبل إرسال طلب آخر');
        return;
    }
    lastSubmission = now;
});

// Add loading state to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.type === 'submit') {
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';
            setTimeout(() => {
                this.style.opacity = '1';
                this.style.pointerEvents = 'auto';
            }, 2000);
        }
    });
});