---
title: "2.7 Divide & Conquer"
parent: "Module 2: Programming & DSA"
nav_order: 7
---

# GATE DA · PDSA Module 2.7 — Divide & Conquer

## Exam Relevance

**Where this sits:** Programming, Data Structures & Algorithms $\rightarrow$ _Divide & Conquer_ — the design paradigm behind binary search (2.5), merge sort and quicksort (2.6), analyzed with the Master theorem (2.2).

**Weightage:** PDSA is the **#2 subject** ($18.8\%$). The directly-tested D&C item is:

- **2026 Q15** — the **average-case quicksort recurrence** (averaging over pivot ranks)

D&C also underlies several questions already covered: the binary-search recurrence (2024 Q40), merge/quick-sort behaviour (2024 Q30, 2026 Q49), and Master-theorem analysis (Module 2.2).

> **Why it matters:** once you see an algorithm as _divide $\to$ conquer $\to$ combine_, its cost is a recurrence $T(n) = a\,T(n/b) + f(n)$ that the Master theorem cracks in one line. The recurring subtlety is **quicksort**: its split is data-dependent, so average ($\Theta(n\log n)$) and worst ($\Theta(n^2)$) cases differ.

## Part 1 — Theory & Math

### A. The paradigm (three steps)

1. **Divide** the problem into $a$ subproblems, each of size about $n/b$.
2. **Conquer** each subproblem by solving it **recursively** (base case for small $n$).
3. **Combine** the subproblem solutions into the answer.

The cost is a recurrence: $\;T(n) = a\,T(n/b) + f(n)$, where $f(n)$ is the **divide + combine** work. Solve it with the **Master theorem** (Module 2.2): compare $d$ (with $f(n) = \Theta(n^d)$) against $\log_b a$.

### B. Canonical divide-and-conquer algorithms

| Algorithm                 | Recurrence                   | Result                                           |
| ------------------------- | ---------------------------- | ------------------------------------------------ |
| Binary search             | $T(n) = T(n/2) + \Theta(1)$  | $\Theta(\log n)$                                 |
| Merge sort                | $T(n) = 2T(n/2) + \Theta(n)$ | $\Theta(n \log n)$                               |
| Quicksort (balanced/best) | $T(n) = 2T(n/2) + \Theta(n)$ | $\Theta(n \log n)$                               |
| Quicksort (worst)         | $T(n) = T(n-1) + \Theta(n)$  | $\Theta(n^2)$                                    |
| Karatsuba multiplication  | $T(n) = 3T(n/2) + \Theta(n)$ | $\Theta(n^{\log_2 3}) \approx \Theta(n^{1.585})$ |

### C. Merge sort — a _guaranteed_ split

Merge sort always halves the array, so the tree is perfectly balanced: $\log_2 n$ levels, $\Theta(n)$ merge work per level $\Rightarrow \Theta(n \log n)$ in **all** cases. Merging two sorted runs of total length $m$ takes at most $m - 1$ comparisons.

### D. Quicksort — a _data-dependent_ split

The pivot decides the split, so the recurrence depends on the input:

- **Best / balanced:** pivot near the median $\Rightarrow T(n) = 2T(n/2) + \Theta(n) \Rightarrow \Theta(n \log n)$.
- **Worst:** pivot is always the extreme (e.g. **first-element pivot on a sorted array**) $\Rightarrow$ one subproblem of size $n-1$: $T(n) = T(n-1) + \Theta(n) \Rightarrow \Theta(n^2)$.
- **Average (random order):** the first element is equally likely to be any rank $k = 0, \dots, n-1$, so

$$T(n) = \frac{1}{n} \sum_{k=0}^{n-1} \big[\,T(k) + T(n-k-1)\,\big] + O(n) \;\Rightarrow\; \Theta(n \log n).$$

(This is exactly 2026 Q15; the worst-case form $T(n-1)+O(n)$ is option (A) of that question.)

### E. Common traps GATE exploits

1. **Quicksort's split is not guaranteed even** (unlike merge sort) — average vs worst differ.
2. **The worst case is the _sorted_ input** under a first/last pivot, giving $\Theta(n^2)$.
3. The **Master theorem needs the $a\,T(n/b)$ form** — quicksort's worst case $T(n-1)+\Theta(n)$ is **subtractive**, so unroll it ($\Theta(n^2)$).
4. **The combine cost $f(n)$ drives the result** — same $a, b$ but a heavier $f$ changes the class.
5. Merge sort is **balanced and guaranteed** $\Theta(n\log n)$; that reliability costs $O(n)$ space.

## Part 2 — How to Solve (Method)

### Analyze a divide-and-conquer algorithm

1. **Count the subproblems** $a$ and their **size** $n/b$ (how the divide step splits the input).
2. **Find the combine cost** $f(n) = \Theta(n^d)$ (the work outside the recursive calls).
3. Write $T(n) = a\,T(n/b) + f(n)$ and apply the **Master theorem** (compare $d$ with $\log_b a$).

### Quicksort cases

- **Recognise which case** the question wants: balanced ($2T(n/2)+\Theta(n)$), worst/subtractive ($T(n-1)+\Theta(n)$), or average (the rank-averaged sum).
- The **first/last-pivot + sorted input** is the classic worst-case setup.

### Counting in merge sort

- **Levels** of recursion $= \log_2 n$ (for $n$ a power of 2).
- **Merging** two sorted runs of total size $m$ costs at most $m-1$ comparisons.

### Sanity checks

- A balanced two-way split with linear combine $\Rightarrow \Theta(n \log n)$.
- If you get $\Theta(n^2)$ for _merge_ sort, you've mis-modelled the split — merge sort is always balanced.
- More than two subproblems (e.g. Karatsuba's $a=3$) can push the exponent **above 1** but still below the naive $n^2$.

## Part 3 — Worked Examples

E2 is a real GATE DA question; the rest are standard originals.

---

### Example 1 — Merge sort: recurrence and merge cost _(original · Easy–Med)_

**Q.** Write and solve the merge-sort recurrence, and give the max comparisons to merge two sorted halves of a size-8 array.

**Solve.** Divide into 2 halves ($a=2, b=2$), combine by merging in $\Theta(n)$:
$$T(n) = 2T(n/2) + \Theta(n).$$
Master theorem: $\log_b a = 1 = d$ (equal case) $\Rightarrow T(n) = \Theta(n \log n)$. Merging two sorted runs of total length $8$ takes at most $8 - 1 = 7$ comparisons.

_Method:_ balanced two-way split + linear merge $\Rightarrow n\log n$.

---

### Example 2 — Average-case quicksort recurrence _(2026 Q15 · MCQ · Med–Hard)_

**Q.** Quicksort with the **first element** as pivot on $n$ distinct, randomly ordered elements; partition is linear. Which recurrence gives the expected time $T(n)$?
(A) $T(n) = T(1) + T(n-1) + O(n)$
(B) $T(n) = T(n/4) + T(3n/4) + O(n)$
(C) $T(n) = 2T(n/2) + O(n)$
(D) $T(n) = \dfrac{1}{n}\sum_{k=0}^{n-1}\big[T(k) + T(n-k-1)\big] + O(n)$

**Solve.** With a random order, the pivot is equally likely (probability $1/n$) to be the $k$-th smallest for each $k = 0, \dots, n-1$. That split yields subproblems of size $k$ and $n-k-1$. Averaging over all $n$ equally likely splits gives option **(D)** (which solves to $\Theta(n \log n)$).

- (A) is the **worst-case** recurrence (extreme pivot every time, $\to \Theta(n^2)$); (B) and (C) assume a fixed favourable split that isn't guaranteed.

**Answer: (D).** _Method:_ expected cost averages over all equally likely pivot ranks.

---

### Example 3 — Master theorem on D&C recurrences _(original · Med)_

**Q.** Solve: (i) $T(n) = 2T(n/2) + \Theta(1)$; (ii) $T(n) = 3T(n/2) + \Theta(n)$ (Karatsuba).

**Solve.**

- **(i)** $a=2, b=2 \Rightarrow \log_2 2 = 1$; $d = 0 < 1 \Rightarrow T(n) = \Theta(n^{\log_2 2}) = \Theta(n)$.
- **(ii)** $a=3, b=2 \Rightarrow \log_2 3 \approx 1.585$; $d = 1 < 1.585 \Rightarrow T(n) = \Theta(n^{\log_2 3}) \approx \Theta(n^{1.585})$ — faster than the naive $\Theta(n^2)$ multiplication.

_Method:_ the case is decided by the sign of $d - \log_b a$.

---

### Example 4 — Quicksort: best vs worst recurrence _(original · Med)_

**Q.** Give quicksort's recurrence and complexity for (a) a balanced split and (b) a sorted array with a first-element pivot.

**Solve.**

- **(a) Balanced:** $T(n) = 2T(n/2) + \Theta(n) \Rightarrow \Theta(n \log n)$.
- **(b) Sorted + first pivot:** every partition peels off one element, leaving size $n-1$: $T(n) = T(n-1) + \Theta(n)$. Unrolling: $\Theta(n) + \Theta(n-1) + \dots = \Theta(n^2)$.

_Insight:_ this is why the **already-sorted input is quicksort's worst case** (it also makes 0 swaps — see Module 2.6, 2024 Q30).

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** The three steps of the divide-and-conquer paradigm are
(A) sort, search, merge (B) divide, conquer, combine (C) push, pop, peek (D) map, shuffle, reduce

**Q2. ★★ (MCQ)** The recurrence for merge sort is
(A) $T(n)=T(n-1)+O(1)$ (B) $T(n)=2T(n/2)+O(n)$ (C) $T(n)=T(n/2)+O(1)$ (D) $T(n)=2T(n/2)+O(1)$

**Q3. ★★ (MCQ)** Quicksort with a first-element pivot on an already-sorted array has the recurrence
(A) $T(n)=2T(n/2)+O(n)$ (B) $T(n)=T(n-1)+O(n)$ (C) $T(n)=T(n/2)+O(1)$ (D) $T(n)=3T(n/2)+O(n)$

**Q4. ★★ (MSQ)** Which of these are divide-and-conquer algorithms?
(A) merge sort (B) binary search (C) quicksort (D) selection sort

**Q5. ★★ (MCQ)** By the Master theorem, $T(n) = 2T(n/2) + O(1)$ solves to
(A) $\Theta(\log n)$ (B) $\Theta(n)$ (C) $\Theta(n \log n)$ (D) $\Theta(n^2)$

**Q6. ★★ (MCQ)** By the Master theorem, $T(n) = 8T(n/2) + O(n^2)$ solves to
(A) $\Theta(n^2)$ (B) $\Theta(n^2 \log n)$ (C) $\Theta(n^3)$ (D) $\Theta(n \log n)$

**Q7. ★★ (NAT)** Merging two sorted lists of 4 elements each requires at most ****\_\_**** comparisons.

**Q8. ★★ (MCQ)** Why is merge sort guaranteed $\Theta(n \log n)$ while quicksort is not?
(A) merge sort uses less memory (B) merge sort always splits into equal halves, independent of data (C) quicksort is not recursive (D) merge sort avoids comparisons

**Q9. ★★ (NAT)** The number of levels of recursion in merge sort on an array of 8 elements is ****\_\_**** .

**Q10. ★★★ (NAT)** By the Master theorem, $T(n) = 4T(n/2) + O(n)$ solves to $\Theta(n^d)$. Find $d$.

**Q11. ★★★ (MCQ)** Strassen's matrix multiplication has recurrence $T(n) = 7T(n/2) + O(n^2)$. Its worst-case complexity is closest to
(A) $O(n^2)$ (B) $O(n^{2.5})$ (C) $O(n^{2.81})$ (D) $O(n^3)$

## Answer Key & Full Solutions

**Q1 — (B) divide, conquer, combine.** Split into subproblems, solve recursively, merge results.

**Q2 — (B) $T(n)=2T(n/2)+O(n)$.** Two halves, plus a linear merge.

**Q3 — (B) $T(n)=T(n-1)+O(n)$.** A first/last pivot on sorted data peels off one element per partition — the worst case, $\Theta(n^2)$.

**Q4 — (A), (B), (C).** Merge sort, binary search, and quicksort are all D&C. Selection sort is an incremental (not D&C) algorithm.

**Q5 — (B) $\Theta(n)$.** $a=2,b=2 \Rightarrow \log_2 2 = 1 > d = 0 \Rightarrow \Theta(n^{\log_b a}) = \Theta(n)$.

**Q6 — (C) $\Theta(n^3)$.** $a=8,b=2 \Rightarrow \log_2 8 = 3 > d = 2 \Rightarrow \Theta(n^{\log_b a}) = \Theta(n^3)$.

**Q7 — 7.** Merging two sorted runs of total length $m=8$ needs at most $m-1 = 7$ comparisons.

**Q8 — (B).** Merge sort always splits into two equal halves regardless of input, so the tree is balanced ($\log_2 n$ levels); quicksort's split depends on the pivot, allowing an unbalanced worst case.

**Q9 — 3.** $\log_2 8 = 3$ levels of halving ($8 \to 4 \to 2 \to 1$).

**Q10 — 2.** $a=4, b=2 \Rightarrow \log_b a = \log_2 4 = 2$; combine cost is $O(n^1)$, so $d_{combine} = 1 < 2 = \log_b a$. Master theorem case 1: $T(n) = \Theta(n^{\log_2 4}) = \Theta(n^2)$. So $d = 2$.

**Q11 — (C) $O(n^{2.81})$.** $a=7, b=2 \Rightarrow \log_2 7 \approx 2.807$; $d_{combine} = 2 < 2.807$, so $T(n) = \Theta(n^{\log_2 7}) \approx \Theta(n^{2.807})$ — better than the naive $\Theta(n^3)$, but worse than $\Theta(n^{2.5})$.

---

### How to read your score

- **9–11:** the paradigm is solid — on to Module 2.8 (Graphs), the last PDSA module.
- **6–8:** re-drill the quicksort cases (Q3, plus Example 4) and the Master-theorem applications (Q5, Q6, Q10).
- **≤5:** re-read Part 1 A–D; D&C is just “split $\to$ recurse $\to$ combine” analyzed with the Master theorem from Module 2.2.
