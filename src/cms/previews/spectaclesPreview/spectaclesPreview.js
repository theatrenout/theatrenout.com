import React from "react";
import remark from "remark";
import reactRenderer from "remark-react";

import SpectacleHeader from "./spectacleHeader";
import SpectaclePoster from "./spectaclePoster";
import SpectacleIntro from "./spectacleIntro";
import SpectacleCast from "./spectacleCast";
import SpectacleReviews from "./spectacleReviews";
import Comments from "../comments";
import StyledSection, { SectionTitle } from "../styledSection";
import Pellicule from "../pellicule";


const PageContainer = props =>
  <div className="page-container">
    {props.children}
  </div>

const GalleryPlaceholder = props =>
  <div className="gallery-placeholder">
    {props.children}
  </div>

export class SpectaclesPreview extends React.Component {
  constructor(props) {
    super(props);

    const data = this.props.entry.get("data").toObject();

    // Shows
    let shows = null;
    if (data.shows) {
      shows = data.shows.toObject();
      if (shows.dates) {
        const dates = shows.dates.toArray().map(function(date) {
          return {
            time: date.toObject().time,
            days: date.toObject().days.toArray()
          }
        });
        shows.dates = dates;
      }
    }

    // Comments
    let comments = null;
    if (data.comments) {
      comments = data.comments.toArray().map(function(comment) {
        return {
          author: comment.toObject().author,
          text: comment.toObject().text
        }
      });
    }

    // Cast
    let cast = null;
    if (data.cast) {
      cast = data.cast.toObject();
      if (cast.members) {
        const members = cast.members.toArray().map(function(member) {
          return {
            role: member.toObject().role,
            names: member.toObject().names
          }
        })
        cast.background = this.getRawPath(cast.background);
        cast.members = members;
      }
    }

    // Press
    let press = null;
    if (data.press) {
      press = data.press.toObject();
      if (press.reviews) {
        const reviews = press.reviews.toArray().map(function(member) {
          return {
            text: member.toObject().text,
            author: member.toObject().author
          }
        })
        press.background = this.getRawPath(press.background);
        press.reviews = reviews;
      }
    }

    // Play
    let play = null;
    if (data.play) {
      play = data.play.toObject();
      play.background = this.getRawPath(play.background);
    }

    // Intent
    let intent = null;
    if (data.intent) {
      intent = data.intent.toObject();
      intent.background = this.getRawPath(intent.background);
    }

    // Duration
    let duration = null;
    if (data.duration) {
      duration = data.duration.toObject();
    }

    // Categories
    let categories = null;
    if (data.categories) {
      categories = data.categories.toArray();
    }

    this.spectacle = {
      title: data.title,
      subtitle: data.subtitle,
      creation: data.creation,
      duration: duration,
      notice: data.notice,
      categories: categories,
      shows: shows,
      poster: this.getRawPath(data.poster),
      image: this.getRawPath(data.image),
      trailer: data.trailer,
      overview: data.overview,
      comments: comments,
      cast: cast,
      play: play,
      intent: intent,
      press: press,
    };

    this.onClickVideo = this.onClickVideo.bind(this);
    this.closePellicule = this.closePellicule.bind(this);

    this.state = {
      pellicule: null
    }
  }

  getRawPath(image) {
    const rawMediaPath = "https://raw.githubusercontent.com/zecakeh/tn-test/master/content/images/"
    if (image) {
      const pathArray = image.split('/');
      const filename = pathArray[pathArray.length -1];
      const rawValue = rawMediaPath + filename;
      return rawValue;
    }
  }

  onClickVideo(video) {
    this.setState({ pellicule:
      {
        type: 'video',
        video: video
      }
    });
  }

  closePellicule() {
    this.setState({ pellicule: null });
  }

  render() {
    const hasPellicule = this.state.pellicule != null;
    const hasCast = this.spectacle.cast != null;
    const hasPlay = this.spectacle.play != null;
    const hasIntent = this.spectacle.intent != null;
    const hasPress = this.spectacle.press != null;
    const hasMore = hasCast || hasPlay || hasIntent || hasPress;

    return(
      <PageContainer>
        {hasPellicule ? (
          <Pellicule
            content={this.state.pellicule}
            closeHandle={this.closePellicule}
          />
        )
        : null }
        <SpectacleHeader background={this.spectacle.image}>
          <SpectaclePoster
            img={this.spectacle.poster}
            alt={this.spectacle.title}
          />
          <SpectacleIntro
            title={this.spectacle.title}
            subtitle={this.spectacle.subtitle}
            categories={this.spectacle.categories}
            duration={this.spectacle.duration}
            intermission={this.spectacle.intermission}
            creation={this.spectacle.creation}
            shows={this.spectacle.shows}
            notice={this.spectacle.notice}
            overview={this.spectacle.overview}
            hasGallery={true}
            video={this.spectacle.trailer}
            onClickVideoHandle={this.onClickVideo}
            url={hasMore ? '#en-savoir-plus' : ''}
          />
          <Comments comments={this.spectacle.comments} />
        </SpectacleHeader>
        <GalleryPlaceholder>
          <h1>La galerie sera ici</h1>
        </GalleryPlaceholder>
        {hasCast ? (
          <StyledSection>
            <SectionTitle>Équipe</SectionTitle>
            <SpectacleCast
              members={this.spectacle.cast.members}
            />
          </StyledSection>
        )
        : null }
        {hasPlay ? (
          <StyledSection>
            <SectionTitle>À propos de l'œuvre</SectionTitle>
            <div>{remark().use(reactRenderer).processSync(this.spectacle.play.text).contents}</div>
          </StyledSection>
        )
        : null }
        {hasIntent ? (
          <StyledSection>
            <SectionTitle>Intentions de mise en scène</SectionTitle>
            <div>{remark().use(reactRenderer).processSync(this.spectacle.intent.text).contents}</div>
          </StyledSection>
        )
        : null }
        {hasPress ? (
          <StyledSection>
            <SectionTitle>Avis de la presse</SectionTitle>
            <SpectacleReviews
              reviews={this.spectacle.press.reviews}
            />
          </StyledSection>
        )
        : null }
      </PageContainer>
    )
  }
}
