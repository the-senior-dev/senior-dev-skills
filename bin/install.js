#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const os = require('os');

const SKILLS = ['react-interview', 'react-senior-review'];
const TARGET_DIR = path.join(os.homedir(), '.claude', 'skills');
const SOURCE_DIR = path.resolve(__dirname, '..', 'skills');
const force = process.argv.includes('--force');

// Create the target directory if it doesn't exist
fs.mkdirSync(TARGET_DIR, { recursive: true });

// Print the banner
console.log(`
\x1b[38;5;250m   the\x1b[0m
\x1b[38;5;51m███████╗███████╗███╗   ██╗██╗ ██████╗ ██████╗ ██████╗ ███████╗██╗   ██╗\x1b[0m
\x1b[38;5;45m██╔════╝██╔════╝████╗  ██║██║██╔═══██╗██╔══██╗██╔══██╗██╔════╝██║   ██║\x1b[0m
\x1b[38;5;39m███████╗█████╗  ██╔██╗ ██║██║██║   ██║██████╔╝██║  ██║█████╗  ██║   ██║\x1b[0m
\x1b[38;5;33m╚════██║██╔══╝  ██║╚██╗██║██║██║   ██║██╔══██╗██║  ██║██╔══╝  ╚██╗ ██╔╝\x1b[0m
\x1b[38;5;27m███████║███████╗██║ ╚████║██║╚██████╔╝██║  ██║██████╔╝███████╗ ╚████╔╝\x1b[0m
\x1b[38;5;21m╚══════╝╚══════╝╚═╝  ╚═══╝╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚══════╝  ╚═══╝\x1b[0m
\x1b[38;5;245m            AI Software Engineering Skills by @theseniordev\x1b[0m
`);

let installed = 0, skipped = 0;
for (const skill of SKILLS) {
  const src = path.join(SOURCE_DIR, skill);
  const dst = path.join(TARGET_DIR, skill);

  // lstatSync (not existsSync) so we detect a broken/existing symlink too.
  let existing = null;
  try { existing = fs.lstatSync(dst); } catch {}

  // Already symlinked to the right place — nothing to do.
  if (existing && existing.isSymbolicLink() && path.resolve(fs.readlinkSync(dst)) === src) {
    console.log(`  ⊙  ${skill}  (already linked)`);
    skipped++;
    continue;
  }

  if (existing && !force) {
    console.log(`  ⊙  ${skill}  (already installed — use --force to overwrite)`);
    skipped++;
    continue;
  }

  if (existing) fs.rmSync(dst, { recursive: true, force: true });
  fs.symlinkSync(src, dst, 'dir');
  console.log(`  ✓  ${skill}  →  ${src}`);
  installed++;
}

console.log(`\nInstalled ${installed}, skipped ${skipped}.`);
console.log(`Skills are symlinked, so a 'git pull' in this repo keeps them up to date.`);
console.log(`Restart Claude Code (or open a new session) to pick up the new skills.`);