import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Loading from "../shared/loading";

const information = gql`
  query Information($id: ID!) {
    information(id: $id) {
      business {
        id
        name
        routePhone
      }
    }
  }
`;

const commercialEstablishment = ({ id }) => (
  <Query query={information} variables={{ id }}>
    {({ loading, data }) => {
      if (loading) {
        return <Loading />;
      }

      return (
        <div className="container">
          {!Object.keys(data.information).length > 0 ? (
            <div className="columns is-multiline">
              {data.information.commercialEstablishment &&
              data.information.commercialEstablishment.length > 0 ? (
                <div className="column is-6">
                  <div className="box" style={{ marginTop: "0.5rem" }}>
                    <p className="subtitle">
                      <strong>Establecimiento comercial:</strong>
                      {JSON.stringify(data.information.commercialEstablishment)}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <h2
              className="subtitle is-3"
              style={{ textAlign: "center", padding: 20 }}
            >
              No se ha encontrado información.
            </h2>
          )}
        </div>
      );
    }}
  </Query>
);

export default commercialEstablishment;
