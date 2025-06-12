import { part1, part2 } from './main.ts';
import { assertEquals } from 'jsr:@std/assert';

Deno.test('Part 1 example', () => {
	const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;
	const result = part1(input);
	assertEquals(result, 18);
});

Deno.test('Part 2 example', () => {
	const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;
	const result = part2(input);
	assertEquals(result, 9);
});
