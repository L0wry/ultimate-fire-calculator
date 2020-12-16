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
import { INVESTMENT_TYPES } from '../../../investments/investmentMetaData';

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


export const AddInvestment = ({ className, addInvestment, }) => {
  const classes = useStyles();

  return (
    <Box mt={3}>
      <Formik
        initialValues={{
          name: "",
          investmentType: "",
          initialAmount: "",
          expectedReturn: "",
          monthlyContribution: ""
        }}
        validationSchema={object({
          name: string(),
          investmentType: string(),
          initialAmount: number(),
          expectedReturn: number(),
          monthlyContribution: number()

        })}
        onSubmit={(investment, { setSubmitting, resetForm }) => {
          addInvestment(investment)
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

              <FormControl variant="outlined" className={classes.select}>
                <InputLabel id="demo-simple-select-outlined-label">Investment Type</InputLabel>
                <Select
                  className={classes.select}
                  labelId="investmentType"
                  label="Investment Type"
                  id="investmentType"
                  value={values.investmentType}
                  onChange={e => setFieldValue('investmentType', e.target.value)}
                  required
                >
                  {
                    Object.values(INVESTMENT_TYPES).map((type) =>
                      <MenuItem key={type} className={classes.select} value={type}>{type}</MenuItem>)
                  }
                </Select>
              </FormControl>





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
                label="Annual Return"
                name="expectedReturn"
                type="number"
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
