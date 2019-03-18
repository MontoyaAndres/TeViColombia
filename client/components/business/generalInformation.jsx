import React from "react";

const generalInformation = ({ information }) => (
  <div className="container">
    <div className="columns is-multiline">
      <div className={`column ${information.socialnetwork ? "is-6" : "is-12"}`}>
        <div className="box" style={{ marginTop: "0.1rem" }}>
          <div className="content">
            <p className="subtitle">
              <strong>Correo electrónico:</strong>{" "}
              <a href={`mailto:${information.email}`}>{information.email}</a>
            </p>
            <p className="subtitle">
              <strong>Correo electrónico sec:</strong>{" "}
              <a href={`mailto:${information.optionalEmail}`}>
                {information.optionalEmail}
              </a>
            </p>
            <p className="subtitle">
              <strong>Teléfono celular/fijo:</strong>{" "}
              <a
                href={`tel:+${information.telephoneCountry} ${
                  information.telephone
                }`}
              >
                {`+${information.telephoneCountry} ${information.telephone}`}
              </a>
            </p>
            <p className="subtitle">
              <strong>Teléfono sec celular/fijo:</strong>{" "}
              <a
                href={`tel:+${information.telephone2Country} ${
                  information.telephone2
                }`}
              >
                {information.telephone2 &&
                  `+${information.telephone2Country} ${information.telephone2}`}
              </a>
            </p>
            <p className="subtitle">
              <strong>Nacionalidad:</strong> {information.nationality}
            </p>
            <p className="subtitle">
              <strong>Departamento:</strong> {information.departament}
            </p>
            {information.departament !== "Extranjero" &&
            information.nationality === "Colombia" ? (
              <p className="subtitle">
                <strong>Municipio:</strong> {information.town}
              </p>
            ) : null}
            <p className="subtitle">
              <strong>Dirección y localidad:</strong> {information.address}
            </p>
            <p className="subtitle">
              <strong>Sector:</strong> {information.sector}
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
          </div>
        </div>
      </div>

      {information.socialnetwork && (
        <div className="column is-6">
          <div className="box" style={{ marginTop: "0.1rem" }}>
            <div className="content">
              {information.socialnetwork.length > 0 ? (
                <>
                  <p className="subtitle">
                    <strong>Redes sociales:</strong>
                  </p>

                  <ul>
                    {information.socialnetwork.map((socialnetwork, i) => (
                      <li key={i}>
                        <span className="subtitle">
                          <i
                            className={`fab fa-${socialnetwork.name.toLowerCase()}`}
                            aria-hidden="true"
                          />{" "}
                          {socialnetwork.name === "Skype" ? (
                            <a href={`skype:${socialnetwork.url}?chat`}>
                              {socialnetwork.url}
                            </a>
                          ) : socialnetwork.name === "Whatsapp" ? (
                            <a
                              rel="noopener noreferrer"
                              target="_blank"
                              href={`https://wa.me/${
                                socialnetwork.url
                              }?text=Hola,%20¿Cómo%20te%20va?`}
                            >
                              {socialnetwork.url}
                            </a>
                          ) : socialnetwork.name === "YouTube" ||
                            socialnetwork.name === "Spotify" ? (
                            <a
                              rel="noopener noreferrer"
                              target="_blank"
                              href={socialnetwork.url}
                            >
                              {socialnetwork.name}
                            </a>
                          ) : (
                            <a
                              rel="noopener noreferrer"
                              target="_blank"
                              href={socialnetwork.url}
                            >
                              {/* Removing the url and only show the profile of the user */}
                              {socialnetwork.url.replace(
                                /[https:\\/\\/www].+\//,
                                ""
                              )}
                            </a>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default generalInformation;
