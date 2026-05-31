---
title: "4.1 ER & Relational Models"
parent: "Module 4: Databases & Warehousing"
nav_order: 1
---

# GATE DA · DBW Module 4.1 — ER & Relational Models

## Exam Relevance

**Where this sits:** Database & Warehousing $\rightarrow$ *ER & Relational Models* — the data-modeling foundation for everything in this subject.

**Weightage:** DBW is the **fastest-rising subject** ($7 \to 11 \to 18$ marks; $\approx 21\%$ in 2026). ER/relational questions appear directly:
- **2026 Q61** — **ER-to-relational** mapping: minimum number of 3NF relations
- **2025 Q56** — **keys & integrity** (candidate keys, NULLs, entity integrity)
- **2026 Q26** — **referential integrity**: which operation never violates a foreign key

> **Why it matters:** these reward two skills — the **ER-to-relational counting rules** (one table per entity, per multivalued attribute, and per M:N relationship) and the **key / integrity definitions** (PK can't be NULL; FK must match a PK or be NULL). Both are quick, high-yield marks in a subject that is climbing fast.

## Part 1 — Theory & Concepts

### A. The ER model
- **Entity** (rectangle): a real-world object; **entity set** = collection of similar entities.
- **Attributes** (ellipse): **simple**, **composite**, **multivalued** (double ellipse), **derived** (dashed).
- **Relationship** (diamond) between entities, with **cardinality** $1{:}1$, $1{:}N$, or $M{:}N$, and **participation** (total = every entity participates, shown by a double line; partial otherwise).
- **Weak entity**: has no key of its own; identified via an owner entity + a partial key.

### B. The relational model
A **relation** (table) is a set of **tuples** (rows) over **attributes** (columns), each drawing from a **domain**. The **schema** names the relation and its attributes.

### C. Keys
- **Super key:** any attribute set that uniquely identifies a tuple.
- **Candidate key:** a **minimal** super key (no removable attribute).
- **Primary key (PK):** a chosen candidate key — **unique and never NULL**.
- **Foreign key (FK):** an attribute referencing the PK of another (or the same) relation.

### D. Integrity constraints
- **Entity integrity:** no part of a **primary key** may be **NULL**. (Non-PK attributes may be NULL unless declared NOT NULL.)
- **Referential integrity:** every **non-NULL FK** value must match some existing **PK** value in the referenced relation.
- **Operations vs referential integrity** (for FK $S.E \to R.A$):

| Operation | Can it violate the FK? |
|---|---|
| Insert into **parent** $R$ (referenced) | **Never** |
| Delete from **child** $S$ (referencing) | **Never** |
| Delete from **parent** $R$ | **Can** (dangling references) |
| Insert into **child** $S$ | **Can** (new FK value may not exist in $R$) |
| Update a PK in $R$ or an FK in $S$ | **Can** |

### E. ER-to-relational mapping rules (counting tables)
- **Each strong entity** $\rightarrow$ one relation (its attributes; PK = entity key).
- **Each multivalued attribute** $\rightarrow$ a **separate** relation (owner PK + the attribute; composite PK).
- **$1{:}1$** $\rightarrow$ fold into one side via an FK (no new table needed).
- **$1{:}N$** $\rightarrow$ put an FK on the **N-side** (no new table needed).
- **$M{:}N$** $\rightarrow$ a **separate** relation with **both PKs** as a composite key (+ any relationship attributes).
- **Weak entity** $\rightarrow$ relation with the owner's PK + the partial key.

### F. Common traps GATE exploits
1. **Candidate key $=$ minimal super key**; the PK is one chosen candidate key.
2. **Only PK attributes are forbidden from being NULL** (entity integrity); other columns may be NULL.
3. **A foreign key may be NULL** (unless it is part of a PK) and may repeat — so an FK alone is usually **not** a candidate key.
4. **$M{:}N$ always needs a separate relation**; **multivalued attributes always need a separate relation**.
5. **$1{:}N$ needs no extra table** (FK on the N-side); don't over-count.
6. **Total participation** is a constraint — it does **not** reduce the M:N table count.

## Part 2 — How to Solve (Method)

### Counting relations (ER-to-relational)
Add up: **(strong entities)** $+$ **(multivalued attributes)** $+$ **(M:N relationships)**. Then handle $1{:}1$ and $1{:}N$ relationships with **foreign keys** inside existing tables (no extra relations). Weak entities get their own table with owner PK + partial key.

### Identifying keys
- A **candidate key** uniquely identifies tuples and is **minimal** (removing any attribute breaks uniqueness).
- The **PK** is a candidate key with the **no-NULL** guarantee; an attribute that can repeat or be NULL (e.g. a bare FK) is **not** a candidate key.

### Integrity-constraint questions
- **Entity integrity:** is the attribute part of the PK? If yes, it cannot be NULL.
- **Referential integrity:** an operation is unsafe if it can leave an FK pointing to a non-existent PK — i.e. **deleting a referenced parent row** or **inserting a child row with an unmatched FK**.

### Sanity checks
- An $M{:}N$ relationship and each multivalued attribute each add **exactly one** table.
- The referenced (parent) side is safe to **insert** into; the referencing (child) side is safe to **delete** from.
- A relation's PK must be non-NULL and unique across all tuples.

## Part 3 — Worked Examples

All three are real GATE DA questions; E4 is a contrast original.

---

### Example 1 — ER-to-relational, count the 3NF relations *(2026 Q61 · NAT · Med–Hard)*
**Q.** Entities $E_1(A_{11}, A_{12}, A_{13})$ and $E_2(A_{21}, A_{22}, A_{23})$ with $A_{22}$ **multivalued**; PKs $A_{11}$, $A_{21}$. $R_{12}$ is an $M{:}N$ relationship between $E_1, E_2$ with **total** participation on both sides. Minimum number of 3NF relations?

**Solve.** Apply the mapping rules:

| Relation | Attributes | PK |
|---|---|---|
| $E_1$ | $A_{11}, A_{12}, A_{13}$ | $A_{11}$ |
| $E_2$ | $A_{21}, A_{23}$ (exclude $A_{22}$) | $A_{21}$ |
| $A_{22}$ table | $A_{21}, A_{22}$ | $(A_{21}, A_{22})$ |
| $R_{12}$ | $A_{11}, A_{21}$ | $(A_{11}, A_{21})$ |

The multivalued attribute needs its own table, and the $M{:}N$ relationship needs its own table (it cannot merge into either entity without breaking 1NF). Total participation is just a constraint — it doesn't merge tables.

**Answer: 4.** *Method:* entities (2) $+$ multivalued attribute (1) $+$ M:N relationship (1) $=$ 4.

---

### Example 2 — Keys and integrity constraints *(2025 Q56 · MSQ · Med)*
**Q.** `Person(aadhaar PK, name)`; `Customer(name, email PK, phone, aadhaar FK -> Person.aadhaar)`. Which are correct? (A) `aadhaar` is a candidate key in `Customer` (B) `phone` can be NULL in `Customer` (C) `aadhaar` is a candidate key in `Person` (D) `aadhaar` can be NULL in `Person`.

**Solve.**
- (A) In `Customer`, `aadhaar` is only an FK — no UNIQUE/NOT NULL, can repeat or be NULL $\Rightarrow$ **not** a candidate key. **False.**
- (B) `phone` has no NOT NULL constraint $\Rightarrow$ can be NULL. **True.**
- (C) `aadhaar` is the PK of `Person`, and every PK is a candidate key. **True.**
- (D) `aadhaar` is the PK of `Person` $\Rightarrow$ entity integrity forbids NULL. **False.**

**Answer: (B) and (C).** *Method:* a bare FK isn't a candidate key; only PK attributes are NULL-forbidden.

---

### Example 3 — Referential integrity and operations *(2026 Q26 · MCQ · Med)*
**Q.** $R(A,B)$ with PK $A$; $S(E,C)$ with FK $E \to R.A$. Which operation will **never** violate the FK constraint? (A) insert into $r$ (B) delete from $s$ (C) delete from $r$ (D) insert into $s$.

**Solve.** Referential integrity: every non-NULL $E$ in $s$ must exist as an $A$ in $r$.
- (A) **Insert into parent $r$:** enlarges the valid $A$ values — **never** violates.
- (B) **Delete from child $s$:** removes references — also **never** violates.
- (C) **Delete from parent $r$:** a deleted $A$ still referenced by $s$ becomes dangling — **can** violate.
- (D) **Insert into child $s$:** a new $E$ not present in $r.A$ — **can** violate.

**Answer: (A)** is the intended single answer. *Note (transparency):* strictly, **both (A) and (B)** are always safe — the question is arguably flawed, but (A) (inserting into the referenced table) is the canonical intended choice. *Method:* the unsafe operations are deleting a referenced parent row and inserting an unmatched child row.

---

### Example 4 — A 1:N relationship needs no extra table *(original · Med)*
**Q.** Entities `Department(dept_id PK, dname)` and `Employee(emp_id PK, ename)` with a $1{:}N$ relationship "each employee works in one department." How many relations result, and how is the relationship stored?

**Solve.** A $1{:}N$ relationship is captured by a **foreign key on the N-side**: add `dept_id` (FK) to `Employee`. No separate relationship table is needed.
- `Department(dept_id, dname)` and `Employee(emp_id, ename, dept_id)` $\Rightarrow$ **2 relations**.

**Answer: 2 relations.** *Method:* $1{:}N$ $\Rightarrow$ FK on the many-side (contrast: an $M{:}N$ relationship would need a third table).

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** A candidate key is
(A) any super key (B) a minimal super key (C) always a single attribute (D) the same as a foreign key

**Q2. ★★ (MCQ)** The entity integrity constraint states that
(A) every attribute must be unique (B) primary-key attributes cannot be NULL (C) foreign keys must be NULL (D) every table needs a foreign key

**Q3. ★★ (MCQ)** An $M{:}N$ relationship between two entities is mapped to
(A) a foreign key on one side (B) no extra structure (C) a separate relation with both primary keys (D) a single merged table

**Q4. ★★ (NAT)** Two entities are related by a $1{:}N$ relationship (no multivalued attributes). The number of relations in the relational model is __________ .

**Q5. ★★ (MCQ)** A multivalued attribute in an ER model is mapped to
(A) a column in the entity's table (B) a separate relation with the owner's primary key (C) a foreign key (D) nothing

**Q6. ★★ (MCQ)** Which operation can violate referential integrity?
(A) inserting into the referenced (parent) table (B) deleting from the referencing (child) table (C) inserting an unmatched row into the referencing (child) table (D) reading the tables

**Q7. ★★ (MSQ)** Which statements are TRUE?
(A) Every primary key is a candidate key.
(B) A foreign key (not part of a primary key) may be NULL.
(C) A primary-key attribute may be NULL.
(D) A super key need not be minimal.

**Q8. ★ (MCQ)** In an ER diagram, a multivalued attribute is drawn as
(A) a rectangle (B) a diamond (C) a double ellipse (D) a dashed ellipse

**Q9. ★★ (NAT)** An ER model has 3 strong entities and one $M{:}N$ relationship among two of them (no multivalued attributes). The minimum number of relations is __________ .

**Q10. ★★ (MCQ)** Referential integrity requires a non-NULL foreign-key value to
(A) be unique (B) match an existing primary-key value in the referenced relation (C) be NULL (D) equal the primary key of its own table

## Answer Key & Full Solutions

**Q1 — (B) a minimal super key.** Removing any attribute from a candidate key destroys uniqueness.

**Q2 — (B) primary-key attributes cannot be NULL.** That is the entity-integrity rule.

**Q3 — (C) a separate relation with both primary keys.** An $M{:}N$ relationship becomes its own table with a composite key of both PKs.

**Q4 — 2.** Each entity is one relation; the $1{:}N$ link is an FK on the N-side — no extra table. So $2$.

**Q5 — (B) a separate relation with the owner's primary key.** Multivalued attributes can't sit in the entity's table without breaking 1NF.

**Q6 — (C).** Inserting a child row whose FK value has no matching parent PK violates referential integrity. (A) and (B) are always safe; (D) reads nothing.

**Q7 — (A), (B), (D).** (C) is **false** — a primary-key attribute can never be NULL (entity integrity).

**Q8 — (C) a double ellipse.** (Rectangle = entity, diamond = relationship, dashed ellipse = derived attribute.)

**Q9 — 4.** 3 entity relations $+$ 1 relation for the $M{:}N$ relationship $= 4$.

**Q10 — (B) match an existing primary-key value in the referenced relation.** That is the definition of referential integrity (or the FK may be NULL).

---

### How to read your score
- **8–10:** ER and relational modeling are solid — on to Module 4.2 (Relational Algebra & Tuple Calculus).
- **6–7:** re-drill the ER-to-relational counting (Q3, Q4, Q5, Q9) and the integrity rules (Q2, Q6, Q7).
- **≤5:** re-read Part 1 C–E; the key skills are counting relations and the key/integrity definitions.
