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
    TextField,
    Button,
    InputAdornment
} from '@material-ui/core';
import { DeleteOutlined, Edit, EditOutlined, SaveOutlined, Save } from '@material-ui/icons';
import { Formik, useField } from "formik";
import { string, number, object } from "yup";


const Input = ({ label, inputProps, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
        <>
            <TextField
                label={label}
                className="text-input"
                variant="standard"
                required
                fullWidth
                InputProps={inputProps ? inputProps : null}
                {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};


export const InvestmentList = memo(({ className, items = [], onItemEdit, onItemRemove, onItemSave, onItemCheck, ...rest }) => {

        return (
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
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center">Name</TableCell>
                                            <TableCell align="center">Initial Amount</TableCell>
                                            <TableCell align="center">Expected Return</TableCell>
                                            <TableCell align="center">Monthly Contribution</TableCell>
                                            <TableCell align="center">Annual Charge</TableCell>
                                            <TableCell />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {items.map((investment, idx) =>
                                            investment.editMode ? (
                                                <Formik
                                                    key='form'
                                                    initialValues={{
                                                        name: investment.name,
                                                        initialAmount: investment.initialAmount,
                                                        expectedReturn: investment.expectedReturn * 100,
                                                        monthlyContribution: investment.monthlyContribution
                                                    }}
                                                    validationSchema={object({
                                                        name: string(),
                                                        initialAmount: number(),
                                                        expectedReturn: number(),
                                                        monthlyContribution: number()

                                                    })}
                                                    onSubmit={(investment, { setSubmitting }) => {
                                                        onItemSave(investment, idx)
                                                        setSubmitting(false);
                                                    }}
                                                >{({ submitForm }) => (
                                                    <TableRow key={idx}>

                                                        <TableCell align="center">

                                                            <Save onClick={submitForm} >
                                                                <SaveOutlined />
                                                            </Save>

                                                        </TableCell>
                                                        <TableCell align="center" >
                                                            <Input
                                                                label="Investment Name"
                                                                name="name"
                                                                type="text"
                                                            />
                                                        </TableCell>
                                                        <TableCell align="center" >
                                                            <Input
                                                                label="Current Value"
                                                                name="initialAmount"
                                                                type="text"
                                                                inputProps={{
                                                                    startAdornment: (
                                                                        <InputAdornment position="start">
                                                                            <Typography >
                                                                                £
                                                                    </Typography>
                                                                        </InputAdornment>)
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="center" >
                                                            <Input
                                                                label="Annual Return"
                                                                name="expectedReturn"
                                                                type="text"
                                                                inputProps={{
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <Typography >
                                                                                %
                                                                    </Typography>
                                                                        </InputAdornment>)
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="center" >
                                                            <Input
                                                                label="Monthly Contribution"
                                                                name="monthlyContribution"
                                                                type="text"
                                                                inputProps={{
                                                                    startAdornment: (
                                                                        <InputAdornment position="start">
                                                                            <Typography >
                                                                                £
                                                                    </Typography>
                                                                        </InputAdornment>)
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="center" >
                                                            <Input
                                                                label="Annual Charge"
                                                                name="annualCharge"
                                                                type="text"
                                                                inputProps={{
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <Typography >
                                                                                %
                                                                    </Typography>
                                                                        </InputAdornment>)
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <IconButton aria-label="Delete Item" onClick={() => onItemRemove(idx)}>
                                                                <DeleteOutlined />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                                </Formik>

                                            ) : (
                                                    <TableRow key={idx}>
                                                        <TableCell align="center">
                                                            <Edit onClick={() => onItemEdit(idx)}>
                                                                <EditOutlined />
                                                            </Edit>
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
                                                )
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </CardContent>
                </Card>
            </Box >
        )
    })
