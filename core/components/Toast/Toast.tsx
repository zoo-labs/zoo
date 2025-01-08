import React, { useCallback, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import Alert, { TYPE } from "../Alert";
import ToastAction from "./ToastAction";
import { ToastProps, types } from "./types";

const alertTypeMap = {
  [types.INFO]: TYPE.information,
  [types.DANGER]: TYPE.error,
  [types.WARNING]: TYPE.warning,
};

const StyledToast = styled.div`
  right: -50px;
  margin-top: -16px;
  position: absolute;
  max-width: 800px;
  font-weight: 500;
  transition: all 1250ms ease-in;
  scale: 70%;

  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 500px;
  }
`;

const Toast: React.FC<ToastProps> = ({
  toast,
  onRemove,
  style,
  ttl,
  ...props
}) => {
  const timer = useRef<number | null>(null);
  const ref = useRef(null);
  const removeHandler = useRef(onRemove);
  const { id, title, description, type, action } = toast;

  const handleRemove = useCallback(
    () => removeHandler.current(id),
    [id, removeHandler]
  );

  const handleMouseEnter = () => {
    clearTimeout(timer.current);
  };

  const handleMouseLeave = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = window.setTimeout(() => {
      handleRemove();
    }, ttl);
  };

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = window.setTimeout(() => {
      handleRemove();
    }, ttl);

    return () => {
      clearTimeout(timer.current);
    };
  }, [timer, ttl, handleRemove]);

  return (
    <CSSTransition nodeRef={ref} timeout={1500} style={style} {...props}>
      <StyledToast
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Alert
          title={title}
          // variant={'warning'}
          onClick={handleRemove}
        >
          {action ? (
            <>
              <p style={{ marginBottom: "8px" }}>{description}</p>
              <ToastAction action={action} />
            </>
          ) : (
            description
          )}
        </Alert>
      </StyledToast>
    </CSSTransition>
  );
};

export default Toast;
