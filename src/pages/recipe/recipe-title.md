---
setup: |
  import Layout from '../../layouts/PostLayout.astro'
title: Hello world!
# publishDate: 12 Sep 2021
name: Dr. Pepper
value: 128
description: Just a Hello World Post!
---

This is so cool! {frontmatter.value}

Do variables work {frontmatter.value * 2}? Hello world!

```javascript
// Example JavaScript

const x = 7;
function returnSeven() {
  return x;
}

```
