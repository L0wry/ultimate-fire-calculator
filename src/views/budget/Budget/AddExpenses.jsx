import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  InputAdornment,
  TextField,
  Grid,
  Button
} from '@material-ui/core';
import { Formik, Form, useField } from "formik";
import { string, number, object } from "yup";

const Input = ({ label, type, inputProps, ...props }) => {
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

const Expenses = ({ className, addExpense, ...rest }) => {
  return (
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
            List Your Monthly Expenses
        </Typography>
          <Divider />
          <Box 
            mt={3}>
          <Formik
              initialValues={{
                name: "",
                cost: ""
              }}
              validationSchema={object({
                name: string(),
                cost: number(),
              })}
              onSubmit={(expense, { setSubmitting, resetForm }) => {
                addExpense(expense)
                resetForm({})
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
                      label="Expense Name"
                      name="name"
                      type="text"
                    />
                  </Grid>

                  <Grid
                      item
                      lg={6}
                      md={6}
                      xs={12}
                  >
                    <Input
                      label="Expense cost"
                      name="cost"
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
                    <Button
                      color="primary"
                      fullWidth
                      variant="text"
                      type="submit">ADD</Button>
                </Grid>
              </Form>
            </Formik>
          </Box>
        </CardContent>
      </Card>
  );
};

Expenses.propTypes = {
  className: PropTypes.string,
};

export default Expenses;
