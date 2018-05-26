import React from "react";
import Typography from "typography";

import theme from "../theme";


const typography = new Typography({
  headerFontFamily: [theme.font.primary, theme.font.secondary, theme.font.tertiary, theme.font.fallback],
  headerWeight: 'normal',
  bodyFontFamily: [theme.font.secondary, theme.font.tertiary, theme.font.fallback],
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    body: {
      margin: 0,
      color: theme.color.default,
    },
    'body,html,#___gatsby': {
      height: '100%',
      overflow: 'auto'
    },
    'h1,h2,h3,a': {
      color: theme.color.primary,
    },
    a: {
      display: 'inline-block',
      minHeight: '48px',
      minWidth: '48px',
    },
    'figure,img,ul,li': {
      margin: 0,
    },
    p: {
      margin: '0 0 1rem',
    }
  })
})

export default typography;
