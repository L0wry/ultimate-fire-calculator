import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
    Box,
    Card,
    CardContent,
    Divider,
    Grid,
    Typography,
    makeStyles
} from '@material-ui/core';
import { SalaryContextConsumer } from '../../../context/SalaryContext';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


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

    return (
        <SalaryContextConsumer>
            {context => (
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
                                            <TableCell></TableCell>
                                            <TableCell align="center">Yearly</TableCell>
                                            <TableCell align="center">Monthly</TableCell>
                                            <TableCell align="center">Weekly</TableCell>
                                            <TableCell align="center">Daily</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {console.log(context.userTax)}
                                        {/* {rows.map((row) => (
                                            <TableRow key={row.name}>
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">{row.calories}</TableCell>
                                                <TableCell align="right">{row.fat}</TableCell>
                                                <TableCell align="right">{row.carbs}</TableCell>
                                                <TableCell align="right">{row.protein}</TableCell>
                                            </TableRow>
                                        ))} */}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </CardContent>
                    <Divider />
                </Card>
            )}
        </SalaryContextConsumer>
    );
};

BreakdownCard.propTypes = {
    className: PropTypes.string,
    product: PropTypes.object.isRequired
};

export default BreakdownCard;
