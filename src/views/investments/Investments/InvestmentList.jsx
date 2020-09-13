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
    IconButton,
} from '@material-ui/core';
import { DeleteOutlined, Edit, EditOutlined, SaveOutlined, Save } from '@material-ui/icons';


export const InvestmentList = memo(({ className, items = [], onItemEdit, onItemRemove, onItemSave, onItemCheck, ...rest }) => (
    <Box
        mt={3}
    >
        <Card
            className={clsx(className)}
            {...rest}
        >
            <CardContent>

                <Typography
                    align="left"
                    color="textPrimary"
                    gutterBottom
                    variant="h4"
                >
                    Investments
                    </Typography>
                <Divider />

                <Box mt={3}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Edit</TableCell>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Initial Amount</TableCell>
                                    <TableCell align="center">Expected Return</TableCell>
                                    <TableCell align="center">Monthly Contribution</TableCell>
                                    <TableCell align="center">Annual Charge</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((investment, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell align="center" padding="button">
                                            {investment.editMode ? (
                                                <Save onClick={() => onItemSave(idx)} >
                                                    <SaveOutlined />
                                                </Save>
                                            ) : (
                                                    <Edit onClick={() => onItemEdit(idx)}>
                                                        <EditOutlined />
                                                    </Edit>
                                                )}
                                        </TableCell>
                                        <TableCell align="center" >
                                            {investment.name}
                                        </TableCell>
                                        <TableCell align="center" >
                                            £{investment.initialAmount}
                                        </TableCell>
                                        <TableCell align="center" >
                                            {investment.expectedReturn * 100}%
                                        </TableCell>
                                        <TableCell align="center" >
                                            £{investment.monthlyContribution}
                                        </TableCell>
                                        <TableCell align="center" >
                                            {investment.annualCharge * 100}%
                                        </TableCell>
                                        <TableCell align="center">
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
            </CardContent>
        </Card>
    </Box>

));
