---
title: "2.5 Searching"
parent: "Module 2: Programming & DSA"
nav_order: 5
---

# GATE DA · PDSA Module 2.5 — Searching (Linear & Binary)

## Exam Relevance

**Where this sits:** Programming, Data Structures & Algorithms $\rightarrow$ _Searching_. Small topic, but **binary-search comparison counts are a recurring pattern**.

**Weightage:** PDSA is the **#2 subject** ($18.8\%$). Searching appears as crisp, high-confidence questions:

- **2026 Q31** — **maximum comparisons** in binary search on 1000 elements (target absent) $= 10$
- **2025 Q27** — the **prerequisites**: binary search is $O(\log n)$ only on a **sorted array** with $O(1)$ access
- **2024 Q40** — the binary-search **recurrence** $F(n) = F(\lfloor n/2 \rfloor) + 1$ (derived in Module 2.2)

> **Why it matters:** these are near-free marks once you know two facts — binary search costs $\lfloor \log_2 n \rfloor + 1$ comparisons in the worst case, and it **only** works on a sorted, randomly-accessible array. (No dedicated linear-search question appeared in 2024–2026, but linear search is the baseline to contrast against.)

## Part 1 — Theory & Math

### A. Linear (sequential) search

Scan elements one by one until the target is found or the list ends.

- Works on **any** structure (array or linked list) and on **unsorted** data — **no prerequisites**.
- Best case $O(1)$ (first element), worst and average case $O(n)$.

### B. Binary search

Repeatedly compare the target with the **middle** element of a **sorted** array and discard half.

```
lo = 0, hi = n-1
while lo <= hi:
    mid = (lo + hi) // 2
    if A[mid] == y: return mid          # found
    elif A[mid] < y: lo = mid + 1        # search right half
    else:            hi = mid - 1        # search left half
return NOT_FOUND
```

- **Time $O(\log n)$.** Worst-case comparisons (3-way compare per step) $= \lfloor \log_2 n \rfloor + 1$.
- **Recurrence:** one comparison at the midpoint, then recurse on a half of size $\lfloor n/2 \rfloor$:

$$F(n) = F\!\left(\lfloor n/2 \rfloor\right) + 1, \qquad F(0) = 0 \;\Rightarrow\; F(n) = \lfloor \log_2 n \rfloor + 1.$$

### C. The two prerequisites (why 2025 Q27 matters)

Binary search achieves $O(\log n)$ **only** when **both** hold:

1. **Sorted** data — otherwise the halving decision is invalid.
2. **$O(1)$ random access** — needed to jump to the midpoint.

An **array** satisfies (2) by index arithmetic. A **linked list does not**: finding the middle node costs $O(n)$, so binary search on a linked list degrades to $O(n)$ (no better than linear). An **unsorted** array fails (1).

### D. Which search to use

| Situation                         | Best choice                                       |
| --------------------------------- | ------------------------------------------------- |
| unsorted data, or a single search | **linear** $O(n)$                                 |
| sorted array, many searches       | **binary** $O(\log n)$ per query                  |
| linked list                       | **linear** (binary search has no $O(1)$ midpoint) |

Sorting first ($O(n \log n)$) to enable binary search pays off only when the cost is amortized over **many** queries.

### E. Common traps GATE exploits

1. **Binary search needs a sorted array** with $O(1)$ access — not a linked list, not unsorted data.
2. **Worst-case comparisons $= \lfloor \log_2 n \rfloor + 1$** (for an absent target, the search descends the full height).
3. **Linear search has no prerequisites**; binary search has two.
4. **Off-by-one** in comparison counts — derive from the recurrence or count the halvings.
5. The **log base is irrelevant** to the $O(\log n)$ class, but the exact count uses base 2.

## Part 2 — How to Solve (Method)

### Comparison-count questions

- **Worst case (absent target):** $\lfloor \log_2 n \rfloor + 1$. Find the largest power of 2 not exceeding $n$: if $2^k \le n < 2^{k+1}$ then the answer is $k + 1$.
- Equivalently, **count the halvings**: $n \to \lfloor n/2 \rfloor \to \dots \to 0$, and the number of steps is the comparison count (this is solving $F(n) = F(\lfloor n/2 \rfloor) + 1$).
- **Inverse question** ("how large an array can $k$ comparisons search?"): up to $2^{k} - 1$ elements.

### Tracing binary search

Maintain `lo`, `hi`, and `mid = (lo+hi)//2`. Each step: compare, then move `lo = mid+1` (go right) or `hi = mid-1` (go left). Count one comparison per `mid` examined.

### Choosing a strategy

Check the prerequisites first: is the data **sorted**? Does the structure give **$O(1)$** access? If either fails, binary search is not the $O(\log n)$ tool — use linear search (or sort first if there will be many queries).

### Sanity checks

- A binary search on $n$ elements never makes more than $\lfloor \log_2 n \rfloor + 1$ comparisons.
- If someone claims $O(\log n)$ search on a **linked list**, it is wrong — midpoint access is $O(n)$ there.

## Part 3 — Worked Examples

E2–E3 are real GATE DA questions; E1 and E4 are standard originals.

---

### Example 1 — Tracing binary search _(original · Easy–Med)_

**Q.** Search for `23` in the sorted array `A = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]` (indices 0–9). How many comparisons, and at what index?

**Solve.**

```
lo=0, hi=9, mid=4 -> A[4]=16; 23 > 16 -> lo=5      (compare 1)
lo=5, hi=9, mid=7 -> A[7]=56; 23 < 56 -> hi=6      (compare 2)
lo=5, hi=6, mid=5 -> A[5]=23; found!               (compare 3)
```

**Answer:** found at **index 5** in **3 comparisons**. _Method:_ track `lo`, `hi`, `mid`; halve each step.

---

### Example 2 — Maximum comparisons, target absent _(2026 Q31 · NAT · Med)_

**Q.** `A` is a sorted array of 1000 distinct integers. With a 3-way comparison at each recursive step, what is the **maximum** number of comparisons if `y` is **not** in `A`?

**Solve.** Worst case $= \lfloor \log_2 n \rfloor + 1$. Since $2^9 = 512 \le 1000 < 1024 = 2^{10}$, we have $\lfloor \log_2 1000 \rfloor = 9$, so the maximum is $9 + 1 = 10$.
(Equivalently, count halvings: $1000 \to 500 \to 250 \to 125 \to 62 \to 31 \to 15 \to 7 \to 3 \to 1 \to 0$ = 10 steps.)

**Answer: 10.** _Method:_ the absent target forces the search to the full depth $\lfloor \log_2 n \rfloor + 1$.

---

### Example 3 — The prerequisites _(2025 Q27 · MCQ · Med)_

**Q.** For which input does binary search take $O(\log n)$ in the worst case?
(A) an array of $n$ integers in any order (B) a linked list of $n$ integers in any order (C) an array of $n$ integers in increasing order (D) a linked list of $n$ integers in increasing order

**Solve.** Binary search needs **sorted** data **and** $O(1)$ random access. (A) unsorted $\rightarrow$ fails. (B) unsorted **and** a linked list $\rightarrow$ fails twice. (D) sorted but a **linked list** $\rightarrow$ midpoint access is $O(n)$, so the search is $O(n)$, not $O(\log n)$. Only **(C)** — a sorted array — satisfies both.

**Answer: (C).** _Method:_ check both prerequisites; a sorted linked list still fails the access requirement.

---

### Example 4 — From the recurrence _(original · Med)_

**Q.** Using $F(n) = F(\lfloor n/2 \rfloor) + 1$ (with $F(0)=0$), find the maximum comparisons for $n = 15$.

**Solve.** Unroll: $F(1)=1, F(3)=2, F(7)=3, F(15)=4$. Equivalently $\lfloor \log_2 15 \rfloor + 1 = 3 + 1 = 4$.

**Answer: 4.** _Method:_ the same recurrence behind 2024 Q40 — each step is one comparison plus a half-size subproblem.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** The worst-case time complexity of linear search on $n$ elements is
(A) $O(1)$ (B) $O(\log n)$ (C) $O(n)$ (D) $O(n \log n)$

**Q2. ★ (MCQ)** Binary search requires the input array to be
(A) sorted (B) unsorted (C) a linked list (D) of even length

**Q3. ★★ (NAT)** The maximum number of comparisons made by binary search on a sorted array of 255 elements when the target is absent is ****\_\_**** .

**Q4. ★★ (MCQ)** Performing binary search on a **sorted singly linked list** of $n$ nodes takes
(A) $O(\log n)$ (B) $O(n)$ (C) $O(1)$ (D) $O(n \log n)$

**Q5. ★★ (NAT)** Searching for `16` in `A = [2, 5, 8, 12, 16, 23, 38]` with binary search takes ****\_\_**** comparisons.

**Q6. ★★ (MCQ)** To search **once** in an unsorted array of $n$ elements, the better approach is
(A) sort then binary search, $O(n \log n)$ (B) linear search, $O(n)$ (C) build a BST then search (D) hash then search

**Q7. ★★ (MSQ)** Which statements are TRUE?
(A) Linear search works on unsorted data.
(B) Binary search requires sorted data.
(C) Binary search on a sorted array is $O(\log n)$.
(D) Binary search on a linked list is $O(\log n)$.

**Q8. ★★ (MCQ)** With at most 4 comparisons, binary search can locate a target in a sorted array of at most how many elements?
(A) 8 (B) 15 (C) 16 (D) 31

**Q9. ★★★ (NAT)** The maximum number of comparisons made by binary search (absent target) on a sorted array of $127$ elements is ****\_\_**** .

**Q10. ★★★ (MSQ)** Which statements about binary search on an $n$-element sorted array are TRUE?
(A) For $n = 2^k$, the worst case requires $k+1$ comparisons.
(B) For $n = 2^k - 1$, the worst case requires $k$ comparisons.
(C) The best-case number of comparisons is $1$.
(D) Binary search always uses exactly $\lfloor \log_2 n \rfloor + 1$ comparisons.

## Answer Key & Full Solutions

**Q1 — (C) $O(n)$.** In the worst case the target is last or absent, so all $n$ elements are examined.

**Q2 — (A) sorted.** The halving decision is only valid on sorted data.

**Q3 — 8.** $2^7 = 128 \le 255 < 256 = 2^8$, so $\lfloor \log_2 255 \rfloor = 7$ and the maximum is $7 + 1 = 8$.

**Q4 — (B) $O(n)$.** A linked list has no $O(1)$ random access; reaching the midpoint each step costs $O(n)$, so binary search loses its advantage and is $O(n)$.

**Q5 — 3.** `lo=0,hi=6,mid=3` $\rightarrow A[3]=12$, $16>12$ (1); `lo=4,hi=6,mid=5` $\rightarrow A[5]=23$, $16<23$ (2); `lo=4,hi=4,mid=4` $\rightarrow A[4]=16$ found (3).

**Q6 — (B) linear search, $O(n)$.** For a single search, sorting first costs $O(n \log n)$ — more than just scanning once. Sorting pays off only across many searches.

**Q7 — (A), (B), (C).** (D) is **false** — a linked list lacks $O(1)$ midpoint access, so binary search is $O(n)$ there.

**Q8 — (B) 15.** With at most $k$ comparisons binary search covers up to $2^{k} - 1$ elements; for $k = 4$, that is $2^4 - 1 = 15$ (consistent with $\lfloor \log_2 15 \rfloor + 1 = 4$).

**Q9 — 7.** $2^6 = 64 \le 127 < 128 = 2^7$, so $\lfloor \log_2 127 \rfloor = 6$ and the maximum is $6 + 1 = 7$. (Note: $n = 128$ would give $8$, and $n = 127 = 2^7 - 1$ gives $7$ — one less.)

**Q10 — (A), (B), (C).** (D) is **false** — binary search uses **at most** $\lfloor \log_2 n \rfloor + 1$; the best case is $1$ (target equals the first midpoint). Verify (A): $\lfloor \log_2 2^k \rfloor + 1 = k + 1$; (B): $\lfloor \log_2(2^k-1) \rfloor + 1 = (k-1)+1 = k$.

---

### How to read your score

- **8–10:** searching is solid — on to Module 2.6 (Sorting).
- **6–7:** memorize $\lfloor \log_2 n \rfloor + 1$ (Q3, Q9) and the two prerequisites (Q2, Q4, Q7).
- **≤5:** re-read Part 1 B–C and re-trace Example 1 and Example 2.
