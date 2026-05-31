---
title: "Artificial Intelligence"
parent: "Cheat Sheets"
nav_order: 6
---

# GATE DA · AI Cheat Sheet — Artificial Intelligence Reference

## Search (uninformed + A*)

| Strategy | Frontier | Complete | Optimal | Space |
| --- | --- | --- | --- | --- |
| BFS | queue | yes | yes* | $O(b^d)$ |
| DFS | stack | graph: yes | no | $O(bm)$ |
| UCS | PQ on $g$ | yes | yes | high |
| IDS | iter. DFS | yes | yes* | $O(bd)$ |

*equal step costs. **A\*:** expand min $f=g+h$; optimal if $h$ **admissible** (tree) / **consistent** (graph). Greedy uses $h$ only.
- **Admissible** $h\le h^*$. $\max(h_1,h_2),\min,\lvert h_1-h_2\rvert,\tfrac12(h_1+h_2)$ admissible; **$h_1+h_2$ not**.

## Adversarial Search

- **Minimax:** MAX $=\max$ children, MIN $=\min$ children, bottom-up.
- **Alpha-beta:** $\alpha=$ highest value for MAX so far, $\beta=$ lowest for MIN so far.
  - MIN node: $\beta=\min(\beta,\text{child})$; prune if $\beta\le\alpha$.
  - MAX node: $\alpha=\max(\alpha,\text{child})$; prune if $\alpha\ge\beta$.
- Same value as minimax; ideal ordering $\Rightarrow O(b^{m/2})$ leaves.

## Propositional Logic

- $p\to q\equiv\neg p\vee q\equiv\neg q\to\neg p$ (contrapositive). Converse $q\to p$ and inverse $\neg p\to\neg q$ are **not** equivalent.
- $p\to q$ is **false only at** $p=\text{T},q=\text{F}$.
- De Morgan: $\neg(p\wedge q)\equiv\neg p\vee\neg q$; $\neg(p\vee q)\equiv\neg p\wedge\neg q$.
- **Tautology:** true for all assignments (disprove by one falsifier).
- **Entailment:** $X\models Y\iff X\to Y$ valid $\iff X\wedge\neg Y$ unsatisfiable.
- $n$ variables $\Rightarrow 2^n$ truth-table rows.

## First-Order Logic

- **“All P are Q”** $=\forall x\,(P(x)\to Q(x))$; **“some P is Q”** $=\exists x\,(P(x)\wedge Q(x))$.
- **Negation:** $\neg\forall x\,P\equiv\exists x\,\neg P$; $\neg\exists x\,P\equiv\forall x\,\neg P$.
- **Valid (non-empty domain):** $\forall x\,P\to\exists x\,P$. **Not valid:** $\exists\to\forall$, $\forall x\,P\to\exists x\,\neg P$.
- $\forall x\,\forall y\equiv\forall y\,\forall x$; **$\forall x\,\exists y\not\equiv\exists y\,\forall x$** (but $\exists y\,\forall x\Rightarrow\forall x\,\exists y$).

## Bayesian Networks & Inference

- **Factorized joint:** $P(X_1,\dots,X_n)=\prod_i P(X_i\mid \text{Parents}(X_i))$.
- **d-separation** (observing the middle node):
  - chain $X\to Y\to Z$: **blocked** (independent).
  - fork $X\leftarrow Y\to Z$: **blocked** (independent).
  - **collider** $X\to Y\leftarrow Z$: **opened** (dependent) when $Y$ or a descendant is observed.
- **Inference:** variable elimination, enumeration $=$ **exact**; rejection / likelihood-weighting / Gibbs / MCMC $=$ **approximate**.
- Bayes: $P(A\mid B)=\dfrac{P(B\mid A)P(A)}{P(B)}$; marginal $P(Y)=\sum_x P(Y\mid x)P(x)$.

*(Concept recap: AI Revision Doc. Full worked PYQs: Modules 6.1–6.5.)*
