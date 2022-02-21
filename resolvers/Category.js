const { products } = require("../db");

exports.Category = {
  products: ({ id }, args, context) =>
    products.filter((product) => product.categoryId === id),
};
