---
title: "3.1 Linear & Ridge Regression"
parent: "Module 3: Machine Learning"
nav_order: 1
---

# GATE DA · ML Module 3.1 — Linear & Ridge Regression

## Exam Relevance

**Where this sits:** Machine Learning $\rightarrow$ *Linear & Ridge Regression* — the first supervised learning model and the natural bridge from Probability & Statistics (least squares).

**Weightage:** ML is the **#3 subject** ($16.9\%$, rock-steady at $15/14/14$ marks). Regression appears directly:
- **2025 Q34** — **simple linear regression** through the origin ($w = 2/7$)
- **2026 Q37** — a **ridge regression** concept MCQ (L2, bias–variance)
- **2026 Q55** — computing a **ridge regularized loss**

*(2026 Q29 poses a single SGD step, but its wording — "the objective being minimized is $f_w(x)=wx$" — is ambiguous about the loss, so this module teaches gradient descent with a clean squared-error example instead.)*

> **Why it matters:** regression questions are short, formula-driven, and reliable. Lock in three things — the **least-squares slope formula**, the **gradient-descent update**, and the **ridge (L2) objective** with its bias–variance effect.

## Part 1 — Theory & Math

### A. Simple linear regression
Fit a line $\hat{y} = \beta_0 + \beta_1 x$ to minimize the **sum of squared errors** $\sum_i (y_i - \hat{y}_i)^2$. The closed-form least-squares solution:

$$\beta_1 = \frac{\sum_i (x_i - \bar{x})(y_i - \bar{y})}{\sum_i (x_i - \bar{x})^2} = \frac{\operatorname{Cov}(x,y)}{\operatorname{Var}(x)}, \qquad \beta_0 = \bar{y} - \beta_1 \bar{x}.$$

The fitted line always passes through $(\bar{x}, \bar{y})$. For a model **through the origin** $\hat{y} = w x$ (no intercept):

$$w = \frac{\sum_i x_i y_i}{\sum_i x_i^2}.$$

### B. Multiple linear regression
With a design matrix $X$ (rows = samples, columns = features) and targets $y$, the least-squares weights satisfy the **normal equations**:

$$\hat{\beta} = (X^\top X)^{-1} X^\top y \qquad (\text{requires } X^\top X \text{ invertible}).$$

### C. Loss functions
- **MSE** $= \dfrac{1}{n}\sum_i (y_i - \hat{y}_i)^2$ · **SSE** $= \sum_i (y_i - \hat{y}_i)^2$ · **MAE** $= \dfrac{1}{n}\sum_i |y_i - \hat{y}_i|$.

### D. Gradient descent
Update the weights against the gradient of the loss with learning rate $\eta$:

$$w \leftarrow w - \eta\, \nabla_w L.$$

For squared-error loss $L = \tfrac{1}{2}(\hat{y} - y)^2$ with $\hat{y} = wx$, the per-sample gradient is $\nabla_w L = (\hat{y} - y)\,x$. **Batch** GD uses all samples; **stochastic** GD (SGD) uses one sample per step.

### E. Ridge regression (L2 regularization)
Add an **L2 penalty** on the weights to the squared-error loss:

$$\min_{w}\; \sum_i (y_i - \hat{y}_i)^2 + \lambda \lVert w \rVert_2^2, \qquad \hat{w}_{\text{ridge}} = (X^\top X + \lambda I)^{-1} X^\top y.$$

- $\lambda \ge 0$ controls the shrinkage. Larger $\lambda$ pulls weights toward $0$.
- **Effect:** ridge **increases bias** but **reduces variance** — it combats overfitting and multicollinearity.
- **Ridge vs Lasso:** ridge uses the **L2** norm $\lVert w \rVert_2^2$ (shrinks, never exactly zero); **Lasso** uses the **L1** norm $\lVert w \rVert_1$ (can drive weights to exactly $0$ — feature selection / sparsity).

### F. Goodness of fit
$R^2 = 1 - \dfrac{\text{SSE}}{\text{SST}}$, where $\text{SST} = \sum_i (y_i - \bar{y})^2$; $R^2 \in [0,1]$ (closer to 1 is better).

### G. Common traps GATE exploits
1. **Ridge $=$ L2, Lasso $=$ L1.** Only **Lasso** produces exact zeros (sparsity).
2. **Regularization raises bias, lowers variance** (not the other way around).
3. **Through-origin slope** is $\sum x_i y_i / \sum x_i^2$ — no mean-centering.
4. **Normal equations** need $X^\top X$ invertible (ridge's $+\lambda I$ guarantees it).
5. The squared-error gradient is $(\hat{y}-y)\,x$ — keep the sign straight.
6. The least-squares line passes through $(\bar{x}, \bar{y})$.

## Part 2 — How to Solve (Method)

### Simple linear regression
- **Through the origin** ($\hat{y}=wx$): compute $w = \dfrac{\sum x_i y_i}{\sum x_i^2}$ directly.
- **With intercept:** compute $\beta_1 = \dfrac{\sum (x_i-\bar{x})(y_i-\bar{y})}{\sum (x_i-\bar{x})^2}$, then $\beta_0 = \bar{y} - \beta_1 \bar{x}$.

### Ridge regularized-loss problems
1. Compute the prediction $\hat{y} = w^\top x$.
2. Compute the **data-fit term** (squared error, MSE, or MAE as stated).
3. Compute the **penalty** $\lambda \lVert w \rVert_2^2$ (with the stated weight).
4. **Total loss** $=$ data-fit $+$ penalty.

### Gradient-descent step
1. Predict $\hat{y} = wx$ at the current $w$.
2. Gradient (squared error) $= (\hat{y}-y)\,x$.
3. Update $w \leftarrow w - \eta\,(\hat{y}-y)\,x$.

### Conceptual ridge/Lasso questions
Map statements to facts: L2 vs L1; shrinkage vs sparsity; bias up / variance down; guards against **overfitting** (great on train, poor on test).

### Sanity checks
- A larger $\lambda$ should shrink weights toward 0 (loss penalty grows).
- For perfectly linear data, the least-squares residuals (and SSE) are 0.
- Check the gradient sign: if $\hat{y} > y$ the weight should **decrease** (for positive $x$).

## Part 3 — Worked Examples

E1, E3, E4 are real GATE DA questions; E2 is a clean original (gradient descent).

---

### Example 1 — Least squares through the origin *(2025 Q34 · NAT · Med)*
**Q.** Fit $y = wx$ by least squares to the data $\{(-1,1), (2,-5), (3,5)\}$. Find the optimal $w$ (3 dp).

**Solve.** No intercept $\Rightarrow w = \dfrac{\sum x_i y_i}{\sum x_i^2}$.
- $\sum x_i y_i = (-1)(1) + (2)(-5) + (3)(5) = -1 - 10 + 15 = 4$.
- $\sum x_i^2 = 1 + 4 + 9 = 14$.
- $w = \dfrac{4}{14} = \dfrac{2}{7} \approx 0.286$.

**Answer: $w \approx 0.286$.** *Method:* the through-origin normal equation, no mean-centering.

---

### Example 2 — One step of (stochastic) gradient descent *(original · Med)*
**Q.** Model $\hat{y} = wx$ with squared-error loss $L = \tfrac{1}{2}(\hat{y}-y)^2$. Current $w = 1$, learning rate $\eta = 0.1$, sample $(x, y) = (2, 5)$. Find $w$ after one update.

**Solve.**
- Predict: $\hat{y} = wx = 1 \cdot 2 = 2$.
- Gradient: $(\hat{y} - y)\,x = (2 - 5)(2) = -6$.
- Update: $w \leftarrow 1 - 0.1(-6) = 1 + 0.6 = 1.6$.

**Answer: $w = 1.6$.** *Method:* $w \leftarrow w - \eta(\hat{y}-y)x$. (Since $\hat{y} < y$, $w$ increases — the right direction.)

---

### Example 3 — Ridge regularized loss *(2026 Q55 · NAT · Med–Hard)*
**Q.** Ridge regression with $\hat{y} = w^\top x$, $w, x \in \mathbb{R}^2$, MAE for the data-fit term, regularizer weight $0.20$. At a step, $w = [-3, 4]^\top$; input $x = [1, 2]^\top$; the true relation is $y = x_1 + x_2$. Find the overall regularized loss.

**Solve.**
- Prediction: $\hat{y} = w^\top x = (-3)(1) + (4)(2) = 5$.
- True value: $y = x_1 + x_2 = 1 + 2 = 3$.
- MAE term (single instance): $|y - \hat{y}| = |3 - 5| = 2$.
- Penalty: $0.20\,\lVert w \rVert_2^2 = 0.20\,(9 + 16) = 0.20 \times 25 = 5$.
- Total: $2 + 5 = 7.00$.

**Answer: $7.00$.** *Method:* data-fit term $+$ $\lambda \lVert w \rVert_2^2$.

---

### Example 4 — Ridge regression concept *(2026 Q37 · MCQ · Med)*
**Q.** Which statement is TRUE for ridge regression?
(A) the regularizer guards against the model doing well on test but poorly on train
(B) the regularizer uses the L1 norm
(C) it aims to reduce the number of negative-valued parameters
(D) the regularizer may increase bias but helps reduce prediction variance

**Solve.** (A) is backwards — overfitting is great on **train**, poor on **test**. (B) wrong — ridge uses **L2** (Lasso is L1). (C) wrong — it shrinks **all** weights toward 0, not negatives specifically. (D) is the textbook bias–variance description of L2 shrinkage.

**Answer: (D).** *Method:* recall L2 $\Rightarrow$ shrinkage $\Rightarrow$ bias $\uparrow$, variance $\downarrow$.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** Least-squares linear regression minimizes the
(A) sum of absolute residuals (B) sum of squared residuals (C) maximum residual (D) number of residuals

**Q2. ★★ (NAT)** For the data $(1,3), (2,5), (3,7)$, the least-squares slope $\beta_1$ of $\hat{y} = \beta_0 + \beta_1 x$ is __________ .

**Q3. ★★ (MCQ)** The regularizer in ridge regression uses the
(A) L0 norm (B) L1 norm (C) L2 norm (D) L-infinity norm

**Q4. ★★ (MCQ)** Increasing the ridge penalty $\lambda$ generally
(A) increases variance, decreases bias (B) increases bias, decreases variance (C) increases both (D) decreases both

**Q5. ★★ (NAT)** Ridge loss for one instance: $\hat{y} = w^\top x$ with $w = [1, 2]^\top$, $x = [2, 1]^\top$, $y_{\text{true}} = 4$, squared-error data term, penalty weight $\lambda = 0.5$. The total regularized loss is __________ .

**Q6. ★★ (NAT)** Model $\hat{y} = wx$, squared-error loss, $w = 2$, $\eta = 0.1$, sample $(x,y) = (3,4)$. After one gradient-descent step, $w =$ __________ .

**Q7. ★★ (MSQ)** Which statements are TRUE?
(A) Ridge regression uses the L2 norm.
(B) Lasso (L1) can drive some weights to exactly zero.
(C) Regularization increases model variance.
(D) Least squares minimizes the sum of squared residuals.

**Q8. ★★ (MCQ)** Which regularization can perform feature selection by setting some weights exactly to zero?
(A) ridge (L2) (B) lasso (L1) (C) neither (D) both equally

**Q9. ★★ (NAT)** Fit $y = wx$ (through the origin) to $(1,2), (2,3), (3,5)$. The optimal $w$ is __________ (2 dp).

**Q10. ★★ (MCQ)** The least-squares weights for multiple linear regression are given by
(A) $X^\top y$ (B) $(X^\top X)^{-1} X^\top y$ (C) $(X X^\top)^{-1} y$ (D) $X^{-1} y$

## Answer Key & Full Solutions

**Q1 — (B) sum of squared residuals.** That is the definition of ordinary least squares.

**Q2 — 2.** $\bar{x}=2, \bar{y}=5$. $\sum (x-\bar{x})(y-\bar{y}) = (-1)(-2)+0+(1)(2) = 4$; $\sum (x-\bar{x})^2 = 1+0+1 = 2$; $\beta_1 = 4/2 = 2$.

**Q3 — (C) L2 norm.** Ridge penalizes $\lambda \lVert w \rVert_2^2$.

**Q4 — (B) increases bias, decreases variance.** Stronger shrinkage simplifies the model: more bias, less variance.

**Q5 — 2.50.** $\hat{y} = (1)(2)+(2)(1) = 4 = y_{\text{true}}$, so the squared-error term is $0$. Penalty $= 0.5\,(1^2+2^2) = 0.5 \times 5 = 2.5$. Total $= 0 + 2.5 = 2.50$.

**Q6 — 1.40.** $\hat{y} = 2\cdot 3 = 6$; gradient $= (\hat{y}-y)x = (6-4)(3) = 6$; $w \leftarrow 2 - 0.1(6) = 1.4$.

**Q7 — (A), (B), (D).** (C) is **false** — regularization **reduces** variance (at the cost of higher bias).

**Q8 — (B) lasso (L1).** The L1 penalty yields sparse solutions; ridge only shrinks toward zero.

**Q9 — 1.64.** $w = \dfrac{\sum x_i y_i}{\sum x_i^2} = \dfrac{(1)(2)+(2)(3)+(3)(5)}{1+4+9} = \dfrac{23}{14} \approx 1.64$.

**Q10 — (B) $(X^\top X)^{-1} X^\top y$.** The normal equations for least squares.

---

### How to read your score
- **8–10:** regression is solid — on to Module 3.2 (Logistic Regression & Classification Metrics).
- **6–7:** re-drill the slope formulas (Q2, Q9), the ridge loss (Q5), and the GD step (Q6).
- **≤5:** re-read Part 1 A, D, E; memorize least-squares slope, the GD update, and L2-vs-L1.
