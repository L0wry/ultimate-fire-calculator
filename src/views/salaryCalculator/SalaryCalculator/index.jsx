import React from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import UserFinance from './IncomeDetails';
import IncomeTaxCard from './IncomeTaxCard'
import NationalInsurance from './NationalInsuranceCard'
import BreakdownCard from './BreakdownCard';
import { SalaryContextConsumer } from '../../../context/SalaryContext';
import { InvestmentContextConsumer } from 'src/context/InvestmentContext';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const SalaryCalculator = () => {
  const classes = useStyles();


  return (
    <Page
      className={classes.root}
      title="Salary Calculator"
    >
      <SalaryContextConsumer>
        {
          ({ setUserFinances, userTax }) => (
            <Container maxWidth={false}>
              <UserFinance setUserFinances={setUserFinances}/>
              <Box mt={2} >
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="stretch"
                  spacing={3}

                >
                  <Grid
                    item
                    lg={6}
                    md={6}
                    xs={12}
                  >

                    <IncomeTaxCard userTax={userTax} />


                  </Grid>
                  <Grid
                    item
                    lg={6}
                    md={6}
                    xs={12}
                  >
                    <NationalInsurance />
                  </Grid>

                  <Grid
                    item
                    lg={12}
                    md={12}
                    xs={12}
                  >
                    <BreakdownCard />

                  </Grid>
                </Grid>
              </Box>
            </Container>

          )}

      </SalaryContextConsumer>
    </Page>
  );
};

export default SalaryCalculator;
