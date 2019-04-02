import React from "react";
import { SimpleImg } from "react-simple-img";
import Link from "next/link";

const searchList = ({ value, type }) => (
  <div className="card">
    <div className="card-content">
      <div className="media">
        <div className="media-left">
          <figure className="image is-48x48">
            <SimpleImg
              applyAspectRatio={false}
              src={`${process.env.API_HOST}/${value.routePhoto}`}
              height={48}
              width={48}
              alt={value.name}
            />
          </figure>
        </div>
        <div className="media-content">
          <span className="subtitle">
            {value.name} {value.lastname}
          </span>
        </div>
      </div>
      <div className="content" style={{ textAlign: "center" }}>
        <Link
          href={{
            pathname: type === "User" ? "/profile/user" : "/profile/business",
            query: { id: value.id }
          }}
        >
          <a className="button is-primary is-rounded">Ver perfil</a>
        </Link>
      </div>
    </div>
  </div>
);

export default searchList;
