---
title: "Calculus & Optimization"
parent: "Cheat Sheets"
nav_order: 7
---

# GATE DA · Calculus Cheat Sheet — Calculus & Optimization Formulas

## Limits & Continuity

**Standard limits**
$$\lim_{x\to0}\frac{\sin x}{x}=1,\quad \lim_{x\to0}\frac{1-\cos x}{x^2}=\frac12,\quad \lim_{x\to0}\frac{e^x-1}{x}=1,\quad \lim_{x\to0}\frac{\ln(1+x)}{x}=1,\quad \lim_{x\to\infty}\Big(1+\tfrac1x\Big)^x=e.$$
- **L'Hôpital** ($\tfrac00$ or $\tfrac\infty\infty$): $\lim\dfrac fg=\lim\dfrac{f'}{g'}$.
- **At $\infty$ with roots:** rationalize (conjugate) or divide by the dominant power.
- **Continuity** at $a$: $\lim_{x\to a}f(x)=f(a)$ (left $=$ right $=$ value).
- **Geometric series:** $\sum_{n=0}^\infty r^n=\dfrac{1}{1-r}$, $\sum_{n=1}^\infty r^n=\dfrac{r}{1-r}$ ($\lvert r\rvert<1$).

## Derivatives & Taylor Series

**Rules:** $(fg)'=f'g+fg'$; $\left(\tfrac fg\right)'=\dfrac{f'g-fg'}{g^2}$; chain $(f\circ g)'=f'(g)\,g'$.
**Standard:** $\tfrac{d}{dx}e^x=e^x$, $\ln x\to\tfrac1x$, $\sin\to\cos$, $\cos\to-\sin$, $\sinh\to\cosh$. **Sigmoid** $\sigma'=\sigma(1-\sigma)$.
**Maclaurin series**
$$e^x=\sum\frac{x^n}{n!},\ \sin x=x-\frac{x^3}{3!}+\cdots,\ \cos x=1-\frac{x^2}{2!}+\cdots,$$
$$\sinh x=x+\frac{x^3}{3!}+\cdots,\ \cosh x=1+\frac{x^2}{2!}+\cdots,\ \ln(1+x)=x-\frac{x^2}{2}+\cdots,\ \frac{1}{1-x}=\sum x^n.$$
- Coefficient link: $f^{(n)}(0)=n!\cdot[\text{coeff of }x^n]$.
- Differentiable $\Rightarrow$ continuous (not conversely). Piecewise $C^1$: value **and** slope match.

## Optimization & Convexity

- **Critical points:** $f'(x)=0$. **Second-derivative test:** $f''>0$ local min, $f''<0$ local max, $f''=0$ inconclusive.
- $f'(x^*)=0$ is **necessary, not sufficient** (e.g. $x^3$ inflection at $0$).
- **Global extrema on $[a,b]$:** check all interior critical points **and** the endpoints $a,b$.
- **Convex** $\iff f''(x)\ge0$ (strictly $>0$): $f'$ increasing $\Rightarrow$ at most one critical point; any local min is global — but a minimum **need not exist** ($e^x$). **Concave** $\iff f''\le0$.
- Quadratic vertex: $f(x)=ax^2+bx+c$ extremized at $x=-\dfrac{b}{2a}$.

*(Concept recap: Calculus Revision Doc. Full worked PYQs: Modules 7.1–7.3.)*
