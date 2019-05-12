/* Registramos os nossos alias para utilização na aplicação */
require("module-alias/register");

/* Importacao de dependencias */
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { errors } = require("celebrate");

/* Inicialização da aplicação express */
const app = express();

/* Importação de Middlewares */
const ErrorHandlingMiddleware = require("@middlewares/ErrorHandling");

/* Desabilitar headers etag e x-powered-by */
app.disable("etag").disable("etag");

/* Configuração Express */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Importacao conexao banco de dados */
require("./database");

/* Importação dos models */
require("./app/models");

/* Configurando para usar rotas */
app.use(require("./app/routes"));

/* Registramos o middleware de errors de validação Joi para a aplicação */
app.use(errors());

/* Implementação de Middlewares de erros da aplicação */
app.use(ErrorHandlingMiddleware.error);

var server = app.listen(process.env.PORT || 3000, function() {
  console.log("Escutando na porta " + server.address().port);
});
