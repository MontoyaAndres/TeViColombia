import { gql } from "apollo-boost";

const information = gql`
  query Information($id: ID!) {
    information(id: $id) {
      routePhoto
      routeCover
      name
      lastname
      description
      identificationDocumentType
      identificationDocument
      address
      telephone
      website
      email
      gender
      city
      departament
      civilStatus
      socialnetwork {
        name
        url
      }
      language {
        language
        level
      }
      university {
        place
        startedOn
        finishIn
        finished
        especializations
        attended
        description
      }
      secondaryschool {
        place
        startedOn
        finishIn
        finished
        description
      }
      work {
        place
        job
        localization
        description
        startedOn
        finishIn
        finished
      }
      cv {
        routeCV
      }
    }
  }
`;

export default information;
