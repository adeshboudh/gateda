---
title: "5.4 Special Matrices & Projections"
parent: "Module 5: Linear Algebra"
nav_order: 4
---

# GATE DA · LA Module 5.4 — Special Matrices & Projections

## Exam Relevance

**Where this sits:** Linear Algebra $\rightarrow$ _Special Matrices (orthogonal, idempotent, projection, partition) & Projections_ — the **second-densest** LA cluster after eigenvalues. Module **4 of 6** in Subject 5.

**Weightage:** appears **every year** — projection and orthogonal-matrix MSQs are a reliable source of marks, and the ideas reappear in PCA, least squares, and SVD. Directly tested PYQs for this module:

- **2024 Q49** (MSQ) — dimensions and idempotency of a projection matrix.
- **2025 Q50** (MSQ) — $A=\sum_{i=1}^5 \mathbf x_i\mathbf x_i^\top$ with orthonormal $\mathbf x_i$ (a projection).
- **2025 Q52** (MSQ) — the isometry $\lVert A\mathbf x\rVert=\lVert\mathbf x\rVert$ forces $A$ orthogonal.
- **2026 Q52** (MSQ) — the centering matrix $I-\tfrac1n\mathbf 1\mathbf 1^\top$.

> **Why it matters:** these reduce to a tiny set of facts — **idempotent $\Rightarrow$ eigenvalues $0/1$, trace $=$ rank**; **orthogonal $\Rightarrow \lvert \lambda\rvert=1$ (possibly complex)**; **symmetric $+$ idempotent $=$ orthogonal projection**. Recognize the form and every option resolves instantly.

## Part 1 — Theory & Math

### A. Symmetric matrices ($A=A^\top$)

- **Spectral theorem:** a real symmetric matrix has **real eigenvalues** and **orthogonal eigenvectors**, and is always diagonalizable: $A=Q\Lambda Q^\top$ with $Q$ orthogonal.
- Foundation for projections, quadratic forms, covariance, PCA.

### B. Orthogonal matrices ($Q^\top Q=QQ^\top=I$)

- Columns are **orthonormal**; $Q^{-1}=Q^\top$.
- **Preserve length & angle:** $\lVert Q\mathbf x\rVert=\lVert\mathbf x\rVert$ and $(Q\mathbf x)^\top(Q\mathbf y)=\mathbf x^\top\mathbf y$.
- $\det Q=\pm1$; every eigenvalue has $\lvert \lambda\rvert=1$ — but may be **complex** (rotations give $e^{\pm i\theta}$).
- **Isometry characterization:** $\lVert A\mathbf x\rVert=\lVert\mathbf x\rVert\ \forall\mathbf x \iff A^\top A=I \iff A$ orthogonal.
- Examples: rotations, reflections, permutation matrices.

### C. Idempotent matrices ($P^2=P$) — projections

- **Eigenvalues are $0$ or $1$**; hence $P^k=P$ for all $k\ge1$.
- $\operatorname{rank}(P)=\operatorname{tr}(P)=N_{\lambda=1}$ (number of unit eigenvalues).
- $I-P$ is also idempotent (the **complementary** projection).

### D. Projection matrices (onto a subspace $U$)

- **Orthogonal projection** onto $U=\operatorname{col}(A)$ (with $A$ full column rank): $P=A(A^\top A)^{-1}A^\top$. If the basis is **orthonormal** ($Q$): $P=QQ^\top=\sum_i \mathbf q_i\mathbf q_i^\top$.
- **Symmetric $+$ idempotent $=$ orthogonal projection.**
- $\operatorname{range}(P)=U$ (dim $=\dim U$); $\operatorname{null}(P)=U^\perp$ (dim $=n-\dim U$). $I-P$ projects onto $U^\perp$.

### E. Centering matrix $H=I-\tfrac1n\mathbf 1\mathbf 1^\top$

- **Symmetric** and **idempotent** $\Rightarrow$ an orthogonal **projection** (it subtracts the mean: projects onto vectors $\perp\mathbf 1$).
- Using $\mathbf 1^\top\mathbf 1=n$: $\;H^2=I-\tfrac2n\mathbf 1\mathbf 1^\top+\tfrac1{n^2}\mathbf 1(\mathbf 1^\top\mathbf 1)\mathbf 1^\top=I-\tfrac1n\mathbf 1\mathbf 1^\top=H.$
- Eigenvalues: $1$ (multiplicity $n-1$) and $0$ (once, eigenvector $\mathbf 1$); $\operatorname{tr}(H)=n-1$, $\operatorname{rank}(H)=n-1$.

### F. Other named matrices

| Type                    | Defining property | Eigenvalues              |
| ----------------------- | ----------------- | ------------------------ |
| diagonal / triangular   | —                 | diagonal entries         |
| orthogonal              | $Q^\top Q=I$      | $\lvert \lambda\rvert=1$ |
| idempotent (projection) | $P^2=P$           | $0,1$                    |
| involutory (reflection) | $A^2=I$           | $\pm1$                   |
| nilpotent               | $A^k=0$           | all $0$                  |
| symmetric               | $A=A^\top$        | all real                 |

_Partitioned / block-triangular matrices:_ determinant and eigenvalues come from the diagonal blocks.

### G. Bridge to singular values

For a **symmetric PSD** matrix (e.g. a projection), **singular values $=$ eigenvalues**. So a projection's singular values are $0$ or $1$ (used again in 5.6 SVD).

### H. Traps GATE exploits

1. **Orthogonal $\ne$ real $\pm1$ eigenvalues** — rotations have complex $e^{\pm i\theta}$ (only $\lvert \lambda\rvert=1$ is guaranteed).
2. Projection onto a $k$-dim $U$ has null space of dim $n-k$ — don't swap them.
3. $P^2=P\Rightarrow P^3=P$ (and $P^k=P$).
4. **Trace of a projection $=$ its rank**, not $n$.
5. $\sum_i\mathbf q_i\mathbf q_i^\top$ over _orthonormal_ $\mathbf q_i$ is a **projection of rank $=$ #terms**, equal to $I$ only if the terms span the whole space.
6. Symmetric $+$ idempotent $\Rightarrow$ orthogonal projection.

## Part 2 — How to Solve (Method)

### Identify the type from the defining relation

- $A^\top=A$ $\to$ **symmetric** (real eigenvalues, orthogonally diagonalizable).
- $A^\top A=I$ $\to$ **orthogonal** ($\lvert \lambda\rvert=1$, preserves norm).
- $A^2=A$ $\to$ **idempotent/projection** (eigenvalues $0,1$; $\operatorname{tr}=\operatorname{rank}$).
- $A^2=I$ $\to$ **involutory** (eigenvalues $\pm1$).

### Projection questions

- $\operatorname{range}$ dim $=\operatorname{rank}=\operatorname{tr}=N_{\lambda=1}$; null-space dim $=n-\operatorname{rank}$.
- Onto a $k$-dim $U$: null space $=U^\perp$, dim $n-k$.
- Verify $P^2=P$ and (orthogonal projection) $P^\top=P$.

### Isometry ($\lVert A\mathbf x\rVert=\lVert\mathbf x\rVert$)

- Square both sides $\Rightarrow \mathbf x^\top A^\top A\mathbf x=\mathbf x^\top\mathbf x\ \forall\mathbf x \Rightarrow A^\top A=I$ (orthogonal). So $A$ is full rank with $\lvert \lambda\rvert=1$, but eigenvalues may be **complex** and $A$ need **not** be $I$.

### $\sum \mathbf x_i\mathbf x_i^\top$ with orthonormal $\mathbf x_i$ (e.g. 2025 Q50)

- $=$ orthogonal **projection** onto $\operatorname{span}\{\mathbf x_i\}$; rank $=$ #terms; eigenvalues $0/1$; symmetric PSD so singular values $=$ eigenvalues $\in\{0,1\}$; $\det=0$ and **not invertible** unless #terms $=n$.

### Centering matrix $I-\tfrac1n\mathbf 1\mathbf 1^\top$

- Symmetric, idempotent (use $\mathbf 1^\top\mathbf 1=n$), a projection; eigenvalues $1$ ($n-1$ times) and $0$; $\operatorname{tr}=\operatorname{rank}=n-1$; $H^2=H\ne I$.

### Mistakes that cost marks

- Claiming orthogonal matrices have only real $\pm1$ eigenvalues.
- Miscounting a projection's null-space dimension.
- Treating $\sum\mathbf q_i\mathbf q_i^\top$ as the identity.

## Part 3 — Worked Examples

### Example 1 — Projection: dimensions & idempotency _(2024 Q49 · MSQ)_

**Q.** $U$ is a subspace of $\mathbb{R}^3$ and $M\in\mathbb{R}^{3\times3}$ is the (orthogonal) projection onto $U$. Which is/are TRUE? (A) If $\dim U=1$, the null space of $M$ is $1$-dimensional. (B) If $\dim U=2$, the null space of $M$ is $1$-dimensional. (C) $M^2=M$. (D) $M^3=M$.

**Solve.** A projection onto $U$ has $\operatorname{range}=U$ and $\operatorname{null}(M)=U^\perp$ with $\dim U^\perp=3-\dim U$.

- (A) $\dim U=1\Rightarrow$ null space dim $=3-1=2$, not $1$. **False.**
- (B) $\dim U=2\Rightarrow$ null space dim $=3-2=1$. **True.**
- (C) projections are idempotent, $M^2=M$. **True.**
- (D) $M^3=M\cdot M^2=M\cdot M=M^2=M$. **True.**

**Answer: (B), (C), (D).**

---

### Example 2 — The centering matrix _(2026 Q52 · MSQ)_

**Q.** $M=I_n-\tfrac1n\mathbf 1\mathbf 1^\top$, where $\mathbf 1=(1,\dots,1)^\top\in\mathbb{R}^n$. Which is/are correct? (A) $M^\top=M$ (B) $M^2=I_n$ (C) $\operatorname{tr}(M)=n$ (D) $M$ is a projection matrix.

**Solve.**

- (A) Both $I$ and $\mathbf 1\mathbf 1^\top$ are symmetric $\Rightarrow M^\top=M$. **True.**
- (B) Using $\mathbf 1^\top\mathbf 1=n$: $M^2=I-\tfrac2n\mathbf 1\mathbf 1^\top+\tfrac1{n^2}\mathbf 1(\mathbf 1^\top\mathbf 1)\mathbf 1^\top=I-\tfrac1n\mathbf 1\mathbf 1^\top=M\ (\ne I)$. **False.**
- (C) $\operatorname{tr}(M)=\operatorname{tr}(I)-\tfrac1n\operatorname{tr}(\mathbf 1\mathbf 1^\top)=n-\tfrac1n\cdot n=n-1$. **False.**
- (D) symmetric $+$ idempotent $\Rightarrow$ orthogonal projection. **True.**

**Answer: (A) and (D).** _(Its max quadratic form on the unit sphere is 2026 Q65 — Module 5.5.)_

---

### Example 3 — Sum of orthonormal outer products _(2025 Q50 · MSQ)_

**Q.** $\mathbf x_1,\dots,\mathbf x_5$ are orthonormal in $\mathbb{R}^{10}$ and $A=\mathbf x_1\mathbf x_1^\top+\cdots+\mathbf x_5\mathbf x_5^\top$. Which is/are correct? (A) singular values of $A$ are also its eigenvalues (B) singular values are $0$ or $1$ (C) $\det(A)=1$ (D) $A$ is invertible.

**Solve.** $A$ is the orthogonal **projection** onto $\operatorname{span}\{\mathbf x_1,\dots,\mathbf x_5\}$, a $5$-dim subspace of $\mathbb{R}^{10}$. So $A$ is symmetric, idempotent, with eigenvalues $1$ (mult $5$) and $0$ (mult $5$).

- (A) symmetric PSD $\Rightarrow$ singular values $=$ eigenvalues. **True.**
- (B) eigenvalues $0,1$ $\Rightarrow$ singular values $0,1$. **True.**
- (C) $\det=\prod\lambda_i=0$ (zero eigenvalues present). **False.**
- (D) $\operatorname{rank}=5<10$ $\Rightarrow$ not invertible. **False.**

**Answer: (A) and (B).**

---

### Example 4 — Isometry forces orthogonal _(2025 Q52 · MSQ)_

**Q.** A real $n\times n$ matrix $A$ satisfies $\lVert A\mathbf x\rVert^2=\lVert\mathbf x\rVert^2$ for all $\mathbf x\in\mathbb{R}^n$. Which is/are ALWAYS correct? (A) $A$ must be orthogonal (B) $A=I$ is the only solution (C) the eigenvalues of $A$ are $+1$ or $-1$ (D) $A$ has full rank.

**Solve.** $\lVert A\mathbf x\rVert^2=\mathbf x^\top A^\top A\mathbf x=\mathbf x^\top\mathbf x$ for all $\mathbf x \Rightarrow A^\top A=I$, i.e. $A$ is **orthogonal**.

- (A) **True.**
- (B) **False** — any rotation, reflection, or permutation matrix also works.
- (C) **False** — eigenvalues satisfy $\lvert \lambda\rvert=1$ but can be **complex** (a rotation has $e^{\pm i\theta}$), not just $\pm1$.
- (D) orthogonal $\Rightarrow$ invertible $\Rightarrow$ **full rank. True.**

**Answer: (A) and (D).** _Trap:_ (C) is the classic “orthogonal must be $\pm1$” mistake.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** An orthogonal matrix $Q$ satisfies
(A) $Q^2=Q$ (B) $Q^\top Q=I$ (C) $Q^\top=-Q$ (D) $Q^2=0$

**Q2. ★ (MCQ)** The eigenvalues of an idempotent matrix are
(A) $\pm1$ (B) $0$ or $1$ (C) all $1$ (D) all $0$

**Q3. ★★ (NAT)** A projection matrix $P$ onto a $3$-dimensional subspace of $\mathbb{R}^7$ has $\operatorname{tr}(P)=$ \***\*\_\_\*\*** .

**Q4. ★★ (NAT)** For the same $P$ (rank $3$ in $\mathbb{R}^7$), the dimension of its null space is \***\*\_\_\*\*** .

**Q5. ★★ (MCQ)** The determinant of any orthogonal matrix is
(A) $0$ (B) $\pm1$ (C) always $1$ (D) $n$

**Q6. ★★ (MSQ)** Let $P$ be a symmetric idempotent matrix. Which are TRUE?
(A) $P$ is an orthogonal projection (B) eigenvalues of $P$ are $0$ or $1$ (C) $I-P$ is idempotent (D) $P$ is invertible

**Q7. ★★ (MSQ)** Which matrices have **all** eigenvalues with $\lvert \lambda\rvert=1$?
(A) orthogonal (B) rotation (C) projection (D) reflection

**Q8. ★★ (MCQ)** If $A^2=I$ (involutory), its eigenvalues are
(A) $0$ or $1$ (B) $\pm1$ (C) $\pm i$ (D) only $1$

**Q9. ★★★ (NAT)** The centering matrix $H=I_5-\tfrac15\mathbf 1\mathbf 1^\top$ (a $5\times5$ matrix) has rank \***\*\_\_\*\*** .

**Q10. ★★★ (MSQ)** Let $A=\mathbf q\mathbf q^\top$ where $\mathbf q\in\mathbb{R}^n$ is a unit vector ($\mathbf q^\top\mathbf q=1$). Which are TRUE?
(A) $A$ is a rank-$1$ projection (B) $A^2=A$ (C) eigenvalues of $A$ are $1$ (once) and $0$ ($n-1$ times) (D) $\operatorname{tr}(A)=1$

## Answer Key & Full Solutions

**Q1 — (B) $Q^\top Q=I$.** Definition of orthogonal (columns orthonormal).

**Q2 — (B) $0$ or $1$.** $P^2=P\Rightarrow\lambda^2=\lambda\Rightarrow\lambda\in\{0,1\}$.

**Q3 — 3.** Trace $=$ rank $=$ dimension of the range $=3$.

**Q4 — 4.** Null space $=U^\perp$, dim $=7-3=4$.

**Q5 — (B) $\pm1$.** $\det(Q)^2=\det(Q^\top Q)=\det(I)=1\Rightarrow\det Q=\pm1$.

**Q6 — (A), (B), (C).** Symmetric $+$ idempotent $=$ orthogonal projection (A), eigenvalues $0/1$ (B); $(I-P)^2=I-2P+P^2=I-P$ (C). (D) false unless $P=I$.

**Q7 — (A), (B), (D).** Orthogonal matrices (incl. rotations and reflections) have $\lvert \lambda\rvert=1$. A **projection** has eigenvalue $0$ (with $\lvert \lambda\rvert=0$), so (C) is excluded.

**Q8 — (B) $\pm1$.** $A^2=I\Rightarrow\lambda^2=1\Rightarrow\lambda=\pm1$.

**Q9 — 4.** Centering matrix in $\mathbb{R}^5$: rank $=n-1=4$ (eigenvalue $1$ with multiplicity $4$, eigenvalue $0$ once).

**Q10 — (A), (B), (C), (D) — all four.** $A=\mathbf q\mathbf q^\top$: $A^2=\mathbf q(\mathbf q^\top\mathbf q)\mathbf q^\top=\mathbf q\mathbf q^\top=A$ (idempotent, rank $1$); $A\mathbf q=\mathbf q(\mathbf q^\top\mathbf q)=\mathbf q$ so eigenvalue $1$ once and $0$ for the $(n-1)$-dim space $\perp\mathbf q$; $\operatorname{tr}(A)=\mathbf q^\top\mathbf q=1$.

---

### How to read your score

- **8–10:** special matrices are solid — on to **5.5 Quadratic Forms & Positive-Definiteness**.
- **6–7:** re-drill **projection trace/rank/null-space** (Q3, Q4, Q9) and the **orthogonal-eigenvalue** fact (Q5, Q7).
- **≤5:** re-read Part 1 B–E; lock in _idempotent $\Rightarrow 0/1$, trace $=$ rank_, _orthogonal $\Rightarrow\lvert \lambda\rvert=1$ (maybe complex)_, and _symmetric $+$ idempotent $=$ orthogonal projection_.
