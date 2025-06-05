// import { join } from "@std/join";

// Parse function to extract the left/right arrays
function parseInput(input: string): [number[], number[]] {
  const left: number[] = [];
  const right: number[] = [];

  const lines = input.trim().split("\n");
  for (const line of lines) {
    const [a, b] = line.trim().split(/\s+/).map(Number);
    left.push(a);
    right.push(b);
  }

  return [left, right];
}

export function part1(input: string): number {
  const [left, right] = parseInput(input);
  const leftSorted = [...left].sort((a, b) => a - b);
  const rightSorted = [...right].sort((a, b) => a - b);

  return leftSorted.reduce(
    (sum, val, idx) => sum + Math.abs(val - rightSorted[idx]),
    0,
  );
}

export function part2(input: string): number {
  const [left, right] = parseInput(input);
  const rightCount = new Map<number, number>();

  for (const num of right) {
    rightCount.set(num, (rightCount.get(num) || 0) + 1);
  }
  return left.reduce(
    (score, num) => score + num * (rightCount.get(num) || 0),
    0,
  );
}

if (import.meta.main) {
  const __dirname = new URL('.', import.meta.url).pathname;
  const input = await Deno.readTextFile(`${__dirname}/input.txt`);
  console.log("Part 1:", part1(input));
  console.log("Part 2:", part2(input));
}
