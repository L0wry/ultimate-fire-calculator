import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';
import {
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Pre Tax', value: 38 },
  { name: 'Post Tax', value: 40 },

];
const colours = Object.values(colors.green);

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const TrafficByDevice = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Saving Percentage (hardcoded)" />
      <Divider />
      <CardContent>
        <Box
          height={300}
          position="relative"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                fontFamily={theme.typography.fontFamily}
              >
                {
                  data.map((entry, index) => <Cell fontFamily={theme.typography.fontFamily} key={`cell-${index}`} fill={colours[index]} />)
                }
              </Pie>
            </PieChart>
          </ResponsiveContainer>

        </Box>
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >
          {data.map(({
            color,
            name,
            value
          }) => (
            <Box
              key={name}
              p={1}
              textAlign="center"
            >
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {name}
              </Typography>
              <Typography
                style={{ color }}
                variant="h2"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

TrafficByDevice.propTypes = {
  className: PropTypes.string
};

export default TrafficByDevice;
