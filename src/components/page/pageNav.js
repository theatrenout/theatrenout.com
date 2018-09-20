import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import theme from "../../theme";
import Navigation from "../navigation";


const NavContainer = styled.nav`
  padding: 0;
  margin: 0;
  width: 90%;
`

const NavList = styled.ul`
  padding: 0;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const NavItem = styled.li`
  flex: 0 0 auto;
  list-style: none;
  margin: .3rem;

  ${theme.media.desktop} {
    margin: 0 .5rem;
  }
`

const NavLink = styled(Navigation).attrs({
  type: 'anchor',
})`
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`

class PageNav extends React.Component {
  render() {
    if (this.props.links && this.props.links.length > 0) {
      return (
        <NavContainer>
          <NavList
            role="menubar"
          >
            {this.props.links.map(link => (
              <NavItem
                role="none"
                key={link.url}
              >
                <NavLink
                  href={link.url}
                  role="menuitem"
                >
                  {link.text}
                </NavLink>
              </NavItem>
            ))}
          </NavList>
        </NavContainer>
      );
    }
    else {
      return null;
    }
  }
}

PageNav.propTypes = {
  links: PropTypes.array.isRequired,
}

export default PageNav;
