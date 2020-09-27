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
        width: "100%"
    },
    select: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.tertiary,
      justifyContent: 'center',
      width: "100%",
      textAlign: 'center'
    },
    text: {
      color: theme.palette.text.tertiary
  }
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
            alignItems="center">
            <FormControl className={classes.formControl}>
                <Typography
                    align="center"
                    className={classes.text}
                    gutterBottom
                    variant="h5"
                >
                    Predict Net Worth In
                </Typography>
                <Select
                    className={classes.select}
                    labelId="open-select-label"
                    id="open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={yearsToMature}
                    onChange={e => saveYearsToMature(e.target.value)}
                >
                    {years.map((year) =>
                        <MenuItem key={`${year}-Years`} className={classes.select} value={year}>{`${year} Years`}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
    )
}