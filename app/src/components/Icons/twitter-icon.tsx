import * as React from "react";
import { IconProps } from "react-feather";

const TwitterIcon = ({
  width = 39,
  height = 33,
  color = "#fff",
  className,
  ...rest
}: IconProps) => (
  <svg
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      d="m18.937 9.18.084 1.383-1.409-.17C12.484 9.745 8.003 7.542 4.2 3.842l-1.86-1.836-.48 1.355c-1.014 3.023-.365 6.215 1.748 8.362 1.127 1.186.874 1.355-1.07.65-.677-.227-1.269-.396-1.325-.312-.198.198.479 2.769 1.014 3.785.733 1.413 2.226 2.797 3.86 3.616l1.382.65-1.635.028c-1.578 0-1.634.028-1.465.621.563 1.836 2.79 3.785 5.27 4.633l1.747.593-1.522.904a15.952 15.952 0 0 1-7.552 2.09C1.043 29.01 0 29.121 0 29.206c0 .283 3.438 1.864 5.439 2.486 6.002 1.836 13.131 1.045 18.486-2.09 3.804-2.232 7.608-6.667 9.383-10.96.959-2.288 1.917-6.469 1.917-8.474 0-1.3.084-1.469 1.662-3.023.93-.903 1.804-1.892 1.973-2.175.282-.536.253-.536-1.184-.056-2.395.847-2.733.734-1.55-.537.874-.904 1.916-2.542 1.916-3.022 0-.085-.422.056-.901.31-.508.283-1.635.707-2.48.961l-1.522.48-1.38-.932c-.761-.508-1.832-1.073-2.396-1.243-1.437-.395-3.635-.339-4.931.113-3.523 1.271-5.749 4.548-5.495 8.135Z"
      fill={color}
    />
  </svg>
);

export default TwitterIcon;