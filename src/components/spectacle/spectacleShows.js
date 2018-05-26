import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import theme from "../../theme";
import { WEEKDAYS_LONG } from "../../locale/fr_FR";
import Shows from "../../functions/shows";


const StartEndContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  font-weight: bold;
  line-height: 1;
  margin-right: .5rem;
  padding: .5rem;
  border-radius: .3rem;
  ${props => props.theme === 'lite' ? `
    background-color: ${theme.color.primary};
    color: ${theme.color.lighter};
    mix-blend-mode: normal;
  `
  : `
    background-color: ${theme.color.lighter};
    color: ${theme.color.darker};
    mix-blend-mode: screen;
  ` }
`;

const Day = styled.span`
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &:nth-child(2) {
    padding-top: .2rem;
    ${props => props.theme === 'lite' ? `
      border-top: 1px solid ${theme.color.lighter};
    `
    : `
      border-top: 1px solid ${theme.color.darker};
    ` }
  }
`;

const Month = styled.span`
  margin-left: .3rem;
  font-size: .9rem;
`;


class StartEnd extends React.Component {
  getStartEndData(dateFrom, dateTo) {
    let yearFrom = '';
    let yearTo = '';
    let monthTo = '';
    let dayTo = '';

    if (dateFrom.getTime() != dateTo.getTime()) {
      if (dateFrom.getYear() != dateTo.getYear()) {
        yearFrom = dateFrom.toLocaleDateString('fr-FR', { year: 'numeric'});
      }
      yearTo = dateTo.toLocaleDateString('fr-FR', { year: 'numeric'});
      monthTo = dateTo.toLocaleDateString('fr-FR', { month: 'long'});
      dayTo = dateTo.toLocaleDateString('fr-FR', { day: 'numeric'});
    }
    else {
      yearFrom = dateFrom.toLocaleDateString('fr-FR', { year: 'numeric'});
    }
    const dayFrom = dateFrom.toLocaleDateString('fr-FR', { day: 'numeric'});
    const monthFrom = dateFrom.toLocaleDateString('fr-FR', { month: 'long'});

    return {
      yearFrom: yearFrom,
      yearTo: yearTo,
      monthFrom: monthFrom,
      monthTo: monthTo,
      dayFrom: dayFrom,
      dayTo: dayTo,
    };
  }

  render(){
    const data = this.getStartEndData(this.props.dateFrom, this.props.dateTo);
    return (
      <StartEndContainer theme={this.props.theme}>
        <Day>
          {data.dayFrom}
          <Month>{data.monthFrom}</Month>
        </Day>
        { data.dayTo.length > 0 ? (
          <React.Fragment>
            <Day theme={this.props.theme}>
              {data.dayTo}
              <Month>{data.monthTo}</Month>
            </Day>
          </React.Fragment>
        )
        : null }
      </StartEndContainer>
    )
  }
}

const DatesListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;
  margin: 0 !important;
`;

const DateItem = styled.li`
  list-style: none;
`;

class DatesList extends React.Component {
  getWeekString(week) {
    if (week == null) {
      return '';
    }
    let weekString = '';
    week.forEach(function (day, index, array) {
      if (index > 0) {
        if (index == array.length - 1) {
          weekString += ' et ';
        }
        else {
          weekString += ', ';
        }
      }
      if (day.from == day.to) {
        weekString += WEEKDAYS_LONG[day.from];
      }
      else if (day.from == day.to) {
        weekString += WEEKDAYS_LONG[day.from];
        if (index == array.length - 1) {
          weekString += ' et ';
        }
        else {
          weekString += ', ';
        }
        weekString += WEEKDAYS_LONG[day.to];
      }
      else {
        weekString += 'du ' + WEEKDAYS_LONG[day.from] + ' au ' + WEEKDAYS_LONG[day.to];
      }
    });
    weekString = weekString.charAt(0).toUpperCase() + weekString.slice(1);
    return weekString;
  }

  getDaysString(dates) {
      if (dates == null || dates.length == 0) {
        return '';
      }
      const daysString = Shows.getDatesString(dates);
      if (dates.length == 1) {
        return 'Le ' + daysString;
      }
      else {
        return 'Les ' + daysString;
      }
  }

  render() {
    const weekString = this.getWeekString(this.props.regularWeek);
    const daysString = this.getDaysString(this.props.datesToAdd);
    const hasDates = weekString.length > 0 || daysString.length > 0 || previewString.length > 0;

    if (hasDates) {
      return (
        <DatesListContainer
          className={this.props.className}
        >
          {weekString.length > 0 ? (
            <DateItem>{weekString}</DateItem>
          )
          : null }
          {daysString.length > 0 ? (
            <DateItem>{daysString}</DateItem>
          )
          : null }
        </DatesListContainer>
      );
    }
    else {
      return null;
    }
  }
}

const TimeContainer = styled.h1`
  display: flex;
  align-items: center;
  margin: 0 !important;
  margin-right: .5rem !important;
  padding-right: .5rem;
  font-size: 1.5rem;
  font-weight: bold;
  font-family: ${theme.font.secondaryAll};
  ${props => props.theme === 'lite' ? `
    color:  ${theme.color.primary};
    border-right: 1px solid ${theme.color.primary};
  `
  :
  `
    color:  ${theme.color.lighter};
    border-right: 1px solid ${theme.color.lighter};
  `
  }
`;

class Time extends React.Component {
  getTimeString(time) {
    const hours = parseInt(time.split(':')[0]);
    const minutesString = time.split(':')[1];
    let timeString = hours.toString() + 'h';
    if (minutesString !== '00') {
      timeString += minutesString;
    }

    return timeString;
  }

  render() {
    const time = this.getTimeString(this.props.time);
    return (
      <TimeContainer
        className={this.props.className}
        theme={this.props.theme}
      >
        {time}
      </TimeContainer>
    );
  }
}

const DatesTimesContainer = styled.ul`
  padding: none;
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  color: ${props => props.theme === 'lite' ? theme.color.primary : theme.color.lighter};
`;

const DatesTime = styled.li`
  display: flex;
  list-style: none;
`;

class DatesTimes extends React.Component {
  getPreviewString(date) {
    const now = new Date();
    const preview = new Date(date);
    if (date == null || date.length == 0 || preview < now) {
      return '';
    }
    let minutes = preview.getMinutes() > 0 ? preview.getMinutes().toString() : '';
    if (minutes.length == 1) {
      minutes = '0' + minutes;
    }
    const previewString =  'Avant-première le ' + Shows.getDatesString([preview])
      + ' à ' + preview.getHours() + 'h' + minutes;

    return previewString;
  }

  getBreakString(dates) {
    if (dates == null || dates.length == 0) {
      return '';
    }
    const breakString = Shows.getDatesString(dates);
    if (dates.length == 1)
    {
      return 'Relâche le ' + breakString;
    }
    else {
      return 'Relâche les ' + breakString;
    }
  }

  render() {
    const previewString = this.getPreviewString(this.props.preview);
    const breakString = this.getBreakString(this.props.datesToRemove);
    const hasOneShow = this.props.hasOneShow
    return (
      <DatesTimesContainer
        className={this.props.className}
        theme={this.props.theme}
      >
        {previewString.length > 0 ? (
          <DateItem>{previewString}</DateItem>
        )
        : null }
        {this.props.datesList.map((dates) =>
          <DatesTime key={dates.time}>
            <Time
              time={dates.time}
              theme={this.props.theme}
            />
            {!hasOneShow ? (
              <DatesList
                regularWeek={dates.regularWeek}
                datesToAdd={dates.datesToAdd}
              />
            )
            : null }
          </DatesTime>
        )}
        {breakString.length > 0 ? (
          <DateItem>{breakString}</DateItem>
        )
        : null }
      </DatesTimesContainer>
    );
  }
}

const ShowsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: .5rem 0;
`;

class SpectacleShows extends React.Component {

  render() {
    const hasCustomDate = Shows.isCustomDate(this.props.customDate);
    const hasUpcomingPreview = !hasCustomDate && Shows.hasUpcomingPreview(this.props.preview);
    const hasUpcomingShows = !hasCustomDate && Shows.hasUpcomingShows(this.props.shows)
    const showsData = hasUpcomingShows ? Shows.getShowsData(this.props.shows) : null;

    if (hasCustomDate) {
      const customDate = new Date(this.props.customDate);
      const customDateString = 'En ' + Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long' }).format(customDate);

      return (
        <ShowsContainer
          className={this.props.className}
        >
          <StartEndContainer
            theme={this.props.theme}
          >
            {customDateString}
          </StartEndContainer>
        </ShowsContainer>
      );
    }
    else if (hasUpcomingShows || hasUpcomingPreview) {
      const hasOneShow = hasUpcomingShows && (showsData.dateFrom.getTime() == showsData.dateTo.getTime());
      return (
        <ShowsContainer
          className={this.props.className}
        >
          <StartEnd
            theme={this.props.theme}
            dateFrom={showsData.dateFrom}
            dateTo={showsData.dateTo}
          />
          <DatesTimes
            theme={this.props.theme}
            hasOneShow={hasOneShow}
            preview={this.props.preview}
            datesList={showsData.datesList}
            datesToRemove={showsData.datesToRemove}
          />
        </ShowsContainer>
      );
    }
    else {
      return null;
    }
  }
}

SpectacleShows.propTypes = {
  shows: PropTypes.array,
  customDate: PropTypes.string,
  preview: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.string,
}

export default SpectacleShows;
