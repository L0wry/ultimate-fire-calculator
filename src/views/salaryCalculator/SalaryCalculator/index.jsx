import React from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import IncomeDetails from './IncomeDetails';
import IncomeTaxCard from './IncomeTaxCard'
import NationalInsurance from './NationalInsuranceCard'
import BreakdownCard from './BreakdownCard';
import { useSalaryContext } from '../../../context/SalaryContext';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SalaryCalculator = () => {
  const classes = useStyles();

  const { setUserFinances, userTax } = useSalaryContext();

  return (
    <Page
      className={classes.root}
      title="Salary Calculator"
    >
      <Container maxWidth={false}>
        <IncomeDetails userTax={userTax} setUserFinances={setUserFinances} />
        {userTax.salary && (
          <Box mt={3} >
            <Grid
              container
              justify="space-evenly"
              // alignItems="stretch"
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
            </Grid>
            {/* <BreakdownCard /> */}
          </Box>
        )}

      </Container>
    </Page>
  );
};

export default SalaryCalculator;
