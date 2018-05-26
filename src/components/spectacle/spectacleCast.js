import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import nl2br from "react-nl2br";

import theme from "../../theme";


const CastContainer = styled.ul`
  text-align: center;
  margin: 0 !important;

  ${theme.media.desktop} {
    column-count: 2;
  }
`;

const CastItem = styled.li`
  list-style: none;
  margin-bottom: .5rem;
  column-span: none;
`;

const CastRole = styled.h1`
  margin: 0;
  font-size: 1rem;
`;

const CastNames = styled.p`
  margin: 0;
  text-indent: 0 !important;
`;

class SpectacleCast extends React.Component {
  render() {
    return (
      <CastContainer
        className={this.props.className}
      >
        {this.props.members.map((member, index) => (
          <CastItem key={index}>
            <CastRole>{member.role}</CastRole>
            <CastNames>{nl2br(member.names)}</CastNames>
          </CastItem>
        ))}
      </CastContainer>
    );
  }
}

SpectacleCast.propTypes = {
  members: PropTypes.array.isRequired,
  className: PropTypes.string,
}

export default SpectacleCast;
