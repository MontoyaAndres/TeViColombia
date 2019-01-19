import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import Loading from "../shared/loading";

const information = gql`
  query Information($id: ID!) {
    information(id: $id) {
      feedback {
        stars
        comment
      }
    }
  }
`;

const feedback = ({ id }) => (
  <Query query={information} variables={{ id }}>
    {({ loading, data }) => {
      if (loading) {
        return <Loading />;
      }

      return (
        <div className="container">
          {!Object.keys(data.information).length ? (
            <div className="columns is-multiline">
              {data.information.feedback && data.information.feedback.length ? (
                <div className="column is-6">
                  <div className="box" style={{ marginTop: "0.5rem" }}>
                    <p className="subtitle">
                      <strong>feedback:</strong>
                      {JSON.stringify(data.information.feedback)}
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
              No se ha encontrado información al respecto.
            </h2>
          )}
        </div>
      );
    }}
  </Query>
);

export default feedback;
