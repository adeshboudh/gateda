---
title: "2.1 Python Programming Semantics"
parent: "Module 2: Programming & DSA"
nav_order: 1
---

# GATE DA · PDSA Module 2.1 — Python Programming & Semantics

## Exam Relevance

**Where this sits:** Programming, Data Structures & Algorithms $\rightarrow$ _Python Programming & Semantics_ — the language layer every PDSA question is written in.

**Weightage:** PDSA is the **#2 subject** ($18.8\%$ of DA marks; $20 \rightarrow 14 \rightarrow 14$ across 2024–2026). Python-semantics questions appear **directly almost every year**, nearly always as **"predict the output"** or **"what does this function do"**.

**Seen in real papers:**

- **2025 Q23** — `list.extend` vs `append`
- **2026 Q16** — the mutable **default argument** trap
- **2026 Q50** — **closures** (independent captured state)
- **2025 Q47** — **set** operations + simultaneous tuple assignment
- **2025 Q63** — Python 3 **true division** `/` inside recursion
- **2024 Q41** — recursive in-place list reversal (tuple swap)
- **2026 Q58** — list **mutation by reference** persisting across calls
- **2024 Q38** — recursion over a dict-as-tree

> **Why this is high-ROI:** the question format is narrow and the traps are a _fixed, learnable set_ (mutable defaults, aliasing, `/` vs `//`, closures, simultaneous assignment). Learn the gotchas once and these become reliable marks.

## Part 1 — Theory & Core Semantics

### A. The data model: names are references

Everything in Python is an **object**; a variable is a **name bound to an object**, not a box holding a value. Assignment `b = a` makes `b` point to the **same object** as `a` (it does **not** copy).

```python
a = [1, 2, 3]
b = a          # b and a refer to the SAME list
b.append(4)
print(a)       # [1, 2, 3, 4]  -- mutation via b is visible via a
```

To actually copy a list: `a[:]`, `list(a)`, or `copy.deepcopy(a)` for nested structures.

### B. Mutable vs immutable

- **Immutable:** `int`, `float`, `str`, `tuple`, `frozenset` — cannot be changed in place; "modifying" rebinds the name to a new object.
- **Mutable:** `list`, `dict`, `set` — can be changed in place; subject to **aliasing** effects.

### C. Numbers & operators (a classic trap)

- `/` is **true division** and **always returns a `float`** in Python 3: `7/2 == 3.5`.
- `//` is **floor division**: `7//2 == 3`; `%` is modulo: `7%2 == 1`; `**` is power.
- Mixed-type comparisons still work: `0.0 == 0` is `True`, `1.0 == 1` is `True` (the basis of 2025 Q63).

### D. Sequences: lists, strings, tuples

- **Slicing** `s[i:j]` returns indices `i .. j-1`: `"GATEDA"[1:4] == "ATE"`.
- `append(x)` adds **one element** `x`; `extend(it)` adds **each element** of an iterable. So `[1,2,3].append([4,5])` $\rightarrow$ `[1,2,3,[4,5]]` but `.extend([4,5])` $\rightarrow$ `[1,2,3,4,5]` (2025 Q23). `list` has **no** `.update()` (that is `dict`/`set`).
- **Strings are immutable**; tuples are immutable.

### E. Dicts & sets

- Membership `x in d` checks **keys**; lookup/insert are $O(1)$ on average.
- Set algebra: union `|`, intersection `&`, difference `-`, symmetric difference `^` (2025 Q47, 2026 set work).

### F. Simultaneous (tuple) assignment

In `A, B = expr1, expr2`, **all right-hand sides are evaluated first** (using current values), **then** bound to the left. This is why `x, y = y, x` swaps without a temp, and why chained set updates use the _old_ values (2025 Q47, 2024 Q41).

### G. Functions & arguments

- **Mutable default argument trap:** a default like `def f(lst=[])` is evaluated **once at definition time**; the _same_ object is reused on every call that omits the argument, so it **accumulates state** (2026 Q16).
- **Pass-by-object-reference:** passing a list to a function and mutating it changes the caller's list (2026 Q58).

### H. Scope (LEGB) & closures

- Name lookup order: **L**ocal $\rightarrow$ **E**nclosing $\rightarrow$ **G**lobal $\rightarrow$ **B**uilt-in.
- A **closure** is an inner function that captures variables from its enclosing scope **by reference**. Each call to the outer function creates a **new** scope, so closures from separate calls have **independent** captured state (2026 Q50). `nonlocal` / `global` allow rebinding outer names.

### I. Operation complexity (know these)

| Operation                                    | Complexity    |
| -------------------------------------------- | ------------- |
| index `a[i]`, `len(a)`, `append` (amortized) | $O(1)$        |
| `x in list`, insert/pop at front             | $O(n)$        |
| `dict` / `set` lookup & insert (avg)         | $O(1)$        |
| `sorted(a)` / `a.sort()`                     | $O(n \log n)$ |
| building a string by repeated `+` in a loop  | $O(n^2)$      |

### J. Common traps GATE exploits

1. **Mutable default arguments** share state across calls.
2. **Aliasing:** `b = a` does not copy; mutating one shows in the other.
3. **`/` returns a float** in Python 3 (use `//` for integer division).
4. **`append` (one element) vs `extend` (each element)**.
5. **Simultaneous assignment** evaluates all RHS _before_ assigning.
6. **Closures capture the variable, not its value**; separate outer-calls $\rightarrow$ separate state.
7. **Mutating a list passed to a function persists** in the caller.

## Part 2 — How to Solve (Output Prediction)

### The tracing method

1. **Track object identity.** Note which names alias the same object. On each line decide: is this a **mutation** (in-place, visible through all aliases) or a **rebinding** (the name now points to a new object)?
2. **Maintain a state table.** For loops, write the values of all relevant variables after each iteration — don't do it in your head.
3. **Simultaneous assignment:** compute **every** right-hand side using the _current_ values first, then assign all left-hand sides together.
4. **Default arguments:** if a default is **mutable**, it is created once — carry its accumulating state across calls; an explicitly passed argument uses a fresh object.
5. **Closures:** each call to the outer function makes a new captured variable; track one per closure instance.
6. **Arithmetic:** keep `/` as float, `//` as floored integer; watch conditions like `a % 2 == 1` when `a` is a float.
7. **Recursion:** draw the **call tree**; either unwind return values from the leaves, or (for "how many calls") use a count recurrence such as $T(n) = 1 + T(n-1) + T(n-2)$.

### Fast pattern checks

- See `def f(..., x=[])` or `={}`? $\rightarrow$ suspect the **mutable-default** trap.
- See an inner `def` returned from an outer `def`? $\rightarrow$ **closure**; ask whether state is shared (no — per outer call).
- See `a, b = b, a` style lines? $\rightarrow$ **simultaneous** evaluation.
- See a list passed into a recursive/looping function? $\rightarrow$ mutations **persist**.

### Sanity checks

- A `list` method that doesn't exist (`.update`) $\rightarrow$ `AttributeError`; wrong arg count $\rightarrow$ `TypeError`.
- Count of recursive **calls** $\ne$ the **returned value** — keep them separate.
- Total swaps performed by a bubble pass equals the number of **inversions** removed.

## Part 3 — Worked Examples (from PYQs)

All four are real GATE DA questions, rising in difficulty.

---

### Example 1 — `extend` vs `append` _(2025 Q23 · MCQ · Easy)_

**Q.** With `A=[1,2,3]` and `B=[4,5,6]`, which statement makes `A = [1, 2, 3, 4, 5, 6]`?
(A) `A.extend(B)` (B) `A.append(B)` (C) `A.update(B)` (D) `A.insert(B)`

**Solve.**

- `extend` adds **each element** of `B` $\rightarrow$ `[1,2,3,4,5,6]`. ✅
- `append(B)` adds `B` as **one element** $\rightarrow$ `[1,2,3,[4,5,6]]`.
- `update` is a `dict`/`set` method $\rightarrow$ `AttributeError`. `insert` needs `(index, obj)` $\rightarrow$ `TypeError`.

**Answer: (A).** _Concept:_ `extend` flattens an iterable into the list; `append` inserts its argument whole.

---

### Example 2 — The mutable default argument _(2026 Q16 · MCQ · Medium)_

**Q.** Output of:

```python
def append_to_lst(val, lst=[]):
    lst.append(val)
    return lst
print(append_to_lst(1))
print(append_to_lst(2))
print(append_to_lst(3, []))
```

(A) `[1]/[2]/[3]` (B) `[1]/[1,2]/[3]` (C) `[1]/[2]/[1,2,3]` (D) `[1]/[1,2]/[1,3]`

**Solve.** The default `lst=[]` is created **once** at definition time and reused whenever the argument is omitted:

- `append_to_lst(1)` $\rightarrow$ shared list becomes `[1]` $\rightarrow$ prints `[1]`.
- `append_to_lst(2)` $\rightarrow$ same shared list becomes `[1, 2]` $\rightarrow$ prints `[1, 2]`.
- `append_to_lst(3, [])` $\rightarrow$ a **fresh** list is passed $\rightarrow$ prints `[3]`.

**Answer: (B).** _Concept:_ mutable default arguments persist across calls — the single most-tested Python trap.

---

### Example 3 — Closures with independent state _(2026 Q50 · MSQ · Med–Hard)_

**Q.** Which options are correct?

```python
def outer():
    x = []
    def inner(val):
        x.append(val)
        return x
    return inner
f1 = outer()
f2 = outer()
print(f1(10))   # P
print(f1(20))   # Q
print(f2(30))   # R
print(f1(40))   # S
```

(A) `f1` and `f2` share the same list `x` (B) Q prints `[10,20]` (C) R prints `[10,20,30]` (D) S prints `[10,20,40]`

**Solve.** Each `outer()` call creates a **new** `x` and a new closure over it. `f1` owns list $x_1$, `f2` owns a separate $x_2$.

- P: $x_1=[10]$. Q: $x_1=[10,20]$ ✅ (B). R: $x_2=[30]$, not `[10,20,30]` ✗ (C). S: $x_1=[10,20,40]$ ✅ (D). They don't share $x$ ✗ (A).

**Answer: (B) and (D).** _Concept:_ a closure captures its enclosing variable by reference; separate outer-calls give separate state.

---

### Example 4 — Set algebra + simultaneous assignment _(2025 Q47 · MCQ · Hard)_

**Q.** After running, which set contains `"this"`?

```python
A={"this","that"}
B={"that","other"}
C={"other","this"}
while "other" in C:
    if "this" in A:
        A,B,C = A-B, B-C, C-A
    if "that" in B:
        A,B,C = C|A, A|B, B|C
```

(A) Only A (B) Only B (C) Only C (D) A, C

**Solve.** Simultaneous assignment evaluates all RHS first.

- **Iter 1**, first `if`: $A=\{this\}, B=\{that\}, C=\{other\}$. Second `if` (`"that" in B`): $A=\{other,this\}, B=\{this,that\}, C=\{that,other\}$.
- **Iter 2**, first `if`: $A=\{other\}, B=\{this\}, C=\{that\}$. Second `if`: `"that" in B`? No. `"other" in C`? No $\rightarrow$ loop ends.
- Final: `"this"` is in **B** only.

**Answer: (B) Only B.** _Concept:_ set difference/union plus the rule that all right-hand sides are computed before any assignment.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** Output of:

```python
a = [1, 2, 3]
b = a
b.append(4)
print(a)
```

(A) `[1, 2, 3]` (B) `[1, 2, 3, 4]` (C) `[4, 1, 2, 3]` (D) error

**Q2. ★ (MCQ)** Output of `print("GATEDA"[1:4])`?
(A) `GAT` (B) `ATE` (C) `ATED` (D) `TED`

**Q3. ★★ (MCQ)** Output of `print(7/2, 7//2, 7%2)`?
(A) `3 3 1` (B) `3.5 3 1` (C) `3.5 3.5 1` (D) `3 3.5 1`

**Q4. ★★ (MSQ)** Which statements are TRUE?
(A) Lists are mutable. (B) Tuples are immutable. (C) A mutable default argument is re-created on every call. (D) `b = a` makes an independent copy of list `a`.

**Q5. ★★ (MCQ)** What does this function do? _(2024 Q41)_

```python
def fun(D, s1, s2):
    if s1 < s2:
        D[s1], D[s2] = D[s2], D[s1]
        fun(D, s1+1, s2-1)
```

(A) finds the smallest element in `D[s1..s2]` (B) merge-sorts `D[s1..s2]` in place (C) reverses `D[s1..s2]` (D) swaps only `D[s1]` and `D[s2]`

**Q6. ★★★ (NAT)** Value printed: _(2025 Q63)_

```python
def f(a, b):
    if (a == 0):
        return b
    if (a % 2 == 1):
        return 2*f((a-1)/2, b)
    return b + f(a-1, b)
print(f(15, 10))
```

**Q7. ★★ (MCQ)** Output of `print(len({1,2,3} ^ {2,3,4}))` (where `^` is symmetric difference)?
(A) 1 (B) 2 (C) 3 (D) 4

**Q8. ★★★ (NAT)** Output of the program: _(2026 Q58)_

```python
def fun(L, i=0):
    if i >= len(L)-1:
        return 0
    if L[i] > L[i+1]:
        L[i+1], L[i] = L[i], L[i+1]
        return 1+fun(L, i+1)
    else:
        return fun(L, i+1)
data = [5, 3, 4, 1, 2]
count = 0
for _ in range(len(data)):
    count += fun(data)
print(count)
```

**Q9. ★★★ (MCQ)** Output of the code: _(2024 Q38)_

```python
def count(child_dict, i):
    if i not in child_dict.keys():
        return 1
    ans = 1
    for j in child_dict[i]:
        ans += count(child_dict, j)
    return ans
child_dict = dict()
child_dict[0] = [1,2]
child_dict[1] = [3,4,5]
child_dict[2] = [6,7,8]
print(count(child_dict,0))
```

(A) 6 (B) 1 (C) 8 (D) 9

**Q10. ★★ (MCQ)** After `A=[1,2,3]`, what is `A` following `A.append([4,5])`?
(A) `[1,2,3,4,5]` (B) `[1,2,3,[4,5]]` (C) `[1,2,3]` (D) `TypeError`

## Answer Key & Full Solutions

**Q1 — (B) `[1, 2, 3, 4]`.** `b = a` aliases the same list; `b.append(4)` mutates it, visible through `a`.

**Q2 — (B) `ATE`.** Slice `[1:4]` takes indices 1, 2, 3 of `"GATEDA"` $\rightarrow$ `A`, `T`, `E`.

**Q3 — (B) `3.5 3 1`.** `/` is true division (float) $\rightarrow 3.5$; `//` floors $\rightarrow 3$; `%` $\rightarrow 1$.

**Q4 — (A), (B).** (C) is **false** — a mutable default is created **once** at definition and reused. (D) is **false** — `b = a` aliases, it does not copy.

**Q5 — (C) reverses `D[s1..s2]`.** Each call swaps the outermost pair then recurses inward (`s1+1, s2-1`) until `s1 \ge s2`. On `[1,2,3,4,5]` with $(0,4)$: $\rightarrow [5,2,3,4,1] \rightarrow [5,4,3,2,1]$ — a two-pointer reversal.

**Q6 — 160.** Every step of `f(15,·)` hits the odd branch (`/` makes floats but `0.0==0`, `1.0==1` hold). Since $15 = 2^4 - 1$, the result is $2^4 \cdot 10 = 160$. Trace: $f(0)=10 \rightarrow 20 \rightarrow 40 \rightarrow 80 \rightarrow 160$.

**Q7 — (B) 2.** $\{1,2,3\} \,\hat{}\, \{2,3,4\} = \{1,4\}$ (symmetric difference), length $2$.

**Q8 — 8.** Each `fun(data)` is one bubble-sort pass that counts and performs swaps, mutating `data` (passed by reference). Swaps per pass: $4 + 2 + 2 + 0 + 0 = 8$. (Equivalently, total swaps = number of inversions of `[5,3,4,1,2]` = $8$.)

**Q9 — (D) 9.** `count` returns the number of nodes in the subtree rooted at `i` (leaves return 1). Node 1 has 3 leaf children $\rightarrow 4$; node 2 likewise $\rightarrow 4$; root $0$: $1 + 4 + 4 = 9$.

**Q10 — (B) `[1,2,3,[4,5]]`.** `append` adds its argument as a **single** element — here the list `[4,5]` becomes one nested element. (`extend` would have given `[1,2,3,4,5]`.)

---

### How to read your score

- **8–10:** Python semantics is solid — on to Module 2.2 (Complexity Analysis & Recursion).
- **6–7:** re-drill the mutable-default (Q-E2), closure (Q-E3), and aliasing (Q1, Q4) traps.
- **≤5:** re-read Part 1 A–B and F–H, then re-trace the worked examples line by line with a state table.
