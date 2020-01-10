const { gql } = require("apollo-server");

const schema = gql`
  type Dps {
    timestamp: Int!
    value: Float!
  }

  type Traffic {
    total: Int!
    dps: [Dps]
  }

  type REVIEWCOUNT {
    percentage: Int!
  }

  type Distribution {
    x: String!
    percentage: Float!
  }

  type Message {
    title: String!
    description: String!
    color: String!
  }

  type Query {
    reviewCount: REVIEWCOUNT
    traffic: Traffic
    distribution: [Distribution]
    reviews: [Message]
  }

  type Mutation {
    reviewCount: REVIEWCOUNT
    traffic: Traffic
    distribution: [Distribution]
    reviews: [Message]
  }

  type Subscription {
    reviewCount: REVIEWCOUNT
    traffic: Traffic
    distribution: [Distribution]
    reviews: [Message]
  }

  type APIServer {
    logLevel: String!
    logText: String!
    createdAt: String!
  }

  type Competition {
    operatorName: String!
    percentage: Float!
  }
`;

module.exports = schema;
