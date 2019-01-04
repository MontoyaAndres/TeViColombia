import React from "react";
import { graphql } from "react-apollo";
import { withRouter } from "next/router";
import Error from "next/error";

import meQuery from "../graphql/queries/me";

const editProfile = ({ data: { me }, router: { query } }) => {
  if (me.id !== query.id) {
    return <Error statusCode={404} />;
  }

  return <h1>edit profile</h1>;
};

export default graphql(meQuery)(withRouter(editProfile));
