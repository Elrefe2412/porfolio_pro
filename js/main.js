/**
 * ============================================
 * PORTFOLIO NDJIOTCHOU DILAN
 * JavaScript Vanilla ES6+
 * ============================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollSpy();
    initSkillAnimation();
    initCounterAnimation();
    initContactForm();
    initSmoothScroll();
});

// ============================================
// NAVIGATION MOBILE + SCROLL EFFECT
// ============================================
function initNavigation() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    const nav = document.getElementById('navbar');
    
    // Toggle menu mobile
    toggle?.addEventListener('click', () => {
        links.classList.toggle('active');
        const icon = toggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
    
    // Fermer le menu au clic sur un lien
    links?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            links.classList.remove('active');
            const icon = toggle?.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });
    
    // Effet de scroll sur la navigation
    window.addEventListener('scroll', () => {
        nav?.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// ============================================
// SCROLL SPY - Navigation active
// ============================================
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
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
}

// ============================================
// ANIMATION BARRES DE COMPÉTENCES
// ============================================
function initSkillAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const width = bar.dataset.width;
                    bar.style.width = width;
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('.skill-card').forEach(card => {
        observer.observe(card);
    });
}

// ============================================
// ANIMATION COMPTEURS
// ============================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.dataset.count);
                const duration = 2000;
                const startTime = performance.now();
                
                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const current = Math.floor(progress * count);
                    
                    target.textContent = current;
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }
                
                requestAnimationFrame(updateCounter);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// ============================================
// FORMULAIRE DE CONTACT
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    const messageDiv = document.getElementById('formMessage');
    
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            nom: document.getElementById('nom').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        // Validation
        if (!formData.nom || !formData.email || !formData.message) {
            showMessage('Tous les champs sont obligatoires.', 'error');
            return;
        }
        
        if (!formData.email.includes('@') || !formData.email.includes('.')) {
            showMessage('Adresse email invalide.', 'error');
            return;
        }
        
        if (formData.message.length < 10) {
            showMessage('Le message doit contenir au moins 10 caractères.', 'error');
            return;
        }
        
        // Désactiver le bouton
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        
        // Simuler un envoi (pas de backend)
        setTimeout(() => {
            showMessage(`Merci ${formData.nom} ! Votre message a bien été envoyé. Je vous répondrai rapidement.`, 'success');
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
        }, 1500);
    });
}

function showMessage(text, type) {
    const messageDiv = document.getElementById('formMessage');
    if (messageDiv) {
        messageDiv.textContent = text;
        messageDiv.className = `form-message ${type}`;
        messageDiv.style.display = 'block';
        
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = 70;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}