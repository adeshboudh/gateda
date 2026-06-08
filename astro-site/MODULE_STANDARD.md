# Module Page Standard

Reference: **Module 1.1** (`viz-1-1-counting.astro` + `1-1-questions.astro`).  
All future modules follow this structure exactly.

---

## File Checklist (per topic)

| File | Purpose |
|------|---------|
| `src/pages/moduleN/viz-N-X-topicname.astro` | Theory + interactive viz page |
| `src/pages/moduleN/N-X-questions.astro` | Question bank page |
| `public/assets/css/pages/viz-N-X-topicname.css` | Per-page styles for viz page |
| `public/assets/css/pages/N-X-questions.css` | Per-page styles for questions page |

Register both pages in `src/config/siteMap.ts` and the module index.

---

## Viz Page — Layout Order

```
breadcrumb + back pill
├── Header block (badges, h1, intro)
│
├── [repeat for each major concept]
│   ├── h2 — Theory section
│   │   ├── paragraphs
│   │   ├── formula-panel (static formula)
│   │   ├── h3 — sub-concepts
│   │   ├── rule cards (2-col grid for paired rules)
│   │   └── gd-insights (insight + warn callouts)
│   │
│   └── h2 — Interactive: [concept name]
│       ├── formula-panel--split (formula | live values)
│       ├── gd-chart (D3 SVG)
│       ├── gd-controls (sliders)
│       └── gd-insights (live insight text)
│
├── h2 — Worked Examples (4 examples minimum)
│
├── gd-gate-box (GATE angle)
│
└── gd-page-nav (prev / next)
```

---

## HTML Components

### Formula Panel
```html
<!-- Static -->
<div class="gd-formula-panel">
  <div class="gd-formula-label">Label</div>
  <div class="gd-formula">$$...$$</div>
</div>

<!-- Split: formula left, live values right -->
<div class="gd-formula-panel gd-formula-panel--split">
  <div>
    <div class="gd-formula-label">Formula</div>
    <div class="gd-formula">$$...$$</div>
  </div>
  <div>
    <div class="gd-formula-label">Current values</div>
    <div class="gd-formula-live" id="xxx-live">—</div>
  </div>
</div>
```

### Insight Callouts
```html
<div class="gd-insights">
  <div class="gd-insight gd-insight--insight">
    <span class="gd-insight__title">Title</span>
    Body text.
  </div>
  <div class="gd-insight gd-insight--warn">
    <span class="gd-insight__title">GATE Trap</span>
    Body text.
  </div>
</div>
```
- `--insight` = green left-border (key insight)
- `--warn` = amber left-border (common mistake / GATE trap)

### Rule Cards Grid (two-column)
```html
<div class="rules-grid">
  <div class="rule-card">
    <div class="rule-card__label">Name</div>
    <div class="gd-formula">$$...$$</div>
    <p style="font-size:14px;color:var(--gd-text-2);margin:8px 0 0;">Caption.</p>
  </div>
  <div class="rule-card">...</div>
</div>
```

### Worked Example Card
```html
<div class="gd-example">
  <div class="gd-example__q">
    <span class="gd-example__num">Example N · [type]</span>
    <p>Question text.</p>
  </div>
  <div class="gd-example__body">
    <p>Solution steps.</p>
    <div class="gd-example__ans">Final answer</div>
  </div>
</div>
```
Minimum 4 examples per topic. Cover: basic application, formula variant, complement/shortcut trick, multi-step or real GATE problem.

### GATE Angle Box
```html
<div class="gd-gate-box">
  <div class="gd-gate-box__title">GATE DA Angle</div>
  <p><strong>Keyword 1:</strong> ...</p>
  <p><strong>Keyword 2:</strong> ...</p>
</div>
```
4–5 bullet points. Focus on: keyword cues, common traps, calculation shortcuts, formula variants tested.

### Controls (Sliders)
```html
<div class="gd-controls">
  <div class="gd-controls__title">Parameters</div>
  <div class="gd-control">
    <label class="gd-control__label">
      <span class="gd-control__sym">x</span> Description
    </label>
    <span class="gd-control__value" id="x-val">0.5</span>
  </div>
  <div class="gd-control--full">
    <input class="gd-control__slider" type="range" id="x-slider"
           min="0" max="1" step="0.01" value="0.5">
  </div>
</div>
```

### Prev/Next Nav
```html
<div class="gd-page-nav">
  <a class="gd-page-nav__item" href="/moduleN/viz-N-X-prev.html">
    <span class="gd-page-nav__dir">← Previous</span>
    <span class="gd-page-nav__title">N.X Topic name</span>
  </a>
  <a class="gd-page-nav__item gd-page-nav__item--next" href="/moduleN/viz-N-X-next.html">
    <span class="gd-page-nav__dir">Next →</span>
    <span class="gd-page-nav__title">N.X Topic name</span>
  </a>
</div>
```
First topic in module: left card links back to module index. Last topic: right card links to next module index.

---

## LaTeX Escaping (Astro)

Astro treats `{` and `}` in HTML text as template expressions. **Escape all braces in HTML text nodes:**

| Raw LaTeX | In Astro HTML |
|-----------|--------------|
| `{n}` | `&#123;n&#125;` |
| `\frac{a}{b}` | `\frac&#123;a&#125;&#123;b&#125;` |
| `\binom{n}{r}` | `\binom&#123;n&#125;&#123;r&#125;` |

**Rule:** Inside `<script>` tags and HTML attribute values — no escaping needed. Only HTML text content needs `&#123;`/`&#125;`.

**Complex LaTeX in JS-rendered elements** (e.g. MCQ options): use `data-katex` attribute:
```html
<div class="q-opt" data-katex="\frac{n!}{r!(n-r)!}"></div>
```
```js
el.querySelectorAll('[data-katex]').forEach(el =>
  katex.render(el.dataset.katex, el, { throwOnError: false }));
```

---

## D3 Viz Pattern

Each D3 viz is an IIFE in `<script is:inline slot="scripts">`:

```js
(function() {
  // 1. State variables
  let param = defaultVal;

  // 2. Draw function — full redraw on every state change
  function draw() {
    const container = document.getElementById('chart-id');
    const cW = container.clientWidth || 560;
    const cH = Math.round(cW * 0.55);
    d3.select(container).select('svg').remove();

    const svg = d3.select(container).append('svg')
      .attr('viewBox', `0 0 ${cW} ${cH}`)
      .style('width', '100%').style('height', 'auto');

    // ... draw
    updateFormula();
  }

  // 3. Slider wiring
  document.getElementById('param-slider').addEventListener('input', function() {
    param = +this.value;
    document.getElementById('param-val').textContent = param.toFixed(2);
    draw();
  });

  // 4. Init + resize
  draw();
  window.addEventListener('resize', () => setTimeout(draw, 150));
})();
```

Colors: always use hex constants matching tokens (never CSS vars in D3 — SVG doesn't inherit CSS custom properties reliably):
- Blue: `#7c9eff` (`--gd-brand`)
- Green: `#6ee7a8` (`--gd-green`)
- Amber: `#f5c46b` (`--gd-amber`)
- Dim text: `#6b7384` (`--gd-text-2`)
- Background: `#0f1117` (`--gd-bg`)

---

## Questions Page — Structure

```
score bar (X / N · Reset)
question list
  q-card (MCQ)
  q-card (NAT)
  q-card (MSQ)
```

### Question Card Types

**MCQ** — single correct, radio-style options:
```html
<div class="q-card" id="q1">
  <div class="q-header">
    <span class="q-num">Q1</span>
    <span class="q-type">MCQ</span>
    <span class="q-diff">★★</span>
    <span class="q-marks">2M</span>
  </div>
  <div class="q-body">Question text with $inline LaTeX$.</div>
  <div class="q-options">
    <div class="q-opt" onclick="selectOpt(this,'q1')">
      <span class="q-opt-key">A</span> Option text
    </div>
    ...
  </div>
  <div class="q-footer">
    <button class="q-check-btn" onclick="check('q1','B','Explanation.')">Check</button>
    <div class="q-answer"></div>
  </div>
</div>
```

**NAT** — numeric answer:
```html
<div class="q-card" id="q4">
  <div class="q-header">
    <span class="q-num">Q4</span>
    <span class="q-type q-type--nat">NAT</span>
    ...
  </div>
  <div class="q-body">...</div>
  <div class="q-nat">
    <input class="q-nat__input" type="number" id="q4-inp" placeholder="Enter value">
    <span class="q-nat__label">Enter exact value</span>
  </div>
  <div class="q-footer">
    <button class="q-check-btn" onclick="checkNat('q4','42','Explanation.')">Check</button>
    <div class="q-answer"></div>
  </div>
</div>
```

**MSQ** — multiple correct (checkboxes):
```html
<div class="q-card" id="q11">
  <div class="q-header">
    <span class="q-num">Q11</span>
    <span class="q-type q-type--msq">MSQ</span>
    ...
  </div>
  <div class="q-body">...</div>
  <div class="q-options">
    <div class="q-opt q-opt--msq">
      <input type="checkbox" id="q11-a"> <label for="q11-a">Option A</label>
    </div>
    ...
  </div>
  <div class="q-footer">
    <button class="q-check-btn" onclick="checkMsq('q11',['A','C'],'Explanation.')">Check</button>
    <div class="q-answer"></div>
  </div>
</div>
```

### JS Engine (copy verbatim into each questions page)

```js
let score = 0, total = /* N */;

function selectOpt(el, cardId) {
  document.querySelectorAll(`#${cardId} .q-opt`).forEach(o => o.classList.remove('q-opt--selected'));
  el.classList.add('q-opt--selected');
}

function check(cardId, correct, explanation) {
  const card = document.getElementById(cardId);
  const sel = card.querySelector('.q-opt--selected');
  const ans = card.querySelector('.q-answer');
  const btn = card.querySelector('.q-check-btn');
  if (!sel) return;
  btn.disabled = true;
  const key = sel.querySelector('.q-opt-key').textContent.trim();
  const isCorrect = key === correct;
  card.querySelectorAll('.q-opt').forEach(o => {
    if (o.querySelector('.q-opt-key').textContent.trim() === correct) o.classList.add('q-opt--correct');
    else if (o === sel && !isCorrect) o.classList.add('q-opt--wrong');
  });
  card.classList.add(isCorrect ? 'q-card--correct' : 'q-card--wrong');
  if (isCorrect) { score++; document.getElementById('score-num').textContent = score; }
  ans.style.display = 'block';
  ans.innerHTML = `<b>${isCorrect ? '✓ Correct' : '✗ Wrong — correct: ' + correct}</b><br>${explanation}`;
}

function checkNat(cardId, correct, explanation) {
  const card = document.getElementById(cardId);
  const inp = card.querySelector('.q-nat__input');
  const ans = card.querySelector('.q-answer');
  const btn = card.querySelector('.q-check-btn');
  if (!inp.value) return;
  btn.disabled = true;
  const isCorrect = Math.abs(parseFloat(inp.value) - parseFloat(correct)) < 1e-9;
  inp.classList.add(isCorrect ? 'q-nat__input--correct' : 'q-nat__input--wrong');
  card.classList.add(isCorrect ? 'q-card--correct' : 'q-card--wrong');
  if (isCorrect) { score++; document.getElementById('score-num').textContent = score; }
  ans.style.display = 'block';
  ans.innerHTML = `<b>${isCorrect ? '✓ Correct' : '✗ Wrong — answer: ' + correct}</b><br>${explanation}`;
}

function checkMsq(cardId, correctKeys, explanation) {
  const card = document.getElementById(cardId);
  const btn = card.querySelector('.q-check-btn');
  btn.disabled = true;
  const checked = [...card.querySelectorAll('.q-opt--msq input:checked')].map(i => i.id.split('-').pop().toUpperCase());
  const isCorrect = checked.length === correctKeys.length && correctKeys.every(k => checked.includes(k));
  card.classList.add(isCorrect ? 'q-card--correct' : 'q-card--wrong');
  const ans = card.querySelector('.q-answer');
  if (isCorrect) { score++; document.getElementById('score-num').textContent = score; }
  ans.style.display = 'block';
  ans.innerHTML = `<b>${isCorrect ? '✓ Correct' : '✗ Wrong — correct: ' + correctKeys.join(', ')}</b><br>${explanation}`;
}

function resetAll() {
  score = 0; document.getElementById('score-num').textContent = 0;
  document.querySelectorAll('.q-card').forEach(card => {
    card.className = 'q-card';
    card.querySelectorAll('.q-opt').forEach(o => o.className = o.className.replace(/q-opt--(selected|correct|wrong)/g,'').trim());
    card.querySelectorAll('.q-nat__input').forEach(i => { i.value=''; i.className='q-nat__input'; });
    card.querySelectorAll('.q-opt--msq input').forEach(i => i.checked=false);
    card.querySelectorAll('.q-answer').forEach(a => a.style.display='none');
    card.querySelectorAll('.q-check-btn').forEach(b => b.disabled=false);
  });
}
```

---

## siteMap.ts Entry

```typescript
// In siteMap.ts SITE_MAP array, under the relevant module:
{ id: 'mN-X', label: 'N.X Topic Name', viz: '/moduleN/viz-N-X-topicname' }
// Add href only when a dedicated notes page exists (currently none exist)
// Add q field in module index.astro when questions page is built
```

## Module Index Entry

```typescript
// In moduleN/index.astro topic array:
{ num:'N.X', label:'Topic Name', sub:'keywords', viz:'viz-N-X-topicname.html', q:'N-X-questions.html' }
// Omit q until questions page is built — renders "Coming soon" span automatically
```

---

## Content Requirements Per Topic

| Section | Required content |
|---------|-----------------|
| Intro paragraph | 2–3 sentences: what is this concept, why it matters for GATE DA |
| Theory h2 blocks | One per major concept (2–4 per topic) |
| Formula panels | Every named formula gets its own panel with label |
| Insights | Minimum 1 insight + 1 warn per theory block |
| Visualizations | Minimum 1 interactive viz per topic; 2 preferred |
| Worked examples | 4 minimum: basic → variant → trick → GATE-style |
| GATE angle box | 4–5 bullet points: keyword cues, traps, shortcuts |
| Questions page | 10–12 questions minimum: mix MCQ (60%), NAT (25%), MSQ (15%) |

---

## Difficulty and Source Tags

- `q-diff` stars: ★ = easy, ★★ = medium, ★★★ = hard
- `q-marks`: `1M` or `2M` (GATE DA marks allocation)
- `q-ref`: optional GATE year tag e.g. `GATE 2024`
- Pull questions from existing notes markdown files in the repo when available
