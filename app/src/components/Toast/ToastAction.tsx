import Button from "components/Button";
import getExternalLinkProps from "config/getExternalLinkProps";
import React from "react";
// import { Link } from "react-router-dom";
import { ToastAction as Action } from "./types";

interface ToastActionProps {
  action: Action;
}

const ToastAction: React.FC<ToastActionProps> = ({ action }) => {
  if (action.url.startsWith("http")) {
    return (
      <Button size="sm" {...getExternalLinkProps()}>
        {action.text}
      </Button>
    );
  }

  return (
    // <Button as={Link} scale="sm" to={action.url}>
    <Button size="sm">{action.text}</Button>
  );
};

export default ToastAction;
