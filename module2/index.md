---
title: "Module 2: Programming & DSA"
nav_order: 3
has_children: true
---

# Module 2: Programming & DSA

{% assign pages = site.pages | where: "parent", "Module 2: Programming & DSA" | sort: "nav_order" %}
{% for p in pages %}- [{{ p.title }}]({{ p.url | relative_url }})
{% endfor %}
