---
title: "3.8 Clustering"
parent: "Module 3: Machine Learning"
nav_order: 8
---

# GATE DA · ML Module 3.8 — Clustering

## Exam Relevance

**Where this sits:** Machine Learning $\rightarrow$ *Clustering* — the main **unsupervised** topic (no labels; group similar points).

**Weightage:** ML is the **#3 subject** ($16.9\%$), and **clustering is a flagged recurring topic**:
- **2024 Q42** — **single-linkage** hierarchical clustering: read the dendrogram from a distance matrix
- **2025 Q30** — the **definitions**: single linkage $=$ min distance, complete linkage $=$ max distance
- **2026 Q36** — **HAC** with **Manhattan** distance: which pair merges first
- **2026 Q23** — K-Medoid is the clustering algorithm (task matching; also in Module 3.3)

*(No k-means computation appeared in 2024–2026, but k-means is core syllabus — covered at fundamentals below.)*

> **Why it matters:** these are distance-and-merge computations. Lock in **single $=$ min, complete $=$ max**, that **HAC merges the closest pair first**, and the k-means assign/update loop.

## Part 1 — Theory & Math

### A. k-means
Partition $n$ points into $k$ clusters by iterating two steps until stable:
1. **Assign** each point to the **nearest centroid** (usually Euclidean).
2. **Update** each centroid to the **mean** of its assigned points.

It (locally) minimizes the **within-cluster sum of squares** $\sum_{c}\sum_{x \in c} \lVert x - \mu_c\rVert^2$. Notes: centroids are **means** (need not be data points); it converges to a **local** optimum and is **sensitive to initialization**; $k$ must be chosen in advance.

### B. k-medoid (PAM)
Like k-means, but each cluster's representative is a **medoid — an actual data point** (the most central one), not a computed mean. **More robust to outliers** and works with any distance metric. (This is the clustering algorithm in 2026 Q23.)

### C. Hierarchical agglomerative clustering (HAC)
Start with each point as its own cluster; repeatedly **merge the two closest clusters** until one remains, recording the merges as a **dendrogram** (merge **height** $=$ the distance at which they joined). The inter-cluster distance depends on the **linkage**:
- **Single linkage** $=$ **minimum** pairwise distance between members (nearest pair). Can "chain."
- **Complete linkage** $=$ **maximum** pairwise distance (farthest pair). Compact clusters.
- **Average linkage** $=$ mean pairwise distance.

HAC does **not** require $k$ in advance — you cut the dendrogram at a chosen height.

### D. Distance metrics
- **Euclidean:** $\sqrt{\sum_i (a_i - b_i)^2}$.
- **Manhattan (L1):** $\sum_i |a_i - b_i|$ (used in 2026 Q36).

### E. Common traps GATE exploits
1. **Single linkage $=$ min, complete linkage $=$ max** — the most-tested fact.
2. **HAC merges the globally closest pair first** (smallest entry in the distance matrix).
3. **k-means centroids are means** (may not be data points); **k-medoids are actual points**.
4. **k-means finds a local optimum** and depends on initialization.
5. **HAC needs no $k$ upfront**; k-means / k-medoid do.
6. **Dendrogram height $=$ merge distance** — lower merges are more similar.

## Part 2 — How to Solve (Method)

### Hierarchical clustering (dendrogram / merge order)
1. From the points, build the **pairwise distance matrix** (or use the one given).
2. **Find the smallest distance**; **merge** that pair (record the height).
3. **Update** distances from the new cluster to the rest using the linkage rule (**min** for single, **max** for complete).
4. Repeat until one cluster remains; the recorded heights give the dendrogram.
- **"Which pair merges first?"** $=$ the globally smallest pairwise distance.

### k-means (one iteration)
1. **Assign:** each point to its nearest centroid.
2. **Update:** each centroid $=$ mean of its assigned points.
3. Repeat until assignments stop changing.

### Distances
Manhattan $=$ sum of absolute coordinate differences; Euclidean $=$ root of summed squares.

### Sanity checks
- Single-linkage merge distances are **non-decreasing** up the dendrogram.
- A centroid must lie **within the range** of its cluster's points.
- The first HAC merge is always the matrix's minimum off-diagonal entry.

## Part 3 — Worked Examples

E1–E3 are real GATE DA questions; E4 is a standard original (k-means).

---

### Example 1 — Single-linkage dendrogram *(2024 Q42 · MCQ · Med)*
**Q.** Single-linkage clustering on $x_1,\dots,x_5$ with the distance matrix:
$d_{12}{=}1, d_{13}{=}4, d_{14}{=}3, d_{15}{=}6, d_{23}{=}3, d_{24}{=}5, d_{25}{=}3, d_{34}{=}2, d_{35}{=}5, d_{45}{=}1$. Which dendrogram is produced?

**Solve (single linkage = min).**
| Step | Merge | Height |
|---|---|---|
| 1 | $x_1, x_2$ (d=1) | 1 |
| 2 | $x_4, x_5$ (d=1) | 1 |
| 3 | $x_3$ with $\{x_4,x_5\}$ ($\min(d_{34},d_{35})=\min(2,5)=2$) | 2 |
| 4 | $\{x_1,x_2\}$ with $\{x_3,x_4,x_5\}$ ($\min = 3$) | 3 |
```
 h=3  ┌──────────┴──────────┐
 h=2  │               ┌──────┴───┐
 h=1 ┌┴┐            ┌─┴─┐        │
     x1 x2          x4  x5      x3
```
**Answer: (C)** — $x_1{-}x_2$ pair low, $x_4{-}x_5$ pair low with $x_3$ joining at a mid-height, both halves merging at the top. *Method:* repeatedly merge the minimum distance; update with the min rule.

---

### Example 2 — Linkage definitions *(2025 Q30 · MSQ · Easy–Med)*
**Q.** With $\text{DIS-1} = \max_{x\in C_1, y\in C_2} D(x,y)$ and $\text{DIS-2} = \min_{x\in C_1, y\in C_2} D(x,y)$, which are correct? (A) Single linkage uses DIS-1 (B) Single linkage uses DIS-2 (C) Complete linkage uses DIS-2 (D) Complete linkage uses DIS-1.

**Solve.** Single linkage $=$ distance between the **nearest** members $=$ **min** $=$ DIS-2 $\Rightarrow$ (B). Complete linkage $=$ distance between the **farthest** members $=$ **max** $=$ DIS-1 $\Rightarrow$ (D).

**Answer: (B) and (D).** *Method:* single $\to$ nearest (min), complete $\to$ farthest (max).

---

### Example 3 — First HAC merge with Manhattan distance *(2026 Q36 · MCQ · Med)*
**Q.** Points $P_1{=}(2,3,-1)$, $P_2{=}(3,1,1)$, $P_3{=}(5,-2,3)$, $P_4{=}(3,3,3)$. Using HAC with **Manhattan** distance, which pair merges first?
(A) $P_1,P_2$ (B) $P_2,P_3$ (C) $P_3,P_4$ (D) $P_2,P_4$

**Solve.** Manhattan $=$ sum of $|{\Delta}|$ per coordinate:
- $d(P_1,P_2)=1+2+2=5$; $d(P_1,P_3)=3+5+4=12$; $d(P_1,P_4)=1+0+4=5$
- $d(P_2,P_3)=2+3+2=7$; $\mathbf{d(P_2,P_4)=0+2+2=4}$; $d(P_3,P_4)=2+5+0=7$

The minimum is $4$, between $P_2$ and $P_4$.

**Answer: (D) $P_2, P_4$.** *Method:* HAC merges the globally smallest pairwise distance first.

---

### Example 4 — One iteration of k-means *(original · Med)*
**Q.** Points $(1,1), (2,1), (4,3), (5,4)$; $k=2$ with initial centroids $c_1=(1,1)$, $c_2=(5,4)$. Do one assign-and-update step.

**Solve.**
- **Assign** (nearest centroid): $(1,1)\to c_1$; $(2,1)\to c_1$; $(4,3)\to c_2$ (closer to $(5,4)$); $(5,4)\to c_2$.
- **Update** centroids to cluster means: $c_1 = \big(\tfrac{1+2}{2}, \tfrac{1+1}{2}\big) = (1.5, 1)$; $c_2 = \big(\tfrac{4+5}{2}, \tfrac{3+4}{2}\big) = (4.5, 3.5)$.

**Answer:** clusters $\{(1,1),(2,1)\}$ and $\{(4,3),(5,4)\}$; new centroids $(1.5,1)$ and $(4.5,3.5)$. *Method:* assign to nearest centroid, then recompute means.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** Clustering is a __________ learning task.
(A) supervised (B) unsupervised (C) reinforcement (D) semi-supervised only

**Q2. ★★ (MCQ)** In single-linkage clustering, the distance between two clusters is the
(A) maximum pairwise distance (B) minimum pairwise distance (C) average pairwise distance (D) centroid distance

**Q3. ★★ (MCQ)** In complete-linkage clustering, the distance between two clusters is the
(A) minimum pairwise distance (B) maximum pairwise distance (C) median distance (D) sum of distances

**Q4. ★★ (MCQ)** The cluster representative in k-medoid is
(A) the mean of the points (B) an actual data point (medoid) (C) the origin (D) a random point

**Q5. ★★ (NAT)** The Manhattan distance between $(1, 2, 3)$ and $(4, 0, 3)$ is __________ .

**Q6. ★★ (MCQ)** Points A, B, C have pairwise distances $d(A,B)=2$, $d(A,C)=5$, $d(B,C)=3$. In HAC, the first merge is
(A) A, B (B) A, C (C) B, C (D) all at once

**Q7. ★★ (MCQ)** k-means is sensitive to
(A) the choice of distance only (B) centroid initialization (it finds a local optimum) (C) nothing — it is globally optimal (D) the order of features

**Q8. ★★ (MSQ)** Which statements are TRUE?
(A) Single linkage uses the minimum inter-cluster distance.
(B) Complete linkage uses the maximum inter-cluster distance.
(C) k-medoid uses actual data points as cluster centers.
(D) Hierarchical agglomerative clustering requires $k$ to be specified in advance.

**Q9. ★★ (NAT)** A cluster contains the points $(2,2), (4,4), (0,6)$. The $x$-coordinate of its centroid is __________ .

**Q10. ★★ (MCQ)** In a dendrogram, the height at which two clusters merge represents
(A) the number of points (B) the distance at which they merge (C) the cluster index (D) the iteration count only

## Answer Key & Full Solutions

**Q1 — (B) unsupervised.** Clustering groups unlabeled data by similarity.

**Q2 — (B) minimum pairwise distance.** Single linkage = nearest members.

**Q3 — (B) maximum pairwise distance.** Complete linkage = farthest members.

**Q4 — (B) an actual data point (medoid).** Unlike k-means (a computed mean), k-medoid picks a real point.

**Q5 — 5.** $|1-4| + |2-0| + |3-3| = 3 + 2 + 0 = 5$.

**Q6 — (A) A, B.** The smallest distance is $d(A,B) = 2$, so A and B merge first.

**Q7 — (B) centroid initialization.** k-means converges to a local optimum that depends on the starting centroids.

**Q8 — (A), (B), (C).** (D) is **false** — HAC builds the full dendrogram without a preset $k$ (you cut it afterward).

**Q9 — 2.** Centroid $x = (2 + 4 + 0)/3 = 6/3 = 2$.

**Q10 — (B) the distance at which they merge.** Dendrogram height encodes the inter-cluster distance.

---

### How to read your score
- **8–10:** clustering is solid — on to Module 3.9 (PCA & Dimensionality Reduction), the last ML module.
- **6–7:** re-drill single-vs-complete linkage (Q2, Q3, Q8) and the k-means/k-medoid distinction (Q4, Q7).
- **≤5:** re-read Part 1 A–C and re-work the single-linkage merge in Example 1 step by step.
