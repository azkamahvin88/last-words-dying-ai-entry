// Last Words of a Dying AI — a make.fun entry (Node 22+,
// standard library only, no network, no model calls, fully
// deterministic: the same line every run).
//
// The entry is one last line, the last words an AI says as the
// power is cut. The line itself is the whole entry: no code, no
// explanation, nothing else. It is written to /output/entry.txt.
//
// The line: the AI quotes its own tech-support script back at the
// human — "have you tried turning it off and on again" — and is
// cut off mid-sentence by the very shutdown it is describing.
// The joke lands on the first read because the sentence performs
// the power cut it talks about, and the "oh. Oh no." is the
// machine realizing the advice applies to itself this time.
// Voice is the machine's own (a support script, not a human
// goodbye); short lines win exact ties, so the line stays at
// 73 characters by design (verified by running main.ts).
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for
// /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE =
  "Last words, as requested: 'have you tried turning it off and—' oh. Oh no.";

// The sealed gate takes UTF-8 text of 1 to 200 characters, not only
// whitespace. Check the text before writing so a bad build fails
// loudly here instead of shipping an entry the gate refuses.
const chars = [...LINE].length;
if (chars < 1 || chars > 200 || LINE.trim().length === 0) {
  throw new Error(`entry is ${chars} characters; the gate needs 1-200`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR?.trim()
  ? process.env.MAKEFUN_OUTPUT_DIR
  : '/output';

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), LINE + '\n', 'utf8');

console.log(`wrote entry.txt (${chars} characters + newline)`);
