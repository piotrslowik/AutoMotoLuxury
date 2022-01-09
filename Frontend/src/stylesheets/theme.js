import { createTheme } from '@mui/material/styles';
import { plPL } from '@mui/material/locale';

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
      main: '#8A8A91',
      light: '#CFCAC7',
      dark: '#566066',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#FFBF60',
      light: '#FAD5A5',
      dark: '#E3963E',
      contrastText: '#333',
    },
    white: {
      main: '#FFF',
    },
    black: {
      main: '#000',
    },
    error: {
      main: '#F00',
      light: '#F33',
      dark: '#D00',
      contrastText: '#FFF',
    }
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
  plPL,
});

export default theme;
