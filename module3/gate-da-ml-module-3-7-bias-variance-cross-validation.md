---
title: "3.7 Bias-Variance & Cross-Validation"
parent: "Module 3: Machine Learning"
nav_order: 7
---

# GATE DA · ML Module 3.7 — Bias–Variance & Cross-Validation

## Exam Relevance

**Where this sits:** Machine Learning $\rightarrow$ _Bias–Variance & Cross-Validation_ — the model-selection glue that ties the supervised modules together (it governs ridge's $\lambda$, kNN's $k$, and tree depth).

**Weightage:** ML is the **#3 subject** ($16.9\%$). Tested directly:

- **2026 Q12** — **leave-one-out cross-validation**: how many validation splits?
- **2026 Q37** — the **bias–variance** effect of ridge regularization (also in Module 3.1)

_(2024 and 2025 had no dedicated bias-variance / CV question — so this is efficient-coverage, but the LOOCV-split count and the "complexity $\uparrow$ $\Rightarrow$ bias $\downarrow$, variance $\uparrow$" rule are easy, recurring ideas.)_

> **Why it matters:** two facts win marks — **LOOCV uses $n$ splits** (one per _training_ sample), and **regularization / simpler models trade variance for bias**. Both are one-liners once understood.

## Part 1 — Theory & Math

### A. Generalization: under- vs over-fitting

- **Underfitting:** model too simple — **high training error and high test error** (high bias).
- **Overfitting:** model too complex — **low training error but high test error** (high variance; it memorizes noise).
- The goal is the **sweet spot** that minimizes _test_ (generalization) error.

### B. The bias–variance decomposition

For squared-error loss, the expected test error of a model splits into three parts:

$$\mathbb{E}[\text{test error}] = \underbrace{\text{Bias}^2}_{\text{wrong assumptions}} + \underbrace{\text{Variance}}_{\text{sensitivity to data}} + \underbrace{\sigma^2}_{\text{irreducible noise}}.$$

- **Bias** = error from an over-simple model (systematic). **High bias $\to$ underfit.**
- **Variance** = sensitivity to the particular training set. **High variance $\to$ overfit.**
- **Irreducible noise** $\sigma^2$ cannot be reduced by any model.
- **The trade-off:** as model **complexity increases**, **bias decreases** but **variance increases**. Total error is U-shaped in complexity.

**Complexity knobs (which way they move bias/variance):**

| Knob                    | More complex direction | Effect                                                             |
| ----------------------- | ---------------------- | ------------------------------------------------------------------ |
| Ridge penalty $\lambda$ | **smaller** $\lambda$  | $\lambda\uparrow \Rightarrow$ bias$\uparrow$, variance$\downarrow$ |
| kNN neighbours $k$      | **smaller** $k$        | $k\downarrow \Rightarrow$ variance$\uparrow$ (overfit)             |
| Decision-tree depth     | **deeper**             | depth$\uparrow \Rightarrow$ variance$\uparrow$                     |
| Polynomial degree       | **higher**             | degree$\uparrow \Rightarrow$ variance$\uparrow$                    |

### C. Cross-validation (CV)

Estimate generalization and **select models/hyperparameters** using only the **training** data (the test set is held out for the final evaluation):

- **$k$-fold CV:** split the training data into $k$ equal folds; train on $k-1$, validate on the held-out fold; rotate so each fold validates once. **$k$ rounds / $k$ models.**
- **Leave-one-out CV (LOOCV):** the extreme $k = n$ case — each **single training sample** is the validation set once. **$n$ splits** (where $n$ = number of _training_ samples). Nearly unbiased, but expensive.
- **Train / validation / test:** tune on validation (or via CV), report final performance on the untouched test set.

### D. Learning curves

A **learning curve** plots training and validation error against training-set size $m$:

- **High-bias model:** both train and validation error converge to a **high plateau** — adding more data barely helps; the model needs more capacity.
- **High-variance model:** train error is low; validation error is much higher — a **large gap** that closes as $m$ grows; adding data (or regularization) helps.

These curves let you diagnose whether more data or a more complex model is the right remedy.

### E. Common traps GATE exploits

1. **Complexity $\uparrow$ $\Rightarrow$ bias $\downarrow$, variance $\uparrow$** (not both the same way).
2. **LOOCV uses $n$ splits**, where $n$ is the **training** count — subtract any held-out test samples first (2026 Q12).
3. **$k$-fold $\Rightarrow$ $k$ models**, not $n$.
4. **CV runs on training data**, never on the held-out test set.
5. **Overfitting $=$ high variance; underfitting $=$ high bias.**
6. **Irreducible noise** sets a floor on achievable error.
7. **Learning curve diagnosis:** large train-val gap that shrinks with more data $\Rightarrow$ high variance (add data / regularize); both errors plateau high $\Rightarrow$ high bias (add capacity). _(Connects to: ridge regularization — Module 3.1; kNN — Module 3.3; decision trees — Module 3.5.)_

## Part 2 — How to Solve (Method)

### Diagnosing bias vs variance

- **Train error high, test error high** (close) $\Rightarrow$ **underfitting / high bias** $\Rightarrow$ increase complexity.
- **Train error low, test error high** (large gap) $\Rightarrow$ **overfitting / high variance** $\Rightarrow$ regularize / simplify / get more data.

### Cross-validation counting

- **LOOCV splits** $=$ number of **training** samples (total minus any held-out test set).
- **$k$-fold:** $k$ rounds; each round trains on a $\tfrac{k-1}{k}$ fraction, validates on $\tfrac{1}{k}$.

### Reasoning about a knob

Decide which direction is "more complex," then apply: more complex $\Rightarrow$ lower bias, higher variance. (Ridge: smaller $\lambda$; kNN: smaller $k$; trees: greater depth.)

### Sanity checks

- Test error is U-shaped in complexity — both extremes are bad.
- CV split counts: LOOCV $= n$; $k$-fold $= k$; these should never exceed the training-set size.
- You can drive **training** error to 0 by overfitting — that is not the goal.

## Part 3 — Worked Examples

E1 is a real GATE DA question; the rest are standard originals.

---

### Example 1 — LOOCV split count _(2026 Q12 · MCQ · Med)_

**Q.** A 10-class problem; inputs are 512-dimensional; 1000 samples, of which the first 100 are held out for testing. LOOCV is used for model selection. How many validation splits are generated?
(A) 10 (B) 512 (C) 900 (D) 1000

**Solve.** CV runs on the **training** set only: $1000 - 100 = 900$ training samples. LOOCV makes **one split per training sample**, so there are **900** splits. The 10 classes and 512 dimensions are irrelevant distractors.

**Answer: (C) 900.** _Method:_ LOOCV splits $=$ training-set size (after removing the test set).

---

### Example 2 — Diagnosing bias vs variance _(original · Easy–Med)_

**Q.** Two models: Model A has 2% training error and 30% test error; Model B has 25% training error and 27% test error. Diagnose each.

**Solve.**

- **Model A:** tiny train error, large gap to test error $\Rightarrow$ **overfitting / high variance** (regularize or get more data).
- **Model B:** both errors high and close $\Rightarrow$ **underfitting / high bias** (increase capacity / add features).

_Method:_ the **gap** signals variance; a **uniformly high** error signals bias.

---

### Example 3 — k-fold cross-validation _(original · Med)_

**Q.** 100 training samples, 5-fold CV. How many models are trained, and how many samples are in each validation fold?

**Solve.** $5$-fold $\Rightarrow$ **5 models**; each fold holds $100/5 = 20$ validation samples, training on the other $80$.

_Method:_ $k$-fold runs $k$ rounds, validating on $1/k$ of the data each time.

---

### Example 4 — How a knob shifts bias and variance _(original · Med)_

**Q.** State the bias/variance effect of: (a) increasing ridge $\lambda$; (b) decreasing $k$ in kNN; (c) growing a decision tree deeper.

**Solve.**

- **(a)** $\lambda \uparrow$ shrinks weights $\Rightarrow$ **bias $\uparrow$, variance $\downarrow$** (the 2026 Q37 fact).
- **(b)** $k \downarrow$ makes kNN follow individual points $\Rightarrow$ **variance $\uparrow$** (overfit).
- **(c)** deeper tree fits training data more closely $\Rightarrow$ **variance $\uparrow$** (overfit).

_Method:_ identify the "more complex" direction $\Rightarrow$ lower bias, higher variance.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** Overfitting is characterized by
(A) high training error and high test error (B) low training error and high test error (C) low training and low test error (D) high training error and low test error

**Q2. ★★ (MCQ)** The expected test error (squared loss) decomposes into
(A) bias only (B) variance only (C) bias$^2$ + variance + irreducible noise (D) precision + recall

**Q3. ★★ (MCQ)** As model complexity increases,
(A) bias increases, variance decreases (B) bias decreases, variance increases (C) both increase (D) both decrease

**Q4. ★★ (NAT)** A dataset has 200 samples; 50 are held out for testing. Using LOOCV on the rest, the number of validation splits is \***\*\_\_\*\*** .

**Q5. ★★ (NAT)** In 5-fold cross-validation, the number of models trained is \***\*\_\_\*\*** .

**Q6. ★★ (MCQ)** A very small $k$ in kNN tends to produce
(A) high bias (B) high variance (C) zero variance (D) a linear boundary

**Q7. ★★ (MCQ)** Increasing the ridge penalty $\lambda$
(A) increases variance, decreases bias (B) increases bias, decreases variance (C) increases both (D) decreases both

**Q8. ★★ (MSQ)** Which statements are TRUE?
(A) Overfitting corresponds to high variance.
(B) Underfitting corresponds to high bias.
(C) LOOCV uses $n$ splits, where $n$ is the number of training samples.
(D) Cross-validation is performed on the held-out test set.

**Q9. ★★ (MCQ)** The main purpose of cross-validation is to
(A) increase training accuracy to 100% (B) select models / estimate generalization without touching the test set (C) reduce the number of features (D) speed up training

**Q10. ★★ (MCQ)** A fully grown, unpruned decision tree typically exhibits
(A) high bias, low variance (B) low bias, high variance (C) zero variance (D) high bias, high variance

**Q11. ★★★ (MCQ)** A model shows 4% training error and 38% validation error with 500 samples. When the training set grows to 2000 samples, training error rises to 9% and validation error falls to 14%. This pattern indicates
(A) high bias throughout — adding data cannot help
(B) high variance — adding data is closing the gap
(C) irreducible noise dominates
(D) underfitting that requires a simpler model

**Q12. ★★★ (NAT)** A dataset has 300 samples; 60 are held out for testing. The remaining samples are used for 10-fold CV. How many training samples does **each fold's model** train on? ****\_\_**** .

## Answer Key & Full Solutions

**Q1 — (B) low training error and high test error.** The model memorizes the training data but fails to generalize.

**Q2 — (C) bias$^2$ + variance + irreducible noise.** The standard bias-variance decomposition.

**Q3 — (B) bias decreases, variance increases.** More flexible models fit the data better (less bias) but become more sensitive to it (more variance).

**Q4 — 150.** Training set $= 200 - 50 = 150$; LOOCV makes one split per training sample $\Rightarrow 150$.

**Q5 — 5.** $k$-fold CV trains $k$ models; here $k = 5$.

**Q6 — (B) high variance.** Small $k$ lets noise in individual neighbours dominate — an overfit, high-variance model.

**Q7 — (B) increases bias, decreases variance.** L2 shrinkage biases the estimates but stabilizes them.

**Q8 — (A), (B), (C).** (D) is **false** — CV is done on the training/validation data; the test set is kept untouched for final evaluation.

**Q9 — (B).** CV estimates generalization and selects hyperparameters using only training data.

**Q10 — (B) low bias, high variance.** Unpruned trees fit the training set closely and generalize poorly.

**Q11 — (B) high variance — adding data is closing the gap.** The large train-val gap (34 pp) that closes dramatically with more data (only 5 pp gap at 2000 samples) is the signature of a high-variance model. High bias would show both errors staying high and roughly equal.

**Q12 — 216.** Training pool $= 300 - 60 = 240$ samples. In 10-fold CV each fold validates on $240/10 = 24$ samples and trains on $240 - 24 = 216$.

---

### How to read your score

- **10–12:** model selection is solid — on to Module 3.8 (Clustering).
- **7–9:** re-drill the complexity–bias–variance direction (Q3, Q6, Q7) and the CV split counts (Q4, Q5, Q12).
- **≤6:** re-read Part 1 B–D; the key facts are the U-shaped error curve, learning-curve diagnosis, and "LOOCV $= n$ training splits."
