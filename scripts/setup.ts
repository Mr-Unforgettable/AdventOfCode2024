const BASE_URL = 'https://adventofcode.com/2024';
const SESSION = await Deno.readTextFile('session.txt').then((s) => s.trim());

// console.log("Your Session Cookie is:", SESSION);

const HEADERS = {
	cookie: `session=${SESSION}`,
	'User-Agent':
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
};

function dayDir(day: number): string {
	return `days/day${String(day).padStart(2, '0')}`;
}

async function fetchInput(day: number): Promise<string> {
	const res = await fetch(`${BASE_URL}/day/${day}/input`, {
		headers: HEADERS,
	});
	if (!res.ok) {
		throw new Error(`Failed to fetch input for day ${day}`);
	}
	return await res.text();
}

async function fetchProblem(
	day: number,
): Promise<{ markdown: string; html: string }> {
	const res = await fetch(`${BASE_URL}/day/${day}`, { headers: HEADERS });
	if (!res.ok) {
		throw new Error(`Failed to fetch problem for the day ${day}`);
	}
	const html = await res.text();
	const matches = html.match(/<article.*?<\/article>/gs);
	const markdown = matches
		?.map((article) =>
			article
				.replace(/<[^>]+>/g, '')
				.replace(/&nbsp;/g, ' ')
				.trim()
		)
		.join('\n\n') ?? '';

	return { markdown, html };
}

function isPart2Unlocked(html: string): boolean {
	return html.includes('--- Part Two ---');
}

function extractExamplesByParts(html: string): {
	part1?: string;
	part2?: string;
	expected1?: string;
	expected2?: string;
} {
	const parts = html.split(/<h2.*?>--- Part Two ---<\/h2>/);
	const [part1Html, part2Html] = parts;

	const extractPreBlocks = (
		section: string,
	): { input?: string; output?: string } => {
		const pAndPreRegex =
			/<p[^>]*>[^<]*for example[^<]*<\/p>\s*<pre><code>([\s\S]*?)<\/code><\/pre>/i;
		const match = pAndPreRegex.exec(section);
		const input = match?.[1]?.replace(/<[^>]+>/g, '').trim();

		const outputMatch = section.match(/<code><em>(.*?)<\/em><\/code>/);
		const output = outputMatch?.[1]?.trim();

		return { input, output };
	};

	// const part1Examples = parts[0] ? extractPreBlocks(parts[0]) : [];
	// const part2Examples = parts[1] ? extractPreBlocks(parts[1]) : [];

	// const part1 = part1Examples[0];
	// const part2 = part2Examples[0] ?? part1;

	const { input: part1, output: expected1 } = extractPreBlocks(
		part1Html,
	);
	const { input: part2, output: expected2 } = extractPreBlocks(
		part2Html || '',
	);

	return { part1, part2: part2 ?? part1, expected1, expected2 };
}

function boilerplate(): string {
	return `export function part1(input: string): string | number {
    return "";
}
export function part2(input: string): string | number {
    return "";
}

if (import.meta.main) {
  const __dirname = new URL('.', import.meta.url).pathname;
  const input = await Deno.readTextFile(\`\${__dirname}/input.txt\`);
  console.log("Part 1:", part1(input));
  console.log("Part 2:", part2(input));
}`;
}

// Generate test file
function generateTestFile({
	part1,
	part2,
	expected1,
	expected2,
}: {
	part1?: string;
	part2?: string;
	expected1?: string;
	expected2?: string;
}): string {
	const tests: string[] = [];

	const formatExpected = (value?: string): string => {
		if (value === undefined) return '"EXPECTED_OUTPUT"';
		return /^\d+$/.test(value) ? value : `"${value}"`;
	};

	if (part1) {
		tests.push(`
Deno.test("Part 1 example", () => {
    const input = \`${part1.replace(/`/g, '\\`')}\`;
    const result = part1(input);
    assertEquals(result, ${formatExpected(expected1)});
});`);
	}

	if (part2) {
		tests.push(`
Deno.test("Part 2 example", () => {
    const input = \`${part2.replace(/`/g, '\\`')}\`;
    const result = part2(input);
    assertEquals(result, ${formatExpected(expected2)});
});`);
	}

	return `import { part1, part2 } from "./main.ts";
import { assertEquals } from "jsr:@std/assert";
  ${tests.join('\n')}
  `;
}

// Function to fetch data for the problem of the day
async function setupDay(day: number, { force = false } = {}) {
	const dir = dayDir(day);
	await Deno.mkdir(dir, { recursive: true });

	const [input, problemData] = await Promise.all([
		fetchInput(day),
		fetchProblem(day),
	]);

	const { markdown, html } = problemData;
	const example = extractExamplesByParts(html);
	console.log(example);

	const part2Available = isPart2Unlocked(html);
	const examples = extractExamplesByParts(html);
	// const testFileContent = generateTestFile(examples);

	await Deno.writeTextFile(`${dir}/input.txt`, input.trim());
	await Deno.writeTextFile(`${dir}/problem.md`, markdown);
	await Deno.writeTextFile(`${dir}/problem.html`, html);

	const testFilePath = `${dir}/main_test.ts`;
	// let existingTestContent = "";

	// try {
	//   existingTestContent = await Deno.readTextFile(testFilePath);
	// } catch {
	//   // File doesn't exist yet
	// }

	const newTestContent = generateTestFile(examples);
	// const mergedTestContent = mergeTests(existingTestContent, newTestContent);
	await Deno.writeTextFile(testFilePath, newTestContent);

	const mainPath = `${dir}/main.ts`;
	try {
		await Deno.stat(mainPath);
		if (force) {
			console.log('⚠️ Overwritting main.ts due to --force flag.');
			await Deno.writeTextFile(mainPath, boilerplate());
		} else {
			console.log(
				'📋 main.ts already exists. Skipping overwrite. Use --force flag to override.',
			);
		}
	} catch {
		await Deno.writeTextFile(mainPath, boilerplate());
		console.log('✅ Created main.ts');
	}

	console.log(
		`✅ Day ${day} setup complete. (Part 2 ${
			part2Available ? 'available' : 'unavailable'
		}.)`,
	);
}

// function mergeTests(existing: string, generated: string): string {
//   const hasPart1 = existing.includes("Part 1 example");
//   const hasPart2 = existing.includes("EXPECTED_OUTPUT_2");

//   const [_, ...newTests] = generated.split(/import .*\n/); // skip import

//   let finalContent = existing ||
//     `import { part1, part2 } from "./main.ts";
// import { assertEquals } from "jsr:@std/assert";
// `;

//   if (!hasPart1 && /Part 1 example/.test(newTests.join(""))) {
//     finalContent += newTests.find((t) => t.includes("Part 1 example")) ?? "";
//   }

//   if (!hasPart2 && /EXPECTED_OUTPUT_2/.test(newTests.join(""))) {
//     finalContent += newTests.find((t) => t.includes("EXPECTED_OUTPUT_2")) ?? "";
//   }

//   return finalContent;
// }

// CLI entrypoint
if (import.meta.main) {
	const [dayArg, ...flags] = Deno.args;

	const day = Number(dayArg);
	const force = flags.includes('--force');

	if (!day || day < 1 || day > 25) {
		console.error(
			'Usage: deno run --allow-net --allow-read --allow-write scripts/setup.ts <day> [--force]',
		);
		Deno.exit(1);
	}
	await setupDay(day, { force });
}
