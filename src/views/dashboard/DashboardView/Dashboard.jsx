import React from 'react';
import {
  Typography,
  Grid,
  makeStyles
} from '@material-ui/core';
import clsx from 'clsx';
import TakeHomeIncome from './TakeHomeIncome';
import NetWorth from './NetWorth';
import Fire from './Fire'
import TasksProgress from './NetWorthTotal';
import AmountInvestedPerMonth from './AmountInvestedPerMonth';
import TotalProfit from './ExpectedMonthlyIncome';
import { useInvestmentContext } from '../../../context/InvestmentContext';
import { useBudgetContext } from '../../../context/BudgetContext';
import { convertCompoundDataToGraph } from '../../../utils/convertCompoundDataToGraph';
import { convertInvestmentDataToFire } from '../../../utils/convertInvestmentDataToFire';
import TopBar from '../../../layouts/MainLayout/TopBar.js'

const useStyles = makeStyles((theme) => ({
  root: {},
  text: {
    color: theme.palette.text.primary
  },
  header: {
    color: theme.palette.text.primary
  },
}));

const Dashboard = ({ className, ...rest }) => {
  const classes = useStyles();

  const { investments, drawDownPercent } = useInvestmentContext();
  const { expenseTotal } = useBudgetContext();

  return (
    <div
      className={clsx(className)}
      {...rest}
    >
      <TopBar header="Dashboarding" />

      <Typography
        gutterBottom
        variant="body1"
      >
        Predict how your investments will mature over time
        </Typography>

      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          lg={9}
          md={12}
          xl={9}
          xs={12}
        >
          <NetWorth investmentData={convertCompoundDataToGraph(investments)} />
        </Grid>
        <Grid
          xs={12}
          md={12}
          lg={3}
          xl={3}
          item
          container
          spacing={3}
          justify="space-evenly"
          alignItems="stretch"
        >
          <Grid
            item
            xs={12}
            md={6}
            lg={12}
          >
            <AmountInvestedPerMonth />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={12}
          >
            <TasksProgress />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={12}
          >
            <TotalProfit />
          </Grid>
        </Grid>

        <Grid
          item
          lg={9}
          md={12}
          xl={9}
          xs={12}
        >
          <Fire drawDownPercent={drawDownPercent} fireData={convertInvestmentDataToFire(investments, drawDownPercent, expenseTotal)} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
