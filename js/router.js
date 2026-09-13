export const initRouter = (onRouteUpdate) => {
    // Intercept clicks on links
    document.body.addEventListener('click', e => {
        const link = e.target.closest('a');
        
        // Ensure it's a link and it's on the same origin
        if (link && link.href && link.origin === location.origin) {
            // Ignore hash links or links that open in a new tab
            if (link.hash && link.pathname === location.pathname) return;
            if (link.target === '_blank') return;
            
            // Allow download links
            if (link.hasAttribute('download')) return;

            e.preventDefault();
            const url = new URL(link.href);
            navigateTo(url.pathname);
        }
    });

    // Handle back/forward browser buttons
    window.addEventListener('popstate', () => {
        loadPage(location.pathname, false);
    });

    const navigateTo = (path) => {
        // Only load if path changed
        if (path !== location.pathname) {
            loadPage(path, true);
        }
    };

    const loadPage = async (path, pushToHistory) => {
        try {
            // Handle root path
            const fetchPath = path === '/' ? '/index.html' : path;
            const response = await fetch(fetchPath);
            
            if (!response.ok) {
                throw new Error(`Failed to load page: ${response.status}`);
            }

            const html = await response.text();
            
            // Parse HTML string to extract main content and title
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const newMain = doc.querySelector('main#main-content');
            const newTitle = doc.querySelector('title');

            if (newMain) {
                const currentMain = document.querySelector('main#main-content');
                currentMain.replaceWith(newMain);
                
                if (newTitle) {
                    document.title = newTitle.textContent;
                }

                // Update active navigation state
                updateNavActiveState(path);

                // Update history
                if (pushToHistory) {
                    history.pushState(null, '', path);
                }

                // Scroll to top
                window.scrollTo(0, 0);

                // Call the provided callback to re-initialize scripts (todo, weather, contact form, etc)
                if (onRouteUpdate) {
                    onRouteUpdate();
                }
            } else {
                // Fallback to normal navigation if we couldn't parse <main>
                window.location.href = path;
            }

        } catch (error) {
            console.error('Routing error:', error);
            // Fallback to standard navigation on error
            window.location.href = path;
        }
    };

    const updateNavActiveState = (path) => {
        // Normalize path
        const currentPath = path === '/' ? '/index.html' : path;
        
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            const linkPath = new URL(link.href).pathname;
            if (linkPath === currentPath || (currentPath === '/' && linkPath === '/index.html')) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };
};
