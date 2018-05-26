import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import BackgroundImg from "./backgroundImg";


const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
`

class Background extends React.Component {
  render() {
    if (this.props.img) {
      return (
        <BackgroundContainer
          className={this.props.className}
          role="presentation"
        >
          <BackgroundImg
            img={this.props.img}
          />
        </BackgroundContainer>
      )
    }
    else {
      return null;
    }
  }
}

Background.propTypes = {
  img: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default Background
