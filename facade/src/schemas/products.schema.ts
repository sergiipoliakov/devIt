import { buildSchema } from 'graphql';

const schema = `
    type Product {
        id: String,
        name: String,
        price: Int,
        stock: Int,
    }
    input UpdateProductInput {
        productId: ID!
        price: Int
        stock: Int
    }
    input CreateProduct {
      name: String!
      price: Int!
      stock: Int
    }
    type Query {
        resolveProduct: Product,
        resolveProducts: [Product],
        resolveAddProduct(data: CreateProduct): Product,
        resolveUpdateProduct(data: UpdateProductInput): Boolean
    }
`;

export default buildSchema(schema);
