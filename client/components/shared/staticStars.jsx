import React from "react";

const range = (min, max) =>
  Array(max - min + 1)
    .fill()
    .map((_, i) => min + i);

const RatingItem = ({ colored, value }) => (
  <label
    htmlFor="stars_static_input"
    className={`stars_static_item ${colored ? "stars_item_selected" : ""}`}
  >
    <input
      id="stars_static_input"
      className="stars_static_input"
      type="radio"
      value={value}
    />
  </label>
);

const Rating = ({ min, max, value }) => (
  <div>
    {range(min, max).map((item, i) => (
      <RatingItem key={i} colored={value >= item} value={item} />
    ))}
  </div>
);

const App = ({ stars }) => <Rating min={1} max={5} value={stars} />;

export default App;
