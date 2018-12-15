import React, { PureComponent } from "react";

import { generalInformation as information } from "../../api/user";

class generalInformation extends PureComponent {
  state = {
    user: {}
  };

  async componentWillMount() {
    const response = await information();

    this.setState({ user: response.user });
  }

  render() {
    const { user } = this.state;

    return (
      <div className="container">
        <div className="columns is-multiline">
          {user.description && (
            <div className="column is-12">
              <dir className="box" style={{ marginTop: "0.5rem" }}>
                <p className="subtitle is-4">{user.description}</p>
              </dir>
            </div>
          )}

          <div className="column is-6">
            <div className="box" style={{ marginTop: "0.5rem" }}>
              <p className="subtitle">
                <strong>Documento de identificación:</strong>{" "}
                {user.identificationDocumentType}
              </p>
              <p className="subtitle">
                <strong>Número de identificación:</strong>{" "}
                {user.identificationDocument}
              </p>
              <p className="subtitle">
                <strong>Dirección:</strong> {user.address}
              </p>
              <p className="subtitle">
                <strong>Teléfono celular:</strong> {user.telephone}
              </p>
              <p className="subtitle">
                <strong>Sitio web:</strong> {user.website}
              </p>
            </div>
          </div>

          <div className="column is-6">
            <div className="box" style={{ marginTop: "0.5rem" }}>
              <p className="subtitle">
                <strong>Correo electrónico:</strong> {user.email}
              </p>
              <p className="subtitle">
                <strong>Genero:</strong> {user.gender}
              </p>
              <p className="subtitle">
                <strong>Ciudad:</strong> {user.city}
              </p>
              <p className="subtitle">
                <strong>Departamento:</strong> {user.departament}
              </p>
              <p className="subtitle">
                <strong>Estado civil:</strong> {user.civilStatus}
              </p>
            </div>
          </div>

          {user.socialnetwork && user.socialnetwork.length ? (
            <div className="column is-6">
              <div className="box" style={{ marginTop: "0.5rem" }}>
                <p className="subtitle">
                  <strong>Redes sociales:</strong>
                  {JSON.stringify(user.socialnetwork)}
                </p>
              </div>
            </div>
          ) : null}

          {user.language && user.language.length ? (
            <div className="column is-6">
              <div className="box" style={{ marginTop: "0.5rem" }}>
                <p className="subtitle">
                  <strong>Idiomas:</strong>
                  {JSON.stringify(user.language)}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default generalInformation;
