import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import theme from "../theme";
import Icon from "./styledComponents/icon";
import Ctrl from "./ctrl";
import ModalBackground from "./styledComponents/modalBackground";
import Background from "./styledComponents/background";


const MenuWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  overflow: auto;
  z-index: ${props => props.visible ? '150' : '-50'};
`;

const MenuContainer = styled.nav`
  margin-left: ${props => props.visible ? '' : '-1000px'};
  background-color: ${theme.color.lighter};
  z-index: 10;
  box-shadow: ${theme.boxShadow} ${theme.color.darker};
  transition: margin-left .5s;
  min-height: 100%;
  max-width: 100vw;
  height: fit-content;
`;

const MenuHeader = styled.h1`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 2rem 4rem;
`;

const Logo = styled(Icon)`
  height: 2rem;
  color: white;
  margin: .4em .4em .3em;
`;

const Close = styled(Ctrl)`
  position: absolute;
  right: -3rem;
  background-color: ${theme.color.primary};
  border-bottom-right-radius: .5rem;
  border-top-right-radius: .5rem;
  min-width: 3rem;
  min-height: 3rem;

  & svg {
    height: 1.5rem;
  }
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li.attrs({
  role: 'none',
})`
  display: flex;
  min-height: 48px;
  width: 100%;
  margin: 0;
  background-color: ${theme.color.lighter};
`;

const NavLink = styled(Link).attrs({
  role: 'menuitem',
})`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 1em 2em;
  text-decoration: none;

  &:hover, &:active, &:focus {
    background-color: ${theme.color.primary};
    color: ${theme.color.lighter};
  }
`;

const SocialList = styled(NavList)`
  flex-direction: row;
`

const SocialItem = styled(NavItem)`
  width: auto;
  flex: 1 0 auto;
  background-color: ${theme.color.lighter};
`

const NavA = NavLink.withComponent('a')

const Anchor = styled(NavA).attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  text-align: center;
`

const SocialIcon = styled(Icon)`
  height: 2rem;
`

class Menu extends React.Component {
  render() {
    return (
      <MenuWrapper visible={this.props.visible}>
        <MenuContainer
          visible={this.props.visible}
          aria-modal="true"
          aria-hidden={this.props.visible ? 'false' : 'true'}
        >
          <MenuHeader>
            <Background
              img={this.props.image}
            />
            <Logo type="theatrenout" title={this.props.siteTitle} />
            <Close
              type="close"
              alt="Fermer"
              onClickHandle={this.props.onCloseMenu}
            />
          </MenuHeader>
          <NavList
            id="menuprincipal"
            aria-labelledby="menubutton"
            role="menu"
          >
            <NavItem>
              <NavLink to="/" onClick={this.props.onCloseMenu}>Accueil</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/programmation" onClick={this.props.onCloseMenu}>Programmation</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/explorer" onClick={this.props.onCloseMenu}>Explorer</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/notre-histoire" onClick={this.props.onCloseMenu}>Notre histoire</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/nous-rejoindre" onClick={this.props.onCloseMenu}>Nous rejoindre</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/informations-pratiques" onClick={this.props.onCloseMenu}>Informations pratiques</NavLink>
            </NavItem>
          </NavList>
          <SocialList>
            <SocialItem>
              <Anchor
                href={this.props.social.facebook}
                title="Facebook"
              >
                <SocialIcon type="facebook" title="Facebook" />
              </Anchor>
            </SocialItem>
            <SocialItem>
              <Anchor
                href={this.props.social.youtube}
                title="YouTube"
              >
                <SocialIcon type="youtube" title="YouTube" />
              </Anchor>
            </SocialItem>
            <SocialItem>
              <Anchor
                href={this.props.social.newsletter}
                title="Lettre d'actualités"
              >
                <SocialIcon type="email" title="Lettre d'actualités" />
              </Anchor>
            </SocialItem>
          </SocialList>
        </MenuContainer>
        <ModalBackground
          visible={this.props.visible}
          onClickHandle={this.props.onCloseMenu}
        />
      </MenuWrapper>
    );
  }
}

Menu.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onCloseMenu: PropTypes.func.isRequired,
  social: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired,
}

export default Menu;
