import React from "react";

const PosterContainer = props =>
  <figure className="poster-container">
    {props.children}
  </figure>

const PosterImg = props =>
  <img className="poster-img" {...props} />

export default class SpectaclePoster extends React.Component {
  render() {
    return (
      <PosterContainer
        className={this.props.className}
      >
        <PosterImg
          src={this.props.img}
          alt={"Affiche de " + this.props.alt}
        />
      </PosterContainer>
    );
  }
}
