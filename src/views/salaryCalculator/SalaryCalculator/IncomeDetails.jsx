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
import { Formik, Form, useField, ErrorMessage, Field } from "formik";
import { number, object } from "yup";
import { useInvestmentContext } from '../../../context/InvestmentContext';
import { all, create } from 'mathjs'
const math = create(all, {
  number: 'BigNumber',
  precision: 32
});

const useStyles = makeStyles((theme) => ({
  root: {},
  text: {
    color: theme.palette.text.secondary
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.tertiary,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    }
  },
  error: {
    color: 'red'
  },
  input: {
    color: theme.palette.text.tertiary,
  },
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
  const classes = useStyles();

  return (
    <>
      <TextField
        type={type}
        label={label}
        className={classes.input}
        variant="outlined"
        fullWidth
        InputProps={{
          className: classes.text,
          ...inputProps
        }}
        {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">
          <Typography
            className={classes.error}
            align="center"
            gutterBottom
            variant="body1"
          >
            Please only use numbers
          </Typography>

        </div>
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
      <Typography
        align="left"
        gutterBottom
        variant="body1"
      >
        Tell us about your situation
      </Typography>
      <Box mt={3}>
        <Formik
          initialValues={{
            salary: userTax.salary || 0,
            personalPensionContribution: userTax.personalPensionContributionPercent ? math.round(math.multiply(userTax.personalPensionContributionPercent, 100), 2) : 0,
            employerPensionContribution: userTax.employerPensionContributionPercent ? math.round(math.multiply(userTax.employerPensionContributionPercent, 100), 2) : 0,
            taxFreePersonalAllowance: userTax.taxFreePersonalAllowance || 12500,
            studentLoanPlanType: userTax.studentLoan?.studentLoanPlanType || 0,
            secondaryIncomeAfterTax: userTax.secondaryIncomeAfterTax || 0
          }}
          validationSchema={object().shape({
            salary: number('Please type a number'),
            personalPensionContribution: number('Please type a number'),
            employerPensionContribution: number('Please type a number'),
            taxFreePersonalAllowance: number(),
            studentLoanPlanType: number(),
            secondaryIncomeAfterTax: number('Please type a number')
          })}
          onSubmit={(userFinance, { setSubmitting }) => {
            setUserFinances(userFinance, addMultipleInvestments)
            setSubmitting(false);
          }}
        >{({ values, handleChange }) => (
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
                xs={12}
              >
                <Input
                  label="Secondary Income After Tax"
                  name="secondaryIncomeAfterTax"
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
                  className={classes.text}
                >
                  <MenuItem className={classes.text} key={'plan0'} value={0}>{`No Loan`}</MenuItem>
                  <MenuItem className={classes.text} key={'plan1'} value={1}>{`Plan 1 (before 1 September 2012)`}</MenuItem>
                  <MenuItem className={classes.text} key={'plan2'} value={2}>{`Plan 2 (after 1 September 2012)`}</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12} >
                <Button
                  type="submit"
                  className={classes.button}
                  fullWidth
                  variant="text">Calculate</Button>
              </Grid>
            </Grid>

          </Form>
        )}
        </Formik>
      </Box>
    </div >
  );
};

IncomeDetails.propTypes = {
  className: PropTypes.string
};

export default IncomeDetails;
