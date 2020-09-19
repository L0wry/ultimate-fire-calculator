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
import { useSalaryContext } from '../../../context/SalaryContext';

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

const NationalInsuranceCard = ({ className, ...rest }) => {
  const classes = useStyles();
  const {
    userTax: {
      salary,
      nationalInsuranceTax: {
        totalNationalInsuranceTax,
        lowerBand,
        mediumBand,
        upperBand,
      },
    },
  } = useSalaryContext();

  return (
    <>
      {salary > 0 && (
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
              National Insurance
        </Typography>
            <Divider />
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
                    color="textPrimary"
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
                    color="textPrimary"
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
              </Grid>
            </Box>
          </CardContent>
          <Box />
          <Divider />
        </Card>
      )}
    </>
  );
};

NationalInsuranceCard.propTypes = {
  className: PropTypes.string,
};

export default NationalInsuranceCard;
