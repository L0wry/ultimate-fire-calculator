import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import {SalaryContextProvider} from './context/SalaryContext'
import App from './App';

ReactDOM.render((
  <BrowserRouter>
    <SalaryContextProvider>
      <App />
    </SalaryContextProvider>
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
