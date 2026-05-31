# GATE DA 2027 — Study Notes

Complete, exam-focused notes for **GATE Data Science & Artificial Intelligence (DA)**, with full LaTeX math rendered via MathJax.

**Live site:** https://adeshboudh.github.io/gateda/

## Contents

| Subject | Topics |
|---|---|
| [Module 1 — Probability & Statistics](module1/) | Counting, Bayes, random variables, distributions, CLT, hypothesis testing |
| [Module 2 — Programming & DSA](module2/) | Python, complexity, data structures, searching, sorting, graphs |
| [Module 3 — Machine Learning](module3/) | Regression, classification, SVM, trees, neural nets, clustering, PCA |
| [Module 4 — Databases & Warehousing](module4/) | ER models, relational algebra, SQL, normalization, indexing, OLAP |
| [Module 5 — Linear Algebra](module5/) | Vector spaces, rank-nullity, eigenvalues, quadratic forms, SVD |
| [Module 6 — Artificial Intelligence](module6/) | Search, adversarial search, logic, Bayesian networks |
| [Module 7 — Calculus & Optimization](module7/) | Limits, differentiability, Taylor series, optimization |
| [Cheat Sheets](cheatsheet/) | Formula sheets per subject |
| [Revision Docs](rivision/) | Last-mile revision per subject |
| [Strategy & Roadmap](docs/) | Prep plan and topic analysis |

Each note follows a fixed template: Exam Relevance → Theory & Math → How to Solve → Worked Examples → Practice Questions → Answer Key & Solutions.

## How the site works

- **Theme:** [just-the-docs](https://just-the-docs.com/) — sidebar nav + full-text search.
- **Math:** MathJax 3 renders `$...$` (inline) and `$$...$$` (display). `kramdown.math_engine` is set to `null` in `_config.yml` so kramdown leaves TeX untouched for MathJax.
- **Deploy:** GitHub Actions (`.github/workflows/pages.yml`) builds with Jekyll and publishes to GitHub Pages on every push to `main`.

## Local preview

Needs Ruby + Bundler:

```bash
bundle install
bundle exec jekyll serve
# open http://localhost:4000/gateda/
```

## Enabling Pages (one-time)

Repo → **Settings → Pages → Build and deployment → Source = GitHub Actions**.

> Notes render natively on GitHub's file view too (`$...$` math supported since 2022); the Pages site adds navigation, search, and a cleaner read.
