import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import logo from "media/ZooEggLogoWhite.png";

const LogoContainer = styled.button<{ width?: string }>`
  width: ${(props) => props.width === null ? `50px` : `${props.width}`};
  justify-content: inherit;
  display: flex;
  border-radius: 30px;
  background: transparent;
  padding: 10px 0px;
`;

const MaxHeightLogo = styled.img`
    width: 100%;
    margin-left: 15px;
    // padding-bottom: 50px;
    z-index: 100;
`;

export interface ZooHomeButtonProps {
    width?: string;
}

const ZooHomeButton: React.FC<ZooHomeButtonProps> = ({width}) => {
    const history = useHistory();
    const handleClick = () => {
    history.push("/");
    };
    
    return (
        <LogoContainer width={width}>
            <MaxHeightLogo
            src={logo}
            alt="zoo-logo"
            onClick={() => handleClick()}
                />
      </LogoContainer>
    )
}

export default ZooHomeButton;