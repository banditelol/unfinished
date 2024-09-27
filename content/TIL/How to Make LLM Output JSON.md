---
publish: true
tags:
  - til
  - llm
  - python
  - pydantic
date: 2024-09-27
created_date: 2024-09-27
---
## `ell` Looks Good
I just saw a new repo called [ell](https://github.com/MadcowD/ell) and it can make llm returns structured data determined by `pydantic` model. Taken from the docs:
```python
from pydantic import BaseModel, Field

class MovieReview(BaseModel):
    title: str = Field(description="The title of the movie")
    rating: int = Field(description="The rating of the movie out of 10")
    summary: str = Field(description="A brief summary of the movie")

@ell.complex(model="gpt-4o-2024-08-06", response_format=MovieReview)
def generate_movie_review(movie: str) -> MovieReview:
    """You are a movie review generator. Given the name of a movie, you need to return a structured review."""
    return f"generate a review for the movie {movie}"
```
Besides the (IMHO) unsettling usage of docstring as system prompt and the fact that the returned string is not what the function returns, it's a lot simpler than `langchain` and `llamaindex` invocation (given they also provide a lot more flexibility).
Anyway I thought it could work with all LLM, but looking at the documentation it seems to use a new OpenAI client's beta feature, i.e. `client.beta.chat.completions.parse` which you can read more on [OpenAI Blog Post from last Aug](client.beta.chat.completions.parse).

## Not on the Shoulder of `Instructor`
And here I thought they were building on top of [Instructor](https://github.com/jxnl/instructor), another great piece of library to output structured data
```python
import instructor
from pydantic import BaseModel
from openai import OpenAI

# Define your desired output structure
class UserInfo(BaseModel):
    name: str
    age: int

# Patch the OpenAI client
client = instructor.from_openai(OpenAI())

# Extract structured data from natural language
user_info = client.chat.completions.create(
    model="gpt-3.5-turbo",
    response_model=UserInfo,
    messages=[{"role": "user", "content": "John Doe is 30 years old."}],
)

print(user_info.name)
#> John Doe
print(user_info.age)
#> 30
```
as you can see the pattern is similar, and it actually supports a lot of models at the time of writing. They're doing this by *Patching* the llm client as seen in `instructor.from_openai` part of the code. And it brought me to another question

## What Actually is Patching?

> TLDR; Adding [This Piece of Code](https://github.com/jxnl/instructor/blob/6846338f9ba63c16028f41a540d4797d2e6d191f/instructor/process_response.py#L175)

From the docs the patching actually do several things to the llm client. But what I want to know is what actually is sent to the client? Especially what kind of magic that can help in making LLM return proper structured data.
Well, the answer is it's not magic. As seen in [this function](https://github.com/jxnl/instructor/blob/6846338f9ba63c16028f41a540d4797d2e6d191f/instructor/process_response.py#L175) it's just ifs and else™️. Really, there's a lot of cases for all the supported models and it's inside this huge function containing if and else. But I especially love Google's `gemini` system prompt
```python
message = dedent(
	f"""
	As a genius expert, your task is to understand the content and provide
	the parsed objects in json that match the following json_schema:\n
	
	{json.dumps(response_model.model_json_schema(), indent=2, ensure_ascii=False)}
	
	Make sure to return an instance of the JSON, not the schema itself
	"""
	)
```
just look at that encouraging `As a genius expert` part, I hope someday someone ask that of me ;)