---
title: "3.4 Support Vector Machines"
parent: "Module 3: Machine Learning"
nav_order: 4
---

# GATE DA · ML Module 3.4 — Support Vector Machines

## Exam Relevance

**Where this sits:** Machine Learning $\rightarrow$ *Support Vector Machines* — the maximum-margin linear classifier (and, via kernels, a non-linear one).

**Weightage:** ML is the **#3 subject** ($16.9\%$), and **SVM is a flagged recurring topic**:
- **2024 Q53** — **linear separability** of 2D datasets (which can a line separate?)
- **2025 Q53** — a full **hard-margin SVM**: find $w, b$, the **support vectors**, and the **margin**

*(2026 had no SVM question — emphasis shifts year to year.)*

> **Why it matters:** SVM questions reward two facts — the **margin is $2/\lVert w\rVert$**, and **support vectors are the points sitting exactly on the margin**. Plus the classic intuition that **XOR is not linearly separable** (the motivation for kernels).

## Part 1 — Theory & Math

### A. The maximum-margin idea
An SVM separates two classes with the hyperplane $w^\top x + b = 0$, classifying by $\operatorname{sign}(w^\top x + b)$. Among all separating hyperplanes, it picks the one with the **largest margin** (widest gap to the nearest points).

### B. Margin and the optimization
The two **margin boundaries** are $w^\top x + b = +1$ and $w^\top x + b = -1$. The distance between them — the **margin** — is

$$\text{margin} = \frac{2}{\lVert w \rVert}.$$

Maximizing the margin is therefore equivalent to **minimizing $\tfrac{1}{2}\lVert w\rVert^2$** subject to the constraints

$$y_i\,(w^\top x_i + b) \ge 1 \quad \text{for every training point } (x_i, y_i),\; y_i \in \{+1, -1\}.$$

### C. Support vectors
The **support vectors** are the training points for which the constraint holds with **equality**: $y_i(w^\top x_i + b) = 1$ — i.e. the points lying **exactly on the margin boundaries**. Only these determine $w$ and $b$; **removing a non-support-vector leaves the solution unchanged**.

### D. Hard vs soft margin
- **Hard margin** requires the data to be **linearly separable**.
- **Soft margin** allows violations via **slack variables** $\xi_i \ge 0$, minimizing $\tfrac12\lVert w\rVert^2 + C\sum_i \xi_i$. The parameter $C$ trades off margin width against misclassification: **larger $C$ $\Rightarrow$ fewer violations but a smaller margin**.

### E. Kernels (the kernel trick)
For data that is **not linearly separable**, map it to a higher-dimensional feature space $\phi(x)$ where it becomes separable. The **kernel** $K(x, x') = \phi(x)^\top \phi(x')$ computes those inner products **without** forming $\phi$ explicitly. Common kernels: **linear**, **polynomial** $(x^\top x' + c)^d$, **RBF / Gaussian** $\exp(-\gamma\lVert x - x'\rVert^2)$.

### F. Linear separability
A dataset is **linearly separable** if some hyperplane classifies all points correctly. **XOR / checkerboard** patterns are the textbook **non-separable** case (the motivation for kernels); a class fully **enclosed** by another, or **overlapping** classes, are also non-separable by a line.

### G. Common traps GATE exploits
1. **Margin $= 2/\lVert w\rVert$** (full width); the half-margin is $1/\lVert w\rVert$.
2. **Support vectors lie on the margin** ($y_i(w^\top x_i+b)=1$) — interior points are not support vectors.
3. **Maximize margin $\equiv$ minimize $\lVert w\rVert^2$.**
4. **XOR is not linearly separable** — needs a kernel / feature map.
5. **Larger $C$ $\Rightarrow$ smaller margin** (less tolerance), not larger.
6. Removing a **non**-support-vector does not change the boundary; removing a support vector can.

## Part 2 — How to Solve (Method)

### Solving a small hard-margin SVM
1. Write the constraints $y_i(w^\top x_i + b) \ge 1$. The **support vectors** make these tight ($=1$).
2. Use the equality constraints from the (guessed or given) support vectors to solve for $w$ and $b$.
3. **Verify** every other point satisfies $y_i(w^\top x_i + b) \ge 1$ with the correct sign.
4. **Margin** $= 2/\lVert w\rVert$; **#support vectors** $=$ points with $y_i(w^\top x_i+b)=1$.

### Linear-separability questions
Ask: can a single straight line (hyperplane) put all of one class on one side? **No** for XOR/checkerboard, an enclosed class, or overlapping classes. **Yes** when the classes occupy distinct half-planes.

### Kernel / non-linear questions
If the data is not linearly separable, an SVM uses a **kernel** to lift it to a space where a linear separator exists.

### Sanity checks
- The margin must be **positive**; a smaller $\lVert w\rVert$ means a wider margin.
- Each support vector should sit exactly on a $\pm 1$ boundary; non-SVs satisfy the constraint strictly ($> 1$).
- Training accuracy of a valid hard-margin SVM on separable data is **100%**.

## Part 3 — Worked Examples

E1–E2 are real GATE DA questions; E3–E4 are standard originals.

---

### Example 1 — Which datasets are linearly separable? *(2024 Q53 · MSQ · Med)*
**Q.** Four 2D datasets (two classes): (i) two classes in distinct upper-left / lower-right regions; (ii) one circle enclosed by squares on all sides; (iii) the XOR pattern (circles on one diagonal, squares on the other); (iv) interleaved/overlapping classes. Which are linearly separable?

**Solve.**
- **(i)** distinct regions $\Rightarrow$ a diagonal line separates them. **Separable.**
- **(ii)** an enclosed point cannot be cut off by a single line. **Not separable.**
- **(iii)** XOR — the textbook **non**-separable case. **Not separable.**
- **(iv)** overlapping classes $\Rightarrow$ no zero-error line. **Not separable.**

**Answer: (A) only.** *Method:* a single hyperplane must place all of one class on one side; XOR / enclosed / overlapping fail.

---

### Example 2 — A hard-margin SVM end to end *(2025 Q53 · MSQ · Hard)*
**Q.** Class +1: $\{(2,0), (0,2), (2,2)\}$; Class $-1$: $\{(0,0)\}$. Solve the hard-margin SVM. Which are correct? (A) $w=(4,4), b=1$ (B) 3 support vectors (C) margin $=\sqrt2$ (D) training accuracy 98%.

**Solve.** Make the nearest opposing points tight. Try $w=(1,1)$, $b=-1$ (boundary $x_1+x_2=1$):
- $(2,0)$: $2 + 0 - 1 = +1$ (on $+1$ boundary $\Rightarrow$ support vector)
- $(0,2)$: $0 + 2 - 1 = +1$ (support vector)
- $(2,2)$: $2 + 2 - 1 = +3 \ge 1$ (interior, **not** a support vector)
- $(0,0)$: $0 + 0 - 1 = -1$ (on $-1$ boundary $\Rightarrow$ support vector)

All constraints hold, so $w=(1,1), b=-1$.
- **Support vectors:** $(2,0), (0,2), (0,0)$ $\Rightarrow$ **3** $\Rightarrow$ (B) TRUE.
- **Margin** $= 2/\lVert w\rVert = 2/\sqrt{1^2+1^2} = 2/\sqrt2 = \sqrt2$ $\Rightarrow$ (C) TRUE.
- (A): with $w=(4,4), b=1$, the point $(0,0)$ gives $\operatorname{sign}(1) = +1$ — misclassifies a $-1$ point $\Rightarrow$ FALSE.
- (D): all 4 points are correct $\Rightarrow$ accuracy $100\%$, not 98% $\Rightarrow$ FALSE.

**Answer: (B) and (C).** *Method:* solve the tight constraints for $w,b$; count SVs; margin $=2/\lVert w\rVert$.

---

### Example 3 — Margin from the weight vector *(original · Easy–Med)*
**Q.** An SVM has $w = (3, 4)$. What is the margin?

**Solve.** $\lVert w\rVert = \sqrt{3^2 + 4^2} = 5$, so $\text{margin} = 2/\lVert w\rVert = 2/5 = 0.4$.

**Answer: $0.4$.** *Method:* margin $= 2/\lVert w\rVert$.

---

### Example 4 — Why XOR needs a kernel *(original · Med)*
**Q.** Class A: $(0,0), (1,1)$; Class B: $(0,1), (1,0)$. Is this linearly separable? How does an SVM handle it?

**Solve.** This is **XOR** — no single line separates A from B (any line misclassifies at least one point). An SVM applies a **kernel** (e.g. add the feature $x_1 x_2$, or use an RBF kernel) to map the points into a higher-dimensional space where a linear separator exists.

*Method:* recognise XOR as non-separable $\Rightarrow$ kernel trick.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** An SVM finds the
(A) minimum-margin hyperplane (B) maximum-margin separating hyperplane (C) nearest centroid (D) decision tree

**Q2. ★★ (NAT)** An SVM has weight vector $w = (3, 4)$. The margin $2/\lVert w\rVert$ is __________ .

**Q3. ★★ (MCQ)** The support vectors of an SVM are the training points that
(A) are farthest from the boundary (B) lie exactly on the margin boundaries (C) are misclassified (D) are the class means

**Q4. ★★ (MCQ)** The XOR dataset is
(A) linearly separable (B) not linearly separable (C) separable only with $k=1$ kNN (D) always overlapping

**Q5. ★★ (MCQ)** To classify data that is not linearly separable, an SVM uses
(A) a larger learning rate (B) the kernel trick (mapping to a higher-dimensional space) (C) gradient boosting (D) more support vectors only

**Q6. ★★ (MCQ)** Maximizing the SVM margin is equivalent to
(A) maximizing $\lVert w\rVert$ (B) minimizing $\lVert w\rVert^2$ (C) maximizing $b$ (D) minimizing the number of features

**Q7. ★★ (MSQ)** Which statements about SVMs are TRUE?
(A) The margin equals $2/\lVert w\rVert$.
(B) Only support vectors determine the separating hyperplane.
(C) Hard-margin SVM requires the data to be linearly separable.
(D) A larger soft-margin parameter $C$ produces a larger margin.

**Q8. ★★ (NAT)** If $\lVert w\rVert = \sqrt{2}$, the SVM margin $2/\lVert w\rVert$ is __________ (2 dp).

**Q9. ★★ (MCQ)** A soft-margin SVM introduces __________ to handle non-separable data.
(A) slack variables (B) eigenvectors (C) a confusion matrix (D) a learning rate

**Q10. ★★ (MCQ)** Removing a training point that is **not** a support vector
(A) flips all labels (B) does not change the learned hyperplane (C) always widens the margin (D) makes the data non-separable

## Answer Key & Full Solutions

**Q1 — (B) maximum-margin separating hyperplane.** That is the defining objective of an SVM.

**Q2 — 0.4.** $\lVert w\rVert = \sqrt{9+16} = 5$; margin $= 2/5 = 0.4$.

**Q3 — (B) lie exactly on the margin boundaries.** They satisfy $y_i(w^\top x_i + b) = 1$.

**Q4 — (B) not linearly separable.** XOR is the classic example requiring a non-linear (kernel) boundary.

**Q5 — (B) the kernel trick.** Map to a higher-dimensional feature space where a linear separator exists.

**Q6 — (B) minimizing $\lVert w\rVert^2$.** Since margin $= 2/\lVert w\rVert$, a wider margin means a smaller $\lVert w\rVert$.

**Q7 — (A), (B), (C).** (D) is **false** — a larger $C$ penalizes violations more, giving a **smaller** margin.

**Q8 — 1.41.** $2/\sqrt2 = \sqrt2 \approx 1.41$.

**Q9 — (A) slack variables.** Soft-margin SVM adds $\xi_i \ge 0$ with penalty $C\sum_i \xi_i$.

**Q10 — (B) does not change the learned hyperplane.** Only support vectors determine the solution.

---

### How to read your score
- **8–10:** SVMs are solid — on to Module 3.5 (Decision Trees).
- **6–7:** re-drill the margin formula (Q2, Q8) and the support-vector definition (Q3, Q10).
- **≤5:** re-read Part 1 B–C and re-work Example 2 (the full hard-margin solve).
