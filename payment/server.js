/* Alias registering */
require("module-alias/register");

/* Import Dependencies */
const express = require("express");
const compression = require("compression");
const cluster = require("cluster");
const cors = require("cors");
const { urlencoded, json } = require("body-parser");
const { errors } = require("celebrate");
const helmet = require("helmet");

/* Clustering our express application */
if (cluster.isMaster) {
  const cpus = require("os").cpus();
  cpus.forEach(function() {
    cluster.fork();
  });

  // Workers will emit an 'online' event when they spawn
  cluster.on("online", function(worker) {
    console.info("Worker " + worker.id + " is online.");
  });

  // Workers will emit an 'exit' event when they exit
  cluster.on("exit", function(worker, code, signal) {
    console.info("Worker " + worker.id + " died with code " + code + ".");
    cluster.fork();
  });
} else {
  /* Express init */
  const app = express();

  app.use(compression());
  app.use(helmet());

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
}
