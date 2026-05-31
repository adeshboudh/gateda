---
title: "3.9 PCA & Dimensionality Reduction"
parent: "Module 3: Machine Learning"
nav_order: 9
---

# GATE DA · ML Module 3.9 — PCA & Dimensionality Reduction

## Exam Relevance

**Where this sits:** Machine Learning $\rightarrow$ _PCA & Dimensionality Reduction_ — the unsupervised method that projects data onto directions of maximum variance. (The last ML module.)

**Weightage:** ML is the **#3 subject** ($16.9\%$), and **PCA is a flagged recurring topic**:

- **2025 Q60** — the **variance along the first principal component** equals the **largest eigenvalue**
- **2024 Q18** — PCA's role as **dimensionality reduction** (vs generative / discriminative models)
- **2026 Q11** — principal components are **orthogonal** (angle $90^\circ$)
- **2024 Q61** — **singular values** of a rank-1 matrix $uu^\top$ (the PCA–SVD link)

_(Projection-matrix / Rayleigh-quotient questions 2025 Q50 and 2026 Q65 are covered in the Linear Algebra subject.)_

> **Why it matters:** the central fact wins most marks — **the $i$-th eigenvalue of the covariance matrix is the variance captured by the $i$-th principal component**, and the **first PC maximizes variance**. PCs are orthogonal; PCA ignores labels.

## Part 1 — Theory & Math

### A. What PCA does

PCA is an **unsupervised** dimensionality-reduction method: it finds orthogonal directions (**principal components**) capturing the most **variance**, and projects the data onto the top few.

### B. The procedure

1. **Center** the data (subtract the mean) — PCA assumes zero-mean data.
2. Form the **covariance matrix** $C = \dfrac{1}{n}\sum_{i=1}^{n} (x_i - \bar{x})(x_i - \bar{x})^\top$ (some texts use $\tfrac{1}{n-1}$).
3. **Eigen-decompose** $C$: eigenvalues $\lambda_1 \ge \lambda_2 \ge \dots$ with eigenvectors $u_1, u_2, \dots$
4. The **eigenvectors are the principal components**; the **first PC $u_1$** (largest eigenvalue) is the direction of **maximum variance**.
5. **Project** onto the top $k$ eigenvectors to reduce to $k$ dimensions.

### C. Key facts

- **Variance along a unit direction $u$:** $\;u^\top C\, u$. If $u$ is the eigenvector $u_i$, this equals **$\lambda_i$** — so the $i$-th eigenvalue **is** the variance captured by the $i$-th PC.
- **Maximum variance** (Rayleigh quotient): $\displaystyle\max_{\lVert u\rVert = 1} u^\top C u = \lambda_{\max}$, attained at $u_1$.
- **Principal components are orthogonal** (eigenvectors of a symmetric matrix) — any two distinct PCs are at $90^\circ$.
- **Total variance** $= \sum_i \lambda_i = \operatorname{trace}(C)$. **Proportion of variance explained** by the top $k$: $\dfrac{\sum_{i\le k}\lambda_i}{\sum_i \lambda_i}$.

### D. PCA via SVD (the link)

For the centered data matrix $X$, the SVD $X = U\Sigma V^\top$ gives the **right singular vectors $V$ as the principal components**, and the **singular values** relate to the covariance eigenvalues by $\lambda_i \propto \sigma_i^2$. For a symmetric PSD matrix, **singular values $=$ eigenvalues**; e.g. a rank-1 $uu^\top$ has a single nonzero singular value $\lVert u\rVert^2$ (the rest $0$). _(SVD mechanics are detailed in the Linear Algebra subject.)_

### E. PCA vs LDA

Both reduce dimensionality, but **PCA is unsupervised** (maximizes variance, ignores labels) while **LDA is supervised** (maximizes class separation). _(LDA: Module 3.3.)_

### F. Common traps GATE exploits

1. **Variance along the $i$-th PC $=$ its eigenvalue $\lambda_i$** — the most-tested fact.
2. **First PC $=$ direction of MAXIMUM variance** (largest eigenvalue), not minimum.
3. **PCs are orthogonal** ($90^\circ$).
4. **PCA is unsupervised** — it does **not** use class labels (LDA does).
5. **Center the data first.**
6. A **rank-1** matrix $uu^\top$ has exactly **one** nonzero singular value $= \lVert u\rVert^2$.

## Part 2 — How to Solve (Method)

### Variance / eigenvalue questions

- The variance captured along the $i$-th PC is **$\lambda_i$**. For zero-mean data, $\dfrac{1}{n}\sum_i (u^\top x_i)^2 = u^\top C u$, which equals $\lambda$ when $u$ is the corresponding eigenvector.
- **Maximum variance** $= \lambda_{\max}$ (the largest eigenvalue); minimum $= \lambda_{\min}$.
- **Proportion explained** by the top $k$ $= \big(\sum_{i\le k}\lambda_i\big) / \big(\sum_i \lambda_i\big)$.

### Singular-value questions

- Singular values of $A$ $=$ $\sqrt{\text{eigenvalues of } A^\top A}$. For a **symmetric PSD** matrix they equal the eigenvalues.
- For rank-1 $A = uu^\top$: the only nonzero singular value is $\lVert u\rVert^2$.

### Conceptual questions

- PCA $\to$ dimensionality reduction, unsupervised, orthogonal components.
- Distinguish PCA (variance) from LDA (class separation, supervised).

### Sanity checks

- Eigenvalues of a covariance matrix are **$\ge 0$** (PSD); they sum to the total variance.
- Variance along the top PC should be the **largest** $\lambda$.
- Distinct PCs are orthonormal — dot product 0.

## Part 3 — Worked Examples

All four are real GATE DA questions.

---

### Example 1 — Variance along the first principal component _(2025 Q60 · NAT · Med–Hard)_

**Q.** Zero-mean dataset in $\mathbb{R}^{100}$ ($\sum_i x^{(i)} = 0$). The covariance matrix has eigenvalues $\lambda_i = 100^{\,2-i}$ for $1 \le i \le 100$. With $u$ the unit direction of maximum variance, find $\dfrac{1}{n}\sum_i (u^\top x^{(i)})^2$.

**Solve.** The eigenvalues are $\lambda_1 = 100^{1} = 100$, $\lambda_2 = 100^{0} = 1$, $\lambda_3 = 100^{-1}, \dots$ — the **largest is $\lambda_1 = 100$**, so $u$ is its eigenvector. The quantity is the **variance along $u$**:
$$\tfrac{1}{n}\sum_i (u^\top x^{(i)})^2 = u^\top C u = \lambda_1 (u^\top u) = \lambda_1 = 100.$$

**Answer: $100$.** _Method:_ variance along a PC $=$ its eigenvalue; max variance $=$ largest eigenvalue.

---

### Example 2 — PCA's role _(2024 Q18 · MCQ · Easy–Med)_

**Q.** Match: (p) PCA, (q) Naive Bayes, (r) Logistic Regression to (i) Discriminative, (ii) Dimensionality Reduction, (iii) Generative.

**Solve.**

- **PCA $\to$ (ii) Dimensionality Reduction** (unsupervised, maximizes variance).
- **Naive Bayes $\to$ (iii) Generative** (models $P(x, y) = P(y)P(x\mid y)$).
- **Logistic Regression $\to$ (i) Discriminative** (models $P(y\mid x)$ directly).

**Answer: (C) (p)-(ii), (q)-(iii), (r)-(i).** _Method:_ PCA is dimensionality reduction; NB generative, LR discriminative.

---

### Example 3 — Orthogonality of principal components _(2026 Q11 · MCQ · Easy–Med)_

**Q.** PCA reduces a feature space from 100 to 10 dimensions. What is the angle $\theta$ between the 1st and 10th principal components?
(A) $0^\circ$ (B) $90^\circ$ (C) $90^\circ < \theta \le 180^\circ$ (D) $0^\circ < \theta < 90^\circ$

**Solve.** Principal components are eigenvectors of the (symmetric) covariance matrix and form an **orthonormal** set, so any two distinct PCs are **orthogonal** — their dot product is 0, i.e. $\theta = 90^\circ$.

**Answer: (B) $90^\circ$.** _Method:_ eigenvectors of a symmetric matrix (distinct PCs) are orthogonal.

---

### Example 4 — Singular values of a rank-1 matrix _(2024 Q61 · NAT · Med)_

**Q.** $u = [1,2,3,4,5]^\top$; $\sigma_1,\dots,\sigma_5$ are the singular values of $M = uu^\top$. Find $\sum_{i} \sigma_i$.

**Solve.** $M = uu^\top$ is symmetric PSD of **rank 1**, so it has one nonzero eigenvalue $= \lVert u\rVert^2$ and the rest $0$; for a symmetric PSD matrix the singular values equal the eigenvalues.
$$\lVert u\rVert^2 = 1^2+2^2+3^2+4^2+5^2 = 55 \;\Rightarrow\; \sigma_1 = 55,\; \sigma_2 = \dots = \sigma_5 = 0.$$
Sum $= 55$.

**Answer: $55$.** _Method:_ rank-1 $uu^\top$ has a single nonzero singular value $\lVert u\rVert^2$. _(SVD detail: Linear Algebra subject.)_

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** PCA is
(A) a supervised classifier (B) an unsupervised dimensionality-reduction method (C) a clustering algorithm (D) a regression method

**Q2. ★★ (MCQ)** The first principal component is the direction of
(A) minimum variance (B) maximum variance (C) zero variance (D) maximum class separation

**Q3. ★★ (MCQ)** Distinct principal components are
(A) parallel (B) orthogonal (C) at $45^\circ$ (D) randomly oriented

**Q4. ★★ (NAT)** The covariance matrix has eigenvalues $\{50, 20, 5\}$. The variance captured by the first principal component is \***\*\_\_\*\*** .

**Q5. ★★ (NAT)** With covariance eigenvalues $\{6, 3, 1\}$, the proportion of total variance explained by the first principal component is \***\*\_\_\*\*** (2 dp).

**Q6. ★★ (MCQ)** Which technique uses class labels for dimensionality reduction?
(A) PCA (B) LDA (C) k-means (D) SVD

**Q7. ★★ (NAT)** If the covariance matrix has eigenvalues $\{4, 3, 2, 1\}$, the total variance is \***\*\_\_\*\*** .

**Q8. ★★ (MSQ)** Which statements about PCA are TRUE?
(A) Principal components are eigenvectors of the covariance matrix.
(B) The variance along a principal component equals its eigenvalue.
(C) PCA uses class labels to find components.
(D) Principal components are mutually orthogonal.

**Q9. ★★ (NAT)** The sum of the singular values of $M = uu^\top$ where $u = [3, 4]^\top$ is \***\*\_\_\*\*** .

**Q10. ★★ (MCQ)** For a covariance matrix $C$, $\max_{\lVert u\rVert = 1} u^\top C u$ equals
(A) the smallest eigenvalue (B) the largest eigenvalue (C) the trace (D) the determinant

## Answer Key & Full Solutions

**Q1 — (B) unsupervised dimensionality reduction.** PCA finds high-variance directions without using labels.

**Q2 — (B) maximum variance.** The first PC is the eigenvector of the largest eigenvalue.

**Q3 — (B) orthogonal.** PCs are eigenvectors of a symmetric covariance matrix, hence mutually orthogonal.

**Q4 — 50.** The variance along the first PC equals the largest eigenvalue, $50$.

**Q5 — 0.60.** $\dfrac{6}{6+3+1} = \dfrac{6}{10} = 0.60$.

**Q6 — (B) LDA.** LDA is supervised (maximizes between-class scatter); PCA is unsupervised.

**Q7 — 10.** Total variance $= \sum \lambda_i = 4+3+2+1 = 10$.

**Q8 — (A), (B), (D).** (C) is **false** — PCA is unsupervised and does not use labels (that is LDA).

**Q9 — 25.** $M = uu^\top$ is rank-1; its only nonzero singular value is $\lVert u\rVert^2 = 3^2 + 4^2 = 25$; sum $= 25$.

**Q10 — (B) the largest eigenvalue.** By the Rayleigh quotient, the maximum of $u^\top C u$ over unit vectors is $\lambda_{\max}$ (the max-variance direction).

---

### How to read your score

- **8–10:** PCA is solid — **that completes all of Subject 3 (Machine Learning)!**
- **6–7:** re-drill "variance along a PC $=$ its eigenvalue" (Q4, Q5, Q7) and PCA-vs-LDA (Q6).
- **≤5:** re-read Part 1 B–C; the key facts are max-variance $=$ $\lambda_{\max}$, PCs orthogonal, and PCA is unsupervised.
