import React from "react";

import TagField from "../../components/shared/tagField";

const editSkills = ({ skills, setFieldValue }) => (
  <div className="column is-12">
    <div className="content">
      <label htmlFor="skills" className="label">
        Habilidades
      </label>
      <TagField
        id="skills"
        name="skills"
        placeholder="Habilidades"
        setFieldValue={setFieldValue}
        values={skills}
      />
    </div>
  </div>
);

export default editSkills;
