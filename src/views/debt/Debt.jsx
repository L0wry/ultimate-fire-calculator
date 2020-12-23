import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Typography,
  makeStyles,
  Button,
  Grid
} from '@material-ui/core';
import { AddDebt } from './AddDebt'
import { DebtList } from './DebtList'
import { NavLink as RouterLink } from 'react-router-dom';
import TopBar from '../../layouts/MainLayout/TopBar.js'
import { useBudgetContext } from '../../context/BudgetContext';

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

const Debt = ({ className, ...rest }) => {
  const { debts, addDebt, onDebtSave, removeDebt, editDebt } = useBudgetContext();
  const classes = useStyles()

  return (
    <div
      className={clsx(className)}
      {...rest}
    >
      <TopBar header="Debt" />
      <Typography
        gutterBottom
        variant="body1"
      >
        Add any debt to be repaid  such as a mortgage, loans or credit card
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
              <AddDebt addDebt={addDebt} />
            </Grid>

            <Grid
              item
              lg={6}
              xl={6}
              sm={12}
              xs={12}
            >

              {/* <BudgetRemaining difference={0} /> */}
            </Grid>
          </Grid>
          {debts?.length  && (
            <>
              <Grid
                item
                lg={12}
                sm={12}
                xl={12}
                xs={12}
              >
                <DebtList onItemSave={onDebtSave} onItemEdit={editDebt} onItemRemove={removeDebt} items={debts} />

              </Grid>
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
                  to={'/app/budget'}

                >
                  Add Your Monthly Expenses
            </Button>
              </Grid>
            </>

          )}

        </Grid>
      </Box>
    </div >
  );
};

Debt.propTypes = {
  className: PropTypes.string
};

export default Debt;
