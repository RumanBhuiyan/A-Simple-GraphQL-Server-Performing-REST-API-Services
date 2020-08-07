const { gql } = require("apollo-server-express");

const schema = gql`
  type Query {
    student: [Student!]!
  }
  type Student {
    name: String!
    roll: String!
    cgpa: String!
  }
  type Mutation {
    createUser(name: String!, roll: String!, cgpa: String!): String!
    updateUser(roll: String!, cgpa: String!): String!
    deleteUser(name: String!): String!
  }
`;
module.exports.schema = schema;
