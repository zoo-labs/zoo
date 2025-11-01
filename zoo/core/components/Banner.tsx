import React, { FC } from "react";

const Banner: FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
}) => (
  <>{children}</>
);

export default Banner;
