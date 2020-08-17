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
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(() => ({
  root: {}
}));

const chartData = {
  data: [
    {
      Time: 'Year 1', ISA: 4000, SIPP: 2400, LISA: 2400, Other: 100
    },
    {
      Time: 'Year 2', ISA: 4500, SIPP: 1398, LISA: 2210, Other: 100
    },
    {
      Time: 'Year 3', ISA: 5500, SIPP: 9800, LISA: 2290, Other: 100
    },
    {
      Time: 'Year 4', ISA: 7000, SIPP: 3908, LISA: 2000, Other: 100
    },
    {
      Time: 'Year 5', ISA: 9000, SIPP: 4800, LISA: 2181, Other: 100
    },
    {
      Time: 'Year 6', ISA: 13000, SIPP: 3800, LISA: 2500, Other: 100
    },
    {
      Time: 'Year 7', ISA: 16000, SIPP: 4300, LISA: 2100, Other: 1000
    },
  ]
}

const colours = Object.values(colors.indigo)


const NetWorth = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
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
          height={400}
          position="relative"
        >
          <ResponsiveContainer width={"100%"} height="100%">
            <AreaChart
              data={chartData.data}
              margin={{
                top: 10, right: 0, left: 0, bottom: 0,
              }}
            >

              <XAxis fontFamily={theme.typography.fontFamily} dataKey="Time" />
              <YAxis fontFamily={theme.typography.fontFamily} />
              <Tooltip fontFamily={theme.typography.fontFamily} />
              {
                Object.keys(chartData.data[0])
                  .filter(key => key !== 'Time')
                  .map((investmentType, i) =>
                    <Area type="monotone" dataKey={investmentType} stackId='1' stroke={colours[i]} fill={colours[i]} />
                  )}
            </AreaChart>
          </ResponsiveContainer>

        </Box>
      </CardContent>
      <Divider />
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
      </Box>
    </Card>
  );
};

NetWorth.propTypes = {
  className: PropTypes.string
};

export default NetWorth;
