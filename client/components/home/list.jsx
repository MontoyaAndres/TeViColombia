import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { SimpleImg } from "react-simple-img";
import Link from "next/link";

import Loading from "../shared/loading";

const listQuery = gql`
  query ListQuery {
    list {
      user {
        id
        name
        lastname
        routePhoto
        stars
      }
      business {
        id
        name
        routePhoto
        stars
      }
    }
  }
`;

const CardList = ({ value }) => (
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
            <p className="stars_static_item stars_item_selected">
              {value.stars}
            </p>
          </span>
        </div>
      </div>
      <div className="content" style={{ textAlign: "center" }}>
        <Link
          href={{
            pathname: "/profile/user",
            query: { id: value.id }
          }}
          prefetch
        >
          <a className="button is-primary is-rounded">Ver perfil</a>
        </Link>
      </div>
    </div>
  </div>
);

const list = () => (
  <Query query={listQuery}>
    {({ loading, data }) => {
      if (loading) {
        return <Loading />;
      }

      return data && data.list ? (
        <section className="section">
          <div className="content">
            <h1 className="title">
              ¡Los 5 usuarios de Te Vi Colombia más apoyados!
            </h1>
          </div>

          <div className="columns is-multiline">
            {data.list.user.map((value, i) => (
              <div className="column is-6" key={i}>
                <CardList value={value} />
              </div>
            ))}
          </div>

          <div className="content">
            <h1 className="title">
              ¡Las 5 empresas de Te Vi Colombia más apoyadas!
            </h1>
          </div>
          <div className="columns is-multiline">
            {data.list.business.map((value, i) => (
              <div className="column is-6" key={i}>
                <CardList value={value} />
              </div>
            ))}
          </div>
        </section>
      ) : null;
    }}
  </Query>
);

export default list;
