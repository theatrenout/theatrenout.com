import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby"
import Swipeable from "react-swipeable";

import theme from "../theme";
import Header from "../components/header";
import Menu from "../components/menu";
import Footer from "../components/footer";
import SharePopup from "../components/sharePopup";


const Body = styled(Swipeable)`
  position: relative;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  height: 100%;
  overflow: auto;
`;

const Main = styled.main`
  position: relative;
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.swipe = { origin: 0 };

    this.showMenu = this.showMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
    this.onClickShare = this.onClickShare.bind(this);
    this.closeShare = this.closeShare.bind(this);
    this.onSwipingRight = this.onSwipingRight.bind(this);
    this.onSwipedRight = this.onSwipedRight.bind(this);
    this.onSwipedLeft = this.onSwipedLeft.bind(this);
    this.onHistoryChange = this.onHistoryChange.bind(this);

    this.state = {
      menuVisible: false,
      share: false,
    };
  }

  componentDidMount() {
    window.onpopstate = this.onHistoryChange;
  }

  showMenu() {
    this.setState({menuVisible: true});
  }

  hideMenu() {
    this.setState({menuVisible: false});
  }

  onClickShare() {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: document.location.href,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }
    else if (navigator.clipboard) {
      navigator.clipboard.writeText(document.location.href)
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
        share: true,
      })
    }
  };

  closeShare() {
    this.setState({
      share: false,
    })
  }

  onSwipingRight(e) {
    if (this.state.menuVisible === false && this.swipe.origin === 0) {
      this.swipe.origin = e.changedTouches[0].clientX;
    }
  }

  onSwipedRight(e) {
    if (this.state.menuVisible === false && this.swipe.origin < 75) {
      e.preventDefault();
      this.showMenu();
    }
    this.swipe.origin = 0;
  }

  onSwipedLeft(e) {
    if (this.state.menuVisible === true) {
      e.preventDefault();
      this.hideMenu();
    }
  }

  onHistoryChange() {
    if (this.state.menuVisible === true) {
      this.hideMenu();
    }
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query LayoutQuery {
            site {
              siteMetadata {
                title
                contact {
                  portable
                  facebook
                  youtube
                  newsletter
                }
                address {
                  street
                  postalCode
                  city
                }
              }
            }
            menuImage: file(name: {eq: "menu-header"}) {
              full: childImageSharp {
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        `}
        render={data => (
          <React.Fragment>
            <Helmet>
              <html lang="fr" />
              <link rel="icon" sizes="192x192" href="/favicon.png" />
              <link rel="apple-touch-icon" href="/favicon.png" />
              <meta name="msapplication-square70x70logo" content="/favicon_70.png" />
              <meta name="msapplication-square150x150logo" content="/favicon_150.png" />
              <meta name="msapplication-square310x310logo" content="/favicon_310.png" />
              <meta name="theme-color" content={theme.color.primary} />
              <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            </Helmet>
            <Body
              onSwipingRight={this.onSwipingRight}
              onSwipedRight={this.onSwipedRight}
              onSwipedLeft={this.onSwipedLeft}
              id="gatsby-body"
            >
              {this.state.share ? (
                <SharePopup
                  onClickClose={this.closeShare}
                  text="Lien pour partager cette page :"
                  url={document.location.href}
                />
              )
              : null }
              <Header
                siteTitle={data.site.siteMetadata.title}
                onClickMenu={this.showMenu}
                onClickShare={this.onClickShare}
              />
              <Menu
                siteTitle={data.site.siteMetadata.title}
                visible={this.state.menuVisible}
                onCloseMenu={this.hideMenu}
                social={{
                  facebook: data.site.siteMetadata.contact.facebook,
                  youtube: data.site.siteMetadata.contact.youtube,
                  newsletter: data.site.siteMetadata.contact.newsletter,
                }}
                image={data.menuImage}
              />
              <Main>
                {this.props.children}
              </Main>
              <Footer
                title={data.site.siteMetadata.title}
                address={data.site.siteMetadata.address}
                phone={data.site.siteMetadata.contact.portable}
              />
            </Body>
          </React.Fragment>
        )}
      />
    );
  }
}
