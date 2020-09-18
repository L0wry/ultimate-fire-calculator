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
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
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

  return userTax.salary > 0 && (

    <Box>
      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
        <CardContent>
          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            Income Tax
        </Typography>
          <Divider />
          <Box mt={3} >
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
                  color="textPrimary"
                  variant="body1"
                >
                  Tax free allowance: £{taxFreePersonalAllowance}
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
                  color="textPrimary"
                  variant="body1"
                >
                  100k Personal Allowance Deduction: £{userTax.incomeTax.taxFreePersonalAllowanceRemovedBy100kTax}
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
                  color="textPrimary"
                  variant="body1"
                >
                  Total Income Tax: £{totalIncomeTax}
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
                  color="textPrimary"
                  variant="body1"
                >
                  Taxable Income: £{taxableIncome}
                </Typography>
              </Grid>       <Grid
                item
                lg={6}
                md={6}
                xs={12}
              >
                <Typography
                  align="center"
                  color="textPrimary"
                  variant="body1"
                >
                  Tax paid at lower band: £{lowerBand.taxPaid}
                </Typography>
              </Grid>       <Grid
                item
                lg={6}
                md={6}
                xs={12}
              >
                <Typography
                  align="center"
                  color="textPrimary"
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
                  color="textPrimary"
                  variant="body1"
                >
                  Tax paid at higher band: £{upperBand.taxPaid}
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
                    align="center"
                    color="textPrimary"
                    variant="body1"
                  >
                    Student Loan Paid: £{studentLoan?.yearlyAmountPaid }
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        </CardContent>
        <Box flexGrow={1} />
        <Divider />
      </Card>
    </Box>
  );
};

IncomeTaxCard.propTypes = {
  className: PropTypes.string,
};

export default IncomeTaxCard;
