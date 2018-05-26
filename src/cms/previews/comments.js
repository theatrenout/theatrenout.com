import React from "react";

import Quote from "./quote";


const CommentsContainer = props =>
  <div className="comments-container">
    {props.children}
  </div>

const Comment = props =>
  <Quote className="comments-comment" {...props} />

export default class Comments extends React.Component {
  render() {
    const comments = this.props.comments;
    if (comments) {
      return (
        <CommentsContainer>
          {this.props.comments.map((comment, index) => (
            <Comment
              key={index}
              text={comment.text}
              author={comment.author}
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
