import React from "react";
import nl2br from "react-nl2br";


const QuoteContainer = props =>
  <blockquote className={props.className + " quote-container"}>
    {props.children}
  </blockquote>

const QuoteText = props =>
  <p className="quote-text">
    {props.children}
  </p>

const Author = props =>
  <cite className="quote-author">
    {props.children}
  </cite>

export default class Quote extends React.Component {
  render() {
    return (
      <QuoteContainer className={this.props.className}>
        <QuoteText>
          {nl2br(this.props.text)}
        </QuoteText>
        {this.props.author != null ? (
          <Author>
            {this.props.author}
          </Author>
        )
        : null }
      </QuoteContainer>
    )
  }
}
