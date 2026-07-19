# Premium Calculator

A fast, accessible calculator built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step, no dependencies.

Live demo: https://abdibirru.github.io/codealpha-calculator/

## Features

- All core operations: add, subtract, multiply, divide
- Real-time display updates as you type
- Full keyboard support (digits, + - * /, Enter/=, Escape, Backspace)

- Light and dark themes — follows system preference, remembers manual choice
- Divide-by-zero handled gracefully (shows Error, doesn't crash)
- Thousand-separator number formatting
- Mobile-first responsive layout
- Screen-reader support (live region announces results, described keyboard shortcuts)
- Respects prefers-reduced-motion
- Zero dependencies — pure HTML, CSS, and JavaScript

## Tech stack

- HTML5 (semantic markup, ARIA landmarks)
- CSS3 (custom properties for theming, CSS Grid, no preprocessor)
- Vanilla JavaScript (ES6 class-based, no framework, no build tool)

## Project structure

premium-calculator/
├── index.html
├── css/
│   ├── tokens.css       — design tokens (color, type, spacing) for both themes
│   ├── base.css         — resets, layout, accessibility utilities
│   └── calculator.css   — calculator component styles and animations
├── js/
│   ├── ui.js             — calculator engine + DOM controller
│   └── theme.js          — light/dark theme toggle logic

├── assets/
│   └── favicon.svg
├── robots.txt
├── sitemap.xml
└── .nojekyll

## Running locally

No build step required.

git clone https://github.com/abdibirru/codealpha-calculator.git
cd codealpha-calculator
python3 -m http.server 8080
Then open http://localhost:8080.

## Deployment

Deployed via GitHub Pages, serving directly from the main branch root.

## Deployment

Deployed via GitHub Pages, serving directly from the main branch root.

## Architecture notes

## Architecture notes

The calculator logic (CalculatorEngine) is fully decoupled from DOM access (CalculatorUI), so the arithmetic engine could be unit-tested or reused independently of the browser. Theming is handled entirely through CSS custom properties swapped via a data-theme attribute, so no styles are duplicated between light and dark modes.

## License

MIT — see [LICENSE](./LICENSE).

## Author

Abdisa Birru
[GitHub](https://github.com/abdibirru)
