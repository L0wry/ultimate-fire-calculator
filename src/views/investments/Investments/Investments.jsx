import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Typography,
  makeStyles,
  Hidden,
  Button,
  Grid
} from '@material-ui/core';
import { useInvestmentContext } from '../../../context/InvestmentContext';
import { AddInvestment } from './AddInvestment'
import { InvestmentList } from './InvestmentList'
import { NavLink as RouterLink } from 'react-router-dom';
import TopBar from '../../../layouts/MainLayout/TopBar.js'
import BudgetRemaining from './BudgetRemaining';
import { useBudgetContext } from 'src/context/BudgetContext';

const useStyles = makeStyles((theme) => ({
  root: {},
  text: {
    color: theme.palette.text.primary
  },
  header: {
    color: theme.palette.text.primary
  },
  navButton: {
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.text.tertiary,
    '&:hover': {
      backgroundColor: theme.palette.primary.default,
    }
  }
}));

const Investments = ({ className, ...rest }) => {

  const { onItemSave, editInvestment, removeInvestment, investments, addInvestment, yearsToMature } = useInvestmentContext();
  const { difference } = useBudgetContext()
  const classes = useStyles()

  return (
    <div
      className={clsx(className)}
      {...rest}
    >
      <TopBar header="Investments" />
      <Typography
        gutterBottom
        variant="body1"
      >
        Add your investments
        </Typography>

      <Box mt={3} >
        <Grid
          container
          direction="row"
          spacing={3}
        >

          <Grid
            container
            item
            direction="row"
            alignItems="center"
            spacing={3}
          >

            <Grid
              item
              lg={6}
              xl={6}
              sm={12}
              xs={12}
            >
              <AddInvestment addInvestment={addInvestment} />
            </Grid>

            <Grid
              item
              lg={6}
              xl={6}
              sm={12}
              xs={12}
            >

              <BudgetRemaining difference={difference} />
            </Grid>
          </Grid>
          {investments.length > 0 && (
            <>
              <Grid
                item
                lg={12}
                sm={12}
                xl={12}
                xs={12}
              >
                <InvestmentList onItemSave={onItemSave} onItemEdit={editInvestment} onItemRemove={removeInvestment} items={investments} />

              </Grid>

              <Hidden lgUp>
                <Grid
                  item
                  lg={12}
                  sm={12}
                  xl={12}
                  xs={12}
                >
                  <Button

                    fullWidth
                    className={classes.navButton}
                    component={RouterLink}
                    to={'/app/dashboard'}

                  >
                    Predict your Net Worth in {yearsToMature} {yearsToMature === 1 ? 'year' : 'years'}
                  </Button>
                </Grid>
              </Hidden>

            </>

          )}

        </Grid>
      </Box>
    </div >
  );
};

Investments.propTypes = {
  className: PropTypes.string
};

export default Investments;
