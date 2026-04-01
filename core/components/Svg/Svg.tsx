import styled, { css, keyframes } from "styled-components";
import { SvgProps } from "./types";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const spinStyle = css`
  animation: ${rotate} 2s linear infinite;
`;


const DefaultSvg = styled.svg<SvgProps>`
  flex-shrink: 0;
  ${({ spin }) => spin && spinStyle}
`;

const Svg: React.FC<SvgProps> = ({
  color = "text",
  width = "20px",
  spin = false,
  ...props
}) => <DefaultSvg color={color} width={width} spin={spin} {...props} />;


export default Svg;
