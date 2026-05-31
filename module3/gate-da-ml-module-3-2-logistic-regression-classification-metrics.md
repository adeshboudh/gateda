---
title: "3.2 Logistic Regression & Metrics"
parent: "Module 3: Machine Learning"
nav_order: 2
---

# GATE DA · ML Module 3.2 — Logistic Regression & Classification Metrics

## Exam Relevance

**Where this sits:** Machine Learning $\rightarrow$ *Logistic Regression & Classification Metrics* — the first **classifier** and how its quality is measured.

**Weightage:** ML is the **#3 subject** ($16.9\%$). This cluster is tested directly:
- **2024 Q33** — the **sigmoid** and its derivative $f'(x) = f(x)(1-f(x))$
- **2026 Q47** — a **confusion matrix**: accuracy, precision, recall comparison

*(2025 had no logistic/metric question; "classifier evaluation" is nonetheless a flagged recurring pattern across years.)*

> **Why it matters:** classification-metric questions are pure bookkeeping from a confusion matrix — reliable marks — and the **sigmoid derivative** $\sigma(1-\sigma)$ is a one-line favourite. Don't confuse **precision** (of predicted positives) with **recall** (of actual positives).

## Part 1 — Theory & Math

### A. Logistic regression
For **binary classification**, model the probability of the positive class with the **sigmoid** of a linear score:

$$P(y=1 \mid x) = \sigma(w^\top x + b), \qquad \sigma(z) = \frac{1}{1 + e^{-z}} \in (0, 1).$$

- **Decision boundary:** predict class 1 when $\sigma(\cdot) \ge 0.5 \iff w^\top x + b \ge 0$ — a **linear** boundary, so logistic regression is a **linear classifier**.
- **Log-odds (logit) is linear:** $\log\dfrac{p}{1-p} = w^\top x + b$.
- **Sigmoid derivative** (used in training): $\;\sigma'(z) = \sigma(z)\,(1 - \sigma(z))$.
- **Loss:** trained by minimizing **cross-entropy / log-loss** $L = -\big[y \log \hat{y} + (1-y)\log(1-\hat{y})\big]$ via gradient descent (no closed form). The per-sample gradient has the same clean form $(\hat{y} - y)\,x$ as linear regression.

### B. The confusion matrix (positive class = the class of interest)

| | Predicted Positive | Predicted Negative |
|---|---|---|
| **Actual Positive** | TP | FN |
| **Actual Negative** | FP | TN |

### C. Metrics
$$\text{Accuracy} = \frac{TP + TN}{TP+TN+FP+FN}, \qquad \text{Precision} = \frac{TP}{TP + FP},$$
$$\text{Recall (sensitivity)} = \frac{TP}{TP + FN}, \qquad \text{Specificity} = \frac{TN}{TN + FP},$$
$$F_1 = \frac{2 \cdot \text{Precision} \cdot \text{Recall}}{\text{Precision} + \text{Recall}} \quad (\text{harmonic mean}).$$

- **Precision** = "of those I *predicted* positive, how many truly are?" **Recall** = "of the *actual* positives, how many did I catch?"
- **Error rate** $= 1 - \text{Accuracy}$.

### D. Choosing a metric
- **Accuracy is misleading on imbalanced classes** (predicting the majority can look "accurate").
- Use **precision** when false positives are costly; **recall** when false negatives are costly; **F1** to balance both.

### E. Common traps GATE exploits
1. **Precision vs recall:** precision divides by **predicted** positives ($TP+FP$); recall by **actual** positives ($TP+FN$).
2. **Logistic regression is a *linear* classifier** (linear boundary), even though it outputs a probability.
3. **Sigmoid derivative** is $\sigma(1-\sigma)$ — not $\sigma^2$ or $e^{-z}$.
4. **Accuracy on imbalanced data** can be high yet useless.
5. **F1 is the harmonic** (not arithmetic) mean of precision and recall.
6. The **positive-class choice** changes which counts are TP/FP/FN — read carefully (per-class metrics).

## Part 2 — How to Solve (Method)

### Metric questions (from counts)
1. **Build the confusion matrix**: from the wording, fill TP, FP, FN, TN for the chosen positive class.
2. Apply the formula: accuracy uses the whole table; precision/recall focus on one class.
3. For **per-class** comparisons, recompute TP/FP/FN with that class as positive.

### Logistic regression
- **Predict:** compute $z = w^\top x + b$, then $\sigma(z)$; classify as 1 if $\sigma(z) \ge 0.5$ (equivalently $z \ge 0$).
- **Sigmoid derivative:** if you know $\sigma = p$, then $\sigma' = p(1-p)$ — no need to recompute $z$.

### Sanity checks
- Every metric lies in $[0, 1]$.
- Accuracy $=$ (sum of the diagonal) / (grand total).
- $\text{Recall} + \text{miss rate} = 1$; $\text{Precision}$ and $\text{Recall}$ generally **trade off**.
- On a balanced 2-class table, accuracy near $0.5$ means "no better than chance."

## Part 3 — Worked Examples

E1 and E3 are real GATE DA questions; E2 and E4 are standard originals.

---

### Example 1 — Sigmoid derivative *(2024 Q33 · NAT · Easy–Med)*
**Q.** For $f(x) = \dfrac{1}{1 + e^{-x}}$, find $f'(x)$ at the point where $f(x) = 0.4$ (2 dp).

**Solve.** The sigmoid satisfies $f'(x) = f(x)\,(1 - f(x))$. With $f(x) = 0.4$:
$$f'(x) = 0.4 \times (1 - 0.4) = 0.4 \times 0.6 = 0.24.$$

**Answer: $0.24$.** *Method:* memorize $\sigma' = \sigma(1-\sigma)$ — no need to find $x$.

---

### Example 2 — Logistic regression prediction *(original · Med)*
**Q.** A logistic model has $w = [1, -1]^\top$, $b = 0$. For input $x = [2, 1]^\top$, give $P(y=1\mid x)$ and the predicted class (threshold $0.5$).

**Solve.**
- Score: $z = w^\top x + b = (1)(2) + (-1)(1) = 1$.
- Probability: $\sigma(1) = \dfrac{1}{1 + e^{-1}} = \dfrac{1}{1 + 0.368} \approx 0.73$.
- Since $0.73 \ge 0.5$ (equivalently $z \ge 0$), predict **class 1**.

*Method:* compute $z$, pass through the sigmoid, threshold at $0.5$.

---

### Example 3 — Confusion-matrix metrics *(2026 Q47 · MSQ · Med–Hard)*
**Q.** 20 stories by X and 10 by Y are classified. Of X's, 6 are labelled Y; of Y's, 2 are labelled X. With X and Y as the two classes, which are true?
(A) Accuracy $= 11/15$ (B) Precision of X > Precision of Y (C) Recall of X > Recall of Y (D) Accuracy $= 14/15$

**Solve.** Confusion matrix (rows = actual):
```
              Pred X   Pred Y   total
Actual X        14       6       20
Actual Y         2       8       10
```
- **Accuracy** $= (14+8)/30 = 22/30 = 11/15$ $\Rightarrow$ (A) TRUE, (D) false.
- **Precision** (X positive) $= 14/(14+2) = 0.875$; (Y positive) $= 8/(8+6) \approx 0.571$ $\Rightarrow$ $X > Y$, (B) TRUE.
- **Recall** (X) $= 14/20 = 0.70$; (Y) $= 8/10 = 0.80$ $\Rightarrow$ $X < Y$, (C) FALSE.

**Answer: (A) and (B).** *Method:* build the matrix once, then read off each metric with the right positive class.

---

### Example 4 — Precision, recall, F1 *(original · Med)*
**Q.** A binary classifier gives $TP = 40$, $FP = 10$, $FN = 20$, $TN = 30$. Find accuracy, precision, recall, and $F_1$.

**Solve.**
- Accuracy $= (40+30)/100 = 0.70$.
- Precision $= 40/(40+10) = 0.80$.
- Recall $= 40/(40+20) = 40/60 \approx 0.667$.
- $F_1 = \dfrac{2(0.80)(0.667)}{0.80 + 0.667} = \dfrac{1.067}{1.467} \approx 0.727$.

*Method:* precision over predicted-positives, recall over actual-positives, $F_1$ their harmonic mean.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** The output of logistic regression (after the sigmoid) lies in
(A) $(-\infty, \infty)$ (B) $[-1, 1]$ (C) $(0, 1)$ (D) $\{0, 1\}$

**Q2. ★ (MCQ)** $\sigma(0)$ for the sigmoid $\sigma(z) = 1/(1+e^{-z})$ equals
(A) 0 (B) 0.5 (C) 1 (D) undefined

**Q3. ★★ (NAT)** A classifier has $TP = 30$, $FP = 10$. Its precision is __________ .

**Q4. ★★ (NAT)** A classifier has $TP = 30$, $FN = 20$. Its recall is __________ .

**Q5. ★★ (MCQ)** The $F_1$ score is the
(A) arithmetic mean (B) geometric mean (C) harmonic mean (D) maximum — of precision and recall

**Q6. ★★ (MCQ)** On a highly **imbalanced** dataset, which metric is most misleading on its own?
(A) precision (B) recall (C) accuracy (D) F1

**Q7. ★★ (NAT)** For the sigmoid, if $\sigma(z) = 0.7$ then $\sigma'(z) =$ __________ (2 dp).

**Q8. ★★ (MSQ)** Which statements about logistic regression are TRUE?
(A) It outputs a probability via the sigmoid.
(B) Its decision boundary is linear in the features.
(C) It is typically trained by minimizing squared error.
(D) The sigmoid satisfies $\sigma'(z) = \sigma(z)(1 - \sigma(z))$.

**Q9. ★★ (NAT)** A classifier has $TP = 50$, $TN = 30$, $FP = 10$, $FN = 10$. Its accuracy is __________ (2 dp).

**Q10. ★★ (MCQ)** The decision boundary of logistic regression (in the input feature space) is
(A) linear (B) quadratic (C) circular (D) always nonlinear

## Answer Key & Full Solutions

**Q1 — (C) $(0,1)$.** The sigmoid maps any real score to a probability strictly between 0 and 1.

**Q2 — (B) 0.5.** $\sigma(0) = 1/(1 + e^{0}) = 1/2$.

**Q3 — 0.75.** Precision $= TP/(TP+FP) = 30/40 = 0.75$.

**Q4 — 0.6.** Recall $= TP/(TP+FN) = 30/50 = 0.6$.

**Q5 — (C) harmonic mean.** $F_1 = 2PR/(P+R)$.

**Q6 — (C) accuracy.** With class imbalance, always predicting the majority class can give high accuracy while precision/recall on the minority class are poor.

**Q7 — 0.21.** $\sigma'(z) = \sigma(z)(1-\sigma(z)) = 0.7 \times 0.3 = 0.21$.

**Q8 — (A), (B), (D).** (C) is **false** — logistic regression is trained with **cross-entropy / log-loss**, not squared error.

**Q9 — 0.80.** Accuracy $= (TP+TN)/\text{total} = (50+30)/100 = 0.80$.

**Q10 — (A) linear.** $\sigma(w^\top x + b) = 0.5 \iff w^\top x + b = 0$, a linear boundary.

---

### How to read your score
- **8–10:** logistic regression and metrics are solid — on to Module 3.3 (kNN, Naive Bayes & LDA).
- **6–7:** re-drill precision-vs-recall (Q3, Q4) and the sigmoid derivative (Q7).
- **≤5:** re-read Part 1 A–C; memorize the confusion-matrix formulas and $\sigma' = \sigma(1-\sigma)$.
