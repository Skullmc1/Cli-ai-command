import React, { useState, useEffect } from 'react';
import { Text, Box, useInput, useApp } from 'ink';
import chalk from 'chalk';
const tools = [{
  name: 'Gemini CLI',
  value: 'gemini',
  command: 'gemini'
}, {
  name: 'GitHub Copilot CLI',
  value: 'copilot',
  command: 'copilot'
}, {
  name: 'Mistral Vibe',
  value: 'mistral',
  command: 'vibe'
}, {
  name: 'Claude Code',
  value: 'claude',
  command: 'claude'
}, {
  name: 'Exit',
  value: 'exit'
}];
const Menu = () => {
  const {
    exit
  } = useApp();
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
  const handleSelect = async tool => {
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
      // Restore terminal to a clean state before launching the child process
      process.stdin.setRawMode(false);
      process.stdin.pause();
      console.clear();
      try {
        const args = tool.args || [];
        // Use spawn instead of execa for better TTY handling
        const {
          spawn
        } = await import('child_process');
        const child = spawn(tool.command, args, {
          stdio: 'inherit',
          shell: true
        });
        child.on('exit', code => {
          if (code !== 0) {
            console.error(chalk.red(`\nError: ${tool.name} exited with code ${code}`));
          }
        });
        child.on('error', error => {
          console.error(chalk.red(`\nError running ${tool.name}:`));
          if (error.code === 'ENOENT') {
            console.error(chalk.yellow(`Command '${tool.command}' not found.`));
          } else {
            console.error(error.message);
          }
        });
      } catch (error) {
        console.error(chalk.red(`\nError running ${tool.name}:`));
        if (error.code === 'ENOENT') {
          console.error(chalk.yellow(`Command '${tool.command}' not found.`));
        } else {
          console.error(error.message);
        }
      }
    }, 50);
  };
  return /*#__PURE__*/React.createElement(Box, {
    flexDirection: "column",
    alignItems: "center"
  }, tools.map((tool, index) => {
    const isSelected = index === selectedIndex;
    return /*#__PURE__*/React.createElement(Box, {
      key: tool.value,
      marginY: 0
    }, /*#__PURE__*/React.createElement(Text, {
      color: isSelected ? 'cyan' : 'white',
      bold: isSelected
    }, isSelected ? '> ' : '  ', tool.name, isSelected ? ' <' : '  '));
  }), errorMsg && /*#__PURE__*/React.createElement(Text, {
    color: "red",
    marginTop: 1
  }, errorMsg));
};
export default Menu;