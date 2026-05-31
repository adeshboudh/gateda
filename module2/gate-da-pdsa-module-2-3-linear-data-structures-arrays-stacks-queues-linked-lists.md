---
title: "2.3 Linear Data Structures"
parent: "Module 2: Programming & DSA"
nav_order: 3
---

# GATE DA · PDSA Module 2.3 — Linear Data Structures (Arrays, Stacks, Queues, Linked Lists)

## Exam Relevance

**Where this sits:** Programming, Data Structures & Algorithms $\rightarrow$ *Linear Data Structures* — the arrays, stacks, queues, and linked lists that the rest of the subject is built on (a stack runs recursion and DFS; a queue runs BFS).

**Weightage:** PDSA is the **#2 subject** ($18.8\%$). Linear-structure **operation-trace** questions appear directly:
- **2024 Q32** — a **deque** operation trace (find the final value of a variable)
- (2025 Q64 — a stack-simulation question, but with a *disputed* official answer, so it's omitted here as a teaching example)

**Also note:** stacks and queues reappear as the engines of later modules — the **call stack** (recursion, 2.2), **DFS** (stack) and **BFS** (queue) in graphs (2.8).

> **Why it matters:** these questions are pure *bookkeeping* — trace the structure carefully and the marks are yours. The recurring trap is mixing up **LIFO (stack)** with **FIFO (queue)**, and forgetting that a linked list has **no $O(1)$ random access**.

## Part 1 — Theory & Structures

### A. Array
Contiguous memory; element $i$ is reached by address arithmetic.
- **Access $a[i]$: $O(1)$** (random access — the array's superpower).
- **Insert/delete in the middle or front: $O(n)$** (shifting). At the end of a dynamic array: amortized $O(1)$.

### B. Stack — LIFO (Last In, First Out)
Add/remove only at the **top**.
```
 top -> | 8 |   <- push/pop here
        | 3 |
        | 5 |
        +---+
```
- `push`, `pop`, `peek`: all **$O(1)$**.
- **Applications:** function **call stack**, balanced-parenthesis checking, infix$\rightarrow$postfix and **postfix evaluation**, undo, **DFS**.

### C. Queue — FIFO (First In, First Out)
Insert at the **rear**, remove from the **front**.
```
 front -> 10  20  30 <- rear     (dequeue at front, enqueue at rear)
```
- `enqueue`, `dequeue`: **$O(1)$**.
- A **circular queue** reuses vacated front slots (via modular indices) so operations stay $O(1)$ without shifting.
- **Applications:** **BFS**, scheduling, buffering.

### D. Deque — double-ended queue
Insert/remove at **both** ends: `insertFirst`, `insertLast`, `removeFirst`, `removeLast`, each $O(1)$ (this is 2024 Q32).

### E. Linked list
Nodes, each holding **data** and a **pointer** to the next node.
```
 Singly:  head -> [10|.] -> [20|.] -> [30|.] -> None
 Doubly:  None <- [10] <-> [20] <-> [30] -> None
```
- **No random access:** reaching the $i$-th node is **$O(n)$** (you must walk the chain).
- **Insert/delete at head: $O(1)$**; at the tail: $O(n)$ unless a tail pointer is kept; at a *known* node (doubly): $O(1)$.
- **Search: $O(n)$.** Extra space per node for the pointer(s).

### F. Array vs linked list (the core trade-off)

| Operation | Array | Singly linked list |
|---|---|---|
| Access $i$-th | $O(1)$ | $O(n)$ |
| Insert/delete at head | $O(n)$ | $O(1)$ |
| Insert/delete at tail | $O(1)$ (amortized) | $O(n)$ (or $O(1)$ with tail ptr) |
| Search (unsorted) | $O(n)$ | $O(n)$ |

### G. Common traps GATE exploits
1. **LIFO vs FIFO:** a stack returns the **most recent** element; a queue the **oldest**.
2. **Linked list has no $O(1)$ indexing** — random access is $O(n)$.
3. A variable reassigned by several `remove` calls keeps only the **last** value (2024 Q32).
4. **Tail operations** on a singly linked list are $O(n)$ without a tail pointer.
5. **Circular-queue** full vs empty conditions (often one slot is left unused to distinguish them).
6. Reversing a singly linked list in place needs **three** pointers (prev, curr, next).

## Part 2 — How to Solve (Method)

### Operation-trace questions (the dominant type)
1. Draw the structure and **update it after every operation**, left-to-right.
   - **Stack:** track the **top**; `pop` returns the top.
   - **Queue:** track **front** and **rear**; `dequeue` returns the front.
   - **Deque:** mind which end each operation touches.
2. If a variable is assigned from `pop`/`remove` repeatedly, remember **the last assignment wins** — don't sum them unless asked.
3. For **NAT** answers, write the structure contents after each step in a small table; do not track it mentally.

### Choosing the right structure
| Need | Use |
|---|---|
| most-recent-first / undo / DFS / call stack | **stack** |
| first-come-first-served / BFS / buffering | **queue** |
| insert & remove at both ends | **deque** |
| cheap head insert/delete, dynamic size | **linked list** |
| $O(1)$ random access by index | **array** |

### Stack applications to know
- **Balanced parentheses:** push each opener; on a closer, pop and check it matches; at the end the stack must be **empty**.
- **Postfix (RPN) evaluation:** push operands; on an operator, pop two, apply, push the result.

### Linked-list pointer surgery
- Always keep a reference to the **next** node before rewiring a pointer, or you lose the rest of the list.
- In-place **reversal:** carry `prev`, `curr`, `next`; redirect `curr.next = prev` and advance.

### Sanity checks
- A `pop`/`dequeue` on an empty structure is an **underflow** (error).
- After a balanced-parenthesis scan, a non-empty stack means **unbalanced**.
- Total elements in = elements out + elements remaining.

## Part 3 — Worked Examples

E2 is a real GATE DA question; the rest are standard originals covering each structure.

---

### Example 1 — Postfix evaluation with a stack *(original · Easy–Med)*
**Q.** Evaluate the postfix expression `5 3 + 2 *` using a stack.

**Solve.** Push operands; on an operator pop two and apply:
```
5      -> push        S = [5]
3      -> push        S = [5, 3]
+      -> pop 3, 5; push 5+3=8   S = [8]
2      -> push        S = [8, 2]
*      -> pop 2, 8; push 8*2=16  S = [16]
```
**Answer: 16.** *Method:* a stack turns postfix evaluation into a single left-to-right scan, $O(n)$.

---

### Example 2 — Deque operation trace *(2024 Q32 · NAT · Med)*
**Q.** Starting from an empty deque, perform: `insertFirst(10)`, `insertLast(32)`, `a ← removeFirst()`, `insertLast(28)`, `insertLast(17)`, `a ← removeFirst()`, `a ← removeLast()`. Find `a`.

**Solve.** Track the deque (front $\rightarrow$ rear) and each write to `a`:
```
insertFirst(10)     [10]
insertLast(32)      [10, 32]
a = removeFirst()   [32]            a = 10
insertLast(28)      [32, 28]
insertLast(17)      [32, 28, 17]
a = removeFirst()   [28, 17]        a = 32
a = removeLast()    [28]            a = 17
```
**Answer: $a = 17$.** *Method:* the three assignments give $10, 32, 17$ — the **last** one wins.

---

### Example 3 — Queue (FIFO) trace *(original · Easy–Med)*
**Q.** On an empty queue: `enqueue(10)`, `enqueue(20)`, `dequeue()`, `enqueue(30)`, `dequeue()`. What is dequeued, and what remains?
```
enqueue(10)   front[10]rear
enqueue(20)   [10, 20]
dequeue()     -> returns 10   [20]
enqueue(30)   [20, 30]
dequeue()     -> returns 20   [30]
```
**Answer:** dequeues return **10 then 20** (oldest first); the queue ends as **[30]**. *Method:* FIFO — removal is always from the front. (A **circular** queue would reuse the slots freed at the front without shifting.)

---

### Example 4 — Reverse a singly linked list in place *(original · Med)*
**Q.** What does this do, and at what cost?
```python
prev = None
curr = head
while curr is not None:
    nxt = curr.next      # save the rest
    curr.next = prev     # reverse this link
    prev = curr          # advance prev
    curr = nxt           # advance curr
head = prev
```
**Solve.** On `a -> b -> c -> None`, the links flip one at a time until `head` points to `c -> b -> a -> None`. It **reverses the list in place** using the three-pointer technique.
- **Time $O(n)$** (one pass), **space $O(1)$** (no new nodes).

*Method:* always save `nxt` **before** rewiring `curr.next`, or the tail is lost.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** Which structure returns the **most recently** inserted element first?
(A) queue (B) stack (C) FIFO buffer (D) circular queue

**Q2. ★ (MCQ)** Accessing the $i$-th element of an array by index is
(A) $O(1)$ (B) $O(\log n)$ (C) $O(n)$ (D) $O(n^2)$

**Q3. ★★ (NAT)** On an empty queue: `enqueue(5)`, `enqueue(3)`, `dequeue()`, `enqueue(7)`, `enqueue(9)`, `dequeue()`. The element now at the **front** is __________ .

**Q4. ★★ (MCQ)** Which string of parentheses is **balanced**?
(A) `(()` (B) `())(` (C) `(()())` (D) `)(`

**Q5. ★★ (MCQ)** Evaluate the postfix expression `6 2 / 3 -`.
(A) 0 (B) 1 (C) 3 (D) 6

**Q6. ★★ (MCQ)** Inserting a node at the **head** of a singly linked list is
(A) $O(1)$ (B) $O(\log n)$ (C) $O(n)$ (D) $O(n^2)$

**Q7. ★★ (NAT)** A stack starts empty. Perform: `push(3)`, `push(5)`, `push(8)`, `pop()`, `push(1)`, `pop()`, `pop()`. The **sum of all popped values** is __________ .

**Q8. ★★ (MSQ)** Which statements are TRUE?
(A) A stack is LIFO.
(B) A queue is FIFO.
(C) Accessing the $i$-th element of a singly linked list is $O(1)$.
(D) A deque supports insertion and removal at both ends.

**Q9. ★★ (MCQ)** A circular array-based queue is preferred over a plain linear-array queue mainly because it
(A) allows random access by index (B) reuses vacated front slots so enqueue/dequeue stay $O(1)$ (C) keeps elements sorted (D) uses asymptotically less memory

**Q10. ★★ (MCQ)** To reverse a singly linked list in place, the minimum number of pointer variables typically required is
(A) 1 (B) 2 (C) 3 (D) 4

## Answer Key & Full Solutions

**Q1 — (B) stack.** A stack is LIFO, so the most recently pushed element is popped first. (All the other options are FIFO.)

**Q2 — (A) $O(1)$.** Arrays give constant-time random access via address arithmetic.

**Q3 — 7.** Trace (front $\rightarrow$ rear): $[5] \rightarrow [5,3] \rightarrow$ deq 5 $\rightarrow [3] \rightarrow [3,7] \rightarrow [3,7,9] \rightarrow$ deq 3 $\rightarrow [7,9]$. Front $= 7$.

**Q4 — (C) `(()())`.** Push on `(`, pop on `)`; it matches every closer and ends with an empty stack. The others either end non-empty or pop on an empty stack.

**Q5 — (A) 0.** Postfix: push 6, 2; `/` $\rightarrow 6/2 = 3$; push 3; `-` $\rightarrow 3 - 3 = 0$.

**Q6 — (A) $O(1)$.** Point the new node's `next` at the old head and move `head` — constant work.

**Q7 — 14.** Pops return $8$ (top), then $1$, then $5$: $8 + 1 + 5 = 14$. (Stack after `push 3,5,8` is $[3,5,8]$; pop $\rightarrow 8$; push 1 $\rightarrow [3,5,1]$; pop $\rightarrow 1$; pop $\rightarrow 5$.)

**Q8 — (A), (B), (D).** (C) is **false** — a singly linked list has no random access; reaching the $i$-th node is $O(n)$.

**Q9 — (B).** A circular queue wraps indices modularly to reuse slots freed at the front, keeping enqueue/dequeue at $O(1)$ without shifting elements.

**Q10 — (C) 3.** The standard in-place reversal uses `prev`, `curr`, and `next` (to save the rest of the list before rewiring each link).

---

### How to read your score
- **8–10:** linear structures are solid — on to Module 2.4 (Trees & Hash Tables).
- **6–7:** re-drill the LIFO/FIFO traces (Q3, Q7) and linked-list complexity (Q6, Q8).
- **≤5:** re-read Part 1 B–F and re-trace the worked examples with a state table after each operation.
