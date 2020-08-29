import React, { memo } from 'react';
import clsx from 'clsx';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Checkbox
} from '@material-ui/core';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';


const ExpenseList = memo(({ className, items, onItemRemove, onItemCheck, ...rest }) => (

    <Box
        mt={3}
    >
        <Card
            className={clsx(className)}
            {...rest}
        >
            {console.log(items)}
            <CardContent>

                <Typography
                    align="left"
                    color="textPrimary"
                    gutterBottom
                    variant="h4"
                >
                    Expenses
                    </Typography>
                <Divider />
                {items.length > 0 && (

                    <Box mt={3}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Cost</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map((expense, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    onClick={() => onItemCheck(idx)}
                                                    checked={expense.checked}
                                                    disableRipple
                                                />
                                            </TableCell>
                                            <TableCell >
                                                {expense.name}
                                            </TableCell>
                                            <TableCell >
                                                {expense.cost}
                                            </TableCell>
                                            <TableCell>
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

                )}
            </CardContent>
        </Card>
    </Box>

));
export default ExpenseList;