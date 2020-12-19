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
import { fNum } from '../../../utils/formatNumber';

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


export const InvestmentList = memo(({ className, items = [], onItemEdit, onItemRemove, onItemSave, onItemInclude }) => {
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
                <StyledTableCell className={classes.tableCell} align="center">Edit</StyledTableCell>
                <StyledTableCell className={classes.tableCell} align="left">Include?</StyledTableCell>
                <StyledTableCell className={classes.tableCell} align="center">Investment Name</StyledTableCell>
                <StyledTableCell className={classes.tableCell} align="center">Initial Amount</StyledTableCell>
                <StyledTableCell className={classes.tableCell} align="center">Expected Annual Return</StyledTableCell>
                <StyledTableCell className={classes.tableCell} align="center">Monthly Contribution</StyledTableCell>
                <StyledTableCell className={classes.tableCell} align="center">Contributing For</StyledTableCell>
                <StyledTableCell className={classes.tableCell} align="center">Annual Charge</StyledTableCell>
                <StyledTableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((investment, idx) =>
                investment.editMode ? (
                  <Formik
                    key={`form-${idx}`}
                    initialValues={{
                      name: investment.investmentName,
                      investmentType: investment.investmentType,
                      initialAmount: investment.initialAmount,
                      expectedReturn: math.round(math.multiply(investment.expectedReturn, 100), 4),
                      monthlyContribution: investment.monthlyContribution,
                      annualCharge: math.round(math.multiply(investment.annualCharge, 100), 4),
                      stopContributingInYear: investment.stopContributingInYear
                    }}
                    validationSchema={object({
                      name: string(),
                      initialAmount: number(),
                      expectedReturn: number(),
                      monthlyContribution: number(),
                      annualCharge: number(),
                      stopContributingInYear: number()
                    })}
                    onSubmit={(investment, { setStatus }) => {
                      setStatus()
                      onItemSave(investment, idx)
                    }}
                  >{({ submitForm, values, setFieldValue }) => (
                    <StyledTableRow key={idx}>
                      <StyledTableCell align="center">
                        <Save onClick={submitForm} >
                          <SaveOutlined />
                        </Save>
                      </StyledTableCell>
                      <StyledTableCell className={classes.tableCell} align="center"></StyledTableCell>

                      <StyledTableCell align="center" >
                        <Input
                          name="name"
                          type="text"
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center" >
                        <Input
                          name="initialAmount"
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
                          name="expectedReturn"
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
                      <StyledTableCell align="center" >
                        <Input
                          name="monthlyContribution"
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
                        <FormControl className={classes.select}>
                          <Select
                            className={classes.select}
                            labelId="stopContributingInYear"
                            label="stopContributingInYear"
                            id="stopContributingInYear"
                            value={values.stopContributingInYear}
                            onChange={e => setFieldValue('stopContributingInYear', e.target.value)}
                            required
                          >
                            {
                              new Array(100).fill(0).map((_, i) =>
                                <MenuItem key={i} className={classes.select} value={i}>{i === 0 ? 'Life' : i === 1 ? `${i} Year` : `${i} Years`}</MenuItem>)
                            }
                          </Select>
                        </FormControl>
                      </StyledTableCell>
                      <StyledTableCell align="center" >
                        <Input
                          name="annualCharge"
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
                      <StyledTableCell align="center" padding="checkbox">
                        <Checkbox
                          onClick={() => onItemInclude(idx)}
                          checked={investment.isIncluded}
                        />
                      </StyledTableCell>
                      <StyledTableCell className={classes.tableCell} align="center" >
                        {investment.investmentName}
                      </StyledTableCell>
                      <StyledTableCell className={classes.tableCell} align="center" >
                        £{fNum(investment.initialAmount)}
                      </StyledTableCell>
                      <StyledTableCell className={classes.tableCell} align="center" >
                        {fNum(math.round(math.multiply(investment.expectedReturn, 100), 4))}%
                                            </StyledTableCell>
                      <StyledTableCell className={classes.tableCell} align="center" >
                        £{fNum(investment.monthlyContribution)}
                      </StyledTableCell>

                      <StyledTableCell className={classes.tableCell} align="center" >
                        {`${investment.stopContributingInYear === 0 ? 'Life' : investment.stopContributingInYear === 1 ? `${investment.stopContributingInYear} Year` : `${investment.stopContributingInYear} Years`}`}
                      </StyledTableCell>

                      <StyledTableCell className={classes.tableCell} align="center" >
                        {fNum(math.round(math.multiply(investment.annualCharge, 100), 4))}%
                                            </StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton aria-label="Delete Item" onClick={() => onItemRemove(idx)}>
                          <DeleteOutlined />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>

                  )
              )}
              <StyledTableRow>
                <StyledTableCell className={classes.tableCell} align="center">
                  <strong>Totals</strong>
                </StyledTableCell>
                <StyledTableCell className={classes.tableCell} align="center" />

                <StyledTableCell className={classes.tableCell} align="center" >
                  <strong>£{fNum(items.reduce((a, b) => a + b.initialAmount, 0))}</strong>
                </StyledTableCell>
                <StyledTableCell className={classes.tableCell} align="center" />

                <StyledTableCell className={classes.tableCell} align="center" >
                  <strong>£{fNum(items.reduce((a, b) => a + b.monthlyContribution, 0))}</strong>
                </StyledTableCell>
                <StyledTableCell className={classes.tableCell} align="center" />
                <StyledTableCell className={classes.tableCell} align="center" />

                <StyledTableCell align="center" />

              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box >
  )
})
