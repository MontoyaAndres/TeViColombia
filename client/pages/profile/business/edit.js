import React, { useEffect } from "react";
import { Form, withFormik, Field } from "formik";
import dynamic from "next/dynamic";
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "next/router";
import Error from "next/error";
import omit from "lodash.omit";

import Loading from "../../../components/shared/loading";
import TownsByDepartament from "../../../utils/townsByDepartament";
import { informationBusinessQuery } from "../../../graphql/queries/account";
import meQuery from "../../../graphql/queries/me";
import checkLoggedIn from "../../../lib/checkLoggedIn";
import redirect from "../../../lib/redirect";
import EditGeneralInformation from "../../../components/business/edit/editGeneralInformation";
import { GeneralInformationBusinessValidation } from "../../../utils/validation";
import normalizeErrors from "../../../utils/normalizeErrors";

const DynamicUploadRouteCover = dynamic(
  () => import("../../../containers/edit/uploadRouteCover"),
  {
    loading: () => <Loading />,
    ssr: false
  }
);
const DynamicUploadRoutePhoto = dynamic(
  () => import("../../../containers/edit/uploadRoutePhoto"),
  {
    loading: () => <Loading />,
    ssr: false
  }
);
const DynamicEditMember = dynamic(
  () => import("../../../components/business/edit/editMember"),
  {
    loading: () => <Loading />,
    ssr: false
  }
);
const DynamicEditSocialNetwork = dynamic(
  () => import("../../../containers/edit/editSocialNetwork"),
  {
    loading: () => <Loading />,
    ssr: false
  }
);

const GeneralInformationBusinessMutation = gql`
  mutation GeneralInformationBusiness(
    $id: ID!
    $information: GeneralInformationBusinessInput
  ) {
    generalInformationBusiness(id: $id, information: $information) {
      path
      message
    }
  }
`;

const edit = ({
  loading,
  data,
  setFieldValue,
  values,
  handleSubmit,
  isSubmitting
}) => {
  useEffect(() => {
    // When the `departament` value changes, reseting the `town` value.
    if (values.departament !== "Extranjero") {
      values.town = Object.values(TownsByDepartament[values.departament])[0];
    }
  }, [values.departament]);

  useEffect(() => {
    // If the business is foreigner, it shouldn't has a town.
    if (
      values.nationality !== "Colombia" ||
      values.departament === "Extranjero"
    ) {
      values.town = "";
    }
  }, [values.nationality, values.departament]);

  if (loading) {
    return <Loading />;
  }

  if (!data.informationBusiness) {
    return <Error statusCode={404} />;
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <Field name="routeCover" component={DynamicUploadRouteCover} />
      <Field name="routePhoto" component={DynamicUploadRoutePhoto} />

      <div className="container">
        {/* Business updated successfully */}
        {values.edited && (
          <div
            id="edited"
            className="animated bounceIn notification is-primary"
            style={{ margin: 10 }}
          >
            <button
              type="button"
              className="delete"
              onClick={() => setFieldValue("edited", false, false)}
            />
            <p className="subtitle">Los cambios se han realizado con exito.</p>
          </div>
        )}

        <EditGeneralInformation
          departament={values.departament}
          nationality={values.nationality}
          skills={values.skills}
          setFieldValue={setFieldValue}
        />
        {/* TODO: Here should be the component editGoogleMapsLocalization. */}
        <DynamicEditMember
          values={values.memberUser}
          setFieldValue={setFieldValue}
        />
        <DynamicEditSocialNetwork
          socialnetwork={values.socialnetwork}
          setFieldValue={setFieldValue}
        />
        <div
          className="buttons has-addons is-centered"
          style={{ padding: "30px 0" }}
        >
          <button
            type="submit"
            disabled={isSubmitting}
            className={`button is-primary is-large ${
              isSubmitting ? "is-loading" : ""
            }`}
            style={{ width: 200 }}
          >
            Enviar
          </button>
        </div>
      </div>
    </Form>
  );
};

edit.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);

  if (!loggedInUser.me) {
    redirect(context, "/login");
  }

  if (context.req) {
    // Businesses with differents ids cannot edit information.
    if (loggedInUser.me.id !== context.req.params.id) {
      redirect(context, "/");
    }
  }

  return {};
};

export default compose(
  withRouter,
  graphql(informationBusinessQuery, {
    options: ({
      router: {
        query: { id }
      }
    }) => ({ variables: { id } })
  }),
  graphql(GeneralInformationBusinessMutation),
  withFormik({
    mapPropsToValues: ({ data }) => ({
      routePhoto: data.informationBusiness.routePhoto || "",
      routeCover: data.informationBusiness.routeCover || "",
      name: data.informationBusiness.name,
      description: data.informationBusiness.description || "",
      address: data.informationBusiness.address || "",
      telephoneCountry: data.informationBusiness.telephoneCountry || 57,
      telephone: data.informationBusiness.telephone,
      telephone2Country: data.informationBusiness.telephone2Country || 57,
      telephone2: data.informationBusiness.telephone2 || 0,
      nationality: data.informationBusiness.nationality || "Colombia",
      departament: data.informationBusiness.departament || "Bogotá, D.C.",
      town: data.informationBusiness.town || "",
      sector: data.informationBusiness.sector,
      website: data.informationBusiness.website || "",
      optionalEmail: data.informationBusiness.optionalEmail || "",
      googleMapsLocalization:
        data.informationBusiness.googleMapsLocalization || "",
      skills: data.informationBusiness.skills || [],
      socialnetwork: data.informationBusiness.socialnetwork || [],
      memberUser: data.informationBusiness.member || []
    }),
    validationSchema: GeneralInformationBusinessValidation,
    validateOnBlur: false,
    validateOnChange: false,
    handleSubmit: async (
      values,
      {
        props: {
          mutate,
          router: {
            query: { id }
          }
        },
        setSubmitting,
        setErrors,
        setFieldValue
      }
    ) => {
      // Omitting `edited` because the database does not need to save it.
      // And the `memberUser` value does not need the values `name`, `lastname`, `email` and `routePhoto`.
      const valuesOmitted = await omit(
        {
          ...values,
          telephoneCountry: Number(values.telephoneCountry),
          telephone2Country: Number(values.telephone2Country),
          memberUser: values.memberUser.map(item =>
            omit(item, ["name", "lastname", "email", "routePhoto"])
          )
        },
        ["edited"]
      );

      const { data } = await mutate({
        variables: {
          id,
          information: valuesOmitted
        },
        refetchQueries: [
          { query: informationBusinessQuery, variables: { id } },
          { query: meQuery }
        ]
      });

      // if generalInformationBusiness has data, it has the errors
      if (
        data.generalInformationBusiness &&
        data.generalInformationBusiness.length
      ) {
        setSubmitting(false);
        setFieldValue("edited", false, false);
        setErrors(normalizeErrors(data.generalInformationBusiness));
        document
          .querySelector(`[name="${data.generalInformationBusiness[0].path}"]`)
          .focus();
      } else {
        setSubmitting(false);
        setFieldValue("edited", true, false);
        window.scrollTo({
          top: document.getElementById("edited").offsetTop - 100,
          behavior: "smooth"
        });
      }
    }
  })
)(edit);
