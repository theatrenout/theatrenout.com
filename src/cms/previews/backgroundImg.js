import React from "react";

const StyledImg = props =>
  <img className="background-img" {...props} />

export default class BackgroundImg extends React.Component {
  render() {
    if (this.props.img) {
      return (
        <StyledImg
          src={this.props.img}
          alt=""
        />
      )
    }
    else {
      return null;
    }
  }
}
