---
title: "Module 7: Calculus & Optimization"
nav_order: 8
has_children: true
---

# Module 7: Calculus & Optimization

{% assign pages = site.pages | where: "parent", "Module 7: Calculus & Optimization" | sort: "nav_order" %}
{% for p in pages %}- [{{ p.title }}]({{ p.url | relative_url }})
{% endfor %}
