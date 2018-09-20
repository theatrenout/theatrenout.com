import React from "react";
import PropTypes from "prop-types";

import { PageTitle, PageSubtitle, PageSeparator, PageOverview, PageInfo } from "../page/page";
import SpectacleNav from "./spectacleNav";
import Shows from "../../functions/shows";
import SpectacleShows from "./spectacleShows";
import SpectacleTags from "./spectacleTags";


class SpectacleIntro extends React.Component {
  render() {
    const hasCustomDate = this.props.shows && Shows.isCustomDate(this.props.shows.customdate);
    const hasUpcomingPreview = this.props.shows && Shows.hasUpcomingPreview(this.props.shows.preview);
    const hasUpcomingShows = this.props.shows && Shows.hasUpcomingShows(this.props.shows.dates);
    const hasShows = hasCustomDate || hasUpcomingShows || hasUpcomingPreview;
    const reservation = hasUpcomingShows ? this.props.shows.reservation : null;
    const isIndex = this.props.page && this.props.page === "index";
    const excludeTags = isIndex ? ['creation'] : [];

    return (
      <React.Fragment>
        <PageInfo>
          <PageTitle>{this.props.title}</PageTitle>
          <PageSubtitle>{this.props.subtitle}</PageSubtitle>
          <PageSeparator />
          {hasShows ? (
            <SpectacleShows
              shows={hasUpcomingShows ? this.props.shows.dates : null}
              customDate={hasCustomDate ? this.props.shows.customdate : null}
              preview={hasUpcomingPreview ? this.props.shows.preview : null}
            />
          )
          : null }
          <SpectacleTags
            shows={this.props.shows}
            duration={this.props.duration}
            creation={this.props.creation}
            categories={this.props.categories}
            notice={this.props.notice}
            exclude={excludeTags}
          />
          <PageOverview>{this.props.overview}</PageOverview>
        </PageInfo>
        <SpectacleNav
          reservation={reservation}
          video={this.props.video}
          onClickVideo={this.props.onClickVideo}
          onClickGallery={this.props.onClickGallery}
          hasGallery={!isIndex && this.props.hasGallery}
          url={isIndex ? this.props.url : null}
          location={this.props.url}
          title={this.props.title}
        />
      </React.Fragment>
    );
  }
}

SpectacleIntro.propTypes = {
  shows: PropTypes.object,
  video: PropTypes.string,
  onClickVideo: PropTypes.func,
  onClickGallery: PropTypes.func,
  hasGallery: PropTypes.bool.isRequired,
  url: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  overview: PropTypes.string.isRequired,
  creation: PropTypes.string,
  notice: PropTypes.string,
  duration: PropTypes.object,
  categories: PropTypes.array,
  page: PropTypes.string,
  className: PropTypes.string,
}

export default SpectacleIntro;
