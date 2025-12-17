#!/usr/bin/env node

// Test script to demonstrate the execa issue
console.log('Testing execa method (the original problematic approach)...');

import { execa } from 'execa';

console.log('Launching test agent using execa...');

try {
    await execa('node', ['test-agent.js'], { stdio: 'inherit', shell: true });
    console.log('✅ Execa method completed.');
} catch (error) {
    console.error('❌ Execa method failed:', error.message);
}