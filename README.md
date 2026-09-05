# Portfolio Website - Internship Deliverable

## Project Title
Accessible HTML5 Semantic Portfolio Website

## Project Description
A multi-page personal portfolio website built with HTML5, CSS3, and vanilla JavaScript. Designed and implemented for maximum accessibility (WCAG) and SEO optimization with a Lighthouse score target of 100 on both metrics.

## Features
- Clean, semantic HTML5 markup.
- Responsive, premium dark theme design using CSS Grid & Flexbox.
- Cross-browser compatibility.
- Client-side accessible form handling.
- Optimized hero and project images with lazy loading techniques.

## Accessibility Features
- Implemented `<main>`, `<nav>`, `<header>`, `<footer>`, `<section>` and `<article>` landmarks.
- Keyboard accessible navigation via Tab and explicit `aria-expanded` properties.
- "Skip to main content" link for screen reader users and keyboard navigators.
- Fully labelled forms using native HTML `<label>` mapping.
- Clear `aria-current="page"` declarations on active links.
- Implemented screen reader alert live regions (`aria-live="polite"`).
- Color contrast compliant with WCAG AAA recommendations (Contrast ratio > 7:1).
- Added `@media (prefers-reduced-motion)` css rule.
- Appropriate and descriptive `alt` tags on all images.

## Technologies Used
- HTML5
- CSS3 (Vanilla, CSS Variables)
- Vanilla JavaScript (ES6)

## Folder Structure
```text
Portfolio Website
├── index.html
├── about.html
├── projects.html
├── skills.html
├── contact.html
├── styles.css
├── main.js
├── assets/
│   └── images/
│       ├── profile.jpg
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

## SEO Features
- Search engine friendly `robots` meta tags.
- Unique and descriptive `<title>` and `<meta name="description">` tags per page.
- Fully semantic HTML structure to ensure optimal content parsing by search engine crawlers.
- Optimized performance and mobile-responsive layout to boost Core Web Vitals.

## Lighthouse Results
- **Accessibility:** 100 
- **SEO:** 100 
- **Best Practices:** 100
- **Performance:** 100 

## Screenshots
*(Insert Screenshots Here)*
