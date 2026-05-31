---
title: "5.3 Determinants, Eigenvalues & Eigenvectors"
parent: "Module 5: Linear Algebra"
nav_order: 3
---

# GATE DA · LA Module 5.3 — Determinants & Eigenvalues/Eigenvectors

## Exam Relevance

**Where this sits:** Linear Algebra $\rightarrow$ *Determinants & Eigenvalues/Eigenvectors* — the **single highest-yield** topic in LA. Module **3 of 6** in Subject 5.

**Weightage:** roughly **7 of the ~30 LA marks** across 2024–26 touch eigenvalues/determinants — the densest cluster in the subject, and the ideas feed PCA, SVD, quadratic forms, and Markov-style reasoning. Directly tested PYQs for this module:
- **2024 Q13** (MCQ) — real vs complex eigenvalues of a $2\times2$ via trace/det.
- **2024 Q35** (NAT) — $\det(M^2+12M)$ using singularity + product rule.
- **2025 Q28** (MSQ) — eigenvalues of a rank-1 update $I+\mathbf x\mathbf x^\top$.
- **2025 Q37** (MCQ) — a matrix satisfying $A^3=A$.
- **2026 Q21** (MCQ) — powers of a rotation matrix $M^{2026}$.
- **2026 Q46** (MCQ) — eigenvalues of a rotation block via the trace identity.

> **Why it matters:** two identities — **trace $=\sum\lambda_i$** and **det $=\prod\lambda_i$** — plus a small **toolkit of eigenvalue transformations** crack most questions in seconds. Recognize the *structure* (rotation, rank-1 update, polynomial relation) and you rarely need to expand a determinant.

## Part 1 — Theory & Math

### A. Determinant — properties to know cold
- $\det(AB)=\det(A)\det(B)$; $\det(A^\top)=\det(A)$; $\det(cA)=c^{\,n}\det(A)$ for $A\in\mathbb{R}^{n\times n}$; $\det(A^{-1})=1/\det(A)$.
- $\det(A)=\prod_i \lambda_i$ (product of eigenvalues); $\operatorname{tr}(A)=\sum_i \lambda_i$.
- **Singular** $\iff \det(A)=0 \iff 0$ is an eigenvalue $\iff$ rows/columns dependent.
- **Triangular/diagonal:** $\det=$ product of diagonal entries.
- Row ops: **swap** two rows $\to$ sign flips; **scale** a row by $c \to \det$ scales by $c$; **add a multiple** of one row to another $\to \det$ unchanged. A **repeated or dependent row** $\Rightarrow \det=0$.
- **No additive rule:** $\det(A+B)\ne\det(A)+\det(B)$ in general.

### B. Eigenvalues & eigenvectors
$A\mathbf v=\lambda\mathbf v$ with $\mathbf v\ne\mathbf 0$. Find eigenvalues from the **characteristic equation**
$$\det(A-\lambda I)=0.$$
For a $2\times2$ matrix this is
$$\lambda^2 - (\operatorname{tr}A)\,\lambda + \det A = 0,$$
with discriminant $(\operatorname{tr}A)^2-4\det A$: $>0$ distinct real, $=0$ repeated, $<0$ **complex conjugate pair**. Real matrices **can** have complex eigenvalues.

### C. Eigenvalue toolkit — transformations
If $\lambda$ is an eigenvalue of $A$ (eigenvector $\mathbf v$):

| Matrix | Its eigenvalues |
| --- | --- |
| $A^k$ | $\lambda^k$ |
| $A^{-1}$ | $1/\lambda$ |
| $A+cI$ | $\lambda+c$ |
| $cA$ | $c\lambda$ |
| $A^\top$ | $\lambda$ (same as $A$) |
| $p(A)$ (polynomial) | $p(\lambda)$ |

### D. Eigenvalues of structured matrices (the GATE favourites)

| Structure | Eigenvalues |
| --- | --- |
| triangular / diagonal | the diagonal entries |
| rank-1 update $cI+\mathbf u\mathbf v^\top$ | $c$ (multiplicity $n-1$) and $c+\mathbf v^\top\mathbf u$ (once) |
| rotation $R(\theta)=\begin{bmatrix}\cos\theta & -\sin\theta\\ \sin\theta & \cos\theta\end{bmatrix}$ | $e^{\pm i\theta}=\cos\theta\pm i\sin\theta$ |
| idempotent $A^2=A$ (projection) | $0$ or $1$ |
| orthogonal | $\lvert \lambda\rvert=1$ |
| satisfies $p(A)=0$ | among the roots of $p$ |

- **Rotation powers:** $R(\theta)^k=R(k\theta)$ — use **periodicity**, never multiply out.
- **Rank-1 update intuition:** $(\,cI+\mathbf u\mathbf v^\top)\mathbf w = c\mathbf w$ for every $\mathbf w\perp\mathbf v$; the one special direction is $\mathbf u$.

### E. Diagonalization (exam essentials)
- $A$ is diagonalizable if it has $n$ independent eigenvectors: $A=PDP^{-1}$, $D=\operatorname{diag}(\lambda_1,\dots,\lambda_n)$. Then $A^k=PD^kP^{-1}$.
- **Spectral theorem:** every **real symmetric** matrix is diagonalizable with **real** eigenvalues and **orthogonal** eigenvectors (used heavily in 5.4–5.5).
- **Cayley–Hamilton:** every matrix satisfies its own characteristic equation — handy to reduce high powers or write $A^{-1}$ as a polynomial in $A$.

### F. Traps GATE exploits
1. **Real matrix $\ne$ real eigenvalues** — rotations give complex ones.
2. $\det(A+B)\ne\det A+\det B$; but $\det(AB)=\det A\det B$ **does** hold.
3. $\operatorname{tr}=\sum\lambda_i$ holds **even for complex** eigenvalues (imaginary parts cancel for real $A$).
4. Eigenvalues of $A^2$ are $\lambda^2$ — so $+\lambda$ and $-\lambda$ **collapse** to the same $\lambda^2$.
5. For rotation powers, exploit $R(\theta)^k=R(k\theta)$ and reduce $k\theta$ mod $2\pi$.
6. Singular $\iff 0$ is an eigenvalue — spotting a dependent row gives $\det=0$ instantly.

## Part 2 — How to Solve (Method)

### Find eigenvalues fast
- **$2\times2$:** read off $\operatorname{tr}$ and $\det$, solve $\lambda^2-(\operatorname{tr})\lambda+\det=0$. Sign of discriminant $(\operatorname{tr})^2-4\det$ tells real/complex without solving.
- **Triangular / block-triangular / diagonal:** eigenvalues are the diagonal (or per-block) values — no work.
- **Use the two identities:** sum of eigenvalues $=\operatorname{tr}$, product $=\det$. Often you can deduce the missing eigenvalue.

### Recognize structure (then read eigenvalues off the table)
- $cI+\mathbf u\mathbf v^\top$? $\to$ eigenvalues $c$ (mult $n-1$), $c+\mathbf v^\top\mathbf u$.
- rotation? $\to e^{\pm i\theta}$; for powers use $R(k\theta)$ and reduce mod $2\pi$.
- given a **polynomial relation** $p(A)=0$ (e.g. $A^3=A$)? $\to$ eigenvalues lie among roots of $p$ ($\lambda^3=\lambda\Rightarrow\lambda\in\{0,1,-1\}$).
- idempotent / projection? $\to 0,1$.

### Determinant questions
- **Scan for a dependent row/column first** ($\Rightarrow\det=0$) before any expansion.
- **Factor products:** $\det(M^2+12M)=\det\!\big(M(M+12I)\big)=\det(M)\det(M+12I)$; $\det(M^k)=(\det M)^k$.
- If eigenvalues are known, $\det=\prod\lambda_i$ and $\det\big(p(A)\big)=\prod p(\lambda_i)$.

### Powers $A^k$
- rotation $\to$ periodicity; diagonalizable $\to PD^kP^{-1}$; otherwise Cayley–Hamilton to reduce the degree.

### Mistakes that cost marks
- Assuming eigenvalues are real (missing the rotation/complex case).
- Expanding $\det$ of a product directly instead of using $\det(AB)=\det A\det B$.
- Multiplying out rotation powers instead of using $R(k\theta)$.
- Forgetting that $\pm\lambda$ both map to $\lambda^2$ under squaring.

## Part 3 — Worked Examples

### Example 1 — Real or complex eigenvalues? *(2024 Q13 · MCQ)*
**Q.** For $M=\begin{bmatrix}2 & -1\\ 3 & 1\end{bmatrix}$, which is TRUE? (A) eigenvalues non-negative real (B) complex conjugate pair (C) one positive real, one zero (D) one non-negative real, one negative real.

**Solve.** $\operatorname{tr}M=2+1=3$, $\det M=(2)(1)-(-1)(3)=2+3=5$. Characteristic equation $\lambda^2-3\lambda+5=0$, discriminant $=9-20=-11<0$ $\Rightarrow$ a **complex conjugate pair** $\dfrac{3\pm i\sqrt{11}}{2}$.

**Answer: (B).** *Method:* discriminant of $\lambda^2-(\operatorname{tr})\lambda+\det$.

---

### Example 2 — Determinant via singularity *(2024 Q35 · NAT)*
**Q.** For $M=\begin{bmatrix}1&2&3\\ 3&1&3\\ 4&3&6\end{bmatrix}$, find $\det(M^2+12M)$.

**Solve.** Spot the dependency: row$_1+$row$_2=(4,3,6)=$ row$_3$, so the rows are linearly dependent $\Rightarrow \det(M)=0$. Factor:
$$\det(M^2+12M)=\det\!\big(M(M+12I)\big)=\det(M)\,\det(M+12I)=0\cdot\det(M+12I)=0.$$

**Answer: $0$.** *Method:* find the dependent row first; never expand the $3\times3$ product.

---

### Example 3 — Eigenvalues of a rank-1 update *(2025 Q28 · MSQ)*
**Q.** $A=I_n+\mathbf x\mathbf x^\top$, where $\mathbf x\in\mathbb{R}^n$ and $\mathbf x^\top\mathbf x=1$. Which is/are correct? (A) rank of $A$ is $n$ (B) $A$ is invertible (C) $0$ is an eigenvalue (D) $A^{-1}$ has a negative eigenvalue.

**Solve.** For any $\mathbf v\perp\mathbf x$: $A\mathbf v=\mathbf v+\mathbf x(\mathbf x^\top\mathbf v)=\mathbf v$ $\Rightarrow$ eigenvalue $1$ with multiplicity $n-1$. For $\mathbf v=\mathbf x$: $A\mathbf x=\mathbf x+\mathbf x(\mathbf x^\top\mathbf x)=\mathbf x+\mathbf x=2\mathbf x$ $\Rightarrow$ eigenvalue $2$. So eigenvalues are $\{1\ (n-1\ \text{times}),\ 2\}$ — all positive.
- (A) all eigenvalues nonzero $\Rightarrow \operatorname{rank}=n$. **True.**
- (B) invertible (no zero eigenvalue). **True.**
- (C) $0$ is an eigenvalue. **False.**
- (D) eigenvalues of $A^{-1}$ are $1$ and $\tfrac12$ — both positive. **False.**

**Answer: (A) and (B).** *Method:* $cI+\mathbf u\mathbf v^\top$ pattern with $c=1$.

---

### Example 4 — Rotation block via the trace identity *(2026 Q46 · MCQ)*
**Q.** The eigenvalues $\gamma_1,\gamma_2,\gamma_3$ of $\begin{bmatrix}1&0&0\\ 0&\cos t&\sin t\\ 0&-\sin t&\cos t\end{bmatrix}$, $t\in[-\pi,\pi]$, satisfy $\gamma_1+\gamma_2+\gamma_3=1+\sqrt2$. Find all such $t$. (A) $\{\pi/3,-\pi/4\}$ (B) $\{\pi/4,-\pi/3\}$ (C) $\{\pi/4,-\pi/4\}$ (D) $\{\pi/3,-\pi/3\}$.

**Solve.** The matrix is block-diagonal: a $1\times1$ block $[1]$ and a $2\times2$ rotation-type block with eigenvalues $\cos t\pm i\sin t$. The sum of eigenvalues equals the **trace**:
$$\gamma_1+\gamma_2+\gamma_3=1+2\cos t.$$
Set $1+2\cos t=1+\sqrt2 \Rightarrow \cos t=\dfrac{\sqrt2}{2} \Rightarrow t=\pm\dfrac{\pi}{4}$ (both in $[-\pi,\pi]$).

**Answer: (C) $\{\pi/4,-\pi/4\}$.** *Method:* sum of eigenvalues $=\operatorname{tr}$ — no need to find each $\gamma_i$.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** The eigenvalues of a triangular matrix are
(A) its diagonal entries (B) its row sums (C) always $0$ (D) its column sums

**Q2. ★ (NAT)** A $3\times3$ matrix has eigenvalues $2,3,4$. Then $\det(A)=$ __________ .

**Q3. ★ (NAT)** For the same matrix (eigenvalues $2,3,4$), $\operatorname{tr}(A)=$ __________ .

**Q4. ★★ (MCQ)** If $\lambda$ is an eigenvalue of an invertible $A$, then an eigenvalue of $A^{-1}$ is
(A) $\lambda$ (B) $1/\lambda$ (C) $-\lambda$ (D) $\lambda^2$

**Q5. ★★ (MCQ)** Let $A\in\mathbb{R}^{n\times n}$ with $A^3=A$. Which one is ALWAYS correct?
(A) $A$ is invertible (B) $\det(A)=0$ (C) $\operatorname{tr}(A)=1$ (D) $A$ and $A^2$ have the same rank

**Q6. ★★ (MCQ)** Let $M$ be rotation by $\theta=\dfrac{2\pi}{5}$. Then $M^{2026}=$
(A) $M^2$ (B) $M$ (C) $M^{-1}$ (D) $I_2$

**Q7. ★★ (NAT)** $A=3I_4+\mathbf u\mathbf u^\top$, where $\mathbf u\in\mathbb{R}^4$ and $\mathbf u^\top\mathbf u=2$. The largest eigenvalue of $A$ is __________ .

**Q8. ★★ (MSQ)** For a real square matrix $A$, which are TRUE?
(A) all eigenvalues are real (B) complex eigenvalues occur in conjugate pairs (C) $\operatorname{tr}(A)=\sum_i\lambda_i$ (D) $\det(A)=\prod_i\lambda_i$

**Q9. ★★ (MCQ)** The matrix $\begin{bmatrix}0&-1\\ 1&0\end{bmatrix}$ has eigenvalues
(A) $\pm1$ (B) $\pm i$ (C) $0,1$ (D) $1,1$

**Q10. ★★★ (NAT)** $A$ is $3\times3$ with eigenvalues $1,-1,2$. Then $\det(A^2+A)=$ __________ .

**Q11. ★★ (MCQ)** If $A$ is idempotent ($A^2=A$), its eigenvalues are
(A) $0$ or $1$ (B) $\pm1$ (C) only $1$ (D) any real number

**Q12. ★★★ (MSQ)** A $2\times2$ real matrix has $\operatorname{tr}=4$ and $\det=5$. Which are TRUE?
(A) eigenvalues are real (B) eigenvalues are complex conjugates (C) sum of eigenvalues is $4$ (D) product of eigenvalues is $5$

## Answer Key & Full Solutions

**Q1 — (A) diagonal entries.** $\det(A-\lambda I)$ of a triangular matrix is the product of $(\text{diagonal}-\lambda)$ factors.

**Q2 — 24.** $\det=\prod\lambda_i=2\cdot3\cdot4=24$.

**Q3 — 9.** $\operatorname{tr}=\sum\lambda_i=2+3+4=9$.

**Q4 — (B) $1/\lambda$.** $A\mathbf v=\lambda\mathbf v\Rightarrow A^{-1}\mathbf v=\tfrac1\lambda\mathbf v$.

**Q5 — (D).** $A^3=A\Rightarrow$ eigenvalues satisfy $\lambda^3=\lambda$, so $\lambda\in\{0,1,-1\}$. (A) false ($A=0$ allowed), (B) false ($A=I$), (C) false. (D) true: $A^3=A$ forces the rank to stabilize, $\operatorname{rank}(A)=\operatorname{rank}(A^2)$.

**Q6 — (B) $M$.** $M^5=R(5\cdot\tfrac{2\pi}{5})=R(2\pi)=I$; $2026=5\cdot405+1$, so $M^{2026}=M^1=M$.

**Q7 — 5.** Pattern $cI+\mathbf u\mathbf u^\top$ with $c=3$: eigenvalues $3$ (mult $3$) and $3+\mathbf u^\top\mathbf u=3+2=5$. Largest $=5$.

**Q8 — (B), (C), (D).** (A) is false — real matrices can have complex eigenvalues (e.g. rotations). The rest are standard identities.

**Q9 — (B) $\pm i$.** $\operatorname{tr}=0,\det=1\Rightarrow\lambda^2+1=0\Rightarrow\lambda=\pm i$ (rotation by $90^\circ$).

**Q10 — 0.** Eigenvalues of $A^2+A$ are $\lambda^2+\lambda$: for $1\to2$, for $-1\to0$, for $2\to6$. $\det=\prod=2\cdot0\cdot6=0$. (The $-1$ eigenvalue annihilates the product.)

**Q11 — (A) $0$ or $1$.** $A^2=A\Rightarrow\lambda^2=\lambda\Rightarrow\lambda\in\{0,1\}$.

**Q12 — (B), (C), (D).** Discriminant $=\operatorname{tr}^2-4\det=16-20=-4<0\Rightarrow$ complex conjugates, so (A) false. Sum $=\operatorname{tr}=4$, product $=\det=5$ always hold.

---

### How to read your score
- **9–12:** the highest-yield LA topic is in hand — on to **5.4 Special Matrices & Projections**.
- **6–8:** re-drill the **eigenvalue toolkit** (Q4, Q7, Q10) and **real-vs-complex** discriminant (Q9, Q12).
- **≤5:** re-read Part 1 B–D; memorize *trace $=\sum\lambda$, det $=\prod\lambda$*, the transformation table, and the structured-matrix table.
