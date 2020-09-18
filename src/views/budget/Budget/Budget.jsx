import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider
} from '@material-ui/core';
import MonthlyTakeHomeCard from './MonthlyTakeHomeCard'
import AddExpenses from './AddExpenses'
import ExpenseList from './ExpenseList'
import { useSalaryContext } from '../../../context/SalaryContext';
import { useBudgetContext } from '../../../context/BudgetContext';
import { all, create } from 'mathjs'

const math = create(all, {
  number: 'BigNumber',
  precision: 32
});

const ExpenseHeaderCard = ({ className, ...rest }) => {
  const { userTax } = useSalaryContext();
  const {
    expenses,
    addExpense,
    checkExpense,
    removeExpense,
    expenseTotal
  } = useBudgetContext();

  const [takeHome, setTakeHome] = useState({
    totalTakeHome: 0,
    difference: 0,
    expensesCost: 0,
  });

  const totalTakeHome = userTax.totalTakeHome || 0

  useEffect(() => {
    setTakeHome((prevState) => ({
      ...prevState,
      totalTakeHome: math.round(math.divide(totalTakeHome, 12), 2),
      difference: math.round(math.subtract(math.divide(totalTakeHome, 12), expenseTotal), 2),
      expensesCost: expenseTotal,
    }))
    // subscribe to changes in userTax and expense total to trigger effect
  }, [userTax, expenseTotal]);

  return (
    <div
      className={clsx(className)}
      {...rest}
    >
      <Card>
        <CardContent>

          <Typography
            align="left"
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            Budget
                  </Typography>
          <Divider />
          <Box mt={3}>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="stretch"
              spacing={3}
            >
              <Grid
                item
                lg={6}
                sm={6}
                xl={6}
                xs={6}
              >
                <AddExpenses
                  addExpense={addExpense}
                />
                {expenses.length > 0 && (
                  <ExpenseList
                    items={expenses}
                    onItemCheck={idx => checkExpense(idx)}
                    onItemRemove={idx => removeExpense(idx)}
                  />
                )}
              </Grid>

              <Grid
                item
                lg={6}
                sm={6}
                xl={6}
                xs={6}
              >
                <MonthlyTakeHomeCard {...takeHome} />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

ExpenseHeaderCard.propTypes = {
  className: PropTypes.string
};

export default ExpenseHeaderCard;
