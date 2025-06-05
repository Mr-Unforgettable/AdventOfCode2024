import { part1, part2 } from "./main.ts";
import { assertEquals } from "jsr:@std/assert";

Deno.test("Part 1 example", () => {
  const input = `3   4
4   3
2   5
1   3
3   9
3   3`;
  const result = part1(input);
  assertEquals(result, 11);
});

Deno.test("Part 2 example", () => {
  const input = `3   4
4   3
2   5
1   3
3   9
3   3`;
  const result = part2(input);
  assertEquals(result, 31);
});
