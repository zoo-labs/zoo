import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import throttle from "lodash/throttle";
import { useLocation, useRouteMatch, useHistory } from "react-router-dom";
import { Overlay } from "../Overlay";
import Flex from "../../components/Box/Flex";
import useMatchBreakpoints from "../../hooks/useMatchBreakpoints";
import Logo from "./components/Logo";
import Panel from "./components/Panel";
import UserBlock from "./components/UserBlock";
import { NavProps } from "./types";
import logo from "media/ZooLogoWhite.png";
import {
  MENU_HEIGHT,
  SIDEBAR_WIDTH_REDUCED,
  SIDEBAR_WIDTH_FULL,
} from "./config";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const LogoContainer = styled.div`
  height: 95%;
  ${({ theme }) =>
    theme.mediaQueries.md || theme.mediaQueries.lg || theme.mediaQueries.xl} {
    left: 50%;
  }
`;

const StyledNav = styled.nav<{ showMenu: boolean; isPushed: boolean }>`
  position: fixed;
  // top: ${({ showMenu }) => (showMenu ? 0 : `-${MENU_HEIGHT}px`)};
  right: 0;
  transition: background-color 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
  padding-right: 16px;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  background-color: ${({ showMenu, theme }) => (showMenu ? theme.isDark ? 'transparent' : `black` : `black`)};
  z-index: 20;
  transform: translate3d(0, 0, 0);
`;

const BodyWrapper = styled.div`
  position: relative;
  display: flex;
`;

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  flex-grow: 1;
  margin-top: 64px;
  transition: margin-top 0.2s;
  transform: translate3d(0, 0, 0);
  max-width: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    margin-left: ${({ isPushed }) =>
      `${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`};
    max-width: ${({ isPushed }) =>
      `calc(100% - ${
        isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED
      }px)`};
  }
`;

const MobileOnlyOverlay = styled(Overlay)`
  position: fixed;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    display: none;
  }
`;

const StyledProviderTitle = styled.div`
  align-self: center;
  margin-left: 15px;
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;
  display: none;

  ${({ theme }) => theme.mediaQueries.md} {
    display: inline;
  }
`;

const MaxHeightLogo = styled.img`
  // height: 100%;
  // width: 30%;
  height: ${MENU_HEIGHT / 1.5}px;
  position: absolute;
  top: 10px;
  left: 60px;
`;

const Menu: React.FC<NavProps> = ({
  providerTitle,
  account,
  chainId,
  login,
  logout,
  isDark,
  toggleTheme,
  links,
  children,
}) => {
  const containerRef = React.useRef(null);
  const { isXl, isXs, isSm } = useMatchBreakpoints();
  const isMobile = isXl === false;
  const [isPushed, setIsPushed] = useState(!isMobile);
  const [showMenu, setShowMenu] = useState(true);
  const refPrevOffset = useRef(window.pageYOffset);
  const [network, setNetwork] = useState("");
  const { pathname } = useLocation();
  const history = useHistory();

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsPushed(false);
    }
  };

  useEffect(() => {
    if (chainId !== undefined) {
      switch (chainId) {
        case 1:
          setNetwork("ETH");
          break;
        case 42:
          setNetwork("Kovan");
          break;
        case 56:
          if (isXs || isSm) {
            setNetwork("BSC-M");
          } else {
            setNetwork("BSC-Main");
          }
          break;
        case 97:
          if (isXs || isSm) {
            setNetwork("BSC-T");
          } else {
            setNetwork("BSC-Test");
          }
          break;
        default:
          setNetwork("Not Supported");
      }
    } else {
      setNetwork("");
    }
  }, [pathname, account, chainId, isSm, isXs]);

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current) {
          // Has scroll up
          setShowMenu(true);
        } else {
          // Has scroll down
          setShowMenu(false);
        }
      }
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  // Find the home link if provided
  const homeLink = links.find((link) => link.label === "Token Raise");
  const handleClick = () => {
    history.push("/feed");
  };

  return (
    <Wrapper>
      <StyledNav showMenu={showMenu} isPushed={isPushed}>
        <Logo
          isPushed={isPushed}
          togglePush={() => setIsPushed((prevState: boolean) => !prevState)}
          isDark={isDark}
          href={homeLink?.href ?? "/feed"}
        />
        <LogoContainer>
          <MaxHeightLogo
            src={logo}
            alt="zoo-logo"
            onClick={() => handleClick()}
          />
        </LogoContainer>
        <Flex alignItems="center">
          <UserBlock account={account} login={login} logout={logout} />
          {!isXs && !isSm && account && (
            <StyledProviderTitle>{providerTitle}</StyledProviderTitle>
          )}
          {/* {profile && <Avatar profile={profile} />} */}
        </Flex>
      </StyledNav>
      <BodyWrapper>
        <Panel
          isPushed={isPushed}
          isMobile={isMobile}
          showMenu={showMenu}
          isDark={isDark}
          toggleTheme={toggleTheme}
          pushNav={setIsPushed}
          links={links}
        />
        <Inner isPushed={isPushed} showMenu={showMenu}>
          {children}
        </Inner>
        <MobileOnlyOverlay
          show={isPushed}
          onClick={() => setIsPushed(false)}
          role="presentation"
          ref={containerRef}
        />
      </BodyWrapper>
    </Wrapper>
  );
};

export default Menu;
