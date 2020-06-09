import React from "react";

export default function RightArrow({ fillColor }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="34"
      viewBox="0 0 14 71"
      style={{ marginLeft: "-5px" }}
    >
      <g transform="translate(14) rotate(90)" fill={fillColor}>
        <path
          d="M 74.16190338134766 13.5 L 2.83809494972229 13.5 L 38.5 0.5320345163345337 L 74.16190338134766 13.5 Z"
          stroke="none"
        />
        <path
          d="M 38.5 1.064059257507324 L 5.676162719726562 13 L 71.32383728027344 13 L 38.5 1.064059257507324 M 38.5 0 L 77 14 L 0 14 L 38.5 0 Z"
          stroke="none"
          fill={fillColor}
        />
      </g>
    </svg>
  );
}
