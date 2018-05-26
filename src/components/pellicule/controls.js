import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import theme from "../../theme";
import Ctrl from "../ctrl";


const ControlsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  ${props => props.theme === 'full' ? '' : 'background-color: ' + theme.color.dark + ';'}
  z-index: ${props => props.visible ? '100' : '-1'};
  opacity: ${props => props.visible ? '1' : '0'};
  transition: opacity .5s;
`

const ControlsLeft = styled.div`
  display: flex;
`

const ControlsRight = styled.div`
  display: flex;
`

const Control = styled(Ctrl)`
  ${props => props.theme === 'full' && !props.isFullscreen ? `
    background-color: ${theme.color.lighter};
    color: ${theme.color.primary};
    margin: .5rem;
    border-radius: .2rem;
  `
  : '' }

  & svg {
    height: 1.5rem;
    width: 1.5rem;
  }
`

class ControlsTop extends React.Component {
  render() {
    return (
      <ControlsContainer
        visible={this.props.visible}
        className={this.props.className}
        role="menubar"
        aria-hidden={this.props.visible ? 'false' : 'true'}
        theme={this.props.theme}
      >
        <ControlsLeft>
          {this.props.theme !== 'full' ? (
            <Control
              type="back"
              alt="Retour"
              onClickHandle={this.props.onClickClose}
              role="menuitem"
            />
          )
          : null }
        </ControlsLeft>
        <ControlsRight>
          <Control
            type="share"
            alt="Partager"
            onClickHandle={this.props.onClickShare}
            role="menuitem"
            theme={this.props.theme}
            isFullscreen={this.props.isFullscreen}
          />
          {this.props.isFullscreen ? (
            <Control
              type="minimise"
              alt="Sortir du plein écran"
              onClickHandle={this.props.onClickFullscreen}
              role="menuitem"
              theme={this.props.theme}
              isFullscreen={this.props.isFullscreen}
            />
          )
          : (
            <Control
              type="maximise"
              alt="Afficher en plein écran"
              onClickHandle={this.props.onClickFullscreen}
              role="menuitem"
              theme={this.props.theme}
              isFullscreen={this.props.isFullscreen}
            />
          ) }
        </ControlsRight>
      </ControlsContainer>
    );
  }
}

ControlsTop.propTypes = {
  visible: PropTypes.bool.isRequired,
  className: PropTypes.string,
  theme: PropTypes.string,
  onClickFullscreen: PropTypes.func.isRequired,
  onClickShare: PropTypes.func.isRequired,
  onClickClose: PropTypes.func,
}

export default ControlsTop;
