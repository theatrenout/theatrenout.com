import React from "react";
import nl2br from "react-nl2br";

import { WEEKDAYS_LONG } from "../../../locale/fr_FR";
import Shows from "../../../functions/shows";

const StartEndContainer = props =>
  <div className="shows-startendcontainer">
    {props.children}
  </div>

const Day = props =>
  <span className="shows-day">
    {props.children}
  </span>

const Month = props =>
  <span className="shows-month">
    {props.children}
  </span>


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
      <StartEndContainer>
        <Day>
          {data.dayFrom}
          <Month>{data.monthFrom}</Month>
        </Day>
        { data.dayTo.length > 0 ? (
          <React.Fragment>
            <Day>
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

const DatesListContainer = props =>
  <div className="shows-dateslistcontainer">
    {props.children}
  </div>

const DateItem = props =>
  <p className="shows-dateitem">
    {props.children}
  </p>

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
    const hasDates = weekString.length > 0 || daysString.length > 0;

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

const TimeContainer = props =>
  <div className="shows-timecontainer">
    {props.children}
  </div>

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
      >
        {time}
      </TimeContainer>
    );
  }
}

const DatesTimesContainer = props =>
  <div className="shows-datestimescontainer">
    {props.children}
  </div>

const DatesTime = props =>
  <div className="shows-datestime">
    {props.children}
  </div>

class DatesTimes extends React.Component {
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
    const breakString = this.getBreakString(this.props.datesToRemove);
    const hasOneShow = this.props.hasOneShow
    return (
      <DatesTimesContainer
        className={this.props.className}
      >
      {this.props.datesList.map((dates) =>
        <DatesTime key={dates.time}>
          <Time
            time={dates.time}
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

const ShowsContainer = props =>
  <div className="shows-container">
    {props.children}
  </div>

export default class SpectacleShows extends React.Component {

  render() {
    const hasCustomDate = Shows.isCustomDate(this.props.customDate);
    const hasUpcomingShows = !hasCustomDate && Shows.hasUpcomingShows(this.props.shows)
    const showsData = hasUpcomingShows ? Shows.getShowsData(this.props.shows) : null;

    if (hasCustomDate) {
      const customDate = new Date(this.props.customDate);
      const customDateString = 'En ' + Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long' }).format(customDate);
      return (
        <ShowsContainer
          className={this.props.className}
        >
          <StartEndContainer>
            {customDateString}
          </StartEndContainer>
        </ShowsContainer>
      );
    }
    else if (hasUpcomingShows) {
      const hasOneShow = showsData.dateFrom.getTime() == showsData.dateTo.getTime();
      return (
        <ShowsContainer
          className={this.props.className}
        >
          <StartEnd
            dateFrom={showsData.dateFrom}
            dateTo={showsData.dateTo}
          />
          <DatesTimes
            hasOneShow={hasOneShow}
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
