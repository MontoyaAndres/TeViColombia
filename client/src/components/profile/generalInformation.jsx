import React from "react";

const generalInformation = ({ information }) => (
  <div className="container">
    <div className="columns is-multiline">
      <div className="column is-6">
        <div className="box" style={{ marginTop: "0.5rem" }}>
          <div className="content">
            <p className="subtitle">
              <strong>Documento de identificación:</strong>{" "}
              {information.identificationDocumentType}
            </p>
            <p className="subtitle">
              <strong>Número de identificación:</strong>{" "}
              {information.identificationDocument}
            </p>
            <p className="subtitle">
              <strong>Dirección:</strong> {information.address}
            </p>
            <p className="subtitle">
              <strong>Teléfono celular:</strong>{" "}
              <a href={`tel:${information.telephone}`}>
                {information.telephone}
              </a>
            </p>
            <p className="subtitle">
              <strong>Nacionalidad:</strong> {information.nationality}
            </p>
            <p className="subtitle">
              <strong>Departamento:</strong> {information.departament}
            </p>
            <p className="subtitle">
              <strong>Ciudad:</strong> {information.city}
            </p>
          </div>
        </div>
      </div>

      <div className="column is-6">
        <div className="box" style={{ marginTop: "0.5rem" }}>
          <div className="content">
            <p className="subtitle">
              <strong>Estado civil:</strong> {information.civilStatus}
            </p>
            <p className="subtitle">
              <strong>Genero:</strong> {information.gender}
            </p>
            <p className="subtitle">
              <strong>Correo electrónico:</strong>{" "}
              <a href={`mailto:${information.email}`}>{information.email}</a>
            </p>
            <p className="subtitle">
              <strong>Sitio web:</strong>{" "}
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={information.website}
              >
                {information.website}
              </a>
            </p>
            <p className="subtitle">
              <strong>Linkedin:</strong>{" "}
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={information.linkedin}
              >
                {information.linkedin}
              </a>
            </p>
            <p className="subtitle">
              <strong>Skype:</strong>{" "}
              <a href={`skype:${information.skype}?chat`}>
                {information.skype}
              </a>
            </p>
            {information.language && information.language.length ? (
              <>
                <p className="subtitle">
                  <strong>Idiomas:</strong>
                </p>
                <ul>
                  {information.language.map(language => (
                    <li key={language.id}>
                      <span className="subtitle">
                        {language.language} - {language.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default generalInformation;
