import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import {
  LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Legend
} from 'recharts';

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  Typography,
  Grid
} from '@material-ui/core';

const colours = ['#7543E8', '#1B005A']

const Text = ({ item, safeWithdrawalPercent }) => {
  const useStyles = makeStyles(theme => ({
    typography: {
      color: item.color
    },
  }));

  const classes = useStyles();

  return (
    <Typography
      className={classes.typography}
      variant="h5"
      gutterBottom
    >
      {item.dataKey === "Income From Draw Down" ? `Expected Monthly Income from ${safeWithdrawalPercent * 100}% Draw Down` : item.dataKey}
    </Typography>
  )
}

const TextBox = ({ item, safeWithdrawalPercent }) => {
  const useStyles = makeStyles(theme => ({
    typography: {
      color: item.color
    },
  }));

  const classes = useStyles();

  return (
    <Typography
      className={classes.typography}
      variant="h5"
      gutterBottom
    >
      {item.dataKey === "Income From Draw Down" ?
        `Expected Monthly Income from ${safeWithdrawalPercent * 100}% Draw Down: £${item.value}` :
        `Expenses Cost: £${item.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
    </Typography>
  )
}


const LegendBox = props => (
  <Box>
    <Grid spacing={3}
      justify="space-evenly"
      alignItems="stretch"
      container>

      {props.payload.map((item, i) =>
        <Grid
          key={i}
          item
        >

          <Box >
            <Text safeWithdrawalPercent={props.safeWithdrawalPercent} item={item} />
          </Box>
        </Grid>
      )}
    </Grid>
  </Box>
)

const ToolTipBox = props => (props.active) ? (
  <Card className={clsx(props.classes.root)}>
    <Box p={1} m={1} >

      <Typography
        align="center"
        color="textSecondary"
        variant="h5"
        gutterBottom
      >
        {props.label}

      </Typography>
      {props.payload.map((item, i) =>
        <Box key={i}>
          <TextBox safeWithdrawalPercent={props.safeWithdrawalPercent} item={item} />
        </Box>
      )}
    </Box>
  </Card>
) : null



const Fire = ({ fireData, safeWithdrawalPercent, ...rest }) => {
  const useStyles = makeStyles((theme) => ({
    root: {},
    text: {
      color: theme.palette.text.secondary
    },
  }));

  const classes = useStyles();
  const theme = useTheme();

  return fireData.length > 0 && (
    <Box p={2}  >
      <Typography
        align="center"
        className={classes.text}
        gutterBottom
        variant="h4"
      >
        Retiring In
        </Typography>
      <Box
        mt={3}
        height={300}
        position="relative"
      >
        <ResponsiveContainer width={"100%"} height="100%">
          <LineChart
            syncId="year"
            data={fireData}
            margin={{
              top: 0, right: 35, left: 35, bottom: 0,
            }}
          >
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />

            <XAxis dataKey="year" style={{ fontFamily: theme.typography.fontFamily }} />
            <YAxis tickFormatter={amount => `£${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`} style={{ fontFamily: theme.typography.fontFamily }} />
            <Legend content={<LegendBox safeWithdrawalPercent={safeWithdrawalPercent} classes={classes} />} />

            <Tooltip content={<ToolTipBox safeWithdrawalPercent={safeWithdrawalPercent} classes={classes} />} />


            {
              Object.keys(fireData[0])
                .filter(key => key !== 'year')
                .map((investmentType, i) =>
                  <Line
                    key={`${investmentType}-${i}`}
                    type="monotone"
                    dataKey={investmentType}
                    stackId='1'
                    stroke={colours[i]}
                    fill={colours[i]}
                  />
                )}
          </LineChart>
        </ResponsiveContainer>

      </Box>
    </Box>
  );
};

Fire.propTypes = {
  classyear: PropTypes.string
};

export default Fire;
