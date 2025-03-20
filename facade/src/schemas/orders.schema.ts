import { buildSchema } from 'graphql';

const schema = `
    type User {
      name: String
      balance: Int
    }
    type Product {
      name: String
    }
    type Order {
      id: String,
      quantity: Int,
      totalPrice: Int,
      userId: User
      productId: Product
        
    }
    input OrderInput {
      orderId: ID!
    }
    input OrdersInput {
      userId: ID!
    }
    input UpdateOrderInput {
        productId: ID!
        userId: ID!
        quantity: Int!
    }
    input CreateOrderInput {
      productId: ID!
      userId: ID!
      quantity: Int!
    }
    type Query {
        resolveOrder(data: OrderInput): Order,
        resolveOrders(data: OrdersInput): [Order],
        resolveAddOrder(data: CreateOrderInput): Order,
        resolveUpdateOrder(data: UpdateOrderInput): Boolean
    }
`;

export default buildSchema(schema);
