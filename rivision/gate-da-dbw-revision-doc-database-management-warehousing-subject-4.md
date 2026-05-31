---
title: "Subject 4: Databases & Warehousing"
parent: "Revision Docs"
nav_order: 4
---

# GATE DA · DBW Revision Doc — Database Management & Warehousing (Subject 4)

## How to Use & Weightage Map

Condensed revision of **Subject 4** — must-knows, GATE angle, traps. Full detail in **Modules 4.1–4.7**; formula lookup in the **DBW Cheat Sheet**.

**Weightage:** DBW is the **fastest-rising** subject (**~14.1%**, $7\to11\to18$ marks — **~21% in 2026**). Prioritize **SQL**, **FDs/normalization**, **B+ tree indexing**, **relational algebra**, and **OLAP cuboids**.

| Module | Topic                                   |
| ------ | --------------------------------------- |
| 4.1    | ER & relational models                  |
| 4.2    | Relational algebra & tuple calculus     |
| 4.3    | SQL                                     |
| 4.4    | Functional dependencies & normalization |
| 4.5    | File organization & indexing            |
| 4.6    | Data warehousing & OLAP                 |
| 4.7    | Data transformation                     |

## Top 5 PYQ Patterns

The question types that recur most reliably in DBW across GATE DA 2024–2026:

1. **Relational algebra evaluation** — evaluate a $\sigma/\pi/\bowtie$ expression (or a division) on small instances, inside-out; count the result tuples (2025 Q17, 2025 Q62, 2026 Q42, 2026 Q59).
2. **Attribute closure / candidate key** — compute $X^+$ by chasing FDs; test whether a given set is a key; find minimal keys (DBW's single most-tested concept).
3. **CUBE / ROLLUP cuboid count** — $2^d$ for plain CUBE; $d+1$ for ROLLUP; $\prod(L_i+1)$ when dimensions have hierarchy levels (2025 Q11, 2026 Q54).
4. **B+ tree order** — compute order $n$ from the block-size constraint $n\cdot p_{\text{ptr}}+(n-1)\cdot k\le B$; or find minimum height to index $N$ records.
5. **SQL GROUP BY + aggregate** — identify which rows survive `HAVING`; understand that `WHERE` filters before grouping and `HAVING` filters after; correlated subquery vs scalar subquery distinction.

## 4.1 ER & Relational Models

**Must know**

- **ER-to-relational:** 1 table per **strong entity**; **+1 per multivalued attribute**; **+1 per M:N** relationship; a **1:N** relationship uses a **foreign key** (no extra table).
- **Keys:** super key $\supseteq$ candidate key $\supseteq$ primary key; **foreign key** references another relation's key.
- **Integrity:** entity integrity (PK not null), **referential integrity** (FK matches an existing PK or is null).

**GATE angle:** count minimal relations from an ER diagram; key/constraint validity; what violates referential integrity.

**Traps:** total participation doesn't reduce table count; a bare FK isn't a candidate key; multivalued attrs need their own table.

## 4.2 Relational Algebra & Tuple Calculus

**Must know**

- $\sigma$ (select rows), $\pi$ (project columns, **deduplicates**), $\times$, $\cup,\cap,-$, $\bowtie$ (natural join on common attributes — **none $\Rightarrow$ Cartesian product**).
- **Division** $R\div S$ $=$ “for all” (tuples in $R$ matching **every** tuple of $S$).
- **Tuple relational calculus (TRC):** $\{t\mid \text{condition}\}$ with $\exists,\forall$.

**GATE angle:** evaluate an RA expression's result/row count; division (“at all branches”); TRC with quantifiers; subset checks via difference.

**Traps:** $\pi$ removes duplicates; natural join on no common attribute is a Cartesian product; division $=$ universal quantifier.

## 4.3 SQL

**Must know**

- `SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY`; aggregates `COUNT/SUM/AVG/MIN/MAX`.
- **Subqueries:** scalar (runs once), **correlated** (re-runs per outer row).
- **Strict `>` vs `>=`** changes results at the boundary.
- **`GROUP BY CUBE(k)`** $=2^k$ grouping sets; **`ROLLUP(k)`** $=k+1$.

**GATE angle:** count rows from a join+filter; scalar/correlated subquery results; CUBE/ROLLUP grouping-set counts; valid vs invalid grouping.

**Traps:** evaluate the subquery first; `>` excludes the boundary value; `GROUP BY` must include non-aggregated SELECT columns.

## 4.4 Functional Dependencies & Normalization

**Must know**

- **Attribute closure $X^+$** is the master tool: find candidate keys (a key's closure $=$ all attributes); an attribute on **no RHS** is in **every** key.
- **Normal forms:** 1NF (atomic); 2NF (no partial dependency on part of a key); **3NF** (for each FD, LHS is a superkey **or** RHS is prime); **BCNF** (every FD's LHS is a superkey).
- **Decomposition:** lossless-join (common attribute is a key of one piece); dependency-preserving (3NF achievable; BCNF may not preserve).

**GATE angle:** find candidate keys via closure; identify the highest normal form / BCNF violation; lossless vs dependency-preserving.

**Traps:** an attribute not on any RHS must be in every key; BCNF can fail dependency preservation; check **all** FDs.

## 4.5 File Organization & Indexing

**Must know**

- **B+ tree:** all data in **leaves** (linked for range scans); internal nodes only route. Node capacity from $n\cdot p+(n-1)\cdot k\le B$ (block size).
- **Index choice:** **hash** for **equality**, **B+ tree** for **range** (hash can't do ranges).
- Dense vs sparse index; clustered vs unclustered.
- Insert overflow $\Rightarrow$ split; splits cascade upward; a root split grows the height.

**GATE angle:** max node pointers/keys from a block-size inequality; pick the index for a query; B+ tree insertion/split behaviour.

**Traps:** non-leaf nodes hold no data pointers; hash indexes can't serve range queries; splits can cascade to a new root.

## 4.6 Data Warehousing & OLAP

**Must know**

- **Star schema** (denormalized dimensions) vs **snowflake** (normalized).
- **Number of cuboids** $=\prod_i (L_i+1)$ where $L_i$ is the number of hierarchy levels of dimension $i$ (each $+1$ for “all”); with **no hierarchy** it's $2^d$ for $d$ dimensions.
- **OLAP ops:** **roll-up** (coarser), **drill-down** (finer), **slice** (fix one dimension), **dice** (range on several), **pivot**.

**GATE angle:** count cuboids from hierarchy depths; classify an OLAP operation (roll-up vs drill-down); star vs snowflake.

**Traps:** include the “all” level ($L_i+1$); roll-up $=$ less detail, drill-down $=$ more detail.

## 4.7 Data Transformation

**Must know**

- **Min-max** to $[0,1]$: $x'=\dfrac{x-\min}{\max-\min}$. **Z-score:** $x'=\dfrac{x-\mu}{\sigma}$.
- **Discretization:** equal-**width** bins (width $=\dfrac{\max-\min}{k}$) vs equal-**frequency** (equal counts).
- **Sampling** (numerosity reduction), **dimensionality reduction** (PCA), **aggregation**, **compression** (lossless vs lossy).

**GATE angle:** apply min-max/z-score; equal-width bin width; identify the technique (sampling/discretization/reduction).

**Traps:** min-max uses min/max, z-score uses mean/SD; lossy compression isn't reversible. _(z-score 2024 Q27 also in Module 1.8.)_

## Traps & Exam Strategy

**Highest-cost traps**

1. **ER-to-relational:** +1 table per multivalued attr and per M:N; 1:N uses an FK.
2. **$\pi$ deduplicates**; natural join on no common attribute $=$ Cartesian product; **division $=$ for-all**.
3. **SQL:** evaluate subqueries first; `>` excludes the boundary; **CUBE$(k)=2^k$**, **ROLLUP$(k)=k+1$**.
4. **Closure $X^+$** finds keys; an attribute on no RHS is in every key; **BCNF $=$ LHS superkey**.
5. **Hash for equality, B+ tree for range**; B+ data only in leaves.
6. **Cuboids $=\prod(L_i+1)$**; roll-up vs drill-down direction.

**Strategy**

- DBW is **rising fast** — invest heavily, especially **SQL** and **normalization** (the highest-yield).
- Practice **attribute closure** until candidate-key finding is automatic.
- Drill **B+ tree** node-capacity and **OLAP cuboid** counting formulas.

_(Full worked PYQs: Modules 4.1–4.7. Formula lookup: DBW Cheat Sheet.)_
