import React from "react";


const NavList = props =>
  <ul className="nav-list">
    {props.children}
  </ul>

const NavItem = props =>
  <li className="nav-item">
    {props.children}
  </li>

const Reservation = props =>
  <NavItem className="nav-item nav-reservation">
    {props.children}
  </NavItem>

const NavLink = props =>
  <a className="nav-link" {...props}>
    {props.children}
  </a>

const NavA = props =>
  <NavLink className="nav-link nav-a" {...props}>
    {props.children}
  </NavLink>

export default class SpectacleNav extends React.Component {
  constructor(props) {
    super(props);

    this.onClickVideo = this.onClickVideo.bind(this);
  }

  onClickVideo (e) {
    e.preventDefault();
    this.props.onClickVideoHandle(this.props.video);
  }

  onClick(e) {
    e.preventDefault();
  }

  render() {
    const hasReservation = this.props.reservation != null && this.props.reservation.length > 0;
    const hasVideo = this.props.video != null && this.props.video.length > 0;
    const hasGallery = this.props.hasGallery;
    const hasUrl = this.props.url != null && this.props.url.length > 0;

    if (hasReservation || hasVideo || hasGallery || hasUrl) {
      return (
        <NavList>
          {hasReservation ? (
            <Reservation>
              <NavA href={this.props.reservation} target="_blank">Réserver</NavA>
            </Reservation>
          )
          : null }
          {hasVideo ? (
            <NavItem>
              <NavLink
                href="#bande-annonce"
                onClick={this.onClickVideo}
              >
                Bande-annonce
              </NavLink>
            </NavItem>
          )
          : null }
          {hasGallery ? (
            <NavItem>
              <NavLink
                href="#"
                onClick={this.onClick}
              >
                Galerie
              </NavLink>
            </NavItem>
          )
          : null }
        </NavList>
      );
    }
    else {
      return null;
    }
  }
}
