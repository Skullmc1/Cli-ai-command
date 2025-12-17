#!/usr/bin/env node

console.log('Test agent launched successfully!');
console.log('Type something and press Enter:');

process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    console.log(`You typed: ${chunk.trim()}`);
    console.log('Input working correctly! Exiting...');
    process.exit(0);
  }
});