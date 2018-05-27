import Shows from "./shows";
import { MONTHS_LONG } from "../locale/fr_FR";

const Spectacle = {
  getTags: function(categories, duration, shows, notice, creation, exclude = []) {
    let tags = [];
    if (shows) {
      const status = Shows.getStatus(shows.dates, shows.customdate);
      if (status != null) {
        if (status === 'now') {
          tags.push({type: 'status', icon: 'calendar', color: 'green', text: 'En ce moment'});
        }
        else if (status === 'soon') {
          tags.push({type: 'status', icon: 'calendar', color: 'orangered', text: 'Bientôt'});
        }
      }
    }
    if (categories) {
      tags = tags.concat(categories.map(this.mapCategoriesIcons));
    }
    if (duration && duration.time) {
      var durationString = '';
      let durationArray = duration.time.split(':');
      let hours = parseInt(durationArray[0]).toString();
      let minutes = parseInt(durationArray[1]).toString();
      if (hours > 0) {
        if (hours == 1) {
          durationString = '1 heure';
        }
        else {
          durationString = hours + ' heures';
        }
        if (minutes > 0) {
          durationString += ' et ';
        }
      }
      if (minutes > 0) {
        if (minutes == 1) {
          durationString += '1 minute';
        }
        else {
          durationString += minutes + ' minutes';
        }
      }
      if (duration.intermission) {
        durationString += ' avec entracte';
      }
      tags.push({type: 'duration', icon: 'clock', color: null, text: 'Durée : ' + durationString});
    }
    if (creation) {
      const creationArray = creation.split('-');
      tags.push({type: 'creation', icon: 'creation', color: null, text: 'Créé en ' + MONTHS_LONG[parseInt(creationArray[1])-1] + ' ' + creationArray[0] });
    }
    if (notice) {
      tags.push({type: 'notice', icon: 'warning', color: 'red', text: notice});
    }
    exclude.forEach(function(tagToExclude) {
      const tagIndex = tags.findIndex(function(tag) {
        return tag.type === tagToExclude;
      })
      if (tagIndex != -1) {
        tags.splice(tagIndex,1);
      }
    })
    return tags;
  },

  mapCategoriesIcons: function(category) {
    if (category === 'Troupe') {
      return {type: category, icon: 'star', color: '#e8af0c', text: category};
    }
    else {
      return {type: category, icon: 'people', color: null, text: category};
    }
  },
}

export default Spectacle;
