# Frontend Developer Technical Test (Vanilla JS + Express SSR + Storybook + Tailwind CSS)

This project is a component-based UI system built with **Vanilla JavaScript**, server-rendered via **Express**, styled using **Tailwind CSS v4**, and documented via **Storybook 8**. Client-side “rehydration” and bundling is handled by **esbuild**.

## 📦 Setup

```bash
npm install
```

## 💠 Development

### All-in-one Dev Mode

Run CSS watcher, client bundler and Express server concurrently:

```bash
npm run dev
```

- **Tailwind CSS** watches `src/styles/tailwind.css` → `public/styles.css`
- **esbuild** watches & bundles `public/client.js` → `public/bundle.js`
- **nodemon** restarts `server.js` on changes

Your SSR demo will be available at [http://localhost:3000](http://localhost:3000).

---

### Build Tailwind CSS Only

```bash
npm run build:css
```

Compiles and minifies your Tailwind styles from  
`src/styles/tailwind.css` → `public/styles.css` (with `--watch`).

---

### Bundle Client-Side JS Only

```bash
npm run build:client
```

Bundles & transpiles your client-side entrypoint  
`public/client.js` → `public/bundle.js` (ES2015 target).

---

### Storybook

Start the interactive component playground:

```bash
npm run storybook
```

Build a static Storybook for publishing:

```bash
npm run build-storybook
```

Output is in the `storybook-static/` directory.

## 📁 Project Structure

```
.
├── public/                Client-facing assets
│   ├── styles.css         Tailwind output
│   └── bundle.js          esbuild bundle
├── src/
│   ├── components/        Atomic-design components (atoms, molecules, organisms)
│   └── styles/
│       └── tailwind.css   Tailwind entrypoint
├── .storybook/            Storybook configuration
├── server.js              Express SSR entrypoint
├── public/client.js       Client hydration script
└── package.json
```

## 📚 Technologies Used

- **Vanilla JavaScript** with ES Modules
- **Express** for server-side rendering
- **Tailwind CSS v4** via CLI
- **esbuild** for client bundling & transpilation
- **Storybook 8** (`@storybook/web-components`) for component previews

## 🔧 Notes

- No Webpack or PostCSS—everything is driven by simple CLIs.
- Styles are injected via Tailwind’s CLI `--watch`.
- Client-side logic is “hydrated” over SSR HTML by matching `data-component` & `data-props`.
- You can extend or adapt this setup for your own Vanilla-JS UI systems!
