const Shows = {
  hasShows: function(dates) {
    return dates && dates.length > 0
      && dates[0].days && dates[0].days.length > 0
      && dates[0].days[0] && dates[0].days[0].length > 0
      && dates[0].time && dates[0].time.length > 0;
  },

  isCustomDate: function(dateString) {
    if (dateString && dateString.length > 0) {
      const splitDate = dateString.split('-');
      if (splitDate.length === 2) {
        return true;
      }
    }
    return false;
  },

  getFirstShow: function(dates) {
    let firstDate = new Date(dates[0].days[0] + 'T' + dates[0].time + ':00');
    dates.forEach(function (datesForTime) {
      datesForTime.days.sort(function(a, b) {
        return a>b ? 1 : a<b ? -1 : 0;
      });
      const date = new Date(datesForTime.days[0] + 'T' + datesForTime.time + ':00');
      if (date < firstDate) {
        firstDate = date;
      }
    })
    return firstDate;
  },

  getLastShow: function(dates) {
    let lastDate = new Date(dates[0].days[0] + 'T' + dates[0].time + ':00');
    dates.forEach(function (datesForTime) {
      datesForTime.days.sort(function(a, b) {
        return a>b ? -1 : a<b ? 1 : 0;
      });
      const date = new Date(datesForTime.days[0] + 'T' + datesForTime.time + ':00');
      if (date > lastDate) {
        lastDate = date;
      }
    })
    return lastDate;
  },

  hasUpcomingShows: function(dates) {
    if (this.hasShows(dates)) {
      const dateTo = this.getLastShow(dates);
      let nowDate = new Date();
      nowDate.setTime(nowDate.getTime() - 86400000);
      if (dateTo > nowDate) {
        return true;
      }
    }
    return false;
  },

  hasUpcomingPreview: function(date) {
    if (date && date.length > 0) {
      const now = new Date();
      const preview = new Date(date);
      if (preview > now) {
        return true;
      }
    }
    return false;
  },

  getStatus: function(dates, customDate, preview) {
    const nowDate = new Date();
    const soonDate = new Date();
    nowDate.setTime(nowDate.getTime() - 86400000);
    soonDate.setTime(soonDate.getTime() + 3*86400000);

    if (this.isCustomDate(customDate)) {
      const splitDate = customDate.split('-');
      const cDate = new Date(splitDate[0], splitDate[1]);
      if (cDate > soonDate) {
        return 'soon';
      }
    }
    if (this.hasUpcomingPreview(preview)) {
      const previewDate = new Date(preview);
      if (previewDate > soonDate) {
        return 'soon';
      }
      else {
        return 'now';
      }
    }
    if (this.hasUpcomingShows(dates)) {
      const dateFrom = this.getFirstShow(dates);
      const dateTo = this.getLastShow(dates)
      if (dateFrom > soonDate) {
        return 'soon';
      }
      else if (dateTo > nowDate){
        return 'now';
      }
    }
    return null;
  },

  getDatesFromStrings: function(datesString) {
    const dates = [];

    datesString.days.forEach (function(day) {
      const date = new Date(day + 'T' + datesString.time + ':00');
      dates.push(date);
    })

    return dates;
  },

  getBaseWeekFromDates(dates) {
    const weekDays = [
      { day: 0, number: 0 },
      { day: 1, number: 0 },
      { day: 2, number: 0 },
      { day: 3, number: 0 },
      { day: 4, number: 0 },
      { day: 5, number: 0 },
      { day: 6, number: 0 },
    ];
    dates.forEach(function(date) {
      weekDays[date.getDay()].number = weekDays[date.getDay()].number + 1;
    });

    const weekStats = [];
    weekDays.forEach(function(weekDay) {
      if (weekDay.number !== 0) {
        const statIndex = weekStats.findIndex(function(stat) {
          return stat.count === weekDay.number;
        })
        if (statIndex !== -1) {
          weekStats[statIndex].days.push(weekDay.day);
        }
        else {
          weekStats.push({ count: weekDay.number, days: [weekDay.day] });
        }
      }
    });
    weekStats.sort(function(a,b) {
      return a.count > b.count ? -1 : a.count < b.count ? 1 : 0;
    });
    const maxCount = weekStats[0].count;

    let baseDays = [];
    // if there is only one of each, return empty array
    if (maxCount === 1) {
      return [];
    }
    else {
      weekStats.sort(function(a,b) {
        return a.days.length > b.days.length ? -1 : a.days.length < b.days.length ? 1 : 0;
      });
      const baseCount = weekStats[0].count;
      // if there is only one of each, return empty array
      if (baseCount === 1) {
        return [];
      }
      baseDays = weekStats[0].days;
      if (baseCount !== maxCount) {
        for (let i = baseCount+1; i <= maxCount; i++) {
          const statIndex = weekStats.findIndex(function(stat) {
            return stat.count === i ;
          })
          if (statIndex !== -1) {
            baseDays = baseDays.concat(weekStats[statIndex].days)
          }
        }
      }
      const statIndex = weekStats.findIndex(function(stat) {
        return stat.count === baseCount - 1;
      })
      if (statIndex !== -1) {
        baseDays = baseDays.concat(weekStats[statIndex].days)
      }
      if (baseCount > 4) {
        const statIndex = weekStats.findIndex(function(stat) {
          return stat.count === baseCount - 2;
        })
        if (statIndex !== -1) {
          baseDays = baseDays.concat(weekStats[statIndex].days)
        }
      }
    }
    baseDays.sort();

    return baseDays;
  },

  getDatesFromWeek: function(dateFrom, dateTo, weekDays) {
    const dates = [];
    for (let i = 0; (dateFrom.getTime() + i * 86400000) <= dateTo.getTime(); i++) {
      const date = new Date(dateFrom.getFullYear(), dateFrom.getMonth(), dateFrom.getDate() + i, dateFrom.getHours(), dateFrom.getMinutes());
      if (weekDays.includes(date.getDay())) {
        dates.push(date);
      }
    }
    return dates;
  },

  getExtraDates: function(baseDates, dates) {
    const dateFrom = dates[0];
    const dateTo = dates[dates.length-1];
    const datesToAdd = [];
    const datesToRemove = [];
    for (let i = 0; (dateFrom.getTime() + i * 86400000) <= dateTo.getTime(); i++) {
      const date = new Date(dateFrom.getFullYear(), dateFrom.getMonth(), dateFrom.getDate() + i, dateFrom.getHours(), dateFrom.getMinutes());
      const foundInBase = baseDates.find(function(element) {
        return element.getTime() === date.getTime();
      });
      const foundInDates = dates.find(function(element) {
        return element.getTime() === date.getTime();
      });
      if (foundInBase && !foundInDates) {
        datesToRemove.push(date);
      }
      else if (!foundInBase && foundInDates) {
        datesToAdd.push(date);
      }
    }
    return { datesToAdd: datesToAdd, datesToRemove: datesToRemove} ;
  },

  getWeekData: function(weekDays) {
    if (weekDays.length === 1) {
      return [{ from: weekDays[0], to: weekDays[0] }];
    }
    else {
      const ranges = [];
      const daysLeft = weekDays.slice();
      for (let i = 0; i < weekDays.length; i++) {
        if (daysLeft.includes(weekDays[i])) {
          const range = [weekDays[i]];
          daysLeft.splice(i,1);
          if (weekDays[i] === 0) {
            for (let j = 0; (j < weekDays.length) && (weekDays[weekDays.length - j] === 6 - j); j++) {
              range.push(weekDays[weekDays.length - j]);
              const foundDay = daysLeft.findIndex(function(day) {
                return day === weekDays[weekDays.length - j];
              });
              daysLeft.splice(foundDay,1);
            }
          }
          for (let j = 1; (j < weekDays.length - i) && (weekDays[i + j] === weekDays[i] + j); j++) {
            range.push(weekDays[i + j]);
            const foundDay = daysLeft.findIndex(function(day) {
              return day === weekDays[i + j];
            });
            daysLeft.splice(foundDay,1);
          }
          range.sort(function(a,b) {
            return a > b ? 1 : a < b ? -1 : 0;
          })
          ranges.push({from: range[0], to: range[range.length-1]});
        }
      }
      return ranges;
    }
  },

  getShowsData: function(shows) {
    let allDatesToRemove = [];
    const datesList = [];
    const dateFrom = this.getFirstShow(shows);
    const dateTo = this.getLastShow(shows);

    shows.forEach(function(showTime, index) {
      const dates = this.getDatesFromStrings(showTime);
      dates.sort(function(a,b){
        return a>b ? 1 : a<b ? -1 : 0;
      });

      if (dates.length === 1) {
        datesList.push({
          time: showTime.time,
          dates: dates[0],
        });
      }
      else {
        const baseWeek = this.getBaseWeekFromDates(dates);
        if (baseWeek.length > 0) {
          const weekData = this.getWeekData(baseWeek);

          const baseDates = this.getDatesFromWeek(dateFrom, dateTo, baseWeek);
          const { datesToAdd, datesToRemove } = this.getExtraDates(baseDates, dates);
          allDatesToRemove = allDatesToRemove.concat(datesToRemove);

          datesList.push({
            time: showTime.time,
            regularWeek: weekData,
            datesToAdd: datesToAdd,
          });
        }
        else {
          datesList.push({
            time: showTime.time,
            regularWeek: null,
            datesToAdd: dates,
          });
        }
      }
    }, this);

    return {
      dateFrom: dateFrom,
      dateTo: dateTo,
      datesList: datesList,
      datesToRemove: allDatesToRemove,
    };
  },

  getDatesString: function(dates) {
    let datesString = ''
    dates.forEach(function(date, index, array) {
      const dateOptions = { day: 'numeric' };
      if (index === array.length - 1) {
        dateOptions.month = 'long';
        dateOptions.year = 'numeric';
        if (index !== 0) {
          datesString += ' et '
        }
      }
      else {
        if (index > 0) {
          datesString += ', '
        }
        if (date.getFullYear() !== array[index+1].getFullYear()) {
          dateOptions.year = 'numeric';
          dateOptions.month = 'long';
        }
        else if (date.getMonth() !== array[index+1].getMonth()) {
          dateOptions.month = 'long';
        }
      }
      datesString += date.toLocaleDateString('fr-FR', dateOptions);
    })
    return datesString;
  },

  getShowsByDate: function(spectacles, dateToMatch) {
    const shows = [];
    spectacles.forEach(function(spectacle) {
      if (spectacle.shows && !this.isCustomDate(spectacle.shows.customdate)
        && this.hasUpcomingShows(spectacle.shows.dates)) {
          if (this.hasUpcomingPreview(spectacle.shows.preview)) {
            const previewDate = new Date(spectacle.shows.preview)
            if (previewDate.getDate() === dateToMatch.getDate()
              && previewDate.getMonth() === dateToMatch.getMonth()
              && previewDate.getFullYear() === dateToMatch.getFullYear()) {
                let minutes = previewDate.getMinutes().toString();
                if (minutes.length === 1) {
                  minutes = '0' + minutes;
                }
                shows.push({
                  time: previewDate.getHours() + ':' + minutes,
                  spectacle: spectacle,
                })
            }
          }
          spectacle.shows.dates.forEach(function(date) {
            const days = this.getDatesFromStrings(date);
            days.forEach(function(day) {
              if (day.getDate() === dateToMatch.getDate()
                && day.getMonth() === dateToMatch.getMonth()
                && day.getFullYear() === dateToMatch.getFullYear()) {
                  shows.push({
                    time: date.time,
                    spectacle: spectacle,
                  })
              }
            })
          }, this)
      }
    }, this)
    shows.sort(function(showA,showB) {
      return showA.time > showB.time ? 1 : showA.time < showB.time ? -1 : 0;
    });

    return shows;
  },

  getSortedSpectacles: function(spectacles) {
    const allSpectacles = spectacles.edges.map(function(edge) {
      const spectacle = edge.node.frontmatter;
      spectacle.slug = edge.node.fields.slug;
      return spectacle;
    })
    const spectaclesNow = [];
    const spectaclesSoon = [];
    allSpectacles.forEach(function(spectacle) {
      if (spectacle.shows) {
        if (this.isCustomDate(spectacle.shows.customdate)) {
          spectaclesSoon.push(spectacle);
        }
        else if (this.hasUpcomingPreview(null, null, spectacle.shows.preview)) {
          const status = this.getStatus(spectacle.shows.dates, null);
          if (status === 'now') {
            spectaclesNow.push(spectacle);
          }
          else {
            spectaclesSoon.push(spectacle);
          }
        }
        else if (this.hasUpcomingShows(spectacle.shows.dates)) {
          const status = this.getStatus(spectacle.shows.dates, null, null);
          if (status === 'now') {
            let nextShow = null;
            spectacle.shows.dates.forEach(function(date) {
              let thisNextShow = null;
              const days = this.getDatesFromStrings(date);
              days.sort(function (a,b) {
                return a > b ? 1 : a < b ? -1 : 0;
              })
              const now = new Date();
              for (let i = 0; i < days.length - 1 && !thisNextShow ; i++) {
                if (days[i] <= now && days[i+1] >= now) {
                  thisNextShow = days[i+1];
                }
              }
              if (!thisNextShow) {
                thisNextShow = days[days.length -1];
              }
              if (!nextShow || nextShow > thisNextShow) {
                nextShow = thisNextShow;
              }
            }, this)
            spectacle.nextShow = nextShow;
            spectaclesNow.push(spectacle);
          }
          else {
            spectaclesSoon.push(spectacle);
          }
        }
      }
    }, this)
    //sort spectaclesNow
    spectaclesNow.sort(function(spectacleA, spectacleB) {
      const nextA = this.hasUpcomingPreview(spectacleA) ? new Date(spectacleA.shows.preview) : spectacleA.nextShow;
      const nextB = this.hasUpcomingPreview(spectacleB) ? new Date(spectacleB.shows.preview) : spectacleB.nextShow;
      return nextA > nextB ? 1 : nextA < nextB ? -1 : 0;
    }.bind(this))

    // sort spectaclesSoon
    // if it has a custom date use it, otherwise use first show
    spectaclesSoon.sort(function(spectacleA,spectacleB) {
      let dateA = null;
      let dateB = null;
      if (this.isCustomDate(spectacleA.shows.customdate)) {
        const split = spectacleA.shows.customdate.split('-');
        dateA = new Date(split[0],split[1]);
      }
      else if (this.hasUpcomingPreview(spectacleA.shows.preview)){
        dateA = new Date(spectacleA.shows.preview);
      }
      else {
        const showData = this.getShowsData(spectacleA.shows.dates);
        dateA = showData.dateFrom;
      }
      if (this.isCustomDate(spectacleB.shows.customdate)) {
        const split = spectacleB.shows.customdate.split('-');
        dateB = new Date(split[0],split[1]);
      }
      else if (this.hasUpcomingPreview(spectacleB.shows.preview)){
        dateB = new Date(spectacleB.shows.preview);
      }
      else {
        const showData = this.getShowsData(spectacleB.shows.dates);
        dateB = showData.dateFrom;
      }
      return dateA > dateB ? 1 : dateA < dateB ? -1 : 0;
    }.bind(this))
    const sortedSpectacles = spectaclesNow.concat(spectaclesSoon);
    return sortedSpectacles;
  },
}

export default Shows;
