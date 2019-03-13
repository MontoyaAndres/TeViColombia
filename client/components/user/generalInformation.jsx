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
              <strong>Dirección y localidad:</strong> {information.address}
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
              <strong>Fecha de nacimiento:</strong> {information.birth}
            </p>
            <p className="subtitle">
              <strong>Con discapacidad:</strong> {information.disability}
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
              <strong>Correo electrónico sec:</strong>{" "}
              <a href={`mailto:${information.optionalEmail}`}>
                {information.optionalEmail}
              </a>
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
            {information.language && information.language.length > 0 ? (
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

            {information.socialnetwork &&
            information.socialnetwork.length > 0 ? (
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

      {information.preferwork && information.preferwork.currentSituation ? (
        <div className="column is-6">
          <div className="box" style={{ marginTop: "0.5rem" }}>
            <p className="title">Preferencias de empleo</p>
            <div className="content">
              <p className="subtitle">
                <strong>Situación actual:</strong>{" "}
                {information.preferwork.currentSituation}
              </p>

              <p className="subtitle">
                <strong>Puesto de trabajo deseado:</strong>{" "}
                {information.preferwork.job}
              </p>

              <p className="subtitle">
                <strong>Área:</strong> <br />
                {information.preferwork.area.map(area => (
                  <span
                    key={area}
                    className="tag is-info is-large"
                    style={{ margin: 5 }}
                  >
                    {area}
                  </span>
                ))}
              </p>

              <p className="subtitle">
                <strong>Moneda:</strong> {information.preferwork.currency}
              </p>

              <p className="subtitle">
                <strong>Salario mínimo aceptado:</strong>{" "}
                {information.preferwork.salary}
              </p>

              <p className="subtitle">
                <strong>Departamento:</strong>
                <br />
                {information.preferwork.departament.map(departament => (
                  <span
                    key={departament}
                    className="tag is-info is-large"
                    style={{ margin: 5 }}
                  >
                    {departament}
                  </span>
                ))}
              </p>

              <p className="subtitle">
                <strong>Disponibilidad para viajar:</strong>{" "}
                {information.preferwork.travel}
              </p>

              <p className="subtitle">
                <strong>Disponibilidad para cambiar de residencia:</strong>{" "}
                {information.preferwork.residence}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {information.skills && information.skills.length > 0 ? (
        <div className="column is-6">
          <div className="box" style={{ marginTop: "0.5rem" }}>
            <p className="title">Habilidades</p>
            <div className="content">
              {information.skills.map((skill, i) => (
                <span
                  key={i}
                  className="tag is-info is-large"
                  style={{ margin: 5 }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  </div>
);

export default generalInformation;
