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
import { useInvestmentContext } from '../../../context/InvestmentContext'

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const NetWorthTotal = ({ className, ...rest }) => {
  const classes = useStyles();

  const { getTotalNetWorthInXYears, yearsToMature } = useInvestmentContext();

  return (
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
              gutterBottom
              variant="h6"
            >
              Total Net Worth in {yearsToMature} Years
            </Typography>
            </Grid>
            <Grid item> 
            <Typography
              color="textPrimary"
              variant="h3"
            >
              £{getTotalNetWorthInXYears().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Typography>
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
