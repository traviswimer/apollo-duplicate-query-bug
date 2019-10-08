const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');
const query = require('qs-middleware');
const app = express();
const port = 4000;

const typeDefs = gql`
  type Query {
    items(page: Int): [Item]
  }

  type Item {
    id: ID!
    title: String
  }
`;

const resolvers = {
  Query: {
    items: (_, {page = 0}) => {
      return [{id: page * 2 + 1}, {id: page * 2 + 2}];
    },
  },
};

const server = new ApolloServer({typeDefs, resolvers});
app.use(query());
const path = '/graphql';
server.applyMiddleware({app, path});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
