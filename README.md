# Advanced CSS3 & Responsive Architecture Portfolio

## Overview
This project is a multi-page personal portfolio website built with native web technologies. Originally designed with a strong focus on HTML5 semantic structure and WCAG accessibility, it has been transformed into a visually stunning, modern, and fully responsive website leveraging advanced CSS3 properties and modern layout architectures.

## Technologies Used
- HTML5
- CSS3
- JavaScript

## Features
- **CSS Grid:** Used for complex two-dimensional layouts, including the hero section, project cards, and skills grid.
- **Flexbox:** Applied for localized component alignment such as the navigation bar, buttons, and theme toggle.
- **Mobile-first responsive design:** Fluidly adapts to any screen size starting from mobile up to large desktop displays.
- **CSS Variables:** A robust custom property system for colors, typography fluid scaling (`clamp()`), spacing, shadows, and transitions.
- **Light/Dark mode:** Seamless theme switching with user preference persistence.
- **Responsive navigation:** A fully accessible mobile menu using vanilla JavaScript.
- **Accessibility:** Preserves semantic HTML5 tags, ARIA attributes, keyboard navigation, and high contrast focus states.
- **Semantic HTML5:** Strict adherence to structural tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).

## Task 3 – JavaScript To-Do Application
This project includes a fully functional client-side To-Do List application built to demonstrate advanced JavaScript concepts. The application (`todo.html`) showcases:
- **CRUD operations**: Create, read, update, and delete tasks.
- **DOM manipulation**: Dynamic element generation and safe content injection.
- **Event handling**: Interactive UI elements including keyboard support.
- **Event delegation**: Efficient action handling using a single event listener on the parent list.
- **State management**: Utilizing a central JavaScript array (`tasks`) as the single source of truth.
- **localStorage persistence**: Seamless data saving and loading across sessions and page reloads.
- **Filtering**: Dynamic UI states (All, Active, Completed).
- **Responsive design**: Mobile-first architecture integrated with the main portfolio layout.
- **Accessibility**: Semantic elements, screen-reader friendly live regions, and aria-labels.
The To-Do application logic is encapsulated in `todo.js`, with the UI styled seamlessly via custom properties in `styles.css`.

## Task 4 – Asynchronous JavaScript & RESTful APIs (Weather Dashboard)
This project includes a real-time Weather Dashboard (`weather.html`) that fetches and processes JSON data from public REST APIs using modern asynchronous JavaScript.
- **Asynchronous JavaScript**: Utilizes `async/await`, `fetch()`, and robust `try/catch/finally` blocks for non-blocking operations.
- **RESTful APIs**: Integrates with Open-Meteo's Geocoding API to resolve city coordinates, and the Forecast API to retrieve current weather metrics.
- **JSON Processing**: Safely extracts and processes nested JSON properties and maps WMO codes to human-readable weather conditions.
- **Dynamic DOM Rendering**: Securely updates the UI with retrieved data (Temperature, Humidity, Wind Speed) without using unsafe `innerHTML`.
- **Error Handling**: Comprehensive handling of network failures, invalid HTTP responses, empty inputs, and unfound cities.
- **Loading & Status States**: Accessible loading indicators and friendly error messages utilizing `aria-live`.
- **Responsive Design & Accessibility**: Fully responsive across devices and integrated with the existing Light/Dark theme system while maintaining strict keyboard navigation and accessibility standards.

## Responsive Design
The website uses a mobile-first approach and progressively enhances the layout across multiple breakpoints to ensure optimal viewing experiences across all devices. It fully supports:
- Mobile (320px and up)
- Tablet (768px and up)
- Desktop (1024px and up)
- Large Desktop (1280px and up)

## Theme System
The portfolio includes a fully functional light and dark mode toggle. It utilizes CSS variables to switch the entire theme effortlessly. 
- A toggle button is available in the site navigation.
- The user's selection is saved in the browser's `localStorage` so the preference persists across page reloads.
- If no preference is saved, the site respects the user's system setting (`prefers-color-scheme`).

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
├── main.js
├── todo.js
├── weather.js
├── assets/
│   └── images/
│       ├── workspace.jpg
│       ├── project-retrievax.jpg
│       └── project-video-gen.jpg
├── robots.txt
├── sitemap.xml
└── README.md
```

## How to run the project
1. Clone or download this repository.
2. Open the `portfolio` directory in a local server environment (e.g. VSCode Live Server).
3. Alternatively, directly open `index.html` in your favorite web browser. No build steps are required.

## GitHub Pages Deployment
To deploy this accessible portfolio to GitHub Pages:
1. Initialize a Git repository if you haven't already (`git init`).
2. Commit your files (`git add .` and `git commit -m "Initial commit"`).
3. Create a new repository on GitHub and push your local repository to it.
4. Navigate to your GitHub repository's **Settings** > **Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Select the `main` or `master` branch and the `/ (root)` folder, then click **Save**.
7. Wait a few minutes for the GitHub Actions workflow to build and deploy your site. Your site will be live at `https://<username>.github.io/<repository-name>/`.
Note: Ensure all assets and internal links use relative paths for compatibility with GitHub Pages.
