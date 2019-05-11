/* Importação de dependencias */
const Mongoose = require("mongoose");

/* Seta variável de ambiente com string do banco de dados */
const AppConstants = require("@constants/App");

if (AppConstants.DB_HOST) {
  console.log(AppConstants.DB_HOST);
  Mongoose.connect(AppConstants.DB_HOST, { useNewUrlParser: true })
    .then(() => {
      console.log("vrrrrrrrrrrrrrrrrrau");
    })
    .catch(err => {
      console.log(JSON.stringify(err));
      //console.error(err.errors ? err.errors[0].err : err.errors);
    });
} else {
  console.error(
    "Não foi fornecido o caminho do banco de dados. Favor verificar."
  );
}
