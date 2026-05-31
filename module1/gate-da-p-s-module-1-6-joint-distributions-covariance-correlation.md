---
title: "1.6 Joint Distributions, Covariance & Correlation"
parent: "Module 1: Probability & Statistics"
nav_order: 6
---

# GATE DA · P&S Module 1.6 — Joint Distributions, Covariance & Correlation

## Exam Relevance

**Where this sits:** Probability & Statistics → *Joint Distributions, Covariance & Correlation* — how two random variables relate. This generalizes Modules 1.3–1.5 from one variable to two.

**Weightage:** part of the #1 subject (P&S, ≈21.6%). Covariance/correlation is a *smaller but recurring* sub-topic, usually a **2-mark NAT**; joint densities also power conditional expectation and the **covariance matrix** behind PCA (ML module).

**Seen in real papers (this module's core skills):**
- **2024 Q65** — **covariance** of two Bernoulli variables = 0.063
- **2026 Q63** — **correlation** = 0 for a dependent pair (the uncorrelated-but-dependent trap)

**Cross-references (joint/covariance ideas scored elsewhere):**
- Joint PDF → conditional expectation: 2024 Q59 (Module 1.3); joint uniform probability: 2024 Q56 (Module 1.5)
- Covariance inside a transform: 2025 Q20 (Module 1.5); Var of a product: 2026 Q44 (Module 1.4)
- **Covariance matrix → PCA:** 2025 Q60 (ML module); sample-variance identity: 2026 Q62 (Module 1.8)

> **The signature GATE trap of this module:** $\mathrm{Cov}(X,Y) = 0$ (uncorrelated) does **NOT** imply $X$ and $Y$ are independent. 2026 Q63 is built entirely on this.

## Part 1 — Theory & Math

### A. Joint distributions
- **Discrete:** joint PMF $p(x,y) = P(X=x, Y=y)$, with $\sum_x \sum_y p(x,y) = 1$.
- **Continuous:** joint PDF $f(x,y) \ge 0$, with $\iint f(x,y)\,dx\,dy = 1$; probabilities are volumes under the surface.

### B. Marginals (collapse one variable)
$$p_X(x) = \sum_y p(x,y) \quad (\text{sum the row}) \qquad f_X(x) = \int f(x,y)\,dy \quad (\text{integrate out } y)$$
In a joint PMF table, marginals are the **row and column totals**.

### C. Conditional distributions (the conditional PDF/PMF)
$$p(y\mid x) = \frac{p(x,y)}{p_X(x)} \qquad f(y\mid x) = \frac{f(x,y)}{f_X(x)}$$
Then $E[Y \mid X=x] = \sum y\cdot p(y\mid x)$ or $\int y\cdot f(y\mid x)\,dy$ (links to Module 1.3).

### D. Independence
$X$ and $Y$ are **independent** iff the joint **factorizes for ALL (x,y)**:
$$p(x,y) = p_X(x)\cdot p_Y(y) \qquad \text{or} \qquad f(x,y) = f_X(x)\cdot f_Y(y)$$
- Equivalent test: the joint splits into (function of $x$)×(function of $y$) **AND the support is a rectangle**. If the support is triangular (e.g. $0 < y < x$), the variables are **not** independent even if the formula looks separable.
- If independent: $E[XY] = E[X]E[Y]$ and more generally $E[g(X)h(Y)] = E[g(X)]E[h(Y)]$.

### E. Covariance
$$\mathrm{Cov}(X,Y) = E[(X-\mu_X)(Y-\mu_Y)] = E[XY] - E[X]E[Y]$$
where $E[XY] = \sum\sum xy\cdot p(x,y)$ or $\iint xy\cdot f(x,y)\,dx\,dy$.

**Properties:**
- $\mathrm{Cov}(X,X) = \mathrm{Var}(X)$; symmetric: $\mathrm{Cov}(X,Y) = \mathrm{Cov}(Y,X)$.
- **Bilinear:** $\mathrm{Cov}(aX+b, cY+d) = ac\cdot\mathrm{Cov}(X,Y)$ (constants shift out).
- $\mathrm{Var}(aX + bY) = a^2\mathrm{Var}(X) + b^2\mathrm{Var}(Y) + 2ab\cdot\mathrm{Cov}(X,Y)$.
  In particular $\mathrm{Var}(X\pm Y) = \mathrm{Var}(X) + \mathrm{Var}(Y) \pm 2\mathrm{Cov}(X,Y)$.
- **Independent $\Rightarrow \mathrm{Cov} = 0$** (but the converse is false — see G).

### F. Correlation (scale-free covariance)
$$\rho = \mathrm{Corr}(X,Y) = \frac{\mathrm{Cov}(X,Y)}{\sigma_X \sigma_Y}, \qquad \text{with} \quad -1 \le \rho \le 1$$
- $\rho = +1 / -1 \iff$ a perfect increasing/decreasing **linear** relationship.
- $\rho = 0 \iff$ **uncorrelated** (no *linear* association).
- Correlation is **dimensionless / scale-invariant**; covariance is not.

### G. The key insight: uncorrelated ≠ independent
- **Independent $\Rightarrow$ uncorrelated** ($\mathrm{Cov} = 0$). Always.
- **Uncorrelated $\nRightarrow$ independent.** Correlation only captures *linear* association; a nonlinear dependence can give $\mathrm{Cov} = 0$. *Example (2026 Q63): $Y$ depends on $X^2$, yet $\mathrm{Cov}(X,Y) = 0$ because the dependence is symmetric/nonlinear.*

---

### H. Common traps GATE exploits
1. **$\mathrm{Cov} = 0$ (or $\rho = 0$) does not imply independence** — the headline trap.
2. **$\mathrm{Var}(X+Y)$ needs the $+2\mathrm{Cov}$ term** unless $X, Y$ are independent.
3. **$E[XY] \ne E[X]E[Y]$** unless $X, Y$ are uncorrelated/independent.
4. **Independence needs factorization for all (x,y) AND a rectangular support** (triangular support $\Rightarrow$ dependent).
5. **Covariance has units and sign**; correlation is bounded in $[-1, 1]$.
6. Compute **marginals first** before independence or conditional questions.
7. When a conditional $E[Y\mid X]$ is given, use $E[XY] = E[X\cdot E[Y\mid X]]$ (tower property) instead of a double integral.

## Part 2 — How to Solve (Method)

### Discrete joint PMF table — the standard drill
1. **Marginals:** row sums → $p_X$, column sums → $p_Y$.
2. **Means/variances:** from the marginals ($E[X]$, $E[Y]$, $\mathrm{Var}(X)$, $\mathrm{Var}(Y)$).
3. **$E[XY]$:** $\sum\sum xy\cdot p(x,y)$ over all cells.
4. **Covariance:** $\mathrm{Cov} = E[XY] - E[X]E[Y]$.
5. **Correlation:** $\rho = \mathrm{Cov} / (\sigma_X \sigma_Y)$.
6. **Independence check:** verify $p(x,y) = p_X(x)\cdot p_Y(y)$ for **every** cell (one failure $\Rightarrow$ dependent).

### Continuous joint PDF
- **Marginal:** integrate out the other variable over its range.
- **Conditional density:** $f(y\mid x) = f(x,y)/f_X(x)$.
- **$E[XY]$:** $\iint xy\cdot f(x,y)\,dx\,dy$; or, if $E[Y\mid X]$ is known, $E[XY] = E[X\cdot E[Y\mid X]]$.
- Then covariance and correlation as above.

### Identify the question type fast
| Asked for | Do this |
|---|---|
| "are X, Y independent?" | factorization + rectangular-support test |
| $\mathrm{Cov}(X,Y)$ | $E[XY] - E[X]E[Y]$ |
| correlation $\rho$ | covariance $\div (\sigma_X \sigma_Y)$ |
| $\mathrm{Var}(aX + bY)$ | $a^2\mathrm{Var}(X)+b^2\mathrm{Var}(Y)+2ab\cdot\mathrm{Cov}(X,Y)$ |
| $E[Y \mid X = x]$ | conditional density, then integrate |

---

### Exam tactics & sanity checks
- **$|\rho| \le 1$ always** — if you get $|\rho| > 1$, you've slipped.
- A positive/negative $\mathrm{Cov}$ sign should match the intuition of the relationship.
- Use the **tower property** shortcut when a conditional distribution is handed to you (saves a double integral — exactly 2026 Q63).
- Don't infer independence from $\mathrm{Cov} = 0$; only infer $\mathrm{Cov} = 0$ from independence.

## Part 3 — Worked Examples

E1 and E4 build the machinery (original); E2 and E3 are real GATE DA questions.

---

### Example 1 — Discrete joint table: marginals, covariance, correlation, independence *(original · Med)*
**Q.** The joint PMF of $(X, Y)$ is:

| | $Y=0$ | $Y=1$ |
|---|---|---|
| **$X=0$** | 0.1 | 0.2 |
| **$X=1$** | 0.3 | 0.4 |

Find the marginals, check independence, and compute $\mathrm{Cov}(X,Y)$ and $\rho$.

**Solve.**
- **Marginals:** $p_X(0)=0.3,\ p_X(1)=0.7$; $p_Y(0)=0.4,\ p_Y(1)=0.6$.
- **Independence?** $p(0,0)=0.1$ vs $p_X(0)p_Y(0)=0.3\times0.4=0.12$. Not equal $\Rightarrow$ **dependent**.
- $E[X]=0.7,\ E[Y]=0.6$. $E[XY] = \sum xy\cdot p = (1)(1)(0.4) = 0.4$ (only the $X=1,Y=1$ cell contributes).
- $\mathrm{Cov} = 0.4 - (0.7)(0.6) = 0.4 - 0.42 = -0.02$.
- $\mathrm{Var}(X)=0.7\times0.3=0.21$, $\mathrm{Var}(Y)=0.6\times0.4=0.24$; $\rho = \dfrac{-0.02}{\sqrt{0.21\times0.24}} = -0.02/0.2245 \approx -0.089$.

*Method:* the full discrete-table drill (marginals → $E[XY]$ → Cov → $\rho$ → independence).

---

### Example 2 — Covariance of two Bernoulli events *(2024 Q65 · NAT · Med)*
**Q.** Two fair coins are tossed independently. $X = 1$ if **both** are heads (else 0); $Y = 1$ if **at least one** is a head (else 0). Find $\mathrm{Cov}(X,Y)$ (three decimals).

**Solve.**
- $P(\text{both heads}) = 1/4 \Rightarrow X \sim \text{Bernoulli}(1/4)$, $E[X] = 1/4$.
- $P(\text{at least one head}) = 3/4 \Rightarrow Y \sim \text{Bernoulli}(3/4)$, $E[Y] = 3/4$.
- $XY = 1$ only when both heads ($X=1$ forces $Y=1$), so $E[XY] = P(\text{both heads}) = 1/4$.
- $\mathrm{Cov} = E[XY] - E[X]E[Y] = 1/4 - (1/4)(3/4) = 4/16 - 3/16 = 1/16 = 0.0625$.

**Answer: 0.063.** *Method:* express each event as a Bernoulli, find $E[XY]$ from the overlap, apply the covariance formula. (Positive Cov: both tend to be 1 together.)

---

### Example 3 — Uncorrelated but dependent *(2026 Q63 · NAT · Hard)*
**Q.** $X \sim \text{Uniform}(-1, 1)$. Given $X = x$, the conditional distribution of $Y$ is $\text{Uniform}(x^2-0.1,\ x^2+0.1)$. Find $\mathrm{correlation}(X, Y)$.

**Solve (use the tower property, not a double integral).**
- $E[Y \mid X=x] = x^2$ (midpoint of the conditional uniform).
- $E[X] = 0$ (Uniform(−1,1) is symmetric).
- $E[XY] = E[X\cdot E[Y\mid X]] = E[X\cdot X^2] = E[X^3] = 0$ (odd function on a symmetric interval).
- $\mathrm{Cov}(X,Y) = E[XY] - E[X]E[Y] = 0 - 0 = 0$, so $\rho = 0$.

**Answer: 0.** *The lesson:* $Y$ is governed by $X$ through $X^2$ — the two are clearly dependent — yet $\rho = 0$. Correlation sees only *linear* association; the dependence here is nonlinear (even). **Uncorrelated ≠ independent.**

---

### Example 4 — Continuous joint: marginal, independence, covariance *(original · Med–Hard)*
**Q.** $f(x,y) = x + y$ for $0 \le x \le 1,\ 0 \le y \le 1$ (else 0). Find $f_X(x)$, test independence, and compute $\mathrm{Cov}(X,Y)$.

**Solve.**
- **Marginal:** $f_X(x) = \int_0^1 (x+y)\,dy = x + 1/2$ (and by symmetry $f_Y(y) = y + 1/2$).
- **Independence?** $f_X\cdot f_Y = (x+\tfrac12)(y+\tfrac12) = xy + x/2 + y/2 + 1/4 \ne x + y$. Not equal $\Rightarrow$ **dependent**.
- $E[X] = \int_0^1 x(x+\tfrac12)\,dx = 1/3 + 1/4 = 7/12$ (and $E[Y] = 7/12$).
- $E[XY] = \int_0^1\int_0^1 xy(x+y)\,dx\,dy = \iint(x^2y + xy^2) = 1/6 + 1/6 = 1/3$.
- $\mathrm{Cov} = 1/3 - (7/12)^2 = 48/144 - 49/144 = -1/144 \approx -0.0069$.

*Method:* integrate for marginals → factorization test → double integral for $E[XY]$ → covariance.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — ⅓ / ⅔ penalty. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** If $X$ and $Y$ are independent, then $E[XY]$ equals
(A) $E[X] + E[Y]$ (B) $E[X]\cdot E[Y]$ (C) 0 (D) $E[X]/E[Y]$

**Q2. ★ (MCQ)** $\mathrm{Cov}(X, X)$ equals
(A) 0 (B) $E[X]$ (C) $\mathrm{Var}(X)$ (D) 1

**Q3. ★★ (NAT)** For the joint PMF below, $\mathrm{Cov}(X,Y) =$ __________ (two decimals).

| | $Y=1$ | $Y=2$ |
|---|---|---|
| **$X=1$** | 0.2 | 0.3 |
| **$X=2$** | 0.1 | 0.4 |

**Q4. ★★ (MCQ)** If $\mathrm{Var}(X)=4$, $\mathrm{Var}(Y)=9$, and $\mathrm{Cov}(X,Y)=2$, then $\mathrm{Var}(X+Y) =$
(A) 13 (B) 17 (C) 21 (D) 9

**Q5. ★★ (NAT)** Two fair coins are tossed independently. $X = 1$ if both are heads (else 0); $Y = 1$ if at least one is a head (else 0). $\mathrm{Cov}(X,Y) =$ __________ (three decimals). *(2024 Q65)*

**Q6. ★★★ (NAT)** $X \sim \text{Uniform}(-1,1)$; given $X=x$, $Y \sim \text{Uniform}(x^2-0.1,\ x^2+0.1)$. Then $\mathrm{correlation}(X,Y) =$ __________ (integer). *(2026 Q63)*

**Q7. ★★ (MSQ)** Which statements are TRUE?
(A) If $X, Y$ are independent, then $\mathrm{Cov}(X,Y) = 0$.
(B) If $\mathrm{Cov}(X,Y) = 0$, then $X, Y$ are independent.
(C) $-1 \le \rho(X,Y) \le 1$ always.
(D) $\mathrm{Cov}(X, X) = \mathrm{Var}(X)$.

**Q8. ★★ (NAT)** If $\mathrm{Cov}(X,Y) = 3$, $\sigma_X = 2$, $\sigma_Y = 3$, then $\rho(X,Y) =$ __________ (two decimals).

**Q9. ★★ (MCQ)** For $f(x,y) = 4xy$ on $0 \le x \le 1,\ 0 \le y \le 1$ (else 0), the variables $X$ and $Y$ are
(A) independent, with $\mathrm{Cov} = 0$ (B) dependent, with $\mathrm{Cov} = 0$ (C) independent, with $\mathrm{Cov} > 0$ (D) dependent, with $\mathrm{Cov} < 0$

**Q10. ★★★ (NAT)** If $\mathrm{Var}(X)=4$, $\mathrm{Var}(Y)=5$, and $\mathrm{Cov}(X,Y)=1$, then $\mathrm{Var}(2X - 3Y) =$ __________ .

## Answer Key & Full Solutions

**Q1 — (B) $E[X]\cdot E[Y]$.** Independence gives $E[XY] = E[X]E[Y]$.

**Q2 — (C) $\mathrm{Var}(X)$.** $\mathrm{Cov}(X,X) = E[X^2] - (E[X])^2 = \mathrm{Var}(X)$.

**Q3 — 0.05.** Marginals: $p_X(1)=0.5,\ p_X(2)=0.5 \to E[X]=1.5$; $p_Y(1)=0.3,\ p_Y(2)=0.7 \to E[Y]=1.7$. $E[XY] = (1\cdot1)(0.2)+(1\cdot2)(0.3)+(2\cdot1)(0.1)+(2\cdot2)(0.4) = 0.2+0.6+0.2+1.6 = 2.6$. $\mathrm{Cov} = 2.6 - (1.5)(1.7) = 2.6 - 2.55 = 0.05$.

**Q4 — (B) 17.** $\mathrm{Var}(X+Y) = \mathrm{Var}(X)+\mathrm{Var}(Y)+2\mathrm{Cov} = 4+9+2(2) = 17$. (Trap (A) 13 forgets the covariance term.)

**Q5 — 0.063.** $X\sim\text{Bernoulli}(1/4)$, $Y\sim\text{Bernoulli}(3/4)$; $X=1 \Rightarrow Y=1$ so $E[XY]=1/4$. $\mathrm{Cov} = 1/4 - (1/4)(3/4) = 1/16 = 0.0625 \approx 0.063$.

**Q6 — 0.** $E[Y\mid X=x] = x^2$; $E[XY] = E[X\cdot X^2] = E[X^3] = 0$ (odd, symmetric interval); $E[X] = 0$. So $\mathrm{Cov} = 0$ and $\rho = 0$ — despite $Y$ depending on $X$ (uncorrelated ≠ independent).

**Q7 — (A), (C), (D).** (B) is **false** — $\mathrm{Cov} = 0$ does not imply independence (Q6 is a counterexample). The rest are standard.

**Q8 — 0.5.** $\rho = \mathrm{Cov}/(\sigma_X \sigma_Y) = 3/(2\times3) = 0.5$.

**Q9 — (A) independent, $\mathrm{Cov} = 0$.** $f_X(x) = \int_0^1 4xy\,dy = 2x$, $f_Y(y) = 2y$; $f_X f_Y = 4xy = f(x,y)$ for all $(x,y)$ on the square $\Rightarrow$ **independent**, hence $\mathrm{Cov} = 0$.

**Q10 — 49.** $\mathrm{Var}(2X-3Y) = 4\mathrm{Var}(X) + 9\mathrm{Var}(Y) + 2(2)(-3)\mathrm{Cov} = 4(4) + 9(5) - 12(1) = 16 + 45 - 12 = 49$.

---

### How to read your score
- **9–10:** you've mastered the two-variable toolkit — on to Module 1.7 (Sampling Distributions & the CLT).
- **6–8:** drill the table method (Q3), the Var-of-sum formula (Q4, Q10), and the uncorrelated≠independent idea (Q6, Q7).
- **≤5:** re-read Part 1 E–G; the covariance formula and the independence trap are the highest-value takeaways here.
