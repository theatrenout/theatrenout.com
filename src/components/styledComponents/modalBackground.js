import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import theme from "../../theme";


const ModalDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: ${theme.opacity.transparent};
  ${props => props.clickable ? 'cursor: pointer' : ''};
  z-index: -1;
`;

class ModalBackground extends React.Component {
  constructor(props) {
    super(props);

    this.onClickHandle = this.onClickHandle.bind(this);
  }

  onClickHandle(e) {
    e.preventDefault();
    this.props.onClickHandle();
  }

  render() {
    if (this.props.visible) {
      if (this.props.onClickHandle != null) {
        return (
          <ModalDiv
            clickable={true}
            onClick={this.onClickHandle}
          />
        );
      }
      else {
        return (
          <ModalDiv
            clickable={false}
          />
        )
      }
    }
    else {
      return null;
    }
  }
}

ModalBackground.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClickHandle: PropTypes.func,
}

export default ModalBackground
