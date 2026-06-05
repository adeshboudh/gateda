const SITE_MAP = [
  {
    id: 'module1',
    label: 'Module 1 · Probability & Statistics',
    notes: [
      { id: 'm1-1', label: '1.1 Counting & Basic Probability', href: '/module1/1-1-counting.html', viz: '/module1/viz-1-1-counting.html' },
      { id: 'm1-2', label: '1.2 Conditional Probability & Bayes', href: '/module1/1-2-bayes.html', viz: '/module1/viz-1-2-bayes.html' },
      { id: 'm1-3', label: '1.3 Random Variables & Expectation', href: '/module1/1-3-expectation.html', viz: '/module1/viz-1-3-expectation.html' },
      { id: 'm1-4', label: '1.4 Distributions', href: '/module1/1-4-distributions.html', viz: '/module1/viz-1-4-distributions.html' },
      { id: 'm1-5', label: '1.5 Normal & CLT', href: '/module1/1-5-normal-clt.html', viz: '/module1/viz-1-5-normal-clt.html' },
      { id: 'm1-6', label: '1.6 Covariance & Correlation', href: '/module1/1-6-correlation.html', viz: '/module1/viz-1-6-correlation.html' },
      { id: 'm1-7', label: '1.7 Estimation & CIs', href: '/module1/1-7-estimation.html', viz: '/module1/viz-1-7-estimation.html' },
      { id: 'm1-8', label: '1.8 Hypothesis Testing', href: '/module1/1-8-hypothesis.html', viz: '/module1/viz-1-8-hypothesis.html' },
    ]
  },
  {
    id: 'module2',
    label: 'Module 2 · Programming & DSA',
    notes: []  // to be added
  },
  {
    id: 'module3',
    label: 'Module 3 · Machine Learning',
    notes: []
  },
  {
    id: 'module4',
    label: 'Module 4 · Databases & Warehousing',
    notes: []
  },
  {
    id: 'module5',
    label: 'Module 5 · Linear Algebra',
    notes: []
  },
  {
    id: 'module6',
    label: 'Module 6 · Artificial Intelligence',
    notes: []
  },
  {
    id: 'module7',
    label: 'Module 7 · Calculus & Optimization',
    notes: []
  }
];

function buildSidebar() {
  const nav = document.querySelector('.gd-sidebar__nav');
  if (!nav) return;

  // Resolve current path for active link detection
  const currentPath = window.location.pathname.replace(/\/+$/, '');
  // Detect the root of the site/ directory
  const siteRoot = getSiteRoot();

  const stored = JSON.parse(sessionStorage.getItem('gd-nav-open') || '{}');

  nav.innerHTML = SITE_MAP.map(group => {
    if (!group.notes.length) return '';
    const isOpen = stored[group.id] !== false; // default open
    const links = group.notes.map(note => {
      const hrefAbs = siteRoot + note.href;
      const vizHrefAbs = note.viz ? siteRoot + note.viz : null;
      const notesPath = note.href.replace(/^\//, '');
      const vizPath = note.viz ? note.viz.replace(/^\//, '') : '';
      const isActiveNotes = currentPath.endsWith(notesPath) || currentPath.endsWith(notesPath.replace('.html',''));
      const isActiveViz = vizPath && (currentPath.endsWith(vizPath) || currentPath.endsWith(vizPath.replace('.html','')));
      const vizLink = vizHrefAbs
        ? `<a class="gd-nav-viz-link${isActiveViz ? ' gd-nav-viz-link--active' : ''}" href="${vizHrefAbs}">✦ Visualization</a>`
        : '';
      return `<li><a class="gd-nav-link${isActiveNotes ? ' gd-nav-link--active' : ''}"
          href="${hrefAbs}">${note.label}</a>${vizLink}</li>`;
    }).join('');

    return `
      <div class="gd-nav-group${isOpen ? ' gd-nav-group--open' : ''}" data-group="${group.id}">
        <div class="gd-nav-group__title">
          <span>${group.label}</span>
          <span class="gd-nav-group__arrow">›</span>
        </div>
        <ul class="gd-nav-group__list">${links}</ul>
      </div>`;
  }).join('');

  // Toggle collapse
  nav.querySelectorAll('.gd-nav-group__title').forEach(title => {
    title.addEventListener('click', () => {
      const group = title.parentElement;
      group.classList.toggle('gd-nav-group--open');
      const id = group.dataset.group;
      const state = JSON.parse(sessionStorage.getItem('gd-nav-open') || '{}');
      state[id] = group.classList.contains('gd-nav-group--open');
      sessionStorage.setItem('gd-nav-open', JSON.stringify(state));
    });
  });
}

function getSiteRoot() {
  // Find how deep we are relative to site/
  // Strategy: walk up from current URL until we find a known root marker
  const path = window.location.pathname;
  const parts = path.split('/').filter(Boolean);
  // Assume site/ is at some level — detect by matching known dir names
  const siteIdx = parts.indexOf('site');
  if (siteIdx >= 0) {
    return '/' + parts.slice(0, siteIdx + 1).join('/');
  }
  // Fallback: relative from current depth
  const depth = (path.match(/\//g) || []).length - 1;
  return depth > 0 ? '../'.repeat(depth - 1).replace(/\/$/, '') : '';
}

function initHamburger() {
  const btn = document.querySelector('.gd-hamburger');
  const sidebar = document.querySelector('.gd-sidebar');
  if (!btn || !sidebar) return;
  btn.addEventListener('click', () => sidebar.classList.toggle('gd-sidebar--open'));
}

document.addEventListener('DOMContentLoaded', () => {
  buildSidebar();
  initHamburger();
});
