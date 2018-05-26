import React from "react";
import Helmet from "react-helmet";

import SEO from "../components/seo";
import Shows from "../functions/shows";
import SpectacleHeaderList from "../components/spectacle/spectacleHeaderList";
import SpectaclePosterNav from "../components/spectacle/spectaclePosterNav";
import Pellicule from "../components/pellicule/pellicule";


export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.siteMetadata = props.data.site.siteMetadata;

    this.spectacles = Shows.getSortedSpectacles(props.data.spectacles);

    this.goToNextSlide = this.goToNextSlide.bind(this);
    this.goToPrevSlide = this.goToPrevSlide.bind(this);
    this.goToSlide = this.goToSlide.bind(this);
    this.onClickVideo = this.onClickVideo.bind(this);
    this.closePellicule = this.closePellicule.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

    this.state = {
      activeIndex: 0,
      slideDirection: '',
      pellicule: null
    };
  }

  componentDidMount() {
    if (this.spectacles.length > 1) {
      document.addEventListener('keydown', this.onKeyDown);
    }
  }

  onKeyDown(e) {
    if (this.spectacles.length > 1) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.goToPrevSlide();
      }
      else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.goToNextSlide();
      }
    }
  }

  goToNextSlide() {
    this.goToSlide(this.state.activeIndex + 1, 'next');
  }

  goToPrevSlide() {
    this.goToSlide(this.state.activeIndex - 1, 'prev');
  }

  goToSlide(activeIndex, direction) {
    if (activeIndex === -1) {
      activeIndex = this.spectacles.length - 1;
    }
    else if (activeIndex === this.spectacles.length) {
      activeIndex = 0;
    }
    this.setState({
      slideDirection: direction,
      activeIndex: activeIndex,
    });
  }

  onClickVideo(video, location, spectacle) {
    this.setState({ pellicule:
      {
        type: 'video',
        location: location,
        video: video
      }
    });
    history.pushState(
      { url: location + '#bande-annonce'},
      this.siteMetadata.title + ' ' + this.siteMetadata.titleSeparator + ' Bande-annonce de ' + spectacle,
      location + '#bande-annonce'
    );
  }

  closePellicule() {
    this.setState({ pellicule: null });
    history.back();
  }

  render() {
    const hasPellicule = this.state.pellicule != null;

    return(
      <React.Fragment>
        <Helmet>
          <title>{this.siteMetadata.title}</title>
        </Helmet>
        <SEO
          title={this.siteMetadata.title}
          slug={this.siteMetadata.siteUrl}
          description={this.siteMetadata.description}
          image={this.siteMetadata.images.logo}
          siteMetadata={this.siteMetadata}
          jsonType="website"
          jsonData={this.siteMetadata}
        />
        {hasPellicule ? (
          <Pellicule
            content={this.state.pellicule}
            onClose={this.closePellicule}
            siteMetadata={this.siteMetadata}
          />
        )
        : null }
        <SpectaclePosterNav
          thumbs={this.spectacles}
          activeIndex={this.state.activeIndex}
          direction={this.state.slideDirection}
          goToNext={this.goToNextSlide}
          goToPrev={this.goToPrevSlide}
        />
        <SpectacleHeaderList
          spectacles={this.spectacles}
          activeIndex={this.state.activeIndex}
          onClickVideo={this.onClickVideo}
        />
      </React.Fragment>
    )
  }
}

export const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        titleSeparator
        siteUrl
        description
        contact {
          email
          landline
          portable
          socialUsername
        }
        images {
          inside
          outside
          logo
        }
        address {
          street
          postalCode
          city
          country
          latitude
          longitude
        }
      }
    }
    spectacles: allMarkdownRemark(
  		filter: {frontmatter: {
        layout: {eq: "spectacle"}
      }}
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            subtitle
            duration {
              time
              intermission
            }
            notice
            categories
            shows {
              customdate
              preview
              dates {
                days
                time
              }
              reservation
            }
            poster {
              full: childImageSharp {
                sizes(maxHeight: 400, maxWidth: 283) {
                  ...GatsbyImageSharpSizes_withWebp
                }
              }
            }
            image {
              full: childImageSharp {
                sizes(maxWidth: 1920) {
                  ...GatsbyImageSharpSizes_withWebp
                }
              }
            }
            trailer
            overview
          }
        }
      }
    }
  }
`
