import { Button, Tooltip } from "@mui/material";
import React, { FC } from "react";

interface CustomTooltipProps {
  title: string;
  children: any;
  center?: boolean;
}

const CustomTooltip: FC<CustomTooltipProps> = ({ title, children, center }) => {
  return (
    <Tooltip
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
      <div className="cursor-pointer">{children}</div>
    </Tooltip>
  );
};

export default CustomTooltip;
