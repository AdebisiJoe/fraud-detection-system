import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Transaction {
    id: ID!
    amount: Float!
    timestamp: String!
    userId: String!
  }

  type User {
    id: ID!
    name: String!
  }

  type FraudPattern {
    id: ID!
    name: String!
    criteria: String!
  }

  type Query {
    transactions: [Transaction]
    users: [User]
    fraudPatterns: [FraudPattern]
    detectFraud: [Transaction]
  }

  type Mutation {
    createTransaction(amount: Float!, timestamp: String!, userId: String!): Transaction
    createUser(name: String!): User
    createFraudPattern(name: String!, criteria: String!): FraudPattern
    linkTransactionToFraud(transactionId: ID!, fraudPatternId: ID!): Transaction
  }
`);

export default schema;
