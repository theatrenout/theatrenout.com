import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import nl2br from "react-nl2br";

import theme from "../theme";
import SEO from "../components/seo";
import { PageContainer, PageTitle, PageSeparator, PageOverview, PageInfo } from "../components/page/page";
import PageHeader from "../components/page/pageHeader";
import PageNav from "../components/page/pageNav";
import StyledSection from "../components/styledComponents/styledSection";
import Icon from "../components/styledComponents/icon";
import Spinner from "../components/styledComponents/spinner";
import Navigation from "../components/navigation";


const SectionDiv = styled.div`
  text-align: center;

  & h1 {
    margin: 1.45rem 0 .5rem;
  }

  & h1:first-child {
    margin: 0 0 .5rem;
  }

  & p {
    text-indent: 0;
  }

  & ul {
    margin: 0;
  }

  & li {
    list-style: none;
    margin: .5rem;
  }

  & li h1 {
    font-size: .9rem;
    margin: 0 !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & li p {
    font-size: .9rem;
    margin: 0;
  }

  & svg {
    background-color: transparent;
    fill: initial;
    width: 2rem;
    height: 2rem;
  }
`

const VFlexDiv = SectionDiv.extend`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HFlexDiv = VFlexDiv.extend`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
  flex-wrap: wrap;
`

const NoFlex = styled.div`
  flex: 0 0 auto;
  margin: 0 1rem;
`

const MapIframe = styled.iframe`
  width: 100%;
  height: 100%;
  min-height: 300px;
  border: 0;
`

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 30vw;
  min-height: 300px;
  border: 1px solid ${theme.color.light};
`

const Map = (props) =>
  <MapContainer>
    <Spinner />
    <MapIframe {...props} />
  </MapContainer>

const GPSLink = styled(Navigation).attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
  type: 'anchor',
})`
  display: block !important;
  margin: .5rem !important;
`

const SpacedText = styled.span`
  margin: 0 .5rem;
`

const Contact = styled.p`
  padding: 1rem;
`

const ContactItem = styled(Navigation).attrs({
  type: 'anchor',
})`
  display: block;
  margin: 0 1rem !important;
`

const Address = NoFlex.withComponent('p')

export default class InformationsPage extends React.Component {
  constructor(props) {
    super(props);

    this.siteMetadata = props.data.site.siteMetadata;
    this.page = {
      title: 'Informations pratiques',
      slug: '/informations-pratiques/',
    }
  }

  getNavLinks() {
    const navLinks = [];
    navLinks.push({
      url: '#nous-trouver',
      text: 'Nous trouver',
    })
    navLinks.push({
      url: '#comment-venir',
      text: 'Comment venir',
    })
    navLinks.push({
      url: '#nous-contacter',
      text: 'Nous contacter',
    })

    return navLinks;
  }

  render() {
    const pageTitle = this.siteMetadata.title + this.siteMetadata.titleSeparator + this.page.title;
    const navLinks = this.getNavLinks();

    return(
      <React.Fragment>
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>
        <SEO
          title={this.page.title}
          slug={this.page.slug}
          description={this.siteMetadata.description}
          image={this.siteMetadata.images.inside}
          siteMetadata={this.siteMetadata}
          jsonType="theater"
          jsonData={this.siteMetadata}
        />
        <PageHeader
          background={this.props.data.image}
        >
          <PageInfo>
            <PageTitle>{this.page.title}</PageTitle>
            <PageSeparator />
            <PageOverview>{nl2br(this.siteMetadata.description)}</PageOverview>
          </PageInfo>
          <PageNav
            links={navLinks}
          />
        </PageHeader>
        <StyledSection
          id="nous-trouver"
          title="Nous trouver"
        >
          <VFlexDiv>
            <Address>
              {this.siteMetadata.title}<br />
              {this.siteMetadata.address.street}<br />
              {this.siteMetadata.address.postalCode + ' ' + this.siteMetadata.address.city}
            </Address>
            <Map
              frameBorder="0"
              src="https://framacarte.org/fr/map/theatre-nout_23962?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&allowEdit=false&moreControl=false&searchControl=false&tilelayersControl=false&embedControl=false&datalayersControl=false&onLoadPanel=undefined&captionBar=false&fullscreenControl=false&locateControl=false&measureControl=false&editinosmControl=false&datalayers=38622#13/48.9362/2.3427"
            />
            <p>
              <a
                href="https://framacarte.org/fr/map/theatre-nout_23962#15/48.937/2.338"
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir en plein écran
              </a>
            </p>
          </VFlexDiv>
        </StyledSection>
        <StyledSection
          id="comment-venir"
          title="Comment venir"
        >
          <HFlexDiv>
            <NoFlex>
              <h1>En transports en commun</h1>
              <ul>
                <li>
                  <h1>
                    <Icon type="rer" title="RER" />
                    <Icon type="rerD" title="D" />
                    <SpacedText>ou</SpacedText>
                    <Icon type="train" title="Transilien" />
                    <Icon type="tH" title="H" />
                  </h1>
                  <p>Arrêt Saint-Denis<br />
                  à 5 minutes de Gare du Nord<br />
                  à 15 minutes de Châtelet — Les Halles</p>
                </li>
                <li>
                  <h1>
                    <Icon type="metro" title="Métro" />
                    <Icon type="m13" title="13" />
                  </h1>
                  <p>Arrêt Saint-Denis — Porte de Paris, puis T8<br />
                  Arrêt Basilique de Saint-Denis, puis T1</p>
                </li>
                <li>
                  <h1>
                    <Icon type="tramway" title="Tramway"/>
                    <Icon type="t1" title="1"/>
                  </h1>
                  <p>Arrêt L’Île-Saint-Denis</p>
                </li>
                <li>
                  <h1>
                    <Icon type="tramway" title="Tramway" />
                    <Icon type="t8" title="8" />
                  </h1>
                  <p>Arrêt Saint-Denis — Gare</p>
                </li>
                <li>
                  <h1>
                    <Icon type="bus" title="Bus" />
                    <Icon type="b237" title="237" />
                  </h1>
                  <p>Arrêt Mairie de l’Île-Saint-Denis</p>
                </li>
              </ul>
            </NoFlex>
            <NoFlex>
              <h1>En voiture</h1>
              <p>
                <span style={{display: 'block', fontFamily: theme.font.primaryAll, fontSize: '.9rem'}}>Coordonnées GPS :</span>
                {this.siteMetadata.address.latitude + ',' + this.siteMetadata.address.longitude}
                <GPSLink href="https://maps.google.com/?daddr=Théâtre+Nout,+7+Rue+du+19+Mars+1962,+93450+L'Île-Saint-Denis">
                  Allons-y !
                </GPSLink>
                Parking limité
              </p>
            </NoFlex>
          </HFlexDiv>
        </StyledSection>
        <StyledSection
          id="nous-contacter"
          title="Nous contacter"
        >
          <SectionDiv>
            <h1>Par courriel</h1>
            <Contact>
              <ContactItem
                href={'mailto:' + this.siteMetadata.contact.email}>
                {this.siteMetadata.contact.email}
              </ContactItem>
            </Contact>
            <h1>Par téléphone</h1>
            <Contact>
              <ContactItem
                href={'tel:' + this.siteMetadata.contact.landline.replace(/ /g, '')}
              >
                {this.siteMetadata.contact.landline}
              </ContactItem>
              ou
              <ContactItem
                href={'tel:' + this.siteMetadata.contact.portable.replace(/ /g, '')}
              >
                {this.siteMetadata.contact.portable}
              </ContactItem>
            </Contact>
          </SectionDiv>
        </StyledSection>
      </React.Fragment>
    )
  }
}

export const query = graphql`
  query InformationsQuery {
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
    image: file(name: {eq: "exterieur-1"}) {
      full: childImageSharp {
        sizes(maxWidth: 1920) {
          ...GatsbyImageSharpSizes_withWebp
        }
      }
    }
  }
`
