import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  makeStyles,
  Typography,
  Box,
  Hidden,

} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useMobileContext } from '../../context/MobileContext';


const useStyles = makeStyles(theme => ({
  root: {},
  toolbar: {
    height: 64,
    backgroundColor: theme.palette.background.default
  },
  text: {
    color: theme.palette.text.primary
  },
  button: {
    color: theme.palette.text.primary
  }
}));

const TopBar = ({ className, header, ...rest }) => {
  const classes = useStyles();

  const {
    isMobileNavOpen, toggleMobileNav
  } = useMobileContext();


  return (
    <>
      <AppBar
        className={clsx(classes.root, className)}
        elevation={0}
        {...rest}
      >
        <Toolbar className={classes.toolbar}>
          <Hidden mdDown>

            <Box mt={6} mb={3} ml={32}>
              <Typography
                className={classes.text}
                align="left"
                gutterBottom
                variant="h1"
              >
                {header}
              </Typography>
            </Box>
          </Hidden>

          <Hidden lgUp>

            <Box mt={6} mb={3} >
              <Typography
                className={classes.text}
                align="left"
                gutterBottom
                variant="h1"
              >
                {header}
              </Typography>
              <MenuIcon fontSize="large" className={classes.button} onClick={() => toggleMobileNav(!isMobileNavOpen)} />

            </Box>
          </Hidden>

        </Toolbar>
      </AppBar>
      <Box mt={6} />
    </>
  );
};

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;
