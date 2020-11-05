const { findDOMNode } = require('react-dom');
const db = require('../modules/shopModel');

const shopControllers = {};

// This will pull the price from database when user types in food
shopControllers.getPrice = async (req, res, next) => {
  // We'll be getting our search parameters off of req.body once everything is put together. For now,
  // we're using these as placeholders
  const { food } = req.query;
  // Note: The bling operator ($) is used to pass in variables for our parameterized query, which are defined in our
  // values array.
  const values = [food];
  const productIdQueryString = 'SELECT product_id FROM products WHERE product_name = $1;';
  // get the product id from the database
  const productInfo = await db.query(productIdQueryString, values);
  // save productID
  const productId = productInfo.rows[0].product_id;
  // With that product id, 
  // get all the prices for that food item from all the stores
  const priceQueryString = `SELECT stores.store_name AS store, stock.price AS price FROM stores JOIN stock ON stores.store_id = stock.store_id WHERE product_id = ${productId};`;
  const prices = await db.query(priceQueryString);
  // save all the returned price into res.locals (to pass to next middleware)
  res.locals.prices = prices.rows;
  // move onto next middleware
  return next();
};

module.exports = shopControllers;
