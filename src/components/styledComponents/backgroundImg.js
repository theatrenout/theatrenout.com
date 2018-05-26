import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Img from "gatsby-image";

const StyledImg = styled(Img)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`

class BackgroundImg extends React.Component {
  render() {
    if (this.props.img) {
      return (
        <StyledImg
          sizes={this.props.img.full.sizes}
          alt=''
          style={{ position: 'absolute' }}
        />
      )
    }
    else {
      return null;
    }
  }
}

BackgroundImg.propTypes = {
  img: PropTypes.object.isRequired,
}

export default BackgroundImg;
