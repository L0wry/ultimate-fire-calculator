import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import Investments from 'src/views/investments/Investments';
import Budget from 'src/views/budget/Budget';
import NetWorthDashboard from 'src/views/dashboard/DashboardView';
import NotFoundView from 'src/views/errors/NotFoundView';
import SalaryCalculator from 'src/views/salaryCalculator/SalaryCalculator';
import SettingsView from 'src/views/settings/SettingsView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'investments', element: <Investments /> },
      { path: 'budget', element: <Budget /> },
      { path: 'net-worth', element: <NetWorthDashboard /> },
      { path: 'salary-calculator', element: <SalaryCalculator /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/salary-calculator" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
