#!/usr/bin/env node

// Test script to verify the spawn vs execa fix
console.log('Testing spawn vs execa fix...');

import { spawn } from 'child_process';

console.log('Launching test agent using spawn (the fix)...');

const child = spawn('node', ['test-agent.js'], {
    stdio: 'inherit',
    shell: true
});

child.on('exit', (code) => {
    console.log(`\nTest agent exited with code ${code}`);
    if (code === 0) {
        console.log('✅ Spawn method works! This should fix the input issue.');
    } else {
        console.log('❌ Spawn method failed.');
    }
});

child.on('error', (error) => {
    console.error('❌ Error with spawn method:', error.message);
});