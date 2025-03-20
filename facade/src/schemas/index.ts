import { makeExecutableSchema } from '@graphql-tools/schema';
import users from './users.schema';
import products from './products.schema';
import orders from './orders.schema';


const schema = makeExecutableSchema({
  typeDefs: [
    users,
    products,
    orders
  ]
});

export default schema;
