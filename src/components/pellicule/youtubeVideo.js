import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";


const StyledYoutubeIframe = styled.iframe.attrs({
  frameBorder: 0,
  allow: 'autoplay; encrypted media',
  allowFullScreen: true,
})`
  width: 70vw;
  height: calc(70vw / (16 / 9));

  @media (orientation:portrait) {
    width: 90vw;
    height: calc(90vw / (16 / 9));
  }
`

class YoutubeVideo extends React.Component {
  parseVideoUrl(url) {
    let params = '';
    let videoId = '';
    let hasPlaylist = false;
    let playlistId = '';

    if (url.startsWith("https://youtu.be/"))
    {
      params = url.slice(17);

      const splitList = params.split("?list=");
      if (splitList.length > 1) {
        hasPlaylist = true;
        videoId = splitList[0];
        playlistId = splitList[1];
      }
      else {
        videoId = params;
      }
    }
    else if (url.startsWith("https://www.youtube.com/"))
    {
      params = url.slice(30);
      const videoMatch = params.match(/(v=)([\w-])+/g);
      if (videoMatch != null) {
        videoId = videoMatch[0].slice(2);
      }

      const listMatch = params.match(/(list=)([\w-])+/g);
      if (listMatch != null) {
        hasPlaylist = true;
        playlistId = listMatch[0].slice(5);
      }
    }

    return { videoId, hasPlaylist, playlistId };
  }

  render() {
    const { videoId, hasPlaylist, playlistId } = this.parseVideoUrl(this.props.url);

    if (hasPlaylist) {
      return (
        <StyledYoutubeIframe
          src={'https://www.youtube-nocookie.com/embed/' + videoId + '?list=' + playlistId + '&rel=0'}
          className={this.props.className}
        >
      </StyledYoutubeIframe>
      );
    }
    else {
      return (
        <StyledYoutubeIframe
          src={'https://www.youtube-nocookie.com/embed/' + videoId + '?rel=0'}
          className={this.props.className}
        />
      );
    }
  }
}

YoutubeVideo.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string.isRequired,
}

export default YoutubeVideo;
