# 🎄 [Advent of Code](https://adventofcode.com/) (2024)

Welcome to Advent of Code 2024. This is my solutions for the "Advent of Code
2024".

# [What is Advent of Code?](https://advenofcode.com/2024/about)

Advent of Code is an Advent calendar of small programming puzzles for a variety
of skill levels that can be solved in any programming language you like. People
use them as interview prep, company training, university coursework, practice
problems, a speed contest, or to challenge each other.

# Requirements

- Install latest version of
  [Typescript](https://www.typescriptlang.org/download/)
- Install latest version of [Deno](https://deno.com)

# Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

## Install dependencies

```
deno install
```

## Running the Project

First of all you have to create a `session.txt` file containing your Advent of
Code session cookie. It allows the fetching for problem statement from the site
and generate the boilerplate code, and Inputs to solve the problem.

- To setup the boilerplate, fetch problem statement, Inputs etc.

```
deno task setup
```

- To run the tests

```
deno task test
```

- To run a specific day test use:

```
deno task test-day <DAY>  # 01, 02 ...
```

- To run the solution

```
deno task solve-day <DAY>  # 01, 02, ...
```
