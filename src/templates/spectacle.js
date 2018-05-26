import React from "react";
import Helmet from "react-helmet";
import remark from "remark";
import reactRenderer from "remark-react";

import SEO from "../components/seo";
import { PageContainer } from "../components/page/page";
import PageHeader from "../components/page/pageHeader";
import SpectaclePoster from "../components/spectacle/spectaclePoster";
import SpectacleIntro from "../components/spectacle/spectacleIntro";
import SpectacleCast from "../components/spectacle/spectacleCast";
import SpectacleReviews from "../components/spectacle/spectacleReviews";
import Comments from "../components/comments";
import Gallery from "../components/gallery";
import StyledSection from "../components/styledComponents/styledSection";
import Pellicule from "../components/pellicule/pellicule";
import slugify from "../functions/slugify"


export default class SpectacleTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.spectacle = props.data.spectacle.frontmatter;
    this.spectacle.slug = props.data.spectacle.fields.slug;
    if (props.data.gallery) {
      this.gallery = props.data.gallery.frontmatter.images;
    }
    else {
      this.gallery = [];
    }

    this.siteMetadata = props.data.site.siteMetadata;
    this.page = {
      title: this.siteMetadata.title + this.siteMetadata.titleSeparator + this.spectacle.title,
      url: this.siteMetadata.siteUrl.slice(0,-1) + this.spectacle.slug,
    }

    this.findImageIndex = this.findImageIndex.bind(this);
    this.findImageBySlug = this.findImageBySlug.bind(this);
    this.goToNext = this.goToNext.bind(this);
    this.goToPrev = this.goToPrev.bind(this);
    this.onClickPoster = this.onClickPoster.bind(this);
    this.onClickVideo = this.onClickVideo.bind(this);
    this.onClickGallery = this.onClickGallery.bind(this);
    this.openPellicule = this.openPellicule.bind(this);
    this.closePellicule = this.closePellicule.bind(this);
    this.onHistoryChange = this.onHistoryChange.bind(this);
    this.updateHistory = this.updateHistory.bind(this);

    this.state = {
      pellicule: null,
      galleryIndex: 0,
    }
  }

  componentDidMount() {
    const hash = document.location.hash;
    if (hash === "#poster" && this.spectacle.poster) {
      this.openPellicule('image');
    }
    else if (hash === "#bande-annonce" && this.spectacle.trailer && this.spectacle.trailer.length > 0) {
      this.openPellicule('video');
    }
    else if (hash.startsWith("#galerie") && this.gallery && this.gallery.length > 0) {
      let image = null;
      if (hash.startsWith("#galerie&photo=")) {
        image = this.gallery.find(this.findImageBySlug);
      }
      this.openPellicule('gallery', image);
    }
    window.onpopstate = this.onHistoryChange;

    document.getElementById("gatsby-body").scrollTo(0,0);
  }

  findImageIndex(gallery, image) {
    let index = -1;
    for (let i = 0; i < gallery.length && index == -1; i++){
      if (gallery[i].url.full.sizes.src === image.url.full.sizes.src) {
        index = i;
      }
    }
    return index;
  }

  findImageBySlug(element) {
    const hashSlug = document.location.hash.slice(15);
    const elementSlug = slugify(element.title);
    return hashSlug === elementSlug;
  }

  goToPrev() {
    if (this.state.pellicule && this.state.pellicule.type === 'gallery' &&
      this.gallery.length > 1)
    {
      let newIndex = this.gallery.length - 1;
      if (this.state.galleryIndex > 0) {
        newIndex = this.state.galleryIndex - 1;
      }
      this.setState({ galleryIndex: newIndex });
      this.updateHistory(newIndex);
    }
  }

  goToNext() {
    if (this.state.pellicule && this.state.pellicule.type === 'gallery' &&
      this.gallery.length > 1)
    {
      let newIndex = 0;
      if (this.state.galleryIndex < this.gallery.length - 1) {
        newIndex = this.state.galleryIndex + 1;
      }
      this.setState({ galleryIndex: newIndex });
      this.updateHistory(newIndex);
    }
  }

  onClickPoster() {
    history.pushState(
      { url: this.spectacle.slug + '#poster' },
      this.siteMetadata.title + ' ' + this.siteMetadata.titleSeparator + ' Affiche de ' + this.spectacle.title,
      '#poster'
    );
    this.openPellicule('image');
  }

  onClickVideo() {
    history.pushState(
      { url: this.spectacle.slug + '#bande-annonce' },
      this.siteMetadata.title + ' ' + this.siteMetadata.titleSeparator + ' Bande-annonce de ' + this.spectacle.title,
      '#bande-annonce'
    );
    this.openPellicule('video');
  }

  onClickGallery(image) {
    history.pushState(
      { url: this.spectacle.slug + '#galerie' },
      this.siteMetadata.title + ' ' + this.siteMetadata.titleSeparator + ' Galerie de ' + this.spectacle.title,
      '#galerie'
    );
    this.openPellicule('gallery', image);
  }

  openPellicule(type, content) {
    if (type === 'image') {
      this.setState({pellicule:
        {
          type: 'image',
          title: this.spectacle.title,
          image: this.spectacle.poster,
        }
      });
    }
    else if (type === 'video') {
      this.setState({ pellicule:
        {
          type: 'video',
          title: this.spectacle.title,
          video: this.spectacle.trailer
        }
      });
    }
    else if (type === 'gallery') {
      let galleryIndex = this.state.galleryIndex;
      if (content) {
        galleryIndex = this.findImageIndex(this.gallery, content);
        if (galleryIndex < 0) {
          galleryIndex = 0;
        }
      }
      this.setState({
        pellicule: {
          type: 'gallery',
          title: this.spectacle.title,
          gallery: this.gallery,
          image: content,
        },
        galleryIndex: galleryIndex
      });
    }
  }

  closePellicule() {
    history.back();
    this.setState({ pellicule: null });
  }

  onHistoryChange(e) {
    const hash = document.location.hash;
    if (hash === '#poster' && this.spectacle.poster) {
      if (!this.state.pellicule || this.state.pellicule !== 'image') {
        this.openPellicule('image');
      }
    }
    else if (hash === '#bande-annonce' && this.spectacle.trailer) {
      if (!this.state.pellicule || this.state.pellicule !== 'video') {
        this.openPellicule('video');
      }
    }
    else if (hash.startsWith('#galerie') && this.gallery && this.gallery.length > 0) {
      let image = null;
      if (hash.startsWith('#galerie&photo=')) {
        image = this.gallery.find(this.findImageBySlug);
      }
      if (!this.state.pellicule || this.state.pellicule.content.type !== 'gallery') {
        this.openPellicule('gallery', image);
      }
    }
    else if (this.state.pellicule) {
      this.setState({ pellicule: null });
    }
  }

  updateHistory(imageIndex) {
    const image = this.gallery[imageIndex];
    const slug = slugify(image.title);
    history.replaceState(
      { url: document.location.pathname + '#galerie&photo=' + slug },
      this.siteMetadata.title + this.siteMetadata.titleSeparator + 'Galerie de ' + this.spectacle.title,
      document.location.pathname + '#galerie&photo=' + slug
    );
  }

  render() {
    const hasPellicule = this.state.pellicule != null;
    const hasGallery = this.gallery.length > 0;
    const hasCast = this.spectacle.cast != null;
    const hasPlay = this.spectacle.play != null;
    const hasIntent = this.spectacle.intent != null;
    const hasPress = this.spectacle.press != null;
    const hasMore = hasCast || hasPlay || hasIntent || hasPress;
    const jsonData = {
      siteMetadata: this.siteMetadata,
      spectacle: this.spectacle,
    }

    return(
      <PageContainer>
        <Helmet>
          <title>{this.page.title}</title>
        </Helmet>
        <SEO
          title={this.spectacle.title}
          slug={this.spectacle.slug}
          description={this.spectacle.overview}
          image={this.spectacle.poster.full.sizes.src}
          siteMetadata={this.siteMetadata}
          jsonType="play"
          jsonData={jsonData}
        />
        {hasPellicule ? (
          <Pellicule
            content={this.state.pellicule}
            onClose={this.closePellicule}
            activeIndex={this.state.galleryIndex}
            goToPrev={this.goToPrev}
            goToNext={this.goToNext}
            siteMetadata={this.siteMetadata}
          />
        )
        : null }
        <PageHeader background={this.spectacle.image}>
          <SpectaclePoster
            img={this.spectacle.poster}
            alt={this.spectacle.title}
            link="#"
            onClickHandle={this.onClickPoster}
            type="ctrl"
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
            video={this.spectacle.trailer}
            onClickVideo={this.onClickVideo}
            onClickGallery={this.onClickGallery}
            hasGallery={hasGallery}
            url={hasMore ? '#en-savoir-plus' : ''}
          />
          <Comments comments={this.spectacle.comments} />
        </PageHeader>
        {hasGallery ? (
          <Gallery
            id="galerie"
            images={this.gallery}
            onClickHandle={this.onClickGallery}
          />
        )
        : null }
        {hasCast ? (
          <StyledSection
            title="Équipe"
          >
            <SpectacleCast
              members={this.spectacle.cast}
            />
          </StyledSection>
        )
        : null }
        {hasPlay ? (
          <StyledSection
            title="À propos de l'œuvre"
          >
            <div>{remark().use(reactRenderer).processSync(this.spectacle.play).contents}</div>
          </StyledSection>
        )
        : null }
        {hasIntent ? (
          <StyledSection
            title="Intentions"
          >
            <div>{remark().use(reactRenderer).processSync(this.spectacle.intent).contents}</div>
          </StyledSection>
        )
        : null }
        {hasPress ? (
          <StyledSection
            title="Avis de la presse"
          >
            <SpectacleReviews
              reviews={this.spectacle.press}
            />
          </StyledSection>
        )
        : null }
      </PageContainer>
    )
  }
}

export const query = graphql`
  query SpectacleQuery($slug: String!) {
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
    spectacle: markdownRemark(
      fields: { slug: { eq: $slug } }
      frontmatter: { layout: { eq: "spectacle" } }
    ) {
      fields {
        slug
      }
      frontmatter {
        title
        subtitle
        creation
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
            time
            days
          }
          reservation
        }
        poster {
          full: childImageSharp {
            sizes(maxHeight: 1080, maxWidth: 764) {
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
        comments {
          author
          text
        }
        cast {
          role
          names
        }
        play
        intent
        press {
          author
          text
        }
      }
    }
    gallery: markdownRemark(
      fields: { slug: { eq: $slug } }
      frontmatter: { layout: { eq: "gallery" } }
    ) {
      ...GalleryContent
    }
  }
`
