---
title: "5.5 Quadratic Forms & Positive Definiteness"
parent: "Module 5: Linear Algebra"
nav_order: 5
---

# GATE DA · LA Module 5.5 — Quadratic Forms & Positive-Definiteness

## Exam Relevance

**Where this sits:** Linear Algebra $\rightarrow$ _Quadratic Forms & Positive-Definiteness_ — the $\mathbf x^\top A\mathbf x$ machinery. Module **5 of 6** in Subject 5.

**Weightage:** moderate within LA, but **high cross-topic value** — it powers covariance/PCA (the first principal component maximizes $\mathbf u^\top\Sigma\mathbf u$), least squares, and Hessian-based optimization (Subject 7). Directly tested PYQs:

- **2025 Q38** (MCQ) — the Gram matrix of independent vectors is positive definite (hence invertible).
- **2026 Q65** (NAT) — maximize $\mathbf x^\top A\mathbf x$ on the unit sphere (Rayleigh quotient) for the centering matrix.

> **Why it matters:** two ideas do all the work — **definiteness $=$ the signs of the eigenvalues**, and the **Rayleigh quotient** $\dfrac{\mathbf x^\top A\mathbf x}{\mathbf x^\top\mathbf x}$ lies between $\lambda_{\min}$ and $\lambda_{\max}$. The same $\lambda_{\max}$ fact is the PCA max-variance result (2025 Q60, Module 3.9).

## Part 1 — Theory & Math

### A. Quadratic forms

A **quadratic form** in $\mathbf x\in\mathbb{R}^n$ is
$$q(\mathbf x)=\mathbf x^\top A\mathbf x=\sum_{i,j} a_{ij}\,x_i x_j .$$
Only the **symmetric part** of $A$ matters, so we always take $A$ symmetric. Reading off the matrix: the coefficient of $x_i^2$ is $a_{ii}$, and the coefficient of $x_i x_j$ ($i\ne j$) splits in half:
$$q=a\,x_1^2+b\,x_2^2+c\,x_1x_2 \;\longleftrightarrow\; A=\begin{bmatrix} a & c/2 \\ c/2 & b \end{bmatrix}.$$

### B. Definiteness (read from the eigenvalues)

For a symmetric $A$ with eigenvalues $\lambda_i$:

| Class                       | Condition on $q(\mathbf x)$                                 | Eigenvalues            |
| --------------------------- | ----------------------------------------------------------- | ---------------------- |
| positive definite (PD)      | $\mathbf x^\top A\mathbf x>0\ \forall\mathbf x\ne\mathbf 0$ | all $\lambda_i>0$      |
| positive semidefinite (PSD) | $\ge0\ \forall\mathbf x$                                    | all $\lambda_i\ge0$    |
| negative definite (ND)      | $<0\ \forall\mathbf x\ne\mathbf 0$                          | all $\lambda_i<0$      |
| negative semidefinite       | $\le0\ \forall\mathbf x$                                    | all $\lambda_i\le0$    |
| indefinite                  | both signs                                                  | mixed-sign $\lambda_i$ |

### C. Tests for positive definiteness

- **All eigenvalues $>0$** (the definition).
- **Sylvester's criterion:** all **leading principal minors** $>0$. For $\begin{bmatrix}a&b\\ b&c\end{bmatrix}$: $a>0$ **and** $ac-b^2>0$.
- $A=B^\top B$ with $B$ full column rank $\Rightarrow$ PD.
- PD $\Rightarrow$ invertible, $\det>0$, all diagonal entries $>0$ (but $\det>0$ **alone** is _not_ sufficient — two negative eigenvalues also give $\det>0$).

### D. Gram matrices

With vectors as the columns of $X$, the **Gram matrix** $G=X^\top X$ has $G_{ij}=\mathbf x_i^\top\mathbf x_j$.

- Always **PSD**: $\mathbf z^\top X^\top X\mathbf z=\lVert X\mathbf z\rVert^2\ge0$.
- **PD $\iff$ columns of $X$ are linearly independent** (then $X\mathbf z=\mathbf 0$ only for $\mathbf z=\mathbf 0$). So a Gram matrix of independent vectors is PD $\Rightarrow$ invertible, $\det>0$, no zero singular value. _(2025 Q38.)_

### E. Rayleigh quotient & extremal eigenvalues

For symmetric $A$,
$$R(\mathbf x)=\frac{\mathbf x^\top A\mathbf x}{\mathbf x^\top\mathbf x},\qquad \lambda_{\min}\le R(\mathbf x)\le\lambda_{\max}.$$

- On the **unit sphere** ($\mathbf x^\top\mathbf x=1$): $\displaystyle\max_{\lVert\mathbf x\rVert=1}\mathbf x^\top A\mathbf x=\lambda_{\max}$ (attained at the top eigenvector) and $\displaystyle\min=\lambda_{\min}$. _(2026 Q65.)_
- **PCA link:** the first principal component maximizes the variance $\mathbf u^\top\Sigma\mathbf u$ over unit $\mathbf u$, giving $\lambda_{\max}(\Sigma)$ (2025 Q60, Module 3.9).

### F. Diagonalizing a quadratic form

By the spectral theorem $A=Q\Lambda Q^\top$; the change of variables $\mathbf y=Q^\top\mathbf x$ turns $q$ into a clean weighted sum of squares,
$$\mathbf x^\top A\mathbf x=\sum_i \lambda_i\,y_i^2,$$
which makes the sign behavior (definiteness) transparent.

### G. Traps GATE exploits

1. Only the **symmetric part** of $A$ affects $\mathbf x^\top A\mathbf x$; remember the $\tfrac12$ on cross terms.
2. **PD $\ne$ “$\det>0$”** alone — check _all_ eigenvalues / _all_ leading minors.
3. Without the **unit-norm constraint**, $\mathbf x^\top A\mathbf x$ is unbounded; the max/min $=\lambda_{\max}/\lambda_{\min}$ is on the sphere.
4. Gram matrix is **always PSD**; PD exactly when the vectors are independent.
5. **PSD allows zero eigenvalues** (boundary); PD is strictly positive.

## Part 2 — How to Solve (Method)

### Build the matrix

$q=\sum_i a_{ii}x_i^2+\sum_{i<j}(2a_{ij})x_ix_j$. So **diagonal $=$ square coefficients**, **off-diagonal $a_{ij}=\tfrac12\times$ cross coefficient**.

### Classify definiteness

- Find eigenvalues (or use **leading principal minors** for small matrices). All $>0\to$ PD; all $\ge0\to$ PSD; mixed signs $\to$ indefinite.
- $2\times2$ shortcut $\begin{bmatrix}a&b\\ b&c\end{bmatrix}$: PD $\iff a>0$ and $ac-b^2>0$; indefinite $\iff ac-b^2<0$.

### Gram-matrix questions ($G=X^\top X$)

- Always symmetric PSD; **PD (invertible, $\det>0$, no zero singular value, $\mathbf z^\top G\mathbf z>0$) $\iff$ columns independent**.

### Max / min of $\mathbf x^\top A\mathbf x$

- **On the unit sphere** $\to \lambda_{\max}$ (max), $\lambda_{\min}$ (min). Just find the extreme eigenvalues.
- **Recognize structure:** centering matrix $\to$ eigenvalues $1,0\Rightarrow$ max $1$; covariance $\to$ max variance $=\lambda_{\max}$.

### Parameter (“for what $k$ is $A$ PD”)

- Apply Sylvester: set each leading minor $>0$ and solve the inequalities.

### Mistakes that cost marks

- Dropping the $\tfrac12$ on cross terms when forming $A$.
- Using $\det>0$ as a PD test.
- Forgetting the unit-norm constraint on the Rayleigh max/min.

## Part 3 — Worked Examples

### Example 1 — Gram matrix of independent vectors _(2025 Q38 · MCQ)_

**Q.** $\{\mathbf x_1,\dots,\mathbf x_n\}$ are linearly independent in $\mathbb{R}^n$, and $A\in\mathbb{R}^{n\times n}$ has $A_{ij}=\mathbf x_i^\top\mathbf x_j$. Which is correct? (A) $A$ is invertible (B) $0$ is a singular value of $A$ (C) $\det A=0$ (D) $\mathbf z^\top A\mathbf z=0$ for some nonzero $\mathbf z$.

**Solve.** $A=X^\top X$ where $X=[\mathbf x_1\ \cdots\ \mathbf x_n]$. For any $\mathbf z\ne\mathbf 0$,
$$\mathbf z^\top A\mathbf z=\mathbf z^\top X^\top X\mathbf z=\lVert X\mathbf z\rVert^2\ge0,$$
and it equals $0$ only if $X\mathbf z=\mathbf 0$, i.e. $\mathbf z=\mathbf 0$ (columns independent). So $\mathbf z^\top A\mathbf z>0$ for all $\mathbf z\ne\mathbf 0$ $\Rightarrow A$ is **positive definite** $\Rightarrow$ invertible, $\det>0$, all singular values $>0$.

- (A) **True.** (B) false, (C) false, (D) false (these all contradict PD).

**Answer: (A).**

---

### Example 2 — Rayleigh max on the unit sphere _(2026 Q65 · NAT)_

**Q.** $A=I_n-\tfrac1n\mathbf 1\mathbf 1^\top$. Find $\displaystyle\max_{\mathbf x^\top\mathbf x=1}\ \mathbf x^\top A\mathbf x$ (answer in integer).

**Solve.** On the unit sphere the maximum of $\mathbf x^\top A\mathbf x$ equals $\lambda_{\max}(A)$. The centering matrix $A$ (symmetric, from Module 5.4) has eigenvalues $1$ (multiplicity $n-1$) and $0$ (once). Hence $\lambda_{\max}=1$.

**Answer: $1$.** _Method:_ recognize the structured matrix $\to$ its top eigenvalue.

---

### Example 3 — Classify definiteness _(original · Med)_

**Q.** Is $q(x,y)=2x^2+2y^2+2xy$ positive definite?

**Solve.** Matrix $A=\begin{bmatrix}2 & 1\\ 1 & 2\end{bmatrix}$ (off-diagonal $=\tfrac12\cdot2=1$).

- **Minors:** $a=2>0$ and $\det=2\cdot2-1^2=3>0$ $\Rightarrow$ PD.
- **Eigen-check:** $\operatorname{tr}=4,\det=3\Rightarrow\lambda^2-4\lambda+3=0\Rightarrow\lambda=1,3$ — both $>0$.

**Answer: yes, positive definite.** _Method:_ Sylvester's leading-minor test (confirmed by eigenvalues).

---

### Example 4 — Range of a quadratic form _(original · Med)_

**Q.** For $A=\begin{bmatrix}3 & 1\\ 1 & 3\end{bmatrix}$, find the maximum and minimum of $\mathbf x^\top A\mathbf x$ subject to $\mathbf x^\top\mathbf x=1$.

**Solve.** Eigenvalues: $\operatorname{tr}=6,\det=8\Rightarrow\lambda^2-6\lambda+8=0\Rightarrow\lambda=2,4$. On the unit sphere, $\min=\lambda_{\min}=2$ and $\max=\lambda_{\max}=4$.

**Answer: max $=4$, min $=2$.** _Method:_ Rayleigh quotient is bounded by the extreme eigenvalues.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** The quadratic form $\mathbf x^\top A\mathbf x$ depends only on
(A) the symmetric part of $A$ (B) the diagonal of $A$ (C) $\det A$ (D) $\operatorname{tr}A$

**Q2. ★ (MCQ)** A symmetric matrix is positive definite iff
(A) $\det>0$ (B) $\operatorname{tr}>0$ (C) all eigenvalues $>0$ (D) all entries $>0$

**Q3. ★★ (NAT)** For $A=\begin{bmatrix}4&0\\ 0&9\end{bmatrix}$, the maximum of $\mathbf x^\top A\mathbf x$ over $\mathbf x^\top\mathbf x=1$ is \***\*\_\_\*\*** .

**Q4. ★★ (NAT)** For the same $A$, the minimum of $\mathbf x^\top A\mathbf x$ over the unit sphere is \***\*\_\_\*\*** .

**Q5. ★★ (MCQ)** The matrix $\begin{bmatrix}2&1\\ 1&2\end{bmatrix}$ is
(A) positive definite (B) negative definite (C) indefinite (D) singular

**Q6. ★★ (MSQ)** Let $G=X^\top X$ be a Gram matrix. Which are TRUE?
(A) $G$ is symmetric (B) $G$ is always PSD (C) $G$ is PD iff the columns of $X$ are linearly independent (D) $G$ can have negative eigenvalues

**Q7. ★★ (MCQ)** The quadratic form $q(x,y)=x^2-y^2$ is
(A) PD (B) PSD (C) indefinite (D) ND

**Q8. ★★★ (NAT)** For $A=\begin{bmatrix}2&1\\ 1&2\end{bmatrix}$, the minimum of $\mathbf x^\top A\mathbf x$ subject to $\mathbf x^\top\mathbf x=1$ is \***\*\_\_\*\*** .

**Q9. ★★ (MSQ)** A symmetric matrix has eigenvalues $0,2,5$. Which are TRUE?
(A) it is PSD (B) it is PD (C) it is singular (D) $\max_{\lVert\mathbf x\rVert=1}\mathbf x^\top A\mathbf x=5$

**Q10. ★★★ (MCQ)** For which $k$ is $A=\begin{bmatrix}1&k\\ k&4\end{bmatrix}$ positive definite?
(A) $k^2<4$ (B) $k^2>4$ (C) any $k$ (D) $k=2$

## Answer Key & Full Solutions

**Q1 — (A) the symmetric part of $A$.** $\mathbf x^\top A\mathbf x=\mathbf x^\top\!\big(\tfrac{A+A^\top}{2}\big)\mathbf x$; the skew part contributes $0$.

**Q2 — (C) all eigenvalues $>0$.** The definition of PD (det/trace/entries are not sufficient).

**Q3 — 9.** Diagonal matrix: eigenvalues $4,9$; max on the unit sphere $=\lambda_{\max}=9$.

**Q4 — 4.** Min $=\lambda_{\min}=4$.

**Q5 — (A) positive definite.** Leading minors $2>0$ and $4-1=3>0$ (eigenvalues $1,3$).

**Q6 — (A), (B), (C).** $G$ is symmetric and PSD ($\mathbf z^\top G\mathbf z=\lVert X\mathbf z\rVert^2\ge0$); PD exactly when columns are independent. (D) false — PSD has no negative eigenvalues.

**Q7 — (C) indefinite.** Eigenvalues $1$ and $-1$ (mixed signs).

**Q8 — 1.** Eigenvalues of $\begin{bmatrix}2&1\\ 1&2\end{bmatrix}$ are $1,3$; min on the unit sphere $=\lambda_{\min}=1$.

**Q9 — (A), (C), (D).** Eigenvalues $0,2,5\ge0\Rightarrow$ PSD (A) but not PD (the $0$ rules out B); a $0$ eigenvalue $\Rightarrow\det=0\Rightarrow$ singular (C); $\lambda_{\max}=5$ (D).

**Q10 — (A) $k^2<4$.** Sylvester: $1>0$ (always) and $\det=4-k^2>0\Rightarrow k^2<4$ (i.e. $\lvert k\rvert<2$).

---

### How to read your score

- **8–10:** quadratic forms are solid — on to the finale **5.6 SVD & LU Decomposition**.
- **6–7:** re-drill **definiteness tests** (Q5, Q10) and **Rayleigh max/min** (Q3, Q4, Q8).
- **≤5:** re-read Part 1 B–E; lock in _definiteness $=$ eigenvalue signs_, _Gram $=$ PSD (PD iff independent)_, and _unit-sphere max/min $=\lambda_{\max}/\lambda_{\min}$_.
