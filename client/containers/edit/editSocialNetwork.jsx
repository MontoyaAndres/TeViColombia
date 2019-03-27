import React, { useState, Fragment } from "react";

import useResize from "../../components/shared/useResize";

const arraySocialNetwork = [
  "Twitter",
  "GitHub",
  "Facebook",
  "Linkedin",
  "Instagram",
  "YouTube",
  "Spotify",
  "Whatsapp",
  "Skype"
];

function urlSocialNetwork({ name, url }) {
  switch (name) {
    case "Twitter":
      return { name, url: `https://www.twitter.com/${url}` };

    case "GitHub":
      return { name, url: `https://www.github.com/${url}` };

    case "Facebook":
      return { name, url: `https://www.facebook.com/${url}` };

    case "Linkedin":
      return { name, url: `https://www.linkedin.com/in/${url}` };

    case "Instagram":
      return { name, url: `https://www.instagram.com/${url}` };

    case "YouTube":
      return { name, url };

    case "Spotify":
      return { name, url };

    case "Whatsapp":
      return { name, url };

    case "Skype":
      return { name, url };

    default:
      break;
  }
}

// Responsive input for social network
const styleInputResponsive = {
  addonsDesktop: {
    display: "flex"
  },
  addonsMobile: {
    display: "block"
  },
  controlDesktop: {
    paddingBottom: 0
  },
  controlMobile: {
    paddingBottom: 10,
    margin: "0 .75rem"
  },
  selectDesktop: {
    width: "auto"
  },
  selectMobile: {
    width: "100vw"
  }
};

const editSocialNetwork = ({ socialnetwork, setFieldValue }) => {
  const { width } = useResize();

  const [state, setState] = useState({
    name: "Twitter",
    url: "",
    readMore: false
  });

  function handleAddElement(e) {
    e.preventDefault();

    if (state.url !== "") {
      setFieldValue("socialnetwork", [
        ...socialnetwork,
        urlSocialNetwork({ name: state.name, url: state.url })
      ]);
    }

    setState({ name: state.name, url: "", readMore: state.readMore });
  }

  function handleDeleteElement(index) {
    setFieldValue("socialnetwork", [
      ...socialnetwork.slice(0, index),
      ...socialnetwork.slice(index + 1)
    ]);
  }

  function handleReadMore() {
    setState({ name: state.name, url: state.url, readMore: !state.readMore });
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-title">Redes sociales</div>
      </div>

      <div className="card-content">
        <div className="notification is-warning">
          <p className="subtitle">
            Para que cualquier persona pueda comunicarse contigo a través de
            algún medio de comunicación, siga estos pasos y seleccione que medio
            de comunicación va a añadir.{" "}
            <a onClick={handleReadMore}>
              {!state.readMore ? "Mostrar más" : ""}
            </a>
          </p>
          <div className="content">
            {state.readMore && (
              <ul className="subtitle is-6">
                <li>
                  En Twitter, GitHub, Skype, Facebook, Linkedin o Instagram
                  escriba el nombre de usuario de la cuenta. Ejemplo en Twitter:
                  @NombreUsuario
                </li>
                <li>
                  En Whatsapp debe de poner su número de telefóno con su
                  respectivo indicativo de país. Ejemplo: +573213334444
                </li>
                <li>
                  En YouTube o Spotify pegue la URL de su perfil de usuario.{" "}
                  <a onClick={handleReadMore}>Mostrar menos</a>
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className="content">
          <div
            className="field is-grouped"
            style={
              width < 600
                ? { ...styleInputResponsive.addonsMobile }
                : { ...styleInputResponsive.addonsDesktop }
            }
          >
            <div
              className="control has-icons-left"
              style={
                width < 600
                  ? { ...styleInputResponsive.controlMobile }
                  : { ...styleInputResponsive.controlDesktop }
              }
            >
              <div className="select is-medium">
                <select
                  name="name"
                  required
                  className="is-hovered"
                  style={
                    width < 600
                      ? { ...styleInputResponsive.selectMobile }
                      : { ...styleInputResponsive.selectDesktop }
                  }
                  onChange={e =>
                    setState({
                      name: e.target.value,
                      url: state.url,
                      readMore: state.readMore
                    })
                  }
                >
                  {arraySocialNetwork.map((sn, i) => (
                    <option key={i} value={sn}>
                      {sn}
                    </option>
                  ))}
                </select>
              </div>

              <div className="icon is-small is-left">
                <i
                  className={`fab fa-${state.name.toLowerCase()}`}
                  aria-hidden="true"
                />
              </div>
            </div>

            <div
              className="control is-expanded"
              style={
                width < 600
                  ? { ...styleInputResponsive.controlMobile }
                  : { ...styleInputResponsive.controlDesktop }
              }
            >
              <input
                className="input is-hovered is-medium"
                type="text"
                name="url"
                onChange={e =>
                  setState({
                    name: state.name,
                    url: e.target.value,
                    readMore: state.readMore
                  })
                }
                value={state.url}
                onKeyPress={e => {
                  if (e.key === "Enter") e.preventDefault();
                }}
                placeholder="Url, nombre de usuario o teléfono"
              />
            </div>

            <div
              className="control"
              style={{ textAlign: width < 600 ? "center" : "left" }}
            >
              <a
                className="button is-info is-medium"
                onClick={handleAddElement}
                style={{ width: width < 600 ? 150 : "auto" }}
              >
                <span className="icon">
                  <i className="fas fa-plus" aria-hidden="true" />
                </span>
              </a>
            </div>
          </div>

          {socialnetwork && socialnetwork.length
            ? socialnetwork.map((sn, i) => (
                <span
                  key={i}
                  className="tag is-info is-large"
                  style={{ margin: 5 }}
                >
                  <div className="icon is-small">
                    <i
                      className={`fab fa-${sn.name.toLowerCase()}`}
                      aria-hidden="true"
                    />
                  </div>

                  {sn.name === "Skype" ? (
                    <a style={{ color: "white" }} href={`skype:${sn.url}?chat`}>
                      {sn.url}
                    </a>
                  ) : sn.name === "Whatsapp" ? (
                    <a
                      style={{ color: "white" }}
                      rel="noopener noreferrer"
                      target="_blank"
                      href={`https://wa.me/${
                        sn.url
                      }?text=Hola,%20¿Cómo%20te%20va?`}
                    >
                      {sn.url}
                    </a>
                  ) : sn.name === "YouTube" || sn.name === "Spotify" ? (
                    <a
                      style={{ color: "white" }}
                      rel="noopener noreferrer"
                      target="_blank"
                      href={sn.url}
                    >
                      {sn.name}
                    </a>
                  ) : (
                    <a
                      style={{ color: "white" }}
                      rel="noopener noreferrer"
                      target="_blank"
                      href={sn.url}
                    >
                      {/* Removing the url and only show the profile of the user */}
                      {sn.url.replace(/[https:\\/\\/www].+\//, "")}
                    </a>
                  )}

                  <button
                    type="button"
                    className="delete"
                    onClick={() => handleDeleteElement(i)}
                  />
                </span>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default editSocialNetwork;
