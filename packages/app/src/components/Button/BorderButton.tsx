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
     margin-top: -2px;
    background: ${({ theme }) => theme.colors.primaryPop};
    padding: 8px 8px;
    text-transform: uppercase;
    border-radius: 4px;
    transition: all 0.2s;
    display: inline-block;
    text-shadow: x-offset y-offset blur color;
    text-decoration: none;
    /* font-weight: bold;
    background-color: #538fbe;
    padding: 20px 70px;
    font-size: 24px; */
    border: 1px solid #2d6898;
    -webkit-box-shadow: 0px 3px 0px #136071, 0px 3px 15px rgba(0,0,0,.4), inset 0px 1px 0px rgba(255,255,255,.3), inset 0px 0px 3px rgba(255,255,255,.5);
    -moz-box-shadow: 0px 3px 0px #136071, 0px 3px 15px rgba(0,0,0,.4), inset 0px 1px 0px rgba(255,255,255,.3), inset 0px 0px 3px rgba(255,255,255,.5);
     box-shadow: 0px 3px 0px #136071, 0px 3px 15px rgba(0,0,0,.4), inset 0px 1px 0px rgba(255,255,255,.3), inset 0px 0px 3px rgba(255,255,255,.5);
     -webkit-transition: all .1s ease-in-out;
     -moz-transition: all .2s ease-in-out;
     transition: all .2s ease-in-out;
  }
  button:active {
      -webkit-box-shadow: 0px 0px 0px #136071, 0px 1px 6px rgba(0,0,0,.4), inset 0px 1px 0px rgba(255,255,255,.3), inset 0px 0px 3px rgba(255,255,255,.5);
      -moz-box-shadow: 0px 0px 0px #136071, 0px 1px 6px rgba(0,0,0,.4), inset 0px 1px 0px rgba(255,255,255,.3), inset 0px 0px 3px rgba(255,255,255,.5);
      box-shadow: 0px 0px 0px #136071, 0px 1px 6px rgba(0,0,0,.4), inset 0px 1px 0px rgba(255,255,255,.3), inset 0px 0px 3px rgba(255,255,255,.5);
      -webkit-transform: translate(0, 3px);
      -moz-transform: translate(0, 3px);
      transform: translate(0, 3px);
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
