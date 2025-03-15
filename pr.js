document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('http')) {
                window.location.href = targetId; // External link handling
            } else {
                const targetSection = document.querySelector(targetId);
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Scroll animation observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe profile container
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
});