import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Typography,
  makeStyles,
  Hidden,
  Button
} from '@material-ui/core';
import { useInvestmentContext } from '../../../context/InvestmentContext';
import { AddInvestment } from './AddInvestment'
import { InvestmentList } from './InvestmentList'
import { NavLink as RouterLink } from 'react-router-dom';
import TopBar from '../../../layouts/MainLayout/TopBar.js'

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

      <Box mt={3}>
        <AddInvestment addInvestment={addInvestment} />
      </Box>
      {investments.length > 0 && (
        <>
          <InvestmentList onItemSave={onItemSave} onItemEdit={editInvestment} onItemRemove={removeInvestment} items={investments} />



          <Hidden lgUp>

            <Box mt={3} >
              <Button

                fullWidth
                className={classes.navButton}
                component={RouterLink}
                to={'/app/dashboard'}

              >
                Predict your Net Worth in {yearsToMature} {yearsToMature === 1 ? 'year' : 'years'}
              </Button>
            </Box>
          </Hidden>
        </>
      )}

    </div>
  );
};

Investments.propTypes = {
  className: PropTypes.string
};

export default Investments;
