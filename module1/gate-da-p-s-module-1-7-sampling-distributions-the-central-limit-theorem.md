---
title: "1.7 Sampling Distributions & CLT"
parent: "Module 1: Probability & Statistics"
nav_order: 7
---

# GATE DA · P&S Module 1.7 — Sampling Distributions & the Central Limit Theorem

## Exam Relevance

**Where this sits:** Probability & Statistics → *Sampling Distributions & the CLT* — the bridge from probability (Modules 1.1–1.6) to **inference** (Module 1.8: confidence intervals & hypothesis testing). The chi-squared and t distributions introduced here are the engines of those tests.

**Weightage:** part of the #1 subject (P&S, ≈21.6%). The CLT and the chi-square/t distributions appear in **2025 and 2026** (the 2024 paper had none — a reminder that emphasis shifts year to year).

**Seen in real papers (this module's core skills):**
- **2025 Q40** — the **CLT**: approximate a Binomial(300, 0.25) probability → $\varphi(2) - \varphi(-2)$
- **2025 Q36** — **chi-square**: $\mathrm{Var}(Z^2) = 2$ (a $\chi^2(1)$ variable)
- **2026 Q53** — **chi-square / sampling**: sums of squared standard normals, sample variance
- **2026 Q28** — **t-distribution**: $t_1$ (Cauchy) has heavier tails than the normal

> **Takeaway:** the CLT is one of the most *quotable* results in the exam — know that the **sample mean** is approximately $\text{Normal}(\mu,\ \sigma^2/n)$ for large $n$, **whatever the parent distribution**. The chi-square (mean $k$, variance $2k$) and t (heavier tails, → normal) details are small but recur.

## Part 1 — Theory & Math

### A. Sampling distribution — the core idea
A **statistic** (e.g. the sample mean $\bar{X}$) computed from a random sample is itself a **random variable**; its distribution is the *sampling distribution*. Inference is built on knowing this distribution.

### B. The sample mean and standard error
For i.i.d. $X_1,\dots,X_n$ with mean $\mu$ and variance $\sigma^2$:
$$E[\bar{X}] = \mu, \qquad \mathrm{Var}(\bar{X}) = \frac{\sigma^2}{n}, \qquad \mathrm{SD}(\bar{X}) = \frac{\sigma}{\sqrt{n}} \equiv \text{standard error (SE)}$$
The spread of the sample mean **shrinks like $1/\sqrt{n}$** — larger samples give a tighter estimate (the Law of Large Numbers: $\bar{X} \to \mu$).

### C. The Central Limit Theorem (CLT)
For i.i.d. $X_i$ with mean $\mu$ and **finite** variance $\sigma^2$, as $n$ grows the standardized sample mean converges to standard normal:
$$\frac{\bar{X} - \mu}{\sigma/\sqrt{n}} \to N(0, 1), \quad \text{equivalently} \quad \bar{X} \approx \text{Normal}\!\left(\mu,\ \frac{\sigma^2}{n}\right)$$
For the **sum** $S_n = \sum X_i$: $S_n \approx \text{Normal}(n\mu,\ n\sigma^2)$.
- **Works for ANY parent distribution** with finite variance (the parent need not be normal).
- Powers the **normal approximations** of Module 1.4: $\text{Binomial}(n,p) \approx N(np,\ np(1-p))$ (2025 Q40); $\text{Poisson}(\lambda) \approx N(\lambda, \lambda)$ for large $\lambda$ (2026 Q45).
- **Standardize then use $\Phi$:** $z = (\text{value} - \text{mean})/\text{SD}$.

### D. The chi-squared distribution χ²(k)
The sum of **$k$ independent squared standard normals**:
$$\chi^2(k) = Z_1^2 + Z_2^2 + \dots + Z_k^2, \qquad E = k, \qquad \mathrm{Var} = 2k$$
- Support $x \ge 0$, right-skewed; $k$ = degrees of freedom.
- **$\chi^2(2) = \text{Exponential}(\text{mean } 2)$** (a handy identity — 2026 Q53 part C).
- **Sample variance link:** if $S^2$ is the sample variance of a normal sample, $(n-1)S^2/\sigma^2 \sim \chi^2(n-1)$; equivalently $\sum(X_i - \bar{X})^2/\sigma^2 \sim \chi^2(n-1)$ (note the **$n-1$** degrees of freedom — 2026 Q53 part B).

### E. The Student's t distribution tₖ
$$t_k = \frac{Z}{\sqrt{\chi^2_k / k}}, \quad \text{with } Z \text{ and } \chi^2_k \text{ independent}$$
- Symmetric about 0, **heavier tails than the normal** (more probability far from 0).
- $t_k \to N(0,1)$ as $k \to \infty$; **$t_1 = $ Cauchy** (so heavy-tailed it has *no* mean or variance).
- Used for inference about a mean when $\sigma$ is **unknown** and estimated by the sample SD (Module 1.8).

### F. Reference table

| Object | Definition | Mean | Variance |
|---|---|---|---|
| Sample mean $\bar{X}$ | $(1/n)\sum X_i$ | $\mu$ | $\sigma^2/n$ |
| Sum $S_n$ | $\sum X_i$ | $n\mu$ | $n\sigma^2$ |
| $\chi^2(k)$ | $\sum$ of $k$ squared $N(0,1)$ | $k$ | $2k$ |
| $t_k$ | $Z / \sqrt{\chi^2_k/k}$ | $0\ (k>1)$ | $k/(k-2)\ (k>2)$ |

---

### G. Common traps GATE exploits
1. **Standard error is $\sigma/\sqrt{n}$**, and $\mathrm{Var}(\bar{X}) = \sigma^2/n$ — not $\sigma$ or $\sigma^2$.
2. **CLT is about the sample mean/sum**, not individual observations; and it does **not** require a normal parent.
3. **$\chi^2$: mean $= k$, variance $= 2k$** (don't swap).
4. **Sample variance uses $n-1$ degrees of freedom**, so its scaled form is $\chi^2(n-1)$, not $\chi^2(n)$.
5. **$t$ has heavier tails** than the normal and → normal as df → ∞; $t_1$ (Cauchy) has no mean/variance.
6. CLT needs **finite variance** and (essentially) i.i.d. sampling.

## Part 2 — How to Solve (Method)

### CLT / sample-mean problems
1. Identify the parent **mean $\mu$ and variance $\sigma^2$** (or $p$ for Bernoulli/binomial).
2. For the **mean** $\bar{X}$: use $N(\mu,\ \sigma^2/n)$. For the **sum** $S_n$: use $N(n\mu,\ n\sigma^2)$.
3. **Standardize:** $z = (\text{value} - \text{mean}) / \text{SD}$, then read $\Phi$.
4. For binomial: mean $= np$, variance $= np(1-p)$; for Poisson: mean $=$ variance $= \lambda$.

### Chi-square problems
- **Recognize:** a sum of squared standard normals with $d$ terms → $\chi^2(d)$; then mean $= d$, variance $= 2d$.
- **Sample variance:** $\sum(X_i-\bar{X})^2/\sigma^2 \sim \chi^2(n-1)$ (degrees of freedom $= n-1$).
- Use **$\chi^2(2) = \text{Exp}(\text{mean } 2)$** when it simplifies a problem.

### t-distribution problems
- Compare to the normal via **tail weight**: $t$ has more mass in the tails, a lower peak, same symmetry; both CDFs equal 0.5 at 0.
- As df → ∞, $t \to N(0,1)$.

---

### Exam tactics & sanity checks
- **Standardize** is the single most useful move — most CLT marks come from computing the right mean and SD, then a $\Phi$ lookup.
- For $\chi^2$, remember **variance is twice the df** — a one-line answer (2025 Q36).
- For tail comparisons, use **symmetry**: a statement about $G(-c)$, $H(-c)$ follows from the one about $G(c)$, $H(c)$.
- Watch the **$n$ vs $n-1$** degrees of freedom on sample-variance questions.

## Part 3 — Worked Examples

E1 and the CLT setup are originals/standard; E2–E4 are real GATE DA questions. Use $\Phi(1)=0.8413$, $\Phi(2)=0.9772$.

---

### Example 1 — CLT for a sample mean *(original · Med)*
**Q.** A population has $\mu = 50$, $\sigma = 10$. For a random sample of size $n = 100$, find $P(\bar{X} > 52)$.

**Solve.**
- $E[\bar{X}] = 50$, $\text{SE} = \sigma/\sqrt{n} = 10/\sqrt{100} = 1$, so $\bar{X} \approx \text{Normal}(50, 1^2)$.
- Standardize: $z = (52 - 50)/1 = 2$.
- $P(\bar{X} > 52) = 1 - \Phi(2) = 1 - 0.9772 = 0.0228$.

**Answer: ≈ 0.0228.** *Method:* sample mean → $N(\mu, \sigma^2/n)$; standardize with $\text{SE} = \sigma/\sqrt{n}$.

---

### Example 2 — CLT to approximate a binomial *(2025 Q40 · MCQ · Med)*
**Q.** $Y = \sum_{i=1}^{300} X_i$ with $X_i \sim$ i.i.d. Bernoulli(0.25). Using the CLT, $P(60 \le Y \le 90) \approx$ ($\varphi$ = standard normal CDF)
(A) $\varphi(2) - \varphi(-2)$ (B) $\varphi(1) - \varphi(-1)$ (C) $\varphi(3) - \varphi(-3)$ (D) $\varphi(90) - \varphi(60)$

**Solve.**
- $Y$ is Binomial(300, 0.25): mean $= np = 75$, variance $= np(1-p) = 300(0.25)(0.75) = 56.25$, SD $= 7.5$.
- Standardize the endpoints: $(60 - 75)/7.5 = -2$, $(90 - 75)/7.5 = +2$.
- $P(60 \le Y \le 90) \approx \varphi(2) - \varphi(-2)$.

**Answer: (A) $\varphi(2) - \varphi(-2)$.** *Method:* a sum of 300 i.i.d. Bernoullis → CLT; standardize with mean $np$ and SD $\sqrt{np(1-p)}$. *(Also appeared in Module 1.4 as a normal-approximation example.)*

---

### Example 3 — Variance of a chi-square(1) *(2025 Q36 · MCQ · Med)*
**Q.** Let $Y = Z^2$, where $Z = (X - \mu)/\sigma$ and $X \sim \text{Normal}(\mu, \sigma^2)$. The variance of $Y$ is
(A) 1 (B) 2 (C) 3 (D) 4

**Solve.**
- $Z = (X - \mu)/\sigma \sim N(0, 1)$, so $Y = Z^2 \sim \chi^2(1)$.
- For $\chi^2(k)$: $\mathrm{Var} = 2k$, here $k = 1 \Rightarrow \mathrm{Var}(Y) = 2$.
- Direct check: $E[Z^2] = 1$, $E[Z^4] = 3$ (4th moment of $N(0,1)$), so $\mathrm{Var}(Z^2) = 3 - 1^2 = 2$.

**Answer: (B) 2.** *Method:* recognise a squared standard normal as $\chi^2(1)$; variance $= 2k$.

---

### Example 4 — Sums of squared normals & sample variance *(2026 Q53 · MSQ · Hard)*
**Q.** $X_1,\dots,X_n$ are i.i.d. Normal(0, 1) with $\bar{X} = (1/n)\sum X_i$. Which are correct?
(A) $\sum X_i^2 \sim \chi^2(n)$ (B) $\sum(X_i - \bar{X})^2 \sim \chi^2(n-1)$ (C) $X_1^2 + X_n^2 \sim \text{Exponential}(\text{mean } 2)$ (D) $(\sqrt{n}\cdot\bar{X})^2 \sim \chi^2(2)$

**Solve.**
- (A) Sum of $n$ squared standard normals $= \chi^2(n)$ — TRUE.
- (B) The sample-variance form loses one df to estimating the mean: $\chi^2(n-1)$ — TRUE.
- (C) $X_1^2 + X_n^2$ is a sum of 2 squared standard normals $= \chi^2(2)$, and $\chi^2(2) = \text{Exponential}(\text{mean } 2)$ — TRUE.
- (D) $\sqrt{n}\cdot\bar{X} \sim N(0,1)$, so its square $\sim \chi^2(1)$, not $\chi^2(2)$ — FALSE.

**Answer: (A), (B), (C).** *Method:* count the degrees of freedom; remember the $\chi^2(2)=\text{Exp}(\text{mean } 2)$ identity and the $n-1$ for sample variance.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — ⅓ / ⅔ penalty. (★ easy · ★★ medium · ★★★ hard.) Use $\Phi(1)=0.8413$, $\Phi(2)=0.9772$.

**Q1. ★ (MCQ)** A population has $\sigma = 20$. For a sample of size $n = 25$, the standard error of the sample mean is
(A) 20 (B) 4 (C) 0.8 (D) 5

**Q2. ★ (NAT)** If $\sigma^2 = 36$ and $n = 9$, then $\mathrm{Var}(\bar{X}) =$ __________ .

**Q3. ★★ (MCQ)** 100 i.i.d. observations each have mean 5 and variance 4. Using the CLT, $P(\sum X_i > 540) \approx$
(A) 0.02 (B) 0.16 (C) 0.05 (D) 0.50

**Q4. ★★ (NAT)** If $Z_1,\dots,Z_5$ are i.i.d. $N(0,1)$, then $\mathrm{Var}\!\left(\sum_{i=1}^{5} Z_i^2\right) =$ __________ .

**Q5. ★ (MCQ)** If $Z_1,\dots,Z_k$ are i.i.d. $N(0,1)$, then $\sum Z_i^2$ follows
(A) $\text{Normal}(0, k)$ (B) $\chi^2(k)$ (C) $t_k$ (D) $\text{Exponential}(k)$

**Q6. ★★ (MSQ)** Which statements are TRUE?
(A) $E[\bar{X}] = \mu$.
(B) $\mathrm{Var}(\bar{X}) = \sigma^2/n$.
(C) The CLT requires the parent population to be normal.
(D) For $\chi^2(k)$, the variance is $2k$.

**Q7. ★★★ (NAT)** $X_i \sim \text{Normal}(10, 25)$ and a sample of size $n = 4$ is drawn. Then $P(\bar{X} < 7.5) =$ __________ (two decimals).

**Q8. ★★★ (MSQ)** $X_1,\dots,X_n$ are i.i.d. $N(0,1)$, $\bar{X} = (1/n)\sum X_i$. Which are correct? *(2026 Q53)*
(A) $\sum X_i^2 \sim \chi^2(n)$ (B) $\sum(X_i-\bar{X})^2 \sim \chi^2(n-1)$ (C) $X_1^2 + X_n^2 \sim \text{Exponential}(\text{mean } 2)$ (D) $(\sqrt{n}\cdot\bar{X})^2 \sim \chi^2(2)$

**Q9. ★★★ (MSQ)** $Z \sim N(0,1)$ with CDF $G$; $Y \sim t_1$ (Cauchy) with CDF $H$. Let $c > 0$ satisfy $g(c) = h(c)$ (equal densities). Which are correct? *(2026 Q28)*
(A) $G(0) = H(0)$ (B) $G(c) < H(c)$ (C) $G(-c) < H(-c)$ (D) $g(0) = h(0)$

**Q10. ★★ (MCQ)** As the degrees of freedom $k \to \infty$, the $t_k$ distribution approaches the
(A) chi-squared distribution (B) standard normal distribution (C) uniform distribution (D) exponential distribution

## Answer Key & Full Solutions

**Q1 — (B) 4.** $\text{SE} = \sigma/\sqrt{n} = 20/\sqrt{25} = 20/5 = 4$.

**Q2 — 4.** $\mathrm{Var}(\bar{X}) = \sigma^2/n = 36/9 = 4$.

**Q3 — (A) 0.02.** Sum $S \approx \text{Normal}(100\cdot5,\ 100\cdot4) = \text{Normal}(500, 400)$, SD $= 20$. $z = (540-500)/20 = 2$; $P(S>540) = 1 - \Phi(2) = 0.0228 \approx 0.02$.

**Q4 — 10.** $\sum Z_i^2 \sim \chi^2(5)$, so $\mathrm{Var} = 2k = 2\times5 = 10$.

**Q5 — (B) $\chi^2(k)$.** Sum of $k$ squared standard normals is chi-squared with $k$ degrees of freedom (by definition).

**Q6 — (A), (B), (D).** (C) is **false** — the CLT holds for *any* parent distribution with finite variance, not only normal ones.

**Q7 — 0.16.** $\bar{X} \sim \text{Normal}(10, 25/4)$, SD $= 2.5$. $z = (7.5-10)/2.5 = -1$; $P(\bar{X}<7.5) = \Phi(-1) = 1 - 0.8413 = 0.1587 \approx 0.16$.

**Q8 — (A), (B), (C).** (D) is false: $\sqrt{n}\cdot\bar{X} \sim N(0,1)$ so its square is $\chi^2(1)$, not $\chi^2(2)$. (A) $n$ squared normals → $\chi^2(n)$; (B) sample variance → $\chi^2(n-1)$; (C) two squared normals → $\chi^2(2) = \text{Exp}(\text{mean } 2)$.

**Q9 — (A), (C).** Both densities are symmetric about 0 so $G(0) = H(0) = 0.5$ (A true). The normal is more concentrated near 0, so up to the crossing $c$ the normal CDF leads: $G(c) > H(c)$ — (B) is false. By symmetry $G(-c) = 1-G(c) < 1-H(c) = H(-c)$ — (C) true. The peaks differ: $g(0) = 1/\sqrt{2\pi} \approx 0.399 > h(0) = 1/\pi \approx 0.318$ — (D) false.

**Q10 — (B) standard normal.** As $k \to \infty$, $t_k \to N(0,1)$ (its tails thin out to match the normal).

---

### How to read your score
- **9–10:** sampling theory is solid — on to Module 1.8 (Confidence Intervals & Hypothesis Testing), the last P&S module.
- **6–8:** drill standardization with $\text{SE} = \sigma/\sqrt{n}$ (Q1, Q3, Q7) and the $\chi^2$ mean/variance (Q4, Q8).
- **≤5:** re-read Part 1 B–E; the CLT statement and the $\chi^2$/t facts are the highest-value, most-quotable results.
