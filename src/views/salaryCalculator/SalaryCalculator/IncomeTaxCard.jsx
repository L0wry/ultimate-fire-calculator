import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  text: {
    color: theme.palette.text.secondary
  },
}));

const IncomeTaxCard = ({ className, userTax, ...rest }) => {
  const classes = useStyles();

  const {
    incomeTax: {
      taxFreePersonalAllowance,
      totalIncomeTax,
      lowerBand,
      mediumBand,
      upperBand,
    },
    taxableIncome,
    studentLoan,
  } = userTax;

  return (
    <Box boxShadow={3} p={2} >
      <Typography
        align="center"
        gutterBottom
        className={classes.text}
        variant="h4"
      >
        Income Tax
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
              className={classes.text}
              align="center"
              variant="body1"
            >
              Tax free allowance: £{taxFreePersonalAllowance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Typography>
          </Grid>
          {userTax.incomeTax.taxFreePersonalAllowanceRemovedBy100kTax && (
            <Grid
              item
              lg={6}
              md={6}
              xs={12}
            >
              <Typography
                align="center"
                variant="body1"
                className={classes.text}

              >
                100k Personal Allowance Deduction: £{userTax.incomeTax.taxFreePersonalAllowanceRemovedBy100kTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Typography>
            </Grid>
          )}

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
              Total Income Tax: £{totalIncomeTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Typography>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            xs={12}
          >
            <Typography
              className={classes.text}
              align="center"
              variant="body1"
            >
              Taxable Income: £{taxableIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Typography>
          </Grid>       <Grid
            item
            lg={6}
            md={6}
            xs={12}
          >
            <Typography
              className={classes.text}
              align="center"
              variant="body1"
            >
              Tax paid at lower band: £{lowerBand.taxPaid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Typography>
          </Grid>       <Grid
            item
            lg={6}
            md={6}
            xs={12}
          >
            <Typography
              className={classes.text}
              align="center"
              variant="body1"
            >
              Tax paid at medium band: £{mediumBand.taxPaid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Typography>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            xs={12}
          >
            <Typography
              className={classes.text}
              align="center"
              variant="body1"
            >
              Tax paid at higher band: £{upperBand.taxPaid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Typography>
          </Grid>
          {studentLoan?.yearlyAmountPaid > 0 && (
            <Grid
              item
              lg={6}
              md={6}
              xs={12}
            >
              <Typography
                className={classes.text}
                align="center"
                variant="body1"
                gutterBottom
              >
                Student Loan Paid: £{studentLoan?.monthlyAmountPaid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

IncomeTaxCard.propTypes = {
  className: PropTypes.string,
};

export default IncomeTaxCard;
