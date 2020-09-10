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

const Input = ({ label, inputProps, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <TextField
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
    <Box>
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
          <Box mt={3}>
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
                console.log(expense)
                addExpense(expense)
                resetForm({})
                setSubmitting(false);
              }}
            >
              <Form>
                <Grid
                  container
                  justify="space-evenly"
                  spacing={1}
                >
                  <Grid
                    item
                  >
                    <Input
                      label="Expense Name"
                      name="name"
                      type="text"
                    />
                  </Grid>

                  <Grid
                    item
                  >
                    <Input
                      label="Expense cost"
                      name="cost"
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
                  </Grid>                
                    <Button
                      color="primary"
                      fullWidth
                      variant="text"
                      type="submit">Submit</Button>
                </Grid>
              </Form>
            </Formik>
          </Box>
        </CardContent>
      </Card>
    </Box >
  );
};

Expenses.propTypes = {
  className: PropTypes.string,
};

export default Expenses;
