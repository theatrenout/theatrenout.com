import React from "react";
import ReactDOM from "react-dom";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import styled from "styled-components";

import theme from "../theme";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PageHeader from "../components/page/pageHeader";
import Content from "../components/pellicule/content";
import ControlsTop from "../components/pellicule/controls";
import SharePopup from "../components/sharePopup";
import Notification from "../components/notification";


const Container = styled(PageHeader).attrs({
  tag: 'article',
})`
  padding: 0;

  ${theme.media.desktop} {
    padding-top: calc(5vh + 3.5rem);
  }
`

const Gallery = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  width: 100%;
  ${props => props.isFullscreen ? `
    height: 100%;
    background-color: black
  `
  : ''}

  ${theme.media.desktop} {
    min-height: 0;
  }
`

const GalleryControlsBar = styled(ControlsTop)`
  position: ${props => props.isFullscreen ? 'absolute' : 'initial'};
  justify-content: ${props => props.isFullscreen ? 'flex-end' : 'center'};
`

const Photos = styled(Content)`
  flex: 1 0 auto;
  width: 100%;
  position: ${props => props.isFullscreen ? 'absolute' : 'relative'};
  ${props => props.isFullscreen ? 'height: 100%;' : ''}
`


export default class ExplorerPage extends React.Component {
  constructor(props) {
    super(props);

    this.siteMetadata = props.data.site.siteMetadata;
    this.page = props.data.page.frontmatter;
    this.page.slug = props.data.page.fields.slug;
    this.gallerySection = null;

    this.gallery = this.getRandomGallery(props.data.spectacleGalleries, props.data.pageGalleries);

    this.goToNext = this.goToNext.bind(this);
    this.goToPrev = this.goToPrev.bind(this);
    this.toggleExtras = this.toggleExtras.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.onFullscreenChange = this.onFullscreenChange.bind(this);
    this.onClickShare = this.onClickShare.bind(this);
    this.closeShare = this.closeShare.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

    this.state = {
      galleryIndex: 0,
      showExtras: true,
      isFullscreen: false,
      share: null,
      notification: null,
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);

    document.addEventListener("fullscreenchange", this.onFullscreenChange);
    document.addEventListener("mozfullscreenchange", this.onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", this.onFullscreenChange);
    document.addEventListener("msfullscreenchange", this.onFullscreenChange);
  }

  getRandomGallery(spectacleGalleries, pageGalleries) {
    let randomGallery = [];
    spectacleGalleries.edges.forEach(function(gallery) {
      const images = gallery.node.frontmatter.images;
      randomGallery = randomGallery.concat(images);
    });
    pageGalleries.edges.forEach(function(gallery) {
      const images = gallery.node.frontmatter.images;
      randomGallery = randomGallery.concat(images);
    });

    var currentIndex = randomGallery.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = randomGallery[currentIndex];
      randomGallery[currentIndex] = randomGallery[randomIndex];
      randomGallery[randomIndex] = temporaryValue;
    }

    return randomGallery;
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);

    document.removeEventListener("fullscreenchange", this.onFullscreenChange);
    document.removeEventListener("mozfullscreenchange", this.onFullscreenChange);
    document.removeEventListener("webkitfullscreenchange", this.onFullscreenChange);
    document.removeEventListener("msfullscreenchange", this.onFullscreenChange);
  }

  toggleExtras() {
    if (this.state.isFullscreen) {
      if (this.state.showExtras) {
        this.setState({ showExtras: false });
      }
      else {
        this.setState({ showExtras: true });
      }
    }
  }

  onFullscreenChange() {
    if (document.fullscreenElement || document.mozFullScreenElement ||
      document.webkitFullscreenElement || document.msFullscreenElement) {
        this.setState({ isFullscreen: true });
    }
    else {
      this.setState({ isFullscreen: false });
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
      !document.webkitFullscreenElement && !document.msFullscreenElement) {
      if (ReactDOM.findDOMNode(this.gallerySection).requestFullscreen) {
        ReactDOM.findDOMNode(this.gallerySection).requestFullscreen();
      } else if (ReactDOM.findDOMNode(this.gallerySection).msRequestFullscreen) {
        ReactDOM.findDOMNode(this.gallerySection).msRequestFullscreen();
      } else if (ReactDOM.findDOMNode(this.gallerySection).mozRequestFullScreen) {
        ReactDOM.findDOMNode(this.gallerySection).mozRequestFullScreen();
      } else if (ReactDOM.findDOMNode(this.gallerySection).webkitRequestFullscreen) {
        ReactDOM.findDOMNode(this.gallerySection).webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  onKeyDown(e) {
    if (e.key === 'Escape') {
      if (document.fullscreenElement || document.mozFullScreenElement ||
        document.webkitFullscreenElement || document.msFullscreenElement) {
          this.toggleFullScreen();
      }
    }
    else if (e.key === 'Enter') {
      e.preventDefault();
      this.toggleExtras();
    }
  }

  onClickShare() {
    const share = {title: '', url: ''};
    const prefix = this.siteMetadata.title + this.siteMetadata.titleSeparator;

    const image = this.gallery[this.state.galleryIndex];
    share.title = prefix + image.title;
    share.url = document.location.origin + image.url.full.fluid.src;

    if (navigator.share) {
      navigator.share(share)
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }
    else if (navigator.clipboard) {
      navigator.clipboard.writeText(share.url)
        .then(() =>
          console.log('Copying to clipboard successful'),
          this.setState({
            notification: 'Le lien a été copié dans le presse-papier',
          }),
          setTimeout(function(){
            this.setState({
              notification: null,
            })
          }.bind(this), 3000),
        )
        .catch((error) => console.error('Could not copy text: ', error));
    }
    else {
      this.setState({
        share: {
          url: share.url,
        }
      })
    }
  }

  closeShare() {
    this.setState({
      share: null,
    })
  }

  goToPrev() {
    let newIndex = this.gallery.length - 1;
    if (this.state.galleryIndex > 0) {
      newIndex = this.state.galleryIndex - 1;
    }
    this.setState({ galleryIndex: newIndex });
  }

  goToNext() {
    let newIndex = 0;
    if (this.state.galleryIndex < this.gallery.length - 1) {
      newIndex = this.state.galleryIndex + 1;
    }
    this.setState({ galleryIndex: newIndex });
  }

  render() {
    const pageTitle = this.siteMetadata.title + this.siteMetadata.titleSeparator + this.page.title;
    const content = {
      type: 'gallery',
      gallery: this.gallery,
    }

    return(
      <Layout>
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>
        <SEO
          title={this.page.title}
          slug={this.page.slug}
          description={this.page.overview}
          image={this.page.image.full.fluid.src}
          siteMetadata={this.siteMetadata}
        />
        {this.state.notification ? (
          <Notification
            text={this.state.notification}
          />
        )
        : null }
        {this.state.share ? (
          <SharePopup
            onClickClose={this.closeShare}
            text="Lien pour partager cette photographie :"
            url={this.state.share.url}
          />
        )
        : null }
        <Container
          background={this.page.image}
        >
          <Gallery
            isFullscreen={this.state.isFullscreen}
            aria-live="polite"
            ref={section => this.gallerySection = section}
          >
            <GalleryControlsBar
              visible={this.state.showExtras}
              onClickClose={this.closeMe}
              onClickFullscreen={this.toggleFullscreen}
              onClickShare={this.onClickShare}
              isFullscreen={this.state.isFullscreen}
              theme="full"
            />
          <Photos
              content={content}
              showExtras={this.state.showExtras}
              onClickHandle={this.toggleExtras}
              isFullscreen={this.state.isFullscreen}
              goToNext={this.goToNext}
              goToPrev={this.goToPrev}
              activeIndex={this.state.galleryIndex}
              theme="full"
            />
          </Gallery>
        </Container>
      </Layout>
    )
  }
}

export const query = graphql`
  query ExplorerQuery {
    site {
      siteMetadata {
        title
        titleSeparator
        siteUrl
        contact {
          socialUsername
        }
      }
    }
    page: markdownRemark(
      fields: { slug: { eq: "/explorer/" } }
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
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        overview
      }
    }
    spectacleGalleries: allMarkdownRemark(
      filter:{
        frontmatter: {
          layout: {eq: "gallery"}
        }
    	}
    )
    {
      edges {
        node {
          frontmatter {
            title
            images {
              title
              url {
                full: childImageSharp {
                  fluid(maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              quote
              description
              copyright
            }
          }
        }
      }
    }
    pageGalleries: allMarkdownRemark(
      filter:{
        frontmatter: {
          layout: {eq: "page-gallery"}
        }
    	}
    )
    {
      edges {
        node {
          frontmatter {
            title
            images {
              title
              url {
                full: childImageSharp {
                  fluid(maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              quote
              description
              copyright
            }
          }
        }
      }
    }
  }
`
