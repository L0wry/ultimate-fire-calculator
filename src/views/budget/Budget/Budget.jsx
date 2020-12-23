import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  makeStyles,
  Typography,
  Grid,
  Hidden,
  Button
} from '@material-ui/core';
import { NavLink as RouterLink } from 'react-router-dom';

import MonthlyTakeHomeCard from './MonthlyTakeHomeCard'
import AddExpenses from './AddExpenses'
import ExpenseList from './ExpenseList'
import { useSalaryContext } from '../../../context/SalaryContext';
import { useBudgetContext } from '../../../context/BudgetContext';
import { all, create } from 'mathjs'
import TopBar from '../../../layouts/MainLayout/TopBar.js'

const math = create(all, {
  number: 'BigNumber',
  precision: 32
});

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

const ExpenseHeaderCard = ({ className, ...rest }) => {
  const { userTax } = useSalaryContext();
  const {
    expenses,
    addExpense,
    checkExpense,
    removeExpense,
    allExpensesTotal,
    debts
  } = useBudgetContext();

  const totalTakeHome = math.round(math.divide(userTax.totalTakeHome || 0, 12), 2)
  const difference = math.round(math.subtract(totalTakeHome, allExpensesTotal), 2)

  const classes = useStyles()

  const showExpenseList = expenses.length > 0  || debts.length > 0
  
  return (
    <div
      className={clsx(className)}
      {...rest}
    >
      <TopBar header="Budget" />

      <Typography
        gutterBottom
        variant="body1"
      >
        List Your Monthly Expenses
        </Typography>
      <Box mt={3}>
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
              <AddExpenses
                addExpense={addExpense}
              />
            </Grid>

            <Grid
              item
              lg={6}
              xl={6}
              sm={12}
              xs={12}
            >

              <MonthlyTakeHomeCard allExpensesTotal={allExpensesTotal} totalTakeHome={totalTakeHome} difference={difference} />
            </Grid>
          </Grid>

          {showExpenseList && (
            <>
              <Grid
                item
                lg={12}
                sm={12}
                xl={12}
                xs={12}
              >
                <ExpenseList
                  expenses={expenses}
                  debts={debts}
                  onItemCheck={idx => checkExpense(idx)}
                  onItemRemove={idx => removeExpense(idx)}
                />
              </Grid>
              <Grid item
                lg={12}
                md={12}
                xs={12}>
                <Button
                  fullWidth
                  className={classes.navButton}
                  component={RouterLink}
                  to={'/app/investments'}

                >
                  Add Your Investments
              </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Box>

    </div>
  );
};

ExpenseHeaderCard.propTypes = {
  className: PropTypes.string
};

export default ExpenseHeaderCard;
