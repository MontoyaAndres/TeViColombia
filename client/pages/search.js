import React, { useEffect, useState, memo } from "react";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import gql from "graphql-tag";
import { withFormik } from "formik";
import { compose, graphql } from "react-apollo";

import Loading from "../components/shared/loading";
import TownsByDepartament from "../utils/townsByDepartament";
import SearchList from "../components/search/searchList";

const DynamicSearch = dynamic(
  () => import("../components/search/searchTextField"),
  {
    loading: () => <Loading />,
    ssr: false
  }
);
const DynamicModal = dynamic(() => import("../components/search/modal"), {
  loading: () => <Loading />,
  ssr: false
});

const searchQuery = gql`
  query SearchQuery(
    $value: String!
    $type: TypeEnum!
    $params: ParamsInput!
    $limit: Int
  ) {
    search(value: $value, type: $type, params: $params, limit: $limit) {
      __typename

      ... on UserSearchResponse {
        id
        name
        lastname
        email
        routePhoto
        necessity {
          comment
        }
      }

      ... on BusinessSearchResponse {
        id
        name
        email
        routePhoto
        employ {
          id
          position
        }
      }
    }
  }
`;

const search = ({ values, loading, data }) => {
  // this is the typical state that the query always has.
  const state = {
    value: values.value,
    type: values.type === "Empresa" ? "Business" : "User",
    params: {
      user: {
        nationality: values.nationality,
        departament: values.departament,
        town: values.town,
        necessity: values.necessity === "Sí"
      },
      business: {
        nationality: values.nationality,
        departament: values.departament,
        town: values.town,
        sector: values.sector,
        area: values.area,
        employ: values.employ === "Sí"
      }
    }
  };

  const [hasMoreItems, setHasMoreItems] = useState(true);

  useEffect(() => {
    // When the `departament` value changes, reseting the `town` value.
    if (values.departament !== "Extranjero") {
      values.town = Object.values(TownsByDepartament[values.departament])[0];
    }
  }, [values.departament]);

  useEffect(() => {
    // If the employ is foreign, it shouldn't has a town.
    if (
      values.nationality !== "Colombia" ||
      values.departament === "Extranjero"
    ) {
      values.town = "";
    }

    if (values.nationality !== "Colombia") {
      values.departament = "Extranjero";
    }
  }, [values.nationality, values.departament]);

  useEffect(() => {
    if (data.search && data.search.length < 10) {
      setHasMoreItems(false);
    }

    return () => {
      if (data.search && data.search.length >= 10) {
        setHasMoreItems(true);
      }
    };
  }, [data.search]);

  function handleLoadMore() {
    data.fetchMore({
      variables: { ...state, limit: data.search.length },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        if (fetchMoreResult.search.length < 10) {
          setHasMoreItems(false);
        }

        return Object.assign({}, prev, {
          search: [...prev.search, ...fetchMoreResult.search]
        });
      }
    });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="columns is-multiline">
        <div className="column is-4">
          <DynamicModal values={values} />
        </div>
        <div className="column is-8">
          <form>
            <DynamicSearch
              name="value"
              placeholder="Ingresa cualquier valor"
              handleSubmit={() => data.refetch(state)}
            />
          </form>

          {data.networkStatus === 2 || data.networkStatus === 3 ? (
            <Loading />
          ) : !data.search ? (
            <h2
              className="subtitle is-3"
              style={{ textAlign: "center", padding: 20 }}
            >
              No se han encontrado resultados.
            </h2>
          ) : (
            data.search.map((value, i) => (
              <div key={i} style={{ marginBottom: "1.1rem" }}>
                <SearchList
                  value={value}
                  type={values.type === "Empresa" ? "Business" : "User"}
                  hasMoreItems={hasMoreItems}
                  setHasMoreItems={setHasMoreItems}
                  handleLoadMore={handleLoadMore}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default compose(
  withRouter,
  graphql(searchQuery, {
    options: ({ router: { query } }) => ({
      variables: {
        value: query.value ? query.value : "",
        type: "Business",
        params: {
          business: {
            nationality: "Colombia",
            departament: "Bogotá, D.C.",
            town: "Bogotá, D.C.",
            sector: "Agricultura / Pesca / Ganadería",
            area: "Administración / Oficina",
            employ: false
          }
        }
      },
      fetchPolicy: "cache-and-network"
    })
  }),
  withFormik({
    mapPropsToValues: ({ router: { query } }) => ({
      value: query.value ? query.value : "",
      type: "Empresa",
      nationality: "Colombia",
      departament: "Bogotá, D.C.",
      town: "Bogotá, D.C.",
      necessity: "No",
      sector: "Agricultura / Pesca / Ganadería",
      area: "Administración / Oficina",
      employ: "No"
    })
  })
)(memo(search));
