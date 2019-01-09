import React from "react";
import { Formik, Form } from "formik";
import { withRouter } from "next/router";
import Error from "next/error";
import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import Loading from "../../components/shared/loading";
import checkLoggedIn from "../../lib/checkLoggedIn";
import redirect from "../../lib/redirect";
import { information } from "../../graphql/queries/information";
import { TextField } from "../../components/shared/globalField";
import UploadRoutePhoto from "../../components/profile/edit/uploadRoutePhoto";
import UploadRouteCover from "../../components/profile/edit/uploadRouteCover";

const updategeneralInformation = gql`
  mutation generalInformation($id: ID!, $information: GeneralInformationInput) {
    generalInformation(id: $id, information: $information) {
      path
      message
    }
  }
`;

const edit = ({
  router: {
    query: { id }
  }
}) => (
  <Query query={information} variables={{ id }}>
    {({ loading, data }) => {
      if (loading) {
        return <Loading />;
      }

      if (!data.information) {
        return <Error statusCode={404} />;
      }

      return (
        <Mutation mutation={updategeneralInformation}>
          {mutate => (
            <Formik
              initialValues={{
                routePhoto: "",
                routeCover: "",
                name: data.information.name,
                lastname: data.information.lastname
              }}
              onSubmit={async values => {
                const response = await mutate({
                  variables: {
                    id,
                    information: values
                  }
                });
                console.log(response);
              }}
              render={({ isSubmitting, setFieldValue }) => (
                <Form method="POST">
                  <UploadRouteCover data={data} setFieldValue={setFieldValue} />

                  <UploadRoutePhoto data={data} setFieldValue={setFieldValue} />

                  <div className="container">
                    <div className="columns">
                      <div className="column" style={{ padding: "0 .75rem" }}>
                        <TextField
                          type="text"
                          name="name"
                          placeholder="Nombre de usuario"
                          isRequired
                        />
                      </div>
                      <div className="column" style={{ padding: "0 .75rem" }}>
                        <TextField
                          type="text"
                          name="lastname"
                          placeholder="Apellido de usuario"
                          isRequired
                        />
                      </div>
                    </div>

                    <div className="buttons has-addons is-centered">
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
              )}
            />
          )}
        </Mutation>
      );
    }}
  </Query>
);

edit.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);

  if (!loggedInUser.me) {
    redirect(context, "/login");
  }

  return {};
};

export default withRouter(edit);
