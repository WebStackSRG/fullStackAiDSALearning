# Theme Switching Card (HTML, CSS & JS)

An interactive, accessible, and responsive card component demonstrating modern **Light and Dark Mode** theme switching using CSS Custom Properties and vanilla JavaScript.

---

## 🚀 Features

- **CSS Custom Properties (Variables):** Clean separation of design tokens for light and dark palettes.
- **Accessible Switch:** Built using semantic HTML (`role="switch"`, `aria-checked`, and keyboard support).
- **Smooth Transitions:** Seamless transitions across colors, borders, and shadows using `cubic-bezier` curves.
- **Persistent State:** Saves user preference in `localStorage`.
- **System Theme Auto-Detection:** Automatically matches OS preferences (`prefers-color-scheme: dark`) when no manual selection is stored.
- **Glassmorphic & Responsive Design:** Polished visuals with gradient ambient lighting and full mobile responsiveness.

---

## 📂 File Structure

```text
theme_switching_card/
├── index.html       # Semantic HTML layout and card structure
├── style.css        # CSS variables, theme palettes, and animations
├── script.js        # Logic for switching themes, persistence & listeners
└── README.md        # Project guide and explanation
```

---

## 💡 How It Works

1. **Defining Tokens in `style.css`**:
   ```css
   :root {
     --bg-page: #f1f5f9;
     --card-bg: #ffffff;
     --text-primary: #0f172a;
     /* ... other tokens */
   }

   [data-theme="dark"] {
     --bg-page: #0a0d14;
     --card-bg: #131926;
     --text-primary: #f8fafc;
     /* ... overrides */
   }
   ```

2. **Toggling via `script.js`**:
   ```javascript
   document.documentElement.setAttribute('data-theme', 'dark');
   localStorage.setItem('user-theme-preference', 'dark');
   ```

---

## 🖥️ How to Run

Simply open `index.html` in any modern web browser (e.g. Chrome, Firefox, Safari, Edge) by double-clicking it or using Live Server.
