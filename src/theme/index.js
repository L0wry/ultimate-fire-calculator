import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';


const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#eeeeee',
      default: '#FFFFFF',
      paper: '#FFFFFF'
    },
    primary: {
      main: '#AC9CF8'
    },
    secondary: {
      main: '#AC9CF8'
    },
    text: {
      primary: '#AC9CF8',
      secondary: '#4F5E71',
      tertiary: '#FFFFFF'
    },
  },
  shadows,
  typography
});

export default theme;
