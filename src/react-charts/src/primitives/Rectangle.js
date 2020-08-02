import React from "react";
//

const defaultStyle = {
  strokeWidth: 0,
  fill: "#333",
  opacity: 1,
  rx: 10,
  ry: 10
};

export default function Rectangle ({ style, opacity = 1, x1, y1, x2, y2, ...rest }) {
  const resolvedStyle = {
    ...defaultStyle,
    ...style
  };

  let xStart = Math.min(x1, x2);
  const yStart = Math.min(y1, y2);
  const xEnd = Math.max(x1, x2);
  const yEnd = Math.max(y1, y2);

  const height = Math.max(yEnd - yStart, 0);
  const width = Math.max(xEnd - xStart, 0) < 20 ? Math.max(xEnd - xStart, 0) : 20;
  if(Math.max(xEnd - xStart, 0) < 20){
    xStart = xStart + 1;
  }else{
    xStart = xStart + 5;
  }
  return (
    <rect
      {...rest}
      x={xStart}
      y={yStart}
      rx="10"
      ry="10"
      width={width}
      height={height}
      style={resolvedStyle}
    />
  );
}
