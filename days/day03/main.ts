export function part1(input: string): number {
	// Extract all the valid patterns
	const pattern = /mul\((\d+),\s*(\d+)\)/g;

	let sum = 0;
	let match: RegExpExecArray | null;

	// Loop till a vaild match is found
	while ((match = pattern.exec(input)) !== null) {
		sum += Number(match[1]) * Number(match[2]);
	}

	return sum;
}

export function part2(input: string): number {
	const mulPattern = /mul\((\d+),\s*(\d+)\)/y;
	const doPattern = /do\(\)/y;
	const dontPattern = /don't\(\)/y;

	let enabled = true;
	let sum = 0;
	let pos = 0;

	while (pos < input.length) {
		doPattern.lastIndex = pos;
		const doMatch = doPattern.exec(input);
		if (doMatch && doMatch.index === pos) {
			enabled = true;
			pos += doMatch[0].length;
			continue;
		}

		dontPattern.lastIndex = pos;
		const dontMatch = dontPattern.exec(input);
		if (dontMatch && dontMatch.index === pos) {
			enabled = false;
			pos += dontMatch[0].length;
			continue;
		}

		mulPattern.lastIndex = pos;
		const mulMatch = mulPattern.exec(input);
		if (mulMatch && mulMatch.index === pos) {
			if (enabled) {
				sum += Number(mulMatch[1]) * Number(mulMatch[2]);
			}
			pos += mulMatch[0].length;
			continue;
		}
		pos++;
	}
	return sum;
}

if (import.meta.main) {
	const __dirname = new URL('.', import.meta.url).pathname;
	const input = await Deno.readTextFile(`${__dirname}/input.txt`);
	console.log('Part 1:', part1(input));
	console.log('Part 2:', part2(input));
}
