// Fortune Cookie Wisdom for Developers — one original fortune-cookie line.
//
// The line: the code you write today will be read again by future-you, and
// the comments you skipped are the clothes it will be wearing when you meet
// it. It is true about a developer's day (revisiting old code), it reads like
// a fortune cookie (one short balanced sentence, a prediction about the
// future), and the twist is the personification: code "wearing" the comments
// you forgot to write — the thing you left out becomes what you have to face.
//
// Gate enforced here (see RULES.txt): /output/entry.txt must be UTF-8 text
// of 1 to 120 characters, and not only whitespace. This program checks all
// three conditions before it writes, and refuses to write an invalid line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Your code will meet you again in six months, wearing the comments you forgot to write.";

// Gate checks (character count, not bytes: [...LINE] counts code points).
const chars = [...LINE].length;
if (chars < 1 || chars > 120) {
  throw new Error(`Line is ${chars} characters; gate requires 1-120.`);
}
if (LINE.trim().length === 0) {
  throw new Error("Line must not be only whitespace.");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read it back and re-check the gate on the bytes actually written, so a
// truncated or mangled write can never pass silently.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("Written file does not match the fortune line.");
}
if ([...written].length !== chars) {
  throw new Error("Written file length does not match the checked length.");
}
console.log(`Wrote ${chars} characters to /output/entry.txt`);
