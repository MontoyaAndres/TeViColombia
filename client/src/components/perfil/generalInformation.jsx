import React from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import Loading from "../shared/loading";

const information = gql`
  query Information($id: ID!) {
    information(id: $id) {
      description
      identificationDocumentType
      identificationDocument
      address
      telephone
      website
      email
      gender
      city
      departament
      civilStatus
      socialnetwork {
        name
        url
      }
      language {
        language
        level
      }
    }
  }
`;

const generalInformation = ({ id }) => (
  <Query query={information} variables={{ id }}>
    {({ loading, data }) => {
      if (loading) {
        return <Loading />;
      }

      return (
        <div className="container">
          <div className="columns is-multiline">
            {data.information.description && (
              <div className="column is-12">
                <dir className="box" style={{ marginTop: "0.5rem" }}>
                  <p className="subtitle is-4">
                    {data.information.description}
                  </p>
                </dir>
              </div>
            )}

            <div className="column is-6">
              <div className="box" style={{ marginTop: "0.5rem" }}>
                <p className="subtitle">
                  <strong>Documento de identificación:</strong>{" "}
                  {data.information.identificationDocumentType}
                </p>
                <p className="subtitle">
                  <strong>Número de identificación:</strong>{" "}
                  {data.information.identificationDocument}
                </p>
                <p className="subtitle">
                  <strong>Dirección:</strong> {data.information.address}
                </p>
                <p className="subtitle">
                  <strong>Teléfono celular:</strong>{" "}
                  {data.information.telephone}
                </p>
                <p className="subtitle">
                  <strong>Sitio web:</strong> {data.information.website}
                </p>
              </div>
            </div>

            <div className="column is-6">
              <div className="box" style={{ marginTop: "0.5rem" }}>
                <p className="subtitle">
                  <strong>Correo electrónico:</strong> {data.information.email}
                </p>
                <p className="subtitle">
                  <strong>Genero:</strong> {data.information.gender}
                </p>
                <p className="subtitle">
                  <strong>Ciudad:</strong> {data.information.city}
                </p>
                <p className="subtitle">
                  <strong>Departamento:</strong> {data.information.departament}
                </p>
                <p className="subtitle">
                  <strong>Estado civil:</strong> {data.information.civilStatus}
                </p>
              </div>
            </div>

            {data.information.socialnetwork &&
            data.information.socialnetwork.length ? (
              <div className="column is-6">
                <div className="box" style={{ marginTop: "0.5rem" }}>
                  <p className="subtitle">
                    <strong>Redes sociales:</strong>
                    {JSON.stringify(data.information.socialnetwork)}
                  </p>
                </div>
              </div>
            ) : null}

            {data.information.language && data.information.language.length ? (
              <div className="column is-6">
                <div className="box" style={{ marginTop: "0.5rem" }}>
                  <p className="subtitle">
                    <strong>Idiomas:</strong>
                    {JSON.stringify(data.information.language)}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      );
    }}
  </Query>
);

export default generalInformation;
