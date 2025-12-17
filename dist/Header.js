import React from "react";
import { Text, Box } from "ink";
import DnaAnimation from "./DnaAnimation.js";
const Header = () => {
  return React.createElement(
    Box,
    {
      flexDirection: "row",
      padding: 1,
      borderStyle: "single",
      borderColor: "cyan"
    },
    React.createElement(DnaAnimation, null),
    React.createElement(
      Box,
      { flexDirection: "column", justifyContent: "center" },
      React.createElement(
        Text,
        { bold: true, color: "white" },
        "PICK YOUR AGENT",
      ),
      React.createElement(Text, { color: "green", bold: true }, "FOR TODAY"),
      React.createElement(


        Box,


        { marginTop: 1, flexDirection: "column", justifyContent: "center" },


        React.createElement(


          Text,


          { color: "gray" },


          "Use wasd/arrow keys to move",


        ),


        React.createElement(Text, { color: "gray" }, "And Enter to confirm"),


      ),


    ),


  );

};





export default Header;