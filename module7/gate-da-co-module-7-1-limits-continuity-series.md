---
title: "7.1 Limits, Continuity & Series"
parent: "Module 7: Calculus & Optimization"
nav_order: 1
---

# GATE DA · CO Module 7.1 — Limits, Continuity & Series

## Exam Relevance

**Where this sits:** Calculus & Optimization $\rightarrow$ _Limits, Continuity & Series_. Module **1 of 3** in Subject 7 — the final subject.

**Weightage:** Calculus is the **lowest-weight** subject (**~7.5%**, $8\to9\to2$ marks — it **collapsed to 2 marks in 2026**), so this is **efficient coverage**: know the standard techniques, don't over-invest. Directly tested PYQs for this module:

- **2025 Q32** (NAT) — a limit at infinity ($\sqrt{t^2+t}-t$).
- **2024 Q60** (NAT) — a $0/0$ limit via Taylor expansion.
- **2026 Q35** (NAT) — a double infinite **geometric series**.

> **Why it matters:** these are quick NAT marks if you know **three tools** — rationalize $\sqrt{\,}-\sqrt{\,}$ forms, expand with **Taylor series** for $0/0$ limits, and sum geometric series with $\sum r^n=\frac{1}{1-r}$. Calculus also underpins ML gradients.

## Part 1 — Theory & Math

### A. Limits

$\lim_{x\to a} f(x)=L$ exists iff the left and right limits both equal $L$. **Indeterminate forms** ($\tfrac00$, $\tfrac{\infty}{\infty}$, $\infty-\infty$, $0\cdot\infty$, $1^\infty$) need manipulation — direct substitution fails.

**L'Hôpital's rule** (for $\tfrac00$ or $\tfrac{\infty}{\infty}$): $\;\lim\dfrac{f}{g}=\lim\dfrac{f'}{g'}$ when the right side exists.

**Standard limits to memorize:**
$$\lim_{x\to0}\frac{\sin x}{x}=1,\quad \lim_{x\to0}\frac{1-\cos x}{x^2}=\frac12,\quad \lim_{x\to0}\frac{e^x-1}{x}=1,\quad \lim_{x\to0}\frac{\ln(1+x)}{x}=1,\quad \lim_{x\to\infty}\Big(1+\tfrac1x\Big)^x=e.$$

**Taylor expansions for $0/0$ limits** (around $0$):
$$e^x\approx1+x+\tfrac{x^2}{2},\quad \sin x\approx x-\tfrac{x^3}{6},\quad \cos x\approx1-\tfrac{x^2}{2},\quad \ln(1+u)\approx u-\tfrac{u^2}{2}.$$

### B. Limits at infinity

Divide by the dominant power, or **rationalize** (multiply by the conjugate) for $\sqrt{\,}-\sqrt{\,}$ (an $\infty-\infty$) form. E.g. $\sqrt{x^2+x}-x\to\tfrac12$ as $x\to\infty$.

### C. Continuity

$f$ is **continuous at $a$** iff $\lim_{x\to a} f(x)=f(a)$ (the limit exists **and** equals the value). For a **piecewise** function, continuity at a boundary needs the two pieces to **agree** there (left value $=$ right value $=$ the function's value).

- Polynomials, $e^x$, $\sin$, $\cos$ are continuous everywhere; rational functions where the denominator $\ne0$.
- Discontinuity types: **removable**, **jump**, **infinite**.

### D. Differentiability vs continuity

**Differentiable $\Rightarrow$ continuous**, but **not conversely** ($\lvert x\rvert$ is continuous at $0$ but not differentiable). _(More in Module 7.2.)_

### E. Infinite geometric series

$$\sum_{n=0}^{\infty} r^{\,n}=\frac{1}{1-r}\quad(\lvert r\rvert<1),\qquad \sum_{n=1}^{\infty} r^{\,n}=\frac{r}{1-r}.$$
A **double sum of separable terms factors**: $\sum_i\sum_j a_i b_j=\big(\sum_i a_i\big)\big(\sum_j b_j\big)$. Geometric series converge iff $\lvert r\rvert<1$.

### F. Traps GATE exploits

1. **Indeterminate forms** need work (L'Hôpital / Taylor), not substitution.
2. $\sqrt{x^2+x}-x$ at $\infty$ is $\infty-\infty$ $\to$ **rationalize**.
3. Piecewise **continuity** needs both pieces to match the value at the boundary.
4. **Differentiable $\Rightarrow$ continuous**, never the reverse.
5. Geometric series **start index** matters ($\sum_{n=0}$ vs $\sum_{n=1}$).
6. Memorized standard limits beat lengthy L'Hôpital.

## Part 2 — How to Solve (Method)

### Evaluating a limit

1. **Substitute** — if determinate, done.
2. If **indeterminate** ($\tfrac00,\tfrac{\infty}{\infty}$): use **L'Hôpital**, **Taylor expansion**, or algebra.
3. **At infinity with roots:** rationalize (multiply by the conjugate) or divide by the dominant power.
4. **Products inside a log:** $\ln(AB)=\ln A+\ln B$, then take limits termwise.

### Continuity check

At a point/boundary $a$: verify **left limit $=$ right limit $=f(a)$**.

### Geometric series

Identify the ratio $r$ and the **start index**: $\sum_{n=0}^\infty r^n=\frac{1}{1-r}$, $\sum_{n=1}^\infty r^n=\frac{r}{1-r}$. **Factor** separable double sums into a product of two single sums.

### Mistakes that cost marks

- Substituting into an indeterminate form.
- Forgetting to rationalize a $\sqrt{\,}-\sqrt{\,}$ limit.
- Using the wrong start-index formula for a geometric series.

## Part 3 — Worked Examples

### Example 1 — Limit at infinity _(2025 Q32 · NAT)_

**Q.** Evaluate $\displaystyle\lim_{t\to+\infty}\big(\sqrt{t^2+t}-t\big)$.

**Solve.** This is $\infty-\infty$. **Rationalize** by multiplying by the conjugate:
$$\sqrt{t^2+t}-t=\frac{(\sqrt{t^2+t}-t)(\sqrt{t^2+t}+t)}{\sqrt{t^2+t}+t}=\frac{t^2+t-t^2}{\sqrt{t^2+t}+t}=\frac{t}{\sqrt{t^2+t}+t}.$$
Divide top and bottom by $t$ ($t>0$): $\dfrac{1}{\sqrt{1+1/t}+1}\to\dfrac{1}{\sqrt1+1}=\dfrac12$.

**Answer: $0.5$.** _Method:_ rationalize, then divide by the dominant power.

---

### Example 2 — A $0/0$ limit via Taylor _(2024 Q60 · NAT)_

**Q.** Evaluate $\displaystyle\lim_{x\to0}\frac{\ln\!\big((x^2+1)\cos x\big)}{x^2}$.

**Solve.** Split the log: $\ln\!\big((x^2+1)\cos x\big)=\ln(x^2+1)+\ln(\cos x)$, so the limit splits into two.

- $\dfrac{\ln(1+x^2)}{x^2}$: since $\ln(1+x^2)\approx x^2$, this $\to 1$.
- $\dfrac{\ln(\cos x)}{x^2}$: $\cos x\approx1-\tfrac{x^2}{2}$, so $\ln(\cos x)\approx-\tfrac{x^2}{2}$, giving $\to-\tfrac12$.

Therefore the limit $=1+\left(-\tfrac12\right)=\tfrac12$.

**Answer: $0.5$.** _Method:_ split the log, then Taylor-expand each piece.

---

### Example 3 — Double geometric series _(2026 Q35 · NAT)_

**Q.** Evaluate $\displaystyle\sum_{i=0}^{\infty}\sum_{j=1}^{\infty} 2^{-i}\,3^{-j}$.

**Solve.** The summand factors, so the double sum is a **product** of two geometric series:
$$\Big(\sum_{i=0}^{\infty}2^{-i}\Big)\Big(\sum_{j=1}^{\infty}3^{-j}\Big).$$

- $\sum_{i=0}^{\infty}(\tfrac12)^i=\dfrac{1}{1-\tfrac12}=2$ (starts at $0$).
- $\sum_{j=1}^{\infty}(\tfrac13)^j=\dfrac{\tfrac13}{1-\tfrac13}=\dfrac{1/3}{2/3}=\dfrac12$ (starts at $1$).

Product $=2\times\tfrac12=1$.

**Answer: $1$.** _Trap avoided:_ mind the **start index** — the $i$-sum starts at $0$, the $j$-sum at $1$.

---

### Example 4 — Continuity of a piecewise function _(original · Easy–Med)_

**Q.** Is $f(x)=\begin{cases}x^2+1, & x\le1\\ 3x-1, & x>1\end{cases}$ continuous at $x=1$?

**Solve.** Compare the three quantities at $x=1$:

- left limit $\lim_{x\to1^-}(x^2+1)=2$,
- right limit $\lim_{x\to1^+}(3x-1)=2$,
- value $f(1)=1^2+1=2$.

All equal $2$, so $f$ is **continuous at $x=1$**. _Method:_ left $=$ right $=$ value. _(Module 7.2 adds the differentiability check — see 2024 Q37.)_

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** $\displaystyle\lim_{x\to0}\frac{\sin x}{x}=$
(A) $0$ (B) $1$ (C) $\infty$ (D) undefined

**Q2. ★ (NAT)** $\displaystyle\lim_{x\to2}\frac{x^2-4}{x-2}=$ \***\*\_\_\*\*** .

**Q3. ★★ (NAT)** $\displaystyle\lim_{x\to0}\frac{1-\cos x}{x^2}=$ \***\*\_\_\*\*** .

**Q4. ★★ (NAT)** $\displaystyle\lim_{x\to\infty}\big(\sqrt{x^2+3x}-x\big)=$ \***\*\_\_\*\*** .

**Q5. ★★ (MCQ)** At $x=0$, the function $f(x)=\lvert x\rvert$ is
(A) discontinuous (B) continuous and differentiable (C) continuous but not differentiable (D) neither

**Q6. ★★ (NAT)** $\displaystyle\sum_{n=0}^{\infty}\Big(\frac14\Big)^n=$ \***\*\_\_\*\*** .

**Q7. ★★ (MCQ)** For $f(x)=\begin{cases}ax+1, & x\le2\\ x^2-1, & x>2\end{cases}$ to be continuous at $x=2$, $a=$
(A) $0$ (B) $1$ (C) $2$ (D) $3$

**Q8. ★★ (NAT)** $\displaystyle\lim_{x\to0}\frac{e^{2x}-1}{x}=$ \***\*\_\_\*\*** .

**Q9. ★★★ (NAT)** $\displaystyle\lim_{x\to0}\frac{\sin 3x}{\sin 5x}=$ \***\*\_\_\*\*** .

**Q10. ★★ (NAT)** $\displaystyle\sum_{n=1}^{\infty}\Big(\frac23\Big)^n=$ \***\*\_\_\*\*** .

## Answer Key & Full Solutions

**Q1 — (B) $1$.** Standard limit $\lim_{x\to0}\tfrac{\sin x}{x}=1$.

**Q2 — 4.** $\dfrac{x^2-4}{x-2}=x+2\to4$ as $x\to2$.

**Q3 — 0.5.** Standard limit $\dfrac{1-\cos x}{x^2}\to\tfrac12$ (from $\cos x\approx1-\tfrac{x^2}{2}$).

**Q4 — 1.5.** Rationalize: $\dfrac{3x}{\sqrt{x^2+3x}+x}\to\dfrac{3}{1+1}=\dfrac32$.

**Q5 — (C) continuous but not differentiable.** $\lvert x\rvert$ is continuous at $0$ but has a corner (left slope $-1$, right slope $+1$).

**Q6 — 4/3 ($\approx1.33$).** $\dfrac{1}{1-1/4}=\dfrac{1}{3/4}=\dfrac43$.

**Q7 — (B) $1$.** Match at $x=2$: $2a+1=2^2-1=3\Rightarrow a=1$.

**Q8 — 2.** $\dfrac{e^{2x}-1}{x}=2\cdot\dfrac{e^{2x}-1}{2x}\to2\cdot1=2$.

**Q9 — 0.6.** $\dfrac{\sin3x}{\sin5x}=\dfrac{3x}{5x}\cdot\dfrac{\sin3x/3x}{\sin5x/5x}\to\dfrac35=0.6$.

**Q10 — 2.** $\sum_{n=1}^\infty(\tfrac23)^n=\dfrac{2/3}{1-2/3}=\dfrac{2/3}{1/3}=2$.

---

### How to read your score

- **8–10:** limits & series are solid — on to **7.2 Differentiability & Taylor Series**.
- **6–7:** re-drill **rationalizing** limits at infinity (Q4) and **geometric-series start index** (Q6, Q10).
- **≤5:** re-read Part 1 A–E; memorize the standard limits and $\sum r^n=\tfrac{1}{1-r}$.
