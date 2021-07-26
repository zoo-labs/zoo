import { useMatchBreakpoints } from "hooks";
import styled from "styled-components";
import Button from "./Button";
import { scales } from "./types";

const BtnContainer = styled.div`
   display: flex;
   justify-content: space-around;

      transition: all 0.2s;
      position: relative;
   }
`;

const BorderButton = (props): JSX.Element => {
   const { isXs, isSm } = useMatchBreakpoints();
   const isMobile = isXs || isSm;

   return (
      <>
         <BtnContainer>
            <Button scale={isMobile ? scales.XS : scales.MD} {...props} />
         </BtnContainer>
      </>
   );
};

export default BorderButton;
