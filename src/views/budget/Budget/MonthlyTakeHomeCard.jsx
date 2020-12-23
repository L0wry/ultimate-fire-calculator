import React from 'react';
import PropTypes from 'prop-types';
import {
    Grid,
    Typography,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%'
    },
    text: {
        textAlign: 'center'
    }
}));

const MonthlyTakeHomeCard = ({ className, allExpensesTotal, totalTakeHome, difference }) => {
    const classes = useStyles();

    return (
        <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            spacing={3}
        >
            <Grid item>
                <Typography
                    className={classes.text}
                    color="textSecondary"
                    gutterBottom
                    variant="h3"
                >
                    Monthly Net Income
                                </Typography>
                <Typography
                    className={classes.text}

                    color="textPrimary"
                    variant="h4"
                >
                    £{totalTakeHome}
                </Typography>
            </Grid>
            <Grid item>
                <Typography
                    className={classes.text}
                    color="textSecondary"
                    gutterBottom
                    variant="h3"
                >
                    Total Expenses
                                </Typography>
                <Typography
                    className={classes.text}
                    color="textPrimary"
                    variant="h4"
                >
                    £{allExpensesTotal}
                </Typography>
            </Grid>

            <Grid item>
                <Typography
                    className={classes.text}

                    color="textSecondary"
                    gutterBottom
                    variant="h3"
                >
                    Amount Left Over
                                </Typography>
                <Typography
                    className={classes.text}
                    color="textPrimary"
                    variant="h4"
                >
                    £{difference}
                </Typography>
            </Grid>

        </Grid>

    );
};

MonthlyTakeHomeCard.propTypes = {
    className: PropTypes.string
};

export default MonthlyTakeHomeCard;
