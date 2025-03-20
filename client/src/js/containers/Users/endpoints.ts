import { gql } from '@apollo/client';

const GET_USERS = gql`
    query getRequests {
        resolveUsers {
          id
          name
          email
          balance
        }
    }
`;

export {
  GET_USERS
};
