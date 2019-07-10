'use strict';
require('dotenv').config({silent: true});
const stripe = require("stripe")(process.env.STRIPE_SKEY);

exports.handler = async (event) => {
  try {
    const {
      context,
      "body-json" : {
        id,
        email
      }
    } = event;
    if (context['http-method'] === 'POST'){
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
    } else {
      return {
        statusCode: 401,
        statusDescription: 'Unauthorized',
        body: `Cannot perform method: ${context['http-method']}`
      };
    }
  }
  catch(err){
    return {
      statusCode: 401,
      statusDescription: 'Unauthorized',
      body: `Cannot make the request: ${err.message}`
    };
  }
};