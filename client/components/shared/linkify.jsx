import React, { useState, memo } from "react";
import Linkify from "react-linkify";

const linkify = ({ text, decoraction, length }) => {
  const [expression, setExpression] = useState(false);

  return (
    <p className={decoraction}>
      {text.length > length ? (
        expression ? (
          <>
            <Linkify>{text}</Linkify>{" "}
            <a onClick={() => setExpression(!expression)}>Mostrar menos</a>
          </>
        ) : (
          <>
            <Linkify>{text.slice(0, length)}...</Linkify>{" "}
            <a onClick={() => setExpression(!expression)}>Mostrar más</a>
          </>
        )
      ) : (
        <Linkify>{text}</Linkify>
      )}
    </p>
  );
};

export default memo(linkify);
