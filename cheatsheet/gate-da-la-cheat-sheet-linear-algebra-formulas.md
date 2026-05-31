---
title: "Linear Algebra"
parent: "Cheat Sheets"
nav_order: 5
---

# GATE DA · LA Cheat Sheet — Linear Algebra Formulas

## Vector Spaces & Independence

- **Subspace** iff $\mathbf 0\in W$ and $a\mathbf u+b\mathbf v\in W$ for all scalars. (Affine sets $\Rightarrow$ not a subspace.)
- A **span** is always a subspace; $\operatorname{span}\{\mathbf v_i\}=\{\sum c_i\mathbf v_i\}$.
- **Independent** iff $\sum c_i\mathbf v_i=\mathbf 0\Rightarrow$ all $c_i=0$ iff (square) $\det\ne0$ iff rank $=$ #vectors.
- **Basis:** independent + spanning; $\dim\mathbb R^n=n$; bases not unique.
- **Orthonormal:** $\mathbf v_i^\top\mathbf v_j=\delta_{ij}$ $\Rightarrow$ independent (converse false).

## Rank-Nullity & Systems

$$\operatorname{rank}(A)+\operatorname{nullity}(A)=n\ (\text{columns}),\qquad \operatorname{rank}(A)\le\min(m,n).$$
| Condition | Solutions of $A\mathbf x=\mathbf b$ |
| --- | --- |
| $\operatorname{rank}(A)<\operatorname{rank}([A\mid \mathbf b])$ | none |
| $\operatorname{rank}(A)=\operatorname{rank}([A\mid \mathbf b])=n$ | unique |
| $\operatorname{rank}(A)=\operatorname{rank}([A\mid \mathbf b])<n$ | infinitely many |

- Homogeneous nontrivial solution iff $\operatorname{rank}<n$ (square: $\det=0$).
- Gaussian elimination: dense $O(n^3)$; back-substitution alone $O(n^2)$.

## Determinants & Eigenvalues

- $\det(AB)=\det A\det B$, $\det(A^\top)=\det A$, $\det(cA)=c^n\det A$, $\det=\prod\lambda_i$, $\operatorname{tr}=\sum\lambda_i$.
- Char.: $\det(A-\lambda I)=0$; $2\times2$: $\lambda^2-(\operatorname{tr})\lambda+\det=0$, discriminant $<0\Rightarrow$ complex pair.
- **Toolkit:** $A^k\!\to\!\lambda^k$, $A^{-1}\!\to\!1/\lambda$, $A+cI\!\to\!\lambda+c$, $cA\!\to\!c\lambda$, $A^\top\!\to\!\lambda$, $p(A)\!\to\!p(\lambda)$.
- **Structured:** $cI+\mathbf u\mathbf v^\top\!\to\!\{c\ (n{-}1),\ c+\mathbf v^\top\mathbf u\}$; rotation $R(\theta)\!\to\!e^{\pm i\theta}$, $R(\theta)^k=R(k\theta)$; idempotent $\to0,1$; satisfies $p(A)=0\Rightarrow\lambda\in$ roots of $p$.

## Special Matrices

| Type                    | Property     | Eigenvalues                           |
| ----------------------- | ------------ | ------------------------------------- |
| Symmetric               | $A=A^\top$   | real, orthogonal eigvecs              |
| Orthogonal              | $Q^\top Q=I$ | $\lvert \lambda\rvert=1$, $\det=\pm1$ |
| Idempotent (projection) | $P^2=P$      | $0,1$; trace $=$ rank                 |
| Involutory              | $A^2=I$      | $\pm1$                                |
| Nilpotent               | $A^k=0$      | all $0$                               |

- Orthogonal projection $=$ symmetric + idempotent; onto $k$-dim $U$: null space dim $n-k$.
- Centering $I-\tfrac1n\mathbf 1\mathbf 1^\top$: eigenvalues $1$ ($n{-}1$ times), $0$; trace $=$ rank $=n-1$.

## Quadratic Forms & Definiteness

- $q=\mathbf x^\top A\mathbf x$ ($A$ symmetric; off-diagonal $a_{ij}=\tfrac12\times$ coeff of $x_ix_j$).
- **Definiteness:** all $\lambda>0$ PD; $\ge0$ PSD; mixed indefinite. **Sylvester:** all leading principal minors $>0\Rightarrow$ PD ($2\times2$: $a>0$ and $ac-b^2>0$).
- **Gram** $X^\top X$: PSD always; PD iff columns independent.
- **Rayleigh:** $\lambda_{\min}\le\dfrac{\mathbf x^\top A\mathbf x}{\mathbf x^\top\mathbf x}\le\lambda_{\max}$; on unit sphere, $\max=\lambda_{\max}$, $\min=\lambda_{\min}$.

## SVD & LU

- **SVD:** $A=U\Sigma V^\top$, $U,V$ orthogonal, $\sigma_i\ge0$. $\sigma_i=\sqrt{\lambda_i(A^\top A)}$; **# nonzero $\sigma=$ rank**; $\sigma_1=\lVert A\rVert_2$.
- Symmetric PSD $\Rightarrow\sigma=\lambda$; symmetric $\Rightarrow\sigma=\lvert \lambda\rvert$.
- **Rank-1** $\mathbf u\mathbf v^\top$: single $\sigma=\lVert\mathbf u\rVert\lVert\mathbf v\rVert$; $\mathbf u\mathbf u^\top\Rightarrow\sigma=\lVert\mathbf u\rVert^2$.
- **LU:** $A=LU$ (Gaussian elimination); $\det A=\prod U_{ii}$; solve $L\mathbf y=\mathbf b$ then $U\mathbf x=\mathbf y$.

_(Concept recap: LA Revision Doc. Full worked PYQs: Modules 5.1–5.6.)_
