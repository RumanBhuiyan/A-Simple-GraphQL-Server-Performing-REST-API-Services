//Very Simple Graphql Server of mine Alternative to REST API
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { schema } = require("./schema/schema");
const { resolvers } = require("./resolvers/resolvers");

//It creates a new database named GraphqlDB and get connected to it
mongoose.connect("mongodb://localhost:27017/GraphqlDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log("Server is listening at localhost:4000/graphql");
});
