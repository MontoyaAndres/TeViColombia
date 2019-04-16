import React from "react";

const range = (min, max) =>
  Array(max - min + 1)
    .fill()
    .map((_, i) => min + i);

const RatingItem = ({ checked, colored, onChange, value }) => (
  <label
    htmlFor="stars_input"
    className={`stars_item ${colored ? "stars_item_selected" : ""}`}
  >
    <input
      checked={checked}
      id="stars_input"
      className="stars_input"
      onChange={e => onChange(value)}
      type="radio"
      value={value}
    />
  </label>
);

const Rating = ({ min, max, onChange, value }) => (
  <div>
    {range(min, max).map((item, i) => (
      <RatingItem
        key={i}
        colored={value >= item}
        checked={value === item}
        value={item}
        onChange={onChange}
      />
    ))}
  </div>
);

const App = ({ setFieldValue, stars }) => (
  <Rating
    min={1}
    max={5}
    onChange={value => setFieldValue("stars", value)}
    value={stars}
  />
);

export default App;
