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

import { SalaryContextConsumer } from 'src/context/SalaryContext';

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

const IncomeTaxCard = ({ className, product, ...rest }) => {
  const classes = useStyles();

  return (
    <SalaryContextConsumer>
      {context => (
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
        <Grid  >

            <Typography
              align="center"
              color="textPrimary"
              variant="body1"
            >
              Tax free allowance: £{context.userTax.taxFreePersonalAllowance}
            </Typography>
            <Typography
              align="center"
              color="textPrimary"
              variant="body1"
            >
              Total Income Tax: £{context.userTax.totalIncomeTax}
            </Typography>
            <Typography
              align="center"
              color="textPrimary"
              variant="body1"
            >
              Taxable Income: £{context.userTax.taxableIncome}
            </Typography>
            <Typography
              align="center"
              color="textPrimary"
              variant="body1"
            >
              Tax paid at lower band: £{context.userTax.lowerBand.taxPaid}
            </Typography>
            <Typography
              align="center"
              color="textPrimary"
              variant="body1"
            >
              Tax paid at medium band: £{context.userTax.mediumBand.taxPaid}
            </Typography>
            <Typography
              align="center"
              color="textPrimary"
              variant="body1"
            >
              Tax paid at higher band: £{context.userTax.upperBand.taxPaid}
            </Typography>
            </Grid>
            </Box>
          </CardContent>
          <Box flexGrow={1} />
          <Divider />
        </Card>
      )}
    </SalaryContextConsumer>
  );
};

IncomeTaxCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default IncomeTaxCard;