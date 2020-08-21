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
  makeStyles
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


  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <SalaryContextConsumer>
        {
          context => (
            <Box mt={3}>
              <Card>

                <CardContent>
                  <Box justifyContent="center" display="flex" maxWidth={1 / 3}>
                    <Box justifyContent="center" display="flex" maxWidth={2 / 3}>

                      <Typography >
                        What's your annual salary?
                    </Typography >
                    </Box>

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
                  </Box>
                  <Box justifyContent="center" display="flex" maxWidth={1 / 3}>
                    <Box justifyContent="center" display="flex" maxWidth={2 / 3}>

                      <Typography >
                        What's your personal contribution?
                      </Typography >
                    </Box>

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
                  </Box>
                  <Box justifyContent="center" display="flex" maxWidth={1 / 3}>
                    <Box justifyContent="center" display="flex" maxWidth={2 / 3}>

                      <Typography >
                        What's your employer contribution?
                      </Typography >
                    </Box>

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
                  </Box>
                  <Button onClick={() => context.setUserFinances(userFinance)}>Calculate</Button>
                </CardContent>
              </Card>
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
