import { gql } from '@apollo/client';

const GET_PRODUCTS = gql`
    query getProducts {
        resolveProducts {
          id
          name
          price
          stock
        }
    }
`;

const ADD_PRODUCT = gql`
    query addProduct($name: String!, $price: Int!, $stock: Int ) {
      resolveAddProduct(data: { name: $name, price: $price, stock: $stock }) {
          id
          name
          price
          stock
      }
    }
`;

export {
  GET_PRODUCTS,
  ADD_PRODUCT
};
