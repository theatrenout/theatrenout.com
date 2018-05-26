import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import theme from "../theme";
import Icon from "./styledComponents/icon";


const CtrlContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  min-width: 48px;
  background-color: transparent;
  border: none;
  font-size: 2rem;
  color: ${theme.color.lighter};

  &:hover, &:active, &:focus {
    cursor: pointer;
    outline: 0;

    & svg {
      transform: scale(1.1,1.1);
    }
  }
`

class Ctrl extends React.Component {
  constructor(props) {
    super(props);

    this.onClickHandle = this.onClickHandle.bind(this);
  }

  onClickHandle(e) {
    e.preventDefault();
    this.props.onClickHandle();
  };

  render() {
    const { alt, type, onClickHandle, ...others} = this.props;
    return (
      <CtrlContainer
        title={alt}
        onClick={this.onClickHandle}
        {...others}
      >
        <Icon
          type={type}
          title={alt}
        />
      </CtrlContainer>
    )
  }
}

Ctrl.propTypes = {
  alt: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClickHandle: PropTypes.func.isRequired,
}

export default Ctrl;
