"use strict";

module.exports.ajax1 = (event, context, callback) => {
  setTimeout(() => {
    callback(null, {
      statusCode: 200,
      body: "ajax-response-1",
      headers: {
        "Access-Control-Allow-Origin": "*" // Required for CORS support to work
      }
    });
  }, 100);
};
module.exports.ajax2 = (event, context, callback) => {
  setTimeout(() => {
    callback(null, {
      statusCode: 200,
      body: "ajax-response-2",
      headers: {
        "Access-Control-Allow-Origin": "*" // Required for CORS support to work
      }
    });
  }, 100);
};
