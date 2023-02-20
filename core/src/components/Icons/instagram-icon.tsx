import * as React from "react";
import { IconProps } from "react-feather";

const SvgComponent = ({
  width = 42,
  height = 42,
  color = "#fff",
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
      d="M29.443 0H12.737C5.947 0 .423 5.524.423 12.313V29.02c0 6.79 5.524 12.313 12.314 12.313h16.706c6.79 0 12.314-5.523 12.314-12.313V12.313C41.757 5.523 36.233 0 29.443 0Zm8.155 29.02a8.155 8.155 0 0 1-8.155 8.155H12.737A8.155 8.155 0 0 1 4.58 29.02V12.313a8.155 8.155 0 0 1 8.156-8.155h16.706a8.155 8.155 0 0 1 8.155 8.155V29.02Z"
      fill={color}
    />
    <path
      d="M21.09 9.976c-5.895 0-10.69 4.796-10.69 10.69 0 5.895 4.795 10.69 10.69 10.69s10.69-4.795 10.69-10.69c0-5.894-4.795-10.69-10.69-10.69Zm0 17.223a6.532 6.532 0 1 1 0-13.064 6.532 6.532 0 0 1 0 13.064ZM31.8 12.618a2.562 2.562 0 1 0 0-5.123 2.562 2.562 0 0 0 0 5.123Z"
      fill={color}
    />
  </svg>
);

export default SvgComponent;
