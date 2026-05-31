---
title: "Module 3: Machine Learning"
nav_order: 4
has_children: true
---

# Module 3: Machine Learning

{% assign pages = site.pages | where: "parent", "Module 3: Machine Learning" | sort: "nav_order" %}
{% for p in pages %}- [{{ p.title }}]({{ p.url | relative_url }})
{% endfor %}
