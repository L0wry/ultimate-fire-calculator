import React, { memo } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  makeStyles,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  Checkbox,
  withStyles
} from '@material-ui/core';
import { DeleteOutlined, Edit, EditOutlined, SaveOutlined, Save } from '@material-ui/icons';
import { Formik, useField } from "formik";
import { string, number, object } from "yup";
import { all, create } from 'mathjs'
import { fNum } from '../../utils/formatNumber';

const math = create(all, {
  number: 'BigNumber',
  precision: 32
});

const useStyles = makeStyles((theme) => ({
  root: {},
  centerText: {
    textAlign: "center"
  },
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
  select: {
    justifyContent: 'center',
    textAlign: 'center',
  },
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
        inputProps={{ style: { textAlign: 'center' } }}
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


export const DebtList = memo(({ items = [], onItemEdit, onItemRemove, onItemSave, onItemInclude }) => {
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
        Liabilities
                    </Typography>

      <Box mt={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell className={classes.tableCell} align="center">Edit</StyledTableCell>
                <StyledTableCell className={classes.tableCell} align="center">Name</StyledTableCell>
                <StyledTableCell className={classes.tableCell} align="center">Outstanding Amount Due</StyledTableCell>
                <StyledTableCell className={classes.tableCell} align="center">Interest Rate</StyledTableCell>
                <StyledTableCell className={classes.tableCell} align="center">Monthly Repayment</StyledTableCell>
                <StyledTableCell className={classes.tableCell} align="center">Years Left To Pay</StyledTableCell>
                <StyledTableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((debt, idx) =>
                debt.editMode ? (
                  <Formik
                    key={`form-${idx}`}
                    initialValues={{
                      name: debt.name,
                      outstandingAmountDue: debt.outstandingAmountDue,
                      interestRate: math.round(math.multiply(debt.interestRate, 100), 4),
                      yearsLeftToPay: debt.yearsLeftToPay || 25,
                      monthlyPayments: debt.monthlyPayments || 0
                    }}
                    validationSchema={object({
                      name: string(),
                      outstandingAmountDue: number(),
                      interestRate: number(),
                      yearsLeftToPay: number(),
                      monthlyPayments: number()
                    })}
                    onSubmit={(debt, { setStatus }) => {
                      setStatus()
                      onItemSave(debt, idx)
                    }}
                  >{({ submitForm, values, setFieldValue }) => (
                    <StyledTableRow key={idx}>
                      <StyledTableCell align="center">
                        <Save onClick={submitForm} >
                          <SaveOutlined />
                        </Save>
                      </StyledTableCell>

                      <StyledTableCell align="center" >
                        <Input
                          name="name"
                          type="text"
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center" >
                        <Input
                          name="outstandingAmountDue"
                          type="number"
                          inputProps={{
                            startAdornment: (
                              <InputAdornment
                                classes={{ positionStart: classes.centerStartAdornment }}
                                position="start">
                                <Typography >
                                  £
                                                                    </Typography>
                              </InputAdornment>)
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center" >
                        <Input
                          name="interestRate"
                          type="number"
                          inputProps={{
                            endAdornment: (
                              <InputAdornment
                                classes={{ positionEnd: classes.centerEndAdornment }}
                                position="end">
                                <Typography >
                                  %
                                                                    </Typography>
                              </InputAdornment>)
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell className={classes.tableCell} align="center" >
                        £{fNum(debt.monthlyPayments)}
                      </StyledTableCell>
                      <StyledTableCell align="center" >
                        <FormControl className={classes.select}>
                          <Select
                            className={classes.select}
                            labelId="yearsLeftToPay"
                            label="yearsLeftToPay"
                            id="yearsLeftToPay"
                            value={values.yearsLeftToPay}
                            onChange={e => setFieldValue('yearsLeftToPay', e.target.value)}
                            required
                          >
                            {
                              new Array(100).fill(0).map((_, i) => {
                                i++
                                return <MenuItem key={i} className={classes.select} value={i}>{i === 0 ? 'Life' : i === 1 ? `${i} Year` : `${i} Years`}</MenuItem>
                              })
                            }
                          </Select>
                        </FormControl>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton aria-label="Delete Item" onClick={() => onItemRemove(idx)}>
                          <DeleteOutlined />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                  </Formik>

                ) : (
                    <StyledTableRow key={idx}>
                      <StyledTableCell align="center">
                        <Edit onClick={() => onItemEdit(idx)}>
                          <EditOutlined />
                        </Edit>
                      </StyledTableCell>
                      <StyledTableCell className={classes.tableCell} align="center" >
                        {debt.name}
                      </StyledTableCell>
                      <StyledTableCell className={classes.tableCell} align="center" >
                        £{fNum(debt.outstandingAmountDue)}
                      </StyledTableCell>
                      <StyledTableCell className={classes.tableCell} align="center" >
                        {fNum(math.round(math.multiply(debt.interestRate, 100), 4))}%
                                            </StyledTableCell>
                      <StyledTableCell className={classes.tableCell} align="center" >
                        £{fNum(debt.monthlyPayments)}
                      </StyledTableCell>
                      <StyledTableCell className={classes.tableCell} align="center" >
                        {`${debt.yearsLeftToPay === 1 ? `${debt.yearsLeftToPay} Year` : `${debt.yearsLeftToPay} Years`}`}
                      </StyledTableCell>


                      <StyledTableCell align="center">
                        <IconButton aria-label="Delete Item" onClick={() => onItemRemove(idx)}>
                          <DeleteOutlined />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>

                  )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box >
  )
})
