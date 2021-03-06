import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";


const IconSVG = styled.svg`
  fill: currentColor;
`

class Icon extends React.Component {
  iconPath = {
    prev: {
      viewBox: '0 0 69 128',
      path: (
        <path d="M62 8c3-2 3-4 0-6-2-3-4-3-6 0L2 56c-3 2-3 5 0 7l54 54c2 3 4 3 6 0 3-2 3-4 0-6L13 59zm0 0"/>
      ),
    },
    next: {
      viewBox: '0 0 69 128',
      path: (
        <path d="M2 8c-3-2-3-4 0-6 2-3 4-3 6 0l54 54c3 2 3 5 0 7L8 117c-2 3-4 3-6 0-3-2-3-4 0-6l49-52zm0 0"/>
      ),
    },
    warning: {
      viewBox: '0 0 256 228',
      path: (
        <path d="M128 26c-8 0-15 5-20 14L31 168c-5 9-6 17-3 24 4 6 11 10 22 10h156c11 0 18-4 22-10 4-7 3-15-3-24L148 40c-5-9-12-14-20-14zm0-26c18 0 32 9 42 27l77 128c11 17 12 34 3 49-8 16-23 24-44 24H50c-20 0-35-8-44-24-9-15-8-31 3-49L86 27C96 9 110 0 128 0zm-17 163c0-12 6-18 17-18s17 6 17 18c0 11-6 16-17 16s-17-5-17-16zm36-78l-1 7-18 45a56626 56626 0 0 0-19-52c0-6 1-10 5-14s9-6 14-6c6 0 10 2 14 6s5 9 5 14zm0 0"/>
      ),
    },
    photo: {
      viewBox: '0 0 128 122',
      path: (
        <path d="M110 39H97L81 20 54 39H31c-5 0-9 2-12 5-3 4-5 8-5 12v21L0 39c-1-4 0-6 3-7L90 0c3-1 5 0 7 3zm13 12l4 1 1 4v60l-1 4-4 2H31l-4-2-1-4V56l1-4 4-1zm-7 58V88l-9-20-21 7-17 17-18-22-12 28v11zm0 0"/>
      ),
    },
    close: {
      viewBox: '0 0 32 32',
      path: (
        <path d="M32 6l-1-2-3-3-2-1-2 1-8 8-8-8-2-1-2 1-3 3-1 2 1 2 8 8-8 8-1 2 1 2 3 3 2 1 2-1 8-8 8 8 2 1 2-1 3-3 1-2-1-2-8-8 8-8 1-2zm0 0"/>
      ),
    },
    share: {
      viewBox: '0 0 128 144',
      path: (
        <path d="M104 48c7 0 12-2 17-7 5-4 7-10 7-17s-2-12-7-17-10-7-17-7-12 2-17 7a23 23 0 0 0-7 19v2L39 53a24 24 0 0 0-32 2c-5 5-7 10-7 17s2 12 7 17 10 7 17 7c6 0 11-2 15-5l41 25v4c0 7 2 12 7 17s10 7 17 7 12-2 17-7c5-4 7-10 7-17s-2-12-7-17-10-7-17-7c-6 0-10 2-14 5L48 76v-4-4l42-25c3 3 8 5 14 5zm0 0"/>
      ),
    },
    calendar: {
      viewBox: '0 0 64 64',
      path: (
        <path d="M57 7l5 2 2 5v43l-2 5-5 2H7l-5-2-2-5V14l2-5 5-2h3v7h12V7h20v7h12V7zm0 50V28H7v29zM18 0v12h-4V0zm32 0v12h-4V0zm0 0"/>
      ),
    },
    people: {
      viewBox: '0 0 128 113',
      path: (
        <path d="M128 113H99V93c0-4-1-8-4-10L76 72c3-3 5-6 5-11l-2-4-2-7-2-2c-1-1-2-2-2-5l2-4-1-8c-1-3 0-6 3-10 2-3 6-5 12-5s10 2 12 5c3 4 4 7 3 10l-1 8 2 4c0 3-1 4-2 5l-2 2-2 7-2 4c0 4 1 6 3 8l10 7c9 3 15 7 16 10l1 8 1 12zM66 79c15 7 23 12 23 16v18H0V89c0-4 4-7 11-10 6-3 11-5 13-8s4-7 4-11l-3-6-3-9-2-3c-2-1-3-3-3-7l1-3v-1l1-1-1-10c-1-4 1-9 4-13 3-5 8-7 16-7s13 2 16 7c4 4 5 9 5 13l-2 10c2 1 2 3 2 5 0 4-1 6-2 7l-3 3c0 4-1 7-3 9s-2 4-2 6c0 4 1 8 3 11 3 3 7 5 14 8zm0 0"/>
      ),
    },
    info: {
      viewBox: '0 0 128 128',
      path: (
        <path d="M63 0c18 0 33 6 46 18 12 12 19 27 19 45s-6 33-18 45a62 62 0 0 1-45 20c-18 0-33-6-46-18A61 61 0 0 1 0 65c0-18 6-33 18-46C31 7 46 0 63 0zm7 21c-3 0-7 1-9 3l-3 7 2 7 7 2c4 0 6-1 9-3 2-2 3-5 3-8 0-5-3-8-9-8zm-16 83c2 0 6-1 11-4 5-2 10-6 15-11l-2-3-10 5c-2 0-2-2-1-5l6-23c2-8 1-13-3-13-3 0-7 1-13 4L41 65l3 3 10-5v5l-5 21c-2 10-1 15 5 15zm0 0"/>
      ),
    },
    clock: {
      viewBox: '0 0 16 16',
      path: (
        <path d="M16 8a7.8 7.8 0 0 1-4 7c-1.2.6-2.6 1-4 1a7.8 7.8 0 0 1-7-4c-.6-1.2-1-2.6-1-4a7.8 7.8 0 0 1 4-7C5.2.5 6.6 0 8 0a7.8 7.8 0 0 1 7 4c.6 1.2 1 2.6 1 4zm-1.9 0a6 6 0 0 0-1.8-4.3A5.8 5.8 0 0 0 8 1.9 6 6 0 0 0 4.4 3 6 6 0 0 0 2 8c0 1.6.6 3 1.8 4.2A6 6 0 0 0 8 14.1a6 6 0 0 0 3.6-1.2A6 6 0 0 0 14 8zM11 11.2c0 .3-.1.5-.3.7a1 1 0 0 1-.7.3.9.9 0 0 1-.7-.3l-1.9-2c-.2-.1-.3-.5-.3-1V4c0-.3.1-.6.3-.7.2-.2.4-.3.7-.3.3 0 .5 0 .7.3.2.1.3.4.3.6v5l1.6 1.7c.2.2.3.4.3.7zm0 0"/>
      ),
    },
    maximise: {
      viewBox: '0 0 16 16',
      path: (
        <path d="M10 0h6v6l-2-2-3 3-2-2 3-3zM5 9l2 2-3 3 2 2H0v-6l2 2zm0 0"/>
      ),
    },
    minimise: {
      viewBox: '0 0 64 64',
      path: (
        <path d="M11 47l-7-8h21v21l-8-7L7 64l-7-7zM64 7L53 17l7 7H40V4l7 7L57 0zm0 0"/>
      ),
    },
    star: {
      viewBox: '0 0 16 16',
      path: (
        <path d="M16 6s0 .2-.3.4l-3.4 3.4.8 4.8v.2l-.1.3-.3.2-.4-.2L8 13 3.7 15l-.4.2c-.1 0-.2 0-.3-.2l-.1-.3v-.2l.8-4.8L.2 6.4 0 5.9c0-.2.2-.4.5-.4l4.9-.7L7.5.4c.2-.3.3-.4.5-.4s.3.1.5.4l2.1 4.4 4.8.7c.4 0 .6.2.6.4zm0 0"/>
      ),
    },
    back: {
      viewBox: '0 0 128 103',
      path: (
        <path d="M118 62c3 0 5-1 7-3s3-5 3-7c0-3-1-6-3-8s-4-3-7-3H40l23-23c2-2 3-5 3-8s-1-5-3-7-4-3-7-3-5 1-7 3L0 52l49 48c2 2 4 3 7 3s5-1 7-3 3-4 3-7-1-6-3-8L40 62zm0 0"/>
      ),
    },
    video: {
      viewBox: '0 0 64 46',
      path: (
        <path d="M64 39h-7v-6h7v-7h-7v-6h7v-7h-7V7h7V3l-1-2-2-1H3L1 1 0 3v4h7v6H0v7h7v6H0v7h7v6H0v4l1 2 2 1h58l2-1 1-2zM25 13l16 10-16 10zm0 0"/>
      ),
    },
    menu: {
      viewBox: '0 0 128 107',
      path: (
        <path d="M128 16V5l-2-3-3-2H5L2 2 0 5v11l2 4 3 1h118l3-1c2-1 2-3 2-4zm0 43V48l-2-4-3-1H5l-3 1-2 4v11l2 3c1 2 2 2 3 2h118l3-2c2-1 2-2 2-3zm0 42V91a5 5 0 0 0-5-6H5l-3 2-2 4v10l2 4 3 2h118l3-2c2-1 2-2 2-4zm0 0"/>
      ),
    },
    ticket: {
      viewBox: '0 0 128 128',
      path: (
        <path d="M74 30l24 24-44 44-24-24zm-16 75l47-47 1-4-1-3-28-28-3-1-4 1-47 47-1 4 1 3 28 28 3 1 4-1zm67-49l-69 69c-2 2-4 3-7 3-2 0-5-1-6-3l-10-9c3-3 4-7 4-11s-1-7-4-10-6-4-10-4-8 1-11 4L3 85c-2-1-3-4-3-6 0-3 1-5 3-7L72 3c2-2 4-3 7-3 2 0 5 1 7 3l9 9c-3 3-4 7-4 11s1 7 4 10 6 4 10 4 8-1 11-4l9 9c2 2 3 5 3 7 0 3-1 5-3 7zm0 0"/>
      ),
    },
    youtube: {
      viewBox: '0 0 256 310',
      path: (
        <path d="M163 215v36c0 8-2 12-7 12-2 0-5-1-7-4v-52l7-4c5 0 7 4 7 12zm59 0v8h-16v-8c0-8 2-12 8-12 5 0 7 4 8 12zM54 177h19v-16H19v16h18v99h17zm50 99h16v-86h-16v66c-3 4-6 7-10 7-2 0-3-1-3-4v-69H75v68l2 13c1 4 5 6 10 6s11-3 17-10zm75-26v-34l-2-17c-2-6-6-10-12-10s-11 4-16 10v-38h-16v115h16v-9c5 7 10 10 16 10s10-3 12-10c1-3 2-8 2-17zm58-2v-2h-16v11c-1 4-3 6-7 6-5 0-8-4-8-12v-15h31v-18c0-9-2-16-5-20-4-6-10-9-18-9s-14 3-19 9c-3 4-4 11-4 20v30c0 9 1 16 5 20 4 6 10 9 18 9s15-3 19-9c2-3 3-6 3-10l1-10zM132 91V54c0-8-3-12-8-12s-7 4-7 12v37c0 8 2 12 7 12s8-4 8-12zm124 129c0 27-1 48-4 61-2 7-5 12-11 17-5 5-11 7-17 8a905 905 0 0 1-192 0c-6-1-12-3-17-8-6-4-9-10-10-17-3-13-5-33-5-61 0-27 2-47 5-60a32 32 0 0 1 27-25 987 987 0 0 1 192 0c7 0 13 3 18 8 5 4 8 10 10 17 3 13 4 33 4 60zM84 0h17L80 69v47H63V69c-1-9-5-21-10-37L41 0h19l12 46zm64 58v30c0 9-2 16-5 20-5 6-11 9-19 9-7 0-13-3-18-9-3-4-4-11-4-20V58c0-10 1-17 4-21 5-6 11-9 18-9 8 0 14 3 19 9 3 4 5 11 5 21zm58-29v87h-16v-10c-6 7-12 11-18 11-5 0-9-2-10-6l-2-13V29h16v70c1 3 2 4 4 4 3 0 6-3 10-8V29zm0 0"/>
      ),
    },
    creation: {
      viewBox: '0 0 256 256',
      path: (
        <path d="M256 201v55H0v-55c4 0 8 0 12-2 4-1 7-2 8-4l7-5 8-6 8-1 6 1 5 2 4 4 7 5c1 2 4 3 8 4a37 37 0 0 0 25 0l8-4 7-5 4-4 5-2 6-1 8 1 7 6 7 5 8 4 13 2c4 0 8 0 12-2a982 982 0 0 0 15-9l7-6 9-1 7 1 8 6 7 5c1 2 4 3 8 4l12 2zm0-46v28a20 20 0 0 1-11-3 249 249 0 0 1-11-10l-8-3a36 36 0 0 0-25 0l-8 3-7 6-4 4-5 2-6 1-8-2-8-5-7-6-8-3a36 36 0 0 0-24 0l-8 3-7 6-5 4-4 2-6 1-9-2-7-5-7-6-8-3c-4-2-8-2-12-2-5 0-9 0-13 2a37 37 0 0 0-15 9l-7 5-8 2v-28c0-7 3-14 8-19s12-8 19-8h10V64h36v64h37V64h36v64h37V64h36v64h10c7 0 14 3 19 8s8 12 8 19zM73 32c0 7-1 13-5 17-3 4-8 6-13 6s-9-2-13-6c-4-3-5-7-5-12l1-8 3-5a68 68 0 0 0 9-8 25 25 0 0 0 5-16c4 0 8 4 12 10 4 7 6 15 6 22zm73 0c0 7-2 13-5 17s-8 6-13 6-9-2-13-6a19 19 0 0 1-4-20l3-5 5-4 4-4 4-7 1-9c4 0 8 4 12 10 4 7 6 15 6 22zm73 0c0 7-1 13-5 17-3 4-7 6-13 6-5 0-9-2-13-6a18 18 0 0 1-1-25 247 247 0 0 0 9-8l4-7 1-9c4 0 8 4 12 10 4 7 6 15 6 22zm0 0"/>
      ),
    },
    facebook: {
      viewBox: '0 0 64 64',
      path: (
        <path d="M60 0l3 1 1 3v56l-1 3-3 1H44V39h9l1-9H44v-7l1-3 4-1h5v-9h-7c-4 0-7 1-9 3-3 2-4 5-4 9v8h-8v9h8v25H4l-3-1-1-3V4l1-3 3-1zm0 0"/>
      ),
    },
    email: {
      viewBox: '0 0 32 32',
      path: (
        <path d="M32 11.7v17.5c0 .7-.3 1.4-.8 2-.6.5-1.3.8-2 .8H2.8c-.7 0-1.4-.3-2-.8-.5-.6-.8-1.3-.8-2V11.7c0-.2 0-.3.2-.4l.7-.7.7-.6.9-.7 1.2-1A208.1 208.1 0 0 0 8 5.1 578.3 578.3 0 0 1 14.8.3L16 0l1.3.3 1.1.7 1.2.9 1 .7a720 720 0 0 1 10.5 8l.7.7.2.4zM22 22a950.8 950.8 0 0 0 6.3-4.9l-.1-.4-.7-.9-.4-.2-.4.1a820.8 820.8 0 0 1-7 5.2l-1.3.9-1.1.6c-.6.3-1 .4-1.3.4l-1.2-.4a4 4 0 0 1-1.2-.6l-1.2-1-1-.6A432.6 432.6 0 0 1 5 15.7c-.2 0-.3 0-.4.2l-.7 1-.1.4a766 766 0 0 0 9.6 7.1l1.4.6a4.6 4.6 0 0 0 2.6 0l1.5-.7a26 26 0 0 0 3.1-2.2zm0 0"/>
      ),
    },
    nout: {
      viewBox: '0 0 32 9',
      path: (
        <path d="M15.7 0H1.6v7.5s0 .4.2.5c.2 0 .4-.4.4-.4l1.7-4H28l1.8 4s.2.4.4.4.2-.5.2-.5V0H16.3h-.6zm0 0"/>
      ),
    },
    theatrenout: {
      viewBox: '0 0 1020 140',
      path: (
        <path d="M742 0l-30 13 1 1a1057 1057 0 0 1-30 81c-6 12-11 19-16 24-5 4-10 6-15 6-7 0-15-4-22-12l-7-10a93 93 0 0 1-11-29l-22 15 6 29 2 7 8 5 17 7 18 3a45 45 0 0 0 29-12l10-10 9-15 12-22 22-46 14 92 33-26a603 603 0 0 1 16-77 223 223 0 0 1 8 25l15-18 5-26-5-5-28 16-12 29-9 27-2-53zM44 0a226 226 0 0 0-22 1L0 35a177 177 0 0 1 68-4l30 5-15 22a651 651 0 0 1-27 40l-13 19c-9-3-17-6-22-11l-10 21 5 4c1 3 3 5 5 5l7 2 10-3 6-6a130 130 0 0 0 16-18 944 944 0 0 0 19-26c15-21 28-37 38-49l18-4c8-9 14-18 20-28a268 268 0 0 1-60 2L79 3 44 0zm137 2l-26 8a4843 4843 0 0 1-2 94l27-3a190 190 0 0 1 0-22V60l8-10 4 14 3 18-4 35 25-18 1-17 2-16c0-9-2-15-5-19-3-3-10-7-21-10l-13 13V31zm98 2l-21 1-13 21 7 3zm54 1h-14l-17 21 6 2 13-15 16 15 11-5zm67 22a473 473 0 0 1-24 3v12l-8 14 8-1a227 227 0 0 1-2 25c0 12 8 21 25 25l13-20c-5-1-9-3-11-6-2-2-3-6-3-10l1-16 14-1 2-14h-16a98 98 0 0 0 1-11zm604 0a472 472 0 0 1-23 3v12l-8 14 8-1a227 227 0 0 1-3 25c0 12 9 21 25 25l13-20c-5-1-8-3-10-6-2-2-3-6-3-10V53l14-1 3-14h-16a98 98 0 0 0 0-11zm-80 8c-12 4-22 6-28 6l-2 37c0 6 1 11 3 15l6 6 13 5c9-7 16-11 20-12l-2 13 11-2 17-4a1283 1283 0 0 1 0-61 143 143 0 0 1-28 1 179 179 0 0 1 2 40c-2 2-5 6-10 9l-5-11c-2-3-2-6-2-10l1-11a238 238 0 0 0 4-21zm-457 0l-7 2-4 4-3 6-3 10-1-17-23-3-1 22v18c0 9 1 14 4 17l8 7c2 1 9 2 19 2l8-20-12-3-1-10 7-12 13 7 4-18 3-9c-4-2-7-3-11-3zm-220 2l-17 14v8l-1 13c0 10 1 17 3 20 2 4 4 7 7 9s9 3 16 3c13 0 23-8 28-24h-1c-4 4-9 7-15 7-5 0-9-4-14-10l4 1 11-1 16-7a151 151 0 0 1 2-18c0-3-1-6-4-9s-8-4-14-5zm252 0l-18 14v21c0 10 0 17 2 20 2 4 4 7 7 9 4 2 9 3 16 3 14 0 23-8 28-24h-1c-4 4-9 7-15 7-4 0-9-4-14-10l5 1 10-1 16-7a149 149 0 0 1 2-18c0-3-1-6-4-9s-7-4-14-5zm-182 0c-10 8-17 14-20 19s-4 11-4 19a129 129 0 0 0 2 26l14 5a810 810 0 0 0 25-28l-1 29 26-7-1-9 1-23-2-13c-1-4-3-6-5-8l-7-4-15-3-13-3zm524 1c-19 12-28 25-28 38 0 9 4 15 12 21 8 5 17 8 27 8l4-2 4-3 13-8c2-2 5-5 7-10l3-15c0-5-1-10-4-14-2-4-5-6-9-7l4-7a206 206 0 0 1-33-1zm0 13c5 1 9 3 13 6 4 4 6 9 6 17l-2 15c-14-3-21-11-21-24 0-5 2-10 4-14zm-588 1c4 0 7 1 9 4 2 2 4 5 4 9l-1 5-14 1zm251 0c4 0 7 1 9 4 3 2 4 5 4 9v5l-15 1zm-188 3c9 2 14 5 17 9a136 136 0 0 1-15 21zm0 0"/>
      ),
    },
  }

  render() {
    const { title, type, ...others} = this.props;
    return (
      <IconSVG
        xmlns="http://www.w3.org/2000/svg"
        aria-labelledby={title ? 'title-' + type : null}
        role={title ? null : 'presentation'}
        viewBox={this.iconPath[type].viewBox}
        {...others}
      >
        {title ? (
          <title id={'title-' + type}>{title}</title>
        )
        : null }
        {this.iconPath[type].path}
      </IconSVG>
    );
  }
}

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string,
}

export default Icon;
