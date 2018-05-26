import React from "react";

import BackgroundImg from "./backgroundImg";

const BackgroundContainer = props =>
  <div className="background-container">
    {props.children}
  </div>

export default class Background extends React.Component {
  render() {
    if (this.props.img) {
      return (
        <BackgroundContainer className={this.props.className} >
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
