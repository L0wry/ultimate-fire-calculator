import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Drawer,
  Hidden,
  List,
  makeStyles,
  Grid,
  Typography
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  TrendingUp,
  DollarSign,
  Download,
  HelpCircle
} from 'react-feather';
import NavItem from './NavItem';
import { SelectYears } from './SelectYears'
import { SelectSafeWithdrawalPercent } from './SelectSafeWithdrawalPercent'

import ExpectedMonthlyIncome from '../../../views/dashboard/DashboardView/ExpectedMonthlyIncome';
import NetWorthTotal from '../../../views/dashboard/DashboardView/NetWorthTotal';
import AmountInvested from '../../../views/dashboard/DashboardView/AmountInvestedPerMonth';
import RetiringIn from '../../../views/dashboard/DashboardView/RetiringIn';

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
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/help',
    icon: HelpCircle,
    title: 'Help'
  }
];

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256,
    backgroundColor: theme.palette.primary.main
  },
  desktopDrawer: {
    width: 256,
    backgroundColor: theme.palette.primary.main,
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

    <Box p={1}>
      <List>
        {items.map((item, i) => (
          <NavItem
            href={item.href}
            key={item.title}
            title={item.title}
            icon={item.icon}
            selected={location.pathname === item.href}
          />
        ))}
      </List>
     
      <Box mt={2}>

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
          <SelectSafeWithdrawalPercent/>
        </Grid>
          <Grid
            item >
            <RetiringIn />
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
          elevation={12}
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
          elevation={12}
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
