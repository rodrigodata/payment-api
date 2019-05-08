/* */
var Mongoose = require("mongoose");
require("mongoose-long")(Mongoose);

/**
TODO: Verificar correlação entre models e verificar em quais casos é necessário a criação de coleções no mongo.
model = {
    client: Client,? // 
    buyer: Buyer,? // um comprador não é um cliente???
    card: Card,
    payment_status: string,
    payment_type: string,
    Amount: mongoose.Schema.Types.Long,
    boleto_number: string
}

 */
