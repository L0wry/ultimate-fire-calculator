import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Typography,
  makeStyles,
  Grid,
  CardHeader,
  Divider
} from '@material-ui/core';
import MonthlyTakeHomeCard from './MonthlyTakeHomeCard'
import Expenses from './Expenses'

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const ExpenseHeaderCard = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardContent>

          <Typography
            align="left"
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            Budget
                  </Typography>
          <Divider />
          <Box mt={3}>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="stretch"
              spacing={3}
            >
              <Grid
                item
                lg={6}
                sm={6}
                xl={6}
                xs={6}
              >
                <Expenses />
              </Grid>
              <Grid
                item
                lg={6}
                sm={6}
                xl={6}
                xs={6}
              >
                <MonthlyTakeHomeCard />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

    </div>
  );
};

ExpenseHeaderCard.propTypes = {
  className: PropTypes.string
};

export default ExpenseHeaderCard;
