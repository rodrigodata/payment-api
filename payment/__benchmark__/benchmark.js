/* Import Dependencies */
const autocannon = require("autocannon");

/* Mocks */
const paymentCreditCard = require("./payment_credit_card.json");
const paymentBoleto = require("./payment_boleto.json");

function run(URL, PATH, JSON_FILE) {
  /* Autocannon configuration */
  let autocannonConfiguration = {
    url: URL,
    path: PATH,
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
  const instance = autocannon(autocannonConfiguration, finishedBenchmark);

  autocannon.track(instance, { renderProgressBar: false });

  // this is used to kill the instance on CTRL-C
  process.once("SIGINT", () => {
    instance.stop();
  });

  /* */
  function finishedBenchmark(err, res) {
    console.info(`Benchmark finished for endpoint ${PATH}`, err, res);
  }
}

/* Run our benchmark in parallel */
run("localhost:8080", "/api/v1/payment", paymentCreditCard);
run("localhost:8080", "/api/v1/payment", paymentBoleto);
