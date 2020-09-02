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
import { BudgetContextConsumer } from '../../../context/BudgetContext';


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
                        Investments
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
