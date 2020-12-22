import React from 'react';
import PropTypes from 'prop-types';
import {
    Box,
  
    Grid,
    Typography,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        height: '100%'
    },
    text: {
        textAlign: 'center'
    }
}));

const BudgetRemaining = ({ className, difference }) => {
    const classes = useStyles();

    return (
        <Box>
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
                        variant="h3"
                    >
                        Amount Available To Invest
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
        </Box>

    );
};

BudgetRemaining.propTypes = {
    className: PropTypes.string
};

export default BudgetRemaining;
