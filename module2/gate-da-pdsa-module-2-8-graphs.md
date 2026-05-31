---
title: "2.8 Graphs"
parent: "Module 2: Programming & DSA"
nav_order: 8
---

# GATE DA · PDSA Module 2.8 — Graphs

## Exam Relevance

**Where this sits:** Programming, Data Structures & Algorithms $\rightarrow$ _Graphs_ — the final PDSA topic. **Graph traversal (BFS/DFS) is a flagged recurring pattern**, and this is the **most PYQ-dense** PDSA sub-topic.

**Weightage:** PDSA is the **#2 subject** ($18.8\%$). Graph questions in the last three papers:

- **2024 Q44** — **BFS vs DFS** number of states expanded
- **2024 Q51** — valid **topological orderings** of a DAG
- **2025 Q58** — **shortest paths** force certain edges to be absent
- **2025 Q65** — **DFS** discovery count on a structured directed graph
- **2026 Q40** — **reachability** in a graph $G$ vs its reverse $G^R$

**Scope note:** informed/adversarial search (A\*, alpha-beta, minimax — 2024 Q23/Q25, 2025 Q43/Q44, 2026 Q30) belongs to the **Artificial Intelligence** subject and is covered there. **Dijkstra / Bellman-Ford** did not appear in 2024–2026 — know the fundamentals below, but BFS/DFS/topological-sort/reachability are the hot spots.

> **Why it matters:** these are trace-and-reason questions. Master the BFS-queue / DFS-stack mechanics, the topological-sort constraint check, and the $G \leftrightarrow G^R$ reachability rule, and this whole cluster is reliable marks.

> **Connects to:** **2.3 Linear Structures** — BFS uses a queue (FIFO) and DFS uses a stack/recursion; those mechanics are defined there · **6.1 Uninformed Search** — BFS/DFS on a state-space graph is the AI search module's foundation · **2.2 Complexity** — BFS/DFS run in $O(V+E)$; analysed with the tools from that module.

## Part 1 — Theory & Structures

### A. Terminology

A graph $G = (V, E)$: **vertices** $V$, **edges** $E$. **Directed** vs **undirected**; **weighted** vs unweighted. **Degree** (in-degree / out-degree for directed). **Path**, **cycle**, **connected** (undirected) / **strongly connected** (directed). A **DAG** is a directed acyclic graph; a tree is a connected acyclic undirected graph.

### B. Representations

| Representation       | Space      | Edge check $(u,v)?$ | List neighbours of $u$ |
| -------------------- | ---------- | ------------------- | ---------------------- |
| Adjacency **matrix** | $O(V^2)$   | $O(1)$              | $O(V)$                 |
| Adjacency **list**   | $O(V + E)$ | $O(\deg u)$         | $O(\deg u)$            |

Use a **matrix** for dense graphs / fast edge tests; a **list** for sparse graphs (most GATE graphs).

### C. Breadth-First Search (BFS) — a queue

Explore level by level from the source using a **queue**; mark visited on enqueue.

- Time $O(V + E)$ (adjacency list).
- **Finds the shortest path (fewest edges) in an _unweighted_ graph.**

### D. Depth-First Search (DFS) — a stack / recursion

Go as deep as possible, backtrack; uses a **stack** (or recursion).

- Time $O(V + E)$.
- Basis for **topological sort**, **cycle detection**, connectivity, and strongly-connected components.
- **The adjacency-list order determines the traversal order** (2025 Q65).

### E. Topological sort

A linear ordering of a **DAG**'s vertices such that for every edge $u \to v$, $u$ appears **before** $v$. **Only DAGs** have one; usually **many** valid orderings exist. Computed via DFS finish times, or **Kahn's algorithm** (repeatedly output an in-degree-0 vertex and remove it).

### F. Shortest paths

- **Unweighted** $\rightarrow$ **BFS**, $O(V+E)$.
- **Non-negative weights** $\rightarrow$ **Dijkstra**, $O((V+E)\log V)$ with a heap.
- **Negative edges** $\rightarrow$ **Bellman-Ford**, $O(VE)$ (also detects negative cycles).

### G. Reachability and the reverse graph

$G^R$ reverses every edge. **Key rule:** $u$ is reachable from $v$ in $G$ **iff** $v$ is reachable from $u$ in $G^R$. (This is the heart of 2026 Q40.)

### H. Common traps GATE exploits

1. **BFS gives shortest paths only in _unweighted_ graphs** — use Dijkstra for weights.
2. **Topological sort exists only for DAGs**, and usually has multiple valid orders.
3. **Adjacency matrix is $O(V^2)$** — wasteful for sparse graphs.
4. **BFS uses a queue; DFS uses a stack/recursion** — don't swap them.
5. **Traversal order depends on the adjacency-list order** — read whether it's increasing or decreasing.
6. **Reachability is directional:** $v \to u$ in $G$ means $u \to v$ in $G^R$, not the reverse.

## Part 2 — How to Solve (Method)

### BFS / DFS traversal order

- **BFS:** initialise a queue with the source; repeatedly dequeue a vertex, enqueue its **unvisited** neighbours (in the given adjacency order), mark them visited.
- **DFS:** from the current vertex, recurse into the **first unvisited** neighbour (per adjacency order); backtrack when none remain. Watch whether the list is in increasing or decreasing order.

### Topological-sort validity

For each candidate ordering, check **every** edge $u \to v$: does $u$ come before $v$? One violation rejects the ordering. (To _generate_ one: repeatedly remove an in-degree-0 vertex — Kahn's algorithm.)

### Shortest-path reasoning

- For "which edges cannot exist", test each candidate edge: would adding it create a path **shorter** than a stated shortest path? If yes, the edge is absent; if it only **ties** the shortest length, it may exist.

### Counting discovered vertices (DFS)

Trace the **deep spine** first (following the first-tried neighbour repeatedly), then the **backtracking** discoveries. Shortcut: (total vertices) − (those discovered up to and including the marker) = those discovered after it.

### Reachability ($G$ vs $G^R$)

Translate every claim using: path $v \to \dots \to u$ in $G$ $\Leftrightarrow$ path $u \to \dots \to v$ in $G^R$. Then check whether the claim matches a _reachable-from_ or _can-reach_ set.

### Sanity checks

- BFS and DFS both visit exactly the set of vertices **reachable** from the source.
- A DAG with a source (in-degree 0) and sink (out-degree 0) must start/end any topological order at such vertices.
- BFS/DFS run in $O(V+E)$ — if you derive $O(V^2)$ on a sparse list, re-check.

## Part 3 — Worked Examples

E2–E4 are real GATE DA questions; E1 is a standard original.

---

### Example 1 — BFS and DFS traversal order _(original · Easy–Med)_

**Q.** Undirected graph, adjacency lists in alphabetical order:

```
A: B, C      B: A, D      C: A, E
D: B, F      E: C, F      F: D, E
```

Give the BFS and DFS orders starting from A.

**Solve.**

- **BFS** (queue): visit A; enqueue B, C; from B enqueue D; from C enqueue E; from D enqueue F. Order: **A, B, C, D, E, F**.
- **DFS** (recursion, first unvisited neighbour): A $\to$ B $\to$ D $\to$ F $\to$ E $\to$ C. Order: **A, B, D, F, E, C**.

_Method:_ BFS spreads by levels (queue); DFS plunges deep then backtracks (stack).

---

### Example 2 — Valid topological orderings _(2024 Q51 · MSQ · Med)_

**Q.** DAG edges: $P\to Q,\; R\to Q,\; Q\to S,\; Q\to V,\; S\to U,\; V\to T$. Which orderings are valid topological sorts?
(A) P Q R S T U V (B) P R Q V S U T (C) P Q R S V U T (D) P R Q S V T U

**Solve.** The constraints are $P,R$ before $Q$; $Q$ before $S,V$; $S$ before $U$; $V$ before $T$.

- (A): R after Q — violates $R \to Q$. ❌
- (B): P,R,Q,V,S,U,T — all constraints hold. ✅
- (C): R after Q again. ❌
- (D): P,R,Q,S,V,T,U — all constraints hold. ✅

**Answer: (B) and (D).** _Method:_ check each edge's "before" requirement against the ordering.

---

### Example 3 — Shortest paths force absent edges _(2025 Q58 · MSQ · Med–Hard)_

**Q.** Simple unweighted undirected graph. Given: $a\text{-}b\text{-}c\text{-}d$ is a shortest $a\!-\!d$ path; $e\text{-}f\text{-}g\text{-}h$ a shortest $e\!-\!h$ path; $a\text{-}f\text{-}c\text{-}h$ a shortest $a\!-\!h$ path (all length 3). Which are **NOT** edges?
(A) $(b,d)$ (B) $(b,g)$ (C) $(b,h)$ (D) $(e,g)$

**Solve.** An edge that creates a path **shorter** than a stated shortest path cannot exist:

- (A) $(b,d)$: gives $a\text{-}b\text{-}d$ of length 2 $< 3$ — contradicts. **Absent.**
- (B) $(b,g)$: gives $a\text{-}b\text{-}g\text{-}h$ of length 3 — only **ties** the shortest. **May exist.**
- (C) $(b,h)$: gives $a\text{-}b\text{-}h$ of length 2 $< 3$ — contradicts. **Absent.**
- (D) $(e,g)$: gives $e\text{-}g\text{-}h$ of length 2 $< 3$ — contradicts. **Absent.**

**Answer: (A), (C), (D).** _Method:_ a shorter alternative path contradicts "shortest"; a tie does not.

---

### Example 4 — DFS discovery count _(2025 Q65 · NAT · Hard)_

**Q.** Directed graph $V = \{0,1,\dots,100\}$, $E = \{(i,j): 0 < j-i \le 2\}$. Adjacency lists in **decreasing** vertex order; DFS from 0. How many vertices are discovered **after** vertex 50?

**Solve.** Decreasing order means from $i$ the list is $[\,i{+}2,\, i{+}1\,]$, so DFS follows the **$+2$ spine** first: $0 \to 2 \to 4 \to \dots \to 100$. These 51 even vertices are discovered first, so vertex 50 (even) is the **26th** discovery $(0,2,\dots,50)$. Everything else is found during backtracking.

Shortcut: total $= 101$ vertices; discovered up to and including 50 $= 26$; therefore discovered **after** 50 $= 101 - 26 = 75$.

**Answer: 75.** _Method:_ trace the deep spine, then count by (total) − (discovered through the marker).

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** BFS uses which data structure to manage the frontier?
(A) stack (B) queue (C) priority queue (D) hash table

**Q2. ★ (MCQ)** DFS is typically implemented using
(A) a queue (B) a stack / recursion (C) a heap (D) a sorted array

**Q3. ★★ (MCQ)** The space complexity of an adjacency-matrix representation of a graph with $V$ vertices is
(A) $O(V)$ (B) $O(V + E)$ (C) $O(V^2)$ (D) $O(E)$

**Q4. ★★ (MCQ)** BFS finds shortest paths (in number of edges) correctly in
(A) any weighted graph (B) only unweighted graphs (C) only directed graphs (D) only trees

**Q5. ★★ (MCQ)** From start state 1, the successor of $n$ is $\{n{+}1, n{+}2\}$; the goal is 6 (expanded in ascending order, no re-adding). Comparing states expanded to reach goal 6: _(2024 Q44)_
(A) BFS expands more than DFS (B) DFS expands more than BFS (C) equal (D) neither reaches 6

**Q6. ★★★ (MSQ)** $G^R$ reverses all edges of directed graph $G$. Which **must always** be true? _(2026 Q40)_
(A) If $u$ is reachable from $v$ in $G^R$, then $u$ is reachable from $v$ in $G$.
(B) BFS of $G^R$ from $v$ visits the same set as DFS of $G$ from $v$.
(C) The BFS order in $G^R$ is the reverse of the DFS order in $G$.
(D) If $u$ is reachable from $v$ in the DFS of $G$, then $v$ is reachable from $u$ in the BFS of $G^R$.

**Q7. ★★ (MCQ)** A topological ordering exists for
(A) any directed graph (B) any undirected graph (C) only a directed acyclic graph (DAG) (D) only a complete graph

**Q8. ★★ (MCQ)** The time complexity of BFS / DFS on a graph with an adjacency list is
(A) $O(V)$ (B) $O(V + E)$ (C) $O(V^2)$ (D) $O(VE)$

**Q9. ★★ (MCQ)** For single-source shortest paths in a graph with **non-negative** edge weights, the standard algorithm is
(A) BFS (B) Dijkstra (C) Bellman-Ford (D) topological sort

**Q10. ★★ (NAT)** The number of edges in a complete **undirected** graph on 5 vertices is ****\_\_**** .

## Answer Key & Full Solutions

**Q1 — (B) queue.** BFS dequeues vertices in FIFO order to explore level by level.

**Q2 — (B) a stack / recursion.** DFS plunges deep, using the call stack (or an explicit stack).

**Q3 — (C) $O(V^2)$.** A $V \times V$ matrix stores an entry for every possible vertex pair.

**Q4 — (B) only unweighted graphs.** BFS counts edges; with weights, use Dijkstra (or Bellman-Ford).

**Q5 — (B) DFS expands more than BFS.** BFS expands $\{1,2,3,4\}$ (4 states) before generating goal 6; DFS plunges $1,2,3,4,5,6$ (6 states). $6 > 4$.

**Q6 — (D).** Reachability rule: a path $v \to \dots \to u$ in $G$ becomes $u \to \dots \to v$ in $G^R$, so $v$ is reachable from $u$ in $G^R$. (A) reverses the direction wrongly; (B) holds only if $G$ is strongly connected; (C) order is structure-dependent.

**Q7 — (C) only a DAG.** A cycle makes a consistent "before" ordering impossible.

**Q8 — (B) $O(V + E)$.** Each vertex and each edge is processed a constant number of times.

**Q9 — (B) Dijkstra.** Dijkstra handles non-negative weights; Bellman-Ford is for possible negative edges; BFS only for unweighted.

**Q10 — 10.** A complete undirected graph $K_5$ has $\binom{5}{2} = 10$ edges.

---

### How to read your score

- **8–10:** graphs are solid — **that completes all of Subject 2 (Programming, DS & Algorithms)!**
- **6–7:** re-drill BFS/DFS mechanics (Q1, Q2, Q5) and topological sort / reachability (Q6, Q7).
- **≤5:** re-read Part 1 C–G and re-trace Examples 1, 2 and 4 by hand.
