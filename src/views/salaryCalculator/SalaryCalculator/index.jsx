import React from 'react';
import {
  Container,
  makeStyles,
} from '@material-ui/core';
import Page from 'src/components/Page';
import SalaryCalculator from './SalaryCalculator';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  header: {
    color: theme.palette.text.tertiary
  },
}));

const Salary = () => {
  const classes = useStyles();


  return (
    <Page
      className={classes.root}
      title="Salary Calculator"
    >
      <Container maxWidth={false}>
        <SalaryCalculator />
      </Container>
    </Page>
  );
};

export default Salary;
