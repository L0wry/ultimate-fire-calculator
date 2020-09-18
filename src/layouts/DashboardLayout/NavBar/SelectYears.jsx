import React, { useState } from 'react';
import {
    makeStyles,
    MenuItem,
    FormControl,
    Select,
    Button,
    Typography,
    Box
} from '@material-ui/core';
import { useInvestmentContext } from '../../../context/InvestmentContext';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const years = new Array(100).fill(0).map((_, i) => i + 1)

export const SelectYears = () => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const { saveYearsToMature, yearsToMature } = useInvestmentContext();

    return (
        <Box
            display="flex"
            mt={3}
            alignItems="center">
            <FormControl style={{ width: "100%"}} className={classes.formControl}>
                <Typography
                    align="center"
                    color="textSecondary"
                    gutterBottom
                    variant="h6"
                >
                    Predict Net Worth In
                </Typography>
                <Select
                    style={{  textAlign: 'center'}}
                    labelId="open-select-label"
                    id="open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={yearsToMature}
                    onChange={e => saveYearsToMature(e.target.value)}
                >
                    {years.map((year) =>
                        <MenuItem key={`${year}-Years`} style={{ justifyContent: 'center' }} value={year}>{`${year} Years`}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
    )
}