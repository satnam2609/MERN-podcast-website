const express = require("express");
const fs = require("fs");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const connectDb = require("./config/db");
const bodyParser = require("body-parser");
require("dotenv").config();

// configuration
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(morgan("dev"));
// app.use(
//   bodyParser.json({
//     limit: "50mb",
//   })
// );
app.use(bodyParser.json({ limit: "50mb" }));

// app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cors());
app.use(helmet());

// routes
fs.readdirSync("./routes").map((r) =>
  app.use("/api", require("./routes/" + r))
);

// server listening
connectDb();
app.listen(port, () => console.log(`Server running at ${port}...`));
