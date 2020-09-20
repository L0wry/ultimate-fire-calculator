import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
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

  const { investments, drawDownPercent } = useInvestmentContext();
  const { expenseTotal } = useBudgetContext();

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
              xs={12}
              md={6}
              lg={12}
              item
            >
              <TakeHomeIncome />
            </Grid>
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

    
        
       
      </Container>
    </Page>
  );
};

export default Dashboard;
