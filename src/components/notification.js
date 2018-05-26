import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import nl2br from "react-nl2br";

import theme from "../theme";


const NotificationContainer = styled.blockquote`
  position: fixed;
  top: 2rem;
  margin: auto;
  padding: 1rem 2rem;
  background-color: ${theme.color.dark};
  color: ${theme.color.lighter};
  text-align: center;
  border-radius: .5rem;
  font-size: .8rem;

  z-index: 500;
`;

const NotificationText = styled.p`
  margin: 0;
  line-height: normal;
`

class Notification extends React.Component {
  render() {
    if(this.props.text && this.props.text.length > 0) {
      return (
        <NotificationContainer
          className={this.props.className}
        >
          <NotificationText>
            {nl2br(this.props.text)}
          </NotificationText>
        </NotificationContainer>
      )
    }
    else {
      return null;
    }
  }
}

Notification.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default Notification;
