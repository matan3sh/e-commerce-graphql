const { categories } = require("../db");

exports.Product = {
  category: ({ categoryId }, args, context) =>
    categories.find((category) => category.id === categoryId),
};
