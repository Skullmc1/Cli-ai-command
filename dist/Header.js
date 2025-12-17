import React from 'react';
import { Text, Box } from 'ink';
import StarAnimation from './StarAnimation.js';
const Header = () => {
  return /*#__PURE__*/React.createElement(Box, {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Box, {
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(StarAnimation, null)), /*#__PURE__*/React.createElement(Text, {
    bold: true,
    color: "cyan"
  }, "AI HUB"), /*#__PURE__*/React.createElement(Text, {
    color: "gray"
  }, "Select your AI agent"));
};
export default Header;