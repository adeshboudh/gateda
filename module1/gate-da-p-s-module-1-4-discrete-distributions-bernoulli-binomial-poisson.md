---
title: "1.4 Discrete Distributions"
parent: "Module 1: Probability & Statistics"
nav_order: 4
---

# GATE DA · P&S Module 1.4 — Discrete Distributions (Bernoulli, Binomial, Poisson)

## Exam Relevance

**Where this sits:** Probability & Statistics → _Discrete Distributions_ — the first family of **named** PMFs, plugged into the expectation/variance machinery of Module 1.3.

**Weightage:** part of the #1 subject (P&S, ≈21.6% of DA marks). A discrete-distribution idea shows up **every year**.

**How GATE DA actually asks it** — rarely a rote "compute $P(X=k)$". Instead it tests the distributions _conceptually_:

- **2025 Q61** — binomial **mean** $E[S_{100}] = np = 66.7$ (with-replacement draws = binomial)
- **2025 Q40** — binomial → **CLT/normal approximation**, $P(60\le Y\le90) = \varphi(2)-\varphi(-2)$
- **2026 Q45** — spotting a **Poisson** PMF inside a limit; Poisson CDF at its mean → 0.5
- **2026 Q44** — the **Bernoulli** trick $(2X-1)^2 = 1$, variance = 100

**Cross-references (same ideas, scored in other modules):** 2025 Q45 ("at least one" $= 1-(5/6)^{100}$, Module 1.1), 2025 Q54 (Bernoulli estimator, Module 1.3), 2026 Q64 (Bernoulli matrix, Module 1.2), 2024 Q65 (covariance of two Bernoullis, Module 1.6).

> **Takeaway:** memorise the PMF + mean + variance table **cold**, and train yourself to _recognise_ a binomial or Poisson even when it's disguised as a sum, a limit, or a word problem. That recognition is what GATE rewards.

## Part 1 — Theory & Math

### A. Bernoulli(p) — one trial, two outcomes

$X = 1$ ("success") with prob $p$, $X = 0$ with prob $1-p$.
$$E[X] = p, \qquad \mathrm{Var}(X) = p(1-p)$$
The atom from which the others are built. _(Handy trick from 2026 Q44: since $X\in\{0,1\}$, $(2X-1)\in\{-1,+1\}$, so $(2X-1)^2 = 1$ always.)_

---

### B. Binomial(n, p) — count successes in n independent identical trials

$X$ = number of successes in **$n$ fixed, independent** Bernoulli(p) trials.
$$P(X = k) = C(n,k)\, p^k (1-p)^{n-k}, \quad k = 0,1,\dots,n$$
$$E[X] = np, \qquad \mathrm{Var}(X) = np(1-p)$$

- $X$ is the **sum of $n$ i.i.d. Bernoulli(p)** — that's why E and Var are just $n$ times the Bernoulli values.
- **"At least one success"** $= 1 - (1-p)^n$ (complement of zero successes — links to Modules 1.1–1.2).
- **Conditions to BE binomial:** fixed $n$, only two outcomes, constant $p$, independent trials. Sampling **with replacement** is binomial; **without replacement** is not (it's hypergeometric).

---

### C. Poisson(λ) — count of rare events in a fixed interval

$$P(X = k) = \frac{e^{-\lambda}\,\lambda^k}{k!}, \quad k = 0,1,2,\dots$$
$$E[X] = \lambda, \qquad \mathrm{Var}(X) = \lambda$$

- **Mean = variance** is the Poisson **signature**.
- **Additivity:** independent $\text{Poisson}(\lambda_1) + \text{Poisson}(\lambda_2) = \text{Poisson}(\lambda_1+\lambda_2)$.
- Models calls/arrivals/defects/typos per unit time or space.

---

### D. Two approximations GATE loves

1. **Poisson limit of the binomial:** when **$n$ is large and $p$ is small** with $np \to \lambda$, $\text{Binomial}(n,p) \approx \text{Poisson}(\lambda)$. Use it to dodge huge factorials.
2. **Normal approximation (CLT, Module 1.7):** when **$n$ is large** (rule of thumb $np$ and $n(1-p) \ge 5$), $\text{Binomial}(n,p) \approx \text{Normal}(np,\ np(1-p))$. Standardize to read off probabilities — this is exactly **2025 Q40**. Likewise $\text{Poisson}(\lambda) \approx \text{Normal}(\lambda, \lambda)$ for large $\lambda$ (**2026 Q45**).

---

### E. Distribution reference table

| Distribution  | PMF $P(X=k)$                 | Support           | Mean      | Variance    |
| ------------- | ---------------------------- | ----------------- | --------- | ----------- |
| Bernoulli(p)  | $p^k(1-p)^{1-k}$             | $k \in \{0,1\}$   | $p$       | $p(1-p)$    |
| Binomial(n,p) | $C(n,k)p^k(1-p)^{n-k}$       | $k = 0\dots n$    | $np$      | $np(1-p)$   |
| Poisson(λ)    | $e^{-\lambda}\lambda^k / k!$ | $k = 0,1,2,\dots$ | $\lambda$ | $\lambda$   |
| Geometric(p)✱ | $(1-p)^{k-1} p$              | $k = 1,2,\dots$   | $1/p$     | $(1-p)/p^2$ |

✱ Geometric (trials until first success) is not named in the DA list, but it appears in disguise — e.g. $\lfloor\text{exponential}\rfloor$ in Module 1.3's 2025 Q41. Know its shape.

---

### F. Common traps GATE exploits

1. **Binomial variance is $np(1-p)$, not $np$** ($np$ is the mean).
2. **Binomial vs Geometric:** binomial fixes the number of trials and counts successes; geometric counts trials until the first success.
3. **Poisson signature:** mean = variance = $\lambda$. If a problem says mean ≠ variance, it isn't Poisson.
4. **Without replacement ≠ binomial** (unless the population is huge / sampling is with replacement).
5. **"At least one"** → complement $1 - (1-p)^n$, don't sum term by term.
6. **Poisson support starts at $k = 0$**, and $k$ can be arbitrarily large.
7. Use the **Poisson approximation only when $n$ large & $p$ small**; use the **normal approximation only when $n$ is large**.

## Part 2 — How to Solve (Method)

### Step 1 — Identify the distribution from the wording

| Clue in the problem                                                                   | Distribution                   |
| ------------------------------------------------------------------------------------- | ------------------------------ |
| one trial, success/failure                                                            | **Bernoulli(p)**               |
| fixed number $n$ of independent identical trials, count successes; "with replacement" | **Binomial(n, p)**             |
| count of events per unit time/space; "rare" events; $n$ large & $p$ small             | **Poisson(λ)**, $\lambda = np$ |
| trials until the first success                                                        | Geometric (recognition only)   |

### Step 2 — Pull the right formula

- **Specific count $P(X=k)$:** plug into the PMF.
- **Mean / variance:** use the table directly ($np$, $np(1-p)$, $\lambda$) — don't derive from scratch.
- **"At least one":** $1 - (1-p)^n$ (binomial) or $1 - e^{-\lambda}$ (Poisson).
- **Sum of i.i.d. Bernoulli:** that's a binomial; its mean is $np$.
- **Large $n$, range of values:** normal-approximate — standardize with mean $np$ and SD $\sqrt{np(1-p)}$, then use $\varphi$ (Module 1.7).

### Step 3 — Recognise disguises (the GATE skill)

- A sum like $\sum e^{-\lambda}\lambda^k/k!$ **is** a Poisson probability/CDF.
- $C(n,k)p^k(1-p)^{n-k}$ **is** a binomial term — even inside a bigger expression.
- A 0/1 variable is Bernoulli; exploit $(2X-1)^2 = 1$.

---

### Exam tactics & sanity checks

- The PMF+mean+variance table must be **instant recall** — most marks here are one formula away.
- **Poisson check:** mean should equal variance.
- For large-$n$ binomials, reach for the **normal approximation** instead of summing many terms.
- For tiny $p$ and large $n$, reach for the **Poisson approximation** instead of giant factorials.
- On NAT, keep $e^{-\lambda}$ symbolic until the final numeric step; respect the rounding instruction.

## Part 3 — Worked Examples

E1–E2 drill the core mechanics (original); E3–E4 are real GATE DA questions.

---

### Example 1 — Binomial PMF, mean, variance _(original · Easy–Med)_

**Q.** A biased coin with $P(\text{head}) = 0.4$ is tossed 10 times. Find $P(\text{exactly 3 heads})$, $E[X]$, and $\mathrm{Var}(X)$.

**Solve.** $X \sim \text{Binomial}(10, 0.4)$.

- $P(X=3) = C(10,3)(0.4)^3(0.6)^7 = 120 \times 0.064 \times 0.0279936 \approx 0.215$.
- $E[X] = np = 10(0.4) = 4$.
- $\mathrm{Var}(X) = np(1-p) = 10(0.4)(0.6) = 2.4$.

_Method:_ recognise $n$ fixed independent trials → binomial → PMF + table formulas.

---

### Example 2 — Poisson PMF and "at least one" _(original · Easy–Med)_

**Q.** Calls arrive at a help desk at an average rate of 3 per minute, following a Poisson process. Find $P(\text{exactly 2 calls in a minute})$ and $P(\text{at least 1 call})$. State Var.

**Solve.** $X \sim \text{Poisson}(\lambda = 3)$.

- $P(X=2) = e^{-3}\cdot 3^2/2! = 4.5\,e^{-3} \approx 0.224$.
- $P(X\ge1) = 1 - P(X=0) = 1 - e^{-3} \approx 0.950$.
- $\mathrm{Var}(X) = \lambda = 3$ (= mean, the Poisson signature).

_Method:_ rate per unit time → Poisson; "at least one" via complement.

---

### Example 3 — Binomial mean from with-replacement draws _(2025 Q61 · NAT · Med)_

**Q.** A bag has 5 white and 10 black balls. $n$ balls are drawn one at a time **with replacement**. $S_n$ = number of black balls drawn. Find $E[S_{100}]$ (one decimal).

**Solve.**

- Each draw is independent with $P(\text{black}) = 10/15 = 2/3$ (constant because of replacement) → Bernoulli(2/3).
- $S_{100} \sim \text{Binomial}(100, 2/3)$, so $E[S_{100}] = np = 100 \times 2/3 = 200/3 \approx 66.7$.

**Answer: 66.7.** _Method:_ "with replacement" keeps $p$ constant → binomial → mean $np$. (Without replacement, this would not be binomial.)

---

### Example 4 — A Poisson PMF hidden in a limit _(2026 Q45 · MCQ · Hard)_

**Q.** $L = \lim_{n\to\infty} \sum_{k=0}^{n} e^{-n}\, n^k / k!$. Find $L$.
(A) 0.5 (B) 1.0 (C) 0 (D) $e^{-1}$

**Solve.**

- Recognise the term: $e^{-n} n^k/k! = P(\text{Poisson}(\lambda=n) = k)$.
- So the sum is $P(\text{Poisson}(n) \le n)$ — the Poisson CDF evaluated **at its own mean** $n$.
- For large $\lambda=n$, $\text{Poisson}(n) \approx \text{Normal}(n, n)$ (mean = variance = $n$). Hence $P(X \le n) \to P(Z \le 0) = 0.5$.

**Answer: (A) 0.5.** _Method:_ spot the Poisson PMF inside the sum, read it as a CDF at the mean, then use Poisson→Normal. _The recognition is the whole question._

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — ⅓ / ⅔ penalty. (★ easy · ★★ medium · ★★★ hard.) Use $e^{-2} \approx 0.135$, $e^{-5} \approx 0.0067$ where needed.

**Q1. ★ (MCQ)** If $X \sim \text{Bernoulli}(0.6)$, then $\mathrm{Var}(X) =$
(A) 0.6 (B) 0.24 (C) 0.4 (D) 0.36

**Q2. ★★ (NAT)** If $X \sim \text{Binomial}(20, 0.3)$, then $\mathrm{Var}(X) =$ ****\_\_**** (one decimal).

**Q3. ★★ (MCQ)** Let $Y = \sum_{i=1}^{300} X_i$ with $X_i \sim$ i.i.d. Bernoulli(0.25). Using the CLT, $P(60 \le Y \le 90) \approx$ _(2025 Q40; $\varphi$ = standard normal CDF)_
(A) $\varphi(2) - \varphi(-2)$ (B) $\varphi(1) - \varphi(-1)$ (C) $\varphi(3) - \varphi(-3)$ (D) $\varphi(90) - \varphi(60)$

**Q4. ★★ (NAT)** Typos occur at a Poisson rate of 2 per page. The probability that a given page has **no** typo is ****\_\_**** (three decimals).

**Q5. ★★ (MCQ)** A machine makes items with defect probability 0.002. In a batch of 1000 ($n$ large, $p$ small), the probability of **exactly 3** defectives, using the Poisson approximation, is closest to
(A) 0.180 (B) 0.090 (C) 0.270 (D) 0.050

**Q6. ★★★ (MCQ)** $X \sim \text{Bernoulli}(0.3)$ and $Y \sim \text{Normal}(0, 100)$ are independent. Then $\mathrm{Var}((2X-1)Y) =$ _(2026 Q44)_
(A) 100 (B) 90 (C) 49 (D) 21

**Q7. ★★ (NAT)** A process produces 5% defectives. In 20 independent items, the probability of **at least one** defective is ****\_\_**** (two decimals). (Use $0.95^{20} \approx 0.358$.)

**Q8. ★★ (MSQ)** Which statements are TRUE?
(A) For Binomial(n, p), the mean is $np$.
(B) For Poisson(λ), mean = variance = $\lambda$.
(C) The sum of two independent $\text{Poisson}(\lambda_1)$, $\text{Poisson}(\lambda_2)$ is $\text{Poisson}(\lambda_1+\lambda_2)$.
(D) For Binomial(n, p), the variance is $np$.

**Q9. ★ (MCQ)** If $X \sim \text{Binomial}(4, 0.5)$, then $P(X = 2) =$
(A) 0.5 (B) 0.375 (C) 0.25 (D) 0.0625

**Q10. ★★★ (NAT)** $N_1 \sim \text{Poisson}(2)$ and $N_2 \sim \text{Poisson}(3)$ are independent. The probability that $N_1 + N_2 = 1$ is ****\_\_**** (two decimals).

## Answer Key & Full Solutions

**Q1 — (B) 0.24.** $\mathrm{Var} = p(1-p) = 0.6 \times 0.4 = 0.24$.

**Q2 — 4.2.** $\mathrm{Var} = np(1-p) = 20 \times 0.3 \times 0.7 = 4.2$. (Mean would be $np = 6$ — don't confuse the two.)

**Q3 — (A) $\varphi(2) - \varphi(-2)$.** $Y \sim \text{Binomial}(300, 0.25)$: mean $np = 75$, variance $np(1-p) = 56.25$, SD $= 7.5$. Standardise: $(60-75)/7.5 = -2$, $(90-75)/7.5 = 2$. So $P \approx \varphi(2) - \varphi(-2)$.

**Q4 — 0.135.** Poisson(λ=2): $P(X=0) = e^{-2} \approx 0.135$.

**Q5 — (A) 0.180.** $\lambda = np = 1000 \times 0.002 = 2$. $P(X=3) = e^{-2}\cdot 2^3/3! = e^{-2}\cdot 8/6 \approx 0.135 \times 1.333 \approx 0.180$.

**Q6 — (A) 100.** $(2X-1) \in \{-1, +1\}$ so $(2X-1)^2 = 1$. With $E[Y]=0$: $E[(2X-1)Y] = E[2X-1]\,E[Y] = 0$ (independence). $\mathrm{Var} = E[(2X-1)^2 Y^2] = E[(2X-1)^2]\cdot E[Y^2] = 1 \times 100 = 100$.

**Q7 — 0.64.** $P(\text{at least one}) = 1 - (0.95)^{20} \approx 1 - 0.358 = 0.642 \approx 0.64$.

**Q8 — (A), (B), (C).** (D) is **false** — binomial variance is $np(1-p)$, not $np$. The rest are standard results.

**Q9 — (B) 0.375.** $P(X=2) = C(4,2)(0.5)^4 = 6/16 = 0.375$.

**Q10 — 0.03.** Poisson additivity: $N_1+N_2 \sim \text{Poisson}(5)$. $P(=1) = e^{-5}\cdot 5^1/1! = 5e^{-5} \approx 5 \times 0.0067 = 0.0337 \approx 0.03$.

---

### How to read your score

- **9–10:** the discrete family is solid — on to Module 1.5 (Continuous Distributions: uniform, exponential, normal).
- **6–8:** re-memorise the reference table; redo Q4–Q6 and Q10.
- **≤5:** re-read Part 1 and drill identification (Step 1 in Part 2) — most errors here are picking the wrong distribution.
