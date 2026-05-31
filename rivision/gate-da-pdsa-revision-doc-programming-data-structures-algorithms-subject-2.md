---
title: "Subject 2: Programming & DSA"
parent: "Revision Docs"
nav_order: 2
---

# GATE DA · PDSA Revision Doc — Programming, Data Structures & Algorithms (Subject 2)

## How to Use & Weightage Map

Condensed revision of **Subject 2** — must-knows, GATE angle, traps per topic. Full detail in **Modules 2.1–2.8**; formula lookup in the **PDSA Cheat Sheet**.

**Weightage:** PDSA is the **#2 subject** (**~18.8%**, $20\to14\to14$ marks) with the **widest subtopic spread** — expect Python output-prediction, recursion tracing, a sort/search comparison, and a graph traversal every year.

| Module | Topic                          |
| ------ | ------------------------------ |
| 2.1    | Python programming & semantics |
| 2.2    | Complexity & recursion         |
| 2.3    | Linear data structures         |
| 2.4    | Trees & hash tables            |
| 2.5    | Searching                      |
| 2.6    | Sorting                        |
| 2.7    | Divide & conquer               |
| 2.8    | Graphs                         |

## 2.1 Python Programming & Semantics

**Must know**

- **Mutable default argument** is created once and persists across calls (`def f(x, acc=[])` accumulates) — classic bug.
- **Lists are mutable, passed by reference;** `append(x)` adds one element, `extend(it)` adds each element of an iterable.
- **Closures capture variables by reference** (late binding).
- **`/` is true (float) division, `//` is floor division.**
- **Simultaneous assignment** `a, b = b, a` evaluates the whole RHS first.

**GATE angle:** output-prediction / “what does this do,” built on a fixed set of gotchas.

**Traps:** mutable-default persistence; reference aliasing; `append` vs `extend`; integer vs true division.

## 2.2 Complexity & Recursion

**Must know**

- Asymptotics: $O$ (upper), $\Omega$ (lower), $\Theta$ (tight).
- **Master theorem** for $T(n)=a\,T(n/b)+f(n)$: compare $f(n)$ with $n^{\log_b a}$.
- Standard: $T(n)=T(n/2)+O(1)\Rightarrow O(\log n)$; $T(n)=2T(n/2)+O(n)\Rightarrow O(n\log n)$; $T(n)=T(n-1)+O(1)\Rightarrow O(n)$.
- **Counting recursive calls** (e.g. $C(n)=1+C(n-1)+C(n-2)$).

**GATE angle:** solve a recurrence to a $\Theta$ class; trace pseudocode; count calls.

**Traps:** identify $a,b,f$ correctly; base cases shift call counts.

## 2.3 Linear Data Structures

**Must know**

- **Stack (LIFO):** push/pop/top $O(1)$; uses: postfix eval, balanced parens, DFS.
- **Queue (FIFO):** $O(1)$; BFS. **Deque:** both ends.
- **Linked list:** insert/delete at a known node $O(1)$; **access $O(n)$**; **reversal** with three pointers, $O(n)$ time / $O(1)$ space.

**GATE angle:** trace a stack/deque sequence to the final state; postfix eval; pointer manipulation.

**Traps:** last assignment wins in traces; linked lists have **no $O(1)$ random access**.

## 2.4 Trees & Hash Tables

**Must know**

- **Traversals:** preorder (NLR), inorder (LNR), postorder (LRN), level-order.
- **Reconstruction:** (preorder + inorder) or (postorder + inorder) rebuild any binary tree; (preorder + postorder) only for **full** trees; inorder alone insufficient.
- **BST** operations $O(h)$.
- **Hash tables:** load factor $\alpha=n/m$; chaining or open addressing (linear probing $h(k,i)=(h(k)+i)\bmod m$).

**GATE angle:** rebuild a tree from two traversals; trace hash insertions with probing.

**Traps:** pre+post needs a full tree; probing wraps mod table size.

## 2.5 Searching

**Must know**

- **Linear search** $O(n)$ (any sequence).
- **Binary search** $O(\log n)$ — needs a **sorted array with $O(1)$ random access**; on a sorted linked list it degrades to $O(n)$.
- Max comparisons $\approx\lfloor\log_2 n\rfloor+1$.

**GATE angle:** count worst-case comparisons; when is binary search valid.

**Traps:** binary search needs **random access** (array) and **sorted** data.

## 2.6 Sorting

**Must know**

| Sort             | Best         | Avg          | Worst        | Stable |
| ---------------- | ------------ | ------------ | ------------ | ------ |
| Bubble/Insertion | $O(n)$\*     | $O(n^2)$     | $O(n^2)$     | yes    |
| Selection        | $O(n^2)$     | $O(n^2)$     | $O(n^2)$     | no     |
| Merge            | $O(n\log n)$ | $O(n\log n)$ | $O(n\log n)$ | yes    |
| Quick            | $O(n\log n)$ | $O(n\log n)$ | $O(n^2)$     | no     |

\*Insertion is $O(n)$ on nearly-sorted input; **insertion swaps $=$ number of inversions.**

- **Quicksort worst case** $O(n^2)$ on already-sorted input with a bad pivot.

**GATE angle:** count comparisons/swaps; compare two sorts on the same array.

**Traps:** quicksort's worst case is the _sorted_ array; selection sort is not stable.

## 2.7 Divide & Conquer

**Must know**

- Paradigm: **divide → conquer (recurse) → combine.**
- Examples: merge sort $2T(n/2)+O(n)=O(n\log n)$; binary search $T(n/2)+O(1)=O(\log n)$; **Karatsuba** $3T(n/2)+O(n)=O(n^{\log_2 3})\approx O(n^{1.585})$.
- **Quicksort recurrences:** worst $T(n)=T(n-1)+O(n)$; average $T(n)=\tfrac1n\sum_{k=0}^{n-1}[T(k)+T(n-k-1)]+O(n)$.

**GATE angle:** match a recurrence to its complexity; average vs worst quicksort form.

**Traps:** distinguish average-case (sum over pivots) from worst-case (single $T(n-1)$).

## 2.8 Graphs

**Must know**

- Representations: **adjacency matrix** $O(V^2)$; **adjacency list** $O(V+E)$.
- **BFS** (queue) — shortest path in **unweighted** graphs; **DFS** (stack/recursion) — topo sort, cycles, connectivity. Both $O(V+E)$.
- **Topological sort:** only DAGs; usually many valid orders.
- **Reachability:** $u$ reachable from $v$ in $G$ $\iff$ $v$ reachable from $u$ in $G^R$.
- Shortest paths: unweighted $\to$ BFS; non-negative $\to$ Dijkstra; negative $\to$ Bellman-Ford.

**GATE angle:** BFS/DFS expansion or discovery counts; valid topological orders; reachability in $G$ vs $G^R$.

**Traps:** BFS shortest path only unweighted; topo sort only DAGs; reachability is directional; traversal order depends on adjacency-list order.

## Traps & Exam Strategy

**Highest-cost traps**

1. Mutable default arguments & list reference aliasing.
2. Binary search needs a **sorted array** (not a linked list).
3. Quicksort worst case is the **already-sorted** input.
4. BFS shortest path only for **unweighted** graphs.
5. Topological sort exists only for **DAGs**.
6. Tree reconstruction: pre+in or post+in always; pre+post only for **full** trees.

**Strategy**

- Broad subject — don't skip any subtopic; marks are spread out.
- **Trace carefully** (Python output, stack states, recursion calls) — most errors are slips.
- Memorize the **sorting/searching complexity table** and **Master-theorem** patterns.

_(Full worked PYQs: Modules 2.1–2.8. Formula lookup: PDSA Cheat Sheet.)_
