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
        studyingOn
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
        workingOn
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
      member {
        id
        name
        lastname
        email
        routePhoto
      }
      cv {
        id
        filename
        routeCV
        cloudinaryPublicIdRouteCV
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
      email
      optionalEmail
      googleMapsLocalization
      skills
      socialnetwork {
        name
        url
      }
      member {
        id
        name
        lastname
        email
        routePhoto
      }
    }
  }
`;

const feedbackQuery = gql`
  query FeedbackQuery($id: ID!, $limit: Int) {
    feedback(id: $id, limit: $limit) {
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
  query NecessityQuery($userId: ID!, $limit: Int) {
    necessity(userId: $userId, limit: $limit) {
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
  query PortfolioQuery($id: ID!, $limit: Int) {
    portfolio(id: $id, limit: $limit) {
      id
      multimedia {
        public_id
        secure_url
      }
      description
    }
  }
`;

const employsQuery = gql`
  query EmploysQuery($businessId: ID!, $limit: Int) {
    employs(businessId: $businessId, limit: $limit) {
      id
      position
      country
      departament
      town
      contract
    }
  }
`;

const employQuery = gql`
  query EmployQuery($employId: ID!) {
    employ(employId: $employId) {
      id
      position
      description
      area
      skills
      minStudy
      minExperience
      language
      travel
      residence
      country
      departament
      town
      time
      contract
      minSalary
      maxSalary
      currency
    }
  }
`;

export {
  informationQuery,
  informationBusinessQuery,
  feedbackQuery,
  necessityQuery,
  portfolioQuery,
  employsQuery,
  employQuery
};
