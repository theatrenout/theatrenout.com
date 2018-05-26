const Dates = {
  getStartEndTimes: function(startDate, time, duration) {
    const startTime = new Date();
    const endTime = new Date();
    startTime.setTime(startDate.getTime());
    startTime.setHours(parseInt(time.split(':')[0]));
    startTime.setMinutes(parseInt(time.split(':')[1]));
    endTime.setTime(startTime.getTime());
    endTime.setHours(startTime.getHours() + parseInt(duration.split(':')[0]));
    endTime.setMinutes(startTime.getMinutes() + parseInt(duration.split(':')[1]));

    return { startTime, endTime };
  },

  getIcsString: function(date) {
    const parts = this.getDateParts(date);

    return parts.year + parts.month + parts.day
      + 'T' + parts.hour + parts.minute + '00';
  },

  getDateString: function(date) {
    const parts = this.getDateParts(date);

    return parts.year + '-' + parts.month + '-' + parts.day;
  },

  getDateParts: function(date) {
    const parts = {};

    parts.year = date.getFullYear().toString();
    const month = date.getMonth() + 1;
    parts.month = month.toLocaleString('fr-FR', {minimumIntegerDigits: 2});
    const day = date.getDate();
    parts.day = day.toLocaleString('fr-FR', {minimumIntegerDigits: 2});
    const hour = date.getHours();
    parts.hour = hour.toLocaleString('fr-FR', {minimumIntegerDigits: 2});
    const minute = date.getMinutes();
    parts.minute = minute.toLocaleString('fr-FR', {minimumIntegerDigits: 2});

    return parts;
  },
}

export default Dates;
