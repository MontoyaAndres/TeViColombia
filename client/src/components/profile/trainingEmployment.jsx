import React from "react";

const trainingEmployment = ({ information }) => (
  <div className="container">
    <div style={{ padding: ".75rem" }}>
      {information.study && information.study.length ? (
        <div className="box" style={{ marginTop: "0.5rem" }}>
          <p className="title">Estudio</p>
          {information.study.map((study, i) => (
            <div className="content" key={i}>
              <p className="subtitle">
                <strong>Lugar:</strong> {study.place}
              </p>

              <p className="subtitle">
                <strong>Nivel:</strong> {study.level}
              </p>

              {study.area && (
                <p className="subtitle">
                  <strong>Area:</strong> {study.area}
                </p>
              )}

              <p className="subtitle">
                <strong>Comenzo en:</strong> {study.startedOn}
              </p>

              <p className="subtitle">
                <strong>Finalizo en:</strong>{" "}
                {study.finishIn ? study.finishIn : "Actualmente cursando"}
              </p>

              {information.study.length - 1 !== i && (
                <div className="is-divider" style={{ width: "100%" }} />
              )}
            </div>
          ))}
        </div>
      ) : null}

      {information.work && information.work.length ? (
        <div className="box" style={{ marginTop: "0.5rem" }}>
          <p className="title">Trabajo</p>
          {information.work.map((work, i) => (
            <div className="content" key={i}>
              <p className="subtitle">
                <strong>Compañia:</strong> {work.company}
              </p>

              <p className="subtitle">
                <strong>Departamento:</strong> {work.departament}
              </p>

              <p className="subtitle">
                <strong>Sector de la empresa:</strong> {work.sector}
              </p>

              <p className="subtitle">
                <strong>Cargo:</strong> {work.job}
              </p>

              <p className="subtitle">
                <strong>Area:</strong> {work.area}
              </p>

              <p className="subtitle">
                <strong>Comenzo en:</strong> {work.startedOn}
              </p>

              <p className="subtitle">
                <strong>Finalizo en:</strong>{" "}
                {work.finishIn ? work.finishIn : "Actualmente trabajando"}
              </p>

              <>
                <p className="subtitle">
                  <strong>Funciones y logros del cargo:</strong>
                </p>
                <ul>
                  <li className="subtitle">{work.goals}</li>
                </ul>
              </>

              {information.work.length - 1 !== i && (
                <div className="is-divider" style={{ width: "100%" }} />
              )}
            </div>
          ))}
        </div>
      ) : null}

      {information.cv && information.cv.length ? (
        <div className="box" style={{ marginTop: "0.5rem" }}>
          <p className="title">Hoja de vida</p>
          <div className="content">
            <div className="columns is-multiline">
              {information.cv.map((cv, i) => (
                <div className="column is-6" key={i}>
                  <div className="card">
                    <div className="card-content">
                      <div className="media">
                        <div className="media-left">
                          <a
                            href={`${process.env.API_HOST}/${cv.routeCV}`}
                            download
                          >
                            <i
                              className="fas fa-2x fa-file-download"
                              aria-hidden="true"
                            />
                          </a>
                        </div>
                        <div className="media-content">
                          <span className="subtitle">{cv.filename}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  </div>
);

export default trainingEmployment;
