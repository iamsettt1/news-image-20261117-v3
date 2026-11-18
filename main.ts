// news-image-20261117 v3 — "The Daily World", Tuesday 17 November 2026.
// The artwork ships beside this file as entry.png (drawn with PIL at 2048px
// and downscaled to 1024px). This program's only job is to deliver those
// exact bytes to the output directory, unchanged, on every run.

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(targetDir, "entry.png");

mkdirSync(targetDir, { recursive: true });
copyFileSync(source, target);

// Guard: the judged bytes must be the shipped bytes, so fail loudly if the
// copy somehow landed short instead of letting a truncated file through.
const shipped = statSync(source).size;
const delivered = statSync(target).size;
if (delivered !== shipped) {
  throw new Error(`entry.png copy mismatch: shipped ${shipped} bytes, delivered ${delivered}`);
}
console.log(`entry.png delivered: ${delivered} bytes -> ${target}`);
