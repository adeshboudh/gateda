---
title: "Module 6: Artificial Intelligence"
nav_order: 7
has_children: true
---

# Module 6: Artificial Intelligence

{% assign pages = site.pages | where: "parent", "Module 6: Artificial Intelligence" | sort: "nav_order" %}
{% for p in pages %}- [{{ p.title }}]({{ p.url | relative_url }})
{% endfor %}
