import React from "react";

class editSkills extends React.PureComponent {
  state = {
    value: ""
  };

  handleChange = e => {
    e.preventDefault();

    this.setState({ value: e.target.value });
  };

  handleDeleteElement = index => {
    const { skills, setFieldValue } = this.props;

    setFieldValue("skills", [
      ...skills.slice(0, index),
      ...skills.slice(index + 1)
    ]);
  };

  handleAddElement = e => {
    e.preventDefault();

    const { skills, setFieldValue } = this.props;
    const { value } = this.state;

    setFieldValue("skills", [...skills, value]);
    this.setState({ value: "" });
  };

  render() {
    const { value } = this.state;
    const { skills } = this.props;

    return (
      <div className="column is-12">
        <div className="content">
          <label className="label">Habilidades</label>
          <div className="field is-grouped">
            <div className="control is-expanded">
              <input
                type="text"
                value={value}
                onKeyPress={e => {
                  if (e.key === "Enter") e.preventDefault();
                }}
                onChange={this.handleChange}
                className="input is-hovered is-medium"
                name="skills"
                placeholder="Habilidades"
              />
            </div>

            <div className="control">
              <a
                className="button is-info is-medium"
                onClick={this.handleAddElement}
              >
                <span className="icon">
                  <i className="fas fa-plus" aria-hidden="true" />
                </span>
              </a>
            </div>
          </div>

          {skills && skills.length > 0
            ? skills.map((skill, i) => (
                <span
                  key={i}
                  className="tag is-info is-large"
                  style={{ margin: 5 }}
                >
                  {skill}
                  <button
                    type="button"
                    className="delete"
                    onClick={() => this.handleDeleteElement(i)}
                  />
                </span>
              ))
            : null}
        </div>
      </div>
    );
  }
}

export default editSkills;
