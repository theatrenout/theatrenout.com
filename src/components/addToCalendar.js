import React from "react";
import PropTypes from "prop-types";

import theme from "../theme";
import slugify from "../functions/slugify";
import Dates from "../functions/dates";
import Navigation from "./navigation";


class AddToCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.getDownload = this.getDownload.bind(this);

    this.state = {
      download: '',
    }
  }

  componentDidMount() {
    const download = this.getDownload();
    this.setState({ download: download });
  }

  getDownload() {
    const { startTime, endTime } = Dates.getStartEndTimes(this.props.date, this.props.time, this.props.duration);
    const startString = Dates.getIcsString(startTime);
    const endString = Dates.getIcsString(endTime);

    const data = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      "URL:" + this.props.url,
      "DTSTART;TZID=Europe/Paris:" + startString,
      "DTEND;TZID=Europe/Paris:" + endString,
      "SUMMARY:" + this.props.title,
      "DESCRIPTION:" + this.props.overview,
      "LOCATION:" + this.props.address,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\n");

    const blob = new Blob([data], { type: "text/calendar;charset=utf-8" });
    const href = window.URL.createObjectURL(blob);

    return href;
  }

  onClick() {
    return;
  };

  render() {
    const { title, overview, date, time, duration, url, address, ...others } = this.props;
    const file = Dates.getDateString(date) + ' - ' + title + '.ics';
    if (title && overview && date && time && duration && url && address) {
      return (
        <Navigation
          type="anchor"
          icon="calendar"
          href={this.state.download}
          download={file}
          {...others}
        >
          Ajouter à mon calendrier
        </Navigation>
      )
    }
    else {
      return null;
    }
  }
}

AddToCalendar.propTypes = {
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired,
  time: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
}

export default AddToCalendar;
