import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Legend
} from 'recharts';

import {
  Box,
  Card,
  useTheme,
  makeStyles,
  Typography
} from '@material-ui/core';

const colours = ['#1B005A', '#7543E8', '#8956FF', '#8049FF', '#1B005A', '#7543E8', '#8956FF', '#8049FF']

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
      variant="h5"
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

      <Box >
        <Text item={{ dataKey: 'Total', value: props.payload.reduce((a, b) => a + b.value, 0).toFixed(2) }} />
      </Box>
    </Box>
  </Card>
) : null

const NetWorth = ({ investmentData, className, ...rest }) => {
  const useStyles = makeStyles((theme) => ({
    root: {},
    text: {
      color: theme.palette.text.secondary
    },
  }));

  const classes = useStyles();
  const theme = useTheme();

  return investmentData.length > 0 ? (
    <Box p={2}  >

      <Typography
        align="center"
        className={classes.text}
        gutterBottom
        variant="h4"
      >
        Net Worth Over Time
        </Typography>
      <Box
        mt={3}
        height={300}
        position="relative"
      >
        <ResponsiveContainer width={"100%"} height="100%">
          <AreaChart
            syncId="year"
            data={investmentData}
            margin={{
              top: 0, right: 35, left: 35, bottom: 0,
            }}
          >
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />


            <XAxis dataKey="year" style={{ fontFamily: theme.typography.fontFamily }} />
            <YAxis tickFormatter={amount => `£${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`} style={{ fontFamily: theme.typography.fontFamily }} />
            <Tooltip content={<ToolTip classes={classes} />} />
            {
              Object.keys(investmentData[0])
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
      {/* <Divider />
      <Box
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
    </Box>
  ) : (
      <Box p={6}  >

        <Typography
          align="center"
          className={classes.text}
          gutterBottom
          variant="h4"
        >
          Add some investments to see dashboards
      </Typography>
      </Box>
    )
};

NetWorth.propTypes = {
  className: PropTypes.string
};

export default NetWorth;
