import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  InputLabel,
  Select,
  Button,
  Card,
  MenuItem,
  CardContent,
  TextField,
  InputAdornment,
  Typography,
  makeStyles,
  Grid,
  Divider
} from '@material-ui/core';
import { Formik, Form, useField } from "formik";
import { number, object } from "yup";
import { useInvestmentContext } from '../../../context/InvestmentContext';
import { all, create } from 'mathjs'
const math = create(all, {
  number: 'BigNumber',
  precision: 32
});

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Input = ({ label, type, inputProps, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <TextField
        type={type}
        label={label}
        className="text-input"
        variant="outlined"
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


const IncomeDetails = ({ setUserFinances, userTax, className, ...rest }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const { addMultipleInvestments } = useInvestmentContext();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
        <Card>
          <CardContent>

            <Typography
              align="left"
              color="textPrimary"
              gutterBottom
              variant="h3"
            >
              Your Circumstance
                  </Typography>
            <Divider />
            <Box mt={3}>
              <Formik
                initialValues={{
                  salary: userTax.salary || 0,
                  personalPensionContribution: userTax.personalPensionContributionPercent ? math.round(math.multiply(userTax.personalPensionContributionPercent, 100), 2) : 0,
                  employerPensionContribution: userTax.employerPensionContributionPercent ? math.round(math.multiply(userTax.employerPensionContributionPercent, 100), 2) : 0,
                  taxFreePersonalAllowance: userTax.taxFreePersonalAllowance || 12500,
                  studentLoanPlanType: userTax.studentLoanPlanType || 0
                }}
                validationSchema={object({
                  salary: number(),
                  personalPensionContribution: number(),
                  employerPensionContribution: number(),
                  taxFreePersonalAllowance: number(),
                  studentLoanPlanType: number()
                })}
                onSubmit={(userFinance, { setSubmitting }) => {
                  setUserFinances(userFinance, addMultipleInvestments)
                  setSubmitting(false);
                }}
              >{({values, handleChange}) => (
                <Form>
                  <Grid
                    container
                    spacing={3}
                  >
                    <Grid
                      item
                      lg={6}
                      md={6}
                      xs={12}
                    >
                      <Input
                        label="Annual Salary"
                        name="salary"
                        type="tel"
                        inputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Typography >
                                £
                                    </Typography>
                            </InputAdornment>)
                        }}
                      />
                    </Grid>

                    <Grid
                      item
                      lg={6}
                      md={6}
                      xs={12}
                    >

                      <Input
                        label="Personal Pension Contribution Percentage"
                        name="personalPensionContribution"
                        type="tel"
                        inputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              <Typography >
                                %
                                    </Typography>
                            </InputAdornment>)
                        }}
                      />

                    </Grid>

                    <Grid
                      item
                      lg={6}
                      md={6}
                      xs={12}
                    >

                      <Input
                        label="Employer Pension Contribution Percentage"
                        name="employerPensionContribution"
                        type="tel"
                        inputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              <Typography >
                                %
                                    </Typography>
                            </InputAdornment>)
                        }}
                      />

                    </Grid>

                    <Grid
                      item
                      lg={6}
                      md={6}
                      xs={12}
                    >
                      <Input
                        label="Tax Free Personal Allowance"
                        name="taxFreePersonalAllowance"
                        type="tel"
                        inputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Typography >
                                £
                                    </Typography>
                            </InputAdornment>)
                        }}
                      />
                    </Grid>

                    <Grid
                      item
                      lg={6}
                      md={6}
                      xs={12}>

                      <InputLabel id="plan-name">Student Loan Type</InputLabel>

                      <Select
                        labelId="studentLoanPlanType"
                        id="studentLoanPlanType"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        onChange={handleChange("studentLoanPlanType")}
                        value={values.studentLoanPlanType}
                      >
                        <MenuItem key={'plan0'} value={0}>{`No Loan`}</MenuItem>
                        <MenuItem key={'plan1'} value={1}>{`Plan 1`}</MenuItem>
                        <MenuItem key={'plan2'} value={2}>{`Plan 2`}</MenuItem>
                      </Select>
                    </Grid>
                  </Grid>
                  <Box
                    display="flex"
                    justifyContent="center"
                    p={2}
                    mt={3}>
                    <Button
                      type="submit"
                      color="primary"
                      fullWidth
                      variant="text">Calculate</Button>
                  </Box>
                </Form>
              )}
              </Formik>
            </Box>
          </CardContent>
        </Card>
    </div >
  );
};

IncomeDetails.propTypes = {
  className: PropTypes.string
};

export default IncomeDetails;
