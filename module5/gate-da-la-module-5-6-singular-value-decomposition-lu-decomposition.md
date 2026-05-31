---
title: "5.6 SVD & LU Decomposition"
parent: "Module 5: Linear Algebra"
nav_order: 6
---

# GATE DA · LA Module 5.6 — Singular Value Decomposition & LU Decomposition

## Exam Relevance

**Where this sits:** Linear Algebra $\rightarrow$ _Singular Value Decomposition & LU Decomposition_ — the matrix-factorization finale. Module **6 of 6** in Subject 5 — **this completes Linear Algebra.**

**Weightage:** SVD is **lightly but reliably** tested and underpins PCA/compression; **LU has no direct PYQ in 2024–26** (efficient coverage — know the mechanics, don't over-invest). Directly tested PYQs:

- **2024 Q61** (NAT) — singular values of a rank-1 matrix $\mathbf u\mathbf u^\top$.
- **2025 Q50** (MSQ, cross-ref from Module 5.4) — singular values of a projection are $0$ or $1$.

> **Why it matters:** one bridge fact cracks most SVD questions — **singular values are $\sqrt{\text{eigenvalues of }A^\top A}\ge 0$**, and for a **symmetric PSD** matrix they simply _equal_ the eigenvalues. That single idea connects this module to eigenvalues (5.3), projections (5.4), and quadratic forms (5.5).

## Part 1 — Theory & Math

### A. Singular Value Decomposition (SVD)

**Every** matrix $A\in\mathbb{R}^{m\times n}$ factors as
$$A=U\Sigma V^\top,$$
with $U\in\mathbb{R}^{m\times m}$ orthogonal (left singular vectors), $V\in\mathbb{R}^{n\times n}$ orthogonal (right singular vectors), and $\Sigma\in\mathbb{R}^{m\times n}$ “diagonal” with $\sigma_1\ge\sigma_2\ge\cdots\ge0$ (the **singular values**).

### B. Singular values $\leftrightarrow$ eigenvalues (the bridge)

- $\sigma_i=\sqrt{\lambda_i(A^\top A)}$ — square roots of the eigenvalues of $A^\top A$ (equivalently $AA^\top$); these are always $\ge0$ since $A^\top A$ is **symmetric PSD**.
- **Number of nonzero singular values $=\operatorname{rank}(A)$.**
- **Symmetric** $A$: $\sigma_i=\lvert \lambda_i\rvert$.
- **Symmetric PSD** $A$ (projection, covariance, Gram): $\sigma_i=\lambda_i$ (since $\lambda_i\ge0$). _(Why 2025 Q50's projection has singular values $=$ eigenvalues $=0/1$.)_

### C. Rank-1 matrices

- $\mathbf u\mathbf v^\top$ has **exactly one** nonzero singular value $=\lVert\mathbf u\rVert\,\lVert\mathbf v\rVert$.
- Symmetric case $\mathbf u\mathbf u^\top$ (PSD): single nonzero eigenvalue $=$ singular value $=\mathbf u^\top\mathbf u=\lVert\mathbf u\rVert^2$ (eigenvector $\mathbf u$). _(2024 Q61.)_

### D. Key SVD facts

- $\sigma_i\ge0$ **always** (unlike eigenvalues, which may be negative or complex).
- $\sigma_1=\lVert A\rVert_2$ (spectral / operator-2 norm); $\lVert A\rVert_F=\sqrt{\sum_i\sigma_i^2}$ (Frobenius norm).
- Square $A$: $\lvert \det A\rvert=\prod_i\sigma_i$.
- SVD exists for **any** matrix (rectangular, rank-deficient) — more general than eigendecomposition.
- **Eckart–Young:** keeping the top $k$ singular values gives the best rank-$k$ approximation — the basis of PCA and compression.

### E. SVD vs eigendecomposition

|                   | Eigendecomposition                 | SVD                         |
| ----------------- | ---------------------------------- | --------------------------- |
| applies to        | square (diagonalizable)            | any $m\times n$             |
| form              | $A=PDP^{-1}$                       | $A=U\Sigma V^\top$          |
| factors           | $P$ (not generally orthogonal)     | $U,V$ orthogonal            |
| values            | eigenvalues (can be $<0$, complex) | singular values $\ge0$      |
| symmetric PSD $A$ | $\lambda_i$                        | $\sigma_i=\lambda_i$ (same) |

### F. LU Decomposition _(efficient coverage — no PYQ 2024–26)_

- Factor $A=LU$: $L$ lower-triangular (unit diagonal), $U$ upper-triangular — produced by **Gaussian elimination** (multipliers fill $L$, the reduced matrix is $U$). With row pivoting: $PA=LU$.
- **Use:** solve $A\mathbf x=\mathbf b$ for many right-hand sides — factor once ($O(n^3)$), then each solve is two triangular solves: $L\mathbf y=\mathbf b$ (forward), $U\mathbf x=\mathbf y$ (back), each $O(n^2)$.
- $\det A=\prod_i U_{ii}$ (since $\det L=1$). Exists with no pivoting when all leading principal minors are nonzero.
- **Cholesky** (symmetric PD special case): $A=LL^\top$.

### G. Traps GATE exploits

1. Singular values are $\ge0$ **always** — don't report a negative one.
2. For symmetric $A$, $\sigma_i=\lvert \lambda_i\rvert$ — equal to $\lambda_i$ only when PSD.
3. **#nonzero singular values $=\operatorname{rank}$**, not the matrix size.
4. Rank-1 $\mathbf u\mathbf v^\top$ has **one** nonzero singular value $\lVert\mathbf u\rVert\lVert\mathbf v\rVert$; the rest are $0$.
5. LU comes straight from Gaussian elimination; $\det=\prod U_{ii}$.

## Part 2 — How to Solve (Method)

### Find singular values

- General: eigenvalues of $A^\top A$, then take **square roots**.
- **Symmetric** $A$: $\sigma_i=\lvert \lambda_i\rvert$; **PSD**: $\sigma_i=\lambda_i$.
- **Rank-1** $\mathbf u\mathbf v^\top$: one nonzero $\sigma=\lVert\mathbf u\rVert\lVert\mathbf v\rVert$; symmetric $\mathbf u\mathbf u^\top$: $\sigma=\lVert\mathbf u\rVert^2$.
- **Sum of singular values:** for PSD use $\sum\lambda_i=\operatorname{tr}$; for rank-1, it's the single value.

### Recognize structure

- projection $\to$ singular values $0/1$, count $=$ rank.
- orthogonal $\to$ all singular values $=1$.
- diagonal $\to$ singular values $=\lvert \text{diagonal}\rvert$.

### LU tasks

- Run Gaussian elimination $\to$ multipliers form $L$, reduced matrix is $U$; $\det=\prod U_{ii}$; solve via forward-then-back substitution.

### Mistakes that cost marks

- Reporting eigenvalues instead of their **square roots / absolute values**.
- Forgetting $\sigma\ge0$.
- Confusing the **count** of nonzero singular values with the matrix dimension (it's the rank).

## Part 3 — Worked Examples

### Example 1 — Singular values of a rank-1 matrix _(2024 Q61 · NAT)_

**Q.** Let $\mathbf u=(1,2,3,4,5)^\top$ and let $\sigma_1,\dots,\sigma_5$ be the singular values of $M=\mathbf u\mathbf u^\top$. Find $\sum_{i=1}^{5}\sigma_i$.

**Solve.** $M=\mathbf u\mathbf u^\top$ is symmetric, PSD, and **rank $1$**. Its only nonzero eigenvalue: $M\mathbf u=\mathbf u(\mathbf u^\top\mathbf u)=(\mathbf u^\top\mathbf u)\mathbf u$, so
$$\lambda_{\max}=\mathbf u^\top\mathbf u=1^2+2^2+3^2+4^2+5^2=55,$$
with the other four eigenvalues $0$. Since $M$ is symmetric PSD, **singular values $=$ eigenvalues** $=\{55,0,0,0,0\}$. Therefore
$$\sum_{i=1}^5\sigma_i=55.$$

**Answer: $55$.** _Trap avoided:_ only **one** singular value is nonzero — a rank-1 matrix.

---

### Example 2 — Singular values of a projection _(2025 Q50 · MSQ · cross-ref Module 5.4)_

**Q.** $\mathbf x_1,\dots,\mathbf x_5$ orthonormal in $\mathbb{R}^{10}$, $A=\sum_{i=1}^5\mathbf x_i\mathbf x_i^\top$. Are the singular values $(A)$ equal to the eigenvalues and $(B)$ equal to $0$ or $1$?

**Solve.** $A$ is the orthogonal **projection** onto a $5$-dim subspace — symmetric, PSD, eigenvalues $1$ (mult $5$) and $0$ (mult $5$). For symmetric PSD matrices **singular values $=$ eigenvalues**, so they are exactly $\{1,1,1,1,1,0,0,0,0,0\}$.

- (A) singular values $=$ eigenvalues. **True.**
- (B) singular values are $0$ or $1$. **True.**

**Answer: (A) and (B).** (#nonzero $\sigma=5=\operatorname{rank}$; $\det=0$, so $A$ is not invertible.)

---

### Example 3 — Singular values from eigenvalues _(original · Easy–Med)_

**Q.** Find the singular values of $A=\begin{bmatrix}2&0\\\\ 0&-3\end{bmatrix}$.

**Solve.** $A$ is symmetric with eigenvalues $2$ and $-3$. Singular values are the **absolute values**: $\sigma=\lvert 2\rvert=2$ and $\lvert-3\rvert=3$, i.e. $\{3,2\}$.

**Answer: $3$ and $2$.** _Key point:_ $\sigma\ge0$ even though an eigenvalue is negative. (Check: $A^\top A=\operatorname{diag}(4,9)$, $\sigma=\sqrt{4},\sqrt{9}=2,3$.)

---

### Example 4 — LU decomposition & determinant _(original · Med)_

**Q.** Find the LU factorization of $A=\begin{bmatrix}2&1\\\\ 4&5\end{bmatrix}$ and use it for $\det A$.

**Solve.** Eliminate: $R_2-2R_1$ (multiplier $m_{21}=2$) gives $(0,\,3)$. So
$$L=\begin{bmatrix}1&0\\ 2&1\end{bmatrix},\qquad U=\begin{bmatrix}2&1\\ 0&3\end{bmatrix}.$$
$\det A=\prod U_{ii}=2\cdot3=6$ (matches $2\cdot5-1\cdot4=6$).

**Answer:** $A=LU$ as above, $\det A=6$. _Method:_ Gaussian-elimination multiplier $\to L$, reduced matrix $\to U$, $\det=\prod U_{ii}$.

---

### Example 5 — Singular values via $A^\top A$ for a rectangular matrix _(original · Med–Hard)_

**Q.** Find the singular values of $A=\begin{bmatrix}1&1\\\\1&0\\\\0&1\end{bmatrix}$ (a $3\times2$ matrix).

**Solve.** Compute $A^\top A$ ($2\times2$, always square and PSD):

$$A^\top A=\begin{bmatrix}1&1&0\\0&1&1\end{bmatrix}\begin{bmatrix}1&1\\\\1&0\\\\0&1\end{bmatrix}=\begin{bmatrix}1+1+0 & 1+0+0\\ 1+0+0 & 1+0+1\end{bmatrix}=\begin{bmatrix}2&1\\ 1&2\end{bmatrix}.$$

Eigenvalues of $A^\top A$: $\det(A^\top A - \lambda I)=0 \Rightarrow (2-\lambda)^2-1=0 \Rightarrow \lambda = 2\pm1$; so $\lambda_1=3,\;\lambda_2=1$.

Singular values: $\sigma_1=\sqrt{3},\;\sigma_2=1$ (a $3\times2$ matrix has at most $2$ nonzero singular values $=\operatorname{rank}=2$).

**Answer: $\sqrt{3}$ and $1$.** _Method:_ form $A^\top A$, find its eigenvalues, take square roots. Works for **any** matrix — including rectangular. _(The right singular vectors of $A$ are the PCA directions when $A$ is the centered data matrix — Module 3.9.)_

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** The singular values of a matrix are
(A) the eigenvalues of $A$ (B) always $\ge0$ (C) sometimes negative (D) the eigenvalues of $A-I$

**Q2. ★ (MCQ)** The decomposition $A=U\Sigma V^\top$ exists for
(A) only square matrices (B) only symmetric matrices (C) any $m\times n$ matrix (D) only invertible matrices

**Q3. ★★ (MCQ)** The number of nonzero singular values of $A$ equals
(A) $\operatorname{tr}(A)$ (B) $\operatorname{rank}(A)$ (C) $\det(A)$ (D) $n$

**Q4. ★★ (NAT)** For $\mathbf u=(2,1,2)^\top$, the only nonzero singular value of $\mathbf u\mathbf u^\top$ is \***\*\_\_\*\*** .

**Q5. ★★ (MCQ)** For a symmetric PSD matrix, the singular values
(A) equal the eigenvalues (B) equal the eigenvalues' magnitudes but differ in sign (C) are all $1$ (D) are the squared eigenvalues

**Q6. ★★ (NAT)** For $A=\begin{bmatrix}5&0\\\\ 0&-12\end{bmatrix}$, the largest singular value is \***\*\_\_\*\*** .

**Q7. ★★ (MSQ)** Which are TRUE about the SVD $A=U\Sigma V^\top$?
(A) $U$ and $V$ are orthogonal (B) $\Sigma$ has nonnegative diagonal entries (C) the largest singular value equals $\lVert A\rVert_2$ (D) SVD only applies to square matrices

**Q8. ★★ (MCQ)** Every orthogonal matrix has all singular values equal to
(A) $0$ (B) $1$ (C) $\pm1$ (D) its eigenvalues

**Q9. ★★★ (NAT)** Using LU (no pivoting), the determinant of $A=\begin{bmatrix}1&2\\\\ 3&4\end{bmatrix}$ is \***\*\_\_\*\*** .

**Q10. ★★★ (MSQ)** Let $A=\mathbf u\mathbf v^\top$ be rank-$1$ ($\mathbf u,\mathbf v\ne\mathbf 0$). Which are TRUE?
(A) $A$ has exactly one nonzero singular value (B) that singular value is $\lVert\mathbf u\rVert\,\lVert\mathbf v\rVert$ (C) $\operatorname{rank}(A)=1$ (D) $A$ is always symmetric

## Answer Key & Full Solutions

**Q1 — (B) always $\ge0$.** $\sigma_i=\sqrt{\lambda_i(A^\top A)}$ and $A^\top A$ is PSD.

**Q2 — (C) any $m\times n$ matrix.** SVD always exists.

**Q3 — (B) $\operatorname{rank}(A)$.** Each nonzero singular value corresponds to a dimension of the range.

**Q4 — 9.** Symmetric rank-1 $\mathbf u\mathbf u^\top$: $\sigma=\mathbf u^\top\mathbf u=2^2+1^2+2^2=9$.

**Q5 — (A) equal the eigenvalues.** PSD $\Rightarrow\lambda_i\ge0\Rightarrow\sigma_i=\lambda_i$.

**Q6 — 12.** Diagonal (symmetric): $\sigma=\lvert 5\rvert,\lvert-12\rvert=5,12$; largest $=12$.

**Q7 — (A), (B), (C).** All standard SVD properties; (D) is false — SVD applies to any matrix.

**Q8 — (B) $1$.** $Q^\top Q=I\Rightarrow$ eigenvalues of $Q^\top Q$ are all $1\Rightarrow\sigma_i=\sqrt1=1$.

**Q9 — $-2$.** $R_2-3R_1\Rightarrow U=\begin{bmatrix}1&2\\\\ 0&-2\end{bmatrix}$, $\det=\prod U_{ii}=1\cdot(-2)=-2$ (matches $1\cdot4-2\cdot3$).

**Q10 — (A), (B), (C).** A rank-1 $\mathbf u\mathbf v^\top$ has a single nonzero singular value $\lVert\mathbf u\rVert\lVert\mathbf v\rVert$ and rank $1$. (D) is false — it is symmetric only if $\mathbf u\parallel\mathbf v$.

---

### How to read your score

- **8–10:** decompositions are solid — **that completes all of Subject 5 (Linear Algebra)!**
- **6–7:** re-drill **$\sigma$ from eigenvalues** (Q4, Q5, Q6) and **LU $\det$** (Q9).
- **≤5:** re-read Part 1 B–C; lock in _$\sigma=\sqrt{\lambda(A^\top A)}\ge0$_, _symmetric PSD $\Rightarrow\sigma=\lambda$_, and _rank-1 has one nonzero $\sigma=\lVert\mathbf u\rVert\lVert\mathbf v\rVert$_.
