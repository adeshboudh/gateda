---
title: "2.4 Trees & Hash Tables"
parent: "Module 2: Programming & DSA"
nav_order: 4
---

# GATE DA · PDSA Module 2.4 — Trees & Hash Tables

## Exam Relevance

**Where this sits:** Programming, Data Structures & Algorithms $\rightarrow$ *Trees & Hash Tables* — the non-linear and associative structures. **Tree traversals are a flagged recurring pattern.**

**Weightage:** PDSA is the **#2 subject** ($18.8\%$). Tree and hashing questions appear directly:
- **2026 Q25** — reconstruct a tree from **preorder + inorder**, then derive the **postorder**
- **2024 Q28** — which **traversal pairs** uniquely rebuild a *full* binary tree
- **2025 Q18** — **hash table** insertion with **linear probing**

**Scope notes:**
- **B+ trees** (2024 Q55, 2026 Q32, 2026 Q41) are tested too, but as **database indexing** — they belong to the **Database & Warehousing** subject and are covered there.
- 2024 Q52 (H/I/L/N "always true" bounds) is **height-convention-sensitive**; the relationships are taught below, but that specific item is omitted as a graded question.

> **Why it matters:** traversal and reconstruction questions are pure mechanics once you know the orders; hashing questions are short probing traces. Both are reliable marks.

## Part 1 — Theory & Structures

### A. Tree terminology
Root, parent/child, **leaf** (no children), **internal** node (has children), **subtree**. **Depth** of a node = edges from the root; **height** of the tree = edges on the longest root-to-leaf path (so a single node has height $0$). *(Some texts count nodes instead — watch which convention a question uses.)*

### B. Binary tree types & counts (height $h$ = edges)
- **Full** (a.k.a. proper): every node has $0$ or $2$ children $\Rightarrow$ leaves $L = I + 1$ (internal $+1$).
- **Perfect:** all leaves at the same level $\Rightarrow N = 2^{h+1} - 1$ nodes, $2^{h}$ leaves.
- **Complete:** all levels full except possibly the last, filled left-to-right (the heap shape).
- For height $h$: $\;h + 1 \le N \le 2^{h+1} - 1$ (path vs perfect). A tree of $n$ nodes has height $\ge \lceil \log_2(n+1) \rceil - 1$.

### C. Traversals (know all four)
```
        50
       /  \
     30    70
    / \   /  \
   20 40 60  80
```
- **Inorder** (Left, Root, Right) $\rightarrow$ for a **BST gives sorted order**: 20 30 40 50 60 70 80.
- **Preorder** (Root, Left, Right): 50 30 20 40 70 60 80.
- **Postorder** (Left, Right, Root): 20 40 30 60 80 70 50.
- **Level-order** (breadth-first, uses a **queue**): 50 30 70 20 40 60 80.

**Reconstruction:** *preorder + inorder* or *postorder + inorder* uniquely rebuild **any** binary tree. *preorder + postorder* works **only for full** binary trees (otherwise a one-child node is ambiguous). **Inorder alone is never enough.**

### D. Binary search tree (BST)
For every node: all keys in the left subtree $<$ key $<$ all keys in the right subtree. **Inorder $=$ sorted.** Search / insert / delete cost $O(h)$: $O(\log n)$ if balanced, but $O(n)$ if the tree is **skewed** (worst case).

### E. Heaps (priority queues)
A **complete** binary tree with the **heap order**: **min-heap** $\Rightarrow$ parent $\le$ children (root is the minimum); **max-heap** $\Rightarrow$ parent $\ge$ children. **A heap is NOT sorted** — only parent/child order holds.
- **Array form (0-indexed):** node $i$ has children $2i+1$ and $2i+2$, parent $\lfloor (i-1)/2 \rfloor$.
- **insert:** append, then **sift up** — $O(\log n)$. **extract-min/max:** swap root with last, remove, **sift down** — $O(\log n)$. **peek:** $O(1)$. **build-heap:** $O(n)$.

### F. Hash tables
A hash function $h$ maps a key to a bucket index in $\{0, \dots, m-1\}$. **Load factor** $\alpha = n/m$. Collisions are resolved by:
- **Separate chaining:** each bucket holds a linked list; average lookup $O(1 + \alpha)$.
- **Open addressing:** store in the array itself, probing on collision — **linear** $h(x)+i \bmod m$, **quadratic**, or **double hashing**. Linear probing suffers **primary clustering**.
With a good hash and low $\alpha$, expected operations are $O(1)$; worst case $O(n)$.

### G. Common traps GATE exploits
1. **Height convention** (edges vs nodes) — read which the question uses.
2. **Inorder of a BST is sorted** — a fast check / shortcut.
3. **preorder + postorder is insufficient** for a general binary tree (only full).
4. **A heap is not fully sorted** — only the heap-order property holds.
5. **Heap array indices**: $0$-indexed children are $2i+1, 2i+2$ (some books use $1$-indexed $2i, 2i+1$).
6. **BST worst case is $O(n)$** when skewed.
7. **Linear probing clusters**; performance degrades as $\alpha \to 1$.

## Part 2 — How to Solve (Method)

### Traversal questions
- Apply the order **recursively**: inorder = (left, root, right); preorder = (root, left, right); postorder = (left, right, root). Level-order = BFS with a queue.
- For a **BST**, write the inorder instantly — it's the sorted key list.

### Reconstruction (preorder/postorder + inorder)
1. The **root** is the first preorder element (or last postorder element).
2. **Find the root in the inorder** sequence: everything to its left is the left subtree, everything to its right is the right subtree.
3. Split the other traversal by those subtree sizes and **recurse**.
4. Read off the requested traversal from the rebuilt tree.

### Heap operations
- **Insert:** put the new key at the end of the array, then **sift up** (swap with parent while it violates heap order).
- **Extract root:** move the last element to the root, shrink, then **sift down** (swap with the smaller child for a min-heap) until restored.
- Use the index formulas to find parent/children.

### Hashing (probing trace)
1. Compute $h(\text{key})$ for each key in insertion order.
2. If the slot is occupied, **probe** by the scheme (linear: try $h+1, h+2, \dots \bmod m$) until an empty slot.
3. Maintain the table array as you go.

### Sanity checks
- A BST's inorder must come out **strictly increasing**.
- A reconstructed tree must reproduce **both** given traversals.
- A min-heap's root is the global minimum; after extract-min the new root is the next smallest among the children path.

## Part 3 — Worked Examples

E2–E3 are real GATE DA questions; E1 and E4 are standard originals.

---

### Example 1 — BST construction and its three traversals *(original · Easy–Med)*
**Q.** Insert `50, 30, 70, 20, 40, 60, 80` (in this order) into an empty BST. Give the inorder, preorder, and postorder traversals.

**Solve.** The BST is
```
        50
       /  \
     30    70
    / \   /  \
   20 40 60  80
```
- **Inorder** (L,Root,R): `20 30 40 50 60 70 80` (sorted — always, for a BST).
- **Preorder** (Root,L,R): `50 30 20 40 70 60 80`.
- **Postorder** (L,R,Root): `20 40 30 60 80 70 50`.

*Method:* recurse the order definitions; the inorder doubles as a sortedness check.

---

### Example 2 — Reconstruct a tree, then give postorder *(2026 Q25 · MSQ · Med)*
**Q.** Preorder `P Q S E R F G`, Inorder `S Q E P F R G`. Which are TRUE? (A) P is the root (B) postorder is `S E Q F G R P` (C) Q has only one child (D) the left subtree of R contains G.

**Solve.**
- Root = first preorder = **P** $\Rightarrow$ (A) TRUE. Split inorder at P: left `S Q E`, right `F R G`.
- Left subtree: preorder `Q S E` $\Rightarrow$ root Q; inorder `S Q E` $\Rightarrow$ children S (left) and E (right) — Q has **two** children $\Rightarrow$ (C) FALSE.
- Right subtree: preorder `R F G` $\Rightarrow$ root R; inorder `F R G` $\Rightarrow$ F left, G right $\Rightarrow$ G is in R's **right** subtree $\Rightarrow$ (D) FALSE.
```
        P
       / \
      Q   R
     / \ / \
    S  E F  G
```
- Postorder (L,R,Root): `S E Q F G R P` $\Rightarrow$ (B) TRUE.

**Answer: (A) and (B).** *Method:* root from preorder, split via inorder, recurse, then read postorder.

---

### Example 3 — Hashing with linear probing *(2025 Q18 · MCQ · Med)*
**Q.** Hash table of size 10, $h(x) = 3x \bmod 10$, linear probing. Insert `1, 4, 5, 6, 14, 15`. Where do 14 and 15 land?
(A) 2 and 5 (B) 2 and 6 (C) 4 and 5 (D) 4 and 6

**Solve.** Compute $h$ and probe forward on collision:
```
1  -> 3            slot 3 free      -> 3
4  -> 12 mod 10=2  slot 2 free      -> 2
5  -> 15 mod 10=5  slot 5 free      -> 5
6  -> 18 mod 10=8  slot 8 free      -> 8
14 -> 42 mod 10=2  2,3 taken, 4 free-> 4
15 -> 45 mod 10=5  5 taken, 6 free  -> 6
```
**Answer: (D) 4 and 6.** *Method:* on a collision, linear probing tries the next slots $h+1, h+2, \dots \pmod{m}$.

---

### Example 4 — Min-heap insert and extract-min *(original · Med)*
**Q.** Insert `5, 3, 8, 1` into an empty **min-heap** (array form), then perform one **extract-min**.

**Solve (sift up on insert).**
```
insert 5: [5]
insert 3: [5,3] -> 3<5 sift up -> [3,5]
insert 8: [3,5,8]
insert 1: [3,5,8,1] -> 1<parent5 -> [3,1,8,5] -> 1<parent3 -> [1,3,8,5]
```
Heap: `[1, 3, 8, 5]`. **extract-min:** remove root 1, move last (5) up, sift down:
```
[5,3,8] -> smaller child is 3 (<5) -> swap -> [3,5,8]
```
**Result:** extracted `1`; heap becomes `[3, 5, 8]`. *Method:* insert = append + sift up; extract = root out, last to root, sift down — each $O(\log n)$.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** The inorder traversal of a binary search tree yields the keys in
(A) random order (B) sorted ascending order (C) reverse level order (D) insertion order

**Q2. ★★ (MCQ)** For the tree with root A, whose left child B has children D and E, and whose right child is C (a leaf), the **preorder** traversal is
(A) D E B C A (B) A B D E C (C) D B E A C (D) A B C D E

**Q3. ★★ (MSQ)** Which traversal pairs are sufficient to uniquely reconstruct a **full** binary tree? *(2024 Q28)*
(A) preorder + inorder (B) inorder + postorder (C) preorder + postorder (D) inorder only

**Q4. ★★ (NAT)** A full binary tree has 5 internal nodes. The number of leaf nodes is __________ .

**Q5. ★★ (NAT)** The keys `5, 3, 8, 1, 2` are inserted one by one into an initially empty **min-heap**. The key at the root is __________ .

**Q6. ★★ (NAT)** A hash table of size 7 uses $h(x) = x \bmod 7$ with **separate chaining**. After inserting `10, 17, 24`, the number of keys in the chain at bucket 3 is __________ .

**Q7. ★★ (MCQ)** In a $0$-indexed array heap, the children of the node at index $i$ are at indices
(A) $2i, 2i+1$ (B) $2i+1, 2i+2$ (C) $i+1, i+2$ (D) $i/2, i/2+1$

**Q8. ★★ (MSQ)** Which statements are TRUE?
(A) Inorder traversal of a BST yields sorted order.
(B) A binary heap stores its elements in fully sorted order.
(C) Preorder + inorder uniquely reconstruct a binary tree.
(D) Separate chaining resolves collisions using linked lists.

**Q9. ★★ (MCQ)** The worst-case time to search a binary search tree of $n$ nodes is
(A) $O(1)$ (B) $O(\log n)$ (C) $O(n)$ (D) $O(n \log n)$

**Q10. ★★ (NAT)** The maximum number of nodes in a binary tree of height $3$ (height = edges on the longest path) is __________ .

## Answer Key & Full Solutions

**Q1 — (B) sorted ascending order.** By the BST property, Left $<$ Root $<$ Right, so an inorder (L,Root,R) walk visits keys in increasing order.

**Q2 — (B) A B D E C.** Preorder = Root, Left subtree, Right subtree = A, then (B, D, E), then C.

**Q3 — (A), (B), (C).** Preorder+inorder and postorder+inorder rebuild any binary tree; preorder+postorder works here **because the tree is full** (no one-child ambiguity). (D) inorder alone is never sufficient.

**Q4 — 6.** In a full binary tree, leaves $L = I + 1 = 5 + 1 = 6$.

**Q5 — 1.** A min-heap keeps the global minimum at the root; the smallest inserted key is $1$.

**Q6 — 3.** $10 \bmod 7 = 3$, $17 \bmod 7 = 3$, $24 \bmod 7 = 3$ — all three hash to bucket 3, giving a chain of length $3$.

**Q7 — (B) $2i+1, 2i+2$.** Standard $0$-indexed heap layout (parent of $i$ is $\lfloor (i-1)/2 \rfloor$).

**Q8 — (A), (C), (D).** (B) is **false** — a heap satisfies only the parent/child heap-order property, not full sortedness.

**Q9 — (C) $O(n)$.** A skewed (degenerate) BST behaves like a linked list, so search is linear in the worst case.

**Q10 — 15.** A perfect binary tree of height $h$ has $2^{h+1} - 1$ nodes; for $h = 3$, that is $2^4 - 1 = 15$.

---

### How to read your score
- **8–10:** trees and hashing are solid — on to Module 2.5 (Searching).
- **6–7:** re-drill traversal reconstruction (Q3, plus Example 2) and the heap index/operations (Q5, Q7).
- **≤5:** re-read Part 1 C–F; practice writing all four traversals of a small tree until automatic.
