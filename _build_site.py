#!/usr/bin/env python3
"""Generate just-the-docs scaffolding + front-matter for GATE DA notes."""
import os, re

ROOT = os.path.dirname(os.path.abspath(__file__))

# Top-level sections: dir -> (nav_title, nav_order)
SECTIONS = {
    "module1":   ("Module 1: Probability & Statistics", 2),
    "module2":   ("Module 2: Programming & DSA",        3),
    "module3":   ("Module 3: Machine Learning",         4),
    "module4":   ("Module 4: Databases & Warehousing",  5),
    "module5":   ("Module 5: Linear Algebra",           6),
    "module6":   ("Module 6: Artificial Intelligence",  7),
    "module7":   ("Module 7: Calculus & Optimization",  8),
    "cheatsheet":("Cheat Sheets",                       9),
    "rivision":  ("Revision Docs",                     10),
    "docs":      ("Strategy & Roadmap",                11),
}

# Per-file child titles (nav_order = list index+1). Files not listed get derived title.
TITLES = {
 "module1": {
  "gate-da-p-s-module-1-1-counting-basic-probability.md": "1.1 Counting & Basic Probability",
  "gate-da-p-s-module-1-2-conditional-probability-bayes-theorem.md": "1.2 Conditional Probability & Bayes",
  "gate-da-p-s-module-1-3-random-variables-expectation-variance.md": "1.3 Random Variables, Expectation & Variance",
  "gate-da-p-s-module-1-4-discrete-distributions-bernoulli-binomial-poisson.md": "1.4 Discrete Distributions",
  "gate-da-p-s-module-1-5-continuous-distributions-uniform-exponential-normal.md": "1.5 Continuous Distributions",
  "gate-da-p-s-module-1-6-joint-distributions-covariance-correlation.md": "1.6 Joint Distributions, Covariance & Correlation",
  "gate-da-p-s-module-1-7-sampling-distributions-the-central-limit-theorem.md": "1.7 Sampling Distributions & CLT",
  "gate-da-p-s-module-1-8-descriptive-statistics-confidence-intervals-hypothesis-te.md": "1.8 Descriptive Stats, CI & Hypothesis Testing",
 },
 "module2": {
  "gate-da-pdsa-module-2-1-python-programming-semantics.md": "2.1 Python Programming Semantics",
  "gate-da-pdsa-module-2-2-complexity-analysis-recursion.md": "2.2 Complexity Analysis & Recursion",
  "gate-da-pdsa-module-2-3-linear-data-structures-arrays-stacks-queues-linked-lists.md": "2.3 Linear Data Structures",
  "gate-da-pdsa-module-2-4-trees-hash-tables.md": "2.4 Trees & Hash Tables",
  "gate-da-pdsa-module-2-5-searching-linear-binary.md": "2.5 Searching",
  "gate-da-pdsa-module-2-6-sorting.md": "2.6 Sorting",
  "gate-da-pdsa-module-2-7-divide-conquer.md": "2.7 Divide & Conquer",
  "gate-da-pdsa-module-2-8-graphs.md": "2.8 Graphs",
 },
 "module3": {
  "gate-da-ml-module-3-1-linear-ridge-regression.md": "3.1 Linear & Ridge Regression",
  "gate-da-ml-module-3-2-logistic-regression-classification-metrics.md": "3.2 Logistic Regression & Metrics",
  "gate-da-ml-module-3-3-knn-naive-bayes-lda.md": "3.3 kNN, Naive Bayes & LDA",
  "gate-da-ml-module-3-4-support-vector-machines.md": "3.4 Support Vector Machines",
  "gate-da-ml-module-3-5-decision-trees.md": "3.5 Decision Trees",
  "gate-da-ml-module-3-6-neural-networks-mlp.md": "3.6 Neural Networks (MLP)",
  "gate-da-ml-module-3-7-bias-variance-cross-validation.md": "3.7 Bias-Variance & Cross-Validation",
  "gate-da-ml-module-3-8-clustering.md": "3.8 Clustering",
  "gate-da-ml-module-3-9-pca-dimensionality-reduction.md": "3.9 PCA & Dimensionality Reduction",
 },
 "module4": {
  "gate-da-dbw-module-4-1-er-relational-models.md": "4.1 ER & Relational Models",
  "gate-da-dbw-module-4-2-relational-algebra-tuple-calculus.md": "4.2 Relational Algebra & Tuple Calculus",
  "gate-da-dbw-module-4-3-sql.md": "4.3 SQL",
  "gate-da-dbw-module-4-4-functional-dependencies-normalization.md": "4.4 Functional Dependencies & Normalization",
  "gate-da-dbw-module-4-5-file-organization-indexing.md": "4.5 File Organization & Indexing",
  "gate-da-dbw-module-4-6-data-warehousing-olap.md": "4.6 Data Warehousing & OLAP",
  "gate-da-dbw-module-4-7-data-transformation.md": "4.7 Data Transformation",
 },
 "module5": {
  "gate-da-la-module-5-1-vector-spaces-subspaces-linear-independence-basis.md": "5.1 Vector Spaces & Basis",
  "gate-da-la-module-5-2-rank-nullity-linear-systems-gaussian-elimination.md": "5.2 Rank-Nullity & Linear Systems",
  "gate-da-la-module-5-3-determinants-eigenvalues-eigenvectors.md": "5.3 Determinants, Eigenvalues & Eigenvectors",
  "gate-da-la-module-5-4-special-matrices-projections.md": "5.4 Special Matrices & Projections",
  "gate-da-la-module-5-5-quadratic-forms-positive-definiteness.md": "5.5 Quadratic Forms & Positive Definiteness",
  "gate-da-la-module-5-6-singular-value-decomposition-lu-decomposition.md": "5.6 SVD & LU Decomposition",
 },
 "module6": {
  "gate-da-ai-module-6-1-uninformed-informed-search.md": "6.1 Uninformed & Informed Search",
  "gate-da-ai-module-6-2-adversarial-search-minimax-alpha-beta-pruning.md": "6.2 Adversarial Search",
  "gate-da-ai-module-6-3-propositional-logic.md": "6.3 Propositional Logic",
  "gate-da-ai-module-6-4-first-order-predicate-logic.md": "6.4 First-Order Predicate Logic",
  "gate-da-ai-module-6-5-reasoning-under-uncertainty-bayesian-networks.md": "6.5 Reasoning Under Uncertainty",
 },
 "module7": {
  "gate-da-co-module-7-1-limits-continuity-series.md": "7.1 Limits, Continuity & Series",
  "gate-da-co-module-7-2-differentiability-taylor-series.md": "7.2 Differentiability & Taylor Series",
  "gate-da-co-module-7-3-maxima-minima-optimization.md": "7.3 Maxima, Minima & Optimization",
 },
 "cheatsheet": {
  "gate-da-p-s-cheat-sheet-probability-statistics-formulas.md": "Probability & Statistics",
  "gate-da-pdsa-cheat-sheet-programming-data-structures-algorithms.md": "Programming & DSA",
  "gate-da-ml-cheat-sheet-machine-learning-formulas.md": "Machine Learning",
  "gate-da-dbw-cheat-sheet-database-warehousing-reference.md": "Databases & Warehousing",
  "gate-da-la-cheat-sheet-linear-algebra-formulas.md": "Linear Algebra",
  "gate-da-ai-cheat-sheet-artificial-intelligence-reference.md": "Artificial Intelligence",
  "gate-da-calculus-cheat-sheet-calculus-optimization-formulas.md": "Calculus & Optimization",
 },
 "rivision": {
  "gate-da-p-s-revision-doc-probability-statistics-subject-1.md": "Subject 1: Probability & Statistics",
  "gate-da-pdsa-revision-doc-programming-data-structures-algorithms-subject-2.md": "Subject 2: Programming & DSA",
  "gate-da-ml-revision-doc-machine-learning-subject-3.md": "Subject 3: Machine Learning",
  "gate-da-dbw-revision-doc-database-management-warehousing-subject-4.md": "Subject 4: Databases & Warehousing",
  "gate-da-la-revision-doc-linear-algebra-subject-5.md": "Subject 5: Linear Algebra",
  "gate-da-ai-revision-doc-artificial-intelligence-subject-6.md": "Subject 6: Artificial Intelligence",
  "gate-da-calculus-revision-doc-calculus-optimization-subject-7.md": "Subject 7: Calculus & Optimization",
 },
 "docs": {
  "GATE_DA_2027_roadmap.md": "Roadmap",
  "GATE_DA_2027_prep_strategy.md": "Prep Strategy",
  "GATE_DA_topic_analysis.md": "Topic Analysis",
 },
}

def has_frontmatter(text):
    return text.lstrip().startswith("---")

def yaml_escape(s):
    return s.replace('"', '\\"')

def order_for(section, fname):
    keys = list(TITLES[section].keys())
    return keys.index(fname) + 1 if fname in keys else 99

for section, (sec_title, sec_order) in SECTIONS.items():
    sdir = os.path.join(ROOT, section)
    if not os.path.isdir(sdir):
        continue
    # parent index page for the section
    idx = os.path.join(sdir, "index.md")
    if not os.path.exists(idx):
        with open(idx, "w") as f:
            f.write(f'''---
title: "{yaml_escape(sec_title)}"
nav_order: {sec_order}
has_children: true
---

# {sec_title}

{{% assign pages = site.pages | where: "parent", "{yaml_escape(sec_title)}" | sort: "nav_order" %}}
{{% for p in pages %}}- [{{{{ p.title }}}}]({{{{ p.url | relative_url }}}})
{{% endfor %}}
''')
        print("created", idx)
    # children
    for fname in sorted(os.listdir(sdir)):
        if not fname.endswith(".md") or fname == "index.md":
            continue
        fp = os.path.join(sdir, fname)
        with open(fp, "r") as f:
            body = f.read()
        if has_frontmatter(body):
            print("skip (has front-matter):", fp)
            continue
        title = TITLES.get(section, {}).get(fname)
        if not title:
            title = re.sub(r'\.md$', '', fname).replace('-', ' ').replace('_', ' ').title()
        order = order_for(section, fname)
        fm = (f'---\ntitle: "{yaml_escape(title)}"\n'
              f'parent: "{yaml_escape(sec_title)}"\n'
              f'nav_order: {order}\n---\n\n')
        with open(fp, "w") as f:
            f.write(fm + body)
        print("front-matter +", fp)

print("DONE")
