---
title: "1.2 Conditional Probability & Bayes"
parent: "Module 1: Probability & Statistics"
nav_order: 2
---

# GATE DA · P&S Module 1.2 — Conditional Probability & Bayes' Theorem

## Exam Relevance

**Where this sits:** Probability & Statistics → _Conditional Probability, Independence, Total Probability & Bayes' Theorem_ — the highest-yield micro-topic inside GATE DA's highest-weight subject.

**How often it's tested:** a Bayes / conditional-probability question appears in **every one of the last three papers**, almost always as a **2-mark NAT**:

- **2024 Q58** — Bayes with two events, find $P(T\mid S) = 0.25$
- **2025 Q31** — Bayes with three boxes, find $P(\text{Box-2}\mid \text{white}) = 0.25$
- **2026 Q57** — Bayes medical test, find $P(\text{disease}\mid \text{positive}) = 0.77$

Plus closely related appearances: **2024 Q24** (conditional independence), **2026 Q34** (conditional probability via memorylessness), **2025 Q35** (Naive Bayes posterior), **2024 Q64** (Bayesian-network chain rule).

**Why it's worth heavy prep:** the _form_ of these questions is stable, so a fixed procedure earns the marks reliably. And the ideas here are reused downstream — **Naive Bayes** (ML module), **Bayesian networks / inference** (AI module). Lock this in.

> **Scope note:** this module is about probabilities of _events_. Conditional **expectation / variance** $E[X\mid Y]$ is Module 1.3; **joint continuous** densities (e.g. 2024 Q56) are Module 1.6. Memorylessness of the exponential (2026 Q34) is introduced here as a conditional-probability application and detailed in Module 1.5.

## Part 1 — Theory & Math

### Notation

$P(A\mid B)$ = probability of $A$ given $B$ · $A^c$ = complement of $A$ · $\cap$ intersection, $\cup$ union · a _partition_ $B_1,\dots,B_n$ = disjoint events that together cover all of $S$.

---

### A. Conditional probability

The probability of $A$ **given that $B$ has occurred**:

$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad \text{provided } P(B) > 0.$$

**Intuition:** $B$ becomes the new sample space; we ask what fraction of $B$ is also $A$. (In a contingency table, $P(A\mid B)$ = the A-and-B cell divided by the B row total.)

---

### B. Multiplication (chain) rule

Rearranging the definition:

$$P(A \cap B) = P(A\mid B)\cdot P(B) = P(B\mid A)\cdot P(A)$$

General chain rule (used for "draw after draw without replacement"):

$$P(A_1 \cap A_2 \cap \dots \cap A_n) = P(A_1)\cdot P(A_2\mid A_1)\cdot P(A_3\mid A_1\cap A_2)\cdots$$

---

### C. Independence

$A$ and $B$ are **independent** iff any one of these (equivalent) conditions holds:

$$P(A \cap B) = P(A)\cdot P(B) \quad\iff\quad P(A\mid B) = P(A) \quad\iff\quad P(B\mid A) = P(B)$$

- If $A,B$ are independent, so are $(A, B^c)$, $(A^c, B)$, and $(A^c, B^c)$.
- **Mutually exclusive ≠ independent.** If $A\cap B = \emptyset$ with $P(A),P(B) > 0$, then $P(A\cap B)=0 \ne P(A)P(B)$, so they are actually _dependent_. (This is the trap in **2024 Q12**.)
- For 3+ events, **mutual independence** (every subset multiplies) is stronger than **pairwise independence**.

---

### D. Conditional independence (bridge to ML/AI)

$A$ and $B$ are **conditionally independent given $C$** iff

$$P(A \cap B \mid C) = P(A\mid C)\cdot P(B\mid C)$$

This can hold even when $A,B$ are _dependent_ marginally — and can **fail** even when they are marginally independent. Conditioning on a common _effect_ (a "collider") makes two independent causes dependent — "**explaining away**" (the heart of **2024 Q24**; full treatment in the AI module).

---

### E. Law of Total Probability

If $B_1,\dots,B_n$ **partition** $S$ (disjoint and exhaustive), then for any event $A$:

$$P(A) = P(A\mid B_1)P(B_1) + P(A\mid B_2)P(B_2) + \dots + P(A\mid B_n)P(B_n)$$

This is the **denominator** of every Bayes problem ("average the likelihoods, weighted by the priors").

---

### F. Bayes' Theorem

To _reverse_ a conditional — from $P(\text{evidence}\mid \text{cause})$ to $P(\text{cause}\mid \text{evidence})$:

$$P(B_k \mid A) = \frac{P(A\mid B_k)\cdot P(B_k)}{\sum_j P(A\mid B_j)\cdot P(B_j)}$$

| Term                             | Name           | Meaning                                    |
| -------------------------------- | -------------- | ------------------------------------------ |
| $P(B_k)$                         | **prior**      | belief in hypothesis $B_k$ before evidence |
| $P(A\mid B_k)$                   | **likelihood** | how well $B_k$ explains the evidence       |
| $P(A) = \sum P(A\mid B_j)P(B_j)$ | **evidence**   | total probability of the evidence          |
| $P(B_k\mid A)$                   | **posterior**  | updated belief after seeing evidence       |

**Base rates matter.** Even a very accurate test gives a modest posterior when the disease is rare — the prior pulls hard (see Worked Example 4).

---

### G. Common traps GATE exploits

1. **Inverting the conditional:** $P(A\mid B) \ne P(B\mid A)$ (the "prosecutor's fallacy"). Bayes exists precisely to convert one into the other.
2. **Base-rate neglect:** ignoring the prior $P(\text{disease})$ and reporting the sensitivity as the answer.
3. **Forgetting to normalise:** the Bayes answer is the numerator **divided by total probability**, not the numerator alone.
4. **Treating dependent events as independent** (multiplying raw probabilities when sampling without replacement).
5. **Mutually exclusive vs independent** confusion.
6. **Marginal vs conditional independence** — they are different (explaining away).

## Part 2 — How to Solve (Method)

### Recognise the pattern from the wording

| Phrase in the question                                                | What to use                                 |
| --------------------------------------------------------------------- | ------------------------------------------- |
| "given that…", "… if it is known that…"                               | conditional probability $P(A\mid B)$        |
| "overall / total probability of A" with several sources or stages     | **law of total probability**                |
| "probability it came from / was caused by X, **given** we observed Y" | **Bayes' theorem** (reverse conditional)    |
| "are A and B independent?"                                            | check $P(A\cap B) \stackrel{?}{=} P(A)P(B)$ |
| "without replacement", "second draw given first"                      | **chain rule**                              |

---

### The Bayes playbook (works for every Bayes NAT)

1. **Name the hypotheses** $B_1,\dots,B_n$ (the partition) and the **evidence** $E$.
2. Write the **priors** $P(B_i)$.
3. Write the **likelihoods** $P(E\mid B_i)$.
4. **Total probability:** $P(E) = \sum P(E\mid B_i)P(B_i)$.
5. **Bayes:** $P(B_k\mid E) = \dfrac{P(E\mid B_k)P(B_k)}{P(E)}$.
6. **Sanity-check:** posteriors over all hypotheses sum to 1; the posterior should move away from the prior in the direction the evidence points.

---

### The natural-frequency shortcut (do Bayes without fractions)

Instead of fractions, imagine a concrete population. For the disease test (prior 30%, sensitivity 80%, false-positive 10%):

```
                    1000 people
                  /             \
           D (30%)               not-D (70%)
            300                    700
          /      \               /      \
     +(80%)   -(20%)        +(10%)   -(90%)
      240       60            70       630

   P(D | +) = 240 / (240 + 70) = 240/310 ≈ 0.77
```

This avoids base-rate neglect _and_ arithmetic slips — ideal under exam pressure.

---

### Checking independence (3-step)

1. Compute $P(A)$, $P(B)$, and $P(A\cap B)$ directly.
2. Compare $P(A\cap B)$ with $P(A)\cdot P(B)$.
3. Equal → independent; not equal → dependent. (Never infer independence from "mutually exclusive" — that implies the opposite.)

---

### Exam tactics

- **NAT Bayes:** use natural frequencies; **respect the rounding instruction** ("two decimal places").
- **Reverse-conditional alarm:** if the question gives $P(E\mid \text{cause})$ but asks $P(\text{cause}\mid E)$, it's Bayes — don't answer with the likelihood.
- **Without replacement:** update the denominator on each draw (chain rule).
- **MSQ on concepts:** test each statement against a definition or a tiny counterexample.

## Part 3 — Worked Examples (from PYQs)

Difficulty rises E1 → E4. Examples 2–4 are real GATE DA questions.

---

### Example 1 — Conditional probability & an independence check _(original · Easy–Med)_

**Q.** One card is drawn from a standard 52-card deck. Let A = "the card is a King" and B = "the card is a Heart". Find $P(A\mid B)$. Are A and B independent?

**Solve.**

- $P(A) = 4/52 = 1/13$, $P(B) = 13/52 = 1/4$, $P(A\cap B) = P(\text{King of Hearts}) = 1/52$.
- $P(A\mid B) = \dfrac{P(A\cap B)}{P(B)} = \dfrac{1/52}{1/4} = 4/52 = 1/13$.
- Independence check: $P(A)\cdot P(B) = (1/13)(1/4) = 1/52 = P(A\cap B)$ → **independent** (equivalently, $P(A\mid B) = 1/13 = P(A)$).

_Method:_ definition of conditional probability; independence holds iff $P(A\cap B) = P(A)P(B)$.

---

### Example 2 — Two-event Bayes _(2024 Q58 · NAT · Medium)_

**Q.** For events $T$ and $S$: $P(\bar{T}) = 0.6$, $P(S\mid T) = 0.3$, $P(S\mid \bar{T}) = 0.6$. Find $P(T\mid S)$ (two decimals).

**Solve (Bayes playbook).**

- Partition $\{T, \bar{T}\}$: $P(T) = 1 - 0.6 = 0.4$, $P(\bar{T}) = 0.6$.
- Likelihoods: $P(S\mid T) = 0.3$, $P(S\mid \bar{T}) = 0.6$.
- Total probability: $P(S) = 0.3(0.4) + 0.6(0.6) = 0.12 + 0.36 = 0.48$.
- Bayes: $P(T\mid S) = 0.12 / 0.48 = 0.25$.

**Answer: 0.25.** _Note the reversal:_ we were given $P(S\mid T)$ but asked for $P(T\mid S)$.

---

### Example 3 — Three-hypothesis Bayes _(2025 Q31 · NAT · Medium)_

**Q.** Box-1: 2 black, 1 white. Box-2: 1 black, 2 white. Box-3: 3 black, 3 white. $P(\text{pick Box-1,2,3}) = 1/2, 1/6, 1/3$. A random ball from the chosen box is **white**. Find $P(\text{it came from Box-2})$ (two decimals).

**Solve.**

- Priors: $P(B_1)=1/2,\ P(B_2)=1/6,\ P(B_3)=1/3$.
- Likelihoods of white: $P(W\mid B_1)=1/3,\ P(W\mid B_2)=2/3,\ P(W\mid B_3)=3/6=1/2$.
- Total probability: $P(W) = (1/3)(1/2) + (2/3)(1/6) + (1/2)(1/3) = 1/6 + 1/9 + 1/6 = 3/18+2/18+3/18 = 8/18 = 4/9$.
- Bayes: $P(B_2\mid W) = \dfrac{(2/3)(1/6)}{4/9} = \dfrac{1/9}{4/9} = 1/4$.

**Answer: 0.25.** _Method:_ identical playbook, just a 3-way partition.

---

### Example 4 — The medical-test classic _(2026 Q57 · NAT · Medium–Hard)_

**Q.** Disease $D$: if a person has $D$, the test is positive 80% of the time; if not, it is positive 10% of the time. Prevalence of $D$ is 30%. Given a **positive** test, find $P(\text{has } D)$ (two decimals).

**Solve (natural frequencies on 1000 people).**

- Have $D$: 300 → positive: $0.80\times300 = \mathbf{240}$.
- No $D$: 700 → positive: $0.10\times700 = \mathbf{70}$.
- $P(D \mid +) = \dfrac{240}{240 + 70} = \dfrac{240}{310} \approx 0.7742$.

**Answer: 0.77.** _Insight:_ despite an 80%-sensitive test, the posterior is only 77% — the 30% base rate and the 10% false-positive rate hold it down. **Base rates matter.**

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — ⅓ (1-mark) or ⅔ (2-mark) penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** In a group, 40% play cricket and 25% play both cricket and football. Given that a person plays cricket, the probability they also play football is
(A) 0.10 (B) 0.625 (C) 0.25 (D) 0.40

**Q2. ★★ (MCQ)** Two fair dice are rolled. A = "first die is even", B = "the sum is 7". What is $P(A \cap B)$, and are A, B independent?
(A) 1/12, independent (B) 1/12, dependent (C) 1/6, independent (D) 1/9, dependent

**Q3. ★★ (NAT)** $X$ follows an exponential distribution and $P(X > 5) = 0.35$. Then $P(X > 10 \mid X > 5) =$ \***\*\_\_\*\*** (two decimals). _(2026 Q34)_

**Q4. ★★ (NAT)** Two machines each produce 50% of a factory's items. Machine A's defect rate is 1%, Machine B's is 3%. The probability that a randomly chosen item is defective is \***\*\_\_\*\*** (two decimals).

**Q5. ★★ (NAT)** Continuing Q4: given that a chosen item is defective, the probability it was made by Machine B is \***\*\_\_\*\*** (two decimals).

**Q6. ★★ (NAT)** A Naive Bayes classifier has two classes with $P(y_1)=1/3$, $P(y_2)=2/3$, and feature likelihoods $P(x\mid y_1)=3/4$, $P(x\mid y_2)=1/4$. After observing $x$, the probability of misclassification is \***\*\_\_\*\*** (two decimals). _(2025 Q35 · previews the ML module)_

**Q7. ★★★ (MCQ)** Consider the joint distribution $P(U,V,W,X,Y) = P(U)P(V)P(W\mid U,V)P(X\mid W)P(Y\mid W)$. Which statement is **FALSE**? _(2024 Q24 · previews the AI module)_
(A) $Y$ is conditionally independent of $V$ given $W$.
(B) $X$ is conditionally independent of $U$ given $W$.
(C) $U$ and $V$ are conditionally independent given $W$.
(D) $Y$ and $X$ are conditionally independent given $W$.

**Q8. ★★★ (NAT)** Let $A$ be a $5\times5$ matrix in which each element is Bernoulli(0.5) independently. The probability that the sum of row 2 equals 3 **and** the sum of column 3 equals 3 is \***\*\_\_\*\*** (two decimals). _(2026 Q64)_

**Q9. ★★ (MSQ)** Which of the following are TRUE?
(A) If A and B are independent, then $P(A\mid B) = P(A)$.
(B) Two mutually exclusive events with positive probability are independent.
(C) $P(A\mid B)\cdot P(B) = P(A \cap B)$.
(D) If $A \subseteq B$, then $P(A\mid B) = P(A)/P(B)$.

**Q10. ★★ (MCQ)** An urn has 5 red and 3 green balls. Two are drawn without replacement. $P(\text{both red})$ is
(A) 5/14 (B) 25/64 (C) 1/2 (D) 5/28

## Answer Key & Full Solutions

**Q1 — (B) 0.625.** $P(F\mid C) = \dfrac{P(F\cap C)}{P(C)} = \dfrac{0.25}{0.40} = 0.625$.

**Q2 — (A) 1/12, independent.** $P(A)=18/36=1/2$; $P(B)=6/36=1/6$; $A\cap B$ = first even & sum 7 = $\{(2,5),(4,3),(6,1)\} = 3/36 = 1/12$. Since $P(A)P(B) = (1/2)(1/6) = 1/12 = P(A\cap B)$, they are **independent**.

**Q3 — 0.35.** Since $\{X>10\} \subseteq \{X>5\}$: $P(X>10\mid X>5) = \dfrac{P(X>10)}{P(X>5)}$. The exponential is **memoryless**, so $P(X>10\mid X>5) = P(X>5) = 0.35$. (Check: $P(X>10)=P(X>5)^2=0.35^2=0.1225$; $0.1225/0.35=0.35$.)

**Q4 — 0.02.** Total probability: $P(D) = 0.5(0.01) + 0.5(0.03) = 0.005 + 0.015 = 0.02$.

**Q5 — 0.75.** Bayes: $P(B\mid D) = 0.015 / 0.02 = 0.75$. (Machine B causes 3 of every 4 defectives despite making only half the items — higher defect rate.)

**Q6 — 0.40.** Posteriors $\propto$ likelihood×prior: $y_1$: $(3/4)(1/3)=1/4$; $y_2$: $(1/4)(2/3)=1/6$. Normalise by $1/4+1/6=5/12$ → $P(y_1\mid x)=\dfrac{1/4}{5/12}=3/5=0.6$, $P(y_2\mid x)=0.4$. The classifier picks the larger posterior ($y_1$); misclassification probability = $P(y_2\mid x) = 0.40$.

**Q7 — (C).** Read the factorisation as a Bayesian network: $U\to W,\ V\to W,\ W\to X,\ W\to Y$. (A) $Y$ depends only on $W$, so $Y \perp V \mid W$ — true. (B) $X$ depends only on $W$, so $X \perp U \mid W$ — true. (D) given $W$, $X$ and $Y$ separate — true. (C) $U$ and $V$ are co-parents of the collider $W$; conditioning on $W$ makes them **dependent** (explaining away), so "$U \perp V \mid W$" is **false** — the FALSE statement is (C).

**Q8 — 0.10.** Let $a = A(2,3)$, the element shared by row 2 and column 3. Condition on $a$ (law of total probability). The other 4 entries of row 2 and the other 4 of column 3 are disjoint and independent.

- $a=1$ (prob 0.5): need 2 more ones in each → $C(4,2)/16 = 3/8$ each → $(3/8)^2 = 9/64$.
- $a=0$ (prob 0.5): need 3 ones in each → $C(4,3)/16 = 1/4$ each → $(1/4)^2 = 1/16$.
- Total: $0.5(9/64) + 0.5(1/16) = 9/128 + 4/128 = 13/128 \approx 0.10$.

**Q9 — (A), (C), (D).** (A) true (definition of independence). (B) **false** — mutually exclusive with positive probability gives $P(A\cap B)=0 \ne P(A)P(B)>0$, i.e. dependent. (C) true (multiplication rule). (D) $A \subseteq B \to A\cap B = A \to P(A\mid B) = P(A)/P(B)$, true.

**Q10 — (A) 5/14.** Chain rule without replacement: $(5/8)(4/7) = 20/56 = 5/14$. (Trap (B) 25/64 = $(5/8)^2$ is the _with-replacement_ answer.)

---

### How to read your score

- **9–10:** Bayes is a reliable earner for you — advance to Module 1.3 (Random Variables, Expectation & Variance).
- **6–8:** redo the Bayes playbook on Q4–Q6 and Q8 using the natural-frequency method.
- **≤5:** re-read Part 1 E–F and the playbook in Part 2; this topic is ~2–4 marks every year, so it pays to over-learn it.
