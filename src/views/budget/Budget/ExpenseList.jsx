import React, { memo } from 'react';
import {
    Box,
    makeStyles,
    Typography,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Checkbox
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

const ExpenseList = memo(({ className, items = [], onItemRemove, onItemCheck, ...rest }) => {
    
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
            boxShadow={3}
            p={2} 
            mt={3}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableCell} align="left">Include?</TableCell>
                                <TableCell className={classes.tableCell} align="center">Name</TableCell>
                                <TableCell className={classes.tableCell} align="center">Cost</TableCell>
                                <TableCell className={classes.tableCell} align="center">Remove</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((expense, idx) => (
                                <TableRow key={idx}>
                                    <TableCell align="center" padding="checkbox">
                                        <Checkbox
                                            onClick={() => onItemCheck(idx)}
                                            checked={expense.checked}
                                        />
                                    </TableCell>
                                    <TableCell className={classes.tableCell} align="center" >
                                        {expense.name}
                                    </TableCell>
                                    <TableCell className={classes.tableCell} align="center" >
                                        £{expense.cost}
                                    </TableCell>
                                    <TableCell className={classes.tableCell} align="center">
                                        <IconButton aria-label="Delete Item" onClick={() => onItemRemove(idx)}>
                                            <DeleteOutlined />
                                        </IconButton>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </Box>
    )
});
export default ExpenseList;