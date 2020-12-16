import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useInvestmentContext } from '../../../context/InvestmentContext'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  box: {
    backgroundColor: theme.palette.primary.main,
  },
  text: {
    color: theme.palette.text.tertiary
}
}));

const AmountInvestedPerMonth = ({ className, ...rest }) => {
  const classes = useStyles();

  const { getAmountInvestedPerMonth } = useInvestmentContext();

  return (
    <Box className={classes.box}  padding={3}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item>
          <Typography
            align="center"
            className={classes.text}
            variant="h5"
          >
            Amount Invested Per Month
            </Typography>
        </Grid>
        <Grid item>

          <Typography
            gutterBottom
            className={classes.text}
            variant="h3"
          >
            £{getAmountInvestedPerMonth().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

AmountInvestedPerMonth.propTypes = {
  className: PropTypes.string
};

export default AmountInvestedPerMonth;
