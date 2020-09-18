import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Legend
} from 'recharts';

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  Typography
} from '@material-ui/core';

const colours = [
  '#64b5f6',
  '#42a5f5',
  '#2196f3',
  '#1e88e5',
  '#1976d2',
  '#1565c0']

const Text = ({ item }) => {
  const useStyles = makeStyles(theme => ({
    typography: {
      color: item.stroke
    },
  }));

  const classes = useStyles();

  return (
    <Typography
      className={classes.typography}
      variant="h6"
    >
      {`${item.dataKey}: £${item.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
    </Typography>
  )
}

const ToolTip = props => (props.active) ? (
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
          <Text item={item} />
        </Box>
      )}
    </Box>
  </Card>
) : null

const NetWorth = ({ investmentData, className, ...rest }) => {
  const useStyles = makeStyles(() => ({
    root: {}
  }));

  const classes = useStyles();
  const theme = useTheme();
  const chartData = {
    data: investmentData
  }

  return investmentData.length > 0 && (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title="Net Worth Over Time"
      />
      <Divider />
      <CardContent>
        <Box
          height={600}
          position="relative"
        >
          <ResponsiveContainer width={"100%"} height="100%">
            <AreaChart
              data={chartData.data}
              margin={{
                top: 0, right: 35, left: 35, bottom: 0,
              }}
            >
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />


              <XAxis dataKey="year" style={{ fontFamily: theme.typography.fontFamily }} />
              <YAxis tickFormatter={amount => `£${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`} style={{ fontFamily: theme.typography.fontFamily }} />
              <Tooltip content={<ToolTip classes={classes} />} />
              {
                Object.keys(chartData.data[0])
                  .filter(key => key !== 'year')
                  .map((investmentType, i) =>
                    <Area
                      key={`${investmentType}-${i}`}
                      type="monotone"
                      dataKey={investmentType}
                      stackId='1'
                      stroke={colours[i]}
                      fill={colours[i]}
                    />
                  )}
            </AreaChart>
          </ResponsiveContainer>

        </Box>
      </CardContent>
      <Divider />
      {/* <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          Overview
        </Button>
      </Box> */}
    </Card>
  );
};

NetWorth.propTypes = {
  className: PropTypes.string
};

export default NetWorth;
