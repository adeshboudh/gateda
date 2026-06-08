document.addEventListener('DOMContentLoaded', () => {
  const rail = document.querySelector('.gd-toc-rail');
  if (!rail) return;

  const headings = [...document.querySelectorAll('#main-content h2[id], #main-content h3[id]')];
  if (!headings.length) { rail.style.display = 'none'; return; }

  const title = rail.querySelector('.gd-toc-rail__title') || (() => {
    const t = document.createElement('div');
    t.className = 'gd-toc-rail__title';
    t.textContent = 'On this page';
    rail.appendChild(t);
    return t;
  })();

  const list = document.createElement('ul');
  list.className = 'gd-toc-rail__list';

  headings.forEach(h => {
    const li = document.createElement('li');
    li.className = `gd-toc-rail__item${h.tagName === 'H3' ? ' gd-toc-rail__item--h3' : ''}`;
    const a = document.createElement('a');
    a.className = 'gd-toc-rail__anchor';
    a.href = `#${h.id}`;
    a.textContent = h.textContent;
    li.appendChild(a);
    list.appendChild(li);
  });
  rail.appendChild(list);

  // Scrollspy
  const anchors = [...list.querySelectorAll('.gd-toc-rail__anchor')];
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        anchors.forEach(a => a.classList.remove('gd-toc-rail__anchor--active'));
        const active = anchors.find(a => a.getAttribute('href') === `#${e.target.id}`);
        if (active) active.classList.add('gd-toc-rail__anchor--active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  headings.forEach(h => io.observe(h));
});
