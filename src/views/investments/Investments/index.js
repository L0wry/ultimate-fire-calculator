import React from 'react';
import {
  Container,
  Grid,
  makeStyles,
} from '@material-ui/core';
import Page from '../../../components/Page';
import Investments from './Investments';

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
      title="Investments"
    >
      <Container maxWidth={false}>
        <Investments />
      </Container>
    </Page>
  );
};

export default Index;
