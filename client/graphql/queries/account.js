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
      telephoneCountry
      telephone
      telephone2Country
      telephone2
      departament
      town
      nationality
      birth
      civilStatus
      website
      gender
      disability
      optionalEmail
      email
      skills
      socialnetwork {
        name
        url
      }
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
      preferwork {
        id
        currentSituation
        job
        area
        salary
        departament
        travel
        residence
      }
      cv {
        id
        routeCV
        filename
      }
    }
  }
`;

const feedbackQuery = gql`
  query FeedbackQuery($id: ID!, $type: String!) {
    feedback(id: $id, type: $type) {
      id
      stars
      comment
      from {
        id
        name
        lastname
        routePhoto
      }
    }
  }
`;

const countFeedbackStarsQuery = gql`
  query CountFeedbackStarsQuery($id: ID!, $type: String!) {
    countFeedbackStars(id: $id, type: $type)
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

const portfolioQuery = gql`
  query PortfolioQuery($id: ID!, $type: String!) {
    portfolio(id: $id, type: $type) {
      id
      multimedia
      description
    }
  }
`;

export {
  informationQuery,
  feedbackQuery,
  countFeedbackStarsQuery,
  necessityQuery,
  countNecessityQuery,
  portfolioQuery
};
