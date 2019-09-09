import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import styled from "styled-components";
import nl2br from "react-nl2br";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

import theme from "../theme";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Shows from "../functions/shows";
import { WEEKDAYS_LONG, WEEKDAYS_SHORT, MONTHS_LONG, FIRST_DAY_OF_WEEK } from "../locale/fr_FR";
import { PageTitle, PageSeparator, PageOverview, PageInfo } from "../components/page/page";
import PageHeader from "../components/page/pageHeader";
import StyledSection from "../components/styledComponents/styledSection";
import Ctrl from "../components/ctrl";
import SpectaclePoster from "../components/spectacle/spectaclePoster";
import SpectacleTags from "../components/spectacle/spectacleTags";
import SpectacleShows from "../components/spectacle/spectacleShows";
import Navigation from "../components/navigation";
import AddToCalendar from "../components/addToCalendar";


const Calendar = styled(DayPicker)`
  & .DayPicker-Month {
    margin: 0;
    table-layout: fixed;
    width: 100%;
  }

  & .DayPicker-Caption {
    text-align: center;
    text-transform: capitalize;
    font-family: ${theme.font.primaryAll};
    color: ${theme.color.darker};
    padding-top: .4rem;
  }

  & .DayPicker-Weekday {
    width: 14%;
    text-transform: capitalize;
    color: ${theme.color.dark};
  }

  & .DayPicker-Day {
    height: 4rem;
    padding: 0;
    border: 1px solid rgba(0,0,0,.1);
    cursor: default;
  }

  & .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    border-radius: 0 !important;
    background-color: transparent !important;
  }
`

const Day = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: .5rem;
  border-radius: .2rem;
  min-width: 48px;
  box-sizing: border-box;
  padding-bottom: 1rem;
  text-align: left;

  .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside) &:hover {
    color: ${theme.color.lighter};
    background-color: ${theme.color.primary} !important;
    border-radius: .2rem !important;
    cursor: pointer;
  }

  .DayPicker-Day--outside & {
    color: ${theme.color.default};
    opacity: ${theme.opacity.faded};
  }

  .DayPicker-Day--today & {
    color: ${theme.color.darker};
    background-color: ${theme.color.light};
  }

  ${props => props.active ? `
    z-index: 50;
    background-color: ${theme.color.primary};
    box-shadow: ${theme.boxShadow} ${theme.color.darker};
    color: ${theme.color.lighter};

    .DayPicker-Day--today & {
      background-color: ${theme.color.primary};
      color: ${theme.color.lighter};
    }

    & ul li span {
      color: ${theme.color.lighter};
    }

    &:after {
      content: "";
      display: block;
      border-top: .6rem solid ${theme.color.primary};
      position: absolute;
      z-index: 60;
      bottom: -.5rem;
      left: 0;
      width: 100%;
    }
  `
  : ''}
`

const DayNumber = styled.div`
  position: absolute;
  bottom: 0;
  right: .2rem;
  font-family: ${theme.font.primaryAll};
`

const StyledList = styled.ul`
  margin: 0 !important;
`

const Show = styled.li`
  list-style: none;
  font-size: .8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Time = styled.span`
  font-weight: bold;
  margin-right: .2rem;
  color: ${theme.color.primary};
  display: block;

  .DayPicker-Day--outside & {
    opacity: ${theme.opacity.transparent};
  }

  .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside) ${Day}:hover & {
    color: ${theme.color.lighter};
  }

  ${theme.media.desktop} {
    display: inline;
  }
`

const Nav = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
`;

const NavPrev = styled(Ctrl)`
  display: inline-block;
  color: ${theme.color.primary};
  float: left;

  & svg {
    height: 1.2rem;
  }

  &:hover {
    transform: scale(1.2,1.2);
  }
`;

const NavNext = styled(NavPrev)`
  float: right;
`;

const Navbar = (object) => (
  <Nav>
    {object.showPreviousButton ? (
      <NavPrev
        type="prev"
        alt="Précédent"
        onClickHandle={object.onPreviousClick}
      />
    )
    : null }
    {object.showNextButton ? (
      <NavNext
        type="next"
        alt="Suivant"
        onClickHandle={object.onNextClick}
      />
    )
    : null }
  </Nav>
)

const Details = styled.ul`
  position: absolute;
  left: 0;
  margin: 0 !important;
  padding: .5rem;
  top: ${props => props.visible ? 'auto' : '0'};
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  z-index: ${props => props.visible ? '40' : '-10'};
  background-color: ${theme.color.lighter};
  box-shadow: ${theme.boxShadow} ${theme.color.darker};
  text-align: left;
`

const Close = styled(Ctrl).attrs({
  type: 'close',
  alt: 'Fermer',
})`
  position: absolute;
  right: 0;
  top: 0;
  color: ${theme.color.lighter};
  display: none;

  ${theme.media.desktop} {
    display: block;
  }

  & svg {
    height: 1.5rem;
  }
`

const DetailsTitle = styled.h1`
  margin: -.5rem -.5rem .5rem !important;
  padding: 1rem .5rem;
  text-transform: capitalize;
  color: ${theme.color.lighter};
  background-color: ${theme.color.primary};
`

const ShowDetails = styled.li`
  list-style: none;
  margin-bottom: 1rem;
  font-weight: normal;
  color: ${theme.color.default};
`

const DetailsTime = styled.h1`
  margin-bottom: .5rem;
  padding-left: .5rem;
  border-bottom: 1px solid ${theme.color.primary};
`

const Spectacle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: .5rem;
  border: 2px solid ${theme.color.primary};
  background-color: ${theme.color.lighter};
`

const SpectacleLi = Spectacle.withComponent(ShowDetails)

const PosterContainer = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .5rem;
`

const SpectaclePosterImg = styled(SpectaclePoster)`
  height: 11rem;
  width: 7.7777rem;
  margin: 0;
`

const SpectacleDetails = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;

  ${theme.media.desktop} {
    flex-direction: row;
  }
`

const SpectacleHeader = styled.header`
  background-color: ${theme.color.primary};
  padding: .5rem;
  min-height: 48px;
  text-align: center;
`

const SpectacleTitle = styled.h1`
  margin: 0 0 .2rem 0;
  color: ${theme.color.lighter};
`

const SpectacleSubtitle = styled.h2`
  font-family: ${theme.font.secondaryAll};
  font-weight: bold;
  color: ${theme.color.light};
  font-size: .9rem !important;
`

const SpectacleContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: .5rem;
`

const SpectacleTagsList = styled(SpectacleTags)`
  margin: 0 !important;
  display: flex;
  justify-content: center;
  color: ${theme.color.lighter};

  & li:first-child {
    margin-left: 0;
  }

  & li:last-child {
    margin-bottom: .2rem;
  }
`

const SpectacleShowsList = styled(SpectacleShows).attrs({
  theme: 'lite'
})`
`

const SpectacleOverview = styled.p`
  margin-top: .5rem !important;
  text-indent: 0 ! important;
  font-size: .9rem;
  text-align: center;
`

const NavList = styled.ul`
  padding: 0;
  margin: .5rem 0 0 !important;
  display: flex;
  flex: 1 0 auto;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;

  & li:last-child {
    margin-bottom: 1px;
  }
`

const NavItem = styled.li`
  flex: 0 0 auto;
  list-style: none;
  margin: 1px;
`

const More = styled(Navigation).attrs({
  type: 'link',
})`
  font-family: ${theme.font.secondaryAll} !important;
  display: inline-block !important;
  box-sizing: border-box;
`

const Reservation = styled(More).attrs({
  type: 'anchor',
})`
  color: ${theme.color.important};
  border: 1px solid ${theme.color.important};

  &:hover, &:active, &:focus {
    background-color: ${theme.color.important};
  }
`

const AddCalendar = styled(More.withComponent(AddToCalendar)).attrs({
  type: 'anchor',
})``


export default class ProgrammationPage extends React.Component {
  constructor(props) {
    super(props);

    this.siteMetadata = props.data.site.siteMetadata;
    this.page = props.data.page.frontmatter;
    this.page.slug = props.data.page.fields.slug;

    this.spectacles = Shows.getSortedSpectacles(props.data.spectacles);

    this.renderCalendarDay = this.renderCalendarDay.bind(this);
    this.onClickDate = this.onClickDate.bind(this);
    this.onClickClose = this.onClickClose.bind(this);

    this.state = {
      activeDate: null,
    };
  }

  renderCalendarDay(day) {
    const date = day.getDate();
    const shows = Shows.getShowsByDate(this.spectacles, day);
    const slug = day.getFullYear() + '-' + day.getMonth() + '-' + day.getDate();
    const activeDate = this.state.activeDate;
    const siteMetadata = this.siteMetadata;
    const address = siteMetadata.title + ', ' + siteMetadata.address.street
      + ', ' + siteMetadata.address.postalCode + ' ' + siteMetadata.address.city;

    return (
      <React.Fragment>
        <Day
          aria-controls={'details-' + slug}
          aria-checked={slug === activeDate ? 'true' : 'false'}
          active={slug === activeDate}
        >
          <DayNumber>{date}</DayNumber>
          <StyledList>
            {shows.map(show => (
              <Show>
                <Time>{show.time}</Time>{show.spectacle.title}
              </Show>
            ))}
          </StyledList>
        </Day>
        {shows && shows.length > 0 ? (
          <Details
            id={'details-' + slug}
            visible={slug === activeDate}
            aria-hidden={slug === activeDate ? 'false' : 'true'}
          >
            <Close
              onClickHandle={this.onClickClose}
              aria-controls={'details-' + slug}
            />
            <DetailsTitle>{Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'}).format(day)}</DetailsTitle>
            {shows.map(show => (
              <ShowDetails key={show.time}>
                <DetailsTime>{show.time}</DetailsTime>
                <Spectacle>
                  <SpectacleHeader>
                    <SpectacleTitle>{show.spectacle.title}</SpectacleTitle>
                  </SpectacleHeader>
                  <SpectacleDetails>
                    <PosterContainer>
                      <SpectaclePosterImg
                        img={show.spectacle.poster}
                        alt={show.spectacle.title}
                      />
                    </PosterContainer>
                    <SpectacleContent>
                      <SpectacleTagsList
                        duration={show.spectacle.duration}
                        creation={show.spectacle.creation}
                        categories={show.spectacle.categories}
                        notice={show.spectacle.notice}
                        exclude={['status','creation']}
                      />
                      <SpectacleOverview>{nl2br(show.spectacle.overview)}</SpectacleOverview>
                      <NavList role="menubar">
                        {show.spectacle.shows.reservation && show.spectacle.shows.reservation.length > 0 ? (
                          <NavItem role="none">
                            <Reservation
                              href={show.spectacle.shows.reservation}
                              target="_blank"
                              role="menuitem"
                              icon="ticket"
                            >
                              Réserver
                            </Reservation>
                          </NavItem>
                        )
                        : null }
                        {show.spectacle.duration && show.spectacle.duration.time && show.spectacle.overview && show.time ? (
                          <NavItem role="none">
                            <AddCalendar
                              title={
                                show.spectacle.title
                                + ' au '
                                + siteMetadata.title
                              }
                              overview={show.spectacle.overview}
                              address={address}
                              url={siteMetadata.siteUrl + show.spectacle.slug.slice(1,-1)}
                              date={day}
                              time={show.time}
                              duration={show.spectacle.duration.time}
                              role="menuitem"
                            />
                          </NavItem>
                        )
                        :null }
                        <NavItem role="none">
                          <More
                            to={show.spectacle.slug}
                            role="menuitem"
                            icon="info"
                          >
                            En savoir plus
                          </More>
                        </NavItem>
                      </NavList>
                    </SpectacleContent>
                  </SpectacleDetails>
                </Spectacle>
              </ShowDetails>
            ))}
          </Details>
        )
        : null }
      </React.Fragment>
    );
  }

  onClickDate(day, options) {
    if (options.outside) {
      return false;
    }

    const slug = day.getFullYear() + '-' + day.getMonth() + '-' + day.getDate();
    if (slug === this.state.activeDate) {
      this.setState({
        activeDate: null,
      })
    }
    else {
      const shows = Shows.getShowsByDate(this.spectacles, day);
      if (shows.length > 0) {

        this.setState({
          activeDate: slug,
        });
      }
    }
  }

  onClickClose() {
    if (this.state.activeDate) {
      this.setState({
        activeDate: null,
      })
    }
  }

  render() {
    const pageTitle = this.siteMetadata.title + this.siteMetadata.titleSeparator + this.page.title;
    const dateFrom = new Date();
    const dateTo = new Date(dateFrom.getFullYear() + 1, dateFrom.getMonth(), dateFrom.getDate());
    const jsonData = {
      siteMetadata: this.siteMetadata,
      spectacles: this.spectacles,
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
          jsonType="events"
          jsonData={jsonData}
        />
        <PageHeader
          background={this.page.image}
        >
          <PageInfo>
            <PageTitle>{this.page.title}</PageTitle>
            <PageSeparator />
            <PageOverview>{nl2br(this.page.overview)}</PageOverview>
          </PageInfo>
        </PageHeader>
        <StyledSection
          id="calendrier"
          title="Calendrier"
        >
          <Calendar
            onDayClick={this.onClickDate}
            months={MONTHS_LONG}
            weekdaysLong={WEEKDAYS_LONG}
            weekdaysShort={WEEKDAYS_SHORT}
            firstDayOfWeek={FIRST_DAY_OF_WEEK}
            fixedWeeks
            fromMonth={dateFrom}
            toMonth={dateTo}
            renderDay={this.renderCalendarDay}
            navbarElement={<Navbar />}
          />
        </StyledSection>
        <StyledSection
          id="evenements-programmes"
          title="Événements programmés"
        >
          <StyledList>
            {this.spectacles.map(spectacle => (
              <SpectacleLi key={spectacle.slug}>
                <SpectacleHeader>
                  <SpectacleTitle>{spectacle.title}</SpectacleTitle>
                  { spectacle.subtitle && spectacle.subtitle.length > 0 ? (
                    <SpectacleSubtitle>{spectacle.subtitle}</SpectacleSubtitle>
                  )
                  : null }
                </SpectacleHeader>
                <SpectacleDetails>
                  <PosterContainer>
                    <SpectaclePosterImg
                      img={spectacle.poster}
                      alt={spectacle.title}
                    />
                  </PosterContainer>
                  <SpectacleContent>
                    <SpectacleTagsList
                      duration={spectacle.duration}
                      creation={spectacle.creation}
                      categories={spectacle.categories}
                      notice={spectacle.notice}
                      shows={spectacle.shows}
                      exclude={['creation']}
                    />
                    <SpectacleShowsList
                      shows={spectacle.shows.dates}
                      customDate={spectacle.shows.customdate}
                      preview={spectacle.shows.preview}
                    />
                    <SpectacleOverview>{nl2br(spectacle.overview)}</SpectacleOverview>
                    <NavList role="menubar">
                      {spectacle.shows.reservation && spectacle.shows.reservation.length > 0 ? (
                        <NavItem role="none">
                          <Reservation
                            href={spectacle.shows.reservation}
                            target="_blank"
                            role="menuitem"
                            icon="ticket"
                          >
                            Réserver
                          </Reservation>
                        </NavItem>
                      )
                      : null }
                      <NavItem role="none">
                        <More
                          to={spectacle.slug}
                          role="menuitem"
                          icon="info"
                        >
                          En savoir plus
                        </More>
                      </NavItem>
                    </NavList>
                  </SpectacleContent>
                </SpectacleDetails>
              </SpectacleLi>
            ))}
          </StyledList>
        </StyledSection>
      </Layout>
    )
  }
}

export const query = graphql`
  query ProgrammationQuery {
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
      fields: { slug: { eq: "/programmation/" } }
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
    spectacles: allMarkdownRemark(
      filter:{
        frontmatter: {
          layout: {eq: "spectacle"}
        }
    	}
    )
    {
      edges {
        node {
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
                days
                time
              }
              reservation
            }
            poster {
              full: childImageSharp {
                fluid(maxHeight: 230, maxWidth: 163) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            image {
              full: childImageSharp {
                fluid(maxWidth: 1920) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            trailer
            overview
            cast {
              role
              names
            }
          }
        }
      }
    }
  }
`
