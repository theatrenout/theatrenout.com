import React from "react";

import Background from "../background.js";

const HeaderArticle = props =>
  <div className="header-article">
    {props.children}
  </div>

export default class SpectacleHeader extends React.Component {
  render() {
    return (
      <HeaderArticle
        className={this.props.className}
      >
        <Background img={this.props.background} />
        {this.props.children}
      </HeaderArticle>
    );
  }
}
