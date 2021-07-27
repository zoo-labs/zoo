import { useMatchBreakpoints } from "hooks";
import styled from "styled-components";
import Button from "./Button";
import { scales } from "./types";

const BtnContainer = styled.div`
  max-width: 200px;
  position: relative;
    * {
     &:hover {
        transition: all 0.2s;
        // border: ${({ theme }) => `2px solid ${theme.colors.primaryDark}`};
        background: ${({ theme }) => theme.colors.secondary};
    }
  }

  button {
    background: ${({ theme }) => theme.colors.primaryPop};
    padding: 8px 8px;
    text-transform: uppercase;
    border-radius: 4px;
    transition: all 0.2s;
  }

`;

const BorderButton = (props): JSX.Element => {
   const { isXs, isSm } = useMatchBreakpoints();
   const isMobile = isXs || isSm;

   return (
      <>
         <BtnContainer>
            <Button variant="primary" scale={isMobile ? scales.XS : scales.MD} {...props} style={{fontSize: `${isMobile ? "14px" : "16px"}`}}/>
         </BtnContainer>
      </>
   );
};

export default BorderButton;
