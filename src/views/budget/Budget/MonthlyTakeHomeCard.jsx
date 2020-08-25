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
import { SalaryContextConsumer } from '../../../context/SalaryContext';

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

const MonthlyTakeHomeCard = ({ className, ...rest }) => {
    const classes = useStyles();

    return (
        <SalaryContextConsumer>
            {context => (
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
                                    £{context.userTax.totalTakeHome / 12}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    color="textSecondary"
                                    gutterBottom
                                    variant="h5"
                                >
                                    Total Deductions
                                </Typography>
                                <Typography
                                    color="textPrimary"
                                    variant="h3"
                                >
                                    £0
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
                                    £0
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
            )}
        </SalaryContextConsumer>
    );
};

MonthlyTakeHomeCard.propTypes = {
    className: PropTypes.string
};

export default MonthlyTakeHomeCard;
