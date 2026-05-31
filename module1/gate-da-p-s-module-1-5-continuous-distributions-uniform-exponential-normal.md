---
title: "1.5 Continuous Distributions"
parent: "Module 1: Probability & Statistics"
nav_order: 5
---

# GATE DA · P&S Module 1.5 — Continuous Distributions (Uniform, Exponential, Normal)

## Exam Relevance

**Where this sits:** Probability & Statistics → *Continuous Distributions* — uniform, exponential, and (most importantly) the **normal/standard-normal**. The normal underpins the CLT (1.7), confidence intervals and hypothesis testing (1.8), and the normal approximations in 1.4.

**Weightage:** part of the #1 subject (P&S, ≈21.6%). Continuous distributions — especially the **normal** and **exponential** — appear every year.

**Seen in real papers (this module's core skills):**
- **2025 Q19** — a Uniform CDF, find the parameter from the **median**
- **2025 Q20** — a **standard-normal** linear transform $aZ+b$ from moment conditions
- **2025 Q21** — an **exponential** rate $\lambda$ from a tail probability
- **2024 Q56** — a **uniform** probability $P(X \ge Y)$

**Cross-references (same distributions, scored elsewhere):**
- Exponential **memorylessness** — 2026 Q34 (Module 1.2) and $\lfloor\text{Exp}\rfloor\to$geometric — 2025 Q41 (Module 1.3)
- Exponential E/Var — 2024 Q57 (Module 1.3)
- Normal inside approximations — 2025 Q40, 2026 Q44 (Module 1.4)
- **Forward:** normal vs t-distribution (2026 Q28) and normal→chi-square (2026 Q53) land in Module 1.7; uniform correlation (2026 Q63) in Module 1.6.

> **Takeaway:** the **normal** is the most important distribution in the whole syllabus — master standardization and the $\Phi$ table now, because Modules 1.7–1.8 lean on it constantly.

## Part 1 — Theory & Math

A continuous random variable has a density $f(x)$ with $P(a \le X \le b) = \int_a^b f(x)\,dx$ and CDF $F(x) = P(X \le x)$, $F' = f$ (Module 1.3).

---

### A. Uniform(a, b) — equally likely over an interval
$$f(x) = \frac{1}{b-a} \text{ for } a \le x \le b; \qquad F(x) = \frac{x-a}{b-a} \text{ on } [a,b]$$
$$E[X] = \frac{a+b}{2}, \qquad \mathrm{Var}(X) = \frac{(b-a)^2}{12}$$
Probability of a sub-interval = **its length / total length**: $P(c \le X \le d) = \dfrac{d-c}{b-a}$. The **median** is the midpoint $\dfrac{a+b}{2}$ (this solves 2025 Q19).

---

### B. Exponential(λ) — waiting time, memoryless
$$f(x) = \lambda e^{-\lambda x} \text{ for } x \ge 0; \qquad F(x) = 1 - e^{-\lambda x}; \qquad \text{tail: } P(X > x) = e^{-\lambda x}$$
$$E[X] = \frac{1}{\lambda}, \qquad \mathrm{Var}(X) = \frac{1}{\lambda^2}$$
- **Memorylessness:** $P(X > s + t \mid X > s) = P(X > t)$ — the past is forgotten (2026 Q34).
- **Parameterization warning:** the *rate* is $\lambda$ and the *mean* is $1/\lambda$. Some GATE problems state the **mean** directly (e.g. 2026 Q34 says "mean $\lambda$") — read which one is given.
- **Aside:** $\text{Chi-square}(2) = \text{Exponential}(\text{mean } 2)$ — a link you'll meet again in Module 1.7.

---

### C. Normal(μ, σ²) — the bell curve
$$f(x) = \frac{1}{\sigma\sqrt{2\pi}}\, e^{-(x-\mu)^2 / (2\sigma^2)}, \quad \text{for all real } x$$
$$E[X] = \mu, \qquad \mathrm{Var}(X) = \sigma^2$$
- The **second parameter is the variance**, not the SD.
- Symmetric about $\mu$; **mean = median = mode = $\mu$**.
- **Linear transform:** $aX + b \sim \text{Normal}(a\mu + b,\ a^2\sigma^2)$.
- **Sum of independent normals:** $N(\mu_1,\sigma_1^2) + N(\mu_2,\sigma_2^2) = N(\mu_1+\mu_2,\ \sigma_1^2+\sigma_2^2)$.

---

### D. Standard Normal Z = (X − μ)/σ ~ N(0, 1)
$$\text{CDF } \Phi(z) = P(Z \le z); \qquad \text{symmetry: } \Phi(-z) = 1 - \Phi(z); \qquad \Phi(0) = 0.5$$
$$P(a \le X \le b) = \Phi\!\left(\frac{b-\mu}{\sigma}\right) - \Phi\!\left(\frac{a-\mu}{\sigma}\right)$$
**Standardize first, then read $\Phi$.** Key values to memorize:

| $z$ | 0 | 0.5 | 1 | 1.5 | 1.645 | 1.96 | 2 | 2.5 | 3 |
|---|---|---|---|---|---|---|---|---|---|
| $\Phi(z)$ | 0.500 | 0.691 | 0.841 | 0.933 | 0.950 | 0.975 | 0.977 | 0.994 | 0.999 |

**Empirical rule (68–95–99.7):** about 68% of mass within $\pm1\sigma$, 95% within $\pm2\sigma$, 99.7% within $\pm3\sigma$. (1.645 and 1.96 reappear in Module 1.8 for 90% and 95% confidence intervals.)

---

### E. Reference table

| Distribution | PDF $f(x)$ | Support | Mean | Variance |
|---|---|---|---|---|
| Uniform(a,b) | $\dfrac{1}{b-a}$ | $a \le x \le b$ | $\dfrac{a+b}{2}$ | $\dfrac{(b-a)^2}{12}$ |
| Exponential(λ) | $\lambda e^{-\lambda x}$ | $x \ge 0$ | $1/\lambda$ | $1/\lambda^2$ |
| Normal(μ,σ²) | $\dfrac{1}{\sigma\sqrt{2\pi}}e^{-(x-\mu)^2/(2\sigma^2)}$ | all $x$ | $\mu$ | $\sigma^2$ |
| Standard Normal | $\dfrac{1}{\sqrt{2\pi}}e^{-z^2/2}$ | all $z$ | 0 | 1 |

---

### F. Common traps GATE exploits
1. **Exponential parameterization:** rate $\lambda$ vs mean $1/\lambda$ — check which is stated.
2. **Normal's second argument is $\sigma^2$ (variance), not $\sigma$** — take the square root before standardizing.
3. **Always standardize** to $Z$ before using a $\Phi$ table.
4. **Symmetry:** $\Phi(-z) = 1 - \Phi(z)$ (not $\Phi(z)$).
5. **Uniform probability = length ratio** — don't integrate the long way.
6. **Continuous** $\Rightarrow P(X = x) = 0$; $\le$ and $<$ give the same probability.
7. **Memorylessness** is exponential-only — use it to shortcut conditional probabilities.
8. **Variance of a linear combo:** $\mathrm{Var}(aX+b) = a^2\sigma^2$ (the $b$ drops); for independent sums, **variances add** (never SDs).

## Part 2 — How to Solve (Method)

### Step 1 — Identify the distribution
| Context clue | Distribution |
|---|---|
| equally likely over an interval; "chosen at random from $[a,b]$" | **Uniform(a,b)** |
| waiting time / time-to-event; "memoryless"; lifetime | **Exponential(λ)** |
| bell shape; measurement error; CLT/averages; "normally distributed" | **Normal(μ,σ²)** |

### Step 2 — Apply the right tool
- **Uniform:** probability = sub-interval length / total length; mean/var from formulas; median = midpoint.
- **Exponential:** use the tail $P(X > x) = e^{-\lambda x}$; for "given it has lasted $s$", use **memorylessness**; to *find* $\lambda$, set the tail/CDF equal to the given probability and solve (2025 Q21).
- **Normal:** **standardize** $z = (x-\mu)/\sigma$, then $P = \Phi(z_2) - \Phi(z_1)$; use symmetry $\Phi(-z) = 1-\Phi(z)$. For $aX+b$ or sums, first compute the **new $\mu$ and $\sigma^2$**, then standardize.

### Step 3 — Parameter-from-condition problems
Write the defining equation (a CDF value, a tail probability, a moment, or a median condition) and solve algebraically. Examples: median $= (a+b)/2 = 3 \to a$ (2025 Q19); $e^{-\lambda\cdot 2} = 0.25 \to \lambda$ (2025 Q21); moments of $aZ+b \to a, b$ (2025 Q20).

---

### Exam tactics & sanity checks
- Keep the reference table and the $\Phi$ key-values in instant recall.
- **Exponential conditionals** → memorylessness (often a one-line answer).
- **Symmetry** halves the $\Phi$-table work.
- A probability must land in $[0,1]$; a standardized $z$ near 0 → probability near 0.5.
- On NAT, keep $e^{-\,\cdot}$ symbolic until the last step; mind the rounding instruction.

## Part 3 — Worked Examples

E1 and E3 drill the core skills (original); E2 and E4 are real GATE DA questions.

---

### Example 1 — Uniform: probability, mean, variance *(original · Easy–Med)*
**Q.** $X \sim \text{Uniform}(2, 8)$. Find $P(3 \le X \le 5)$, $E[X]$, and $\mathrm{Var}(X)$.

**Solve.**
- $P(3 \le X \le 5) = \dfrac{5-3}{8-2} = 2/6 = 1/3 \approx 0.333$ (length ratio).
- $E[X] = \dfrac{2+8}{2} = 5$.
- $\mathrm{Var}(X) = \dfrac{(8-2)^2}{12} = 36/12 = 3$.

*Method:* uniform probability is a length ratio; mean/var from the formulas.

---

### Example 2 — Exponential rate from a tail probability *(2025 Q21 · MCQ · Med)*
**Q.** For an exponential $X$ with $E[X] = 1/\lambda$, it is given that $P(X \ge 2) = 0.25$. Find $\lambda$.
(A) $\ln 2$ (B) $\ln 4$ (C) $\ln 3$ (D) $\ln 0.25$

**Solve.**
- Tail: $P(X \ge 2) = e^{-2\lambda} = 0.25 = 1/4$.
- Take logs: $-2\lambda = \ln(1/4) = -\ln 4$, so $2\lambda = \ln 4$ and $\lambda = \dfrac{\ln 4}{2} = \ln(4^{1/2}) = \ln 2$.

**Answer: (A) $\ln 2$.** *Trap:* stopping at $2\lambda = \ln 4$ and picking (B); you must halve it. *(Memoryless bonus: the same exponential gives $P(X>5 \mid X>2) = P(X>3)$ directly — see Module 1.2 Q3.)*

---

### Example 3 — Normal: standardize and use Φ *(original · Med)*
**Q.** Heights $X \sim \text{Normal}(\mu = 170, \sigma^2 = 100)$ cm. Find $P(160 \le X \le 185)$. (Use $\Phi(1)=0.8413$, $\Phi(1.5)=0.9332$.)

**Solve.** Here $\sigma = \sqrt{100} = 10$.
- $z_1 = \dfrac{160-170}{10} = -1$, $z_2 = \dfrac{185-170}{10} = 1.5$.
- $P = \Phi(1.5) - \Phi(-1) = 0.9332 - (1 - 0.8413) = 0.9332 - 0.1587 = 0.7745$.

**Answer: ≈ 0.7745.** *Method:* take $\sqrt{\ }$ of the variance → standardize → $\Phi$ difference, using $\Phi(-z)=1-\Phi(z)$.

---

### Example 4 — Standard normal linear transform *(2025 Q20 · MCQ · Med)*
**Q.** $X = aZ + b$, $Z \sim N(0,1)$. Given $E[X] = 1$, $E[(X-E[X])Z] = -2$, $E[(X-E[X])^2] = 4$. Find $a, b$.
(A) $a=-2, b=1$ (B) $a=2, b=-1$ (C) $a=-2, b=-1$ (D) $a=1, b=1$

**Solve.**
- $E[X] = aE[Z] + b = b = 1 \Rightarrow$ **$b = 1$**.
- $\mathrm{Var}(X) = E[(X-E[X])^2] = a^2\mathrm{Var}(Z) = a^2 = 4 \Rightarrow a = \pm2$.
- $E[(X-E[X])Z] = E[(aZ)Z] = a\cdot E[Z^2] = a = -2 \Rightarrow$ **$a = -2$** (this fixes the sign).

**Answer: (A) $a = -2, b = 1$.** *Method:* match moments one at a time; the cross-moment $E[(X-\mu)Z] = a$ pins down the sign that variance alone can't.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — ⅓ / ⅔ penalty. (★ easy · ★★ medium · ★★★ hard.) Use $\Phi(1)=0.8413$, $\Phi(1.5)=0.9332$, $\Phi(2)=0.9772$; $e^{-1} \approx 0.368$.

**Q1. ★ (MCQ)** If $X \sim \text{Uniform}(0, 10)$, then $\mathrm{Var}(X) =$
(A) 5 (B) 100 (C) 8.33 (D) 25

**Q2. ★ (NAT)** If $X \sim \text{Uniform}(2, 8)$, then $P(X > 5) =$ __________ .

**Q3. ★★ (MCQ)** A continuous $X$ has CDF $F(x) = \dfrac{x-t}{4-t}$ for $t \le x \le 4$ (0 below, 1 above). If the median of $X$ is 3, then $t =$ *(2025 Q19)*
(A) 2 (B) 1 (C) −1 (D) 0

**Q4. ★★ (NAT)** If $X \sim$ Exponential with $\lambda = 0.5$, then $P(X < 2) =$ __________ (two decimals).

**Q5. ★★ (MCQ)** $X$ is exponential with $P(X > 3) = 0.5$. Then $P(X > 5 \mid X > 2) =$
(A) 0.25 (B) 0.5 (C) 0.75 (D) 1.0

**Q6. ★★ (NAT)** If $X \sim \text{Normal}(\mu = 50, \sigma^2 = 25)$, then $P(X > 60) =$ __________ (two decimals).

**Q7. ★★ (NAT)** $X \sim \text{Uniform}[1, 3]$ and $Y \sim \text{Uniform}[2, 4]$ are independent. Then $P(X \ge Y) =$ __________ (three decimals). *(2024 Q56)*

**Q8. ★★ (MSQ)** Which statements are TRUE for $X \sim \text{Normal}(\mu, \sigma^2)$?
(A) $(X - \mu)/\sigma \sim \text{Normal}(0, 1)$.
(B) The sum of two independent normals is normal.
(C) For a normal, mean = median = mode.
(D) $\Phi(-z) = \Phi(z)$.

**Q9. ★★ (NAT)** If $X \sim \text{Normal}(2, 9)$, then $\mathrm{Var}(3X - 1) =$ __________ .

**Q10. ★★★ (NAT)** $X \sim \text{Normal}(0, 9)$ and $Y \sim \text{Normal}(0, 16)$ are independent. Then $P(X + Y > 5) =$ __________ (two decimals).

**Q11. ★★ (MCQ)** For $Z \sim N(0,1)$, $P(-1 \le Z \le 1)$ is closest to
(A) 0.95 (B) 0.68 (C) 0.50 (D) 0.34

## Answer Key & Full Solutions

**Q1 — (C) 8.33.** $\mathrm{Var} = \dfrac{(b-a)^2}{12} = 10^2/12 = 100/12 \approx 8.33$. (Mean would be 5.)

**Q2 — 0.5.** $P(X>5) = \dfrac{8-5}{8-2} = 3/6 = 0.5$.

**Q3 — (A) 2.** $F$ is the Uniform(t, 4) CDF, so median $= (t+4)/2 = 3 \Rightarrow t = 2$. (Check: $F(3) = (3-2)/(4-2) = 0.5$.)

**Q4 — 0.63.** $P(X<2) = F(2) = 1 - e^{-0.5\cdot 2} = 1 - e^{-1} \approx 1 - 0.368 = 0.632 \approx 0.63$.

**Q5 — (B) 0.5.** Memorylessness: $P(X>5 \mid X>2) = P(X>3) = 0.5$ (since $5 = 2 + 3$).

**Q6 — 0.02.** $\sigma = \sqrt{25} = 5$; $z = (60-50)/5 = 2$; $P(X>60) = 1 - \Phi(2) = 1 - 0.9772 = 0.0228 \approx 0.02$.

**Q7 — 0.125.** Joint density $1/4$ on $[1,3]\times[2,4]$. The region $x \ge y$ (with $y \ge 2$) is $x \in [2,3]$, $y \in [2,x]$: area $\int_2^3 (x-2)\,dx = 1/2$. So $P = (1/4)(1/2) = 1/8 = 0.125$. (Joint-density mechanics: Module 1.6.)

**Q8 — (A), (B), (C).** (D) is **false**: $\Phi(-z) = 1 - \Phi(z)$. The rest are standard normal facts.

**Q9 — 81.** $\mathrm{Var}(3X-1) = 3^2\cdot\mathrm{Var}(X) = 9\cdot9 = 81$ (the $-1$ doesn't affect variance).

**Q10 — 0.16.** Independent normals add: $X+Y \sim \text{Normal}(0, 9+16) = \text{Normal}(0, 25)$, SD $= 5$. $z = (5-0)/5 = 1$; $P(X+Y>5) = 1 - \Phi(1) = 1 - 0.8413 = 0.1587 \approx 0.16$. (Variances add, not SDs.)

**Q11 — (B) 0.68.** $P(-1 \le Z \le 1) = \Phi(1) - \Phi(-1) = 2\Phi(1) - 1 = 2(0.8413) - 1 = 0.6826$ — the 68% of the empirical rule.

---

### How to read your score
- **9–11:** continuous distributions are solid — you're ready for Module 1.6 (Joint Distributions, Covariance & Correlation).
- **6–8:** drill **standardization** (Q6, Q10) and **memorylessness** (Q5); re-memorize the $\Phi$ key-values.
- **≤5:** re-read Part 1 C–D and the method; the normal distribution is the backbone of Modules 1.7–1.8, so invest here.
