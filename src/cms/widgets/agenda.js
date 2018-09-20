import React from "react";
import { List } from "immutable";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";

import SpectacleShows from "../../components/spectacle/spectacleShows";
import { WEEKDAYS_LONG, WEEKDAYS_SHORT, MONTHS_LONG, FIRST_DAY_OF_WEEK } from "../../locale/fr_FR";


export class AgendaControl extends React.Component {
  constructor(props) {
    super(props);

    this.getValue = this.getValue.bind(this);
    this.onDayClick = this.onDayClick.bind(this);
    this.onClickClear = this.onClickClear.bind(this);
  }

  getValue() {
    if (this.props.value) {
      const values = this.props.value.toArray();
      return this.getDatesFromStrings(values);
    }
    else {
      return [];
    }
  }

  getDatesFromStrings(datesString) {
    var dates = [];

    for (let i = 0; i < datesString.length; i++) {
      let date = new Date(datesString[i]);
      dates.push(date);
    }

    return dates;
  }

  getStringsFromDates(dates) {
    var datesString = [];

    for (let i = 0; i < dates.length; i++) {
      let dateString = dates[i].toISOString().split('T')[0];
      datesString.push(dateString);
    }

    return datesString;
  }

  onClickClear(e) {
    e.preventDefault();
    this.props.onChange(List());
  }

  onDayClick(day, modifiers) {
    const selectedDays = this.getValue();
    if (modifiers.selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }
    selectedDays.sort(function(a, b) {
      return a>b ? 1 : a<b ? -1 : 0;
    });
    for (let i = 0; i < selectedDays.length; i++) {
      selectedDays[i].setHours(12,0,0);
    }

    const daysString = this.getStringsFromDates(selectedDays);
    this.props.onChange(List(daysString));
  }

  render() {
    const value = this.getValue();
    return (
      <div className="nc-controlPane-widget">
        <DayPicker
          selectedDays={value}
          onDayClick={this.onDayClick}
          months={MONTHS_LONG}
          weekdaysLong={WEEKDAYS_LONG}
          weekdaysShort={WEEKDAYS_SHORT}
          firstDayOfWeek={FIRST_DAY_OF_WEEK}
          showOutsideDays
        />
      <button
        onClick={this.onClickClear}
      >
        Effacer
      </button>
      </div>
    );
  }
}

export class AgendaPreview extends React.Component {
  render() {
    const shows = [
      {
        time: "00:00",
        days: this.props.value.toArray()
      }
    ];

    return (
      <SpectacleShows
        shows={shows}
      />
    )
  }
}
