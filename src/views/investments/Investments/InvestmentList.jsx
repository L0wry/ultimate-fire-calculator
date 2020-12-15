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
    makeStyles,
    InputAdornment
} from '@material-ui/core';
import { DeleteOutlined, Edit, EditOutlined, SaveOutlined, Save } from '@material-ui/icons';
import { Formik, useField } from "formik";
import { string, number, object } from "yup";
import { all, create } from 'mathjs'

const math = create(all, {
    number: 'BigNumber',
    precision: 32
});

const useStyles = makeStyles((theme) => ({
    root: {},
    input: {
        color: theme.palette.text.secondary,
    },
    header: {
        color: theme.palette.text.primary
    },
    tableCell: {
        color: theme.palette.text.secondary
    },
    error: {
        color: 'red'
      },
}));


const Input = ({ label, inputProps, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    const classes = useStyles();

    return (
        <>
            <TextField
                autoComplete="off"
                label={label}
                className="text-input"
                variant="standard"
                required
                fullWidth
                InputProps={{
                    className: classes.input,
                    ...inputProps
                }}
                {...field} {...props} />
            {meta.touched && meta.error ? (
                 <Typography
                 className={classes.error}
                 align="center"
                 gutterBottom
                 variant="body1"
               >
                 Please only use numbers
               </Typography>
            ) : null}
        </>
    );
};


export const InvestmentList = memo(({ className, items = [], onItemEdit, onItemRemove, onItemSave, onItemCheck, ...rest }) => {
    const classes = useStyles();

    return (
        <Box
            mt={3}
        >

            <Typography
                align="left"
                color="textPrimary"
                gutterBottom
                variant="h2"
            >
                Assets
                    </Typography>

            <Box mt={3}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableCell} align="center"></TableCell>
                                <TableCell className={classes.tableCell} align="center">Name</TableCell>
                                <TableCell className={classes.tableCell} align="center">Initial Amount</TableCell>
                                <TableCell className={classes.tableCell} align="center">Expected Annual Return</TableCell>
                                <TableCell className={classes.tableCell} align="center">Monthly Contribution</TableCell>
                                <TableCell className={classes.tableCell} align="center">Annual Charge</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((investment, idx) =>
                                investment.editMode ? (
                                    <Formik
                                        key={`form-${idx}`}
                                        initialValues={{
                                            name: investment.investmentName,
                                            initialAmount: investment.initialAmount,
                                            expectedReturn: math.round(math.multiply(investment.expectedReturn, 100), 2),
                                            monthlyContribution: investment.monthlyContribution,
                                            annualCharge: math.round(math.multiply(investment.annualCharge, 100), 2)
                                        }}
                                        validationSchema={object({
                                            name: string(),
                                            initialAmount: number(),
                                            expectedReturn: number(),
                                            monthlyContribution: number(),
                                            annualCharge: number()
                                        })}
                                        onSubmit={(investment, { setStatus }) => {
                                            setStatus()
                                            onItemSave(investment, idx)
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
                                                    type="number"
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
                                                    type="number"
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
                                                    type="number"
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
                                                    type="number"
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
                                            <TableCell className={classes.tableCell} align="center" >
                                                {investment.investmentName}
                                            </TableCell>
                                            <TableCell className={classes.tableCell} align="center" >
                                                £{investment.initialAmount}
                                            </TableCell>
                                            <TableCell className={classes.tableCell} align="center" >
                                                {math.round(math.multiply(investment.expectedReturn, 100), 2)}%
                                            </TableCell>
                                            <TableCell className={classes.tableCell} align="center" >
                                                £{investment.monthlyContribution}
                                            </TableCell>
                                            <TableCell className={classes.tableCell} align="center" >
                                                {math.round(math.multiply(investment.annualCharge, 100), 2)}%
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
        </Box >
    )
})
