---
title: "Subject 6: Artificial Intelligence"
parent: "Revision Docs"
nav_order: 6
---

# GATE DA · AI Revision Doc — Artificial Intelligence (Subject 6)

## How to Use & Weightage Map

Condensed revision of **Subject 6** — must-knows, GATE angle, traps. Full detail in **Modules 6.1–6.5**; formula lookup in the **AI Cheat Sheet**.

**Weightage:** AI is **~9.4%** ($10/6/8$ marks) with a **small, focused** syllabus — three pillars: search, logic, reasoning under uncertainty. High-value because the techniques are mechanical.

| Module | Topic                                          |
| ------ | ---------------------------------------------- |
| 6.1    | Uninformed & informed search (A\*)             |
| 6.2    | Adversarial search (minimax, $\alpha$-$\beta$) |
| 6.3    | Propositional logic                            |
| 6.4    | First-order / predicate logic                  |
| 6.5    | Reasoning under uncertainty (Bayes nets)       |

## 6.1 Uninformed & Informed Search

**Must know**

- **Uninformed:** BFS (queue, optimal for equal costs, $O(b^d)$), DFS (stack, not optimal, $O(bm)$ space), UCS (cost), IDS (optimal + $O(bd)$ space).
- **Informed:** greedy (min $h$, not optimal); **A\*** expands min $f=g+h$, optimal if $h$ **admissible** (tree) / **consistent** (graph).
- **Admissible** $h\le h^\ast$; $\max(h_1,h_2)$, $\min$, $\lvert h_1-h_2\rvert$ admissible, but **$h_1+h_2$ is not**.

**GATE angle:** A\* expansion order ($f=g+h$); which combination of heuristics is admissible; uninformed vs informed.

**Traps:** A\* orders by $g+h$ (not $h$); $h_1+h_2$ not admissible; BFS optimal only for equal step costs.

## 6.2 Adversarial Search

**Must know**

- **Minimax:** MAX takes max of children, MIN takes min, bottom-up; root $=$ optimal value.
- **Alpha-beta:** $\alpha=$ best (highest) for MAX so far, $\beta=$ best (lowest) for MIN so far; **prune when $\alpha\ge\beta$**.
- Same result as minimax; ideal ordering $\Rightarrow O(b^{m/2})$ leaves.

**GATE angle:** compute the minimax value/best move; $\alpha$/$\beta$ definitions; ranges of leaf values that cause pruning.

**Traps:** $\alpha=$ highest-for-MAX, $\beta=$ lowest-for-MIN; prune at $\alpha\ge\beta$; pruning never changes the value.

## 6.3 Propositional Logic

**Must know**

- $p\to q\equiv\neg p\vee q$; **contrapositive** $\equiv$ original; converse/inverse are not.
- **Tautology** (always true); to **disprove**, find one falsifying assignment (antecedent T, consequent F).
- **Entailment** $X\models Y\iff X\to Y$ valid $\iff X\wedge\neg Y$ unsatisfiable (one-directional).
- De Morgan: $\neg(p\wedge q)\equiv\neg p\vee\neg q$.

**GATE angle:** identify tautologies; logical equivalence; entailment meaning; translate a scenario into a formula.

**Traps:** converse $\ne$ original; entailment is one-way; “only if” $=A\to B$.

## 6.4 First-Order / Predicate Logic

**Must know**

- **“All P are Q”** $=\forall x\,(P(x)\to Q(x))$; **“some P is Q”** $=\exists x\,(P(x)\wedge Q(x))$. ($\forall$ with $\to$, $\exists$ with $\wedge$.)
- **Quantifier negation:** $\neg\forall x\,P\equiv\exists x\,\neg P$, $\neg\exists x\,P\equiv\forall x\,\neg P$.
- **Validity:** $\forall\Rightarrow\exists$ valid (non-empty domain); $\exists\not\Rightarrow\forall$. **$\forall x\,\exists y\not\equiv\exists y\,\forall x$**.
- Contrapositives make different-looking FOL statements equivalent.

**GATE angle:** spot the wrong translation ($\forall$ with $\wedge$); quantifier validity; “all P except R” modeling.

**Traps:** $\forall$ with $\wedge$ (the #1 error); mixed-quantifier order matters.

## 6.5 Reasoning Under Uncertainty (Bayes Nets)

**Must know**

- **Factorized joint** $P(X_1,\dots,X_n)=\prod_i P(X_i\mid \text{Parents}(X_i))$ (parents only).
- **d-separation:** chain $X\to Y\to Z$ and fork $X\leftarrow Y\to Z$ are **blocked** (independent) when $Y$ is observed; **collider** $X\to Y\leftarrow Z$ is the opposite — **opens** (dependent) when $Y$ or a descendant is observed.
- **Inference:** variable elimination / enumeration $=$ **exact**; rejection / likelihood-weighting / Gibbs / MCMC $=$ **approximate**.

**GATE angle:** compute a joint from CPTs; conditional-independence (collider) reasoning; classify exact vs approximate inference.

**Traps:** collider conditioning **induces** dependence; VE is exact, sampling is approximate; use parents only.

## Traps & Exam Strategy

**Highest-cost traps**

1. **A\* orders by $f=g+h$**; $h_1+h_2$ is not admissible.
2. **$\alpha$ highest-for-MAX, $\beta$ lowest-for-MIN; prune at $\alpha\ge\beta$.**
3. **Converse $\ne$ original**; entailment is one-directional.
4. **$\forall$ pairs with $\to$, $\exists$ with $\wedge$**; $\forall x\exists y\ne\exists y\forall x$.
5. **Collider** conditioning makes parents **dependent**.
6. **VE exact; sampling approximate.**

**Strategy**

- Small syllabus — **fully coverable**. Drill A\* tracing, alpha-beta pruning, the logic translation patterns, and Bayes-net joints.
- Many AI questions are **figure-based** (game trees, search graphs, Bayes nets) — read the diagram carefully and apply the mechanical rule.

_(Full worked PYQs: Modules 6.1–6.5. Formula lookup: AI Cheat Sheet.)_
