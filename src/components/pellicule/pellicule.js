import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import theme from "../../theme";
import ControlsTop from "./controls";
import Content from "./content";
import SharePopup from "../sharePopup";


const PelliculeContainer = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
  background-color: ${theme.color.dark};
`

class Pellicule extends React.Component {
  constructor(props) {
    super(props);

    this.closeMe = this.closeMe.bind(this);
    this.toggleExtras = this.toggleExtras.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.onFullscreenChange = this.onFullscreenChange.bind(this);
    this.onClickShare = this.onClickShare.bind(this);
    this.closeShare = this.closeShare.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

    this.state = {
      showExtras: true,
      isFullscreen: false,
      share: null,
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);

    document.addEventListener("fullscreenchange", this.onFullscreenChange);
    document.addEventListener("mozfullscreenchange", this.onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", this.onFullscreenChange);
    document.addEventListener("msfullscreenchange", this.onFullscreenChange);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);

    document.removeEventListener("fullscreenchange", this.onFullscreenChange);
    document.removeEventListener("mozfullscreenchange", this.onFullscreenChange);
    document.removeEventListener("webkitfullscreenchange", this.onFullscreenChange);
    document.removeEventListener("msfullscreenchange", this.onFullscreenChange);
  }

  closeMe() {
    this.props.onClose();
  }

  toggleExtras() {
    if (this.state.showExtras) {
      this.setState({ showExtras: false });
    }
    else {
      this.setState({ showExtras: true });
    }
  }

  onFullscreenChange() {
    if (document.fullscreenElement || document.mozFullScreenElement ||
      document.webkitFullscreenElement || document.msFullscreenElement) {
        this.setState({ isFullscreen: true });
    }
    else {
      this.setState({ isFullscreen: false });
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
      !document.webkitFullscreenElement && !document.msFullscreenElement) {
      if (ReactDOM.findDOMNode(this).requestFullscreen) {
        ReactDOM.findDOMNode(this).requestFullscreen();
      } else if (ReactDOM.findDOMNode(this).msRequestFullscreen) {
        ReactDOM.findDOMNode(this).msRequestFullscreen();
      } else if (ReactDOM.findDOMNode(this).mozRequestFullScreen) {
        ReactDOM.findDOMNode(this).mozRequestFullScreen();
      } else if (ReactDOM.findDOMNode(this).webkitRequestFullscreen) {
        ReactDOM.findDOMNode(this).webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  onKeyDown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      this.props.onClose();
    }
    else if (this.props.content.type === 'gallery' && e.key === 'Enter') {
      e.preventDefault();
      this.toggleExtras();
    }
  }

  onClickShare() {
    const share = {title: '', url: ''};
    const prefix = this.props.siteMetadata.title + this.props.siteMetadata.titleSeparator;
    if (this.props.content.type === 'image') {
      share.title = prefix + 'Poster de ' + this.props.content.title;
      share.url = document.location.origin + this.props.content.image.full.sizes.src;
    }
    else if (this.props.content.type === 'video') {
      share.title = prefix + 'Bande-annonce de ' + this.props.content.title;
      share.url = this.props.content.video;
    }
    else if (this.props.content.type === 'gallery') {
      const image = this.props.content.gallery[this.props.activeIndex];
      share.title = prefix + image.title;
      share.url = document.location.origin + image.url.full.sizes.src;
    }
    if (navigator.share) {
      navigator.share(share)
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }
    else if (navigator.clipboard) {
      navigator.clipboard.writeText(share.url)
        .then(() =>
          console.log('Copying to clipboard successful'),
          this.setState({
            notification: 'Le lien a été copié dans le presse-papier',
          }),
          setTimeout(function(){
            this.setState({
              notification: null,
            })
          }.bind(this), 3000),
        )
        .catch((error) => console.error('Could not copy text: ', err));
    }
    else {
      this.setState({
        share: {
          url: share.url,
        }
      })
    }
  }

  closeShare() {
    this.setState({
      share: null,
    })
  }

  render() {
    return (
      <PelliculeContainer
        aria-modal="true"
        open
        aria-live="polite"
      >
        {this.state.share ?
            this.props.content.type == 'image' ? (
              <SharePopup
                onClickClose={this.closeShare}
                text="Lien pour partager cette affiche :"
                url={this.state.share.url}
              />
            )
            : this.props.content.type == 'video' ? (
              <SharePopup
                onClickClose={this.closeShare}
                text="Lien pour partager cette bande-annonce :"
                url={this.state.share.url}
              />
            )
            : this.props.content.type == 'gallery' ? (
              <SharePopup
                onClickClose={this.closeShare}
                text="Lien pour partager cette photographie :"
                url={this.state.share.url}
              />
            )
            : null
        : null }
        <ControlsTop
          visible={this.state.showExtras}
          onClickClose={this.closeMe}
          onClickFullscreen={this.toggleFullscreen}
          onClickShare={this.onClickShare}
          isFullscreen={this.state.isFullscreen}
        />
        <Content
          content={this.props.content}
          showExtras={this.state.showExtras}
          onClickHandle={this.toggleExtras}
          isFullscreen={this.state.isFullscreen}
          goToNext={this.props.goToNext}
          goToPrev={this.props.goToPrev}
          activeIndex={this.props.activeIndex}
        />
      </PelliculeContainer>
    );
  }
}

Pellicule.propTypes = {
  content: PropTypes.object.isRequired,
  siteMetadata: PropTypes.object.isRequired,
  activeIndex: PropTypes.number,
  goToNext: PropTypes.func,
  goToPrev: PropTypes.func,
}

export default Pellicule;
