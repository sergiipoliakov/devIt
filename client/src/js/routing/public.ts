import Users from '../containers/Users/routes';
import Products from '../containers/Products/routes';
import Orders from '../containers/Orders/routes';

export default [
    ...Users,
    ...Products,
    ...Orders
];
