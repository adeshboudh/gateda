---
title: "Databases & Warehousing"
parent: "Cheat Sheets"
nav_order: 4
---

# GATE DA · DBW Cheat Sheet — Database & Warehousing Reference

## ER & Relational Mapping

- **Tables needed** $=$ (1 per strong entity) $+$ (1 per multivalued attribute) $+$ (1 per **M:N** relationship). A **1:N** relationship is captured by a **foreign key** (no extra table).
- **Keys:** super key $\supseteq$ candidate $\supseteq$ primary; foreign key references a key elsewhere.
- **Integrity:** entity (PK $\ne$ null); referential (FK $=$ existing PK or null).

## Relational Algebra & Calculus

- $\sigma_\theta$ select rows; $\pi$ project columns (**dedupe**); $\rho$ rename.
- $\cup,\ \cap,\ -$ (union-compatible); $\times$ Cartesian; $\bowtie$ natural join (on common attrs; **none $\Rightarrow \times$**).
- **Division** $R\div S$: tuples matching **every** tuple of $S$ (“for all”).
- **TRC:** $\{\,t \mid \exists/\forall \dots\,\}$; **DRC** uses domain variables.

## SQL Essentials

- Order: `FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY`.
- Aggregates `COUNT, SUM, AVG, MIN, MAX`; `HAVING` filters groups.
- **Subqueries:** scalar (once); **correlated** (per outer row).
- **`CUBE(k)`** $=2^k$ grouping sets; **`ROLLUP(k)`** $=k+1$.
- `>` strict (excludes boundary); `>=` inclusive; `NULL` comparisons are unknown (use `IS NULL`).

## FDs & Normal Forms

- **Attribute closure $X^+$:** repeatedly add RHS of FDs whose LHS $\subseteq X$. $X$ is a key iff $X^+=$ all attributes. An attribute on **no RHS** is in **every** candidate key.
- **1NF:** atomic values. **2NF:** no partial dependency on part of a candidate key.
- **3NF:** for each FD $X\to Y$, $X$ is a superkey **or** $Y$ is prime.
- **BCNF:** for each FD $X\to Y$, $X$ is a **superkey**.
- **Lossless** decomposition: common attribute is a key of one piece. **3NF** is always dependency-preserving + lossless; **BCNF** may not preserve dependencies.

## Indexing (B+ tree & Hashing)

- **B+ tree:** all data pointers in **leaves** (linked list for range scans); internal nodes route only. Order $n$ from $n\cdot p+(n-1)\cdot k\le B$ (block size $B$, pointer $p$, key $k$).
- Search/insert/delete $O(\log_n N)$; height grows via root split.
- **Hash index:** $O(1)$ **equality** lookup; **cannot** do range queries.
- **Rule:** equality $\to$ hash; range $\to$ B+ tree. Dense (every record) vs sparse (per block) index.

## Warehousing, OLAP & Transformation

- **Star** schema: denormalized dimensions; **snowflake**: normalized.
- **# cuboids** $=\prod_i (L_i+1)$ ($L_i=$ hierarchy levels of dim $i$); **no hierarchy** $\Rightarrow 2^d$.
- **OLAP:** roll-up (coarser), drill-down (finer), slice (fix one dim), dice (range on several), pivot.
- **Transformations:** min-max $\dfrac{x-\min}{\max-\min}$; z-score $\dfrac{x-\mu}{\sigma}$; equal-width bin width $\dfrac{\max-\min}{k}$; sampling / PCA (reduction); lossless vs lossy compression.

_(Concept recap: DBW Revision Doc. Full worked PYQs: Modules 4.1–4.7.)_
