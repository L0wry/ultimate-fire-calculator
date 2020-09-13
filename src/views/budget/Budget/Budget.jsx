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
import { SalaryContextConsumer } from '../../../context/SalaryContext';
import { BudgetContextConsumer } from '../../../context/BudgetContext';
import { all, create } from 'mathjs'

const math = create(all, {
  number: 'BigNumber',
  precision: 32
});


const ExpenseHeaderCard = ({ className, ...rest }) => {


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
            <BudgetContextConsumer>
              {budgetContext => (
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
                      addExpense={budgetContext.addExpense}
                    />
                    {budgetContext.expenses.length > 0 && (
                      <ExpenseList
                        items={budgetContext.expenses}
                        onItemCheck={idx => budgetContext.checkExpense(idx)}
                        onItemRemove={idx => budgetContext.removeExpense(idx)}
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
                    <SalaryContextConsumer>
                      {({ userTax, }) => userTax.totalTakeHome && (
                        <MonthlyTakeHomeCard totalTakeHome={math.round(math.divide(userTax.totalTakeHome, 12), 2)} difference={math.round(math.subtract(math.divide(userTax.totalTakeHome, 12), budgetContext.expenseTotal), 2)} expensesCost={budgetContext.expenseTotal} />
                      )}
                    </SalaryContextConsumer>
                  </Grid>
                </Grid>
              )}
            </BudgetContextConsumer>

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
