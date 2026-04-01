import React from "react";
import { IconProps } from "react-feather";

const FacebookIcon = ({
  width = 18,
  height = 18,
  color = "#777E91",
  className,
  ...rest
}: IconProps) => (
  <svg
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.667 9A6.667 6.667 0 1 0 2.333 9a6.667 6.667 0 0 0 13.334 0Zm1.666 0A8.333 8.333 0 1 0 .667 9a8.333 8.333 0 0 0 16.666 0Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.833 6.5h.834a.833.833 0 0 0 0-1.667h-.834a2.5 2.5 0 0 0-2.5 2.5V9H6.5a.833.833 0 0 0 0 1.666h.833v5a.833.833 0 1 0 1.667 0v-5h1.667a.833.833 0 1 0 0-1.666H9V7.333c0-.46.373-.833.833-.833Z"
      fill={color}
    />
  </svg>
);

export default FacebookIcon;
