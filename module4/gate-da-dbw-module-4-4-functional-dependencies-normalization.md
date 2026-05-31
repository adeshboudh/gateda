---
title: "4.4 Functional Dependencies & Normalization"
parent: "Module 4: Databases & Warehousing"
nav_order: 4
---

# GATE DA · DBW Module 4.4 — Functional Dependencies & Normalization

## Exam Relevance

**Where this sits:** Database & Warehousing $\rightarrow$ *Functional Dependencies & Normalization* — the theory of good schema design.

**Weightage:** DBW is the **fastest-rising subject** ($7 \to 11 \to 18$ marks). FD/normalization questions appear every year:
- **2024 Q46** — **FD derivation** via attribute closure
- **2025 Q16** — **dependency-preserving** decomposition (which operator runs more often if it isn't)
- **2025 Q57** — **candidate keys + BCNF** check
- **2026 Q17** — **candidate keys** via closure (with an essential attribute)

> **Why it matters:** almost everything here reduces to **computing the attribute closure $X^+$** — it gives you derivable FDs, candidate keys, and normal-form violations. Master that one algorithm and this topic becomes mechanical.

## Part 1 — Theory & Math

### A. Functional dependency
$X \to Y$ means: any two tuples agreeing on $X$ must agree on $Y$. It is **trivial** if $Y \subseteq X$.

### B. Armstrong's axioms (and useful rules)
- **Reflexivity:** $Y \subseteq X \Rightarrow X \to Y$. **Augmentation:** $X \to Y \Rightarrow XZ \to YZ$. **Transitivity:** $X \to Y, Y \to Z \Rightarrow X \to Z$.
- Derived: **Union** ($X\to Y, X\to Z \Rightarrow X\to YZ$), **Decomposition** ($X\to YZ \Rightarrow X\to Y$).

### C. Attribute closure $X^+$ (the master tool)
$X^+$ = all attributes determined by $X$. **Algorithm:** start with $X$; repeatedly, if some FD $A \to B$ has $A \subseteq$ current set, add $B$; stop when nothing changes.
- **An FD $X \to Y$ is derivable iff $Y \subseteq X^+$.**

### D. Keys via closure
- **Superkey:** $X$ with $X^+ = $ all attributes $R$. **Candidate key:** a **minimal** superkey.
- **Essential attributes:** any attribute that appears on the **right side of no FD** must be in **every** candidate key (nothing can derive it). Start candidate-key search from these.

### E. Normal forms (a relation's highest NF is the strictest it satisfies)
Let a **prime** attribute be one that belongs to some candidate key.
- **1NF:** all attribute values are atomic (no repeating groups / multivalued attributes).
- **2NF:** 1NF **and** no **partial dependency** (no non-prime attribute depends on *part* of a candidate key).
- **3NF:** 2NF **and** no **transitive dependency**; equivalently, for every non-trivial FD $X \to Y$, **$X$ is a superkey OR $Y$ is prime**.
- **BCNF:** for every non-trivial FD $X \to Y$, **$X$ is a superkey** (stricter than 3NF — it drops the "$Y$ is prime" escape).

### F. Decomposition
- **Lossless-join:** the common attribute of the two fragments is a **key of at least one** fragment (so the join reconstructs the original exactly).
- **Dependency-preserving:** every FD can be checked within a single fragment. If a decomposition is **not** dependency-preserving, enforcing a cross-fragment FD requires a **join** of fragments on every update. (3NF is always achievable lossless + dependency-preserving; BCNF may not be dependency-preserving.)

### G. Common traps GATE exploits
1. **Candidate key $=$ *minimal* superkey** (not just any superkey).
2. **An attribute on no RHS is in every candidate key.**
3. **BCNF is stricter than 3NF** — an FD $X\to Y$ with $X$ not a superkey but $Y$ prime is OK in 3NF, **not** in BCNF.
4. **A partial dependency violates 2NF**; a **transitive** dependency violates 3NF.
5. **$X\to Y$ derivable $\iff Y \subseteq X^+$** — compute the closure, don't guess.
6. A relation can have **multiple** candidate keys; find them all.

## Part 2 — How to Solve (Method)

### Attribute closure $X^+$
Start with $X$; scan the FD list repeatedly, adding the RHS of any FD whose LHS is already contained; stop when stable. Then $X \to Y$ holds iff $Y \subseteq X^+$.

### Finding candidate keys
1. Mark **essential** attributes (on no RHS) — they're in every key.
2. Take the essential set; if its closure is already $R$, it's the sole candidate key.
3. Otherwise extend by one attribute at a time; any minimal set whose closure $= R$ is a candidate key. Verify minimality (drop each attribute and check the closure shrinks).

### Normal-form check
- Find all candidate keys (hence the **prime** attributes).
- For each FD $X \to Y$: if $X$ is a superkey, it's fine for BCNF/3NF; else check 3NF's "$Y$ prime" escape; a non-prime $Y$ with non-superkey $X$ breaks 3NF (and BCNF).
- The relation's NF is the strictest level with no violation.

### Sanity checks
- $X^+$ always contains $X$ and grows monotonically.
- A candidate key's closure must equal $R$, and removing any attribute must break that.
- BCNF $\subseteq$ 3NF $\subseteq$ 2NF $\subseteq$ 1NF (BCNF is the strongest here).

## Part 3 — Worked Examples

All four are real GATE DA questions.

---

### Example 1 — Candidate keys and BCNF *(2025 Q57 · MSQ · Hard)*
**Q.** $R(ABCDEFG)$ with FDs $A \to BCEF$, $E \to DG$, $BC \to A$. Which are correct? (A) $A$ is the only candidate key (B) $A, BC$ are the candidate keys (C) $A, BC, E$ are the candidate keys (D) $R$ is not in BCNF.

**Solve.**
- $A^+ = \{A,B,C,E,F\} \xrightarrow{E \to DG} \{A,B,C,D,E,F,G\} = R$ — $A$ is a candidate key.
- $BC^+ = \{B,C\} \xrightarrow{BC \to A} \{A,B,C\} \xrightarrow{A \to BCEF} \{A,B,C,E,F\} \xrightarrow{E \to DG} R$ — $BC$ is a candidate key.
- $E^+ = \{E,D,G\} \ne R$ — $E$ is **not** a candidate key. So (A) false, (B) **true**, (C) false.
- **BCNF:** $E \to DG$ has $E^+ \ne R$, so $E$ is **not a superkey** — this FD **violates BCNF**. So (D) **true**.

**Answer: (B) and (D).** *Method:* closures give the candidate keys; a non-superkey LHS breaks BCNF.

---

### Example 2 — Candidate keys with an essential attribute *(2026 Q17 · MCQ · Med)*
**Q.** $R(A,B,C,D,E)$, $F = \{A \to BC,\; CD \to E,\; E \to A\}$. Which are the candidate keys?
(A) AD, ED, CD (B) AD, ED (C) A, E, CD (D) A, CD

**Solve.** **$D$ is on no RHS**, so it must be in every candidate key. Pair $D$ with one more attribute:
- $AD^+ = \{A,D\} \to \{A,B,C,D\} \to \{A,B,C,D,E\} = R$ ✓
- $CD^+ = \{C,D\} \to \{C,D,E\} \to \{A,C,D,E\} \to R$ ✓
- $ED^+ = \{E,D\} \to \{A,D,E\} \to R$ ✓
- $BD^+ = \{B,D\}$ — nothing fires, $\ne R$. No other key.

**Answer: (A) AD, CD, ED.** *Method:* essential attribute $D$ + closure tests on each pairing.

---

### Example 3 — Deriving an FD via closure *(2024 Q46 · Med)*
**Q.** $R(U,V,W,X,Y,Z)$ with FDs $\{U \to V,\; U \to W,\; WX \to Y,\; WX \to Z,\; V \to X\}$. Which can be derived? (A) $VW \to YZ$ (B) $WX \to YZ$ (C) $VW \to U$ (D) $VW \to Y$.

**Solve.**
- $WX^+ = \{W,X\} \to \{W,X,Y,Z\}$ (Union of $WX\to Y$ and $WX\to Z$) $\Rightarrow$ **(B) holds in one step**.
- $VW^+ = \{V,W\} \xrightarrow{V \to X} \{V,W,X\} \xrightarrow{WX \to Y,Z} \{V,W,X,Y,Z\}$. So $Y, Z \subseteq VW^+$ $\Rightarrow$ **(A) $VW\to YZ$ and (D) $VW\to Y$ are also derivable**.
- $U \notin VW^+$ $\Rightarrow$ **(C) is not derivable**.

**Answer:** the official single-correct key is **(B)** (the cleanest one-step derivation), but note **(A) and (D) are equally derivable** — the single-correct framing is arguably loose. *Takeaway:* $X \to Y$ is derivable iff $Y \subseteq X^+$; here $VW^+ = \{V,W,X,Y,Z\}$.

---

### Example 4 — Cost of a non-dependency-preserving decomposition *(2025 Q16 · MCQ · Med)*
**Q.** If a decomposition is **not** dependency-preserving, which operator runs more frequently to maintain the dependencies? (A) Selection (B) Projection (C) Join (D) Set union.

**Solve.** A cross-fragment FD can't be checked inside one fragment; you must **join** the relevant fragments to reconstruct the data and verify the FD on every update.

**Answer: (C) Join.** *Method:* missing dependency preservation $\Rightarrow$ repeated joins to enforce FDs.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** A candidate key is
(A) any super key (B) a minimal super key (C) any single attribute (D) the same as a prime attribute

**Q2. ★★ (NAT)** For $R(A,B,C,D,E)$ with $A \to B$, $B \to C$, the size of $A^+$ (number of attributes) is __________ .

**Q3. ★★ (MCQ)** A relation is in BCNF if, for every non-trivial FD $X \to Y$,
(A) $Y$ is prime (B) $X$ is a superkey (C) $X$ is a single attribute (D) $Y$ is a superkey

**Q4. ★★ (MCQ)** An attribute that appears on the right-hand side of no functional dependency
(A) cannot be in any candidate key (B) must be in every candidate key (C) is always prime by itself (D) makes the relation BCNF

**Q5. ★★ (MSQ)** Which statements are TRUE?
(A) BCNF is stricter than 3NF.
(B) A candidate key is a minimal superkey.
(C) 2NF removes partial dependencies.
(D) Every relation is automatically in BCNF.

**Q6. ★★ (NAT)** For $R(A,B,C)$ with $A \to B$, $B \to A$, $B \to C$, the number of candidate keys is __________ .

**Q7. ★★ (MCQ)** A relation in 3NF but not BCNF must contain a non-trivial FD $X \to Y$ where
(A) $X$ and $Y$ are both superkeys (B) $X$ is not a superkey but $Y$ is prime (C) $Y$ is non-prime and $X$ is a superkey (D) the FD is trivial

**Q8. ★★ (MCQ)** A partial dependency (a non-prime attribute depending on part of a candidate key) violates
(A) 1NF (B) 2NF (C) BCNF only (D) no normal form

**Q9. ★★ (MCQ)** A binary decomposition is lossless-join if the common attribute is
(A) a key of at least one fragment (B) non-prime in both (C) NULL-able (D) absent from both

**Q10. ★★ (MCQ)** The functional dependency $X \to Y$ can be derived from a set $F$ if and only if
(A) $X \subseteq Y$ (B) $Y \subseteq X^+$ (C) $X \subseteq Y^+$ (D) $X^+ = Y^+$

## Answer Key & Full Solutions

**Q1 — (B) a minimal super key.** A candidate key is a superkey from which no attribute can be removed.

**Q2 — 3.** $A^+ = \{A\} \to \{A,B\} \to \{A,B,C\}$; $D, E$ are unreachable. Size $= 3$.

**Q3 — (B) $X$ is a superkey.** BCNF requires the left side of every non-trivial FD to be a superkey.

**Q4 — (B) must be in every candidate key.** Nothing can derive it, so every key must contain it.

**Q5 — (A), (B), (C).** (D) is **false** — a relation is in BCNF only if every FD's LHS is a superkey; not all relations qualify.

**Q6 — 2.** $A^+ = \{A,B,C\} = R$ and $B^+ = \{A,B,C\} = R$; both $A$ and $B$ are candidate keys ($C^+ = \{C\}$). So $2$.

**Q7 — (B).** The 3NF escape allows $X$ non-superkey **if $Y$ is prime**; BCNF disallows it — so this is exactly the 3NF-not-BCNF case.

**Q8 — (B) 2NF.** A partial dependency is the defining 2NF violation.

**Q9 — (A) a key of at least one fragment.** That guarantees the natural join reconstructs the original relation losslessly.

**Q10 — (B) $Y \subseteq X^+$.** $X \to Y$ is derivable exactly when $Y$ lies in the closure of $X$.

---

### How to read your score
- **8–10:** FDs and normalization are solid — on to Module 4.5 (File Organization & Indexing).
- **6–7:** drill the closure algorithm (Q2, Q6, Q10) and the BCNF-vs-3NF distinction (Q3, Q7).
- **≤5:** re-read Part 1 C–E; the master skill is computing $X^+$ — it unlocks keys, derivations, and normal-form checks.
