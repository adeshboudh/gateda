---
title: "3.3 kNN, Naive Bayes & LDA"
parent: "Module 3: Machine Learning"
nav_order: 3
---

# GATE DA · ML Module 3.3 — kNN, Naive Bayes & LDA

## Exam Relevance

**Where this sits:** Machine Learning $\rightarrow$ *kNN, Naive Bayes & LDA* — the three classic classifiers plus the nearest-centroid rule.

**Weightage:** ML is the **#3 subject** ($16.9\%$). These classifiers are repeatedly tested:
- **2024 Q63** — **kNN**: smallest odd $k$ for a target label
- **2025 Q35** — **Naive Bayes** misclassification probability (also anchored Module 1.2)
- **2025 Q55** — **nearest-centroid** classifier: its boundary is **linear**
- **2026 Q23** — matching algorithms to tasks (Naive Bayes $\to$ classification, LDA $\to$ feature extraction, K-Medoid $\to$ clustering, MCMC $\to$ sampling)

> **Why it matters:** kNN questions are distance-and-vote; Naive Bayes is a posterior comparison; the nearest-centroid/LDA boundary is **linear** (a favourite "is it linear or quadratic?" trap). High-yield, low-machinery.

## Part 1 — Theory & Math

### A. k-Nearest Neighbours (kNN)
**Instance-based / lazy** learner: it **stores** the training data and does all work at query time.
- Classify a query by the **majority vote** of its $k$ nearest neighbours under a distance metric (usually **Euclidean** $\lVert p - q \rVert_2$).
- **Choice of $k$:** small $k$ $\Rightarrow$ low bias / **high variance** (noisy, overfits); large $k$ $\Rightarrow$ smoother / higher bias. Use an **odd $k$** in 2-class problems to avoid ties.
- **No training** (lazy); each query costs $O(n)$. The decision boundary is **non-linear**.

### B. Naive Bayes
**Probabilistic** classifier using Bayes' rule with the **"naive" conditional-independence** assumption — features independent given the class:

$$P(y \mid x_1,\dots,x_d) \propto P(y)\prod_{i=1}^{d} P(x_i \mid y).$$

- Predict the **MAP** class: $\hat{y} = \arg\max_y\, P(y)\prod_i P(x_i\mid y)$.
- Posterior $\propto$ **prior $\times$ likelihood**; normalize across classes to get probabilities.
- For a given $x$, the **misclassification probability** $= 1 - \max_y P(y\mid x)$.
- Variants: Gaussian (continuous), multinomial / Bernoulli (counts / binary).

### C. Nearest-centroid (nearest-mean) classifier
Assign $x$ to the class whose **mean** $\mu_c$ is closest: compare $\lVert \mu_c - x \rVert^2$. Expanding the difference for two classes,

$$f(x) = \lVert\mu_{1}-x\rVert^2 - \lVert\mu_{2}-x\rVert^2 = 2(\mu_{2}-\mu_{1})^\top x + \big(\lVert\mu_{1}\rVert^2 - \lVert\mu_{2}\rVert^2\big) = w^\top x + b.$$

The $\lVert x \rVert^2$ terms **cancel**, so $f$ is **linear (affine)** in $x$ — a **hyperplane** decision boundary, not quadratic (this is 2025 Q55).

### D. Linear Discriminant Analysis (LDA)
Assumes **Gaussian class-conditionals with equal covariance** $\Rightarrow$ a **linear** decision boundary. LDA finds the projection that **maximizes between-class scatter relative to within-class scatter**, so it doubles as a **dimensionality-reduction / feature-extraction** method. (With *unequal* covariances you get QDA — a quadratic boundary.)

### E. Quick comparison

| Classifier | Type | Boundary | Training |
|---|---|---|---|
| kNN | instance-based (lazy) | non-linear | none (store data) |
| Naive Bayes | probabilistic | (linear for many cases) | estimate priors/likelihoods |
| Nearest-centroid | distance-based | **linear** | compute class means |
| LDA | Gaussian, equal cov | **linear** | estimate means + shared cov |

### F. Common traps GATE exploits
1. **kNN is lazy** (no training) and its boundary is **non-linear**; use **odd $k$** to break 2-class ties.
2. **Naive Bayes** multiplies prior by per-feature likelihoods (independence) and takes the **MAP** class.
3. **Nearest-centroid / LDA boundaries are LINEAR** — the $\lVert x\rVert^2$ cancels; it is **not** quadratic.
4. **LDA also does dimensionality reduction** (feature extraction), not only classification.
5. **Small $k$ overfits** (high variance); large $k$ oversmooths.
6. Misclassification probability for a given $x$ is $1 - \max_y P(y\mid x)$.

## Part 2 — How to Solve (Method)

### kNN questions
1. Compute the **distance** from the query to every training point.
2. **Sort**; take the $k$ nearest; **majority vote**.
3. For "smallest $k$ for label L": increase $k$ (often only odd values) and recount until L wins. Watch **ties** at equal distances.

### Naive Bayes questions
1. For each class, compute the **unnormalized score** $P(y)\prod_i P(x_i\mid y)$.
2. The predicted class is the larger score (**MAP**).
3. **Normalize** to get posteriors; misclassification $= 1 - \max$ posterior.

### Nearest-centroid / LDA
- Compare squared distances to the class means; **expand** to reveal the linear form $w^\top x + b$ (the $\lVert x\rVert^2$ cancels).
- Remember LDA = linear boundary (equal covariance) and a feature-extraction tool.

### Sanity checks
- A kNN tie usually signals you need to include/exclude a tied neighbour — re-read the metric and $k$.
- Naive Bayes posteriors over all classes sum to 1.
- If you ever get a "quadratic" nearest-centroid boundary, you forgot the $\lVert x\rVert^2$ cancellation.

## Part 3 — Worked Examples

All four are real GATE DA questions.

---

### Example 1 — kNN: smallest odd k for a label *(2024 Q63 · NAT · Med)*
**Q.** Circles at $(1,1), (1,2)$; squares at $(2,3), (3,3), (3,2)$; query $\Diamond = (2,1)$. Euclidean distance. Find the **minimum odd $k$** for which $\Diamond$ is labelled **square**.

**Solve.** Distances from $(2,1)$:

| Point | Class | Distance |
|---|---|---|
| $(1,1)$ | Circle | $1.000$ |
| $(1,2)$ | Circle | $\sqrt{2}\approx 1.414$ |
| $(3,2)$ | Square | $\sqrt{2}\approx 1.414$ |
| $(2,3)$ | Square | $2.000$ |
| $(3,3)$ | Square | $\sqrt{5}\approx 2.236$ |

- $k=1$: $\{$Circle$\}$ $\Rightarrow$ Circle.
- $k=3$: $\{$Circle, Circle, Square$\}$ $\Rightarrow$ 2C, 1S $\Rightarrow$ Circle.
- $k=5$: all $\Rightarrow$ 2C, 3S $\Rightarrow$ **Square**.

**Answer: $k = 5$.** *Method:* distances $\to$ majority vote, increasing odd $k$.

---

### Example 2 — Naive Bayes misclassification *(2025 Q35 · NAT · Med)*
**Q.** Two classes with $P(y_1)=\tfrac13$, $P(y_2)=\tfrac23$; for feature $x$, $P(x\mid y_1)=\tfrac34$, $P(x\mid y_2)=\tfrac14$. Find the misclassification probability for $x$.

**Solve.** Unnormalized posteriors:
- $y_1$: $\tfrac34 \cdot \tfrac13 = \tfrac14$;  $y_2$: $\tfrac14 \cdot \tfrac23 = \tfrac16$.
- Normalizer $= \tfrac14 + \tfrac16 = \tfrac{5}{12}$, so $P(y_1\mid x) = \tfrac{1/4}{5/12} = \tfrac35 = 0.6$, $P(y_2\mid x) = 0.4$.
- MAP picks $y_1$; misclassification $= P(y_2\mid x) = 0.40$.

**Answer: $0.40$.** *(Also appeared in Module 1.2 as a Bayes example.)* *Method:* compare prior$\times$likelihood, normalize, $1-\max$.

---

### Example 3 — Nearest-centroid is a linear classifier *(2025 Q55 · MSQ · Med–Hard)*
**Q.** Classify $x$ by $f(x) = \lVert\mu_{red}-x\rVert^2 - \lVert\mu_{green}-x\rVert^2$ (red if $f<0$). Which are correct? (A) $x=0$ gets green if $\lVert\mu_{red}\rVert<\lVert\mu_{green}\rVert$ (B) $f$ is linear in $x$ (C) $f(x)=w^\top x + b$ with $w,b$ functions of the means (D) $f$ is quadratic in $x$.

**Solve.** Using $\lVert a-x\rVert^2 = \lVert a\rVert^2 - 2a^\top x + \lVert x\rVert^2$ and subtracting, the $\lVert x\rVert^2$ terms cancel:
$$f(x) = 2(\mu_{green}-\mu_{red})^\top x + \big(\lVert\mu_{red}\rVert^2 - \lVert\mu_{green}\rVert^2\big) = w^\top x + b.$$
So $f$ is **linear/affine** $\Rightarrow$ (B), (C) TRUE; (D) FALSE. For (A): at $x=0$, $f(0)=\lVert\mu_{red}\rVert^2-\lVert\mu_{green}\rVert^2 < 0$ when $\lVert\mu_{red}\rVert<\lVert\mu_{green}\rVert$, so $x=0$ is labelled **red**, not green $\Rightarrow$ (A) FALSE.

**Answer: (B) and (C).** *Method:* expand the squared norms; the $\lVert x\rVert^2$ cancellation makes the boundary a hyperplane.

---

### Example 4 — Matching algorithms to tasks *(2026 Q23 · MCQ · Med)*
**Q.** Match: T1 Clustering, T2 Classification, T3 Sampling, T4 Feature Extraction — to A1 MCMC, A2 K-Medoid, A3 LDA, A4 Naive Bayes.

**Solve.**
- T1 Clustering $\to$ **A2 K-Medoid** (partitional clustering).
- T2 Classification $\to$ **A4 Naive Bayes** (probabilistic classifier).
- T3 Sampling $\to$ **A1 MCMC** (samples from complex distributions).
- T4 Feature Extraction $\to$ **A3 LDA** (maximizes between/within-class scatter; dimensionality reduction).

**Answer: (B) T1:A2, T2:A4, T3:A1, T4:A3.** *Method:* know each algorithm's primary role. (K-Medoid is detailed in Module 3.8; MCMC sampling is in the AI subject.)

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** kNN is best described as
(A) an eager learner that builds a model at training time (B) a lazy / instance-based learner (C) a linear classifier (D) a clustering algorithm

**Q2. ★★ (MCQ)** Choosing a very small $k$ in kNN tends to
(A) underfit (high bias) (B) overfit (high variance) (C) have no effect (D) guarantee linear boundaries

**Q3. ★★ (NAT)** Naive Bayes with $P(A)=P(B)=0.5$, $P(x\mid A)=0.8$, $P(x\mid B)=0.2$. The posterior $P(A\mid x)$ is __________ .

**Q4. ★★ (MCQ)** The "naive" assumption in Naive Bayes is that
(A) all classes are equally likely (B) features are conditionally independent given the class (C) the data are linearly separable (D) features are normally distributed

**Q5. ★★ (MCQ)** Under the equal-covariance assumption, the LDA decision boundary is
(A) linear (B) quadratic (C) circular (D) piecewise constant

**Q6. ★★ (MSQ)** Which of the following are **linear** classifiers?
(A) logistic regression (B) nearest-centroid classifier (C) kNN (D) LDA (equal covariance)

**Q7. ★★ (NAT)** The Euclidean distance between the points $(1, 2)$ and $(4, 6)$ is __________ .

**Q8. ★ (MCQ)** Which classifier performs **no** explicit training (stores the data and works at query time)?
(A) logistic regression (B) Naive Bayes (C) kNN (D) LDA

**Q9. ★★ (MCQ)** Besides classification, LDA is commonly used for
(A) sampling (B) dimensionality reduction / feature extraction (C) clustering (D) regression

**Q10. ★★ (MCQ)** Naive Bayes predicts the class that maximizes
(A) $P(x)$ (B) $P(y)\prod_i P(x_i\mid y)$ (C) $\prod_i P(x_i)$ (D) the Euclidean distance to the class mean

## Answer Key & Full Solutions

**Q1 — (B) lazy / instance-based.** kNN stores the training set and defers all computation to query time.

**Q2 — (B) overfit (high variance).** Small $k$ makes predictions sensitive to individual (possibly noisy) neighbours.

**Q3 — 0.8.** Scores: $A: 0.5\times0.8 = 0.4$; $B: 0.5\times0.2 = 0.1$. $P(A\mid x) = 0.4/(0.4+0.1) = 0.8$.

**Q4 — (B).** Features are assumed conditionally independent given the class — that is the "naive" part.

**Q5 — (A) linear.** Equal class covariances make the LDA boundary a hyperplane (unequal $\Rightarrow$ QDA, quadratic).

**Q6 — (A), (B), (D).** Logistic regression, nearest-centroid, and equal-covariance LDA all have linear boundaries; **kNN** is non-linear.

**Q7 — 5.** $\sqrt{(4-1)^2 + (6-2)^2} = \sqrt{9+16} = \sqrt{25} = 5$.

**Q8 — (C) kNN.** It is the lazy learner; the others fit parameters at training time.

**Q9 — (B) dimensionality reduction / feature extraction.** LDA projects to maximize class separability.

**Q10 — (B) $P(y)\prod_i P(x_i\mid y)$.** This is the MAP rule under the conditional-independence assumption.

---

### How to read your score
- **8–10:** the classic classifiers are solid — on to Module 3.4 (Support Vector Machines).
- **6–7:** re-drill the kNN vote (Q1, Q2), Naive Bayes MAP (Q3, Q10), and the linear-boundary set (Q5, Q6).
- **≤5:** re-read Part 1 A–D; the high-value facts are kNN-is-lazy, NB-is-MAP, and nearest-centroid/LDA-are-linear.
