---
title: "3.6 Neural Networks (MLP)"
parent: "Module 3: Machine Learning"
nav_order: 6
---

# GATE DA · ML Module 3.6 — Neural Networks (MLP)

## Exam Relevance

**Where this sits:** Machine Learning $\rightarrow$ _Neural Networks / Multi-Layer Perceptrons_ — stacked layers of weighted sums and non-linear activations.

**Weightage:** ML is the **#3 subject** ($16.9\%$). NN questions are tested directly:

- **2026 Q56** — count the **learnable parameters** of an MLP
- **2024 Q43** — a **figure-based** ReLU question: for all-positive inputs the network collapses to a linear map, and you find the equivalent single-layer weights (published answer (B) $p{=}24, q{=}24, r{=}36$ — verify against the original figure, since the exact connections must be read off the diagram)

_(2026 Q29, a single SGD step, has ambiguous wording and is treated in Module 3.1.)_

> **Why it matters:** two skills carry the marks — **parameter counting** (multiply adjacent layer sizes, add biases if present) and the **ReLU-identity collapse** (positive pre-activations $\Rightarrow$ ReLU does nothing $\Rightarrow$ the network is linear). Both are mechanical once you see them.

> **Connects to:** **7.2 Differentiability** — backpropagation is the chain rule applied layer by layer; the sigmoid derivative $\sigma'=\sigma(1-\sigma)$ is derived there · **7.3 Optimization** — gradient descent updates the weights; convexity (or lack of it) determines landscape difficulty · **3.7 Bias-Variance** — deep networks are high-variance learners; dropout and regularization address this.

## Part 1 — Theory & Math

### A. Neuron, perceptron, MLP

A **neuron** computes a weighted sum plus bias, then an activation: $a = \phi(w^\top x + b)$. An **MLP** stacks **fully-connected, feed-forward** layers: input $\rightarrow$ hidden layer(s) $\rightarrow$ output.

```
 x1 \
 x2 --> [hidden layer] --> [hidden layer] --> output
 x3 /
```

### B. Activation functions

- **ReLU:** $\operatorname{ReLU}(z) = \max(0, z)$; derivative $1$ if $z>0$, $0$ if $z<0$ (the default in modern nets).
- **Sigmoid:** $\sigma(z) = 1/(1+e^{-z}) \in (0,1)$; **tanh** $\in (-1,1)$; **step** (classic perceptron).
- **Why non-linearity is essential:** without it, a stack of linear layers is **just one linear layer** — no extra expressive power.

### C. Forward pass

Layer by layer: $\;a^{(l)} = \phi\!\big(W^{(l)} a^{(l-1)} + b^{(l)}\big)$, starting from $a^{(0)} = x$.

### D. Counting parameters

For a fully-connected layer mapping $n_{\text{in}}$ neurons to $n_{\text{out}}$ neurons:

$$N_{\text{weights}} = n_{\text{in}} \times n_{\text{out}}, \qquad N_{\text{biases}} = n_{\text{out}} \;(\text{if biases are used}).$$

Total parameters $=$ sum over all layers. _(2026 Q56: sizes $30 \to 4 \to 3 \to 1$, no bias $\Rightarrow 30\cdot4 + 4\cdot3 + 3\cdot1 = 135$.)_

### E. The ReLU positive-input collapse (the 2024 Q43 idea)

If every pre-activation is **positive**, then $\operatorname{ReLU}(z) = z$ — the activation is the **identity**. A ReLU network operating entirely in the positive region is therefore a **composition of linear maps**, which is itself **linear**. So a multi-layer network can be reduced to a single equivalent weight vector: multiply the layer weight matrices. This is why a deep ReLU net, restricted to positive inputs/activations, has an equivalent one-layer form.

### F. Backpropagation (gradients)

Training minimizes a loss by **gradient descent**, with gradients computed by the **chain rule** (backprop) layer by layer. The ReLU gradient is $1$ (active) or $0$ (inactive), which makes backprop cheap.

### G. Expressive power

- A **single perceptron** is a linear classifier — it **cannot** represent **XOR** (not linearly separable); a hidden layer fixes this.
- **Universal approximation:** an MLP with **one hidden layer** (enough neurons) can approximate any continuous function.

### H. Common traps GATE exploits

1. **Parameter count $=$ products of adjacent layer sizes**; add biases ($n_{\text{out}}$ per layer) **only if biases are used**.
2. **ReLU$(z)=z$ only for $z \ge 0$**; for $z<0$ it is $0$.
3. **Without a non-linear activation**, depth adds nothing — the net is linear.
4. **A single perceptron cannot do XOR.**
5. **ReLU is not differentiable at $0$**; its derivative is $1$ for $z>0$, $0$ for $z<0$.
6. Count weights **between every adjacent pair of layers**, not just the first.

## Part 2 — How to Solve (Method)

### Parameter-counting questions

1. List the layer sizes $n_0 \to n_1 \to \dots \to n_L$.
2. Weights $= \sum_{l=1}^{L} n_{l-1}\,n_l$.
3. If biases are used, add $\sum_{l=1}^{L} n_l$.
4. Total $=$ weights $(+\,$biases$)$.

### Forward-pass questions

Compute each layer's pre-activation $W a + b$, apply the activation, and pass forward. For **ReLU**, clamp negatives to $0$.

### ReLU-collapse / equivalence questions

If the problem states inputs (and hence activations) are **positive**, replace every ReLU with the identity and **multiply the weight matrices** to get the single equivalent linear map; read off the equivalent weights.

### Sanity checks

- Parameter count grows fastest at the **widest adjacent pair** (e.g. a large input layer into the first hidden layer).
- A ReLU output is always $\ge 0$.
- If a question removes all non-linearities, the "deep" network must reduce to one linear layer.

## Part 3 — Worked Examples

E3 is a real GATE DA question; the others are clean originals (E2 mirrors the 2024 Q43 idea).

---

### Example 1 — Forward pass through a ReLU network _(original · Med)_

**Q.** Input $x = [1, 2]$. Hidden layer (2 neurons, biases 0): $h_1$ has weights $(1, -1)$, $h_2$ has weights $(2, 1)$, ReLU activation. Output neuron has weights $(1, 1)$ (linear). Find the output.

**Solve.**

- $z_1 = 1(1) + (-1)(2) = -1 \Rightarrow h_1 = \operatorname{ReLU}(-1) = 0$.
- $z_2 = 2(1) + 1(2) = 4 \Rightarrow h_2 = \operatorname{ReLU}(4) = 4$.
- Output $= 1\cdot h_1 + 1\cdot h_2 = 0 + 4 = 4$.

**Answer: $4$.** _Method:_ pre-activation $\to$ ReLU (clamp negatives) $\to$ next layer.

---

### Example 2 — ReLU collapses to a linear map _(original · Med, the 2024 Q43 idea)_

**Q.** Inputs $x_1, x_2 > 0$. Hidden layer (ReLU, biases 0): $h_1 = \operatorname{ReLU}(x_1 + x_2)$, $h_2 = \operatorname{ReLU}(x_1 + 2x_2)$. Output $= 2h_1 + 3h_2$. Find the equivalent single-layer weights on $x_1, x_2$.

**Solve.** Since $x_1, x_2 > 0$, both pre-activations are positive, so ReLU is the identity: $h_1 = x_1 + x_2$, $h_2 = x_1 + 2x_2$. Then
$$\text{output} = 2(x_1 + x_2) + 3(x_1 + 2x_2) = 5x_1 + 8x_2.$$

**Answer: equivalent weights $(5, 8)$.** _Method:_ positive inputs $\Rightarrow$ ReLU $=$ identity $\Rightarrow$ multiply through to a single linear map. _(This is exactly the mechanism 2024 Q43 tests on its 3-input figure.)_

---

### Example 3 — Counting MLP parameters _(2026 Q56 · NAT · Med)_

**Q.** A fully-connected MLP: 30 input neurons $\to$ hidden layer of 4 $\to$ hidden layer of 3 $\to$ 1 output. **No biases.** How many learnable parameters?

**Solve.** Weights per layer $= n_{\text{in}} \times n_{\text{out}}$:

- $30 \times 4 = 120$
- $4 \times 3 = 12$
- $3 \times 1 = 3$
- Total $= 120 + 12 + 3 = 135$.

**Answer: $135$.** _Method:_ sum the products of adjacent layer sizes (no biases to add).

---

### Example 4 — Parameters with biases _(original · Med)_

**Q.** An MLP with sizes $5 \to 3 \to 1$ **with** biases. How many parameters?

**Solve.**

- Layer 1: weights $5\times3 = 15$, biases $3$ $\Rightarrow 18$.
- Layer 2: weights $3\times1 = 3$, biases $1$ $\Rightarrow 4$.
- Total $= 18 + 4 = 22$.

**Answer: $22$.** _Method:_ add $n_{\text{out}}$ biases per layer to the weight counts.

## Part 4 — Practice Questions

Attempt all before opening the solutions. **GATE marking:** NAT & MSQ — no negative marking; single-correct MCQ — penalty for a wrong answer. (★ easy · ★★ medium · ★★★ hard.)

**Q1. ★ (MCQ)** The ReLU activation is defined as
(A) $1/(1+e^{-z})$ (B) $\max(0, z)$ (C) $\tanh(z)$ (D) $z^2$

**Q2. ★★ (NAT)** A fully-connected MLP with sizes $10 \to 5 \to 2$ and **no biases** has \***\*\_\_\*\*** parameters.

**Q3. ★★ (NAT)** A fully-connected MLP with sizes $4 \to 3 \to 1$ **with biases** has \***\*\_\_\*\*** parameters.

**Q4. ★★ (MCQ)** A multi-layer network with **only linear** activations is equivalent to
(A) a single linear layer (B) a decision tree (C) an SVM (D) a deeper non-linear network

**Q5. ★ (NAT)** For a neuron with pre-activation $z = -2$, the ReLU output is \***\*\_\_\*\*** .

**Q6. ★★ (MCQ)** A single perceptron (no hidden layer) **cannot** represent the
(A) AND function (B) OR function (C) XOR function (D) NOT function

**Q7. ★ (NAT)** The derivative of $\operatorname{ReLU}(z)$ at $z = 5$ is \***\*\_\_\*\*** .

**Q8. ★★ (MSQ)** Which statements about neural networks are TRUE?
(A) $\operatorname{ReLU}(z) = \max(0, z)$.
(B) A fully-connected layer from $m$ to $n$ neurons has $m\cdot n$ weights (no bias).
(C) Without non-linear activations, stacked layers collapse to a single linear map.
(D) ReLU is differentiable at every point including $z = 0$.

**Q9. ★★ (NAT)** A fully-connected MLP with sizes $8 \to 4 \to 4 \to 2$ and **no biases** has \***\*\_\_\*\*** parameters.

**Q10. ★★ (MCQ)** The universal approximation theorem states that an MLP with one hidden layer (and enough neurons) can
(A) always train in $O(1)$ time (B) approximate any continuous function (C) avoid all overfitting (D) eliminate the need for data

## Answer Key & Full Solutions

**Q1 — (B) $\max(0, z)$.** ReLU passes positive values and zeroes out negatives.

**Q2 — 60.** $10\times5 + 5\times2 = 50 + 10 = 60$ (no biases).

**Q3 — 19.** Weights $4\times3 + 3\times1 = 12 + 3 = 15$; biases $3 + 1 = 4$; total $= 19$.

**Q4 — (A) a single linear layer.** Composing linear maps yields a linear map — depth adds nothing without non-linearity.

**Q5 — 0.** $\operatorname{ReLU}(-2) = \max(0, -2) = 0$.

**Q6 — (C) XOR.** XOR is not linearly separable; a single perceptron cannot represent it (needs a hidden layer).

**Q7 — 1.** For $z>0$, $\operatorname{ReLU}'(z) = 1$.

**Q8 — (A), (B), (C).** (D) is **false** — ReLU is not differentiable at $z=0$ (a kink there).

**Q9 — 56.** $8\times4 + 4\times4 + 4\times2 = 32 + 16 + 8 = 56$ (no biases).

**Q10 — (B) approximate any continuous function.** That is the statement of the universal approximation theorem.

---

### How to read your score

- **8–10:** neural networks are solid — on to Module 3.7 (Bias–Variance & Cross-Validation).
- **6–7:** re-drill parameter counting (Q2, Q3, Q9) and the ReLU/linearity facts (Q4, Q5, Q8).
- **≤5:** re-read Part 1 D–E; the high-value skills are parameter counting and the ReLU positive-input collapse.
