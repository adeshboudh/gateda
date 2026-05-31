---
title: "6.4 First-Order Predicate Logic"
parent: "Module 6: Artificial Intelligence"
nav_order: 4
---

# GATE DA · AI Module 6.4 — First-Order / Predicate Logic

## Exam Relevance

**Where this sits:** Artificial Intelligence $\rightarrow$ _First-Order / Predicate Logic_. Module **4 of 5** in Subject 6.

**Weightage:** with propositional logic, the logic cluster is **~7 of 17 AI PYQs**; FOL supplies 3 of them, every one a pure-reasoning question. Directly tested PYQs:

- **2024 Q54** (MSQ) — translate “all balls are round except rugby balls” into FOL.
- **2026 Q14** (MCQ) — spot the FOL statement that is **not** a correct translation.
- **2026 Q48** (MSQ) — which quantifier implications are **not valid**.

> **Why it matters:** two patterns carry almost everything — **“all P are Q” $=\forall x\,(P(x)\to Q(x))$** and **“some P is Q” $=\exists x\,(P(x)\wedge Q(x))$**. Get the $\forall$–$\to$ / $\exists$–$\wedge$ pairing right and the rest is quantifier bookkeeping.

## Part 1 — Theory & Math

### A. Predicates, objects, quantifiers

- A **predicate** $P(x)$ is a property/relation that is true or false of objects (e.g. $\text{IsKing}(x)$, $\text{Loves}(x,y)$).
- **Universal** $\forall x$ (“for all $x$”); **existential** $\exists x$ (“there exists $x$”). Plus constants, variables, and functions.

### B. The two canonical patterns (memorize)

- **“All $P$ are $Q$”** $=\forall x\,(P(x)\to Q(x))$. — $\forall$ pairs with $\to$.
- **“Some $P$ is $Q$”** $=\exists x\,(P(x)\wedge Q(x))$. — $\exists$ pairs with $\wedge$.

**The #1 trap:** writing $\forall x\,(P(x)\wedge Q(x))$ for “all P are Q” — that wrongly says _everything_ is both $P$ and $Q$. Likewise $\exists x\,(P(x)\to Q(x))$ is almost always wrong (it's vacuously satisfied by any non-$P$ object).

### C. Negating quantifiers (quantifier De Morgan)

$$\neg\forall x\,P(x)\equiv\exists x\,\neg P(x),\qquad \neg\exists x\,P(x)\equiv\forall x\,\neg P(x).$$
“Not all are $P$” $=$ “some are not $P$”; “none are $P$” $=$ “all are not $P$.” And $\neg(P\to Q)\equiv P\wedge\neg Q$.

### D. Validity (assuming a non-empty domain)

| Formula                                         | Valid?                                 |
| ----------------------------------------------- | -------------------------------------- |
| $\forall x\,P(x)\to\exists x\,P(x)$             | **Yes** (all $\Rightarrow$ some)       |
| $\exists x\,P(x)\to\forall x\,P(x)$             | **No**                                 |
| $\exists x\,P(x)\leftrightarrow\forall x\,P(x)$ | **No** (only $\Leftarrow$ holds)       |
| $\forall x\,P(x)\to\exists x\,\neg P(x)$        | **No** (if all $P$, none are $\neg P$) |

### E. Quantifier order (mixed quantifiers)

- $\forall x\,\forall y\equiv\forall y\,\forall x$ and $\exists x\,\exists y\equiv\exists y\,\exists x$ (same-type commute).
- **$\forall x\,\exists y \not\equiv \exists y\,\forall x$** — order matters for mixed quantifiers.
  - $\forall x\,\exists y\,\text{Loves}(x,y)$: everyone loves _someone_ ($y$ may depend on $x$).
  - $\exists y\,\forall x\,\text{Loves}(x,y)$: _one_ person is loved by everyone.
  - $\exists y\,\forall x\,\Rightarrow\,\forall x\,\exists y$, but **not** the reverse.

### F. Modeling “all P except R”

“All balls are round except rugby balls” $=$ (non-rugby $\to$ round) **and** (rugby $\to$ not round):
$$\forall b\,(\neg\text{rugby}(b)\to\text{round}(b))\;\wedge\;\forall b\,(\text{rugby}(b)\to\neg\text{round}(b)).$$
Contrapositives give equivalent forms of each conjunct (e.g. $\neg\text{rugby}\to\text{round}\equiv\neg\text{round}\to\text{rugby}$). _(2024 Q54.)_

### G. Traps GATE exploits

1. **$\forall$ with $\to$, $\exists$ with $\wedge$** — the most common error is swapping these.
2. “Each/every $P$ is $Q$” $=\forall x\,(P\to Q)$, **not** $\forall x\,(P\wedge Q)$.
3. $\forall x\,P(x)\to\exists x\,P(x)$ is valid (non-empty domain); the converse and $\forall\Rightarrow\exists\neg$ are not.
4. **$\forall x\,\exists y\not\equiv\exists y\,\forall x$.**
5. Negation flips the quantifier: $\neg\forall=\exists\neg$, $\neg\exists=\forall\neg$.
6. The contrapositive holds **inside** the quantifier.

## Part 2 — How to Solve (Method)

### Translate “all / every / each $P$ are $Q$”

$\forall x\,(P(x)\to Q(x))$. If you see $\forall$ paired with $\wedge$, suspect an error. _(2026 Q14.)_

### Translate “some / there exists $P$ that is $Q$”

$\exists x\,(P(x)\wedge Q(x))$.

### Check FOL validity

To show **not valid**, build a small model (a domain plus a $P$-assignment) that makes it false. Memorize: $\forall\Rightarrow\exists$ valid; $\exists\not\Rightarrow\forall$; $\forall\not\Rightarrow\exists\neg$. _(2026 Q48.)_

### Model “all $P$ except $R$”

Split into (non-$R\to$ property) $\wedge$ ($R\to\neg$ property); rewrite each conjunct with its contrapositive to match the given options (so two different-looking forms can both be correct). _(2024 Q54.)_

### Negate a quantified statement

Push $\neg$ inward, flipping $\forall\leftrightarrow\exists$ and negating the body; use $\neg(P\to Q)\equiv P\wedge\neg Q$.

### Mistakes that cost marks

- $\forall$ with $\wedge$, or $\exists$ with $\to$.
- Swapping the order of **mixed** quantifiers.
- Forgetting the non-empty-domain assumption behind $\forall\Rightarrow\exists$.

## Part 3 — Worked Examples

### Example 1 — Spot the wrong translation _(2026 Q14 · MCQ)_

**Q.** Which statement is **NOT** true? (A) $\forall x\,\forall y\;\text{Classmate}(x,y)\Rightarrow\text{Classmate}(y,x)$ (B) $\forall x\,\text{Likes}(x,\text{Icecream})\Rightarrow\neg\exists x\,\neg\text{Likes}(x,\text{Icecream})$ (C) “Each king is a person” $\equiv\forall x\,\text{IsKing}(x)\wedge\text{IsPerson}(x)$ (D) “All humans are mortal” $\equiv\forall x\,\text{IsHuman}(x)\Rightarrow\text{IsMortal}(x)$.

**Solve.**

- (A) symmetry of “classmate” — a reasonable true statement.
- (B) $\forall x\,\text{Likes}(x,\cdot)\equiv\neg\exists x\,\neg\text{Likes}(x,\cdot)$, so the implication holds — true.
- (C) **Wrong.** “Each king is a person” must be $\forall x\,(\text{IsKing}(x)\Rightarrow\text{IsPerson}(x))$. The $\wedge$ form claims _everything_ is both a king and a person.
- (D) correct — the standard $\forall x\,(P\Rightarrow Q)$ pattern.

**Answer: (C).** _Trap:_ $\forall$ must pair with $\to$, not $\wedge$.

---

### Example 2 — Quantifier validity _(2026 Q48 · MSQ)_

**Q.** Which is/are **NOT** valid in first-order logic? (A) $\forall x\,P(x)\Rightarrow\exists x\,P(x)$ (B) $\exists x\,P(x)\Rightarrow\forall x\,P(x)$ (C) $\exists x\,P(x)\Leftrightarrow\forall x\,P(x)$ (D) $\forall x\,P(x)\Rightarrow\exists x\,\neg P(x)$.

**Solve.**

- (A) **valid** (non-empty domain): if $P$ holds for all, it holds for some.
- (B) **not valid:** “some” does not imply “all” (model: $P$ true for one object, false for another).
- (C) **not valid:** the $\Rightarrow$ direction fails (same counter-model as B).
- (D) **not valid:** if $\forall x\,P(x)$ holds, then $\exists x\,\neg P(x)$ is false — the implication fails.

**Answer: (B), (C), (D).**

---

### Example 3 — “All P except R” _(2024 Q54 · MSQ)_

**Q.** With $\text{game}(b,\text{rugby})$ = “$b$ is used in rugby” and $\text{shape}(b,\text{round})$ = “$b$ is round”:

- $s_1:\forall b\;\neg\text{game}(b,\text{rugby})\to\text{shape}(b,\text{round})$
- $s_2:\forall b\;\neg\text{shape}(b,\text{round})\to\text{game}(b,\text{rugby})$
- $s_3:\forall b\;\text{game}(b,\text{rugby})\to\neg\text{shape}(b,\text{round})$
- $s_4:\forall b\;\text{shape}(b,\text{round})\to\neg\text{game}(b,\text{rugby})$

Which choices represent “All balls are round except balls used in rugby”? (A) $s_1\wedge s_3$ (B) $s_1\wedge s_2$ (C) $s_2\wedge s_3$ (D) $s_3\wedge s_4$.

**Solve.** The assertion has two parts: **non-rugby balls are round** and **rugby balls are not round**.

- $s_1$ = non-rugby $\to$ round (part 1). $s_3$ = rugby $\to$ not round (part 2). So $s_1\wedge s_3$ captures both — **(A) correct.**
- **Contrapositives:** $s_2$ ($\neg\text{round}\to\text{rugby}$) is the contrapositive of $s_1$, so $s_2\equiv s_1$. Likewise $s_4\equiv s_3$.
- Therefore $s_2\wedge s_3\equiv s_1\wedge s_3$ — **(C) also correct.**
- (B) $s_1\wedge s_2\equiv s_1$ alone (misses “rugby $\to$ not round”); (D) $s_3\wedge s_4\equiv s_3$ alone (misses “non-rugby $\to$ round”). Both incomplete.

**Answer: (A) and (C).** _Key insight:_ $s_1\equiv s_2$ and $s_3\equiv s_4$ by contrapositive, so (A) and (C) are the same statement.

---

### Example 4 — Negate a quantified statement _(original · Med)_

**Q.** Write the negation of “Every student passed”: $\forall x\,(\text{Student}(x)\to\text{Passed}(x))$.

**Solve.** Push the negation inward:
$$\neg\forall x\,(\text{Student}(x)\to\text{Passed}(x))\equiv\exists x\,\neg(\text{Student}(x)\to\text{Passed}(x))\equiv\exists x\,(\text{Student}(x)\wedge\neg\text{Passed}(x)).$$

**Answer:** $\exists x\,(\text{Student}(x)\wedge\neg\text{Passed}(x))$ — “there is a student who did not pass.” _Method:_ $\neg\forall=\exists\neg$, and $\neg(P\to Q)=P\wedge\neg Q$.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** “All cats are animals” is
(A) $\forall x\,(\text{Cat}(x)\wedge\text{Animal}(x))$ (B) $\forall x\,(\text{Cat}(x)\to\text{Animal}(x))$ (C) $\exists x\,(\text{Cat}(x)\to\text{Animal}(x))$ (D) $\forall x\,(\text{Animal}(x)\to\text{Cat}(x))$

**Q2. ★ (MCQ)** “Some students are athletes” is
(A) $\forall x\,(\text{Student}(x)\to\text{Athlete}(x))$ (B) $\exists x\,(\text{Student}(x)\wedge\text{Athlete}(x))$ (C) $\exists x\,(\text{Student}(x)\to\text{Athlete}(x))$ (D) $\forall x\,(\text{Student}(x)\wedge\text{Athlete}(x))$

**Q3. ★★ (MCQ)** $\neg\forall x\,P(x)$ is equivalent to
(A) $\forall x\,\neg P(x)$ (B) $\exists x\,\neg P(x)$ (C) $\neg\exists x\,P(x)$ (D) $\exists x\,P(x)$

**Q4. ★★ (MCQ)** $\neg\exists x\,P(x)$ is equivalent to
(A) $\forall x\,P(x)$ (B) $\forall x\,\neg P(x)$ (C) $\exists x\,\neg P(x)$ (D) $\neg\forall x\,P(x)$

**Q5. ★★ (MCQ)** Which is valid (non-empty domain)?
(A) $\exists x\,P(x)\to\forall x\,P(x)$ (B) $\forall x\,P(x)\to\exists x\,P(x)$ (C) $\forall x\,P(x)\to\exists x\,\neg P(x)$ (D) $\exists x\,P(x)\to\forall x\,\neg P(x)$

**Q6. ★★ (MSQ)** Which pairs are logically equivalent?
(A) $\neg\forall x\,P(x)$ and $\exists x\,\neg P(x)$ (B) $\neg\exists x\,P(x)$ and $\forall x\,\neg P(x)$ (C) $\forall x\,\exists y\,L(x,y)$ and $\exists y\,\forall x\,L(x,y)$ (D) $\forall x\,\forall y\,L(x,y)$ and $\forall y\,\forall x\,L(x,y)$

**Q7. ★★ (MCQ)** “Everyone loves someone” is best written
(A) $\exists y\,\forall x\,\text{Loves}(x,y)$ (B) $\forall x\,\exists y\,\text{Loves}(x,y)$ (C) $\forall x\,\forall y\,\text{Loves}(x,y)$ (D) $\exists x\,\exists y\,\text{Loves}(x,y)$

**Q8. ★★ (MCQ)** The negation of $\forall x\,(P(x)\to Q(x))$ is
(A) $\forall x\,(P(x)\wedge\neg Q(x))$ (B) $\exists x\,(P(x)\wedge\neg Q(x))$ (C) $\exists x\,(P(x)\to\neg Q(x))$ (D) $\forall x\,(\neg P(x)\vee Q(x))$

**Q9. ★★★ (MSQ)** Which are valid in FOL (non-empty domain)?
(A) $\forall x\,\forall y\,P(x,y)\to\forall y\,\forall x\,P(x,y)$ (B) $\exists y\,\forall x\,P(x,y)\to\forall x\,\exists y\,P(x,y)$ (C) $\forall x\,\exists y\,P(x,y)\to\exists y\,\forall x\,P(x,y)$ (D) $\exists x\,P(x)\to\neg\forall x\,\neg P(x)$

**Q10. ★★ (MCQ)** “No bird is a mammal” is
(A) $\forall x\,(\text{Bird}(x)\to\neg\text{Mammal}(x))$ (B) $\exists x\,(\text{Bird}(x)\wedge\text{Mammal}(x))$ (C) $\forall x\,(\text{Bird}(x)\wedge\neg\text{Mammal}(x))$ (D) $\neg\forall x\,\text{Bird}(x)$

## Answer Key & Full Solutions

**Q1 — (B) $\forall x\,(\text{Cat}(x)\to\text{Animal}(x))$.** “All P are Q” uses $\forall$ with $\to$.

**Q2 — (B) $\exists x\,(\text{Student}(x)\wedge\text{Athlete}(x))$.** “Some P is Q” uses $\exists$ with $\wedge$.

**Q3 — (B) $\exists x\,\neg P(x)$.** $\neg\forall=\exists\neg$.

**Q4 — (B) $\forall x\,\neg P(x)$.** $\neg\exists=\forall\neg$.

**Q5 — (B) $\forall x\,P(x)\to\exists x\,P(x)$.** All $\Rightarrow$ some (non-empty domain); the others fail.

**Q6 — (A), (B), (D).** Quantifier De Morgan gives (A), (B); same-type quantifiers commute (D). (C) is false: $\forall x\,\exists y\not\equiv\exists y\,\forall x$.

**Q7 — (B) $\forall x\,\exists y\,\text{Loves}(x,y)$.** Each $x$ may love a different $y$.

**Q8 — (B) $\exists x\,(P(x)\wedge\neg Q(x))$.** $\neg\forall=\exists\neg$ and $\neg(P\to Q)=P\wedge\neg Q$.

**Q9 — (A), (B), (D).** (A) $\forall$'s commute; (B) $\exists\forall\Rightarrow\forall\exists$; (D) $\exists x\,P\equiv\neg\forall x\,\neg P$. (C) is **invalid** — $\forall x\,\exists y\not\Rightarrow\exists y\,\forall x$.

**Q10 — (A) $\forall x\,(\text{Bird}(x)\to\neg\text{Mammal}(x))$.** “No P is Q” $=$ “all P are not Q.”

---

### How to read your score

- **8–10:** predicate logic is solid — on to the finale **6.5 Reasoning Under Uncertainty**.
- **6–7:** re-drill the **$\forall$–$\to$ / $\exists$–$\wedge$** patterns (Q1, Q2, Q10) and **quantifier order** (Q6, Q9).
- **≤5:** re-read Part 1 B–E; lock in the two translation patterns, quantifier negation, and $\forall x\,\exists y\not\equiv\exists y\,\forall x$.
