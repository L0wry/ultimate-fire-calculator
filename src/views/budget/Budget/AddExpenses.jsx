import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  makeStyles,
  List,
  CardContent,
  Typography,
  Divider,
  Box,
  InputAdornment,
  TextField,
  Grid,
  Button
} from '@material-ui/core';



const Expenses = ({ className, inputValue, onButtonClick, onInputChange, onInputKeyPress, ...rest }) => {

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
            List Your Monthly Expenses
        </Typography>
          <Divider />
          <Box mt={3}>
            <Grid
              container                
              alignItems="stretch"
              spacing={1}
            >
              <Grid
                item
              >
                <TextField
                  fullWidth
                  name="name"
                  placeholder="Name"
                  variant="outlined"
                  value={inputValue.name}
                  onChange={onInputChange}
                  onKeyPress={onInputKeyPress}
                />

              </Grid>

              <Grid
                item
              >
                <TextField
                  fullWidth
                  name="cost"
                  variant="outlined"
                  value={inputValue.cost}
                  onChange={onInputChange}
                  onKeyPress={onInputKeyPress}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography >
                          £
                    </Typography>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid
                item
                xs={2}
              >
              <Button
                  color="primary"
                  fullWidth
                  variant="text"
                  onClick={onButtonClick}>Add</Button>
              </Grid>
              </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box >
  );
};

Expenses.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Expenses;
