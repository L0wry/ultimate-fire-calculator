import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
} from '@material-ui/core';
import { InvestmentContextConsumer } from '../../../context/InvestmentContext';
import { AddInvestment } from './AddInvestment'
import { InvestmentList } from './InvestmentList'
const Investments = ({ className, ...rest }) => {
  return (
    <div
      className={clsx(className)}
      {...rest}
    >
      <Card>
        <CardContent>

          <Typography
            align="left"
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            Investments
                  </Typography>
          <Divider />
          <Box mt={3}>
            <InvestmentContextConsumer>
              {({ onItemSave, editInvestment, removeInvestment, investments, addInvestment }) => (
                <>
                  <AddInvestment addInvestment={addInvestment} />
                  {investments.length > 0 && (
                    <InvestmentList onItemSave={onItemSave} onItemEdit={editInvestment} onItemRemove={removeInvestment} items={investments} />
                  )}
                </>
              )}
            </InvestmentContextConsumer>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

Investments.propTypes = {
  className: PropTypes.string
};

export default Investments;
