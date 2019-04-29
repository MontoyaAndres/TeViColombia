import React from "react";
import dynamic from "next/dynamic";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { SimpleImg } from "react-simple-img";
import Link from "next/link";

import Loading from "../shared/loading";

const DynamicCarousel = dynamic(() => import("../shared/carousel"), {
  ssr: false
});

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

const CardList = ({ value, type }) => (
  <div className="card">
    <div className="card-content">
      <div className="media">
        <div className="media-left">
          <figure className="image is-48x48">
            <SimpleImg
              applyAspectRatio={false}
              src={value.routePhoto}
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
            pathname: type === "user" ? "/profile/user" : "/profile/business",
            query: { id: value.id }
          }}
        >
          <a className="button is-primary is-rounded">Ver perfil</a>
        </Link>
      </div>
    </div>
  </div>
);

const list = () => (
  <Query query={listQuery} fetchPolicy="cache-and-network">
    {({ loading, data }) => {
      if (loading) {
        return <Loading />;
      }

      return data && data.list ? (
        <section className="section">
          <style jsx>{`
            .card-file {
              width: 500px;
              padding: 0 20px;
            }
          `}</style>

          <div className="content">
            <h1 className="title">¡Los 10 usuarios más apoyados!</h1>
          </div>
          <DynamicCarousel cellSelector=".card-file">
            {data.list.user.map((value, i) => (
              <div className="card-file" key={i}>
                <CardList value={value} type="user" />
              </div>
            ))}
          </DynamicCarousel>

          <br />
          <br />

          <div className="content">
            <h1 className="title">¡Las 10 empresas más apoyadas!</h1>
          </div>
          <DynamicCarousel cellSelector=".card-file">
            {data.list.business.map((value, i) => (
              <div className="card-file" key={i}>
                <CardList value={value} type="business" />
              </div>
            ))}
          </DynamicCarousel>
        </section>
      ) : null;
    }}
  </Query>
);

export default list;
