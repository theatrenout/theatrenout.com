import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import theme from "../../theme";
import Navigation from "../navigation";


const NavContainer = styled.nav`
  padding: 0;
  margin: 1rem 0 0;
  width: 90%;
`

const NavList = styled.ul`
  padding: 0;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const NavItem = styled.li`
  flex: 1 0 auto;
  list-style: none;
  margin: 0 .2rem;

  ${theme.media.desktop} {
    flex: 0 0 auto;
    margin: 0 .5rem;
  }
`

const Reservation = styled(NavItem)`
  flex: 1 0 100%;
  margin: 0 .5vw .3rem;

  ${theme.media.desktop} {
    flex: 0 0 auto;
    margin: 0 1vw;
  }
`

const NavLink = styled(Navigation).attrs({
  type: 'link',
})`
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`

const NavA = styled(NavLink).attrs({
  type: 'anchor',
})`
  color: ${theme.color.important};

  &:hover, &:active, &:focus {
    color: ${theme.color.lighter};
    background-color: ${theme.color.important};
  }
`

class SpectacleNav extends React.Component {
  constructor(props) {
    super(props);

    this.onClickVideo = this.onClickVideo.bind(this);
    this.onClickGallery = this.onClickGallery.bind(this);
  }

  onClickVideo (e) {
    e.preventDefault();
    this.props.onClickVideo(this.props.video, this.props.location, this.props.title);
  }

  onClickGallery (e) {
    e.preventDefault();
    this.props.onClickGallery(this.props.gallery, this.props.location, this.props.title);
  }

  render() {
    const hasReservation = this.props.reservation != null && this.props.reservation.length > 0;
    const hasVideo = this.props.video != null && this.props.video.length > 0;
    const hasGallery = this.props.hasGallery;
    const hasUrl = this.props.url != null && this.props.url.length > 0;

    if (hasReservation || hasVideo || hasGallery || hasUrl) {
      return (
        <NavContainer>
          <NavList
            role="menubar"
          >
            {hasReservation ? (
              <Reservation role="none">
                <NavA
                  href={this.props.reservation}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  icon="ticket"
                >
                  Réserver
                </NavA>
              </Reservation>
            )
            : null }
            {hasVideo ? (
              <NavItem role="none">
                <NavLink
                  to="#bande-annonce"
                  onClick={this.onClickVideo}
                  aria-haspopup="true"
                  role="menuitem"
                  icon="video"
                >
                  Bande-annonce
                </NavLink>
              </NavItem>
            )
            : null }
            {hasGallery ? (
              <NavItem role="none">
                <NavLink
                  to="#galerie"
                  onClick={this.onClickGallery}
                  aria-haspopup="true"
                  role="menuitem"
                  icon="photo"
                >
                  Galerie
                </NavLink>
              </NavItem>
            )
            : null }
            {hasUrl ? (
              <NavItem role="none">
                <NavLink
                  to={this.props.url}
                  role="menuitem"
                  icon="info"
                >
                  En savoir plus
                </NavLink>
              </NavItem>
            )
            : null }
          </NavList>
        </NavContainer>
      );
    }
    else {
      return null;
    }
  }
}

SpectacleNav.propTypes = {
  url: PropTypes.string,
  reservation: PropTypes.string,
  video: PropTypes.string,
  hasGallery: PropTypes.bool.isRequired,
  onClickVideo: PropTypes.func,
  onClickGallery: PropTypes.func,
}

export default SpectacleNav;
