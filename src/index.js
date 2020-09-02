import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { SalaryContextProvider } from './context/SalaryContext'
import { BudgetContextProvider } from './context/BudgetContext'

import App from './App';

ReactDOM.render((
  <HashRouter>
    <SalaryContextProvider>
      <BudgetContextProvider>
        <App />
      </BudgetContextProvider>
    </SalaryContextProvider>
  </HashRouter>
), document.getElementById('root'));

serviceWorker.unregister();
