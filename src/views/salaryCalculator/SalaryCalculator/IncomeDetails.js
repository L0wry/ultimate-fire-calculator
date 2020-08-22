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
  const [employerPensionContributionPercent, setEmployerPensionContributionPercent] = useState();
  const [personalPensionContributionPercent, setPersonalPensionContributionPercent] = useState();
  const [taxFreePersonalAllowance, setTaxFreePersonalAllowance] = useState();


  const userFinance = {
    salary: salary,
    employerPensionContributionPercent: employerPensionContributionPercent,
    personalPensionContributionPercent: personalPensionContributionPercent,
    taxFreePersonalAllowance: taxFreePersonalAllowance || 12500
  }


  const handleSalaryChange = e => setSalary(e.target.value)
  const handlepersonalPensionContributionPercent = e => setPersonalPensionContributionPercent(parseFloat((e.target.value / 100).toFixed(2)))
  const handleEmployerPensionContributionPercent = e => setEmployerPensionContributionPercent(parseFloat((e.target.value / 100).toFixed(2)))
  const handleTaxFreePersonalAllowance = e => setTaxFreePersonalAllowance(e.target.value)

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

            >
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
                          onChange={handlepersonalPensionContributionPercent}
                          fullWidth
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
                          defaultValue={context.userFinance.personalPensionContributionPercent
                            ? context.userFinance.personalPensionContributionPercent * 100
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
                          onChange={handleEmployerPensionContributionPercent}
                          fullWidth
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
                          defaultValue={
                            context.userFinance.employerPensionContributionPercent
                              ? context.userFinance.employerPensionContributionPercent * 100
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
                    </Box>

                  </Box>
                </CardContent>
              </Card>
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
