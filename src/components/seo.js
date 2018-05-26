import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Dates from "../functions/dates";


class SEO extends React.Component {
  getTheaterJson(data) {
    return {
      "@context" : "http://schema.org",
      "@type" : "PerformingArtsTheater",
      "address" : {
        "@type" : "PostalAddress",
        "streetAddress" : data.address.street,
        "addressLocality" : data.address.city,
        "postalCode" : data.address.postalCode,
        "addressCountry" : "FR",
        "email" : data.contact.email,
        "telephone" : data.contact.landline,
      },
      "geo" : {
        "@type" : "GeoCoordinates",
        "latitude" : data.address.latitude,
        "longitude" : data.address.longitude,
      },
      "logo" : data.siteUrl.slice(0,-1) + data.images.logo,
      "maximumAttendeeCapacity" : "50",
      "description" : data.description,
      "image" : data.siteUrl.slice(0,-1) + data.images.inside,
      "name" : data.title,
      "url" : data.siteUrl,
      "potentialAction" : [
        {
          "@type" : "WatchAction",
          "object" : [
            {
              "@type" : "Thing",
              "name" : "Spectacle",
            },
            {
              "@type" : "Thing",
              "name" : "Art",
            },
          ],
        },
        {
          "@type" : "EatAction",
          "object" : {
            "@type" : "Thing",
            "name" : "Repas",
          },
        },
        {
          "@type" : "RentAction",
          "object" : [
            {
              "@type" : "Room",
              "name" : "Salle de spectacle",
            },
            {
              "@type" : "Place",
              "name" : "Théâtre",
            },
          ],
        },
        {
          "@type" : "BuyAction",
          "object" : {
            "@type" : "Room",
            "name" : "Spectacle",
          },
        },
      ],
    }
  }

  getCompanyJson(data) {
    const theater = this.getTheaterJson(data);

    return {
      "@context" : "http://schema.org",
      "@type" : "TheaterGroup",
      "founder" : {
        "@type" : "Person",
        "name" : data.company.creator,
      },
      "foundingDate" : data.company.creation,
      "location" : theater,
      "image" : data.siteUrl.slice(0,-1) + data.images.logo,
      "name" : data.company.Fullname,
      "alternateName" : data.company.shortName,
      "url" : data.siteUrl,
    }
  }

  getSchoolJson(data) {
    const theater = this.getTheaterJson(data);

    return {
      "@context" : "http://schema.org",
      "@type" : "School",
      "location" : theater,
      "image" : data.siteUrl.slice(0,-1) + data.page.image,
      "name" : data.title,
      "url" : data.page.url,
      "potentialAction" : {
        "@type" : "ConsumeAction",
        "object" : {
          "@type" : "Course",
          "name" : data.page.title,
          "description" : data.page.description,
          "audience" : {
            "@type" : "Audience",
            "audienceType" : [
              "comédiens",
              "acteurs",
            ],
          },
          "timeRequired" : "P2Y",
          "provider" : {
            "@type" : "Person",
            "name" : "Hazem El Awadly",
          }
        },
      },
    }
  }

  getWebsiteJson(data) {
    const theater = this.getTheaterJson(data);

    return {
      "@context" : "http://schema.org",
      "@type" : "Website",
      "about" : theater,
      "image" : data.siteUrl.slice(0,-1) + data.images.logo,
      "name" : data.title,
      "description": data.description,
      "url" : data.siteUrl,
    }
  }

  getPlayJson(data) {
    const audience = data.spectacle.categories.find(function(category) {
      return (category === 'Tout public' || category === 'Jeune public' || category === 'Adulte');
    });
    let typicalAgeRange = '';
    let isFamilyFriendly = 'false';
    if (audience === 'Tout public') {
      typicalAgeRange = '3-';
      isFamilyFriendly = 'true';
    }
    else if (audience === 'Jeune public') {
      typicalAgeRange = '3-12';
      isFamilyFriendly = 'true';
    }
    else if (audience === 'Adulte') {
      typicalAgeRange = '16-';
    }

    const json = {
      "@context" : "http://schema.org",
      "@type" : "CreativeWork",
      "image" : data.siteMetadata.siteUrl.slice(0,-1) + data.spectacle.poster.full.sizes.src,
      "name" : data.spectacle.title,
      "description": data.spectacle.overview,
      "url" : data.siteMetadata.siteUrl.slice(0,-1) + data.spectacle.slug,
      "audience" : {
        "@type" : "Audience",
        "audienceType" : audience,
      },
      "isFamilyFriendly" : isFamilyFriendly,
      "typicalAgeRange" : typicalAgeRange,
      "thumbnailUrl" : data.siteMetadata.siteUrl.slice(0,-1) + data.spectacle.image.full.sizes.src,
    };

    if (data.spectacle.trailer) {
      json.video = {
        "@type" : "VideoObject",
        "url" : data.spectacle.trailer,
      }
    }

    return json;
  }

  getEventsJson(data) {
    const theater = this.getTheaterJson(data.siteMetadata);
    const json = [];

    data.spectacles.forEach(function(spectacle) {

      if (spectacle.shows.dates && spectacle.shows.dates.length > 0){
        const playData = {
          siteMetadata: data.siteMetadata,
          spectacle: spectacle,
        }
        const playJson = this.getPlayJson(playData);

        const performers = [];
        spectacle.cast.forEach(function(member) {
          performers.push({
            "@type" : "Person",
            "name" : member.names,
            "jobTitle" : member.role,
          });
        });

        spectacle.shows.dates.forEach(function(date) {
          const duration = {
            hours: parseInt(spectacle.duration.time.split(':')[0]),
            minutes: parseInt(spectacle.duration.time.split(':')[1]),
          }
          duration.string = 'PT' + duration.hours + 'H' + duration.minutes + 'M';

          date.days.forEach(function(day) {
            const startTime = new Date(day + 'T' + date.time + ':00');
            const { endTime } = Dates.getStartEndTimes (startTime, date.time, spectacle.duration.time);
            const doorTime = day + 'T' + (parseInt(date.time.split(':')[0])-1) + ':' + date.time.split(':')[1] + ':00';
            const event = {
              "@context" : "http://schema.org",
              "@type" : "TheaterEvent",
              "location" : theater,
              "image" : data.siteMetadata.siteUrl.slice(0,-1) + spectacle.poster.full.sizes.src,
              "name" : spectacle.title,
              "description": spectacle.overview,
              "doorTime" : doorTime,
              "duration" : duration.string,
              "startDate" : startTime.toISOString(),
              "endDate" : endTime.toISOString(),
              "performer" : performers,
              "workPerformed": playJson,
            };
            if (spectacle.shows.reservation) {
              event.offers = {
                "@type" : "offer",
                "url" : spectacle.shows.reservation,
              }
            }

            json.push(event);
          });
        }, this);
      }
    }, this);

    return json;
  }

  getJsonLD(type, data) {
    let jsonLD = null;
    if (type === 'theater') {
      jsonLD = this.getTheaterJson(data);
    }
    else if (type === 'company') {
      jsonLD = this.getCompanyJson(data);
    }
    else if (type === 'school') {
      jsonLD = this.getSchoolJson(data);
    }
    else if (type === 'website') {
      jsonLD = this.getWebsiteJson(data);
    }
    else if (type === 'play') {
      jsonLD = this.getPlayJson(data);
    }
    else if (type === 'events') {
      jsonLD = this.getEventsJson(data);
    }

    return jsonLD;
  }

  render() {
    const { title, slug, description, image, siteMetadata, jsonType, jsonData } = this.props;
    const pageTitle = title !== siteMetadata.title ?
      siteMetadata.title + siteMetadata.titleSeparator + title
      : title;
    const pageUrl = slug !== siteMetadata.siteUrl ?
      siteMetadata.siteUrl.slice(0,-1) + slug
      : slug;
    const pageImage = siteMetadata.siteUrl.slice(0,-1) + image;
    if (jsonData) {
      jsonData.page = {
        title: pageTitle,
        url: pageUrl,
        image: pageImage,
        description: description,
        slug: slug,
      };
    }
    const jsonLD = jsonType ? this.getJsonLD(jsonType, jsonData) : null;

    return (
      <Helmet>
        <meta name="description" content={description} />
        <meta name="image" content={pageImage} />
        {/* Schema.org tags */}
        {jsonLD ? (
          <script type="application/ld+json">
            {JSON.stringify(jsonLD)}
          </script>
        )
        : null }
        {/* OpenGraph tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={pageImage} />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={"@" + siteMetadata.contact.socialUsername} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={pageImage} />
      </Helmet>
    )
  }
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  siteMetadata: PropTypes.object.isRequired,
  jsonType: PropTypes.string,
  jsonData: PropTypes.object,
}

export default SEO;
