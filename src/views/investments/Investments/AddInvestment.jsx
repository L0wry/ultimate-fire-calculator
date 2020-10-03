import React from 'react';
import {
  Box,
  Typography,
  Grid,
  makeStyles,
  Button,
  TextField,
  InputAdornment
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

const Input = ({ label, inputProps, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  const classes = useStyles();

  return (
    <>
      <TextField
        label={label}
        className="text-input"
        variant="outlined"
        required
        fullWidth
        InputProps={{
          className: classes.text,
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


export const AddInvestment = ({ className, addInvestment, ...rest }) => {
  const classes = useStyles();

  return (
    <Box mt={3}>

      <Formik
        initialValues={{
          name: "",
          initialAmount: "",
          expectedReturn: "",
          monthlyContribution: ""
        }}
        validationSchema={object({
          name: string(),
          initialAmount: number(),
          expectedReturn: number(),
          monthlyContribution: number()

        })}
        onSubmit={(investment, { setSubmitting, resetForm }) => {
          addInvestment(investment)
          resetForm({})
          setSubmitting(false);
        }}
      >
        <Form>
          <Grid
            container
            justify="space-evenly"
            spacing={3}
          >
            <Grid
              item
              lg={6}
              md={6}
              xs={12}
            >
              <Input
                label="Investment Name"
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
                label="Current Value"
                name="initialAmount"
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
            <Grid
              item
              lg={6}
              md={6}
              xs={12}
            >
              <Input
                label="Annual Return"
                name="expectedReturn"
                type="text"
                inputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
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
                label="Monthly Contribution"
                name="monthlyContribution"
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
            <Grid item xs={12} >
              <Button
                className={classes.button}
                color="primary"
                fullWidth
                variant="text"
                type="submit">Add</Button>
            </Grid>

          </Grid>
        </Form>
      </Formik>
    </Box>
  );
};
