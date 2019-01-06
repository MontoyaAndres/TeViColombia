import React from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import Loading from "../shared/loading";

const information = gql`
  query Information($id: ID!) {
    information(id: $id) {
      university {
        place
        startedOn
        finishIn
        finished
        especializations
        attended
        description
      }
      secondaryschool {
        place
        startedOn
        finishIn
        finished
        description
      }
      work {
        place
        job
        localization
        description
        startedOn
        finishIn
        finished
      }
      cv {
        routeCV
      }
    }
  }
`;

const trainingEmployment = ({ id }) => (
  <Query query={information} variables={{ id }}>
    {({ loading, data }) => {
      if (loading) {
        return <Loading />;
      }

      return (
        <div className="container">
          {!Object.keys(data.information).length ? (
            <div className="columns is-multiline">
              {data.information.university &&
              data.information.university.length ? (
                <div className="column is-6">
                  <div className="box" style={{ marginTop: "0.5rem" }}>
                    <p className="subtitle">
                      <strong>Universidad:</strong>
                      {JSON.stringify(data.information.university)}
                    </p>
                  </div>
                </div>
              ) : null}

              {data.information.secondaryschool &&
              data.information.secondaryschool.length ? (
                <div className="column is-6">
                  <div className="box" style={{ marginTop: "0.5rem" }}>
                    <p className="subtitle">
                      <strong>Escuela secundaria:</strong>
                      {JSON.stringify(data.information.secondaryschool)}
                    </p>
                  </div>
                </div>
              ) : null}

              {data.information.work && data.information.work.length ? (
                <div className="column is-6">
                  <div className="box" style={{ marginTop: "0.5rem" }}>
                    <p className="subtitle">
                      <strong>Trabajo:</strong>
                      {JSON.stringify(data.information.work)}
                    </p>
                  </div>
                </div>
              ) : null}

              {data.information.cv && data.information.cv.length ? (
                <div className="column is-6">
                  <div className="box" style={{ marginTop: "0.5rem" }}>
                    <p className="subtitle">
                      <strong>Hoja de vida:</strong>
                      {JSON.stringify(data.information.cv)}
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

export default trainingEmployment;
