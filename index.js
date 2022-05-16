const express = require("express");
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.json());
require("./routes/userRoutes")(app);

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server running");
});
