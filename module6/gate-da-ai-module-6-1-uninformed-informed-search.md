---
title: "6.1 Uninformed & Informed Search"
parent: "Module 6: Artificial Intelligence"
nav_order: 1
---

# GATE DA · AI Module 6.1 — Uninformed & Informed Search

## Exam Relevance

**Where this sits:** Artificial Intelligence $\rightarrow$ *Search (uninformed + informed)* — the largest AI cluster. Module **1 of 5** in Subject 6.

**Weightage:** AI is **~9.4%** of DA (24 marks over 2024–26); **search is ~7 of the 17 AI questions**. Directly tested PYQs for this module:
- **2026 Q13** (MCQ) — identify which algorithm is *not* uninformed.
- **2024 Q23** (MCQ) — which combination of two admissible heuristics is always admissible.
- **2025 Q44** (MCQ) — the node-expansion order of **A\***.
- **2024 Q44** (MCQ) — BFS vs DFS states expanded (also in Module 2.8; convention-sensitive).

> **Why it matters:** the marks come from two mechanical skills — **tracing A\*** with $f=g+h$, and **reasoning about heuristic admissibility**. Lock in the property tables and these are reliable points.

## Part 1 — Theory & Math

### A. Search problem framing
A search problem = **initial state**, **actions/successor function**, **goal test**, **path cost**. *Tree search* may revisit states; *graph search* keeps an explored/reached set so states are **not re-expanded**. Key parameters: **$b$** branching factor, **$d$** depth of the shallowest goal, **$m$** maximum depth.

### B. Uninformed (blind) search
No information beyond the goal test.

| Strategy | Frontier | Complete? | Optimal? | Time | Space |
| --- | --- | --- | --- | --- | --- |
| BFS | FIFO queue | Yes ($b$ finite) | Yes *(equal step costs)* | $O(b^d)$ | $O(b^d)$ |
| Uniform-Cost (UCS) | priority queue on $g$ | Yes | Yes *(costs $\ge0$)* | — | — |
| DFS | LIFO stack | Graph: yes / Tree: no | No | $O(b^m)$ | $O(bm)$ |
| Depth-Limited (DLS) | DFS with limit $L$ | if $L\ge d$ | No | $O(b^L)$ | $O(bL)$ |
| Iterative Deepening (IDS) | repeated DLS | Yes | Yes *(equal costs)* | $O(b^d)$ | $O(bd)$ |

- **BFS** finds the fewest-edges path but uses $O(b^d)$ memory.
- **DFS** uses little memory $O(bm)$ but is not optimal and can loop (tree search).
- **IDS** combines BFS optimality with DFS memory — the go-to uninformed method for large spaces.

### C. Informed (heuristic) search
Use a heuristic $h(n)$ estimating cost from $n$ to the goal.
- **Greedy best-first:** expand the node with minimum $h(n)$. Fast, but **not optimal / not complete**.
- **A\***: expand the node with minimum
$$f(n)=g(n)+h(n),$$
where $g(n)$ is the cost from the start to $n$. A\* is **optimal and complete** when $h$ is **admissible** (tree search) or **consistent** (graph search).

### D. Admissible vs consistent heuristics
- **Admissible:** $h(n)\le h^*(n)$ — never overestimates the true remaining cost $h^*$. Guarantees A\* optimality in **tree** search.
- **Consistent (monotone):** $h(n)\le c(n,n')+h(n')$ for every successor $n'$. Consistency $\Rightarrow$ admissibility; needed for A\* optimality in **graph** search.

### E. Combining heuristics (a GATE favourite)
Given admissible $h_1,h_2$ (each $\le h^*$):

| Combination | Admissible? | Why |
| --- | --- | --- |
| $\max(h_1,h_2)$ | **Yes** (and dominant) | still $\le h^*$; the tightest |
| $\min(h_1,h_2)$ | **Yes** | $\le$ each $\le h^*$ |
| $\lvert h_1-h_2\rvert$ | **Yes** | $\le\max(h_1,h_2)\le h^*$ |
| $\tfrac12(h_1+h_2)$ | **Yes** | average $\le\max\le h^*$ |
| $h_1+h_2$ | **No** | can exceed $h^*$ (e.g. $h_1=h_2=h^*\Rightarrow 2h^*$) |

**Dominance:** if $h_2(n)\ge h_1(n)$ for all $n$ (both admissible), A\* with $h_2$ expands **fewer (or equal)** nodes.

### F. Traps GATE exploits
1. A\* needs **admissible** (tree) / **consistent** (graph) $h$ for optimality.
2. **Greedy $\ne$ A\***: greedy ignores $g$, so it is not optimal.
3. **$h_1+h_2$ is not admissible**; $\max,\min,\lvert \text{diff}\rvert,$ average are.
4. **BFS is optimal only for equal step costs** — use UCS for varying costs.
5. **DFS is not optimal** and can fail to terminate in infinite spaces.
6. A\* orders by $f=g+h$ — not by $h$ alone (greedy) or $g$ alone (UCS).

## Part 2 — How to Solve (Method)

### Classify an algorithm (uninformed vs informed)
- **Uninformed:** BFS, DFS, UCS, depth-limited, iterative deepening.
- **Informed:** greedy, A\* (anything using a heuristic $h$). *(2026 Q13: A\* is informed.)*

### Admissibility of a combined heuristic
Ask: can it ever exceed $h^*$? $\max,\min,\lvert h_1-h_2\rvert,$ average stay $\le h^*$ (admissible); the **sum can overshoot** (not admissible). *(2024 Q23.)*

### Tracing A\* (the core skill)
1. Start node: $g=0$, $f=h(\text{start})$.
2. Repeatedly **expand the frontier node with the smallest $f=g+h$** (break ties by a stated rule).
3. For each successor: $g'=g(\text{current})+\text{edge cost}$, $f'=g'+h(\text{successor})$; insert, or update if a cheaper $g'$ is found.
4. Record the **expansion order**; stop when the goal is expanded. *(2025 Q44.)*

### BFS vs DFS expansion counts
Convention-sensitive. Under the standard reading (BFS uses an **early goal test**, DFS does not), BFS expands fewer than DFS. *(2024 Q44 — full treatment in Module 2.8.)*

### Mistakes that cost marks
- Ordering A\* by $h$ (greedy) or $g$ (UCS) instead of $f=g+h$.
- Forgetting to keep the **cheaper $g$** when a state is reached again.
- Assuming $h_1+h_2$ is admissible.

## Part 3 — Worked Examples

### Example 1 — Uninformed vs informed *(2026 Q13 · MCQ)*
**Q.** Which of the following is **NOT** an example of uninformed search? (A) Breadth First Search (B) Depth First Search (C) A\* Search (D) Depth-limited Search.

**Solve.** BFS, DFS, and depth-limited search use no domain knowledge — uninformed. **A\*** uses a heuristic $h(n)$, so it is **informed**.

**Answer: (C) A\* Search.**

---

### Example 2 — Always-admissible combination *(2024 Q23 · MCQ)*
**Q.** $h_1,h_2$ are admissible heuristics in A\*. Which expression is **always** admissible? (A) $h_1+h_2$ (B) $h_1\times h_2$ (C) $h_1/h_2\ (h_2\ne0)$ (D) $\lvert h_1-h_2\rvert$.

**Solve.** Admissible means $\le h^*$. Since $h_1\le h^*$ and $h_2\le h^*$:
$$\lvert h_1-h_2\rvert \le \max(h_1,h_2)\le h^*,$$
so (D) is always admissible. (A) fails: if $h_1=h_2=h^*$ then $h_1+h_2=2h^*>h^*$. (B) and (C) can overshoot too.

**Answer: (D) $\lvert h_1-h_2\rvert$.**

---

### Example 3 — A\* expansion order *(2025 Q44 · MCQ)*
**Q.** Run A\* (priority queue on $f=g+h$) from $S$ to $G$ on the graph below; give the order in which nodes are **expanded**.

**Edges (directed, with action cost):**

| Edge | Cost | Edge | Cost |
| --- | --- | --- | --- |
| $S\to A$ | 4 | $B\to C$ | 2 |
| $S\to E$ | 1 | $E\to C$ | 2 |
| $A\to B$ | 2 | $C\to D$ | 3 |
| $D\to G$ | 3 | | |

**Heuristics:** $h(A)=2,\ h(B)=2,\ h(C)=6,\ h(D)=2,\ h(E)=6,\ h(G)=0$.

**Solve** ($f=g+h$):
- Expand **$S$** ($g=0$). Children: $A\,(g{=}4,f{=}4{+}2{=}6)$, $E\,(g{=}1,f{=}1{+}6{=}7)$.
- Smallest $f$: expand **$A$** $(f{=}6)$. Child $B\,(g{=}6,f{=}6{+}2{=}8)$. Frontier: $E{=}7, B{=}8$.
- Expand **$E$** $(f{=}7)$. Child $C\,(g{=}1{+}2{=}3,f{=}3{+}6{=}9)$. Frontier: $B{=}8, C{=}9$.
- Expand **$B$** $(f{=}8)$. Child $C$ via $B$: $g{=}6{+}2{=}8,f{=}14$ — worse than $C(g{=}3,f{=}9)$, keep $C{=}9$. Frontier: $C{=}9$.
- Expand **$C$** $(f{=}9,\ g{=}3)$. Child $D\,(g{=}3{+}3{=}6,f{=}6{+}2{=}8)$. Frontier: $D{=}8$.
- Expand **$D$** $(f{=}8)$. Child $G\,(g{=}6{+}3{=}9,f{=}9{+}0{=}9)$.
- Expand **$G$** — goal.

**Order: $S, A, E, B, C, D, G$ — option (C).** *Method:* always expand the smallest $f$; keep the cheaper $g$ when $C$ is reached twice.

---

### Example 4 — BFS vs DFS states expanded *(2024 Q44 · MCQ · convention-sensitive)*
**Q.** Start state $1$; successor of $n$ is $\{n+1, n+2\}$; expand in ascending order, no re-adding expanded states; goal $6$. Comparing states expanded to reach goal $6$: (A) BFS more (B) DFS more (C) equal (D) neither reaches.

**Solve** (standard reading: BFS uses an **early goal test**, DFS does not):
- **BFS:** expand $1\,\{\to2,3\}$, $2\,\{\to3,4\}$, $3\,\{\to4,5\}$, $4\,\{\to5,\mathbf 6\}$ — goal **generated** while expanding $4$. BFS expanded $\{1,2,3,4\}=4$ states.
- **DFS** (no early goal test) plunges $1\to2\to3\to4\to5\to6$, expanding more than $4$ before the goal is reached on expansion.

**Answer: (B) DFS expands more than BFS.** *Caveat:* this item is convention-sensitive (the count depends on when the goal test is applied); (B) follows the standard BFS-early-goal-test convention. Full discussion in **Module 2.8** (Graphs).

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** Which search uses a FIFO queue for its frontier?
(A) DFS (B) BFS (C) A\* (D) greedy best-first

**Q2. ★ (MCQ)** The A\* evaluation function is
(A) $f=h$ (B) $f=g$ (C) $f=g+h$ (D) $f=g-h$

**Q3. ★★ (MCQ)** A heuristic is admissible if it
(A) never underestimates the cost (B) never overestimates the true cost (C) equals $g$ (D) is always $0$

**Q4. ★★ (MSQ)** Given admissible $h_1,h_2$, which of the following are admissible?
(A) $\max(h_1,h_2)$ (B) $\min(h_1,h_2)$ (C) $h_1+h_2$ (D) $\tfrac12(h_1+h_2)$

**Q5. ★★ (MCQ)** Which uninformed strategy is complete and optimal (for equal step costs) with only $O(bd)$ memory?
(A) BFS (B) DFS (C) Iterative deepening (D) greedy best-first

**Q6. ★★ (MCQ)** Greedy best-first search expands the node with the lowest
(A) $g(n)$ (B) $h(n)$ (C) $g(n)+h(n)$ (D) depth

**Q7. ★★ (MCQ)** For A\* **graph** search to guarantee optimality, the heuristic must be
(A) admissible (B) consistent (C) zero everywhere (D) random

**Q8. ★★ (NAT)** In A\*, node $X$ has $g=5,h=4$ and node $Y$ has $g=3,h=7$. The $f$-value of the node expanded first is __________ .

**Q9. ★★★ (MCQ)** If admissible heuristic $h_2$ dominates admissible $h_1$ ($h_2\ge h_1$ everywhere), then A\* using $h_2$
(A) expands more nodes (B) expands fewer or equal nodes (C) becomes non-optimal (D) becomes incomplete

**Q10. ★★ (MCQ)** Depth-first search is **not** guaranteed to
(A) use a stack (B) find the optimal (shortest) path (C) explore reachable vertices (D) use less memory than BFS

## Answer Key & Full Solutions

**Q1 — (B) BFS.** A FIFO queue gives level-by-level exploration.

**Q2 — (C) $f=g+h$.** Cost so far plus estimated cost to go.

**Q3 — (B) never overestimates the true cost.** $h(n)\le h^*(n)$.

**Q4 — (A), (B), (D).** $\max,\min,$ and the average all stay $\le h^*$. (C) $h_1+h_2$ can exceed $h^*$ — not admissible.

**Q5 — (C) iterative deepening.** Optimal/complete for equal costs with $O(bd)$ memory (BFS needs $O(b^d)$).

**Q6 — (B) $h(n)$.** Greedy ignores $g$ and uses the heuristic only.

**Q7 — (B) consistent.** Admissibility suffices for **tree** search; **graph** search needs consistency for optimality.

**Q8 — 9.** $f(X)=5+4=9$, $f(Y)=3+7=10$; the smaller is $X$ with $f=9$, expanded first.

**Q9 — (B) expands fewer or equal nodes.** A more dominant (tighter) admissible heuristic never expands more nodes.

**Q10 — (B) find the optimal path.** DFS is not optimal; it does use a stack, explores reachable vertices, and is memory-light.

---

### How to read your score
- **8–10:** search is solid — on to **6.2 Adversarial Search** (minimax & alpha-beta).
- **6–7:** re-drill **A\* tracing** (Example 3, Q2, Q8) and **admissibility** (Q3, Q4).
- **≤5:** re-read Part 1 B–E; lock in the uninformed property table, $f=g+h$, and *admissible $=$ never overestimates*.
