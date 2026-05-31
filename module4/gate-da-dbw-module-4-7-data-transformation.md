---
title: "4.7 Data Transformation"
parent: "Module 4: Databases & Warehousing"
nav_order: 7
---

# GATE DA · DBW Module 4.7 — Data Transformation

## Exam Relevance

**Where this sits:** Database & Warehousing $\rightarrow$ *Data Transformation* — preparing raw data (normalize, discretize, sample, compress) for analytics and ML. The final DBW module.

**Weightage:** DBW is the **fastest-rising subject** ($7 \to 11 \to 18$ marks), but **data transformation specifically is lightly tested**: the only direct PYQ is
- **2024 Q27** — **z-score normalization** ($z = (106000-96000)/21000 = 0.476$; full solution in Module 1.8).

*(This is efficient-coverage by design — know the formulas, but don't over-invest relative to SQL, indexing, and FDs in this subject.)*

> **Why it matters:** the transformations are simple plug-in formulas. The two to know cold are **min-max normalization** $\dfrac{x-\min}{\max-\min}$ and **z-score standardization** $\dfrac{x-\mu}{\sigma}$ — both also appear in ML preprocessing.

## Part 1 — Theory & Math

### A. Normalization (scaling to a comparable range)
- **Min-max normalization** to a new range $[\,new_{\min}, new_{\max}\,]$:
$$x' = \frac{x - \min}{\max - \min}\,(new_{\max} - new_{\min}) + new_{\min}.$$
To the unit interval $[0,1]$: $\;x' = \dfrac{x - \min}{\max - \min}$.
- **Z-score (standardization):** $\;x' = \dfrac{x - \mu}{\sigma}$ — centers to mean $0$, scales to SD $1$ (uses **mean and SD**, robust to range, sensitive to outliers via $\sigma$). *(This is 2024 Q27.)*
- **Decimal scaling:** $x' = x / 10^{\,j}$ for the smallest $j$ making $\max |x'| < 1$.

### B. Discretization / binning (continuous $\to$ discrete)
- **Equal-width binning:** split the range into $k$ intervals of width $\dfrac{\max - \min}{k}$.
- **Equal-frequency (equal-depth) binning:** each bin holds (about) the same **number of values**.
- **Smoothing:** replace values by their **bin mean / median / boundary**.

### C. Sampling (numerosity / data reduction)
- **Simple random** (with or without replacement), **stratified** (sample each subgroup/stratum, often proportionally), **cluster**, **systematic**. Reduces data volume while preserving structure.

### D. Data compression / reduction
- **Dimensionality reduction:** fewer attributes — e.g. **PCA** / feature selection (ML Module 3.9).
- **Numerosity reduction:** represent data compactly — parametric models, histograms, clustering, sampling.
- **Aggregation:** roll detailed data up (e.g. daily $\to$ monthly).
- **Lossless** (exact reconstruction) vs **lossy** (approximate) compression.

### E. Concept hierarchies
Generalize values up a hierarchy (numeric ranges or categorical levels) — the same hierarchies used in OLAP (Module 4.6).

### F. Common traps GATE exploits
1. **Min-max uses min and max; z-score uses mean and SD** — don't mix the inputs.
2. **Min-max to $[0,1]$** is simply $\dfrac{x-\min}{\max-\min}$ — the value-of-interest's own min/max aren't used, the attribute's are.
3. **Equal-width** $\ne$ **equal-frequency**: equal-width fixes the interval size; equal-frequency fixes the count per bin.
4. **Lossy compression is not reversible** (lossless is).
5. **Sampling** is a *reduction* technique — mind with/without replacement.
6. z-score can produce **negative** values and is unbounded; min-max is bounded to the target range.

## Part 2 — How to Solve (Method)

### Normalization
- **Min-max:** plug into $\dfrac{x-\min}{\max-\min}\,(new_{\max}-new_{\min}) + new_{\min}$ (drop the affine part for plain $[0,1]$).
- **Z-score:** $\dfrac{x-\mu}{\sigma}$ — use the attribute's mean and standard deviation.

### Discretization
- **Equal-width** bin width $= \dfrac{\max - \min}{k}$; the $i$-th bin is $[\min + (i-1)w,\; \min + i\,w)$.
- **Equal-frequency:** sort and split so each bin has the same count.

### Identify the technique
Match the description: scaling to a range $\to$ normalization; continuous-to-intervals $\to$ discretization; reducing the number of rows $\to$ sampling; reducing attributes $\to$ dimensionality reduction.

### Sanity checks
- A min-max-normalized value lies in the **target range** (e.g. $[0,1]$); the min maps to 0 and the max to 1.
- A z-score is 0 at the mean and $\pm 1$ at one SD away.
- Equal-width bin widths are all equal; equal-frequency bin counts are all equal.

## Part 3 — Worked Examples

These are clean originals (the one PYQ, 2024 Q27, is solved in Module 1.8 and referenced here).

---

### Example 1 — Min-max normalization *(original · Easy)*
**Q.** An attribute ranges over $[10, 50]$. Normalize the value $30$ to $[0, 1]$.

**Solve.** $x' = \dfrac{x - \min}{\max - \min} = \dfrac{30 - 10}{50 - 10} = \dfrac{20}{40} = 0.5$.

**Answer: $0.5$.** *Method:* min maps to 0, max to 1; this value sits halfway.

---

### Example 2 — Z-score standardization *(original · Easy–Med; cf. 2024 Q27)*
**Q.** An attribute has mean $\mu = 70$ and SD $\sigma = 10$. Standardize $x = 80$.

**Solve.** $x' = \dfrac{x - \mu}{\sigma} = \dfrac{80 - 70}{10} = 1.0$ (one SD above the mean).

**Answer: $1.0$.** *Method:* $(x-\mu)/\sigma$. *(2024 Q27 is the same idea: $(106000-96000)/21000 = 0.476$.)*

---

### Example 3 — Equal-width binning *(original · Med)*
**Q.** Discretize the range $[0, 100]$ into $5$ equal-width bins. Give the bin width and boundaries.

**Solve.** Width $= \dfrac{\max - \min}{k} = \dfrac{100 - 0}{5} = 20$. Bins: $[0,20), [20,40), [40,60), [60,80), [80,100]$.

**Answer: width $20$**, five intervals as above. *Method:* equal-width $=$ range divided by the number of bins.

---

### Example 4 — Identify the transformation *(original · Med)*
**Q.** Classify each: (a) replacing 1,000,000 rows with a random 1% subset; (b) converting `age` into {child, teen, adult, senior}; (c) reducing 100 features to 10 with PCA.

**Solve.**
- (a) **Sampling** (numerosity reduction — fewer rows).
- (b) **Discretization** (continuous $\to$ categorical intervals).
- (c) **Dimensionality reduction / compression** (fewer attributes; PCA, Module 3.9).

*Method:* fewer rows $\to$ sampling; continuous-to-intervals $\to$ discretization; fewer columns $\to$ dimensionality reduction.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** Z-score normalization of an attribute uses its
(A) min and max (B) mean and standard deviation (C) median and range (D) first and last values

**Q2. ★★ (NAT)** Min-max normalize the value $25$ over the range $[0, 50]$ to $[0, 1]$: __________ .

**Q3. ★★ (NAT)** An attribute has mean $50$ and SD $7$. The z-score of the value $64$ is __________ .

**Q4. ★★ (MCQ)** Equal-width discretization of $[0, 100]$ into 4 bins gives a bin width of
(A) 4 (B) 20 (C) 25 (D) 50

**Q5. ★★ (MCQ)** Which is a data-reduction technique?
(A) min-max normalization (B) z-score standardization (C) sampling (D) decimal scaling

**Q6. ★★ (MSQ)** Which statements are TRUE?
(A) Min-max normalization scales to a fixed range using the attribute's min and max.
(B) Z-score normalization uses the mean and standard deviation.
(C) Equal-frequency bins contain (about) equal numbers of values.
(D) Lossy compression is always exactly reversible.

**Q7. ★★ (NAT)** Equal-width discretization of the range $[10, 90]$ into 4 bins has bin width __________ .

**Q8. ★★ (MCQ)** Stratified sampling draws samples
(A) only from the largest group (B) proportionally from each subgroup (stratum) (C) without any structure (D) only the first n rows

**Q9. ★★ (MCQ)** Converting a continuous attribute into a small set of labeled intervals is
(A) normalization (B) discretization (C) compression (D) sampling

**Q10. ★★ (MCQ)** Using PCA as a preprocessing step performs
(A) discretization (B) dimensionality reduction (C) z-score scaling (D) sampling

## Answer Key & Full Solutions

**Q1 — (B) mean and standard deviation.** $z = (x-\mu)/\sigma$.

**Q2 — 0.5.** $(25 - 0)/(50 - 0) = 0.5$.

**Q3 — 2.0.** $(64 - 50)/7 = 14/7 = 2.0$.

**Q4 — (C) 25.** Width $= \dfrac{\max - \min}{k} = \dfrac{100 - 0}{4} = 25$; the four bins are $[0,25),[25,50),[50,75),[75,100]$.

**Q5 — (C) sampling.** Sampling reduces the number of rows; the others are scaling transforms.

**Q6 — (A), (B), (C).** (D) is **false** — lossy compression discards information and is not exactly reversible.

**Q7 — 20.** Width $= (90 - 10)/4 = 80/4 = 20$.

**Q8 — (B) proportionally from each subgroup (stratum).** Stratified sampling preserves subgroup proportions.

**Q9 — (B) discretization.** Continuous $\to$ a few labeled intervals is discretization (binning).

**Q10 — (B) dimensionality reduction.** PCA projects onto fewer components, reducing the number of features.

---

### How to read your score
- **8–10:** data transformation is solid — **that completes all of Subject 4 (Database & Warehousing)!**
- **6–7:** re-drill min-max vs z-score (Q1, Q2, Q3) and equal-width bin width (Q4, Q7).
- **≤5:** re-read Part 1 A–B; the must-know formulas are min-max $\dfrac{x-\min}{\max-\min}$ and z-score $\dfrac{x-\mu}{\sigma}$.
