# 💻 Terminal Portfolio: Shashwat Nath

A high-performance, interactive terminal-style portfolio built with **React.js**. This project simulates a real-world bash terminal experience, pulling "system data" (professional background) via custom commands like `whoami` and `cat`.

## ✨ Features

* **Interactive Command Engine**: Simulates real-time typing with a "human-like" cadence (90ms interval).
* **Neofetch-style Profile**: Circular profile photo integration with a modern "Software Engineer - Data Infrastructure" layout.
* **Narrative Experience Blocks**: Storyteller-style professional history focused on enterprise-scale AWS and Data engineering.
* **Responsive Terminal Design**: Optimized for mobile and desktop with a "below the fold" scroll-into-view start.
* **Retro Aesthetics**: Includes a system boot sequence, custom prompt colors (`#d2a8ff`, `#79c0ff`), and a blinking cursor.

---

## 🛠️ Tech Stack

* **Frontend**: React.js (Hooks: `useEffect`, `useRef`, `useState`)
* **Styling**: CSS-in-JS (Scoped terminal styling)
* **Deployment**: Optimized for Render/Vercel

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v16 or higher)
* npm or yarn

### Installation
1.  Clone the repository:
    ```bash
    git clone [https://github.com/Magmastorm3007/terminal-portfolio.git](https://github.com/Magmastorm3007/terminal-portfolio.git)
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm start
    ```

---

## ⚙️ Customization

### Altering Typing Speed
In `Portfolio.js`, locate the `typingInterval` within the `useEffect` hook:
```javascript
const typingInterval = setInterval(() => {
  // ...
}, 90); // Increase for slower typing, decrease for faster.