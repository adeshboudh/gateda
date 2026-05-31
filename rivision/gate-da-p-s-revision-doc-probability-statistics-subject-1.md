---
title: "Subject 1: Probability & Statistics"
parent: "Revision Docs"
nav_order: 1
---

# GATE DA · P&S Revision Doc — Probability & Statistics (Subject 1)

## How to Use & Weightage Map

**This is a condensed revision pass** over all of Subject 1 — the _must-know_ results, the _GATE angle_, and the _traps_ for each topic. For full theory + worked PYQs, open the matching **Module 1.x** doc. For pure formulas, use the companion **P&S Cheat Sheet**.

**Why this subject first:** Probability & Statistics is the **#1 topic in GATE DA** — **~21.6%** of the DA core and **rising every year** ($15\to19\to21$ marks across 2024–26). Master this and you've secured the single biggest mark block.

| Module | Topic                                              | Revise for                                 |
| ------ | -------------------------------------------------- | ------------------------------------------ |
| 1.1    | Counting & Basic Probability                       | combinatorics, axioms, set probability     |
| 1.2    | Conditional Probability & Bayes                    | Bayes, total probability, independence     |
| 1.3    | Random Variables, $E[\cdot]$, $\operatorname{Var}$ | CDF/PDF, expectation, variance, tower rule |
| 1.4    | Discrete Distributions                             | Bernoulli, Binomial, Poisson, Geometric    |
| 1.5    | Continuous Distributions                           | Uniform, Exponential, Normal               |
| 1.6    | Joint, Covariance & Correlation                    | covariance, correlation, independence      |
| 1.7    | Sampling, CLT, $\chi^2$, $t$                       | CLT, sampling distributions                |
| 1.8    | Descriptive Stats & Inference                      | mean/median/mode, SD, z-score, CIs         |

## 1.1 Counting & Basic Probability

**Must know**

- Permutations $^nP_r=\dfrac{n!}{(n-r)!}$; combinations $\binom{n}{r}=\dfrac{n!}{r!(n-r)!}$.
- **Stars and bars:** non-negative integer solutions of $x_1+\cdots+x_k=n$ is $\binom{n+k-1}{k-1}$.
- Axioms: $0\le P(A)\le1$, $P(S)=1$; **addition** $P(A\cup B)=P(A)+P(B)-P(A\cap B)$; complement $P(A^c)=1-P(A)$.
- Equally-likely outcomes: $P(A)=\dfrac{\lvert A\rvert}{\lvert S\rvert}$.

**GATE angle:** count favourable vs total (often with combinations), divisibility/arrangement counts, “at least one” via the complement.

**Traps:** mind ordered vs unordered; “at least one” $=1-P(\text{none})$; mutually exclusive $\ne$ independent.

## 1.2 Conditional Probability & Bayes

**Must know**

- $P(A\mid B)=\dfrac{P(A\cap B)}{P(B)}$; multiplication $P(A\cap B)=P(A\mid B)P(B)$.
- **Independence:** $P(A\cap B)=P(A)P(B)$ $\iff P(A\mid B)=P(A)$.
- **Total probability:** $P(B)=\sum_i P(B\mid A_i)P(A_i)$ over a partition $\{A_i\}$.
- **Bayes:** $P(A_i\mid B)=\dfrac{P(B\mid A_i)P(A_i)}{\sum_j P(B\mid A_j)P(A_j)}$.

**GATE angle:** “given the test/observation, find the cause” (Bayes); two-/three-box or disease-test setups; naive-Bayes flavoured.

**Traps:** $P(A\mid B)\ne P(B\mid A)$ (base-rate error); always normalize by the total probability of the evidence.

## 1.3 Random Variables, Expectation & Variance

**Must know**

- **CDF** $F(x)=P(X\le x)$ is non-decreasing, right-continuous, $0\to1$; PDF $f=F'$; $P(a<X\le b)=F(b)-F(a)$.
- $E[X]=\sum x\,p(x)$ or $\int x f(x)\,dx$; **LOTUS** $E[g(X)]=\sum g(x)p(x)$.
- $\operatorname{Var}(X)=E[X^2]-(E[X])^2$; $E[aX+b]=aE[X]+b$, $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$.
- **Linearity:** $E[X+Y]=E[X]+E[Y]$ always (even if dependent).
- **Tower/total expectation:** $E[X]=E\big[E[X\mid Y]\big]$; conditional density $f_{Y\mid X}=\dfrac{f_{X,Y}}{f_X}$.

**GATE angle:** CDF/PDF reasoning, first-step analysis (expected number of trials), conditional expectation, estimator bias/variance.

**Traps:** $\operatorname{Var}$ is **not** linear ($\operatorname{Var}(aX+b)=a^2\operatorname{Var}X$, no $+b$); $E[X^2]\ne(E[X])^2$.

## 1.4 Discrete Distributions

**Must know**

- **Bernoulli$(p)$:** mean $p$, var $p(1-p)$. **Binomial$(n,p)$:** mean $np$, var $np(1-p)$ (sum of $n$ Bernoullis).
- **Poisson$(\lambda)$:** PMF $e^{-\lambda}\lambda^x/x!$, **mean $=$ var $=\lambda$**; limit of Binomial with small $p$, large $n$.
- **Geometric$(p)$:** $P(X=k)=(1-p)^{k-1}p$, mean $1/p$; memoryless (discrete).

**GATE angle:** recognize the PMF in disguise; mean/variance; Poisson/normal approximations; Bernoulli tricks like $(2X-1)^2=1$.

**Traps:** Binomial needs **independent, identical** trials; Poisson mean $=$ variance; mind “with/without replacement.”

## 1.5 Continuous Distributions

**Must know**

- **Uniform$(a,b)$:** $f=\dfrac{1}{b-a}$, mean $\dfrac{a+b}{2}$, var $\dfrac{(b-a)^2}{12}$.
- **Exponential$(\lambda)$:** $f=\lambda e^{-\lambda x}$, mean $1/\lambda$, var $1/\lambda^2$; **memoryless** $P(X>s+t\mid X>s)=P(X>t)$; $P(X>t)=e^{-\lambda t}$.
- **Normal$(\mu,\sigma^2)$:** standardize $Z=\dfrac{X-\mu}{\sigma}$, use $\Phi$; symmetric about $\mu$.

**GATE angle:** CDF/quantile setups, exponential memorylessness, linear transforms of normals ($aZ+b$), uniform-on-region probabilities.

**Traps:** for exponential, $P(X>t)=e^{-\lambda t}$ (not $1-e^{-\lambda t}$); solve for $\lambda$ carefully ($e^{-2\lambda}=\tfrac12\Rightarrow\lambda=\tfrac{\ln2}{2}$, halve it!).

## 1.6 Joint Distributions, Covariance & Correlation

**Must know**

- $\operatorname{Cov}(X,Y)=E[XY]-E[X]E[Y]$; $\operatorname{Cov}(aX,bY)=ab\operatorname{Cov}(X,Y)$.
- $\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)+2\operatorname{Cov}(X,Y)$.
- **Correlation** $\rho=\dfrac{\operatorname{Cov}(X,Y)}{\sigma_X\sigma_Y}\in[-1,1]$.
- **Independent $\Rightarrow \operatorname{Cov}=0$**, but **not conversely**.

**GATE angle:** covariance of indicators/Bernoullis, the “uncorrelated but dependent” trap, variance of a sum.

**Traps:** $\rho=0$ does **not** imply independence (e.g. $Y=X^2$ on a symmetric domain).

## 1.7 Sampling, CLT & Test Distributions

**Must know**

- **Sample mean:** $E[\bar X]=\mu$, $\operatorname{Var}(\bar X)=\dfrac{\sigma^2}{n}$.
- **CLT:** for large $n$, $\bar X\approx\mathcal N\!\big(\mu,\tfrac{\sigma^2}{n}\big)$, i.e. $\dfrac{\bar X-\mu}{\sigma/\sqrt n}\to\mathcal N(0,1)$.
- **$\chi^2_k$:** sum of $k$ independent standard-normal squares; mean $k$, var $2k$. ($Z^2\sim\chi^2_1$, so $\operatorname{Var}(Z^2)=2$.)
- **$t$-distribution:** like normal but **heavier tails**; $\to\mathcal N(0,1)$ as df$\to\infty$.
- **Sample variance** $s^2=\dfrac{1}{n-1}\sum (x_i-\bar x)^2$ (the $n-1$ makes it unbiased).

**GATE angle:** CLT normal-approximation of a binomial, $\operatorname{Var}(Z^2)$, sums of squared normals $\to\chi^2$, tail comparisons (normal vs $t$/Cauchy).

**Traps:** $\operatorname{Var}(\bar X)=\sigma^2/n$ (divide by $n$); use the $(n-1)$ divisor for the _unbiased_ sample variance.

## 1.8 Descriptive Statistics & Inference

**Must know**

- **Mean / median / mode**; SD $\sigma=\sqrt{\operatorname{Var}}$; **z-score** $z=\dfrac{x-\mu}{\sigma}$.
- Running/weighted means; effect of outliers (mean shifts, median robust).
- **Pairwise-difference identity:** $\displaystyle\sum_{i}\sum_{j}(x_i-x_j)^2 = 2n\sum_i (x_i-\bar x)^2$ — handy for variance-from-pairwise-distances questions.
- **Confidence intervals / z, t, $\chi^2$ tests:** know the _idea_ (estimate $\pm$ margin); these were **not numerically tested in 2024–26** — fundamentals-level only.

**GATE angle:** z-score normalization (also a data-transformation topic), running mean, weighted average, sample-variance via the pairwise identity.

**Traps:** sample variance uses $n-1$; don't confuse population $\sigma$ with sample $s$.

## High-Yield Traps & Exam Strategy

**The traps that cost the most marks**

1. $P(A\mid B)\ne P(B\mid A)$ — base-rate / Bayes direction.
2. $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$ — the constant drops out.
3. **Uncorrelated $\ne$ independent** ($\rho=0$ can hide dependence).
4. Exponential: $P(X>t)=e^{-\lambda t}$; solve for $\lambda$ without dropping factors of 2.
5. Poisson: **mean $=$ variance $=\lambda$.**
6. $\operatorname{Var}(\bar X)=\sigma^2/n$; sample variance divisor is $n-1$.
7. “At least one” $=1-P(\text{none})$.

**Strategy for the ~21% of marks here**

- This is your **highest-ROI subject** — aim to get nearly all of it.
- Most questions are **conceptual** (recognize the distribution / independence structure), not heavy computation — read carefully for the setup.
- Memorize the **distribution table** (mean/variance) cold; it appears every year.
- Practice **Bayes** and **CLT-approximation** problems until they're automatic.

_(Full worked PYQs: Modules 1.1–1.8. Formula lookup: P&S Cheat Sheet.)_
