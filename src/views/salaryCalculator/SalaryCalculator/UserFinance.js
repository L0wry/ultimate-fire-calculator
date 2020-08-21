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
  makeStyles, Grid
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

const UserFinance = ({ className, ...rest }) => {
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
  const handlePersonalPensionContribution = e => setPersonalPensionContribution(e.target.value)
  const handleEmployerPensionContribution = e => setEmployerPensionContribution(e.target.value)

  console.log(userFinance)

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <SalaryContextConsumer>
        {
          context => (
            <Box mt={2}>
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
                  <Card>
                    <CardContent>

                      <Typography >
                        What's your annual salary?
                    </Typography >
                      <TextField
                        onChange={handleSalaryChange}
                        fullWidth
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
                      <Typography >
                        What's your personal contribution?
                      </Typography >

                      <TextField
                        onChange={handlePersonalPensionContribution}
                        fullWidth
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


                      <Typography >
                        What's your employer contribution?
                      </Typography >

                      <TextField
                        onChange={handleEmployerPensionContribution}
                        fullWidth
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


                      <Button onClick={() => context.setUserFinances(userFinance)}>Calculate</Button>

                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
      </SalaryContextConsumer>
    </div>
  );
};

UserFinance.propTypes = {
  className: PropTypes.string
};

export default UserFinance;
