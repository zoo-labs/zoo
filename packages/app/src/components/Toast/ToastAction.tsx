import React from "react";
// import { Link } from "react-router-dom";
import getExternalLinkProps from "../../util/getExternalLinkProps";
import { Button } from "../Button";
import { ToastAction as Action } from "./types";

interface ToastActionProps {
  action: Action;
}

const ToastAction: React.FC<ToastActionProps> = ({ action }) => {
  if (action.url.startsWith("http")) {
    return (
      <Button scale="sm" {...getExternalLinkProps()}>
        {action.text}
      </Button>
    );
  }

  return (
    // <Button as={Link} scale="sm" to={action.url}>
    <Button scale="sm">{action.text}</Button>
  );
};

export default ToastAction;
