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
import { InvestmentContextConsumer } from '../../../context/InvestmentContext'

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const AmountInvestedPerMonth = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <InvestmentContextConsumer>
      {({ getAmountInvestedPerMonth }) => (
        <Card
          className={clsx(classes.root, className)}
          {...rest}
        >
          <CardContent>
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Grid item>
                <Typography
                  align="center"
                  color="textSecondary"
                  variant="h6"
                >
                  Amount being invested into the market per month
                </Typography>
                </Grid>
                <Grid item> 
                
                <Typography
                  gutterBottom
                  color="textPrimary"
                  variant="h3"
                >
                  £{getAmountInvestedPerMonth()}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card >
      )}
    </InvestmentContextConsumer>
  );
};

AmountInvestedPerMonth.propTypes = {
  className: PropTypes.string
};

export default AmountInvestedPerMonth;
