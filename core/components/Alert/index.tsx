import React, { useState } from "react";

import { XIcon } from "@heroicons/react/solid";
import { classNames } from "../../functions";

export const TYPE = {
  information: {
    color: "bg-purple bg-opacity-20 text-high-emphesis",
    icon: (
      <svg
        width="33"
        height="33"
        className="text-low-emphesis"
        viewBox="0 0 33 33"
        xmlns="http://www.w3.org/2000/svg"
        path="currentColor"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M16.5 0C7.40184 0 0 7.40184 0 16.5C0 25.5982 7.40184 33 16.5 33C25.5982 33 33 25.5982 33 16.5C33 7.40184 25.5982 0 16.5 0ZM16.5 25.9909C15.5747 25.9909 14.8245 25.2407 14.8245 24.3154C14.8245 23.39 15.5747 22.6398 16.5 22.6398C17.4253 22.6398 18.1755 23.39 18.1755 24.3154C18.1755 25.2407 17.4253 25.9909 16.5 25.9909ZM18.1755 17.3898C18.1755 18.3152 17.4253 19.0654 16.5 19.0654C15.5747 19.0654 14.8245 18.3152 14.8245 17.3898V8.56534C14.8245 7.63999 15.5747 6.8898 16.5 6.8898C17.4253 6.8898 18.1755 7.63999 18.1755 8.56534V17.3898Z"
          fill="#575757"
        />
      </svg>
    ),
  },
  warning: {
    color: "bg-yellow bg-opacity-25 text-high-emphesis",
    icon: (
      <svg
        className="w-5 h-5 text-yellow"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  error: {
    color: "bg-red bg-opacity-25 text-high-emphesis",
    icon: (
      <svg
        className="w-5 h-5 text-red"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
};

export interface AlertProps {
  title?: string;
  message?: string | React.ReactNode;
  type?: "warning" | "error" | "information";
  showIcon?: boolean;
  dismissable?: boolean;
  show?: boolean;
  setShow?: (arg: boolean) => void;
}

export default function Alert({
  title,
  message,
  type = "warning",
  className = "",
  showIcon = false,
  dismissable = true,
  show,
  setShow,
}: AlertProps & React.HTMLAttributes<HTMLDivElement>): React.ReactElement | null {
  // TODO: Persist this...
  const [defaultShow, setDefaultShow] = useState(true);
  const { color, icon } = TYPE[type];
  return message && (show || defaultShow) ? (
    <div
      className={classNames(
        "block relative w-full rounded text-sm p-4",
        //(show || defaultShow) && "pr-10",
        color,
        className
      )}
    >
      {title && <div className="mb-1 text-2xl font-medium">{title}</div>}
      <div className="flex items-center">
        {showIcon && <div className="flex-shrink-0">{icon}</div>}
        <div className={!showIcon ? "ml-0" : "ml-3"}>
          <p className="text-base">
            <>{message}</>
          </p>
        </div>
      </div>
      {dismissable && (
        <div className="absolute top-2 right-2">
          <button
            type="button"
            onClick={() =>
              setShow ? setShow(!show) : setDefaultShow(!defaultShow)
            }
            className="inline-flex opacity-80 hover:opacity-100 focused:opacity-100 rounded p-1.5 text-primary hover:text-high-emphesis focus:text-high-emphesis focus:outline-none focus:ring focus:ring-offset focus:ring-offset-purple focus:ring-purple"
          >
            <span className="sr-only">Dismiss</span>
            <XIcon className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  ) : null;
}
