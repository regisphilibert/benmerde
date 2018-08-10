---
title: "{{ replace .Name "-" " " | title }}"
weight: {{ where .Site.RegularPages "Type" "item" | len | add 1 }}
image: filename.jpg
mass: 100
origin: Japon
price:
  yen: 100

---

