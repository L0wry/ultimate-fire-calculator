import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import { SalaryContextConsumer } from 'src/context/SalaryContext';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  }
}));

const TakeHomeIncome = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <SalaryContextConsumer>
      {context => (
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
                  color="textSecondary"
                  variant="h6"
                  >
                  Annual Take Home Pay
                </Typography>
                </Grid>

                <Grid item> 
                <Typography
                  color="textPrimary"
                  gutterBottom
                  variant="h3"
                >
                  £{context.userTax.totalTakeHome || 0 }
              </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </SalaryContextConsumer>
  );
};

TakeHomeIncome.propTypes = {
  className: PropTypes.string
};

export default TakeHomeIncome;
