import { lazy } from 'react';

const Products = lazy(() => import('.'));
const AddProduct = lazy(() => import('./index.add'));

export default [
    {
        path: '/account/products',
        component: Products
    },
    {
      path: '/account/products/create',
      component: AddProduct
  }
];
