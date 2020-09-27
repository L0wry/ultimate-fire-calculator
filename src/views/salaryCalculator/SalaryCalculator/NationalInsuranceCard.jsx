import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import { useSalaryContext } from '../../../context/SalaryContext';

const useStyles = makeStyles((theme) => ({
  root: {},
  text: {
    color: theme.palette.text.secondary
  },
}));

const NationalInsuranceCard = ({ className, ...rest }) => {
  const classes = useStyles();
  const {
    userTax: {
      nationalInsuranceTax: {
        totalNationalInsuranceTax,
        lowerBand,
        mediumBand,
        upperBand,
      },
    },
  } = useSalaryContext();

  return (
    <Box boxShadow={3} p={2}  >
      <Typography
        align="center"
        className={classes.text}
        gutterBottom
        variant="h4"
      >
        National Insurance
        </Typography>

      <Box mt={3}>
        <Grid
          container
          spacing={3}
        >

          <Grid
            item
            lg={6}
            md={6}
            xs={12}
          >
            <Typography
              align="center"
              className={classes.text}
              variant="body1"
            >
              Total N.I. Paid: £{totalNationalInsuranceTax}
            </Typography>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            xs={12}
          >
            <Typography
              align="center"
              className={classes.text}
              variant="body1"
            >
              Tax paid at lower band: £{lowerBand.taxPaid}
            </Typography>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            xs={12}
          >
            <Typography
              align="center"
              className={classes.text}
              variant="body1"
            >
              Tax paid at medium band: £{mediumBand.taxPaid}
            </Typography>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            xs={12}
          >
            <Typography
              align="center"
              className={classes.text}
              variant="body1"
              gutterBottom
            >
              Tax paid at higher band: £{upperBand.taxPaid}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

NationalInsuranceCard.propTypes = {
  className: PropTypes.string,
};

export default NationalInsuranceCard;
