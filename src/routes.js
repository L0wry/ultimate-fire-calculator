import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import Investments from 'src/views/investments/Investments';
import Budget from 'src/views/budget/Budget';
import NetWorthDashboard from 'src/views/dashboard/DashboardView';
import SalaryCalculator from 'src/views/salaryCalculator/SalaryCalculator';
import Help from 'src/views/help';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'investments', element: <Investments /> },
      { path: 'budget', element: <Budget /> },
      { path: 'dashboard', element: <NetWorthDashboard /> },
      { path: 'salary-calculator', element: <SalaryCalculator /> },
      { path: 'Help', element: <Help /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '404', element: <Navigate to="/app/salary-calculator" /> },
      { path: '/', element: <Navigate to="/app/salary-calculator" /> },
      { path: '*', element: <Navigate to="/app/salary-calculator" /> }
    ]
  }
];

export default routes;
