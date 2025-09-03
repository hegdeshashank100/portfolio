// Matrix Rain Effect for Background
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        this.columns = [];
        this.columnCount = Math.floor(this.canvas.width / 20);
        
        for(let i = 0; i < this.columnCount; i++) {
            this.columns[i] = 1;
        }
        
        window.addEventListener('resize', () => this.resizeCanvas());
        this.animate();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00d4ff';
        this.ctx.font = '15px monospace';
        
        for(let i = 0; i < this.columns.length; i++) {
            const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            this.ctx.fillText(text, i * 20, this.columns[i] * 20);
            
            if(this.columns[i] * 20 > this.canvas.height && Math.random() > 0.975) {
                this.columns[i] = 0;
            }
            this.columns[i]++;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Typing Animation
class TypingAnimation {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.type();
    }
    
    type() {
        const currentText = this.texts[this.textIndex];
        
        if(this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        let typeSpeed = this.speed;
        
        if(this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if(!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = 2000;
            this.isDeleting = true;
        } else if(this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Smooth Scroll Animation
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if(target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Particle System
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.createParticle();
        });
    }
    
    createParticle() {
        const particle = {
            x: this.mouse.x,
            y: this.mouse.y,
            size: Math.random() * 5 + 1,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2,
            color: `hsl(${Math.random() * 60 + 180}, 100%, 50%)`,
            life: 1,
            decay: Math.random() * 0.02 + 0.005
        };
        
        this.particles.push(particle);
        
        if(this.particles.length > 100) {
            this.particles.shift();
        }
        
        this.animateParticles();
    }
    
    animateParticles() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '9999';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        if(!document.querySelector('canvas[style*="pointer-events: none"]')) {
            document.body.appendChild(canvas);
        }
        
        const ctx = canvas.getContext('2d');
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            this.particles.forEach((particle, index) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                particle.life -= particle.decay;
                
                if(particle.life <= 0) {
                    this.particles.splice(index, 1);
                    return;
                }
                
                ctx.save();
                ctx.globalAlpha = particle.life;
                ctx.fillStyle = particle.color;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
            
            if(this.particles.length > 0) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
}

// Scroll Reveal Animation
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.fade-in, .slide-left, .slide-right');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });
        
        this.elements.forEach(el => {
            observer.observe(el);
        });
    }
}

// Counter Animation
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        this.counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            
            if(current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 20);
    }
}

// Mobile Navigation
class MobileNav {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }
    
    init() {
        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

// Navbar Scroll Effect
class NavbarScroll {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }
}

// Project Modal
class ProjectModal {
    constructor() {
        this.modal = document.getElementById('project-modal');
        this.modalBody = document.getElementById('modal-body');
        this.closeBtn = document.querySelector('.close-modal');
        this.projectCards = document.querySelectorAll('.project-card');
        this.init();
    }
    
    init() {
        this.projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const project = card.dataset.project;
                this.openModal(project);
            });
        });
        
        if(this.closeBtn) {
            this.closeBtn.addEventListener('click', () => {
                this.closeModal();
            });
        }
        
        if(this.modal) {
            this.modal.addEventListener('click', (e) => {
                if(e.target === this.modal) {
                    this.closeModal();
                }
            });
        }
    }
    
    openModal(project) {
        const projectData = this.getProjectData(project);
        if(this.modalBody) {
            this.modalBody.innerHTML = `
                <h2>${projectData.title}</h2>
                <p><strong>Description:</strong> ${projectData.description}</p>
                <p><strong>Technologies:</strong> ${projectData.technologies.join(', ')}</p>
                <h3>Features:</h3>
                <ul>
                    ${projectData.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            `;
        }
        if(this.modal) {
            this.modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeModal() {
        if(this.modal) {
            this.modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    getProjectData(project) {
        const projects = {
            'mindcare': {
                title: 'MindCare AI',
                description: 'AI-powered web platform for 24/7 mental health support with emotion detection and personalized recommendations.',
                technologies: ['Python', 'TensorFlow', 'React', 'Flask'],
                features: ['Emotion Detection', '24/7 Support', 'Personalized Recommendations', 'Chat Interface']
            },
            'educonnect': {
                title: 'EduConnect',
                description: 'Centralized platform for academic resources and career guidance for students.',
                technologies: ['JavaScript', 'Node.js', 'MongoDB', 'React'],
                features: ['Resource Sharing', 'Career Guidance', 'Student Community', 'Progress Tracking']
            }
        };
        return projects[project] || projects['mindcare'];
    }
}

// Initialize all classes when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MatrixRain();
    new SmoothScroll();
    new ParticleSystem();
    new ScrollReveal();
    new CounterAnimation();
    new MobileNav();
    new NavbarScroll();
    new ProjectModal();
    
    // Initialize typing animation
    const typingElement = document.getElementById('typing-text');
    if(typingElement) {
        new TypingAnimation(typingElement, [
            'Web & Application Developer',
            'AI Enthusiast',
            'Problem Solver',
            'Tech Innovator'
        ]);
    }
});
