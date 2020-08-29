import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Expenses from './AddExpenses';
import Budget from './Budget'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Index = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Budget"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Budget />
        </Box>
      </Container>
    </Page>
  );
};

export default Index;
