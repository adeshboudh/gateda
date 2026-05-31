---
title: "1.1 Counting & Basic Probability"
parent: "Module 1: Probability & Statistics"
nav_order: 1
---

# GATE DA · P&S Module 1.1 — Counting & Basic Probability

## Exam Relevance

**Where this sits:** Probability & Statistics → _Counting and Basic Probability_ — the entry point to GATE DA's single highest-weight subject.

**Weightage:** Probability & Statistics scored **15 → 19 → 21 marks** across 2024 → 2025 → 2026 (≈ **21.6% of DA marks** over 3 years — the #1 topic, and still rising). Counting and elementary probability are tested _directly_ almost every year, and they are _prerequisites_ for every later P&S topic (distributions, Bayes, expectation, inference).

**Seen in real papers:** 2024 Q12 (events / impossible intersection), 2025 Q45 (complement + multiplication rule), 2026 Q19 (subset counting), 2026 Q20 (stars & bars), 2026 Q33 (counting involutions, NAT) — plus frequent General Aptitude counting (2024 Q3, Q7).

**Why prioritise it:** low conceptual difficulty, high reliability. These are _bankable_ marks, and mastering them makes Modules 1.2–1.8 far easier. Start here.

> **Scope note:** This module covers counting + the probability of events under _equally likely outcomes_ (axioms, sample space, addition rule, complement). **Conditional probability, independence, total probability and Bayes** are Module 1.2; **expectation/variance** is Module 1.3.

## Part 1 — Theory & Math

### Notation used

- $n! = n\cdot(n-1)\cdots 2\cdot 1$, with $0! = 1$.
- $P(n, r)$ = number of **permutations** (ordered) of $r$ objects from $n$.
- $C(n, r) = {}^{n}C_r$ = number of **combinations** (unordered) of $r$ objects from $n$.
- $S$ = sample space; $A, B$ = events; $A^c$ = complement of $A$; $\emptyset$ = impossible event.
- $\lvert X\rvert$ = number of elements (size) of set $X$.

---

### A. The two counting principles (everything builds on these)

**Rule of product (AND / multiplication):** if a procedure is a _sequence_ of independent stages with $n_1, n_2, \dots, n_k$ choices, the total number of outcomes is

$$n_1 \times n_2 \times \dots \times n_k$$

**Rule of sum (OR / addition):** if an outcome must come from _one_ of several **disjoint** (mutually exclusive) cases of sizes $n_1, \dots, n_k$, the total is

$$n_1 + n_2 + \dots + n_k$$

Most counting problems are just a disciplined mix of these two.

---

### B. Permutations and combinations

| Situation                               | Formula                             | Note                  |
| --------------------------------------- | ----------------------------------- | --------------------- |
| Arrange all $n$ distinct objects        | $n!$                                | order matters         |
| Arrange $r$ of $n$ distinct (no repeat) | $P(n,r) = \dfrac{n!}{(n-r)!}$       | order matters         |
| Arrange $r$ of $n$ **with repetition**  | $n^r$                               | each slot independent |
| Choose $r$ of $n$ distinct (no repeat)  | $C(n,r) = \dfrac{n!}{r!\,(n-r)!}$   | order doesn't matter  |
| Arrange $n$ items with identical groups | $\dfrac{n!}{n_1!\,n_2!\cdots n_k!}$ | divide out repeats    |
| Arrange $n$ distinct in a **circle**    | $(n-1)!$                            | rotations identical   |

**Key combination identities** (memorise):

- $C(n,r) = C(n, n-r)$
- $C(n,0) = C(n,n) = 1$
- Pascal's rule: $C(n,r) = C(n-1, r-1) + C(n-1, r)$
- **Sum of a row:** $C(n,0)+C(n,1)+\dots+C(n,n) = 2^n$ → an $n$-element set has **$2^n$ subsets** (each element is in or out). Non-empty subsets: **$2^n - 1$**.

---

### C. Stars and bars (identical items into distinct boxes)

Number of ways to write a non-negative integer equation $x_1 + x_2 + \dots + x_k = n$:

> **non-negative** solutions: $C(n + k - 1,\ k - 1)$
> **strictly positive** solutions (each $x_i \ge 1$): $C(n - 1,\ k - 1)$

Trick for the positive case: substitute $m_i = x_i - 1 \ge 0$, reducing the total from $n$ to $n-k$, then apply the non-negative formula. This is exactly 2026 Q20.

---

### D. Counting functions (a GATE favourite)

For a domain of size $m$ and codomain of size $n$:

- **All functions:** $n^m$
- **Injective (one-to-one), needs $m \le n$:** $P(n,m) = \dfrac{n!}{(n-m)!}$
- **Bijections of an $n$-set to itself:** $n!$
- **Involutions** (bijections with $f(f(x)) = x$): products of fixed points and disjoint 2-cycles — count by cases (this is 2026 Q33).

---

### E. Inclusion–Exclusion (the counting form of the addition rule)

$$\lvert A \cup B\rvert = \lvert A\rvert + \lvert B\rvert - \lvert A \cap B\rvert$$

$$\lvert A \cup B \cup C\rvert = \lvert A\rvert + \lvert B\rvert + \lvert C\rvert - \lvert A\cap B\rvert - \lvert A\cap C\rvert - \lvert B\cap C\rvert + \lvert A\cap B\cap C\rvert$$

Use whenever cases **overlap** (to avoid double counting).

---

### F. Basic probability

- **Random experiment** → **sample space** $S$ (all outcomes). An **event** is a subset $A \subseteq S$.
- **Kolmogorov axioms:** (1) $0 \le P(A) \le 1$; (2) $P(S) = 1$; (3) for mutually exclusive events, $P(A \cup B) = P(A) + P(B)$.
- **Classical (equally likely) probability** — where counting meets probability:

$$P(A) = \frac{\lvert A\rvert}{\lvert S\rvert} = \frac{\text{favourable outcomes}}{\text{total outcomes}}$$

- **Complement rule:** $P(A^c) = 1 - P(A)$. _(The workhorse for "at least one".)_
- **Addition rule:** $P(A \cup B) = P(A) + P(B) - P(A \cap B)$.
- **Mutually exclusive (disjoint):** $A \cap B = \emptyset \implies P(A \cap B) = 0 \implies P(A \cup B) = P(A) + P(B)$.
- **Impossible / certain:** $P(\emptyset) = 0$, $P(S) = 1$. **Monotonicity:** $A \subseteq B \implies P(A) \le P(B)$.

---

### G. Common traps GATE exploits

1. **Order matters?** Permutation vs combination mix-ups (the #1 error).
2. **Leading zeros** in digit problems (a number can't start with 0).
3. **Double counting** overlapping cases → forgetting inclusion–exclusion.
4. **"At least one"** computed directly instead of via the complement.
5. **Replacement:** with vs without; **objects:** distinct vs identical.
6. **Off-by-one in stars & bars** (non-negative $C(n+k-1,k-1)$ vs positive $C(n-1,k-1)$).
7. **"Non-empty"**: remember to subtract the empty set ($2^n - 1$, not $2^n$).
8. **Mutually exclusive ≠ independent** — different ideas (independence is Module 1.2).

## Part 2 — How to Solve (Method)

### Step 0 — Classify the question

Ask: _is this counting, probability, or both?_ Under equally likely outcomes, **classical probability = two counting problems** (count favourable, count total). So sharpen your counting and probability follows.

---

### The counting decision table (use this every time)

| The question asks for…                                   | Order matter? | Repetition? | Use                           |
| -------------------------------------------------------- | ------------- | ----------- | ----------------------------- |
| Arrangements / sequences / "words" / rankings            | **Yes**       | No          | $P(n,r)$ (all $n \to n!$)     |
| Sequences where slots can repeat (e.g. digits/passwords) | **Yes**       | Yes         | $n^r$                         |
| Selections / committees / subsets / "choose"             | No            | No          | $C(n,r)$                      |
| Identical-item distributions / $x_i$ summing to $n$      | No            | Yes         | stars & bars $C(n+k-1,\ k-1)$ |
| Arrangements with repeated identical letters             | **Yes**       | —           | $\dfrac{n!}{n_1!\cdots n_k!}$ |
| Around a circular table                                  | cyclic        | No          | $(n-1)!$                      |

**Extra triggers:**

- "**at least one / not all / none**" → **complement** $1 - P(\text{none})$.
- "**A or B**" with overlap → **inclusion–exclusion**.
- Several **disjoint cases** → **add** them (rule of sum).
- A **multi-stage** construction → **multiply** the stages (rule of product).
- "**divisible by 3/9**" → use the **digit-sum** rule, then count.

---

### The probability procedure

1. **Write $S$ precisely** and compute $\lvert S\rvert$ by counting.
2. **Describe event $A$** in words, then compute $\lvert A\rvert$ by counting.
3. $P(A) = \lvert A\rvert/\lvert S\rvert$ (only if outcomes are equally likely).
4. Reach for **complement** on "at least one"; **addition rule** on "A or B" (check overlap); **product rule** for independent stages.
5. **Sanity-check:** is $0 \le P \le 1$? Does $P(A) + P(A^c) = 1$? Try a tiny case ($n = 2$ or $3$) to validate the structure.

---

### Exam tactics (marks-per-minute)

- **NAT questions:** the answer is an exact number — carry factorials carefully, no rounding unless asked. No options to check against, so **verify by a second method or a small case**.
- **MCQ with monster expressions** (e.g. 2026 Q19/Q20): **don't evaluate** — match the _structure_. Identify the right **denominator first** (e.g. "non-empty subsets" $\implies 2^n - 1$), which usually kills 2–3 options instantly.
- **Eliminate by magnitude:** a probability can't exceed 1; a count can't be negative or fractional.
- **MSQ:** each option is independently true/false — evaluate them separately; there is **no negative marking** in GATE NAT/MSQ, so never leave them blank.

---

### Top mistakes that cost marks

Permutation↔combination confusion · leading zeros · with/without replacement · forgetting "non-empty" · stars-&-bars off-by-one · computing "at least one" the long way · arithmetic slips in factorials/$C(n,r)$.

## Part 3 — Worked Examples (from PYQs)

Each example is a _real_ GATE DA / GA question, fully solved, tied back to the method. Difficulty rises from Example 1 → 4.

---

### Example 1 — Classical probability by counting _(2024 GA Q7 · MCQ · Easy)_

**Q.** The probability of a boy or a girl being born is 1/2. For a family with exactly three children, what is the probability of having two girls and one boy?
(A) 3/8 (B) 1/8 (C) 1/4 (D) 1/2

**Solve.**

- Sample space: each child is B or G, so $\lvert S\rvert = 2^3 = 8$ equally likely outcomes.
- Favourable = exactly 2 girls among 3 positions = choose which 2 are girls = $C(3,2) = 3$ (GGB, GBG, BGG).
- $P = 3/8$.

**Answer: (A) 3/8.** _Method:_ classical probability = favourable/total; "exactly $k$ of $n$" $\implies C(n,k)$.

---

### Example 2 — Counting with a divisibility constraint _(2024 GA Q3 · MCQ · Medium)_

**Q.** How many 4-digit positive integers divisible by 3 can be formed using only the digits $\{1, 3, 4, 6, 7\}$, with no digit repeated?
(A) 24 (B) 48 (C) 72 (D) 12

**Solve.**

- **Divisibility-by-3 rule:** a number is divisible by 3 iff its **digit sum** is. Total of all five digits = $1+3+4+6+7 = 21$.
- A 4-digit choice **omits exactly one** digit $d$; its digit sum is $21 - d$, divisible by 3 iff **$d$ is divisible by 3**. Among the digits, $d \in \{3, 6\}$.
  - Omit 3 → use $\{1,4,6,7\}$; Omit 6 → use $\{1,3,4,7\}$. (2 valid digit-sets — these are _disjoint cases_ $\implies$ add.)
- Each set has 4 distinct non-zero digits $\implies 4! = 24$ arrangements (no leading-zero issue, since 0 isn't available).
- Total = $2 \times 24 = 48$.

**Answer: (B) 48.** _Method:_ rule of sum over cases × rule of product within each case; digit-sum rule.

---

### Example 3 — "At least one" via the complement _(2025 DA Q45 · MCQ · Medium)_

**Q.** A random experiment throws 100 fair six-faced dice. Event A = at least one die shows a 1. Then P(A) =
(A) 0 (B) 1 (C) $1 - (5/6)^{100}$ (D) $(5/6)^{100}$

**Solve.**

- "At least one" over 100 dice $\implies$ direct counting is a mess of overlapping cases $\implies$ **complement**.
- $A^c$ = _no_ die shows a 1. Each die avoids 1 with prob $5/6$; the 100 dice are independent $\implies$ multiply:
  $P(A^c) = (5/6)^{100}$.
- $P(A) = 1 - (5/6)^{100}$.

**Answer: (C) $1 - (5/6)^{100}$.** _Method:_ "at least one" $\implies$ complement; independent stages $\implies$ product rule.

---

### Example 4 — Stars and bars as a probability _(2026 DA Q20 · MCQ · Hard)_

**Q.** A program returns a uniformly random **non-negative integer** solution of $n_1 + n_2 + n_3 + n_4 = 20$. What is the probability that all of $n_1, n_2, n_3, n_4$ are positive?
(A) $C(19,3)/C(23,3)$ (B) $C(20,4)/C(24,4)$ (C) $C(20,3)/C(23,3)$ (D) $C(19,4)/C(24,4)$

**Solve.**

- **Total outcomes** $\lvert S\rvert$ = non-negative solutions of a 4-variable sum to 20 = $C(20 + 4 - 1,\ 4 - 1) = C(23, 3)$.
- **Favourable** = all $n_i \ge 1$. Substitute $m_i = n_i - 1 \ge 0 \implies m_1+m_2+m_3+m_4 = 16 \implies C(16 + 3, 3) = C(19, 3)$.
- $P = C(19,3) / C(23,3)$.

**Answer: (A) $C(19,3)/C(23,3)$.** _Method:_ stars & bars; positive→non-negative shift. **Trap:** option (C) $C(20,3)/C(23,3)$ is the classic off-by-one — the shift must reduce the total from 20 to **16**, giving $C(19,3)$.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ have **no negative marking**; single-correct MCQ deducts ⅓ for a wrong 1-mark answer and ⅔ for a wrong 2-mark answer. (Difficulty: ★ easy, ★★ medium, ★★★ hard.)

**Q1. ★ (MCQ)** In how many ways can a committee of 3 be selected from 10 people?
(A) 720 (B) 120 (C) 30 (D) 1000

**Q2. ★★ (MCQ)** Three fair coins are tossed independently. T = the event of two or more heads; S = the event of two or more tails. What is $P(T \cap S)$? _(2024 DA Q12)_
(A) 0 (B) 0.5 (C) 0.25 (D) 1

**Q3. ★★ (MCQ)** In a class of 100 students, 60 like tea, 50 like coffee, and 30 like both. How many like at least one of the two?
(A) 80 (B) 110 (C) 90 (D) 140

**Q4. ★★ (NAT)** How many distinct arrangements are there of the letters of the word **BANANA**? \***\*\_\_\*\***

**Q5. ★★ (MCQ)** In how many ways can 6 distinct people be seated around a circular table (rotations considered identical)?
(A) 720 (B) 120 (C) 5040 (D) 6

**Q6. ★★ (MCQ)** How many arrangements of the letters of **EXAM** have the two vowels (E, A) adjacent?
(A) 48 (B) 24 (C) 12 (D) 6

**Q7. ★★ (NAT)** How many non-negative integer solutions does $x_1 + x_2 + x_3 = 10$ have? \***\*\_\_\*\***

**Q8. ★★ (MCQ)** A box has 4 red and 6 blue balls. Two balls are drawn at random without replacement. What is the probability that both are red?
(A) 2/15 (B) 1/5 (C) 4/25 (D) 3/20

**Q9. ★★★ (NAT)** The number of bijections $f$ from $S = \{1, 2, 3, 4\}$ to itself such that $f(f(n)) = n$ for all $n \in S$ is \***\*\_\_\*\***. _(2026 DA Q33)_

**Q10. ★★★ (MCQ)** Let $M$ be a randomly chosen **non-empty** subset of $S = \{1, 2, \dots, 2026\}$. The probability that the product of all elements of $M$ is even is: _(2026 DA Q19)_
(A) $\dfrac{2^{1013}(2^{1013} - 1)}{2^{2026}}$
(B) $\dfrac{2^{1013}}{2^{2026}}$
(C) $\dfrac{2^{1013}(2^{1013} - 1)}{2^{2026} - 1}$
(D) $\dfrac{1}{2^{2026} - 1}$

**Q11. ★★ (MSQ)** Which of the following statements are TRUE?
(A) An $n$-element set has $2^n$ subsets.
(B) $C(n, r) = C(n, n - r)$ for $0 \le r \le n$.
(C) The number of bijections from an $n$-element set to itself is $n^n$.
(D) If $A$ and $B$ are mutually exclusive, then $P(A \cup B) = P(A) + P(B)$.

## Answer Key & Full Solutions

**Q1 — (B) 120.** Committee = unordered selection $\implies C(10,3) = 120$. _(Trap (A) 720 = $P(10,3)$, the ordered count.)_

**Q2 — (A) 0.** With only 3 coins, "≥2 heads" needs ≥2 of them heads and "≥2 tails" needs ≥2 tails — that's ≥4 coins. Impossible together $\implies T \cap S = \emptyset \implies P = 0$.

**Q3 — (A) 80.** Inclusion–exclusion: $\lvert T \cup C\rvert = 60 + 50 - 30 = 80$. _(Trap (B) 110 forgets to subtract the overlap.)_

**Q4 — 60.** BANANA = 6 letters with A×3, N×2, B×1 $\implies \dfrac{6!}{3!\cdot 2!\cdot 1!} = \dfrac{720}{12} = 60$.

**Q5 — (B) 120.** Circular arrangements of $n$ distinct = $(n-1)! = 5! = 120$. _(Trap (A) 720 = $6!$, the linear count.)_

**Q6 — (C) 12.** Glue the vowels into one block: units $\{(EA), X, M\}$ arrange in $3! = 6$ ways; the vowels inside the block arrange in $2! = 2$ ways $\implies 6 \times 2 = 12$.

**Q7 — 66.** Non-negative solutions of a 3-variable sum to 10 = $C(10 + 3 - 1,\ 3 - 1) = C(12, 2) = 66$.

**Q8 — (A) 2/15.** $P = C(4,2)/C(10,2) = 6/45 = 2/15$. _(Equivalent stage form: $(4/10)(3/9) = 12/90 = 2/15$.)_

**Q9 — 10.** Such $f$ are **involutions** = products of fixed points and disjoint 2-cycles. Count by structure on 4 elements: zero 2-cycles (all fixed) = 1; one 2-cycle = $C(4,2) = 6$; two 2-cycles (perfect matchings) = 3. Total $1 + 6 + 3 = 10$.

**Q10 — (C).** $S$ has 1013 odd and 1013 even numbers. Total non-empty subsets = $2^{2026} - 1$ (the denominator — this alone eliminates (A) and (B)). Product is **odd** only if $M$ uses _no_ even number: non-empty odd-only subsets = $2^{1013} - 1$. So even-product subsets = $(2^{2026} - 1) - (2^{1013} - 1) = 2^{2026} - 2^{1013} = 2^{1013}(2^{1013} - 1)$. Probability = $\dfrac{2^{1013}(2^{1013} - 1)}{2^{2026} - 1}$.

**Q11 — (A), (B), (D).** (A) true (each element in/out $\implies 2^n$). (B) true (symmetry of $C$). (C) **false** — bijections of an $n$-set to itself = $n!$; $n^n$ counts _all functions_. (D) true (axiom of additivity for disjoint events).

---

### How to read your score

- **9–11 correct:** counting/basic probability is solid — move to Module 1.2 (Conditional Probability & Bayes).
- **6–8:** revisit the counting decision table; redo Q4–Q9.
- **≤5:** re-read Part 1 sections B–E and Part 2, then retry. This module is foundational — worth locking down before distributions.
