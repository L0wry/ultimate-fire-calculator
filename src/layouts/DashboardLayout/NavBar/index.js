import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Drawer,
  Hidden,
  List,
  makeStyles,
  Grid
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  TrendingUp,
  DollarSign,
  Download
} from 'react-feather';
import NavItem from './NavItem';
import { SelectYears } from './SelectYears'
import { SelectDrawDown } from './SelectDrawDown'

import ExpectedMonthlyIncome from '../../../views/dashboard/DashboardView/ExpectedMonthlyIncome';
import NetWorthTotal from '../../../views/dashboard/DashboardView/NetWorthTotal';
import AmountInvested from '../../../views/dashboard/DashboardView/AmountInvestedPerMonth';


const items = [
  {
    href: '/app/salary-calculator',
    icon: DollarSign,
    title: 'Salary Calculator'
  },
  {
    href: '/app/budget',
    icon: Download,
    title: 'Budget'
  },

  {
    href: '/app/investments',
    icon: TrendingUp,
    title: 'Investments'
  },
  {
    href: '/app/net-worth',
    icon: BarChartIcon,
    title: 'Net Worth'
  }
];

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  }
}));


const NavBar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const classes = useStyles();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (

    <Box p={2}>
      <List>
        {items.map((item) => (
          <NavItem
            href={item.href}
            key={item.title}
            title={item.title}
            icon={item.icon}
          />
        ))}
      </List>
     

      <Box mt={10}>

      <Grid
        spacing={3}
        container
        direction="column"
        justify="flex-end"
        alignItems="stretch"
      >
        <Grid item>
          <SelectYears/>
        </Grid>
        <Grid item>
          <SelectDrawDown/>
        </Grid>
          <Grid
            item >
            <ExpectedMonthlyIncome />

          </Grid>
          <Grid
            item >
            <NetWorthTotal />

          </Grid>
          <Grid
            item >
            <AmountInvested />

          </Grid>
      </Grid>
    </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default NavBar;
