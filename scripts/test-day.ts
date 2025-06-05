const day = Deno.args[0];
if (!day) {
  console.error("❌ Usage: deno task test-day <DAY>");
  Deno.exit(1);
}

const command = new Deno.Command("deno", {
  args: ["test", `days/day${day}`],
  stdin: "inherit",
  stdout: "inherit",
  stderr: "inherit",
});

const { code } = await command.spawn().status;
Deno.exit(code);
