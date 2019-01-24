import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import theme from "../theme";
import Icon from "./styledComponents/icon";
import Ctrl from "./ctrl";


const HeaderContainer = styled.header`
  width: 100%;

  ${theme.media.desktop} {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
`;

const HeaderNav = styled.div`
  background-color: ${theme.color.primary};
  display: flex;
  justify-content: space-between;

  ${theme.media.desktop} {
    justify-content: flex-start;
    background: none;
    position: absolute;
    top: 5vh;
    left: 5vw;
  }
`;

const HeaderBannerContainer = styled.aside`
  background-color: red;
  width: 100%;


  ${theme.media.desktop} {
    position: absolute;
    top: 0;
  }
`;

const HeaderBannerText = styled.p`
  text-align: center;
  margin: 0;
  padding: .25rem;
`;

const HeaderBannerLink = styled.a`
  color: white;
  text-decoration: none;
  min-height: 0;
`;

const Menu = styled(Ctrl)`
  flex: 0 0 auto;

  & svg {
    height: 1.5rem;
  }

  ${theme.media.desktop} {
    margin: 0 .8rem;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  color: ${theme.color.lighter};
  text-decoration: none;
  box-sizing: border-box;
  padding: .5rem;

  &:hover, &:active, &:focus {
    transform: scale(1.05,1.05);
  }

  & svg {
    height: 1.5rem;
  }

  ${theme.media.desktop} {
    align-items: flex-start;

    & svg {
      height: 2rem;
    }
  }
`

const Share = styled(Ctrl)`
  & svg {
    height: 1.5rem;
  }

  ${theme.media.desktop} {
    display: none;
  }
`;

class Header extends React.Component {
  render() {
    return (
      <HeaderContainer>
        <HeaderNav role="banner">
          <Menu
            type="menu"
            alt="Menu"
            onClickHandle={this.props.onClickMenu}
            id="menubutton"
            aria-haspopup="menu"
            aria-controls="menuprincipal"
          />
          <Logo
            to="/"
            title="Accueil"
          >
            <Icon type="theatrenout" title={this.props.siteTitle} />
          </Logo>
          <Share
            type="share"
            alt="Partager"
            onClickHandle={this.props.onClickShare}
            aria-haspopup="true"
          />
        </HeaderNav>
        <HeaderBannerContainer>
          <HeaderBannerText>
            <HeaderBannerLink href="https://www.onparticipe.fr/cagnottes/16hCWiIq" target="_blank">
              Le Théâtre Nout est en difficulté financière, participez à notre cagnotte en cliquant ici.
            </HeaderBannerLink>
          </HeaderBannerText>
	      </HeaderBannerContainer>
      </HeaderContainer>
    );
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  onClickMenu: PropTypes.func.isRequired,
  onClickShare: PropTypes.func,
}

export default Header;

    height: 1.5rem;
  }

  ${theme.media.desktop} {
    margin: 0 .8rem;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  color: ${theme.color.lighter};
  text-decoration: none;
  box-sizing: border-box;
  padding: .5rem;

  &:hover, &:active, &:focus {
    transform: scale(1.05,1.05);
  }

  & svg {
    height: 1.5rem;
  }

  ${theme.media.desktop} {
    align-items: flex-start;

    & svg {
      height: 2rem;
    }
  }
`

const Share = styled(Ctrl)`
  & svg {
    height: 1.5rem;
  }

  ${theme.media.desktop} {
    display: none;
  }
`;

class Header extends React.Component {
  render() {
    return (
      <HeaderContainer>
        <HeaderBanner>
          <p>
            <a href="https://www.onparticipe.fr/cagnottes/16hCWiIq" target="_blank">
              Le Théâtre Nout est en difficultés financières, participez à notre cagnotte en cliquant ici.
            </a>
          </p>
	</HeaderBanner>
        <HeaderNav role="banner">
          <Menu
            type="menu"
            alt="Menu"
            onClickHandle={this.props.onClickMenu}
            id="menubutton"
            aria-haspopup="menu"
            aria-controls="menuprincipal"
          />
          <Logo
            to="/"
            title="Accueil"
          >
            <Icon type="theatrenout" title={this.props.siteTitle} />
          </Logo>
          <Share
            type="share"
            alt="Partager"
            onClickHandle={this.props.onClickShare}
            aria-haspopup="true"
          />
        </HeaderNav>
      </HeaderContainer>
    );
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  onClickMenu: PropTypes.func.isRequired,
  onClickShare: PropTypes.func,
}

export default Header;
