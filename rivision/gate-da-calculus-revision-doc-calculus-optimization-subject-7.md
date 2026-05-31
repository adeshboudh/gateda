---
title: "Subject 7: Calculus & Optimization"
parent: "Revision Docs"
nav_order: 7
---

# GATE DA · Calculus Revision Doc — Calculus & Optimization (Subject 7)

## How to Use & Weightage Map

Condensed revision of **Subject 7** — must-knows, GATE angle, traps. Full detail in **Modules 7.1–7.3**; formula lookup in the **Calculus Cheat Sheet**.

**Weightage:** Calculus is the **lowest-weight** subject (**~7.5%**, $8\to9\to2$ — **collapsed to 2 marks in 2026**). **Efficient coverage** — know the standard techniques; it also underpins **ML gradients/convexity**.

| Module | Topic |
| --- | --- |
| 7.1 | Limits, continuity & series |
| 7.2 | Differentiability & Taylor series |
| 7.3 | Maxima, minima & optimization |

## 7.1 Limits, Continuity & Series

**Must know**
- **Indeterminate forms** ($\tfrac00,\tfrac{\infty}{\infty},\infty-\infty$) need L'Hôpital, Taylor expansion, or algebra.
- **Standard limits:** $\dfrac{\sin x}{x}\to1$, $\dfrac{1-\cos x}{x^2}\to\tfrac12$, $\dfrac{e^x-1}{x}\to1$, $\dfrac{\ln(1+x)}{x}\to1$.
- **At infinity** with roots: **rationalize** (conjugate) or divide by the dominant power.
- **Continuity** at $a$: left limit $=$ right limit $=f(a)$; piecewise pieces must agree.
- **Geometric series:** $\sum_{n=0}^\infty r^n=\dfrac{1}{1-r}$, $\sum_{n=1}^\infty r^n=\dfrac{r}{1-r}$ ($\lvert r\rvert<1$); separable double sums factor.

**GATE angle:** $0/0$ limits via Taylor; $\sqrt{\,}-\sqrt{\,}$ at $\infty$; piecewise continuity; geometric-series sums.

**Traps:** rationalize $\infty-\infty$; mind the geometric **start index**; differentiable $\Rightarrow$ continuous (not conversely).

## 7.2 Differentiability & Taylor Series

**Must know**
- Rules: product $(fg)'=f'g+fg'$; quotient; **chain** $(f\circ g)'=f'(g(x))g'(x)$.
- **Sigmoid:** $\sigma'=\sigma(1-\sigma)$ (also the logistic-regression gradient).
- **Taylor:** $f(x)=\sum \dfrac{f^{(n)}(a)}{n!}(x-a)^n$; coefficient of $x^n$ is $\dfrac{f^{(n)}(0)}{n!}$, so $f^{(n)}(0)=n!\cdot[\text{coeff}]$. $\sinh$ has only odd powers $\Rightarrow$ even derivatives vanish at $0$.
- **Piecewise differentiable** at a boundary: continuity **and** equal one-sided derivatives.
- **Lipschitz** $\lvert f(x)-f(y)\rvert\le(x-y)^2\Rightarrow f'\equiv0\Rightarrow f$ constant.

**GATE angle:** sigmoid derivative; make a piecewise function $C^1$; higher derivative via Taylor; Lipschitz $\Rightarrow$ constant.

**Traps:** differentiable $\Rightarrow$ continuous (not conversely); composition needs differentiability at the **image** point; piecewise needs value + slope match.

## 7.3 Maxima, Minima & Optimization

**Must know**
- **Critical points** $f'(x)=0$; **second-derivative test:** $f''>0$ local min, $f''<0$ local max, $f''=0$ inconclusive.
- $f'(x^*)=0$ is **necessary not sufficient** (e.g. $x^3$ inflection at $0$).
- **Global extrema on $[a,b]$:** evaluate $f$ at all interior critical points **and** the endpoints.
- **Convex** ($f''>0$): $f'$ strictly increasing $\Rightarrow$ at most one critical point; any local min is global — but a min **need not exist** ($e^x$).

**GATE angle:** second-derivative test; classify critical points; global extrema on an interval (endpoints!); convexity properties; cubic on an interval.

**Traps:** $f''>0$ gives a **local** min (not global); always check endpoints; convex $\ne$ has-a-minimum; “maximum value” $=$ global (watch endpoint ties).

## Traps & Exam Strategy

**Highest-cost traps**
1. **Rationalize** $\sqrt{\,}-\sqrt{\,}$ at infinity; mind geometric-series start index.
2. **Differentiable $\Rightarrow$ continuous**, never the reverse; composition needs differentiability at the image point.
3. **Piecewise $C^1$:** value **and** slope must match.
4. **Second-derivative test** gives a **local** result; check **endpoints** for global extrema.
5. **Convex ($f''>0$) does not guarantee a minimum.**
6. Taylor coefficient $f^{(n)}(0)=n!\cdot[\text{coeff of }x^n]$.

**Strategy**
- **Lowest priority** (and shrinking) — don't over-invest; secure the standard techniques.
- Highest carry-over value: **convexity & gradients** reappear in ML; the **sigmoid derivative** is a logistic-regression fact.

*(Full worked PYQs: Modules 7.1–7.3. Formula lookup: Calculus Cheat Sheet.)*
