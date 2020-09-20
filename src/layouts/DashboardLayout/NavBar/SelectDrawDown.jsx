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
    },
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

    console.log(drawDownPercent)
    return (
        <Box
            display="flex"
            alignItems="center">
            <FormControl style={{ width: "100%"}} className={classes.formControl}>
                <Typography
                    align="center"
                    color="textSecondary"
                    gutterBottom
                    variant="h6"
                >
                    Draw Down Percentage
                </Typography>
                <Select
                    style={{  textAlign: 'center'}}
                    labelId="open-select-label"
                    id="open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={drawDownPercent * 100}
                    onChange={e => saveDrawdown(e.target.value)}
                >
                    {percentages.map((percent) =>
                        <MenuItem key={percent} style={{ justifyContent: 'center' }} value={percent}>{`${percent}%`}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
    )
}