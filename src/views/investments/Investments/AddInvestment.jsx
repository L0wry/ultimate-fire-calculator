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


export const AddInvestment = ({ addInvestment, }) => {
  const classes = useStyles();

  return (
    <Box mt={3}>
      <Formik
        initialValues={{
          name: "",
          investmentType: "",
          initialAmount: 0,
          expectedReturn: 0,
          monthlyContribution: 0,
          stopContributingInYear: 0
        }}
        validationSchema={object({
          name: string(),
          investmentType: string(),
          initialAmount: number(),
          expectedReturn: number(),
          monthlyContribution: number(),
          stopContributingInYear: number()
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
                setFieldValue={setFieldValue}
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
                label="Annual Return"
                name="expectedReturn"
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
              <Input
                label="Monthly Contribution"
                name="monthlyContribution"
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
              <FormControl variant="outlined" className={classes.select}>
                <InputLabel id="demo-simple-select-outlined-label">Contribute Monthly For</InputLabel>
                <Select
                  className={classes.select}
                  labelId="stopContributingInYear"
                  label="stopContributingInYear Type"
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
