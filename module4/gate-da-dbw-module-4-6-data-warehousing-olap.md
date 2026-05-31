---
title: "4.6 Data Warehousing & OLAP"
parent: "Module 4: Databases & Warehousing"
nav_order: 6
---

# GATE DA · DBW Module 4.6 — Data Warehousing & OLAP

## Exam Relevance

**Where this sits:** Database & Warehousing $\rightarrow$ _Data Warehousing & OLAP_ — analytical (read-mostly) databases organized as multidimensional cubes. **OLAP cuboids are a flagged recurring pattern**, and DBW jumped to $\approx 21\%$ in 2026 partly on these.

**Seen in real papers:**

- **2026 Q43** — **counting cuboids** from concept hierarchies ($4^3 = 64$)
- **2026 Q18** — identifying the **OLAP operation** (Country $\to$ State = drill-down)
- (**2025 Q46** — `GROUP BY CUBE`, the SQL face of cuboids, is in Module 4.3)

> **Why it matters:** the headline skill is **cuboid counting** — with each dimension's concept hierarchy contributing $(\text{levels}+1)$ aggregation choices, the total is the **product**. Plus the OLAP-operation vocabulary (roll-up = coarser, drill-down = finer).

## Part 1 — Theory & Concepts

### A. Data warehouse vs OLTP

A **data warehouse** is **subject-oriented, integrated, time-variant, and non-volatile**, built for **OLAP** (analytical, read-mostly, aggregate queries) — unlike **OLTP** (transactional, many small read/writes). Data is loaded via **ETL** (extract, transform, load).

### B. The multidimensional model

- **Facts / measures:** the numeric values analyzed (e.g. Sales Quantity).
- **Dimensions:** the perspectives (e.g. Time, Location, Item).
- **Fact table:** stores measures plus foreign keys to dimension tables; **dimension tables** describe each dimension.

### C. Schemas

```
        Time
          |
  Item -- FACT -- Location   (star: central fact + denormalized dimensions)
          |
        Customer
```

- **Star schema:** central fact table + **denormalized** dimension tables (fast, some redundancy).
- **Snowflake schema:** dimension tables **normalized** into sub-tables (less redundancy, more joins).
- **Fact constellation:** multiple fact tables sharing dimensions.

### D. Data cube & cuboids (the counting result)

A **data cube** over $d$ dimensions is the lattice of all **cuboids** (aggregations at chosen levels). If dimension $i$ has a **concept hierarchy with $L_i$ explicit levels**, it offers $L_i + 1$ aggregation choices (the $L_i$ levels plus the implicit **"all"** apex). Choosing a level **independently** per dimension:

$$N_{\text{cuboids}} = \prod_{i=1}^{d} (L_i + 1).$$

- With **no hierarchy** ($L_i = 1$ each), this is $\prod (1+1) = 2^d$.
- The **apex cuboid** (all "all") is the grand total; the **base cuboid** is the finest-level combination.

### E. Concept hierarchy

Levels of aggregation within a dimension, e.g. Time: **Day $\to$ Month $\to$ Year**; Location: **City $\to$ State $\to$ Country**.

### F. OLAP operations

- **Roll-up:** aggregate to a **coarser** level (climb the hierarchy, e.g. City $\to$ State) or drop a dimension.
- **Drill-down:** go to a **finer** level (descend, e.g. Country $\to$ State).
- **Slice:** fix **one** dimension to a single value (a 2-D sub-cube).
- **Dice:** select a sub-cube by **range-restricting multiple** dimensions.
- **Pivot (rotate):** reorient the cube's axes for presentation.

### G. Common traps GATE exploits

1. **Cuboid count $= \prod (L_i + 1)$** — each dimension contributes its levels **plus one** for "all". ($2^d$ only when every dimension has a single level.)
2. **Roll-up = coarser; drill-down = finer.** Country $\to$ State is **drill-down** (more detail).
3. **Star = denormalized** dimensions; **snowflake = normalized**.
4. **Slice** fixes one dimension; **dice** range-restricts several.
5. **Apex cuboid** is the grand total; **base cuboid** is the most detailed.
6. Don't confuse the **product rule** (independent level choices) with a factorial.

## Part 2 — How to Solve (Method)

### Counting cuboids

1. For each dimension, count its **explicit hierarchy levels** $L_i$, then add 1 for the **"all"** level $\Rightarrow L_i + 1$ choices.
2. **Multiply** across dimensions: $N_{\text{cuboids}} = \prod_i (L_i + 1)$.
3. Special case: no hierarchy $\Rightarrow 2^d$.

### Identifying the OLAP operation

- Granularity gets **coarser** (fewer, bigger groups) $\to$ **roll-up**.
- Granularity gets **finer** (more detail) $\to$ **drill-down**.
- One dimension pinned to a value $\to$ **slice**; several dimensions range-restricted $\to$ **dice**; axes rotated $\to$ **pivot**.

### Schema questions

- **Denormalized** dimensions $\to$ **star**; **normalized** dimension sub-tables $\to$ **snowflake**.

### Sanity checks

- A cuboid count must be a **product of $(L_i+1)$** terms — if you get $2^d$, you've assumed one level per dimension.
- Roll-up reduces the number of cells; drill-down increases it.
- The apex (all-"all") cuboid is a single cell.

## Part 3 — Worked Examples

E1–E2 are real GATE DA questions; E3–E4 are standard originals.

---

### Example 1 — Counting cuboids from concept hierarchies _(2026 Q43 · MCQ · Med)_

**Q.** Three dimensions, each with a 3-level concept hierarchy: Time (Year/Month/Day), Location (Country/State/City), Item (Category/Type/Item). How many data cuboids are possible?
(A) $4^3$ (B) $2^3$ (C) $2!$ (D) $4!$

**Solve.** Each dimension has $3$ explicit levels $+1$ for the "all" aggregate $= 4$ choices. Choosing a level independently per dimension:
$$N_{\text{cuboids}} = 4 \times 4 \times 4 = 4^3 = 64.$$

- (B) $2^3$ assumes 1 level each; (D) $4!$ confuses the product rule with a factorial.

**Answer: (A) $4^3 = 64$.** _Method:_ $\prod (L_i + 1)$ with $L_i = 3$ for all three dimensions.

---

### Example 2 — Which OLAP operation? _(2026 Q18 · MCQ · Easy–Med)_

**Q.** A 3-D cube shows Sales Quantity by (Product Type, Month, Country). To instead view it by (Product Type, Month, **State**), which OLAP operation is performed?
(A) Slicing (B) Dicing (C) Roll-up (D) Drill-down

**Solve.** Location changes from **Country** to **State** — a **finer** level in the hierarchy (more detail). Going finer is **drill-down**. (Roll-up is the reverse; slice/dice restrict values, not granularity.)

**Answer: (D) Drill-down.** _Method:_ coarser $\to$ roll-up, finer $\to$ drill-down.

---

### Example 3 — Cuboid counting variants _(original · Med)_

**Q.** (a) A data cube has 4 dimensions with no concept hierarchies. How many cuboids? (b) A 2-dimension cube where dimension A has 2 levels and B has 3 levels. How many cuboids?

**Solve.**

- (a) No hierarchy $\Rightarrow$ each dimension has $1+1 = 2$ choices $\Rightarrow 2^4 = 16$ cuboids.
- (b) $(2+1)\times(3+1) = 3 \times 4 = 12$ cuboids.

_Method:_ $\prod (L_i + 1)$; the no-hierarchy case is just $2^d$.

---

### Example 4 — Star vs snowflake & OLAP ops _(original · Easy–Med)_

**Q.** (a) A schema has one fact table joined directly to fully **denormalized** dimension tables — star or snowflake? (b) Fixing `Month = 'January'` to view a 2-D slice of a 3-D cube is which operation?

**Solve.**

- (a) Denormalized dimensions joined directly to the fact table $=$ **star schema** (snowflake would normalize the dimensions into sub-tables).
- (b) Pinning **one** dimension to a single value $=$ **slice**.

_Method:_ denormalized $\to$ star; one-dimension-fixed $\to$ slice.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** The OLAP roll-up operation moves the data to a
(A) finer granularity (B) coarser granularity (C) different table (D) random level

**Q2. ★ (MCQ)** Moving from Country to State (more detail) is the OLAP operation
(A) roll-up (B) drill-down (C) slice (D) pivot

**Q3. ★★ (NAT)** A data cube has 3 dimensions, each with no concept hierarchy (a single level). The number of cuboids is \***\*\_\_\*\*** .

**Q4. ★★ (NAT)** Dimension A has 2 levels and dimension B has 3 levels in their concept hierarchies. The number of cuboids in the (A, B) data cube is \***\*\_\_\*\*** .

**Q5. ★★ (MCQ)** A star schema differs from a snowflake schema in that its dimension tables are
(A) normalized (B) denormalized (C) absent (D) fact tables

**Q6. ★★ (MCQ)** The OLAP operation that fixes one dimension to a single value is
(A) roll-up (B) drill-down (C) slice (D) dice

**Q7. ★★ (MSQ)** Which statements are TRUE?
(A) A data warehouse supports OLAP / analytical queries.
(B) A fact table stores measures and foreign keys to dimensions.
(C) Drill-down moves to a coarser level of aggregation.
(D) For $d$ dimensions with one level each, the number of cuboids is $2^d$.

**Q8. ★★ (MCQ)** The apex cuboid of a data cube represents
(A) the most detailed data (B) the grand total (all dimensions aggregated to "all") (C) one dimension only (D) a slice

**Q9. ★★ (NAT)** A data cube has 4 dimensions with no concept hierarchies. The total number of cuboids is \***\*\_\_\*\*** .

**Q10. ★★ (MCQ)** The OLAP operation that rotates the axes of the data cube for presentation is
(A) slice (B) dice (C) pivot (D) roll-up

## Answer Key & Full Solutions

**Q1 — (B) coarser granularity.** Roll-up aggregates up the hierarchy (or drops a dimension).

**Q2 — (B) drill-down.** Country $\to$ State adds detail — a finer level.

**Q3 — 8.** No hierarchy $\Rightarrow$ each dimension has $1+1=2$ choices; $2^3 = 8$.

**Q4 — 12.** $(2+1)\times(3+1) = 3 \times 4 = 12$.

**Q5 — (B) denormalized.** Star schemas keep dimensions in single denormalized tables; snowflakes normalize them.

**Q6 — (C) slice.** Slice fixes one dimension to a value; dice range-restricts several.

**Q7 — (A), (B), (D).** (C) is **false** — drill-down goes to a **finer** level (roll-up is coarser).

**Q8 — (B) the grand total.** The apex aggregates every dimension to "all" — one summary cell.

**Q9 — 16.** $2^4 = 16$ (each dimension contributes 2 choices with no hierarchy).

**Q10 — (C) pivot.** Pivot (rotate) reorients the cube's axes.

---

### How to read your score

- **8–10:** warehousing/OLAP is solid — on to Module 4.7 (Data Transformation), the last DBW module.
- **6–7:** drill the cuboid-count formula $\prod(L_i+1)$ (Q3, Q4, Q9) and roll-up vs drill-down (Q1, Q2, Q7).
- **≤5:** re-read Part 1 D–F; the key skills are cuboid counting and the OLAP-operation vocabulary.
