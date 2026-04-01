import { Tooltip } from "@mui/material";
import React, { FC, ReactNode } from "react";

interface CustomTooltipProps {
  title: string;
  children: ReactNode;
  center?: boolean;
}

const CustomTooltip: FC<CustomTooltipProps> = ({ title, children, center }) => {
  return (
    <Tooltip
      children={<span className="cursor-pointer">{children}</span>}
      PopperProps={{
        sx: {
          "& .MuiTooltip-tooltip": {
            border: "none",
            backgroundColor: "#333333",
            color: "#fff",
            paddingRight: "1rem",
            paddingLeft: "1rem",
            fontSize: "14px",
            textAlign: "center",
            cursor: 'pointer',
            boxShadow: "20px 20px 60px rgba(0, 0, 0, 0.08)",
          },
        },
      }}
      title={title}
      placement={center ? "top" : "top-start"}
    >
    </Tooltip>
  );
};

export default CustomTooltip;