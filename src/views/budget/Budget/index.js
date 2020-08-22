import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Expenses from './Expenses';
import ExpenseHeaderCard from './ExpenseHeaderCard'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Budget = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Budget"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <ExpenseHeaderCard />
          <Expenses />
        </Box>
      </Container>
    </Page>
  );
};

export default Budget;
