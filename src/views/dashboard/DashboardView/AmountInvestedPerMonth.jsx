import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import {InvestmentContextConsumer} from '../../../context/InvestmentContext'

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const AmountInvestedPerMonth = ({ className, ...rest }) => {
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
              Amount being invested into the market per month
            </Typography>
            <InvestmentContextConsumer>
              {({ getAmountInvestedPerMonth }) => (
                <Typography
                  color="textPrimary"
                  variant="h3"
                >
                  £{getAmountInvestedPerMonth()}
                </Typography>
              )}
            </InvestmentContextConsumer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

AmountInvestedPerMonth.propTypes = {
  className: PropTypes.string
};

export default AmountInvestedPerMonth;
