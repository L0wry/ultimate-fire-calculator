import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      default: colors.common.dark,
      paper: colors.grey[900]
    },
    primary: {
      main: colors.lightBlue[700]
    },
    secondary: {
      main: colors.grey[100]
    },
    text: {
      primary: colors.grey[100],
      secondary: colors.grey[100]
    }
  },
  shadows,
  typography
});

export default theme;
