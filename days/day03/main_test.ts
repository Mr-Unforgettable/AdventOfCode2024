import { part1, part2 } from './main.ts';
import { assertEquals } from 'jsr:@std/assert';

Deno.test('Part 1 example', () => {
	const input =
		`x<em>mul(2,4)</em>%&mul[3,7]!@^do_not_<em>mul(5,5)</em>+mul(32,64]then(<em>mul(11,8)mul(8,5)</em>)`;
	const result = part1(input);
	assertEquals(result, 161);
});

Deno.test('Part 2 example', () => {
	const input =
		`x<em>mul(2,4)</em>&mul[3,7]!^<em>don't()</em>_mul(5,5)+mul(32,64](mul(11,8)un<em>do()</em>?<em>mul(8,5)</em>)`;
	const result = part2(input);
	assertEquals(result, 48);
});
