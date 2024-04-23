---
publish: true
tags:
  - til
  - indonesian
  - Python
date: 2024-04-04
created_date: 2024-04-04
---

## Python Type Annotation

### Basic Concept
Seperti namanya, dia cuman annotation aja dari PoV python interpreter mah. Tapi kalau kita ngomongin dari python ecosystem, ada beberapa package yang bisa kita pake untuk manfaatin type annotation ini biar bisa ngelakuin static check di codebase. Untuk typing di python sendiri bisa cek di PEP 484 (dan beberapa follow upnya di 526, 544, 586, 589, etc.)

Naaaah, terus gimana biar buat developer pada umumnya bisa memanfaatkan si type annotation ini? Bisa make beberapa package yang akan ngecek type annotation misal make mypy (OG implementasi dari PEP484) atau lebih convenient lagi make pyright, karena udah dibundle bareng python extension di VSCode sebagai LSP.

Gimana cara makenya?
### pyright as CLI
pun udah install python extension (atau pylance) di VS Code, biasanya ga langsung by default ngecek type annotation. Alternatif pertama (kalau ga semua orang make VSCode) bisa make CLI nya (`pip install pyright`). Misal:
![[TIL/Files/2024-04-04.png]]

Dari sini aja udah ketahuan kalau ada 3 pelanggaran type annotation dari code itu. Coba kita breakdown dulu:
#### 1. `reportReturnType`
```bash
00_basic_typing.py:1:25 - error: Function with declared return type "int" must return value on all code paths
   "None" is incompatible with "int" (reportReturnType)
```
Bisa kita liat di line 1 column 25, functionnya expect untuk balikin `int` tapi kok ternyata ga ada return valuenya di salah satu code path (dalam kasus ini satu satunya code path sih). Nah ini bisa solve dengan ngasih `return params` di function foo nya
#### 2. `reportArgumentType`
Ada dua error disini:
```bash
00_basic_typing.py:6:17 - error: Argument of type "float" cannot be assigned to parameter "params" of type "int" in function "foo"
    "float" is incompatible with "int" (reportArgumentType)
00_basic_typing.py:7:17 - error: Argument of type "Literal['kamu bohong']" cannot be assigned to parameter "params" of type "int" in function "foo"
    "Literal['kamu bohong']" is incompatible with "int" (reportArgumentType)
```
yang pertama di line 6, kita ngasih argumen dengan tipe `float` ke `params`, dan di line 7 kita ngasih argumen `Literal['kamu bohong']`. Nah ini artinya function call kita dianggep salah sama `pyright`, dan bisa dibenerin dengan ganti type annotation di function nya atau kita ganti argumen nya biar jadi int.
> Kenapa `Literal['kamu bohong']` kenapa dia nangkepnya ga `str`?

#### Contoh Sudah Benar
![[TIL/Files/2024-04-04-1.png]]

### Kok Pe'eR Banget CLI Terus
Yup, emang PR kalau make CLI, walaupun bisa nge-`watch` tapi semua errornya muncul di terminal, dan gampang menuhin terminalnya :(. 
![[2024-04-04 at 5.27.59 - Black Mastodon.mp4]]

Nah kalau di VSCode, Sublime, Emacs dan Vim, kita bisa make ini jadi LSP dan ngelakuin type checkin di editor. Caranya set `python.analysis.typeCheckingMode` jadi `basic` , `stansard` atau `strict` aja. Kalau baru mulai sih mending dari `standard` aja, apalagi kalau di codebase yang masih banyak blm ada typecheckingnya. Tapi kalau codebase baru dan sekalian mau belajar, yaaa~ boleh lah `strict`.
![[TIL/Files/2024-04-04-2.png]]

Jadinya waktu ada error di type annotation, langsung ditandain tuh sama VSCodenya. Jadi walau python gapaham soal type annotation ini, banyak tools yang bisa bantu untuk mastiin type annotation nya bener dan codenya comply ke annotation tsb. Oiya ini salah satu contoh bedanya `basic` dan `strict` yak
![[2024-04-04-3.png]]
### `TypeVar` buat apa?
Nah untuk bahas ini kita perlu coba liat beberapa case. Biar gampang kita coba asumsi ada fungsi yang tugasnya adalah ngambil nilai pertama dari suatu list, dan balikin list yang udah berkurang satu elemnt tsb.
```python
def pop_list(a):
	a.pop()
	return a
```
kalau kayak gini kita bisa anotasi tipenya kurang lebih jadi gini:
```python
def pop_list(a:list) -> list:
	a.pop()
	return a
```
misal kita tau kalau fungsi ini akan dipake untuk data-data float, yaudah kita bisa detailin anotasinya jadi:
```python
def pop_list(a:list[float]) -> list[float]:
	a.pop()
	return a
```
looks good so far lah~
tapi setelah diskusi lagi dengan tim lain, ternyata baru tau kalau fungsi ini akan dipake untuk tipe data apapun selain `float`, dan karena yang kita lakukan ga bergantung sama tipe data isinya (`.pop` dilakuin di list, terlepas isinya tipe datanya apa). Kita perlu update lagi nih, nah disini baru keliatan manfaatnya `TypeVar`. Kita bisa ngasih tau kalau ktia gapeduli isinya apa, tapi yang ktia tau tipe data yang masuk akan sama kayak yang keluar. Misal yang masuk `list[int]`, yang dibalikin sama fungsinya juga `list[int]`. Kalau `list[float]` --> `list[float]` juga, dan kalau `list[T]` ya keluarnya `list[T]` dimana `T` itu variable yang isinya tipe data (i.e. `TypeVar`)
```python
from typing import TypeVar

T = TypeVar('T')

def pop_one(a: list[T]) -> list[T]:
    a.pop
    return a

```

