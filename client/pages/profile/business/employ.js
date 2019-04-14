import React, { useState, memo } from "react";
import { graphql, compose } from "react-apollo";
import Router, { withRouter } from "next/router";
import gql from "graphql-tag";
import Error from "next/error";
import { SimpleImg } from "react-simple-img";
import Link from "next/link";

import { employQuery } from "../../../graphql/queries/account";
import Loading from "../../../components/shared/loading";
import meQuery from "../../../graphql/queries/me";

const informationBusinessQuery = gql`
  query InformationBusinessQuery($id: ID!) {
    informationBusiness(id: $id) {
      id
      routePhoto
      name
      description
      telephoneCountry
      telephone
      sector
      website
      email
      optionalEmail
    }
  }
`;

const applyEmployMutation = gql`
  mutation ApplyEmployMutation(
    $userId: ID!
    $userName: String!
    $userLastname: String!
    $email: String!
    $position: String!
  ) {
    applyEmploy(
      userId: $userId
      userName: $userName
      userLastname: $userLastname
      email: $email
      position: $position
    )
  }
`;

const employ = ({
  router: {
    query: { id }
  },
  loadingInformationBusiness,
  loadingMe,
  loadingEmploy,
  dataInformationBusiness,
  dataMe,
  dataEmploy,
  APPLY_EMPLOY_MUTATION
}) => {
  const [apply, setApply] = useState(false);

  if (loadingInformationBusiness || loadingEmploy || loadingMe) {
    return <Loading />;
  }

  if (!dataInformationBusiness || !dataEmploy) {
    return <Error statusCode={404} />;
  }

  async function handleApplyEmployMutation() {
    if (dataMe) {
      if (dataMe.type === "User") {
        const { data } = await APPLY_EMPLOY_MUTATION({
          variables: {
            userId: dataMe.id,
            userName: dataMe.name,
            userLastname: dataMe.lastname,
            email: dataInformationBusiness.email,
            position: dataEmploy.position
          }
        });

        if (data.applyEmploy) {
          setApply(!apply);
        }
      }
    } else {
      Router.push("/login");
    }
  }

  return (
    <div className="hero">
      <div className="hero-body">
        <div className="employ-media">
          <div className="media">
            <div className="media-left">
              <SimpleImg
                applyAspectRatio={false}
                src={dataInformationBusiness.routePhoto}
                height={54}
                width={58}
                alt="profile"
              />
            </div>

            <div className="media-content">
              <div className="content">
                <Link
                  href={{
                    pathname: "/profile/business",
                    query: { id: dataInformationBusiness.id }
                  }}
                >
                  <a>
                    <h2 className="title is-2">
                      {dataInformationBusiness.name}
                    </h2>
                  </a>
                </Link>
                <p className="subtitle">
                  {dataInformationBusiness.description}
                </p>
                <p className="subtitle">
                  <strong>Sector:</strong> {dataInformationBusiness.sector}
                </p>
                <p className="subtitle">
                  <strong>Teléfono celular/fijo: </strong>
                  <a
                    href={`tel:+${dataInformationBusiness.telephoneCountry} ${
                      dataInformationBusiness.telephone
                    }`}
                  >
                    {`+${dataInformationBusiness.telephoneCountry} ${
                      dataInformationBusiness.telephone
                    }`}
                  </a>
                </p>
                <p className="subtitle">
                  <strong>Correo electrónico: </strong>
                  <a href={`mailto:${dataInformationBusiness.email}`}>
                    {dataInformationBusiness.email}
                  </a>
                </p>
                <p className="subtitle">
                  <strong>Correo electrónico sec: </strong>
                  <a href={`mailto:${dataInformationBusiness.optionalEmail}`}>
                    {dataInformationBusiness.optionalEmail}
                  </a>
                </p>
                <p className="subtitle">
                  <strong>Sitio web: </strong>
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={dataInformationBusiness.website}
                  >
                    {dataInformationBusiness.website}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="media">
            <div className="media-content">
              <div className="content">
                <h3 className="title">{dataEmploy.position}</h3>
                <p className="subtitle">{dataEmploy.description}</p>
                <p className="subtitle">
                  <strong>Area: </strong>
                  {dataEmploy.area}
                </p>
                <p className="subtitle">
                  <strong>Habilidades requeridas: </strong>
                  <br />
                  {dataEmploy.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="tag is-info is-large"
                      style={{ margin: 5 }}
                    >
                      {skill}
                    </span>
                  ))}
                </p>
                <p className="subtitle">
                  <strong>Educación mínima: </strong>
                  {dataEmploy.minStudy}
                </p>
                <p className="subtitle">
                  <strong>Años de experiencia: </strong>
                  {dataEmploy.minExperience}
                </p>
                <p className="subtitle">
                  <strong>Idiomas: </strong>
                  <br />
                  {dataEmploy.language.map((language, i) => (
                    <span
                      key={i}
                      className="tag is-info is-large"
                      style={{ margin: 5 }}
                    >
                      {language}
                    </span>
                  ))}
                </p>
                <p className="subtitle">
                  <strong>Disponibilidad de viajar: </strong>
                  {dataEmploy.travel}
                </p>
                <p className="subtitle">
                  <strong>Disponibilidad de cambio de residencia: </strong>
                  {dataEmploy.residence}
                </p>
                <p className="subtitle">
                  <strong>Localización: </strong>
                  {dataEmploy.town} - {dataEmploy.departament} -{" "}
                  {dataEmploy.country}
                </p>
                <p className="subtitle">
                  <strong>Jornada: </strong>
                  {dataEmploy.time}
                </p>
                <p className="subtitle">
                  <strong>Tipo de contrato: </strong>
                  {dataEmploy.contract}
                </p>
                <p className="subtitle">
                  <strong>Moneda: </strong>
                  {dataEmploy.currency}
                </p>
                <p className="subtitle">
                  <strong>Salario mínimo: </strong>
                  {dataEmploy.minSalary}
                </p>
                <p className="subtitle">
                  <strong>Salario maximo: </strong>
                  {dataEmploy.maxSalary}
                </p>
              </div>
            </div>
          </div>

          {dataMe && dataMe.id !== id ? (
            apply ? (
              <div
                className="notification is-primary"
                style={{ margin: "1rem" }}
              >
                <button
                  type="button"
                  className="delete"
                  onClick={() => setApply(!apply)}
                />
                <p className="subtitle" style={{ textAlign: "center" }}>
                  El correo ha sido enviado con exito!
                </p>
              </div>
            ) : (
              <>
                <div
                  className="notification is-info"
                  style={{ margin: "1rem" }}
                >
                  <p className="subtitle" style={{ textAlign: "center" }}>
                    Dando clic en{" "}
                    <span style={{ fontWeight: "bold" }}>Aplicar</span>, se
                    enviará un correo a{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {dataInformationBusiness.email}
                    </span>{" "}
                    con la URL de tu perfil.
                  </p>
                </div>

                <div className="buttons has-addons is-centered">
                  <button
                    type="button"
                    className="button is-block is-primary is-large"
                    style={{ width: 200 }}
                    onClick={handleApplyEmployMutation}
                  >
                    Aplicar
                  </button>
                </div>
              </>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default compose(
  withRouter,
  graphql(meQuery, {
    props: ({ data }) => ({
      loadingMe: data.loading,
      dataMe: data.me
    })
  }),
  graphql(informationBusinessQuery, {
    options: ({
      router: {
        query: { id }
      }
    }) => ({ variables: { id } }),
    props: ({ data }) => ({
      loadingInformationBusiness: data.loading,
      dataInformationBusiness: data.informationBusiness
    })
  }),
  graphql(employQuery, {
    options: ({
      router: {
        query: { employId }
      }
    }) => ({ variables: { employId } }),
    props: ({ data }) => ({
      loadingEmploy: data.loading,
      dataEmploy: data.employ
    })
  }),
  graphql(applyEmployMutation, { name: "APPLY_EMPLOY_MUTATION" })
)(memo(employ));
