document.addEventListener("DOMContentLoaded", function () {
    // === MOBILE MENU TOGGLE ===
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // === NAV LINK SMOOTH SCROLLING ===
    const navLinksItems = document.querySelectorAll('nav a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('http') || !targetId.startsWith('#')) {
                window.location.href = targetId;
            } else {
                document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
                navLinks.classList.remove('active');
                navLinksItems.forEach(item => item.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // === SCROLL PROGRESS BAR ===
    function updateScrollProgress() {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.querySelector('.scroll-progress').style.transform = `scaleX(${scrolled / 100})`;
    }
    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();

    // === ORB INTERACTION ===
    const orb = document.querySelector('.orb');
    let orbEnlarged = false;

    function toggleOrb() {
        orbEnlarged = !orbEnlarged;
        orb.classList.toggle('enlarged');
    }

    function animateOrbGlow() {
        let scale = 1;
        let direction = 1;
        setInterval(() => {
            scale += 0.01 * direction;
            if (scale >= 1.1 || scale <= 0.9) direction *= -1;
            orb.style.transform = `translateX(-50%) scale(${scale})`;
        }, 60);
    }

    if (orb) {
        orb.addEventListener('click', toggleOrb);
        animateOrbGlow();
    }

    // === 3D CARD TILT EFFECT ===
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * 10;
            const rotateY = ((x - centerX) / centerX) * -10;
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    });

    // === CARD DETAILS TOGGLE ===
    window.toggleCardDetails = function(card) {
        card.classList.toggle('active');
    };

    // === CONTACT FORM HANDLER ===
    window.handleSubmit = function(event) {
        event.preventDefault();
        const form = event.target;
        const message = document.getElementById('form-message');
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const text = form.querySelector('textarea').value;

        if (name && email && text) {
            message.style.display = 'block';
            message.textContent = 'Thank you, ' + name + '! Your message has been sent.';
            message.style.color = '#00ff00';
            form.reset();
            setTimeout(() => {
                message.style.display = 'none';
            }, 3000);
        } else {
            message.style.display = 'block';
            message.textContent = 'Please fill all fields.';
            message.style.color = '#ff0000';
            setTimeout(() => {
                message.style.display = 'none';
            }, 3000);
        }
    };

    // === SCROLL REVEAL ANIMATION ===
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-panel').forEach(element => {
        observer.observe(element);
    });

    // === TYPEWRITER HERO TEXT ===
    const typewriter = document.querySelector('h1.animate__animated');
    if (typewriter) {
        const text = typewriter.textContent;
        typewriter.textContent = '';
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                typewriter.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 120);
    }

    // === DARK/LIGHT THEME TOGGLE ===
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
        });

        // Apply saved theme on load
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-theme');
        }
    }
});
