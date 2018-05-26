import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import nl2br from "react-nl2br";
import Img from "gatsby-image";
import Link from "gatsby-link";

import theme from "../../theme";
import Quote from "../styledComponents/quote";


const StyledImage = styled(Img)`
  max-width: 100%;
  max-height: 100%;
`

export default StyledImage;

const DetailsContainer = styled.figcaption`
  display: block;
  width: 100%;
  padding: 0;
  position: absolute;
  bottom: 0;
  left: 0;
  text-align: center;
  z-index: ${props => props.visible ? '10' : '-1'};
  opacity: ${props => props.visible ? '10' : '-1'};
  transition: opacity .5s;
`

const ImageQuote = styled(Quote)`
  margin: auto;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-style: italic;
  font-family: ${theme.font.primaryAll};
  color: ${theme.color.light};
  text-shadow: 0 0 2px black;

  ${theme.media.desktop} {
    font-size: 1.2rem;
    max-width: 60%;
    margin-bottom: 3rem;
  }
`

const Details = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: .5rem;
  background-color: ${theme.color.dark};
  color: ${theme.color.lighter};
  margin: 0;

  ${theme.media.desktop} {
    padding: 1rem 2rem 2rem;
  }
`

const Title = styled.h1`
  font-size: 1rem;
  padding: 0;
  margin: .5rem 0;
`

const Detail = styled.p`
  padding: 0;
  margin: 0;
  list-style: none;
`

const Copyright = Detail.extend`
  font-size: .8rem;
`

class ImageDetails extends React.Component {
  render() {
    const image = this.props.image;
    const spectacle = this.props.spectacle;
    const hasDetailsList = spectacle != null || (image != null && (image.description != null || image.copyright != null));
    const hasDetails = hasDetailsList || image.quote != null;

    if (hasDetails) {
      return (
        <DetailsContainer
          id={this.props.id}
          visible={this.props.visible}
          onClick={this.props.onClickHandle}
          aria-hidden={this.props.visible ? 'false' : 'true'}
        >
          <ImageQuote
            text={image.quote}
          />
          {hasDetailsList ? (
            <Details
              className={this.props.className}
            >
              <Title>
                {spectacle ? (
                    <Link to={spectacle.slug}>{spectacle.title} : </Link>
                )
                : null }
                {image.title}
              </Title>
              {image.description ? (
                <Detail>
                  {nl2br(image.description)}
                </Detail>
              )
              : null }
              {image.copyright ? (
                <Copyright>
                  &copy; {image.copyright}
                </Copyright>
              )
              : null }
            </Details>
          )
          : null }
        </DetailsContainer>
      );
    }
    else {
      return null;
    }
  }
}

ImageDetails.propTypes = {
  id: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  image: PropTypes.object.isRequired,
  spectacle: PropTypes.object,
  onClickHandle: PropTypes.func,
}

export { ImageDetails };
