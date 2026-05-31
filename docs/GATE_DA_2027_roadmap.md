---
title: "Roadmap"
parent: "Strategy & Roadmap"
nav_order: 1
---

# GATE DA 2027 — Personal Roadmap (CQRP Method)

Built around your four pillars:

- **C — Concept** — learn the idea from book/video. Output: notes.
- **Q — Question** — solve practice problems on that exact concept immediately after learning it. Output: filled-in problem set.
- **R — Revision** — revisit older topics on a schedule before they decay. Output: re-derived formula sheets.
- **P — Practice** — test-series mocks + PYQs under timed conditions. Output: scored attempt + error log entry.

**Test series**: already purchased → this slots into the P pillar from Sep 2026 onward.
**Reference timeline**: today 2026-05-25 → GATE DA 2027 ≈ first week of Feb 2027 → 36 weeks of usable prep.

Topic priority (from `GATE_DA_topic_analysis.md`):
PS > PDSA > ML > DBW > LA > AI > CO.

---

## 1. Daily template (CQRP every day)

Total 5 hrs/day weekday, 7 hrs/day weekend. Adjust block lengths to your reality, but keep all 4 pillars present every day after Phase 1.

| Block | Duration | Pillar | What happens |
|---|---|---|---|
| 1 | 90 min | **C** | New concept from current week's topic |
| 2 | 90 min | **Q** | Solve 8–12 problems on same concept |
| 3 | 30 min | **R** | One older topic's summary sheet — re-derive 2 formulas from blank paper |
| 4 | 60 min | **P** | Daily problem mix: 5 PYQs OR 1 sectional test (timed) |
| 5 | 30 min | error log + plan tomorrow | Review wrong answers, decide root cause |

Weekly: take Sunday afternoon **off concept/question**, use it only for **R + P** (full mock + revision).

---

## 2. Phase split

| Phase | Window | Weeks | Pillar emphasis |
|---|---|---|---|
| Phase 1 — Concept-heavy | 2026-06-01 → 2026-08-30 | 13 | **C + Q** (90% C/Q, 10% R, 0% P) |
| Phase 2 — Balanced | 2026-08-31 → 2026-11-29 | 13 | **C + Q + R + P** (35/35/15/15) |
| Phase 3 — Practice-heavy | 2026-11-30 → 2027-01-31 | 9 | **R + P** (15/15/35/35) |
| Phase 4 — Exam taper | 2027-02-01 → exam day | 1 | **R only** (no new content) |

---

## 3. Phase 1 — Concept-heavy (Jun → Aug 2026, 13 weeks)

Goal: zero unread subtopics in the syllabus. Each week = one major topic block. Q follows C immediately the same day; R is light (re-skim that week's own notes only).

| Week | Dates (Mon–Sun) | Topic | C-output | Q-output |
|---|---|---|---|---|
| 1 | Jun 01–07 | Linear Algebra Part 1 — vectors, subspaces, rank, nullity, systems of equations | 1 summary sheet | 40 problems |
| 2 | Jun 08–14 | Linear Algebra Part 2 — eigen, projection, orthogonal, idempotent, SVD, quadratic forms | 1 sheet | 40 problems |
| 3 | Jun 15–21 | Calculus & Optimization — limits, continuity, differentiability, Taylor, max/min | 1 sheet | 30 problems |
| 4 | Jun 22–28 | Probability Part 1 — counting, axioms, conditional, Bayes, independence | 1 sheet | 50 problems |
| 5 | Jun 29–Jul 05 | Probability Part 2 — RVs, PMF/PDF, expectation, variance, covariance, distributions | 1 sheet | 50 problems |
| 6 | Jul 06–12 | Statistics — CLT, confidence interval, z/t/chi-square tests, sampling distributions | 1 sheet | 30 problems |
| 7 | Jul 13–19 | Programming + DS Part 1 — Python semantics, stacks, queues, linked lists, hash tables | 1 sheet + Python sandbox | 40 problems |
| 8 | Jul 20–26 | Programming + DS Part 2 — trees, traversals, heaps; sorting (bubble/insertion/selection/merge/quick) | 1 sheet | 40 problems |
| 9 | Jul 27–Aug 02 | Algorithms — search (linear, binary), divide & conquer, graph traversal, shortest path | 1 sheet | 40 problems |
| 10 | Aug 03–09 | DBMS — ER, relational model, relational algebra, tuple calculus, SQL | 1 sheet + SQLite sandbox | 50 problems |
| 11 | Aug 10–16 | DBMS + Warehousing — normalization (1NF–BCNF), indexing, B+ tree, data warehouse, OLAP, concept hierarchies | 1 sheet | 40 problems |
| 12 | Aug 17–23 | ML supervised — linear/ridge/logistic regression, kNN, naive Bayes, LDA, SVM, decision trees, MLP/NN | 2 sheets | 50 problems |
| 13 | Aug 24–30 | ML unsupervised + AI — k-means/k-medoid, hierarchical clustering, PCA; A*, alpha-beta, propositional/predicate logic, Bayesian net inference | 2 sheets | 50 problems |

**Phase 1 gate (Aug 30):** all 14 summary sheets drafted, ≥ 550 problems solved, syllabus 100% surfaced. If a topic is still vague → bleed 3 days into Phase 2 for a fix, do not extend the whole phase.

---

## 4. Phase 2 — Balanced (Sep → Nov 2026, 13 weeks)

Pillars now all four. **P** activates: start with topic-wise test-series tests, then sectional mocks. R becomes spaced.

### Weekly pattern (Phase 2)

- Mon → Fri: pick **2 topics in deep mode** (C + Q on new sub-areas), **1 topic in revision** (R), 1 timed sectional (P).
- Sat: 2 sectional tests (one weak topic, one strong topic to defend speed).
- Sun: 1 short PYQ block (25 questions, 60 min) + error log + plan next week.

### R rotation (spaced repetition)

For every topic, schedule a 30-min revision at day 7, day 21, day 60 after first learning. Easiest way: maintain a column in a spreadsheet `topic | last_revised | next_due`. Each weekday Block 3 picks the highest-overdue topic.

### Sequence — deeper second pass

| Weeks | Focus pair (deep) | Secondary (R only) |
|---|---|---|
| Sep 01–14 | Probability + Statistics | LA, CO |
| Sep 15–28 | Programming + DS + Algorithms | Probability |
| Sep 29–Oct 12 | DBMS + Warehousing | PDSA |
| Oct 13–26 | Machine Learning (full) | DBW, Probability |
| Oct 27–Nov 09 | Linear Algebra (deep — eigen/projection drills) + AI | ML, PDSA |
| Nov 10–22 | Weak-topic block (use error log to pick) | rest cycled |
| Nov 23–29 | Speed drills on top-3 topics (PS, PDSA, ML) | DBW, LA |

### Practice load through Phase 2

| Activity | Phase 2 total |
|---|---|
| Topic-wise test-series tests | ~25 |
| Sectional mocks (timed, 1 hr) | ~25 |
| PYQs from 2024 (full set) | done by Sep 30 |
| PYQs from 2025 (full set) | done by Oct 31 |
| PYQs from 2026 (full set) | done by Nov 30 |
| Full-length mocks | 2 (Nov 22, Nov 29) |

**Phase 2 gate (Nov 29):** all 3 DA PYQs solved end-to-end at least once, ≥ 50 test-series attempts logged, error log has ≥ 80 entries categorized by root cause.

---

## 5. Phase 3 — Practice-heavy (Dec 2026 → Jan 2027, 9 weeks)

Pillar mix flips: C nearly zero (only for unresolved error-log gaps), R + P dominate.

### Weekly pattern (Phase 3)

- 2 full-length mocks/week (Wed + Sun, strict 3-hr, on-screen calculator).
- Mock review = 2× mock time. Every wrong answer → error log → fix in the source sheet → re-attempt the same Q at end of week.
- 1 dedicated R day per week (Mon): cycle 3 summary sheets, re-derive 5 formulas blank.
- 2 days/week for **revisit PYQs** (now timed in batches of 25 in 45 min).

### Mock schedule (12 total)

| Week | Dates | Mocks | Focus on review |
|---|---|---|---|
| 1 | Nov 30–Dec 06 | M1 | Time management baseline |
| 2 | Dec 07–13 | M2 | Probability + LA bottlenecks |
| 3 | Dec 14–20 | M3 | DBW SQL/normalization speed |
| 4 | Dec 21–27 | M4, M5 | PDSA + ML mixed |
| 5 | Dec 28–Jan 03 | M6, M7 | All MSQs across mocks |
| 6 | Jan 04–10 | M8, M9 | Calculator drills + GA |
| 7 | Jan 11–17 | M10, M11 | Replicate exam slot timing |
| 8 | Jan 18–24 | M12 | Final calibration |

**Phase 3 gate (Jan 24):** mock score band stabilized within ±5 marks across last 4 mocks. If still volatile → root cause is consistency, not knowledge → focus week 8 entirely on error-log fixes.

### Test-series usage in Phase 3
- Mix your purchased series + 1 reputable second series if affordable (different question style hardens you).
- Do NOT keep buying more series. After 12 quality mocks, more mocks have diminishing returns vs review depth.

---

## 6. Phase 4 — Taper (Feb 01 → exam day, ~1 week)

- No new questions. No new concept videos.
- Daily: 1 hr summary-sheet revision per top-4 topic + GA quick sheet.
- 1 light mock 4 days before exam, then stop.
- Sleep ≥ 7.5 hrs nightly.
- Day before: read summary sheets once, error log once, GA tricks once. Done.

---

## 7. Concrete deliverables (track these as proof of progress)

| Artifact | Lives in | Target count by exam |
|---|---|---|
| Summary sheets | `/notes/summary/` | 14 (one per topic block) |
| Formula sheets | `/notes/formulas/` | 7 (one per syllabus topic) |
| Error log spreadsheet | `/notes/error_log.xlsx` | ≥ 150 entries |
| PYQ solved sets | `/notes/pyq/{2024,2025,2026}/` | All Q11–Q65 each year, 2 passes |
| Mock attempts (with score + review) | `/notes/mocks/Mxx/` | 12 |
| Topic-wise + sectional tests | `/notes/sectionals/` | ≥ 50 |
| Python sandbox notebooks | `/notes/sandbox/` | 1 per ML/PS concept that was unclear |
| SQL sandbox scripts | `/notes/sandbox/sql/` | 1 per nested/self-join/aggregation pattern |

---

## 8. Pillar-by-pillar rules

### Concept (C)
- One pass = read once + take notes by hand.
- If you cannot explain it in 60 seconds to an imaginary student, you do not know it. Re-do.
- Never finish a C block without writing 3 lines: *what / when used / common trap*.

### Question (Q)
- Same day as C. No "I'll do problems tomorrow."
- Start with easy → standard → GATE-level. Skip easy if a topic feels stale.
- Mark each problem as: solved-clean / solved-with-help / not-solved. Re-attempt not-solved 3 days later.

### Revision (R)
- Spaced (day 7, 21, 60). Use spreadsheet to drive, do not pick by mood.
- Re-derive on blank paper, do not re-read notes top-down.
- 25–30 min per session is enough. Resist over-revising.

### Practice (P)
- Always timed. Always graded.
- Review > Attempt. 2-hr review for every 1-hr practice in Phase 3.
- Error log entry format: `date | source | Q# | topic | subtopic | wrong because | fix | re-attempt date`.

---

## 9. Adjustment rules

- **Falling behind by 1 week**: skip Sunday off-day for 2 weeks, do not skip topics.
- **Falling behind by 3+ weeks**: cut Phase 1's two weakest topics from "deep" to "survey" (1 sheet, 15 problems, move on). Never cut Phase 3.
- **A topic that scores < 50% in 3 consecutive sectionals**: declare it a *weak topic*; allocate the next 4 R sessions to it before resuming rotation.
- **A topic that scores > 90% in 2 sectionals**: cut its R frequency in half, redirect time to weak topics.

---

## 10. Single-line summary

> Concept seeds it. Question proves it. Revision keeps it. Practice ships it. Hit all four every day from Sep 1 — and let weightage decide which topic each pillar touches that day.
