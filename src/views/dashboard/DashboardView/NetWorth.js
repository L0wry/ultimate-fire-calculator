import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip,
} from 'recharts';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  colors
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(() => ({
  root: {}
}));


const colours = Object.values(colors.indigo)


const NetWorth = ({ investmentData, className, ...rest }) => {
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
                top: 10, right: 0, left: 30, bottom: 0,
              }}
            >

              <XAxis fontFamily={theme.typography.fontFamily} />
              <YAxis fontFamily={theme.typography.fontFamily} />
              <Tooltip fontFamily={theme.typography.fontFamily} />
              {
                Object.keys(chartData.data[0])
                  .filter(key => key !== 'year')
                  .map((investmentType, i) =>
                    <Area key={`${investmentType}-${i}`}type="monotone" dataKey={investmentType} stackId='1' stroke={colours[i]} fill={colours[i]} />
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
