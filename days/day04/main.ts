export function part1(input: string): string | number {
	const grid = input.split('\n');
	const word = 'XMAS';
	const directions = [
		[0, 1], // right
		[-1, 0], // left
		[1, 0], // top
		[0, -1], // bottom
		[1, 1], // top-right
		[-1, 1], // top-left
		[-1, -1], // bottom-left
		[1, -1], // bottom-right
	];
	const rows = grid.length;
	const cols = grid[0].length;
	let count = 0;

	function isValid(x: number, y: number): boolean {
		return x >= 0 && y >= 0 && x < rows && y < cols;
	}

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			for (const [dx, dy] of directions) {
				let found = true;
				for (let k = 0; k < word.length; k++) {
					const ni = i + dx * k;
					const nj = j + dy * k;

					if (!isValid(ni, nj) || grid[ni][nj] !== word[k]) {
						found = false;
						break;
					}
				}
				if (found) count++;
			}
		}
	}

	return count;
}
export function part2(input: string): string | number {
	const grid = input.split('\n');
	const rows = grid.length;
	const cols = grid[0].length;
	let count = 0;

	// Check if a triplet of letters matches "MAS" or "SAM"
	function isMAS(c1: string, c2: string, c3: string): boolean {
		const str = c1 + c2 + c3;
		return str === 'MAS' || str === 'SAM';
	}

	for (let i = 1; i < rows - 1; i++) {
		for (let j = 1; j < cols - 1; j++) {
			if (grid[i][j] !== 'A') continue;

			// Diagonal from top-left to bottom-right
			const tl = grid[i - 1][j - 1];
			const br = grid[i + 1][j + 1];

			// Diagonal from top-right to bottom-left
			const tr = grid[i - 1][j + 1];
			const bl = grid[i + 1][j - 1];

			// Check both diagonals for valid "MAS"/"SAM"
			const diag1 = isMAS(tl, grid[i][j], br);
			const diag2 = isMAS(tr, grid[i][j], bl);

			if (diag1 && diag2) {
				count++;
			}
		}
	}

	return count;
}

if (import.meta.main) {
	const __dirname = new URL('.', import.meta.url).pathname;
	const input = await Deno.readTextFile(`${__dirname}/input.txt`);
	console.log('Part 1:', part1(input));
	console.log('Part 2:', part2(input));
}
