import { buildSchema } from 'graphql';

const schema = `
    type User {
        id: String,
        name: String,
        email: String,
        balance: Int,
    }
    input UpdateUserInput {
        userId: ID!
        balance: Int!
    }
    input SignupInput {
        email: String!
        name: String!
    }
    type Query {
        resolveUser: User,
        resolveUsers: [User],
        resolveRegisterUser(data: SignupInput): User,
        resolveUpdateUser(data: UpdateUserInput): Boolean
    }
`;

export default buildSchema(schema);
