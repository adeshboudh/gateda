---
title: "6.5 Reasoning Under Uncertainty"
parent: "Module 6: Artificial Intelligence"
nav_order: 5
---

# GATE DA · AI Module 6.5 — Reasoning Under Uncertainty (Bayesian Networks)

## Exam Relevance

**Where this sits:** Artificial Intelligence $\rightarrow$ _Reasoning Under Uncertainty (Bayesian networks)_ — the probabilistic-AI pillar. Module **5 of 5** in Subject 6 — **this completes Artificial Intelligence.**

**Weightage:** ~3 of the 17 AI PYQs, and it ties back to Probability (Bayes, Module 1.2). Directly tested PYQs:

- **2024 Q64** (NAT) — compute a joint probability from a Bayes net + CPTs.
- **2024 Q24** (MCQ) — conditional independence / the **collider** trap.
- **2025 Q26** (MSQ) — exact vs approximate inference algorithms.

(Cross-ref: **2026 Q23** lists MCMC as approximate sampling — in ML Module 3.3.)

> **Why it matters:** three ideas — the **factorized joint** $\prod_i P(X_i\mid \text{Parents}(X_i))$, the **d-separation** rules (chain/fork **block**, collider **opens** when observed), and the **exact vs approximate** split — cover every uncertainty question GATE DA has asked.

## Part 1 — Theory & Math

### A. Bayesian networks

A **Bayesian network** is a **DAG**: nodes are random variables, edges encode direct dependence, and each node carries a **conditional probability table (CPT)** $P(\text{node}\mid \text{parents})$. The full joint **factorizes**:
$$P(X_1,\dots,X_n)=\prod_{i=1}^{n} P\big(X_i \mid \text{Parents}(X_i)\big).$$
This compact product (only **parents**, not all ancestors) is the whole point — it encodes the conditional independencies.

### B. Computing a joint probability

Plug the specific values into the product of the relevant CPT entries. _(2024 Q64.)_

### C. Conditional independence & d-separation

Along any path, the **middle** node's connection type decides the flow:

| Structure                                         | Marginally      | Given the middle node     |
| ------------------------------------------------- | --------------- | ------------------------- |
| **chain** $X\to Y\to Z$                           | dependent       | **independent** (blocked) |
| **fork / common cause** $X\leftarrow Y\to Z$      | dependent       | **independent** (blocked) |
| **collider / common effect** $X\to Y\leftarrow Z$ | **independent** | **DEPENDENT** (opened)    |

The **collider** is the counterintuitive one: $X$ and $Z$ are independent **until** you observe $Y$ (or any descendant of $Y$), which makes them **dependent**. _(2024 Q24: $U\to W\leftarrow V$ — conditioning on $W$ makes $U,V$ dependent.)_

### D. Inference

- **Exact inference**
  - **Enumeration / marginalization:** sum the joint over the hidden variables.
  - **Variable elimination (VE):** exact and more efficient — eliminates variables one at a time via factors; computes marginals and conditionals $P(\text{query}\mid \text{evidence})$.
- **Approximate inference (sampling)** — for large/intractable networks:
  - **Rejection sampling**, **likelihood weighting**, **Gibbs sampling / MCMC**.
- **Classification to memorize:** **VE & enumeration are EXACT; all sampling methods (rejection, likelihood weighting, Gibbs, MCMC) are APPROXIMATE.** _(2025 Q26.)_

### E. Bayes' theorem (the engine)

$$P(A\mid B)=\frac{P(B\mid A)\,P(A)}{P(B)}.$$
Marginal via total probability: $P(Y)=\sum_x P(Y\mid X{=}x)\,P(X{=}x)$. (Bayes is covered in depth in Module 1.2.)

### F. Traps GATE exploits

1. **Collider conditioning reverses independence:** $X\to Y\leftarrow Z$ are independent **unless** $Y$ (or a descendant) is observed.
2. **Variable elimination is EXACT**, not approximate.
3. **Sampling (Gibbs, rejection, likelihood weighting, MCMC) is APPROXIMATE**, not exact.
4. The joint uses **parents only** — not all ancestors.
5. **Marginal independence $\ne$ conditional independence.**
6. In chains/forks the observed middle node **blocks**; in a collider it **opens**.

## Part 2 — How to Solve (Method)

### Compute a joint probability

$P(\text{values})=\prod_i P(\text{node}{=}\text{value}\mid \text{parents}{=}\text{values})$ — read each factor off its CPT and multiply. _(2024 Q64.)_

### Decide conditional independence (d-separation)

For the two variables in question, classify the connection at each intermediate node on every path:

- **chain / fork** through an **observed** node $\to$ blocked (independent).
- **collider** $\to$ blocked **unless** the collider (or a descendant) is observed $\to$ then **opened** (dependent). _(2024 Q24.)_

### Classify an inference algorithm

**Exact:** variable elimination, enumeration. **Approximate:** rejection sampling, likelihood weighting, Gibbs/MCMC. _(2025 Q26.)_

### Marginalize

$P(Y)=\sum_x P(Y\mid X{=}x)\,P(X{=}x)$ — sum the joint over the hidden variable(s).

### Mistakes that cost marks

- Treating a **collider** like a chain (getting the independence backwards).
- Calling VE approximate or a sampler exact.
- Conditioning on **non-parents** in the factorization.

## Part 3 — Worked Examples

### Example 1 — Joint probability from a Bayes net _(2024 Q64 · NAT)_

**Q.** Network: $U\to V$, $U\to W$, $V\to Z$, $W\to Z$ (four Bernoulli variables). Relevant CPT entries: $P(U{=}1)=0.5$; $P(V{=}1\mid U{=}1)=0.5$; $P(W{=}1\mid U{=}1)=1$; $P(Z{=}1\mid V{=}1,W{=}1)=0.5$. Find $P(U{=}1,V{=}1,W{=}1,Z{=}1)$.

**Solve.** Factorize along the DAG (each node given its parents):
$$P(U{=}1,V{=}1,W{=}1,Z{=}1)=P(U{=}1)\,P(V{=}1\mid U{=}1)\,P(W{=}1\mid U{=}1)\,P(Z{=}1\mid V{=}1,W{=}1).$$
$$=0.5\times0.5\times1\times0.5=0.125.$$

**Answer: $0.125$.** _Method:_ multiply one CPT entry per node, conditioned on its parents.

---

### Example 2 — The collider trap _(2024 Q24 · MCQ)_

**Q.** $P(U,V,W,X,Y)=P(U)P(V)P(W\mid U,V)P(X\mid W)P(Y\mid W)$ (so $U\to W$, $V\to W$, $W\to X$, $W\to Y$). Which statement is **FALSE**? (A) $Y\perp V\mid W$ (B) $X\perp U\mid W$ (C) $U\perp V\mid W$ (D) $X\perp Y\mid W$.

**Solve.**

- (A) $V\to W\to Y$ is a **chain** through observed $W$ $\Rightarrow$ blocked $\Rightarrow$ independent. **True.**
- (B) $U\to W\to X$ chain through observed $W$ $\Rightarrow$ independent. **True.**
- (C) $U\to W\leftarrow V$ is a **collider** at $W$. Conditioning on $W$ **opens** the path $\Rightarrow$ $U,V$ are **dependent** given $W$. So “$U\perp V\mid W$” is **FALSE**.
- (D) $X\leftarrow W\to Y$ fork through observed $W$ $\Rightarrow$ independent. **True.**

**Answer: (C)** — the false statement. _Key:_ observing a collider induces dependence between its parents.

---

### Example 3 — Exact vs approximate inference _(2025 Q26 · MSQ)_

**Q.** Which statements about Bayesian-network inference are correct? (A) Variable elimination is an approximate inference algorithm (B) Gibbs sampling is an exact inference algorithm (C) Variable elimination is used to determine conditional probabilities (D) Rejection sampling is an approximate inference algorithm.

**Solve.**

- (A) **False** — variable elimination is **exact**.
- (B) **False** — Gibbs sampling is **approximate** (an MCMC method).
- (C) **True** — VE computes marginals and conditionals $P(\text{query}\mid \text{evidence})$.
- (D) **True** — rejection sampling is an approximate (sampling) method.

**Answer: (C) and (D).**

---

### Example 4 — Marginal via total probability _(original · Med)_

**Q.** Network $X\to Y$ with $P(X{=}1)=0.3$, $P(Y{=}1\mid X{=}1)=0.9$, $P(Y{=}1\mid X{=}0)=0.2$. Find $P(Y{=}1)$.

**Solve.** Sum over $X$:
$$P(Y{=}1)=P(Y{=}1\mid X{=}1)P(X{=}1)+P(Y{=}1\mid X{=}0)P(X{=}0)=0.9(0.3)+0.2(0.7)=0.27+0.14=0.41.$$

**Answer: $0.41$.** _Method:_ marginalize the hidden cause $X$ by total probability.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** A Bayesian network represents the joint distribution as the product of
(A) all marginals (B) $P(\text{node}\mid \text{all others})$ (C) $P(\text{node}\mid \text{parents})$ (D) $P(\text{node}\mid \text{children})$

**Q2. ★ (MCQ)** In a chain $X\to Y\to Z$, $X$ and $Z$ are
(A) always independent (B) independent given $Y$ (C) dependent given $Y$ (D) never related

**Q3. ★★ (MCQ)** In a collider $X\to Y\leftarrow Z$, $X$ and $Z$ are
(A) independent given $Y$ (B) dependent given $Y$ (C) always independent (D) identical

**Q4. ★★ (MCQ)** Which is an **exact** inference method?
(A) Gibbs sampling (B) rejection sampling (C) variable elimination (D) likelihood weighting

**Q5. ★★ (MSQ)** Which are **approximate** inference methods?
(A) variable elimination (B) rejection sampling (C) Gibbs sampling (D) likelihood weighting

**Q6. ★★ (NAT)** Network $X\to Y$ with $P(X{=}1)=0.4$, $P(Y{=}1\mid X{=}1)=0.5$, $P(Y{=}1\mid X{=}0)=0.1$. Then $P(Y{=}1)=$ \***\*\_\_\*\*** .

**Q7. ★★ (NAT)** Bayes net $A\to B$, $A\to C$ with $P(A{=}1)=0.5$, $P(B{=}1\mid A{=}1)=0.8$, $P(C{=}1\mid A{=}1)=0.6$. Then $P(A{=}1,B{=}1,C{=}1)=$ \***\*\_\_\*\*** .

**Q8. ★★ (MCQ)** In a fork $X\leftarrow Y\to Z$, conditioning on $Y$ makes $X$ and $Z$
(A) dependent (B) independent (C) identical (D) undefined

**Q9. ★★★ (MSQ)** For a collider $X\to Y\leftarrow Z$ (no other path), which are TRUE?
(A) $X$ and $Z$ are marginally independent (B) they become dependent given $Y$ (C) they become dependent given a descendant of $Y$ (D) they are always dependent

**Q10. ★★★ (MCQ)** A binary node with **two** binary parents has how many independent parameters in its CPT?
(A) 2 (B) 4 (C) 8 (D) 1

**Q11. ★★★ (NAT)** Network: $A\to B$, $B\to D$. $P(A{=}1)=0.6$, $P(B{=}1\mid A{=}1)=0.4$, $P(B{=}1\mid A{=}0)=0.3$, $P(D{=}1\mid B{=}1)=0.8$, $P(D{=}1\mid B{=}0)=0.2$. Find $P(B{=}1,\,D{=}1)$ = \***\*\_\_\*\*** .

**Q12. ★★★ (MCQ)** In the network $A\to C\leftarrow B$ (collider at $C$), $C\to D$. Which statement is **FALSE**?
(A) $A$ and $B$ are marginally independent.
(B) Conditioning on $C$ makes $A$ and $B$ dependent.
(C) Conditioning on $D$ does **not** make $A$ and $B$ dependent.
(D) Conditioning on $D$ makes $A$ and $B$ dependent, because $D$ is a descendant of the collider $C$.

## Answer Key & Full Solutions

**Q1 — (C) $P(\text{node}\mid \text{parents})$.** The defining factorization of a Bayes net.

**Q2 — (B) independent given $Y$.** A chain is blocked by the observed middle node.

**Q3 — (B) dependent given $Y$.** A collider opens when conditioned on (marginally they are independent).

**Q4 — (C) variable elimination.** The others are sampling (approximate) methods.

**Q5 — (B), (C), (D).** Rejection sampling, Gibbs, and likelihood weighting are approximate; variable elimination (A) is exact.

**Q6 — 0.26.** $0.5(0.4)+0.1(0.6)=0.20+0.06=0.26$.

**Q7 — 0.24.** $P=P(A{=}1)P(B{=}1\mid A{=}1)P(C{=}1\mid A{=}1)=0.5\times0.8\times0.6=0.24$.

**Q8 — (B) independent.** A fork (common cause) is blocked by the observed middle node.

**Q9 — (A), (B), (C).** A collider's parents are marginally independent but become dependent once the collider **or any descendant** is observed. (D) is false (they aren't _always_ dependent).

**Q10 — (B) 4.** Two binary parents give $2^2=4$ parent combinations; a binary node needs $1$ free parameter per combination $\Rightarrow 4$.

**Q11 — 0.288.** First marginalize over $A$ to find $P(B{=}1)$: $0.4(0.6)+0.3(0.4)=0.24+0.12=0.36$. Since $D$ depends only on $B$: $P(B{=}1,D{=}1)=P(D{=}1\mid B{=}1)\cdot P(B{=}1)=0.8\times0.36=0.288$.

**Q12 — (C).** (C) is **false**. $D$ is a **descendant** of the collider $C$; conditioning on any descendant of a collider also opens the collider path, making $A$ and $B$ dependent. (A), (B), and (D) are all true.

---

### How to read your score

- **10–12:** uncertainty is solid — **that completes all of Subject 6 (Artificial Intelligence)!**
- **7–9:** re-drill **d-separation** (Q2, Q3, Q8, Q9, Q12) and **exact vs approximate** (Q4, Q5).
- **≤6:** re-read Part 1 A–D; lock in the factorized joint, _collider opens when observed (or a descendant is observed)_, and _VE exact / sampling approximate_.
