import React, { useState } from "react";
import Linkify from "react-linkify";

const linkify = ({ text }) => {
  const [expression, setExpression] = useState(false);

  return (
    <p className="subtitle">
      {text.length > 80 ? (
        expression ? (
          <>
            <Linkify>{text}</Linkify>{" "}
            <a onClick={() => setExpression(!expression)}>Mostrar menos</a>
          </>
        ) : (
          <>
            <Linkify>{text.slice(0, 80)}...</Linkify>{" "}
            <a onClick={() => setExpression(!expression)}>Mostrar más</a>
          </>
        )
      ) : (
        <Linkify>{text}</Linkify>
      )}
    </p>
  );
};

export default linkify;
