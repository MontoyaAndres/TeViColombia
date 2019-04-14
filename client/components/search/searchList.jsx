import React from "react";
import { SimpleImg } from "react-simple-img";
import Link from "next/link";

import Linkify from "../shared/linkify";

const searchList = ({ value, type, hasMoreItems, handleLoadMore }) => (
  <>
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <SimpleImg
              applyAspectRatio={false}
              src={value.routePhoto}
              height={48}
              width={48}
              alt={value.name}
            />
          </div>
          {type && (
            <div className="media-content">
              <Link
                href={{
                  pathname:
                    type === "User" ? "/profile/user" : "/profile/business",
                  query: { id: value.id }
                }}
              >
                <a
                  className="title is-4"
                  style={{ textDecoration: "underline", color: "#4a4a4a" }}
                >
                  {value.name} {value.lastname}
                </a>
              </Link>
              <br />
              <span className="subtitle">{value.email}</span>
            </div>
          )}
        </div>

        {value.necessity && (
          <div className="content">
            <ul>
              {value.necessity.map((necessity, i) => (
                <li key={i}>
                  <Linkify
                    decoraction="subtitle"
                    length={80}
                    text={necessity.comment}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        {value.employ && (
          <div className="content">
            <ul>
              {value.employ.map((employ, i) => (
                <li key={i}>
                  <Link
                    href={{
                      pathname: "/profile/business/employ",
                      query: { id: value.id, employId: employ.id }
                    }}
                  >
                    <a
                      style={{
                        textDecoration: "underline",
                        color: "#4a4a4a"
                      }}
                    >
                      <Linkify
                        decoraction="subtitle"
                        length={80}
                        text={employ.position}
                      />
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>

    {hasMoreItems && (
      <div className="buttons has-addons is-centered">
        <button
          type="button"
          className="button is-block is-primary is-large"
          onClick={handleLoadMore}
        >
          Ver más
        </button>
      </div>
    )}
  </>
);

export default searchList;
