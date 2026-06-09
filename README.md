<div align="center">

# 🌐 santilpz28.github.io — Personal Portfolio

**The marketing layer for the ChainGuard Cortex platform.**

[![Live](https://img.shields.io/badge/Live-santilpz28.github.io%2Fchainguard--pages-blue?style=for-the-badge&logo=google-chrome&logoColor=white)](https://santilpz28.github.io/chainguard-pages/)
[![Built with](https://img.shields.io/badge/Built%20with-HTML%2FTailwind-orange?style=for-the-badge)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**Cybersecurity · Web3 Security · Smart Contract Auditing · Linux**

</div>

---

## 🎯 What this is

A single-page portfolio for **Santiago López Castaño**, a cybersecurity analyst and Web3 security researcher. It's the **front door** for recruiters and clients — it links to:

- **ChainGuard.ai** (the production platform)
- **GitHub** repositories
- **LinkedIn** profile
- **CVE-style project write-ups**

The page is **statically generated** (no build step) — pure HTML + Tailwind CDN + vanilla JS. Deploys to GitHub Pages in 30 seconds.

---

## ✨ Sections

1. **Hero** — Name, role, tagline, primary CTA (chain guard demo)
2. **About** — 3-paragraph bio (Cybersecurity + Web3 + Master Blockchain)
3. **Featured Projects** — Cards for ChainGuard, Solidity Labs, OSINT, IoT
4. **Skills Matrix** — 6 categories, each with specific tools
5. **Certifications Timeline** — RHCSA, eJPT, Microsoft, eWPT in progress, OSCP target
6. **Contact** — Email, LinkedIn, GitHub, phone

---

## 🚀 Local development

```bash
git clone https://github.com/santilpz28/chainguard-pages.git
cd chainguard-pages
python3 -m http.server 8000
# Open http://localhost:8000
```

No build step. No npm. No node_modules. Just edit `index.html` and refresh.

## 📦 Deploy

```bash
git add -A && git commit -m "update portfolio"
git push origin main
# GitHub Pages auto-deploys in ~30s
```

Settings → Pages → Source: `main` branch, root folder.

---

## 🎨 Design system

- **Font:** Inter (Google Fonts)
- **Colors:** Slate 900 base, primary `#FF5722` (orange), accent cyan for security
- **Layout:** Mobile-first, max-width 1200px, generous whitespace
- **Animations:** Subtle CSS transitions on hover, no JS animations
- **Icons:** Lucide (lightweight, no font)

## 🛠️ Tech

- **HTML5** semantic
- **Tailwind CSS v3** (CDN — no build step)
- **Vanilla JS** for the wallet connect and demo interactions
- **No frameworks** — keeps the page <100KB total

## 📜 License

MIT © 2026 Santiago López Castaño.

## 📫 Contact

- Email: santi.lpz28@gmail.com
- LinkedIn: [santiagolopez-cyber](https://www.linkedin.com/in/santiagolopez-cyber/)
- GitHub: [@santilpz28](https://github.com/santilpz28)
