import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import theme from "../../theme";
import Background from "../styledComponents/background.js";


const HeaderContainerDiv = styled.header`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem 0 2rem;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  text-align: center;
  color: ${theme.color.lighter};

  ${theme.media.desktop} {
    padding: calc(5vh + 3.5rem) 0 2rem;
  }
`;

const HeaderContainerArticle = HeaderContainerDiv.withComponent('article')

class PageHeader extends React.Component {
  render() {
    if (this.props.tag && this.props.tag === 'article') {
      return (
        <HeaderContainerArticle
          className={this.props.className}
        >
          <Background
            img={this.props.background}
          />
          {this.props.children}
        </HeaderContainerArticle>
      );
    }
    else {
      return (
        <HeaderContainerDiv
          className={this.props.className}
        >
          <Background
            img={this.props.background}
          />
          {this.props.children}
        </HeaderContainerDiv>
      );
    }
  }
}

PageHeader.propTypes = {
  background: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  tag: PropTypes.oneOf(['article']),
}

export default PageHeader;
