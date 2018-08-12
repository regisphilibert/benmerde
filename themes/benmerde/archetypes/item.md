---
title: "{{ replace .Name "-" " " | title }}"
weight: {{ where .Site.RegularPages "Type" "item" | len | add 1 }}
image: filename.jpg
origin: Japon
mass: 100
price:
  yen: 100

---