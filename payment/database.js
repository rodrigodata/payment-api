/* Importação de dependencias */
const { connect } = require("mongoose");

/* Seta variável de ambiente com string do banco de dados */
const { DB_HOST } = require("@constants/App");

if (DB_HOST) {
  connect(
    DB_HOST,
    { useNewUrlParser: true }
  )
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
