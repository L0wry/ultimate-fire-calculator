import React from 'react';
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
import { useInputName, useExpenses } from "./budgetHooks";
import { SalaryContextConsumer } from '../../../context/SalaryContext';

import {all, create} from 'mathjs'

const math = create(all, {
  number: 'BigNumber',  
  precision: 32
});


const ExpenseHeaderCard = ({ className, ...rest }) => {

  const { inputValue, changeInput, clearInput, keyInput } = useInputName();
  const { expenses, addExpense, checkExpense, removeExpense } = useExpenses();

  const clearInputAndAddTodo = _ => {
    clearInput();
    addExpense(inputValue);
  };

  const expenseTotal = expenses.length > 0
    ? expenses.reduce((acc, i) => acc + i.cost, 0)
    : 0

  return (
    <SalaryContextConsumer>
      {context => (
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
                      inputValue={inputValue}
                      onInputChange={changeInput}
                      onButtonClick={clearInputAndAddTodo}
                      onInputKeyPress={event => keyInput(event, clearInputAndAddTodo)}
                    />

                    <ExpenseList
                      items={expenses}
                      onItemCheck={idx => checkExpense(idx)}
                      onItemRemove={idx => removeExpense(idx)}
                    />

                  </Grid>

                  <Grid
                    item
                    lg={6}
                    sm={6}
                    xl={6}
                    xs={6}
                  >
                    <MonthlyTakeHomeCard totalTakeHome={math.divide(context.userTax.totalTakeHome, 12)} difference={math.subtract(math.divide(context.userTax.totalTakeHome, 12), expenseTotal )} expensesCost={expenseTotal} />
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>

        </div>
      )}
    </SalaryContextConsumer>
  );
};

ExpenseHeaderCard.propTypes = {
  className: PropTypes.string
};

export default ExpenseHeaderCard;
