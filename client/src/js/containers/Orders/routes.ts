import { lazy } from 'react';

const Orders = lazy(() => import('.'));
const UserOrders = lazy(() => import('.'));

export default [
  {
    path: '/account/orders',
    component: Orders
  },
  {
    path: '/account/orders/:id',
    component: UserOrders
  }
];
