/* =====================================================================
   CHAIN-CORTEX · app.js
   Theme toggle · mobile nav · sticky header · scroll reveal · timeline
   ===================================================================== */

(() => {
  'use strict';

  /* ─── THEME TOGGLE ───────────────────────────────────────────── */
  const THEME_KEY = 'cc-theme';
  const themeBtn = document.getElementById('themeBtn');
  const setTheme = (theme) => {
    document.documentElement.classList.toggle('theme-light', theme === 'light');
    try { localStorage.setItem(THEME_KEY, theme); } catch {}
  };
  const stored = (() => { try { return localStorage.getItem(THEME_KEY); } catch { return null; } })();
  if (stored === 'light') setTheme('light');
  themeBtn?.addEventListener('click', () => {
    const isLight = document.documentElement.classList.contains('theme-light');
    setTheme(isLight ? 'dark' : 'light');
  });

  /* ─── STICKY HEADER ──────────────────────────────────────────── */
  const header = document.getElementById('siteHeader');
  if (header) {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      header.classList.toggle('scrolled', y > 12);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── MOBILE NAV ─────────────────────────────────────────────── */
  const nav = document.getElementById('siteNav');
  const mobileToggle = document.getElementById('mobileToggle');
  mobileToggle?.addEventListener('click', () => {
    nav?.classList.toggle('open');
  });
  nav?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => nav.classList.remove('open'));
  });

  /* ─── ACTIVE NAV ON SCROLL ───────────────────────────────────── */
  const sections = ['writeups', 'services', 'methodology', 'stack', 'profile', 'timeline', 'contact']
    .map(id => document.getElementById(id)).filter(Boolean);
  const navLinks = document.querySelectorAll('[data-nav]');
  if (sections.length && navLinks.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id;
          navLinks.forEach(l => {
            l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => obs.observe(s));
  }

  /* ─── SCROLL REVEAL ──────────────────────────────────────────── */
  const reveal = document.querySelectorAll('.bento-item, .writeup-card, .tier, .stat-card, .section-header');
  reveal.forEach(el => el.classList.add('reveal'));
  if ('IntersectionObserver' in window) {
    const ro = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('in'), i * 50);
          ro.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    reveal.forEach(el => ro.observe(el));
  } else {
    reveal.forEach(el => el.classList.add('in'));
  }

  /* ─── TIMELINE ───────────────────────────────────────────────── */
  const tlGrid = document.getElementById('tl-grid');
  const dataEl = document.getElementById('timeline-data');
  if (tlGrid && dataEl) {
    let DATA = [];
    try { DATA = JSON.parse(dataEl.textContent); } catch { DATA = []; }
    const TYPES = { exp: 'Experience', cert: 'Certification', post: 'Post', milestone: 'Milestone' };
    const fmtDate = (iso) => {
      const d = new Date(iso);
      if (isNaN(d)) return iso;
      return d.toLocaleDateString('en-GB', { year: 'numeric', month: 'short' });
    };
    const allTags = [...new Set(DATA.flatMap(d => d.tags))].sort();

    const params = { q: '', tags: new Set(), types: new Set(['exp', 'cert', 'post', 'milestone']) };

    const renderChips = (bar, items, currentSet, onChange) => {
      bar.innerHTML = '';
      items.forEach(item => {
        const c = document.createElement('button');
        c.className = 'chip';
        c.type = 'button';
        c.textContent = item;
        const active = currentSet.has(item);
        c.dataset.active = String(active);
        c.addEventListener('click', () => {
          if (currentSet.has(item)) currentSet.delete(item); else currentSet.add(item);
          c.dataset.active = String(currentSet.has(item));
          onChange();
        });
        bar.appendChild(c);
      });
    };

    const renderTypeBar = () => {
      const bar = document.getElementById('typebar');
      if (!bar) return;
      bar.innerHTML = '';
      Object.entries(TYPES).forEach(([k, label]) => {
        const c = document.createElement('button');
        c.className = 'chip';
        c.type = 'button';
        c.textContent = label;
        c.dataset.active = String(params.types.has(k));
        c.addEventListener('click', () => {
          if (params.types.has(k)) params.types.delete(k); else params.types.add(k);
          render();
        });
        bar.appendChild(c);
      });
    };

    const filter = () => {
      const q = params.q.toLowerCase();
      return DATA.filter(d => {
        if (!params.types.has(d.type)) return false;
        if (params.tags.size && !d.tags.some(t => params.tags.has(t))) return false;
        if (q) {
          const hay = `${d.title} ${d.subtitle} ${d.tags.join(' ')} ${d.dateLabel}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      }).sort((a, b) => a.date < b.date ? 1 : -1);
    };

    const popover = (item, dot) => {
      let p = document.getElementById('cc-popover');
      if (!p) {
        p = document.createElement('div');
        p.id = 'cc-popover';
        p.className = 'popover';
        p.setAttribute('role', 'dialog');
        document.body.appendChild(p);
      }
      const dateTxt = `${fmtDate(item.date)}${item.end && item.end !== 'present' ? ' – ' + fmtDate(item.end) : (item.end === 'present' ? ' – present' : '')}`;
      p.innerHTML = `
        <button class="close" aria-label="Close">×</button>
        <h3>${item.title}</h3>
        <time>${dateTxt} · ${TYPES[item.type] || item.type}</time>
        ${item.subtitle ? `<p style="margin-top:.25rem;color:var(--text)"><em>${item.subtitle}</em></p>` : ''}
        <div>${item.body || ''}</div>
        <div class="meta">${item.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      `;
      p.dataset.open = 'true';
      p.dataset.side = item.side || 'left';
      const r = dot.getBoundingClientRect();
      const top = window.scrollY + r.bottom + 12;
      let left = item.side === 'right' ? r.right - 380 : r.left;
      left = Math.max(12, Math.min(left, window.innerWidth - 392));
      p.style.top = top + 'px';
      p.style.left = left + 'px';
      p.querySelector('.close').addEventListener('click', closePop);
    };
    const closePop = () => {
      const p = document.getElementById('cc-popover');
      if (p) p.dataset.open = 'false';
    };
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dot') && !e.target.closest('#cc-popover')) closePop();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePop(); });

    const render = () => {
      const items = filter();
      tlGrid.innerHTML = '';
      items.forEach((it, i) => {
        const el = document.createElement('div');
        el.className = `item ${it.side || (i % 2 ? 'right' : 'left')}`;
        el.innerHTML = `
          <div class="bar"></div>
          <button class="dot dot--${it.type}" data-date="${it.dateLabel}" aria-label="${it.title}"></button>
          <div class="title">${it.title}</div>
        `;
        el.querySelector('.dot').addEventListener('click', (e) => {
          e.stopPropagation();
          popover(it, e.currentTarget);
        });
        tlGrid.appendChild(el);
        setTimeout(() => el.classList.add('in'), 50 * i);
      });
      const info = document.getElementById('resultInfo');
      if (info) {
        info.textContent = items.length === DATA.length
          ? `${items.length} entries`
          : `${items.length} of ${DATA.length} entries`;
      }
      // Next drop pill
      const drop = document.getElementById('nextdrop');
      const future = DATA.filter(d => d.publishAt && new Date(d.publishAt) > new Date())
        .sort((a, b) => new Date(a.publishAt) - new Date(b.publishAt))[0];
      if (drop && future) {
        const target = new Date(future.publishAt);
        const days = Math.ceil((target - new Date()) / (1000 * 60 * 60 * 24));
        document.getElementById('count').textContent = days + 'd';
        document.getElementById('dropTitle').textContent = `→ ${future.dropTitle || future.title}`;
        drop.hidden = false;
      } else if (drop) {
        drop.hidden = true;
      }
    };

    renderChips(document.getElementById('chipbar'), allTags, params.tags, render);
    renderTypeBar();
    document.getElementById('q')?.addEventListener('input', (e) => {
      params.q = e.target.value;
      render();
    });
    render();
  }

  /* ─── FORM DEMO ──────────────────────────────────────────────── */
  const form = document.querySelector('.form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = 'Demo only — please email';
      btn.disabled = true;
      setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 2500);
    }
  });
})();
