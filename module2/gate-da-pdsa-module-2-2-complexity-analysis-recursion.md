---
title: "2.2 Complexity Analysis & Recursion"
parent: "Module 2: Programming & DSA"
nav_order: 2
---

# GATE DA · PDSA Module 2.2 — Complexity Analysis & Recursion

## Exam Relevance

**Where this sits:** Programming, Data Structures & Algorithms $\rightarrow$ _Complexity Analysis & Recursion_ — the analysis toolkit you apply to every algorithm in Modules 2.3–2.8.

**Weightage:** PDSA is the **#2 subject** ($18.8\%$). Recurrences and recursion tracing are flagged recurring patterns, and asymptotic reasoning underlies the searching/sorting/graph questions.

**Seen in real papers:**

- **2024 Q40** — the **recurrence** for binary-search comparisons, $F(n)=F(\lfloor n/2 \rfloor)+1$
- **2026 Q39** — counting **recursive calls** of a Fibonacci-like function
- **2024 Q39** — tracing an **iterative** algorithm and recognising what it computes
- (**2026 Q31**, **2025 Q27** apply these ideas to binary search — covered in Module 2.5)

> **Why it matters:** complexity is the language GATE uses to compare algorithms. Master the growth-rate ordering, the Master theorem, and the handful of standard recurrences, and a whole class of questions becomes mechanical.

## Part 1 — Theory & Math

### A. Asymptotic notation

For input size $n$ and running time $T(n)$:

- **Big-O** — upper bound: $T(n) = O(g(n))$ if $T(n) \le c\,g(n)$ for some constant $c$ and large $n$.
- **Big-Omega** — lower bound: $T(n) = \Omega(g(n))$ if $T(n) \ge c\,g(n)$.
- **Big-Theta** — tight bound: $T(n) = \Theta(g(n))$ iff it is both $O(g(n))$ and $\Omega(g(n))$.

**Rules:** drop constant factors and lower-order terms. E.g. $3n^2 + 5n + 7 = \Theta(n^2)$.

**Growth-rate ordering** (know this cold):

$$1 \;<\; \log n \;<\; \sqrt{n} \;<\; n \;<\; n\log n \;<\; n^2 \;<\; n^3 \;<\; 2^n \;<\; n!$$

The base of a logarithm only changes a constant factor, so it is irrelevant inside $O(\cdot)$ (but matters in an exact count).

### B. Analyzing code

- **Sequential** statements: add costs (the largest dominates).
- **Nested** loops: multiply. A loop to $n$ inside a loop to $n$ is $\Theta(n^2)$.
- A loop whose index **doubles** ($i \leftarrow 2i$) runs $\Theta(\log n)$ times.
- Report **best / average / worst** case as asked; **space** complexity includes the recursion-stack depth.

### C. Recurrence relations

A recursive algorithm's cost is written as a **recurrence** $T(n)$, then solved. Three tools:

1. **Unrolling / substitution** — expand a few levels, spot the pattern, sum it.
2. **Recursion tree** — sum the work across all levels.
3. **Master theorem** (below) — for divide-and-conquer forms.

**Master theorem** (simplified). For

$$T(n) = a\,T\!\left(\tfrac{n}{b}\right) + f(n), \qquad a \ge 1,\; b > 1,\; f(n) = \Theta(n^d),$$

compare $d$ with $\log_b a$:

- if $d > \log_b a$: $\;T(n) = \Theta(n^d)$
- if $d = \log_b a$: $\;T(n) = \Theta(n^d \log n)$
- if $d < \log_b a$: $\;T(n) = \Theta(n^{\log_b a})$

**Standard recurrences to memorize:**

| Recurrence                     | Solution           | Where it appears       |
| ------------------------------ | ------------------ | ---------------------- |
| $T(n) = T(n/2) + \Theta(1)$    | $\Theta(\log n)$   | binary search          |
| $T(n) = 2\,T(n/2) + \Theta(n)$ | $\Theta(n \log n)$ | merge sort             |
| $T(n) = 2\,T(n/2) + \Theta(1)$ | $\Theta(n)$        | tree traversal         |
| $T(n) = T(n-1) + \Theta(1)$    | $\Theta(n)$        | linear recursion       |
| $T(n) = T(n-1) + \Theta(n)$    | $\Theta(n^2)$      | e.g. naive nested work |
| $T(n) = 2\,T(n-1) + \Theta(1)$ | $\Theta(2^n)$      | exponential blow-up    |

### D. Recursion analysis (count vs value vs depth)

Three different quantities — keep them apart:

- **Return value** — what the function computes.
- **Number of calls** (stack activations) — a _count_ recurrence, e.g. for a function making two recursive calls, $C(n) = 1 + C(n-1) + C(n-2)$ with the base cases counting as $1$.
- **Maximum stack depth** — the longest root-to-leaf path (space).

Naive recursive Fibonacci is the canonical example: its call count is exponential because work is duplicated across branches.

### E. Common traps GATE exploits

1. **Big-O is only an upper bound** — $n = O(n^2)$ is true; use $\Theta$ for a tight bound.
2. **The Master theorem applies only to the $a\,T(n/b) + f(n)$ form** — not to $T(n-1)$ subtractive recurrences.
3. **Log base is irrelevant in $O$** but matters in an exact comparison count.
4. **Recursion uses stack space** proportional to depth — don't report it as $O(1)$.
5. **Call count $\ne$ return value $\ne$ depth.**
6. Watch the **base case**: `n <= 0` vs `n <= 1` changes the count (2026 Q39).

## Part 2 — How to Solve (Method)

### Complexity of a code fragment

1. Work **inside-out**: cost of the innermost statement, then multiply by each enclosing loop's iteration count.
2. **Add** sequential blocks and keep the **dominant** term.
3. Identify the loop pattern: counter $+1 \rightarrow \Theta(n)$ per loop; counter $\times 2 \rightarrow \Theta(\log n)$.
4. Drop constants and lower-order terms; state $O$, $\Theta$, or $\Omega$ as asked.

### Solving a recurrence

- **Recognise** it against the standard table first — most GATE recurrences are on that list.
- If it has the form $a\,T(n/b) + \Theta(n^d)$, apply the **Master theorem**: compute $\log_b a$, compare with $d$, read off the case.
- For **subtractive** forms $T(n) = T(n-1) + g(n)$, **unroll**: $T(n) = \sum g(k)$. (So $g=\Theta(1) \Rightarrow \Theta(n)$; $g=\Theta(n) \Rightarrow \Theta(n^2)$.)

### Counting recursive calls

1. Write the **count recurrence**: a base-case call counts as $1$; a recursive case is $1 + \sum(\text{calls of each child})$.
2. Fill a small **bottom-up table** of $C(\text{base}), C(1), C(2), \dots$ up to the target.
3. Mind the exact base condition.

### Tracing an iterative algorithm

- Keep a **state table** of the array/variables after each iteration (1-indexed if the pseudocode is).
- After tracing, **name what it computes** — GATE often rewards recognising the pattern (prefix sums, run lengths, etc.).

### Sanity checks

- A divide-by-half recurrence gives a $\log$; halving with linear merge gives $n \log n$.
- If you ever get a complexity below $\Omega(n)$ for an algorithm that must read all $n$ inputs, re-check.

## Part 3 — Worked Examples

E1–E2 are originals (asymptotics, Master theorem); E3–E4 are real GATE DA questions.

---

### Example 1 — Complexity of code fragments _(original · Easy–Med)_

**Q.** Give the time complexity of each:

```python
# Fragment A
for i in range(n):
    for j in range(n):
        x += 1

# Fragment B
i = 1
while i < n:
    i = i * 2
```

**Solve.**

- **A:** inner loop runs $n$ times, outer runs $n$ times $\Rightarrow n \cdot n = \Theta(n^2)$.
- **B:** $i$ doubles $1, 2, 4, \dots$ until $\ge n$, i.e. about $\log_2 n$ iterations $\Rightarrow \Theta(\log n)$.

_Method:_ multiply nested loops; a doubling counter gives a logarithm.

---

### Example 2 — Master theorem in action _(original · Med)_

**Q.** Solve: (i) $T(n) = 2T(n/2) + \Theta(n)$; (ii) $T(n) = 4T(n/2) + \Theta(n)$; (iii) $T(n) = T(n/2) + \Theta(1)$.

**Solve.** Compare $d$ (exponent of $f$) with $\log_b a$:

- **(i)** $a=2, b=2 \Rightarrow \log_b a = 1$; $d = 1$. Equal case $\Rightarrow T(n) = \Theta(n \log n)$ (merge sort).
- **(ii)** $a=4, b=2 \Rightarrow \log_b a = 2$; $d = 1 < 2$. $\Rightarrow T(n) = \Theta(n^{2})$.
- **(iii)** $a=1, b=2 \Rightarrow \log_b a = 0$; $d = 0$. Equal case $\Rightarrow T(n) = \Theta(\log n)$ (binary search).

_Method:_ the three cases hinge entirely on the sign of $d - \log_b a$.

---

### Example 3 — The binary-search recurrence _(2024 Q40 · MCQ · Med)_

**Q.** $F(n)$ = max comparisons to search a sorted array of size $n$ by binary search. Which is TRUE?
(A) $F(n)=F(\lfloor n/2 \rfloor)+1$ (B) $F(n)=F(\lfloor n/2 \rfloor)+F(\lceil n/2 \rceil)$ (C) $F(n)=F(\lfloor n/2 \rfloor)$ (D) $F(n)=F(n-1)+1$

**Solve.** Binary search spends **1** comparison at the midpoint, then recurses on at most half the array: $F(n) = F(\lfloor n/2 \rfloor) + 1$, with $F(0)=0$. Unrolling gives $F(n) = \lfloor \log_2 n \rfloor + 1 = \Theta(\log n)$.

- (B) is merge sort's work; (C) drops the comparison's cost; (D) is **linear** search.

**Answer: (A).** _Method:_ one unit of work + one half-size subproblem $\Rightarrow$ logarithmic.

---

### Example 4 — Counting recursive calls _(2026 Q39 · MCQ · Med–Hard)_

**Q.** For

```python
def mystery(n):
    if n <= 0:
        return 1
    else:
        return mystery(n-1) + mystery(n-2)
```

how many total calls (including the first) does `mystery(4)` make?
(A) 5 (B) 9 (C) 15 (D) 17

**Solve.** Let $C(n)$ be the total calls. Base ($n \le 0$): $C(n) = 1$. Recursive: $C(n) = 1 + C(n-1) + C(n-2)$.

$$C(-1)=1,\; C(0)=1,\; C(1)=3,\; C(2)=5,\; C(3)=9,\; C(4)=15.$$

**Answer: (C) 15.** _Trap:_ the base is $n \le 0$, so `mystery(-1)` is also a (counted) base call — that is why $C(1) = 1 + C(0) + C(-1) = 3$, not $1$.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** For large $n$, which grows the fastest?
(A) $n^2$ (B) $n \log n$ (C) $2^n$ (D) $n!$

**Q2. ★ (MCQ)** The time complexity of $3n^2 + 5n + 7$ is
(A) $\Theta(n)$ (B) $\Theta(n^2)$ (C) $\Theta(n^3)$ (D) $\Theta(n \log n)$

**Q3. ★★ (MCQ)** Complexity of the loop `i = 1; while i < n: i = i * 3`?
(A) $\Theta(n)$ (B) $\Theta(\log n)$ (C) $\Theta(n \log n)$ (D) $\Theta(\sqrt{n})$

**Q4. ★★ (MCQ)** By the Master theorem, $T(n) = 2T(n/2) + \Theta(n)$ is
(A) $\Theta(n)$ (B) $\Theta(n \log n)$ (C) $\Theta(n^2)$ (D) $\Theta(\log n)$

**Q5. ★★ (MCQ)** By the Master theorem, $T(n) = 4T(n/2) + \Theta(n)$ is
(A) $\Theta(n \log n)$ (B) $\Theta(n^2)$ (C) $\Theta(n^2 \log n)$ (D) $\Theta(n^3)$

**Q6. ★★ (MCQ)** For `X = [6, 3, 5, 4, 10]`, the array `S` returned by the pseudocode below is _(2024 Q39)_

```
computeS(X)
S[1] ← 1
for i ← 2 to length(X)
    S[i] ← 1
    if X[i−1] ≤ X[i]
        S[i] ← S[i] + S[i−1]
return S
```

(A) [1,1,2,3,4] (B) [1,1,2,3,3] (C) [1,1,2,1,2] (D) [1,1,2,1,5]

**Q7. ★★★ (NAT)** For the function `mystery` of Example 4 (base case `n <= 0` returns 1), the total number of calls made by `mystery(5)` is ****\_\_**** .

**Q8. ★★ (MSQ)** Which statements are TRUE?
(A) $n = O(n^2)$.
(B) $\Theta(g)$ is a tight (two-sided) bound.
(C) The Master theorem applies to $T(n) = T(n-1) + 1$.
(D) A recursion of depth $d$ uses $\Theta(d)$ stack space.

**Q9. ★★ (MCQ)** The recurrence $T(n) = T(n/2) + \Theta(1)$ solves to
(A) $\Theta(1)$ (B) $\Theta(\log n)$ (C) $\Theta(n)$ (D) $\Theta(n \log n)$

**Q10. ★★★ (MCQ)** The recurrence $T(n) = T(n-1) + \Theta(n)$ solves to
(A) $\Theta(n)$ (B) $\Theta(n \log n)$ (C) $\Theta(n^2)$ (D) $\Theta(2^n)$

## Answer Key & Full Solutions

**Q1 — (D) $n!$.** Order: $n^2 < n\log n$? No — ranking is $n\log n < n^2 < 2^n < n!$, so $n!$ dominates.

**Q2 — (B) $\Theta(n^2)$.** Drop lower-order terms and constants; the $n^2$ term dominates.

**Q3 — (B) $\Theta(\log n)$.** $i$ multiplies by 3 each step ($1,3,9,\dots$), reaching $n$ in about $\log_3 n$ steps; base is irrelevant in $O$, so $\Theta(\log n)$.

**Q4 — (B) $\Theta(n \log n)$.** $a=2,b=2 \Rightarrow \log_b a = 1 = d$ (since $f=\Theta(n^1)$). Equal case $\Rightarrow \Theta(n \log n)$.

**Q5 — (B) $\Theta(n^2)$.** $a=4,b=2 \Rightarrow \log_b a = 2 > d = 1$. $\Rightarrow \Theta(n^{\log_b a}) = \Theta(n^2)$.

**Q6 — (C) [1,1,2,1,2].** $S[1]=1$. $i=2$: $6\le 3$? no $\Rightarrow 1$. $i=3$: $3\le 5$? yes $\Rightarrow 1+S[2]=2$. $i=4$: $5\le 4$? no $\Rightarrow 1$. $i=5$: $4\le 10$? yes $\Rightarrow 1+S[4]=2$. (It is the length of the longest non-decreasing run ending at each index.)

**Q7 — 25.** Using $C(n) = 1 + C(n-1) + C(n-2)$ with $C(4)=15, C(3)=9$: $C(5) = 1 + 15 + 9 = 25$.

**Q8 — (A), (B), (D).** (C) is **false** — the Master theorem covers the $a\,T(n/b)+f(n)$ form, not subtractive $T(n-1)$ recurrences (use unrolling there).

**Q9 — (B) $\Theta(\log n)$.** One half-size subproblem plus constant work — the binary-search recurrence.

**Q10 — (C) $\Theta(n^2)$.** Unroll: $T(n) = \Theta(n) + \Theta(n-1) + \dots + \Theta(1) = \Theta\!\left(\tfrac{n(n+1)}{2}\right) = \Theta(n^2)$.

---

### How to read your score

- **8–10:** analysis is solid — on to Module 2.3 (Linear Data Structures).
- **6–7:** re-drill the Master theorem cases (Q4, Q5) and subtractive unrolling (Q10).
- **≤5:** re-read Part 1 A, C and the standard-recurrence table; memorize the growth-rate ordering.
