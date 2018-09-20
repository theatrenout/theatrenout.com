import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import styled from "styled-components";
import nl2br from "react-nl2br";
import remark from "remark";
import reactRenderer from "remark-react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { PageTitle, PageSeparator, PageOverview, PageInfo } from "../components/page/page";
import PageHeader from "../components/page/pageHeader";
import PageNav from "../components/page/pageNav";
import StyledSection from "../components/styledComponents/styledSection";
import Gallery from "../components/gallery";
import Pellicule from "../components/pellicule/pellicule";
import slugify from "../functions/slugify";
import Navigation from "../components/navigation";


const MdLink = styled.a.attrs({
  to: props => props.src,
})``

const PanoramaContainer = styled.div`
  display: flex;
  justify-content: center;
`

const PanoramaCtrl = styled(Navigation).attrs({
  type: 'button'
})`
  margin: .5rem;
`

export default class LocationPage extends React.Component {
  constructor(props) {
    super(props);

    this.siteMetadata = props.data.site.siteMetadata;
    this.page = props.data.page.frontmatter;
    this.page.sections = this.page.sections.map(function(section) {
      section.slug = slugify(section.title);
      return section;
    })
    this.page.slug = props.data.page.fields.slug;
    this.activeGallery = '';

    this.getNavLinks = this.getNavLinks.bind(this);
    this.findImageIndex = this.findImageIndex.bind(this);
    this.findImageBySlug = this.findImageBySlug.bind(this);
    this.findSectionBySlug = this.findSectionBySlug.bind(this);
    this.goToNext = this.goToNext.bind(this);
    this.goToPrev = this.goToPrev.bind(this);
    this.onClickGallery = this.onClickGallery.bind(this);
    this.onClickPanorama = this.onClickPanorama.bind(this);
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
    if (hash.startsWith("#galerie=")) {
      this.activeGallery = document.location.hash.split('&photo=')[0].slice(9);
      const gallery = this.page.sections.find(this.findSectionBySlug).gallery.content.frontmatter.images;
      let image = null;
      if (hash.includes("&photo=")) {
        image = gallery.find(this.findImageBySlug);
      }
      this.openPellicule(
        'gallery',
        {
          gallery: gallery,
          image: image,
        }
      );
    }
    else if (hash.startsWith('#panorama-')) {
      const type = hash.slice(10);
      if (type === 'accueil' || type === 'salle') {
        let image = '';
        if (type === 'accueil') {
          image = this.props.data.panoramaAccueil.publicURL;
        }
        else {
          image = this.props.data.panoramaSalle.publicURL;
        }
        this.openPellicule(
          'panorama',
          { image: image },
        );
      }
    }
    window.onpopstate = this.onHistoryChange;
  }

  getNavLinks() {
    const navLinks = [];
    this.page.sections.forEach(function(section) {
      navLinks.push({
        url: '#' + section.slug,
        text: section.title,
      })
    })

    return navLinks;
  }

  findImageIndex(gallery, image) {
    let index = -1;
    for (let i = 0; i < gallery.length && index === -1; i++){
      if (gallery[i].url.full.fluid.src === image.url.full.fluid.src) {
        index = i;
      }
    }
    return index;
  }

  findImageBySlug(image) {
    const hashSlug = document.location.hash.split('&photo=')[1];
    const imageSlug = slugify(image.title);
    return hashSlug === imageSlug;
  }

  findSectionBySlug(section) {
    return this.activeGallery === section.slug;
  }

  goToPrev() {
    if (this.state.pellicule && this.state.pellicule.gallery
      && this.state.pellicule.gallery.length > 0)
    {
      let newIndex = this.state.pellicule.gallery.length - 1;
      if (this.state.galleryIndex > 0) {
        newIndex = this.state.galleryIndex - 1;
      }
      this.setState({ galleryIndex: newIndex });
      this.updateHistory(newIndex);
    }
  }

  goToNext() {
    if (this.state.pellicule && this.state.pellicule.gallery
      && this.state.pellicule.gallery.length > 0)
    {
      let newIndex = 0;
      if (this.state.galleryIndex < this.state.pellicule.gallery.length - 1) {
        newIndex = this.state.galleryIndex + 1;
      }
      this.setState({ galleryIndex: newIndex });
      this.updateHistory(newIndex);
    }
  }

  onClickGallery(image, gallery) {
    this.activeGallery = gallery.slice(8);
    const section = this.page.sections.find(this.findSectionBySlug);
    const slug = slugify(image.title);
    window.history.pushState(
      { url: this.page.slug + '#' + gallery + '&photo=' + slug},
      this.siteMetadata.title + ' ' + this.siteMetadata.titleSeparator + this.page.title + ' - Galerie de ' + section.title,
      '#' + gallery + '&photo=' + slug
    );
    this.openPellicule(
      'gallery',
      {
        gallery: section.gallery.content.frontmatter.images,
        image: image,
      }
    );
  }

  onClickPanorama(e, type) {
    e.preventDefault();
    let image = '';
    let title = '';

    if (type === 'accueil') {
      image = this.props.data.panoramaAccueil.publicURL;
      title = 'l\'accueil';
    }
    else if (type === 'salle') {
      image = this.props.data.panoramaSalle.publicURL;
      title = 'la salle de spectacle';
    }
    window.history.pushState(
      { url: this.page.slug + '#panorama-' + type},
      this.siteMetadata.title + ' ' + this.siteMetadata.titleSeparator + this.page.title + ' - Vue à 360° de ' + title,
      '#panorama-' + type,
    );
    this.openPellicule(
      'panorama',
      { image: image },
    );
  }

  openPellicule(type, content) {
    if (type === 'gallery') {
      let galleryIndex = 0;
      if (content.gallery && content.image) {
        galleryIndex = this.findImageIndex(content.gallery, content.image);
        if (galleryIndex < 0) {
          galleryIndex = 0;
        }
      }
      this.setState({
        pellicule: {
          type: 'gallery',
          gallery: content.gallery,
          image: content.image,
        },
        galleryIndex: galleryIndex,
      });
    }
    else if(type === 'panorama') {
      this.setState({
        pellicule: {
          type: 'panorama',
          image: content.image,
        },
      });
    }
  }

  closePellicule() {
    window.history.back();
    this.setState({ pellicule: null });
  }

  onHistoryChange(e) {
    const hash = document.location.hash;
    if (hash.startsWith('#galerie=')) {
      this.activeGallery = hash.split('&photo=')[0].slice(9);
      const section = this.page.sections.find(this.findSectionBySlug)
      if (section) {
        const gallery = section.gallery.content.frontmatter.images;
        let image = null;
        if (hash.includes('&photo=')) {
          image = gallery.find(this.findImageBySlug);
        }
        if (!this.state.pellicule || this.state.pellicule.type !== 'gallery') {
          this.openPellicule(
            'gallery',
            {
              gallery: gallery,
              image: image,
            }
          );
        }
      }
      else if (this.state.pellicule) {
        this.setState({ pellicule: null });
      }
    }
    else if (hash.startsWith('#panorama-')) {
      const type = hash.slice(10);
      if (type === 'accueil' || type === 'salle') {
        let image = '';
        if (type === 'accueil') {
          image = this.props.data.panoramaAccueil.publicURL;
        }
        else {
          image = this.props.data.panoramaSalle.publicURL;
        }
        if (!this.state.pellicule || this.state.pellicule.type !== 'panorama') {
          this.openPellicule(
            'panorama',
            { image: image },
          );
        }
      }
      else if (this.state.pellicule) {
        this.setState({ pellicule: null });
      }
    }
    else if (this.state.pellicule) {
      this.setState({ pellicule: null });
    }
  }

  updateHistory(imageIndex) {
    const section = this.page.sections.find(this.findSectionBySlug)
    const gallery = section.gallery.content.frontmatter.images;
    const image = gallery[imageIndex];
    const slug = slugify(image.title);
    window.history.replaceState(
      { url: document.location.pathname + '#galerie=' + this.activeGallery + '&photo=' + slug },
      this.siteMetadata.title + this.siteMetadata.titleSeparator + this.page.title + 'Galerie de ' + section.title,
      document.location.pathname + '#galerie=' + this.activeGallery + '&photo=' + slug
    );
  }

  render() {
    const pageTitle = this.siteMetadata.title + this.siteMetadata.titleSeparator + this.page.title;
    const hasPellicule = this.state.pellicule != null;
    const onClickGallery = this.onClickGallery;
    const onClickPanorama = this.onClickPanorama;
    const mdOptions = {
      remarkReactComponents: {
        a: MdLink,
      },
    };
    const navLinks = this.getNavLinks();

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
        <PageHeader
          background={this.page.image}
        >
          <PageInfo>
            <PageTitle>{this.page.title}</PageTitle>
            <PageSeparator />
            <PageOverview>{nl2br(this.page.overview)}</PageOverview>
          </PageInfo>
          <PageNav
            links={navLinks}
          />
        </PageHeader>
        {this.page.sections.map(section => (
          <React.Fragment key={section.title}>
            <StyledSection
              id={section.slug}
              title={section.title}
            >
              {remark().use(reactRenderer, mdOptions).processSync(section.content).contents}
              {section.title === 'Pour une privatisation' ? (
                <PanoramaContainer>
                  <PanoramaCtrl
                    onClick={(e) => onClickPanorama(e,'accueil')}
                    icon="panorama"
                  >
                    Explorer l'accueil à 360°
                  </PanoramaCtrl>
                </PanoramaContainer>
              )
              : section.title === 'Pour présenter votre travail' ? (
                <PanoramaContainer>
                  <PanoramaCtrl
                    onClick={e => onClickPanorama(e,'salle')}
                    icon="panorama"
                  >
                    Explorer la salle de spectacle à 360°
                  </PanoramaCtrl>
                </PanoramaContainer>
              )
              : null }
            </StyledSection>
            {section.gallery ? (
              <Gallery
                id={'galerie=' + section.slug}
                images={section.gallery.content.frontmatter.images}
                onClickHandle={onClickGallery}
              />
            )
            : null }
          </React.Fragment>
        ))}
      </Layout>
    )
  }
}

export const query = graphql`
  query LocationQuery {
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
      fields: { slug: { eq: "/location/" } }
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
        sections {
          title
          gallery {
            content: childMarkdownRemark {
              ...GalleryContent
            }
          }
          content
        }
      }
    }
    panoramaAccueil: file(
      name: {eq: "accueil-panorama"}
    ) {
      publicURL
    }
    panoramaSalle: file(
      name: {eq: "salle-panorama"}
    ) {
      publicURL
    }
  }
`
