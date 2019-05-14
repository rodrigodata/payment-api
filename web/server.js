/* Import express app */
const app = require("./app/app");

/* Disable headers etag and x-powered-by. { SECURITY & PERFORMANCE } */
app.disable("etag").disable("etag");

app.listen(3000, () => {
  console.log("Checkout running on port 3000");
});
