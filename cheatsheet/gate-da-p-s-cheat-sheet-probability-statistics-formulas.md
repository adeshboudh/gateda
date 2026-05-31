---
title: "Probability & Statistics"
parent: "Cheat Sheets"
nav_order: 1
---

# GATE DA · P&S Cheat Sheet — Probability & Statistics Formulas

## Counting & Axioms

$$^nP_r=\frac{n!}{(n-r)!},\qquad \binom{n}{r}=\frac{n!}{r!\,(n-r)!},\qquad \binom{n}{r}=\binom{n}{n-r}.$$
- **Stars & bars:** $x_1+\cdots+x_k=n$ (non-neg integers) $\Rightarrow\binom{n+k-1}{k-1}$ solutions.
- $0\le P(A)\le1,\quad P(S)=1,\quad P(\varnothing)=0,\quad P(A^c)=1-P(A).$
- $P(A\cup B)=P(A)+P(B)-P(A\cap B).$
- Equally likely: $P(A)=\dfrac{\lvert A\rvert}{\lvert S\rvert}$.
- “At least one” $=1-P(\text{none})$.

## Conditional Probability & Bayes

$$P(A\mid B)=\frac{P(A\cap B)}{P(B)},\qquad P(A\cap B)=P(A\mid B)\,P(B).$$
- **Independence:** $P(A\cap B)=P(A)P(B)$.
- **Total probability:** $P(B)=\sum_i P(B\mid A_i)\,P(A_i)$.
- **Bayes:** $\displaystyle P(A_i\mid B)=\frac{P(B\mid A_i)\,P(A_i)}{\sum_j P(B\mid A_j)\,P(A_j)}$.

## Expectation & Variance

$$E[X]=\sum_x x\,p(x)\ \text{or}\ \int x f(x)\,dx,\qquad E[g(X)]=\sum_x g(x)p(x)\ (\text{LOTUS}).$$
$$\operatorname{Var}(X)=E[X^2]-(E[X])^2,\qquad \sigma_X=\sqrt{\operatorname{Var}(X)}.$$
- $E[aX+b]=aE[X]+b,\qquad \operatorname{Var}(aX+b)=a^2\operatorname{Var}(X).$
- $E[X+Y]=E[X]+E[Y]$ (**always**).
- $\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)+2\operatorname{Cov}(X,Y).$
- **Tower rule:** $E[X]=E\big[E[X\mid Y]\big]$. Conditional density $f_{Y\mid X}=\dfrac{f_{X,Y}}{f_X}$.
- **CDF:** $F(x)=P(X\le x)$, $f=F'$, $P(a<X\le b)=F(b)-F(a)$.

## Distribution Table (mean & variance)

| Distribution | PMF / PDF | Mean | Variance |
| --- | --- | --- | --- |
| Bernoulli $(p)$ | $p^x(1-p)^{1-x},\ x\in\{0,1\}$ | $p$ | $p(1-p)$ |
| Binomial $(n,p)$ | $\binom{n}{x}p^x(1-p)^{n-x}$ | $np$ | $np(1-p)$ |
| Geometric $(p)$ | $(1-p)^{x-1}p,\ x\ge1$ | $\dfrac1p$ | $\dfrac{1-p}{p^2}$ |
| Poisson $(\lambda)$ | $\dfrac{e^{-\lambda}\lambda^x}{x!}$ | $\lambda$ | $\lambda$ |
| Uniform $(a,b)$ | $\dfrac{1}{b-a}$ | $\dfrac{a+b}{2}$ | $\dfrac{(b-a)^2}{12}$ |
| Exponential $(\lambda)$ | $\lambda e^{-\lambda x},\ x\ge0$ | $\dfrac1\lambda$ | $\dfrac{1}{\lambda^2}$ |
| Normal $(\mu,\sigma^2)$ | $\dfrac{1}{\sigma\sqrt{2\pi}}e^{-(x-\mu)^2/2\sigma^2}$ | $\mu$ | $\sigma^2$ |

- **Exponential tail / memoryless:** $P(X>t)=e^{-\lambda t}$; $P(X>s+t\mid X>s)=P(X>t)$.
- **Standardize normal:** $Z=\dfrac{X-\mu}{\sigma}\sim\mathcal N(0,1)$; CDF $\Phi(z)$, $\Phi(-z)=1-\Phi(z)$.
- **Poisson limit** of Binomial: $\lambda=np$ (large $n$, small $p$).

## Joint, Covariance & Correlation

$$\operatorname{Cov}(X,Y)=E[XY]-E[X]E[Y],\qquad \rho_{X,Y}=\frac{\operatorname{Cov}(X,Y)}{\sigma_X\,\sigma_Y}\in[-1,1].$$
- $\operatorname{Cov}(X,X)=\operatorname{Var}(X)$; $\operatorname{Cov}(aX,bY)=ab\,\operatorname{Cov}(X,Y)$.
- $\operatorname{Cov}(X,Y)=\operatorname{Cov}(Y,X)$ (symmetric).
- **Independent $\Rightarrow\operatorname{Cov}=0$** (converse false).
- Independent $\Rightarrow\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)$.

## CLT, Sampling, chi-square & t

- **Sample mean:** $E[\bar X]=\mu,\qquad \operatorname{Var}(\bar X)=\dfrac{\sigma^2}{n},\qquad \text{SE}=\dfrac{\sigma}{\sqrt n}.$
- **CLT:** $\dfrac{\bar X-\mu}{\sigma/\sqrt n}\xrightarrow{\ d\ }\mathcal N(0,1)$ for large $n$.
- **Chi-square:** $\chi^2_k=\sum_{i=1}^k Z_i^2$, mean $k$, variance $2k$; $Z^2\sim\chi^2_1$.
- Sample variance: $s^2=\dfrac{1}{n-1}\sum_{i=1}^n (x_i-\bar x)^2$ (unbiased); $\dfrac{(n-1)s^2}{\sigma^2}\sim\chi^2_{n-1}$.
- **$t$-distribution:** $t=\dfrac{\bar X-\mu}{s/\sqrt n}$, heavier tails than $\mathcal N(0,1)$, $\to\mathcal N(0,1)$ as df$\to\infty$.

## Descriptive Stats & Identities

- **z-score (standardize):** $z=\dfrac{x-\mu}{\sigma}$. **Min-max:** $x'=\dfrac{x-\min}{\max-\min}$.
- Mean shifts with outliers; **median** is robust.
- **Weighted mean:** $\bar x=\dfrac{\sum w_i x_i}{\sum w_i}$.
- **Pairwise-difference identity:** $\displaystyle\sum_{i}\sum_{j}(x_i-x_j)^2=2n\sum_i (x_i-\bar x)^2$, so $\sum_i(x_i-\bar x)^2=\dfrac{1}{2n}\sum_i\sum_j (x_i-x_j)^2$.
- **Variance forms:** population $\sigma^2=\dfrac1n\sum(x_i-\bar x)^2$; sample $s^2=\dfrac{1}{n-1}\sum(x_i-\bar x)^2$.

*(Concept recap: P&S Revision Doc. Full worked PYQs: Modules 1.1–1.8.)*
