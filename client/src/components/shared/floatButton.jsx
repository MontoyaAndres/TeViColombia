import React from "react";
import { graphql } from "react-apollo";

import meQuery from "../../graphql/queries/me";
import { Link } from "../../routes";

const floatButton = ({ profileId, type, data }) =>
  data.me.id === profileId ? (
    <Link route={`/perfil/${profileId}/edit`}>
      <a className="float">
        <i className={`fa fa-${type} my-float`} />
      </a>
    </Link>
  ) : null;

export default graphql(meQuery)(floatButton);
