import gql from "graphql-tag";

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
      town
      nationality
      birth
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
        name
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

const countNecessityQuery = gql`
  query CountNecessityQuery($userId: ID!) {
    countNecessity(userId: $userId)
  }
`;

export { informationQuery, feedbackQuery, necessityQuery, countNecessityQuery };
