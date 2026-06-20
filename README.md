<div align="center">

# 🛡️ santilpz28.github.io/chainguard-pages

**Santiago López · Chain-Cortex — Web3 Security & Smart Contract Auditing**

[![Live](https://img.shields.io/badge/Live-santilpz28.github.io%2Fchainguard--pages-blue?style=for-the-badge&logo=google-chrome&logoColor=white)](https://santilpz28.github.io/chainguard-pages/)
[![Methodology](https://img.shields.io/badge/Methodology-Pashov%20%2B%20chain--cortex--audit-22d3ee?style=for-the-badge)](https://github.com/santilpz28)
[![Available](https://img.shields.io/badge/Status-Available%20Q3%202026-22c55e?style=for-the-badge)](mailto:santi.lpz28@gmail.com)

**Cybersecurity · Web3 Security · Smart Contract Auditing · Pashov Methodology**

</div>

---

## 🎯 What this is

The marketing layer for **Chain-Cortex** — a Web3 security studio by **Santiago López Castaño**. Single-page portfolio for independent smart-contract auditing and security consulting. Built as a static site, deployed via GitHub Pages.

**Recent work**: independent two-axis security audit of [The Graph Protocol](writeups/graph-protocol-audit.html) — score **8.2 / 10**, 0 critical, 10 real findings across 1,606 raw Slither reports.

---

## ✨ Design (v3 — 2026-06-20)

- **Dark-first** with deep navy + cyan / violet gradients
- **Bento-grid layout** with bouncy hover states
- **Hero terminal** that prints the latest audit stats in real time
- **Inline SVG favicon** (no external assets)
- **Glassmorphism cards** with subtle borders and shadows
- **Mobile-first** responsive, hamburger nav under 900 px
- **Sticky header** with active-section indicator
- **Scroll-reveal animations** via IntersectionObserver
- **Full keyboard accessibility** (skip link, focus states, Escape to close popovers)
- **Theme toggle** (dark / light) persisted in localStorage
- **Print-friendly** and **reduced-motion** aware

---

## 📁 Structure

```
.
├── index.html              # Homepage — 665 lines, full portfolio
├── style.css               # Design system — 1,400+ lines, dark + light themes
├── app.js                  # Theme, mobile nav, scroll reveal, timeline logic
├── cv_photo.png            # Profile photo
├── writeups/
│   └── graph-protocol-audit.html   # Sanitized case study
└── README.md               # This file
```

**No build step.** Pure HTML + CSS + vanilla JS. Tailwind CDN-style approach but with hand-written CSS for full control over the dark theme.

---

## 🚀 Local dev

```bash
git clone https://github.com/santilpz28/chainguard-pages.git
cd chainguard-pages
python3 -m http.server 8000
# open http://localhost:8000
```

Or just `open index.html` — works offline (only external dep is Google Fonts).

## 📦 Deploy

```bash
git add -A && git commit -m "update"
git push origin main
# GitHub Pages auto-deploys in ~30-60s
```

Settings → Pages → Source: `main` branch, root folder.

---

## 🎨 Design system

### Tokens (CSS variables)

```css
--bg: #06080c;          /* Deep navy */
--accent: #22d3ee;      /* Cyan */
--violet: #a78bfa;      /* Secondary */
--green: #22c55e;       /* Success */
--amber: #fbbf24;       /* Warning */
--red: #ef4444;         /* Error */
--pink: #f472b6;        /* Accent */
```

### Typography

- **Inter** (300-900) — body, UI, hero
- **JetBrains Mono** (400-600) — code, numbers, terminal, chips

### Components

- `.bento` / `.bento-item` — 6-col asymmetric grid
- `.writeup-card` — case study with cover + score
- `.tier` — pricing tier with optional `.featured`
- `.terminal` — fake CLI with red/amber/green dots
- `.stat-card` — KPI display with gradient text
- `.chip` / `.chip-cyan` / `.chip-violet` — tag pills
- `.glass` — frosted surface
- `.card` — generic container

---

## 🛠️ Stack

- **HTML5** semantic
- **CSS3** — design tokens, custom properties, Grid, Flexbox
- **Vanilla JS** — no frameworks, no bundler
- **IntersectionObserver** for scroll effects
- **localStorage** for theme persistence
- **Google Fonts** (Inter, JetBrains Mono)
- **No external JS deps** — works offline if fonts are cached

---

## 📝 Published writeups

- **[The Graph Protocol — two-axis security audit (8.2/10)](writeups/graph-protocol-audit.html)** (2026-06-20) — Independent audit of a $1B+ TVL decentralized indexing protocol. Source + mainnet bytecode. 0 critical, 10 real findings, 99.4% Slither FP reduction. Methodology: Pashov + chain-cortex-audit skill.

---

## 🛡️ Security note

The hero terminal content references real audit metrics but does not expose any sensitive details. The full technical report is gated behind direct request to the protocol team under responsible-disclosure norms — see the case study page for details.

---

## 📜 License

MIT © 2026 Santiago López Castaño.

## 📫 Contact

- Email: santi.lpz28@gmail.com
- LinkedIn: [santiagolopez-cyber](https://www.linkedin.com/in/santiagolopez-cyber/)
- GitHub: [@santilpz28](https://github.com/santilpz28)
