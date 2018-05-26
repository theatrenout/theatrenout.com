import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import theme from "../../theme";
import Icon from "../styledComponents/icon";
import Spectacle from "../../functions/spectacle";


const TagsList = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Tag = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  margin: .2rem !important;
  padding: .2rem .4rem;
  color: ${theme.color.lighter};
  background-color: ${props => props.color ? props.color : theme.color.dark};
  border-radius: .2rem;
  font-size: .8rem;
`

const TagIcon = styled(Icon)`
  height: .8rem;
  margin-right: .3rem;
`

const Text = styled.span`
  margin-bottom: -.1rem !important;
`

class SpectacleTags extends React.Component {
  render() {
    const tags = Spectacle.getTags(this.props.categories, this.props.duration,
      this.props.shows, this.props.notice, this.props.creation, this.props.exclude);

    if (tags && tags.length > 0) {
      return (
        <TagsList className={this.props.className}>
          {tags.map((tag) => (
            <Tag
              key={tag.text}
              color={tag.color}
            >
              {tag.icon ? (
                <TagIcon type={tag.icon} />
              )
              : null }
              <Text>{tag.text}</Text>
            </Tag>
          ))}
        </TagsList>
      );
    }
    else {
      return null;
    }
  }
}

SpectacleTags.propTypes = {
  categories: PropTypes.array,
  duration: PropTypes.object,
  shows: PropTypes.object,
  notice: PropTypes.string,
  creation: PropTypes.string,
  exclude: PropTypes.array,
  className: PropTypes.string,
}

export default SpectacleTags;
