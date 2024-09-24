const express = require("express");
const env = require("dotenv");
const { swaggerUi, specs } = require("./utils/swagger");

env.config();

const app = express();
const port = process.env.PORT || 8000;

const bookRouter = require("./routes/book.js");
const memberRouter = require("./routes/member.js");
const borrowRouter = require("./routes/borrow.js");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.route("/").get((req, res) => {
  res.json({ message: "Welcome to the library API" });
});

app.use("/api/v1/book", bookRouter);
app.use("/api/v1/member", memberRouter);
app.use("/api/v1/borrow", borrowRouter);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;