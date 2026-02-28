# ⚡ CodePen.live — Online Code Editor

> A browser-based IDE for HTML, CSS, and JavaScript with instant live preview — built with React.js.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat&logo=vercel&logoColor=white)

---

## ✨ Features

- ⚡ **Live Preview** — See changes instantly in an iframe sandbox (auto-run with 600ms debounce)
- 🎨 **3 Language Tabs** — Separate editors for HTML, CSS, and JavaScript
- 📋 **5 Built-in Templates** — Blank, Portfolio, Live Clock, Todo App, Calculator
- 🖥️ **3 Layout Views** — Split (editor + preview), Editor only, Preview only
- 🔢 **Line Numbers** — Real-time line count with syntax-aware editor
- ⌨️ **Smart Editing** — Tab indentation, auto-indent on Enter, bracket detection
- 🔗 **Share via URL** — Entire code encoded into a shareable link (Base64)
- 📥 **Download HTML** — Export complete `index.html` file instantly
- 🐛 **JS Error Display** — Runtime errors shown as red banner inside preview
- 🔤 **Font Size Control** — Increase/decrease editor font size on the fly
- 🔄 **Auto-run Toggle** — Switch between auto and manual run modes

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v16 or higher
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/Bulletguitarist/code-editor.git

# 2. Go into the project folder
cd code-editor

# 3. Install dependencies
npm install

# 4. Start the development server
npm start
```

App opens at **code-editor-b2dh.vercel.app** 🎉

---

## 🏗️ Project Structure

```
code-editor/
├── public/
│   └── index.html
├── src/
│   └── App.js          ← Entire app (editor + preview + templates)
├── package.json
└── README.md
```

### Components

| Component | Description |
|-----------|-------------|
| `App` | Root — layout, state, template loading, share/download logic |
| `CodePane` | Textarea-based code editor with line numbers and smart key handling |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React.js** (CRA) | UI framework and state management |
| **iframe** (sandbox) | Isolated live preview renderer |
| **Base64 + URL params** | Code sharing via URL encoding |
| **JetBrains Mono** | Monospace font for the editor |
| **Vercel** | CI/CD deployment |

> **No Monaco Editor dependency** — uses a custom lightweight textarea editor for zero install overhead and full browser compatibility.

---

## 📋 Built-in Templates

| Template | Description |
|----------|-------------|
| 📄 **Blank** | Clean starter with basic HTML structure |
| 💼 **Portfolio** | Dark-themed developer portfolio with project cards |
| 🕐 **Live Clock** | Animated digital clock with CSS glow effects |
| ✅ **Todo App** | Functional task manager with add/complete/delete |
| 🔢 **Calculator** | iOS-style calculator with full arithmetic logic |

---

## 🔗 Code Sharing

Click the **Share** button to generate a shareable URL:

```
https://yourapp.vercel.app/?code=eyJodG1sIjoiPGgxPkhlbGxvPC9oMT4i...
```

- The entire HTML + CSS + JS is Base64 encoded into the URL
- Anyone opening the link gets the exact same code loaded automatically
- No backend or database required!

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Insert 2-space indentation |
| `Enter` | Auto-indent to match current line |
| `Enter` after `{`, `(`, `[` | Extra indent level |
| `+` / `-` buttons | Increase / decrease font size |

---

## 🚢 Deployment

Auto-deployed on **Vercel** via GitHub push:

```bash
git add .
git commit -m "your message"
git push
# Vercel auto-redeploys
```

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## 🔮 Future Plans

- [ ] Monaco Editor integration for full syntax highlighting
- [ ] More language support (TypeScript, SCSS, JSX)
- [ ] Cloud snippet saving (Firebase / Supabase)
- [ ] Multiple files / tab support
- [ ] Console output panel (capture console.log)
- [ ] Vim / Emacs keybinding modes
- [ ] Collaborative editing (WebSockets)
- [ ] Custom themes (Dracula, Solarized, Nord)


