import React, { useState } from 'react';
import {
    makeStyles,
    MenuItem,
    FormControl,
    Select,
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

const percentages = new Array(10).fill(0).map((_, i) => i + 1)

export const SelectDrawDown = () => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const { saveDrawdown, drawDownPercent } = useInvestmentContext();

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
                    Draw Down Percentage
                </Typography>
                <Select
                    className={classes.select}
                    labelId="open-select-label"
                    id="open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={drawDownPercent * 100}
                    onChange={e => saveDrawdown(e.target.value)}
                >
                    {percentages.map((percent) =>
                        <MenuItem key={percent} className={classes.select}  value={percent}>{`${percent}%`}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
    )
}