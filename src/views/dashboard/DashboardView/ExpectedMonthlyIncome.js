import React from 'react';
import {
  Box,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useInvestmentContext } from '../../../context/InvestmentContext';

const useStyles = makeStyles((theme) => ({
  text: {
    color: theme.palette.text.tertiary
  },
  box: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const ExpectedMonthlyIncome = () => {
  const classes = useStyles();

  const { getExpectedInterestIncomeInXYears, yearsToMature } = useInvestmentContext();

  return (
    <Box className={classes.box} padding={3}>

      <Grid
        container
        direction="column"
        alignItems="center"
      >
        <Grid item>
          <Typography
            align="center"
            className={classes.text}
            gutterBottom
            variant="h5"
          >
            Expected Gross Monthly Income From Investments In
            {' '}
            {yearsToMature}
            {' '}
            {yearsToMature === 1 ? 'year' : 'years'}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            className={classes.text}
            variant="h3"
          >
            £
            {getExpectedInterestIncomeInXYears().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExpectedMonthlyIncome;
