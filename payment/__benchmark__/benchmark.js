/* Import Dependencies */
const autocannon = require("autocannon");
const os = require("os");
const { PassThrough } = require("stream");

/* Mocks */
const paymentCreditCard = require("./payment_credit_card.json");
const paymentBoleto = require("./payment_boleto.json");

function run(URL, PATH, JSON_FILE) {
  /* */
  const buf = [];
  const outputStream = new PassThrough();

  /* Autocannon configuration */
  let autocannonConfiguration = {
    url: `${URL}${PATH}`,
    title: "Payment creation benchmark",
    connections: process.env.CONNECTIONS_PAYMENT_API || 10,
    duration: process.env.DURATION_PAYMENT_API || 60,
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(JSON_FILE)
  };

  /**
   *  If we pass the amount of requests to be process, we set the propertie amount in our configuration.
   *  this amount properties overwrite our propertie duration.
   */
  if (process.env.AMOUNT_PAYMENT_API)
    autocannonConfiguration.amount = process.env.AMOUNT_PAYMENT_API;

  /* Configuration of our benchmark */
  const instance = autocannon(autocannonConfiguration);

  autocannon.track(instance, { outputStream });

  outputStream.on("data", data => buf.push(data));
  instance.on("done", function() {
    process.stdout.write(os.EOL);
    process.stdout.write(Buffer.concat(buf));
  });

  // this is used to kill the instance on CTRL-C
  process.once("SIGINT", () => {
    instance.stop();
  });
}

/* Run our benchmark in parallel */
run("localhost:8080", "/api/v1/payment", paymentCreditCard);
run("localhost:8080", "/api/v1/payment", paymentBoleto);
