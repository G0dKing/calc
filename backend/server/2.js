const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

// API endpoints
app.post("/calculate", (req, res) => {
  const { expression } = req.body;
  res.json({ result: eval(expression) });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
