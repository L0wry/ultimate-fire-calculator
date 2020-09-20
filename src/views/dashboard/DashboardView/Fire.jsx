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

const colours = [
  '#64b5f6',
  '#42a5f5',
  '#2196f3',
  '#1e88e5',
  '#1976d2',
  '#1565c0']

const Text = ({ item, drawDownPercent }) => {
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
      {item.dataKey === "Income From Draw Down" ? `Expected Income from ${drawDownPercent * 100}% Draw Down` : item.dataKey }
    </Typography>
  )
}

const LegendText = props => (
  <Box>
    <Grid spacing={3}           
 justify="space-evenly"
 alignItems="stretch"
           container>

      {props.payload.map((item, i) =>
        <Grid
          item
        >

          <Box key={i}>
            <Text drawDownPercent={props.drawDownPercent} item={item} />
          </Box>
        </Grid>
      )}
    </Grid>
  </Box>
)

const Fire = ({ investmentData, drawDownPercent, ...rest }) => {
  const useStyles = makeStyles(() => ({
    root: {}
  }));

  const classes = useStyles();
  const theme = useTheme();


  return investmentData.length > 0 && (
    <Card
      classes={clsx(classes.root)}
      {...rest}
    >
      <CardHeader
        title="Retiring In..."
      />
      <Divider />
      <CardContent>
        <Box
          height={400}
          position="relative"
        >
          <ResponsiveContainer width={"100%"} height="100%">
            <LineChart
              data={investmentData}
              margin={{
                top: 0, right: 35, left: 35, bottom: 0,
              }}
            >
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />

              <XAxis dataKey="year" style={{ fontFamily: theme.typography.fontFamily }} />
              <YAxis tickFormatter={amount => `£${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`} style={{ fontFamily: theme.typography.fontFamily }} />
              <Legend content={<LegendText drawDownPercent={drawDownPercent} classes={classes} />} />


              {
                Object.keys(investmentData[0])
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
      </CardContent>
      <Divider />
    </Card>
  );
};

Fire.propTypes = {
  classyear: PropTypes.string
};

export default Fire;
