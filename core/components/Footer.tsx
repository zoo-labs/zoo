import React, { FC } from "react";

const Footer: FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
}) => (
  <>{children}</>
);

export default Footer;
