import { gql } from "apollo-boost";

const information = gql`
  query Information($id: ID!) {
    information(id: $id) {
      routePhoto
      routeCover
      name
      lastname
    }
  }
`;

const x = {};

export { information, x };
