import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Swipeable from "react-swipeable";

import theme from "../../theme";
import YoutubeVideo from "./youtubeVideo";
import Ctrl from "../ctrl";
import StyledImage, { ImageDetails } from "./image";
import Panorama from "./panorama";
import Spinner from "../styledComponents/spinner";


const SwipeableContent = (props) =>
  <Swipeable
    className={props.className}
    onClick={props.onClick}
    onSwipedRight={props.onSwipedRight}
    onSwipedLeft={props.onSwipedLeft}
  >
    {props.children}
  </Swipeable>

const ContentContainer = styled(SwipeableContent)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${props => props.visible ? '10' : '-1'};
  opacity: ${props => props.visible ? '1' : '0'};
  transition: opacity .5s;

  ${theme.media.desktop} {
    ${props => props.theme === 'full' && !props.isFullscreen ? 'padding-bottom: 8rem;' : ''}
  }

  & .iowA {
    display: flex;
    width: 100%;
    height: 100%;

    ${theme.media.desktop} {
      ${props => props.theme === 'full' || props.isFullscreen ? '' : `
        height: 80vh;
        width: 80vw;
      `};
    }
  }
`

const NavCtrl = styled(Ctrl)`
  position: absolute;
  ${props => props.type === 'prev' ? 'left: 0;' : 'right: 0;'}
  top: 0;
  height: 100%;
  z-index: ${props => props.visible ? '99' : '-1'};
  opacity: ${props => props.visible ? '1' : '0'};
  transition: opacity .5s;

  & svg {
    height: 2.4rem;
  }

  ${theme.media.desktop} {
    ${props => props.type === 'prev' ? 'left: 3rem;' : 'right: 3rem;'}
  }
`

class Content extends React.Component {
  constructor(props) {
    super(props);

    this.onSwipedRight = this.onSwipedRight.bind(this);
    this.onSwipedLeft = this.onSwipedLeft.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

  }

  componentDidMount() {
    if (this.props.content.type === 'gallery') {
      document.addEventListener('keydown', this.onKeyDown);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onSwipedRight(e) {
    e.stopPropagation();
    this.props.goToPrev();
  }

  onSwipedLeft(e) {
    e.stopPropagation();
    this.props.goToNext();
  }

  onKeyDown(e) {
    if (this.props.content.type === 'gallery') {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.props.goToPrev();
      }
      else if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        this.props.goToNext();
      }
    }
  }

  onClickPrevent(e) {
    e.stopPropagation();
  }

  render() {
    const type = this.props.content.type;

    if (type === 'image') {
      const image = this.props.content.image;
      return (
        <ContentContainer
          visible={true}
          onClick={this.props.onClickHandle}
          isFullscreen={this.props.isFullscreen}
        >
          <StyledImage
            fluid={image.full.fluid}
            alt={image.title}
            className="iowA"
            style={{flex: '1 0 auto'}}
            imgStyle={{objectFit: 'contain'}}
          />
          <ImageDetails
            image={image}
            visible={this.props.showExtras}
            onClickHandle={this.onClickPrevent}
          />
        </ContentContainer>
      );
    }
    else if (type === 'panorama') {
      const image = this.props.content.image;
      return (
        <ContentContainer
          visible={true}
          onClick={this.props.onClickHandle}
          isFullscreen={this.props.isFullscreen}
        >
          <Panorama
            image={image}
          />
        </ContentContainer>
      );
    }
    else if (type === 'video') {
      const video = this.props.content.video;

      return (
        <ContentContainer
          visible={true}
          onClick={this.props.onClickHandle}
          isFullscreen={this.props.isFullscreen}
        >
          <Spinner />
          <YoutubeVideo
            url={video}
          />
        </ContentContainer>
      );
    }
    else if (type === 'gallery') {
      const gallery = this.props.content.gallery;
      const activeIndex = this.props.activeIndex;
      const hasNav = gallery.length > 1;

      return (
        <div
          id="photographies"
          className={this.props.className}
        >
          {hasNav ? (
            <NavCtrl
              type="prev"
              alt="Précédent"
              visible={this.props.showExtras}
              onClickHandle={this.props.goToPrev}
              aria-hidden={this.props.showExtras ? 'false' : 'true'}
              aria-controls="photographies"
            />
          )
          : null }
          {gallery.map((image, index) => (
            <ContentContainer
              key={index}
              visible={index === activeIndex}
              onClick={this.props.onClickHandle}
              onSwipedLeft={this.onSwipedLeft}
              onSwipedRight={this.onSwipedRight}
              isFullscreen={this.props.isFullscreen}
              theme={this.props.theme}
              aria-hidden={index === activeIndex ? 'false' : 'true'}
            >
              <StyledImage
                fluid={image.url.full.fluid}
                alt={image.title}
                className="iowA"
                style={{flex: '1 0 auto'}}
                imgStyle={{objectFit: 'contain'}}
                aria-describedby={'details-' + index}
              />
            <ImageDetails
                id={'details-' + index}
                image={image}
                visible={this.props.showExtras}
                onClickHandle={this.onClickPrevent}
                aria-hidden={this.props.showExtras ? 'false' : 'true'}
              />
            </ContentContainer>
          ))}
          {hasNav ? (
            <NavCtrl
              type="next"
              alt="Suivant"
              visible={this.props.showExtras}
              onClickHandle={this.props.goToNext}
              aria-hidden={this.props.showExtras ? 'false' : 'true'}
              aria-controls="photographies"
            />
          )
          : null }
        </div>
      );
    }
  }
}

Content.propTypes = {
  content: PropTypes.object,
  theme: PropTypes.string,
  activeIndex: PropTypes.number,
  showExtras: PropTypes.bool,
  isFullscreen: PropTypes.bool.isRequired,
  onClickHandle: PropTypes.func,
  goToNext: PropTypes.func,
  goToPrev: PropTypes.func,
}

export default Content;
