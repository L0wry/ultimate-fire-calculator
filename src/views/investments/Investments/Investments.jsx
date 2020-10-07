import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useInvestmentContext } from '../../../context/InvestmentContext';
import { AddInvestment } from './AddInvestment'
import { InvestmentList } from './InvestmentList'
import TopBar from '../../../layouts/MainLayout/TopBar.js'

const useStyles = makeStyles((theme) => ({
  root: {},
  text: {
    color: theme.palette.text.primary
  },
  header: {
    color: theme.palette.text.primary
  },
}));

const Investments = ({ className, ...rest }) => {

  const { onItemSave, editInvestment, removeInvestment, investments, addInvestment } = useInvestmentContext();
  const classes = useStyles()

  return (
    <div
      className={clsx(className)}
      {...rest}
    >
      <TopBar header="Investments" />
      <Typography
        gutterBottom
        variant="body1"
      >
        Add your investments
        </Typography>

      <Box mt={3}>
        <AddInvestment addInvestment={addInvestment} />
        {investments.length > 0 && (
          <InvestmentList onItemSave={onItemSave} onItemEdit={editInvestment} onItemRemove={removeInvestment} items={investments} />
        )}
      </Box>

    </div>
  );
};

Investments.propTypes = {
  className: PropTypes.string
};

export default Investments;
