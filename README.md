# NeonTech — Static Store Demo

Simple frontend demo showcasing a small product catalog, client-side interactions, and a local JSON API (via `json-server`). Designed as a learning / portfolio project for web fundamentals (HTML, CSS, JavaScript) and lightweight API prototyping.

## Features

- Multi-page static site: `index.html`, `products.html`, `about.html`, `contact.html`, `signin.html`, `register.html`
- Client-side interactive elements: demo activation button, form validation, dynamic product cards
- Two product data modes:
  - Week 7 (static/API read): fetches product data from a local JSON API (`/products`) and renders cards
  - Week 8 (API CRUD demo): uses `json-server` for GET/POST; new products can be added from the site and saved to `db.json`
- Simple user registration / sign-in flow (demo only): stores user records via `json-server` and session in `localStorage`

## Tech Stack

- HTML5, CSS3 (responsive layout), Vanilla JavaScript (ES6)
- `json-server` (local JSON API for quick prototyping)

## Quickstart (run locally)

Prerequisites: Node.js and `npm` available for `json-server` (optional if you only want to view static pages).

1. Open static pages in your browser (no server required):

```bash
# from the project folder, open index.html in a browser or use a lightweight static server
npx serve .      # (optional) serves files on localhost:3000
```

2. Start the demo API using `json-server` (enables product listing and registration flows):

```bash
npx json-server --watch db.json --port 3000
```

3. With `json-server` running, open `index.html` (or `products.html`) and the site will fetch `/products` and `/users` from the local API.

Notes:
- If `json-server` is not running the product sections show an inline setup message with the exact command.
- The demo uses `localStorage` to persist the signed-in user on the client side; passwords are stored in plaintext in `db.json` for demo only (do NOT use this approach in production).

## API Endpoints (via `json-server`)

- `GET /products` — list products
- `POST /products` — add a new product (used by the product form)
- `GET /users` — list demo users
- `POST /users` — register new user

## What the JavaScript Does (high level)

- Adds a demo interactive button on the homepage (toggle text and styling).
- Validates the contact form (name / email / message) and shows inline error/success states.
- Fetches product records from `http://localhost:3000/products` and renders product cards.
- Submits new products to the API and updates the UI immediately on success.
- Implements demo registration and sign-in forms that POST/GET from `http://localhost:3000/users` and store the current user in `localStorage`.

## File Layout

- `index.html` — landing page with hero and feature sections
- `products.html` — product catalog and API demo sections
- `about.html`, `contact.html` — support pages and contact form
- `signin.html`, `register.html` — demo auth pages (client-side only)
- `style.css` — main stylesheet
- `script.js` — application logic, fetch + rendering, form handlers
- `db.json` — local JSON data used by `json-server` (products + users)
- `images/`, `css/`, `js/` — assets and helper files

## Security & Production Notes

- This repository is a teaching/demo project. Do not use the authentication or data storage approach shown here in production — passwords are stored in plaintext and authentication is not secure.
- For a production app, use a backend with proper authentication, hashed passwords, and secure storage.

## License & Attribution

This project is provided as-is for educational purposes. Feel free to reuse or adapt the code in your portfolio.
