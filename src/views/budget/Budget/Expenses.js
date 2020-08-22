import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  makeStyles,
  List,
  CardContent,
  Typography,
  Divider,
  Box
} from '@material-ui/core';
import { ListItem } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Expenses = ({ className, customers, ...rest }) => {
  const classes = useStyles();


  return (
    <Box mt={3} >
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>

        <Typography
          align="left"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          List Your Expenses
        </Typography>
        <Divider />

        <List className={classes.root}>

        </List>
      </CardContent>
    </Card>
    </Box>
  );
};

Expenses.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Expenses;
