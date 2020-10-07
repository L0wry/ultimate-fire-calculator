import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { SalaryContextProvider } from './context/SalaryContext'
import { BudgetContextProvider } from './context/BudgetContext'
import { InvestmentContextProvider } from './context/InvestmentContext'
import { MobileContextProvider } from './context/MobileContext';
import App from './App';

ReactDOM.render((
  <HashRouter>
    <SalaryContextProvider>
      <BudgetContextProvider>
        <InvestmentContextProvider>
          <MobileContextProvider>
          <App />
          </MobileContextProvider>
        </InvestmentContextProvider>
      </BudgetContextProvider>
    </SalaryContextProvider>
  </HashRouter>
), document.getElementById('root'));

serviceWorker.unregister();
