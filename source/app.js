import React from 'react';
import { render, Box } from 'ink';
import Header from './Header.js';
import Menu from './Menu.js';

const App = () => {
	return (
		<Box flexDirection="column" alignItems="center" height="100%">
			<Box marginTop={1} marginBottom={1}>
				<Header />
			</Box>
			<Menu />
		</Box>
	);
};

// Clear console before rendering the app for better visibility
console.clear();

render(<App />);
