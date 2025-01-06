import React from "react";

export default function Paper({ children, className, ...rest }): React.ReactElement {
  return (
    <div className={`rounded ${className}`} {...rest}>
      <>{children}</>
    </div>
  );
}
