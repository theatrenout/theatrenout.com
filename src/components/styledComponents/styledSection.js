import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import theme from "../../theme";


const SectionContainer = styled.section`
  position: relative;
  text-align: justify;
  padding: .5rem 0;
  width: 100%;
  display: flex;
  justify-content: center;

  &:nth-child(odd) {
    background-color: ${theme.color.light};
  }

  ${theme.media.desktop} {
    padding: .5rem;
  }
`;

const SectionWrapper = styled.div`
  flex: 0 0 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding: 1% 2%;

  & div h1 {
    font-size: 1.1rem;
    margin: 1rem 0 .7rem;
  }
  & div h2 {
    font-size: 1rem;
    margin: .7rem 0 .5rem;
  }
  & blockquote {
    background-color: ${theme.color.primary};
    color: ${theme.color.lighter};
    padding: 1rem;
    margin: 1rem;
    line-height: normal;
    font-size: .9rem;
    position: relative;
  }
    & blockquote p {
      margin: 0;
      padding: 0;
    }
    & blockquote:before {
      content: "«";
      display: inline;
      font-family: ${theme.font.primaryAll};
      font-size: 1.8rem;
      line-height: .5rem;
      margin-right: .5rem;
      position: absolute;
      top: .8rem;
      left: .8rem;
    }
    & blockquote:after {
      content: "»";
      display: inline;
      font-family: ${theme.font.primaryAll};
      font-size: 1.8rem;
      position: absolute;
      bottom: 0;
      right: .8rem;
    }
  & p {
    text-indent: 2rem;
    margin-bottom: .5rem;
  }
  & ol, & ul {
    margin-left: 3rem;
    margin-bottom: 1rem;
  }
  & li::marker {
    color: ${theme.color.primary}
  }
    & li p {
      margin: 0;
      text-indent: 0;
    }
  & a {
    display: inline;
    min-width: 0;
    min-height: 0;
    font-family: ${theme.font.primaryAll};
  }
    & a:hover, & a:active, & a:focus {
      text-decoration: none;
    }
  & em {
    font-style: italic;
  }
  & strong {
    font-weight: normal;
    font-family: ${theme.font.primaryAll};
    color: ${theme.color.primary};
  }

  ${theme.media.desktop} {
    flex: 0 0 70%;

    & h1 {
      font-size: 1.2rem;
    }
  }
`;

const SectionTitle = styled.h1`
  text-align: center;
  font-size: 1.2em;
  margin-bottom: 1rem;

  ${theme.media.desktop} {
    font-size: 1.5em;
  }
`;

class StyledSection extends React.Component {
  render() {
    return (
      <SectionContainer
        className={this.props.className}
        id={this.props.id ? this.props.id : ''}
      >
        <SectionWrapper>
          {this.props.title && this.props.title.length > 0 ? (
            <SectionTitle>{this.props.title}</SectionTitle>
          )
          : null }
          {this.props.children}
        </SectionWrapper>
      </SectionContainer>
    );
  }
}

StyledSection.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default StyledSection;
