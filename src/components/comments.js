import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import theme from "../theme";
import Quote from "./styledComponents/quote";


const CommentsContainer = styled.section`
  position: relative;
  width: 100%;
  margin: 2rem 0 -2rem;
  background-color: ${theme.color.dark};
`

const Comment = styled(Quote)`
  position: absolute;
  top: auto;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: .5rem;
  color: ${theme.color.lighter};
  opacity: ${props => props.visible ? '1' : '0'};
  transition: opacity .5s;
  z-index: ${props => props.visible ? '1' : '0'};

  ${theme.media.desktop} {
    padding: 1rem 15%;
    font-size: 1.2em;
  }
`

class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.nextSlide = this.nextSlide.bind(this);

    this.comments = [];
    this.commentsList = null;
    this.interval = null;

    let activeIndex = 0;
    if (props.comments && props.comments.length > 1) {
      activeIndex = Math.floor(Math.random() * props.comments.length);
    }
    this.state = {
      activeIndex: activeIndex,
    };
  }

  componentDidMount() {
    let maxHeight = 0;
    if (this.comments.length > 0) {
      for (let i = 0; i < this.comments.length; i++) {
        const commentHeight = ReactDOM.findDOMNode(this.comments[i]).clientHeight;
        if (commentHeight > maxHeight){
          maxHeight = commentHeight;
        }
      }
      if (maxHeight != 0) {
        const commentsList = ReactDOM.findDOMNode(this.commentsList);
        commentsList.style.height = maxHeight + 'px';

        for (let i = 0; i < this.comments.length; i++) {
          ReactDOM.findDOMNode(this.comments[i]).style.height = maxHeight + 'px';
        }
      }
      if (this.comments.length > 1) {
        this.interval = setInterval(this.nextSlide, 5000);
      }
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  nextSlide() {
    if (this.state.activeIndex < this.props.comments.length - 1) {
      this.setState({ activeIndex: this.state.activeIndex + 1 });
    }
    else {
      this.setState({ activeIndex: 0 });
    }
  }

  render() {
    const comments = this.props.comments;

    if (comments) {
      const activeIndex = this.state.activeIndex;

      return (
        <CommentsContainer ref={div => this.commentsList = div}>
          {this.props.comments.map((comment, index) => (
            <Comment
              key={index}
              text={comment.text}
              author={comment.author}
              visible={index == activeIndex}
              ref={comment => this.comments[index] = comment}
            />
          ))}
        </CommentsContainer>
      );
    }
    else {
      return null;
    }
  }
}

Comments.propTypes = {
  comments: PropTypes.array,
}

export default Comments;
