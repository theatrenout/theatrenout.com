import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import theme from "../theme";
import ModalBackground from "./styledComponents/modalBackground";
import Ctrl from "./ctrl";


const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupWrapper = styled.dialog`
  max-height: 100%;
  max-width: 100%;
  width: 90vw;
  padding: .5rem;
  position: relative;
  background-color: ${theme.color.lighter};

  ${theme.media.desktop} {
    width: 70vw;
    padding: 2rem;
  }
`;

const CloseCtrl = styled(Ctrl)`
  position: absolute;
  top: 0;
  right: 0;
  color: ${theme.color.primary};

  & svg {
    height: 1.5rem;
  }
`

const StyledTitle = styled.label`
  display: block
  font-size: 1em;
  font-weight: bold;
  color: ${theme.color.primary};
  margin-bottom: .5rem;
  padding-right: 2rem; 
`;

const StyledInput = styled.input.attrs({
  type: 'text',
  name: 'url',
  readOnly: true,
})`
  color: ${theme.color.default};
  background-color: ${theme.color.light};
  width: 100%;
  border: none;
`;

class Popup extends React.Component {
  constructor(props) {
    super(props);

    this.input = null;
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);

    const input = ReactDOM.findDOMNode(this.input);
    input.focus();
    input.select();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  cancelClick(e) {
    e.preventDefault();
  }

  onKeyDown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      this.props.onClose();
    }
  }

  render() {
    return (
      <PopupWrapper
        id="partager"
        aria-modal="true"
        open
      >
        <CloseCtrl
          type='close'
          alt='Fermer'
          onClickHandle={this.props.onClickClose}
          aria-controls="partager"
        />
        <StyledTitle for='url'>{this.props.text}</StyledTitle>
        <StyledInput
          value={this.props.url}
          ref={(input) => this.input = input }
        />
      </PopupWrapper>
    );
  }
}

class SharePopup extends React.Component {
  render() {
    return (
      <PopupContainer>
        <ModalBackground
          clickable={true}
          visible={true}
          onClickHandle={this.props.onClickClose}
        />
        <Popup
          onClickClose={this.props.onClickClose}
          text={this.props.text}
          url={this.props.url}
        >
        </Popup>
      </PopupContainer>
    )
  }
}

SharePopup.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onClickClose: PropTypes.func.isRequired,
}

export default SharePopup;
