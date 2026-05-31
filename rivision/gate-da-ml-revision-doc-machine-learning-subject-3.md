---
title: "Subject 3: Machine Learning"
parent: "Revision Docs"
nav_order: 3
---

# GATE DA · ML Revision Doc — Machine Learning (Subject 3)

## How to Use & Weightage Map

Condensed revision of **Subject 3** — must-knows, GATE angle, traps. Full detail in **Modules 3.1–3.9**; formula lookup in the **ML Cheat Sheet**.

**Weightage:** ML is the **#3 subject** (**~16.9%**, rock-steady $14\text{–}15$ marks/year) with **predictable subtopics** — SVM, clustering/linkage, PCA, regression, naive Bayes, kNN, decision-tree info gain, classifier metrics.

| Module | Topic                            |
| ------ | -------------------------------- |
| 3.1    | Linear & ridge regression        |
| 3.2    | Logistic regression & metrics    |
| 3.3    | kNN, naive Bayes, LDA            |
| 3.4    | SVM                              |
| 3.5    | Decision trees                   |
| 3.6    | Neural networks                  |
| 3.7    | Bias-variance & cross-validation |
| 3.8    | Clustering                       |
| 3.9    | PCA                              |

## Top 5 PYQ Patterns

The question types that recur most reliably in ML across GATE DA 2024–2026:

1. **Information gain calculation** — compute parent entropy then weighted child entropy; answer to 2 dp using $\log_2$ (2024 Q62). Keep more decimals through the computation and round at the end.
2. **SVM: find $w$, $b$, margin, support vectors** — from a small labeled dataset; verify all constraints $y_i(w^\top x_i+b)\ge1$; margin $=2/\lVert w\rVert$ (2025 Q53, 2024 Q53).
3. **Confusion-matrix metrics** — from TP/FP/FN/TN (or a narrative description), compute precision, recall, accuracy, and/or $F_1$ (2026 Q47). The hardest variant gives the matrix as counts-in-prose.
4. **PCA eigenvalue** — variance along the $i$-th PC $=\lambda_i$; proportion explained $=\lambda_i/\sum\lambda_j$; first PC maximizes variance (2025 Q60, 2026 Q11, 2024 Q18).
5. **Clustering linkage / k-means trace** — from a distance matrix identify the first merge under single (min) or complete (max) linkage; or trace one k-means iteration (assign + update centroid).

## 3.1 Linear & Ridge Regression

**Must know**

- Simple LR through origin: $w=\dfrac{\sum x_i y_i}{\sum x_i^2}$; general OLS minimizes $\sum (y_i-\hat y_i)^2$; normal equations $\hat{\mathbf w}=(X^\top X)^{-1}X^\top \mathbf y$.
- **Ridge:** minimize $\lVert \mathbf y-X\mathbf w\rVert^2+\lambda\lVert\mathbf w\rVert^2$ (L2). **Raises bias, lowers variance**; shrinks weights; helps when $X^\top X$ is ill-conditioned.

**GATE angle:** compute a regression weight; ridge concept (bias/variance effect of $\lambda$); regularized loss value.

**Traps:** ridge penalizes $\lVert\mathbf w\rVert^2$ (not the intercept usually); larger $\lambda\Rightarrow$ more shrinkage, more bias.

## 3.2 Logistic Regression & Metrics

**Must know**

- **Sigmoid** $\sigma(z)=\dfrac{1}{1+e^{-z}}$, derivative $\sigma'=\sigma(1-\sigma)$; decision boundary is **linear** in features.
- **Confusion matrix** $\to$ accuracy $=\dfrac{TP+TN}{\text{all}}$, **precision** $=\dfrac{TP}{TP+FP}$, **recall** $=\dfrac{TP}{TP+FN}$, $F_1=\dfrac{2PR}{P+R}$.

**GATE angle:** sigmoid derivative value; compute precision/recall/accuracy from a confusion matrix.

**Traps:** precision vs recall (denominators differ); accuracy misleads on imbalanced data.

## 3.3 kNN, Naive Bayes & LDA

**Must know**

- **kNN:** lazy, distance-based; choose **odd $k$** to avoid ties; larger $k$ smooths.
- **Naive Bayes:** assumes **conditional independence** of features given the class; $P(c\mid \mathbf x)\propto P(c)\prod_i P(x_i\mid c)$.
- **LDA:** generative, assumes shared covariance $\Rightarrow$ **linear** boundary. Nearest-centroid is also linear ($\lVert\cdot\rVert^2$ terms cancel).

**GATE angle:** classify a query by kNN; naive-Bayes misclassification; identify linear vs nonlinear classifiers.

**Traps:** kNN ties at even $k$; naive-Bayes independence is an assumption, not a fact.

## 3.4 SVM

**Must know**

- **Maximize the margin** $=\dfrac{2}{\lVert\mathbf w\rVert}$, i.e. **minimize $\tfrac12\lVert\mathbf w\rVert^2$** subject to $y_i(\mathbf w^\top\mathbf x_i+b)\ge1$.
- **Support vectors** are the points on the margin; only they determine $\mathbf w$.
- **Hard** (separable) vs **soft** margin (slack $\xi$); **kernels** for non-linear (XOR is not linearly separable).

**GATE angle:** find $\mathbf w$, $b$, the margin, and the support vectors; linear separability of datasets.

**Traps:** margin is $2/\lVert\mathbf w\rVert$; XOR needs a kernel; non-support points don't matter.

## 3.5 Decision Trees

**Must know**

- **Entropy** $H=-\sum_i p_i\log_2 p_i$ (binary max $=1$ at $p=0.5$).
- **Information gain** $=H(\text{parent})-\sum_k \dfrac{n_k}{n}H(\text{child}_k)$ — pick the highest-gain split.
- **Gini** $=1-\sum_i p_i^2$ (binary max $=0.5$).

**GATE angle:** compute the information gain of a candidate split.

**Traps:** use $\log_2$ for entropy; weight children by size; max entropy (1) vs max Gini (0.5).

## 3.6 Neural Networks

**Must know**

- Neuron: $a=\phi(\mathbf w^\top\mathbf x+b)$; activations: **ReLU** $\max(0,x)$, sigmoid, tanh.
- **MLP parameter count** $=\sum_{\text{layers}}(\text{in}\times\text{out})\,[+\text{out biases}]$.
- **ReLU on positive inputs $=$ identity**, so a multi-layer net with all-positive activations collapses to a linear map.
- Training: gradient descent + backpropagation; SGD weight update $w\leftarrow w-\eta\,\partial L/\partial w$.

**GATE angle:** count parameters of a given architecture; ReLU/gradient reasoning; one SGD step.

**Traps:** include (or exclude) biases as stated; ReLU is non-linear only because of the kink at 0.

## 3.7 Bias-Variance & Cross-Validation

**Must know**

- **Test error $=$ bias$^2$ + variance + irreducible noise.** Model complexity $\uparrow$ $\Rightarrow$ bias $\downarrow$, variance $\uparrow$.
- **LOOCV:** $n$ folds (one sample held out each time) $=n$ models. **k-fold:** $k$ models.
- Cross-validation is done on the **training** data (never the test set).

**GATE angle:** number of LOOCV/k-fold splits; bias-variance direction with complexity; ridge effect.

**Traps:** LOOCV splits $=$ number of **training** samples; underfit $=$ high bias, overfit $=$ high variance.

## 3.8 Clustering

**Must know**

- **k-means:** minimize within-cluster sum of squares; assign to nearest centroid, recompute means; needs $k$; sensitive to init. **k-medoid** uses actual points (robust to outliers).
- **Hierarchical (agglomerative):** **single linkage** $=$ **min** inter-cluster distance (chaining), **complete** $=$ **max**, **average** $=$ mean.

**GATE angle:** trace single/complete-linkage merges from a distance matrix; first merge (closest pair); linkage definitions.

**Traps:** single $=$ min, complete $=$ max (don't swap); k-means assumes spherical clusters.

## 3.9 PCA

**Must know**

- PCA finds **orthogonal** directions of **maximum variance** $=$ eigenvectors of the covariance matrix; **variance along a PC $=$ its eigenvalue**.
- First PC maximizes $\mathbf u^\top\Sigma\mathbf u$ over unit $\mathbf u$ $\Rightarrow \lambda_{\max}$ (Rayleigh quotient — ties to Linear Algebra 5.5).
- PCs are **orthogonal** (angle $90^\circ$); used for **dimensionality reduction**.

**GATE angle:** variance along the first PC $=\lambda_{\max}$; orthogonality of PCs; PCA as dimensionality reduction.

**Traps:** maximize variance (largest eigenvalue), not minimize; PCs orthonormal.

## Traps & Exam Strategy

**Highest-cost traps**

1. **Precision vs recall** denominators ($FP$ vs $FN$).
2. **SVM margin $=2/\lVert\mathbf w\rVert$**; minimize $\lVert\mathbf w\rVert^2$.
3. **Entropy uses $\log_2$**; weight children by size for info gain.
4. **Single linkage $=$ min, complete $=$ max.**
5. **PCA: max variance $=$ largest eigenvalue**; PCs orthogonal.
6. **Ridge** raises bias, lowers variance; **LOOCV** $=n$ folds.

**Strategy**

- ML is **stable and predictable** — the same subtopics recur; drill SVM, clustering, PCA, info gain, and metrics.
- Many questions are **small computations** (one info-gain, one margin, one confusion-matrix metric) — fast marks.

_(Full worked PYQs: Modules 3.1–3.9. Formula lookup: ML Cheat Sheet.)_
