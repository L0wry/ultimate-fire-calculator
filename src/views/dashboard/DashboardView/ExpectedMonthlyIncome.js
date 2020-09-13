import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {InvestmentContextConsumer} from '../../../context/InvestmentContext'
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
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              Expected Monthly Income in 20 years
            </Typography>
            <InvestmentContextConsumer>
              {({ getExpectedMonthlyIncomeInXYears }) => (



                <Typography
                  color="textPrimary"
                  variant="h3"
                >
                  £{getExpectedMonthlyIncomeInXYears(20)}
                </Typography>
              )}
            </InvestmentContextConsumer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

ExpectedMonthlyIncome.propTypes = {
  className: PropTypes.string
};

export default ExpectedMonthlyIncome;
