import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  makeStyles,
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

const useStyles = makeStyles((theme) => ({
  root: {},
  text: {
    color: theme.palette.text.secondary
  },
  input: {
    color: theme.palette.text.tertiary,
  },
  error: {
    color: 'red'
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.tertiary,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    }
  },
}))

const Input = ({ label, type, inputProps, ...props }) => {
  const [field, meta] = useField(props);
  const classes = useStyles();
  return (
    <>
      <TextField
        type={type}
        label={label}
        className={classes.input}
        variant="outlined"
        required
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

const Expenses = ({ className, addExpense, ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box >
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
  justify="space-between"
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
              <Grid item xs={12}>
              <Button
                color="primary"
                className={classes.button}
                fullWidth
                variant="text"
                type="submit">ADD</Button>
            </Grid>
              </Grid>
              
          </Form>
        </Formik>
      </Box>
    </div>
  );
};

Expenses.propTypes = {
  className: PropTypes.string,
};

export default Expenses;
