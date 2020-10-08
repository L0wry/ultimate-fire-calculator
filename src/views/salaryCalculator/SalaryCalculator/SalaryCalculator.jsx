import React from 'react';
import {
    Box,
    Button,
    Grid,
    makeStyles,
    Typography,
    Hidden
} from '@material-ui/core';
import clsx from 'clsx';
import { NavLink as RouterLink } from 'react-router-dom';

import IncomeDetails from './IncomeDetails';
import IncomeTaxCard from './IncomeTaxCard'
import NationalInsurance from './NationalInsuranceCard'
import BreakdownCard from './BreakdownCard';
import { useSalaryContext } from '../../../context/SalaryContext';
import TopBar from '../../../layouts/MainLayout/TopBar.js'


const useStyles = makeStyles((theme) => ({
    root: {},
    text: {
        color: theme.palette.text.primary
    },
    navButton: {
        backgroundColor: theme.palette.text.primary,
        color: theme.palette.text.tertiary,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          }
    }

}));

const SalaryCalculator = ({ className, ...rest }) => {

    const { setUserFinances, userTax } = useSalaryContext();
    const classes = useStyles()
    return (
        <div
            className={clsx(className)}
            {...rest}
        >
            <TopBar header="Salary Calculator" />

            <IncomeDetails userTax={userTax} setUserFinances={setUserFinances} />
            {userTax.salary > 0 && (

                <Box mt={3} >
                    <Typography
                        className={classes.text}
                        align="left"
                        gutterBottom
                        variant="h2"
                    >
                        Results
                  </Typography>
                    <Box mt={3} >
                        <Grid
                            container
                            direction="row"
                            alignItems="stretch"
                            spacing={3}
                        >

                            <Grid
                                item
                                style={{ height: '100%' }}
                                lg={6}
                                md={6}
                                xs={12}
                            >
                                <IncomeTaxCard userTax={userTax} />
                            </Grid>
                            <Grid
                                style={{ height: '100%' }}

                                item
                                lg={6}
                                md={6}
                                xs={12}
                            >
                                <NationalInsurance />
                            </Grid>
                            <Hidden lgUp>

                                <Grid item
                                    lg={12}
                                    md={12}
                                    xs={12}>
                                    <Button
                                        fullWidth
                                        className={classes.navButton}
                                        component={RouterLink}
                                        to={'/app/budget'}

                                    >
                                        Add Your Monthly Expenses
                                </Button>
                                </Grid>
                            </Hidden>

                        </Grid>
                        {/* <BreakdownCard /> */}

                    </Box>
                </Box>
            )}
        </div>
    );
};

export default SalaryCalculator;
