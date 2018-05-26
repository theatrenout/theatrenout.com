import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import theme from "../../theme";
import PageHeader from "../page/pageHeader";
import SpectacleIntro from "./spectacleIntro";


const SpectaclesContainer = styled.div`
  position: relative;
  width: 100%;
  flex: 1 0 auto;
`

const IndexSpectacleHeader = styled(PageHeader).attrs({
  tag: 'article',
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding-top: calc( 3rem + 51vw);
  min-height: 100%;
  justify-content: flex-start;
  transition: all .5s;
  opacity: ${props => props.visible ? '1' : '0'};
  z-index: ${props => props.visible ? '1' : '0'};

  ${theme.media.desktop} {
    padding-top: calc(41vh + 4.5rem);
  }
`

class SpectacleHeaderList extends React.Component {
  constructor(props) {
    super(props);

    this.spectacles = [];
    this.spectaclesList = null;
  }

  componentDidMount() {
    let maxHeight = 0;
    if (this.spectacles.length > 0) {
      for (let i = 0; i < this.spectacles.length; i++) {
        const spectacleHeight = ReactDOM.findDOMNode(this.spectacles[i]).clientHeight;
        if (spectacleHeight > maxHeight){
          maxHeight = spectacleHeight;
        }
      }
      if (maxHeight != 0) {
        const spectaclesList = ReactDOM.findDOMNode(this.spectaclesList);
        spectaclesList.style.minHeight = maxHeight + 'px';
      }
    }
  }

  render() {
    const activeIndex = this.props.activeIndex;
    const onClickVideo = this.props.onClickVideo;

    return (
      <SpectaclesContainer ref={div => this.spectaclesList = div}>
        {this.props.spectacles.map((spectacle, index) => (
          <IndexSpectacleHeader
            key={spectacle.slug}
            background={spectacle.image}
            visible={index == activeIndex}
            ref={div => this.spectacles[index] = div}
          >
            <SpectacleIntro
              title={spectacle.title}
              subtitle={spectacle.subtitle}
              duration={spectacle.duration}
              intermission={spectacle.intermission}
              creation={spectacle.creation}
              categories={spectacle.categories}
              shows={spectacle.shows}
              notice={spectacle.notice}
              overview={spectacle.overview}
              video={spectacle.trailer}
              onClickVideo={onClickVideo}
              hasGallery={false}
              url={spectacle.slug}
              page='index'
            />
          </IndexSpectacleHeader>
        ))}
      </SpectaclesContainer>
    )
  }
}

SpectacleHeaderList.propTypes = {
  spectacles: PropTypes.array.isRequired,
  activeIndex: PropTypes.number.isRequired,
  onClickVideo: PropTypes.func.isRequired,
}

export default SpectacleHeaderList;
