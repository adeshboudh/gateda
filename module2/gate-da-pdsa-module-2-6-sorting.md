---
title: "2.6 Sorting"
parent: "Module 2: Programming & DSA"
nav_order: 6
---

# GATE DA · PDSA Module 2.6 — Sorting

## Exam Relevance

**Where this sits:** Programming, Data Structures & Algorithms $\rightarrow$ _Sorting_. **"Sorting comparisons" is a flagged recurring pattern** — the richest PDSA sub-topic.

**Weightage:** PDSA is the **#2 subject** ($18.8\%$). Sorting questions are precise swap/comparison-count problems:

- **2024 Q30** — **quicksort swaps** on a sorted array (last-element pivot) $= 0$
- **2025 Q29** — **insertion-sort swaps**: which $x$ give exactly two swaps $\rightarrow \{10, 14\}$
- **2026 Q49** — **bubble vs insertion comparison counts** on a near-sorted array
- (**2026 Q15** — quicksort's average-case recurrence — covered in Module 2.7)

> **Why it matters:** these are count-and-trace questions. Memorize the **complexity/stability table** and two facts — _bubble-sort swaps = number of inversions_, and _quicksort's worst case is the already-sorted input_ — and most of these become mechanical.

## Part 1 — Theory & Math

### A. What to track per algorithm

**Stability:** a sort is _stable_ if equal keys keep their original relative order. **In-place:** uses $O(1)$ (or $O(\log n)$) extra space.

### B. The five sorts

- **Selection sort:** repeatedly select the minimum of the unsorted part and swap it into place. **Always** $\binom{n}{2} = \tfrac{n(n-1)}{2}$ comparisons (input-independent); only $n-1$ swaps. Not stable; in-place.
- **Bubble sort:** repeatedly swap adjacent out-of-order pairs. Basic version makes $\tfrac{n(n-1)}{2}$ comparisons; with an early-stop flag, best case $O(n)$ on sorted input. **Number of swaps $=$ number of inversions.** Stable; in-place.
- **Insertion sort:** insert each element into the sorted prefix by shifting. Best $O(n)$ (already sorted), worst $\Theta(n^2)$. Total shifts $=$ inversions. **Excellent on nearly-sorted / small inputs.** Stable; in-place.
- **Merge sort:** divide in half, sort each, **merge**. $\Theta(n \log n)$ in **all** cases. Stable, but needs $O(n)$ extra space (not in-place).
- **Quick sort:** **partition** around a pivot, recurse. Average $\Theta(n \log n)$; **worst $\Theta(n^2)$** (e.g. already-sorted input with a first/last-element pivot). In-place ($O(\log n)$ stack); not stable (typical).

### C. Complexity & stability table

| Algorithm | Best               | Average            | Worst              | Space       | Stable |
| --------- | ------------------ | ------------------ | ------------------ | ----------- | ------ |
| Selection | $\Theta(n^2)$      | $\Theta(n^2)$      | $\Theta(n^2)$      | $O(1)$      | No     |
| Bubble    | $\Theta(n)$ \*     | $\Theta(n^2)$      | $\Theta(n^2)$      | $O(1)$      | Yes    |
| Insertion | $\Theta(n)$        | $\Theta(n^2)$      | $\Theta(n^2)$      | $O(1)$      | Yes    |
| Merge     | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $O(n)$      | Yes    |
| Quick     | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $\Theta(n^2)$      | $O(\log n)$ | No     |

\* bubble's $\Theta(n)$ best case needs the early-termination optimization.

### D. Key facts GATE leans on

- **Inversions:** an inversion is a pair $(i,j)$ with $i<j$ but $A[i] > A[j]$. **Bubble-sort swaps $=$ insertion-sort shifts $=$ number of inversions.** A sorted array has 0 inversions; reverse-sorted has $\binom{n}{2}$.
- **Selection sort** minimizes _swaps_ ($n-1$) but never saves _comparisons_.
- **Merge sort** gives a guaranteed $\Theta(n \log n)$ and stability, at the cost of $O(n)$ space.
- **Quicksort's worst case** is the _sorted_ (or reverse-sorted) input under a first/last pivot — ironically needing **0 swaps** but $\Theta(n^2)$ comparisons.
- **Comparison-sorting lower bound:** any comparison sort needs $\Omega(n \log n)$ comparisons in the worst case.

### E. Common traps GATE exploits

1. **Selection-sort comparisons are always $\tfrac{n(n-1)}{2}$** regardless of input order.
2. **Bubble/insertion best case $O(n)$** only on (nearly) sorted input (and bubble needs the early-stop flag).
3. **Quicksort worst case** is the _already-sorted_ array with a first/last pivot — not a random one.
4. **Merge sort is not in-place** ($O(n)$ extra); it _is_ stable.
5. **Stability:** merge, insertion, bubble are stable; selection and (typical) quicksort are not.
6. **Swaps $\ne$ comparisons** — read which the question wants.

## Part 2 — How to Solve (Method)

### Counting swaps / shifts

- **Bubble sort swaps** and **insertion sort shifts** both equal the **number of inversions** of the array. Count inversions directly: for each later element, how many earlier elements exceed it.
- **Selection sort swaps** $= n-1$ (one per pass), independent of the data.

### Counting comparisons

- **Selection sort:** always $\tfrac{n(n-1)}{2}$.
- **Bubble sort (basic):** $\tfrac{n(n-1)}{2}$ (shrinking passes $(n-1)+(n-2)+\dots+1$).
- **Insertion sort:** for each element, count comparisons until it stops; an already-placed element costs **1** comparison, so a sorted array costs $n-1$ comparisons total.

### Tracing

Write the array after each pass (bubble/selection) or after each insertion (insertion sort), tracking the running swap/comparison count in a table. State your **convention** (e.g. basic vs optimized bubble; whether a self-swap counts).

### Identifying properties

Match the algorithm to the complexity/stability table. Spot best/worst inputs: **sorted** $\rightarrow$ insertion/bubble best, **quicksort worst** (first/last pivot); **reverse-sorted** $\rightarrow$ maximum inversions.

### Sanity checks

- Total inversions of a sorted array $= 0$; of a reverse-sorted array $= \binom{n}{2}$.
- Merge and quicksort run in $\Theta(n \log n)$ on average; if you derive $\Theta(n^2)$ for merge sort, re-check.
- Insertion-sort comparisons $\ge n-1$ always (one per inserted element).

## Part 3 — Worked Examples

E2–E4 are real GATE DA questions; E1 is a standard original.

---

### Example 1 — Insertion sort trace (comparisons & swaps) _(original · Easy–Med)_

**Q.** Sort `[5, 2, 4, 1]` by insertion sort. Count comparisons and shifts.

```
start [5,2,4,1]
i=1 (2): 2<5 shift            -> [2,5,4,1]   1 comp, 1 shift
i=2 (4): 4<5 shift, 4>2 stop  -> [2,4,5,1]   2 comp, 1 shift
i=3 (1): 1<5, 1<4, 1<2 (start)-> [1,2,4,5]   3 comp, 3 shift
```

**Comparisons $= 1+2+3 = 6$; shifts $= 1+1+3 = 5$.** The 5 shifts equal the **inversions** of `[5,2,4,1]`: $(5,2),(5,4),(5,1),(2,1),(4,1)$. _Method:_ shifts $=$ inversions.

---

### Example 2 — Insertion-sort swap count _(2025 Q29 · MSQ · Med–Hard)_

**Q.** Insertion sort is applied to `[1, 3, 5, 7, 9, 11, x, 15, 13]` and takes **exactly two swaps**. Select all possible $x$.
(A) 10 (B) 12 (C) 14 (D) 16

**Solve.** Total swaps $=$ total inversions. The prefix `1,3,5,7,9,11` is sorted (0 inversions); the pair $(15,13)$ contributes **1** inversion always. The element $x$ contributes: $a =$ (count of $\{1..11\}$ exceeding $x$) $+\,[x>15]+[x>13]$. Require total $= a + 1 = 2 \Rightarrow a = 1$:

- $x=10$: $\{11\}>10 \Rightarrow 1$; $[10>15]{=}0,[10>13]{=}0$. Inversions $=1+1=2$. ✅
- $x=12$: none of $\{1..11\}>12$; $0+0$. Inversions $=0+1=1$. ❌
- $x=14$: none $>14$; $[14>13]=1$. Inversions $=1+1=2$. ✅
- $x=16$: $[16>15]=1,[16>13]=1$. Inversions $=2+1=3$. ❌

**Answer: (A) 10 and (C) 14.** _Method:_ count inversions — insertion-sort swaps equal them.

---

### Example 3 — Bubble vs insertion comparisons _(2026 Q49 · MSQ · Med)_

**Q.** For `P = [1, 2, 3, 5, 4]`, let $N_1$ = comparisons by bubble sort, $N_2$ = comparisons by insertion sort. Which are correct?
(A) $N_1=10, N_2=4$ (B) $N_1 > N_2$ (C) insertion sort performs only one swap (D) both make at least one unnecessary comparison

**Solve.**

- **Bubble (basic):** $\tfrac{5\cdot 4}{2} = 10$ comparisons $\Rightarrow N_1 = 10$.
- **Insertion:** elements 2, 3, 5 each cost 1 comparison (already $\ge$ their left neighbour); element 4 costs 2 ($4<5$ shift, then $4>3$ stop). $N_2 = 1+1+1+2 = 5$, with exactly **one** swap (the $4 \leftrightarrow 5$ move).
- (A) is wrong: $N_2 = 5$, not 4. (B) $10 > 5$ ✅. (C) one swap ✅. (D) both compare already-ordered pairs that produce no swap (bubble's redundant later passes; insertion's stop-comparisons) ✅.

**Answer: (B), (C), (D).** _Method:_ trace each algorithm's comparison count; the trap is $N_2 = 5$.

---

### Example 4 — Quicksort swaps on a sorted array _(2024 Q30 · NAT · Med)_

**Q.** In-place quicksort with the **last** element as pivot, on `[60, 70, 80, 90, 100]`. The minimum number of swaps performed is \_\_\_.

**Solve.** With Lomuto partition, the pivot is the largest element and is already in its final position; every element is $\le$ pivot and already in order, so the only "swaps" are an index with **itself** ($i=j$) — **no actual element exchange** occurs, at any level of recursion.

**Answer: 0.** _Insight & trap:_ the same already-sorted input is quicksort's **worst case for comparisons** ($\Theta(n^2)$, since each partition peels off just one element) — zero swaps but maximal comparisons. (Convention: a self-swap with $i=j$ is not counted as a real swap.)

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** Which sort has $\Theta(n \log n)$ worst-case time?
(A) bubble (B) insertion (C) merge (D) quick

**Q2. ★ (MCQ)** Which sort has $\Theta(n \log n)$ average but $\Theta(n^2)$ worst case?
(A) selection (B) merge (C) quick (D) bubble

**Q3. ★★ (MCQ)** The number of comparisons made by selection sort on $n$ elements is
(A) $n-1$ (B) $n \log n$ (C) $\tfrac{n(n-1)}{2}$ (D) $n^2$

**Q4. ★★ (NAT)** The number of swaps bubble sort performs on `[3, 1, 2]` is ****\_\_**** .

**Q5. ★★ (MSQ)** Which sorting algorithms are **stable**?
(A) merge sort (B) insertion sort (C) selection sort (D) quick sort (typical)

**Q6. ★★ (MCQ)** The best-case time of insertion sort (input already sorted) is
(A) $O(1)$ (B) $O(n)$ (C) $O(n \log n)$ (D) $O(n^2)$

**Q7. ★★ (MCQ)** Quicksort with a first/last-element pivot attains its $\Theta(n^2)$ worst case when the input is
(A) random (B) already sorted (C) all elements equal only (D) of even length

**Q8. ★★ (NAT)** The number of comparisons insertion sort makes on an already-sorted array of 6 elements is ****\_\_**** .

**Q9. ★★ (MCQ)** The extra-space complexity of standard merge sort is
(A) $O(1)$ (B) $O(\log n)$ (C) $O(n)$ (D) $O(n \log n)$

**Q10. ★★ (NAT)** Selection sort on 5 elements performs exactly ****\_\_**** swaps.

## Answer Key & Full Solutions

**Q1 — (C) merge.** Merge sort is $\Theta(n \log n)$ in all cases. (Quick is $\Theta(n^2)$ worst; bubble/insertion $\Theta(n^2)$.)

**Q2 — (C) quick.** Quicksort averages $\Theta(n \log n)$ but degrades to $\Theta(n^2)$ with bad pivots.

**Q3 — (C) $\tfrac{n(n-1)}{2}$.** Selection sort always compares every pair across its passes, independent of input.

**Q4 — 2.** Inversions of `[3,1,2]`: $(3,1)$ and $(3,2)$. Bubble-sort swaps $=$ inversions $= 2$.

**Q5 — (A), (B).** Merge and insertion (and bubble) are stable; selection and typical quicksort are **not**.

**Q6 — (B) $O(n)$.** On sorted input each element needs one comparison and no shift — $n-1$ comparisons total.

**Q7 — (B) already sorted.** A sorted array with a first/last pivot peels off one element per partition, giving $\Theta(n^2)$.

**Q8 — 5.** Each of the $n-1 = 5$ elements (after the first) needs exactly one comparison on sorted input; no shifts.

**Q9 — (C) $O(n)$.** Standard merge sort needs an $O(n)$ auxiliary array for merging.

**Q10 — 4.** Selection sort makes exactly $n-1 = 4$ swaps (one per pass), regardless of the data.

---

### How to read your score

- **8–10:** sorting is solid — on to Module 2.7 (Divide & Conquer).
- **6–7:** memorize the complexity/stability table and the inversions $=$ swaps fact (Q4, Q5, Q10).
- **≤5:** re-read Part 1 B–D and re-trace Examples 1–3 by hand.
