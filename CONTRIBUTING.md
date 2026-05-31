# Contributing

Thanks for helping improve the GATE DA 2027 notes. This guide covers how to edit notes, add new ones, and write math that renders correctly on the site.

**Live site:** https://adeshboudh.github.io/gateda/

## How publishing works

Every push to `main` triggers a GitHub Actions build (`.github/workflows/pages.yml`) that rebuilds the Jekyll site and deploys to GitHub Pages — usually live within 1–2 minutes. There is no manual deploy step.

## Editing an existing note

Any of these works:

- **Local editor / Obsidian:** edit the `.md`, then `git add -A && git commit -m "..." && git push`.
- **github.com:** open the file → pencil (✏️) → edit → *Commit changes*.
- **Pull request:** fork or branch, edit, and open a PR against `main` (small, focused fixes preferred).

## Adding a new note

1. Create the file in the right folder, e.g. `module1/gate-da-p-s-module-1-9-new-topic.md`.
2. Add front-matter at the very top (this controls the sidebar):

   ```yaml
   ---
   title: "1.9 New Topic"
   parent: "Module 1: Probability & Statistics"
   nav_order: 9
   ---
   ```

   - `parent` must exactly match the section's title (see the folder's `index.md`).
   - `nav_order` sets the position within the section.
3. Add a link line to that folder's `index.md`:

   ```markdown
   - [1.9 New Topic](gate-da-p-s-module-1-9-new-topic)
   ```

   (Use the filename **without** `.md` — it resolves on both the site and Obsidian.)
4. Commit + push.

The sidebar nav updates automatically from front-matter; the folder `index.md` list is static, so it needs the manual link line.

## Writing math (important)

Math is written as `$...$` (inline) and `$$...$$` (display), rendered by MathJax. **kramdown protects `$$...$$` verbatim but treats inline `$...$` as text**, so a few characters get mangled inline. Follow these rules:

| Don't write (in math) | Write instead | Why |
| --- | --- | --- |
| `\|x\|` (absolute value / cardinality) | `\lvert x\rvert` | bare `\|` becomes a markdown table |
| `\|v\|` (norm) | `\lVert v\rVert` | same |
| `P(A\|B)` (conditional) | `P(A\mid B)` | same (also breaks table cells) |
| `x^*`, `h^*` (star) | `x^\ast`, `h^\ast` | `*` is eaten as markdown emphasis |
| `\#` / `#` (count) | `N_{\text{items}}`, `N_{\lambda=1}` | bare `#` is a TeX error |
| `\textbf{word}` inside math | `**word**` (plain markdown) | renders literally; bold numbers → `\mathbf{6}` |
| `₹6,100` inside `$...$` | put `₹` as plain text outside math | currency glyph errors in MathJax |
| inline matrix with `\\` row break | use `\\\\`, or move to `$$...$$` | inline `\\` collapses to `\` |

Other rules:

- **Always leave a blank line before a table.** A table glued under a heading is not parsed as a table (the `|---|` separator turns into em-dashes and it renders as a paragraph).
- Primes `f'`, `f''` are safe — smart-quotes are disabled site-wide in `_config.yml`.
- Keep section headings as plain text (no `$...$` in headings — renders inconsistently).

## Previewing before you push

- **Locally** (needs Ruby + Bundler):

  ```bash
  bundle install
  bundle exec jekyll serve
  # open http://localhost:4000/gateda/
  ```
- **Quick math check:** GitHub's file view renders `$...$` natively — open the `.md` on github.com to spot-check a formula.

## Reporting an error

Spotted a wrong answer, broken formula, or typo? Open an [issue](https://github.com/adeshboudh/gateda/issues/new), send a PR, or email **adeshboudh16@gmail.com**. Please name the **file/section** and paste the offending line.
