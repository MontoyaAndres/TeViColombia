import React from "react";
import Link from "next/link";

const footer = () => (
  <footer
    className="footer"
    style={{ backgroundColor: "rgba(74, 74, 74, 0.2)" }}
  >
    <div className="content has-text-centered">
      <p className="subtitle">
        <strong>Te Vi Colombia 2019</strong>
      </p>
      <div>
        Icono hecho por{" "}
        <a
          href="https://www.flaticon.com/authors/srip"
          title="srip"
          target="_blank"
          rel="noopener noreferrer"
        >
          srip
        </a>{" "}
        de{" "}
        <a
          href="https://www.flaticon.com/"
          title="Flaticon"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.flaticon.com
        </a>{" "}
        licenciado por{" "}
        <a
          href="http://creativecommons.org/licenses/by/3.0/"
          title="Creative Commons BY 3.0"
          target="_blank"
          rel="noopener noreferrer"
        >
          CC 3.0 BY
        </a>
      </div>
    </div>
  </footer>
);

export default footer;
