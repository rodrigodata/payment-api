/* Registramos os nossos alias para utilização na aplicação */
require("module-alias/register");

/* Import Dependencies */
const express = require("express");
const compression = require("compression");
const cluster = require("cluster");
const cors = require("cors");
const { urlencoded, json } = require("body-parser");
const { errors } = require("celebrate");

/* */
if (cluster.isMaster) {
  const cpus = require("os").cpus();
  cpus.forEach(function() {
    cluster.fork();
  });

  // Workers will emit an 'online' event when they spawn
  cluster.on("online", function(worker) {
    console.log(
      "Worker " +
        worker.id +
        " is here to chew bubblegum and scale node applications."
    );
  });

  // Workers will emit an 'exit' event when they exit
  cluster.on("exit", function(worker, code, signal) {
    console.log(
      "Worker " + worker.id + " died with code " + code + ". RIP in peace."
    );
    // You can maintain a constant number of workers by forking when a worker exits
    cluster.fork();
  });
} else {
  /* Express init */
  const app = express();

  /* */
  app.use(compression());

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
