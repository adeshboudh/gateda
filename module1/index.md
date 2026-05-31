---
title: "Module 1: Probability & Statistics"
nav_order: 2
has_children: true
---

# Module 1: Probability & Statistics

{% assign pages = site.pages | where: "parent", "Module 1: Probability & Statistics" | sort: "nav_order" %}
{% for p in pages %}- [{{ p.title }}]({{ p.url | relative_url }})
{% endfor %}
