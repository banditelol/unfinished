---
publish: true
tags:
  - til
  - python
  - typing
date: 2024-04-23
created_date: 2024-04-23
---
# Use `TypedDict`!

If there's one thing that you can take away from this TIL, there's almost no reason to not use `TypedDict` in python. If you're on python 3.8 or higher (and yes, you need to use python higher than 3.8, I would highly recommend use 3.10 for newer project in 2024). It can be as simple as:
```python
from typing import TypedDict

class ConfigDict(TypedDict):
	host: str
	port: int
	user: str

config : ConfigDict = {"host": "localhost", "port": 5432, "user": "dev"}
```

But, you may say:
> Why not use `dataclass` instead? or even better `pydantic` so that we can parse the dictionary? Oh there's also a package called `dynaconf` and `omdegaconf` that can handle cascading config!

Yup, you're probably right and definitely really excited, but hear me out. I write this for people who still uses a lot of dictionary in their python code, not that it's wrong but we often do put together a quick PoC and still don't know the shape of our data yet. But we grow out of that project phase, and we want to either have our code self explain or work with other developer. This is the first step that I want you to do and start maybe investing your time in when refactoring that code.

## What we Gain? Auto Suggestion!

This is reason enough to use `TypedDict` in your code, especially if you're on VSCode with Pylance extension. Just by adding type hinting to your dictionary object, you can get this for free:
![[Use TypedDict (or, How to Make Collections Bearable).png]]
You get suggestion for the `dict`'s key! And you know what's neater? Your editor can also suggest you the method that's valid for the object type! Can you imagine how a lifesaver this when I can't get my brain to remember whether I need `capitalise` or `capitalize` to make stuff CAPITAL?
![[Use TypedDict (or, How to Make Collections Bearable)-1.png]]

## What we don't Get? Other Object!

While I believe `dataclass`, Pydantic's `BaseModel` have a whole lot of features that we can use to make our code read better and can validate our data, and OmegaConf is one of my goto for parsing configuration file, but all of them need us to pass our data into their class constructor one way or another. Which may not be fully compatible with how we use our dict. I mean even something as simple as getting an item is not compatible, and we need to change our code significantly.
```python
@dataclass
class ConfigData:
    host: str
    port: int
    user: str


config_data = ConfigData(**config)

config["host"]  # OK

config_data["host"]  # Error
config_data.__dict__["host"]  # OK
```
Whether it is worth it or not is another topic, but being aware that the alternative may introduce either bug or another hours of work is still important.

## Any Other Tips?

Oh? glad you asked :) here are some quick rounds, I may create another TIL on these for more details

### Use Literal for Choice in Public Interface

Sometimes we want to expose a function with a certain category for it's argument, using using `bool` flag can make our parameter too crowded, using `str` don't really tell our user what string to pass, using `enum` will imply our user need to import the related enum class. We could use `Literal` in this case.
![[Use TypedDict (or, How to Make Collections Bearable)-2.png]]

### `dict` is Somehow Similar to `set`

Ever want to combine to `dict`? 
```python
first_dict = {"a":1}
second_dict = {"b":2}
```
There are several methods:
```python
new_dict_1 = first_dict.update(second_dict)
new_dict_2 = {**first_dict, **second_dict}
new_dict_3 = first_dict | second_dict
```

### Want to do Typehint in `pandas`?

Though luck then, since `pandera` just started offering experimental support for `mypy`, while VSCode uses `pyright`. I really hope it would get better over time. For now what we can do is using `assign` well. Instead of having our function takes `pd.DataFrame` and lost all information on the column name in our editor, we could structure it as function with multiple `pd.Series` as its parameter.
```python
import pandas as pd

def sum_two_columns_df(df: pd.DataFrame):
    return df["a"] + df["b"]


def sum_two_columns_series(a: pd.Series, b: pd.Series):
    """Sum two pandas Series. We don't need to know the name of the columns."""
    return a + b


df = pd.DataFrame({"a": [1, 2, 3], "b": [4, 5, 6]})

res = sum_two_columns_df(df) # OK
res = sum_two_columns_series(df["a"], df["b"]) # Better, since in this scope we know df contains columns "a" and "b"
```

## Want More?

Wow, I can't believe you reach this spot in my TIL. If you want to discuss more things about python, data or Machine Learning, hit me up on [Twitter](https://twitter.com/@banditelolRP) (or X actually, I still haven't wrapped my head around it) and either DM me your question or discuss this TIL on the thread!