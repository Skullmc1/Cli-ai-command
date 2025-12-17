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
    return /*#__PURE__*/React.createElement(Box, {
      flexDirection: "column",
      alignItems: "center"
    }, /*#__PURE__*/React.createElement(Text, {
      color: colors[0]
    }, "  |"), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
      color: colors[3]
    }, "-- "), /*#__PURE__*/React.createElement(Text, {
      color: "white"
    }, "*"), /*#__PURE__*/React.createElement(Text, {
      color: colors[1]
    }, " --")), /*#__PURE__*/React.createElement(Text, {
      color: colors[2]
    }, "  |"));
  } else {
    return /*#__PURE__*/React.createElement(Box, {
      flexDirection: "column",
      alignItems: "center"
    }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
      color: colors[3]
    }, "\\ "), /*#__PURE__*/React.createElement(Text, {
      color: colors[0]
    }, " /")), /*#__PURE__*/React.createElement(Text, {
      color: "white"
    }, " * "), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
      color: colors[2]
    }, "/ "), /*#__PURE__*/React.createElement(Text, {
      color: colors[1]
    }, " \\")));
  }
};
export default StarAnimation;