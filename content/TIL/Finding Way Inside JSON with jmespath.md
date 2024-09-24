---
publish: false
tags:
  - til
  - Python
date: 2024-08-24
created_date: 2024-08-24
---
I've been using `jq` on and off to work with JSON data in terminal, having a language to query JSON data circumvent a lot of verbosity I usually do when I do the same thing in python (converting it into python dict and do the processing as dict).

All this time I tried to bear the pain of working with python dictionary when wrangling JSON data. And I've just found out that there's this query language called [JMESPath](https://jmespath.org) that can do things similar to what `jq` could do in my case. And fortunately there's [python library for it](https://github.com/jmespath/jmespath.py), which makes it easier for me to experiment around with it.

## Why can't you just do `a_dict['key1']['key2']`?

Just like a python developer you are. Actually as mentioned in my other TIL about `TypeDict` [[Use TypedDict (or, How to Make Collections Bearable)]], python with `TypedDict` helped a lot in making things predictable when working with dictionary. 

But there's this one specific pattern that makes me want to adapt JMESPath to my toolkit, i.e list inside dict.