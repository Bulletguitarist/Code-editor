import { useState, useEffect, useRef, useCallback } from "react";

// ── TEMPLATES ────────────────────────────────────────────────────────────────
const TEMPLATES = {
  blank: {
    label: "Blank",
    icon: "📄",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Page</title>
</head>
<body>
  <h1>Hello World!</h1>
</body>
</html>`,
    css: `body {
  font-family: sans-serif;
  padding: 2rem;
  background: #fff;
  color: #333;
}`,
    js: `console.log("Hello from JS!");`,
  },
  portfolio: {
    label: "Portfolio",
    icon: "💼",
    html: `<div class="hero">
  <div class="avatar">👨‍💻</div>
  <h1>John Developer</h1>
  <p class="tagline">Full Stack Engineer · Open Source Enthusiast</p>
  <div class="badges">
    <span class="badge">React</span>
    <span class="badge">Node.js</span>
    <span class="badge">Python</span>
    <span class="badge">TypeScript</span>
  </div>
  <div class="links">
    <a href="#" class="btn">GitHub</a>
    <a href="#" class="btn btn-outline">Resume</a>
  </div>
</div>
<section class="projects">
  <h2>Projects</h2>
  <div class="grid">
    <div class="card">
      <h3>🔭 GitHub Explorer</h3>
      <p>Interactive dashboard to explore trending repos</p>
      <span class="tag">React</span>
    </div>
    <div class="card">
      <h3>⚡ Code Editor</h3>
      <p>Browser-based IDE with live preview</p>
      <span class="tag">Monaco</span>
    </div>
    <div class="card">
      <h3>🤖 AI Chat</h3>
      <p>ChatGPT-style interface with streaming</p>
      <span class="tag">OpenAI</span>
    </div>
  </div>
</section>`,
    css: `* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: 'Segoe UI', sans-serif;
  background: #0f0f1a;
  color: #e2e8f0;
  min-height: 100vh;
}
.hero {
  text-align: center;
  padding: 4rem 2rem 3rem;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border-bottom: 1px solid #2d3748;
}
.avatar { font-size: 5rem; margin-bottom: 1rem; }
h1 { font-size: 2.5rem; color: #63b3ed; margin-bottom: 0.5rem; }
.tagline { color: #a0aec0; margin-bottom: 1.5rem; font-size: 1.1rem; }
.badges { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2rem; }
.badge { padding: 0.3rem 0.8rem; background: rgba(99,179,237,0.15); border: 1px solid #63b3ed44; border-radius: 20px; font-size: 0.85rem; color: #63b3ed; }
.links { display: flex; gap: 1rem; justify-content: center; }
.btn { padding: 0.6rem 1.5rem; background: #63b3ed; color: #0f0f1a; border-radius: 8px; text-decoration: none; font-weight: 600; transition: 0.2s; }
.btn:hover { background: #90cdf4; }
.btn-outline { background: transparent; border: 2px solid #63b3ed; color: #63b3ed; }
.btn-outline:hover { background: rgba(99,179,237,0.1); }
.projects { padding: 3rem 2rem; max-width: 900px; margin: 0 auto; }
h2 { color: #63b3ed; margin-bottom: 1.5rem; font-size: 1.5rem; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px,1fr)); gap: 1rem; }
.card { background: #1a202c; border: 1px solid #2d3748; border-radius: 12px; padding: 1.5rem; transition: 0.2s; }
.card:hover { border-color: #63b3ed44; transform: translateY(-2px); }
.card h3 { margin-bottom: 0.5rem; font-size: 1.1rem; }
.card p { color: #718096; font-size: 0.9rem; margin-bottom: 1rem; }
.tag { font-size: 0.75rem; padding: 0.2rem 0.6rem; background: rgba(99,179,237,0.1); color: #63b3ed; border-radius: 4px; }`,
    js: `// Add interactivity
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 8px 30px rgba(99,179,237,0.15)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = 'none';
  });
});
console.log('Portfolio loaded! 🚀');`,
  },
  clock: {
    label: "Live Clock",
    icon: "🕐",
    html: `<div class="clock-wrapper">
  <div class="clock">
    <div class="time" id="time">00:00:00</div>
    <div class="date" id="date">Loading...</div>
    <div class="ampm" id="ampm">AM</div>
  </div>
  <div class="dots">
    <span></span><span></span><span></span>
  </div>
</div>`,
    css: `* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  display: flex; align-items: center; justify-content: center;
  min-height: 100vh;
  background: radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0f 100%);
  font-family: 'Courier New', monospace;
}
.clock-wrapper { text-align: center; }
.clock {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 24px;
  padding: 3rem 4rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1);
}
.time {
  font-size: 5rem;
  font-weight: 700;
  color: #00e5ff;
  letter-spacing: 4px;
  text-shadow: 0 0 30px rgba(0,229,255,0.5);
  margin-bottom: 0.5rem;
}
.ampm { font-size: 1.5rem; color: rgba(0,229,255,0.5); letter-spacing: 4px; margin-top: 0.5rem; }
.date { font-size: 1rem; color: rgba(255,255,255,0.3); letter-spacing: 3px; text-transform: uppercase; }
.dots { display: flex; gap: 8px; justify-content: center; margin-top: 2rem; }
.dots span { width: 8px; height: 8px; border-radius: 50%; background: rgba(0,229,255,0.3); animation: pulse 2s ease-in-out infinite; }
.dots span:nth-child(2) { animation-delay: 0.3s; }
.dots span:nth-child(3) { animation-delay: 0.6s; }
@keyframes pulse { 0%,100%{opacity:0.3;transform:scale(1)} 50%{opacity:1;transform:scale(1.3);background:rgba(0,229,255,0.8)} }`,
    js: `function updateClock() {
  const now = new Date();
  let h = now.getHours();
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  document.getElementById('time').textContent = \`\${String(h).padStart(2,'0')}:\${m}:\${s}\`;
  document.getElementById('ampm').textContent = ampm;
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  document.getElementById('date').textContent =
    \`\${days[now.getDay()]}, \${months[now.getMonth()]} \${now.getDate()}, \${now.getFullYear()}\`;
}
updateClock();
setInterval(updateClock, 1000);`,
  },
  todo: {
    label: "Todo App",
    icon: "✅",
    html: `<div class="app">
  <h1>✅ My Tasks</h1>
  <div class="input-row">
    <input type="text" id="taskInput" placeholder="Add a new task..." />
    <button onclick="addTask()">Add</button>
  </div>
  <ul id="taskList"></ul>
  <div class="stats" id="stats"></div>
</div>`,
    css: `* { margin:0;padding:0;box-sizing:border-box; }
body { font-family:'Segoe UI',sans-serif; background:#f0f4f8; min-height:100vh; display:flex; align-items:center; justify-content:center; }
.app { background:#fff; border-radius:16px; padding:2rem; width:100%; max-width:480px; box-shadow:0 10px 40px rgba(0,0,0,0.1); }
h1 { color:#2d3748; margin-bottom:1.5rem; font-size:1.5rem; }
.input-row { display:flex; gap:0.5rem; margin-bottom:1.5rem; }
input { flex:1; padding:0.7rem 1rem; border:2px solid #e2e8f0; border-radius:10px; font-size:1rem; outline:none; transition:0.2s; }
input:focus { border-color:#667eea; }
button { padding:0.7rem 1.2rem; background:linear-gradient(135deg,#667eea,#764ba2); color:#fff; border:none; border-radius:10px; cursor:pointer; font-weight:600; transition:0.2s; }
button:hover { opacity:0.9; transform:translateY(-1px); }
#taskList { list-style:none; display:flex; flex-direction:column; gap:0.5rem; }
.task { display:flex; align-items:center; gap:0.8rem; padding:0.8rem 1rem; background:#f7fafc; border-radius:10px; border:2px solid transparent; transition:0.2s; }
.task:hover { border-color:#e2e8f0; }
.task.done { opacity:0.5; }
.task.done .task-text { text-decoration:line-through; }
.task input[type=checkbox] { width:18px; height:18px; cursor:pointer; accent-color:#667eea; }
.task-text { flex:1; color:#2d3748; }
.del-btn { background:none; border:none; color:#e53e3e; cursor:pointer; font-size:1.1rem; padding:0; transition:0.2s; }
.del-btn:hover { transform:scale(1.2); }
.stats { margin-top:1rem; text-align:center; font-size:0.85rem; color:#a0aec0; }`,
    js: `const tasks = [];
function render() {
  const list = document.getElementById('taskList');
  list.innerHTML = tasks.map((t,i) => \`
    <li class="task \${t.done?'done':''}">
      <input type="checkbox" \${t.done?'checked':''} onchange="toggle(\${i})">
      <span class="task-text">\${t.text}</span>
      <button class="del-btn" onclick="remove(\${i})">✕</button>
    </li>\`).join('');
  const done = tasks.filter(t=>t.done).length;
  document.getElementById('stats').textContent =
    tasks.length ? \`\${done} of \${tasks.length} completed\` : 'No tasks yet — add one above!';
}
function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ text, done: false });
  input.value = '';
  render();
}
function toggle(i) { tasks[i].done = !tasks[i].done; render(); }
function remove(i) { tasks.splice(i,1); render(); }
document.getElementById('taskInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') addTask();
});
render();`,
  },
  calculator: {
    label: "Calculator",
    icon: "🔢",
    html: `<div class="calc">
  <div class="display">
    <div class="expr" id="expr"></div>
    <div class="result" id="result">0</div>
  </div>
  <div class="buttons">
    <button class="btn wide accent2" onclick="clearAll()">AC</button>
    <button class="btn accent2" onclick="toggleSign()">+/-</button>
    <button class="btn accent2" onclick="percent()">%</button>
    <button class="btn accent" onclick="op('/')">÷</button>
    <button class="btn" onclick="num(7)">7</button>
    <button class="btn" onclick="num(8)">8</button>
    <button class="btn" onclick="num(9)">9</button>
    <button class="btn accent" onclick="op('*')">×</button>
    <button class="btn" onclick="num(4)">4</button>
    <button class="btn" onclick="num(5)">5</button>
    <button class="btn" onclick="num(6)">6</button>
    <button class="btn accent" onclick="op('-')">−</button>
    <button class="btn" onclick="num(1)">1</button>
    <button class="btn" onclick="num(2)">2</button>
    <button class="btn" onclick="num(3)">3</button>
    <button class="btn accent" onclick="op('+')">+</button>
    <button class="btn wide" onclick="num(0)">0</button>
    <button class="btn" onclick="dot()">.</button>
    <button class="btn accent" onclick="calc()">=</button>
  </div>
</div>`,
    css: `* {margin:0;padding:0;box-sizing:border-box;}
body {display:flex;align-items:center;justify-content:center;min-height:100vh;background:#1c1c1e;font-family:-apple-system,sans-serif;}
.calc {background:#1c1c1e;border-radius:24px;padding:1.5rem;width:320px;box-shadow:0 30px 60px rgba(0,0,0,0.7);}
.display {text-align:right;padding:0.5rem 0.5rem 1.2rem;margin-bottom:0.5rem;}
.expr {font-size:1rem;color:#888;min-height:1.5rem;margin-bottom:0.3rem;}
.result {font-size:3.5rem;color:#fff;font-weight:300;line-height:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.buttons {display:grid;grid-template-columns:repeat(4,1fr);gap:12px;}
.btn {padding:0;height:72px;border-radius:50%;border:none;font-size:1.4rem;font-weight:400;cursor:pointer;transition:all 0.1s;background:#333;color:#fff;}
.btn:hover {filter:brightness(1.2);}
.btn:active {transform:scale(0.93);}
.btn.wide {grid-column:span 2;border-radius:36px;padding:0 1.5rem;text-align:left;}
.btn.accent {background:#ff9f0a;color:#fff;}
.btn.accent2 {background:#636366;color:#fff;}`,
    js: `let cur = '0', prev = '', operator = '', justCalc = false;
const res = () => document.getElementById('result');
const expr = () => document.getElementById('expr');
function num(n) {
  if (justCalc) { cur = String(n); justCalc = false; }
  else cur = cur === '0' ? String(n) : cur + n;
  res().textContent = cur;
}
function dot() {
  if (!cur.includes('.')) cur += '.';
  res().textContent = cur;
}
function op(o) {
  prev = cur; operator = o; justCalc = false;
  expr().textContent = cur + ' ' + o;
  cur = '0';
}
function calc() {
  if (!operator || !prev) return;
  const a = parseFloat(prev), b = parseFloat(cur);
  let r;
  if (operator==='+') r=a+b; else if(operator==='-') r=a-b;
  else if(operator==='*') r=a*b; else if(operator==='/') r=b!==0?a/b:'Error';
  expr().textContent = prev + ' ' + operator + ' ' + cur + ' =';
  cur = String(parseFloat(r.toFixed(10)));
  res().textContent = cur;
  operator = ''; prev = ''; justCalc = true;
}
function clearAll() { cur='0';prev='';operator='';justCalc=false;res().textContent='0';expr().textContent=''; }
function toggleSign() { cur=String(-parseFloat(cur));res().textContent=cur; }
function percent() { cur=String(parseFloat(cur)/100);res().textContent=cur; }`,
  },
};

// ── THEME ─────────────────────────────────────────────────────────────────────
const T = {
  bg: "#0e1117",
  surface: "#161b22",
  surface2: "#1c2333",
  border: "#30363d",
  text: "#e6edf3",
  muted: "#8b949e",
  faint: "#484f58",
  blue: "#58a6ff",
  green: "#3fb950",
  orange: "#e3b341",
  red: "#f85149",
  purple: "#bc8cff",
};

// ── SIMPLE CODE EDITOR (textarea-based, no Monaco dependency) ─────────────────
function CodePane({ language, value, onChange, theme }) {
  const taRef = useRef(null);
  const lineRef = useRef(null);

  const lines = value.split("\n");

  const handleKey = (e) => {
    const ta = e.target;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const val = ta.value;

    if (e.key === "Tab") {
      e.preventDefault();
      const newVal = val.substring(0, start) + "  " + val.substring(end);
      onChange(newVal);
      setTimeout(() => { ta.selectionStart = ta.selectionEnd = start + 2; }, 0);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const lineStart = val.lastIndexOf("\n", start - 1) + 1;
      const lineContent = val.substring(lineStart, start);
      const indent = lineContent.match(/^(\s*)/)[1];
      const extra = /[{([']$/.test(lineContent.trim()) ? "  " : "";
      const insert = "\n" + indent + extra;
      const newVal = val.substring(0, start) + insert + val.substring(end);
      onChange(newVal);
      setTimeout(() => { ta.selectionStart = ta.selectionEnd = start + insert.length; }, 0);
    }
  };

  const syncScroll = () => {
    if (lineRef.current && taRef.current) {
      lineRef.current.scrollTop = taRef.current.scrollTop;
    }
  };

  const langColors = { html: T.orange, css: T.blue, js: T.green };
  const langColor = langColors[language] || T.text;

  return (
    <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative" }}>
      {/* Line numbers */}
      <div ref={lineRef} style={{
        width: 44, background: T.bg, borderRight: `1px solid ${T.border}`,
        overflow: "hidden", userSelect: "none", flexShrink: 0,
        paddingTop: 14,
      }}>
        {lines.map((_, i) => (
          <div key={i} style={{
            height: 21, lineHeight: "21px", textAlign: "right",
            paddingRight: 10, fontSize: 12,
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
            color: T.faint,
          }}>{i + 1}</div>
        ))}
      </div>
      {/* Textarea */}
      <textarea
        ref={taRef}
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKey}
        onScroll={syncScroll}
        spellCheck={false}
        style={{
          flex: 1, background: T.bg, color: T.text, border: "none", outline: "none",
          resize: "none", padding: "14px 16px",
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
          fontSize: 13, lineHeight: "21px",
          caretColor: langColor,
          overflowX: "auto", overflowY: "auto",
          whiteSpace: "pre", tabSize: 2,
        }}
      />
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [html, setHtml] = useState(TEMPLATES.clock.html);
  const [css, setCss] = useState(TEMPLATES.clock.css);
  const [js, setJs] = useState(TEMPLATES.clock.js);
  const [activeTab, setActiveTab] = useState("html");
  const [layout, setLayout] = useState("split"); // split | editor | preview
  const [autoRun, setAutoRun] = useState(true);
  const [srcDoc, setSrcDoc] = useState("");
  const [fontSize, setFontSize] = useState(13);
  const [copied, setCopied] = useState(false);
  const [notif, setNotif] = useState("");
  const [showTemplates, setShowTemplates] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState("clock");
  const timerRef = useRef(null);
  const iframeRef = useRef(null);

  const buildDoc = useCallback(() => {
    return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  *, *::before, *::after { box-sizing: border-box; }
  ${css}
</style>
</head>
<body>
${html}
<script>
try {
  ${js}
} catch(e) {
  document.body.insertAdjacentHTML('beforeend',
    '<div style="position:fixed;bottom:0;left:0;right:0;background:#f85149;color:#fff;padding:8px 14px;font:13px monospace;z-index:9999">❌ JS Error: '+e.message+'</div>'
  );
}
${'<'}/script>
</body>
</html>`;
  }, [html, css, js]);

  useEffect(() => {
    if (!autoRun) return;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setSrcDoc(buildDoc()), 600);
    return () => clearTimeout(timerRef.current);
  }, [html, css, js, autoRun, buildDoc]);

  useEffect(() => { setSrcDoc(buildDoc()); }, [buildDoc]); // initial

  const notify = (msg) => { setNotif(msg); setTimeout(() => setNotif(""), 2200); };

  const runNow = () => { setSrcDoc(buildDoc()); notify("▶ Preview updated!"); };

  const loadTemplate = (key) => {
    const t = TEMPLATES[key];
    setHtml(t.html); setCss(t.css); setJs(t.js);
    setActiveTemplate(key); setShowTemplates(false);
    notify(`📋 Template "${t.label}" loaded!`);
  };

  const shareCode = () => {
    const data = { html, css, js };
    const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
    const url = window.location.href.split("?")[0] + "?code=" + encoded;
    navigator.clipboard.writeText(url).then(() => { setCopied(true); notify("🔗 Share link copied!"); setTimeout(() => setCopied(false), 2000); });
  };

  const downloadHTML = () => {
    const blob = new Blob([buildDoc()], { type: "text/html" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "index.html"; a.click();
    notify("📥 Downloaded index.html!");
  };


  // Load from URL on mount
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      if (code) {
        const data = JSON.parse(decodeURIComponent(atob(code)));
        if (data.html) setHtml(data.html);
        if (data.css) setCss(data.css);
        if (data.js) setJs(data.js);
        notify("📂 Shared code loaded!");
      }
    } catch {}
  }, []);

  const TAB_COLORS = { html: T.orange, css: T.blue, js: T.green };
  const TAB_LABELS = { html: "HTML", css: "CSS", js: "JavaScript" };
  const TAB_ICONS = { html: "🔷", css: "🎨", js: "⚡" };

  const editors = { html: [html, setHtml], css: [css, setCss], js: [js, setJs] };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: T.bg, color: T.text, fontFamily: "'Segoe UI', system-ui, sans-serif", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: ${T.bg}; }
        ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${T.faint}; }
        textarea { caret-color: white; }
      `}</style>

      {/* ── TOPBAR ── */}
      <header style={{ height: 48, background: T.surface, borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 0, padding: "0 12px", flexShrink: 0, zIndex: 100 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginRight: 16 }}>
          <span style={{ fontSize: 20 }}>⚡</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, color: T.text }}>CodePen<span style={{ color: T.blue }}>.live</span></span>
        </div>

        {/* Templates button */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowTemplates(v => !v)}
            style={{ background: showTemplates ? T.surface2 : "none", border: `1px solid ${showTemplates ? T.border : "transparent"}`, borderRadius: 6, padding: "4px 12px", color: T.muted, cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", gap: 5 }}
          >
            📋 Templates <span style={{ fontSize: 9, opacity: 0.6 }}>▼</span>
          </button>
          {showTemplates && (
            <div style={{ position: "absolute", top: 34, left: 0, background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, padding: 6, zIndex: 999, minWidth: 180, boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
              {Object.entries(TEMPLATES).map(([key, t]) => (
                <button key={key} onClick={() => loadTemplate(key)} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", background: activeTemplate === key ? T.surface2 : "none", border: "none", borderRadius: 6, padding: "8px 12px", color: activeTemplate === key ? T.text : T.muted, cursor: "pointer", fontSize: 13, textAlign: "left", transition: "0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = T.surface2}
                  onMouseLeave={e => e.currentTarget.style.background = activeTemplate === key ? T.surface2 : "none"}
                >
                  <span>{t.icon}</span> {t.label}
                  {activeTemplate === key && <span style={{ marginLeft: "auto", color: T.green, fontSize: 11 }}>✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 20, background: T.border, margin: "0 8px" }} />

        {/* Layout buttons */}
        <div style={{ display: "flex", background: T.bg, border: `1px solid ${T.border}`, borderRadius: 6, overflow: "hidden" }}>
          {[["split", "⬛⬜"], ["editor", "⬛"], ["preview", "⬜"]].map(([v, icon]) => (
            <button key={v} onClick={() => setLayout(v)} title={v} style={{ background: layout === v ? T.surface2 : "none", border: "none", padding: "4px 10px", color: layout === v ? T.text : T.faint, cursor: "pointer", fontSize: 13, borderRight: v !== "preview" ? `1px solid ${T.border}` : "none", transition: "0.15s" }}>
              {icon}
            </button>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        {/* Auto-run toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginRight: 8 }}>
          <span style={{ fontSize: 11, color: T.muted }}>Auto-run</span>
          <div onClick={() => setAutoRun(v => !v)} style={{ width: 36, height: 20, borderRadius: 10, background: autoRun ? T.green : T.faint, cursor: "pointer", position: "relative", transition: "background 0.2s" }}>
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: autoRun ? 19 : 3, transition: "left 0.2s" }} />
          </div>
        </div>

        {/* Action buttons */}
        <button onClick={runNow} style={{ background: T.green, border: "none", borderRadius: 6, padding: "5px 14px", color: "#0d1117", cursor: "pointer", fontSize: 12, fontWeight: 700, marginRight: 6, display: "flex", alignItems: "center", gap: 5 }}>
          ▶ Run
        </button>
        <button onClick={shareCode} style={{ background: "none", border: `1px solid ${T.border}`, borderRadius: 6, padding: "5px 12px", color: copied ? T.green : T.muted, cursor: "pointer", fontSize: 12, marginRight: 6, transition: "color 0.2s" }}>
          {copied ? "✓ Copied!" : "🔗 Share"}
        </button>
        <button onClick={downloadHTML} style={{ background: "none", border: `1px solid ${T.border}`, borderRadius: 6, padding: "5px 12px", color: T.muted, cursor: "pointer", fontSize: 12 }}>
          📥
        </button>
      </header>

      {/* ── MAIN AREA ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* ── EDITOR PANEL ── */}
        {layout !== "preview" && (
          <div style={{ display: "flex", flexDirection: "column", flex: layout === "editor" ? 1 : "0 0 50%", borderRight: layout === "split" ? `1px solid ${T.border}` : "none", overflow: "hidden" }}>

            {/* Tab bar */}
            <div style={{ display: "flex", background: T.surface, borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
              {["html", "css", "js"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  background: activeTab === tab ? T.bg : "none",
                  border: "none",
                  borderBottom: activeTab === tab ? `2px solid ${TAB_COLORS[tab]}` : "2px solid transparent",
                  padding: "10px 18px",
                  color: activeTab === tab ? T.text : T.muted,
                  cursor: "pointer", fontSize: 12, fontWeight: activeTab === tab ? 600 : 400,
                  display: "flex", alignItems: "center", gap: 6, transition: "0.15s",
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  <span style={{ color: TAB_COLORS[tab] }}>{TAB_ICONS[tab]}</span>
                  {TAB_LABELS[tab]}
                  <span style={{ fontSize: 10, color: T.faint, background: T.surface2, borderRadius: 3, padding: "1px 4px" }}>
                    {editors[tab][0].split("\n").length}L
                  </span>
                </button>
              ))}
              <div style={{ flex: 1 }} />
              {/* Font size */}
              <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "0 12px" }}>
                <button onClick={() => setFontSize(f => Math.max(10, f - 1))} style={{ background: "none", border: "none", color: T.faint, cursor: "pointer", fontSize: 14, lineHeight: 1 }}>−</button>
                <span style={{ fontSize: 11, color: T.faint, fontFamily: "monospace", minWidth: 24, textAlign: "center" }}>{fontSize}</span>
                <button onClick={() => setFontSize(f => Math.min(20, f + 1))} style={{ background: "none", border: "none", color: T.faint, cursor: "pointer", fontSize: 14, lineHeight: 1 }}>+</button>
              </div>
            </div>

            {/* Code editor */}
            <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", fontSize }}>
              {["html", "css", "js"].map(tab => (
                <div key={tab} style={{ display: activeTab === tab ? "flex" : "none", flex: 1, overflow: "hidden" }}>
                  <CodePane
                    language={tab}
                    value={editors[tab][0]}
                    onChange={editors[tab][1]}
                  />
                </div>
              ))}
            </div>

            {/* Status bar */}
            <div style={{ height: 24, background: T.surface, borderTop: `1px solid ${T.border}`, display: "flex", alignItems: "center", padding: "0 12px", gap: 16, flexShrink: 0 }}>
              <span style={{ fontSize: 10, color: T.faint, fontFamily: "monospace" }}>
                <span style={{ color: TAB_COLORS[activeTab] }}>●</span> {TAB_LABELS[activeTab]}
              </span>
              <span style={{ fontSize: 10, color: T.faint, fontFamily: "monospace" }}>
                {editors[activeTab][0].split("\n").length} lines
              </span>
              <span style={{ fontSize: 10, color: T.faint, fontFamily: "monospace" }}>
                {editors[activeTab][0].length} chars
              </span>
              <div style={{ flex: 1 }} />
              <span style={{ fontSize: 10, color: autoRun ? T.green : T.faint }}>
                {autoRun ? "⚡ Auto-run ON" : "⚡ Auto-run OFF"}
              </span>
            </div>
          </div>
        )}

        {/* ── PREVIEW PANEL ── */}
        {layout !== "editor" && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* Preview header */}
            <div style={{ height: 40, background: T.surface, borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", padding: "0 12px", gap: 8, flexShrink: 0 }}>
              {/* Browser dots */}
              <div style={{ display: "flex", gap: 5 }}>
                {["#f85149", "#e3b341", "#3fb950"].map(c => (
                  <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                ))}
              </div>
              {/* Fake URL bar */}
              <div style={{ flex: 1, background: T.bg, border: `1px solid ${T.border}`, borderRadius: 6, padding: "3px 10px", fontSize: 11, color: T.faint, fontFamily: "monospace", maxWidth: 340 }}>
                🔒 preview.local
              </div>
              <div style={{ flex: 1 }} />
              <button onClick={runNow} style={{ background: "none", border: "none", color: T.muted, cursor: "pointer", fontSize: 14, padding: "2px 6px" }} title="Refresh">⟳</button>
            </div>

            {/* iFrame */}
            <iframe
              ref={iframeRef}
              srcDoc={srcDoc}
              sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
              style={{ flex: 1, border: "none", background: "#fff", width: "100%", height: "100%" }}
              title="preview"
            />
          </div>
        )}
      </div>

      {/* ── NOTIFICATION ── */}
      {notif && (
        <div style={{ position: "fixed", bottom: 20, right: 20, background: T.surface, border: `1px solid ${T.green}`, borderRadius: 8, padding: "10px 16px", fontSize: 13, color: T.text, zIndex: 9999, boxShadow: "0 8px 24px rgba(0,0,0,0.5)", display: "flex", alignItems: "center", gap: 8, animation: "slideIn 0.2s ease" }}>
          <span style={{ color: T.green }}>●</span> {notif}
        </div>
      )}

      {/* Click outside to close templates dropdown */}
      {showTemplates && <div style={{ position: "fixed", inset: 0, zIndex: 99 }} onClick={() => setShowTemplates(false)} />}
    </div>
  );
}