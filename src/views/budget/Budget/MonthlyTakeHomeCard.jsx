import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
    Box,
    Card,
    CardContent,
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

const MonthlyTakeHomeCard = ({ className, expensesCost, totalTakeHome, difference, ...rest }) => {
    const classes = useStyles();

    return (

        <Card
            className={clsx(classes.root, className)}
            {...rest}
        >
            <CardContent>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    spacing={3}
                >
                    <Grid item>
                        <Typography
                            className={classes.text}
                            color="textSecondary"
                            gutterBottom
                            variant="h4"
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
                            variant="h4"
                        >
                            Total Expenses
                                </Typography>
                        <Typography
                            className={classes.text}
                            color="textPrimary"
                            variant="h4"
                        >
                            £{expensesCost}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography
                            className={classes.text}

                            color="textSecondary"
                            gutterBottom
                            variant="h4"
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
                <Box
                    mt={2}
                    display="flex"
                    alignItems="center"
                >
                </Box>
            </CardContent>
        </Card>
    );
};

MonthlyTakeHomeCard.propTypes = {
    className: PropTypes.string
};

export default MonthlyTakeHomeCard;
