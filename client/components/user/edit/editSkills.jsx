import React, { useState } from "react";

const editSkills = ({ skills, setFieldValue }) => {
  const [value, setValue] = useState("");

  function handleChange(e) {
    e.preventDefault();

    setValue(e.target.value);
  }

  function handleDeleteElement(index) {
    setFieldValue("skills", [
      ...skills.slice(0, index),
      ...skills.slice(index + 1)
    ]);
  }

  function handleAddElement(e) {
    e.preventDefault();

    setFieldValue("skills", [...skills, value]);
    setValue("");
  }

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
              onChange={handleChange}
              className="input is-hovered is-medium"
              name="skills"
              placeholder="Habilidades"
            />
          </div>

          <div className="control">
            <a className="button is-info is-medium" onClick={handleAddElement}>
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
                  onClick={() => handleDeleteElement(i)}
                />
              </span>
            ))
          : null}
      </div>
    </div>
  );
};

export default editSkills;
