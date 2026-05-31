---
title: "3.5 Decision Trees"
parent: "Module 3: Machine Learning"
nav_order: 5
---

# GATE DA · ML Module 3.5 — Decision Trees

## Exam Relevance

**Where this sits:** Machine Learning $\rightarrow$ _Decision Trees_ — a greedy, interpretable classifier that splits on the most informative feature.

**Weightage:** ML is the **#3 subject** ($16.9\%$). The directly-tested item is:

- **2024 Q62** — compute the **information gain** of an attribute (a full entropy calculation)

_(2025 and 2026 had no decision-tree question — so this is efficient-coverage, but information gain is a classic NAT worth being fluent in.)_

> **Why it matters:** these are mechanical entropy computations. Know two formulas cold — **entropy** $H = -\sum p\log_2 p$ and **information gain** $= H(\text{parent}) - H(\text{children, weighted})$ — and the marks follow. Carry $\log_2$ to several decimals and round only at the end.

## Part 1 — Theory & Math

### A. What a decision tree is

A tree of feature **tests** (internal nodes) ending in class **predictions** (leaves). Built **greedily, top-down**: at each node pick the split that most reduces impurity (ID3/C4.5 use information gain; CART uses Gini).

### B. Entropy (impurity, in bits)

For a node with class proportions $p_c$:

$$H(S) = -\sum_{c} p_c \log_2 p_c.$$

- **Pure** node (all one class): $H = 0$.
- **Balanced** binary node ($p = 0.5, 0.5$): $H = 1$ bit (the maximum for two classes).
- Useful values: $\log_2 3 \approx 1.585$, $\log_2 5 \approx 2.322$.

### C. Information gain (ID3's split criterion)

The reduction in entropy from splitting node $S$ on attribute $A$ (with values $v$):

$$\text{IG}(S, A) = H(S) - \sum_{v} \frac{\lvert S_v\rvert}{\lvert S\rvert}\, H(S_v).$$

The subtracted term is the **weighted average** child entropy. **ID3 picks the attribute with the highest IG.** Always $\text{IG} \ge 0$.

### D. Gini impurity (CART's criterion)

$$\text{Gini}(S) = 1 - \sum_{c} p_c^2.$$

- **Pure** node: $\text{Gini} = 0$.
- **Balanced** binary node: $\text{Gini} = 1 - (0.5^2 + 0.5^2) = 0.5$ (the maximum for two classes).
  CART chooses the split that most **reduces** Gini (a "Gini gain").

### E. Overfitting & pruning

A fully grown tree can fit the training data perfectly — **high variance / overfitting**. Remedies: **limit depth**, set a minimum samples per leaf, or **prune** (pre- or post-pruning). Decision trees are high-variance, low-bias learners.

### F. Common traps GATE exploits

1. **Entropy uses $\log_2$** (bits). A pure node has $H = 0$.
2. **IG $=$ parent entropy $-$ weighted child entropy** — don't forget the parent term or the size weights.
3. **Gini max for two classes is $0.5$**, while entropy max is $1$ — don't conflate their scales.
4. **ID3 maximizes IG; CART minimizes Gini** — both pick the most "purifying" split.
5. **Children are weighted by their sample fraction** $\lvert S_v\rvert/\lvert S\rvert$.
6. Deep unpruned trees **overfit** (high variance).

## Part 2 — How to Solve (Method)

### Information-gain questions

1. **Parent entropy:** from the overall class counts, $H(S) = -\sum p_c \log_2 p_c$.
2. **Partition** the data by the attribute's values; for each child compute its class proportions and entropy.
3. **Weighted child entropy:** $\sum_v \dfrac{\lvert S_v\rvert}{\lvert S\rvert} H(S_v)$.
4. **IG** $= H(S) - $ (weighted child entropy). Round only at the end.

### Choosing the best attribute

Compute IG (or Gini reduction) for each candidate attribute; **pick the largest**. A split that makes all children **pure** gives the maximum possible IG (equal to the parent entropy).

### Gini questions

$\text{Gini} = 1 - \sum p_c^2$ per node; compare weighted child Gini to the parent.

### Sanity checks

- $0 \le H \le \log_2(N_{\text{classes}})$; $0 \le \text{Gini} \le 1 - 1/(N_{\text{classes}})$.
- $\text{IG} \ge 0$; $\text{IG} = H(\text{parent})$ exactly when the split yields all-pure children.
- A useless split (children with the same proportions as the parent) gives $\text{IG} = 0$.

## Part 3 — Worked Examples

E2 is a real GATE DA question; the rest are standard originals.

---

### Example 1 — Entropy and Gini of a node _(original · Easy–Med)_

**Q.** A node has 6 positive and 2 negative samples. Find its entropy and Gini impurity.

**Solve.** Proportions $p_+ = 6/8 = 0.75$, $p_- = 2/8 = 0.25$.

- **Entropy:** $H = -0.75\log_2 0.75 - 0.25\log_2 0.25 = 0.75(0.415) + 0.25(2) = 0.311 + 0.5 = 0.811$ bits.
- **Gini:** $1 - (0.75^2 + 0.25^2) = 1 - (0.5625 + 0.0625) = 0.375$.

_Method:_ plug proportions into $-\sum p\log_2 p$ and $1 - \sum p^2$.

---

### Example 2 — Information gain of an attribute _(2024 Q62 · NAT · Hard)_

**Q.** 10 matches; winner is the target. By _Pitch_: value $S$ — {Green 3, Blue 2}; value $F$ — {Green 1, Blue 4}. Overall: Green 4, Blue 6. Find $\text{IG}(\text{Target}, \text{Pitch})$ (2 dp).

**Solve.**

- **Parent:** $H = -0.4\log_2 0.4 - 0.6\log_2 0.6 = 0.4(1.322) + 0.6(0.737) = 0.971$.
- **Child $S$** (3,2): $H = -0.6\log_2 0.6 - 0.4\log_2 0.4 = 0.971$.
- **Child $F$** (1,4): $H = -0.2\log_2 0.2 - 0.8\log_2 0.8 = 0.2(2.322) + 0.8(0.322) = 0.722$.
- **Weighted child entropy:** $\tfrac{5}{10}(0.971) + \tfrac{5}{10}(0.722) = 0.846$.
- **IG** $= 0.971 - 0.846 = 0.1245 \approx 0.12$.

**Answer: $0.12$.** _Method:_ parent entropy minus the size-weighted child entropies.

---

### Example 3 — Choosing the best split _(original · Med)_

**Q.** A parent node has 3 "yes" and 3 "no" ($H = 1$). Attribute $A$ splits it into pure $\{3\text{ yes}\}$ and $\{3\text{ no}\}$. Attribute $B$ splits it into $\{2\text{ yes}, 1\text{ no}\}$ and $\{1\text{ yes}, 2\text{ no}\}$. Which split does ID3 prefer?

**Solve.**

- **$A$:** both children pure $\Rightarrow H = 0$ each $\Rightarrow \text{IG}_A = 1 - 0 = 1$.
- **$B$:** each child has proportions $(2/3, 1/3)$, $H = -\tfrac23\log_2\tfrac23 - \tfrac13\log_2\tfrac13 \approx 0.918$; weighted $= 0.918$ $\Rightarrow \text{IG}_B = 1 - 0.918 = 0.082$.
- $\text{IG}_A = 1 > \text{IG}_B = 0.082$.

**Answer: ID3 picks attribute $A$** (a pure split gives the maximum IG). _Method:_ highest IG wins.

---

### Example 4 — Gini impurity _(original · Easy–Med)_

**Q.** A node has 4 samples of class X and 1 of class Y. Find its Gini impurity.

**Solve.** $p_X = 0.8$, $p_Y = 0.2$: $\text{Gini} = 1 - (0.8^2 + 0.2^2) = 1 - (0.64 + 0.04) = 0.32$.

_Method:_ $1 - \sum p_c^2$. (For comparison, a balanced 2-class node would give the maximum $0.5$.)

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.) Use $\log_2 3 \approx 1.585$.

**Q1. ★ (MCQ)** The entropy of a pure node (all samples one class) is
(A) 1 (B) 0.5 (C) 0 (D) $\log_2 n$

**Q2. ★ (MCQ)** The entropy of a node with an equal split of two classes is
(A) 0 (B) 0.5 (C) 1 bit (D) 2 bits

**Q3. ★★ (NAT)** The entropy of a node with 3 positive and 1 negative samples is \***\*\_\_\*\*** (2 dp).

**Q4. ★★ (NAT)** The Gini impurity of a node with 3 positive and 1 negative samples is \***\*\_\_\*\*** (3 dp).

**Q5. ★★ (MCQ)** ID3 selects the splitting attribute with the
(A) lowest information gain (B) highest information gain (C) most values (D) fewest values

**Q6. ★★ (MCQ)** The impurity measure used by CART is
(A) entropy (B) Gini impurity (C) variance (D) margin

**Q7. ★★ (NAT)** The Gini impurity of a balanced two-class node ($p = 0.5, 0.5$) is \***\*\_\_\*\*** .

**Q8. ★★ (MSQ)** Which statements about decision trees are TRUE?
(A) A pure node has entropy 0.
(B) Information gain $=$ parent entropy $-$ weighted child entropy.
(C) The maximum Gini impurity for two classes is 1.
(D) Deep, unpruned trees tend to overfit.

**Q9. ★★ (MCQ)** A fully grown, unpruned decision tree typically has
(A) high bias, low variance (B) low bias, high variance (C) zero variance (D) high bias, high variance

**Q10. ★★ (NAT)** A parent node with entropy 1 is split so that both children are pure. The information gain of this split is \***\*\_\_\*\*** .

## Answer Key & Full Solutions

**Q1 — (C) 0.** A pure node has $p = 1$ for one class, and $-1\log_2 1 = 0$.

**Q2 — (C) 1 bit.** $-0.5\log_2 0.5 - 0.5\log_2 0.5 = 0.5 + 0.5 = 1$.

**Q3 — 0.81.** $p = (0.75, 0.25)$: $H = 0.75\log_2(1/0.75) + 0.25\log_2(1/0.25) = 0.75(0.415) + 0.25(2) = 0.311 + 0.5 = 0.811 \approx 0.81$.

**Q4 — 0.375.** $1 - (0.75^2 + 0.25^2) = 1 - (0.5625 + 0.0625) = 0.375$.

**Q5 — (B) highest information gain.** ID3 greedily maximizes IG at each node.

**Q6 — (B) Gini impurity.** CART splits to reduce Gini.

**Q7 — 0.5.** $1 - (0.5^2 + 0.5^2) = 1 - 0.5 = 0.5$ (the maximum for two classes).

**Q8 — (A), (B), (D).** (C) is **false** — the maximum Gini for two classes is $0.5$, not 1.

**Q9 — (B) low bias, high variance.** Unpruned trees fit training data closely and generalize poorly.

**Q10 — 1.** Pure children have entropy 0, so $\text{IG} = 1 - 0 = 1$ (the maximum possible, equal to the parent entropy).

---

### How to read your score

- **8–10:** decision trees are solid — on to Module 3.6 (Neural Networks).
- **6–7:** re-drill entropy (Q3), Gini (Q4, Q7), and the IG formula (Q10).
- **≤5:** re-read Part 1 B–D and re-work Example 2 step by step (keep $\log_2$ to 3+ decimals).
