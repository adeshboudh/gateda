---
title: "4.5 File Organization & Indexing"
parent: "Module 4: Databases & Warehousing"
nav_order: 5
---

# GATE DA · DBW Module 4.5 — File Organization & Indexing

## Exam Relevance

**Where this sits:** Database & Warehousing $\rightarrow$ _File Organization & Indexing_ — how data is stored on disk and searched quickly. **B+ tree indexing is a flagged recurring pattern.**

**Weightage:** DBW is the **fastest-rising subject** ($7 \to 11 \to 18$ marks). Indexing is tested directly:

- **2026 Q32** — **B+ tree node capacity**: max pointers in a non-leaf node ($= 195$)
- **2024 Q55** — **index selection**: hash for equality, B+ tree for range
- **2026 Q41** — **B+ tree insertion** with a cascading split

> **Why it matters:** two reliable skills — the **node-capacity inequality** ($n$ pointers and $n-1$ keys must fit in a block) and **hash-vs-B+-tree selection** (equality $\to$ hash, range $\to$ B+ tree). B+ tree insertion/split tracing is the trickier, convention-sensitive part.

## Part 1 — Theory & Math

### A. File organization

Records are stored in disk **blocks/pages**. Layouts: **heap** (unordered, fast insert, slow search), **sorted** (binary search but costly inserts), **hashed** (fast equality lookup).

### B. Indexing basics

An **index** maps a search key to record locations, trading extra space and update cost for faster lookups. Types: **primary** (on the ordering key) vs **secondary**; **dense** (entry per record) vs **sparse** (entry per block); **clustered** vs **unclustered**.

### C. B+ tree (the workhorse index)

A balanced, high-fanout search tree where **all data pointers live in the leaves**, and **leaves are linked** for efficient **range scans**.

```
            [ 13 | 30 ]            (internal: keys route searches)
           /     |     \
     [..]<13  13<=[..]<30  [..]>=30
      leaves (hold keys + data pointers) --- linked --->
```

- An internal node with **$n$ pointers** holds **$n-1$ keys**.
- **Node-capacity inequality** (what fits in a block of size $B$): for a **non-leaf** node with pointer size $p$ and key size $k$,

$$n \cdot p + (n-1) \cdot k \le B.$$

_(Non-leaf nodes hold only **node pointers** and keys — no data-record pointers.)_

- **Search / insert / delete** cost $O(\log_{\text{fanout}} N)$; high fanout $\Rightarrow$ a **shallow** tree $\Rightarrow$ few disk I/Os.
- **Insertion:** add the key to the correct leaf; on **overflow**, **split** the node — a leaf split **copies up** a separating key, an internal split **pushes up** the middle key. Splits can **cascade**; if the **root splits, the tree's height grows** (a new root forms).
- **B+ tree vs B tree:** a B+ tree keeps **all data in the leaves** (internal nodes store only keys) and links the leaves — ideal for range queries.

### D. Hashing

A **hash index** gives **$O(1)$ average equality lookup** (static or dynamic — extendible / linear hashing). It **cannot answer range queries** (the hash scatters ordering). Collision handling (chaining, open addressing) is covered in PDSA Module 2.4.

### E. Hash vs B+ tree (the selection rule)

- **Equality predicate** ($=$) $\to$ **hash** is optimal.
- **Range / ordered predicate** ($<, >, \text{BETWEEN}, \text{ORDER BY}$) $\to$ **B+ tree** (hash is useless here).

### F. Common traps GATE exploits

1. **Non-leaf capacity:** $n$ pointers but only $n-1$ keys — and **no data-record pointers** in non-leaf nodes (2026 Q32).
2. **Hash indexes can't do range queries** — only B+ trees can (2024 Q55).
3. **B+ tree stores all data in leaves**; the linked leaves enable range scans.
4. **A leaf split copies up; an internal split pushes up** — splits cascade and can grow the height.
5. **High fanout is the goal** — it minimizes tree height and disk I/Os.
6. Leaf-node capacity differs from non-leaf (leaves carry **data pointers** + a sibling pointer).

## Part 2 — How to Solve (Method)

### Node-capacity questions

For a **non-leaf** node, the largest fanout $n$ satisfies $n \cdot p + (n-1) \cdot k \le B$ (pointers $+$ keys fit in the block). Solve the inequality and **take the floor**. For a **leaf**, include the **data-record pointers** (and any sibling pointer) instead of child-node pointers.

### Index-selection questions

Classify each predicate: **equality** $\to$ **hash** index; **range / ordering** $\to$ **B+ tree**. Pick the option that matches each predicate to the right index.

### B+ tree insertion / split

1. Route the key down to the correct **leaf**.
2. If the leaf overflows, **split** it and **copy up** a separator to the parent.
3. If the parent overflows, **split** it and **push up** the middle key; repeat upward.
4. If the **root** splits, a **new root** forms and the **height increases**.

### Sanity checks

- Capacity: $n$ should make the block just-barely fit ($\le B$); verify $n+1$ would overflow.
- A query with `>` / `<` / `BETWEEN` must use a B+ tree, never a hash index.
- After enough insertions, a B+ tree's height grows only via **root splits**.

## Part 3 — Worked Examples

E1, E2, E4 are real GATE DA questions; E3 is a clean original.

---

### Example 1 — B+ tree non-leaf node capacity _(2026 Q32 · NAT · Med)_

**Q.** Node size $= 4096$ bytes, node-pointer size $= 10$, search-key size $= 11$, data-record-pointer size $= 12$. Find the **maximum number of node pointers** in a **non-leaf** node.

**Solve.** A non-leaf node with $n$ pointers holds $n-1$ keys (and **no** data-record pointers):
$$n \cdot 10 + (n-1)\cdot 11 \le 4096 \;\Rightarrow\; 21n - 11 \le 4096 \;\Rightarrow\; 21n \le 4107 \;\Rightarrow\; n \le 195.57.$$
Take the floor: $n = 195$.

**Answer: 195.** _Trap:_ the data-record-pointer size (12) is a distractor — those live only in leaves.

---

### Example 2 — Choosing the right index _(2024 Q55 · MCQ · Med)_

**Q.** A query filters `Movie.CustomerRating > 3.4` (range), `Genre.Name = 'Comedy'` (equality), plus two equality join predicates. Which indexing speeds it up best?
(A) B+ tree on all (B) **hash on Genre.Name, B+ tree on the rest** (C) hash on CustomerRating, B+ tree on rest (D) hash on all

**Solve.** `Genre.Name = 'Comedy'` is **equality** $\to$ hash is optimal. `CustomerRating > 3.4` is a **range** $\to$ needs a **B+ tree** (a hash index can't do ranges, ruling out (C) and (D)). (A) works but doesn't exploit hashing on the equality predicate. **(B)** matches each predicate to the right index.

**Answer: (B).** _Method:_ equality $\to$ hash, range $\to$ B+ tree.

---

### Example 3 — A B+ tree leaf split _(original · Med)_

**Q.** A B+ tree holds at most 2 keys per leaf. Starting empty, insert 10, 20, 30. Show the result.

**Solve.**

- Insert 10, 20 $\to$ single leaf `[10, 20]`.
- Insert 30 $\to$ `[10, 20, 30]` overflows (max 2). **Split** (left gets the lower half): `[10, 20]` and `[30]`, and **copy up** the first key of the right node, $30$, into a new root.

```
        [30]
       /    \
  [10,20]   [30]   (leaves, linked)
```

**Result:** root `[30]`; leaves `[10,20]` and `[30]`. _Method:_ overflow $\to$ split $\to$ copy a separator up (creating a root here).

---

### Example 4 — Insertion with a cascading split _(2026 Q41 · MCQ · Hard)_

**Q.** A B+ tree has max 2 keys per leaf and max 3 pointers per non-leaf. Root `[5, 8]` with leaves `[1,5]`, `[7,8]`, `[9,12]`. Insert key 3. What does the root hold afterward?
(A) 5 (B) 8 (C) 3 and 5 (D) 3, 5 and 8

**Solve.** Key 3 routes to the first leaf `[1,5]`, giving `[1,3,5]` — an **overflow** (max 2 keys). The leaf **splits** and copies a separator up to the root. The root, which can hold only 2 keys, now overflows too and **splits**, **pushing its middle key up** to form a **new root** — leaving a **single key** in the root.

**Answer: (A) 5.** _(Note: the exact key that ends up promoted depends on the B+ tree split convention; the net effect here is a height increase with a single-key root. Trace per your textbook's convention.)_ _Method:_ leaf overflow $\to$ split $\to$ cascade $\to$ root split $\to$ new single-key root.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** For an **equality** search, the most efficient index is
(A) a hash index (B) a B+ tree (C) a heap file (D) a sorted file scan

**Q2. ★ (MCQ)** For a **range** query ($x > c$), the appropriate index is
(A) a hash index (B) a B+ tree (C) neither works (D) a bitmap on the key sign

**Q3. ★★ (NAT)** A B+ tree non-leaf node block is 1024 bytes; node-pointer size 8, key size 8. The maximum number of node pointers in a non-leaf node is \***\*\_\_\*\*** .

**Q4. ★★ (MCQ)** In a B+ tree, data-record pointers are stored
(A) in every node (B) only in internal nodes (C) only in leaf nodes (D) in the root only

**Q5. ★★ (MCQ)** A B+ tree internal node with $n$ pointers holds
(A) $n$ keys (B) $n-1$ keys (C) $n+1$ keys (D) $2n$ keys

**Q6. ★★ (MSQ)** Which statements are TRUE?
(A) A hash index supports range queries.
(B) B+ tree leaves are linked to support range scans.
(C) A B+ tree's height increases when the root splits.
(D) A hash index gives $O(1)$ average equality lookup.

**Q7. ★★ (MCQ)** A high fanout in a B+ tree is desirable because it
(A) increases tree height (B) reduces tree height and disk I/Os (C) removes the need for leaves (D) enables range queries on a hash

**Q8. ★★ (NAT)** A B+ tree non-leaf block is 4096 bytes; node-pointer size 8, key size 16. The maximum number of node pointers is \***\*\_\_\*\*** .

**Q9. ★★ (MCQ)** Compared to a B tree, a B+ tree stores all data records (pointers)
(A) in internal nodes (B) in the leaf nodes (C) in the root (D) nowhere

**Q10. ★★ (MCQ)** Inserting a key into a B+ tree leaf that is already full causes
(A) nothing (B) a node split, possibly cascading upward (C) deletion of an old key (D) the tree to become unbalanced

## Answer Key & Full Solutions

**Q1 — (A) a hash index.** Hashing gives $O(1)$ average equality lookup.

**Q2 — (B) a B+ tree.** Range predicates need ordered access; hashing cannot do ranges.

**Q3 — 64.** $8n + 8(n-1) \le 1024 \Rightarrow 16n - 8 \le 1024 \Rightarrow 16n \le 1032 \Rightarrow n \le 64.5 \Rightarrow 64$.

**Q4 — (C) only in leaf nodes.** B+ tree internal nodes store keys and child pointers; data pointers are in the leaves.

**Q5 — (B) $n-1$ keys.** $n$ child pointers are separated by $n-1$ keys.

**Q6 — (B), (C), (D).** (A) is **false** — hash indexes cannot answer range queries.

**Q7 — (B) reduces tree height and disk I/Os.** More children per node means a shallower tree.

**Q8 — 171.** $8n + 16(n-1) \le 4096 \Rightarrow 24n - 16 \le 4096 \Rightarrow 24n \le 4112 \Rightarrow n \le 171.3 \Rightarrow 171$.

**Q9 — (B) in the leaf nodes.** That is the defining feature of a B+ tree (internal nodes hold only keys).

**Q10 — (B) a node split, possibly cascading upward.** Overflow triggers a split that can propagate to the root.

---

### How to read your score

- **8–10:** indexing is solid — on to Module 4.6 (Data Warehousing & OLAP).
- **6–7:** drill the capacity inequality (Q3, Q8) and hash-vs-B+-tree selection (Q1, Q2, Q6).
- **≤5:** re-read Part 1 C–E; the high-value skills are the node-capacity formula and the equality$\to$hash / range$\to$B+ rule.
