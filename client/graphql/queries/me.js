import gql from "graphql-tag";

const meQuery = gql`
  query MeQuery {
    me {
      id
      name
      lastname
      email
      type
    }
  }
`;

export default meQuery;
