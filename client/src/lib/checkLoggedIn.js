import meQuery from "../graphql/queries/me";

export default apolloClient =>
  apolloClient
    .query({ query: meQuery })
    .then(({ data }) => ({ loggedInUser: data }))
    .catch(() =>
      // Fail gracefully
      ({ loggedInUser: {} })
    );
