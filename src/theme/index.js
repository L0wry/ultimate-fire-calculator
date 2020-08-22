import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      default: colors.common.dark,
      paper: colors.common.grey
    },
    primary: {
      main: colors.lightBlue[700]
    },
    secondary: {
      main: colors.common.black
    },
    text: {
      primary: colors.common.black,
      secondary: colors.common.black
    }
  },
  shadows,
  typography
});

export default theme;
