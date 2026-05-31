---
title: "Machine Learning"
parent: "Cheat Sheets"
nav_order: 3
---

# GATE DA · ML Cheat Sheet — Machine Learning Formulas

## Regression & Ridge

- OLS minimizes $\sum (y_i-\hat y_i)^2$; normal equations $\hat{\mathbf w}=(X^\top X)^{-1}X^\top\mathbf y$.
- LR through origin: $w=\dfrac{\sum x_iy_i}{\sum x_i^2}$.
- **Ridge:** $\min_{\mathbf w}\ \lVert\mathbf y-X\mathbf w\rVert^2+\lambda\lVert\mathbf w\rVert^2$ $\Rightarrow \hat{\mathbf w}=(X^\top X+\lambda I)^{-1}X^\top\mathbf y$. Larger $\lambda$: $\uparrow$ bias, $\downarrow$ variance.
- Errors: $\text{MSE}=\tfrac1n\sum(y-\hat y)^2$, $\text{MAE}=\tfrac1n\sum\lvert y-\hat y\rvert$.

## Classification Metrics

- **Sigmoid** $\sigma(z)=\dfrac{1}{1+e^{-z}}$, $\sigma'=\sigma(1-\sigma)$.
- Confusion matrix ($TP,FP,FN,TN$):
  $$\text{accuracy}=\frac{TP+TN}{TP+TN+FP+FN},\quad \text{precision}=\frac{TP}{TP+FP},\quad \text{recall}=\frac{TP}{TP+FN}.$$
  $$F_1=\frac{2\cdot\text{precision}\cdot\text{recall}}{\text{precision}+\text{recall}}.$$

## Classifiers (kNN / NB / LDA / SVM)

- **kNN:** predict by majority of $k$ nearest (distance $\lVert\mathbf x-\mathbf x_i\rVert$); odd $k$ avoids ties.
- **Naive Bayes:** $\hat c=\arg\max_c P(c)\prod_i P(x_i\mid c)$ (conditional independence).
- **LDA / nearest-centroid:** linear boundary (shared covariance / $\lVert\cdot\rVert^2$ cancels).
- **SVM:** $\min\ \tfrac12\lVert\mathbf w\rVert^2$ s.t. $y_i(\mathbf w^\top\mathbf x_i+b)\ge1$; **margin $=\dfrac{2}{\lVert\mathbf w\rVert}$**; support vectors lie on the margin; kernels for non-linear (XOR).

## Decision Trees (impurity)

$$\text{Entropy }H=-\sum_i p_i\log_2 p_i\quad(\text{binary max }1),\qquad \text{Gini}=1-\sum_i p_i^2\quad(\text{binary max }0.5).$$
$$\text{Information Gain}=H(\text{parent})-\sum_k \frac{n_k}{n}\,H(\text{child}_k).$$
Pick the split with the highest information gain (lowest weighted child impurity).

## Neural Networks

- Neuron: $a=\phi(\mathbf w^\top\mathbf x+b)$. Activations: ReLU $\max(0,x)$; sigmoid; tanh.
- **MLP parameter count** $=\sum_{\text{layers}} (n_{\text{in}}\cdot n_{\text{out}})\;[+\,n_{\text{out}}\text{ biases}]$.
  - e.g. $30\to4\to3\to1$, no bias: $30\cdot4+4\cdot3+3\cdot1=135$.
- **SGD update:** $w\leftarrow w-\eta\,\dfrac{\partial L}{\partial w}$. ReLU on positive inputs $=$ identity.

## Bias-Variance & Cross-Validation

$$\mathbb E[\text{test error}]=\text{bias}^2+\text{variance}+\sigma^2_{\text{noise}}.$$

- Complexity $\uparrow$: bias $\downarrow$, variance $\uparrow$ (underfit $=$ high bias; overfit $=$ high variance).
- **LOOCV:** $n$ folds $=n$ models. **k-fold:** $k$ models. CV uses the **training** set only.

## Clustering & PCA

- **k-means:** minimize WCSS $\sum_k\sum_{x\in C_k}\lVert x-\mu_k\rVert^2$; assign to nearest centroid, update means. **k-medoid:** medoids are actual points.
- **Linkage:** single $=\min$ distance, complete $=\max$, average $=$ mean.
- **PCA:** eigen-decompose covariance $\Sigma$; **variance along PC$_i=\lambda_i$**; first PC $=\arg\max_{\lVert u\rVert=1}u^\top\Sigma u=\lambda_{\max}$; PCs orthogonal; keep top-$k$ for dimensionality reduction.

_(Concept recap: ML Revision Doc. Full worked PYQs: Modules 3.1–3.9.)_
