import styled from "styled-components";
import Text from "../Text/Text";
import { tags, sizes, HeadingProps } from "./types";

const style = {
  [sizes.SM]: {
    fontSize: "16px",
    fontSizeLg: "18px", 
  },
  [sizes.MD]: {
    fontSize: "20px",
    fontSizeLg: "20px",
  },
  [sizes.LG]: {
    fontSize: "24px",
    fontSizeLg: "24px",
  },
  [sizes.XL]: {
    fontSize: "38px",
    fontSizeLg: "40px",
  },
  [sizes.XXL]: {
    fontSize: "48px",
    fontSizeLg: "64px",
  },
};

const Heading = styled(Text).attrs({ bold: true })<HeadingProps>`
  font-size: ${({ size }) => style[size || sizes.MD].fontSize};
  color: ${({ headerColor }) => headerColor || ""};
  font-weight: 550;
  line-height: 1.5;
  letter-spacing: 3px;
  text-transform: uppercase;

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: ${({ size }) => style[size || sizes.LG].fontSizeLg};
  }
`;

Heading.defaultProps = {
  as: tags.H2,
};

export default Heading;
