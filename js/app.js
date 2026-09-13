import { initTheme, initMobileMenu, initContactForm, initCursor } from './ui.js';
import { initTodo } from './todo.js';
import { initWeather } from './weather.js';
import { initRouter } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize global UI elements that persist across routes (Header/Footer)
    initTheme();
    initMobileMenu();
    initCursor();

    // 2. Define the route update callback
    // This runs on initial load and after every client-side route change
    const onRouteUpdate = () => {
        // Re-initialize page specific scripts.
        // These scripts are designed to exit early if their target DOM elements are missing.
        initTodo();
        initWeather();
        initContactForm();
    };

    // 3. Initialize the router
    initRouter(onRouteUpdate);

    // 4. Trigger initial page script load
    onRouteUpdate();
});
