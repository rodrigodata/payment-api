/* Importação de dependencias */
const Mongoose = require("mongoose");

/* Seta variável de ambiente com string do banco de dados */
const AppConstants = require("@constants/App");

if (AppConstants.DB_HOST) {
  console.log(AppConstants.DB_HOST);
  Mongoose.connect(AppConstants.DB_HOST, { useNewUrlParser: true })
    .then(() => {
      console.info("Banco de dados WIRECARD conectado ao serviço PAYMENT");
    })
    .catch(err => {
      console.error(JSON.stringify(err));
    });
} else {
  console.error(
    "Não foi fornecido o caminho do banco de dados. Favor verificar."
  );
}
