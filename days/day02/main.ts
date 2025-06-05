function isSafeReport(report: string): boolean {
  const len = report.length;
  let prev = 0;
  let curr = 0;
  let i = 0;
  let direction: null | "increasing" | "decreasing" = null;

  // Skip leading spaces
  while (i < len && report[i] === " ") i++;

  // Parse the first number
  while (i < len && report[i] !== " ") {
    curr = curr * 10 + (report.charCodeAt(i++) - 48);
  }

  // Read next number one at a time
  while (i < len) {
    // Skip spaces
    while (i < len && report[i] === " ") i++;

    prev = curr;
    curr = 0;

    // Parse the next number
    while (i < len && report[i] !== " ") {
      curr = curr * 10 + (report.charCodeAt(i++) - 48);
    }

    const diff = curr - prev;
    const absDiff = diff < 0 ? -diff : diff;

    if (absDiff < 1 || absDiff > 3) return false;

    if (!direction) {
      direction = diff > 0 ? "increasing" : "decreasing";
    } else {
      if (
        (direction === "increasing" && diff < 0) ||
        (direction === "decreasing" && diff > 0)
      ) {
        return false;
      }
    }
  }

  return true;
}

export function part1(input: string): number {
  let count = 0;
  let start = 0;
  const len = input.length;

  for (let i = 0; i <= len; i++) {
    if (i === len || input[i] === "\n") {
      const line = input.slice(start, i);
      if (line.length && isSafeReport(line)) count++;
      start = i + 1;
    }
  }

  return count;
}

function isSafe(levels: number[]): boolean {
  if (levels.length <= 1) return true;

  // Check for all increasing
  let allIncreasing = true;
  for (let i = 1; i < levels.length; i++) {
    const diff = levels[i] - levels[i - 1];
    if (!(diff >= 1 && diff <= 3)) {
      allIncreasing = false;
      break;
    }
  }

  if (allIncreasing) return true;

  let allDecreasing = true;
  for (let i = 1; i < levels.length; i++) {
    const diff = levels[i - 1] - levels[i];
    if (!(diff >= 1 && diff <= 3)) {
      allDecreasing = false;
      break;
    }
  }

  return allDecreasing;
}

export function part2(input: string): number {
  const reports = input.trim().split("\n").map((line) =>
    line.trim().split(/\s+/).map(Number)
  );

  let safeCount = 0;

  for (const report of reports) {
    if (isSafe(report)) {
      safeCount++;
      continue;
    }

    let canBeSafe = false;
    for (let i = 0; i < report.length; i++) {
      const modified = [...report.slice(0, i), ...report.slice(i + 1)];
      if (isSafe(modified)) {
        canBeSafe = true;
        break;
      }
    }

    if (canBeSafe) {
      safeCount++;
    }
  }

  return safeCount;
}

if (import.meta.main) {
  const __dirname = new URL(".", import.meta.url).pathname;
  const input = await Deno.readTextFile(`${__dirname}/input.txt`);
  console.log("Part 1:", part1(input));
  console.log("Part 2:", part2(input));
}
