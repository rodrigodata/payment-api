/* Registramos os nossos alias para utilização na aplicação */
require("module-alias/register");

/* Import Dependencies */
const express = require("express");
const cors = require("cors");
const { urlencoded, json } = require("body-parser");
const { errors } = require("celebrate");

/* Express init */
const app = express();

/* Import Middlewares */
const ErrorHandlingMiddleware = require("@middlewares/ErrorHandling");

/* Disable headers etag and x-powered-by. { SECURITY & PERFORMANCE } */
app.disable("etag").disable("etag");

/* Express configuration */
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

/* Database configuration */
require("./database");

/* Import Models */
require("./app/models");

/* Routes configuration */
app.use(require("./app/routes"));

/* Register middleware for Joi validation */
app.use(errors());

/* Middleware to custom error handling */
app.use(ErrorHandlingMiddleware.error);

/* Bootstrap application */
var server = app.listen(process.env.PORT || 3000, function() {
  console.log("Escutando na porta " + server.address().port);
});

module.exports = app;
