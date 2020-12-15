import React from 'react';
import PropTypes from 'prop-types';
import { all, create } from 'mathjs'

import {
    Box,
    makeStyles,
    withStyles,
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

const math = create(all, {
    number: 'BigNumber',
    precision: 32
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    table: {
        minWidth: 650,
    },
    tableBold: {
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.default
    },
    table: {

    }
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        fontSize: 16,

    },
    body: {
        fontSize: 14,
        color: theme.palette.text.secondary
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.background.dark,
        },
    },
}))(TableRow);



const Headers = () => (
    <TableHead>

        <TableRow>
            <StyledTableCell />
            <StyledTableCell align="center">Yearly</StyledTableCell>
            <StyledTableCell size="small" align="center">Monthly</StyledTableCell>
            <StyledTableCell size="small" align="center">Weekly</StyledTableCell>
            <StyledTableCell size="small" align="center">Daily</StyledTableCell>
        </TableRow>
    </TableHead >
)
const formatNumber = number => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

const TaxTableRow = ({ name, amount, stripedRows }) => (
    <StyledTableRow key={name}>
        <StyledTableCell align="center" >
            {name}
        </StyledTableCell>
        <StyledTableCell align="center">£{formatNumber(amount)}</StyledTableCell>
        <StyledTableCell align="center">£{formatNumber(math.round(math.divide(amount, 12), 2))}</StyledTableCell>
        <StyledTableCell align="center">£{formatNumber(math.round(math.divide(amount, 52), 2))}</StyledTableCell>
        <StyledTableCell align="center">£{formatNumber(math.round(math.divide(amount, 365), 2))}</StyledTableCell>
    </StyledTableRow>

)

const BreakdownCard = ({ className, userTax}) => {
    const classes = useStyles();

    return (
        <Box mt={3}>
            <Box mt={3}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <Headers />

                        <TableBody>
                            <TaxTableRow name={'Gross Income'} amount={userTax.salary} />
                            <TaxTableRow name={'Taxable Income'} amount={userTax.taxableIncome} />
                            <TaxTableRow name={'Income Tax'} amount={userTax.incomeTax.totalIncomeTax} />
                            <TaxTableRow name={'National Insurance'} amount={userTax.nationalInsuranceTax.totalNationalInsuranceTax} />
                            {userTax.incomeTax.taxFreePersonalAllowanceRemovedBy100kTax && (
                                <TaxTableRow name={'100k Personal Allowance Deduction'} amount={userTax.incomeTax.taxFreePersonalAllowanceRemovedBy100kTax} />

                            )}
                            {userTax.studentLoan?.yearlyAmountPaid > 0 && (
                                <TaxTableRow name={'Student Tax'} amount={userTax.studentLoan.yearlyAmountPaid} />
                            )}

                            <TaxTableRow name={'Take Home Pay'} amount={userTax.totalTakeHome} />
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

BreakdownCard.propTypes = {
    className: PropTypes.string,
};

export default BreakdownCard;
