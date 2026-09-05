document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
            mobileBtn.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
    }

    // Accessible Form Handling
    const contactForm = document.getElementById('contactForm');
    const statusRegion = document.getElementById('formStatus');

    if (contactForm && statusRegion) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Mock API / Validation logic
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.setAttribute('aria-disabled', 'true');
            submitBtn.disabled = true;

            // Simulate network request
            setTimeout(() => {
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.removeAttribute('aria-disabled');
                submitBtn.disabled = false;
                
                statusRegion.textContent = 'Thank you! Your message has been sent successfully.';
                statusRegion.className = 'alert success';
                
                // Set focus to status region for screen readers
                statusRegion.focus();
            }, 1000);
        });
    }
});
