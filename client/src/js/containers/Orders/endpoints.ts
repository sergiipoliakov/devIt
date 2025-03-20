import { gql } from '@apollo/client';

const GET_ORDERS = gql`
    query getOrders($userId: ID!) {
        resolveOrders(data: {userId: $userId}) {
          id
          userId {
            name
            balance
          }
          quantity
          totalPrice
          productId {
            name
          }
        }
    }
`;

const ADD_ORDER = gql`
    query addOrder($productId: ID!, $userId: ID!, $quantity: Int! ) {
      resolveAddOrder(data: { productId: $productId, userId: $userId, quantity: $quantity }) {
          id
          totalPrice
          quantity
      }
    }
`;

export {
  GET_ORDERS,
  ADD_ORDER
};
