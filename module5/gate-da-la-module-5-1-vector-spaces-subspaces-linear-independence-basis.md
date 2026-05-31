---
title: "5.1 Vector Spaces & Basis"
parent: "Module 5: Linear Algebra"
nav_order: 1
---

# GATE DA · LA Module 5.1 — Vector Spaces, Subspaces, Linear Independence & Basis

## Exam Relevance

**Where this sits:** Linear Algebra $\rightarrow$ *Vector Spaces, Subspaces, Linear Independence & Basis* — the foundation of the whole subject and the **first module of Subject 5**.

**Weightage:** Linear Algebra is **~11.8%** of DA (30 marks over 2024–26; stable at $10/12/8$). These foundational ideas are tested directly **and** underpin every later LA topic (rank, eigenvalues, projections, SVD). Directly tested PYQs for this module:
- **2024 Q47** (MSQ) — identify which sets are subspaces of $\mathbb{R}^3$.
- **2025 Q25** (MSQ) — orthonormal bases and linear independence.
- **2026 Q22** (MCQ) — geometry of a 2-D subspace intersected with a ball.

> **Why it matters:** these are *free marks* once the **subspace test** and the independence/basis facts are automatic — and they are prerequisites for rank–nullity (5.2), eigenvectors (5.3), and projections (5.4).

## Part 1 — Theory & Math

### A. Vector spaces & subspaces
A **vector space** $V$ over $\mathbb{R}$ is a set closed under addition and scalar multiplication, with the usual axioms (a zero vector $\mathbf 0$, additive inverses, associativity, commutativity, distributivity). For GATE the workhorse is the **subspace test**.

A nonempty subset $W \subseteq V$ is a **subspace** iff it is closed under linear combinations:
$$\mathbf 0 \in W \quad\text{and}\quad \forall\, \mathbf u,\mathbf v\in W,\ \forall\, a,b\in\mathbb{R}:\quad a\mathbf u + b\mathbf v \in W.$$
- **Every subspace contains $\mathbf 0$.** This one check kills most distractors: a set defined by a constraint with a **nonzero constant** (e.g. $5x_1+2x_3+4=0$) excludes the origin, so it is **not** a subspace.
- **Subspaces of $\mathbb{R}^3$** come in exactly four sizes:

| Dimension | Subspace of $\mathbb{R}^3$ |
| --- | --- |
| $0$ | just the origin $\{\mathbf 0\}$ |
| $1$ | a line through the origin |
| $2$ | a plane through the origin |
| $3$ | all of $\mathbb{R}^3$ |

### B. Span & linear combinations
The **span** is the set of all linear combinations:
$$\operatorname{span}\{\mathbf v_1,\dots,\mathbf v_k\} = \Big\{ \textstyle\sum_{i=1}^{k} c_i \mathbf v_i : c_i \in \mathbb{R} \Big\}.$$
A span is **always** a subspace. **Trap:** if the coefficients are restricted — squared ($\alpha^2$), absolute value, or sign-constrained ($\alpha \ge 0$) — the set is generally **not** a subspace (closure under *negative* scalars fails).

### C. Linear independence
Vectors $\mathbf v_1,\dots,\mathbf v_k$ are **linearly independent** if
$$\sum_{i=1}^{k} c_i \mathbf v_i = \mathbf 0 \;\implies\; c_1 = c_2 = \cdots = c_k = 0.$$
Otherwise they are **dependent** (one is a combination of the others). **Test:** stack the vectors as columns of $A$ and row-reduce — independent iff $\operatorname{rank}(A) = k$. For $n$ vectors in $\mathbb{R}^n$: independent $\iff \det A \ne 0$.

### D. Basis & dimension
A **basis** is a linearly independent set that **spans** $V$. Key facts:
- Every basis of $V$ has the **same** number of vectors $=\dim V$.
- $\dim \mathbb{R}^n = n$; the standard basis is $\mathbf e_1,\dots,\mathbf e_n$.
- **Bases are not unique** — *any* $n$ linearly independent vectors in $\mathbb{R}^n$ form a basis. (Dimension **is** unique.)
- Any independent set can be **extended** to a basis; any spanning set can be **trimmed** to one.

### E. Orthonormal sets
A set is **orthonormal** if vectors are mutually orthogonal and unit length:
$$\mathbf v_i^\top \mathbf v_j = \delta_{ij} = \begin{cases} 1 & i = j \\ 0 & i \ne j. \end{cases}$$
- **Orthonormal $\implies$ linearly independent** (dot $\sum c_i \mathbf v_i = \mathbf 0$ with $\mathbf v_j$ to force $c_j = 0$).
- The **converse is false**: independent vectors need not be orthogonal/unit — e.g. $(1,0)$ and $(1,1)$.
- $\mathbb{R}^n$ has **infinitely many** orthonormal bases (every rotation of the standard basis is one), so there is **no unique** orthonormal basis.

### F. Traps GATE exploits
1. **Affine sets** (constraint $=$ nonzero constant) are **never** subspaces — fail the zero test.
2. **Nonlinear / restricted coefficients** ($\alpha^2,\ |\alpha|,\ \alpha\ge0$, products $x_1x_2$, squares $x_1^2$) break closure.
3. **Independence $\ne$ orthogonality.**
4. **Orthonormal $\implies$ independent**, but not conversely.
5. **Bases are not unique; dimension is.**
6. Solution set of a **homogeneous** system $A\mathbf x=\mathbf 0$ is always a subspace; a **non-homogeneous** $A\mathbf x=\mathbf b$ ($\mathbf b\ne\mathbf 0$) is not.

## Part 2 — How to Solve (Method)

### Is it a subspace? — a 3-step kill-chain
1. **Zero test first.** Does $\mathbf 0$ satisfy the defining condition? If **no** $\to$ *not a subspace*, stop. (Instantly catches every affine set.)
2. **Read the constraint's form.** Defined by **homogeneous linear** equations $A\mathbf x=\mathbf 0$ $\to$ subspace. Constraint **nonlinear** (squares, products, inequalities) $\to$ almost certainly **not**.
3. **Closure check** (if still unsure): take general $\mathbf u,\mathbf v$ in the set and scalar $c$; confirm $\mathbf u+\mathbf v$ and $c\mathbf u$ remain in it.
- A set written as a **span with free real coefficients** is a subspace automatically; if those coefficients are **squared / sign-restricted**, it is not.

### Independence / basis / dimension
- **Independence:** vectors $\to$ columns of a matrix $\to$ row-reduce; independent iff rank $=$ number of vectors. Square case: $\det \ne 0$.
- **Dimension of a span** $=$ number of pivots (rank) after reduction.
- **Dimension from constraints:** in $\mathbb{R}^n$, each *independent* homogeneous linear equation cuts dimension by 1 — so a single equation gives a hyperplane of dimension $n-1$.

### Orthonormal checks
- Pairwise dot products $=0$ and each norm $=1$. If so, the set is automatically **independent** (and a **basis** if it has $n$ vectors in $\mathbb{R}^n$).

### Geometry shortcut ("$\cap$ a ball" questions)
- A $k$-dimensional subspace of $\mathbb{R}^n$ is a flat **through the origin**. Its intersection with the ball $\{\mathbf x : \mathbf x^\top \mathbf x \le r^2\}$ (radius $r$) is a **$k$-dimensional ball of radius $r$**. A 2-D disk has area $\pi r^2$.

### Mistakes that cost marks
- Skipping the **zero-vector** test and calling an affine set a subspace.
- Treating an **MSQ** as single-answer — *select all* that hold.
- Confusing **linearly independent** with **orthogonal**.
- Misreading $\mathbf x^\top \mathbf x \le 16$ — the radius is $\sqrt{16}=4$, not $16$.

## Part 3 — Worked Examples

### Example 1 — Identify the subspaces *(2024 Q47 · MSQ)*
**Q.** Select all that are subspaces of $\mathbb{R}^3$.
- (A) $\{\, \alpha(1,1,0)^\top + \beta(1,0,0)^\top : \alpha,\beta\in\mathbb{R} \,\}$
- (B) $\{\, \alpha^2(1,2,0)^\top + \beta^2(1,0,1)^\top : \alpha,\beta\in\mathbb{R} \,\}$
- (C) $\{\, \mathbf x\in\mathbb{R}^3 : 5x_1+2x_3=0,\ 4x_1-2x_2+3x_3=0 \,\}$
- (D) $\{\, \mathbf x\in\mathbb{R}^3 : 5x_1+2x_3+4=0 \,\}$

**Solve.**
- **(A)** A span with **free real** coefficients $\to$ subspace. (Concretely it is the plane $x_3=0$.) ✅
- **(B)** Coefficients are $\alpha^2,\beta^2 \ge 0$. The vector $(1,2,0)^\top$ is in the set (take $\alpha=1,\beta=0$) but $-(1,2,0)^\top$ needs $\alpha^2=-1$ — impossible. Not closed under negative scalars. ❌
- **(C)** Solution set of a **homogeneous** linear system $=$ null space $\to$ subspace. ✅
- **(D)** Nonzero constant $+4$: the origin gives $0+0+4=4\ne0$, so $\mathbf 0\notin$ set. **Affine**, not a subspace. ❌

**Answer: (A) and (C).** *Method:* zero test + linear-vs-restricted coefficients.

---

### Example 2 — Orthonormal bases & independence *(2025 Q25 · MSQ)*
**Q.** Which statements are correct?
- (A) $\mathbb{R}^n$ has a **unique** set of orthonormal basis vectors.
- (B) $\mathbb{R}^n$ does **not** have a unique set of orthonormal basis vectors.
- (C) Linearly independent vectors in $\mathbb{R}^n$ are orthonormal.
- (D) Orthonormal vectors in $\mathbb{R}^n$ are linearly independent.

**Solve.**
- **(A)** False — e.g. in $\mathbb{R}^2$ both $\{(1,0),(0,1)\}$ and the rotated $\{(\tfrac{1}{\sqrt2},\tfrac{1}{\sqrt2}),(-\tfrac{1}{\sqrt2},\tfrac{1}{\sqrt2})\}$ are orthonormal bases. Infinitely many. ❌
- **(B)** True (the negation of A). ✅
- **(C)** False — $(1,0)$ and $(1,1)$ are independent but neither orthogonal nor unit. ❌
- **(D)** True — if $\sum_i c_i \mathbf v_i = \mathbf 0$, dot with $\mathbf v_j$: $\sum_i c_i (\mathbf v_i^\top \mathbf v_j) = c_j = 0$ for every $j$. ✅

**Answer: (B) and (D).** *Method:* orthonormal $\Rightarrow$ independent (one-way); bases are not unique.

---

### Example 3 — Subspace $\cap$ ball *(2026 Q22 · MCQ)*
**Q.** Let $S_1 = \{\, \mathbf x=(x_1,x_2,x_3)^\top\in\mathbb{R}^3 : \mathbf x^\top \mathbf x \le 16 \,\}$, and let $S_2$ be a subspace of $\mathbb{R}^3$ of dimension two. What is the **area** of $S_1 \cap S_2$?

**Solve.**
- $S_1$ is the closed **ball of radius** $r=\sqrt{16}=4$ centered at the origin.
- $S_2$ is a 2-D subspace $=$ a **plane through the origin**.
- Their intersection is the part of that plane within distance $4$ of the origin — a **disk of radius $4$**.
- Area $= \pi r^2 = \pi\cdot 4^2 = 16\pi$.

**Answer: (A) $16\pi$.** *Trap avoided:* $\mathbf x^\top\mathbf x\le16$ means radius $4$, not $16$.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** Which is a subspace of $\mathbb{R}^2$?
(A) $\{(x,y): x+y=0\}$ (B) $\{(x,y): x+y=1\}$ (C) $\{(x,y): xy=0\}$ (D) $\{(x,y): x\ge 0\}$

**Q2. ★ (MCQ)** The dimension of $\mathbb{R}^n$ is
(A) $1$ (B) $n$ (C) $n^2$ (D) infinite

**Q3. ★★ (MSQ)** Which sets are subspaces of $\mathbb{R}^3$?
(A) $\{\mathbf x: x_1=x_2=x_3\}$ (B) $\{\mathbf x: x_1+x_2+x_3=0\}$ (C) $\{\mathbf x: x_1^2=x_2^2\}$ (D) $\{\mathbf x: x_1=1\}$

**Q4. ★★ (NAT)** The dimension of $\operatorname{span}\{(1,2),\,(2,4)\}$ in $\mathbb{R}^2$ is __________ .

**Q5. ★★ (MCQ)** The vectors $(1,0,0),(1,1,0),(1,1,1)$ in $\mathbb{R}^3$ are
(A) linearly dependent (B) linearly independent — a basis of $\mathbb{R}^3$ (C) orthonormal (D) spanning only a plane

**Q6. ★★ (MSQ)** Which statements are TRUE?
(A) Every orthonormal set is linearly independent.
(B) Every linearly independent set is orthonormal.
(C) Every basis of $\mathbb{R}^n$ has exactly $n$ vectors.
(D) $\mathbb{R}^n$ has a unique basis.

**Q7. ★★ (NAT)** The number of vectors in any basis of $\{\mathbf x\in\mathbb{R}^4 : x_1+x_2+x_3+x_4=0\}$ is __________ .

**Q8. ★★ (MCQ)** The set of all $2\times 2$ **symmetric** real matrices is a subspace of the space of $2\times2$ matrices, of dimension
(A) $1$ (B) $2$ (C) $3$ (D) $4$

**Q9. ★★★ (MSQ)** Let $W=\operatorname{span}\{(1,1,0),\,(0,1,1)\}\subseteq\mathbb{R}^3$. Which are TRUE?
(A) $\dim W = 2$ (B) $(1,2,1)\in W$ (C) $(1,0,-1)\in W$ (D) $(0,0,1)\in W$

**Q10. ★★ (MCQ)** A plane through the origin in $\mathbb{R}^3$ intersected with the unit ball $\{\mathbf x:\lVert\mathbf x\rVert\le 1\}$ has area
(A) $\pi$ (B) $2\pi$ (C) $\dfrac{\pi}{2}$ (D) $4\pi$

## Answer Key & Full Solutions

**Q1 — (A).** $\{x+y=0\}$ is a line through the origin (homogeneous) $\to$ subspace. (B) affine (misses $\mathbf 0$); (C) $xy=0$ not closed: $(1,0)+(0,1)=(1,1)$ has $xy=1\ne0$; (D) $x\ge0$ not closed under negative scalars.

**Q2 — (B) $n$.** The standard basis $\mathbf e_1,\dots,\mathbf e_n$ has $n$ vectors.

**Q3 — (A) and (B).** (A) $x_1=x_2=x_3$ is the line $\operatorname{span}\{(1,1,1)\}$ — subspace. (B) $x_1+x_2+x_3=0$ is a homogeneous plane — subspace. (C) $x_1^2=x_2^2$ is nonlinear: $(1,1,0)$ and $(1,-1,0)$ are in it but their sum $(2,0,0)$ has $x_1^2=4\ne0=x_2^2$ — not closed. (D) $x_1=1$ is affine.

**Q4 — 1.** $(2,4)=2(1,2)$, so the vectors are dependent; the span is a single line $\to$ dimension $1$.

**Q5 — (B).** Stack as columns: an upper-triangular matrix with $1$'s on the diagonal, $\det=1\ne0$ $\to$ independent, hence a basis of $\mathbb{R}^3$. They are **not** orthonormal (e.g. $(1,0,0)^\top(1,1,0)=1\ne0$).

**Q6 — (A) and (C).** (A) orthonormal $\Rightarrow$ independent — true. (B) false (independent need not be orthonormal). (C) true by definition of dimension. (D) false — bases are not unique.

**Q7 — 3.** One independent homogeneous equation in $\mathbb{R}^4$ cuts the dimension by $1$: $\dim = 4-1 = 3$.

**Q8 — (C) $3$.** A symmetric $2\times2$ matrix $\begin{bmatrix} a & b \\ b & d \end{bmatrix}$ has $3$ free entries $a,b,d$; a basis is $\begin{bmatrix}1&0\\0&0\end{bmatrix},\begin{bmatrix}0&1\\1&0\end{bmatrix},\begin{bmatrix}0&0\\0&1\end{bmatrix}$.

**Q9 — (A), (B), (C).** (A) the two generators are independent $\to \dim W=2$. (B) $(1,1,0)+(0,1,1)=(1,2,1)$ ✅. (C) $(1,1,0)-(0,1,1)=(1,0,-1)$ ✅. (D) solve $a(1,1,0)+b(0,1,1)=(0,0,1)$: $a=0$, then $a+b=0\Rightarrow b=0$, but $b=1$ — contradiction, so $(0,0,1)\notin W$. ❌

**Q10 — (A) $\pi$.** The intersection is a disk of radius $1$; area $=\pi r^2=\pi\cdot1^2=\pi$. (Same idea as 2026 Q22.)

---

### How to read your score
- **8–10:** foundations are solid — move on to **5.2 Rank–Nullity & Linear Systems**.
- **6–7:** re-drill the **subspace zero-test** (Q1, Q3) and **dimension-from-constraints** (Q7).
- **≤5:** re-read Part 1 A–D; lock in *affine $\ne$ subspace*, *independent $\ne$ orthonormal*, and *dimension $=$ pivots*.
