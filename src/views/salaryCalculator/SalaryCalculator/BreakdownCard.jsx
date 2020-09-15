import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
    Box,
    Card,
    CardContent,
    Divider,
    Typography,
    makeStyles,
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { SalaryContextConsumer } from '../../../context/SalaryContext';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    table: {
        minWidth: 650,
    },
    statsItem: {
        alignItems: 'center',
        display: 'flex'
    },
    statsIcon: {
        marginRight: theme.spacing(1)
    }
}));

const BreakdownCard = ({ className, ...rest }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    return (
        <SalaryContextConsumer>
            {context => context.userTax.salary > 0 && (
                <Box mt={3}>
                <Card
                    className={clsx(classes.root, className)}
                    {...rest}
                >
                    <CardContent>

                        <Typography
                            align="center"
                            color="textPrimary"
                            gutterBottom
                            variant="h3"
                        >
                            Tax Breakdown
                        </Typography>
                        <Divider />
                        <Box mt={3}>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell align="center">Yearly</TableCell>
                                            <TableCell align="center">Monthly</TableCell>
                                            <TableCell align="center">Weekly</TableCell>
                                            <TableCell align="center">Daily</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow key={'id'}>
                                            <TableCell align="center" >
                                                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                                                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                </IconButton>
                                            </TableCell>


                                            <TableCell align="center" >
                                                Gross Income
                                        </TableCell>
                                            <TableCell align="center" >
                                                £test
                                        </TableCell>
                                          

                                            <Collapse in={open} timeout="auto" unmountOnExit>
                                                <Box margin={1}>
                                                    <Typography variant="h6" gutterBottom component="div">
                                                        History
                                                     </Typography>
                                                    <Table size="small" aria-label="purchases">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Date</TableCell>
                                                                <TableCell>Customer</TableCell>
                                                                <TableCell align="right">Amount</TableCell>
                                                                <TableCell align="right">Total price ($)</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow key='id'>
                                                                <TableCell component="th" scope="row">
                                                                    date
                                                                    </TableCell>
                                                                <TableCell>id</TableCell>
                                                                <TableCell align="right">sigh</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </Box>
                                            </Collapse>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </CardContent>
                    <Divider />
                </Card>
            </Box>
            )}
        </SalaryContextConsumer >
    );
};

BreakdownCard.propTypes = {
    className: PropTypes.string,
};

export default BreakdownCard;
