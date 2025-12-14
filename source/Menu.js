import React, { useState, useEffect } from 'react';
import { Text, Box, useInput, useApp } from 'ink';
import chalk from 'chalk';
import { execa } from 'execa';

const tools = [
	{ name: 'Gemini CLI', value: 'gemini', command: 'gemini' },
	{ name: 'GitHub Copilot CLI', value: 'copilot', command: 'copilot' },
	{ name: 'Mistral Vibe', value: 'mistral', command: 'vibe' },
	{ name: 'Claude Code', value: 'claude', command: 'claude' },
	{ name: 'Exit', value: 'exit' }
];

const Menu = () => {
	const { exit } = useApp();
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [errorMsg, setErrorMsg] = useState(null);

	useInput((input, key) => {
		if (key.upArrow || input === 'w') {
			setSelectedIndex(prev => (prev - 1 + tools.length) % tools.length);
		}
		if (key.downArrow || input === 's') {
			setSelectedIndex(prev => (prev + 1) % tools.length);
		}
		if (key.return) {
			handleSelect(tools[selectedIndex]);
		}
	});

	const handleSelect = async (tool) => {
		if (tool.value === 'exit') {
			exit();
			return;
		}

		// We need to unmount or at least clear the screen to run the child process
		// But Ink doesn't easily let us "pause". 
		// The common pattern is to exit the Ink app, run the command, and potentially restart.
		// For this Hub, we'll exit, run the command, and if the user wants to return, they run 'ai' again.
		// OR we can try to run it seamlessly. 
		// Given the constraints of TTY ownership, exiting the Ink app is the safest way 
		// to ensure the child tool gets full control of the terminal.
		
		exit(); // Stop the UI

		// We use a small timeout to allow Ink to clean up stdout
		setTimeout(async () => {
			console.clear();
			try {
                const args = tool.args || [];
				await execa(tool.command, args, { stdio: 'inherit', shell: true });
			} catch (error) {
				console.error(chalk.red(`
Error running ${tool.name}:`));
                if (error.code === 'ENOENT' || error.exitCode === 127) {
                     console.error(chalk.yellow(`Command '${tool.command}' not found.`));
                } else {
                     console.error(error.message);
                }
			}
		}, 50);
	};

	return (
		<Box flexDirection="column" alignItems="center">
			{tools.map((tool, index) => {
				const isSelected = index === selectedIndex;
				return (
					<Box key={tool.value} marginY={0}>
						<Text color={isSelected ? 'cyan' : 'white'} bold={isSelected}>
							{isSelected ? '> ' : '  '}
								{tool.name}
								{isSelected ? ' <' : '  '}
							</Text>
					</Box>
				);
			})}
			{errorMsg && <Text color="red" marginTop={1}>{errorMsg}</Text>}
		</Box>
	);
};

export default Menu;
