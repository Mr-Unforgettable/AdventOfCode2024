const day = Deno.args[0];
if (!day) {
	console.error('❌ Usage: deno task test-day <DAY>');
	Deno.exit(1);
}

const command = new Deno.Command('deno', {
	args: ['run', '--allow-read', `days/day${day}/main.ts`],
	stdin: 'inherit',
	stdout: 'inherit',
	stderr: 'inherit',
});

const { code } = await command.spawn().status;
Deno.exit(code);
