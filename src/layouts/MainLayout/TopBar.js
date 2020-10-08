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
  IconButton
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useMobileContext } from '../../context/MobileContext';


const useStyles = makeStyles(theme => ({
  root: {},
  toolbar: {
    backgroundColor: theme.palette.background.default
  },
  text: {
    color: theme.palette.text.primary
  },
  button: {
    marginLeft: 'auto',
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

            <Box mt={3} ml={32}>
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

            <Box display='flex' flexGrow={1}>
              <Box  mt={3}>
              <Typography
                className={classes.text}
                align="left"
                gutterBottom
                variant="h1"
              >
                {header}
              </Typography>
              </Box>
              <Box display='flex' flexGrow={1}  mt={2}>
                <IconButton
                  className={classes.button}
                  color="inherit"
                  onClick={() => toggleMobileNav(!isMobileNavOpen)}
                >
                  <MenuIcon fontSize="large" className={classes.button} />
                </IconButton>
                </Box>
            </Box>
          </Hidden>

        </Toolbar>
      </AppBar>
      <Box mt={7} />
    </>
  );
};

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;
