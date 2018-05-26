import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import nl2br from "react-nl2br";

import theme from "../../theme";
import SpectaclePoster from "./spectaclePoster";
import SpectacleTags from "./spectacleTags";
import Ctrl from "../ctrl";
import Navigation from "../navigation";


const ListeContainer = styled.ul`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 !important;
  flex-wrap: wrap;
`

const Spectacle = styled.li`
  flex: 0 0 auto;
  margin: .1rem;
  height: 42.429vw;
  width: 30vw;
  list-style: none;

  ${theme.media.desktop} {
    margin: .3rem;
    height: 20vh;
    width: 14.1413vh;
  }
`

const Poster = styled(SpectaclePoster).attrs({
  type: 'ctrl',
  role: 'checkbox',
})`
  position: relative;
  width: 100%;
  height: 100%;
  padding: .5rem;
  background-color: transparent;
  transition: all .5s;

  ${props => props.active ? `
    z-index: 50;
    background-color: ${theme.color.primary};

    &:hover {
      transform: none;
    }
  `
  : ''}
`

const Details = styled.div`
  position: absolute;
  left: 0;
  margin-top: -1rem;
  width: 100%;
  border-radius: .5rem;
  border: 2px solid ${theme.color.primary};
  top: ${props => props.visible ? 'auto' : '0'};
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  z-index: ${props => props.visible ? '40' : '-10'};
  background-color: ${theme.color.lighter};
`

const Close = styled(Ctrl).attrs({
  type: 'close',
  alt: 'Fermer',
})`
  position: absolute;
  right: 0;
  top: 0;
  color: ${theme.color.lighter};
  display: none;

  ${theme.media.desktop} {
    display: block;
  }

  & svg {
    height: 1.5rem;
  }
`

const DetailsHeader = styled.header`
  background-color: ${theme.color.primary};
  padding: .5rem;
  min-height: 48px;
  text-align: center;
`

const DetailsTitle = styled.h1`
  color: ${theme.color.lighter};
  margin: 0 1rem 0 0 !important;
`

const DetailsSubtitle = styled.h2`
  font-family: ${theme.font.secondaryAll};
  font-weight: bold;
  color: ${theme.color.light};
  font-size: .9rem !important;
  margin: .2rem 0 0 !important;
`

const DetailsContent = styled.div`
  padding: .5rem;
`

const DetailsTags = styled(SpectacleTags)`
  margin: 0 !important;
  color: ${theme.color.lighter};
`

const DetailsOverview = styled.p`
  margin-top: .5rem !important;
  text-indent: 0 ! important;
  font-size: .9rem;
  text-align: center;
`

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: .5rem 0;
`

const More = styled(Navigation).attrs({
  type: 'link',
})`
  margin: 0!important;
  font-family: ${theme.font.secondaryAll} !important;
  display: inline-block !important;
  box-sizing: border-box;
`


class SpectacleListe extends React.Component {
  constructor(props) {
    super(props);

    this.onClickPoster = this.onClickPoster.bind(this);
    this.onClickClose = this.onClickClose.bind(this);

    this.state = {
      activeSpectacle: null,
    };
  }

  getSpectacleByPoster(spectacles, image) {
    const spectacle = spectacles.find(function(spectacle) {
      return spectacle.poster == image.url;
    })
    return spectacle;
  }

  onClickPoster(image) {
    const spectacle = this.getSpectacleByPoster(this.props.spectacles, image);
    if (this.state.activeSpectacle) {
      const details = document.getElementById('details-'+this.state.activeSpectacle.slice(1,-1));
      details.parentNode.style.marginBottom = '';
    }
    if (spectacle && this.state.activeSpectacle !== spectacle.slug) {
      this.setState({
        activeSpectacle: spectacle.slug,
      });

      const details = document.getElementById('details-'+spectacle.slug.slice(1,-1));
      details.parentNode.style.marginBottom = details.clientHeight + 'px';
    }
    else if (spectacle) {
      this.setState({
        activeSpectacle: null,
      });
    }
  }

  onClickClose() {
    if (this.state.activeSpectacle) {
      const details = document.getElementById('details-'+this.state.activeSpectacle.slice(1,-1));
      details.parentNode.style.marginBottom = '';
      this.setState({
        activeSpectacle: null,
      })
    }
  }

  render() {
    const onClickPoster = this.onClickPoster;
    const onClickClose = this.onClickClose;
    const activeSpectacle = this.state.activeSpectacle;

    return (
      <ListeContainer
        aria-live="polite"
      >
        {this.props.spectacles.map(spectacle => (
          <Spectacle
            key={spectacle.slug}
          >
            <Poster
              id={'poster-' + spectacle.slug.slice(1,-1)}
              img={spectacle.poster}
              alt={spectacle.title}
              link="#"
              onClickHandle={onClickPoster}
              aria-controls={'details-' + spectacle.slug.slice(1,-1)}
              aria-checked={spectacle.slug == activeSpectacle ? 'true' : 'false'}
              active={spectacle.slug == activeSpectacle}
            />
            <Details
              id={'details-' + spectacle.slug.slice(1,-1)}
              visible={spectacle.slug == activeSpectacle}
              aria-hidden={spectacle.slug == activeSpectacle ? 'false' : 'true'}
            >
              <DetailsHeader>
                <Close
                  onClickHandle={onClickClose}
                  aria-controls={'details-' + spectacle.slug.slice(1,-1)}
                />
                <DetailsTitle>{spectacle.title}</DetailsTitle>
                { spectacle.subtitle && spectacle.subtitle.length > 0 ? (
                  <DetailsSubtitle>{spectacle.subtitle}</DetailsSubtitle>
                )
                : null }
              </DetailsHeader>
              <DetailsContent>
                <DetailsTags
                  duration={spectacle.duration}
                  creation={spectacle.creation}
                  categories={spectacle.categories}
                  notice={spectacle.notice}
                  exclude={['status']}
                />
                <DetailsOverview>{nl2br(spectacle.overview)}</DetailsOverview>
                <NavContainer>
                  <More
                    to={spectacle.slug}
                    icon="info"
                  >
                    En savoir plus
                  </More>
                </NavContainer>
              </DetailsContent>
            </Details>
          </Spectacle>
        ),this)}
      </ListeContainer>
    );
  }
}

SpectacleListe.propTypes = {
  spectacles: PropTypes.array.isRequired,
}

export default SpectacleListe;
