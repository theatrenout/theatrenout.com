import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import Swipeable from "react-swipeable";
import remark from "remark";
import reactRenderer from "remark-react";

import theme from "../../theme";
import Ctrl from "../ctrl";


const ReviewsCtrls = styled.div`
  font-family: ${theme.font.primaryAll};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.color.primary};
  margin-top: -.5rem;
  margin-bottom: .5rem;
`;

const NavCtrl = styled(Ctrl)`
  height: 1rem;
  min-width: 1rem;
  min-height: 1rem;
  color: ${theme.color.primary};

  & svg {
    height: 1rem;
  }

  &:hover, &:focus, &:active {
    & svg {
      transform: scale(1.2, 1.2);
    }
  }
`;

const Counter = styled.span`
  margin: 0 .6rem;
  font-size: 1rem;
`;

const ReviewsList = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
`;

const Review = styled.blockquote`

  && {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    width: 100%;
    font-size: 1rem;
    color: ${theme.color.default};
    background-color: transparent;
    opacity: ${props=> props.visible ? '1' : 0};
    z-index: ${props=> props.visible ? '1' : 0};
    transition: opacity .5s;
  }

  &&:before {
    display: none;
    content: '';
  }
  &&:after {
    display: none;
    content: '';
  }
`;

const Text = styled.div`
  margin: 0;
  margin-bottom: .5rem;
  width: 100%;

  & p {
    text-indent: 2em;
    margin-bottom: 1rem !important;
  }
`;

const Author = styled.p`
  margin: 0;
  width: 100%;
  text-align: right;
  font-family: ${theme.font.primaryAll};
  color: ${theme.color.primary};
`;

class SpectacleReviews extends React.Component {
  constructor(props) {
    super(props);

    this.reviews = [];
    this.reviewsList = null;

    this.onSwipedRight = this.onSwipedRight.bind(this);
    this.onSwipedLeft = this.onSwipedLeft.bind(this);
    this.goToPrev = this.goToPrev.bind(this);
    this.goToNext = this.goToNext.bind(this);

    this.state= {
      activeIndex: Math.floor(Math.random() * props.reviews.length)
    }
  }

  componentDidMount() {
    let maxHeight = 0;
    if (this.reviews.length > 0) {
      for (let i = 0; i < this.reviews.length; i++) {
        const reviewHeight = ReactDOM.findDOMNode(this.reviews[i]).clientHeight;
        if (reviewHeight > maxHeight){
          maxHeight = reviewHeight;
        }
      }
      if (maxHeight != 0) {
        const reviewsList = ReactDOM.findDOMNode(this.reviewsList);
        reviewsList.style.height = maxHeight + 'px';
      }
    }
  }

  onSwipedRight(e) {
    e.stopPropagation();
    this.goToPrev();
  }

  onSwipedLeft(e) {
    e.stopPropagation();
    this.goToNext();
  }

  goToNext() {
    const newIndex = this.state.activeIndex == this.props.reviews.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: newIndex });
  }

  goToPrev() {
    const newIndex = this.state.activeIndex == 0 ? this.props.reviews.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const showCtrls = this.props.reviews.length > 1;
    const activeIndex = this.state.activeIndex;

    return (
      <Swipeable
        onSwipedRight={this.onSwipedRight}
        onSwipedLeft={this.onSwipedLeft}
      >
        {showCtrls ? (
          <ReviewsCtrls>
            <NavCtrl
              type="prev"
              alt="Précédent"
              onClickHandle={this.goToPrev}
              aria-controls="critiques"
            />
            <Counter>
              {this.state.activeIndex + 1}/{this.props.reviews.length}
            </Counter>
            <NavCtrl
              type="next"
              alt="Suivant"
              onClickHandle={this.goToNext}
              aria-controls="critiques"
            />
          </ReviewsCtrls>
        )
        : null }
        <ReviewsList
          ref={div => this.reviewsList = div}
          aria-live="polite"
          id="critiques"
        >
          {this.props.reviews.map((review, index) => (
            <Review
              key={index}
              visible={index == activeIndex}
              ref={blockquote => this.reviews[index] = blockquote}
              aria-hidden={index == activeIndex ? 'false' : 'true'}
            >
              <Text>{remark().use(reactRenderer).processSync(review.text).contents}</Text>
              <Author>{review.author}</Author>
            </Review>
          ))}
        </ReviewsList>
      </Swipeable>
    );
  }
}

SpectacleReviews.propTypes = {
  reviews: PropTypes.array.isRequired,
}

export default SpectacleReviews;
