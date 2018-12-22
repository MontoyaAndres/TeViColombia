import { gql } from "apollo-boost";

const meQuery = gql`
  query MeQuery {
    me {
      id
      routePhoto
      routeCover
      name
      lastname
    }
  }
`;

export default meQuery;
