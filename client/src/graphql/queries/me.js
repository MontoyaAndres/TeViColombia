import { gql } from "apollo-boost";

const meQuery = gql`
  query MeQuery {
    me {
      id
      name
      lastname
      email
    }
  }
`;

export default meQuery;
