import React from "react";

import SpectacleNav from "./spectacleNav";
import Shows from "../../../functions/shows";
import SpectacleShows from "./spectacleShows";

const IntroContainer = props =>
  <div className="intro-container">
    {props.children}
  </div>

const Title = props =>
  <h1 className="intro-title">
    {props.children}
  </h1>

const Subtitle = props =>
  <h2 className="intro-subtitle">
    {props.children}
  </h2>

const Separator = props =>
  <div className="intro-separator" />

const TagsList = props =>
  <ul className="intro-tagslist">
    {props.children}
  </ul>

const TagsItem = props =>
  <li
    className="intro-tagsitem"
    style={{backgroundColor: props.color}}
  >
    {props.children}
  </li>

const Overview = props =>
  <p className="intro-overview">
    {props.children}
  </p>

  export default class SpectacleIntro extends React.Component {
    constructor(props) {
      super(props);

      this.isIndex = props.page != null && props.page === 'index';

      this.getTags = this.getTags.bind(this);
    }

    getTags() {
      let tags = [];
      if (this.props.shows) {
        const status = Shows.getStatus(this.props.shows.dates, this.props.shows.customdate);
        if (status != null) {
          if (status === 'now') {
            tags.push({icon: null, color: 'green', text: 'En ce moment'});
          }
          else if (status === 'soon') {
            tags.push({icon: null, color: 'orangered', text: 'Bientôt'});
          }
        }
      }
      if (this.props.categories) {
        tags = tags.concat(this.props.categories.map(this.mapCategoriesIcons));
      }
      if (this.props.duration && this.props.duration.time) {
        var durationString = '';
        let durationArray = this.props.duration.time.split(':');
        let hours = parseInt(durationArray[0]).toString();
        let minutes = parseInt(durationArray[1]).toString();
        if (hours > 0) {
          if (hours === 1) {
            durationString = '1 heure';
          }
          else {
            durationString = hours + ' heures';
          }
          if (minutes > 0) {
            durationString += ' et ';
          }
        }
        if (minutes > 0) {
          if (minutes === 1) {
            durationString += '1 minute';
          }
          else {
            durationString += minutes + ' minutes';
          }
        }
        if (this.props.duration.intermission) {
          durationString += ' avec entracte';
        }
        tags.push({icon: 'clock', color: null, text: "Durée : " + durationString});
      }
      if (!this.isIndex && this.props.creation) {
        let creation = new Date(this.props.creation);
        tags.push({icon: null, color: null, text: "Créé en " +  Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long' }).format(creation)});
      }
      if (this.props.notice) {
        tags.push({icon: 'warning', color: 'red', text: this.props.notice});
      }
      return tags;
    }

    mapCategoriesIcons(category) {
      if (category === 'Troupe') {
        return {icon: 'star', color: '#e8af0c', text: category};
      }
      else {
        return {icon: null, color: null, text: category};
      }
    }

    render() {
      const hasCustomDate = this.props.shows && Shows.isCustomDate(this.props.shows.customdate);
      const hasUpcomingShows = this.props.shows && Shows.hasUpcomingShows(this.props.shows.dates);
      const hasShows = hasCustomDate || hasUpcomingShows;
      const reservation = hasUpcomingShows ? this.props.shows.reservation : null;
      const tags = this.getTags();

      return (
        <IntroContainer className={this.props.className}>
          <Title>{this.props.title}</Title>
          <Subtitle>{this.props.subtitle}</Subtitle>
          <Separator type="nout" />
          {hasShows ? (
            <SpectacleShows
              shows={hasUpcomingShows ? this.props.shows.dates : null}
              customDate={hasCustomDate ? this.props.shows.customdate : null}
            />
          )
          : null }
          <TagsList>
            {tags.map((tag) => (
              <TagsItem
                key={tag.text}
                color={tag.color}
              >
                {tag.text}
              </TagsItem>
            ))}
          </TagsList>
          <Overview>{this.props.overview}</Overview>
          <SpectacleNav
            reservation={reservation}
            video={this.props.video}
            hasGallery={!this.isIndex && this.props.hasGallery}
            title={this.props.title}
          />
        </IntroContainer>
      );
    }
  }
