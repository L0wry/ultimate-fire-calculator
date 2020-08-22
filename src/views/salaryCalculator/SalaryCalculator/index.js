import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import UserFinance from './IncomeDetails';
import ProductCard from './ProductCard';
import IncomeTaxCard from './IncomeTaxCard'
import NationalInsurance from './NationalInsuranceCard'

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
      <Container maxWidth={false}>
        <UserFinance />
        <Box mt={2} >
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={6}
              md={6}
              xs={12}
            >
              <IncomeTaxCard />
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
        </Box>
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Page>
  );
};

export default SalaryCalculator;
