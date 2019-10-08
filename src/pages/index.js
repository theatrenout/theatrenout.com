import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import styled from "styled-components";
import nl2br from "react-nl2br";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Shows from "../functions/shows";
import SpectacleHeaderList from "../components/spectacle/spectacleHeaderList";
import SpectaclePosterNav from "../components/spectacle/spectaclePosterNav";
import Pellicule from "../components/pellicule/pellicule";
import { PageInfo, PageTitle, PageOverview, PageSeparator } from "../components/page/page";
import PageHeader from "../components/page/pageHeader";


const FallbackContainer = styled(PageHeader).attrs({
  tag: 'article',
})`
  padding-bottom: 0;
`

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.siteMetadata = props.data.site.siteMetadata;

    this.spectacles = Shows.getSortedSpectacles(props.data.spectacles);
    this.page = props.data.page.frontmatter;

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
    window.history.pushState(
      { url: location + '#bande-annonce'},
      this.siteMetadata.title + ' ' + this.siteMetadata.titleSeparator + ' Bande-annonce de ' + spectacle,
      location + '#bande-annonce'
    );
  }

  closePellicule() {
    this.setState({ pellicule: null });
    window.history.back();
  }

  render() {
    const hasSpectacle = this.spectacles.length >= 1;
    let pellicule;

    if (this.state.pellicule != null) {
      pellicule = <Pellicule content={this.state.pellicule} onClose={this.closePellicule} siteMetadata={this.siteMetadata} />;
    } else {
      pellicule = null;
    }

    return(
      <Layout>
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
        {hasSpectacle ? (
          <>
            {pellicule}
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
          </>
        )
        : (
          <FallbackContainer
            background={this.page.image}
          >
            <PageInfo>
              <PageTitle>{this.page.title}</PageTitle>
              <PageSeparator />
              <PageOverview>{nl2br(this.page.overview)}</PageOverview>
            </PageInfo>
          </FallbackContainer>
        )}
      </Layout>
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
          portable
          socialUsername
        }
        images {
          inside
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
    page: markdownRemark(
      fields: { slug: { eq: "/" } }
      frontmatter: { layout: { eq: "page" } }
    ) {
      fields {
        slug
      }
      frontmatter {
        title
        image {
          full: childImageSharp {
            fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        overview
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
                fluid(maxHeight: 400, maxWidth: 283) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            image {
              full: childImageSharp {
                fluid(maxWidth: 1920) {
                  ...GatsbyImageSharpFluid
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
