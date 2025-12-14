import React from 'react';
import { Text, Box } from 'ink';
import StarAnimation from './StarAnimation.js';

const Header = () => {
	return (
		<Box flexDirection="column" alignItems="center" marginBottom={1}>
            <Box marginBottom={1}>
                <StarAnimation />
            </Box>
			<Text bold color="cyan">AI HUB</Text>
			<Text color="gray">Select your AI agent</Text>
		</Box>
	);
};

export default Header;
