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
  Container,
  CardHeader,
  Divider
} from '@material-ui/core';
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

const IncomeDetails = ({ className, ...rest }) => {
  const classes = useStyles();

  const [salary, setSalary] = useState();
  const [employerPensionContribution, setEmployerPensionContribution] = useState();
  const [personalPensionContribution, setPersonalPensionContribution] = useState();

  const userFinance = {
    salary: salary || 0,
    employerPensionContribution: employerPensionContribution || 0,
    personalPensionContribution: personalPensionContribution || 0
  }


  const handleSalaryChange = e => setSalary(e.target.value)
  const handlePersonalPensionContribution = e => setPersonalPensionContribution(parseFloat((e.target.value / 100).toFixed(2)))
  const handleEmployerPensionContribution = e => setEmployerPensionContribution(parseFloat((e.target.value / 100).toFixed(2)))

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <SalaryContextConsumer>
        {
          context => (
            <form
              autoComplete="off"
              noValidate

            >
              <Box mt={3}>
                <Card>
                  <CardHeader
                    title="What's your situation?"
                  />
                  <Divider />
                  <CardContent>
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
                        <TextField
                          onChange={handleSalaryChange}
                          fullWidth
                          required
                          variant="outlined"
                          label="Annual Salary"
                          name="annualSalary"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Typography >
                                  £
                            </Typography>
                              </InputAdornment>
                            )
                          }}
                          defaultValue={context.userFinance.salary}
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
                          onChange={handlePersonalPensionContribution}
                          fullWidth
                          required
                          variant="outlined"
                          label="Personal Percentage Percentage"
                          name="personalPension"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="start">
                                <Typography >
                                  %
                                </Typography>
                              </InputAdornment>)
                          }}
                          defaultValue={context.userFinance.personalPensionContribution}
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
                          onChange={handleEmployerPensionContribution}
                          fullWidth
                          required
                          variant="outlined"
                          label="Employer Percentage Percentage"
                          name="employerPension"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="start">
                                <Typography >
                                  %
                                    </Typography>
                              </InputAdornment>)
                          }}
                          defaultValue={context.userFinance.employerPensionContribution}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Box
                      display="flex"
                      justifyContent="center"
                      p={2}
                      mt={3}>
                      <Button onClick={() => context.setUserFinances(userFinance)}>Calculate</Button>
                    </Box>

                  </CardContent>
                </Card>
              </Box>
            </form>
          )}
      </SalaryContextConsumer>
    </div>
  );
};

IncomeDetails.propTypes = {
  className: PropTypes.string
};

export default IncomeDetails;
