---
title: "Module 4: Databases & Warehousing"
nav_order: 5
has_children: true
---

# Module 4: Databases & Warehousing

{% assign pages = site.pages | where: "parent", "Module 4: Databases & Warehousing" | sort: "nav_order" %}
{% for p in pages %}- [{{ p.title }}]({{ p.url | relative_url }})
{% endfor %}
