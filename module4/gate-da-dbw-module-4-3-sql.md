---
title: "4.3 SQL"
parent: "Module 4: Databases & Warehousing"
nav_order: 3
---

# GATE DA · DBW Module 4.3 — SQL

## Exam Relevance

**Where this sits:** Database & Warehousing $\rightarrow$ *SQL* — the practical query language, and one of the **highest-yield** topics in this fast-rising subject.

**Weightage:** DBW is the **fastest-rising subject** ($7 \to 11 \to 18$ marks; $\approx 21\%$ in 2026), and **"SQL nested queries" is a flagged recurring pattern**. Across the three papers:
- **2024 Q31** — a join with a WHERE filter (row count)
- **2025 Q33** — a **nested (scalar) subquery** with MAX
- **2025 Q46** — **GROUP BY CUBE** (OLAP roll-up; count grouping sets)
- **2026 Q51** — **GROUP BY** via a **derived table** (team size)
- **2026 Q60** — a **correlated subquery** with COUNT(*)

> **Why it matters:** these are evaluate-and-count questions. Two habits earn the marks — **evaluate the inner subquery first** (non-correlated) or **per outer row** (correlated), and **watch strict vs non-strict comparisons** ($>$ vs $\ge$).

## Part 1 — Theory & Syntax

### A. Core query
```sql
SELECT [DISTINCT] columns
FROM tables
WHERE row_condition
GROUP BY columns
HAVING group_condition
ORDER BY columns;
```
**WHERE** filters **rows** (before grouping); **HAVING** filters **groups** (after aggregation).

### B. Joins
- **Implicit join:** `FROM A, B WHERE A.x = B.y` (a Cartesian product filtered to matching rows).
- **Explicit:** `A JOIN B ON A.x = B.y`; **outer joins** `LEFT/RIGHT/FULL JOIN` keep unmatched rows (with NULLs).

### C. Aggregation & grouping
- Aggregates: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`. `COUNT(*)` counts rows; `COUNT(col)` ignores NULLs.
- **Every non-aggregated column in `SELECT` must appear in `GROUP BY`.**
- **OLAP extensions:** `GROUP BY CUBE(d_1, \dots, d_k)` produces all **$2^k$** grouping sets; `GROUP BY ROLLUP(d_1, \dots, d_k)` produces **$k+1$** grouping sets (a hierarchy).

### D. Subqueries
- **Non-correlated (scalar) subquery:** independent of the outer query — **evaluated once** (e.g. `WHERE amount > (SELECT MAX(amount) ...)`).
- **Correlated subquery:** references the outer row — **re-evaluated for each outer row** (e.g. `WHERE (SELECT COUNT(*) FROM T B WHERE A.bal < B.bal) >= ...`).
- Predicates: `IN`, `NOT IN`, `EXISTS`, `NOT EXISTS`, `= ANY`, `> ALL`.
- **Derived table:** a subquery in the `FROM` clause (must expose any columns referenced outside it).

### E. Set operations & NULLs
`UNION` (distinct), `UNION ALL`, `INTERSECT`, `EXCEPT`. `NULL` comparisons are *unknown*; aggregates (except `COUNT(*)`) skip NULLs.

### F. Common traps GATE exploits
1. **$>$ vs $\ge$:** a value equal to the threshold does **not** satisfy a strict $>$ (a frequent off-by-one in row counts).
2. **Correlated subqueries** re-run per outer row — trace them row by row.
3. **`GROUP BY CUBE(k)` gives $2^k$ grouping sets**; `ROLLUP(k)` gives $k+1$.
4. **A self-join with an extra `A.id = B.id` predicate** matches each row only with itself (so a count comes out as 1).
5. **A derived table must include** every column the outer query references (else it's an error).
6. **`COUNT(*)` vs `COUNT(col)`** differ when the column has NULLs.

## Part 2 — How to Solve (Method)

### Row-count / output questions
1. **Subqueries first:** evaluate a **non-correlated** subquery once to a constant; for a **correlated** subquery, evaluate it **per outer row**.
2. **Apply joins and WHERE:** keep rows matching the join predicate and filters.
3. **Group and aggregate** (if any); then apply **HAVING**.
4. **Count** the resulting rows; mind **DISTINCT** and **strict vs non-strict** comparisons.

### GROUP BY CUBE / ROLLUP counting
- `CUBE(k attributes)` $\Rightarrow 2^k$ grouping sets; sum the rows each set produces (the full grouping gives the product of distinct-value counts; marginals give the individual counts; the empty set gives 1 grand-total row).

### Choosing among candidate queries (MSQ)
Trace each option on the given instance; reject any that (a) self-join a row only with itself, (b) group by the wrong column, or (c) reference a column a derived table doesn't expose.

### Sanity checks
- A scalar subquery must return a single value; a correlated one changes with the outer row.
- Equality threshold rows are excluded by `>` and included by `>=`.
- `CUBE(2)` $= 4$ grouping sets; for $3\times2$ dimensions that is $6+3+2+1 = 12$ rows.

## Part 3 — Worked Examples

All four are real GATE DA questions.

---

### Example 1 — Join with a filter *(2024 Q31 · NAT · Med)*
**Q.** `Raider(ID, Name, Raids, RaidPoints)`, `Team(City, ID, BidPoints)`. How many rows does this return?
```sql
SELECT * FROM Raider, Team
WHERE Raider.ID = Team.ID AND City = 'Jaipur' AND RaidPoints > 200;
```
Jaipur teams have IDs 2, 1, 6 with RaidPoints 219, 250, 215.

**Solve.** Restrict `Team` to Jaipur $\Rightarrow$ IDs $\{2, 1, 6\}$. Join on equal ID, then keep RaidPoints $> 200$: Arjun(250), Ankush(219), Gopal(215) — **all three** qualify.

**Answer: 3.** *Method:* filter, join on the key, apply the numeric predicate.

---

### Example 2 — Nested scalar subquery *(2025 Q33 · NAT · Med)*
**Q.** On `Loan(loan_number, branch_name, amount)`:
```sql
SELECT L1.loan_number FROM Loan L1
WHERE L1.amount > (SELECT MAX(L2.amount) FROM Loan L2
                   WHERE L2.branch_name = 'SR Nagar');
```
SR Nagar amounts: 40000, 25000, 65000.

**Solve.** Subquery $= \text{MAX} = 65000$ (evaluated once). Outer keeps `amount > 65000`: L11(90000), L23(80000), L25(70000). L19 (exactly 65000) is **excluded** by the strict $>$.

**Answer: 3.** *Method:* evaluate the non-correlated subquery to a constant, then apply the strict comparison.

---

### Example 3 — GROUP BY via a derived table *(2026 Q51 · MSQ · Med–Hard)*
**Q.** `Employee(EmpID PK, TeamID)`. Display each employee's **team size**. Which query is correct? (A) joins `Employee` to a derived table `B = (SELECT TeamID, COUNT(TeamID) AS TeamSize FROM Employee GROUP BY TeamID)` on `TeamID`; (B) self-join with `A.TeamID=B.TeamID AND A.EmpID=B.EmpID`, grouped by `A.EmpID`; (C) subquery grouping by `EmpID`; (D) derived table grouping by `TeamID` **without** selecting `TeamID`.

**Solve.**
- **(A)** B computes per-team counts $\{7{:}2, 8{:}3, 9{:}1\}$; joining on `TeamID` gives each employee their team's size. **Correct.**
- **(B)** the extra `A.EmpID = B.EmpID` makes each row join only with itself $\Rightarrow$ count $= 1$ for everyone. Wrong.
- **(C)** grouping by `EmpID` (the PK) counts 1 row per employee $\Rightarrow$ always 1. Wrong.
- **(D)** the derived table omits `TeamID`, so `B.TeamID` in the `WHERE` is invalid. Wrong.

**Answer: (A).** *Method:* aggregate by `TeamID` in a derived table, then join back to each employee.

---

### Example 4 — Correlated subquery *(2026 Q60 · NAT · Hard)*
**Q.** `Account(AccNo, Balance)` = {A1:5000, A2:5000, A3:10000, A4:15000, A5:18000}.
```sql
SELECT AccNo FROM Account A
WHERE (SELECT COUNT(*) FROM Account B WHERE A.Balance < B.Balance)
   >= (SELECT COUNT(*) FROM Account C WHERE A.Balance > C.Balance);
```

**Solve.** For each row, compare #strictly-higher vs #strictly-lower balances:
| AccNo | Bal | #higher | #lower | $\ge$? |
|---|---|---|---|---|
| A1 | 5000 | 3 | 0 | yes |
| A2 | 5000 | 3 | 0 | yes |
| A3 | 10000 | 2 | 2 | yes |
| A4 | 15000 | 1 | 3 | no |
| A5 | 18000 | 0 | 4 | no |

Satisfied by **A1, A2, A3** (balances at or below the median 10000).

**Answer: 3.** *Method:* a correlated subquery — evaluate the two counts per outer row, then compare.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** In SQL, which clause filters **groups** (after aggregation)?
(A) WHERE (B) HAVING (C) GROUP BY (D) ORDER BY

**Q2. ★★ (MCQ)** A fact table has dimensions $D_1$ (3 values) and $D_2$ (2 values), all combinations present. `GROUP BY CUBE(D1, D2)` returns how many tuples? *(2025 Q46)*
(A) 1 (B) 6 (C) 9 (D) 12

**Q3. ★★ (NAT)** `Employee(id, salary)` = {(1,50),(2,60),(3,70),(4,60)}. How many rows does `SELECT id FROM Employee WHERE salary > (SELECT AVG(salary) FROM Employee)` return?

**Q4. ★★ (MCQ)** A subquery that references a column of the outer query and is re-evaluated for each outer row is called
(A) a scalar subquery (B) a correlated subquery (C) a derived table (D) a view

**Q5. ★★ (NAT)** A table has a `dept` column with values CS, CS, EE, ME, CS, EE. How many groups does `SELECT dept, COUNT(*) FROM T GROUP BY dept` produce?

**Q6. ★★ (MCQ)** `COUNT(*)` and `COUNT(col)` differ when
(A) the table is empty (B) `col` contains NULL values (C) there is a GROUP BY (D) never

**Q7. ★★ (MSQ)** Which statements about SQL are TRUE?
(A) WHERE filters rows; HAVING filters groups.
(B) `GROUP BY CUBE` over $k$ attributes yields $2^k$ grouping sets.
(C) A non-aggregated column in SELECT must appear in GROUP BY.
(D) The predicates `> 100` and `>= 100` always return the same rows.

**Q8. ★★ (NAT)** `Sales(amt)` = {10, 20, 30, 40}. How many rows does `SELECT amt FROM Sales WHERE amt > (SELECT AVG(amt) FROM Sales)` return?

**Q9. ★★ (MCQ)** A derived table (a subquery in the FROM clause) must
(A) be a single column (B) expose every column referenced by the outer query (C) be correlated (D) contain an ORDER BY

**Q10. ★★ (MCQ)** `GROUP BY ROLLUP(D1, D2)` produces how many grouping sets?
(A) 1 (B) 2 (C) 3 (D) 4

## Answer Key & Full Solutions

**Q1 — (B) HAVING.** WHERE applies before grouping; HAVING filters the aggregated groups.

**Q2 — (D) 12.** `CUBE(D1,D2)` has $2^2 = 4$ grouping sets: $(D1,D2)=3{\times}2=6$, $(D1)=3$, $(D2)=2$, $()=1$; total $= 12$.

**Q3 — 1.** AVG $= (50+60+70+60)/4 = 60$; only salary $> 60$ is $70$ (id 3) $\Rightarrow$ 1 row.

**Q4 — (B) a correlated subquery.** It depends on the outer row and is evaluated per row.

**Q5 — 3.** Distinct departments $\{$CS, EE, ME$\}$ $\Rightarrow$ 3 groups.

**Q6 — (B) `col` contains NULLs.** `COUNT(*)` counts all rows; `COUNT(col)` skips NULLs in `col`.

**Q7 — (A), (B), (C).** (D) is **false** — `>` excludes the equal-to-threshold rows that `>=` includes.

**Q8 — 2.** AVG $= 100/4 = 25$; amounts $> 25$ are $30, 40$ $\Rightarrow$ 2 rows.

**Q9 — (B) expose every column referenced by the outer query.** Otherwise the reference is invalid (the 2026 Q51(D) error).

**Q10 — (C) 3.** `ROLLUP(D1,D2)` gives the hierarchy $(D1,D2), (D1), ()$ $= k+1 = 3$ grouping sets.

---

### How to read your score
- **8–10:** SQL is solid — on to Module 4.4 (Functional Dependencies & Normalization).
- **6–7:** re-drill subquery evaluation (Q3, Q8), strict-vs-non-strict (Q7), and CUBE/ROLLUP counts (Q2, Q10).
- **≤5:** re-read Part 1 C–D and re-trace Examples 2 and 4 row by row.
