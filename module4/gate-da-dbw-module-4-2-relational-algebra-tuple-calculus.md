---
title: "4.2 Relational Algebra & Tuple Calculus"
parent: "Module 4: Databases & Warehousing"
nav_order: 2
---

# GATE DA · DBW Module 4.2 — Relational Algebra & Tuple Calculus

## Exam Relevance

**Where this sits:** Database & Warehousing $\rightarrow$ *Relational Algebra & Tuple Calculus* — the formal query languages underlying SQL.

**Weightage:** DBW is the **fastest-rising subject** ($7 \to 11 \to 18$ marks). This topic is **heavily tested** — five questions across the three papers:
- **2024 Q26** — a **set-difference** subset check
- **2025 Q17** — a **join + select** chain (what does it compute?)
- **2025 Q62** — the **division** operator (a "for all" query)
- **2026 Q42** — evaluating a **complex** $\sigma/\pi/\bowtie$ expression on instances
- **2026 Q59** — a **tuple relational calculus** expression

> **Why it matters:** this is one of the most reliable mark sources in DBW. Master the operators (especially **natural join** matching on common attributes and **division** for "all/every" queries), and practice evaluating expressions **inside-out** on small instances.

## Part 1 — Theory & Operators

### A. Relational algebra (procedural)
| Operator | Symbol | Meaning |
|---|---|---|
| Selection | $\sigma_{\text{cond}}(R)$ | **rows** satisfying the condition |
| Projection | $\pi_{\text{attrs}}(R)$ | chosen **columns** (duplicates removed) |
| Union / Intersection / Difference | $\cup,\ \cap,\ \setminus$ | on **union-compatible** relations (same schema) |
| Cartesian product | $R \times S$ | all row pairs |
| Natural join | $R \bowtie S$ | join on **all common attributes**, keep one copy |
| Rename | $\rho$ | rename a relation/attributes |
| Division | $R \div S$ | tuples in $R$ associated with **every** tuple of $S$ |

### B. Key behaviours
- **Natural join** matches on **every same-named attribute**. If the two relations share **no** attribute, $R \bowtie S = R \times S$.
- **Projection is set-based** — it **removes duplicate** rows.
- **Set operations** ($\cup, \cap, \setminus$) require **union compatibility** (identical attribute schemas).
- **Division** answers **"for all"** queries: $\pi_{x}(R) \div S$ returns the $x$-values that appear paired with **every** value in $S$.
- **Subset check:** "every element of $A$ is in $B$" $\iff A \setminus B = \varnothing$.

### C. Tuple relational calculus (TRC) — declarative
$\{\, t \mid P(t) \,\}$: the set of tuples $t$ for which predicate $P$ holds, using $\exists, \forall, \wedge, \vee, \neg$. Example: $\{\, t \mid t \in R \wedge \exists m \in Y\,(m[P] = t[P] \wedge m[S] > 1) \,\}$. **Domain relational calculus (DRC)** uses domain variables: $\{\, \langle x_1, \dots, x_n\rangle \mid P \,\}$.

### D. Expressive power
Relational algebra and **safe** tuple/domain calculus are **equivalent** in expressive power (the basis of relational completeness).

### E. Common traps GATE exploits
1. **Natural join uses common attributes**; no common attribute $\Rightarrow$ Cartesian product (a common trap in evaluation questions).
2. **Division is the "for all" operator** — spot "who is related to *all*..." wording.
3. **Projection removes duplicates** (set semantics) — count distinct rows.
4. **Set operations need identical schemas.**
5. In TRC, a **trivially-satisfied** quantifier (e.g. $\exists z \in X\,(t[P]=z[P])$ for $t \in X$) adds **no** filtering.
6. "Every $A$ is in $B$" uses $A \setminus B = \varnothing$ — with the **union** of the target sets, not the intersection.

## Part 2 — How to Solve (Method)

### Evaluate an expression inside-out
1. Compute the **innermost** $\sigma$ / $\pi$ first; write the intermediate relation.
2. For each **join**, identify the **common attributes**, then combine matching rows; if there are none, it's a Cartesian product.
3. Apply outer $\sigma$ / $\pi$; remember projection **deduplicates**.
4. Count the final tuples.

### Division ("for all")
To compute $\pi_{x}(R) \div S$: for each candidate $x$-value, collect the set of partner values it appears with in $R$; keep $x$ **iff that set contains every value in $S$**.

### Subset / universal checks
"Every name in $T$ appears in $D$ or $F$" $\iff \pi_{name}(T) \setminus \big(\pi_{name}(D) \cup \pi_{name}(F)\big) = \varnothing$ (note the **union**).

### Tuple calculus
Read the predicate, drop trivially-true clauses, and **filter** the base relation by the remaining conditions (handle $\exists$ as "there is a matching tuple").

### Sanity checks
- A natural join's result has the **union of the attribute sets** (common attributes appear once).
- After a projection, the row count is the number of **distinct** rows.
- Division output values must be paired with **all** divisor values — a single missing pairing disqualifies them.

## Part 3 — Worked Examples

E2–E4 are real GATE DA questions; E1 is a foundational original.

---

### Example 1 — Basic select / project / join *(original · Easy–Med)*
**Q.** `Student(sid, name, dept)` = {(1,Amy,CS),(2,Bob,EE),(3,Cay,CS)}; `Enroll(sid, course)` = {(1,DB),(1,AI),(3,DB)}. Evaluate (a) $\sigma_{dept='CS'}(\text{Student})$, (b) $\pi_{name}(\sigma_{dept='CS'}(\text{Student}))$, (c) $\text{Student} \bowtie \text{Enroll}$.

**Solve.**
- (a) $\{(1,\text{Amy},\text{CS}), (3,\text{Cay},\text{CS})\}$.
- (b) $\{\text{Amy}, \text{Cay}\}$.
- (c) natural join on `sid`: $\{(1,\text{Amy},\text{CS},\text{DB}), (1,\text{Amy},\text{CS},\text{AI}), (3,\text{Cay},\text{CS},\text{DB})\}$ — **3 tuples** (sid 2 has no enrollment).

*Method:* $\sigma$ filters rows, $\pi$ keeps columns (deduplicated), $\bowtie$ matches the common attribute `sid`.

---

### Example 2 — Subset check by set difference *(2024 Q26 · MCQ · Med)*
**Q.** Which expression checks that **every** name in `Team` appears in `Defender` or `Forward`?
(A) $\pi_{name}(T) \setminus (\pi_{name}(D) \cap \pi_{name}(F)) = \varnothing$ (B) $(\pi_{name}(D) \cap \pi_{name}(F)) \setminus \pi_{name}(T) = \varnothing$ (C) $\pi_{name}(T) \setminus (\pi_{name}(D) \cup \pi_{name}(F)) = \varnothing$ (D) $(\pi_{name}(D) \cup \pi_{name}(F)) \setminus \pi_{name}(T) = \varnothing$

**Solve.** "Every Team name is in $D$ **or** $F$" means no Team name lies **outside** $D \cup F$: $\pi_{name}(T) \setminus (\pi_{name}(D) \cup \pi_{name}(F)) = \varnothing$.
- (A) uses $\cap$ (a name in only one of $D, F$ would wrongly survive). (B), (D) check the reverse direction.

**Answer: (C).** *Method:* "every $A$ in $B$" $\iff A \setminus B = \varnothing$, with $B$ the **union**.

---

### Example 3 — The division operator *(2025 Q62 · NAT · Hard)*
**Q.** `Loan(loan_num, branch_name, amount)` and `Borrower(customer_name, loan_num)`. Evaluate $\pi_{branch\_name,\,customer\_name}(\text{Loan} \bowtie \text{Borrower}) \div \pi_{branch\_name}(\text{Loan})$. How many tuples result? (Branches: Banjara Hills, Kondapur, SR Nagar, Balanagar.)

**Solve.** The divisor is the set of **4 distinct branches**. The dividend pairs each customer with the branches of their loans. Division keeps customers paired with **all 4** branches:
- Karteek: loans at Banjara Hills (L11), Kondapur (L14), SR Nagar (L22), Balanagar (L23) — **all 4** ✓
- Anand (1 branch), Ankita (1), Gopal (1), Sunil (2) — fail.

**Answer: 1** (only Karteek). *Method:* division $=$ "paired with every divisor value."

---

### Example 4 — Tuple relational calculus *(2026 Q59 · NAT · Med)*
**Q.** $X(P,Q,R) = \{(P1,Q1,R1),(P2,Q2,R2),(P3,Q3,R2)\}$; $Y(P,S) = \{(P1,10),(P1,15),(P2,20),(P3,1)\}$. Evaluate $\{\, t \mid t \in X \wedge \exists z \in X\,(t[P]=z[P]) \wedge \exists m \in Y\,(m[P]=t[P] \wedge m[S] > 1) \,\}$.

**Solve.** The clause $\exists z \in X\,(t[P]=z[P])$ is **always true** (take $z=t$), so it filters nothing. The real condition: there is a $Y$-tuple with the same $P$ and $S > 1$.
- $t[P]=P1$: $Y$ has $(P1,10),(P1,15)$, both $S>1$ — **included**.
- $t[P]=P2$: $Y$ has $(P2,20)$, $S>1$ — **included**.
- $t[P]=P3$: $Y$ has only $(P3,1)$, $S=1 \not> 1$ — **excluded**.

**Answer: 2.** *Method:* drop the trivially-true quantifier; filter $X$ by the meaningful $\exists m \in Y$ predicate.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** The selection operator $\sigma$ and projection operator $\pi$ respectively operate on a relation's
(A) columns, rows (B) rows, columns (C) rows, rows (D) columns, columns

**Q2. ★★ (MCQ)** A natural join $R \bowtie S$ matches tuples on
(A) the first attribute only (B) all attributes (C) all attributes with the same name (D) primary keys only

**Q3. ★★ (MCQ)** The expression $\pi_{owner}(\text{Own} \bowtie \sigma_{color='red'}(\text{Car} \bowtie \sigma_{maker='ABC'}(\text{Make})))$ computes *(2025 Q17)*
(A) owners of a red car, a car by ABC, or a red car by ABC (B) owners of more than one car (C) all owners of a red car made by ABC (D) all red cars made by ABC

**Q4. ★★ (NAT)** $R(A,B) = \{(1,2),(3,4)\}$, $S(B,C) = \{(2,5),(2,6),(4,7)\}$. The number of tuples in $R \bowtie S$ is __________ .

**Q5. ★★ (MCQ)** The relational-algebra division operator $\div$ is used to express
(A) "there exists" queries (B) "for all / every" queries (C) aggregation (D) sorting

**Q6. ★★★ (MCQ)** Evaluate $\Pi_{P,R,S}\big[\sigma_{Q=Q3 \vee R=R2}(X \bowtie Y) \bowtie \sigma_{S>1}(Y \bowtie Z)\big]$ on the 2026 instances of $X,Y,Z$. The result has *(2026 Q42)*
(A) two rows (B) three rows (C) one row (D) zero rows

**Q7. ★★ (MSQ)** Which statements about relational algebra are TRUE?
(A) Projection removes duplicate rows.
(B) Set union/intersection/difference require union-compatible relations.
(C) A natural join requires the relations to share no common attribute.
(D) Division expresses "for all" conditions.

**Q8. ★★ (NAT)** A relation has a `dept` column with values CS, CS, EE, ME, CS. The number of tuples in $\pi_{dept}$ of this relation is __________ .

**Q9. ★★ (MCQ)** Tuple relational calculus is
(A) procedural (specifies the steps) (B) declarative (specifies what to retrieve) (C) only for aggregation (D) less powerful than SQL

**Q10. ★★ (MCQ)** If relations $R$ and $S$ share no common attribute, then $R \bowtie S$ equals
(A) $R \cap S$ (B) $R \setminus S$ (C) $R \times S$ (D) the empty relation

## Answer Key & Full Solutions

**Q1 — (B) rows, columns.** $\sigma$ selects rows; $\pi$ projects columns.

**Q2 — (C) all attributes with the same name.** Natural join equates every common-named attribute and keeps one copy.

**Q3 — (C) all owners of a red car made by ABC.** The chain filters ABC models $\to$ their cars $\to$ red ones $\to$ joins owners $\to$ projects owner.

**Q4 — 3.** Join on $B$: $(1,2)$ matches $(2,5),(2,6)$ $\to$ 2 tuples; $(3,4)$ matches $(4,7)$ $\to$ 1. Total $3$.

**Q5 — (B) "for all / every" queries.** Division returns values associated with every tuple of the divisor.

**Q6 — (D) zero rows.** The left side reduces to $\{(P3,Q3,R2,1)\}$ and the right to $\{(P1,Q1,2,T1),(P1,Q2,5,T1)\}$; their natural join (common $P,Q,S$) has no match ($P3$ vs $P1$), so the result is empty.

**Q7 — (A), (B), (D).** (C) is **false** — a natural join uses the **common** attributes; with none, it degenerates to a Cartesian product.

**Q8 — 3.** $\pi_{dept}$ returns the **distinct** values $\{$CS, EE, ME$\}$ = 3.

**Q9 — (B) declarative.** TRC specifies *what* tuples to retrieve via a predicate, not *how*.

**Q10 — (C) $R \times S$.** With no shared attribute, the natural join becomes the Cartesian product.

---

### How to read your score
- **8–10:** relational algebra/calculus is solid — on to Module 4.3 (SQL).
- **6–7:** re-drill natural join (Q2, Q4, Q10), division (Q5, plus Example 3), and inside-out evaluation (Q6).
- **≤5:** re-read Part 1 A–B and re-work Examples 1–3; this is high-yield in DBW.
