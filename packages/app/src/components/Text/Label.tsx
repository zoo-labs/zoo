import styled, { DefaultTheme } from "styled-components";
import { space, typography } from "styled-system";
import getThemeValue from "../../util/getThemeValue";
import { TextProps } from "./types";

interface ThemedProps extends TextProps {
  theme: DefaultTheme;
}

const getColor = ({ color, theme }: ThemedProps) => {
  return getThemeValue(`colors.${color}`, color)(theme);
};

const getFontSize = ({ fontSize, small }: TextProps) => {
  return small ? "16px" : fontSize || "20px";
};

const Label = styled.div<TextProps>`
  color: ${getColor};
  font-size: ${getFontSize};
  font-weight: 600;
  line-height: 1.2;
  width: 100%;
  ${({ textTransform }) => textTransform && `text-transform: ${textTransform};`}
  ${space}
  ${typography}
`;

Label.defaultProps = {
  color: "text",
    small: false,
};

export default Label;
