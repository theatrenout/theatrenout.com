import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import theme from "../../theme";
import Spinner from "../styledComponents/spinner";


const PreloaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  background-color: rgba(0,0,0,${theme.opacity.transparent});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const PreloaderSpinner = styled(Spinner)`
  position: static;
  height: auto;
  width: auto;
  margin-bottom: 1rem;
`

const PreloaderText = styled.p`
  color: ${theme.color.lighter};
`

class Panorama extends React.Component {
  constructor(props) {
    super(props);

    this.sky = null;
    this.preloader = null;
  }

  componentDidMount() {
    require('aframe');
    ReactDOM.findDOMNode(this.sky).addEventListener('materialtextureloaded', function (event) {
      ReactDOM.findDOMNode(this.preloader).style.display = 'none';
    }.bind(this));
  }

  render() {
    const image = this.props.image;

    if (image) {
      return (
        <React.Fragment>
          <PreloaderContainer
            id="panorama-preloader"
            ref={preload => this.preloader = preload}
          >
            <PreloaderSpinner />
            <PreloaderText>Chargement en cours...</PreloaderText>
          </PreloaderContainer>
          <a-scene
            preloader="autoInject: false; clickToClose: false; autoClose: true; target: #preloader-modal; bar: #preloader-modal .progress-bar; label: #preloader-modal .progress-label; labelText: Chargement {0}%; slowLoad: true; debug: true; doneLabelText: Terminé ! Attachez vos ceintures...;">
          >
            <a-sky
              src={image}
              rotation="0 -90 0"
              ref={sky => this.sky = sky}
            />
          </a-scene>
        </React.Fragment>
      );
    }
    else {
      return null;
    }
  }
}

Panorama.propTypes = {
  image: PropTypes.string.isRequired,
}

export default Panorama;
