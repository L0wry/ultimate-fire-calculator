import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip,
} from 'recharts';
import { InvestmentContextConsumer } from '../../../context/InvestmentContext';

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
import { convertCompoundDataToGraph } from '../../../utils/convertCompoundDataToGraph';

const useStyles = makeStyles(() => ({
  root: {}
}));

const chartData = {
  data: [
    {
      Year: 'Year 1', ISA: 4000, SIPP: 2400, LISA: 2400, Other: 100
    },
    {
      Year: 'Year 2', ISA: 4500, SIPP: 1398, LISA: 2210, Other: 100
    },
    {
      Year: 'Year 3', ISA: 5500, SIPP: 9800, LISA: 2290, Other: 100
    },
    {
      Year: 'Year 4', ISA: 7000, SIPP: 3908, LISA: 2000, Other: 100
    },
    {
      Year: 'Year 5', ISA: 9000, SIPP: 4800, LISA: 2181, Other: 100
    },
    {
      Year: 'Year 6', ISA: 13000, SIPP: 3800, LISA: 2500, Other: 100
    },
    {
      Year: 'Year 7', ISA: 16000, SIPP: 4300, LISA: 2100, Other: 1000
    },
  ]
}

const colours = Object.values(colors.indigo)


const GraphTo = ({ data }) => {
  const theme = useTheme();


  return (
    < AreaChart
      data={chartData}
      margin={{
        top: 10, right: 0, left: 0, bottom: 0,
      }
      }
    >
      {/* <XAxis fontFamily={theme.typography.fontFamily} dataKey="year" />
      <YAxis fontFamily={theme.typography.fontFamily} /> */}
      {
        Object.keys(chartData[0])
          .filter(key => key !== 'Year')
          .map((investmentType, i) =>
            <Area type="monotone" dataKey={investmentType} stackId='1' stroke={colours[i]} fill={colours[i]} />
          )}
    </AreaChart >
  )
}

const NetWorth = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title="Net Worth Over Year"
      />
      <Divider />
      <CardContent>
        <Box
          height={400}
          position="relative"
        >
          <ResponsiveContainer width={"100%"} height="100%">

            <InvestmentContextConsumer>
              {({ investments }) => investments.length > 0 && (
                <GraphTo data={{ data: [convertCompoundDataToGraph(investments)] }} />
              )}
            </InvestmentContextConsumer>
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
