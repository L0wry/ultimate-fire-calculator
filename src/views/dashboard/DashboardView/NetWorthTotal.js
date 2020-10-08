import React from 'react';
import {
  Box,
  Grid,
  Typography,
  makeStyles,
  colors
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

const NetWorthTotal = () => {
  const classes = useStyles();

  const { getTotalNetWorthInXYears, yearsToMature } = useInvestmentContext();

  return (
    <Box padding={3}  className={classes.box} >
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
            gutterBottom
            variant="h5"
          >
            Total Net Worth in {yearsToMature} {yearsToMature === 1 ? 'year' : 'years'}
            </Typography>
        </Grid>
        <Grid item>
          <Typography
            className={classes.text}
            variant="h3"
          >
            £{getTotalNetWorthInXYears().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Typography>
        </Grid>
      </Grid>
      </Box>
  );
};

export default NetWorthTotal;
