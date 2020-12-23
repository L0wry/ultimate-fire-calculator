import React from 'react';
import PropTypes from 'prop-types';
import { useInvestmentContext } from '../../../context/InvestmentContext'
import { useBudgetContext } from '../../../context/BudgetContext';
import { convertInvestmentDataToFire } from '../../../utils/convertInvestmentDataToFire';
import {
    Box,
    Grid,
    Typography,
    makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    text: {
        color: theme.palette.text.tertiary
    },
    box: {
        backgroundColor: theme.palette.primary.main,
    },
}));

const NoExpenses = ({ classes }) => (

    <Grid item>
        <Typography
            align="center"
            className={classes.text}
            gutterBottom
            variant="h5"
        >
            Before We Predict When You Could Retire   Add Some Expenses
        </Typography>
    </Grid>


)

const NoInvestments = ({ classes }) => (

    <Grid item>
        <Typography
            align="center"
            className={classes.text}
            gutterBottom
            variant="h5"
        >
            Before We Predict When You Could Retire Add Some Investments
</Typography>
    </Grid>


)


const RetiringIn = () => {
    const classes = useStyles();

    const { investments, safeWithdrawalPercent } = useInvestmentContext();
    const { allBudgetItems, allExpensesTotal } = useBudgetContext();

    const fireData = investments && investments[0]?.compoundData ? convertInvestmentDataToFire(investments.filter(i => i.isIncluded), safeWithdrawalPercent, allBudgetItems) : []

    const fireYear = fireData.find(item => item['Income From Draw Down'] >= item["Expenses"])

    const formattedYear = fireYear?.year?.split(' ')[1]

    const ShowErr = allExpensesTotal === 0 ? NoExpenses : investments?.filter(i => i.isIncluded).length === 0 ? NoInvestments : null


    return (
        <Box className={classes.box} padding={3}>

            <Grid
                container
                direction="column"
                alignItems="center"
            >

                {ShowErr ? (<ShowErr classes={classes} />

                ) : fireYear ? (
                    <>
                        <Grid item>
                            <Typography
                                align="center"
                                className={classes.text}
                                gutterBottom
                                variant="h5"
                            >
                                Could Retire In...
                        </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                className={classes.text}
                                variant="h3"
                            >
                                {formattedYear} {formattedYear === '1' ? 'Year' : 'Years'} 🥳
                            </Typography>
                        </Grid>
                    </>
                ) : (
                            <>
                                <Grid item>
                                    <Typography
                                        align="center"
                                        className={classes.text}
                                        gutterBottom
                                        variant="h5"
                                    >
                                        Based On Your Current Situation
                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        className={classes.text}
                                        variant="h5"
                                    >
                                        Retiring Looks Unlikely
                                </Typography>
                                </Grid>
                            </>

                        )}

            </Grid>
        </Box >
    );
};

RetiringIn.propTypes = {
    className: PropTypes.string
};

export default RetiringIn;
