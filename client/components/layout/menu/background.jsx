import React, { PureComponent } from "react";

class Background extends PureComponent {
  state = {
    width: 0
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const { width } = this.state;

    return (
      <div className="hero-body">
        <div className="container is-widescreen has-text-centered">
          <p className="animated pulse" id="title">
            Tejidos virtuales para el emprendimiento, las prácticas
            profesionales y la empleabilidad
          </p>
          <div
            className="field has-addons animated pulse"
            style={{ padding: "2em" }}
          >
            <div className="control is-expanded">
              <input
                className={`input is-hovered ${width < 600 ? "" : "is-medium"}`}
                type="search"
                placeholder="Busca lo que tú necesitas"
              />
            </div>
            <div className="control">
              <a
                className={`button is-primary ${
                  width < 600 ? "" : "is-medium"
                }`}
              >
                Buscar
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Background;
