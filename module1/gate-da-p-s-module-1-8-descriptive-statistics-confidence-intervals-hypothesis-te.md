---
title: "1.8 Descriptive Stats, CI & Hypothesis Testing"
parent: "Module 1: Probability & Statistics"
nav_order: 8
---

# GATE DA · P&S Module 1.8 — Descriptive Statistics, Confidence Intervals & Hypothesis Testing

## Exam Relevance

**Where this sits:** Probability & Statistics → *Descriptive Statistics & Statistical Inference* — summarizing data (mean/median/mode/SD) and drawing conclusions from samples (confidence intervals, hypothesis tests). This is the **final P&S module**; it ties together the normal (1.5) and sampling theory (1.7).

**Weightage — read this carefully (it shapes how much to study):**
- **Descriptive statistics is tested regularly**, often in General Aptitude and as data-prep: **2024 Q27** (z-score normalization), **2024 Q34** (running mean), **2025 Q10** (weighted mean), **2026 Q62** (sample variance). Know it cold.
- **Confidence intervals and formal hypothesis tests (z / t / chi-squared tests) did NOT appear at all in 2024, 2025, or 2026.** They are in the syllabus and could appear in 2027, so learn the *fundamentals* below — but **don't over-invest** here relative to the heavily-tested topics (Bayes, distributions, RVs).

> **Strategy:** master descriptive statistics (reliable easy marks) and keep the inference framework (CI + the three tests) at a confident *fundamentals* level. This is an efficient-coverage module, by design.

## Part 1 — Theory & Math

## Descriptive Statistics

### A. Central tendency
- **Mean** $\bar{x} = (1/n)\sum x_i$ — sensitive to outliers. **Weighted mean** $\dfrac{\sum w_i x_i}{\sum w_i}$.
- **Median** — the middle value (sorted); for even $n$, the average of the two middle values. **Robust** to outliers.
- **Mode** — the most frequent value (can be none/multiple).

### B. Dispersion
- **Range** $= \max - \min$.
- **Population variance** $\sigma^2 = \dfrac{1}{n}\sum(x_i - \bar{x})^2$; **Sample variance** $s^2 = \dfrac{1}{n-1}\sum(x_i - \bar{x})^2$ (the **$n-1$** is Bessel's correction).
- **Standard deviation** $= \sqrt{\text{variance}}$. **IQR** $= Q_3 - Q_1$.
- **z-score (standardization):** $z = (x - \text{mean})/\text{SD}$ — how many SDs a value sits from the mean (2024 Q27).

### C. Effect of transformations
- Add a constant $c$ to every point: **mean $+c$**, **variance unchanged**.
- Multiply every point by $k$: **mean $\times k$**, **variance $\times k^2$**, **SD $\times\lvert k\rvert$**.

---

## Statistical Inference (fundamentals)

### D. Confidence interval (CI) for a mean
An interval that captures the true mean with a stated confidence (e.g. 95%).
> **$\sigma$ known (or large $n$):** $\bar{x} \pm z_{\alpha/2} \cdot \dfrac{\sigma}{\sqrt{n}}$
> **$\sigma$ unknown (small $n$):** $\bar{x} \pm t_{\alpha/2,\, n-1} \cdot \dfrac{s}{\sqrt{n}}$
The $\pm$ part is the **margin of error**. Key $z$ critical values:

| Confidence | 90% | 95% | 99% |
|---|---|---|---|
| $z_{\alpha/2}$ | 1.645 | 1.96 | 2.576 |

- **Wider** interval $\Rightarrow$ higher confidence; **narrower** $\Rightarrow$ larger $n$ (width $\propto 1/\sqrt{n}$).

### E. Hypothesis testing framework
1. **Hypotheses:** null $H_0$ (no effect / status quo) vs alternative $H_1$.
2. **Significance level $\alpha$** (often 0.05) $= P(\text{Type I error})$.
3. **Test statistic** ($z$, $t$, or $\chi^2$) from the data.
4. **Decision:** reject $H_0$ if the statistic falls in the rejection region, i.e. **p-value $< \alpha$** (or $\lvert \text{stat}\rvert > $ critical value).
5. **One-tailed** ($H_1$: $>$ or $<$) vs **two-tailed** ($H_1$: $\ne$).

### F. Which test to use

| Goal | Condition | Test |
|---|---|---|
| Mean | $\sigma$ known, or large $n$ | **z-test** / z-interval |
| Mean | $\sigma$ unknown, small $n$ | **t-test** (df $= n-1$) |
| Variance of a normal population | — | **$\chi^2$-test** (df $= n-1$) |
| Goodness-of-fit / independence (categorical) | — | **$\chi^2$-test** |

### G. Two kinds of error
- **Type I:** reject a **true** $H_0$ (probability **$\alpha$**) — a false alarm.
- **Type II:** fail to reject a **false** $H_0$ (probability **$\beta$**). **Power $= 1 - \beta$**.

---

### H. Common traps GATE exploits
1. **Population variance $\div n$ vs sample variance $\div(n-1)$** — know which is asked.
2. **Mean vs median robustness:** outliers pull the mean, not the median.
3. **Transformations:** adding a constant leaves variance unchanged; scaling multiplies variance by $k^2$ (SD by $\lvert k\rvert$).
4. **z vs t:** $\sigma$ known → $z$; $\sigma$ estimated by $s$ (small $n$) → $t$.
5. **Type I vs Type II** error definitions are frequently swapped.
6. **CI width** grows with confidence and shrinks with $\sqrt{n}$.

## Part 2 — How to Solve (Method)

### Descriptive-statistics problems
- **Mean update / running average:** new mean $=$ (old sum + new values)/(new count). (2024 Q34)
- **Weighted mean:** $\dfrac{\sum(\text{frequency}\times\text{value})}{\sum\text{frequency}}$, then apply any given earnings/transform formula. (2025 Q10)
- **z-score:** $(x - \text{mean})/\text{SD}$. (2024 Q27)
- **Variance:** decide **population ($\div n$)** vs **sample ($\div(n-1)$)**; use $\sum(x-\bar{x})^2$ or the shortcut $(\sum x^2)/n - \bar{x}^2$ (population).
- **Median:** sort first; pick the middle (or average the two middle).

### Confidence-interval problems
1. Pick $z$ ($\sigma$ known/large $n$) or $t$ ($\sigma$ unknown/small $n$).
2. Margin of error $=$ critical value $\times$ standard error ($\sigma/\sqrt{n}$ or $s/\sqrt{n}$).
3. CI $= \bar{x} \pm \text{margin}$.

### Hypothesis-test problems
1. Write $H_0$, $H_1$; choose $\alpha$ and one/two-tailed.
2. Compute the test statistic: $z = (\bar{x} - \mu_0)/(\sigma/\sqrt{n})$, or $t$ with $s$, or $\chi^2$ for variance/categorical.
3. Compare to the critical value (or p-value to $\alpha$) and **decide**: reject $H_0$ or not.
4. State the conclusion in context.

---

### Exam tactics & sanity checks
- For descriptive stats, **read $\div n$ vs $\div(n-1)$ carefully** — the most common slip.
- A z-score near 0 means "typical"; $\lvert z\rvert > 2$ means "unusual".
- A CI must **contain $\bar{x}$** at its centre; the margin must be positive.
- p-value $< \alpha \Rightarrow$ reject $H_0$; otherwise fail to reject (never "accept").

## Part 3 — Worked Examples

E1–E3 are descriptive statistics (E2–E3 are real GATE DA questions); E4–E5 demonstrate the inference fundamentals. Use $z = 1.96$ for 95%, $\Phi(1.5)=0.9332$.

---

### Example 1 — Mean, median, mode, variance, SD *(original · Easy–Med)*
**Q.** Dataset: 3, 5, 5, 7, 10. Find the mean, median, mode, population variance, and sample variance.

**Solve.**
- **Mean** $= (3+5+5+7+10)/5 = 30/5 = \mathbf{6}$.
- **Median** (sorted 3,5,5,7,10) $= \mathbf{5}$ (middle value).
- **Mode** $= \mathbf{5}$ (most frequent).
- Squared deviations from 6: 9, 1, 1, 1, 16 → sum $= 28$.
- **Population variance** $= 28/5 = \mathbf{5.6}$ (SD $= \sqrt{5.6} \approx 2.37$).
- **Sample variance** $= 28/(5-1) = \mathbf{7}$ (SD $\approx 2.65$).

*Method:* the divisor is the only subtlety — $\div n$ for population, $\div(n-1)$ for sample.

---

### Example 2 — Running / updated mean *(2024 Q34 · NAT · Easy–Med)*
**Q.** The sample average of 50 data points is 40. After including a new point of value 142, the updated average is ___.

**Solve.**
- Old sum $= 50 \times 40 = 2000$; new sum $= 2000 + 142 = 2142$; new count $= 51$.
- New average $= 2142 / 51 = \mathbf{42}$.

**Answer: 42.** *Method:* rebuild the total, divide by the new count.

---

### Example 3 — z-score normalization *(2024 Q27 · MCQ · Med)*
**Q.** For attribute *income*: min ₹46000, max ₹170000, mean ₹96000, SD ₹21000. The z-score normalized value of ₹106000 is closest to
(A) 0.217 (B) 0.476 (C) 0.623 (D) 2.304

**Solve.**
- $z = \dfrac{x - \text{mean}}{\text{SD}} = \dfrac{106000 - 96000}{21000} = \dfrac{10000}{21000} \approx 0.476$.

**Answer: (B) 0.476.** *Method:* z-score uses **mean and SD only** (min/max are distractors here). *(z-score normalization also appears as a data-transformation tool in the Database & Warehousing subject.)*

---

### Example 4 — A 95% confidence interval for a mean *(original · Med)*
**Q.** A sample of $n = 64$ has mean $\bar{x} = 100$; the population SD is $\sigma = 16$. Construct a 95% confidence interval for the mean.

**Solve ($\sigma$ known → z-interval).**
- Standard error $= \sigma/\sqrt{n} = 16/8 = 2$.
- Margin $= z_{0.025} \times \text{SE} = 1.96 \times 2 = 3.92$.
- CI $= 100 \pm 3.92 = \mathbf{(96.08, 103.92)}$.

*Method:* CI $= \bar{x} \pm (\text{critical } z)\times(\sigma/\sqrt{n})$. Larger $n$ would shrink this interval.

---

### Example 5 — A two-tailed z-test *(original · Med)*
**Q.** Test $H_0$: $\mu = 100$ vs $H_1$: $\mu \ne 100$ at $\alpha = 0.05$. A sample of $n = 64$ gives $\bar{x} = 103$, with $\sigma = 16$.

**Solve.**
- Test statistic: $z = \dfrac{\bar{x} - \mu_0}{\sigma/\sqrt{n}} = \dfrac{103 - 100}{2} = 1.5$.
- Two-tailed critical values at $\alpha = 0.05$: $\pm1.96$. Since $\lvert 1.5\rvert < 1.96$, **fail to reject $H_0$**.
- (p-value $= 2(1 - \Phi(1.5)) = 2(1 - 0.9332) = 0.1336 > 0.05$ — same conclusion.)

**Conclusion:** insufficient evidence that $\mu \ne 100$. *Method:* statistic → compare to critical value (or p to $\alpha$) → decide.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — ⅓ / ⅔ penalty. (★ easy · ★★ medium · ★★★ hard.) Use $z = 1.96$ for 95%.

**Q1. ★★ (MCQ)** In 100 shifts the patient count $X$ is: $X=5$ (20 shifts), $X=6$ (40), $X=7$ (30), $X=8$ (10). If earnings $= 1000(X - 0.2)$, the average earnings per shift is *(2025 Q10)*
(A) ₹6,100 (B) ₹6,300 (C) ₹6,000 (D) ₹6,500

**Q2. ★★ (NAT)** The population variance of the dataset 1, 3, 5, 7, 9 is __________ .

**Q3. ★ (NAT)** The median of 3, 7, 8, 5, 12, 14, 21, 13, 18 is __________ .

**Q4. ★ (MCQ)** A value of 85 in a distribution with mean 70 and SD 10 has z-score
(A) 1.0 (B) 1.5 (C) 0.85 (D) 2.0

**Q5. ★★ (NAT)** A sample of $n = 100$ has population SD $\sigma = 20$. The margin of error of a 95% confidence interval for the mean is __________ (two decimals).

**Q6. ★★ (MCQ)** A Type I error is
(A) rejecting a true null hypothesis (B) failing to reject a false null hypothesis (C) accepting a true alternative (D) increasing the sample size

**Q7. ★★ (MCQ)** To test a population mean when the population SD is unknown and the sample is small, the appropriate distribution is the
(A) z (standard normal) (B) t (C) chi-squared (D) F

**Q8. ★★ (MSQ)** Which statements are TRUE?
(A) Adding a constant $c$ to every data point increases the mean by $c$ but leaves the variance unchanged.
(B) The median is more robust to outliers than the mean.
(C) Multiplying every data point by $k$ multiplies the standard deviation by $\lvert k\rvert$.
(D) The sample variance divides the sum of squared deviations by $n$.

**Q9. ★★★ (NAT)** For a dataset of $n = 100$, it is given that $\dfrac{1}{2000}\cdot\sum_i\sum_j (x_i - x_j)^2 = 99$. Then $\dfrac{1}{99}\cdot\sum_i (x_i - \bar{x})^2 =$ __________ . *(2026 Q62)*

**Q10. ★★ (MCQ)** Increasing the sample size $n$ (all else equal) makes a confidence interval
(A) wider (B) narrower (C) unchanged (D) undefined

## Answer Key & Full Solutions

**Q1 — (A) ₹6,100.** Mean $X = (5\times20 + 6\times40 + 7\times30 + 8\times10)/100 = 630/100 = 6.3$. Earnings $= 1000(6.3 - 0.2) = 1000(6.1) = ₹6{,}100$.

**Q2 — 8.** Mean $= 25/5 = 5$; squared deviations 16, 4, 0, 4, 16 → sum 40; population variance $= 40/5 = 8$.

**Q3 — 12.** Sorted: 3, 5, 7, 8, 12, 13, 14, 18, 21 ($n = 9$); median $=$ 5th value $= 12$.

**Q4 — (B) 1.5.** $z = (85 - 70)/10 = 1.5$.

**Q5 — 3.92.** Margin $= z\cdot\sigma/\sqrt{n} = 1.96 \times 20/\sqrt{100} = 1.96 \times 2 = 3.92$.

**Q6 — (A).** Type I error $=$ rejecting a null hypothesis that is actually true (probability $\alpha$).

**Q7 — (B) t.** Unknown $\sigma$ with a small sample → Student's $t$ (df $= n-1$).

**Q8 — (A), (B), (C).** (D) is **false** — the *sample* variance divides by $n-1$, not $n$. The rest are standard properties.

**Q9 — 100.** The identity $\dfrac{1}{2n^2}\sum_i\sum_j (x_i-x_j)^2 = \dfrac{1}{n}\sum_i (x_i-\bar{x})^2$. With $n=100$, $\dfrac{1}{2000}\sum\sum = 99$ means the biased variance $\dfrac{1}{n}\sum(x_i-\bar{x})^2 = 99$, so $\sum(x_i-\bar{x})^2 = 9900$. Then $\dfrac{1}{99}\times9900 = 100$.

**Q10 — (B) narrower.** The margin of error is proportional to $1/\sqrt{n}$, so larger $n$ shrinks the interval.

---

### How to read your score
- **8–10:** descriptive statistics is solid and you know the inference fundamentals — that completes **all of Subject 1 (Probability & Statistics)!**
- **6–7:** re-drill $\div n$ vs $\div(n-1)$ (Q2, Q8) and the z-score / margin-of-error formulas (Q4, Q5).
- **≤5:** re-read Part 1 A–B (descriptive) thoroughly; keep the inference section at a fundamentals level (it has not been directly tested in 2024–2026).
