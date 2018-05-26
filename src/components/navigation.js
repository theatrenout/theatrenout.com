import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Link from "gatsby-link";

import theme from "../theme";
import Icon from "./styledComponents/icon";


const LinkContainer = styled(Link)`
  margin: 0;
  padding: 1rem;
  border-radius: .2rem;
  font-size: 1rem;
  text-decoration: none;
  border: 1px solid ${theme.color.primary};
  color: ${theme.color.primary};
  background-color: ${theme.color.lighter};

  &:hover, &:active, &:focus {
    color: ${theme.color.lighter};
    background-color: ${theme.color.primary};
  }
`

const AnchorContainer = LinkContainer.withComponent('a')

const ButtonContainer = LinkContainer.withComponent('button')

const StyledIcon = styled(Icon)`
  display: block;
  height: 2rem;
  width: 2rem;
  margin: auto;

  ${theme.media.desktop} {
    display: inline;
    height: 1.5rem;
    width: 1.5rem;
    margin-right: .4rem !important;
    margin-bottom: -.4rem !important;
  }
`

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.onClickHandle = this.onClickHandle.bind(this);
  }

  onClickHandle(e) {
    e.preventDefault();
    this.props.onClickHandle();
  };

  render() {
    const { icon, type, children, onClickHandle, ...others} = this.props;
    if (type === 'link') {
      return (
        <LinkContainer
          {...others}
        >
          {icon && icon.length > 0 ? (
            <StyledIcon type={icon} />
          )
          : null }
          {children}
        </LinkContainer>
      )
    }
    else if (type === 'anchor') {
      return (
        <AnchorContainer
          {...others}
        >
          {icon && icon.length > 0 ? (
            <StyledIcon type={icon} />
          )
          : null }
          {children}
        </AnchorContainer>
      )
    }
    else if (type === 'button') {
      return (
        <ButtonContainer
          onClick={this.onClickHandle}
          {...others}
        >
          {icon && icon.length > 0 ? (
            <StyledIcon type={icon} />
          )
          : null }
          {children}
        </ButtonContainer>
      )
    }
    else {
      return null;
    }
  }
}

Navigation.propTypes = {
  icon: PropTypes.string,
  type: PropTypes.string.isRequired,
  onClickHandle: PropTypes.func,
}

export default Navigation;
