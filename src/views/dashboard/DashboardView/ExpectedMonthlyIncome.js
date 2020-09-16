import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { InvestmentContextConsumer } from '../../../context/InvestmentContext'
import {
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const ExpectedMonthlyIncome = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <InvestmentContextConsumer>
      {({ getExpectedInterestIncomeInXYears, yearsToMature }) => (
        <Card
          className={clsx(classes.root, className)}
          {...rest}
        >
          <CardContent>
            <Grid
              container
              direction="column"
              alignItems="center"
            >
              <Grid item>
                <Typography
                  align="center"
                  color="textSecondary"
                  gutterBottom
                  variant="h6"
                >
                  Expected Monthly Interest in {yearsToMature} Years
            </Typography>
              </Grid>
              <Grid item>
                <Typography
                  color="textPrimary"
                  variant="h3"
                >
                  £{getExpectedInterestIncomeInXYears()}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </InvestmentContextConsumer>
  );
};

ExpectedMonthlyIncome.propTypes = {
  className: PropTypes.string
};

export default ExpectedMonthlyIncome;
