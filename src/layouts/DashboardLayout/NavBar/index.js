import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Drawer,
  Hidden,
  List,
  makeStyles,
  Grid,
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  TrendingUp,
  Home,
  HelpCircle,
  ShoppingCart
} from 'react-feather';
import NavItem from './NavItem';
import { SelectYears } from './SelectYears';
import { SelectSafeWithdrawalPercent } from './SelectSafeWithdrawalPercent';
import {ReactComponent as PoundSign} from './pound.svg'

import ExpectedMonthlyIncome from '../../../views/dashboard/DashboardView/ExpectedMonthlyIncome';
import NetWorthTotal from '../../../views/dashboard/DashboardView/NetWorthTotal';
import AmountInvested from '../../../views/dashboard/DashboardView/AmountInvestedPerMonth';
import RetiringIn from '../../../views/dashboard/DashboardView/RetiringIn';

const items = [
  {
    href: '/app/salary-calculator',
    icon: PoundSign,
    title: 'Calculate Salary'
  },
  {
    href: '/app/debt',
    icon: Home,
    title: 'Add Debt'
  },
  {
    href: '/app/budget',
    icon: ShoppingCart,
    title: 'Create Budget'
  },

  {
    href: '/app/investments',
    icon: TrendingUp,
    title: 'Add Investments'
  },
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'View Dashboard'
  },
  // {
  //   href: '/app/help',
  //   icon: HelpCircle,
  //   title: 'Help'
  // }
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
        {items.map((item) => (
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
          spacing={1}
          container
          direction="column"
          justify="flex-end"
          alignItems="stretch"
        >
          <Grid item>
            <SelectYears />
          </Grid>
          <Grid item>
            <SelectSafeWithdrawalPercent />
          </Grid>
          <Grid
            item
          >
            <RetiringIn />
          </Grid>
          <Grid
            item
          >
            <ExpectedMonthlyIncome />

          </Grid>
          <Grid
            item
          >
            <NetWorthTotal />

          </Grid>
          <Grid
            item
          >
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
