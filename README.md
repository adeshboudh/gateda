# GATE DA 2027 — Study Notes

Complete, exam-focused notes for **GATE Data Science & Artificial Intelligence (DA)**, with full LaTeX math rendered via MathJax.

**Live site:** https://adeshboudh.github.io/gateda/

## Contents

| Subject                                              | Topics                                                                    |
| ---------------------------------------------------- | ------------------------------------------------------------------------- |
| [Module 1 — Probability & Statistics](module1/index) | Counting, Bayes, random variables, distributions, CLT, hypothesis testing |
| [Module 2 — Programming & DSA](module2/index)        | Python, complexity, data structures, searching, sorting, graphs           |
| [Module 3 — Machine Learning](module3/index)         | Regression, classification, SVM, trees, neural nets, clustering, PCA      |
| [Module 4 — Databases & Warehousing](module4/index)  | ER models, relational algebra, SQL, normalization, indexing, OLAP         |
| [Module 5 — Linear Algebra](module5/index)           | Vector spaces, rank-nullity, eigenvalues, quadratic forms, SVD            |
| [Module 6 — Artificial Intelligence](module6/index)  | Search, adversarial search, logic, Bayesian networks                      |
| [Module 7 — Calculus & Optimization](module7/index)  | Limits, differentiability, Taylor series, optimization                    |
| [Cheat Sheets](cheatsheet/index)                     | Formula sheets per subject                                                |
| [Revision Docs](rivision/index)                      | Last-mile revision per subject                                            |
| [Strategy & Roadmap](docs/index)                     | Prep plan and topic analysis                                              |

Each note follows a fixed template: Exam Relevance → Theory & Math → How to Solve → Worked Examples → Practice Questions → Answer Key & Solutions.

## Found an error or want to improve a note?

Spotted a wrong answer, a broken formula, a typo, or have a better explanation? Any of these works:

- **Open an issue** — [raise one here](https://github.com/adeshboudh/gateda/issues/new). Include the module (e.g. *1.4 Step 1*) and what's wrong.
- **Send a pull request** — fix it directly and PR against `main`. Small, focused fixes are very welcome.
- **Email** — [adeshboudh16@gmail.com](mailto:adeshboudh16@gmail.com).

When reporting a rendering bug, please name the **file/section** and paste the offending line — that makes it a one-line fix.

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
