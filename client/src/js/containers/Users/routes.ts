import { lazy } from 'react';

const Users = lazy(() => import('.'));

export default [
    {
        path: '/account/',
        component: Users
    }
];
