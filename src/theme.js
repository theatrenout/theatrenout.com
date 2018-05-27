import "typeface-suez-one";

const theme = {
  color: {
    default: '#444444',
    primary: '#1e2c88',
    lighter: 'white',
    light: '#c6c9dc',
    darker: 'black',
    dark: 'rgba(0,0,0,.8)',
    important: 'red',
  },
  opacity: {
    transparent: '.8',
    faded: '.5',
  },
  boxShadow: '0 0 10px',
  font: {
    primary: 'Suez One',
    secondary: 'Open Sans',
    tertiary: 'Arial',
    fallback: 'sans-serif',
    primaryAll: '"Suez One", "Open Sans", Arial, sans-serif',
    secondaryAll: '"Open Sans", Arial, sans-serif',
  },
  media: {
    desktop: '@media (min-width: 769px)'
  }
}

export default theme;
