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
import { Alert, AlertTitle } from '@material-ui/lab';
import { useInvestmentContext } from '../../../context/InvestmentContext';
import { AddInvestment } from './AddInvestment'
import { InvestmentList } from './InvestmentList'
import { NavLink as RouterLink } from 'react-router-dom';
import TopBar from '../../../layouts/MainLayout/TopBar.js'
import BudgetRemaining from './BudgetRemaining';
import { useBudgetContext } from '../../../context/BudgetContext';
import { useSalaryContext } from '../../../context/SalaryContext';
import investmentMetaData from '../../../investments/investmentMetaData'
import { fNum } from '../../../utils/formatNumber';
import { all, create } from 'mathjs'

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

const Investments = ({ className, ...rest }) => {
  const { userTax } = useSalaryContext();
  const { expenseTotal } = useBudgetContext();
  const { onItemSave, editInvestment, removeInvestment, investments, addInvestment, yearsToMature } = useInvestmentContext();
  const classes = useStyles()

  const totalTakeHome = math.round(math.divide(userTax.totalTakeHome || 0, 12), 2)
  const difference = math.round(math.subtract(totalTakeHome, expenseTotal), 2)


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
          {investments.length > 0 && investments[0]?.compoundData && (
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

              {investments
                .filter(investment => investment.isOverAnnualAllowance)
                .reduce((accum, investment) => {
                  if (!accum.find(existing => existing.investmentType === investment.investmentType)) accum.push(investment)

                  return accum
                }, [])
                .map((investment, i) => (

                  <Grid
                    key={`alert-${i}`}
                    item
                    lg={12}
                    sm={12}
                    xl={12}
                    xs={12}
                  >
                    <Alert severity="warning">
                      <AlertTitle>Warning!</AlertTitle>
        You're contributing over the <strong>{investment.investmentType}</strong> annual allowance of £{fNum(investmentMetaData[investment.investmentType].annualAllowance)}
                    </Alert>
                  </Grid>
                ))}

              {investments
                .filter(investment => investment.isOverLifetimeAllowance)
                .reduce((accum, investment) => {
                  if (!accum.find(existing => existing.investmentType === investment.investmentType)) accum.push(investment)
                  return accum
                }, [])
                .map((investment, i) => (

                  <Grid
                    key={`alert-${i}`}
                    item
                    lg={12}
                    sm={12}
                    xl={12}
                    xs={12}
                  >
                    <Alert severity="warning">
                      <AlertTitle>Warning!</AlertTitle>
        You are above the <strong>{investment.investmentType} Lifetime Allowance </strong> of <strong>£{fNum(investmentMetaData[investment.investmentType].lifeTimeAllowance) }</strong> by <strong>£{fNum(investment.overLifetimeAllowanceBy)}</strong> and will be subjected to increased tax.
                    </Alert>
                  </Grid>
                ))}


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
