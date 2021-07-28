import { useMatchBreakpoints } from "hooks";
import styled from "styled-components";
import Button from "./Button";
import { scaleVariants } from "./theme";
import { scales, variants } from "./types";

const BtnContainer = styled.div`
  max-width: 200px;
    * {
     &:hover {
        transition: all 0.2s;
        // border: ${({ theme }) => `2px solid ${theme.colors.primaryDark}`};
        background: ${({ theme }) => theme.colors.secondary};
    }
  }

  button {
     align-items: center;
    background: ${({ theme }) => theme.colors.primaryPop};
    text-transform: uppercase;
    border-radius: 4px;
    transition: all 0.2s;
    border: 0px;
    color: ${({theme }) => theme.colors.text};
  }

`;

const BorderButton = (props): JSX.Element => {
   const { variant, scale } = props;
   const { isXs, isSm } = useMatchBreakpoints();
   const isMobile = isXs || isSm;

   return (
      <>
         <BtnContainer>
            <Button
               variant={variant === null ? variants.PRIMARY : variant}
               scale={scale === null ? isMobile ? scales.XS : scales.MD : scale}
               {...props}
               // style={{ fontSize: `${isMobile ? "14px" : "16px"}` }}
            />
         </BtnContainer>
      </>
   );
};

BorderButton.defaultProps = {
   scale: scaleVariants,
   variant: variants,
}

export default BorderButton;
