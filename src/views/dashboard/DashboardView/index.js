import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import TakeHomeIncome from './TakeHomeIncome';
import NetWorth from './NetWorth';
import TasksProgress from './NetWorthTotal';
import AmountInvestedPerMonth from './AmountInvestedPerMonth';
import TotalProfit from './ExpectedMonthlyIncome';
import TrafficByDevice from './SavingPercentage';
import { useInvestmentContext } from '../../../context/InvestmentContext';
import { convertCompoundDataToGraph } from '../../../utils/convertCompoundDataToGraph';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  const { investments } = useInvestmentContext();

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TakeHomeIncome />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <AmountInvestedPerMonth />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TasksProgress />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalProfit />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <NetWorth investmentData={convertCompoundDataToGraph(investments)} />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
