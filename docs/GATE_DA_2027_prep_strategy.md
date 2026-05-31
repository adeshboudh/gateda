---
title: "Prep Strategy"
parent: "Strategy & Roadmap"
nav_order: 2
---

# GATE DA 2027 — Preparation Strategy

Companion to `GATE_DA_topic_analysis.md`. Strategy derived from 2024–2026 weightage trends.

Assumed timeline: GATE 2027 ≈ first week of **February 2027**. This plan assumes you start serious prep around **June 2026** (~8 months). Compress proportionally if you start later.

## 1. Effort allocation (study-hour share per topic)

Allocation directly tracks 3-year weightage, with a small upweight for rising trends (PS, DBW) and a small downweight for declining ones (CO).

| Topic                    | 3-yr weight       | Recommended hour-share | Why                                            |
| ------------------------ | ----------------- | ---------------------- | ---------------------------------------------- |
| Probability & Statistics | 21.6%             | **22%**                | Highest weight, still rising; broad subtopics  |
| Programming, DS & Algo   | 18.8%             | **18%**                | Reliable 14–20 marks; many small subtopics     |
| Machine Learning         | 16.9%             | **17%**                | Stable 14–15 marks; predictable                |
| Database & Warehousing   | 14.1%             | **15%**                | Sharp upward trend (18 marks in 2026)          |
| Linear Algebra           | 11.8%             | **11%**                | Stable; cross-uses in PS/ML                    |
| AI (search/logic/Bayes)  | 9.4%              | **9%**                 | Narrow, scoreable syllabus                     |
| Calculus & Optimization  | 7.5%              | **6%**                 | Declining stand-alone weight; still used in ML |
| Aptitude (GA)            | (15/100 of paper) | **2%**                 | High-ROI; cover via weekly drills, not blocks  |

Translate to hours if you can put in ~25 hr/week × 32 weeks = **800 hr** total: PS ≈ 176 hr, PDSA ≈ 144 hr, ML ≈ 136 hr, DBW ≈ 120 hr, LA ≈ 88 hr, AI ≈ 72 hr, CO ≈ 48 hr, GA ≈ 16 hr.

## 2. Phase plan (8 months)

### Phase 1 — Foundations (Jun 2026 → Aug 2026, ~12 weeks)

Goal: cover every syllabus subtopic at concept depth. No speed yet.

Suggested week-block sequence (1 block ≈ 1.5 weeks):

| Block | Topic                | Core deliverable                                                                                                 |
| ----- | -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| 1     | Linear Algebra       | Eigenvalues, rank/nullity, SVD, projection/orthogonal matrices                                                   |
| 2     | Calculus & Opt       | Limits, continuity, differentiability, Taylor, maxima/minima                                                     |
| 3     | Probability — Part 1 | Counting, sample space, conditional + Bayes, expectation, variance                                               |
| 4     | Probability — Part 2 | Distributions (Bernoulli, binomial, Poisson, normal, exponential), CLT, hypothesis tests, joint pdf              |
| 5     | Programming + DS     | Python semantics, stacks/queues/trees/hash, traversals                                                           |
| 6     | Algorithms           | Sorting, searching, divide-and-conquer, graph traversals, shortest path                                          |
| 7     | DBMS + Warehousing   | Relational algebra/calculus, SQL, normalization, indexing, B+ tree, OLAP, data cubes                             |
| 8     | ML — supervised      | Linear/ridge/logistic regression, kNN, SVM, naive Bayes, LDA, decision trees, MLP/NN                             |
| 9     | ML — unsupervised    | k-means/k-medoid, hierarchical clustering, PCA, dimensionality reduction                                         |
| 10    | AI                   | Search (BFS/DFS/A\*/alpha-beta), propositional + predicate logic, Bayesian nets (variable elimination, sampling) |

Per block: read theory → solve 20–30 textbook problems → write 1-page summary sheet. Keep summary sheets for revision.

### Phase 2 — Problem solving & previous papers (Sep 2026 → Nov 2026, ~12 weeks)

Goal: bridge theory to GATE-style multi-step reasoning.

- **Topic-wise PYQs**: solve all DA questions from 2024, 2025, 2026 (already in `docs/`) plus relevant CS-tagged PYQs for PDSA/DBW/AI overlap (GATE CS 2015–2024). Aim for ≥200 PYQ problems per major topic.
- **Standard problem books**:
  - PS: Sheldon Ross, _A First Course in Probability_
  - LA: Gilbert Strang, _Introduction to Linear Algebra_
  - PDSA: Cormen (CLRS), problem chapters; GATE-CS data structures section
  - DBW: Korth, _Database System Concepts_
  - ML: Bishop, _Pattern Recognition and ML_ (selected chapters); Hastie ESL (read sections, skip proofs)
  - AI: Russell & Norvig (search, logic, Bayes net chapters)
- **Weekly cadence**: 2 topics in deep practice, 1 topic in light revision, 1 GA drill (60 min), 1 timed sectional test (90 min).

### Phase 3 — Mocks + revision (Dec 2026 → Jan 2027, ~8 weeks)

Goal: convert knowledge into a 3-hour, 100-mark exam performance.

- **Full-length mocks**: 1 mock per week for first 4 weeks, then 2 per week. Total ≥ 12 mocks. Use IIT-released and trusted coaching mocks. Strict 3-hour timer, calculator only as allowed on screen.
- **Mock review > mock taking**: spend ≥ 2 hours analyzing each mock (every wrong answer + every guess + every slow question). Maintain an "error log" spreadsheet: question, topic, root cause (concept gap / silly / time / misread).
- **Topic revision rota**: every weekday cover one topic from your summary sheets. Re-derive 3–4 formulas from scratch instead of re-reading.
- **Final 10 days**: only summary sheets + error log + 3–4 final mocks. No new topics.

## 3. Subtopic checklists (must-master, derived from PYQ patterns)

### Probability & Statistics (highest priority)

- Bayes theorem with diagnostic test framing (2026 Q57 pattern)
- Conditional expectation E[X|Y], law of total expectation (2025 Q11)
- Exponential RV: memoryless property, P(X>a|X>b) (2026 Q34)
- Normal + t + chi-square: PDF/CDF reasoning, when to use which test
- CLT applied to Bernoulli sums (2025 Q40)
- Joint PDF: marginals, conditional, E[Y|X] (2024 Q59)
- Variance/covariance from definitions (2024 Q65, 2026 Q44, Q63)
- Combinatorics: counting subsets / arrangements / parity (2026 Q19, Q20, Q33)
- Sampling distributions of $\sum X_i^2$, $\bar{X}$ (2026 Q53)

### Programming, DS & Algorithms

- Python gotchas: mutable default args, closures, list vs set ops (2026 Q16, Q50; 2025 Q23, Q47)
- Sort comparisons/swaps (bubble, insertion, quicksort) — exact-count problems (2024 Q30, Q45; 2026 Q49)
- Binary search recurrences and comparison counts (2024 Q40; 2026 Q31)
- Tree traversals (pre/in/post), reconstruction (2024 Q28; 2026 Q25)
- Graph traversal: BFS/DFS, edge classification, reachability, topological sort (2024 Q14, Q44, Q51; 2026 Q40; 2025 Q65)
- Hashing: open addressing, linear probing, load factor (2024 Q21; 2025 Q18)

### Machine Learning

- SVM: support vectors, hard margin geometry, margin = 2/||w|| (2024 Q17; 2025 Q53)
- Clustering: k-means assignments, single-vs-complete linkage dendrograms, Manhattan vs Euclidean (2024 Q19, Q42; 2025 Q30; 2026 Q36)
- PCA: orthogonality of components, variance along eigenvectors (2024 Q18; 2025 Q60; 2026 Q11)
- Ridge regression: L2 regularizer, bias-variance tradeoff (2026 Q37, Q55)
- Naive Bayes parameter count, decision rule (2024 Q20; 2025 Q35)
- Neural networks: forward equivalence, gradient through ReLU, parameter counting (2024 Q43; 2025 Q42; 2026 Q56)
- Evaluation: accuracy, precision, recall, confusion matrix (2026 Q47)
- LOOCV / k-fold splits (2026 Q12)

### Database & Warehousing (rising — invest extra)

- SQL: nested subqueries, self-joins, GROUP BY (2024 Q31; 2025 Q33; 2026 Q51, Q60)
- Relational algebra: division, set difference, natural join (2024 Q26; 2025 Q17, Q62; 2026 Q42, Q59)
- Functional dependencies, candidate-key derivation, BCNF check (2024 Q46; 2025 Q57; 2026 Q17)
- B+ tree: insertions, node-pointer counts, fan-out from byte sizes (2026 Q32, Q41)
- ER → relational, 3NF count (2026 Q61)
- OLAP: cube/cuboid count from concept hierarchies, roll-up/drill-down/slice/dice (2025 Q46; 2026 Q18, Q43)
- Indexing: B+ tree vs hash index choice for predicate types (2024 Q55)

### Linear Algebra

- Eigenvalues of structured matrices: rotation, $I + xx^T$, projection (2025 Q28; 2026 Q21, Q46, Q52, Q65)
- Projection / idempotent / orthogonal matrices: $M^2 = M$, null space dim (2024 Q49; 2025 Q52; 2026 Q52)
- SVD of rank-1 outer product $uu^T$ (2024 Q61)
- Rank, nullity, solvability of $Ax=b$ — unique / infinite / none (2024 Q48; 2025 Q13)
- Quadratic forms maximization (2026 Q65)

### AI (search, logic, Bayes nets)

- A\* admissibility / consistency, combining heuristics (2024 Q23; 2025 Q44)
- Alpha-beta pruning conditions, MIN/MAX value bounds (2024 Q25; 2025 Q43; 2026 Q30)
- BFS vs DFS state expansion counts (2024 Q44)
- Propositional logic: tautology checks, equivalences (2024 Q29; 2025 Q15; 2026 Q38)
- First-order logic: ∀, ∃, entailment, predicate translations (2024 Q54; 2026 Q14, Q24, Q48)
- Bayesian network: conditional independence, joint probability from CPTs, variable elimination, sampling (2024 Q24, Q64; 2025 Q26)

### Calculus & Optimization (low weight in 2026, still examinable)

- Continuity + differentiability of piecewise functions (2024 Q37)
- Local max/min using first/second derivative (2024 Q50; 2025 Q49, Q51; 2026 Q27)
- Limits: L'Hôpital, series expansions (2024 Q60; 2025 Q32)
- Geometric / Poisson series sums (2026 Q35, Q45)

### General Aptitude

- Quant: averages, ratios, percentages, geometry, mensuration, simple combinatorics (≈ 60% of GA)
- Verbal: analogies, sentence completion, reading inference
- Logical/visual: dice unfolding, figure construction, deduction puzzles
- 1–2 hours/week throughout; pick up 13–15 of 15 marks here — it is the cheapest 15 marks in the paper.

## 4. Practice volume targets

| Activity                   | Target by exam day                               |
| -------------------------- | ------------------------------------------------ |
| Concept summary sheets     | 1 per subtopic (~60 total)                       |
| Solved problems (book)     | ≥ 1500                                           |
| PYQ problems solved        | ≥ 500 (all 3 DA years 2× + select CS/EC overlap) |
| Full-length mocks          | ≥ 12                                             |
| Sectional/topic tests      | ≥ 30                                             |
| Error-log entries reviewed | every Sunday + last 10 days                      |

## 5. Common pitfalls to avoid

1. **Over-studying ML/AI because they're "interesting"** — PS+PDSA+DBW jointly carry ~55% of marks; do not let them slip.
2. **Skipping the boring DBW SQL/normalization drills** — 2026 already showed an 18-mark spike. Expect DBW to stay heavy in 2027.
3. **Memorizing formulas without re-deriving** — GATE PS questions twist standard formulas (Q44 2026 variance of (2X−1)Y, Q63 2026 correlation under conditional uniform). Re-derive in mocks.
4. **Ignoring MSQ (multi-select)** — 2025 and 2026 used many MSQs; partial-credit rules are strict (0 for any wrong selection). Train to mark only what you can prove.
5. **No error log** — gains in last 2 months come almost entirely from systematically closing repeated mistakes, not from new content.
6. **Last-week new topics** — final 10 days are for revision + mocks only.

## 6. Tooling checklist

- Notebook (paper or tablet) per topic for derivations
- Spreadsheet for error log: columns = date, mock#, Q#, topic, subtopic, root cause, fix
- Python (NumPy + scikit-learn snippet sandbox) to verify ML/PS intuitions experimentally — useful for cluster-assignment / SVM / PCA questions
- DBMS sandbox (SQLite or PostgreSQL local) for SQL self-joins and nested queries
- Official virtual calculator (linked from GATE site) — use it in every mock for keyboard familiarity

## 7. Monthly milestones (snapshot)

| Month    | Milestone                                              |
| -------- | ------------------------------------------------------ |
| Jun 2026 | Finish LA + CO + half of Probability                   |
| Jul 2026 | Finish Probability + Statistics; start PDSA            |
| Aug 2026 | Finish PDSA + DBW; start ML                            |
| Sep 2026 | Finish ML + AI; first 3 sectional tests                |
| Oct 2026 | All PYQs (2024–2026) done once; 4 sectional tests/week |
| Nov 2026 | First 4 full-length mocks; second pass through PYQs    |
| Dec 2026 | 6+ full-length mocks; finalize error log               |
| Jan 2027 | 4 more mocks; revision from summary sheets only        |
| Feb 2027 | Exam                                                   |

## 8. Single rule of thumb

> Time spent on a topic should look like its 3-year weight, then nudge it up if the trend is rising. Everything else (anxiety, "I should also learn deep learning", "let me redo this 7th video on linear regression") is noise.
