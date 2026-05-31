# LaTeX Rendering Test — Bayes & Distributions

## 1 · Inline & Display

**Inline math** should appear typeset within these sentences:

- Conditional probability is $P(A \mid B) = \dfrac{P(A \cap B)}{P(B)}$, valid when $P(B) > 0$.
- A binomial PMF is $P(X=k) = \binom{n}{k} p^k (1-p)^{n-k}$, with mean $np$ and variance $np(1-p)$.
- Standardizing a normal: $Z = \dfrac{X-\mu}{\sigma} \sim \mathcal{N}(0,1)$, and $\Phi(-z) = 1 - \Phi(z)$.
- A quick value: $\binom{10}{3} = 120$ and $\sum_{i=1}^{n} i = \dfrac{n(n+1)}{2}$.

**Display equations** should be centered on their own line:

$$\operatorname{Var}(X) = E[X^2] - \big(E[X]\big)^2$$

$$P(B_k \mid A) = \frac{P(A \mid B_k)\,P(B_k)}{\displaystyle\sum_j P(A \mid B_j)\,P(B_j)}$$

$$\int_0^2 \frac{x}{2}\,dx = \left[\frac{x^2}{4}\right]_0^2 = 1$$

## 2 · Bayes worked snippet (2024 Q58)

**Given:** $P(\bar{T}) = 0.6$, $P(S \mid T) = 0.3$, $P(S \mid \bar{T}) = 0.6$. Find $P(T \mid S)$.

First, $P(T) = 1 - P(\bar{T}) = 1 - 0.6 = 0.4$.

Law of total probability:

$$P(S) = P(S \mid T)\,P(T) + P(S \mid \bar{T})\,P(\bar{T}) = (0.3)(0.4) + (0.6)(0.6) = 0.48$$

Bayes' theorem:

$$P(T \mid S) = \frac{P(S \mid T)\,P(T)}{P(S)} = \frac{0.12}{0.48} = 0.25$$

## 3 · Math inside table cells

This checks whether LaTeX renders **inside table cells** (a common failure point):

| Distribution            | PMF / PDF                                                  | Mean                 | Variance               |
| ----------------------- | ---------------------------------------------------------- | -------------------- | ---------------------- |
| Binomial $(n,p)$        | $\binom{n}{k}p^k(1-p)^{n-k}$                               | $np$                 | $np(1-p)$              |
| Poisson $(\lambda)$     | $\dfrac{e^{-\lambda}\lambda^{k}}{k!}$                      | $\lambda$            | $\lambda$              |
| Normal $(\mu,\sigma^2)$ | $\dfrac{1}{\sigma\sqrt{2\pi}}\,e^{-(x-\mu)^2/(2\sigma^2)}$ | $\mu$                | $\sigma^2$             |
| Exponential $(\lambda)$ | $\lambda e^{-\lambda x}$                                   | $\tfrac{1}{\lambda}$ | $\tfrac{1}{\lambda^2}$ |

## How to read this test

**If it renders correctly:** every `$...$` shows as typeset math (real fraction bars, a proper $\binom{n}{k}$, integral sign, Greek letters $\mu,\sigma,\lambda$, and the conditioning bar $\mid$) — including inside the table. If so, reply **"renders fine"** and I'll build all of Subject 2 this way.

**If you instead see raw source** like `\dfrac{...}` or literal dollar signs, your document viewer doesn't run KaTeX/MathJax. In that case I'll keep documents in clean Unicode notation (as in Subject 1) and reserve LaTeX for slides/webpages, where I control the renderer. Tell me which you see.
