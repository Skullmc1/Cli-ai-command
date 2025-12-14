import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';

const StarAnimation = () => {
    const [frame, setFrame] = useState(0);
    // Colors for the 4 corners: Top, Right, Bottom, Left
    const [colors, setColors] = useState(['red', 'blue', 'green', 'yellow']);

    useEffect(() => {
        const timer = setInterval(() => {
            setFrame(prev => prev + 1);
            // Rotate colors: shift right
            setColors(prev => {
                const newColors = [...prev];
                const last = newColors.pop();
                newColors.unshift(last);
                return newColors;
            });
        }, 150); // Speed of animation

        return () => clearInterval(timer);
    }, []);

    const isPlus = frame % 2 === 0;

    // Layout helper to ensure centering
    // We render a 3x3 grid mostly
    
    /*
      Frame A (+)    Frame B (x)
         0               0   1
         |                \ /
      3 -*- 1              * 
         |                / \
         2               3   2
    */

    if (isPlus) {
        return (
            <Box flexDirection="column" alignItems="center">
                <Text color={colors[0]}>  |</Text>
                <Box>
                    <Text color={colors[3]}>-- </Text>
                    <Text color="white">*</Text>
                    <Text color={colors[1]}> --</Text>
                </Box>
                <Text color={colors[2]}>  |</Text>
            </Box>
        );
    } else {
        return (
            <Box flexDirection="column" alignItems="center">
                <Box>
                    <Text color={colors[3]}>\ </Text>
                    <Text color={colors[0]}> /</Text>
                </Box>
                <Text color="white"> * </Text>
                <Box>
                    <Text color={colors[2]}>/ </Text>
                    <Text color={colors[1]}> \</Text>
                </Box>
            </Box>
        );
    }
};

export default StarAnimation;
