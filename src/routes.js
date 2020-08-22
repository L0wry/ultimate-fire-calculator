import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import NetWorth from 'src/views/networth/NetWorth';
import Budget from 'src/views/budget/Budget';
import DashboardView from 'src/views/dashboard/DashboardView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/salaryCalculator/SalaryCalculator';
import SettingsView from 'src/views/settings/SettingsView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'net-worth', element: <NetWorth /> },
      { path: 'budget', element: <Budget /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'salary', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
