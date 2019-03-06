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
        job
        departament
        sector
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
        currency
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

const informationBusinessQuery = gql`
  query InformationBusinessQuery($id: ID!) {
    informationBusiness(id: $id) {
      routePhoto
      routeCover
      name
      description
      address
      telephoneCountry
      telephone
      telephone2Country
      telephone2
      departament
      town
      nationality
      sector
      website
      googleMapsLocalization
      optionalEmail
      socialnetwork {
        name
        url
      }
    }
  }
`;

const feedbackQuery = gql`
  query FeedbackQuery($id: ID!) {
    feedback(id: $id) {
      response {
        id
        stars
        comment
        from {
          id
          name
          lastname
          routePhoto
          type
        }
      }
      count
    }
  }
`;

const necessityQuery = gql`
  query NecessityQuery($userId: ID!) {
    necessity(userId: $userId) {
      response {
        id
        finished
        comment
      }
      count
    }
  }
`;

const portfolioQuery = gql`
  query PortfolioQuery($id: ID!) {
    portfolio(id: $id) {
      id
      multimedia
      description
    }
  }
`;

export {
  informationQuery,
  informationBusinessQuery,
  feedbackQuery,
  necessityQuery,
  portfolioQuery
};
