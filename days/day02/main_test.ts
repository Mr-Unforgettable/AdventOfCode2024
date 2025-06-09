import { part1, part2 } from './main.ts';
import { assertEquals } from 'jsr:@std/assert';

Deno.test('Part 1 example', () => {
	const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;
	const result = part1(input);
	assertEquals(result, 2);
});

Deno.test('Part 2 example', () => {
	const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;
	const result = part2(input);
	assertEquals(result, 4);
});
