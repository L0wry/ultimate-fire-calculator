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
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
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

const NationalInsuranceCard = ({ className, product, ...rest }) => {
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
              National Insurance
        </Typography>
            <Divider />
            <Box mt={3}>
            <Grid  >

              <Typography
                align="center"
                color="textPrimary"
                variant="body1"
              >
                National Insurance Paid Band One: £0000
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

NationalInsuranceCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default NationalInsuranceCard;
