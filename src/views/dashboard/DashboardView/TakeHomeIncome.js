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
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
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
              justify="space-between"
              spacing={3}
            >
              <Grid item>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="h6"
                >
                  Annual Take Home Pay
                </Typography>
                <Typography
                  color="textPrimary"
                  variant="h3"
                >
                  £{context.userTax.totalTakeHome }
              </Typography>
              </Grid>
            </Grid>
            <Box
              mt={2}
              display="flex"
              alignItems="center"
            >
            </Box>
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