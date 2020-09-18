import React from 'react';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Button,
  TextField,
  InputAdornment
} from '@material-ui/core';
import { Formik, Form, useField } from "formik";
import { string, number, object } from "yup";



const Input = ({ label, inputProps, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
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


export const AddInvestment = ({ className, addInvestment, ...rest }) => {
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
            Add your investments
        </Typography>
          <Divider />
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
                  <Button
                    color="primary"
                    fullWidth
                    variant="text"
                    type="submit">Add</Button>
                </Grid>
              </Form>
            </Formik>
          </Box>
        </CardContent>
      </Card>
    </Box >
  );
};
