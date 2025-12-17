import React, { useState, useEffect } from "react";
import { Box, Text } from "ink";

const HEIGHT = 10;

const DnaAnimation = () => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame((p) => p + 1);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const renderRow = (y) => {
    const offset = (y + frame) * 0.5;
    const v1 = Math.floor((Math.sin(offset) + 1) * 3);
    const v2 = Math.floor((Math.sin(offset + Math.PI) + 1) * 3);

    const row = Array(8).fill(" ");
    row[v1] = "•";
    row[v2] = "•";

    return React.createElement(Text, { key: y, color: "cyan" }, row.join(""));
  };

  return React.createElement(
    Box,
    { flexDirection: "column", marginRight: 2 },
    Array(HEIGHT)
      .fill(0)
      .map((_, i) => renderRow(i)),
  );
};

export default DnaAnimation;
