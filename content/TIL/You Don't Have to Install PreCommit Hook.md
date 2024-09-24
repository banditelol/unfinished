---
publish: false
tags:
  - til
  - Python
  - Git
  - CI/CD
date: 2024-07-17
created_date: 2024-07-17
---
Yup, You don't have to and IMHO you shouldn't be forced to install it as hook. Since your workflow can be grossly affected by using pre-commit hook especially if somehow there's a long running check inside the pre-commit (E2E test for example).

But! 