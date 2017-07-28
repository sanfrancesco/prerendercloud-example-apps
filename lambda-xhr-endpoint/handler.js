"use strict";

module.exports.ajax1 = (event, context, callback) => {
  setTimeout(() => {
    callback(null, { statusCode: 200, body: "ajax-response-1" });
  }, 100);
};
module.exports.ajax2 = (event, context, callback) => {
  setTimeout(() => {
    callback(null, { statusCode: 200, body: "ajax-response-2" });
  }, 100);
};
