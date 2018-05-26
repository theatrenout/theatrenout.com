import React from "react";
import nl2br from "react-nl2br";


const CastContainer = props =>
  <ul className="cast-container">
    {props.children}
  </ul>

const CastItem = props =>
  <li className="cast-item">
    {props.children}
  </li>

const CastRole = props =>
  <h1 className="cast-role">
    {props.children}
  </h1>

const CastNames = props =>
  <p className="cast-names">
    {props.children}
  </p>

export default class SpectacleCast extends React.Component {
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
