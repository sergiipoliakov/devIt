import { mergeResolvers } from '@graphql-tools/merge';
import users from './users.resolver';
import products from './products.resolver';
import orders from './orders.resolver';

const resolvers = [
    users,
    products,
    orders
];

export default mergeResolvers(resolvers);
