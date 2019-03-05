import React from "react";
import { Form, withFormik, Field } from "formik";
import { withRouter } from "next/router";
import Error from "next/error";
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";
import omit from "lodash.omit";

import Loading from "../../components/shared/loading";
import checkLoggedIn from "../../lib/checkLoggedIn";
import redirect from "../../lib/redirect";
import { informationQuery } from "../../graphql/queries/account";
import UploadRoutePhoto from "../../components/profile/edit/uploadRoutePhoto";
import UploadRouteCover from "../../components/profile/edit/uploadRouteCover";
import EditGeneralInformation from "../../components/profile/edit/editGeneralInformation";
import EditLanguage from "../../components/profile/edit/editLanguage";
import EditStudy from "../../components/profile/edit/editStudy";
import EditWork from "../../components/profile/edit/editWork";
import EditCV from "../../components/profile/edit/editCV";
import EditSocialNetwork from "../../components/profile/edit/editSocialNetwork";
import EditPreferWork from "../../components/profile/edit/editPreferWork";
import TownsByDepartament from "../../utils/townsByDepartament";
import { GeneralInformationValidation } from "../../utils/validation";
import normalizeErrors from "../../utils/normalizeErrors";

const generalInformationMutation = gql`
  mutation GeneralInformationMutation(
    $id: ID!
    $information: GeneralInformationInput
  ) {
    generalInformation(id: $id, information: $information) {
      path
      message
    }
  }
`;

class edit extends React.PureComponent {
  UNSAFE_componentWillReceiveProps({ values }) {
    // If the select `departament` changes of "Extranjero" and `town` is empty.
    if (!values.town && values.departament !== "Extranjero") {
      values.town = Object.values(TownsByDepartament[values.departament])[0];
    }

    // If the user is foreigner, he shouldn't has a town.
    if (
      values.nationality !== "Colombia" ||
      values.departament === "Extranjero"
    ) {
      values.town = "";
    }
  }

  render() {
    const { loading, data, setFieldValue, values, isSubmitting } = this.props;

    if (loading) {
      return <Loading />;
    }

    if (!data.information) {
      return <Error statusCode={404} />;
    }

    return (
      <Form method="POST">
        <Field name="routeCover" component={UploadRouteCover} />
        <Field name="routePhoto" component={UploadRoutePhoto} />

        <div id="edited" className="container">
          {/* User edited successfully */}
          {values.edited && (
            <div className="animated bounceIn notification is-primary">
              <button
                type="button"
                className="delete"
                onClick={() => setFieldValue("edited", false, false)}
              />
              <p className="subtitle">
                Los cambios se han realizado con exito.
              </p>
            </div>
          )}
          <EditGeneralInformation
            departament={values.departament}
            nationality={values.nationality}
            skills={values.skills}
            setFieldValue={setFieldValue}
          />
          <EditSocialNetwork
            socialnetwork={values.socialnetwork}
            setFieldValue={setFieldValue}
          />
          <EditLanguage language={values.language} />
          <EditStudy study={values.study} />
          <EditWork work={values.work} />
          <EditPreferWork setFieldValue={setFieldValue} />
          <Field name="cv" component={EditCV} />

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
  }
}

edit.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);

  if (!loggedInUser.me) {
    redirect(context, "/login");
  }

  // Users with differents ids cannot edit information.
  if (loggedInUser.me.id !== context.req.params.id) {
    redirect(context, "/");
  }

  return {};
};

export default compose(
  withRouter,
  graphql(informationQuery, {
    options: ({
      router: {
        query: { id }
      }
    }) => ({ variables: { id } })
  }),
  graphql(generalInformationMutation),
  withFormik({
    mapPropsToValues: ({ data }) => ({
      routePhoto: data.information.routePhoto || "",
      routeCover: data.information.routeCover || "",
      name: data.information.name,
      lastname: data.information.lastname,
      description: data.information.description || "",
      identificationDocumentType: data.information.identificationDocumentType,
      identificationDocument: data.information.identificationDocument,
      address: data.information.address || "",
      telephoneCountry: data.information.telephoneCountry || 57,
      telephone: data.information.telephone,
      telephone2Country: data.information.telephone2Country || 57,
      telephone2: data.information.telephone2 || 0,
      nationality: data.information.nationality || "Colombia",
      departament: data.information.departament || "Bogotá, D.C.",
      town: data.information.town || "",
      civilStatus: data.information.civilStatus || "SOLTERO(A)",
      website: data.information.website || "",
      gender: data.information.gender || "HOMBRE",
      disability: data.information.disability || "No",
      optionalEmail: data.information.optionalEmail || "",
      skills: data.information.skills || [],
      socialnetwork: data.information.socialnetwork || [],
      language: data.information.language || [],
      study: data.information.study || [],
      work: data.information.work || [],
      preferWork: data.information.preferwork || {
        currentSituation: "No tengo empleo",
        job: "",
        area: ["Administración / Oficina"],
        salary: "",
        currency: "Modena local",
        departament: ["Bogotá, D.C."],
        travel: "No",
        residence: "No"
      },
      cv: data.information.cv || []
    }),
    validationSchema: GeneralInformationValidation,
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
      await values.study.forEach(study => {
        if (
          study.level === "EDUCACIÓN BÁSICA PRIMARIA" ||
          study.level === "EDUCACIÓN BÁSICA SECUNDARIA" ||
          study.level === "BACHILLERATO / EDUCACIÓN MEDIA"
        ) {
          study.area = null;
        }
      });

      // Omitting all about `edited`, `studyingOn`, `workingOn` because the database does not need to save them.
      const valuesOmitted = await omit(
        {
          ...values,
          telephoneCountry: Number(values.telephoneCountry),
          telephone2Country: Number(values.telephone2Country),
          study: values.study.map(item => omit(item, ["studyingOn"])),
          work: values.work.map(item => omit(item, ["workingOn"]))
        },
        ["edited", "studyingOn", "workingOn"]
      );

      const { data } = await mutate({
        variables: {
          id,
          information: valuesOmitted
        },
        refetchQueries: [{ query: informationQuery, variables: { id } }]
      });

      // if generalInformation has data, it has the errors
      if (data.generalInformation && data.generalInformation.length) {
        setSubmitting(false);
        setFieldValue("edited", false, false);
        setErrors(normalizeErrors(data.generalInformation));
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
