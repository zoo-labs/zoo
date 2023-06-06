import React, { FC } from "react";

const Header: FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
}) => (
  <>{children}</>
);

export default Header;
