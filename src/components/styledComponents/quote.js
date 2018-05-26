import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import nl2br from "react-nl2br";

import theme from "../../theme";


const QuoteContainer = styled.blockquote`
  padding: 0;
  margin: 0;
  text-align: center;
`;

const QuoteText = styled.p`
  margin: 0;
  line-height: normal;

  &:before {
    content: "«";
    display: inline;
    font-family: ${theme.font.primaryAll};
    font-size: 1.8rem;
    line-height: .5rem;
    margin-right: .5rem;
    position: relative;
    top: 0;
  }

  &:after {
    content: "»";
    display: inline;
    font-family: ${theme.font.primaryAll};
    font-size: 1.8rem;
    line-height: .5rem;
    margin-left: .5rem;
    position: relative;
    top: .5rem;
  }

  ${theme.media.desktop} {
    &:before {
      font-size: 2.5rem;
    }

    &:after {
      font-size: 2.5rem;
    }
  }
`

const Author = styled.cite`
  display: block;
  margin-top: .2rem;
  text-align: right;
  color: ${theme.color.light};
  font-style: italic;
`

class Quote extends React.Component {
  render() {
    if(this.props.text && this.props.text.length > 0) {
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
    else {
      return null;
    }
  }
}

Quote.propTypes = {
  text: PropTypes.string,
  author: PropTypes.string,
  className: PropTypes.string,
}

export default Quote;
