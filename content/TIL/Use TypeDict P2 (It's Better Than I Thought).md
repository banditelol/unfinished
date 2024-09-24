---
publish: false
tags:
  - til
date: 2024-07-17
created_date: 2024-07-17
---
Come come, see this:
```python
class Vehicle:
    ...

class Car(Vehicle):
    ...

class Motorcycle(Vehicle):
    ...

class Vehicles(TypedDict):
    car: Car
    motor: Motorcycle

def dest(**kwargs: Unpack[Vehicles]): ...
def src(**kwargs: Vehicle): ...
```

