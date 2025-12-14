import React from 'react';
import { render, Box } from 'ink';
import Header from './Header.js';
import Menu from './Menu.js';
const App = () => {
  return /*#__PURE__*/React.createElement(Box, {
    flexDirection: "column",
    alignItems: "center",
    height: "100%"
  }, /*#__PURE__*/React.createElement(Box, {
    marginTop: 1,
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Header, null)), /*#__PURE__*/React.createElement(Menu, null));
};

console.clear();
render(/*#__PURE__*/React.createElement(App, null));