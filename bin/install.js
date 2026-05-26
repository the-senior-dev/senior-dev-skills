#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const os = require('os');

const SKILLS = ['react-interview', 'react-senior-review'];
const TARGET_DIR = path.join(os.homedir(), '.claude', 'skills');
const SOURCE_DIR = path.join(__dirname, '..', 'skills');
const force = process.argv.includes('--force');

// Create the target directory if it doesn't exist
fs.mkdirSync(TARGET_DIR, { recursive: true });

// Print the banner
console.log(`
███████╗██╗  ██╗██╗██╗     ██╗     ███████╗
██╔════╝██║ ██╔╝██║██║     ██║     ██╔════╝
███████╗█████╔╝ ██║██║     ██║     ███████╗
╚════██║██╔═██╗ ██║██║     ██║     ╚════██║
███████║██║  ██╗██║███████╗███████╗███████║
╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝
            by theSeniorDev
`);

let installed = 0, skipped = 0;
for (const skill of SKILLS) {
  const src = path.join(SOURCE_DIR, skill);
  const dst = path.join(TARGET_DIR, skill);
  if (fs.existsSync(dst) && !force) {
    console.log(`  ⊙  ${skill}  (already installed — use --force to overwrite)`);
    skipped++;
    continue;
  }
  if (fs.existsSync(dst)) fs.rmSync(dst, { recursive: true, force: true });
  fs.cpSync(src, dst, { recursive: true });
  console.log(`  ✓  ${skill}`);
  installed++;
}

console.log(`\nInstalled ${installed}, skipped ${skipped}.`);
console.log(`Restart Claude Code (or open a new session) to pick up the new skills.`);