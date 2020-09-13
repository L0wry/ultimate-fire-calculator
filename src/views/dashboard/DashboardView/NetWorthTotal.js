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

const NetWorthTotal = ({ className, ...rest }) => {
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
              Total Net Worth in 20 Years
            </Typography>
            <InvestmentContextConsumer>
              {({ getTotalNetWorthInXYears }) => (
                <Typography
                  color="textPrimary"
                  variant="h3"
                >
                  £{getTotalNetWorthInXYears(20)}
                </Typography>
              )}
            </InvestmentContextConsumer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

NetWorthTotal.propTypes = {
  className: PropTypes.string
};

export default NetWorthTotal;
