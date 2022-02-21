const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema");

const { Query } = require("./resolvers/Query");
const { Product } = require("./resolvers/Product");
const { Category } = require("./resolvers/Category");

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Category,
    Product,
  },
});

server.listen().then(({ url }) => console.log("Server is ready at " + url));
