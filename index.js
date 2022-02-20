const { ApolloServer, gql } = require("apollo-server");

const { products, categories } = require("./data");

const typeDefs = gql`
  type Query {
    products: [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    image: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
  }

  type Category {
    id: ID!
    name: String!
    products: [Product!]!
  }
`;

const resolvers = {
  Query: {
    products: () => products,
    product: (parent, { id }, context) =>
      products.find((product) => product.id === id),
    categories: () => categories,
    category: (parent, { id }, context) =>
      categories.find((category) => category.id === id),
  },

  Category: {
    products: ({ id }, args, context) =>
      products.filter((product) => product.categoryId === id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log("Server is ready at " + url));
