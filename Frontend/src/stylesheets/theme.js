import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    // primary: {
    //   main: '#585C64', //727884
    //   light: '#718792',
    //   dark: '#383C44',
    //   contrastText: '#FFF',
    // },
    // primary2: {
    //   main: '#455a64',
    //   light: '#718792',
    //   dark: '#1c313a',
    //   contrastText: '#FFF',
    // },
    // secondary: {
    //   main: '#0277bd',
    //   light: '#58a5f0',
    //   dark: '#004c8c',
    //   contrastText: '#FFF',
    // },
    primary: {
      main: '#919090',
      light: '#CFCAC7',
      dark: '#566066',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#DDBC95',
      light: '#F0E0C9',
      dark: '#B38867',
      contrastText: '#000',
    },
    white: {
      main: '#FFF',
    },
    black: {
      main: '#000',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1264,
      xl: 1904,
    },
  },
});

export default theme;
