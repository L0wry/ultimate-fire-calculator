import React, { memo } from 'react';
import {
    Box,
    makeStyles,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Checkbox,
    withStyles
} from '@material-ui/core';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';

const useStyles = makeStyles((theme) => ({
    root: {},
    header: {
        color: theme.palette.text.primary
    },
    tableCell: {
        color: theme.palette.text.secondary
    }
}));

const StyledTableCell = withStyles((theme) => ({
    body: {
        fontSize: 14,
        color: theme.palette.text.secondary
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.dark,
        },
    },
}))(TableRow);


const ExpenseList = memo(({ className, expenses = [], debts = [], onItemRemove, onItemCheck, ...rest }) => {

    const classes = useStyles();

    return (
        <Box
            mt={3}
        >

            <Typography
                align="left"
                className={classes.header}
                gutterBottom
                variant="h2"
            >
                Expenses
                    </Typography>

            <Box
                p={2}
                mt={3}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell className={classes.tableCell} align="left">Include?</StyledTableCell>
                                <StyledTableCell className={classes.tableCell} align="center">Name</StyledTableCell>
                                <StyledTableCell className={classes.tableCell} align="center">Cost</StyledTableCell>
                                <StyledTableCell className={classes.tableCell} align="center">Remove</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {expenses.map((expense, idx) => (
                                <StyledTableRow key={`expense-${idx}`}>
                                    <StyledTableCell align="center" padding="checkbox">
                                        <Checkbox
                                            onClick={() => onItemCheck(idx)}
                                            checked={expense.checked}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell className={classes.tableCell} align="center" >
                                        {expense.name}
                                    </StyledTableCell>
                                    <StyledTableCell className={classes.tableCell} align="center" >
                                        £{expense.cost}
                                    </StyledTableCell>
                                    <StyledTableCell className={classes.tableCell} align="center">
                                        <IconButton aria-label="Delete Item" onClick={() => onItemRemove(idx)}>
                                            <DeleteOutlined />
                                        </IconButton>
                                    </StyledTableCell>

                                </StyledTableRow>
                            ))}
                            {debts.map((debt, idx) => (
                                <StyledTableRow key={`debt=${idx}`}>
                                    <StyledTableCell align="center" padding="checkbox">
                                        <Checkbox
                                            disabled
                                            checked={true}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell className={classes.tableCell} align="center" >
                                        {debt.name}
                                    </StyledTableCell>
                                    <StyledTableCell className={classes.tableCell} align="center" >
                                        £{debt.monthlyPayments}
                                    </StyledTableCell>
                                    <StyledTableCell className={classes.tableCell} align="center">
                                        <IconButton aria-label="Delete Item" disabled>
                                            <DeleteOutlined />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </Box>
    )
});
export default ExpenseList;