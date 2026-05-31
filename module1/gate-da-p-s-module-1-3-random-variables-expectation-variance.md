---
title: "1.3 Random Variables, Expectation & Variance"
parent: "Module 1: Probability & Statistics"
nav_order: 3
---

# GATE DA · P&S Module 1.3 — Random Variables, Expectation & Variance

## Exam Relevance

**Where this sits:** Probability & Statistics → _Random Variables, Expectation & Variance_ — the **engine room** of the whole subject. Every distribution in Modules 1.4–1.8 is just a specific PMF/PDF plugged into the machinery built here.

**Weightage:** Probability & Statistics is the #1 topic (≈21.6% of DA marks, rising). The concepts in this module — PMF/PDF/CDF, $E[X]$, $\mathrm{Var}(X)$, conditional expectation — appear _directly_ and also underpin roughly **half of all P&S questions**. Highest ROI in the syllabus.

**Seen in real papers (this module's skills):**

- **2025 Q39** — read a probability off a CDF (event transform $X^2\le0.25$)
- **2024 Q36** — expected waiting time (first-step analysis)
- **2025 Q54** — expectation & variance of an estimator (linearity + variance scaling)
- **2024 Q59** — conditional expectation $E[Y\mid X=x]$ from a density
- **2025 Q11** — law of total expectation $E[E[X\mid Y]] = E[X]$
- **2026 Q54** — properties of a discrete CDF
- **2024 Q57** — solving $5E(X)=\mathrm{Var}(X)$ (E/Var formulas)
- **2025 Q41** — PMF of $\lfloor\text{exponential}\rfloor$

> **Scope note:** general machinery lives here. The _named_ distributions (Bernoulli/binomial/Poisson → 1.4; uniform/exponential/normal → 1.5) and **covariance/correlation between two variables** (→ 1.6) get their own modules. Some examples below borrow an exponential or a joint density to exercise E/Var/conditioning — the _technique_ is what matters here.

## Part 1 — Theory & Math

### A. Random variable

A **random variable** $X$ maps each outcome of an experiment to a real number. It is **discrete** if it takes countably many values (use a PMF), **continuous** if it takes values on an interval (use a PDF).

---

### B. The core objects (discrete vs continuous)

| Concept                 | Discrete                            | Continuous                                  |
| ----------------------- | ----------------------------------- | ------------------------------------------- |
| Distribution            | PMF $p(x) = P(X = x)$               | PDF $f(x)$ (a _density_, not a probability) |
| Validity                | $0 \le p(x) \le 1$, $\sum p(x) = 1$ | $f(x) \ge 0$, $\int f(x)\,dx = 1$           |
| $P(X = x)$              | $p(x)$                              | **0** (a point has no area)                 |
| $P(a \le X \le b)$      | $\sum$ of masses in $[a,b]$         | $\int_a^b f(x)\,dx$                         |
| CDF $F(x) = P(X \le x)$ | step function (jumps)               | continuous, with $F'(x) = f(x)$             |
| $E[X]$                  | $\sum x\cdot p(x)$                  | $\int x\cdot f(x)\,dx$                      |
| $E[g(X)]$ (LOTUS)       | $\sum g(x)\cdot p(x)$               | $\int g(x)\cdot f(x)\,dx$                   |

> A PDF value $f(x)$ can exceed 1 — it is a density, not a probability. Only the _area_ under it is a probability.

---

### C. The CDF and its properties

$F(x) = P(X \le x)$. For **every** random variable:

- **non-decreasing**; $F(-\infty) = 0$, $F(+\infty) = 1$;
- **right-continuous** (not left-continuous);
- $P(a < X \le b) = F(b) - F(a)$;
- discrete → **jumps** of size $p(x)$ at each mass point; continuous → smooth, differentiate to get the density $f = F'$;
- **median** $m$ solves $F(m) = 0.5$.

(These exact properties are tested verbatim in **2026 Q54**.)

---

### D. Expectation

$E[X]$ is the long-run average / centre of mass.

- **LOTUS:** to get $E[g(X)]$, weight $g(x)$ by the distribution — you do **not** need the distribution of $g(X)$.
- **Linearity (always true, even for dependent variables):**
  $$E[aX + b] = aE[X] + b, \qquad E[X + Y] = E[X] + E[Y]$$
- **Jensen warning:** in general $E[g(X)] \ne g(E[X])$ (e.g. $E[X^2] \ne (E[X])^2$).

---

### E. Variance

Spread around the mean:
$$\mathrm{Var}(X) = E[(X - \mu)^2] = E[X^2] - (E[X])^2, \qquad \mathrm{SD} = \sqrt{\mathrm{Var}(X)}$$

- **Scaling/shift:** $\mathrm{Var}(aX + b) = a^2\cdot\mathrm{Var}(X)$ — the shift $b$ does **not** change spread; the scale $a$ is **squared**.
- **Sums:** $\mathrm{Var}(X + Y) = \mathrm{Var}(X) + \mathrm{Var}(Y)$ **only if $X, Y$ are independent** (otherwise add $2\,\mathrm{Cov}(X,Y)$ — Module 1.6).
- Always $\mathrm{Var}(X) \ge 0$, hence $E[X^2] \ge (E[X])^2$.

---

### F. Conditional expectation

- $E[X \mid Y = y]$ is a **number**; $E[X \mid Y]$ is a **random variable** (a function of $Y$). _(This distinction is exactly 2025 Q11.)_
- **Law of total expectation (tower property):**
  $$E\big[\,E[X \mid Y]\,\big] = E[X]$$
- **First-step analysis** (for "expected number of trials until…"): condition on the first step, write an equation for the expected value, and solve. _(This is 2024 Q36.)_
- **Law of total variance** (good to know): $\mathrm{Var}(X) = E[\mathrm{Var}(X\mid Y)] + \mathrm{Var}(E[X\mid Y])$.
- **Continuous conditional expectation:** form the conditional density $f(y\mid x) = f(x,y)/f_X(x)$, then $E[Y \mid X=x] = \int y\cdot f(y\mid x)\,dy$. _(This is 2024 Q59; joint densities are detailed in 1.6.)_

---

### G. Common traps GATE exploits

1. **$\mathrm{Var}(X) \ne E[X^2]$** — you must subtract $(E[X])^2$.
2. **$\mathrm{Var}(aX+b)$:** $b$ drops out, $a$ is squared (sign of $a$ is irrelevant).
3. **Continuous $P(X = x) = 0$**; never read a PDF value as a probability.
4. **CDF is right-continuous**, with jumps at discrete atoms (not left-continuous).
5. **Forgetting the normalizing constant** before computing E or Var.
6. $E[g(X)] \ne g(E[X])$ (Jensen).
7. **Event transforms:** for $P(X^2 \le a)$, first convert to an interval in $X$ ($\lvert X\rvert \le \sqrt{a}$), then use the CDF.
8. Variance additivity needs **independence**; linearity of expectation does not.

## Part 2 — How to Solve (Method)

### Playbook for "given a PMF or PDF"

1. **Normalize:** set $\sum p(x) = 1$ (discrete) or $\int f(x)\,dx = 1$ (continuous) and solve for the unknown constant.
2. **Probabilities:** sum masses (discrete) or integrate the density over the interval (continuous); or use $F(b) - F(a)$.
3. **$E[X]$:** weighted sum/integral. **$E[X^2]$:** apply LOTUS with $g(x)=x^2$.
4. **$\mathrm{Var}(X)$:** $E[X^2] - (E[X])^2$.
5. **Linear transforms:** use $E[aX+b]=aE[X]+b$ and $\mathrm{Var}(aX+b)=a^2\mathrm{Var}(X)$ — don't recompute from scratch.

### Playbook for CDF questions

- **PDF → CDF:** integrate up to $x$. **CDF → PDF:** differentiate.
- **Probability of an interval:** $F(b) - F(a)$.
- **Event transform first:** rewrite $\{X^2 \le a\}$, $\{\lvert X\rvert > c\}$, etc. as an interval in $X$, then apply $F$.
- **Median / quantile:** solve $F(m) = 0.5$ (or the required $p$).

### Playbook for expectation-by-conditioning

- **"Expected number of steps until event $E$":** define states, let $E_i$ = expected steps from state $i$, condition on the first step to get linear equations, solve.
- **Tower property:** when $X$ depends on an auxiliary $Y$, compute $E[X] = E[E[X\mid Y]]$.
- **Continuous $E[Y\mid X=x]$:** build $f(y\mid x)$ (the overall constant cancels), integrate $y\cdot f(y\mid x)$.

---

### Exam tactics & sanity checks

- After finding Var, confirm it is **$\ge 0$**.
- For a valid PMF/PDF, the total must be **exactly 1** — a quick check that catches a wrong constant.
- Keep $E[X\mid Y=y]$ (number) vs $E[X\mid Y]$ (random variable) straight on MCQs.
- On NAT, respect the rounding instruction; carry fractions until the final step.
- For linear-transform questions, the answer is often immediate via the shortcuts — a time saver.

## Part 3 — Worked Examples

E1–E2 build the core machinery (original); E3–E4 are real GATE DA questions.

---

### Example 1 — Discrete PMF: constant, mean, variance _(original · Easy–Med)_

**Q.** $X$ has PMF $p(x) = kx$ for $x = 1, 2, 3, 4$ (and 0 otherwise). Find $k$, $E[X]$, and $\mathrm{Var}(X)$.

**Solve.**

- **Normalize:** $\sum p(x) = k(1+2+3+4) = 10k = 1 \Rightarrow k = 1/10$.
- **$E[X]$** $= \sum x\cdot(x/10) = (1^2+2^2+3^2+4^2)/10 = 30/10 = 3$.
- **$E[X^2]$** (LOTUS) $= \sum x^2\cdot(x/10) = (1^3+2^3+3^3+4^3)/10 = 100/10 = 10$.
- **$\mathrm{Var}(X)$** $= E[X^2] - (E[X])^2 = 10 - 9 = 1$.

_Method:_ normalize → E → $E[X^2]$ via LOTUS → variance.

---

### Example 2 — Continuous PDF: constant, probability, mean, variance _(original · Med)_

**Q.** $X$ has PDF $f(x) = kx$ for $0 \le x \le 2$ (and 0 otherwise). Find $k$, $P(X \le 1)$, $E[X]$, $\mathrm{Var}(X)$.

**Solve.**

- **Normalize:** $\int_0^2 kx\,dx = k\cdot(2^2/2) = 2k = 1 \Rightarrow k = 1/2$.
- **$P(X \le 1)$** $= \int_0^1 (x/2)\,dx = (1/2)(1/2) = 1/4$.
- **$E[X]$** $= \int_0^2 x\cdot(x/2)\,dx = (1/2)(8/3) = 4/3 \approx 1.333$.
- **$E[X^2]$** $= \int_0^2 x^2\cdot(x/2)\,dx = (1/2)(16/4) = 2$.
- **$\mathrm{Var}(X)$** $= 2 - (4/3)^2 = 2 - 16/9 = 2/9 \approx 0.222$.

_Method:_ identical playbook, integrals instead of sums.

---

### Example 3 — Reading a probability off a CDF _(2025 Q39 · MCQ · Med)_

**Q.** $F_X(x) = 0$ for $x \le -1$; $= (1/4)(x+1)^2$ for $-1 \le x \le 1$; $= 1$ for $x \ge 1$. Find $P(X^2 \le 0.25)$.
(A) 0.625 (B) 0.25 (C) 0.5 (D) 0.5625

**Solve.**

- **Event transform:** $X^2 \le 0.25 \iff \lvert X\rvert \le 0.5 \iff -0.5 \le X \le 0.5$.
- $P = F(0.5) - F(-0.5)$.
- $F(0.5) = (1/4)(1.5)^2 = 0.5625$; $F(-0.5) = (1/4)(0.5)^2 = 0.0625$.
- $P = 0.5625 - 0.0625 = 0.5$.

**Answer: (C) 0.5.** _Method:_ transform the event to an $X$-interval, then take a CDF difference. _(Trap (D) 0.5625 = forgetting to subtract $F(-0.5)$.)_

---

### Example 4 — Expected waiting time by first-step analysis _(2024 Q36 · MCQ · Med–Hard)_

**Q.** A fair die is thrown repeatedly. What is the expected number of throws until **two consecutive even numbers** appear?
(A) 2 (B) 4 (C) 6 (D) 8

**Solve.** $P(\text{even}) = 1/2$. States: $S_0$ = no current progress, $S_1$ = last throw was even. Let $E_0, E_1$ be expected remaining throws.

- From $S_0$: $E_0 = 1 + \tfrac{1}{2}E_1 + \tfrac{1}{2}E_0 \Rightarrow E_0 = 2 + E_1$.
- From $S_1$: $E_1 = 1 + \tfrac{1}{2}\cdot 0 + \tfrac{1}{2}E_0$ (a second even ends it; otherwise restart).
- Substitute: $E_0 = 2 + 1 + \tfrac{1}{2}E_0 \Rightarrow \tfrac{1}{2}E_0 = 3 \Rightarrow E_0 = 6$.

**Answer: (C) 6.** _Method:_ condition on the first throw, write linear equations for the expectations, solve — the prototype for every "expected number of trials" question.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — ⅓ / ⅔ penalty. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** A random variable $X$ has $P(X=0)=0.2$, $P(X=1)=0.5$, $P(X=2)=0.3$. Then $E[X] =$
(A) 1.0 (B) 1.1 (C) 1.5 (D) 0.9

**Q2. ★★ (MSQ)** Let $X$ be a discrete random variable with CDF $F(x)$. Which statements are correct? _(2026 Q54)_
(A) $F(x)$ is always a positive function.
(B) $F(x)$ is a non-decreasing function.
(C) $F(x)$ has jump discontinuities.
(D) $F(x)$ is a left-continuous function.

**Q3. ★ (MCQ)** For random variables $X$ and $Y$, $E[E[X\mid Y]]$ equals _(2025 Q11)_
(A) $E[X\mid Y]$ (B) $E[X]/E[Y]$ (C) $E[X]$ (D) $E[Y]$

**Q4. ★★ (NAT)** For the distribution in Q1, $\mathrm{Var}(X) =$ ****\_\_**** (two decimals).

**Q5. ★★ (MSQ)** In $n$ independent tosses of a coin with $P(\text{head})=p$, let $\hat{p} = (1/n)\sum X_i$ where $X_i = 1$ for head, 0 for tail. Which are correct? _(2025 Q54)_
(A) $E[\hat{p}] = p$ (B) $E[\hat{p}] = p/n$ (C) As $n$ increases, $\mathrm{Var}(\hat{p})$ decreases (D) $\mathrm{Var}(\hat{p})$ does not depend on $n$

**Q6. ★★ (NAT)** Joint PDF $f(x,y) = 2xy$ for $0 < x < 2,\ 0 < y < x$ (else 0). Then $E[Y \mid X = 1.5] =$ ****\_\_**** . _(2024 Q59 · conditional expectation)_

**Q7. ★★ (MCQ)** If $E[X] = 4$ and $\mathrm{Var}(X) = 9$, then $(E[2X+3], \mathrm{Var}(2X+3)) =$
(A) (11, 36) (B) (11, 21) (C) (8, 36) (D) (11, 18)

**Q8. ★★ (NAT)** $X$ is exponential with $E[X] = 1/\lambda$, $\mathrm{Var}(X) = 1/\lambda^2$. If $5E(X) = \mathrm{Var}(X)$, then $\lambda =$ ****\_\_**** (one decimal). _(2024 Q57)_

**Q9. ★★ (NAT)** A continuous random variable has PDF $f(x) = kx$ for $0 \le x \le 5$ (else 0). The value of $k$ is ****\_\_**** (two decimals).

**Q10. ★★★ (MCQ)** Let $Y = \lfloor X \rfloor$ where $X$ is exponential with mean $1/(\ln 10)$. For positive integers $\ell$, $P(Y = \ell) = q^{\ell}(1-q)$. Then $q =$ _(2025 Q41)_
(A) 0.1 (B) 0.01 (C) 0.5 (D) 0.434

**Q11. ★★ (MSQ)** Which statements are TRUE for any random variable $X$ (constants $a, b$)?
(A) $E[aX + b] = aE[X] + b$
(B) $\mathrm{Var}(X) = E[X^2] - (E[X])^2$
(C) $\mathrm{Var}(aX + b) = a^2\mathrm{Var}(X) + b$
(D) $E[X^2] \ge (E[X])^2$

## Answer Key & Full Solutions

**Q1 — (B) 1.1.** $E[X] = 0(0.2)+1(0.5)+2(0.3) = 0.5+0.6 = 1.1$.

**Q2 — (B), (C).** (A) false: $F(x)=0$ below the smallest value of $X$. (B) true: every CDF is non-decreasing. (C) true: a discrete CDF jumps by $p(x)$ at each mass point. (D) false: CDFs are **right**-continuous.

**Q3 — (C) $E[X]$.** Law of total expectation (tower property): $E[E[X\mid Y]] = E[X]$. (A) is still a function of $Y$, not a number.

**Q4 — 0.49.** $E[X^2] = 0(0.2)+1(0.5)+4(0.3) = 1.7$; $\mathrm{Var} = 1.7 - 1.1^2 = 1.7 - 1.21 = 0.49$.

**Q5 — (A), (C).** Each $X_i \sim \text{Bernoulli}(p)$: $E[X_i]=p$, $\mathrm{Var}(X_i)=p(1-p)$. $E[\hat{p}] = (1/n)(np) = p$ (A true, B false). $\mathrm{Var}(\hat{p}) = (1/n^2)(n\cdot p(1-p)) = p(1-p)/n$, which **decreases** with $n$ (C true, D false).

**Q6 — 1.0.** Conditional density (the overall constant cancels): $f(y\mid x) = 2xy / f_X(x)$. Marginal $f_X(x) = \int_0^x 2xy\,dy = x^3$, so $f(y\mid x) = 2y/x^2$ on $0<y<x$. Then $E[Y\mid X=x] = \int_0^x y\cdot(2y/x^2)\,dy = (2/x^2)(x^3/3) = 2x/3$. At $x = 1.5$: $2(1.5)/3 = 1.0$.

**Q7 — (A) (11, 36).** $E[2X+3] = 2(4)+3 = 11$; $\mathrm{Var}(2X+3) = 2^2\cdot\mathrm{Var}(X) = 4(9) = 36$ (the $+3$ does not affect variance).

**Q8 — 0.2.** $5(1/\lambda) = 1/\lambda^2 \Rightarrow 5\lambda = 1 \Rightarrow \lambda = 0.2$.

**Q9 — 0.08.** $\int_0^5 kx\,dx = k(25/2) = 12.5k = 1 \Rightarrow k = 0.08$.

**Q10 — (A) 0.1.** $\lambda = \ln 10$. $P(Y=\ell) = P(\ell \le X < \ell+1) = e^{-\lambda\ell} - e^{-\lambda(\ell+1)} = e^{-\lambda\ell}(1 - e^{-\lambda})$, so $q = e^{-\lambda} = e^{-\ln 10} = 1/10 = 0.1$. (Floor of an exponential is geometric.)

**Q11 — (A), (B), (D).** (A) linearity, true. (B) computational formula for variance, true. (C) **false** — $\mathrm{Var}(aX+b) = a^2\mathrm{Var}(X)$; the constant $b$ adds nothing. (D) true, since $\mathrm{Var}(X) = E[X^2] - (E[X])^2 \ge 0$.

---

### How to read your score

- **9–11:** the machinery is solid — you're ready for Module 1.4 (Discrete Distributions), where these tools meet named PMFs.
- **6–8:** re-drill Var via $E[X^2]-(E[X])^2$ (Q4, Q7) and conditional expectation (Q3, Q6).
- **≤5:** re-read Part 1 B–F; this is the foundation for every distribution that follows, so make it automatic.
