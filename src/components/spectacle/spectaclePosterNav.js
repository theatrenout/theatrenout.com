import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Swipeable from "react-swipeable";

import theme from "../../theme";
import Ctrl from "../ctrl";
import SpectaclePoster from "./spectaclePoster";


const NavContainer = styled(Swipeable)`
  position: absolute;
  top: 2rem;
  left: auto;
  display: flex;
  justify-content: center;
  height: 51vw;
  width: 100%;
  margin-bottom: 2vh;
  z-index: 10;

  ${theme.media.desktop} {
    top: calc(5vh + 3.5rem);
    height: 36vh;
  }
`

const ThumbWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 83vw;
  overflow: hidden;

  ${theme.media.desktop} {
    width: calc((72vh / 1.4143) + 9vh);
  }
`

const ThumbList = styled.div`
  display: flex;
  flex: 0 auto;
  align-items: center;
  margin: auto;
  padding: 0;
  transition: transform ${props => props.duration};
  ${props => props.plural ? 'transform: translateX( calc( (-23vw) * ' + (props.activeIndex+1) + ') );' : ''}

  ${theme.media.desktop} {
    ${props => props.plural ? 'transform: translateX( calc( ((-18vh / 1.4143) - 3vh) * ' + (props.activeIndex+1) + ') );' : ''}
  }
`

const Thumbnail = styled(SpectaclePoster)`
  flex: 0 0 auto;
  margin: 0 1vw;
  height: ${props => props.active ? '51vw' : '30vw' };
  width: ${props => props.active ? '36.0602vw' : '21.2119vw' };
  opacity: ${props => props.active ? '1' : theme.opacity.transparent };
  transition: all ${props => props.duration};

  ${theme.media.desktop} {
    margin: 0 1.5vh;
    height: ${props => props.active ? '36vh' : '18vh' };
    width: ${props => props.active ? '25.4543vh' : '12.7271vh' };
  }

  ${props => props.active ? '' : `
    &:hover, &:focus, &:active {
      transform: scale(1.1,1.1);
    }
  `}
`

const NavCtrl = styled(Ctrl)`
  display: none;

  & svg {
    width: 1.2rem;
  }

  ${theme.media.desktop} {
    display: flex;
  }
`

class Thumbnails extends React.Component {
  constructor(props) {
    super(props);

    this.default = { duration: '.5s' };

    this.state = {
      activeIndex: props.activeIndex,
      duration: '',
    };

    this.initThumbs();
  }

  initThumbs() {
    if (this.props.thumbs.length > 1) {
      const Head1 = this.props.thumbs[this.props.thumbs.length - 2];
      const Head2 = this.props.thumbs[this.props.thumbs.length - 1];
      const Tail1 = this.props.thumbs[0];
      const Tail2 = this.props.thumbs[1];
      this.head = [
        {
          number: '-2',
          poster: Head1.poster,
          title: Head1.title,
          link: '#',
        },
        {
          number: '-1',
          poster: Head2.poster,
          title: Head2.title,
          link: '#',
        },
      ];
      this.tail = [
        {
          number: this.props.thumbs.length,
          poster: Tail1.poster,
          title: Tail1.title,
          link: '#',
        },
        {
          number: this.props.thumbs.length + 1,
          poster: Tail2.poster,
          title: Tail2.title,
          link: '#',
        },
      ];
    }
    else {
      this.head = [];
      this.tail = [];
    }
  }

  componentDidMount() {
    this.setState({
      duration: '.5s',
    })
  }

  componentWillReceiveProps(nextProps) {
    var activeIndex = nextProps.activeIndex;
    if (activeIndex != this.props.activeIndex) {
      if ( this.state.activeIndex == this.props.thumbs.length - 1 &&
        nextProps.activeIndex == 0 && nextProps.direction === 'next') {
          activeIndex = this.props.thumbs.length;
      }
      else if ( this.state.activeIndex == 0 &&
        activeIndex == this.props.thumbs.length - 1 && nextProps.direction === 'prev') {
          activeIndex = -1;
      }
      this.setState({
        activeIndex: activeIndex,
        duration: this.default.duration
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeIndex } = prevProps;
    if (activeIndex != this.props.activeIndex &&
      (this.state.activeIndex == this.props.thumbs.length ||
      this.state.activeIndex == -1)) {
        setTimeout(function() {
          this.setState({ activeIndex: this.props.activeIndex, duration: ''});
          setTimeout(function() {
            this.setState({ duration: '.5s' });
          }.bind(this), 100);
        }.bind(this), 600);
    }
  }

  render() {
    const goToPrev = this.props.goToPrev;
    const goToNext = this.props.goToNext;
    const activeIndex = this.state.activeIndex;

    return (
      <ThumbList
        activeIndex={this.state.activeIndex}
        duration={this.state.duration}
        plural={this.props.thumbs.length > 1}
        aria-live="polite"
        id="affiches"
      >
        {this.head.length > 0 ? this.head.map((thumb) => (
          <Thumbnail
            key={thumb.number}
            number={thumb.number}
            img={thumb.poster}
            alt={thumb.title}
            link={thumb.number == activeIndex ? '' : '#'}
            onClickHandle={goToPrev}
            active={thumb.number == activeIndex}
            duration={this.state.duration}
            aria-hidden={(thumb.number <= activeIndex + 1) && (thumb.number >= activeIndex - 1) ? 'false' : 'true'}
          />
        )) : null}
        {this.props.thumbs.map((thumb, index) => (
          <Thumbnail
            key={index}
            number={index}
            img={thumb.poster}
            alt={thumb.title}
            link={index == activeIndex ? '' : '#'}
            onClickHandle={index > activeIndex ? goToNext : goToPrev}
            active={index == activeIndex}
            duration={this.state.duration}
            aria-hidden={(index <= activeIndex + 1) && (index >= activeIndex - 1) ? 'false' : 'true'}
          />
        ))}
        {this.tail.length > 0 ? this.tail.map((thumb) => (
          <Thumbnail
            key={thumb.number}
            number={thumb.number}
            img={thumb.poster}
            alt={thumb.title}
            link={thumb.number == activeIndex ? '' : '#'}
            onClickHandle={goToNext}
            active={thumb.number == activeIndex}
            duration={this.state.duration}
            aria-hidden={(thumb.number <= activeIndex + 1) && (thumb.number >= activeIndex - 1) ? 'false' : 'true'}
          />
        )) : null}
      </ThumbList>
    )
  }
}

class PosterNav extends React.Component {
  constructor(props) {
    super(props);

    this.onSwipedRight = this.onSwipedRight.bind(this);
    this.onSwipedLeft = this.onSwipedLeft.bind(this);
  }

  onSwipedRight(e) {
    e.stopPropagation();
    this.props.goToPrev();
  }

  onSwipedLeft(e) {
    e.stopPropagation();
    this.props.goToNext();
  }

  render() {
    const showCtrls = this.props.thumbs.length > 1 ? true : false;
    return (
      <NavContainer
        onSwipedRight={this.onSwipedRight}
        onSwipedLeft={this.onSwipedLeft}
      >
        <NavCtrl
          type="prev"
          alt="Précédent"
          visible={showCtrls}
          onClickHandle={this.props.goToPrev}
          aria-controls="affiches"
        />
        <ThumbWrapper>
          <Thumbnails
            activeIndex={this.props.activeIndex}
            thumbs={this.props.thumbs}
            direction={this.props.direction}
            goToPrev={this.props.goToPrev}
            goToNext={this.props.goToNext}
          />
        </ThumbWrapper>
        <NavCtrl
          type="next"
          alt="Suivant"
          visible={showCtrls}
          onClickHandle={this.props.goToNext}
          aria-controls="affiches"
        />
      </NavContainer>
    );
  }
}

PosterNav.propTypes = {
  thumbs: PropTypes.array.isRequired,
  activeIndex: PropTypes.number.isRequired,
  direction: PropTypes.string,
  goToPrev: PropTypes.func,
  goToNext: PropTypes.func,
}

export default PosterNav;
