import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import HelpPage from './Help'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Help = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Help"
    >
      <Container maxWidth="lg">
        <Box mt={3}>
          <HelpPage />
        </Box>
      </Container>
    </Page>
  );
};

export default Help;