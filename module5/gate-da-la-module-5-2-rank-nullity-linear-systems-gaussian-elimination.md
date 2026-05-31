---
title: "5.2 Rank-Nullity & Linear Systems"
parent: "Module 5: Linear Algebra"
nav_order: 2
---

# GATE DA · LA Module 5.2 — Rank, Nullity & Linear Systems (Gaussian Elimination)

## Exam Relevance

**Where this sits:** Linear Algebra $\rightarrow$ *Rank, Nullity & Systems of Linear Equations (Gaussian elimination)* — the engine that decides **when a linear system has no / one / infinitely many solutions**. Module **2 of 6** in Subject 5.

**Weightage:** part of LA's steady **~11.8%**. This topic is a near-guaranteed appearance because it also underlies regression (ML), and consistency arguments. Directly tested PYQs for this module:
- **2024 Q48** (MSQ) — which solution patterns (unique / infinite / none) can coexist for a given matrix shape.
- **2025 Q12** (MCQ) — cost of Gaussian elimination on an upper-triangular matrix.
- **2025 Q13** (MCQ) — row-sums-$=1$ forces a matrix polynomial to be singular.

> **Why it matters:** one identity — **rank $+$ nullity $=$ number of columns** — plus the **augmented-rank criterion** answers almost every system question. Master the *shape intuition* (square / wide / tall) and the MSQ existence questions become instant.

## Part 1 — Theory & Math

### A. Rank
The **rank** of $A\in\mathbb{R}^{m\times n}$ is the number of pivots in its row echelon form $=$ $\dim(\text{column space}) = \dim(\text{row space})$ (row rank $=$ column rank). Bounds:
$$\operatorname{rank}(A) \le \min(m,n).$$
- **Full column rank:** $\operatorname{rank}=n$ (columns independent). **Full row rank:** $\operatorname{rank}=m$.
- Square $n\times n$: **full rank** $\iff \operatorname{rank}=n \iff \det A \ne 0 \iff A$ invertible.

### B. Null space & nullity
The **null space** $N(A)=\{\mathbf x\in\mathbb{R}^n : A\mathbf x=\mathbf 0\}$ is a subspace of $\mathbb{R}^n$. Its dimension is the **nullity** $=$ number of free variables.

### C. Rank–Nullity theorem (the central identity)
$$\operatorname{rank}(A) + \operatorname{nullity}(A) = n \quad(\text{number of columns}).$$
**Corollary:** a square $n\times n$ matrix is invertible $\iff \operatorname{nullity}=0 \iff \operatorname{rank}=n$.

### D. Solving $A\mathbf x=\mathbf b$ — the augmented-rank criterion
Form the augmented matrix $[A\,\mid \,\mathbf b]$ and compare ranks. With $r=\operatorname{rank}(A)$ and $n$ unknowns:

| Condition | Number of solutions |
| --- | --- |
| $\operatorname{rank}(A) < \operatorname{rank}([A\,\mid \,\mathbf b])$ | **none** (inconsistent) |
| $\operatorname{rank}(A) = \operatorname{rank}([A\,\mid \,\mathbf b]) = n$ | **exactly one** |
| $\operatorname{rank}(A) = \operatorname{rank}([A\,\mid \,\mathbf b]) < n$ | **infinitely many** ($n-r$ free vars) |

### E. Homogeneous systems $A\mathbf x=\mathbf 0$
- **Always consistent** ($\mathbf x=\mathbf 0$ works).
- **Nontrivial solution exists** $\iff \operatorname{rank}(A) < n \iff \operatorname{nullity}>0$. Square case: $\iff \det A = 0$.
- The solution set *is* the null space, of dimension $n-r$.

### F. Gaussian elimination & its cost
**Algorithm:** *forward elimination* (use each pivot to zero entries below it) $\to$ row echelon (upper-triangular) form, then *back-substitution*.

| Matrix | Work needed | Cost |
| --- | --- | --- |
| general dense $n\times n$ | forward elimination $+$ back-substitution | $O(n^3)$ |
| already upper-triangular | back-substitution only | $O(n^2)$ |

Back-substitution alone costs $\sum_{i=1}^{n}(n-i)=\dfrac{n(n-1)}{2}=O(n^2)$. *(This is exactly 2025 Q12.)*

### G. Shape intuition (kills the MSQ existence questions)
- **Square $n\times n$:** either invertible (every $\mathbf b\to$ unique) **or** singular (some $\mathbf b\to$ none, others $\to$ infinite). You can **never** get "unique for one $\mathbf b$, infinite for another" — uniqueness for *any* RHS forces invertibility, making *all* RHS unique.
- **Wide $m\times n$ with $m<n$** (fewer equations than unknowns): $\operatorname{rank}\le m<n$, so a **unique** solution is **impossible** — only "none" or "infinitely many".
- **Tall $m\times n$ with $m>n$** (more equations than unknowns): can have full column rank $n$ $\to$ **unique** when consistent, **none** when inconsistent.

### H. Traps GATE exploits
1. **Consistency needs $\operatorname{rank}(A)=\operatorname{rank}([A\mid \mathbf b])$** — checking $\operatorname{rank}(A)$ alone is not enough.
2. A **wide** system ($m<n$) can never have a unique solution.
3. $\det A = 0 \Rightarrow$ **no** solution *or* **infinitely many** (never unique) — which one depends on $\mathbf b$.
4. Rank–nullity counts **columns** (unknowns), not rows.

## Part 2 — How to Solve (Method)

### Classify a system $A\mathbf x = \mathbf b$
1. Row-reduce the **augmented** matrix $[A\,\mid \,\mathbf b]$.
2. If a row reads $[\,0\ 0 \cdots 0 \mid c\,]$ with $c\ne0$ $\to$ **inconsistent, no solution**.
3. Otherwise let $r=\operatorname{rank}(A)$ and $n=$ #unknowns: $r=n\to$ **unique**; $r<n\to$ **infinitely many** with $n-r$ free variables.

### Rank & nullity
- Row-reduce, count pivots $=$ rank; **nullity $=n-\operatorname{rank}$** (always columns).

### Existence (“$\exists\,M$ …”) MSQ questions — use shape facts (2024 Q48 pattern)
- **square:** cannot pair “unique” with “non-unique” for the **same** $M$.
- **wide $m<n$:** “unique” is impossible.
- **tall $m>n$:** “unique” and “no solution” are both achievable (full column rank, different $\mathbf b$).

### “Is $B$ singular?” shortcut (2025 Q13 pattern)
- Exhibit **one** nonzero $\mathbf v$ with $B\mathbf v=\mathbf 0$ $\Rightarrow B$ singular $\Rightarrow B\mathbf x=\mathbf 0$ has **infinitely many** solutions.
- Hunt for structure: **row sums all $=1$** means $A\mathbf 1=\mathbf 1$, i.e. the all-ones vector $\mathbf 1$ is an eigenvector with eigenvalue $1$. Then $(A-I)\mathbf 1=\mathbf 0$.

### Parameter questions (“for what $k$ …”)
- Row-reduce symbolically; set the pivot that contains $k$ to $0$ for the **degenerate** (infinite/none) case, nonzero for **unique**.

### Mistakes that cost marks
- Forgetting to compare the **augmented** rank (declaring an inconsistent system solvable).
- Counting equations instead of **unknowns** in rank–nullity.
- Concluding “unique” from “has a solution” when $\det=0$.

## Part 3 — Worked Examples

### Example 1 — Cost of Gaussian elimination *(2025 Q12 · MCQ)*
**Q.** The number of additions and multiplications in performing Gaussian elimination on **any $n\times n$ upper-triangular matrix** is of the order: (A) $O(n)$ (B) $O(n^2)$ (C) $O(n^3)$ (D) $O(n^4)$.

**Solve.** The matrix is **already** upper-triangular, so forward elimination has nothing to do — only **back-substitution** remains. Solving for $x_n, x_{n-1},\dots,x_1$, the $i$-th step uses $(n-i)$ multiplications and $(n-i)$ additions:
$$\sum_{i=1}^{n}(n-i)=\frac{n(n-1)}{2}=O(n^2).$$

**Answer: $O(n^2)$ — option (B).** *Contrast:* a **general** dense $n\times n$ system needs forward elimination too, costing $O(n^3)$.

---

### Example 2 — Row sums equal 1 *(2025 Q13 · MCQ)*
**Q.** The sum of the elements in each row of $A\in\mathbb{R}^{n\times n}$ is $1$. If $B=A^3-2A^2+A$, which is correct (for $\mathbf x\in\mathbb{R}^n$)? (A) $B\mathbf x=\mathbf 0$ has no solution (B) exactly two solutions (C) infinitely many solutions (D) a unique solution.

**Solve.** Factor: $B=A(A^2-2A+I)=A(A-I)^2$. Row sums $=1$ means $A\mathbf 1=\mathbf 1$ where $\mathbf 1=(1,\dots,1)^\top$. Then
$$(A-I)\mathbf 1 = A\mathbf 1-\mathbf 1=\mathbf 1-\mathbf 1=\mathbf 0 \;\Rightarrow\; (A-I)^2\mathbf 1=\mathbf 0 \;\Rightarrow\; B\mathbf 1 = A(A-I)^2\mathbf 1=\mathbf 0.$$
So $\mathbf 1\ne\mathbf 0$ is in the null space of $B$ $\Rightarrow B$ is **singular** $\Rightarrow B\mathbf x=\mathbf 0$ has a nontrivial solution, hence **infinitely many**.

**Answer: (C) infinitely many solutions.** *Method:* find one nonzero null vector $\Rightarrow$ singular $\Rightarrow$ infinite.

---

### Example 3 — Which solution patterns can coexist? *(2024 Q48 · MSQ)*
**Q.** Which is/are TRUE? ($\mathbb{R}$ = reals.)
- (A) $\exists\,M\in\mathbb{R}^{3\times3},\mathbf p,\mathbf q\in\mathbb{R}^3$: $M\mathbf x=\mathbf p$ unique **and** $M\mathbf x=\mathbf q$ infinite.
- (B) $\exists\,M\in\mathbb{R}^{3\times3}$: $M\mathbf x=\mathbf p$ no solution **and** $M\mathbf x=\mathbf q$ infinite.
- (C) $\exists\,M\in\mathbb{R}^{2\times3}$: $M\mathbf x=\mathbf p$ unique **and** $M\mathbf x=\mathbf q$ infinite.
- (D) $\exists\,M\in\mathbb{R}^{3\times2}$: $M\mathbf x=\mathbf p$ unique **and** $M\mathbf x=\mathbf q$ no solution.

**Solve** (shape intuition):
- **(A)** Square $3\times3$: unique for some RHS $\Rightarrow M$ invertible $\Rightarrow$ *every* RHS is unique — can't also be infinite. **False.**
- **(B)** Square **singular** $M$ (e.g. $\operatorname{rank}2$): inconsistent for some $\mathbf p$, infinitely many for some $\mathbf q$. **True.**
- **(C)** $2\times3$ (2 equations, 3 unknowns): $\operatorname{rank}\le2<3$, always a free variable $\Rightarrow$ a unique solution is **impossible**. **False.**
- **(D)** $3\times2$ (3 equations, 2 unknowns) with full column rank $2$: consistent $\mathbf p\Rightarrow$ unique; inconsistent $\mathbf q\Rightarrow$ none. **True.**

**Answer: (B) and (D).**

---

### Example 4 — Parameter for infinitely many *(original · Med)*
**Q.** For what value of $a$ does the system below have infinitely many solutions?
$$x+y+z=1,\quad x+2y+3z=2,\quad 2x+3y+a z=3.$$

**Solve.** Eliminate: $R_2-R_1:\ y+2z=1$; $R_3-2R_1:\ y+(a-2)z=1$. Then $(R_3')-(R_2'):\ (a-4)z=0$.
- If $a\ne4$: $z=0\Rightarrow$ unique solution.
- If $a=4$: the last row is $0=0$, leaving $\operatorname{rank}=2<3$ unknowns $\Rightarrow$ **infinitely many**.

**Answer: $a=4$.** *Method:* drive the parameter into the last pivot; set it to $0$ for the degenerate case (and confirm consistency).

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** For $A\in\mathbb{R}^{4\times6}$, the maximum possible rank is
(A) $4$ (B) $6$ (C) $10$ (D) $24$

**Q2. ★ (NAT)** If $A\in\mathbb{R}^{5\times5}$ has rank $3$, its nullity is __________ .

**Q3. ★★ (MCQ)** A system $A\mathbf x=\mathbf b$ with $A\in\mathbb{R}^{3\times3}$, $\operatorname{rank}(A)=2$, $\operatorname{rank}([A\mid \mathbf b])=3$ has
(A) a unique solution (B) infinitely many (C) no solution (D) exactly three

**Q4. ★★ (MCQ)** A homogeneous system $A\mathbf x=\mathbf 0$ with $A\in\mathbb{R}^{3\times4}$ has
(A) only the trivial solution (B) infinitely many solutions (C) no solution (D) a unique nonzero solution

**Q5. ★★ (NAT)** The system $x+y=2,\ 2x+2y=5$ has __________ solution(s).

**Q6. ★★ (MSQ)** For $A\in\mathbb{R}^{n\times n}$, which are equivalent to “$A$ is invertible”?
(A) $\operatorname{rank}(A)=n$ (B) $\operatorname{nullity}(A)=0$ (C) $\det(A)\ne0$ (D) $A\mathbf x=\mathbf 0$ has only the trivial solution

**Q7. ★★ (MCQ)** If $A\in\mathbb{R}^{3\times3}$ has $\det(A)=0$, then $A\mathbf x=\mathbf b$
(A) always has no solution (B) always has infinitely many (C) has either no solution or infinitely many (D) has a unique solution

**Q8. ★★ (NAT)** The dimension of the solution space of $\{\,x+2y+3z=0,\ 2x+4y+6z=0,\ x+y+z=0\,\}$ is __________ .

**Q9. ★★★ (MSQ)** Let $A\in\mathbb{R}^{m\times n}$. Which statements are ALWAYS true?
(A) If $m<n$ then $A\mathbf x=\mathbf 0$ has a nonzero solution.
(B) If $m>n$ then $A\mathbf x=\mathbf b$ always has a solution.
(C) $\operatorname{rank}(A)\le\min(m,n)$.
(D) If $\operatorname{rank}(A)=n$ then the columns of $A$ are linearly independent.

**Q10. ★★ (MCQ)** Solving a **general dense** $n\times n$ system by Gaussian elimination (forward elimination $+$ back-substitution) costs
(A) $O(n)$ (B) $O(n\log n)$ (C) $O(n^2)$ (D) $O(n^3)$

## Answer Key & Full Solutions

**Q1 — (A) $4$.** $\operatorname{rank}\le\min(4,6)=4$.

**Q2 — 2.** Rank–nullity: nullity $=n-\operatorname{rank}=5-3=2$ (columns $=5$).

**Q3 — (C) no solution.** $\operatorname{rank}(A)<\operatorname{rank}([A\mid \mathbf b])$ $\Rightarrow$ inconsistent.

**Q4 — (B) infinitely many.** $4$ unknowns $>3$ equations $\Rightarrow \operatorname{rank}\le3<4 \Rightarrow$ nullity $\ge1 \Rightarrow$ nontrivial solutions, infinitely many.

**Q5 — 0.** $2x+2y=5$ contradicts $2(x+y)=4$; $\operatorname{rank}(A)=1<\operatorname{rank}([A\mid \mathbf b])=2$ $\Rightarrow$ inconsistent.

**Q6 — (A), (B), (C), (D) — all four.** They are the standard equivalent conditions for invertibility (the Invertible Matrix Theorem).

**Q7 — (C).** $\det=0\Rightarrow A$ singular $\Rightarrow$ no solution *or* infinitely many, depending on $\mathbf b$; never unique.

**Q8 — 1.** Rows: $(1,2,3)$, $(2,4,6)=2\times$ first (dependent), $(1,1,1)$. Independent rows: $(1,2,3),(1,1,1)\Rightarrow\operatorname{rank}=2$; nullity $=3-2=1$.

**Q9 — (A), (C), (D).** (A) wide homogeneous $\Rightarrow$ nullity $\ge n-m>0$ — true. (B) **false**: a tall system is often inconsistent. (C) rank bound — true. (D) full column rank $\Leftrightarrow$ independent columns — true.

**Q10 — (D) $O(n^3)$.** Forward elimination dominates at $O(n^3)$; back-substitution adds only $O(n^2)$. (Compare 2025 Q12: an *already* upper-triangular matrix skips forward elimination and costs only $O(n^2)$.)

---

### How to read your score
- **8–10:** systems are solid — on to **5.3 Determinants & Eigenvalues/Eigenvectors** (the heaviest LA module).
- **6–7:** re-drill the **augmented-rank criterion** (Q3, Q5, Q7) and **shape intuition** (Q4, Q9).
- **≤5:** re-read Part 1 C–E; lock in *rank $+$ nullity $=$ columns*, *consistency needs equal augmented rank*, and *wide systems are never unique*.
