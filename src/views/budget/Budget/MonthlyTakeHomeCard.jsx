import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    colors,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%'
    },
    avatar: {
        backgroundColor: colors.red[600],
        height: 56,
        width: 56
    },
    differenceIcon: {
        color: colors.red[900]
    },
    differenceValue: {
        color: colors.red[900],
        marginRight: theme.spacing(1)
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
                            direction="column"
                            justify="space-between"
                            spacing={3}
                        >
                            <Grid item>
                                <Typography
                                    color="textSecondary"
                                    gutterBottom
                                    variant="h5"
                                >
                                    Monthly Net Income
                                </Typography>
                                <Typography
                                    color="textPrimary"
                                    variant="h3"
                                >
                                    £{totalTakeHome}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    color="textSecondary"
                                    gutterBottom
                                    variant="h5"
                                >
                                    Total Expenses
                                </Typography>
                                <Typography
                                    color="textPrimary"
                                    variant="h3"
                                >
                                    £{expensesCost}
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Typography
                                    color="textSecondary"
                                    gutterBottom
                                    variant="h5"
                                >
                                    Amount Left Over
                                </Typography>
                                <Typography
                                    color="textPrimary"
                                    variant="h3"
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
