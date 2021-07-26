import { useMatchBreakpoints } from "hooks";
import styled from "styled-components";
import Button from "./Button";
import { scales } from "./types";

const BtnContainer = styled.div`
  justify-content: space-around;
  position: relative;
  
    * {
     &:hover {
        transition: all 0.2s;
        // border: ${({ theme }) => `2px solid ${theme.colors.primaryDark}`};
        background: ${({ theme }) => theme.colors.primaryDark};
    }
  }

  button {
      text-transform: uppercase;
      border: 2px solid white;
      border-radius: 0px;
      transition: all 0.2s;
  }

`;

const BorderButton = (props): JSX.Element => {
   const { isXs, isSm } = useMatchBreakpoints();
   const isMobile = isXs || isSm;

   return (
      <>
         <BtnContainer>
            <Button variant="secondary" scale={isMobile ? scales.XS : scales.MD} {...props} />
         </BtnContainer>
      </>
   );
};

export default BorderButton;
