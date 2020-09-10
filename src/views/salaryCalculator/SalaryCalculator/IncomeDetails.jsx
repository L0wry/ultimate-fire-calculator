import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
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
import { SalaryContextConsumer } from '../../../context/SalaryContext';

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
        InputProps={inputProps ? inputProps : null}
        {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const IncomeDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <SalaryContextConsumer>
        {
          ({setUserFinances}) => (
              <Card>
                <CardContent>

                  <Typography
                    align="left"
                    color="textPrimary"
                    gutterBottom
                    variant="h3"
                  >
                    Your Situation
                  </Typography>
                  <Divider />
                  <Box mt={3}>

                    <Formik
                      initialValues={{
                        salary: "",
                        personalPensionContribution: 0,
                        employerPensionContribution: 0,
                        taxFreePersonalAllowance: 12500,
                      }}
                      validationSchema={object({
                        salary: number(),
                        personalPensionContribution: number(),
                        employerPensionContribution: number(),
                        taxFreePersonalAllowance: number(),

                      })}
                      onSubmit={(userFinance, { setSubmitting }) => {
                        setUserFinances(userFinance)
                        setSubmitting(false);
                      }}
                    >
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
                              type="number"
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
                              type="number"
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
                    </Formik>

{/* 
                    <TextField
                      onChange={handleSalaryChange}
                      fullWidth
                      required
                      variant="outlined"
                      label="Annual Salary"
                      name="salary"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography >
                              £
                            </Typography>
                          </InputAdornment>
                        )
                      }}
                      defaultValue={context.userFinance.salary
                        ? context.userFinance.salary
                        : null
                      }
                      variant="outlined"
                    />
                      </Grid>
                  <Grid
                    item
                    lg={6}
                    md={6}
                    xs={12}
                  >

                    <TextField
                      onChange={handlepersonalPensionContributionContributionPercent}
                      fullWidth
                      variant="outlined"
                      label="Personal Pension Contribution Percentage"
                      name="personalPensionContribution"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <Typography >
                              %
                                </Typography>
                          </InputAdornment>)
                      }}
                      defaultValue={context.userFinance.personalPensionContributionContributionPercent
                        ? context.userFinance.personalPensionContributionContributionPercent * 100
                        : null}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid
                    item
                    lg={6}
                    md={6}
                    xs={12}
                  >
                    <TextField
                      onChange={handleemployerPensionContributionContributionPercent}
                      fullWidth
                      variant="outlined"
                      label="Employer Pension Contribution Percentage"
                      name="employerPensionContribution"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <Typography >
                              %
                                    </Typography>
                          </InputAdornment>)
                      }}
                      defaultValue={
                        context.userFinance.employerPensionContributionContributionPercent
                          ? context.userFinance.employerPensionContributionContributionPercent * 100
                          : null}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    lg={6}
                    md={6}
                    xs={12}
                  >
                    <TextField
                      onChange={handleTaxFreePersonalAllowance}
                      fullWidth
                      required
                      variant="outlined"
                      label="Tax Free Personal Allowance"
                      name="taxFreePersonalAllowance"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography >
                              £
                                    </Typography>
                          </InputAdornment>)
                      }}
                      defaultValue={context.userFinance.taxFreePersonalAllowance}
                      variant="outlined"
                    />
                  </Grid>
                    </Grid>
                <Box
                  display="flex"
                  justifyContent="center"
                  p={2}
                  mt={3}>
                  <Button
                    color="primary"
                    fullWidth
                    variant="text"
                    onClick={() => context.setUserFinances(userFinance)}>Calculate</Button>
                </Box> */}

                  </Box>
                </CardContent>
              </Card>
  )
}
      </SalaryContextConsumer >
    </div >
  );
};

IncomeDetails.propTypes = {
  className: PropTypes.string
};

export default IncomeDetails;
