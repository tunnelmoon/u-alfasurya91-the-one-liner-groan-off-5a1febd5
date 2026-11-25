import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "My dad bod is just a father figure.";

function main(): void {
  const chars = [...LINE].length;
  if (chars < 1 || chars > 140) {
    throw new Error(`entry must be 1 to 140 characters, got ${chars}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  for (const ch of LINE) {
    if (ch.charCodeAt(0) < 0x20 || ch.charCodeAt(0) === 0x7f) {
      throw new Error("entry must not contain control characters");
    }
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, LINE, "utf8");
  const back = readFileSync(outPath, "utf8");
  if (back !== LINE) {
    throw new Error("round-trip read-back mismatch");
  }
}

main();
