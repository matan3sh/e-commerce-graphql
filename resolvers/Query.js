const { reviews } = require("../db");

exports.Query = {
  products: (parent, { filter }, { products }) => {
    let filteredProducts = products;

    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale) {
        filteredProducts = filteredProducts.filter((product) => product.onSale);
      }

      /* Calc ta average rating */
      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0;
          let numberOfReviews = 0;
          reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              numberOfReviews++;
            }
          });
          const avgProductRating = sumRating / numberOfReviews;
          return avgProductRating >= avgRating;
        });
      }
    }

    return filteredProducts;
  },
  product: (parent, { id }, { products }) =>
    products.find((product) => product.id === id),
  categories: (parent, args, { categories }) => categories,
  category: (parent, { id }, { categories }) =>
    categories.find((category) => category.id === id),
};
