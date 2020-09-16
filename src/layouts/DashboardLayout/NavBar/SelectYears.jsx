import React, { useState } from 'react';
import {
    Drawer,
    Hidden,
    List,
    makeStyles,
    Grid,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Button,
    Typography,
    Box
} from '@material-ui/core';
import { InvestmentContextConsumer } from '../../../context/InvestmentContext';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

// const SomeContent = React.forwardRef((props, ref) => <div {...props} ref={ref}>Hello, World!</div>);
// const SomeContent = React.forwardRef((props, ref) => <div {...props} ref={ref}>Hello, World!</div>);

const years = new Array(70).fill(0).map((_, i) => i + 1)

// const generateYears = () => new Array(1).fill(0).map((_, i) => React.forwardRef((props, ref) => )

export const SelectYears = () => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };


    return (
        <InvestmentContextConsumer>
            {({ saveYearsToMature, yearsToMature }) => (
                <Box
                    display="flex"
                    mt={3}
                    alignItems="center">
                    <FormControl className={classes.formControl}>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="h6"
                        >
                            Predict Net Worth In
                        </Typography>
                        <Select
                            labelId="open-select-label"
                            id="open-select"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={yearsToMature}
                            onChange={e => saveYearsToMature(e.target.value)}
                        >
                            {years.map((year) =>
                                <MenuItem key={`${year}-Years`} value={year}>{`${year} Years`}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Box>
            )}
        </InvestmentContextConsumer>


    )
}