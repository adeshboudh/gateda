---
title: "6.2 Adversarial Search"
parent: "Module 6: Artificial Intelligence"
nav_order: 2
---

# GATE DA · AI Module 6.2 — Adversarial Search (Minimax & Alpha-Beta Pruning)

## Exam Relevance

**Where this sits:** Artificial Intelligence $\rightarrow$ *Adversarial Search* — game trees, minimax, and alpha-beta pruning. Module **2 of 5** in Subject 6.

**Weightage:** part of AI's **~9.4%**; adversarial search shows up **every year** (3 of the 17 AI PYQs) and is high-yield because the technique is mechanical. Directly tested PYQs:
- **2026 Q30** (NAT) — compute the minimax value / best strategy at the root.
- **2024 Q25** (MCQ) — the definitions of $\alpha$ and $\beta$.
- **2025 Q43** (MCQ) — ranges of leaf values that trigger alpha-beta pruning.

> **Why it matters:** minimax is just *MAX takes the max, MIN takes the min*, bottom-up. Alpha-beta adds one rule — **prune when $\alpha\ge\beta$** — and never changes the answer. Master the bookkeeping and these are quick, reliable marks.

## Part 1 — Theory & Math

### A. The game setting
Two-player, **zero-sum**, perfect-information, turn-taking games. **MAX** maximizes the utility; **MIN** minimizes it. The **game tree** has states as nodes, moves as edges, and terminal **utilities** at the leaves.

### B. Minimax
Propagate values **bottom-up** from the leaves:
- a **MAX** node takes the **maximum** of its children,
- a **MIN** node takes the **minimum** of its children.

The **minimax value at the root** is the best utility MAX can guarantee assuming MIN plays optimally; the child achieving it is MAX's **best move/strategy**.

### C. Minimax properties
- **Complete** (finite tree) and **optimal** against an optimal opponent.
- Time $O(b^m)$, space $O(bm)$ (depth-first). $b=$ branching factor, $m=$ tree depth.

### D. Alpha-beta pruning
Same result as minimax, but it skips branches that cannot change the decision.
- **$\alpha$** = the **highest** value MAX can guarantee so far along the path (MAX's lower bound).
- **$\beta$** = the **lowest** value MIN can guarantee so far (MIN's upper bound).
- **Prune when $\alpha\ge\beta$.** *(2024 Q25: $\alpha=$ highest for MAX, $\beta=$ lowest for MIN.)*

### E. The two cutoff conditions (process children left to right)
- At a **MIN** node: update $\beta=\min(\beta,\text{child})$; if $\beta\le\alpha$, **prune** the remaining children (MAX already has a better option elsewhere).
- At a **MAX** node: update $\alpha=\max(\alpha,\text{child})$; if $\alpha\ge\beta$, **prune** the remaining children.

### F. Efficiency
- With **ideal move ordering**, alpha-beta examines about $O(b^{m/2})$ leaves — effectively **doubling** the searchable depth.
- Worst-case (bad ordering): no pruning, same $O(b^m)$ as minimax.
- **Pruning never changes the minimax value or the chosen move** — only the work done.

### G. Traps GATE exploits
1. $\alpha$ is MAX's **lower bound** (highest so far); $\beta$ is MIN's **upper bound** (lowest so far) — don't swap.
2. The prune condition is **$\alpha\ge\beta$**.
3. Alpha-beta returns the **same** value as minimax — never a different one.
4. The number of nodes pruned depends on **child ordering**.
5. MAX $=\max$ of children, MIN $=\min$ — keep the levels straight.

## Part 2 — How to Solve (Method)

### Minimax computation
1. Write the leaf (terminal) utilities.
2. Propagate up: each **MIN** node $=\min$ of its children; each **MAX** node $=\max$.
3. The root value is the outcome; the branch achieving it is the **best strategy**. *(2026 Q30.)*

### Alpha-beta definitions
$\alpha=$ highest value found so far on the path (for MAX); $\beta=$ lowest so far (for MIN). *(2024 Q25.)*

### Alpha-beta tracing / pruning-range problems
1. DFS **left to right**, carrying $(\alpha,\beta)$ down and values up.
2. **MAX** node: $\alpha=\max(\alpha,\text{child})$; prune the rest if $\alpha\ge\beta$.
3. **MIN** node: $\beta=\min(\beta,\text{child})$; prune the rest if $\beta\le\alpha$.
4. For “for what value of leaf $x$ is the next child pruned?”: find the bound ($\alpha$ or $\beta$) set by the already-seen siblings, then write the cutoff inequality. *(2025 Q43.)*

### Mistakes that cost marks
- Swapping the roles of $\alpha$ and $\beta$.
- Pruning at the wrong condition (it's $\alpha\ge\beta$).
- Believing pruning changes the optimal value or move.

## Part 3 — Worked Examples

### Example 1 — Minimax best strategy *(2026 Q30 · NAT)*
**Q.** MAX plays at the root (strategies 1, 2, 3) to three MIN nodes; each MIN node has three leaves. Leaf utilities (left to right): $8,6,-1\,\mid \,1,5,7\,\mid \,-4,-3,-12$. Find MAX's best strategy.

**Solve.** Each MIN node takes the minimum of its three leaves:

| MAX strategy | MIN's leaves | MIN value |
| --- | --- | --- |
| 1 | $8,\ 6,\ -1$ | $-1$ |
| 2 | $1,\ 5,\ 7$ | $1$ |
| 3 | $-4,\ -3,\ -12$ | $-12$ |

The root (MAX) takes the maximum: $\max(-1,\,1,\,-12)=1$, achieved by **strategy 2**.

**Answer: 2.** *(The game value is $1$; MAX's best move is strategy 2.)*

---

### Example 2 — Definitions of $\alpha$ and $\beta$ *(2024 Q25 · MCQ)*
**Q.** “$\alpha$ is the __(m)__ value choice so far at any choice point along the path for the MAX player and $\beta$ is the __(n)__ value choice so far for the MIN player.” Which makes the statement valid? (A) m=highest, n=highest (B) m=lowest, n=highest (C) m=highest, n=lowest (D) m=lowest, n=lowest.

**Solve.** MAX keeps the **highest** value it has found so far (its guaranteed lower bound) $\Rightarrow$ $\alpha=$ highest. MIN keeps the **lowest** value so far (its guaranteed upper bound) $\Rightarrow$ $\beta=$ lowest.

**Answer: (C) m = highest, n = lowest.**

---

### Example 3 — Alpha-beta pruning ranges *(2025 Q43 · MCQ)*
**Q.** Two game trees; MAX at the top level, MIN at the second. For what ranges of $x$ and $y$ are the **right child of $B$** (Tree-1) and the **right child of $E$** (Tree-2) pruned?

**Tree-1:** root **A** (MAX) has children: leaf $2$ (left) and node **B** (MIN). $B$'s children: leaf $x$ (left), leaf $1$ (right — prune candidate).
**Tree-2:** root **C** (MAX) has children **D** (MIN) and **E** (MIN). $D$'s children: leaves $5, y$. $E$'s children: leaf $2$ (left), a leaf (right — prune candidate).

**Solve.**
*Tree-1:* A (MAX) sees its left child $2$, so $\alpha=2$ going into B. B (MIN) sees its left child $x$, so $\beta=x$. Prune B's right child when $\beta\le\alpha$, i.e. $x\le 2$. So $x\in(-\infty,\,2]$.

*Tree-2:* C (MAX) first evaluates D $=\min(5,y)$, giving $\alpha=\min(5,y)$ going into E. E (MIN) sees its left child $2$, so $\beta=2$. Prune E's right child when $\beta\le\alpha$, i.e. $2\le\min(5,y)$. Since $5\ge2$ always, this needs $y\ge 2$. So $y\in[2,\,\infty)$.

**Answer: (C) $x\in(-\infty,2]$ and $y\in[2,\infty)$.**

---

### Example 4 — A basic pruning trace *(original · Med)*
**Q.** Root is MAX with two MIN children. Left MIN node has leaves $3, 5$; right MIN node has leaves $2, 9$ (left to right). Which leaf is pruned, and what is the root value?

**Solve.** Left MIN $=\min(3,5)=3$, so $\alpha=3$ at the root going into the right MIN node. The right MIN node sees its first leaf $2$, so $\beta=2$. Now $\beta=2\le\alpha=3$ $\Rightarrow$ **prune** the right MIN's remaining leaf ($9$). Root $=\max(3,\ \le 2)=3$.

**Answer: the leaf $9$ is pruned; root value $=3$** (the same as full minimax). *Method:* a MIN node that already drops to $\le\alpha$ cannot help MAX, so its rest is cut.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** In a minimax tree, a MAX node returns the ____ of its children's values.
(A) minimum (B) maximum (C) average (D) sum

**Q2. ★ (MCQ)** A MIN node returns the ____ of its children's values.
(A) minimum (B) maximum (C) sum (D) median

**Q3. ★★ (MCQ)** Compared with full minimax, alpha-beta pruning returns a value that is
(A) less accurate (B) the same (C) always larger (D) random

**Q4. ★★ (MCQ)** In alpha-beta pruning, a branch is pruned when
(A) $\alpha>0$ (B) $\alpha\ge\beta$ (C) $\beta=0$ (D) $\alpha=\beta$ only

**Q5. ★★ (NAT)** A MIN node has children with values $7, 3, 9$. Its minimax value is __________ .

**Q6. ★★ (NAT)** A MAX root has three MIN children whose values are $4, 6, 2$. The root's minimax value is __________ .

**Q7. ★★ (MSQ)** Which statements about alpha-beta pruning are TRUE?
(A) It returns the same value as minimax. (B) The number of nodes pruned depends on child ordering. (C) With ideal ordering it examines about $O(b^{m/2})$ leaves. (D) It can change the optimal move.

**Q8. ★★ (MCQ)** For the MAX player, $\alpha$ is the
(A) lowest value so far (B) highest value guaranteed so far (C) average of children (D) number of leaves

**Q9. ★★★ (NAT)** MAX root with two MIN children. Left MIN leaves: $5, 8, 2$; right MIN leaves: $9, 1, 7$. The root's minimax value is __________ .

**Q10. ★★★ (MCQ)** At a MIN node during alpha-beta with inherited $\alpha=6$, the first child evaluates to $4$. What happens next?
(A) continue evaluating the remaining children (B) prune the remaining children (C) set $\alpha=4$ (D) return $6$

## Answer Key & Full Solutions

**Q1 — (B) maximum.** MAX maximizes.

**Q2 — (A) minimum.** MIN minimizes.

**Q3 — (B) the same.** Alpha-beta computes the exact minimax value; it only avoids work.

**Q4 — (B) $\alpha\ge\beta$.** The bounds cross, so the branch can't affect the decision.

**Q5 — 3.** $\min(7,3,9)=3$.

**Q6 — 6.** $\max(4,6,2)=6$.

**Q7 — (A), (B), (C).** Pruning preserves the value (A), depends on ordering (B), and with ideal ordering reaches $\sim O(b^{m/2})$ leaves (C). (D) is false — the optimal move is unchanged.

**Q8 — (B) highest value guaranteed so far.** $\alpha$ is MAX's lower bound.

**Q9 — 2.** Left MIN $=\min(5,8,2)=2$; right MIN $=\min(9,1,7)=1$; root $=\max(2,1)=2$.

**Q10 — (B) prune the remaining children.** At the MIN node $\beta=\min(\infty,4)=4$; now $\beta=4\le\alpha=6$, so the cutoff fires.

---

### How to read your score
- **8–10:** adversarial search is solid — on to **6.3 Propositional Logic**.
- **6–7:** re-drill the **prune condition $\alpha\ge\beta$** (Q4, Q10) and minimax propagation (Q5, Q6, Q9).
- **≤5:** re-read Part 1 B–E; lock in *MAX$=$max, MIN$=$min*, *$\alpha=$highest-for-MAX, $\beta=$lowest-for-MIN*, and *prune when $\alpha\ge\beta$*.
