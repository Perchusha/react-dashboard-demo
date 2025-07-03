# Technical Test (Stimulus + Twin + Storybook + Tailwind CSS)

A small SSR-capable UI component system built on **Vanilla JavaScript** with server‐side rendering (Express + Twig), interactivity via **Stimulus**, styling with **Tailwind CSS v4**, and documentation/preview in **Storybook 8**.

---

## 📦 Installation

```bash
npm install
# or
yarn
```

---

## 💠 Available Scripts

| Command                    | What it does                                                                                   |
| -------------------------- | --------------------------------------------------------------------------------------------- |
| `npm run build:css`        | Compile your Tailwind entrypoint (`templates/styles/tailwind.css`) → `public/styles/output.css` |
| `npm run build:js`         | Run Webpack (via `webpack.config.js`) to bundle your Stimulus controllers → `public/build/`   |
| `npm run build`            | Run both the CSS and JS builds                                                                 |
| `npm run dev`              | Launch the dev server with watchers (Express + Twig SSR + Tailwind + Webpack in `--watch`)   |
| `npm run storybook`        | Spin up Storybook on localhost:6006                                                             |
| `npm run build-storybook`  | Produce a static, production-ready Storybook → `storybook-static/`                              |
| `npm run format`           | Run Prettier over all `.js` and `.twig` files                                                  |

---

## 🗂️ Project Structure

```
.
├── .storybook/            # Storybook config & addons
├── assets/
│   └── controllers/       # Stimulus controllers (button, input, tabs, password-input…)
├── public/
│   ├── build/             # Webpack output for client JS
│   └── styles/            # Compiled Tailwind CSS
├── templates/             # Twig views (atoms, molecules, pages, layouts…)
│   ├── atoms/
│   ├── layouts/
│   ├── molecules/
│   ├── pages/
│   └── styles/
├── router.js              # Express router mounting pages
├── server.js              # Express app entry (uses Twig + Stimulus bundle)
├── webpack.config.js      # Bundles assets/controllers → public/build
└── package.json
```

---

## 🔧 Key Dependencies

### Production

- **express** & **twig** — server‐side rendering  
- **@hotwired/stimulus** — lightweight JS framework for your controllers  

### Development & Tooling

- **webpack**, **babel-loader**, **@babel/core**, **@babel/preset-env** — bundle & transpile  
- **tailwindcss**, **@tailwindcss/cli** — utility-first CSS framework  
- **concurrently**, **nodemon** — run & reload dev server + watchers  
- **storybook** & addons (`@storybook/web-components`, `@storybook/addon-essentials`…) — interactive component playground  
- **prettier** & **prettier-plugin-twig-melody** — code formatting for JS & Twig

---

## 🚀 Development Workflow

1. **Start Dev Server**  
   ```bash
   npm run dev
   ```
   - Express on `http://localhost:3000` serving your Twig pages & components
   - Webpack and Tailwind in watch mode

2. **Preview Components in Storybook**  
   ```bash
   npm run storybook
   ```
   - Visit `http://localhost:6006` to see every atom/molecule/organism in isolation

3. **Format Your Code**  
   ```bash
   npm run format
   ```

4. **Build for Production**  
   ```bash
   npm run build
   npm run build-storybook
   ```

---

## 📚 Architecture & Guidelines

- **Atomic Design**:  
  - `templates/atoms/*` — basic UI building blocks  
  - `templates/molecules/*` — small composite components  
  - `templates/organisms/*` — larger sections or widgets  
- **Stimulus Controllers**:  
  - One per component, living in `assets/controllers`, auto-registered in `assets/controllers/index.js`
- **SSR with Twig**:  
  - All components have a `.html.twig` template; you can include them via Twig’s `{% include … %}` in pages/layouts
- **Storybook Integration**:  
  - Each component has a `*.stories.js` alongside its Twig template  
  - Twig templates are compiled in Storybook via `raw-loader` + `twig` runtime

---
