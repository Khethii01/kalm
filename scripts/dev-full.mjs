/**
 * Convenience runner: starts the enquiry API and the Vite dev server together.
 * Usage: npm run dev:full
 */
import { spawn } from "node:child_process";

const procs = [
  spawn("node", ["server/index.mjs"], { stdio: "inherit", shell: false }),
  spawn("npx", ["vite"], { stdio: "inherit", shell: true }),
];

function shutdown() {
  for (const p of procs) p.kill("SIGINT");
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

for (const p of procs) {
  p.on("exit", (code) => {
    if (code && code !== 0) {
      shutdown();
    }
  });
}
