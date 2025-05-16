document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(5, 5, 5, 0.95)';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.backgroundColor = 'rgba(5, 5, 5, 0.9)';
            header.style.boxShadow = 'none';
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Toggle between menu and close icon
        if (navMenu.classList.contains('active')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Close menu when clicking on a nav link (mobile)
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    // Modal functionality
    const loginBtn = document.querySelector('.login-btn a');
    const modal = document.getElementById('login');
    const closeModal = document.querySelector('.close-modal');
    
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Video preview interaction
    const videoContainers = document.querySelectorAll('.video-container:not(.locked), .featured-item:not(.locked) .featured-thumbnail');
    videoContainers.forEach(container => {
        const playIcon = container.querySelector('.play-icon');
        if (playIcon) {
            playIcon.addEventListener('click', function() {
                // This would normally load the video player
                alert('Video player would load here. This is a free preview.');
            });
        }
    });

    // Locked content interaction
    const lockedContent = document.querySelectorAll('.lock-overlay, .lock-icon');
    lockedContent.forEach(item => {
        item.addEventListener('click', function() {
            // Scroll to subscription plans
            document.getElementById('plans').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Subscription form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value) {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }

    // Login form
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Login functionality would be implemented here.');
        });
    }

    // Add spooky cursor effect
    const body = document.querySelector('body');
    body.addEventListener('mousemove', function(e) {
        const x = e.clientX;
        const y = e.clientY;
        
        // Create a subtle glow effect that follows the cursor
        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        glow.style.cssText = `
            position: fixed;
            top: ${y}px;
            left: ${x}px;
            width: 30px;
            height: 30px;
            background: radial-gradient(circle, rgba(125,0,0,0.3) 0%, rgba(125,0,0,0) 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9999;
        `;
        
        body.appendChild(glow);
        
        // Remove the glow effect after animation
        setTimeout(() => {
            glow.style.opacity = '0';
            setTimeout(() => {
                glow.remove();
            }, 300);
        }, 100);
    });

    // Add random flicker effect to highlight elements
    const highlights = document.querySelectorAll('.highlight');
    
    function randomFlicker() {
        highlights.forEach(highlight => {
            if (Math.random() > 0.99) {
                highlight.style.opacity = '0.7';
                setTimeout(() => {
                    highlight.style.opacity = '1';
                }, 100);
            }
        });
        
        requestAnimationFrame(randomFlicker);
    }
    
    randomFlicker();
});