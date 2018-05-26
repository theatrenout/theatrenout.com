import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Img from "gatsby-image";


const PosterLinkContainer = styled.figure`
  margin-bottom: 1rem;
  height: 36vh;
  width: 25.4543vh;

  @media (orientation:portrait) {
    height: 51vw;
    width: 36.0602vw;
  }

  & .gatsby-image-outer-wrapper {
    height: 100%;
  }
`;

const PosterCtrlContainer = PosterLinkContainer.withComponent('button').extend`
  border: none;
  outline: 0;
  padding: 0;
  transition: all .5s;

  &:hover {
    cursor: pointer;
    transform: scale(1.2,1.2);
  }
`

const PosterImg = styled(Img)`
  height: 100%;
  vertical-align: middle;
`;

const StyledLink = styled(Link)`
  height: 100%;
  width: 100%;
`;

class SpectaclePoster extends React.Component {
  constructor(props) {
    super(props);

    this.onClickPoster = this.onClickPoster.bind(this);
  }

  onClickPoster(e) {
    e.preventDefault();
    const image = {
      url: this.props.img,
      title: this.props.alt
    }
    this.props.onClickHandle(image);
  }

  render() {
    const {alt, img, visible, link, type, onClickHandle, ...others} = this.props;

    if (type && type === 'ctrl') {
        return (
          <PosterCtrlContainer
            onClick={this.onClickPoster}
            title={alt}
            {...others}
          >
            <PosterImg
              sizes={img.full.sizes}
              alt={'Affiche de ' + alt}
            />
        </PosterCtrlContainer>
        );
    }
    else if (link && link.length > 0) {
      return (
        <PosterLinkContainer
          {...others}
        >
          <StyledLink
            to={link}
            onClick={this.onClickPoster}
            aria-haspopup="true"
            title={alt}
          >
            <PosterImg
              sizes={img.full.sizes}
              alt={'Affiche de ' + alt}
            />
          </StyledLink>
        </PosterLinkContainer>
      );
    }
    else {
      return (
        <PosterLinkContainer
          {...others}
        >
          <PosterImg
            sizes={img.full.sizes}
            alt={'Affiche de ' + alt}
            title={alt}
          />
      </PosterLinkContainer>
      );
    }
  }
}

SpectaclePoster.propTypes = {
  img: PropTypes.object.isRequired,
  alt: PropTypes.string.isRequired,
  link: PropTypes.string,
  type: PropTypes.string,
  onClickHandle: PropTypes.func,
}

export default SpectaclePoster;
