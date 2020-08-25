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
import { BudgetItem } from './BudgetItem'

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Expenses = ({ className, customers, ...rest }) => {
  const classes = useStyles();

  const [list, setList] = useState([{ name: 'example', cost: 500 }, { name: 'example 2', cost: 500 }])
  return (
    <Box>
      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
        <CardContent>

          <Typography
            align="left"
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            List Your Expenses
        </Typography>
          <Divider />
          <Box mt={3}>
            <Grid
              container
              spacing={1}
            >
              <Grid
                item
                xs={3} md={3} 
              >
                <TextField
                  fullWidth
                  placeholder="Expense Name"
                  variant="outlined"
                />

              </Grid>

              <Grid
                item
                xs={3} md={3} 
              >
                <TextField
                  fullWidth
                  placeholder="Cost"
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                xs={2} md={1}
              >
              <Button
                  color="primary"
                  fullWidth
                  variant="text"
                  onClick={() => setList([...list, {}])}>Add Expense</Button>
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
