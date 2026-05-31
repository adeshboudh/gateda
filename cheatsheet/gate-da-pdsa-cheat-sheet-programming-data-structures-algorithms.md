---
title: "Programming & DSA"
parent: "Cheat Sheets"
nav_order: 2
---

# GATE DA · PDSA Cheat Sheet — Programming, Data Structures & Algorithms

## Python Gotchas

- **Mutable default** `def f(x, a=[])`: `a` persists across calls (created once).
- `append(x)` adds **one** element; `extend(it)` adds each element of `it`.
- Lists/dicts are **mutable & passed by reference** (aliasing).
- **Closures** bind by reference (late binding) — loop closures see the final value.
- `/` true division (float); `//` floor division; `%` modulo.
- `a, b = b, a` evaluates the whole RHS, then assigns.
- Slicing `a[i:j]` is a **copy** (for lists).

## Complexity & Recurrences

- **Master theorem:** $T(n)=a\,T(n/b)+f(n)$, critical exponent $c^*=\log_b a$.
  - $f(n)=O(n^{c}),\,c<c^*\Rightarrow T=\Theta(n^{c^*})$.
  - $f(n)=\Theta(n^{c^*})\Rightarrow T=\Theta(n^{c^*}\log n)$.
  - $f(n)=\Omega(n^{c}),\,c>c^*\Rightarrow T=\Theta(f(n))$.
- Common recurrences:

| Recurrence | Solution |
| --- | --- |
| $T(n)=T(n/2)+O(1)$ | $\Theta(\log n)$ |
| $T(n)=2T(n/2)+O(n)$ | $\Theta(n\log n)$ |
| $T(n)=T(n-1)+O(1)$ | $\Theta(n)$ |
| $T(n)=T(n-1)+O(n)$ | $\Theta(n^2)$ |
| $T(n)=3T(n/2)+O(n)$ | $\Theta(n^{\log_2 3})$ |

## Data Structure Operations

| Structure | Access | Search | Insert | Delete |
| --- | --- | --- | --- | --- |
| Array | $O(1)$ | $O(n)$ | $O(n)$ | $O(n)$ |
| Stack / Queue | — | — | $O(1)$ | $O(1)$ |
| Linked list | $O(n)$ | $O(n)$ | $O(1)$* | $O(1)$* |
| BST (balanced) | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ |
| Hash table (avg) | — | $O(1)$ | $O(1)$ | $O(1)$ |

*at a known node. Stack $=$ LIFO; Queue $=$ FIFO; Deque $=$ both ends.

## Trees & Hashing

- Traversals: **preorder** NLR, **inorder** LNR, **postorder** LRN, **level-order** (BFS).
- **Reconstruct a binary tree:** (pre+in) ✓, (post+in) ✓, (pre+post) only if **full**, (in alone) ✗.
- Binary tree with $n$ nodes: height $h\in[\lceil\log_2(n+1)\rceil-1,\ n-1]$.
- **Hashing:** load factor $\alpha=n/m$; linear probing $h(k,i)=(h(k)+i)\bmod m$; chaining stores lists per bucket.

## Sorting & Searching

| Algorithm | Best | Average | Worst | Space | Stable |
| --- | --- | --- | --- | --- | --- |
| Bubble | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | yes |
| Insertion | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | yes |
| Selection | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | no |
| Merge | $O(n\log n)$ | $O(n\log n)$ | $O(n\log n)$ | $O(n)$ | yes |
| Quick | $O(n\log n)$ | $O(n\log n)$ | $O(n^2)$ | $O(\log n)$ | no |
| Heap | $O(n\log n)$ | $O(n\log n)$ | $O(n\log n)$ | $O(1)$ | no |

- **Insertion-sort swaps $=$ inversions.** Quicksort worst $=$ sorted input + bad pivot.
- **Linear search** $O(n)$; **binary search** $O(\log n)$ on a **sorted array** (random access).

## Graphs

- Storage: adjacency **matrix** $O(V^2)$; **list** $O(V+E)$.
- **BFS / DFS:** $O(V+E)$; BFS uses a queue (shortest path, unweighted), DFS a stack/recursion.
- **Topological sort:** DAG only; via DFS finish times or Kahn's (repeatedly remove in-degree-0).
- **Shortest paths:** unweighted $\to$ BFS $O(V+E)$; non-negative $\to$ Dijkstra $O((V+E)\log V)$; negative $\to$ Bellman-Ford $O(VE)$.
- **Reachability:** $u$ from $v$ in $G$ $\iff$ $v$ from $u$ in $G^R$.
- Complete undirected graph $K_n$: $\binom{n}{2}$ edges.

*(Concept recap: PDSA Revision Doc. Full worked PYQs: Modules 2.1–2.8.)*
