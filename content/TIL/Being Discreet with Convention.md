---
publish: true
tags:
  - til
  - Python
  - Convention
date: 2024-09-25
created_date: 2024-09-25
---
## Competing Needs

A lot of times when we're creating a class in python, there are 3 competing needs: 
- We want all of functionality related to that class in the same place, 
- We want to be able to separate functions to be able to test it easily
- We only want to expose a subset of our class methods, so that the user only use what we intend them to use. And we can be a bit messy for the rest of the method.

To solve this, usually we separate the method in the class to three types:
1. `public` --> method that's exposed to the user, usually there are only a couple of method that's the canonical way of using the class. For example: torch's `forward`, `train`, and `valid` method, sklearn's `fit` and `predict`, etc.
2. `protected` --> we could use this to untangle big function into smaller one without polluting the class public interface. Or since protected method will be inherited, we could use this to define a set of abstract method a subclass need to be implemented that will be called by the parent's public interface.
3. `private` --> method that exist only inside that class (not exposed), will not be inherited. Especially useful if you don't want to pollute children class namespace.

## Python Convention

But in python there's actually no dedicated way of handling it as opposed to `protected` and `private` keyword of Java. But we have several convention that also work well with `pylint`.

### Public Method

```python
class Fruit:
	def main(self):
		...

fruit = Fruit()
fruit.main()
```
in this case `main` is a public method of a class fruit, and will be both inherited and can be called from the object directly. This is the default type of class that we use.

### Protected Method

```python
class Fruit:
	def main(self):
		self._protected_function()
		...

	def _protected_function(self):
		...

fruit = Fruit()
fruit._protected_function()
```
The above will work just fine without any issue when run. "But isn't that supposed to be a protected function?" you might say, and it's true that python doesn't enforce it as it is only a convention. Fortunately `pylint` support the rule for it, and will show those yellow squiggly line under that part.
![[Being Discreet with Convention.png]]

### Private Method

```python
class Fruit:
	def main(self):
		...

	def __private_function(self):
		...

class Apple(Fruit):
	def main(self):
		...

fruit = Fruit()
fruit.__private_function()

apple = apple()
apple.__private_function()
```

Both won't be accessible, but if you really want to access that function there's no-one stopping you from doing this:
```python
fruit._Fruit__private_function()
```

but, I mean, look at that ugly underscores!
you won't want to do that right?

## Use It for Your User

Now, use it for the sake of your user. Not the user user, but the developer that will use your code. But also be careful not to split your method excessively, as deep abstraction is better than the shallow one :).