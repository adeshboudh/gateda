---
title: "7.3 Maxima, Minima & Optimization"
parent: "Module 7: Calculus & Optimization"
nav_order: 3
---

# GATE DA · CO Module 7.3 — Maxima, Minima & Optimization

## Exam Relevance

**Where this sits:** Calculus & Optimization $\rightarrow$ _Maxima, Minima & Optimization_. Module **3 of 3** in Subject 7 — **the final module of the entire GATE DA syllabus.**

**Weightage:** the **largest** slice of Calculus, and it directly supports ML (convex losses, gradient-based optimization). Directly tested PYQs:

- **2024 Q15** (MCQ) — the **second-derivative test**.
- **2024 Q50** (MSQ) — classify the critical points of a quartic.
- **2025 Q49** (MSQ) — **global extrema on a closed interval**.
- **2025 Q51** (MSQ) — properties of a **convex** function ($f''>0$).
- **2026 Q27** (MSQ) — a cubic's extrema and roots on an interval.

> **Why it matters:** three rules do it all — **$f'=0$ for critical points**, the **second-derivative test** to classify them, and **“check the endpoints too”** for global extrema on an interval. Convexity ($f''>0$) ties straight into ML.

## Part 1 — Theory & Math

### A. Critical points

An interior **critical point** is where $f'(x)=0$ (or $f'$ is undefined). These are the only interior candidates for local extrema. _(Necessary, not sufficient: $f'(x^_)=0$ can be an inflection, e.g. $x^3$ at $0$.)\*

### B. First-derivative test

At a critical point $x^\ast$: if $f'$ changes $+\to-$, it's a **local max**; $-\to+$, a **local min**; no sign change $\Rightarrow$ neither.

### C. Second-derivative test

If $f'(x^\ast)=0$:
$$f''(x^\ast)>0\Rightarrow\text{local minimum},\qquad f''(x^\ast)<0\Rightarrow\text{local maximum},\qquad f''(x^\ast)=0\Rightarrow\text{inconclusive}.$$
_(2024 Q15.)_

### D. Local vs global

A **local** extremum is best in a neighborhood; a **global (absolute)** extremum is best over the whole domain. The second-derivative test gives only **local** information — a local min need not be global.

### E. Global extrema on a closed interval $[a,b]$

For continuous $f$ on $[a,b]$ (Extreme Value Theorem guarantees a max and min exist): evaluate $f$ at **all interior critical points AND both endpoints**, then pick the largest and smallest values. On an **open / half-open** interval, an excluded endpoint may not attain an extremum. _(2025 Q49, 2026 Q27.)_

### F. Convexity

$f$ is **convex** on an interval iff $f''(x)\ge0$ there; **strictly convex** iff $f''>0$. Consequences of strict convexity:

- $f'$ is **strictly increasing** $\Rightarrow f'(x)=0$ at **most once** (at most one critical point).
- **Any local min is a global min**, and the minimizer is unique **if it exists**.
- **But a minimum need not exist** — e.g. $f(x)=e^x$ has $f''>0$ yet no minimum. _(2025 Q51.)_

($f''\le0\Rightarrow$ **concave**.)

### G. Single-variable optimization

Set $f'(x)=0$, solve, classify with the second-derivative test, and **check the domain boundaries / endpoints** for the global optimum.

### H. Traps GATE exploits

1. $f''(x^\ast)>0$ gives a **local** min — not necessarily global. _(2024 Q15.)_
2. On a closed interval, **always check endpoints**, not just critical points. _(2025 Q49.)_
3. **Convex ($f''>0$) does not guarantee a minimum exists.** _(2025 Q51.)_
4. $f''(x^\ast)=0\Rightarrow$ second-derivative test **inconclusive** (use the first-derivative test).
5. $f'(x^\ast)=0$ is necessary but **not sufficient** ($x^3$ at $0$ is an inflection).
6. “Maximum value” means **global** on the given domain — watch endpoint ties. _(2026 Q27.)_

## Part 2 — How to Solve (Method)

### Find & classify extrema

1. Solve $f'(x)=0$ for the **critical points**.
2. Classify each: **second-derivative test** ($f''>0$ min, $f''<0$ max) or the first-derivative sign change.
3. If $f''=0$, the test is **inconclusive** — fall back to the first-derivative test.

### Global extrema on $[a,b]$

Evaluate $f$ at every interior critical point **and** at $a,b$; the largest value is the global max, the smallest the global min. _(2025 Q49.)_

### Convexity questions

$f''>0$ everywhere $\Rightarrow$ strictly convex $\Rightarrow f'$ strictly increasing $\Rightarrow$ at most one critical point (a min **if** it exists); a local min is global — but **existence is not guaranteed**. _(2025 Q51.)_

### Polynomial on an interval (2026 Q27)

Find and classify the critical points; find the **roots** by factoring; check which roots/extrema lie in the (possibly half-open) interval; watch **endpoint inclusion** for “only” claims.

### Mistakes that cost marks

- Forgetting **endpoints** for a global extremum.
- Calling a **local** min **global**.
- Assuming a convex function **has** a minimum.

## Part 3 — Worked Examples

### Example 1 — The second-derivative test _(2024 Q15 · MCQ)_

**Q.** For a twice-differentiable $f:\mathbb{R}\to\mathbb{R}$, if at some $x^\ast$ we have $f'(x^\ast)=0$ and $f''(x^\ast)>0$, then $f$ necessarily has a \_\_\_\_ at $x^\ast$. (A) local minimum (B) global minimum (C) local maximum (D) global maximum.

**Solve.** $f'(x^\ast)=0$ makes $x^\ast$ a critical point; $f''(x^\ast)>0$ means the curve is concave up there, so $x^\ast$ is a **local minimum**. The derivative values at a single point give only **local** information — nothing forces it to be global.

**Answer: (A) local minimum.**

---

### Example 2 — Classify the critical points _(2024 Q50 · MSQ)_

**Q.** $f(x)=\dfrac{x^4}{4}-\dfrac{2x^3}{3}-\dfrac{3x^2}{2}+1$. Which is/are TRUE? (A) $x=0$ local max (B) $x=3$ local min (C) $x=-1$ local max (D) $x=0$ local min.

**Solve.** $f'(x)=x^3-2x^2-3x=x(x-3)(x+1)$, so the critical points are $x=0,3,-1$. With $f''(x)=3x^2-4x-3$:

- $x=0$: $f''(0)=-3<0\Rightarrow$ **local max** $\Rightarrow$ (A) **TRUE**, (D) FALSE.
- $x=3$: $f''(3)=27-12-3=12>0\Rightarrow$ **local min** $\Rightarrow$ (B) **TRUE**.
- $x=-1$: $f''(-1)=3+4-3=4>0\Rightarrow$ **local min** $\Rightarrow$ (C) FALSE.

**Answer: (A) and (B).**

---

### Example 3 — Global extrema on a closed interval _(2025 Q49 · MSQ)_

**Q.** $f(x)=\dfrac{x^3}{3}+\dfrac{7}{2}x^2+10x+\dfrac{133}{2}$ on $[-8,0]$. Which is/are TRUE? (A) the maximum of $f$ is at $x=-5$ (B) the minimum is at $x=-2$ (C) the maximum value of $f$ is $\tfrac{133}{2}$ (D) the minimum of $f'$ is attained at $x=-\tfrac72$.

**Solve.** $f'(x)=x^2+7x+10=(x+2)(x+5)$, so critical points $x=-2,-5$ (both in $[-8,0]$). Evaluate $f$ at the critical points **and the endpoints**:

- $f(0)=\tfrac{133}{2}=66.5$ (endpoint),
- $f(-8)=\tfrac{239}{6}\approx39.83$ (endpoint),
- $f(-5)=\tfrac{187}{3}\approx62.33$ (local max, $f''(-5)=-3<0$),
- $f(-2)=\tfrac{347}{6}\approx57.83$ (local min, $f''(-2)=3>0$).

Global **max** $=66.5$ at $x=0$; global **min** $\approx39.83$ at $x=-8$.

- (A) FALSE — $x=-5$ is only a local max; the global max is at $x=0$.
- (B) FALSE — $x=-2$ is only a local min; the global min is at $x=-8$.
- (C) **TRUE** — the maximum value is $f(0)=\tfrac{133}{2}$.
- (D) **TRUE** — $f'(x)=x^2+7x+10$ is an upward parabola, minimized at its vertex $x=-\tfrac{b}{2a}=-\tfrac72$.

**Answer: (C) and (D).** _Lesson:_ the extrema are at the **endpoints**, not the interior critical points.

---

### Example 4 — Convex function properties _(2025 Q51 · MSQ)_

**Q.** $f$ is twice-differentiable with $f''(x)>0$ for all $x$. Which is/are always correct? (A) $f$ has a local minimum (B) there do **not** exist $x\ne y$ with $f'(x)=f'(y)=0$ (C) $f$ has at most one global minimum (D) $f$ has at most one local minimum.

**Solve.** $f''>0$ everywhere $\Rightarrow$ $f$ is **strictly convex** and $f'$ is **strictly increasing**.

- (A) **FALSE** — a convex function need not attain a minimum (e.g. $f(x)=e^x$, $f''=e^x>0$, strictly increasing, no min).
- (B) **TRUE** — $f'$ strictly increasing $\Rightarrow f'=0$ at most once, so no two distinct stationary points.
- (C) **TRUE** — strict convexity gives a unique minimizer **if** one exists.
- (D) **TRUE** — any local min of a convex function is global, so at most one.

**Answer: (B), (C), (D).** _Trap:_ convex $\ne$ “has a minimum.”

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** At a critical point, if $f''(x^\ast)<0$, then $x^\ast$ is a
(A) local minimum (B) local maximum (C) inflection point (D) saddle point

**Q2. ★ (MCQ)** A necessary condition for an interior local extremum of a differentiable $f$ is
(A) $f''=0$ (B) $f'=0$ (C) $f=0$ (D) $f'>0$

**Q3. ★★ (NAT)** The $x$-value at which $f(x)=x^2-6x+5$ attains its minimum is ****\_\_**** .

**Q4. ★★ (MSQ)** $f(x)=x^3-3x^2+2$ on $(-1,3]$. Which is/are TRUE?
(A) $f$ has exactly two roots in $[-0.9,0]$ (B) $f$ has a minimum at $x=2$ only (C) $f$ has a maximum at $x=0$ only (D) $f$ has a root at $x=1$

**Q5. ★★ (MCQ)** On a closed interval $[a,b]$, the global maximum of a continuous $f$ occurs
(A) only at critical points (B) only at endpoints (C) at a critical point or an endpoint (D) never

**Q6. ★★ (MCQ)** If $f''(x)>0$ for all $x$, then $f$ is
(A) concave (B) convex (C) linear (D) constant

**Q7. ★★ (NAT)** The number of critical points of $f(x)=2x^3-3x^2-12x+5$ is ****\_\_**** .

**Q8. ★★★ (MCQ)** For $f(x)=x^3$, at $x=0$ we have $f'(0)=0$, and $x=0$ is
(A) a local minimum (B) a local maximum (C) an inflection point (neither extremum) (D) a global minimum

**Q9. ★★ (NAT)** The maximum value of $f(x)=-x^2+4x+1$ is ****\_\_**** .

**Q10. ★★★ (MSQ)** Let $f$ be strictly convex ($f''>0$ everywhere). Which is/are TRUE?
(A) $f'$ is strictly increasing (B) $f$ has at most one critical point (C) any local minimum is a global minimum (D) $f$ must have a minimum

## Answer Key & Full Solutions

**Q1 — (B) local maximum.** $f''<0$ at a stationary point means concave down.

**Q2 — (B) $f'=0$.** The stationary condition is necessary for an interior extremum.

**Q3 — 3.** $f'(x)=2x-6=0\Rightarrow x=3$ (and $f''=2>0$, a minimum).

**Q4 — (B) and (D).** $f'(x)=3x(x-2)$ gives a local max at $x=0$ ($f=2$) and a local min at $x=2$ ($f=-2$); roots are $x=1$ and $x=1\pm\sqrt3$ ($\approx-0.732,\,2.732$). (A) FALSE — only one root ($\approx-0.732$) lies in $[-0.9,0]$. (B) TRUE — the only minimum is at $x=2$. (C) FALSE — the max value $2$ also occurs at the endpoint $x=3$ ($f(3)=2$), so not “only” at $0$. (D) TRUE — $f(1)=0$.

**Q5 — (C) at a critical point or an endpoint.** Both must be checked.

**Q6 — (B) convex.** $f''>0\Rightarrow$ (strictly) convex.

**Q7 — 2.** $f'(x)=6x^2-6x-12=6(x-2)(x+1)$ — two critical points ($x=2,-1$).

**Q8 — (C) an inflection point.** $f''(0)=0$ (inconclusive) and $f'(x)=3x^2$ doesn't change sign — neither max nor min.

**Q9 — 5.** $f'(x)=-2x+4=0\Rightarrow x=2$; $f(2)=-4+8+1=5$ (a maximum since $f''=-2<0$).

**Q10 — (A), (B), (C).** Strict convexity makes $f'$ strictly increasing (A) $\Rightarrow$ at most one critical point (B); any local min is global (C). (D) is FALSE — $e^x$ is strictly convex with no minimum.

---

### How to read your score

- **8–10:** optimization is solid — **that completes Subject 7 (Calculus & Optimization) and the entire GATE DA syllabus!**
- **6–7:** re-drill the **second-derivative test** (Q1, Q8) and **closed-interval / endpoint** reasoning (Q4, Q5).
- **≤5:** re-read Part 1 C–F; lock in _$f''>0\Rightarrow$ local min_, _check endpoints for global extrema_, and _convex $\ne$ has-a-minimum_.
