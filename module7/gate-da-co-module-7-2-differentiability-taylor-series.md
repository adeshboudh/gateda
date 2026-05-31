---
title: "7.2 Differentiability & Taylor Series"
parent: "Module 7: Calculus & Optimization"
nav_order: 2
---

# GATE DA · CO Module 7.2 — Differentiability & Taylor Series

## Exam Relevance

**Where this sits:** Calculus & Optimization $\rightarrow$ *Differentiability & Taylor Series*. Module **2 of 3** in Subject 7.

**Weightage:** part of Calculus's **~7.5%** (efficient coverage). The differentiability ideas also power **ML gradients** (the sigmoid derivative is literally a logistic-regression fact). Directly tested PYQs:
- **2024 Q33** (NAT) — derivative of the **sigmoid** (also ML Module 3.2).
- **2024 Q37** (MCQ) — make a **piecewise** function continuous *and* differentiable.
- **2025 Q14** (MCQ) — a **higher derivative** of $\sinh$ at $0$.
- **2025 Q24** (MSQ) — which combinations preserve **differentiability**.
- **2025 Q59** (NAT) — a **Lipschitz**-type bound forcing $f$ constant.

> **Why it matters:** master the **derivative rules**, the **piecewise match** (continuity *and* equal one-sided derivatives), and the **Taylor-coefficient** link $f^{(n)}(0)=n!\cdot[\text{coeff of }x^n]$, and this whole module is reliable marks.

## Part 1 — Theory & Math

### A. Derivative & differentiability
$$f'(a)=\lim_{h\to0}\frac{f(a+h)-f(a)}{h}\quad(\text{if it exists}).$$
**Differentiable at $a$ $\Rightarrow$ continuous at $a$** — but **not conversely** ($|x|$ is continuous at $0$, not differentiable).

### B. Differentiation rules
- **Power:** $\dfrac{d}{dx}x^n=n x^{n-1}$. **Product:** $(fg)'=f'g+fg'$. **Quotient:** $\left(\dfrac fg\right)'=\dfrac{f'g-fg'}{g^2}$ ($g\ne0$). **Chain:** $(f\circ g)'(x)=f'(g(x))\,g'(x)$.
- **Standard:** $\dfrac{d}{dx}e^x=e^x$, $\dfrac{d}{dx}\ln x=\dfrac1x$, $\sin'=\cos$, $\cos'=-\sin$, $\sinh'=\cosh$, $\cosh'=\sinh$.
- **Closure:** sums, products, quotients (denominator $\ne0$), and compositions of differentiable functions are differentiable — but $f\circ g$ differentiable at $a$ needs **$g$ differentiable at $a$ AND $f$ differentiable at $g(a)$** (not merely at $a$).

### C. The sigmoid derivative (a GATE/ML favourite)
$$\sigma(x)=\frac{1}{1+e^{-x}}\;\Rightarrow\;\sigma'(x)=\sigma(x)\big(1-\sigma(x)\big).$$
*(2024 Q33; also ML Module 3.2.)*

### D. Higher derivatives
For $\sin,\cos,\sinh,\cosh,e^x$ the derivatives **cycle**. For $\sinh$: $\sinh'=\cosh,\ \cosh'=\sinh$, so even-order derivatives are $\sinh$ and odd-order are $\cosh$. At $0$: $\sinh 0=0$, $\cosh 0=1$ — so **even-order derivatives of $\sinh$ vanish at $0$** (it's an odd function).

### E. Taylor / Maclaurin series
$$f(x)=\sum_{n=0}^{\infty}\frac{f^{(n)}(a)}{n!}(x-a)^n,\qquad \text{Maclaurin: }a=0.$$
Key Maclaurin series:
$$e^x=\sum\frac{x^n}{n!},\quad \sin x=x-\frac{x^3}{3!}+\cdots,\quad \cos x=1-\frac{x^2}{2!}+\cdots,$$
$$\sinh x=x+\frac{x^3}{3!}+\cdots\ (\text{odd only}),\quad \cosh x=1+\frac{x^2}{2!}+\cdots\ (\text{even only}),\quad \ln(1+x)=x-\frac{x^2}{2}+\cdots.$$
**Coefficient link:** the coefficient of $x^n$ is $\dfrac{f^{(n)}(0)}{n!}$, so $f^{(n)}(0)=n!\cdot[\text{coeff of }x^n]$.

### F. Piecewise differentiability & Lipschitz conditions
- **Piecewise** at a boundary: differentiable there iff (i) **continuous** (pieces agree) **and** (ii) **equal one-sided derivatives**. *(2024 Q37.)*
- **Lipschitz of order $>1$:** if $|f(x)-f(y)|\le K|x-y|^\alpha$ with $\alpha>1$, then $|f'(x)|\le\lim_{y\to x}K|x-y|^{\alpha-1}=0$, so $f'\equiv0$ and $f$ is **constant**. *(2025 Q59 has $\alpha=2$.)*

### G. Traps GATE exploits
1. **Differentiable $\Rightarrow$ continuous**, never the reverse.
2. **$f\circ g$ differentiable at $a$ needs $f$ differentiable at $g(a)$** — not just at $a$.
3. **Piecewise** differentiability needs continuity **and** matching one-sided derivatives.
4. Even derivatives of an **odd** function vanish at $0$ (and vice versa).
5. Taylor coefficient of $x^n$ is $f^{(n)}(0)/n!$.
6. $|f(x)-f(y)|\le(x-y)^2$ forces $f$ **constant**.

## Part 2 — How to Solve (Method)

### Compute a derivative
Apply power / product / quotient / chain rules; lean on the standard derivatives. For the sigmoid, use $\sigma'=\sigma(1-\sigma)$.

### Piecewise continuity + differentiability (2024 Q37)
1. **Continuity** at each boundary: left-piece value $=$ right-piece value.
2. **Differentiability**: left-piece derivative $=$ right-piece derivative.
3. Solve the resulting linear equations for the unknown constants.

### Higher derivatives / Taylor (2025 Q14)
Recognize the function's Maclaurin series; $f^{(n)}(0)=n!\cdot[\text{coeff of }x^n]$. For $\sin/\cos/\sinh/\cosh$, use the derivative cycle and evaluate at $0$.

### Differentiability closure (2025 Q24)
Sum / product / quotient (denominator $\ne0$) of functions differentiable at $c$ are differentiable at $c$; a **composition** also needs differentiability at the **image** point.

### Lipschitz $\Rightarrow$ constant (2025 Q59)
$|f(x)-f(y)|\le(x-y)^2\Rightarrow\left|\frac{f(x)-f(y)}{x-y}\right|\le|x-y|\to0\Rightarrow f'\equiv0\Rightarrow f$ constant.

### Mistakes that cost marks
- Assuming continuous $\Rightarrow$ differentiable.
- Forgetting the **derivative-match** step in piecewise problems.
- Mishandling **composition** differentiability.

## Part 3 — Worked Examples

### Example 1 — Derivative of the sigmoid *(2024 Q33 · NAT)*
**Q.** $f(x)=\dfrac{1}{1+e^{-x}}$. Find $f'(x)$ at the point where $f(x)=0.4$.

**Solve.** The sigmoid satisfies $f'(x)=f(x)\big(1-f(x)\big)$. *(Derivation: $f=(1+e^{-x})^{-1}$, so $f'=\dfrac{e^{-x}}{(1+e^{-x})^2}=f\,(1-f)$.)* At $f=0.4$:
$$f'=0.4\,(1-0.4)=0.4\times0.6=0.24.$$

**Answer: $0.24$.** *(The identity $\sigma'=\sigma(1-\sigma)$ is exactly the logistic-regression gradient fact from ML Module 3.2.)*

---

### Example 2 — Piecewise continuous *and* differentiable *(2024 Q37 · MCQ)*
**Q.** $f(x)=\begin{cases}-x, & x<-2\\ ax^2+bx+c, & -2\le x\le2\\ x, & x>2\end{cases}$. Which $a,b,c$ make $f$ continuous and differentiable? (A) $a=\tfrac14,b=0,c=1$ (B) $a=\tfrac12,b=0,c=0$ (C) $a=0,b=0,c=0$ (D) $a=1,b=1,c=-4$.

**Solve.** Match value **and** derivative at both boundaries (middle derivative $=2ax+b$):
- At $x=-2$: continuity $4a-2b+c=2$; derivative $-4a+b=-1$ (left piece $-x$ has slope $-1$).
- At $x=2$: continuity $4a+2b+c=2$; derivative $4a+b=1$ (right piece $x$ has slope $1$).

From the two derivative equations: add $\Rightarrow 2b=0\Rightarrow b=0$; then $4a=1\Rightarrow a=\tfrac14$. Continuity: $4(\tfrac14)-0+c=2\Rightarrow c=1$.

**Answer: (A) $a=\tfrac14,\,b=0,\,c=1$.** *Method:* continuity AND derivative match at each boundary.

---

### Example 3 — A higher derivative via Taylor *(2025 Q14 · MCQ)*
**Q.** $f(x)=\dfrac{e^x-e^{-x}}{2}\;(=\sinh x)$. Find $f^{(10)}(0)$. (A) $0$ (B) $1$ (C) $-1$ (D) $10$.

**Solve.** Two quick routes:
- **Derivative cycle:** $\sinh'=\cosh,\ \cosh'=\sinh,\dots$ so even-order derivatives are $\sinh$. $f^{(10)}=\sinh$, and $\sinh 0=0$.
- **Taylor:** $\sinh x=x+\tfrac{x^3}{3!}+\tfrac{x^5}{5!}+\cdots$ has **only odd powers**, so the coefficient of $x^{10}$ is $0$, giving $f^{(10)}(0)=10!\cdot0=0$.

**Answer: (A) $0$.** *Key:* even-order derivatives of an odd function vanish at $0$.

---

### Example 4 — A Lipschitz bound forces a constant *(2025 Q59 · NAT)*
**Q.** $f:\mathbb{R}\to\mathbb{R}$ satisfies $|f(x)-f(y)|\le(x-y)^2$ for all $x,y$. Find $f(1)-f(0)$.

**Solve.** For $x\ne y$, divide by $|x-y|$:
$$\left|\frac{f(x)-f(y)}{x-y}\right|\le|x-y|.$$
Let $y\to x$: the right side $\to0$, so $|f'(x)|\le0$, i.e. $f'(x)=0$ for every $x$. Hence $f$ is **constant**, and $f(1)-f(0)=0$.

**Answer: $0$.** *Method:* a power-$>1$ Lipschitz bound kills the derivative everywhere.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** $\dfrac{d}{dx}\,e^{3x}=$
(A) $e^{3x}$ (B) $3e^{3x}$ (C) $\tfrac13 e^{3x}$ (D) $3x\,e^{3x-1}$

**Q2. ★ (MCQ)** If $f$ is differentiable at a point, then at that point $f$ is
(A) continuous (B) constant (C) at a maximum (D) nothing can be said

**Q3. ★★ (NAT)** The sigmoid $\sigma(x)=\dfrac{1}{1+e^{-x}}$ has $\sigma'=\sigma(1-\sigma)$. If $\sigma(x)=0.5$, then $\sigma'(x)=$ __________ .

**Q4. ★★ (MSQ)** $f:\mathbb{R}\to\mathbb{R}$ and $g:\mathbb{R}\to(1,\infty)$ are both differentiable at a point $c$. Which are **always** differentiable at $c$?
(A) $f+g$ (B) $f\cdot g$ (C) $f/g$ (D) $f\circ g + g\circ f$

**Q5. ★★ (MCQ)** The coefficient of $x^3$ in the Maclaurin series of $\sin x$ is
(A) $1$ (B) $-\tfrac16$ (C) $\tfrac16$ (D) $-1$

**Q6. ★★ (NAT)** For $f(x)=\cos x$, $f^{(4)}(0)=$ __________ .

**Q7. ★★ (MCQ)** $f(x)=|x-2|$ fails to be differentiable at
(A) $x=0$ (B) $x=2$ (C) every point (D) no point

**Q8. ★★ (NAT)** For $f(x)=\begin{cases}x^2, & x\le1\\ 2x+b, & x>1\end{cases}$ to be differentiable at $x=1$, $b=$ __________ .

**Q9. ★★★ (MCQ)** If $|f(x)-f(y)|\le 5\,|x-y|^2$ for all $x,y$, then $f$ is
(A) linear (B) constant (C) quadratic (D) discontinuous

**Q10. ★★ (NAT)** $\dfrac{d}{dx}\big(x^2\ln x\big)$ evaluated at $x=1$ is __________ .

## Answer Key & Full Solutions

**Q1 — (B) $3e^{3x}$.** Chain rule: $\tfrac{d}{dx}e^{3x}=e^{3x}\cdot3$.

**Q2 — (A) continuous.** Differentiability implies continuity (not the reverse).

**Q3 — 0.25.** $\sigma'=0.5(1-0.5)=0.25$.

**Q4 — (A), (B), (C).** Sum, product, and quotient (with $g>1\ne0$) are differentiable at $c$. (D) fails: $f\circ g$ needs $f$ differentiable at $g(c)$, which is not given (only at $c$).

**Q5 — (B) $-\tfrac16$.** $\sin x=x-\tfrac{x^3}{3!}+\cdots$ and $\tfrac{1}{3!}=\tfrac16$.

**Q6 — 1.** Cycle $\cos\to-\sin\to-\cos\to\sin\to\cos$; $f^{(4)}=\cos$, $\cos 0=1$.

**Q7 — (B) $x=2$.** $|x-2|$ has a corner at $x=2$ (slopes $-1$ and $+1$).

**Q8 — $-1$.** Continuity: $1=2+b\Rightarrow b=-1$; derivative check: left $2x=2$, right $2$ — they match, so $b=-1$ works.

**Q9 — (B) constant.** A power-$2$ Lipschitz bound forces $f'\equiv0$.

**Q10 — 1.** $\tfrac{d}{dx}(x^2\ln x)=2x\ln x+x$; at $x=1$: $2(1)(0)+1=1$.

---

### How to read your score
- **8–10:** differentiation & Taylor are solid — on to the finale **7.3 Maxima, Minima & Optimization**.
- **6–7:** re-drill the **piecewise match** (Q8) and **Taylor coefficients** (Q5, Q6).
- **≤5:** re-read Part 1 B–F; lock in the derivative rules, $\sigma'=\sigma(1-\sigma)$, and $f^{(n)}(0)=n!\cdot[\text{coeff of }x^n]$.
