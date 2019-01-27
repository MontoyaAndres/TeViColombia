import { gql } from "apollo-boost";

const informationQuery = gql`
  query InformationQuery($id: ID!) {
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
      departament
      city
      nationality
      civilStatus
      linkedin
      skype
      website
      gender
      email
      skills
      language {
        id
        language
        level
      }
      study {
        id
        place
        level
        area
        startedOn
        finishIn
      }
      work {
        id
        company
        departament
        sector
        job
        area
        goals
        startedOn
        finishIn
      }
      cv {
        id
        routeCV
      }
    }
  }
`;

const feedbackQuery = gql`
  query FeedbackQuery($userId: ID!) {
    feedback(userId: $userId) {
      id
      stars
      comment
      user {
        id
        name
        lastname
        routePhoto
      }
    }
  }
`;

const necessityQuery = gql`
  query NecessityQuery($userId: ID!) {
    necessity(userId: $userId) {
      id
      finished
      comment
    }
  }
`;

export { informationQuery, feedbackQuery, necessityQuery };
