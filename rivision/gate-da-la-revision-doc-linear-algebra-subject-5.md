---
title: "Subject 5: Linear Algebra"
parent: "Revision Docs"
nav_order: 5
---

# GATE DA · LA Revision Doc — Linear Algebra (Subject 5)

## How to Use & Weightage Map

Condensed revision of **Subject 5** — must-knows, GATE angle, traps. Full detail in **Modules 5.1–5.6**; formula lookup in the **LA Cheat Sheet**.

**Weightage:** LA is **~11.8%** ($10/12/8$ marks), stable and **high-ROI** because it pairs with PS and ML (covariance, PCA, least squares). **Eigenvalues are the dominant theme** (~7 of the LA PYQs).

| Module | Topic |
| --- | --- |
| 5.1 | Vector spaces, subspaces, independence, basis |
| 5.2 | Rank-nullity & linear systems |
| 5.3 | Determinants & eigenvalues/eigenvectors |
| 5.4 | Special matrices & projections |
| 5.5 | Quadratic forms & positive-definiteness |
| 5.6 | SVD & LU decomposition |

## 5.1 Vector Spaces, Subspaces, Independence & Basis

**Must know**
- **Subspace test:** contains $\mathbf 0$ and is closed under $a\mathbf u+b\mathbf v$. Affine sets (constant $\ne0$) are **not** subspaces.
- A **span** is always a subspace; restricted coefficients ($\alpha^2$, $\ge0$) break closure.
- **Independence:** $\sum c_i\mathbf v_i=\mathbf 0\Rightarrow$ all $c_i=0$; test via rank/determinant.
- **Basis** $=$ independent spanning set; size $=\dim$. Bases are not unique; dimension is.
- **Orthonormal $\Rightarrow$ independent** (converse false).

**GATE angle:** identify subspaces; orthonormal-basis facts; subspace $\cap$ ball geometry ($k$-dim flat through origin).

**Traps:** affine $\ne$ subspace; independent $\ne$ orthonormal; dimension $=$ pivots.

## 5.2 Rank-Nullity & Linear Systems

**Must know**
- **Rank-nullity:** $\operatorname{rank}(A)+\operatorname{nullity}(A)=n$ (number of **columns**).
- **$A\mathbf x=\mathbf b$:** consistent iff $\operatorname{rank}(A)=\operatorname{rank}([A\,\mid \,\mathbf b])$; unique iff that rank $=n$; else infinitely many.
- **Homogeneous** $A\mathbf x=\mathbf 0$: nontrivial solution iff $\operatorname{rank}<n$ (square: $\det=0$).
- Shape facts: wide ($m<n$) never unique; square invertible $\Rightarrow$ all RHS unique.

**GATE angle:** classify no/one/infinite solutions; existence (“$\exists M$…”) via shape; “find a null vector $\Rightarrow$ singular.”

**Traps:** check the **augmented** rank; rank-nullity counts columns; $\det=0\Rightarrow$ none-or-infinite (never unique).

## 5.3 Determinants & Eigenvalues/Eigenvectors

**Must know**
- $\det(AB)=\det A\det B$; $\det=\prod\lambda_i$; $\operatorname{tr}=\sum\lambda_i$. Singular $\iff\det=0\iff 0$ is an eigenvalue.
- **Char. equation** $\det(A-\lambda I)=0$; $2\times2$: $\lambda^2-(\operatorname{tr})\lambda+\det=0$ (discriminant $<0\Rightarrow$ complex pair).
- **Toolkit:** eigenvalues of $A^k\to\lambda^k$, $A^{-1}\to1/\lambda$, $A+cI\to\lambda+c$, $p(A)\to p(\lambda)$.
- **Structured:** rank-1 update $cI+\mathbf u\mathbf v^\top\to c$ (mult $n-1$), $c+\mathbf v^\top\mathbf u$; rotation $\to e^{\pm i\theta}$ (powers periodic); idempotent $\to0,1$.

**GATE angle:** real vs complex eigenvalues; $\det$ via singularity; eigenvalues of $I+\mathbf x\mathbf x^\top$; rotation powers; trace identities.

**Traps:** real matrices can have complex eigenvalues; $\det(A+B)\ne\det A+\det B$; use periodicity for rotation powers.

## 5.4 Special Matrices & Projections

**Must know**
- **Symmetric:** real eigenvalues, orthogonal eigenvectors (spectral theorem $A=Q\Lambda Q^\top$).
- **Orthogonal** $Q^\top Q=I$: $\lvert \lambda\rvert=1$ (possibly complex), $\det=\pm1$, preserves norm (isometry $\lVert A\mathbf x\rVert=\lVert\mathbf x\rVert\iff A$ orthogonal).
- **Idempotent / projection** $P^2=P$: eigenvalues $0,1$; **trace $=$ rank**; symmetric+idempotent $=$ orthogonal projection; onto $k$-dim $U$, null space dim $n-k$.
- **Centering matrix** $I-\tfrac1n\mathbf 1\mathbf 1^\top$: projection, eigenvalues $1$ ($n-1$ times) and $0$.

**GATE angle:** projection dimensions/idempotency; $\sum\mathbf x_i\mathbf x_i^\top$ (rank-$=$#terms projection); isometry forces orthogonal.

**Traps:** orthogonal eigenvalues need not be $\pm1$; trace of a projection $=$ rank, not $n$.

## 5.5 Quadratic Forms & Positive-Definiteness

**Must know**
- $q(\mathbf x)=\mathbf x^\top A\mathbf x$ (use symmetric $A$; off-diagonal $=\tfrac12\times$ cross coefficient).
- **Definiteness $=$ eigenvalue signs:** all $>0$ PD, all $\ge0$ PSD, mixed indefinite. Sylvester: leading minors $>0\Rightarrow$ PD.
- **Gram matrix $X^\top X$** is PSD; **PD iff columns independent** (invertible, $\det>0$).
- **Rayleigh quotient:** $\lambda_{\min}\le\dfrac{\mathbf x^\top A\mathbf x}{\mathbf x^\top\mathbf x}\le\lambda_{\max}$; on the unit sphere, max $=\lambda_{\max}$ ($=$ PCA top variance).

**GATE angle:** classify definiteness; Gram-matrix invertibility; max/min of $\mathbf x^\top A\mathbf x$ on the unit sphere.

**Traps:** $\det>0$ alone $\ne$ PD; remember the unit-norm constraint; Gram always PSD.

## 5.6 SVD & LU Decomposition

**Must know**
- **SVD** $A=U\Sigma V^\top$ ($U,V$ orthogonal, $\Sigma\ge0$); **singular values $=\sqrt{\lambda(A^\top A)}\ge0$**; **# nonzero singular values $=$ rank**.
- **Symmetric PSD $\Rightarrow$ singular values $=$ eigenvalues**; symmetric $\Rightarrow\sigma=\lvert \lambda\rvert$.
- **Rank-1** $\mathbf u\mathbf v^\top$: one nonzero singular value $\lVert\mathbf u\rVert\lVert\mathbf v\rVert$; $\mathbf u\mathbf u^\top\to\lVert\mathbf u\rVert^2$.
- **LU:** $A=LU$ from Gaussian elimination; $\det=\prod U_{ii}$; solve via forward + back substitution. *(No PYQ 2024–26 — efficient coverage.)*

**GATE angle:** singular values of a rank-1 / projection matrix; $\sigma$ from eigenvalues; LU determinant.

**Traps:** $\sigma\ge0$ always; #nonzero $\sigma=$ rank; rank-1 has exactly one nonzero $\sigma$.

## Traps & Exam Strategy

**Highest-cost traps**
1. **Affine $\ne$ subspace**; independent $\ne$ orthonormal.
2. **Rank-nullity counts columns**; check the **augmented** rank for consistency.
3. **Real matrices can have complex eigenvalues** (rotations); $\det=\prod\lambda$, $\operatorname{tr}=\sum\lambda$.
4. **Orthogonal $\Rightarrow\lvert \lambda\rvert=1$** (not necessarily $\pm1$); projection trace $=$ rank.
5. **Definiteness $=$ eigenvalue signs**; Rayleigh max $=\lambda_{\max}$.
6. **$\sigma\ge0$, #nonzero $\sigma=$ rank**; symmetric PSD $\Rightarrow\sigma=\lambda$.

**Strategy**
- **Eigenvalues dominate** — master the toolkit + structured-matrix table; they crack most LA questions in seconds.
- High ROI: the same machinery powers **PCA**, **covariance**, and **least squares** in ML/PS.

*(Full worked PYQs: Modules 5.1–5.6. Formula lookup: LA Cheat Sheet.)*
