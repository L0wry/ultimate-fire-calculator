import React from 'react';
import PropTypes from 'prop-types';
import { useInvestmentContext } from '../../../context/InvestmentContext'
import {
  Box,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';

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
    <Box  className={classes.box}  boxShadow={20} padding={3}>

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
            Expected Monthly Interest in {yearsToMature} Years
        </Typography>
        </Grid>
        <Grid item>
          <Typography
            className={classes.text}
            variant="h3"
          >
            £{getExpectedInterestIncomeInXYears().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Typography>
        </Grid>
      </Grid>
    </Box >
  );
};

ExpectedMonthlyIncome.propTypes = {
  className: PropTypes.string
};

export default ExpectedMonthlyIncome;
