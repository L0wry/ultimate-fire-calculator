import React from 'react';
import {
  Container,
  Grid,
  makeStyles,
} from '@material-ui/core';
import Page from '../../../components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const NetWorth = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Net Worth"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
        </Grid>
      </Container>
    </Page>
  );
};

export default NetWorth;
