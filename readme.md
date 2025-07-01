# Frontend Developer Technical Test (Vanilla JS + Storybook + Tailwind CSS)

This project is a component-based UI system built with **Vanilla JavaScript**, styled using **Tailwind CSS v4**, and documented via **Storybook 8**.

## 📦 Setup

```bash
npm install
```

## 💠 Development

### Build Tailwind CSS

Compile the Tailwind styles:

```bash
npm run build:css
```

> This compiles `src/styles/tailwind.css` into `src/styles/output.css`, which is used in Storybook.

### Run Storybook

Start the component development environment:

```bash
npm run storybook
```

### Build Storybook for Production

Build static version of Storybook:

```bash
npm run build-storybook
```

Output is in the `storybook-static` directory.

## 📁 Project Structure

```
src/
├── components/       # Atomic design components (atoms, molecules, etc.)
├── styles/
│   ├── tailwind.css  # Tailwind entrypoint
│   └── output.css    # Compiled Tailwind CSS
.storybook/           # Storybook configuration
```

## 📚 Technologies Used

* **Storybook 8** with `@storybook/web-components`
* **Tailwind CSS v4**
* **Vanilla JavaScript**

## 🔧 Notes

* Tailwind CSS is imported and compiled manually — there is no PostCSS or Webpack integration.
* Styles are injected into Storybook via `preview.js`.
* Components follow [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) methodology.

---

Feel free to clone and extend this setup for your own UI systems!
