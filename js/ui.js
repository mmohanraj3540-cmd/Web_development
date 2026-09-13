export const initTheme = () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (themeToggleBtn) {
            themeToggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        }
    };

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme(prefersDarkScheme.matches ? 'dark' : 'light');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
};

export const initMobileMenu = () => {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
            mobileBtn.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
    }
};

export const initContactForm = () => {
    const contactForm = document.getElementById('contactForm');
    const statusRegion = document.getElementById('formStatus');

    if (contactForm && statusRegion) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.setAttribute('aria-disabled', 'true');
            submitBtn.disabled = true;

            setTimeout(() => {
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.removeAttribute('aria-disabled');
                submitBtn.disabled = false;
                
                statusRegion.textContent = 'Thank you! Your message has been sent successfully.';
                statusRegion.className = 'alert success';
                
                statusRegion.focus();
            }, 1000);
        });
    }
};

export const initCursor = () => {
    // Only initialize on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Create cursor elements if they don't exist
    if (!document.querySelector('.cursor-dot')) {
        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        
        const cursorOutline = document.createElement('div');
        cursorOutline.className = 'cursor-outline';
        
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorOutline);
        
        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;
        
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Dot follows exactly
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        });
        
        // Smooth trailing effect for outline
        const animate = () => {
            let distX = mouseX - outlineX;
            let distY = mouseY - outlineY;
            
            outlineX = outlineX + (distX * 0.15);
            outlineY = outlineY + (distY * 0.15);
            
            cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
            requestAnimationFrame(animate);
        };
        
        animate();

        // Add hover effects for interactive elements dynamically using event delegation
        document.body.addEventListener('mouseover', (e) => {
            if (e.target.closest('a') || e.target.closest('button') || e.target.closest('input') || e.target.closest('textarea')) {
                cursorDot.classList.add('hovering');
                cursorOutline.classList.add('hovering');
            }
        });
        
        document.body.addEventListener('mouseout', (e) => {
            if (e.target.closest('a') || e.target.closest('button') || e.target.closest('input') || e.target.closest('textarea')) {
                cursorDot.classList.remove('hovering');
                cursorOutline.classList.remove('hovering');
            }
        });
    }
};
