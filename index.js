const express = require("express");

const app = express();

const port = process.env.PORT || 4000;

app.use("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`server started at port : ${port}`);
});
