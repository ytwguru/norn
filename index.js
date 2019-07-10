'use strict';
require('dotenv').config({silent: true});
const stripe = require("stripe")(process.env.STRIPE_SKEY);

exports.handler = async (event) => {
  try {
    const {
      id,
      email
    } = event;
    try{
      const customer = await stripe.customers.create({
        email: email,
        source : id
      });
      return {
        statusCode: 200,
        body: JSON.stringify({success: customer.id})
      }
    } catch(err){
      return {
        statusCode: 401,
        statusDescription: 'Unauthorized',
        body: `Cannot create the customer ${err.message}`
      }
    }
  }
  catch(err){
    return {
      statusCode: 401,
      statusDescription: 'Unauthorized',
      body: `Cannot make the request: ${err.message}`,
      event
    };
  }
};