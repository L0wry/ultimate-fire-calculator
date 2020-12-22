import React from 'react';
import {
  Box,
  Typography,
  Grid,
  makeStyles,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@material-ui/core';
import { Formik, Form, useField } from "formik";
import { string, number, object } from "yup"

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
      backgroundColor: theme.palette.primary.default,
    }
  },
  select: {
    justifyContent: 'center',
    width: "100%",
    height: "100%",
    textAlign: 'center'
  },
}))

const Input = ({ label, inputProps, setFieldValue, ...props }) => {
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
        variant="outlined"
        required
        fullWidth
        onClick={() => {
          if(field.value === 0) {
            setFieldValue(field.name, '')
          }
        }}
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

export const AddDebt = ({ addDebt }) => {
  const classes = useStyles();

  return (
    <Box mt={3}>
      <Formik
        initialValues={{
          name: "",
          outstandingAmountDue: 0,
          interestRate: 0,
          yearsLeftToPay: 25
        }}
        validationSchema={object({
          name: string(),
          outstandingAmountDue: number(),
          interestRate: number(),
          yearsLeftToPay: number(),
        })}
        onSubmit={(debt, { setSubmitting, resetForm }) => {
          addDebt(debt)
          resetForm({})
          setSubmitting(false);
        }}
      >{({ values, setFieldValue }) => (
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
                label="Debt Name"
                name="name"
                type="text"
                setFieldValue={setFieldValue}
              />
            </Grid>
    
            <Grid
              item
              lg={6}
              md={6}
              xs={12}
            >
              <Input
                label="Outstanding Amount Due"
                name="outstandingAmountDue"
                type="number"
                setFieldValue={setFieldValue}
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
                label="Interest Rate"
                name="interestRate"
                type="number"
                setFieldValue={setFieldValue}
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
              <FormControl variant="outlined" className={classes.select}>
                <InputLabel id="select">Years Left To Pay</InputLabel>
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
                      return <MenuItem key={i} className={classes.select} value={i }>{ i === 1 ? `${i} Year` : `${i} Years`}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
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
      )}
      </Formik>
    </Box>
  );
};
