import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { SalaryContextProvider } from './context/SalaryContext'
import { BudgetContextProvider } from './context/BudgetContext'

import App from './App';

ReactDOM.render((
  <BrowserRouter>
    <SalaryContextProvider>
      <BudgetContextProvider>
        <App />
      </BudgetContextProvider>
    </SalaryContextProvider>
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
