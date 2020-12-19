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
  Checkbox
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
                <TableCell className={classes.tableCell} align="center">Edit</TableCell>
                <TableCell className={classes.tableCell} align="left">Include?</TableCell>
                <TableCell className={classes.tableCell} align="center">Investment Name</TableCell>
                <TableCell className={classes.tableCell} align="center">Initial Amount</TableCell>
                <TableCell className={classes.tableCell} align="center">Expected Annual Return</TableCell>
                <TableCell className={classes.tableCell} align="center">Monthly Contribution</TableCell>
                <TableCell className={classes.tableCell} align="center">Contributing For</TableCell>
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
                    <TableRow key={idx}>
                      <TableCell align="center">
                        <Save onClick={submitForm} >
                          <SaveOutlined />
                        </Save>
                      </TableCell>
                      <TableCell className={classes.tableCell} align="center"></TableCell>

                      <TableCell align="center" >
                        <Input
                          name="name"
                          type="text"
                        />
                      </TableCell>
                      <TableCell align="center" >
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
                      </TableCell>
                      <TableCell align="center" >
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
                      </TableCell>
                      <TableCell align="center" >
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
                      </TableCell>
                      <TableCell align="center" >
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
                      </TableCell>
                      <TableCell align="center" >
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
                      <TableCell align="center" padding="checkbox">
                        <Checkbox
                          onClick={() => onItemInclude(idx)}
                          checked={investment.isIncluded}
                        />
                      </TableCell>
                      <TableCell className={classes.tableCell} align="center" >
                        {investment.investmentName}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="center" >
                        £{fNum(investment.initialAmount)}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="center" >
                        {fNum(math.round(math.multiply(investment.expectedReturn, 100), 4))}%
                                            </TableCell>
                      <TableCell className={classes.tableCell} align="center" >
                        £{fNum(investment.monthlyContribution)}
                      </TableCell>

                      <TableCell className={classes.tableCell} align="center" >
                        {`${investment.stopContributingInYear === 0 ? 'Life' : investment.stopContributingInYear === 1 ? `${investment.stopContributingInYear} Year` : `${investment.stopContributingInYear} Years`}`}
                      </TableCell>

                      <TableCell className={classes.tableCell} align="center" >
                        {fNum(math.round(math.multiply(investment.annualCharge, 100), 4))}%
                                            </TableCell>
                      <TableCell align="center">
                        <IconButton aria-label="Delete Item" onClick={() => onItemRemove(idx)}>
                          <DeleteOutlined />
                        </IconButton>
                      </TableCell>
                    </TableRow>

                  )
              )}
              <TableRow>
                <TableCell className={classes.tableCell} align="center">
                  <strong>Totals</strong>
                </TableCell>
                <TableCell className={classes.tableCell} align="center" />

                <TableCell className={classes.tableCell} align="center" >
                  <strong>£{fNum(items.reduce((a, b) => a + b.initialAmount, 0))}</strong>
                </TableCell>
                <TableCell className={classes.tableCell} align="center" />

                <TableCell className={classes.tableCell} align="center" >
                  <strong>£{fNum(items.reduce((a, b) => a + b.monthlyContribution, 0))}</strong>
                </TableCell>
                <TableCell className={classes.tableCell} align="center" />
                <TableCell className={classes.tableCell} align="center" />

                <TableCell align="center" />

              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box >
  )
})
