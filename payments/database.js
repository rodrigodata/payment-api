/* Importação de dependencias */
const Mongoose = require("mongoose");

/* Seta variável de ambiente com string do banco de dados */
const AppConstants = require("./app/constants/App");

if (AppConstants.DB_HOST) {
  Mongoose.connect(AppConstants.DB_HOST)
    .then(() => {
      console.info(
        "Conexão estabelecida com o banco de dados WireCard pelo serviço: Payments"
      );
    })
    .catch(err => {
      console.error(err.errors ? err.errors[0].err : err.errors);
    });
} else {
  console.error(
    "Não foi fornecido o caminho do banco de dados. Favor verificar."
  );
}
