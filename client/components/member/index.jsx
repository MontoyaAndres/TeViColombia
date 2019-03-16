import React from "react";
import { SimpleImg } from "react-simple-img";
import Link from "next/link";

const member = ({ information }) => (
  <div className="container">
    <div style={{ padding: ".75rem" }}>
      {information && information.length > 0 ? (
        information.map(mbr => (
          <div style={{ marginTop: "1.1rem" }} key={mbr.id}>
            <div className="card" style={{ borderRadius: 6 }}>
              <div className="card-content" style={{ borderRadius: 6 }}>
                <div className="media">
                  <div className="media-left">
                    <SimpleImg
                      applyAspectRatio={false}
                      src={`${process.env.API_HOST}/${mbr.routePhoto}`}
                      height={44}
                      width={48}
                      alt="profile"
                    />
                  </div>

                  <div className="media-content">
                    <Link
                      href={{
                        pathname: mbr.lastname // Only users have the value lastname, the businesses do not have this value.
                          ? "/profile/user"
                          : "/profile/business",
                        query: { id: mbr.id }
                      }}
                      prefetch
                    >
                      <a className="title is-4">
                        {mbr.name} {mbr.lastname && mbr.lastname}
                      </a>
                    </Link>
                    <br />
                    <span className="subtitle">{mbr.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h2
          className="subtitle is-3"
          style={{ textAlign: "center", padding: 20 }}
        >
          No se ha encontrado información.
        </h2>
      )}
    </div>
  </div>
);

export default member;
