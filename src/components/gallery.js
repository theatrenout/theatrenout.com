import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Img from "gatsby-image";

import theme from "../theme";

const GalleryContainer = styled.section`
  width: 100%;
  background-color: ${theme.color.primary};
  padding: 4px 0;

  ${theme.media.desktop} {
    padding: 4px 5vw;
  }
`

const GalleryWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin: auto;
  padding: 0;
`

const Thumbnail = styled.li`
  box-sizing: border-box;
  min-width: 100px;
  min-height: 100px;
  width: 10%;
  list-style: none;
`

const ThumbWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
`

const ThumbCtrl = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
  padding: 0;
  transition: all .5s;

  &:hover {
    cursor: pointer;
    transform: scale(1.2,1.2);
    z-index: 10;
  }
`

const ThumbImg = styled(Img)`
  width: 100%;
  height: 100%;
  vertical-align: middle;
`

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.onClickThumb = this.onClickThumb.bind(this);
  }

  onClickThumb(e, image) {
    e.preventDefault();
    this.props.onClickHandle(image, this.props.id);
  }

  render() {
    const onClickThumb = this.onClickThumb;

    return (
      <GalleryContainer id={this.props.id ? this.props.id : ''}>
        <GalleryWrapper>
          {this.props.images.map((image, index) => (
            <Thumbnail
              key={image.url.thumbnail.sizes.src}
            >
              <ThumbWrapper>
                <ThumbCtrl
                  onClick={(e) => onClickThumb(e, image)}
                  aria-haspopup="true"
                  title={image.title}
                >
                  <ThumbImg
                    sizes={image.url.thumbnail.sizes}
                    alt={image.title}
                  />
                </ThumbCtrl>
              </ThumbWrapper>
            </Thumbnail>
          ))}
        </GalleryWrapper>
      </GalleryContainer>
    );
  }
}

Gallery.propTypes = {
  images: PropTypes.array.isRequired,
  id: PropTypes.string,
  onClickHandle: PropTypes.func.isRequired,
}

export default Gallery;

export const markdownFrontmatterFragment = graphql`
  fragment GalleryContent on MarkdownRemark {
    frontmatter {
      images {
        title
        url {
          full: childImageSharp {
            sizes(maxWidth: 1920) {
              ...GatsbyImageSharpSizes_withWebp
            }
          }
          thumbnail: childImageSharp {
            sizes(maxHeight: 200, maxWidth: 200) {
              ...GatsbyImageSharpSizes_withWebp
            }
          }
        }
        quote
        description
        copyright
      }
    }
  }
`;
