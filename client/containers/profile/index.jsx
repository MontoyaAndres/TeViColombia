import React, { useState, useEffect, memo } from "react";
import { graphql } from "react-apollo";

import { feedbackQuery } from "../../graphql/queries/account";

const profile = ({
  routeCover,
  routePhoto,
  name,
  lastname,
  description,
  id,
  loading,
  data,
  children
}) => {
  const [value, setValue] = useState(1);

  useEffect(() => setValue(1), [id]);

  if (loading) {
    return null;
  }

  return (
    <>
      {routeCover ? (
        <figure className="background-cover">
          <img src={routeCover} alt="user cover" />
        </figure>
      ) : (
        <div className="background-color" />
      )}

      <div
        style={{
          display: "block",
          position: "relative",
          width: 200,
          left: "50%",
          transform: "translateX(-50%)"
        }}
      >
        <figure className="avatar-profile">
          <img
            style={{ width: 200, height: 200 }}
            src={routePhoto}
            alt="profile"
          />
        </figure>
      </div>

      <h3 className="title" style={{ textAlign: "center" }}>
        {/* For business `lastname` is null */}
        {name} {lastname}
      </h3>

      <h3 className="subtitle" style={{ textAlign: "center" }}>
        <p>{description}</p>
      </h3>

      <h3 className="subtitle" style={{ textAlign: "center" }}>
        <p>
          {data && data.count > 0 ? (
            <span className="stars_static_item stars_item_selected feedback_star">
              {data.count}
            </span>
          ) : (
            <span className="stars_static_item stars_item_selected feedback_star">
              0
            </span>
          )}
        </p>
      </h3>

      {children({ value, setValue })}
    </>
  );
};

export default graphql(feedbackQuery, {
  options: ({ id }) => ({ variables: { id } }),
  props: ({ data }) => ({
    loading: data.loading,
    data: data.feedback
  })
})(memo(profile));
