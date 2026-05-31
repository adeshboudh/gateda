---
title: "6.3 Propositional Logic"
parent: "Module 6: Artificial Intelligence"
nav_order: 3
---

# GATE DA · AI Module 6.3 — Propositional Logic

## Exam Relevance

**Where this sits:** Artificial Intelligence $\rightarrow$ _Propositional Logic_. Module **3 of 5** in Subject 6.

**Weightage:** logic is **~7 of the 17 AI PYQs** (propositional + first-order); propositional logic alone supplies 4 of them. These are pure-reasoning questions — no figures, fast to solve once the equivalences are automatic. Directly tested PYQs:

- **2024 Q29** (MSQ) — identify which implications are **tautologies**.
- **2025 Q15** (MCQ) — which two statements are **logically equivalent**.
- **2026 Q24** (MSQ) — what **entailment** ($X$ entails $Y$) means.
- **2026 Q38** (MCQ) — translate a scenario into the correct **formula**.

> **Why it matters:** one equivalence — $p\to q \equiv \neg p\vee q$ — plus the _falsify-it_ trick for tautologies handles almost everything. These are quick marks with no diagrams to decode.

## Part 1 — Theory & Math

### A. Connectives & the implication truth table

$\neg$ (NOT), $\wedge$ (AND), $\vee$ (OR), $\to$ (implication), $\leftrightarrow$ (biconditional).

- **$p\to q$ is FALSE only when $p=\text{T}, q=\text{F}$** (true in all other cases — including vacuously when $p=\text{F}$).
- **$p\leftrightarrow q$** is TRUE exactly when $p$ and $q$ share the same truth value.

### B. Key equivalences (memorize)

- **Implication:** $p\to q \equiv \neg p \vee q$.
- **Contrapositive (equivalent):** $p\to q \equiv \neg q \to \neg p$.
- **Converse $q\to p$ and inverse $\neg p\to\neg q$ are NOT equivalent** to $p\to q$.
- **De Morgan:** $\neg(p\wedge q)\equiv \neg p\vee\neg q$; $\neg(p\vee q)\equiv \neg p\wedge\neg q$.
- **Biconditional:** $p\leftrightarrow q \equiv (p\to q)\wedge(q\to p) \equiv (p\wedge q)\vee(\neg p\wedge\neg q)$.
- Double negation, commutativity, associativity, distributivity.

### C. Tautology / contradiction / contingency

- **Tautology:** true under **every** assignment (e.g. $p\vee\neg p$).
- **Contradiction:** false under every assignment ($p\wedge\neg p$).
- **Contingency:** true for some assignments, false for others.
- A formula with $n$ distinct variables has a $2^n$-row truth table.

### D. Logical equivalence ($\equiv$)

$P\equiv Q$ iff they have identical truth tables iff $P\leftrightarrow Q$ is a tautology.

### E. Entailment & validity

$X$ **entails** $Y$ (written $X\models Y$) iff every model of $X$ is also a model of $Y$:
$$X\models Y \iff (X\to Y)\text{ is valid (a tautology)} \iff (X\wedge\neg Y)\text{ is unsatisfiable}.$$
Entailment is **one-directional** — it does **not** give $Y\to X$.

### F. Translating scenarios (English $\to$ formula)

- “$A$ **if** $B$” $=B\to A$. “$A$ **only if** $B$” $=A\to B$. “$A$ **if and only if** $B$” $=A\leftrightarrow B$.
- “$A$ **unless** $B$” $=\neg B\to A \equiv A\vee B$.
- “All $P$ are $Q$” (propositional gloss) $=P\to Q$.

### G. Traps GATE exploits

1. $p\to q\equiv\neg p\vee q$ — the workhorse.
2. **Converse/inverse are not equivalent** to the original; the **contrapositive is**.
3. To **disprove** a tautology, find **one** falsifying assignment.
4. Implication is **vacuously true** when the antecedent is false.
5. “$A$ only if $B$” $=A\to B$ (not $B\to A$); “$A$ if $B$” $=B\to A$.
6. A biconditional needs **both** directions to hold.

## Part 2 — How to Solve (Method)

### Tautology check (for an implication $A\Rightarrow B$)

**Try to falsify it:** assume $A=\text{T}$ and $B=\text{F}$ and see whether that's consistent. If it's impossible, the formula is a **tautology**; if some assignment works, it's not. _(2024 Q29.)_

### Logical equivalence

Convert every implication to $\neg p\vee q$ form and compare, or build the truth tables. _(2025 Q15: $p\to q\equiv\neg p\vee q$.)_

### Entailment

$X\models Y \iff X\to Y$ valid $\iff X\wedge\neg Y$ unsatisfiable $\iff$ “whenever $X$, then $Y$.” The converse $Y\to X$ does **not** follow. _(2026 Q24.)_

### Scenario modeling

Translate the English to connectives, then test each candidate formula by **truth table** or **algebraic simplification** (simplify $\vee/\wedge$, use $p\to q\equiv\neg p\vee q$). Watch for formulas that secretly reduce to a constant or over-constrain a case. _(2026 Q38.)_

### Mistakes that cost marks

- Confusing the **converse** with the original implication.
- Treating one-directional **entailment** as a biconditional.
- Mis-translating **“only if”** vs **“if.”**

## Part 3 — Worked Examples

### Example 1 — Logical equivalence _(2025 Q15 · MCQ)_

**Q.** $S_1: p\to q$, $S_2:\neg p\wedge q$, $S_3:\neg p\vee q$, $S_4:\neg p\vee\neg q$. Which is correct? (A) $S_1\equiv S_3$ (B) $S_2\equiv S_3$ (C) $S_2\equiv S_4$ (D) $S_1\equiv S_4$.

**Solve.** The core equivalence: $p\to q\equiv\neg p\vee q$, which is exactly $S_3$. So $S_1\equiv S_3$. ($S_2=\neg p\wedge q$ and $S_4=\neg p\vee\neg q$ match neither.)

**Answer: (A) $S_1\equiv S_3$.**

---

### Example 2 — Which are tautologies? _(2024 Q29 · MSQ)_

**Q.** Which is/are tautologies? (A) $(\neg x\wedge y)\Rightarrow(y\Rightarrow x)$ (B) $(x\wedge\neg y)\Rightarrow(\neg x\Rightarrow y)$ (C) $(\neg x\wedge y)\Rightarrow(\neg x\Rightarrow y)$ (D) $(x\wedge\neg y)\Rightarrow(y\Rightarrow x)$.

**Solve** (try to falsify each — antecedent T, consequent F):

- **(A)** antecedent $\neg x\wedge y$ is T at $x{=}\text{F},y{=}\text{T}$; there the consequent $y\Rightarrow x = \text{T}\Rightarrow\text{F}=\text{F}$. Falsified $\Rightarrow$ **not a tautology.**
- **(B)** antecedent $x\wedge\neg y$ is T only at $x{=}\text{T},y{=}\text{F}$; consequent $\neg x\Rightarrow y = \text{F}\Rightarrow\text{F}=\text{T}$. Can't falsify $\Rightarrow$ **tautology.**
- **(C)** antecedent T at $x{=}\text{F},y{=}\text{T}$; consequent $\neg x\Rightarrow y = \text{T}\Rightarrow\text{T}=\text{T}$. **Tautology.**
- **(D)** antecedent T at $x{=}\text{T},y{=}\text{F}$; consequent $y\Rightarrow x = \text{F}\Rightarrow\text{T}=\text{T}$. **Tautology.**

**Answer: (B), (C), (D).**

---

### Example 3 — Meaning of entailment _(2026 Q24 · MSQ)_

**Q.** Sentence $X$ entails $Y$ (whenever $X$ is true, $Y$ must be true). Which is/are correct? (A) $X\Rightarrow Y$ (B) $X\wedge\neg Y$ is FALSE (C) if $X$ then $Y$ (D) if $Y$ then $X$.

**Solve.** Entailment $X\models Y$ means $X\to Y$ is valid.

- (A) $X\Rightarrow Y$ — the definition. **True.**
- (B) $X\wedge\neg Y$ has no model (you can't have $X$ true with $Y$ false). **True.**
- (C) “if $X$ then $Y$” $=X\to Y$. **True.**
- (D) “if $Y$ then $X$” is the **converse** — not implied. **False.**

**Answer: (A), (B), (C).**

---

### Example 4 — Model the scenario _(2026 Q38 · MCQ)_

**Q.** A Creative ($C$) person will Succeed ($S$) if also Disciplined ($D$), but will not succeed otherwise. Consider (i) $C\wedge S\Leftrightarrow D$; (ii) $C\Rightarrow(S\Leftrightarrow D)$; (iii) $C\Leftrightarrow((D\Rightarrow S)\vee\neg S)$. Which option is correct? (A) both (i),(ii) (B) only (ii) (C) both (ii),(iii) (D) only (iii).

**Solve.** The scenario says: _for a creative person_, $S\leftrightarrow D$ — i.e. $C\Rightarrow(S\leftrightarrow D)$, which is exactly **(ii). True.**

- **(i)** $C\wedge S\Leftrightarrow D$: for a non-creative person ($C{=}\text{F}$) the left side is F, forcing $D{=}\text{F}$ — an unwarranted constraint the scenario never states. **Not a valid representation.**
- **(iii)** simplify the inner part: $(D\Rightarrow S)\vee\neg S=(\neg D\vee S)\vee\neg S=\neg D\vee\text{T}=\text{T}$. So (iii) becomes $C\Leftrightarrow\text{T}$, i.e. just $C$ — asserting _everyone is creative_. **Wrong.**

**Answer: (B) only (ii).** _Trap:_ (iii) collapses to a constant; (i) over-constrains the non-creative case.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** $p\to q$ is logically equivalent to
(A) $p\wedge\neg q$ (B) $\neg p\vee q$ (C) $\neg p\wedge q$ (D) $p\vee\neg q$

**Q2. ★ (MCQ)** Which is a tautology?
(A) $p\wedge\neg p$ (B) $p\vee\neg p$ (C) $p\to\neg p$ (D) $p\leftrightarrow\neg p$

**Q3. ★★ (MCQ)** The contrapositive of $p\to q$ is
(A) $q\to p$ (B) $\neg p\to\neg q$ (C) $\neg q\to\neg p$ (D) $\neg p\vee\neg q$

**Q4. ★★ (MCQ)** $p\to q$ is FALSE only when
(A) $p{=}\text{T},q{=}\text{T}$ (B) $p{=}\text{T},q{=}\text{F}$ (C) $p{=}\text{F},q{=}\text{T}$ (D) $p{=}\text{F},q{=}\text{F}$

**Q5. ★★ (MSQ)** Which are equivalent to $p\to q$?
(A) $\neg p\vee q$ (B) $\neg q\to\neg p$ (C) $\neg(p\wedge\neg q)$ (D) $q\to p$

**Q6. ★★ (MCQ)** “$X$ entails $Y$” means
(A) $Y\to X$ is valid (B) $X\to Y$ is valid (C) $X\leftrightarrow Y$ (D) $X$ and $Y$ are contradictory

**Q7. ★★ (NAT)** A propositional formula with $4$ distinct variables has \***\*\_\_\*\*** rows in its truth table.

**Q8. ★★ (MCQ)** “You may enter only if you have a ticket.” With $E=$ enter, $T=$ ticket, this is
(A) $T\to E$ (B) $E\to T$ (C) $E\leftrightarrow T$ (D) $\neg E\to T$

**Q9. ★★★ (MSQ)** Which are tautologies?
(A) $(p\wedge q)\to p$ (B) $p\to(p\vee q)$ (C) $(p\to q)\to(q\to p)$ (D) $((p\to q)\wedge p)\to q$

**Q10. ★★ (MCQ)** The negation of $(p\wedge q)$ is
(A) $\neg p\wedge\neg q$ (B) $\neg p\vee\neg q$ (C) $p\vee q$ (D) $\neg p\to q$

## Answer Key & Full Solutions

**Q1 — (B) $\neg p\vee q$.** The defining equivalence of implication.

**Q2 — (B) $p\vee\neg p$.** Law of excluded middle — always true.

**Q3 — (C) $\neg q\to\neg p$.** The contrapositive (logically equivalent to $p\to q$).

**Q4 — (B) $p{=}\text{T},q{=}\text{F}$.** The only row where an implication is false.

**Q5 — (A), (B), (C).** $\neg p\vee q$ (definition), $\neg q\to\neg p$ (contrapositive), and $\neg(p\wedge\neg q)$ (De Morgan of $\neg p\vee q$) all equal $p\to q$. (D) $q\to p$ is the converse — not equivalent.

**Q6 — (B) $X\to Y$ is valid.** Entailment $=$ the implication is a tautology.

**Q7 — 16.** $2^4=16$ rows.

**Q8 — (B) $E\to T$.** “$A$ only if $B$” translates to $A\to B$: entering requires a ticket.

**Q9 — (A), (B), (D).** (A) simplification, (B) addition, (D) modus ponens — all tautologies. (C) fails at $p{=}\text{F},q{=}\text{T}$: $(p\to q)=\text{T}$ but $(q\to p)=\text{F}$, giving $\text{T}\to\text{F}=\text{F}$.

**Q10 — (B) $\neg p\vee\neg q$.** De Morgan's law.

---

### How to read your score

- **8–10:** propositional logic is solid — on to **6.4 First-Order / Predicate Logic**.
- **6–7:** re-drill the **falsify-it tautology check** (Q9) and **equivalences** (Q1, Q3, Q5).
- **≤5:** re-read Part 1 B–E; lock in $p\to q\equiv\neg p\vee q$, the contrapositive, and the meaning of entailment.
