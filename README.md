# Professional Portfolio & Productivity Dashboard

## Overview
This capstone project transforms an accessible multi-page portfolio into a robust, production-ready frontend web application named "Professional Portfolio & Productivity Dashboard". It showcases modern web development practices including a modular ES6 architecture, lightweight client-side routing, advanced CSS3 responsive layouts, and integrations with REST APIs.

## Technologies Used
- HTML5 (Semantic and Accessible)
- CSS3 (Custom Variables, Flexbox, Grid, Light/Dark Theme)
- Vanilla JavaScript (ES6 Modules, Async/Await, Fetch API)
- Client-Side Routing (History API)

## Capstone Features (Task 5 Updates)
- **Modular Frontend Architecture:** All JavaScript is modularized using ES6 `export/import`, organized within the `js/` directory for clear separation of concerns (`app.js`, `router.js`, `ui.js`, `todo.js`, `weather.js`).
- **Client-Side Routing:** Implements a lightweight `history.pushState` router that dynamically fetches HTML content and updates the DOM, ensuring lightning-fast navigation without full page reloads, while fully preserving direct link access on static hosts.
- **Performance Optimizations:** Deploys lazy loading (`decoding="async"`, `loading="lazy"`) for images and modular script loading. 
- **Deployment Preparedness:** Includes routing and caching configurations for seamless live deployment on Vercel (`vercel.json`) and Netlify (`netlify.toml`).

## Legacy Features (Tasks 1-4)
- **CSS Grid & Flexbox:** Used for complex layout architectures.
- **Mobile-first responsive design:** Fluidly adapts to any screen size.
- **Light/Dark mode:** Seamless theme switching with user preference persistence.
- **Accessibility (WCAG):** Preserves semantic HTML5 tags, ARIA attributes, keyboard navigation.
- **To-Do Application:** A fully functional task manager with DOM manipulation, filtering, and localStorage persistence.
- **Weather Dashboard:** Real-time data integration using the Open-Meteo REST API, async/await, and comprehensive error handling.

## Project Structure
```text
portfolio
├── index.html
├── about.html
├── projects.html
├── skills.html
├── contact.html
├── todo.html
├── weather.html
├── styles.css
├── js/
│   ├── app.js
│   ├── router.js
│   ├── ui.js
│   ├── todo.js
│   └── weather.js
├── assets/
│   └── images/
│       ├── workspace.jpg
│       ├── project-retrievax.jpg
│       └── project-video-gen.jpg
├── vercel.json
├── netlify.toml
├── robots.txt
├── sitemap.xml
└── README.md
```

## How to run the project locally
Because this project utilizes ES Modules (`<script type="module">`) and the Fetch API for client-side routing, it cannot be run directly via the `file://` protocol due to browser CORS security restrictions.
1. Clone or download this repository.
2. Open the `portfolio` directory in a local server environment (e.g., VSCode Live Server).
3. Alternatively, use a simple local server like Node's `npx serve .` or Python's `python -m http.server`.
4. Navigate to the local server URL (e.g., `http://localhost:3000`).

## Live Deployment (Vercel or Netlify)
This project is configured and ready for 1-click deployment as a static frontend on modern hosting platforms.

**Vercel:**
1. Import the repository into Vercel.
2. The included `vercel.json` will automatically configure aggressive caching for assets and ensure routing works perfectly.
3. Deploy!

**Netlify:**
1. Import the repository into Netlify.
2. The included `netlify.toml` will handle security headers and caching configuration.
3. Deploy!

**Live Deployment URL:** `[Placeholder for Live URL]`

## Testing Checklist Performed
- [x] Home, About, Projects, Skills, Contact pages load.
- [x] To-Do page and Weather page load.
- [x] Client-side navigation (Router) works without full page refresh.
- [x] Browser Back/Forward buttons work correctly (History API).
- [x] Direct URLs work without returning 404 on local server.
- [x] To-Do CRUD & localStorage works dynamically.
- [x] Weather Dashboard API & Error handling works dynamically.
- [x] Theme toggle state persists across pages.
- [x] Responsive layout across 375px, 768px, 1024px, 1440px.
- [x] No console errors; no broken assets.
- [x] No API keys, secrets, or localhost paths committed.
